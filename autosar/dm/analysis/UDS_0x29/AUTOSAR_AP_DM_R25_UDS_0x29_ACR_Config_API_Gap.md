# AUTOSAR AP DM R25-11 — UDS 0x29 ACR（单向 0x05/0x06）配置与 API 差距分析

> **文档类型**：规范差距（Gap）分析 / 项目决策框架
> **覆盖版本**：AUTOSAR AP R25-11（SWS Diagnostics 723）、CP TPS DiagnosticExtractTemplate R25-11、AP TPS ManifestSpecification R25-11、ISO 14229-1:2020
> **核心命题**：AUTOSAR AP DM R25-11 **仅标准化 APCE**（Authentication with PKI Certificate Exchange）。ISO 14229-1:2020 定义的 **ACR**（Authentication with Challenge-Response）单向流程 `0x05 requestChallengeForAuthentication` + `0x06 verifyProofOfOwnershipUnidirectional` 在 DEXT 元模型、AP Manifest PortMapping 与 `ara::diag` 回调三个层面**均无标准落点**。
> **本文不做的事**：不设计虚构的 AUTOSAR API 名，不替项目选定密码算法，不把 APCE 的 `0x01 verifyCertificateUnidirectional` 当作 ACR。

---

## 目录

- [1. 范围、术语与证据规则](#1-范围术语与证据规则)
- [2. AUTOSAR 排除 ACR 的规范证据链](#2-autosar-排除-acr-的规范证据链)
- [3. ISO ACR 单向能力逐项映射](#3-iso-acr-单向能力逐项映射)
- [4. 可复用的标准能力（不必自研）](#4-可复用的标准能力不必自研)
- [5. 不可用旁路（已排除方案）](#5-不可用旁路已排除方案)
- [6. 分层 Gap 清单](#6-分层-gap-清单)
- [7. 最小项目冻结清单](#7-最小项目冻结清单)
- [8. 实现影响评估](#8-实现影响评估)
- [9. 关联文档](#9-关联文档)
- [10. 方法局限与 PDF 回核说明](#10-方法局限与-pdf-回核说明)
- [附录 A. 证据锚点索引](#附录-a-证据锚点索引)

---

## 1. 范围、术语与证据规则

### 1.1 范围

本文只回答一个问题：**若项目要求在 AUTOSAR AP R25-11 的 DM 上实现 ISO 14229-1:2020 的 ACR 单向认证（0x05/0x06），标准给了什么、没给什么、项目必须自行冻结什么。**

在范围内：

- ISO ACR **单向**变体（`0x05` + `0x06`）所需的协议、配置与运行时能力
- 这些能力到 DEXT 元类 / AP Manifest 元类 / `ara::diag` C++ API 的映射与缺口
- `0x08 authenticationConfiguration` 的 ACR 返回值宣告问题
- 可复用的标准机制（Role、DAL、超时、授权检查、Conversation 隔离、SecurityEvent）

不在范围内：

- ACR **双向**变体（`0x07 verifyProofOfOwnershipBidirectional`）——仅在 Gap 表中标注同类缺失，不展开
- 具体密码算法选型、密钥管理系统设计、证书体系设计
- APCE 六子功能的规范级细节（已在 [0x29 APCE Spec](AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md) 中覆盖）
- 认证状态管理机制与 `ara::diag` 认证类的 C++ 约束（见 [认证状态管理与 API 约束参考](AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md)）
- SOVD 侧认证（见 [SOVD 技术介绍](../AUTOSAR_AP_DM_SOVD_Technical_Introduction.md)）

### 1.2 术语

| 术语 | 展开 | 说明 |
|------|------|------|
| APCE | Authentication with PKI Certificate Exchange | ISO 14229-1:2020 的证书交换认证族，子功能 `0x01`/`0x02`/`0x03`/`0x04` |
| ACR | Authentication with Challenge-Response | ISO 14229-1:2020 的挑战-应答认证族，子功能 `0x05`/`0x06`/`0x07` |
| VCU | verifyCertificateUnidirectional（`0x01`） | **属 APCE**。名字里的 "Unidirectional" 指证书验证方向，与 ACR 无关 |
| RCFA | requestChallengeForAuthentication（`0x05`） | ACR 第一步，客户端请求服务端挑战 |
| VPOWNU | verifyProofOfOwnershipUnidirectional（`0x06`） | ACR 单向第二步，客户端提交 POWN |
| POWN | Proof of Ownership | 所有权证明（签名 / MAC / 认证令牌） |
| COCO | communicationConfiguration | 认证后后续通信的安全配置指示（含是否建立会话密钥） |
| AI | algorithmIndicator | 16 字节算法标识（OID 形式），ACR 强制参数 |
| SKI | sessionKeyInfo | 会话密钥信息 |
| RV | authenticationReturnParameter | 0x29 正响应中的返回值字节 |
| DAL | DynamicAccessList | DM 为已认证客户端维护的动态访问列表 |
| DEXT | Diagnostic Extract | 诊断配置模板；共享模型见 CP TPS，AP 专属见 Manifest TPS |

> **术语陷阱（必须避免）**：`0x01 verifyCertificateUnidirectional` 与 `0x06 verifyProofOfOwnershipUnidirectional` 都含 "Unidirectional"，但分属 **APCE** 与 **ACR** 两个互斥族。ISO 14229-1:2020 Table 74 的脚注对此有明确切分：`C1 Only if authentication with PKI Certificate Exchange (APCE) is used. C2 Only if authentication with Challenge-Response (ACR) is used.` DEXT 元类 `DiagnosticVerifyCertificateUnidirectional` 对应的是 **`0x01`（APCE）**，把它当作 ACR 落点是本主题最常见的误判。

### 1.3 证据规则

1. 结论以官方 PDF 与 Change History 为准；Markdown 仅作检索与摘录载体。
2. 每条 Gap 必须至少绑定一条**正向排除证据**（规范明文说"不支持/只支持 X"）或**结构性排除证据**（元模型枚举穷尽且不含目标项），不接受"检索不到即不存在"。
3. 状态标签严格区分：

| 标签 | 含义 |
|------|------|
| `ISO-NORM` | ISO 14229-1:2020 的规范性要求 |
| `AUTOSAR-NORM` | AUTOSAR R25-11 已标准化并可直接使用 |
| `GAP` | ISO 要求存在，AUTOSAR R25-11 无对应标准落点 |
| `PROJECT-DECISION` | 标准留白，必须由项目冻结后才能实现 |

### 1.4 源文件

| 角色 | 权威 PDF | 检索用 Markdown |
|------|----------|-----------------|
| AP DM 规范 | `../autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf` | `../markdown/AUTOSAR_AP_SWS_Diagnostics_R25-11/` |
| DEXT 元模型 | `../autosar/AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11.pdf` | `../markdown/AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11/` |
| AP Manifest | `../autosar/AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf` | `../markdown/AUTOSAR_AP_TPS_ManifestSpecification_R25-11/` |
| UDS 原文 | `../iso/ISO 14229-1-2020.pdf` | `../markdown/ISO_14229-1-2020/` |

---

## 2. AUTOSAR 排除 ACR 的规范证据链

四条独立证据，分属 AP SWS 与 CP DEXT 两个文档，互为交叉验证。任何一条单独成立即可支撑结论；四条同时成立说明这是**有意的规范范围决策**，而非转换噪声或遗漏。

### 2.1 证据 E1 — AP SWS 章节前言：本章是 ISO 的真子集

SWS Diagnostics R25-11，第 **7.3.2.8.11 Service 0x29 – Authentication** 章节开篇：

> The specifications of this chapter are based on the UDS Specifications ISO 14229-1:2020. The specifications of this chapter are **a sub-set of the service 0x29 specifications of ISO 14229-1:2020**, and the Diagnostic Manager **may only implement the specifications of this chapter**.

这句话有两层约束力：

1. AUTOSAR 明示自己是 ISO 的**真子集**，不是全集；
2. `may only implement` 是**封闭式授权**——DM 实现被限定在本章列举范围内。这意味着即便供应商 DM 栈私自扩展 ACR，也不再是"符合 AP R25-11 的 DM 行为"，而是私有扩展。

> 标签：`AUTOSAR-NORM`（范围声明）

### 2.2 证据 E2 — `[SWS_DM_01226]`：子功能白名单穷尽且不含 0x05/0x06

**[SWS_DM_01226] Support of UDS service authentication**（Upstream: `RS_Diag_04251`）

> ⌈If configured, the Diagnostic Server instance shall provide the UDS service 0x29 Authentication with the subfunctions.
> `0x00 deAuthenticate` / `0x01 verifyCertificateUnidirectional` / `0x02 verifyCertificateBidirectional` / `0x03 proofOfOwnership` / `0x04 transmitCertificate` / `0x08 authenticationConfiguration`
> according to ISO 14229-1:2020.⌋

紧随其后是 SWS 正文的**明文限制说明（SWS limitation）**：

> Note: The Diagnostic Manager **only implements the authentication via PKI certificate exchange**. **Authentication with challenge-response (ACR) is currently out of scope of the Diagnostic Manager.**

这是全套证据中**最直接**的一条：AUTOSAR 用自然语言点名 ACR 并声明其 out of scope。白名单六项恰好是 APCE 四子功能 + 去认证 + 配置查询，`0x05`/`0x06`/`0x07` 三项 ACR 子功能整族缺席。

> 标签：`AUTOSAR-NORM` + 正向排除

### 2.3 证据 E3 — `[SWS_DM_00100]`：未列白名单的子功能在运行时被拒

**[SWS_DM_00100] Supported Service subfunction level checks**（Upstream: `RS_Diag_04276`）

> ⌈The Diagnostic Server instance shall check, whether there is a configured internal or external service processor for the incoming diagnostic request. If there exists a service processor on SID level, but not for the subfunction of the request, the Verification shall be considered as failed and the negative response code shall be **0x12 (kSubFunctionNotSupported)**.⌋

这条把 E2 的**配置层白名单**转化为**运行时可观测行为**：由于 `0x05`/`0x06` 在 DEXT 中无对应 `DiagnosticServiceInstance` 子类（见 E4），DM 必然找不到 subfunction 级 service processor，因此符合规范的 R25-11 DM 收到 `29 05 ...` 时**必须**返回 `7F 29 12`。

这一点对项目有直接工程含义：**ACR 的缺失不是"沉默的空白"，而是一个规范强制的否定响应**。任何 ACR 实现都必须先绕过或替换这条检查路径。

> 标签：`AUTOSAR-NORM` + 运行时行为后果

### 2.4 证据 E4 — DEXT 元模型三重锁定

DEXT R25-11 第 **4.3.8.3 Authentication** 章节给出三条相互加固的约束。

**(a) `[TPS_DEXT_01158] Sub-Functions for diagnostic service Authentication`**

> ⌈The following sub functions are supported for the diagnostic service Authentication:
> • De-authentication, formalized by meta-class `DiagnosticDeAuthentication`.
> • Verify certificate unidirectional, formalized by meta-class `DiagnosticVerifyCertificateUnidirectional`.
> • Verify certificate bidirectional, formalized by meta-class `DiagnosticVerifyCertificateBidirectional`.
> • Proof of ownership, formalized by meta-class `DiagnosticProofOfOwnership`.
> • Authentication configuration, formalized by meta-class `DiagnosticAuthenticationConfiguration`.⌋

**(b) `[TPS_DEXT_01159] Supported authentication methods for diagnostic service Authentication`**

> ⌈The modeling of the Authentication service **only provides support for a PKI certificate exchange**.⌋

这是元模型层面的正向排除，与 E2 的 SWS Note 在两个不同文档中说了同一件事。

**(c) `[constr_10091] Mandatory subfunction of diagnostic service Authentication`**
Imposition time: **CP: IT_DiagDes, AP: IT_DiagDes**

> ⌈If the diagnostic service Authentication is supported, then the following subfunctions shall be configured:
> • De-authentication（`DiagnosticDeAuthentication`）
> • Proof of ownership（`DiagnosticProofOfOwnership`）
> • Authentication configuration（`DiagnosticAuthenticationConfiguration`）
> • One of — Verify certificate unidirectional（`DiagnosticVerifyCertificateUnidirectional`）/ Verify certificate bidirectional（`DiagnosticVerifyCertificateBidirectional`）⌋

`constr_10091` 的杀伤力在于它是**强制性的**且 imposition time 显式包含 **AP**：只要启用 0x29，就**必须**配置一组 APCE 子功能，且必须二选一地配置 VCU 或 VCB。换言之，DEXT 不存在"只做 ACR、不做 APCE"的合法配置——ACR 既无法单独建模，也无法作为 APCE 的替代分支。

**(d) 类继承结构佐证**

抽象元类 `DiagnosticAuthentication`（Table 4.51 / Manifest Table 5.58）的 Subclasses 枚举穷尽为六项：

```
DiagnosticAuthTransmitCertificate          → 0x04
DiagnosticAuthenticationConfiguration      → 0x08
DiagnosticDeAuthentication                 → 0x00
DiagnosticProofOfOwnership                 → 0x03
DiagnosticVerifyCertificateBidirectional   → 0x02
DiagnosticVerifyCertificateUnidirectional  → 0x01
```

六个子类精确对应 `[SWS_DM_01226]` 的六个子功能。**没有任何子类对应 `0x05`/`0x06`/`0x07`。** 这是结构性排除：即便项目想在 DEXT 中"填一个 ACR 实例"，元模型里也没有可实例化的类型。

> 标签：`AUTOSAR-NORM` + 元模型结构性排除

### 2.5 证据链小结

| 证据 | 文档 | 类型 | 结论 |
|------|------|------|------|
| E1 | AP SWS 7.3.2.8.11 前言 | 范围声明 | 本章是 ISO 真子集，DM `may only implement` 本章内容 |
| E2 | AP SWS `[SWS_DM_01226]` + Note | **正向排除** | 六子功能白名单；ACR 明文 out of scope |
| E3 | AP SWS `[SWS_DM_00100]` | 运行时后果 | 未配置子功能 → NRC `0x12` |
| E4a/b/c/d | DEXT 4.3.8.3 | **正向 + 结构排除** | 仅 PKI 证书交换；强制 APCE 子集；六子类穷尽 |

四条证据分布在 **AP SWS** 与 **CP DEXT** 两份独立官方文档，且 E2 与 E4b 是两处独立的自然语言明文排除。可以确定性地断言：

> **AUTOSAR AP R25-11 对 UDS 0x29 的标准化范围严格等于 APCE + deAuthenticate + authenticationConfiguration。ACR（0x05/0x06/0x07）整族在 DEXT 元模型、AP Manifest 与 `ara::diag` API 三层均无标准落点。**

---

## 3. ISO ACR 单向能力逐项映射

下表把 ISO 14229-1:2020 第 **10.6.3 Authentication with Challenge-Response (ACR)** — Variant 1（单向）所要求的每项能力，逐一映射到 DEXT、AP Manifest、`ara::diag` 三层，并标注状态。

ISO 单向流程（10.6.3 Variant 1，步骤编号为 ISO 原文编号）：

```
(1)  Client → Server : 0x29 05  COCO + AI                 [请求挑战，指示算法与是否建会话密钥]
(2)  Server          : 生成 challengeServer
(3)  Server → Client : 0x69 05  RV + AI + CHSE + [NAP 指示]
(4)  Client          : 生成 challengeClient（可选）
(5)  Client          : 计算 client-side POWN（非对称签名 / 对称 MAC）
(6)  Client          : 按 (3) 指示准备 additionalParameter
(7)  Client → Server : 0x29 06  AI + POWNCL + CHCL + [AP]
(8)  Server          : 验证 client-side POWN
(10) Server          : 若 COCO 指示，建立/派生会话密钥并生成 SKI
(11) Server          : 按 rights/roles 授予诊断对象访问权
(12) Server → Client : 0x69 06  RV + AI + [SKI]
```

### 3.1 映射总表

| # | ISO ACR 所需能力 | ISO 依据 | DEXT R25-11 | AP Manifest R25-11 | `ara::diag` R25-11 | 状态 |
|---|------------------|----------|-------------|---------------------|--------------------|------|
| C1 | 子功能 `0x05 RCFA` 可被配置为受支持 | Table 74（`C2`）、Table 70 | **无子类** — `DiagnosticAuthentication` 六子类不含 RCFA | 无可引用目标 | 无回调 | `GAP` |
| C2 | 子功能 `0x06 VPOWNU` 可被配置为受支持 | Table 74（`C2`）、Table 71 | **无子类** | 无可引用目标 | 无回调 | `GAP` |
| C3 | `algorithmIndicator`（16 字节 OID）声明与请求/响应一致性校验 | Table 70 #4–#19；Table 71 #3–#18；"shall be the same as" 一致性要求 | 无建模属性 | 无 | 无参数 | `GAP` |
| C4 | `communicationConfiguration`（COCO）语义与会话密钥建立指示 | Table 70 #3；数据参数定义（"linked to the presence and the contents of sessionKeyInfo"） | 无 ACR 侧建模 | 无 | APCE 路径有 COCO 入参，但绑定 `0x01`/`0x02` 语义 | `GAP` |
| C5 | 服务端生成 `challengeServer`（CHSE） | 10.6.3 步骤 (2)(3)；建议依据 ISO/IEC 9798-2 或 9798-4 | 无 | 无 | **无挑战生成回调** | `GAP` |
| C6 | 客户端 POWN（`POWNCL`）验证 | 10.6.3 步骤 (7)(8)；Table 71 #19–#m+20 | 无 | 无 | `VerifyOwnership` 存在但绑定 `0x03`（APCE POWN），入参为 `ClientPOWN` + `ClientEphemeralPublicKey`，无 AI / CHCL / AP | `GAP` |
| C7 | `challengeClient`（CHCL）接收与参与 POWN 计算 | Table 71 #m+21–#n+m+22 | 无 | 无 | 无参数 | `GAP` |
| C8 | `additionalParameter`（AP）需求指示与传递 | 10.6.3 步骤 (3)(6)；Table 71 `lengthOfAdditionalParameter` / `additionalParameter`（条件存在） | 无建模 | 无 | 无参数 | `GAP` |
| C9 | 非对称密码支持（客户端公钥在服务端） | 10.6.3 Prerequisites；步骤 (5) | 无密钥引用建模 | 无 | 无 | `GAP` |
| C10 | 对称密码支持（预共享对称密钥） | 10.6.3 Prerequisites；步骤 (5) | 无密钥引用建模 | 无 | 无 | `GAP` |
| C11 | 会话密钥建立与 `sessionKeyInfo`（SKI）产出 | 10.6.3 步骤 (10)(12) | 无 ACR 侧建模 | 无 | SKI 仅由 `[SWS_DM_01243]`（`0x03` APCE 路径）产出 | `GAP` |
| C12 | 认证失败策略（计数、延时、锁定） | 10.6.x NRC 语义 | 无 ACR 侧属性；APCE 侧亦无（对比 `DiagnosticSecurityAccessClass.securityDelayTime` 为 0x27 专用） | 无 | 无 | `GAP` |
| C13 | `0x08` 宣告 ACR 配置：RV `0x03`（ACR 非对称）/ `0x04`（ACR 对称） | Table B.5；示例响应 `69 08 03` | 无配置项 | 无 | — | `GAP` |
| C14 | 认证成功后按 rights/roles 授予访问权 | 10.6.3 步骤 (11) | **`DiagnosticAuthRole` 已有** | **`DiagnosticAuthRoleProxy` / `DiagnosticAccessPermission` 已有** | `ClientAuthentication::Authenticate` + `ClientAuthenticationHandle` 已有 | `AUTOSAR-NORM` ✅ |
| C15 | 认证状态在 DM 内按客户端隔离维护 | 10.6.4（认证状态关联 diagnostic channel） | `DiagnosticExternalAuthenticationIdentification`（AP 专属，源地址/地址段） | `DiagnosticExternalAuthenticationPortMapping` | `ExternalAuthentication::Get/GetAll` → `ClientAuthentication`；[SWS_DM_01229] | `AUTOSAR-NORM` ✅ |
| C16 | 认证态超时失效 | ISO 10.6.4 | `DiagnosticCommonProps.authenticationTimeout` | `[constr_10663]` | `[SWS_DM_01210]` / `[SWS_DM_01211]` | `AUTOSAR-NORM` ✅ |
| C17 | 未认证时服务拒绝（NRC `0x34`） | ISO NRC 定义 | `DiagnosticAccessPermission.authenticationEnabled` | — | — | `AUTOSAR-NORM` ✅ |
| C18 | 认证失败/缺失的安全事件上报 | 非 ISO 强制，AUTOSAR 增值 | — | `SecurityEventReportInterface` / `...DefinitionMapping` | ID 101：NRC `0x34`（[SWS_DM_02017]/[02018]）；ID 105：0x29 负响应（[SWS_DM_02025]/[02026]） | `AUTOSAR-NORM` ✅（ACR 专属细分事件仍缺失） |
| C19 | 应用侧处理端口绑定（DM → 认证管理器） | AUTOSAR 架构要求 | — | `DiagnosticAuthenticationPortMapping` + `[constr_10092]` | `DiagnosticAuthenticationInterface` | `GAP`（机制存在但**不可指向 ACR**，见 §6.2） |

### 3.2 三层缺口的性质差异

三层缺口不是同一种问题，修补代价与可移植性后果各不相同：

**DEXT 层（C1–C3、C8–C13）—— 元模型缺类型。** 这是最硬的一层。ARXML 由 AUTOSAR schema 约束，`DiagnosticAuthentication` 只有六个具体子类，项目无法通过"填字段"引入 ACR。可用的只有 `adminData` / `Sdg`（Special Data Group）承载非标语义，但这对标准工具链不可见、不可校验。

**AP Manifest 层（C19）—— 机制存在但引用目标为空。** `DiagnosticAuthenticationPortMapping.diagnosticAuthentication` 的类型是 `DiagnosticAuthentication`，而该抽象类的具体子类不含 ACR。因此并非"没有绑定机制"，而是**绑定机制的一端没有合法目标**。这一点很关键：它解释了为什么"复用现有 PortMapping 挂 ACR handler"在标准语义下不成立。

**`ara::diag` 层（C5–C7、C11）—— 回调签名与 APCE 语义强绑定。** `ara::diag::Authentication`（`[SWS_DM_01123]`，Port Interface: `DiagnosticAuthenticationInterface`，头文件 `ara/diag/authentication.h`）现有方法均由 APCE 子功能驱动：

| SWS | 触发子功能 | 调用的方法 | 传入参数 |
|-----|-----------|-----------|---------|
| `[SWS_DM_01230]` | `0x01` VCU | `Authentication::VerifyCertificateUnidirectional` | `CommunicationConfiguration`(COCO), `ClientCertificate`(CECL), `ClientChallenge`(CHCL) |
| `[SWS_DM_01235]` | `0x02` VCB | `Authentication::VerifyCertificateBidirectional` | `CommunicationConfiguration`(COCO), `ClientCertificate`(CECL), `ClientChallenge`(CHCL) |
| `[SWS_DM_01240]` | `0x03` POWN | `Authentication::VerifyOwnership` | `ClientPOWN`(POWNCL), `ClientEphemeralPublicKey`(EPKCL) |
| `[SWS_DM_01248]` | `0x04` TC | `TransmitCertificate::Process` | `certificateEvaluationId`(CEID), `certificateData`(CEDA) |

对照 ISO ACR 的需求可以看到三处不可调和的错配：

1. **无挑战生成入口**。ACR 步骤 (2) 要求服务端**主动生成** challengeServer。现有 API 中挑战只在 `0x01`/`0x02` 的**返回值**里作为证书验证副产物出现（`[SWS_DM_01233]`：DM 从返回的 Challenge 派生 `LOCHSE` 填入 `CHSE`），没有独立的"给我一个挑战"入口。
2. **`VerifyOwnership` 签名不含 `algorithmIndicator`**。ACR 的 `0x06` 强制携带 16 字节 AI 且必须与 `0x05` 的 AI 一致；现有 `VerifyOwnership` 无此参数，应用无法知道该用哪个算法验签，DM 也无处执行一致性校验。
3. **`VerifyOwnership` 无 `additionalParameter`**。ACR 允许服务端在 (3) 指示需要附加参数、客户端在 (7) 携带；APCE POWN 路径不存在该概念。

> **重要区分**：这三条说的是"现有 API 的语义不覆盖 ACR"，**不是**"应该新增某某方法名"。本文不提出接口名建议——那属于项目自定义扩展设计，且任何此类命名都不会是 AUTOSAR 标准。

---

## 4. 可复用的标准能力（不必自研）

ACR 缺的是**认证协商与密码学交互**部分。认证**成功之后**的授权、状态管理、隔离与审计，AUTOSAR R25-11 已完整标准化，且这些机制在设计上与"认证是怎么完成的"解耦——应用只需最终调用 `ClientAuthentication::Authenticate` 告知 DM 结果。这是 ACR 项目实现中最大的一块可复用面。

### 4.1 角色模型（Role）— `AUTOSAR-NORM`

- **`[TPS_DEXT_01154]` Semantics of meta-class `DiagnosticAuthRole`**：⌈Meta-class `DiagnosticAuthRole` provides support for role-based authentication.⌋ 属性含 `bitPosition`（贡献于 OEM 的"roles and rights"矩阵）与 `isDefault`。
- **`[TPS_DEXT_01189]`**：`DiagnosticAccessPermission.authenticationEnabled` 存在即表示需进一步认证检查。
- **`[TPS_DEXT_01190]`**：`authenticationEnabled` 存在但未指定 `authenticationRole` → 服务对照**当前动态访问列表**检查。
- **`[TPS_DEXT_01191]`**：需要特定角色时，通过 `DiagnosticAuthRoleProxy.authenticationRole` 引用 `DiagnosticAuthRole`。
- **`[TPS_DEXT_01188]`**：`authenticationEnabled` 不存在 → 不做认证检查，服务直接处理。

**对 ACR 的意义**：ISO 10.6.3 步骤 (11)"按 rights/roles 授予访问权"**完全可以复用**。ACR 认证管理器验证 POWN 成功后，把解析出的角色集合传给 `ClientAuthentication::Authenticate`，DM 侧的权限判定逻辑与 APCE 路径完全一致。项目**不需要**自建权限矩阵。

### 4.2 动态访问列表（DAL）— `AUTOSAR-NORM`

SWS 7.3.2.3.3：DM 为每个已认证客户端维护 `DynamicAccessList`，可在 DEXT 静态配置之外**追加**诊断资源访问权。

| SWS | 方法 | 语义 |
|-----|------|------|
| `[SWS_DM_01213]` | `ClientAuthenticationHandle::Set` | 替换该客户端的 DAL |
| `[SWS_DM_01215]` | `ClientAuthenticationHandle::Append` | 扩展 DAL |
| `[SWS_DM_01216]` | `ClientAuthenticationHandle::Revoke` | 将客户端置为 `kDeAuthenticated` |
| `[SWS_DM_01217]` | `ClientAuthenticationHandle::Refresh` | 刷新 `OverrideDefaultRoles` 有效期 / 认证态 |

**对 ACR 的意义**：ACR 常见的"令牌内携带细粒度权限"（ISO 步骤 (5) 提到 token content 含 rights/roles）可直接映射为 `Append`/`Set` 调用。DAL 是 AUTOSAR 提供的、专为"权限在运行时由应用决定"设计的机制，与 ACR 的令牌语义天然契合。

### 4.3 认证超时 — `AUTOSAR-NORM`

- `DiagnosticCommonProps.authenticationTimeout`（TimeValue，秒）：默认会话下认证态保持时长。
- **`[constr_10663]`**：⌈If a `DiagnosticContributionSet` that aggregates the `DiagnosticCommonProps` also references a `DiagnosticAuthenticationPortMapping` or `DiagnosticExternalAuthenticationPortMapping`, then attribute `DiagnosticCommonProps.authenticationTimeout` shall exist.⌋
- DEXT 侧对应约束：若 `DiagnosticContributionSet` 引用了 `DiagnosticAuthentication`，则 `authenticationTimeout` 必须存在。
- **`[SWS_DM_01210]`**：默认会话 + `kAuthenticated` 状态下，自最后一次 `TransmitConfirmation` 起 `authenticationTimeout` 内无新请求 → 置为 `kDeAuthenticated`；`[SWS_DM_01211]` 另规定 S3server timeout 去认证。

**对 ACR 的意义**：可直接复用。注意 `[constr_10663]` 由 **`DiagnosticExternalAuthenticationPortMapping`** 也能触发——这很重要，因为 ACR 项目实现即便不配置任何 `DiagnosticAuthentication`（不可能，见 `constr_10091`），只要用了 ExternalAuthentication 通路，`authenticationTimeout` 依然是强制项。

> **局限**：`authenticationTimeout` 管的是**认证态寿命**，不是**会话密钥寿命**。ACR 的 SKI 若用于后续安全通信，其密钥轮换周期是独立问题，标准未覆盖（见 GAP-CRY-03）。

### 4.4 `ExternalAuthentication` / `ClientAuthentication` — `AUTOSAR-NORM` ★ ACR 的关键着力点

SWS 7.3.2.3.1 的架构说明（**这是整份分析中对 ACR 最有利的一段规范文本**）：

> In AUTOSAR Adaptive, **a major part of the client authentication process is handled in the Application**. It is therefore necessary for the application to convey the Authentication state to the Diagnostic Server instance of the DM.

| SWS | 能力 |
|-----|------|
| `[SWS_DM_01202]` | `ExternalAuthentication::Get` → 按 metaInfo 或客户端地址取 `ClientAuthentication` 实例 |
| `[SWS_DM_01203]` | `ExternalAuthentication::GetAll` → 取全部实例 |
| `[SWS_DM_01206]` 域 | `ClientAuthentication::Authenticate(roles)` → 置 `kAuthenticated` + 角色，返回 `ClientAuthenticationHandle` |
| `[SWS_DM_01207]` 域 | `ClientAuthentication::GetState` |
| `[SWS_DM_01208]` 域 | `ClientAuthentication::SetNotifier` → 认证态变化通知 |
| `[SWS_DM_01209]` 域 | `ClientAuthentication::OverrideDefaultRoles(defaultRoles, timeout)` |
| `[SWS_DM_01204]` | `DiagnosticAuthRole.isDefault == TRUE` → `kDeAuthenticated` 客户端的默认角色 |
| `[SWS_DM_01360]` | 连续 `SetNotifier` 调用覆盖前次注册 |

**客户端识别**：`[TPS_MANI_01435]` — `DiagnosticExternalAuthenticationIdentification` 用于定义诊断客户端的源地址信息，可为固定源地址或地址段（`DiagnosticCommonProps` 下 `0..*` 聚合）。SWS 7.3.2.3.1 明确：可用的 `DiagnosticExternalAuthenticationIdentification` 元素数量决定 `ClientAuthentication` 实例数量。

**对 ACR 的意义 —— 这是最重要的一条结论**：

`DiagnosticExternalAuthenticationPortMapping` 的建模说明 `[TPS_MANI_01362]` 里有一句决定性的话：

> There is no model element in the context of the Diagnostic Extract to which the `DiagnosticExternalAuthenticationPortMapping` could reliably refer to (**external authentication is not bound to the existence of UDS service 0x29**).

即：**ExternalAuthentication 通路在设计上就与 0x29 解耦**。它只引用 `ProcessDesign` 与 `RPortPrototype`（`[constr_10094]`：必须由 `DiagnosticExternalAuthenticationInterface` 类型化），不引用任何 `DiagnosticAuthentication` 子类。

这意味着：**ACR 项目实现可以把"认证结果注入 DM"这一段完全建立在标准之上**——无论 POWN 是怎么验证的（甚至完全在 0x29 之外完成），应用都能通过 `ClientAuthentication::Authenticate` 合法地告知 DM。缺的只是 **0x05/0x06 报文的接收与应答**这一段（§3.1 C1–C13）。

这把 ACR 的项目工作量从"重写整个认证子系统"收敛为"实现 0x05/0x06 的报文处理与密码学，然后接入标准 ExternalAuthentication 通路"。

### 4.5 服务授权检查与 NRC 0x34 — `AUTOSAR-NORM`

- `[SWS_DM_01223]` 执行 Role 检查；Role 未放行时 `[SWS_DM_01224]` 再以 DAL 模式匹配；`[SWS_DM_01739]` 规定未配置 `authenticationEnabled` 时不做认证检查。
- **`[SWS_DM_01225]`**：⌈If the service execution verification fails due to a failed check in scope of `[SWS_DM_01223]` and `[SWS_DM_01224]`, the Diagnostic Server instance shall send a negative Response with NRC **'0x34 (authenticationRequired)'** and stop the service processing.⌋

**对 ACR 的意义**：认证后的服务级鉴权与拒绝语义可直接复用，无需自研。

### 4.6 Conversation / 客户端隔离 — `AUTOSAR-NORM`

DM 按 Diagnostic Client 独立维护认证状态与角色（SWS 7.3.2.3.2："The Diagnostic Server instance maintains the Authentication State and Authentication Role for each Diagnostic Client"），`ClientAuthentication` 实例与 `DiagnosticExternalAuthenticationIdentification` 一一对应。

APCE 侧另有明确的跨客户端防护要求，例如 `[SWS_DM_01239] Unexpected verifyCertificateBidirectional from a different client`。

**对 ACR 的意义**：隔离骨架可复用。但 ACR 特有的 **challenge ↔ client 绑定**（防止 A 客户端取挑战、B 客户端用该挑战应答）**不在标准覆盖内**，必须项目自定义（见 GAP-DM-03）。APCE 侧的 `[SWS_DM_01239]` 只是同类问题的先例，不能直接套用到 ACR。

### 4.7 SecurityEvent / IdsM — `AUTOSAR-NORM`（部分）

- **`SEV_UDS_AUTHENTICATION_NEEDED`，ID 101**：⌈A diagnostic request was received while the required authentication to execute this service is not given. NRC 0x34 (authenticationRequired) was returned.⌋
- **`[SWS_DM_02017]` / `[SWS_DM_02018]`**：NRC 0x34 触发时，DM 应向 IdsM 上报 ID 101，上下文数据含 SID / Subfunction / DataIdentifier 等。
- **`[SWS_DM_02023]` / `[SWS_DM_02024]`**：ID 104 的标准成功触发点限定为 `0x03 proofOfOwnership` 成功，不能直接扩展成 ACR `0x06` 的 AUTOSAR SHALL。
- **`[SWS_DM_02025]` / `[SWS_DM_02026]`**：任一 Authentication 请求产生负响应时上报 ID 105；项目 0x29 ACR 扩展能否直接复用该契约需与 DM/IdsM 供应商确认。
- Manifest 侧：`SecurityEventReportInterface`（`[TPS_MANI_01340]`，每个 RPort 报告恰一个事件）+ `SecurityEventReportToSecurityEventDefinitionMapping`（`[TPS_MANI_01338]`）。

**对 ACR 的意义**：**“未认证被拒”事件 101 可直接复用**；负响应事件 105 有通用 0x29 语义，但对非标 `0x05/0x06` 路径的接口契约仍需冻结。ACR 成功以及挑战请求频率异常、算法不匹配、会话密钥建立失败等细粒度原因没有专属标准 SEV（见 GAP-SEC-01/02）。

### 4.8 可复用能力小结

| 能力 | 状态 | ACR 可复用度 |
|------|------|-------------|
| Role 模型（`DiagnosticAuthRole` / Proxy / AccessPermission） | `AUTOSAR-NORM` | **完全可复用** |
| DAL（`ClientAuthenticationHandle`） | `AUTOSAR-NORM` | **完全可复用** |
| `authenticationTimeout` | `AUTOSAR-NORM` | 可复用（不含会话密钥寿命） |
| `ExternalAuthentication` / `ClientAuthentication` 通路 | `AUTOSAR-NORM` | **完全可复用（关键着力点）** |
| 客户端识别（`DiagnosticExternalAuthenticationIdentification`） | `AUTOSAR-NORM` | **完全可复用** |
| 服务授权 + NRC 0x34 | `AUTOSAR-NORM` | **完全可复用** |
| Conversation 隔离骨架 | `AUTOSAR-NORM` | 可复用（challenge 绑定需自研） |
| SecurityEvent（NRC 0x34 / 0x29 负响应） | `AUTOSAR-NORM` | 部分复用（ACR 成功与细粒度事件需自定义） |
| **0x05/0x06 报文处理** | `GAP` | **不可复用，必须自研** |
| **算法/密钥/会话密钥语义** | `GAP` | **不可复用，必须自研** |

---

## 5. 不可用旁路（已排除方案）

项目在缺少标准支持时容易尝试的三条"捷径"，逐一论证为何在 R25-11 下不成立。**这一节的目的是防止项目基于错误假设做出架构决策。**

### 5.1 旁路 A：用 CustomService 承载 ACR —— ❌ 违反 `[constr_1330]`

**设想**：既然 DEXT 有 `DiagnosticCustomServiceClass` / `DiagnosticCustomServiceInstance`，把 ACR 建模为一个 custom service。

**排除依据 — `[constr_1330] Custom service identifier shall not overlap with standardized service identifiers`**
Imposition time: **CP: IT_DiagDes, AP: IT_DiagDes**

> ⌈The value of the attribute `DiagnosticCustomServiceClass.customServiceId` **shall not be set to any of the values reserved for standardized service identifiers** as defined by ISO 14229-1.⌋

`0x29` 是 ISO 14229-1 标准化 SID，因此 `customServiceId` **不得**取 `0x29`。

**结论**：CustomService 无法承载 `0x29`。项目可以定义一个私有 SID（例如厂商保留区）实现"类 ACR"的挑战-应答流程，但那**不是 UDS 0x29 ACR**，与 ISO 14229-1 一致性测试、通用诊断工具、OEM 规范均不兼容。

补充：`[TPS_DEXT_01147]` 指出 custom service 无法用标准化属性配置，只能借 `adminData` 下的 `Sdg`，且"There is no obligation for a given tool to be able to properly process the definition of the custom service instance"——工具链支持无保证。

> 标签：`AUTOSAR-NORM`（排除性约束）

### 5.2 旁路 B：用 Generic Mapping 把 0x29 转给应用 —— ❌ 白名单不含 Authentication

**设想**：AP Manifest 有 `DiagnosticServiceGenericMapping`（`[TPS_MANI_01326]`），把 `DiagnosticServiceInstance` 映射到应用 PPort，让应用用 `DiagnosticGenericUdsInterface` 自己处理原始 UDS 报文——用它接管整个 `0x29`。

**排除依据 — `[TPS_MANI_01453] DiagnosticServiceInstances that can be mapped by a `DiagnosticServiceGenericMapping``**

> ⌈`DiagnosticServiceGenericMapping` shall always be used for the following list of `DiagnosticServiceInstance`s:
> • `DiagnosticEcuReset` • `DiagnosticComControl` • `DiagnosticRoutineControl` • `DiagnosticRequestUpload` • `DiagnosticRequestDownload` • `DiagnosticDataTransfer` • `DiagnosticTransferExit` • `DiagnosticRequestFileTransfer`⌋

八项白名单**不含 `DiagnosticAuthentication`**。

配套约束 **`[constr_10546]`**：⌈A PPortPrototype that is typed by `DiagnosticGenericUdsInterface` shall only be referenced in the role `pPortPrototypeInExecutable` by a `DiagnosticServiceGenericMapping`.⌋ 反向锁定了 Generic UDS 端口的唯一用途。

**结论**：Generic Mapping 是为"数据传输类 / 控制类"服务设计的通用透传通道，认证服务被有意排除在外。这符合安全设计原则——认证不应绕过 DM 的集中式访问控制。

> 标签：`AUTOSAR-NORM`（白名单穷尽）

### 5.3 旁路 C：复用 APCE 的 0x01/0x03 端口挂 ACR 处理器 —— ❌ 三重约束锁死

**设想**：既然 `DiagnosticVerifyCertificateUnidirectional`（`0x01`）名字里有 "Unidirectional"，`DiagnosticProofOfOwnership`（`0x03`）本来就是验 POWN，那就复用这两个 DEXT 实例 + 对应 PortMapping，让应用在回调里实际执行 ACR 逻辑。

**这是本主题最危险的误判**，需要逐层排除。

**(a) 语义错配 — 报文格式完全不同**

| | `0x01` VCU（APCE） | `0x05` RCFA（ACR） |
|---|---|---|
| 请求参数 | COCO + LOCECL + CECL + LOCHCL + CHCL | COCO + **AI(16 字节)** |
| 语义 | 提交证书供验证 | 请求服务端挑战，声明算法 |

| | `0x03` POWN（APCE） | `0x06` VPOWNU（ACR） |
|---|---|---|
| 请求参数 | LPOWNCL + POWNCL + LOEPKCL + EPKCL | **AI(16)** + LPOWNCL + POWNCL + LOCHCL + CHCL + LOAP + **AP** |
| 响应参数 | RV + LOSKI + SKI | RV + **AI(16)** + LOSKI + SKI |

ACR 报文强制携带 16 字节 `algorithmIndicator`，APCE 报文完全没有该字段。DM 按 `[SWS_DM_01226]` 只认 `0x01`/`0x03` 的报文布局，收到 `29 05`/`29 06` 时按 `[SWS_DM_00100]` 直接返回 NRC `0x12`——**根本到不了应用回调**。

**(b) 子功能编号不可改写**

DEXT 中 `DiagnosticVerifyCertificateUnidirectional` 与子功能 `0x01` 的对应关系由 `[TPS_DEXT_01158]` 固定（"Verify certificate unidirectional, formalized by meta-class ..."）。该元类**无 `customSubFunctionNumber` 属性**——注意对比：`DiagnosticEcuReset` 与 `DiagnosticComControl` 是有 `customSubFunctionNumber` 的（"This attribute shall be used to define a custom sub-function number if none of the standardized values of category shall be used"），而 Authentication 系列六个子类的属性表全为空。**AUTOSAR 有意不允许改写 0x29 的子功能号。**

**(c) 强制配置组合无法规避 — `[constr_10091]` + `[SWS_DM_01227]` + `[SWS_DM_01228]`**

- `[constr_10091]`：启用 0x29 → 必须配 `DeAuthentication` + `ProofOfOwnership` + `AuthenticationConfiguration` + （VCU 或 VCB 之一）。
- **`[SWS_DM_01227] Configuration of authentication types`**：⌈If the sub function `DiagnosticProofOfOwnership` ... is configured, the Diagnostic Manager shall mandatorily require one of the following sub functions to be configured as well: `DiagnosticVerifyCertificateUnidirectional` / `DiagnosticVerifyCertificateBidirectional`⌋
- **`[SWS_DM_01228] Mandatory sub functions`**：⌈If one of `DiagnosticVerifyCertificateUnidirectional` / `DiagnosticVerifyCertificateBidirectional` / `DiagnosticProofOfOwnership` is configured, the Diagnostic Manager shall mandatorily require `DiagnosticDeAuthenticate` and `DiagnosticAuthenticationConfiguration` to be configured as well.⌋

即：**任何合法的 0x29 配置都必然是一套完整的 APCE。** 项目无法配出"只有 ACR 语义"的 0x29。

**(d) PortMapping 引用目标为空 — `[constr_10092]` + `[constr_10093]`**

- `[constr_10093]`：⌈Each `DiagnosticAuthentication` shall only be referenced by **exactly one** `DiagnosticAuthenticationPortMapping`.⌋ → 一个 APCE 实例只能绑一个端口，不能"顺便再挂一个 ACR handler"。
- `[constr_10092]`：⌈If a PPortPrototype is referenced by a `DiagnosticAuthenticationPortMapping`, then the PPortPrototype shall be typed by a `DiagnosticAuthenticationInterface`.⌋ → 端口类型被锁死为 APCE 语义的接口。

**结论**：`0x01`/`0x03` 不能复用为 ACR。它们在报文格式、子功能编号、配置组合、端口绑定四个层面都被锁定为 APCE。

> **再次强调术语陷阱**：`DiagnosticVerifyCertificateUnidirectional` 里的 "Unidirectional" 描述的是**证书验证的方向性**（只验客户端证书，服务端不回证书），对应 ISO Table 74 脚注 `C1 Only if authentication with PKI Certificate Exchange (APCE) is used`。它与 ACR 的 `verifyProofOfOwnershipUnidirectional`（`C2 Only if ACR is used`）分属互斥族。

> 标签：`AUTOSAR-NORM`（多重约束排除）

### 5.4 旁路小结

| 旁路 | 排除依据 | 结论 |
|------|---------|------|
| A. CustomService 承载 0x29 | `[constr_1330]` | ❌ SID 0x29 为 ISO 保留，不得用作 `customServiceId` |
| B. Generic Mapping 透传 0x29 | `[TPS_MANI_01453]` + `[constr_10546]` | ❌ 八项白名单不含 Authentication |
| C. 复用 APCE 0x01/0x03 | `[TPS_DEXT_01158]`、`[SWS_DM_01226]`、`[SWS_DM_00100]`、`[SWS_DM_01227]`、`[SWS_DM_01228]`、`[constr_10091]`、`[constr_10092]`、`[constr_10093]` | ❌ 报文/编号/配置/绑定四层锁死 |

**唯一在标准之内的着力点**：§4.4 的 `ExternalAuthentication` → `ClientAuthentication::Authenticate` 通路（`[TPS_MANI_01362]` 明示其"not bound to the existence of UDS service 0x29"）。ACR 的**认证结果注入**走这条路合法；ACR 的**报文收发**必须在 DM 标准行为之外实现。

---

## 6. 分层 Gap 清单

共 **30 项 Gap**，分七层。每项给出影响、标准状态、项目决策要求与建议验证方法。

图例：影响 **H**=高（阻塞 ACR 基本功能）/ **M**=中（影响互操作或合规）/ **L**=低（工程质量）

### 6.1 A 层 — DEXT 元模型（9 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-DEXT-01** | 无 `0x05 RCFA` 子功能元类 | H | `GAP`（`[TPS_DEXT_01158]` 五项 + 六子类枚举穷尽，无 RCFA） | 冻结 ACR 配置载体：`Sdg`/`adminData` 私有扩展 vs 完全脱离 DEXT 的独立配置文件 | ARXML schema 校验：确认无法实例化 ACR 子类；DEXT 导入工具报错行为记录 |
| **GAP-DEXT-02** | 元模型明文限定仅 PKI 证书交换 | H | `GAP`（`[TPS_DEXT_01159]`：only PKI certificate exchange） | 承认非标；冻结"私有扩展"定位并记入项目偏差清单（deviation） | 文档评审；与 OEM 确认可接受偏差 |
| **GAP-DEXT-03** | 强制 APCE 子功能集合，无 ACR 分支 | H | `GAP`（`[constr_10091]`，AP: IT_DiagDes） | 冻结：是否同时保留一套"占位 APCE"配置以通过 DEXT 校验；若是，需定义占位实例的运行时行为 | DEXT 一致性检查工具跑 `constr_10091`；确认占位配置不产生意外的 0x01/0x02/0x03 可达路径 |
| **GAP-DEXT-04** | 无 `algorithmIndicator`（16 字节 OID）建模位 | H | `GAP` | **冻结算法 OID 取值与来源**（本文不代选） | 与 OEM/ISO 对齐 OID 列表；定义 DM 侧一致性校验点 |
| **GAP-DEXT-05** | 无 COCO / 会话密钥建立策略建模位 | H | `GAP` | 冻结 COCO 各 bit 语义与"是否建会话密钥"的判定规则 | 报文级测试：COCO 各取值 → 期望 SKI 存在性 |
| **GAP-DEXT-06** | 无 `additionalParameter` 需求指示建模位 | M | `GAP` | 冻结是否使用 AP；若用，冻结其格式与服务端指示方式 | 若不使用：验证 `LOAP == 0x0000` 时不发送 AP |
| **GAP-DEXT-07** | 无对称/非对称密钥引用建模位 | H | `GAP` | 冻结密码体制（对称 / 非对称 / 双支持）及密钥标识方式 | 密钥装载测试；与 Crypto Stack 接口评审 |
| **GAP-DEXT-08** | `0x08` 无 ACR 变体配置项 | M | `GAP`（DEXT 侧 `DiagnosticAuthenticationConfiguration` 属性表为空） | 冻结 `0x08` 应答的 RV（`0x03` 非对称 / `0x04` 对称），并冻结其配置来源 | 报文测试：`29 08` → 期望 `69 08 03` 或 `69 08 04` |
| **GAP-DEXT-09** | 无 ACR 失败计数/延时/锁定策略 | M | `GAP`（`DiagnosticSecurityAccessClass.securityDelayTime` / `securityDelayTimeOnBoot` 为 0x27 专用，见 `[constr_10045]`） | 冻结失败阈值、延时曲线、上电行为 | 暴力破解防护测试；断电重启后延时状态验证 |

### 6.2 B 层 — AP Manifest / PortMapping（5 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-MANI-01** | `DiagnosticAuthenticationPortMapping.diagnosticAuthentication` 无 ACR 可引用目标 | H | `GAP`（类型为 `DiagnosticAuthentication`，六具体子类均 APCE） | 冻结 ACR handler 的绑定方式（非标 PortMapping / 私有 InstanceSpecifier / 直接进程内绑定） | Manifest 生成与部署验证；确认运行时能拿到正确 InstanceSpecifier |
| **GAP-MANI-02** | PPort 类型被锁为 `DiagnosticAuthenticationInterface` | M | `AUTOSAR-NORM`（`[constr_10092]`）→ 对 ACR 构成 `GAP` | 冻结是否新增私有 PortInterface；若是，明确其非标性质 | Manifest schema 校验；接口版本管理评审 |
| **GAP-MANI-03** | 每个 `DiagnosticAuthentication` 仅允许一个 PortMapping | M | `AUTOSAR-NORM`（`[constr_10093]`） | 确认不通过"复用 APCE 实例挂第二个端口"实现 ACR（旁路 C 已排除） | 配置评审：确认无 1:N 违规映射 |
| **GAP-MANI-04** | Generic Mapping 白名单不含 Authentication | M | `AUTOSAR-NORM`（`[TPS_MANI_01453]` + `[constr_10546]`） | 确认放弃 Generic Mapping 方案（旁路 B 已排除） | 配置评审：确认无 `DiagnosticGenericUdsInterface` 用于 0x29 |
| **GAP-MANI-05** | `authenticationTimeout` 不覆盖会话密钥寿命 | M | 部分 `AUTOSAR-NORM`（`[constr_10663]`、`[SWS_DM_01210]`） | 冻结会话密钥独立的有效期与轮换策略 | 长连接测试：认证态超时 vs 会话密钥失效的时序关系 |

> **GAP-MANI-01 是 B 层的核心**。它不是"缺机制"，而是"机制的引用端为空"——`DiagnosticAuthenticationPortMapping` 本身完好，但它要求指向一个 `DiagnosticAuthentication` 子类实例，而 ACR 没有这样的子类。这决定了 ACR handler 无法通过标准 Manifest 路径获得 InstanceSpecifier。

### 6.3 C 层 — `ara::diag` API（5 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-API-01** | 无服务端挑战生成回调（ISO 步骤 (2)） | H | `GAP`（`ara::diag::Authentication` 现有方法均由 `0x01`–`0x04` 驱动） | 冻结挑战生成的责任方（DM 扩展 vs 应用）与调用时机 | 单元测试：挑战唯一性、随机性、长度；`0x05` 响应中 CHSE 正确填充 |
| **GAP-API-02** | 无 `0x06` 专用 POWN 验证回调 | H | `GAP`（`VerifyOwnership` 绑定 `[SWS_DM_01240]` 的 `0x03` 语义，入参为 `ClientPOWN` + `ClientEphemeralPublicKey`） | 冻结 ACR POWN 验证的调用契约（**不复用** `VerifyOwnership` 以免语义污染） | 契约测试：ACR 路径与 APCE 路径互不串扰 |
| **GAP-API-03** | 回调无 `algorithmIndicator` 传递 | H | `GAP` | 冻结 AI 如何送达验证方，以及 `0x05`↔`0x06` 一致性校验在哪一层执行 | 负例测试：`0x06` 的 AI 与 `0x05` 不一致 → 期望拒绝（NRC 由项目冻结） |
| **GAP-API-04** | 回调无 `additionalParameter` 传递 | M | `GAP` | 若使用 AP，冻结传递契约；若不使用，冻结"始终 `LOAP=0`"约定 | 报文测试：AP 存在/不存在两种路径 |
| **GAP-API-05** | SKI 仅由 APCE `0x03` 路径产出 | H | `GAP`（`[SWS_DM_01243]`：DM 从 `VerifyOwnership` 返回值派生 `LOSKI` 并填 `SKI`，RV 固定 `0x12`） | 冻结 ACR 路径的 SKI 生成与返回契约 | 报文测试：`0x06` 正响应中 SKI 长度与内容；COCO 未要求时 SKI 缺省行为 |

### 6.4 D 层 — DM 运行时行为（4 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-DM-01** | `0x05`/`0x06` 落入 `[SWS_DM_00100]` → NRC `0x12` | H | `AUTOSAR-NORM`（这是规范要求的行为） | 冻结如何合法地改变该行为（供应商 DM 扩展点 / 前置拦截 / 私有 SID），并评估对一致性测试的影响 | **基线回归**：未启用 ACR 时 `29 05` 必须返回 `7F 29 12`；启用后行为变更须显式记录 |
| **GAP-DM-02** | `[SWS_DM_01246]` 把 `0x08` 的 RV 硬编码为 `0x02` | M | `AUTOSAR-NORM`（明文 "shall set ... RV to 0x02 (AuthenticationConfiguration APCE)"） | 冻结 ACR 场景下 `0x08` 的应答值（ISO Table B.5：`0x03` ACR 非对称 / `0x04` ACR 对称）及其与 APCE 共存时的取值规则 | 报文测试：`29 08` 应答值与实际支持的认证族一致 |
| **GAP-DM-03** | ACR 状态机无规范：challenge 有效期、一次性、与 client 绑定 | H | `GAP`（APCE 侧有 `[SWS_DM_01239]` 等先例，但不适用于 ACR） | 冻结 challenge 生命周期、重放防护、跨客户端隔离规则 | **安全测试**：A 取挑战 B 应答 → 必须拒绝；挑战重放 → 必须拒绝；超时挑战 → 必须拒绝 |
| **GAP-DM-04** | 强制 APCE 组合导致"纯 ACR"配置不合法 | M | `AUTOSAR-NORM`（`[SWS_DM_01227]` + `[SWS_DM_01228]` + `[constr_10091]`） | 冻结共存策略：是否保留可用的 APCE 通路，或配置占位实例并在运行时禁用 | 配置矩阵测试：若 APCE 为占位，验证 `29 01`/`29 02`/`29 03` 的实际响应符合冻结的预期 |

### 6.5 E 层 — 密码学与密钥管理（3 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-CRY-01** | 算法 OID 与算法族未定 | H | `PROJECT-DECISION`（ISO 10.6.3 建议 ISO/IEC 9798-2 / 9798-4，但不强制具体算法） | **冻结算法族与 16 字节 AI 编码**（本文不代选） | 与 OEM 规范交叉验证；跨供应商互操作测试 |
| **GAP-CRY-02** | 对称预共享密钥 provisioning 无 DM 侧规范 | H | `PROJECT-DECISION`（ISO Prerequisites 要求密钥预置，未规定手段） | 冻结密钥注入、存储（HSM/Crypto Stack）、轮换、吊销流程 | 密钥生命周期测试；产线注入流程验证 |
| **GAP-CRY-03** | 会话密钥与传输层（DoIP/TLS）的绑定未规范 | M | `PROJECT-DECISION` | 冻结 SKI 用途：是否真正加密后续诊断通信，还是仅作认证凭据 | 端到端测试：会话密钥启用后的报文保护验证 |

### 6.6 F 层 — 安全事件与审计（2 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-SEC-01** | 无 ACR 细粒度失败 SEV（算法不匹配、挑战滥用、会话密钥失败等） | M | `GAP`（ID 105 仅表达 0x29 负响应及 NRC，不区分 ACR 原因；[SWS_DM_02025]/[02026]） | 冻结是否复用 ID 105 并补充厂商 SEV，以及 ID 区间、上下文数据 | IdsM 集成测试：ACR 失败场景产生期望事件且不重复/泄密 |
| **GAP-SEC-02** | ACR `0x06` 成功无标准触发条款 | L | `GAP`（ID 104 的 [SWS_DM_02023]/[02024] 仅绑定 `0x03 proofOfOwnership` 成功） | 冻结是否定义成功审计（法规/OEM 要求驱动） | 审计日志完整性检查 |

### 6.7 G 层 — 工具链与可移植性（2 项）

| Gap ID | 缺口 | 影响 | 标准状态 | 项目决策 | 建议验证 |
|--------|------|:----:|---------|---------|---------|
| **GAP-TOOL-01** | ARXML schema 无 ACR 元类，标准工具无法校验配置 | M | `GAP` | 冻结私有配置的校验手段（自研 linter / Sdg 约定 / 外部配置文件 + schema） | 配置校验流水线；错误配置的可检出性测试 |
| **GAP-TOOL-02** | ACR 实现依赖供应商 DM 私有扩展，跨栈不可移植 | M | `PROJECT-DECISION` | 冻结抽象层边界，隔离供应商相关代码；记录移植成本 | 架构评审；接口依赖清单 |

### 6.8 Gap 统计

| 层 | 数量 | 其中 `GAP` | 其中 `AUTOSAR-NORM`（构成约束） | 其中 `PROJECT-DECISION` |
|----|:----:|:---------:|:---------------------------:|:----------------------:|
| A. DEXT | 9 | 9 | 0 | 0 |
| B. AP Manifest | 5 | 1 | 4 | 0 |
| C. `ara::diag` API | 5 | 5 | 0 | 0 |
| D. DM 运行时 | 4 | 1 | 3 | 0 |
| E. 密码学 | 3 | 0 | 0 | 3 |
| F. 安全事件 | 2 | 2 | 0 | 0 |
| G. 工具链 | 2 | 1 | 0 | 1 |
| **合计** | **30** | **19** | **7** | **4** |

**读法**：19 项是"标准真的没有"；7 项是"标准有明确规定，但该规定恰好把 ACR 挡在门外"（这类最容易被误判为"可以变通"，实际是硬约束）；4 项是"标准有意留白，等项目决策"。

按影响分布：**H = 15**、**M = 14**、**L = 1**。15 项高影响 Gap 中，DEXT 层占 6 项、API 层占 4 项、DM 运行时占 2 项、密码学占 2 项、Manifest 占 1 项。

---

## 7. 最小项目冻结清单

以下 12 项**必须在开工前书面冻结**，否则实现无法收敛。本清单只定义**需要决定什么**与**判定标准**，**不预设答案**。

| ID | 冻结项 | 关联 Gap | 必要性 | 判定标准（冻结完成的标志） |
|----|--------|---------|:------:|--------------------------|
| **PD-01** | ACR 变体范围：仅单向（`0x05`+`0x06`），还是含双向（`0x07`） | GAP-DEXT-01/02 | 必须 | 书面确认支持的子功能编号集合 |
| **PD-02** | 密码体制：对称 / 非对称 / 双支持 | GAP-DEXT-07、GAP-CRY-01/02 | 必须 | 与 `0x08` 的 RV（`0x03`/`0x04`）取值一致 |
| **PD-03** | `algorithmIndicator` 的 16 字节 OID 取值表 | GAP-DEXT-04、GAP-API-03 | 必须 | OID 清单 + 来源（OEM 规范 / ISO 注册）+ 未知 AI 的拒绝行为 |
| **PD-04** | COCO 各 bit 语义与会话密钥建立判定规则 | GAP-DEXT-05、GAP-API-05 | 必须 | 位定义表 + 每种取值对应的 SKI 存在性 |
| **PD-05** | 是否使用 `additionalParameter`；若用，格式与指示方式 | GAP-DEXT-06、GAP-API-04 | 必须 | 明确“用/不用”；不用则约定 `0x05` 响应 `LONAP` 与 `0x06` 请求 `LOAP` 均为 `0x0000` |
| **PD-06** | ACR 配置载体：`Sdg`/`adminData` vs 独立配置文件 | GAP-DEXT-01、GAP-TOOL-01 | 必须 | 载体选定 + 校验手段选定 |
| **PD-07** | APCE 共存策略：完全可用 / 占位配置 / 运行时禁用 | GAP-DEXT-03、GAP-DM-04 | 必须 | `constr_10091` 合规方案 + 占位实例的运行时行为定义 |
| **PD-08** | `0x08 authenticationConfiguration` 的应答 RV | GAP-DEXT-08、GAP-DM-02 | 必须 | 明确 `0x02`/`0x03`/`0x04` 的选取规则（含 APCE+ACR 共存场景） |
| **PD-09** | challenge 生命周期：有效期、一次性、client 绑定、重放防护 | GAP-DM-03 | 必须 | 状态机定义 + 各违规场景的 NRC |
| **PD-10** | 认证失败策略：计数阈值、延时曲线、上电行为 | GAP-DEXT-09 | 必须 | 阈值表 + 掉电保持策略 |
| **PD-11** | ACR handler 的部署绑定方式 | GAP-MANI-01/02 | 必须 | InstanceSpecifier 获取路径 + 私有 PortInterface 定义（若有） |
| **PD-12** | 安全事件：是否定义厂商 SEV 及 ID 区间 | GAP-SEC-01/02 | 建议 | 事件清单 + 上下文数据 schema |

**冻结门禁**：PD-01 至 PD-11 全部关闭前不应进入编码阶段。PD-02、PD-03、PD-04 三项相互耦合（密码体制决定 OID 取值范围，OID 与 COCO 共同决定会话密钥流程），建议同批次评审。

---

## 8. 实现影响评估

### 8.1 架构分层与责任边界

基于 §4.4 的结论——`ExternalAuthentication` 通路与 0x29 解耦——ACR 实现的合理分层是：

| 层 | 职责 | 标准状态 | 备注 |
|----|------|---------|------|
| L1 报文收发 | `29 05` / `29 06` 的接收、解析、应答构造 | **非标** | 需绕过 `[SWS_DM_00100]` 的 NRC `0x12` 路径（GAP-DM-01） |
| L2 协议状态机 | challenge 生成/保存/失效、AI 一致性校验、client 绑定 | **非标** | PD-03、PD-09 |
| L3 密码学 | POWN 验证、会话密钥派生 | **非标**（可接 Crypto Stack / HSM） | PD-02、PD-03 |
| L4 结果注入 | 调用 `ClientAuthentication::Authenticate(roles)` | **✅ 标准** | `[SWS_DM_01202]`/`[SWS_DM_01203]`/`Authenticate` |
| L5 授权与访问控制 | Role 判定、DAL、NRC `0x34`、超时 | **✅ 标准** | `DiagnosticAuthRole`、`ClientAuthenticationHandle`、`[SWS_DM_01210]`、`[SWS_DM_01223]`–`[SWS_DM_01225]` |
| L6 审计 | NRC `0x34` 安全事件 | **✅ 标准**（ACR 专属事件非标） | `SEV_UDS_AUTHENTICATION_NEEDED` |

**关键判断**：L4–L6 完全落在标准之内，占认证子系统功能面的相当比重。项目的非标工作集中在 L1–L3。这是本分析对项目最有价值的结论——**不要重写整个认证栈**。

### 8.2 合规性影响

| 维度 | 影响 |
|------|------|
| AUTOSAR AP 一致性 | L1–L3 属规范外扩展。SWS 7.3.2.8.11 的 `may only implement the specifications of this chapter` 意味着启用 ACR 后，DM 的 0x29 行为**不再是标准合规行为**，需在项目偏差清单中登记 |
| ISO 14229-1 一致性 | 若 L1–L3 严格按 ISO 10.6.3 实现，**ACR 报文层面可以是 ISO 合规的**。这是 ACR 相比"私有 SID 方案"的核心优势 |
| 通用诊断工具互操作 | 取决于 L1–L3 的 ISO 符合度。AI/COCO 的私有取值会降低互操作性 |
| DM 栈可移植性 | L1–L3 依赖供应商扩展点，跨栈迁移成本高（GAP-TOOL-02）。建议在 L3/L4 之间设清晰抽象边界 |
| 配置工具链 | ACR 配置不可被标准 ARXML 工具校验（GAP-TOOL-01），需自建校验 |

### 8.3 测试重点

标准未覆盖的部分意味着**测试也必须自建**。优先级最高的三类：

1. **基线否定测试**（对应 GAP-DM-01）：未启用 ACR 的配置下，`29 05` / `29 06` **必须**返回 `7F 29 12`。这条测试保护的是"不要在无意中打开了 ACR 路径"。
2. **重放与串扰测试**（对应 GAP-DM-03）：挑战重放、跨客户端挑战盗用、超时挑战复用、并发多客户端挑战隔离。标准无要求，但这是 ACR 的核心安全属性。
3. **AI 一致性测试**（对应 GAP-API-03）：ISO 明文要求 `0x06` 的 AI 必须等于 `0x05` 的 AI。这是 ISO 强制的一致性约束，必须有对应负例测试。

其次是 `0x08` RV 正确性（GAP-DM-02）、SKI 生成路径（GAP-API-05）、失败延时策略（GAP-DEXT-09）。

### 8.4 与既有 APCE 实现的共存风险

若项目已实现或计划实现 APCE（`constr_10091` 事实上强制了 APCE 配置的存在），需重点关注：

- **状态机串扰**：APCE 与 ACR 各自的认证序列不应相互干扰。APCE 侧 `[SWS_DM_01243]` 后有明确的"认证序列完成"语义（"A new authentication sequence must be started with a `verifyCertificateUnidirectional` or `verifyCertificateBidirectional`"），ACR 需要对等且独立的序列定义。
- **`0x08` 应答歧义**：同时支持两族时，单字节 RV 无法同时表达 APCE 与 ACR（PD-08 必须给出确定规则）。
- **占位 APCE 的可达性**：若 APCE 仅为满足 `constr_10091` 而配置，必须确认 `29 01`/`29 02`/`29 03` 不会成为绕过 ACR 的认证后门。这是 PD-07 的安全含义，容易被忽略。

---

## 9. 关联文档

| 文档 | 关系 |
|------|------|
| [`AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md`](AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md) | **配套实现 Spec**。本文界定“标准缺什么、项目要冻结什么”；该文把未冻结项显式标为 `PROJECT-DECISION`/`BLOCKED`，给出协议、状态、需求与测试基线。两者为“差距框架 ↔ 实现规范”关系 |
| [`AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md`](AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md) | APCE 子集（`0x00`–`0x04`、`0x08`）的规范级分析。本文 §4 复用其 Role/DAL/状态章节结论；§5.3 的排除论证以其 API 契约为依据 |
| [`AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md`](AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md) | **机制与 API 参考**。本文 §4.4 指出的"`ExternalAuthentication` 是 ACR 的关键着力点"在该文档 §1.5/§2.5 展开为完整机制说明；§3.1 表中标为 `AUTOSAR-NORM` 的 C14–C18 能力，其接口约束与配置粒度亦在该文档 §4–§6 详述 |
| [`UDS_0x29_ACR_Unidirectional_Incremental_Module_Breakdown.md`](UDS_0x29_ACR_Unidirectional_Incremental_Module_Breakdown.md) | 从既有 UDS 栈出发的模块与需求拆分。本文 §8.1 的 L1–L6 分层在该文档细化为 16 个模块、99 条需求 |
| [`UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md`](UDS_0x29_ACR_Unidirectional_Config_Item_Inventory.md) | **配置面落地清单**。把本文 30 项 `GAP-*` 与 12 项 `PD-*` 翻译为 12 组 95 条可勾选配置项（诊断栈 + 配置工具双视角），并补充本文未展开的持久化、Crypto/IdsM 宿主归属与跨工具校验规则；其 §17.2 与本文 §7 的冻结清单双向映射 |
| [`AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md`](AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md) | 0x29 的 DEXT / Manifest 配置项清单。本文 §2.4、§6.1、§6.2 的元类与约束以其第 3/4/6/8 节为基础，并在此之上标注 ACR 缺口 |
| [`ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md`](ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md) | ISO 侧 0x29 全集（含 ACR 三子功能）。本文 §3 的 ISO 能力项以其为准 |
| [`AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md`](../AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md) | 五大演进方向。本文属**方向三「安全与访问控制」**，是该方向下"标准边界"的细化 |
| [`AUTOSAR_AP_DM_Evolution_Report_R19-R25.md`](../AUTOSAR_AP_DM_Evolution_Report_R19-R25.md) | 总演进报告。0x29 自 R21-11 引入（DEXT `[TPS_DEXT_01158]`/`[TPS_DEXT_01159]` 与 SWS `[SWS_DM_01226]` 系列同批加入），至 R25-11 仍限于 APCE——**五个版本内 ACR 支持范围无变化**，说明这是稳定的规范范围决策而非阶段性缺失 |

---

## 10. 方法局限与 PDF 回核说明

### 10.1 数据来源与覆盖

- **权威来源**：§1.4 四份 PDF。
- **检索载体**：MinerU（`parse_method=txt`）转换的 Markdown。
- **覆盖版本**：AUTOSAR R25-11 为主；R19–R25 演进趋势引用自既有演进报告，本文未对 R19–R24 的 0x29 章节做逐版本重新核对。

### 10.2 已知转换噪声与应对

| 噪声类型 | 具体表现 | 本文应对 |
|---------|---------|---------|
| 表格结构丢失 | ISO 原始 Markdown 的 Table 70/71/81/82 存在 HTML/OCR 噪声 | 使用仓库中已按 PDF 校正的 ISO 全量译本与配套实现 Spec 交叉验证字段序列；量产仍以授权 PDF golden vector 为门禁 |
| 需求 ID 分散 | `[TPS_DEXT_01158]` 等在变更历史表与正文中各出现一次，检索易只命中变更历史 | 对每个 ID 都定位到 **4.3.8.3 正文**的 ⌈⌋ 条款体，而非仅凭变更历史标题 |
| API 名粘连 | `ara::diag::...` 在部分行被拆断或粘连 | API 结论以 SWS 第 7 章的 ⌈⌋ 需求体为准，第 8 章 API 目录仅作交叉印证 |
| 数值上下标 | ISO 中 `0x05` 呈现为 `$0 5 _ { 1 6 }$` 形式 | 人工还原；关键值（`0x05`/`0x06`/`0x02`/`0x03`/`0x04`）在多处出现互证 |
| 属性表空行 | DEXT Table 4.52–4.57 的若干属性列显示为 `一`/`-` | 结合 Table 4.51 的 Subclasses 与 Manifest Table 5.58/5.59 交叉判断，避免把 OCR 空单元格当配置属性 |

### 10.3 结论强度分级

| 结论 | 强度 | 依据 |
|------|------|------|
| AP DM R25-11 不支持 ACR | **确定** | 两份独立文档各有一处自然语言明文排除（SWS Note + `[TPS_DEXT_01159]`），加元模型六子类结构性穷尽 |
| `0x05`/`0x06` 无 DEXT 元类 | **确定** | `DiagnosticAuthentication` Subclasses 枚举在 DEXT Table 4.51 与 Manifest Table 5.58 两处一致穷尽 |
| `0x05`/`0x06` 触发 NRC `0x12` | **高** | `[SWS_DM_00100]` 明文推导；建议在目标 DM 栈上实测确认 |
| `ara::diag` 无 ACR 回调 | **高** | 现有四个回调均由 `[SWS_DM_01230]`/`[SWS_DM_01235]`/`[SWS_DM_01240]`/`[SWS_DM_01248]` 绑定到 APCE 子功能；SWS 第 8 章无其他 Authentication 业务方法 |
| CustomService / Generic Mapping 旁路不可用 | **确定** | `[constr_1330]`、`[TPS_MANI_01453]`、`[constr_10546]` 明文 |
| ISO ACR 报文字段清单 | **高** | 已按 PDF 校正译本核对 Table 70/71/81/82；量产联调仍须使用授权 PDF golden vector |

### 10.4 建议 PDF 回核清单

以下四项在正式项目文档中引用前，**应在 PDF 原文核对**：

1. **ISO 14229-1:2020 Table 81**（`0x05` 响应完整字段序列）——已通过校正译本核对 `RV + AI + LOCHSE/CHSE + LONAP/NAP`；正式联调仍逐字节复核 PDF。
2. **ISO 14229-1:2020 Table 82**（`0x06` 响应完整字段序列）——已通过校正译本核对 `RV + AI + LOSKI/SKI`；正式联调仍逐字节复核 PDF。
3. **ISO 14229-1:2020 §10.6.7 Table 86、Figure 11 与 Annex A**——项目需冻结 `0x12/0x13/0x22/0x24`、`0x50–0x5D` 及通用 `0x10` 的边界和优先级。
4. **AUTOSAR SWS Diagnostics R25-11 第 8.3.1 节**完整方法列表——本文据第 7 章需求体推断 `ara::diag::Authentication` 无 ACR 相关业务方法；建议对照第 8 章完整成员函数清单确认无遗漏。

### 10.5 有效期

本文结论绑定 **R25-11**。AUTOSAR 若在后续版本引入 ACR 元类（届时会体现为 DEXT 新增 `DiagnosticAuthentication` 子类、`[TPS_DEXT_01159]` 措辞变更、`[SWS_DM_01226]` 白名单扩展、SWS Note 中 "currently out of scope" 的移除），本文 §2、§3、§6 需整体重核。

> SWS Note 中的 "**currently** out of scope" 一词值得注意——它暗示 AUTOSAR 并未把 ACR 永久排除，而是标记为当前版本未纳入。建议在每个新版本发布后检查这一句是否变化。

---

## 附录 A. 证据锚点索引

### A.1 AUTOSAR AP SWS Diagnostics R25-11

PDF：`../autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf`

| 锚点 | 章节 | 内容 |
|------|------|------|
| 章节前言 | 7.3.2.8.11 | 本章为 ISO 0x29 真子集；DM `may only implement` 本章内容 |
| `[SWS_DM_01226]` | 7.3.2.8.11 | 六子功能白名单 + **ACR out of scope 明文 Note** |
| `[SWS_DM_01227]` | 7.3.2.8.11 | POWN 配置 → 必须配 VCU 或 VCB |
| `[SWS_DM_01228]` | 7.3.2.8.11 | VCU/VCB/POWN 任一 → 必须配 DeAuthenticate + AuthenticationConfiguration |
| `[SWS_DM_01230]` | 7.3.2.8.11.2 | `0x01` → `Authentication::VerifyCertificateUnidirectional`(COCO, CECL, CHCL) |
| `[SWS_DM_01233]` | 7.3.2.8.11.2 | `0x01` 正响应：CHSE / EPKSE，RV = `0x11` |
| `[SWS_DM_01235]` | 7.3.2.8.11.3 | `0x02` → `Authentication::VerifyCertificateBidirectional`(COCO, CECL, CHCL) |
| `[SWS_DM_01239]` | 7.3.2.8.11.3 | 来自不同客户端的意外 VCB（客户端隔离先例） |
| `[SWS_DM_01240]` | 7.3.2.8.11.4 | `0x03` → `Authentication::VerifyOwnership`(POWNCL, EPKCL) |
| `[SWS_DM_01243]` | 7.3.2.8.11.4 | `0x03` 正响应：LOSKI / SKI，RV = `0x12`；序列完成语义 |
| `[SWS_DM_01244]`/`[SWS_DM_01245]` | 7.3.2.8.11.1 | `0x00` 处理；RV = `0x10` |
| `[SWS_DM_01246]` | 7.3.2.8.11.6 | **`0x08` RV 硬编码 `0x02`（APCE）** |
| `[SWS_DM_01247]`/`[SWS_DM_01248]`/`[SWS_DM_01251]` | 7.3.2.8.11.5 | `0x04` CEID 校验、`TransmitCertificate::Process`、RV = `0x13` |
| `[SWS_DM_00099]` | 7.3.2.5.2 | SID 级 service processor 检查 → NRC `0x11` |
| `[SWS_DM_00100]` | 7.3.2.5.2 | **子功能级检查 → NRC `0x12`** |
| `[SWS_DM_01202]`/`[SWS_DM_01203]` | 7.3.2.3.1 | `ExternalAuthentication::Get` / `GetAll` |
| `[SWS_DM_01204]`/`[SWS_DM_01205]` | 7.3.2.3.2 | 默认角色（`isDefault`）/ 默认状态 |
| `[SWS_DM_01210]` / `[SWS_DM_01211]` | 7.3.2.3.2 | `authenticationTimeout` / S3server timeout 去认证 |
| `[SWS_DM_01360]` | 7.3.2.3.2 | `SetNotifier` 覆盖语义 |
| `[SWS_DM_01123]` | 8.3.1 | `ara::diag::Authentication` 类定义（Port Interface: `DiagnosticAuthenticationInterface`） |
| NRC 0x34 需求 | 7.3.2.4 | `[SWS_DM_01223]`/`[SWS_DM_01224]` 检查失败后由 `[SWS_DM_01225]` 返回 NRC `0x34` |
| `SEV_UDS_AUTHENTICATION_NEEDED` | 安全事件章节 | ID 101，NRC 0x34 触发 |
| `RS_Diag_04251` | 6 Requirements Tracing | 0x29 上游需求，追溯约 53 条 SWS_DM |

### A.2 AUTOSAR CP TPS DiagnosticExtractTemplate R25-11

PDF：`../autosar/AUTOSAR_CP_TPS_DiagnosticExtractTemplate_R25-11.pdf`

| 锚点 | 章节 | 内容 |
|------|------|------|
| `[TPS_DEXT_01158]` | 4.3.8.3 | Authentication 支持的子功能（五项） |
| `[TPS_DEXT_01159]` | 4.3.8.3 | **仅支持 PKI 证书交换** |
| `[constr_10091]` | 4.3.8.3 | **强制子功能集合**（AP: IT_DiagDes） |
| Table 4.51 | 4.3.8.3 | `DiagnosticAuthentication` 抽象类 + 六 Subclasses |
| Table 4.52 | 4.3.8.3 | `DiagnosticAuthenticationClass` |
| Table 4.53–4.58 | 4.3.8.3 | 六个 `DiagnosticAuthentication` 具体子类 |
| Table 4.59 | 4.3.8.3 | `DiagnosticAuthTransmitCertificateEvaluation` |
| `[TPS_DEXT_01192]`–`[TPS_DEXT_01194]` | 4.3.8.3 | `evaluationId` / `function` / `FUNCTION_SECURE_CODING` |
| `[TPS_DEXT_01154]` | 4.3.3 | `DiagnosticAuthRole` 语义（`bitPosition`、`isDefault`） |
| `[TPS_DEXT_01188]`–`[TPS_DEXT_01191]` | 4.3.3 | `authenticationEnabled` / `DiagnosticAuthRoleProxy` 四态语义 |
| Table 4.33/4.34 | 4.3.3 | `DiagnosticAuthRoleProxy` / `DiagnosticAuthRole` |
| `[constr_1329]` | 4.3.2 | `DiagnosticServiceClass` 子类唯一性 |
| `[constr_1330]` | 4.3.2 | **`customServiceId` 不得占用 ISO 标准 SID** |
| `[TPS_DEXT_01147]` | 4.3.2 | CustomServiceInstance；仅可用 `Sdg`；工具无支持义务 |
| `authenticationTimeout` 约束 | 4.3.1 | `DiagnosticContributionSet` 引用 `DiagnosticAuthentication` → 属性必须存在 |
| `[constr_10038]` | 变更历史 R21-11 | `DiagnosticAccessPermission.authenticationRole` 使用限制 |
| `[constr_10045]` | 变更历史 R21-11 | `DiagnosticSecurityAccessClass.securityDelayTimeOnBoot`（0x27 专用，对比用） |

### A.3 AUTOSAR AP TPS ManifestSpecification R25-11

PDF：`../autosar/AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf`

| 锚点 | 章节 | 内容 |
|------|------|------|
| `[TPS_MANI_01360]` | 5.2.3.5 | 认证需要两类 PortMapping（Authentication + ExternalAuthentication） |
| `[TPS_MANI_01361]` | 5.2.3.5 | `DiagnosticAuthenticationPortMapping` 三元引用 |
| `[constr_10092]` | 5.2.3.5 | **PPort 必须由 `DiagnosticAuthenticationInterface` 类型化** |
| `[constr_10093]` | 5.2.3.5 | **每个 `DiagnosticAuthentication` 恰一个 PortMapping** |
| `[constr_10526]` | 4.x | TransmitCertificate 端口与 `DiagnosticAuthTransmitCertificate` 对应 |
| Table 5.57/5.58/5.59 | 5.2.3.5 | PortMapping / `DiagnosticAuthentication`（六 Subclasses）/ Class |
| `[TPS_MANI_01362]` | 5.2.3.6 | **ExternalAuthentication 与 0x29 解耦**（"not bound to the existence of UDS service 0x29"） |
| `[constr_10094]` | 5.2.3.6 | RPort 必须由 `DiagnosticExternalAuthenticationInterface` 类型化 |
| Table 5.60 | 5.2.3.6 | `DiagnosticExternalAuthenticationPortMapping` |
| `[TPS_MANI_01326]` | 5.2.3.3.1 | Generic Mapping 三元引用 |
| `[TPS_MANI_01453]` | 5.2.3.3.1 | **Generic Mapping 八项白名单（不含 Authentication）** |
| `[constr_10546]` | 5.2.3.3.1 | `DiagnosticGenericUdsInterface` 端口只能被 Generic Mapping 引用 |
| `[TPS_MANI_01359]` | 4.x | `DiagnosticAuthenticationInterface` 语义 |
| `[TPS_MANI_01353]` | 4.x | `DiagnosticExternalAuthenticationInterface` 语义 |
| `[TPS_MANI_01452]` | 4.x | `DiagnosticTransmitCertificateInterface` 语义 |
| `[TPS_MANI_01435]` | 5.x | `DiagnosticExternalAuthenticationIdentification`（源地址/地址段） |
| `[constr_10663]` | 5.x | **PortMapping 存在 → `authenticationTimeout` 必须存在** |
| `[TPS_MANI_01338]`/`[TPS_MANI_01339]`/`[TPS_MANI_01340]` | 3.x / 4.x | SecurityEvent 报告接口与映射 |

### A.4 ISO 14229-1:2020

PDF：`../iso/ISO 14229-1-2020.pdf`

| 锚点 | 章节 / 表 | 内容 |
|------|-----------|------|
| 10.6.3 | — | **Authentication with Challenge-Response (ACR)**；Prerequisites；Variant 1 单向 (1)–(16)；Variant 2 双向 |
| Figure 10 | 10.6.3 | ACR 认证序列图 |
| NOTE 5 | 10.6.3 | 重新执行 ACR 可替换 rights/roles |
| Table 70 | 10.6.5.1 | `0x05` 请求：COCO + AI(16) |
| Table 71 | 10.6.5.1 | `0x06` 请求：AI(16) + LPOWNCL/POWNCL + LOCHCL/CHCL + LOAP/AP |
| Table 72 | 10.6.5.1 | `0x07` 请求（双向） |
| Table 73 | 10.6.5.1 | `0x08` 请求 |
| Table 74 | 10.6.5.2 | **子功能定义 + 脚注 `C1` APCE / `C2` ACR** |
| Table 75 | 10.6.5.3 | 请求数据参数定义（COCO 与 SKI 的关联说明） |
| Table 81 | 10.6.6.1 | `0x05` 响应；已按校正译本核对，联调仍以 PDF golden vector 为准 |
| Table 82 | 10.6.6.1 | `0x06` 响应；已按校正译本核对，联调仍以 PDF golden vector 为准 |
| Table 83 | 10.6.6.x | `0x07` 响应 |
| 响应数据参数定义 | 10.6.6.x | `lengthOfChallengeServer` / `challengeServer` / `ephemeralPublicKeyServer` 等 |
| **Table B.5** | Annex B | **`authenticationReturnParameter` 定义**：`0x02` APCE / `0x03` ACR 非对称 / `0x04` ACR 对称 / `0x10` DeAuth / `0x11` CVOVN / `0x12` OVAC / `0x13` CV |
| 示例响应 | 10.6.x | `69 08 02`（APCE）、`69 08 03`（ACR 非对称） |
| ISO/IEC 9798-2 / 9798-4 | 10.6.3 引用 | 挑战与认证令牌构造建议 |

---

**文档结束**

> 本文为差距与决策框架，不构成实现规范。ACR 单向的项目级实现规范见配套文档 [`AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md`](AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md)；其中尚未冻结的条目必须保持 `PROJECT-DECISION`/`BLOCKED`，不得作为量产定值。
