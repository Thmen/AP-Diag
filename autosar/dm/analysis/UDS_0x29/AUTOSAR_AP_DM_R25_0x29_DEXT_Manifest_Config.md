# AUTOSAR R25-11 UDS 0x29：DEXT 与 AP Manifest 配置项清单

> **范围**：整理规范对 `0x29 Authentication`（APCE/PKI 子集）施加约束的 **Diagnostic Extract（DEXT）** 与 **AP Manifest** 配置项。  
> **不覆盖**：ISO 14229 报文字节布局、完整 NRC 集、证书/算法参数、ACR（challenge-response）、OEM 专有扩展。

| 文档属性 | 值 |
|---|---|
| 文档版本 | `0.1` |
| 状态 | 配置清单基线（规范摘录整理） |
| 基线 | AUTOSAR Adaptive Platform Diagnostics R25-11；CP Diagnostic Extract Template R25-11；AP Manifest Specification R25-11 |
| 分析日期 | 2026-08-07 |
| 关联 Spec | [AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md](./AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md)（§6 API/DEXT、AR29-CFG-*、PD29-*） |
| ACR 增量配置 | 本文范围为 **APCE**。若项目要新增 ACR（`0x05`/`0x06`），配置增量见 [UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md](./UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md)（12 组 95 条，含 Crypto / Persistency / IdsM 宿主与无标准落点项） |
| 机制与 API 参考 | [AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md](./AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md)（Role/DAL 配置粒度与判定、`constr_10038`、C++ 接口约束） |
| 演进背景 | [AUTOSAR_AP_DM_Evolution_Report_R19-R25.md](../AUTOSAR_AP_DM_Evolution_Report_R19-R25.md)、[AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md](../AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md)（方向 3：安全与访问控制） |

## 目录

- [1. 目的与方法](#1-目的与方法)
- [2. 配置分层总览](#2-配置分层总览)
- [3. DEXT：0x29 服务实例](#3-dext0x29-服务实例)
- [4. DEXT：Role 与访问许可](#4-dextrole-与访问许可)
- [5. DEXT / Manifest：公共属性与客户端识别](#5-dext--manifest公共属性与客户端识别)
- [6. AP Manifest：PortInterface 与 PortMapping](#6-ap-manifestportinterface-与-portmapping)
- [7. CP 专用项（AP 实现勿照搬）](#7-cp-专用项ap-实现勿照搬)
- [8. 规范约束对照表](#8-规范约束对照表)
- [9. 配置落地检查清单](#9-配置落地检查清单)
- [10. 方法局限与命名注意](#10-方法局限与命名注意)
- [11. 附录：数据来源](#11-附录数据来源)

## 1. 目的与方法

### 1.1 目的

为 DEXT/Manifest 集成与 DM 配置校验提供可勾选的配置项清单：哪些元类/属性属于 0x29 约束面、多重性如何、AP 与 CP 差异、以及对应的 SWS/TPS/constr 依据。行为级 AR/TC 仍以关联 Spec 为准，本文不重复协议状态机。

### 1.2 方法

1. 以官方 PDF 为权威；以 Markdown 作检索与摘录载体。  
2. DEXT 共享模型优先对照 CP TPS；AP 专属 Port/客户端识别对照 Manifest TPS；运行时行为对照 AP SWS Diagnostics。  
3. 区分：**共享 DEXT**、**仅 AP**、**仅 CP**。  
4. 不因 MinerU 表格噪声断言“属性不存在”；子类表在 SWS Annex 中若为空壳，以 CP TPS / Manifest Annex 交叉确认。

### 1.3 覆盖版本

| 规范 | 路径 |
|---|---|
| AP SWS Diagnostics R25-11 | [`autosar/dm/autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf`](../autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf) |
| CP TPS Diagnostic Extract Template R25-11 | [`autosar/dm/autosar/AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11.pdf`](../autosar/AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11.pdf) |
| AP TPS Manifest Specification R25-11 | [`autosar/dm/autosar/AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf`](../autosar/AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf) |

对应 Markdown：`autosar/dm/markdown/<stem>/<stem>.md`。

## 2. 配置分层总览

```text
┌─────────────────────────────────────────────────────────────┐
│ DiagnosticContributionSet / DiagnosticCommonProps           │
│  · authenticationTimeout                                    │
│  · externalAuthentication[]  (AP only)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│ DEXT 服务实例：DiagnosticAuthentication 六子类               │
│  0x00 DeAuth | 0x01 Uni | 0x02 Bi | 0x03 PoO                │
│  0x04 TxCert(+evaluationId) | 0x08 AuthConfig               │
└───────────────────────────┬─────────────────────────────────┘
                            │ accessPermission
┌───────────────────────────▼─────────────────────────────────┐
│ Role / Gate：DiagnosticAuthRole + AccessPermission          │
│  authenticationEnabled → AuthRoleProxy → authenticationRole │
└───────────────────────────┬─────────────────────────────────┘
                            │ (AP) PortMapping
┌───────────────────────────▼─────────────────────────────────┐
│ Manifest：Authentication / TransmitCertificate /            │
│           ExternalAuthentication Interface + Mapping        │
│  → InstanceSpecifier → ara::diag::* API                     │
└─────────────────────────────────────────────────────────────┘
```

| 层 | 作用 | 主要载体 |
|---|---|---|
| DEXT 服务实例 | 声明支持哪些 0x29 子功能 | `DiagnosticAuthentication` 及其子类 |
| DEXT 授权模型 | Role、AccessPermission、DAL 门禁挂载点 | `DiagnosticAuthRole*`、`DiagnosticAccessPermission` |
| DEXT 公共属性 | 超时、外部认证客户端集合 | `DiagnosticCommonProps` |
| AP Manifest | 绑定应用 Port / Process / InstanceSpecifier | PortInterface + PortMapping |
| CP-only | CEID→Crypto 证书映射、`function` 语义 | 见 §7 |

## 3. DEXT：0x29 服务实例

### 3.1 抽象类与共享类

| 元类 | 属性 | Mult. | 说明 |
|---|---|---|---|
| `DiagnosticAuthentication`（abstract） | `authenticationClass` → `DiagnosticAuthenticationClass` | 0..1 | 服务实例抽象基类；子类即子功能 |
| `DiagnosticAuthenticationClass` | （R25 表中无专有属性） | — | 共享于所有 Authentication 实例的 class 角色；`[TPS_DEXT_01158]` |
| `DiagnosticServiceInstance`（基） | `accessPermission` | 0..\* | 允许执行该服务实例的访问许可 |
| | `serviceClass` | 0..1 | 抽象 class 引用；Authentication 侧由 `authenticationClass` 实质化 |

推荐包名：`DiagnosticAuthentications`（及 TxCert 的 `DiagnosticAuthTransmitCertificates`）。

### 3.2 六子类 ↔ 子功能

| 元类 | SF | 专有配置项 | 配置约束 |
|---|---|---|---|
| `DiagnosticDeAuthentication` | `0x00` | 无 | 配置任一 verify/PoO 时必选 `[SWS_DM_01228]` |
| `DiagnosticVerifyCertificateUnidirectional` | `0x01` | 无 | 与 `0x02` 可选其一；PoO 至少要求其一 `[SWS_DM_01227]` |
| `DiagnosticVerifyCertificateBidirectional` | `0x02` | 无 | 同上 |
| `DiagnosticProofOfOwnership` | `0x03` | 无 | 若配置则必须配一种 verify `[SWS_DM_01227]` |
| `DiagnosticAuthTransmitCertificate` | `0x04` | `certificateEvaluation`（0..\*） | **不被** `01228` 强制；可独立配置 |
| `DiagnosticAuthenticationConfiguration` | `0x08` | 无 | 配置任一 verify/PoO 时必选 `[SWS_DM_01228]` |

**DEXT 更严约束**：`[constr_10091]` 规定——若支持 Authentication 服务，则必须配置 DeAuth、PoO、AuthConfig，以及 Uni/Bi 之一。项目校验器应同时对照 SWS 条件强制与 DEXT 全局强制，避免工具链不一致。

**范围**：仅 PKI certificate exchange；ACR out of scope（`[SWS_DM_01226]`、`[TPS_DEXT_01159]`）。

子类本身几乎不承载报文参数；字节布局属 ISO，不在 DEXT。

### 3.3 TransmitCertificate / CEID

正式元类名（TPS/Manifest）：`DiagnosticAuthTransmitCertificateEvaluation`。  
SWS 正文路径常写作 `DiagnosticAuthTransmitCertificate.DiagnosticAuthCertificateEvaluation.evaluationId`——检索时两种写法均需覆盖，配置以 TPS 元模型为准。

| 属性 | Mult. | AP | CP | 运行时含义 |
|---|---|---|---|---|
| `evaluationId` | 0..1 | ✓ | ✓ | 支持的 CEID；未命中 → NRC `0x31`，不调用应用 `[SWS_DM_01247]`、`[TPS_DEXT_01192]` |
| `function` | 0..1 | ✗（仅 CP） | ✓ | CEID 语义描述；标准值仅 `FUNCTION_SECURE_CODING` `[TPS_DEXT_01193]`、`[TPS_DEXT_01194]` |

AP 侧 CEID 的业务动作（信任域、安装/轮换/撤销）由应用 `ara::diag::TransmitCertificate::Process` 实现；DEXT 只提供路由支持集。Manifest 允许同一 `DiagnosticTransmitCertificateInterface` Port：

1. 一个 `DiagnosticAuthTransmitCertificate` 聚合多个不同 `evaluationId`；或  
2. 多个 `DiagnosticAuthenticationPortMapping` 指向同一 PPort，各引用不同的 `DiagnosticAuthTransmitCertificate`（各含一个 Evaluation）。

## 4. DEXT：Role 与访问许可

### 4.1 `DiagnosticAuthRole`

| 属性 | Mult. | 含义 |
|---|---|---|
| `shortName`（Identifiable） | — | 应用 `ClientAuthentication::Authenticate()` 传入的 Role 字符串来源 |
| `isDefault` | 0..1 | `TRUE` → `kDeAuthenticated` 时的默认 Role 集合 `[SWS_DM_01204]` |
| `bitPosition` | 0..1 | Role 在位域中的位置（协议/OEM 用法；非 AP API 强制字段） |

推荐包：`DiagnosticAuthRoles`。规范不保证至少存在一个默认 Role。

### 4.2 `DiagnosticAuthRoleProxy`

| 属性 | Mult. | 含义 |
|---|---|---|
| `authenticationRole` | 0..\* → `DiagnosticAuthRole` | 该许可要求的 Role 集合 |

聚合于：

- `DiagnosticAccessPermission.authenticationEnabled`
- `DiagnosticMemoryDestinationUserDefined.authenticationEnabled`

### 4.3 `DiagnosticAccessPermission`

| 属性 | Mult. | 与 0x29 关系 |
|---|---|---|
| `authenticationEnabled` | 0..1 → Proxy | 存在即表示预见认证检查 |
| `diagnosticSession` | 0..\* | 与 0x29 正交的会话门禁 |
| `securityLevel` | 0..\* | 与 0x27 正交；不可与 0x29 Role/DAL 混为一谈 |
| `environmentalCondition` | 0..1 | 环境条件 |
| `sovdLock` | 0..1 | **仅 AP**；SOVD 锁，与 UDS 0x29 并列存在于同一许可对象 |

#### 门禁语义

| 条件 | DEXT 语义 | AP SWS 对应 |
|---|---|---|
| 无 `authenticationEnabled` | 不做认证检查，继续处理 `[TPS_DEXT_01188]` | `[SWS_DM_01739]` |
| 有 Proxy，无 `authenticationRole` | 相对当前 **DAL** 检查 `[TPS_DEXT_01190]` | 与 Role 路径区分；空 Role 组合的工程拒绝策略见 Spec PD29-14 |
| 有 Proxy + `authenticationRole` | Role 相关检查 `[TPS_DEXT_01191]` | Role 检查条件性要求二者同时存在 `[SWS_DM_01223]` |

挂载点：任意 `DiagnosticServiceInstance.accessPermission`，以及 DID/Routine 等资源上引用的同一套 `DiagnosticAccessPermission`。

`[constr_10038]`：部分服务（如 `DiagnosticRequestCurrentPowertrainData` 等）**不得**使用 `authenticationEnabled`——配置校验需按 DEXT 约束列表执行。

## 5. DEXT / Manifest：公共属性与客户端识别

### 5.1 `DiagnosticCommonProps`（相关子集）

| 属性 | Mult. | 平台 | 含义 |
|---|---|---|---|
| `authenticationTimeout` | 0..1 `TimeValue` | 共享 | 默认 session 下已认证客户端无通信时保持认证状态的时间（秒）`[SWS_DM_01210]` |
| `externalAuthentication` | 0..\* | **仅 AP** | 聚合 `DiagnosticExternalAuthenticationIdentification` |

**强制存在**：若某 `DiagnosticContributionSet` 的 CommonProps 所在集合还引用了 `DiagnosticAuthenticationPortMapping` 或 `DiagnosticExternalAuthenticationPortMapping`，则 `authenticationTimeout` **应当存在** `[constr_10663]`（Manifest）。

属性可选时的供应商默认值属项目决策（关联 Spec PD29-07）。

### 5.2 `DiagnosticExternalAuthenticationIdentification`（仅 AP）

| 属性 | Mult. | 含义 |
|---|---|---|
| `sourceAddressRangeStart` | 0..1 | 客户端逻辑源地址范围起点（固定地址时 Start=End） |
| `sourceAddressRangeEnd` | 0..1 | 范围终点（无间隙连续区间） |

- 元素个数定义 `ara::diag::ClientAuthentication` 实例数（SWS §7.3.2.3.1）。  
- 意图：固定 SA 或编译期未知、仅知范围的客户端认证。  
- 范围重叠/歧义/范围外运行时行为：至少配置期应拒绝重叠；范围外属项目决策（关联 Spec PD29-11）。  
- ExternalAuthentication **可独立于** UDS 0x29 存在（Manifest：ExtAuth Mapping 不引用 0x29 服务实例）。

## 6. AP Manifest：PortInterface 与 PortMapping

### 6.1 PortInterface（无业务属性，仅类型标签）

| PortInterface | 应用 API | 典型方向 | TPS |
|---|---|---|---|
| `DiagnosticAuthenticationInterface` | `ara::diag::Authentication` | 应用 **PPort** | `[TPS_MANI_01359]` |
| `DiagnosticTransmitCertificateInterface` | `ara::diag::TransmitCertificate` | 应用 **PPort** | `[TPS_MANI_01452]` |
| `DiagnosticExternalAuthenticationInterface` | `ara::diag::ExternalAuthentication` | 应用 **RPort**（向 DM 回写状态） | `[TPS_MANI_01353]` |

三者均为 `DiagnosticPortInterface` 子类，**仅 AP**。

### 6.2 `DiagnosticAuthenticationPortMapping`

| 属性 | Mult. | 说明 |
|---|---|---|
| `diagnosticAuthentication` | 0..1 | 引用具体 Authentication 子类实例 |
| `pPortPrototypeInExecutable` | 0..1 iref | 指向 Executable 中的 PPort |
| `process` | 0..1 | 按 `ProcessDesign` 区分映射 |

约束：

| ID | 内容 |
|---|---|
| `[constr_10093]` | 每个 `DiagnosticAuthentication` 恰好被一个 Auth PortMapping 引用 |
| `[constr_10092]` | Mapping 引用的 PPort 应由 `DiagnosticAuthenticationInterface` 类型化 |
| `[constr_10526]` | 若 PPort 类型为 `DiagnosticTransmitCertificateInterface`，则 `diagnosticAuthentication` **只能**引用 `DiagnosticAuthTransmitCertificate`（反之亦然） |

语义：`[TPS_MANI_01361]` —— 将认证请求从 DM 转发到应用侧 authentication manager；iref 用于构造运行时 `InstanceSpecifier`。

### 6.3 `DiagnosticExternalAuthenticationPortMapping`

| 属性 | Mult. | 说明 |
|---|---|---|
| `rPortPrototypeInExecutable` | 0..1 iref | 必须 typed by `DiagnosticExternalAuthenticationInterface` `[constr_10094]` |
| `process` | 0..1 | 按 Process 区分 |

不引用 DEXT 中的 0x29 服务实例（`[TPS_MANI_01362]`）。

### 6.4 运行时绑定（非 DEXT 属性，但属 AP 约定）

| 项 | 约定 |
|---|---|
| `InstanceSpecifier` | 构造 `Authentication` / `TransmitCertificate` / `ExternalAuthentication` 时指向对应 Port |
| `ConcurrencyType` | `Authentication`、`TransmitCertificate` 构造参数（`kConcurrent` / `kNotConcurrent`）；属 API 合约 |
| 每客户端隔离 | `[SWS_DM_01229]`：状态/Role/DAL/超时按 Diagnostic Client 独立 |

## 7. CP 专用项（AP 实现勿照搬）

| 项 | 说明 |
|---|---|
| `DiagnosticAuthTransmitCertificateEvaluation.function` | 仅 Classic；AP Manifest Annex 中 Evaluation 表通常只有 `evaluationId` |
| `DiagnosticAuthTransmitCertificateMapping` | 将 Evaluation 关联到 `CryptoServiceCertificate`；**仅 Classic** `[TPS_DEXT_01195]` |
| BSW 映射示例 | `authenticationTimeout` ↔ `DcmDspAuthenticationDefaultSessionTimeOut` 等（CP TPS 映射表） |

AP 的 CEID→证书处理走应用 Port + `TransmitCertificate::Process`，不走 CP CryptoServiceCertificate Mapping。

## 8. 规范约束对照表

| 约束 / 需求 | 主题 |
|---|---|
| `[SWS_DM_01226]` | 仅 APCE 子集；ACR out of scope |
| `[SWS_DM_01227]` | PoO ⇒ 至少一种 verify |
| `[SWS_DM_01228]` | verify/PoO ⇒ DeAuth + AuthConfig |
| `[constr_10091]` | DEXT：启用 Authentication ⇒ DeAuth + PoO + AuthConfig + 一种 verify |
| `[SWS_DM_01247]` | 未知 CEID → NRC `0x31` |
| `[SWS_DM_01204]` / `[SWS_DM_01210]` | 默认 Role；`authenticationTimeout` 去认证 |
| `[SWS_DM_01223]` / `[SWS_DM_01739]` | Role 检查条件；无 authenticationEnabled 则跳过 |
| `[TPS_DEXT_01188]`–`[TPS_DEXT_01191]` | AccessPermission 认证门禁四态 |
| `[constr_10038]` | 禁止部分服务使用 `authenticationEnabled` |
| `[constr_10663]` | 有 Auth/ExtAuth Mapping ⇒ 必须有 `authenticationTimeout` |
| `[constr_10092]` / `[constr_10093]` / `[constr_10094]` / `[constr_10526]` | Port 类型与一对一 Mapping |

与实现 AR 的映射见关联 Spec：`AR29-CFG-01`～`AR29-CFG-07`、`AR29-AUTHZ-*`、`TC29-CFG-*`。

## 9. 配置落地检查清单

1. **服务开关**：按目标 SF 建立六子类实例；满足 `01227`/`01228`，并评估是否按 `constr_10091` 全量强制。  
2. **Role 目录**：定义全部 `DiagnosticAuthRole`，明确 `isDefault`；无默认 Role 时确认启动行为可接受。  
3. **资源门禁**：需保护的服务/DID/Routine/UD 内存配置 `authenticationEnabled`，并按 DAL-only 或 Role+DAL 选择 Proxy 形态。  
4. **超时**：配置 `authenticationTimeout`；存在 Auth/ExtAuth Mapping 时强制填写。  
5. **客户端识别（AP）**：配置 `externalAuthentication` SA 单值/范围，配置期拒绝重叠。  
6. **应用绑定（AP）**：三类 PortInterface + 对应 Mapping + Process；`0x04` 配齐 `evaluationId` 并满足 `constr_10526`。  
7. **明确排除**：ACR；AP 工程勿引入 CP `function` / `DiagnosticAuthTransmitCertificateMapping`（除非做 CP 对照分析）。  
8. **回归门禁**：关联 Spec `TC29-CFG-01`～`TC29-CFG-06`。

## 10. 方法局限与命名注意

1. Markdown 由 MinerU 转换；类名偶发粘连（如 `DiagnosticAuthTransmitCertificatelnterface`）、多重性符号乱码（`★`/`*`）。结论以 PDF / 多源交叉为准。  
2. SWS 正文 `DiagnosticAuthCertificateEvaluation` 与 TPS `DiagnosticAuthTransmitCertificateEvaluation` 指同一配置概念的不同行文；清单统一用 TPS 正式名，并在检索时兼容两者。  
3. DEXT `constr_10091` 与 SWS `01227`/`01228` 严格程度不同；集成校验策略属工程选择，应在项目配置基线中写明。  
4. `TPS_DEXT_01190`（仅 DAL）与关联 Spec 对“authenticationEnabled 存在但 Role 引用为空”的 PD29-14 处理需在工具链中显式对齐，避免隐式 allow/deny。  
5. 本文不替代 ISO/OEM/PKI 规范；CEID 业务语义与密码学参数仍为项目决策。

## 11. 附录：数据来源

| 主题 | 主要定位 |
|---|---|
| SWS 0x29 行为与强制组合 | AP SWS §7.3.2.8.11；`[SWS_DM_01226]`–`[SWS_DM_01228]`、`[SWS_DM_01247]`；Markdown 约 L4513–4694 |
| ExternalAuthentication / 状态 | AP SWS §7.3.2.3；Markdown 约 L3335–3483 |
| SWS Annex A（AccessPermission/Role/Auth/Port） | Markdown 约 L18108–18139、L18161–18168、L18405–18415、L18776–18779 |
| DEXT 服务建模与 CEID | CP TPS §4.3.8.3；`[TPS_DEXT_01158]`–`[TPS_DEXT_01195]`；Markdown 约 L2098–2188、L5032–5041 |
| DEXT AccessPermission 认证语义 | CP TPS；`[TPS_DEXT_01188]`–`[TPS_DEXT_01191]`；Markdown 约 L1628–1644 |
| Manifest Port / Mapping / SA / timeout | Manifest `[TPS_MANI_01353]`/`01359`/`01361`/`01362`/`01435`/`01452`；`[constr_10091]` 系 DEXT，`[constr_10092]`–`[constr_10094]`、`[constr_10526]`、`[constr_10663]`；Markdown 约 L5301–5335、L6147–6233、L7043–7112 |
| Manifest Annex Evaluation | Markdown 约 L21923–21929 |

---

*文档结束。行为 Spec、AR/TC 与 Open PD 以 [0x29 APCE Spec](./AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md) 为准；本文专注配置面清单。*
