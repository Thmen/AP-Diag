# DM Markdown Audit (before)

Generated: 2026-07-22 10:09 UTC

| Version | Chars | Reqs (MD/PDF) | only_pdf | △ | ▽ | page# | c() | apext:: | broken img | simple/complex tables |
|---------|-------|---------------|----------|---|---|-------|-----|---------|------------|----------------------|
| R19-11 | 942,898 | 754/754 | 0 | 0 | 0 | 92 | 46 | 0 | 0 | 26/421 |
| R20-11 | 1,287,316 | 953/953 | 0 | 0 | 0 | 133 | 35 | 0 | 0 | 23/570 |
| R21-11 | 1,528,296 | 1120/1120 | 0 | 0 | 0 | 175 | 0 | 0 | 0 | 33/707 |
| R22-11 | 1,941,355 | 1419/1419 | 0 | 0 | 0 | 216 | 0 | 0 | 0 | 18/893 |
| R23-11 | 2,431,946 | 1774/1774 | 0 | 0 | 0 | 310 | 17 | 0 | 0 | 41/1216 |
| R24-11 | 2,815,253 | 1914/1915 | 1 | 0 | 0 | 320 | 0 | 228 | 0 | 26/1357 |
| R25-11 | 3,333,603 | 2207/2207 | 0 | 383 | 10 | 0 | 0 | 255 | 0 | 45/1688 |

## Per-version details
### R19-11

### R20-11

### R21-11

### R22-11

### R23-11

### R24-11
- **only_pdf**: 02061

### R25-11

## Known limitations
- PDF `extract_text()` is imperfect for multi-column layouts; requirement ID diff is authoritative at ID level only.
- Complex HTML tables are counted but not validated for cell correctness.
- Escaped IDs `[SWS\_DM\_xxxxx]` are normalized before counting.
