"""Analyze AUTOSAR AP Diagnostics spec evolution R19-R25 from markdown."""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "autosar" / "dm" / "markdown"
VERSIONS = [
    "AUTOSAR_AP_SWS_Diagnostics_R19-11",
    "AUTOSAR_AP_SWS_Diagnostics_R20-11",
    "AUTOSAR_AP_SWS_Diagnostics_R21-11",
    "AUTOSAR_AP_SWS_Diagnostics_R22-11",
    "AUTOSAR_AP_SWS_Diagnostics_R23-11",
    "AUTOSAR_AP_SWS_Diagnostics_R24-11",
    "AUTOSAR_AP_SWS_Diagnostics_R25-11",
]

REQ_RE = re.compile(r"\[SWS[_ ]DM[_ ](\d{5})\]", re.I)
SWS_LINE_RE = re.compile(r"^\s*##\s*\[SWS[_ ]DM[_ ](\d{5})\]", re.I | re.M)
HEADING_RE = re.compile(r"^##\s+(.+)$", re.M)
TOC_LINE_RE = re.compile(r"^(\d+(?:\.\d+)*)\s+(.+?)\s+\d+\s*$", re.M)
SERVICE_RE = re.compile(r"Service\s+0x([0-9A-Fa-f]{2})", re.I)
API_RE = re.compile(r"ara::diag::[A-Za-z0-9_]+|uds_transport::[A-Za-z0-9_]+")
SOVD_RE = re.compile(r"\bSOVD\b", re.I)
AUTH_RE = re.compile(r"\b(Authentication|DynamicAccessList|ClientAuthentication|ExternalAuthentication)\b")
SECURITY_EVENT_RE = re.compile(r"\bSecurityEvent\b", re.I)
CHANGE_RELEASE_RE = re.compile(
    r"(\d{4}-\d{2}-\d{2})</td><td[^>]*>(R\d{2}-\d{2}|19-03|18-10|18-03|17-10|17-03)</td>.*?<td[^>]*>([^<]+)</td><td[^>]*>([^<]+)</td>",
    re.S,
)


def read_text(stem: str) -> str:
    path = BASE / stem / f"{stem}.md"
    return path.read_text(encoding="utf-8", errors="replace")


def extract_req_ids(text: str) -> set[str]:
    return {m.zfill(5) for m in REQ_RE.findall(text)}


def extract_headings(text: str) -> list[str]:
  return [h.strip() for h in HEADING_RE.findall(text)]


def extract_toc_entries(text: str) -> list[str]:
    start = text.find("## Table of Contents")
    end = text.find("## Disclaimer", start + 1)
    if start == -1:
        return []
    if end == -1:
        end = start + 20000
    toc = text[start:end]
    entries = []
    for line in toc.splitlines():
        line = line.strip()
        if not line or line.startswith("##"):
            continue
        m = re.match(r"^(\d+(?:\.\d+)*)\s+(.+?)\s+\d+\s*$", line)
        if m:
            entries.append(f"{m.group(1)} {m.group(2).strip()}")
    return entries


def normalize_toc_key(entry: str) -> str:
    return re.sub(r"\s+", " ", entry.lower())


def extract_change_history(text: str) -> dict[str, str]:
    # Prefer R25 cumulative table if present
    releases = {}
    for m in re.finditer(
        r"<td[^>]*>(\d{4}-\d{2}-\d{2})</td><td[^>]*>(R\d{2}-\d{2}|19-03|18-10|18-03|17-10|17-03)</td><td[^>]*>([^<]+)</td><td[^>]*>([^<]+)</td>",
        text,
        re.S,
    ):
        date, release, _who, desc = m.groups()
        desc = re.sub(r"<[^>]+>", " ", desc)
        desc = re.sub(r"\s+", " ", desc).strip()
        if release.startswith("R") and release not in releases:
            releases[release] = desc
    return releases


def keyword_hits(text: str, keywords: list[str]) -> dict[str, int]:
    low = text.lower()
    return {k: low.count(k.lower()) for k in keywords}


def main() -> None:
    data: dict[str, dict] = {}
    req_by_ver: dict[str, set[str]] = {}
    toc_by_ver: dict[str, list[str]] = {}

    keywords = [
        "SOVD",
        "Authentication",
        "DynamicAccessList",
        "SecurityEvent",
        "DoIP",
        "Software Cluster",
        "Event Combination",
        "suppressed",
        "RequestFileTransfer",
        "0x29",
        "0x2A",
        "0x2C",
        "0x38",
        "MetaInfo",
        "no-debouncing",
        "Reentrancy",
        "Concurrency",
        "snapshot",
        "extended data",
        "IAM",
    ]

    for stem in VERSIONS:
        text = read_text(stem)
        ver = stem.split("_")[-1]
        req_ids = extract_req_ids(text)
        toc = extract_toc_entries(text)
        headings = extract_headings(text)
        req_by_ver[ver] = req_ids
        toc_by_ver[ver] = toc
        data[ver] = {
            "chars": len(text),
            "requirements": len(req_ids),
            "toc_entries": len(toc),
            "headings": len(headings),
            "services": sorted(set(SERVICE_RE.findall(text))),
            "apis": sorted(set(API_RE.findall(text))),
            "keywords": keyword_hits(text, keywords),
            "change_history": extract_change_history(text),
        }

    # Pairwise deltas
    pairwise = []
    ordered = [s.split("_")[-1] for s in VERSIONS]
    for i in range(1, len(ordered)):
        prev, cur = ordered[i - 1], ordered[i]
        added_req = sorted(req_by_ver[cur] - req_by_ver[prev], key=int)
        removed_req = sorted(req_by_ver[prev] - req_by_ver[cur], key=int)
        prev_toc = {normalize_toc_key(x): x for x in toc_by_ver[prev]}
        cur_toc = {normalize_toc_key(x): x for x in toc_by_ver[cur]}
        added_toc = [cur_toc[k] for k in cur_toc.keys() - prev_toc.keys()]
        removed_toc = [prev_toc[k] for k in prev_toc.keys() - cur_toc.keys()]
        pairwise.append(
            {
                "from": prev,
                "to": cur,
                "req_added": len(added_req),
                "req_removed": len(removed_req),
                "req_added_sample": added_req[:40],
                "req_removed_sample": removed_req[:40],
                "toc_added": added_toc[:30],
                "toc_removed": removed_toc[:30],
                "keyword_delta": {
                    k: data[cur]["keywords"][k] - data[prev]["keywords"][k]
                    for k in keywords
                    if data[cur]["keywords"][k] != data[prev]["keywords"][k]
                },
                "change_note": data[cur]["change_history"].get(cur, ""),
            }
        )

    r19, r25 = ordered[0], ordered[-1]
    overall = {
        "req_added_total": len(req_by_ver[r25] - req_by_ver[r19]),
        "req_removed_total": len(req_by_ver[r19] - req_by_ver[r25]),
        "req_net": len(req_by_ver[r25]) - len(req_by_ver[r19]),
        "req_added_sample": sorted(req_by_ver[r25] - req_by_ver[r19], key=int)[:80],
        "req_removed_sample": sorted(req_by_ver[r19] - req_by_ver[r25], key=int)[:80],
        "apis_added": sorted(set(data[r25]["apis"]) - set(data[r19]["apis"]))[:80],
        "apis_removed": sorted(set(data[r19]["apis"]) - set(data[r25]["apis"]))[:80],
        "services_added": sorted(set(data[r25]["services"]) - set(data[r19]["services"])),
        "services_removed": sorted(set(data[r19]["services"]) - set(data[r25]["services"])),
    }

    out = {
        "versions": data,
        "pairwise": pairwise,
        "overall_r19_to_r25": overall,
    }

    out_path = BASE.parent / "analysis" / "evolution_summary.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")

    # human-readable summary
    lines = ["# AUTOSAR AP Diagnostics Evolution Analysis (auto-generated)", ""]
    for ver in ordered:
        d = data[ver]
        lines.append(f"## {ver}")
        lines.append(
            f"- requirements: {d['requirements']}, toc entries: {d['toc_entries']}, chars: {d['chars']}"
        )
        ch = d["change_history"].get(ver)
        if ch:
            lines.append(f"- official change note: {ch}")
        lines.append("")
    lines.append("## Pairwise deltas")
    for p in pairwise:
        lines.append(
            f"### {p['from']} -> {p['to']}: +{p['req_added']} reqs, -{p['req_removed']} reqs"
        )
        if p["change_note"]:
            lines.append(f"- note: {p['change_note']}")
        if p["toc_added"]:
            lines.append("- toc added sample:")
            for t in p["toc_added"][:12]:
                lines.append(f"  - {t}")
        if p["keyword_delta"]:
            lines.append(f"- keyword delta: {p['keyword_delta']}")
        lines.append("")
    lines.append("## R19 -> R25 overall")
    lines.append(json.dumps(overall, indent=2, ensure_ascii=False))
    (BASE.parent / "analysis" / "evolution_summary.md").write_text(
        "\n".join(lines), encoding="utf-8"
    )
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
