"""Shared utilities for DM markdown audit and fix scripts."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "autosar" / "dm"
MARKDOWN_DIR = ROOT / "autosar" / "dm" / "markdown"
AUDIT_DIR = MARKDOWN_DIR / "_audit"

VERSIONS = [
    "AUTOSAR_AP_SWS_Diagnostics_R19-11",
    "AUTOSAR_AP_SWS_Diagnostics_R20-11",
    "AUTOSAR_AP_SWS_Diagnostics_R21-11",
    "AUTOSAR_AP_SWS_Diagnostics_R22-11",
    "AUTOSAR_AP_SWS_Diagnostics_R23-11",
    "AUTOSAR_AP_SWS_Diagnostics_R24-11",
    "AUTOSAR_AP_SWS_Diagnostics_R25-11",
]

REQ_RE = re.compile(r"\[SWS\\?_DM\\?_(\d{5})\]", re.I)
REQ_RE_NORMALIZED = re.compile(r"\[SWS_DM_(\d{5})\]", re.I)

TABLE_RE = re.compile(r"<table\b[^>]*>.*?</table>", re.I | re.S)
IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")

BLOCK_MARKERS = ("△", "▽")
DOCUMENT_ID_FOOTER_RE = re.compile(
    r"<sub>\s*Document ID 723:\s*AUTOSAR\\?_SWS\\?_Diagnostics\s*</sub>",
    re.I,
)


def version_tag(stem: str) -> str:
    return stem.split("_")[-1]


def md_path(stem: str) -> Path:
    return MARKDOWN_DIR / stem / f"{stem}.md"


def pdf_path(stem: str) -> Path:
    return PDF_DIR / f"{stem}.pdf"


def normalize_req_ids_in_text(text: str) -> str:
    """Normalize escaped / spaced SWS requirement IDs for counting."""
    text = re.sub(r"\[SWS\\_DM\\_(\d{5})\]", r"[SWS_DM_\1]", text, flags=re.I)
    text = re.sub(r"\[SWS DM (\d{5})\]", r"[SWS_DM_\1]", text, flags=re.I)
    text = re.sub(r"\[SWS_DM_(\d{5})\]", r"[SWS_DM_\1]", text, flags=re.I)
    return text


def extract_req_ids(text: str, *, normalized: bool = True) -> set[str]:
    source = normalize_req_ids_in_text(text) if normalized else text
    return {m.zfill(5) for m in REQ_RE_NORMALIZED.findall(source)}


def extract_pdf_text(pdf: Path) -> str:
    from pypdf import PdfReader

    parts: list[str] = []
    for page in PdfReader(str(pdf)).pages:
        parts.append(page.extract_text() or "")
    return "\n".join(parts)


def extract_pdf_req_ids(pdf: Path) -> set[str]:
    return extract_req_ids(extract_pdf_text(pdf))


def find_broken_images(text: str, dest_dir: Path) -> list[str]:
    broken: list[str] = []
    for match in IMG_RE.finditer(text):
        ref = match.group(1).strip().strip('"').strip("'")
        if ref.startswith(("http://", "https://", "data:")):
            continue
        rel = ref.removeprefix("./")
        candidate = dest_dir / rel
        if candidate.exists():
            continue
        alt = dest_dir / "images" / Path(rel).name
        if alt.exists():
            continue
        broken.append(ref)
    return broken


def count_pattern(text: str, pattern: str | re.Pattern[str]) -> int:
    if isinstance(pattern, str):
        return text.count(pattern)
    return len(pattern.findall(text))


def count_standalone_lines(text: str, value: str) -> int:
    return sum(1 for line in text.splitlines() if line.strip() == value)


def count_standalone_page_numbers(text: str) -> int:
    lines = text.splitlines()
    count = 0
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not re.fullmatch(r"\d{1,4}", stripped):
            continue
        prev = lines[i - 1].strip() if i > 0 else ""
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        prev_ok = not prev or prev.endswith("</table>") or prev.startswith("<table")
        next_ok = not nxt or nxt.startswith("<table") or nxt == BLOCK_MARKERS[0] or nxt == BLOCK_MARKERS[1]
        if prev_ok and next_ok:
            count += 1
    return count


def classify_tables(text: str) -> tuple[int, int]:
    simple = 0
    complex_ = 0
    for match in TABLE_RE.finditer(text):
        html = match.group(0)
        if is_simple_table_html(html):
            simple += 1
        else:
            complex_ += 1
    return simple, complex_


def is_simple_table_html(html: str) -> bool:
    if re.search(r"rowspan|colspan", html, re.I):
        return False
    if re.search(r"<table\b", html, re.I) and html.lower().count("<table") > 1:
        return False
    rows = re.findall(r"<tr\b[^>]*>(.*?)</tr>", html, re.I | re.S)
    if len(rows) < 1:
        return False
    col_counts: list[int] = []
    for row in rows:
        cells = re.findall(r"<t[dh]\b[^>]*>(.*?)</t[dh]>", row, re.I | re.S)
        if not cells:
            return False
        col_counts.append(len(cells))
    if len(set(col_counts)) != 1:
        return False
    cols = col_counts[0]
    return 2 <= cols <= 6
