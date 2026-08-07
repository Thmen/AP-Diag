"""Fix MinerU-converted DM specification markdown: noise, OCR, tables, formulas, missing reqs."""
# /// script
# requires-python = ">=3.11"
# dependencies = ["pypdf"]
# ///
from __future__ import annotations

import argparse
import re
import shutil
from dataclasses import dataclass
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

from dm_markdown_common import (
    BLOCK_MARKERS,
    DOCUMENT_ID_FOOTER_RE,
    TABLE_RE,
    VERSIONS,
    extract_pdf_text,
    extract_req_ids,
    is_simple_table_html,
    md_path,
    pdf_path,
    version_tag,
)

MATH_SUB_EXCLUDE = re.compile(r"Document|AUTOSAR|CONFIDENTIAL|ID\s*723", re.I)
KNOWN_S3 = re.compile(
    r"\$\s*\{\s*\\mathsf\s*\{\s*S\s*\}\s*\}\s*\{\s*\\mathsf\s*\{\s*3\s*\}\s*\}\s*_\s*\{\s*\\mathsf\s*\{\s*S\s*e\s*r\s*v\s*e\s*r\s*\}\s*\}\s*\$",
    re.I,
)
KNOWN_S3_ALT = re.compile(
    r"\$\(\s*\{\s*\\mathsf\s*\{\s*S\s*\}\s*\}\s*3\s*_\s*\{\s*\\mathsf\s*\{\s*S\s*e\s*r\s*v\s*e\s*r\s*\}\s*\}\s*\)\$",
    re.I,
)
KNOWN_S3_ALT2 = re.compile(
    r"\$\(\s*\{\s*\\mathsf\s*\{\s*S\s*\}\s*\}\s*\{\s*\\mathsf\s*\{\s*3\s*\}\s*\}\s*_\s*\{\s*\{\s*\\mathsf\s*\{\s*S\s*e\s*r\s*v\s*e\s*r\s*\}\s*\}\s*\}\s*\)\$",
    re.I,
)
KNOWN_TT_S3 = re.compile(
    r"\$\(\s*\{\s*\\tt\s+S\s+3\s*_\s*\{\s*s\s*e\s*r\s*v\s*e\s*r\s*\}\s*\}\s*\)\$",
    re.I,
)
MATH_CMD_RE = re.compile(r"\\(?:mathsf|mathrm|overline|tt)\b")
MALFORMED_REQ_OPEN = re.compile(r"\[SWS DM (\d{5})(?![\]_])", re.I)
MALFORMED_REQ_CELL = re.compile(r"\[SWS DM (\d{5})(?=</td>)", re.I)


@dataclass
class FixStats:
    block_markers: int = 0
    page_numbers: int = 0
    copyright_c_paren: int = 0
    document_id_footers: int = 0
    apext: int = 0
    ara_diag_space: int = 0
    sws_ids: int = 0
    headings: int = 0
    hyphenation: int = 0
    simple_tables: int = 0
    complex_table_cells: int = 0
    known_s3: int = 0
    html_sub: int = 0
    latex_blocks: int = 0
    patched_reqs: int = 0


class _CellParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.rows: list[list[str]] = []
        self._current_row: list[str] | None = None
        self._cell_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        if tag == "tr":
            self._current_row = []
        elif tag in ("td", "th") and self._current_row is not None:
            self._cell_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag in ("td", "th") and self._current_row is not None:
            text = unescape("".join(self._cell_parts))
            text = re.sub(r"\s+", " ", text).strip()
            self._current_row.append(text)
            self._cell_parts = []
        elif tag == "tr" and self._current_row is not None:
            if self._current_row:
                self.rows.append(self._current_row)
            self._current_row = None

    def handle_data(self, data: str) -> None:
        if self._current_row is not None:
            self._cell_parts.append(data)


def _count_sub(pattern: re.Pattern[str], repl, text: str) -> tuple[str, int]:
    new, n = pattern.subn(repl, text)
    return new, n


def remove_noise(text: str, stats: FixStats) -> str:
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    i = 0
    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()
        if stripped in BLOCK_MARKERS:
            stats.block_markers += 1
            i += 1
            continue
        # MinerU often glues markers to the next token: "△<table>..." / "▽## ..."
        for marker in BLOCK_MARKERS:
            if stripped.startswith(marker) and len(stripped) > len(marker):
                rest = stripped[len(marker) :].lstrip()
                if rest:
                    stats.block_markers += 1
                    nl = "\r\n" if raw.endswith("\r\n") else ("\n" if raw.endswith("\n") else "")
                    raw = rest + nl
                    stripped = rest
                break
        if stripped == "c()":
            stats.copyright_c_paren += 1
            i += 1
            continue
        if re.fullmatch(r"\d{1,4}", stripped):
            prev = lines[i - 1].strip() if i > 0 else ""
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            prev_ok = not prev or prev.endswith("</table>") or prev.startswith("<table")
            next_ok = not nxt or nxt.startswith("<table") or nxt in BLOCK_MARKERS
            if prev_ok and next_ok:
                stats.page_numbers += 1
                i += 1
                continue
        out.append(raw)
        i += 1
    text = "".join(out)
    text, n = _count_sub(DOCUMENT_ID_FOOTER_RE, "", text)
    stats.document_id_footers += n
    return text


def normalize_text(text: str, stats: FixStats) -> str:
    text, n = _count_sub(re.compile(r"apext::", re.I), "ara::", text)
    stats.apext += n
    text, n = _count_sub(re.compile(r"ara::\s+diag(::)?", re.I), r"ara::diag\1", text)
    stats.ara_diag_space += n
    text, n = _count_sub(re.compile(r"\[SWS\\_DM\\_(\d{5})\]", re.I), r"[SWS_DM_\1]", text)
    stats.sws_ids += n
    text, n = _count_sub(re.compile(r"\[SWS DM (\d{5})\]", re.I), r"[SWS_DM_\1]", text)
    stats.sws_ids += n
    text, n = _count_sub(MALFORMED_REQ_OPEN, r"[SWS_DM_\1]", text)
    stats.sws_ids += n
    text, n = _count_sub(MALFORMED_REQ_CELL, r"[SWS_DM_\1]", text)
    stats.sws_ids += n
    text, n = _count_sub(re.compile(r"^## Hints:", re.M), "### Hints:", text)
    stats.headings += n
    text, n = _count_sub(re.compile(r"^## • ", re.M), "### ", text)
    stats.headings += n
    text, n = _count_sub(re.compile(r"(\w+)-\n(\w+)"), r"\1\2", text)
    stats.hyphenation += n
    return text


def html_table_to_markdown(html: str) -> str:
    parser = _CellParser()
    parser.feed(html)
    parser.close()
    rows = parser.rows
    if not rows:
        return html
    widths = {len(r) for r in rows}
    if len(widths) != 1:
        return html
    cols = widths.pop()
    if not (2 <= cols <= 6):
        return html

    def esc(cell: str) -> str:
        return cell.replace("|", r"\|")

    md_rows = []
    for row in rows:
        md_rows.append("| " + " | ".join(esc(c) for c in row) + " |")
    if len(md_rows) >= 2:
        md_rows.insert(1, "| " + " | ".join(["---"] * cols) + " |")
    return "\n".join(md_rows)


def normalize_inline(text: str) -> str:
    """OCR normalization for table cell text (no line-merging)."""
    text = re.sub(r"apext::", "ara::", text, flags=re.I)
    text = re.sub(r"ara::\s+diag(::)?", r"ara::diag\1", text, flags=re.I)
    text = re.sub(r"\[SWS\\_DM\\_(\d{5})\]", r"[SWS_DM_\1]", text, flags=re.I)
    text = re.sub(r"\[SWS DM (\d{5})\]", r"[SWS_DM_\1]", text, flags=re.I)
    text, _ = MALFORMED_REQ_OPEN.subn(r"[SWS_DM_\1]", text)
    text, _ = MALFORMED_REQ_CELL.subn(r"[SWS_DM_\1]", text)
    return text


def fix_tables(text: str, stats: FixStats) -> str:
    def repl(match: re.Match[str]) -> str:
        html = match.group(0)
        if is_simple_table_html(html):
            inner = normalize_inline(html)
            md = html_table_to_markdown(inner)
            if md != html:
                stats.simple_tables += 1
                return md
        inner = normalize_inline(html)
        if inner != html:
            stats.complex_table_cells += 1
        return inner

    return TABLE_RE.sub(repl, text)


def _collapse_mathsf_token(content: str) -> str:
    return re.sub(r"\s+", "", content.strip())


def _replace_mathsf(expr: str) -> str:
    def repl(match: re.Match[str]) -> str:
        inner = _collapse_mathsf_token(match.group(1))
        return f"\\mathrm{{{inner}}}"

    return re.sub(r"\\mathsf\s*\{\s*([^}]*?)\s*\}", repl, expr)


def _replace_tt(expr: str) -> str:
    def repl(match: re.Match[str]) -> str:
        return _collapse_mathsf_token(match.group(1))

    return re.sub(r"\\tt\s+((?:[A-Za-z0-9]\s*)+)", repl, expr)


def normalize_latex(expr: str) -> str:
    expr = expr.strip()
    if expr.startswith("{") and expr.endswith("}"):
        expr = expr[1:-1].strip()
    expr = _replace_mathsf(expr)
    expr = _replace_tt(expr)
    expr = expr.replace("CoDTC", "CbDTC")
    expr = re.sub(r"\\rangle", ")", expr)
    expr = re.sub(r"&amp;！", r"\\land", expr)
    expr = re.sub(r"&amp;", r"\\land ", expr)
    expr = re.sub(r"\\overline\s*\{\s*\{\s*\|\s*", r"\\lor \\overline{", expr)
    # Do not collapse `}}` — valid in constructs like _{\mathrm{Server}}
    expr = re.sub(r"\s*_\s*\{", "_{", expr)
    expr = re.sub(r"\s*\^\s*\{", "^{", expr)
    expr = re.sub(r"\s+", " ", expr)
    expr = re.sub(r"\(\s+", "(", expr)
    expr = re.sub(r"\s+\)", ")", expr)
    return expr.strip()


def fix_known_s3(text: str, stats: FixStats) -> str:
    replacements = [
        (KNOWN_S3, "$S3_{\\mathrm{Server}}$"),
        (KNOWN_S3_ALT, "$(S3_{\\mathrm{Server}})$"),
        (KNOWN_S3_ALT2, "$(S3_{\\mathrm{Server}})$"),
        (KNOWN_TT_S3, "$(S3_{\\mathrm{server}})$"),
    ]
    for pattern, repl in replacements:
        new, n = pattern.subn(lambda _m, r=repl: r, text)
        stats.known_s3 += n
        text = new
    return text


def fix_html_subscripts(text: str, stats: FixStats) -> str:
    def repl(match: re.Match[str]) -> str:
        if MATH_SUB_EXCLUDE.search(match.group(2)):
            return match.group(0)
        stats.html_sub += 1
        wrapped = f"${match.group(1)}_{{\\mathrm{{{match.group(2)}}}}}$"
        if match.group(0).startswith("(") and match.group(0).endswith(")"):
            return f"({wrapped})"
        return wrapped

    return re.sub(r"\(?(S3|FDC)<sub>([^<]+)</sub>\)?", repl, text)


def iter_math_spans(text: str):
    i = 0
    n = len(text)
    while i < n:
        if text[i] != "$" or (i > 0 and text[i - 1] == "\\"):
            i += 1
            continue
        j = i + 1
        if j < n and text[j] == "{":
            j += 1
        start = j
        depth = 0
        while j < n:
            ch = text[j]
            if ch == "$" and depth == 0:
                content = text[start:j]
                if text[i + 1 : i + 2] == "{" and content.endswith("}"):
                    content = content[:-1]
                yield i, j + 1, content
                i = j + 1
                break
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth = max(depth - 1, 0)
            j += 1
        else:
            i += 1


def fix_latex_blocks(text: str, stats: FixStats) -> str:
    parts: list[str] = []
    last = 0
    for start, end, content in iter_math_spans(text):
        parts.append(text[last:start])
        if not MATH_CMD_RE.search(content):
            parts.append(text[start:end])
        else:
            normalized = normalize_latex(content)
            if normalized == content.strip():
                parts.append(text[start:end])
            else:
                stats.latex_blocks += 1
                parts.append(f"${normalized}$")
        last = end
    parts.append(text[last:])
    return "".join(parts)


def fix_formulas(text: str, stats: FixStats) -> str:
    text = fix_known_s3(text, stats)
    text = fix_html_subscripts(text, stats)
    text = fix_latex_blocks(text, stats)
    return text


def patch_missing_requirements(text: str, stem: str, stats: FixStats) -> str:
    ver = version_tag(stem)
    ids = extract_req_ids(text)
    pdf = pdf_path(stem)
    if not pdf.exists():
        return text

    missing = set(extract_req_ids(extract_pdf_text(pdf))) - ids
    if not missing:
        return text

    if ver == "R24-11" and "02061" in missing:
        heading = "## [SWS_DM_02061] ViolationMessage InvalidDebouncingAlgorithmViolation\n\n"
        if heading.strip() not in text and "InvalidDebouncingAlgorithmViolation" in text:
            pattern = re.compile(
                r"(</table>\n\n)"
                r"Status: DRAFT\n\n"
                r"Upstream requirements: RS\\_Diag\\_04068, RS\\_AP\\_00149\n\n"
                r"(<table><tr><td rowspan=1 colspan=1>DIt-Message</td><td rowspan=1 colspan=3>InvalidDebouncingAlgorithmViolation</td></tr>)",
            )
            new_text, n = pattern.subn(r"\1" + heading + r"Status: DRAFT\n\nUpstream requirements: RS\\_Diag\\_04068, RS\\_AP\\_00149\n\n\2", text, count=1)
            if n:
                text = new_text
                stats.patched_reqs += 1
                missing.discard("02061")

    if ver == "R24-11" and "02062" in missing:
        text, n = _count_sub(
            re.compile(r"^# \[SWS_DM_02062\]", re.M),
            "## [SWS_DM_02062]",
            text,
        )
        if n:
            stats.patched_reqs += n

    for req_id in sorted(missing, key=int):
        if req_id in extract_req_ids(text):
            continue
        ctx = _pdf_req_context(pdf, req_id)
        if not ctx:
            continue
        block = _build_req_block_from_pdf(ctx, req_id)
        anchor = _find_insert_anchor(text, req_id)
        if anchor and block:
            text = text[:anchor] + block + text[anchor:]
            stats.patched_reqs += 1

    return text


def _pdf_req_context(pdf: Path, req_id: str, radius: int = 500) -> str:
    text = extract_pdf_text(pdf)
    pattern = re.compile(rf"\[SWS[_ ]DM[_ ]{req_id}\]", re.I)
    match = pattern.search(text)
    if not match:
        return ""
    start = max(0, match.start() - radius)
    end = min(len(text), match.end() + radius)
    return text[start:end]


def _build_req_block_from_pdf(ctx: str, req_id: str) -> str:
    match = re.search(rf"\[SWS[_ ]DM[_ ]{req_id}\]\s*(.+?)(?:\[SWS|RS_|$)", ctx, re.I | re.S)
    if not match:
        return ""
    title = re.sub(r"\s+", " ", match.group(1)).strip()[:120]
    return f"\n\n## [SWS_DM_{req_id}] {title}\n\n"


def _find_insert_anchor(text: str, req_id: str) -> int | None:
    num = int(req_id)
    for delta in (1, -1, 2, -2, 3, -3):
        neighbor = f"{num + delta:05d}"
        patterns = [
            rf"## \[SWS_DM_{neighbor}\]",
            rf"\[SWS_DM_{neighbor}\]",
        ]
        for pat in patterns:
            match = re.search(pat, text, re.I)
            if match:
                return match.end()
    return None


def is_sws_diagnostics_stem(stem: str) -> bool:
    return stem in VERSIONS or "SWS_Diagnostics" in stem


def fix_text(text: str, stem: str) -> tuple[str, FixStats]:
    stats = FixStats()
    text = remove_noise(text, stats)
    text = normalize_text(text, stats)
    text = fix_tables(text, stats)
    text = fix_formulas(text, stats)
    if is_sws_diagnostics_stem(stem):
        text = patch_missing_requirements(text, stem, stats)
    return text, stats


def process_file(path: Path, stem: str, *, dry_run: bool, backup: bool) -> FixStats | None:
    original = path.read_text(encoding="utf-8", errors="replace")
    updated, stats = fix_text(original, stem)
    if updated == original:
        return None

    if dry_run:
        return stats

    if backup:
        bak = path.with_suffix(path.suffix + ".bak")
        if not bak.exists():
            shutil.copy2(path, bak)
    path.write_text(updated, encoding="utf-8", newline="\n")
    return stats


def resolve_stems(version: str | None, stem: str | None) -> list[str]:
    if stem and version:
        raise SystemExit("Use only one of --stem or --version")
    if stem:
        return [stem]
    if version:
        matched = [s for s in VERSIONS if version in s]
        if not matched:
            raise SystemExit(f"No version matched: {version}")
        return matched
    return list(VERSIONS)


def main() -> None:
    parser = argparse.ArgumentParser(description="Fix DM markdown conversion artifacts.")
    parser.add_argument("--dry-run", action="store_true", help="Report changes without writing files.")
    parser.add_argument("--no-backup", action="store_true", help="Do not create .bak on first write.")
    parser.add_argument("--version", help="Process SWS Diagnostics versions matching token, e.g. R25-11.")
    parser.add_argument(
        "--stem",
        help="Process a single markdown stem directory name, e.g. AUTOSAR_AP_TPS_ManifestSpecification_R25-11.",
    )
    args = parser.parse_args()

    stems = resolve_stems(args.version, args.stem)

    total = FixStats()
    changed = 0
    for stem in stems:
        path = md_path(stem)
        if not path.exists():
            print(f"SKIP missing: {path}")
            continue
        stats = process_file(path, stem, dry_run=args.dry_run, backup=not args.no_backup)
        if stats is None:
            print(f"{stem}: no changes")
            continue
        changed += 1
        for key in FixStats.__dataclass_fields__:
            setattr(total, key, getattr(total, key) + getattr(stats, key))
        print(
            f"{stem}: noise={stats.block_markers + stats.page_numbers + stats.copyright_c_paren} "
            f"ocr={stats.apext + stats.sws_ids + stats.headings} "
            f"tables={stats.simple_tables}/{stats.complex_table_cells} "
            f"formulas={stats.known_s3 + stats.html_sub + stats.latex_blocks} "
            f"patched={stats.patched_reqs}"
        )

    mode = "dry-run" if args.dry_run else "write"
    print(f"TOTAL ({mode}): changed_files={changed} stats={total}")


if __name__ == "__main__":
    main()
