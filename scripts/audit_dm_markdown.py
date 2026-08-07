"""Audit MinerU-converted DM specification markdown against known noise/OCR patterns and PDFs."""
# /// script
# requires-python = ">=3.11"
# dependencies = ["pypdf"]
# ///
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path

from dm_markdown_common import (
    AUDIT_DIR,
    BLOCK_MARKERS,
    DOCUMENT_ID_FOOTER_RE,
    MARKDOWN_DIR,
    VERSIONS,
    classify_tables,
    count_pattern,
    count_standalone_lines,
    count_standalone_page_numbers,
    extract_pdf_req_ids,
    extract_req_ids,
    find_broken_images,
    md_path,
    pdf_path,
    version_tag,
)

WRONG_HEADING_RE = re.compile(r"^## (Hints:|• )", re.M)
APEXT_RE = re.compile(r"apext::", re.I)
ARA_DIAG_SPACE_RE = re.compile(r"ara::\s+diag", re.I)
SWS_SPACE_RE = re.compile(r"\[SWS DM \d{5}\]")


def audit_version(stem: str, *, include_pdf: bool = True) -> dict:
    path = md_path(stem)
    text = path.read_text(encoding="utf-8", errors="replace")
    dest_dir = path.parent
    ver = version_tag(stem)

    simple_tables, complex_tables = classify_tables(text)
    md_ids = extract_req_ids(text)
    pdf_ids: set[str] = set()
    only_pdf: list[str] = []
    only_md: list[str] = []
    if include_pdf:
        pdf = pdf_path(stem)
        if pdf.exists():
            pdf_ids = extract_pdf_req_ids(pdf)
            only_pdf = sorted(pdf_ids - md_ids, key=int)
            only_md = sorted(md_ids - pdf_ids, key=int)

    return {
        "version": ver,
        "stem": stem,
        "path": str(path.relative_to(MARKDOWN_DIR.parent.parent.parent)),
        "chars": len(text),
        "lines": text.count("\n") + (1 if text and not text.endswith("\n") else 0),
        "requirements_md": len(md_ids),
        "requirements_pdf": len(pdf_ids),
        "only_pdf": only_pdf,
        "only_md": only_md,
        "noise": {
            "block_triangle_up": count_standalone_lines(text, BLOCK_MARKERS[0]),
            "block_triangle_down": count_standalone_lines(text, BLOCK_MARKERS[1]),
            "standalone_page_numbers": count_standalone_page_numbers(text),
            "copyright_c_paren": count_standalone_lines(text, "c()"),
            "document_id_footers": count_pattern(text, DOCUMENT_ID_FOOTER_RE),
        },
        "ocr": {
            "apext_colon_colon": count_pattern(text, APEXT_RE),
            "ara_diag_space": count_pattern(text, ARA_DIAG_SPACE_RE),
            "sws_dm_space_brackets": count_pattern(text, SWS_SPACE_RE),
            "wrong_h2_hints_or_bullet": count_pattern(text, WRONG_HEADING_RE),
        },
        "tables": {
            "simple": simple_tables,
            "complex": complex_tables,
            "total": simple_tables + complex_tables,
        },
        "images": {
            "refs": len(re.findall(r"!\[[^\]]*\]\([^)]+\)", text)),
            "broken": find_broken_images(text, dest_dir),
            "broken_count": len(find_broken_images(text, dest_dir)),
        },
        "formulas": {
            "html_sub_s3_fdc": len(
                re.findall(r"(?<!Document ID 723)(?<!AUTOSAR)(S3|FDC)<sub>", text, re.I)
            ),
            "broken_mathsf_spans": len(
                re.findall(
                    r"\$[^$]*\\mathsf\s*\{[^$]*\$",
                    text,
                )
            ),
        },
    }


def render_summary(results: list[dict], label: str) -> str:
    lines = [
        f"# DM Markdown Audit ({label})",
        "",
        f"Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "| Version | Chars | Reqs (MD/PDF) | only_pdf | △ | ▽ | page# | c() | apext:: | broken img | simple/complex tables |",
        "|---------|-------|---------------|----------|---|---|-------|-----|---------|------------|----------------------|",
    ]
    for r in results:
        n = r["noise"]
        o = r["ocr"]
        t = r["tables"]
        lines.append(
            f"| {r['version']} | {r['chars']:,} | {r['requirements_md']}/{r['requirements_pdf']} "
            f"| {len(r['only_pdf'])} | {n['block_triangle_up']} | {n['block_triangle_down']} "
            f"| {n['standalone_page_numbers']} | {n['copyright_c_paren']} | {o['apext_colon_colon']} "
            f"| {r['images']['broken_count']} | {t['simple']}/{t['complex']} |"
        )
    lines.append("")
    lines.append("## Per-version details")
    for r in results:
        lines.append(f"### {r['version']}")
        if r["only_pdf"]:
            lines.append(f"- **only_pdf**: {', '.join(r['only_pdf'])}")
        if r["only_md"]:
            lines.append(f"- **only_md**: {', '.join(r['only_md'])}")
        if r["images"]["broken"]:
            lines.append(f"- **broken images** ({len(r['images']['broken'])}): sample {r['images']['broken'][:5]}")
        lines.append("")
    lines.append("## Known limitations")
    lines.append("- PDF `extract_text()` is imperfect for multi-column layouts; requirement ID diff is authoritative at ID level only.")
    lines.append("- Complex HTML tables are counted but not validated for cell correctness.")
    lines.append("- Escaped IDs `[SWS\\_DM\\_xxxxx]` are normalized before counting.")
    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit DM markdown conversion quality.")
    parser.add_argument("--version", help="Audit a single version token, e.g. R25-11.")
    parser.add_argument("--no-pdf", action="store_true", help="Skip PDF requirement ID diff (faster).")
    parser.add_argument(
        "--label",
        default="",
        help="Report label suffix (e.g. before, after). Default: timestamp.",
    )
    args = parser.parse_args()

    stems = VERSIONS
    if args.version:
        stems = [s for s in VERSIONS if args.version in s]
        if not stems:
            raise SystemExit(f"No version matched: {args.version}")

    label = args.label or datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)

    results = [audit_version(stem, include_pdf=not args.no_pdf) for stem in stems]
    payload = {
        "label": label,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "versions": results,
    }

    json_path = AUDIT_DIR / f"audit_{label}.json"
    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    summary_path = AUDIT_DIR / f"audit_{label}.md"
    summary_path.write_text(render_summary(results, label), encoding="utf-8")

    print(f"Wrote {json_path}")
    print(f"Wrote {summary_path}")
    for r in results:
        n = r["noise"]
        print(
            f"{r['version']}: reqs={r['requirements_md']}/{r['requirements_pdf']} "
            f"only_pdf={len(r['only_pdf'])} △={n['block_triangle_up']} page#={n['standalone_page_numbers']}"
        )


if __name__ == "__main__":
    main()
