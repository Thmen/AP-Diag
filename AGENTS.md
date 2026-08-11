# AGENTS.md — AP-DM

面向本仓库的 Agent 工作指引。优先读本文件，再改代码或写分析文档。

## 项目是什么

研究 **AUTOSAR Adaptive Platform Diagnostic Management（DM）** 规范演进（文档编号 723，*Specification of Diagnostics*）。

当前重点：

- 收集官方 PDF（R19-11 … R25-11；含相关 TPS）
- 用 MinerU 转为可检索 Markdown
- 做跨版本演进分析，产出技术报告（SOVD、五大方向、演进总览、0x29 等）

这不是运行时 DM 实现仓库；默认产出是**规范分析文档**与**辅助脚本**，除非用户明确要求写实现代码。

## 目录约定

```
AP-DM/
├── AGENTS.md
├── autosar/dm/
│   ├── autosar/                       # AUTOSAR 官方规范 PDF（权威原文）
│   │   ├── AUTOSAR_AP_SWS_Diagnostics_Rxx-11.pdf
│   │   ├── AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf
│   │   └── AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11.pdf
│   ├── iso/                           # 相关 ISO 标准 PDF（如 ISO 14229-1）
│   ├── markdown/                      # 机器转换 Markdown（含 AUTOSAR / ISO stem）
│   │   ├── AUTOSAR_AP_SWS_Diagnostics_Rxx-11/
│   │   │   ├── <stem>.md              # 进 Git
│   │   │   ├── images.tar             # 进 Git LFS（散图打包）
│   │   │   ├── images.sha256          # 进 Git（增量指纹）
│   │   │   └── images/                # 本地解压；gitignore
│   │   ├── ISO_14229-1-2020/          # 文件名含空格的 PDF 转换时用无空格 stem
│   │   └── _audit/                    # Markdown 审计快照（可选证据）
│   └── analysis/                      # 人工/半自动分析报告（主要交付物）
│       ├── AUTOSAR_AP_DM_*.md
│       ├── evolution_summary.md|.json # 脚本自动生成，可覆盖
│       └── canvases/                  # Cursor Canvas 可视化（若有）
├── scripts/                           # 唯一 Python 项目根（勿在仓库顶层再建 .venv）
│   ├── pyproject.toml / uv.lock       # uv 依赖锁（当前主要是 pypdf）
│   ├── .venv/                         # 本地环境（gitignore；由 uv sync 生成）
│   ├── mineru_batch_convert.ps1       # PDF → Markdown 批量转换
│   ├── pack_markdown_images.py        # images/ → images.tar（增量）
│   ├── unpack_markdown_images.py      # images.tar → images/（增量）
│   ├── fix_dm_markdown.py             # MinerU 噪声清洗（可选后处理）
│   ├── audit_dm_markdown.py           # Markdown vs PDF 审计
│   ├── dm_markdown_common.py          # 审计/清洗共享工具
│   ├── markdown_image_bundles.py      # 图片打包/解压共享逻辑
│   └── analyze_dm_evolution.py        # 跨版本需求/关键词统计
```

| 路径 | 角色 | 可否随意改 |
|------|------|------------|
| `autosar/dm/autosar/*.pdf` | AUTOSAR 权威原文 | 否（只增补官方版本） |
| `autosar/dm/iso/*.pdf` | 相关 ISO 原文 | 否（只增补已获授权副本） |
| `autosar/dm/markdown/**` | PDF 机器转换结果 | 勿手工大改；需重转则用脚本覆盖 |
| `autosar/dm/analysis/**` | 分析结论与报告 | 是（主工作区） |
| `scripts/pyproject.toml` / `uv.lock` | 脚本依赖契约 | 可改，但须 `uv lock` 并保持可复现 |
| `scripts/**`（其余） | 转换与分析工具 | 是（保持可复现） |

## 权威性与引用规则

1. **结论以官方 PDF / Change History 为准**；Markdown 仅作检索与摘录载体。
2. 引用需求时使用规范 ID：`[SWS_DM_xxxxx]`（五位数字）。
3. MinerU（`parse_method=txt`）可能造成表格噪声、API 名粘连、目录缺失；**不得凭单次文本匹配断言“需求被删除”或“API 不存在”**，应多版本交叉核对。
4. 分析文档须标明：数据来源路径、覆盖版本（如 R19–R25）、方法局限。
5. 引用 AUTOSAR PDF 时使用 `autosar/dm/autosar/<stem>.pdf`（或从 `analysis/` 相对路径 `../autosar/<stem>.pdf`）；引用 ISO 时使用 `autosar/dm/iso/<文件名>.pdf`，并注明版本（如 ISO 14229-1:2020）。

## 常用工作流

### A. PDF → Markdown

- 脚本：`scripts/mineru_batch_convert.ps1`
- 默认 PDF 目录：`autosar/dm/autosar`；ISO 等非默认来源须显式 `-PdfDir`
- 默认输出：`autosar/dm/markdown/<stem>/<stem>.md`（及图片资源）
- 默认 API：`http://192.168.12.29:8000`（异步 `/tasks`）
- 推荐参数：`backend=pipeline`，`parse_method=txt`，分页块转换（避免 OOM）
- 环境：Windows PowerShell 5.1（`powershell.exe`）；页数统计 / Python 脚本优先 `uv run --project scripts ...`
- 文件名含空格的 PDF：先复制到 `.convert_*/` 下的无空格 stem 再转（该目录已 gitignore）
- 可选后处理：加 `-PostProcess` 会调用 `fix_dm_markdown.py --stem <pdf stem>`（SWS 与 TPS 等均可；仅 SWS Diagnostics 会补丁缺失需求 ID）
- 转换出图后须打包再提交：`uv run --project scripts scripts/pack_markdown_images.py`（增量；仅变更的 stem 会重写 `images.tar`）
- 批次中间产物：`markdown/batch_run.log`、`batch_report.md`、`batch_report.json`（已 gitignore，勿提交）

```powershell
# 本仓库默认环境为 Windows PowerShell 5.1（powershell.exe）。
# 若已安装 PowerShell 7+，也可用 pwsh，但勿假定本机一定有 pwsh。
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/mineru_batch_convert.ps1
# 转换后顺带清洗 MinerU 噪声：
# powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/mineru_batch_convert.ps1 -PostProcess
# 一次转换超过 3 个 PDF 时需显式 -AllowMany（避免误清已有 markdown）
# ISO 示例：
# powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/mineru_batch_convert.ps1 -PdfDir autosar\dm\.convert_iso_14229
# 打包 images/ → images.tar（LFS；增量跳过未变更 stem）：
uv run --project scripts scripts/pack_markdown_images.py
```

勿默认改用 `hybrid-engine`（该环境曾因设备配置失败）。改 API 地址或转换策略须经用户确认。

### B. Markdown 图片包（LFS）

散图 `markdown/<stem>/images/` **不进库**（gitignore）；每个 stem 同目录存放：

- `images.tar` — 未压缩 tar，Git LFS
- `images.sha256` — 树指纹，供增量跳过

```powershell
# 打包（转换后 / 提交前）
uv run --project scripts scripts/pack_markdown_images.py
# 仅某一 stem；强制重打：
# uv run --project scripts scripts/pack_markdown_images.py --stem AUTOSAR_AP_SWS_Diagnostics_R25-11 --force

# clone / pull 后解压到本地 images/
uv run --project scripts scripts/unpack_markdown_images.py
# git lfs pull 后再 unpack；若只要 PDF：git lfs pull --include="*.pdf"
```

指纹未变且 `images.tar` 已存在时 pack 会 SKIP；本地 `images/` 指纹已匹配时 unpack 会 SKIP。

### C. 跨版本演进统计

```powershell
uv run --project scripts scripts/analyze_dm_evolution.py
```

- 输入：`autosar/dm/markdown/AUTOSAR_AP_SWS_Diagnostics_R*-11/*.md`
- 输出：`autosar/dm/analysis/evolution_summary.md` 与 `.json`（自动生成，可被覆盖）
- 正式叙事报告写在 `AUTOSAR_AP_DM_*.md`，不要只停在 summary

### D. 撰写/更新分析报告

放在 `autosar/dm/analysis/`，中文为主，结构清晰：目的 → 方法 → 发现 → 对 DM 实现的含义。

既有主文档（统一 `AUTOSAR_AP_DM_` 前缀）：

- `AUTOSAR_AP_DM_Evolution_Report_R19-R25.md` — 总演进
- `AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md` — 五大技术方向
- `AUTOSAR_AP_DM_SOVD_Technical_Introduction.md` — SOVD 技术介绍
- `AUTOSAR_AP_DM_R25_UDS_0x29_Authentication_Spec.md` — UDS 0x29（APCE 子集）规范级分析
- `AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md` — 0x29 相关 DEXT / AP Manifest 配置项清单

新增报告应与上述交叉链接，避免重复堆砌同一结论。

## 领域术语（写作时保持一致）

| 术语 | 含义 |
|------|------|
| DM | Diagnostic Management（AP 诊断管理） |
| UDS | ISO 14229 统一诊断服务 |
| DoIP | ISO 13400 以太网诊断传输 |
| SOVD | Service-Oriented Vehicle Diagnostics（ASAM / 趋向 ISO 17978） |
| DEXT | 诊断配置（Diagnostic Extract）；共享模型见 CP TPS，AP 专属见 Manifest TPS |
| `ara::diag` | AP 诊断 C++ API 命名空间 |

版本写法统一为 `R19-11` … `R25-11`（或叙述中的 R19/R25）。

五大演进方向（分析框架，勿随意改名）：

1. 传输与协议扩展  
2. SOVD 引入与成熟  
3. 安全与访问控制  
4. 事件/DTC 能力增强  
5. 工程化与平台一致性  

## 编码与运行约定

- Shell：**PowerShell** 语法；路径用本机绝对或仓库相对路径均可，但脚本内默认相对仓库根。
- Python / uv（硬约束）：
  - 用 **`uv run`**，不用裸 `python` / `pip`（除非用户明确要求）。
  - **唯一项目环境**在 `scripts/`：`pyproject.toml` + `uv.lock`；本地解释器为 `scripts/.venv`（`uv sync --project scripts`）。
  - **禁止**在仓库顶层再建 `.venv` 或顶层 `pyproject.toml`（避免与 `scripts/` 双环境、双版本漂移）。
  - 推荐：`uv run --project scripts <script>.py ...`；带 PEP 723 内联依赖的脚本仍可 `uv run scripts/<script>.py` 独立跑。
  - IDE / 语言服务解释器应指向 `scripts\.venv\Scripts\python.exe`。
  - 增删依赖：在 `scripts/` 下 `uv add` / `uv remove`，并提交更新后的 `uv.lock`。
- 大文件：规范 Markdown 可达数百万字符；优先 `rg`/定向读取，避免整文件无目的载入上下文。
- 不要提交密钥；MinerU 地址若变更，写进脚本参数或本地配置，勿写死到分析正文里当作规范内容。
- 本地临时/中间产物已在 `.gitignore`，**勿提交、勿当交付物**：`.tmp-mineru-test/`、`.work_*/`、`.convert_*/`、`*.bak`、`*.log`、`batch_report.md`、`batch_report.json`、`scripts/.venv/`。

## Agent 行为边界

- **先检索再断言**：谈某服务/API/需求时，先在对应版本 Markdown 中定位，再写进报告。
- **最小改动**：不重构无关脚本；不批量“美化”转换 Markdown。
- **不把临时目录当交付物**：结论与图表应落在 `analysis/`；转换日志与 batch 报告可删。
- **语言**：与用户及分析文档默认使用**简体中文**；规范专有名词、需求 ID、API 名保留英文原文。
- **Git**：仅在用户明确要求时提交/推送。

## 快速自检

改完分析或脚本后自问：

1. 引用的版本与路径是否正确（AUTOSAR PDF 在 `autosar/dm/autosar/`，ISO 在 `iso/`，Markdown 在 `markdown/`）？  
2. 是否区分了“脚本统计结果”与“经 Change History 核实的结论”？  
3. 是否误改了 `markdown/` 或 PDF？是否误提交了 `.convert_*` / `batch_*` / `.venv`？  
4. Python 是否走 `uv run --project scripts`，且未在顶层重建 `.venv`？  
5. 新结论是否链回已有演进/五大方向/SOVD/0x29 文档？  
