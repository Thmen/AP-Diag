# DM Markdown Audit (after)

Generated: 2026-07-22 10:14 UTC

| Version | Chars | Reqs (MD/PDF) | only_pdf | △ | ▽ | page# | c() | apext:: | broken img | simple/complex tables |
|---------|-------|---------------|----------|---|---|-------|-----|---------|------------|----------------------|
| R19-11 | 938,374 | 754/754 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/421 |
| R20-11 | 1,283,246 | 953/953 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/570 |
| R21-11 | 1,523,117 | 1120/1120 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/707 |
| R22-11 | 1,936,713 | 1419/1419 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/893 |
| R23-11 | 2,425,013 | 1774/1774 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/1216 |
| R24-11 | 2,807,884 | 1915/1915 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/1357 |
| R25-11 | 3,324,967 | 2207/2207 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0/1688 |

## Per-version details
### R19-11

### R20-11

### R21-11

### R22-11

### R23-11

### R24-11

### R25-11

## Known limitations
- PDF `extract_text()` is imperfect for multi-column layouts; requirement ID diff is authoritative at ID level only.
- Complex HTML tables are counted but not validated for cell correctness.
- Escaped IDs `[SWS\_DM\_xxxxx]` are normalized before counting.
