# UDS 0x29 专题文档索引

本目录存放 **UDS `0x29 Authentication`** 的分析报告。ISO 14229-1:2020 把该服务分成两条机制；AUTOSAR AP Diagnostics **R25-11** 只标准化其中一条。

| 机制 | 全称 | 典型子功能 | R25 AP DM / CP DCM |
|------|------|------------|-------------------|
| **APCE** | Authentication with PKI Certificate Exchange | `0x00`–`0x04`、`0x08` | **标准化范围** |
| **ACR** | Authentication with Challenge-Response | 单向：`0x05` + `0x06`（双向另含 `0x07`） | **out of scope**（项目扩展） |

权威原文：AP SWS Diagnostics 见 [`autosar/dm/autosar/`](../autosar/)；ISO 14229-1:2020 见 [`autosar/dm/iso/`](../iso/)。本目录 Markdown 为分析结论与检索载体，不能替代官方 PDF。

---

## APCE 相关

R25 标准路径：PKI 证书交换子集。这些文档**不覆盖** ACR 报文字段与 challenge-response 实现。

| 文档 | 用途 |
|------|------|
| [AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md](./AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md) | APCE 主 Spec：范围边界、子功能、AR Catalog、测试与工作包 |
| [AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md](./AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md) | APCE 的 DEXT / AP Manifest 配置项清单。ACR 增量配置见下方配置清单 |

建议阅读顺序：APCE Spec → DEXT/Manifest 配置清单。

---

## ACR 相关

ISO 单向 ACR（`0x05` / `0x06`）。R25 无标准落点，下列文档是**项目扩展**用的差距、Spec、配置与模块拆分，不是 `ara::diag` 标准需求。

| 文档 | 用途 |
|------|------|
| [AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md](./AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md) | 相对 R25：DEXT / Manifest / `ara::diag` 缺什么、项目须冻结什么 |
| [AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md](./AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md) | ACR 单向功能 Spec：报文、状态机、NRC、需求 Catalog 与验收测试 |
| [UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md](./UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md) | 诊断栈与配置工具需新增的配置项清单 |
| [UDS_0x29_ACR_Unidirectional_Incremental_Module_Breakdown.md](./UDS_0x29_ACR_Unidirectional_Incremental_Module_Breakdown.md) | 在既有 UDS 栈上增量实现 ACR 的模块与需求拆分 |

建议阅读顺序：Gap → 单向 Spec → 配置清单 / 模块拆分。

---

## APCE 与 ACR 共用

与报文子功能解耦、或同时覆盖两条 ISO 机制的文档。

| 文档 | 为何两边都要用 |
|------|----------------|
| [ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md](./ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md) | ISO §10.6 全量摘译：§10.6.2 APCE、§10.6.3 ACR，以及通用请求/响应/NRC/消息流 |
| [AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md](./AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md) | 认证状态、Role / DAL、连接粒度、`ara::diag` 认证相关 C++ 约束。机制不绑定某条子功能；APCE 与项目 ACR 落地都依赖它 |

---

## 目录外相关材料

- 演进与安全方向总览：[AUTOSAR_AP_DM_Evolution_Report_R19-R25.md](../AUTOSAR_AP_DM_Evolution_Report_R19-R25.md)、[AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md](../AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md)（方向 3：安全与访问控制）
- ACR 流程可视化（Canvas，不在本目录）：[`../canvases/iso-14229-acr-auth-flow.canvas.tsx`](../canvases/iso-14229-acr-auth-flow.canvas.tsx)

**不要**把 APCE Spec 写成 ISO 全量 0x29，也不要把 CP DCM 的 0x29 能力写成 AP `ara::diag` 需求。
