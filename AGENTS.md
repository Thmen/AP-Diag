# AGENTS.md — AP-DM

面向本仓库的 Agent 工作指引。优先读本文件，再改代码或写分析文档。

## 项目是什么

研究 **AUTOSAR Adaptive Platform Diagnostic Management（DM）** 规范演进（文档编号 723，*Specification of Diagnostics*）。

当前重点：

- 收集官方 PDF（R19-11 … R25-11）
- 用 MinerU 转为可检索 Markdown
- 做跨版本演进分析，产出技术报告（SOVD、五大方向、演进总览等）

这不是运行时 DM 实现仓库；默认产出是**规范分析文档**与**辅助脚本**，除非用户明确要求写实现代码。

## 目录约定

```
AP-DM/
├── AGENTS.md
├── autosar/dm/
│   ├── *.pdf                          # 官方规范 PDF（权威原文）
│   ├── markdown/AUTOSAR_AP_SWS_Diagnostics_Rxx-11/
│   │   └── AUTOSAR_AP_SWS_Diagnostics_Rxx-11.md   # MinerU 转换正文
│   └── analysis/                      # 人工/半自动分析报告（主要交付物）
├── scripts/
│   ├── mineru_batch_convert.ps1       # PDF → Markdown 批量转换
│   └── analyze_dm_evolution.py        # 跨版本需求/关键词统计
```

| 路径 | 角色 | 可否随意改 |
|------|------|------------|
| `autosar/dm/*.pdf` | 权威原文 | 否（只增补官方版本） |
| `autosar/dm/markdown/**` | PDF 机器转换结果 | 勿手工大改；需重转则用脚本覆盖 |
| `autosar/dm/analysis/**` | 分析结论与报告 | 是（主工作区） |
| `scripts/**` | 转换与分析工具 | 是（保持可复现） |

## 权威性与引用规则

1. **结论以官方 PDF / Change History 为准**；Markdown 仅作检索与摘录载体。
2. 引用需求时使用规范 ID：`[SWS_DM_xxxxx]`（五位数字）。
3. MinerU（`parse_method=txt`）可能造成表格噪声、API 名粘连、目录缺失；**不得凭单次文本匹配断言“需求被删除”或“API 不存在”**，应多版本交叉核对。
4. 分析文档须标明：数据来源路径、覆盖版本（如 R19–R25）、方法局限。

## 常用工作流

### A. PDF → Markdown

- 脚本：`scripts/mineru_batch_convert.ps1`
- 默认 API：`http://192.168.12.29:8000`（异步 `/tasks`）
- 推荐参数：`backend=pipeline`，`parse_method=txt`，分页块转换（避免 OOM）
- 输出：`autosar/dm/markdown/<stem>/<stem>.md`（及图片资源）
- 环境：Windows PowerShell 5.1（`powershell.exe`）；页数统计用 `uv run --with pypdf`
- 可选后处理：加 `-PostProcess` 会调用 `fix_dm_markdown.py --stem <pdf stem>`（SWS 与 TPS 等均可；仅 SWS Diagnostics 会补丁缺失需求 ID）

```powershell
# 本仓库默认环境为 Windows PowerShell 5.1（powershell.exe）。
# 若已安装 PowerShell 7+，也可用 pwsh，但勿假定本机一定有 pwsh。
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/mineru_batch_convert.ps1
# 转换后顺带清洗 MinerU 噪声：
# powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/mineru_batch_convert.ps1 -PostProcess
# 一次转换超过 3 个 PDF 时需显式 -AllowMany（避免误清已有 markdown）
```

勿默认改用 `hybrid-engine`（该环境曾因设备配置失败）。改 API 地址或转换策略须经用户确认。

### B. 跨版本演进统计

```powershell
uv run scripts/analyze_dm_evolution.py
```

- 输入：`autosar/dm/markdown/AUTOSAR_AP_SWS_Diagnostics_R*-11/*.md`
- 输出：`autosar/dm/analysis/evolution_summary.md` 与 `.json`（自动生成，可被覆盖）
- 正式叙事报告写在 `AUTOSAR_AP_DM_*.md` / `SOVD_*.md`，不要只停在 summary

### C. 撰写/更新分析报告

放在 `autosar/dm/analysis/`，中文为主，结构清晰：目的 → 方法 → 发现 → 对 DM 实现的含义。

既有主文档：

- `AUTOSAR_AP_DM_Evolution_Report_R19-R25.md` — 总演进
- `AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md` — 五大技术方向
- `SOVD_Technical_Introduction.md` — SOVD 技术介绍

新增报告应与上述交叉链接，避免重复堆砌同一结论。

## 领域术语（写作时保持一致）

| 术语 | 含义 |
|------|------|
| DM | Diagnostic Management（AP 诊断管理） |
| UDS | ISO 14229 统一诊断服务 |
| DoIP | ISO 13400 以太网诊断传输 |
| SOVD | Service-Oriented Vehicle Diagnostics（ASAM / 趋向 ISO 17978） |
| DEXT | 诊断配置（Diagnostic Extract） |
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
- Python：用 **`uv run`**，不用裸 `python` / `pip`（除非用户明确要求）。
- 大文件：规范 Markdown 可达数百万字符；优先 `rg`/定向读取，避免整文件无目的载入上下文。
- 不要提交密钥；MinerU 地址若变更，写进脚本参数或本地配置，勿写死到分析正文里当作规范内容。

## Agent 行为边界

- **先检索再断言**：谈某服务/API/需求时，先在对应版本 Markdown 中定位，再写进报告。
- **最小改动**：不重构无关脚本；不批量“美化”转换 Markdown。
- **不把临时目录当交付物**：结论与图表应落在 `analysis/`。
- **语言**：与用户及分析文档默认使用**简体中文**；规范专有名词、需求 ID、API 名保留英文原文。
- **Git**：仅在用户明确要求时提交/推送。

## 快速自检

改完分析或脚本后自问：

1. 引用的版本与路径是否正确？  
2. 是否区分了“脚本统计结果”与“经 Change History 核实的结论”？  
3. 是否误改了 `markdown/` 或 PDF？  
4. 新结论是否链回已有演进/五大方向/SOVD 文档？  
