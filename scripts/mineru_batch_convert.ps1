#Requires -Version 5.1
<#
.SYNOPSIS
  Sequentially convert PDFs via MinerU async API (pipeline + txt), keep images, emit report.
  Uses page chunks to avoid OOM on memory-constrained MinerU hosts.
#>
[CmdletBinding()]
param(
    [string]$ApiBase = "http://192.168.12.29:8000",
    [string]$PdfDir = "",
    [string]$OutDir = "",
    [int]$PollSeconds = 10,
    [int]$TimeoutMinutes = 90,
    [int]$HealthWaitMinutes = 30,
    [int]$PageChunkSize = 32,
    [switch]$PostProcess,
    # Safety: converting many PDFs at once wipes existing markdown outputs.
    [switch]$AllowMany
)

$ErrorActionPreference = "Stop"
$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptRoot

if (-not $PdfDir) { $PdfDir = Join-Path $ProjectRoot "autosar\dm\autosar" }
if (-not $OutDir) { $OutDir = Join-Path $ProjectRoot "autosar\dm\markdown" }

$ApiBase = $ApiBase.TrimEnd("/")
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function Write-Log {
    param([string]$Message)
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $Message"
    Write-Host $line
    if ($script:RunLogPath) {
        try {
            $fs = [System.IO.File]::Open($script:RunLogPath, [System.IO.FileMode]::Append, [System.IO.FileAccess]::Write, [System.IO.FileShare]::ReadWrite)
            $sw = New-Object System.IO.StreamWriter($fs, [System.Text.UTF8Encoding]::new($false))
            $sw.WriteLine($line)
            $sw.Dispose()
        }
        catch {
            # ignore log IO errors
        }
    }
}

function Get-PdfPageCount {
    param([string]$PdfPath)
    $py = @"
from pypdf import PdfReader
print(len(PdfReader(r'''$PdfPath''').pages))
"@
    $tmpPy = [System.IO.Path]::GetTempFileName() + ".py"
    try {
        Set-Content -Path $tmpPy -Value $py -Encoding UTF8
        $out = & uv run --with pypdf python $tmpPy 2>&1 | Out-String
        if ($LASTEXITCODE -ne 0) { throw "uv/pypdf failed: $out" }
        $n = 0
        if (-not [int]::TryParse($out.Trim(), [ref]$n) -or $n -le 0) {
            throw "Invalid page count output: $out"
        }
        return $n
    }
    finally {
        Remove-Item -Force -ErrorAction SilentlyContinue $tmpPy
    }
}

function Get-Health {
    $lastErr = $null
    for ($i = 1; $i -le 8; $i++) {
        try {
            $raw = & curl.exe -s --max-time 30 "$ApiBase/health"
            if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($raw)) {
                throw "Health curl failed exit=$LASTEXITCODE"
            }
            return ($raw | ConvertFrom-Json)
        }
        catch {
            $lastErr = $_
            Write-Log "Health retry $i/8: $($_.Exception.Message)"
            Start-Sleep -Seconds ([Math]::Min(20, 3 * $i))
        }
    }
    throw "Health check failed against $ApiBase/health : $($lastErr.Exception.Message)"
}

function Wait-ServerIdle {
    $deadline = (Get-Date).AddMinutes($HealthWaitMinutes)
    while ((Get-Date) -lt $deadline) {
        $h = Get-Health
        $busy = [int]$h.processing_tasks + [int]$h.queued_tasks
        if ($busy -le 0) {
            Write-Log "Server idle (processing=0, queued=0)."
            return
        }
        Write-Log "Server busy processing=$($h.processing_tasks) queued=$($h.queued_tasks); waiting ${PollSeconds}s..."
        Start-Sleep -Seconds $PollSeconds
    }
    throw "Timed out waiting for server idle after $HealthWaitMinutes minutes."
}

function Submit-ParseTask {
    param(
        [string]$PdfPath,
        [int]$StartPageId,
        [int]$EndPageId
    )

    $args = @(
        "-s", "-w", "`nHTTP_CODE:%{http_code}", "--max-time", "300",
        "-X", "POST", "$ApiBase/tasks",
        "-F", "files=@$PdfPath",
        "-F", "lang_list=ch",
        "-F", "backend=pipeline",
        "-F", "parse_method=txt",
        "-F", "formula_enable=true",
        "-F", "table_enable=true",
        "-F", "return_md=true",
        "-F", "return_images=true",
        "-F", "response_format_zip=true",
        "-F", "start_page_id=$StartPageId",
        "-F", "end_page_id=$EndPageId"
    )
    $out = & curl.exe @args 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        throw "curl submit failed exit=$LASTEXITCODE out=$out"
    }
    if ($out -notmatch "HTTP_CODE:(\d{3})") {
        throw "Cannot parse HTTP code from submit response: $out"
    }
    $httpCode = $Matches[1]
    $body = ($out -split "HTTP_CODE:")[0].Trim()
    if ($httpCode -notin @("200", "202")) {
        throw "Submit HTTP $httpCode body=$body"
    }
    $obj = $body | ConvertFrom-Json
    if (-not $obj.task_id) { throw "No task_id in response: $body" }
    return $obj
}

function Get-TaskStatus {
    param([string]$TaskId)
    $lastErr = $null
    for ($i = 1; $i -le 8; $i++) {
        try {
            $raw = & curl.exe -s --max-time 60 "$ApiBase/tasks/$TaskId"
            if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($raw)) {
                throw "Status curl failed exit=$LASTEXITCODE"
            }
            return ($raw | ConvertFrom-Json)
        }
        catch {
            $lastErr = $_
            Write-Log "Status poll retry $i/8 for $TaskId : $($_.Exception.Message)"
            Start-Sleep -Seconds ([Math]::Min(30, $PollSeconds * $i))
        }
    }
    throw "Status poll failed after retries: $($lastErr.Exception.Message)"
}

function Wait-Task {
    param(
        [string]$TaskId,
        [datetime]$StartedAt
    )
    $deadline = $StartedAt.AddMinutes($TimeoutMinutes)
    while ((Get-Date) -lt $deadline) {
        $st = Get-TaskStatus -TaskId $TaskId
        Write-Log "task=$TaskId status=$($st.status)"
        if ($st.status -in @("completed", "failed", "error", "success")) {
            return $st
        }
        Start-Sleep -Seconds $PollSeconds
    }
    return [pscustomobject]@{
        task_id = $TaskId
        status  = "timeout"
        error   = "Exceeded TimeoutMinutes=$TimeoutMinutes"
    }
}

function Download-TaskZip {
    param(
        [string]$TaskId,
        [string]$ZipPath
    )
    if (Test-Path $ZipPath) { Remove-Item -Force $ZipPath }
    & curl.exe -s --max-time 600 -L "$ApiBase/tasks/$TaskId/result" -o $ZipPath
    if ($LASTEXITCODE -ne 0) { throw "Download result failed for $TaskId" }
    if (-not (Test-Path $ZipPath) -or ((Get-Item $ZipPath).Length -lt 64)) {
        $head = Get-Content -Raw -ErrorAction SilentlyContinue $ZipPath
        throw "Result download too small or missing. Head=$head"
    }
    $fs = [System.IO.File]::OpenRead($ZipPath)
    try {
        $b0 = $fs.ReadByte()
    }
    finally { $fs.Close() }
    if ($b0 -eq 0x7B) {
        $txt = Get-Content -Raw $ZipPath
        throw "Result is JSON not ZIP: $txt"
    }
}

function Expand-ResultZip {
    param(
        [string]$ZipPath,
        [string]$ExtractDir
    )
    if (Test-Path $ExtractDir) { Remove-Item -Recurse -Force $ExtractDir }
    New-Item -ItemType Directory -Force -Path $ExtractDir | Out-Null
    Expand-Archive -Path $ZipPath -DestinationPath $ExtractDir -Force
}

function Merge-ChunkIntoDest {
    param(
        [string]$ExtractDir,
        [string]$Stem,
        [string]$DestDir,
        [int]$ChunkIndex
    )
    New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
    $imagesDir = Join-Path $DestDir "images"
    New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null

    $mdFiles = @(Get-ChildItem -Path $ExtractDir -Recurse -Filter "*.md" -File)
    if ($mdFiles.Count -eq 0) {
        throw "No .md file found in extracted ZIP under $ExtractDir"
    }
    $preferred = $mdFiles | Where-Object { $_.BaseName -eq $Stem } | Select-Object -First 1
    if (-not $preferred) {
        $preferred = $mdFiles | Sort-Object Length -Descending | Select-Object -First 1
    }

    $mdText = Get-Content -Raw -Encoding UTF8 $preferred.FullName
    $nameMap = @{}

    $imgExts = @("*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.bmp", "*.svg")
    foreach ($pat in $imgExts) {
        Get-ChildItem -Path $ExtractDir -Recurse -Filter $pat -File -ErrorAction SilentlyContinue | ForEach-Object {
            $newName = "c{0:D2}_{1}" -f $ChunkIndex, $_.Name
            $target = Join-Path $imagesDir $newName
            Copy-Item -Force $_.FullName $target
            $nameMap[$_.Name] = $newName
        }
    }

    foreach ($kv in $nameMap.GetEnumerator()) {
        $old = [regex]::Escape($kv.Key)
        # Rewrite only inside markdown link/image destinations to avoid body-text collisions.
        $mdText = [regex]::Replace($mdText, "(\]\([^)]*?)$old", "`${1}$($kv.Value)")
    }
    $mdText = $mdText -replace '\]\((?:\./)?(?:[^)\s]*/)?(images/[^)\s]+)\)', '](./$1)'
    $mdText = $mdText -replace '\]\((?:\./)?(c\d{2}_[^)/\s]+\.(?:png|jpg|jpeg|gif|webp|bmp|svg))\)', '](./images/$1)'
    $mdText = $mdText -replace '\]\((?:\./)?([^)/\s]+\.(?:png|jpg|jpeg|gif|webp|bmp|svg))\)', '](./images/$1)'

    $destMd = Join-Path $DestDir "$Stem.md"
    if ($ChunkIndex -eq 0 -or -not (Test-Path $destMd)) {
        [System.IO.File]::WriteAllText($destMd, $mdText.TrimEnd() + "`n", [System.Text.UTF8Encoding]::new($false))
    }
    else {
        $prev = Get-Content -Raw -Encoding UTF8 $destMd
        $merged = $prev.TrimEnd() + "`n`n" + $mdText.Trim() + "`n"
        [System.IO.File]::WriteAllText($destMd, $merged, [System.Text.UTF8Encoding]::new($false))
    }
    return $destMd
}

function Test-MarkdownFormat {
    param(
        [string]$MdPath,
        [string]$DestDir
    )
    $notes = New-Object System.Collections.Generic.List[string]
    $ok = $true

    if (-not (Test-Path $MdPath)) {
        return [pscustomobject]@{ format_ok = $false; format_notes = "md missing" }
    }
    $info = Get-Item $MdPath
    if ($info.Length -lt 1024) {
        $ok = $false
        $notes.Add("file too small ($($info.Length) bytes)")
    }

    $text = Get-Content -Raw -Encoding UTF8 $MdPath
    if ([string]::IsNullOrWhiteSpace($text)) {
        $ok = $false
        $notes.Add("empty content")
        return [pscustomobject]@{ format_ok = $false; format_notes = ($notes -join "; ") }
    }

    $hasHeading = [regex]::IsMatch($text, '(?m)^#{1,6}\s+\S')
    $hasFeature = ($text -match 'Document Title|AUTOSAR|Specification')
    if (-not $hasHeading -and -not $hasFeature) {
        $ok = $false
        $notes.Add("no heading and no AUTOSAR/Document Title feature text")
    }
    elseif (-not $hasHeading) {
        $notes.Add("warning: no markdown heading, feature text present")
    }

    $fenceCount = ([regex]::Matches($text, '(?m)^```')).Count
    if (($fenceCount % 2) -ne 0) {
        $notes.Add("warning: unpaired code fences count=$fenceCount")
    }

    # MinerU block markers: standalone lines or glued to content (e.g. "△<table>...")
    $triangleStandalone = ([regex]::Matches($text, '(?m)^[ \t]*[△▽][ \t]*$')).Count
    $triangleGlued = ([regex]::Matches($text, '(?m)^[ \t]*[△▽](?=\S)')).Count
    $triangleTotal = $triangleStandalone + $triangleGlued
    if ($triangleTotal -gt 0) {
        $notes.Add("warning: MinerU block markers △/▽ count=$triangleTotal")
    }

    $imgRefs = [regex]::Matches($text, '!\[[^\]]*\]\(([^)]+)\)')
    $missing = 0
    $localRefNames = New-Object 'System.Collections.Generic.HashSet[string]'
    foreach ($m in $imgRefs) {
        $ref = $m.Groups[1].Value.Trim().Trim('"').Trim("'")
        if ($ref -match '^(https?:|data:)') { continue }
        $rel = $ref -replace '^\./', ''
        $candidate = Join-Path $DestDir $rel
        if (-not (Test-Path $candidate)) {
            $alt = Join-Path (Join-Path $DestDir "images") ([IO.Path]::GetFileName($rel))
            if (-not (Test-Path $alt)) { $missing++ }
            else { [void]$localRefNames.Add([IO.Path]::GetFileName($rel)) }
        }
        else {
            [void]$localRefNames.Add([IO.Path]::GetFileName($rel))
        }
    }
    if ($missing -gt 0) {
        $ok = $false
        $notes.Add("missing image files: $missing")
    }

    $imagesDir = Join-Path $DestDir "images"
    if (Test-Path $imagesDir) {
        $imgFiles = @(Get-ChildItem -Path $imagesDir -File -ErrorAction SilentlyContinue)
        $orphan = 0
        foreach ($f in $imgFiles) {
            if (-not $localRefNames.Contains($f.Name)) { $orphan++ }
        }
        if ($orphan -gt 0) {
            $notes.Add("warning: unreferenced image files=$orphan (of $($imgFiles.Count))")
        }
    }

    if ($notes.Count -eq 0) { $notes.Add("ok") }
    return [pscustomobject]@{
        format_ok    = $ok
        format_notes = ($notes -join "; ")
    }
}

# -------- main --------
$script:RunLogPath = Join-Path $OutDir "batch_run.log"
[System.IO.File]::WriteAllText($script:RunLogPath, "", [System.Text.UTF8Encoding]::new($false))

$pdfs = @(Get-ChildItem -Path $PdfDir -Filter "*.pdf" -File | Sort-Object Name)
if ($pdfs.Count -eq 0) {
    throw "No PDF files found in $PdfDir"
}
if ($pdfs.Count -gt 3 -and -not $AllowMany) {
    throw "PdfDir contains $($pdfs.Count) PDFs (refusing bulk convert that would wipe existing markdown). Pass -AllowMany to proceed, or point -PdfDir at a smaller subset."
}

Write-Log "ApiBase=$ApiBase"
Write-Log "PdfDir=$PdfDir ($($pdfs.Count) files)"
Write-Log "OutDir=$OutDir"
Write-Log "PageChunkSize=$PageChunkSize TimeoutMinutes=$TimeoutMinutes"

$batchStart = Get-Date
# ArrayList: Windows PowerShell 5.1 throws ArgumentException on @($List[object])
$records = New-Object System.Collections.ArrayList

foreach ($pdf in $pdfs) {
    $stem = [IO.Path]::GetFileNameWithoutExtension($pdf.Name)
    $destDir = Join-Path $OutDir $stem
    $workDir = Join-Path $OutDir ".work_$stem"

    Write-Log "==== Start $($pdf.Name) ===="
    $started = Get-Date
    $taskIds = New-Object System.Collections.Generic.List[string]
    $rec = [ordered]@{
        file         = $pdf.Name
        stem         = $stem
        task_id      = $null
        task_ids     = @()
        page_count   = 0
        chunk_count  = 0
        status       = "pending"
        elapsed_sec  = 0
        md_bytes     = 0
        image_count  = 0
        format_ok    = $false
        format_notes = ""
        error        = $null
        started_at   = $started.ToString("o")
        finished_at  = $null
    }

    try {
        if (Test-Path $workDir) { Remove-Item -Recurse -Force $workDir }
        New-Item -ItemType Directory -Force -Path $workDir | Out-Null
        if (Test-Path $destDir) { Remove-Item -Recurse -Force $destDir }

        $pageCount = Get-PdfPageCount -PdfPath $pdf.FullName
        $rec.page_count = $pageCount
        $chunks = [Math]::Ceiling($pageCount / [double]$PageChunkSize)
        $rec.chunk_count = [int]$chunks
        Write-Log "$stem pages=$pageCount chunks=$chunks"

        for ($c = 0; $c -lt $chunks; $c++) {
            $startPage = $c * $PageChunkSize
            $endPage = [Math]::Min($pageCount - 1, (($c + 1) * $PageChunkSize) - 1)
            Write-Log "Chunk $($c+1)/$chunks pages $startPage-$endPage"

            Wait-ServerIdle
            $chunkStart = Get-Date
            $submit = Submit-ParseTask -PdfPath $pdf.FullName -StartPageId $startPage -EndPageId $endPage
            $taskIds.Add([string]$submit.task_id) | Out-Null
            Write-Log "Submitted task_id=$($submit.task_id)"

            $st = Wait-Task -TaskId $submit.task_id -StartedAt $chunkStart
            if ($st.error) { Write-Log "chunk error field: $($st.error)" }
            if ($st.status -notin @("completed", "success")) {
                throw "Chunk $c task status=$($st.status) error=$($st.error)"
            }

            $zipPath = Join-Path $workDir ("chunk_{0:D2}.zip" -f $c)
            $extractDir = Join-Path $workDir ("extract_{0:D2}" -f $c)
            Download-TaskZip -TaskId $submit.task_id -ZipPath $zipPath
            Expand-ResultZip -ZipPath $zipPath -ExtractDir $extractDir
            $null = Merge-ChunkIntoDest -ExtractDir $extractDir -Stem $stem -DestDir $destDir -ChunkIndex $c
            Remove-Item -Recurse -Force $extractDir -ErrorAction SilentlyContinue
            Remove-Item -Force $zipPath -ErrorAction SilentlyContinue
        }

        $rec.task_ids = $taskIds.ToArray()
        $rec.task_id = ($taskIds -join ",")
        $mdPath = Join-Path $destDir "$stem.md"
        $rec.md_bytes = (Get-Item $mdPath).Length
        $rec.image_count = @(Get-ChildItem -Path (Join-Path $destDir "images") -File -ErrorAction SilentlyContinue).Count

        $fmt = Test-MarkdownFormat -MdPath $mdPath -DestDir $destDir
        $rec.format_ok = [bool]$fmt.format_ok
        $rec.format_notes = [string]$fmt.format_notes
        if ($PostProcess) {
            Write-Log "PostProcess: fix_dm_markdown.py --stem $stem"
            $fixScript = Join-Path $ScriptRoot "fix_dm_markdown.py"
            & uv run $fixScript --stem $stem --no-backup
            if ($LASTEXITCODE -ne 0) {
                throw "fix_dm_markdown.py failed for $stem (exit $LASTEXITCODE)"
            }
            $fmt = Test-MarkdownFormat -MdPath $mdPath -DestDir $destDir
            $rec.format_ok = [bool]$fmt.format_ok
            $rec.format_notes = [string]$fmt.format_notes
            $rec.post_process = $true
        }
        $rec.status = "completed"
        Write-Log "Done $stem md_bytes=$($rec.md_bytes) images=$($rec.image_count) format_ok=$($rec.format_ok)"
    }
    catch {
        $rec.status = "failed"
        $rec.task_ids = $taskIds.ToArray()
        if ($taskIds.Count -gt 0) { $rec.task_id = ($taskIds -join ",") }
        $rec.error = $_.Exception.Message
        Write-Log "FAILED $($pdf.Name): $($rec.error)"
    }
    finally {
        $finished = Get-Date
        $rec.finished_at = $finished.ToString("o")
        $rec.elapsed_sec = [math]::Round(($finished - $started).TotalSeconds, 1)
        [void]$records.Add([pscustomobject]$rec)
        if (Test-Path $workDir) {
            Remove-Item -Recurse -Force $workDir -ErrorAction SilentlyContinue
        }
    }
}

$batchEnd = Get-Date
$totalSec = [math]::Round(($batchEnd - $batchStart).TotalSeconds, 1)
$recordItems = @($records.ToArray())
$okCount = @($recordItems | Where-Object { $_.status -eq "completed" }).Count
$failCount = $recordItems.Count - $okCount
$completedOnly = @($recordItems | Where-Object { $_.status -eq "completed" })
$avgSec = if ($completedOnly.Count -gt 0) {
    [math]::Round((($completedOnly | Measure-Object -Property elapsed_sec -Average).Average), 1)
} else { 0 }

$reportJsonPath = Join-Path $OutDir "batch_report.json"
$reportMdPath = Join-Path $OutDir "batch_report.md"

$reportObj = [ordered]@{
    api_base                    = $ApiBase
    backend                     = "pipeline"
    parse_method                = "txt"
    page_chunk_size             = $PageChunkSize
    started_at                  = $batchStart.ToString("o")
    finished_at                 = $batchEnd.ToString("o")
    total_elapsed_sec           = $totalSec
    success_count               = $okCount
    failed_count                = $failCount
    average_elapsed_sec_success = $avgSec
    tasks                       = $recordItems
}
($reportObj | ConvertTo-Json -Depth 8) | Set-Content -Path $reportJsonPath -Encoding UTF8

$fmtPass = @($recordItems | Where-Object { $_.format_ok }).Count
$tableRows = foreach ($r in $recordItems) {
    $note = if ($r.error) { [string]$r.error } else { [string]$r.format_notes }
    $note = ($note -replace '\|', '/' -replace "`r?`n", " ")
    if ($note.Length -gt 120) { $note = $note.Substring(0, 117) + "..." }
    "| $($r.file) | $($r.status) | $($r.elapsed_sec) | $($r.page_count) | $($r.chunk_count) | $($r.md_bytes) | $($r.image_count) | $($r.format_ok) | $note |"
}
$fmtLines = foreach ($r in $recordItems) {
    "- ``$($r.stem)``: ok=$($r.format_ok); $($r.format_notes)"
}
if ($null -eq $tableRows) { $tableRows = @() }
if ($null -eq $fmtLines) { $fmtLines = @() }

$reportMd = @"
# MinerU Batch Conversion Report

- API: ``$ApiBase``
- Backend: ``pipeline``, parse_method: ``txt``, page_chunk_size: $PageChunkSize
- Started: $($batchStart.ToString('yyyy-MM-dd HH:mm:ss'))
- Finished: $($batchEnd.ToString('yyyy-MM-dd HH:mm:ss'))
- Total elapsed: ${totalSec}s
- Success: $okCount / $($recordItems.Count); Failed: $failCount
- Average elapsed (success): ${avgSec}s

| File | Status | Elapsed (s) | Pages | Chunks | MD bytes | Images | Format OK | Notes / Error |
|------|--------|-------------|-------|--------|----------|--------|-----------|---------------|
$((@($tableRows) -join "`n"))

## Format check summary

- format_ok: $fmtPass / $($recordItems.Count)

$((@($fmtLines) -join "`n"))
"@

[System.IO.File]::WriteAllText($reportMdPath, [string]$reportMd, [System.Text.UTF8Encoding]::new($false))

Write-Log "Report written: $reportMdPath"
Write-Log "JSON written:  $reportJsonPath"
Write-Log "Batch finished success=$okCount failed=$failCount total=${totalSec}s"

if ($failCount -gt 0) { exit 1 } else { exit 0 }
