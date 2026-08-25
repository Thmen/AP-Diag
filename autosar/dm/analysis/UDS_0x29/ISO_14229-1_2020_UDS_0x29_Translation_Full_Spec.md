# ISO 14229-1:2020 UDS 0x29 Authentication 全量章节中文译本

> **性质**：ISO 14229-1:2020 §10.6 Authentication（`29₁₆`）及规范性附录 **B.5 AuthenticationReturnParameter** 的简体中文译本（检索/学习用）。  
> **权威原文**：以 PDF 为准；Markdown 仅作检索载体。本译本对照 PDF 校正了 MinerU 表格噪声（十六进制粘连、参数名截断、Cvt 错位等）。  
> **非替代品**：不得以本译本替代已获授权的 ISO 正式文本用于合规或商务引用。

| 文档属性 | 值 |
|---|---|
| 基线 | ISO 14229-1:2020（UDS） |
| 覆盖范围 | §10.6（含 10.6.1–10.6.8）+ Annex B.5 |
| 权威原文 | [ISO 14229-1-2020.pdf](../iso/ISO%2014229-1-2020.pdf)（PDF 印页约 p.59–107；B.5 约 p.403–404） |
| 检索载体 | [ISO_14229-1-2020.md](../markdown/ISO_14229-1-2020/ISO_14229-1-2020.md) |
| 交叉链接 | AUTOSAR APCE 子集实现边界见 [AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md](./AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md)；ACR 单向实现见 [AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md](./AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Unidirectional_Spec.md) |
| 翻译约定 | 叙述用简体中文；服务名/子功能名/参数名/Mnemonic/NRC 名保留英文；十六进制写作 `XX₁₆` |
| 插图 | 图 8–11 引用 `../markdown/ISO_14229-1-2020/images/`（需本地已 unpack） |
| 分析日期 | 2026-08-11 |
| 最近 PDF 校对 | 2026-08-25（表 101–118 逐字节补全，对照 `ISO 14229-1-2020.pdf` 印页 p.94–107；此前 2026-08-11 覆盖 p.59–107、B.5 p.403–404） |

## 目录

- [10.6 Authentication（29₁₆）服务](#106-authentication29₁₆服务)
  - [10.6.1 服务概述](#1061-服务概述)
  - [10.6.2 基于 PKI 证书交换的认证（APCE）](#1062-基于-pki-证书交换的认证apce)
  - [10.6.3 基于挑战–响应的认证（ACR）](#1063-基于挑战响应的认证acr)
  - [10.6.4 通用要求](#1064-通用要求)
  - [10.6.5 请求消息](#1065-请求消息)
  - [10.6.6 肯定响应消息](#1066-肯定响应消息)
  - [10.6.7 支持的否定响应码（NRC_）](#1067-支持的否定响应码nrc_)
  - [10.6.8 Authentication 消息流示例](#1068-authentication-消息流示例)
- [附录 B.5 AuthenticationReturnParameter 定义](#附录-b5-authenticationreturnparameter-定义)
- [译本说明与 Markdown 校正要点](#译本说明与-markdown-校正要点)

---

## 10.6 Authentication（29₁₆）服务

### 10.6.1 服务概述

本服务用于让客户端证明自身身份，从而访问因例如安保（security）、排放或功能安全（safety）等原因而受限的数据和/或诊断服务。向服务器下载/上传例程或数据、以及读取服务器特定存储位置等场景，都可能要求认证。向服务器下载不当的例程或数据，可能损坏电子部件或其他车辆部件，或危及车辆对排放、安全或安保标准的符合性；另一方面，从服务器取数也可能破坏数据安全。

本服务支持两种安全概念：

- **概念 #1**：基于 PKI 证书交换流程，使用非对称密码学（见 10.6.2）。证书格式应使用符合 ISO 7816-8 的 CVC，以及符合 ISO/IEC 9594-8、RFC 5280 与 RFC 5755 的 X.509，或 IEEE 1609.2。
- **概念 #2**：基于无 PKI 证书的挑战–响应流程，可使用带软件认证令牌的非对称密码学（见 10.6.3），或对称密码学（见 10.6.3）。

> **NOTE 1** 密码材料的生成、分发与存储不在本文件范围内。

图 8 给出 Authentication 服务安全概念总览。

![Figure 8 — Overview over the Authentication service security concepts](../markdown/ISO_14229-1-2020/images/c02_cb79e73f5fcc40b37a249f129f88b1c23b7ce1bdcf3e5d8640d4bdb23f76d1e5.jpg)

**Figure 8 — Overview over the Authentication service security concepts**

> **NOTE 2** 图 8 仅展示认证的主要选项。

客户端可通过本服务的 SubFunction 参数 `authenticationConfiguration` 识别服务器支持的概念。

### 10.6.2 基于 PKI 证书交换的认证（APCE）

Authentication 服务用于认证、去认证（deAuthentication）以及显式证书传输。SubFunction 参数 `authenticationTask` 标识要处理的任务：

- `deAuthenticate`：主动结束已认证状态。
- `verifyCertificateUnidirectional`：启动单向认证流程，仅认证客户端相对服务器（authenticate the client against the server）。
- `verifyCertificateBidirectional`：启动双向认证流程，认证客户端相对服务器，以及服务器相对客户端。
- `proofOfOwnership`：用于传输所有权证明（Proof of Ownership）数据。  
  > **译本注**：ISO 英文作 *“transmit the proof of ownership data to the client”*；按图 9 步骤 (11) 与表 68，实际为**客户端→服务器**发送 client-side POWN。此处按序列图与报文定义理解。
- `transmitCertificate`：独立于先前认证、或在先前认证之后传输证书。

#### 先决条件

客户端与服务器两侧均应具备不同的证书集（及对应私钥）：

- **单向认证**：客户端需要带私钥的 `certificate client`，以证明自身为合法客户端。取决于 PKI 信任模型，服务器可能需要签发并签署该客户端证书的 CA 证书。
- **双向认证**：客户端需要带私钥的 `certificate client`；服务器还需要带私钥的 `certificate server`。取决于 PKI 信任模型，双方可能需要签发并签署上述证书的 CA 证书。

由 `verifyCertificateUnidirectional` 或 `verifyCertificateBidirectional` 触发的认证过程按图 9 所示分两步进行。

#### 变体 1：单向认证

1. 若 challenge client 会用于 proof of ownership client，则客户端创建 challenge client（1）。  
   建议按 ISO/IEC 9798-3（单向、两遍认证）创建挑战，或创建与之安全等价的挑战。
2. 客户端通过 SubFunction `verifyCertificateUnidirectional` 发送其 `certificate client`，以及（若在 (1) 已生成）其 `challenge client`（2）。
3. 服务器验证 `certificate client`（3）。
4. 服务器创建 `challenge server`（4）。
5. 若客户端在 (2) 中指示基于 Ephemeral Diffie-Hellman 密钥协商建立会话密钥，则服务器生成临时公私钥对，以便稍后派生会话密钥（5）。  
   > **NOTE 1** 若证书中算法仅可用于签名、不可用于密钥协商协议，则需要 Diffie-Hellman 密钥协商。
6. 服务器发送 `challenge server`，以及（若在 (5) 已生成）其临时公钥（7）。
7. 若客户端在 (2) 中指示基于 Ephemeral Diffie-Hellman 建立会话密钥，则客户端也生成临时公私钥对（9）。  
   > **NOTE 2** 同 NOTE 1。
8. 客户端通过构建适当认证令牌计算 proof of ownership client；待签名内容至少包括（部分）`challenge server`，以及（若在 (9) 已生成）其临时公钥（10）。  
   建议按 ISO/IEC 9798-3（单向、两遍）构建认证令牌，或构建安全等价令牌。
9. 客户端通过 SubFunction `proofOfOwnership` 发送 proof of ownership client，以及（若在 (9) 已生成）其临时公钥（11）。
10. 服务器用已收 `certificate client` 中的公钥验证 proof of ownership client（12）。
11. 若客户端在 (2) 中指示建立会话密钥，则服务器创建或派生并启用会话密钥，并设置 session key info（13）。
12. 服务器按访问权限授予对诊断对象的访问（14）。
13. 服务器响应认证成功，并（若存在 (13)）发送 session key info（15）。
14. 若指示建立会话密钥，客户端从 session key info 提取或派生会话密钥（16）。
15. 客户端用会话密钥验证 session key info（17）。  
    > **NOTE 3** 步骤 (17) 确保会话密钥建立完整且有效。
16. 客户端启用会话密钥以用于后续安全诊断通信（18）。

> **NOTE 4** 使用单向认证时，服务器不对客户端认证自身；因此客户端无法确信正在与正确的服务器通信。

#### 变体 2：双向认证

1. 客户端创建 `challenge client`（1），并与 `certificate client` 一起通过 `verifyCertificateBidirectional` 发送（2）。
2. 服务器验证 `certificate client`（3）。
3. 服务器创建 `challenge server`（4）。
4. 若指示 Ephemeral Diffie-Hellman，服务器生成临时公私钥对（5）。  
   > **NOTE 5** 同 NOTE 1。
5. 服务器构建认证令牌计算 proof of ownership server；待签名内容至少包括（部分）`challenge client`，以及（若在 (5) 已生成）其临时公钥（6）；并连同 `challenge server`、`certificate server` 以及（若已生成）临时公钥一并发送（7）。  
   建议按 ISO/IEC 9798-3（相互、三遍）构建认证令牌，或构建安全等价令牌。
6. 客户端用已收 `certificate server` 的公钥验证证书与 proof of ownership server（8）。
7. 若指示 Ephemeral Diffie-Hellman，客户端也生成临时公私钥对（9）。  
   > **NOTE 6** 同 NOTE 1。
8. 客户端计算 proof of ownership client（10）；建议按 ISO/IEC 9798-3（相互、三遍）或等价方式构建令牌。
9. 客户端通过 `proofOfOwnership` 发送 proof of ownership client 及（若有）临时公钥（11）。
10. 服务器验证 proof of ownership client（12）。
11. 若指示建立会话密钥，服务器创建/派生并启用会话密钥并设置 session key info（13）。
12. 服务器按权限授予访问（14）。
13. 服务器响应成功并（若有）发送 session key info（15）。
14. 客户端提取/派生会话密钥（16）、验证 session key info（17）、启用会话密钥（18）。  
    > **NOTE 7** 步骤 (17) 确保会话密钥建立完整且有效。

若每一步验证均成功，服务器应允许客户端访问 `certificate client` 信息所指向的诊断服务，并向客户端返回肯定响应。若过程中任一步验证失败，服务器或客户端应停止认证并发送适当响应。客户端应显示适当消息（见外部测试设备规范）。

> **NOTE 8** 失败尝试管理（如最大尝试次数、延时等）由整车制造商自行决定。  
> **NOTE 9** 若客户端侧认证失败（尤其在服务器已接受客户端并设置访问权限之后），客户端可选择向服务器发送 `deAuthenticate`，以确保服务器离开已认证状态并拒绝后续未授权请求。访问控制由整车制造商负责。

本子条款中以任何方式建立的会话密钥，最长有效期为该已认证会话的持续时间。

要独立于先前认证、或在其后传输证书，可使用 SubFunction `transmitCertificate`。其意图是向服务器出示证书供进一步处理，而无需挑战–响应序列。证书可用于附加权限激活，或用于验证（prove）已签名数据（借助证书内嵌公钥）。因此数据应以对应私钥签名（数据与签名应独立发送到服务器）。

对每种用例（如附加权限激活）应提供不同的 `certificateEvaluationId`，以便服务器识别证书。该 SubFunction 可支持不止一种证书类型。

> **NOTE 10** 通过证书增加权限的机制由整车制造商自行决定。

图 9 给出基于 PKI 证书交换（APCE）的认证序列。

![Figure 9 — Authentication sequence with PKI Certificate Exchange (APCE)](../markdown/ISO_14229-1-2020/images/c02_c58d60f9231ead22ca74cc3b3dcf4e40e2936650fcd495e3af6fde47b7e29bf8.jpg)

**图 9 图注：**

| 标记 | 含义 |
|---|---|
| a | 使用双向认证时 |
| b | 仅当使用安全诊断通信时 |
| c | 仅当使用 Diffie-Hellman 密钥协商进行安全诊断通信时 |
| d | 若 challenge client 用于 Proof of Ownership client |
| e | 可选地在各 Proof of Ownership server/client 中包含 challenge server 与 challenge client |

**Figure 9 — Authentication sequence with PKI Certificate Exchange (APCE)**

### 10.6.3 基于挑战–响应的认证（ACR）

#### 先决条件

- **非对称密码学**：应存在客户端密钥对——客户端私钥在客户端，客户端公钥在服务器。双向认证时还应存在服务器密钥对——服务器私钥在服务器，服务器公钥在客户端。
- **对称密码学**：应存在对称密钥，并在客户端与服务器之间预共享。

#### 变体 1：单向认证

1. 客户端通过 `requestChallengeForAuthentication` 请求认证，指示所用算法以及是否建立会话密钥（1）。
2. 服务器创建 `challenge server`（2）。
3. 服务器发送 `challenge server`，并指示是否需要附加参数（3）。
4. 若 challenge client 会用于 proof of ownership client，则客户端创建 challenge client（4）。  
   建议按 ISO/IEC 9798-2 或 ISO/IEC 9798-4（单向、两遍）创建挑战，或创建安全等价挑战。
5. 客户端按如下方式计算 client-side POWN（5）：
   - **非对称**：构建适当的（整车厂特定）令牌内容（例如基于 CVC），包含 token authority、authentication、rights/roles、server-side challenge 信息，以及视情况包含 client-side challenge 与附加信息；用客户端私钥对令牌内容签名，并构建含内容与签名的 client-side 认证令牌。该令牌即为 client-side POWN。建议按 ISO/IEC 9798-2/9798-4（单向、两遍）或等价方式构建。
   - **对称**：用预共享对称密钥，对 server-side challenge（以及视情况对 client-side challenge 与附加参数，如整车厂预定义的 rights/roles）计算签名（例如一次性签名、HMAC、CMAC 或 GMAC）。所得签名即为 client-side POWN。建议按 ISO/IEC 9798-2/9798-4（单向、两遍）或等价方式构建。
6. 若服务器在 (3) 指示需要附加参数，则客户端在 needed additional parameter 中提供适当附加参数（6）。
7. 客户端通过 `verifyProofOfOwnershipUnidirectional` 发送 client-side POWN、（若在 (4) 已生成）challenge client，以及（若指示）needed additional parameter（7）。
8. 服务器验证 client-side POWN（8）。
9. （步骤编号 (9) 在单向 ACR 序列中不使用；见双向变体。）
10. 若客户端在 (1) 指示建立会话密钥，服务器创建/派生并启用会话密钥并设置 session key info（10）。
11. 服务器按权限授予访问（11）。
12. 服务器响应认证成功，并（若有）发送 session key info（12）。
13. （步骤编号 (13) 在单向 ACR 中不使用。）
14. 若指示建立会话密钥，客户端从 session key info 提取或派生会话密钥（14）。
15. 若指示建立会话密钥，客户端用会话密钥验证 session key info（15）。  
    > **NOTE 1** 步骤 (15) 确保会话密钥建立完整且有效。
16. 若指示建立会话密钥，客户端启用会话密钥以用于后续安全诊断通信（16）。

#### 变体 2：双向认证

1–3 同单向：请求挑战、服务器创建并发送 challenge，以及是否需要附加参数（1–3）。  
4. 客户端创建 challenge client（4）。  
5. 客户端计算 client-side POWN（5）：非对称/对称计算方式同单向，但认证令牌建议按 ISO/IEC 9798-2/9798-4（**相互、三遍**）或等价方式构建。  
6. 若服务器指示需要附加参数（整车厂特定），客户端提供（6）。  
7. 客户端通过 `verifyProofOfOwnershipBidirectional` 发送 client-side POWN、challenge client，以及（若指示）附加参数（7）。  
8. 服务器验证 client-side POWN（8）。  
9. 服务器计算 server-side POWN（9）：
   - **非对称**：构建含 token authority、authentication、client-side challenge（及视情况 server-side challenge）的令牌内容，用服务器私钥签名，得到 server-side 认证令牌（即 server-side POWN）。建议按相互三遍或等价方式。
   - **对称**：用预共享密钥对 client-side challenge（及视情况 server-side challenge）计算签名，得到 server-side POWN。建议按相互三遍或等价方式。
10. 若指示建立会话密钥，服务器创建/派生并启用会话密钥并设置 Session Key Info（10）。  
11. 服务器授予访问（11）。  
12. 服务器响应成功，并发送 server-side POWN 以及（若有）session key info（12）。  
13. 客户端验证 server-side POWN（13）。  
14–16. 若指示建立会话密钥：提取/派生（14）、验证 session key info（15）、启用（16）。  
    > **NOTE 2** 步骤 (15) 确保会话密钥建立完整且有效。

若过程中任一步验证失败，服务器或客户端应停止认证并发送适当响应。客户端应显示适当消息（见外部测试设备规范）。

> **NOTE 3** 失败尝试管理（如最大尝试次数、延时等）由整车制造商自行决定。  
> **NOTE 4** 若客户端侧认证失败（尤其在服务器已接受客户端并设置访问权限之后），客户端可选择向服务器发送 SubFunction `deAuthenticate`，以确保服务器离开已认证状态并拒绝后续未授权请求。

本子条款中以任何方式建立的会话密钥，最长有效期为该已认证会话的持续时间。

> **NOTE 5** 步骤 (11) 当前授予的诊断对象访问权，可通过再次执行 ACR、并在步骤 (4) 使用新的 rights/roles 来变更；新 rights/roles 替换当前值，授予访问随之变化。

图 10 给出基于挑战–响应（ACR）的认证序列。

![Figure 10 — Authentication sequence with Challenge-Response (ACR)](../markdown/ISO_14229-1-2020/images/c02_c282b95e33c3201a75da0077de08daabc510d1574008d02b7a6687d59735293b.jpg)

**图 10 图注：**

| 标记 | 含义 |
|---|---|
| a | 使用双向认证时 |
| b | 仅当服务器需要附加参数进行认证时 |
| c | 仅当使用安全诊断通信时 |
| d | 若 challenge client 用于 Proof of Ownership client |
| e | 可选地在各 POWN 中包含 challenge server 与 challenge client |

**Figure 10 — Authentication sequence with Challenge-Response (ACR)**

### 10.6.4 通用要求

认证用于保护适用的诊断会话/功能/服务。因此应要求如下服务顺序：

1. Authentication 服务；
2. 任何受认证保护或受限的诊断服务。

认证与诊断会话或 security level **无直接关系**。一旦认证成功，服务器应处于已认证状态（authenticated state）；仅当发生安全超时、达到里程偏移上限，或通过 `deAuthenticate` 有意离开时，才应离开该状态。只要客户端仍处于已认证状态，分配给相应认证设置的适用诊断服务应可访问。

离开已认证状态的若干可能：

- **显式**：以 SubFunction `deAuthenticate` 调用认证请求。
- **隐式（超时回退）**：应安装定时器；进入已认证状态时启动。超时则结束已认证状态。超时值可单独设置，也可绑定既有定时参数（如会话层定时）。至少：同一诊断协议、由传输协议层收到的**每一条**请求消息，应保持已认证状态活跃并复位超时周期。  
  > **NOTE 1** 定时器值由整车厂特定。建议基于可靠内部时间使用超时。
- **隐式（里程偏移上限回退）**：应安装里程监控；进入已认证状态时启动。达到里程上限则结束已认证状态。  
  > **NOTE 2** 里程偏移上限由整车厂特定。建议基于可靠里程信息。

**显式退出条件应为强制**；**至少实现一种隐式退出条件应为强制**；两者可同时实现。

若服务器支持认证，且在已认证状态下又从**同一客户端**收到认证请求，则服务器应保持已认证状态，直至该次认证再次成功完成；服务器应将其状态更新为新收到的认证信息。

未成功进入已认证状态的尝试，不应妨碍其他诊断通信。已认证状态应绑定到特定诊断通道。可在多个通道上以不同认证设置处理多个客户端（例如基于多用户信息系统）。

提供安全能力的服务器，在处于非认证状态时若收到受保护服务请求，应支持 NRC `34₁₆`（`authenticationRequired`）。

作为可选项，可建立会话密钥以进一步保护客户端与服务器之间的通信，例如通过：

- 在服务器侧创建会话密钥并加密传输给客户端；或
- 使用非对称密钥协商协议；或
- 在双方由既有预共享密钥派生（对称密码学情形）。

### 10.6.5 请求消息

#### 10.6.5.1 请求消息定义

**表 65 — 请求消息定义 - SubFunction = deAuthenticate**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = deAuthenticate\] | M | `00₁₆` | LEV_AT_DA |

**表 66 — 请求消息定义 - SubFunction = verifyCertificateUnidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyCertificateUnidirectional\] | M | `01₁₆` | LEV_AT_VCU |
| #3 | communicationConfiguration\[\] = \[byte#1\] | M | `00₁₆`–`FF₁₆` | COCO |
| #4 / #5 | lengthOfCertificateClient\[\] = \[byte#1 (MSB) / byte#2 (LSB)\] | M / M | `00₁₆`–`FF₁₆` | LOCECL |
| #6 : #m+5 | certificateClient\[\] = \[byte#1 : byte#m\] | M : M | `00₁₆`–`FF₁₆` | CECL |
| #m+6 / #m+7 | lengthOfChallengeClient\[\] = \[byte#1 (MSB) / byte#2 (LSB)\] | M / M | `00₁₆`–`FF₁₆` | LOCHCL |
| #m+8 : #n+m+7 | challengeClient\[\] = \[byte#1 : byte#n\] | C : C | `00₁₆`–`FF₁₆` | CHCL |

> **C**：该参数是否出现取决于 `lengthOfChallengeClient`。若 `lengthOfChallengeClient = 0000₁₆`，则不传输 `challengeClient`。

**表 67 — 请求消息定义 - SubFunction = verifyCertificateBidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyCertificateBidirectional\] | M | `02₁₆` | LEV_AT_VCB |
| #3 | communicationConfiguration\[\] = \[byte#1\] | M | `00₁₆`–`FF₁₆` | COCO |
| #4 / #5 | lengthOfCertificateClient\[\] | M / M | `00₁₆`–`FF₁₆` | LOCECL |
| #6 : #m+5 | certificateClient\[\] | M : M | `00₁₆`–`FF₁₆` | CECL |
| #m+6 / #m+7 | lengthOfChallengeClient\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHCL |
| #m+8 : #n+m+7 | challengeClient\[\] | M : M | `00₁₆`–`FF₁₆` | CHCL |

**表 68 — 请求消息定义 - SubFunction = proofOfOwnership**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = proofOfOwnership\] | M | `03₁₆` | LEV_AT_POWN |
| #3 / #4 | lengthOfProofOfOwnershipClient\[\] | M / M | `00₁₆`–`FF₁₆` | LPOWNCL |
| #5 : #m+4 | proofOfOwnershipClient\[\] | M : M | `00₁₆`–`FF₁₆` | POWNCL |
| #m+5 / #m+6 | lengthOfEphemeralPublicKeyClient\[\] | M / M | `00₁₆`–`FF₁₆` | LOEPKCL |
| #m+7 : #n+m+6 | ephemeralPublicKeyClient\[\] | C : C | `00₁₆`–`FF₁₆` | EPKCL |

> **C**：若 `lengthOfEphemeralPublicKeyClient = 0000₁₆`，则不传输 `ephemeralPublicKeyClient`。

**表 69 — 请求消息定义 - SubFunction = transmitCertificate**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = transmitCertificate\] | M | `04₁₆` | LEV_AT_TC |
| #3 / #4 | certificateEvaluationId | M | `00₁₆`–`FF₁₆`（各 1 字节） | CEID |
| #5 / #6 | lengthOfCertificateData\[\] | M / M | `00₁₆`–`FF₁₆` | LOCEDA |
| #7 : #m+6 | certificateData\[\] | M : M | `00₁₆`–`FF₁₆` | CEDA |

**表 70 — 请求消息定义 - SubFunction = requestChallengeForAuthentication**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = requestChallengeForAuthentication\] | M | `05₁₆` | LEV_AT_RCFA |
| #3 | communicationConfiguration\[\] = \[byte#1\] | M | `00₁₆`–`FF₁₆` | COCO |
| #4 : #19 | algorithmIndicator\[\] = \[byte#1 : byte#16\] | M : M | `00₁₆`–`FF₁₆` | AI |

**表 71 — 请求消息定义 - SubFunction = verifyProofOfOwnershipUnidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyProofOfOwnershipUnidirectional\] | M | `06₁₆` | LEV_AT_VPOWNU |
| #3 : #18 | algorithmIndicator\[\] | M : M | `00₁₆`–`FF₁₆` | AI |
| #19 / #20 | lengthOfProofOfOwnershipClient\[\] | M / M | `00₁₆`–`FF₁₆` | LPOWNCL |
| #21 : #m+20 | proofOfOwnershipClient\[\] | M : M | `00₁₆`–`FF₁₆` | POWNCL |
| #m+21 / #m+22 | lengthOfChallengeClient\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHCL |
| #m+23 : #n+m+22 | challengeClient\[\] | C1 : C1 | `00₁₆`–`FF₁₆` | CHCL |
| #n+m+23 / #n+m+24 | lengthOfAdditionalParameter\[\] | M / M | `00₁₆`–`FF₁₆` | LOAP |
| #n+m+25 : #o+n+m+24 | additionalParameter\[\] | C2 : C2 | `00₁₆`–`FF₁₆` | AP |

> **C1**：取决于 `lengthOfChallengeClient`；为 `0000₁₆` 则不传 `challengeClient`。  
> **C2**：取决于 `lengthOfAdditionalParameter`；为 `0000₁₆` 则不传 `additionalParameter`。  
> `algorithmIndicator` 取值应与表 70 请求中相同。

**表 72 — 请求消息定义 - SubFunction = verifyProofOfOwnershipBidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyProofOfOwnershipBidirectional\] | M | `07₁₆` | LEV_AT_VPOWNB |
| #3 : #18 | algorithmIndicator\[\] = \[byte#1 : byte#16\] | M : M | `00₁₆`–`FF₁₆` | AI |
| #19 / #20 | lengthOfProofOfOwnershipClient\[\] | M / M | `00₁₆`–`FF₁₆` | LPOWNCL |
| #21 : #m+20 | proofOfOwnershipClient\[\] | M : M | `00₁₆`–`FF₁₆` | POWNCL |
| #m+21 / #m+22 | lengthOfChallengeClient\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHCL |
| #m+23 : #n+m+22 | challengeClient\[\] | M : M | `00₁₆`–`FF₁₆` | CHCL |
| #n+m+23 / #n+m+24 | lengthOfAdditionalParameter\[\] | M / M | `00₁₆`–`FF₁₆` | LOAP |
| #n+m+25 : #o+n+m+24 | additionalParameter\[\] | C : C | `00₁₆`–`FF₁₆` | AP |

> **C**：若 `lengthOfAdditionalParameter = 0000₁₆`，则不传输 `additionalParameter`。  
> `algorithmIndicator` 应与表 70 相同。

**表 73 — 请求消息定义 - SubFunction = authenticationConfiguration**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Request SID | M | `29₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = authenticationConfiguration\] | M | `08₁₆` | LEV_AT_AC |

#### 10.6.5.2 请求消息 SubFunction 参数 \$Level（LEV_）定义

SubFunction 参数 `authenticationTask` 向服务器指示应执行的明确任务（`suppressPosRspMsgIndicationBit`（bit 7）未在表中示出）。

**表 74 — 请求消息 SubFunction 参数定义**

| Bit 6–0 | Description | Cvt | Mnemonic |
|---|---|---|---|
| `00₁₆` | `deAuthenticate` — 请求离开已认证状态 | M | DA |
| `01₁₆` | `verifyCertificateUnidirectional` — 通过验证证书启动认证 | C1 | VCU |
| `02₁₆` | `verifyCertificateBidirectional` — 验证证书并生成来自服务器的 Proof of Ownership | C1 | VCB |
| `03₁₆` | `proofOfOwnership` — 验证来自客户端的 Proof of Ownership | C1 | POWN |
| `04₁₆` | `transmitCertificate` — 验证证书并按内容提取信息以供处理 | C1 | TC |
| `05₁₆` | `requestChallengeForAuthentication` — 请求服务器输出挑战以启动认证 | C2 | RCFA |
| `06₁₆` | `verifyProofOfOwnershipUnidirectional` — 请求服务器验证单向认证的 POWN | C2 | VPOWNU |
| `07₁₆` | `verifyProofOfOwnershipBidirectional` — 请求验证 client-side POWN 并提供 server-side POWN | C2 | VPOWNB |
| `08₁₆` | `authenticationConfiguration` — 指示服务器提供的认证配置 | M | AC |
| `09₁₆`–`7F₁₆` | ISOSAEReserved — 本文档保留供将来定义 | M | ISOSAERESRVD |

> **C1**：仅当使用 APCE 时。  
> **C2**：仅当使用 ACR 时。

#### 10.6.5.3 请求消息数据参数定义

**表 75 — 请求消息数据参数定义**

| 参数 | 定义 |
|---|---|
| `communicationConfiguration` | 认证后如何继续保护后续诊断通信的配置信息。**NOTE 1**：与响应参数 `sessionKeyInfo` 的出现及内容相关联；该参数格式以及会话密钥创建与证明值计算由整车厂选择。 |
| `lengthOfCertificateClient` | `certificateClient` 的长度参数。 |
| `certificateClient` | 待验证的证书。 |
| `certificateEvaluationId` | 标识所传证书评估类型的唯一 ID；取值由整车厂特定。后续带相同 evaluationTypeId 的诊断请求将覆盖先前请求的证书数据。（原文拼写 *manufactuer*；evaluationTypeId 与参数名 `certificateEvaluationId` 对应。） |
| `lengthOfChallengeClient` | `challengeClient` 的长度参数。 |
| `challengeClient` | 挑战：整车厂特定格式的客户端数据（**可能**含随机信息）或随机数；用于向服务器传输挑战。 |
| `lengthOfProofOfOwnershipClient` | `proofOfOwnershipClient` 的长度参数。 |
| `proofOfOwnershipClient` | 对先前给定挑战的所有权证明，由服务器验证。 |
| `lengthOfEphemeralPublicKeyClient` | `ephemeralPublicKeyClient` 的长度；若无公私钥对，该字段应为 `0000₁₆`。 |
| `ephemeralPublicKeyClient` | 客户端为 Diffie-Hellman 密钥协商生成的临时公钥。 |
| `lengthOfCertificateData` | `certificateData` 的长度参数。 |
| `certificateData` | 待验证的证书。 |
| `algorithmIndicator` | 指示生成/验证 POWN 所用算法，并进一步决定算法参数乃至会话密钥创建模式。16 字节字段，含算法 OID 的 BER 编码值；左对齐，右侧以 0 填充至 16 字节。**NOTE 2**：算法 OID 可查阅 http://oid-info.com。 |
| `lengthOfAdditionalParameter` | `additionalParameter` 的长度参数。 |
| `additionalParameter` | 若服务器在表 85 中以 `neededAdditionalParameter` 指示需要，则向服务器提供该附加参数。 |

### 10.6.6 肯定响应消息

#### 10.6.6.1 肯定响应消息定义

**表 76 — 响应消息定义 - SubFunction = deAuthenticate**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = deAuthenticate\] | M | `00₁₆` | LEV_AT_DA |
| #3 | returnValue\[\] = \[authenticationReturnParameter\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。

**表 77 — 响应消息定义 - SubFunction = verifyCertificateUnidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyCertificateUnidirectional\] | M | `01₁₆` | LEV_AT_VCU |
| #3 | returnValue\[\] = \[authenticationReturnParameter\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |
| #4 / #5 | lengthOfChallengeServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHSE |
| #6 : #m+5 | challengeServer\[\] | M : M | `00₁₆`–`FF₁₆` | CHSE |
| #m+6 / #m+7 | lengthOfEphemeralPublicKeyServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOEPKSE |
| #m+8 : #n+m+7 | ephemeralPublicKeyServer\[\] | C : C | `00₁₆`–`FF₁₆` | EPKSE |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfEphemeralPublicKeyServer = 0000₁₆`，则不传输 `ephemeralPublicKeyServer`。

**表 78 — 响应消息定义 - SubFunction = verifyCertificateBidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyCertificateBidirectional\] | M | `02₁₆` | LEV_AT_VCB |
| #3 | returnValue\[\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |
| #4 / #5 | lengthOfChallengeServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHSE |
| #6 : #m+5 | challengeServer\[\] | M : M | `00₁₆`–`FF₁₆` | CHSE |
| #m+6 / #m+7 | lengthOfCertificateServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOCESE |
| #m+8 : #n+m+7 | certificateServer\[\] | M : M | `00₁₆`–`FF₁₆` | CESE |
| #n+m+8 / #n+m+9 | lengthOfProofOfOwnershipServer\[\] | M / M | `00₁₆`–`FF₁₆` | LPOWNSE |
| #n+m+10 : #o+n+m+9 | proofOfOwnershipServer\[\] | M : M | `00₁₆`–`FF₁₆` | POWNSE |
| #o+n+m+10 / #o+n+m+11 | lengthOfEphemeralPublicKeyServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOEPKSE |
| #o+n+m+12 : #p+o+n+m+11 | ephemeralPublicKeyServer\[\] | C : C | `00₁₆`–`FF₁₆` | EPKSE |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfEphemeralPublicKeyServer = 0000₁₆`，则不传输 `ephemeralPublicKeyServer`。

**表 79 — 响应消息定义 - SubFunction = proofOfOwnership**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = proofOfOwnership\] | M | `03₁₆` | LEV_AT_POWN |
| #3 | returnValue\[\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |
| #4 / #5 | lengthOfSessionKeyInfo\[\] | M / M | `00₁₆`–`FF₁₆` | LOSKI |
| #6 : #m+5 | sessionKeyInfo\[\] | C : C | `00₁₆`–`FF₁₆` | SKI |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfSessionKeyInfo = 0000₁₆`，则不传输 `sessionKeyInfo`。

**表 80 — 响应消息定义 - SubFunction = transmitCertificate**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = transmitCertificate\] | M | `04₁₆` | LEV_AT_TC |
| #3 | returnValue\[\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。

**表 81 — 响应消息定义 - SubFunction = requestChallengeForAuthentication**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = requestChallengeForAuthentication\] | M | `05₁₆` | LEV_AT_RCFA |
| #3 | returnValue\[\] | Mᵃ | `00₁₆`–`FF₁₆` | RV |
| #4 : #19 | algorithmIndicator\[\] | M : M | `00₁₆`–`FF₁₆` | AI |
| #20 / #21 | lengthOfChallengeServer\[\] | M / M | `00₁₆`–`FF₁₆` | LOCHSE |
| #22 : #m+21 | challengeServer\[\] | M : M | `00₁₆`–`FF₁₆` | CHSE |
| #m+22 / #m+23 | lengthOfNeededAdditionalParameter\[\] | M / M | `00₁₆`–`FF₁₆` | LONAP |
| #m+24 : #n+m+23 | neededAdditionalParameter\[\] | C : C | `00₁₆`–`FF₁₆` | NAP |

> **a**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfNeededAdditionalParameter = 0000₁₆`，则不传输 `neededAdditionalParameter`。  
> 响应中的 `algorithmIndicator` 应与表 70 请求中相同。

**表 82 — 响应消息定义 - SubFunction = verifyProofOfOwnershipUnidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyProofOfOwnershipUnidirectional\] | M | `06₁₆` | LEV_AT_VPOWNU |
| #3 | returnValue\[\] | M¹ | `00₁₆`–`FF₁₆` | RV |
| #4 : #19 | algorithmIndicator\[\] | M : M | `00₁₆`–`FF₁₆` | AI |
| #20 / #21 | lengthOfSessionKeyInfo\[\] | M / M | `00₁₆`–`FF₁₆` | LOSKI |
| #22 : #m+21 | sessionKeyInfo\[\] | C : C | `00₁₆`–`FF₁₆` | SKI |

> **M₁**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfSessionKeyInfo = 0000₁₆`，则不传输 `sessionKeyInfo`。  
> `algorithmIndicator` 应与表 70 相同。  
> **译本注**：PDF 在表 82 之后误写为 *verifyProofOfOwnershipBidirectional (Table 82)*；按表题与子功能值 `06₁₆`，此处应为 **Unidirectional**。

**表 83 — 响应消息定义 - SubFunction = verifyProofOfOwnershipBidirectional**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = verifyProofOfOwnershipBidirectional\] | M | `07₁₆` | LEV_AT_VPOWNB |
| #3 | returnValue\[\] | M¹ | `00₁₆`–`FF₁₆` | RV |
| #4 : #19 | algorithmIndicator\[\] | M : M | `00₁₆`–`FF₁₆` | AI |
| #20 / #21 | lengthOfProofOfOwnershipServer\[\] | M / M | `00₁₆`–`FF₁₆` | LPOWNSE |
| #22 : #m+21 | proofOfOwnershipServer\[\] | M : M | `00₁₆`–`FF₁₆` | POWNSE |
| #m+22 / #m+23 | lengthOfSessionKeyInfo\[\] | M / M | `00₁₆`–`FF₁₆` | LOSKI |
| #m+24 : #n+m+23 | sessionKeyInfo\[\] | C : C | `00₁₆`–`FF₁₆` | SKI |

> **M₁**：`AuthenticationReturnParameter` 应按 B.5 实现。  
> **C**：若 `lengthOfSessionKeyInfo = 0000₁₆`，则不传输 `sessionKeyInfo`。  
> `algorithmIndicator` 应与表 70 相同。

**表 84 — 响应消息定义 - SubFunction = authenticationConfiguration**

| A_Data byte | Parameter Name | Cvt | Byte value | Mnemonic |
|---|---|---|---|---|
| #1 | Authentication Response SID | M | `69₁₆` | ARS |
| #2 | SubFunction = \[authenticationTask = authenticationConfiguration\] | M | `08₁₆` | LEV_AT_AC |
| #3 | returnValue\[\] | M¹ | `00₁₆`–`FF₁₆` | RV |

> **M₁**：`AuthenticationReturnParameter` 应按 B.5 实现。

#### 10.6.6.2 肯定响应消息数据参数定义

**表 85 — 响应消息数据参数定义**

| 参数 | 定义 |
|---|---|
| `authenticationTask` | 请求消息中 `authenticationTask` 的回显。 |
| `returnValue` | 返回服务器侧过程结果；参数细节应按 B.5 实现。 |
| `lengthOfChallengeServer` | 后续 challenge 的长度参数。 |
| `challengeServer` | 挑战：整车厂特定格式的服务器数据（可能含随机信息）或随机数；用于向客户端传输挑战。 |
| `lengthOfEphemeralPublicKeyServer` | `ephemeralPublicKeyServer` 的长度；若无公私钥对，应为 `0000₁₆`。 |
| `ephemeralPublicKeyServer` | 服务器为 Diffie-Hellman 密钥协商生成的临时公钥。 |
| `lengthOfCertificateServer` | 后续证书的长度参数。 |
| `certificateServer` | 待验证的证书。 |
| `lengthOfProofOfOwnershipServer` | 后续 Proof of Ownership 的长度参数。 |
| `proofOfOwnershipServer` | 由客户端验证的 Proof of Ownership。 |
| `lengthOfSessionKeyInfo` | 后续会话密钥信息的长度（若存在）；若不存在会话密钥信息，应为 `0000₁₆`。 |
| `sessionKeyInfo` | 若存在，应包含会话密钥信息，例如用于保护当前会话后续通信的加密会话密钥，和/或供客户端侧校验会话密钥的证明值（如哈希）。**NOTE 1**：与请求参数 `communicationConfiguration` 内容相关联；格式及密钥/证明值计算由整车厂选择。 |
| `algorithmIndicator` | 同请求侧：指示 POWN 所用算法等；16 字节 BER OID，左对齐右填 0。**NOTE 2**：见 oid-info.com。 |
| `lengthOfNeededAdditionalParameter` | 若服务器需要客户端附加参数（细化认证、确保权限、甚至从对称密钥层级派生），可用此字段“请求”客户端发送；不需要时为 `0000₁₆`。 |
| `neededAdditionalParameter` | 指示服务器期望的附加参数（若需要）。 |

### 10.6.7 支持的否定响应码（NRC_）

本服务应实现下列否定响应码。各码适用情形见表 86；若错误场景适用于服务器，应使用所列否定响应。

**表 86 — 支持的否定响应码**

| NRC | Description | Mnemonic |
|---|---|---|
| `12₁₆` | `SubFunctionNotSupported` — SubFunction 参数不受支持时应发送 | SFNS |
| `13₁₆` | `incorrectMessageLengthOrInvalidFormat` — 消息长度错误时应发送 | IMLOIF |
| `22₁₆` | `conditionsNotCorrect` — 若不满足 Authentication 请求准则则返回 | CNC |
| `24₁₆` | `requestSequenceError` — 下列情形应返回：① 在未先成功处理 `verifyCertificateUnidirectional` 或 `verifyCertificateBidirectional` 的情况下收到 `proofOfOwnership`；或 ② 在未先成功处理 `requestChallengeForAuthentication` 的情况下收到 `verifyProofOfOwnershipUnidirectional` 或 `verifyProofOfOwnershipBidirectional` | RSE |

评估顺序见图 11。

![Figure 11 — Evaluation sequence for Authentication service NRCs](../markdown/ISO_14229-1-2020/images/c03_ff151e41986f7ebf0114c2cb78e4dc8a2e8ba49e3f711b9d66371db56861aef4.jpg)

**Figure 11 — Evaluation sequence for Authentication service NRCs**

（含 Manufacturer-/supplier-specific 分支。）

> **NOTE** 可使用详细 NRC `50₁₆`–`5D₁₆`；也可改用通用否定响应码 `10₁₆`。

---

## 10.6.8 Authentication 消息流示例

下列示例按 PDF 翻译前提与报文表。长载荷按原文用 `:` 省略中间字节；首尾示例字节已核对 PDF。

### 10.6.8.1 示例 #1 — APCE 单向认证、不建立会话密钥（成功路径）

#### 10.6.8.1.1 前提

- Step #1（可选）：客户端请求服务器认证配置  
- Step #2：`communicationConfiguration = 00₁₆`（后续不使用安全通信）  
- Step #2：Certificate Client 长度 `01F4₁₆`（500 字节）  
- Step #2：正响应 `returnValue = 11₁₆`（Certificate verified, Ownership verification necessary）  
- Step #2：Challenge Client 长度 `0020₁₆`（32 字节随机数）  
- Step #2：Challenge Server 长度 `0040₁₆`（32 字节 ECU 标识 ‖ 32 字节随机数）  
- Step #3：POWN 长度 `0150₁₆`（336 字节）  
- Step #3：正响应 `returnValue = 12₁₆`（Ownership verified, Authentication complete）  
- Step #3：session key info 长度 `0000₁₆`  
- Step #4：ECUReset（`11₁₆`）为受保护服务  

#### 10.6.8.1.2 Step #1：请求 Authentication Configuration

**表 87 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = authenticationConfiguration | `08₁₆` | LEV_AT_AC |

**表 88 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = authenticationConfiguration | `08₁₆` | LEV_AT_AC |
| #3 | returnValue = AuthenticationConfiguration APCE | `02₁₆` | RV_ACAPCE |

#### 10.6.8.1.3 Step #2：发送 Certificate Client

**表 89 — 请求**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | verifyCertificateUnidirectional | `01₁₆` | LEV_AT_VCU |
| #3 | communicationConfiguration = no secure communication | `00₁₆` | COCO |
| #4 / #5 | lengthOfCertificateClient | `01₁₆` / `F4₁₆` | LOCECL |
| #6 : #505 | certificateClient\[1:500\] | `30₁₆` : `AD₁₆` | CECL |
| #506 / #507 | lengthOfChallengeClient | `00₁₆` / `20₁₆` | LOCHCL |
| #508 : #539 | challengeClient\[1:32\] | `AA₁₆` : `44₁₆` | CHCL |

**表 90 — 肯定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | verifyCertificateUnidirectional | `01₁₆` | LEV_AT_VCU |
| #3 | returnValue = Certificate verified, Ownership verification necessary | `11₁₆` | RV_CVOVN |
| #4 / #5 | lengthOfChallengeServer | `00₁₆` / `40₁₆` | LOCHSE |
| #6 : #69 | challengeServer\[1:64\] | `AA₁₆` : `44₁₆` | CHSE |
| #70 / #71 | lengthOfEphemeralPublicKeyServer | `00₁₆` / `00₁₆` | LOEPKSE |

#### 10.6.8.1.4 Step #3：验证 Proof of Ownership

**表 91 — 请求**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | proofOfOwnership | `03₁₆` | LEV_AT_POWN |
| #3 / #4 | lengthOfProofOfOwnershipClient | `01₁₆` / `50₁₆` | LPOWNCL |
| #5 : #340 | proofOfOwnershipClient\[1:336\] | `7F₁₆` : `B7₁₆` | POWNCL |
| #341 / #342 | lengthOfEphemeralPublicKeyClient | `00₁₆` / `00₁₆` | LOEPKCL |

**表 92 — 肯定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | proofOfOwnership | `03₁₆` | LEV_AT_POWN |
| #3 | returnValue = Ownership verified, Authentication complete | `12₁₆` | RV_OVAC |
| #4 / #5 | lengthOfSessionKeyInfo | `00₁₆` / `00₁₆` | LOSKI |

#### 10.6.8.1.5 Step #4：尝试发送受保护服务

**表 93 — ECUReset 请求**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | ECUReset Request SID | `11₁₆` | ER |
| #2 | ResetType = hardReset | `01₁₆` | RT_HR |

**表 94 — ECUReset 肯定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | ECUReset Response SID | `51₁₆` | ERPR |
| #2 | resetType = hardReset | `01₁₆` | RT_HR |

### 10.6.8.2 示例 #2 — APCE 单向认证、不建立会话密钥（失败路径）

#### 10.6.8.2.1 前提

- Step #1：`communicationConfiguration = 00₁₆`；Certificate Client 长度 `01F4₁₆`（500 字节）；Challenge Client 长度 `0020₁₆`（32 字节随机数）  
- Step #1：NRC `50₁₆` Certificate verification failed - Invalid Time Period（CVFITP）  
- Step #2：ECUReset（`11₁₆`）为受保护服务  

#### 10.6.8.2.2 Step #1：发送 Certificate Client

**表 95 — 请求**：布局同表 89（`29₁₆` / `01₁₆` / `00₁₆` / `01F4₁₆` 证书 / `0020₁₆` challenge）。

**表 96 — 否定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Negative Response SID | `7F₁₆` | SIDRSIDNRQ |
| #2 | Authentication Request SID | `29₁₆` | ARS |
| #3 | responseCode = invalidTimePeriod | `50₁₆` | NRC_CVFITP |

#### 10.6.8.2.3 Step #2：尝试受保护服务

**表 97 — ECUReset 请求**：同表 93（`11₁₆` / hardReset `01₁₆`）。

**表 98 — ECUReset 否定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Negative Response SID | `7F₁₆` | SIDRSIDNRQ |
| #2 | ECUReset Request SID | `11₁₆` | ER |
| #3 | responseCode = authenticationRequired | `34₁₆` | NRC_AR |

### 10.6.8.3 示例 #3 — APCE 认证后 Transmit Certificate（成功路径）

#### 10.6.8.3.1 前提

- 服务器已处于已认证状态  
- Certificate Data 长度 `01F4₁₆`（500 字节）  
- 正响应 `returnValue = 13₁₆`（Certificate verified）  
- 证书中公钥用于随后签名验证（例如签名数据已传至服务器）  
- 签名可随数据一并发送，或通过额外的整车厂例程发送；可用合适签名以便用证书公钥验证所传数据  

> **译本注**：表 69 正式定义在 `#3–#4` 含 `certificateEvaluationId`；PDF 示例表 99 印本从 `#3` 起即为 `lengthOfCertificateData`（未示出 CEID）。实现以表 69 为准，示例按印本照录。

#### 10.6.8.3.2 Step #1：发送证书

**表 99 — 请求（按 PDF 印本）**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | transmitCertificate | `04₁₆` | LEV_AT_TC |
| #3 / #4 | lengthOfCertificateData | `01₁₆` / `F4₁₆` | LOCEDA |
| #5 : #504 | certificateData\[1:500\] | `31₁₆` : `AC₁₆` | CEDA |

**表 100 — 肯定响应**

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | transmitCertificate | `04₁₆` | LEV_AT_TC |
| #3 | returnValue = Certificate verified | `13₁₆` | RV_CV |

### 10.6.8.4 示例 #4 — ACR 非对称、不建立会话密钥（成功路径）

#### 10.6.8.4.1 前提

- Step #1（可选）：查询认证配置  
- `communicationConfiguration = 00₁₆`  
- `algorithmIndicator`（16 字节）=`06 09 2A 86 48 86 F7 0D 01 01 0A 00 00 00 00 00₁₆`  
  > **NOTE 1**：该值为 OID **1.2.840.113549.1.1.10**（RSASSA-PSS，PKCS #1 v2.2）的 BER 编码，右侧填 0 至 16 字节。  
- Challenge Client 长度 `0020₁₆`（32 字节随机数）；无需附加参数  
- Challenge Server 长度 `0040₁₆`（32 字节 ECU 标识 ‖ 32 字节随机数）  
- client POWN 长度 `0150₁₆`（336 字节软件认证令牌，结构基于 ISO/IEC 7816-8 CVC）：  
  - 令牌编码于 TLV 模板 `7F21₁₆`（含内容与签名）  
  - 内容为模板内 TLV `7F4E₁₆`；签名为模板内 TLV `5F37₁₆`  
  > **NOTE 2**：本示例中认证令牌有效（格式、内容与签名均正确）。PDF 正文写作 ISO/IEC **7618**-8，按领域惯例应为 **7816**-8。

#### 10.6.8.4.2 Step #1：请求 Authentication Configuration

**表 101 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = authenticationConfiguration | `08₁₆` | LEV_AT_AC |

**表 102 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = authenticationConfiguration | `08₁₆` | LEV_AT_AC |
| #3 | returnValue = AuthenticationConfiguration ACR with asymmetric cryptography | `03₁₆` | RV_ACACR |

> **译本注**：PDF 示例 Mnemonic 写作 `RV_ACACR`；附录 B.5 对同一取值用 `ACACRAC`。

#### 10.6.8.4.3 Step #2：请求挑战

**表 103 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | communicationConfiguration = no secure communication | `00₁₆` | COCO |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |

> AI 完整 16 字节 = `06 09 2A 86 48 86 F7 0D 01 01 0A 00 00 00 00 00₁₆`（RSASSA-PSS OID）。PDF 表中仅标注 byte#1 / byte#11 / byte#16 三个锚点。

**表 104 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | returnValue = Request accepted | `00₁₆` | RV_RA |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |
| #20 / #21 | lengthOfChallengeServer\[byte#1 / byte#2\] | `00₁₆` / `40₁₆` | LOCHSE |
| #22 : #85 | challengeServer\[byte#1:64\] | `AA₁₆` : `44₁₆` | CHSE |
| #86 / #87 | lengthOfNeededAdditionalParameter\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LONAP |

#### 10.6.8.4.4 Step #3：验证 Proof of Ownership

**表 105 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 : #18 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |
| #19 / #20 | lengthOfProofOfOwnershipClient\[byte#1 / byte#2\] | `01₁₆` / `50₁₆` | LPOWNCL |
| #21 | proofOfOwnershipClient\[byte#1\] | `7F₁₆` | POWNCL |
| #22 | proofOfOwnershipClient\[byte#2\] | `21₁₆` | |
| #23 | proofOfOwnershipClient\[byte#3\] | `82₁₆` | |
| #24 | proofOfOwnershipClient\[byte#4\] | `01₁₆` | |
| #25 | proofOfOwnershipClient\[byte#5\] | `4B₁₆` | |
| #26 | proofOfOwnershipClient\[byte#6\] | `7F₁₆` | |
| #27 | proofOfOwnershipClient\[byte#7\] | `4E₁₆` | |
| #28 | proofOfOwnershipClient\[byte#8\] | `44₁₆` | |
| #29 : #95 | proofOfOwnershipClient\[byte#9:75\] | `00₁₆`–`FF₁₆` | |
| #96 | proofOfOwnershipClient\[byte#76\] | `5F₁₆` | |
| #97 | proofOfOwnershipClient\[byte#77\] | `37₁₆` | |
| #98 | proofOfOwnershipClient\[byte#78\] | `82₁₆` | |
| #99 | proofOfOwnershipClient\[byte#79\] | `01₁₆` | |
| #100 | proofOfOwnershipClient\[byte#80\] | `00₁₆` | |
| #101 : #356 | proofOfOwnershipClient\[byte#81:336\] | `00₁₆`–`FF₁₆` | |
| #357 / #358 | lengthOfChallengeClient\[byte#1 / byte#2\] | `00₁₆` / `20₁₆` | LOCHCL |
| #359 : #390 | challengeClient\[byte#1:32\] | `AA₁₆` : `44₁₆` | CHCL |
| #391 / #392 | lengthOfAdditionalParameter\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOAP |

> **TLV 结构对照**：`7F 21`＝认证令牌模板；`82 01 4B`＝长度 331；`7F 4E 44`＝令牌内容（byte#6–#8）；`5F 37 82 01 00`＝签名 TLV（byte#76–#80，长度 256）。  
> **译本注（校对）**：此前摘要误写为“无 challengeClient”；PDF 表 105 明确带 32 字节 `challengeClient`（`0020₁₆`），仅附加参数长度为 0。

**表 106 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 | returnValue = Ownership verified, Authentication complete | `12₁₆` | RV_OVAC |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |
| #20 / #21 | lengthOfSessionKeyInfo\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOSKI |

### 10.6.8.5 示例 #5 — ACR 非对称、不建立会话密钥（失败路径）

#### 10.6.8.5.1 前提

与示例 #4 相同的 COCO、AI（RSASSA-PSS OID）、challenge/POWN 长度与 CVC-TLV 结构；但：

> **NOTE 1（前提）**：认证令牌因**签名不正确**而无效。  
> 前提另写：正响应中可用 `returnValue = 21₁₆` 指示无效签名（整车厂专用范围；Mnemonic 亦厂商特定）。**NOTE 2**  
> **表 110 实际给出否定响应** NRC `51₁₆`（`invalidSignature` / `NRC_CVFIS`）。即：前提中的 `21₁₆` 与示例报文表 110 并非同一条路径——实现以 OEM 诊断规范选择“正响应 RV”或“NRC”为准。

#### 10.6.8.5.2 Step #1：请求挑战

**表 107 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | communicationConfiguration = no secure communication | `00₁₆` | COCO |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |

**表 108 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | returnValue = Request accepted | `00₁₆` | RV_RA |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |
| #20 / #21 | lengthOfChallengeServer\[byte#1 / byte#2\] | `00₁₆` / `40₁₆` | LOCHSE |
| #22 : #85 | challengeServer\[byte#1:64\] | `AA₁₆` : `44₁₆` | CHSE |
| #86 / #87 | lengthOfNeededAdditionalParameter\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LONAP |

#### 10.6.8.5.3 Step #2：验证 Proof of Ownership

**表 109 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 : #18 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `0A₁₆`） | AI |
| #19 / #20 | lengthOfProofOfOwnershipClient\[byte#1 / byte#2\] | `01₁₆` / `50₁₆` | LPOWNCL |
| #21 | proofOfOwnershipClient\[byte#1\] | `7F₁₆` | POWNCL |
| #22 | proofOfOwnershipClient\[byte#2\] | `21₁₆` | |
| #23 | proofOfOwnershipClient\[byte#3\] | `82₁₆` | |
| #24 | proofOfOwnershipClient\[byte#4\] | `01₁₆` | |
| #25 | proofOfOwnershipClient\[byte#5\] | `4B₁₆` | |
| #26 | proofOfOwnershipClient\[byte#6\] | `7F₁₆` | |
| #27 | proofOfOwnershipClient\[byte#7\] | `4E₁₆` | |
| #28 | proofOfOwnershipClient\[byte#8\] | `44₁₆` | |
| #29 : #95 | proofOfOwnershipClient\[byte#9:75\] | `00₁₆`–`FF₁₆` | |
| #96 | proofOfOwnershipClient\[byte#76\] | `5F₁₆` | |
| #97 | proofOfOwnershipClient\[byte#77\] | `37₁₆` | |
| #98 | proofOfOwnershipClient\[byte#78\] | `82₁₆` | |
| #99 | proofOfOwnershipClient\[byte#79\] | `01₁₆` | |
| #100 | proofOfOwnershipClient\[byte#80\] | `00₁₆` | |
| #101 : #356 | proofOfOwnershipClient\[byte#81:336\] | `00₁₆`–`FF₁₆` | |
| #357 / #358 | lengthOfChallengeClient\[byte#1 / byte#2\] | `00₁₆` / `20₁₆` | LOCHCL |
| #359 : #390 | challengeClient\[byte#1:32\] | `AA₁₆` : `44₁₆` | CHCL |
| #391 / #392 | lengthOfAdditionalParameter\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOAP |

> **ISO 印本问题**：PDF 表 109 末两行 A_Data 印作 `#390 / #391`，与上一行 `challengeClient[byte#32] = #390` 冲突；按表 105 及长度累加应为 **`#391 / #392`**。  
> 字节布局与表 105 完全相同，差别仅在于本例 POWN 内的签名不正确。

**表 110 — 否定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Negative Response SID | `7F₁₆` | SIDRSIDNRQ |
| #2 | Authentication Request SID | `29₁₆` | ARS |
| #3 | responseCode = invalidSignature | `51₁₆` | NRC_CVFIS |

### 10.6.8.6 示例 #6 — ACR 对称、不建立会话密钥（成功路径）

#### 10.6.8.6.1 前提

- `communicationConfiguration = 00₁₆`  
- `algorithmIndicator`（16 字节）=`06 09 60 86 48 01 65 03 04 01 02 00 00 00 00 00₁₆`  
  > **NOTE**：OID **2.16.840.1.101.3.4.1.2**（AES-128-CBC，FIPS PUB 197）的 BER 编码。本例 AES 密钥 = `2B7E151628AED2A6ABF7158809CF4F3C₁₆`。  
- 不需要 Challenge Client；不需要附加参数  
- Challenge Server 长度 `0010₁₆`（16 字节随机数）  
- client POWN 长度 `0010₁₆`：对 Challenge Server 用上述密钥做 AES 加密得到的 16 字节  

#### 10.6.8.6.2 Step #1：请求挑战

**表 111 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | communicationConfiguration = no secure communication | `00₁₆` | COCO |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |

**表 112 — 肯定响应**（server → client；返回 16 字节 challengeServer）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | returnValue = Request accepted | `00₁₆` | RV_RA |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |
| #20 | lengthOfChallengeServer\[byte#1\]（high byte） | `00₁₆` | LOCHSE_HB |
| #21 | lengthOfChallengeServer\[byte#2\]（low byte） | `10₁₆` | LOCHSE_LB |
| #22 | challengeServer\[byte#1\] | `32₁₆` | CHSE |
| #23 | challengeServer\[byte#2\] | `43₁₆` | |
| #24 | challengeServer\[byte#3\] | `F6₁₆` | |
| #25 | challengeServer\[byte#4\] | `A8₁₆` | |
| #26 | challengeServer\[byte#5\] | `88₁₆` | |
| #27 | challengeServer\[byte#6\] | `5A₁₆` | |
| #28 | challengeServer\[byte#7\] | `30₁₆` | |
| #29 | challengeServer\[byte#8\] | `8D₁₆` | |
| #30 | challengeServer\[byte#9\] | `31₁₆` | |
| #31 | challengeServer\[byte#10\] | `31₁₆` | |
| #32 | challengeServer\[byte#11\] | `98₁₆` | |
| #33 | challengeServer\[byte#12\] | `A2₁₆` | |
| #34 | challengeServer\[byte#13\] | `E0₁₆` | |
| #35 | challengeServer\[byte#14\] | `37₁₆` | |
| #36 | challengeServer\[byte#15\] | `07₁₆` | |
| #37 | challengeServer\[byte#16\] | `34₁₆` | |
| #38 | lengthOfNeededAdditionalParameter\[byte#1\]（high byte） | `00₁₆` | LONAP_HB |
| #39 | lengthOfNeededAdditionalParameter\[byte#2\]（low byte） | `00₁₆` | LONAP_LB |

> challengeServer 连写 = `32 43 F6 A8 88 5A 30 8D 31 31 98 A2 E0 37 07 34₁₆`。

#### 10.6.8.6.3 Step #2：验证 POWN（正确）

**表 113 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 : #18 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |
| #19 | lengthOfProofOfOwnershipClient\[byte#1\]（high byte） | `00₁₆` | LPOWNCL_HB |
| #20 | lengthOfProofOfOwnershipClient\[byte#2\]（low byte） | `10₁₆` | LPOWNCL_LB |
| #21 | proofOfOwnershipClient\[byte#1\] | `39₁₆` | POWNCL |
| #22 | proofOfOwnershipClient\[byte#2\] | `25₁₆` | |
| #23 | proofOfOwnershipClient\[byte#3\] | `84₁₆` | |
| #24 | proofOfOwnershipClient\[byte#4\] | `1D₁₆` | |
| #25 | proofOfOwnershipClient\[byte#5\] | `02₁₆` | |
| #26 | proofOfOwnershipClient\[byte#6\] | `DC₁₆` | |
| #27 | proofOfOwnershipClient\[byte#7\] | `09₁₆` | |
| #28 | proofOfOwnershipClient\[byte#8\] | `FB₁₆` | |
| #29 | proofOfOwnershipClient\[byte#9\] | `DC₁₆` | |
| #30 | proofOfOwnershipClient\[byte#10\] | `11₁₆` | |
| #31 | proofOfOwnershipClient\[byte#11\] | `85₁₆` | |
| #32 | proofOfOwnershipClient\[byte#12\] | `97₁₆` | |
| #33 | proofOfOwnershipClient\[byte#13\] | `19₁₆` | |
| #34 | proofOfOwnershipClient\[byte#14\] | `6A₁₆` | |
| #35 | proofOfOwnershipClient\[byte#15\] | `0B₁₆` | |
| #36 | proofOfOwnershipClient\[byte#16\] | `32₁₆` | |
| #37 / #38 | lengthOfChallengeClient\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOCHCL |
| #39 | lengthOfAdditionalParameter\[byte#1\]（high byte） | `00₁₆` | LOAP_HB |
| #40 | lengthOfAdditionalParameter\[byte#2\]（low byte） | `00₁₆` | LOAP_LB |

> POWN 连写 = `39 25 84 1D 02 DC 09 FB DC 11 85 97 19 6A 0B 32₁₆`，即用密钥 `2B7E151628AED2A6ABF7158809CF4F3C₁₆` 对 challengeServer 做 AES 加密的结果。

**表 114 — 肯定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 | returnValue = Ownership verified, Authentication complete | `12₁₆` | RV_OVAC |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |
| #20 / #21 | lengthOfSessionKeyInfo\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOSKI |

### 10.6.8.7 示例 #7 — ACR 对称、不建立会话密钥（失败路径）

#### 10.6.8.7.1 前提

与示例 #6 相同：

- `communicationConfiguration = 00₁₆`  
- `algorithmIndicator` = AES-128-CBC OID 的 16 字节 BER 编码  
- 不需要 Challenge Client；不需要附加参数  
- Challenge Server 长度 `0010₁₆`（16 字节随机数）  
- client POWN 长度 `0010₁₆`  

失败原因（PDF 原文）：**客户端 AES 密钥与服务器密钥不匹配**（因而 POWN 校验失败）。

> **译本注**：示例 #7 前提未重复给出 AES 密钥值（示例 #6 的 NOTE 才有 `2B7E…4F3C₁₆`）。

#### 10.6.8.7.2 Step #1：请求挑战

**表 115 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | communicationConfiguration = no secure communication | `00₁₆` | COCO |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |

**表 116 — 肯定响应**（server → client；返回 16 字节 challengeServer）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Response SID | `69₁₆` | ARS |
| #2 | authenticationTask = requestChallengeForAuthentication | `05₁₆` | LEV_AT_RCFA |
| #3 | returnValue = Request accepted | `00₁₆` | RV_RA |
| #4 : #19 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |
| #20 | lengthOfChallengeServer\[byte#1\]（high byte） | `00₁₆` | LOCHSE_HB |
| #21 | lengthOfChallengeServer\[byte#2\]（low byte） | `10₁₆` | LOCHSE_LB |
| #22 : #37 | challengeServer\[byte#1:16\] | `32 43 F6 A8 88 5A 30 8D 31 31 98 A2 E0 37 07 34₁₆`（逐字节同表 112） | CHSE |
| #38 | lengthOfNeededAdditionalParameter\[byte#1\]（high byte） | `00₁₆` | LONAP_HB |
| #39 | lengthOfNeededAdditionalParameter\[byte#2\]（low byte） | `00₁₆` | LONAP_LB |

#### 10.6.8.7.3 Step #2：验证 POWN（无效）

**表 117 — 请求**（client → server）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Authentication Request SID | `29₁₆` | ARS |
| #2 | authenticationTask = verifyProofOfOwnershipUnidirectional | `06₁₆` | LEV_AT_VPOWNU |
| #3 : #18 | algorithmIndicator\[byte#1:16\] | `06₁₆` : `00₁₆`（byte#11 = `02₁₆`） | AI |
| #19 | lengthOfProofOfOwnershipClient\[byte#1\]（high byte） | `00₁₆` | LPOWNCL_HB |
| #20 | lengthOfProofOfOwnershipClient\[byte#2\]（low byte） | `10₁₆` | LPOWNCL_LB |
| #21 | proofOfOwnershipClient\[byte#1\] | `01₁₆` | POWNCL |
| #22 | proofOfOwnershipClient\[byte#2\] | `02₁₆` | |
| #23 | proofOfOwnershipClient\[byte#3\] | `03₁₆` | |
| #24 | proofOfOwnershipClient\[byte#4\] | `04₁₆` | |
| #25 | proofOfOwnershipClient\[byte#5\] | `05₁₆` | |
| #26 | proofOfOwnershipClient\[byte#6\] | `06₁₆` | |
| #27 | proofOfOwnershipClient\[byte#7\] | `07₁₆` | |
| #28 | proofOfOwnershipClient\[byte#8\] | `08₁₆` | |
| #29 | proofOfOwnershipClient\[byte#9\] | `09₁₆` | |
| #30 | proofOfOwnershipClient\[byte#10\] | `0A₁₆` | |
| #31 | proofOfOwnershipClient\[byte#11\] | `0B₁₆` | |
| #32 | proofOfOwnershipClient\[byte#12\] | `0C₁₆` | |
| #33 | proofOfOwnershipClient\[byte#13\] | `0D₁₆` | |
| #34 | proofOfOwnershipClient\[byte#14\] | `0E₁₆` | |
| #35 | proofOfOwnershipClient\[byte#15\] | `0F₁₆` | |
| #36 | proofOfOwnershipClient\[byte#16\] | `11₁₆` | |
| #37 / #38 | lengthOfChallengeClient\[byte#1 / byte#2\] | `00₁₆` / `00₁₆` | LOCHCL |
| #39 | lengthOfAdditionalParameter\[byte#1\]（high byte） | `00₁₆` | LOAP_HB |
| #40 | lengthOfAdditionalParameter\[byte#2\]（low byte） | `00₁₆` | LOAP_LB |

> POWN 连写 = `01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 11₁₆`（末字节为 `11₁₆` 而非 `10₁₆`）。该值与表 112/116 的 challengeServer 在正确密钥下的 AES 结果不符，因此服务器判定 POWN 校验失败。

**表 118 — 否定响应**（server → client）

| A_Data | Description | Byte value | Mnemonic |
|---|---|---|---|
| #1 | Negative Response SID | `7F₁₆` | SIDRSIDNRQ |
| #2 | Authentication Request SID | `29₁₆` | ARS |
| #3 | responseCode = Ownership verification failed | `58₁₆` | NRC_OVF |

> **长载荷说明**：表 87–118 的锚点字节已逐条对照 PDF p.86–107 落表；示例中标为 `00₁₆`–`FF₁₆` 的区段（500 字节证书正文、336 字节 POWN 的非 TLV 头部分、64/32 字节 challenge 中间字节）在 ISO 原文即为任意值占位，不是缺失。MinerU Markdown 在这些表上有 OCR 噪声与行错位，联调勿直接复制转换文本中的十六进制串。

---

## 附录 B.5 AuthenticationReturnParameter 定义

表 B.5 规定 `authenticationReturnParameter` 定义。

**表 B.5 — authenticationReturnParameter 定义**

| Byte value | Description | Cvt | Mnemonic |
|---|---|---|---|
| `00₁₆` | RequestAccepted — 请求成功 | U | RA |
| `01₁₆` | GeneralReject — 请求未成功 | U | GR |
| `02₁₆` | AuthenticationConfiguration APCE — 指示配置为 APCE | M | ACAPCE |
| `03₁₆` | AuthenticationConfiguration ACR with asymmetric cryptography | M | ACACRAC |
| `04₁₆` | AuthenticationConfiguration ACR with symmetric cryptography | M | ACACRSC |
| `05₁₆`–`0F₁₆` | ISOSAEReserved | M | ISOSAERESRVD |
| `10₁₆` | DeAuthentication successful — 去认证成功，服务器再次受保护 | U | DAS |
| `11₁₆` | CertificateVerified, OwnershipVerificationNecessary — 证书已验证（第一步），第二步待定 | U | CVOVN |
| `12₁₆` | OwnershipVerified, AuthenticationComplete — POWN 已验证，认证完成 | U | OVAC |
| `13₁₆` | CertificateVerified — 证书已验证 | U | CV |
| `14₁₆`–`9F₁₆` | ISOSAEReserved | M | ISOSAERESRVD |
| `A0₁₆`–`CF₁₆` | VehicleManufacturerSpecific — 整车厂专用；Mnemonic 亦由厂商定义 | U | VMS |
| `D0₁₆`–`FE₁₆` | SystemSupplierSpecific — 系统供应商专用范围（PDF 英文说明句误写为 vehicle manufacturer；Mnemonic 以 SSS 为准） | U | SSS |
| `FF₁₆` | ISOSAEReserved | M | ISOSAERESRVD |

> **NOTE** `authenticationReturnParameter` 可按需单独选用，取决于应向客户端提供多少信息（例如开发期用更具体取值，量产后用更一般取值）。

---

## 译本说明与 Markdown 校正要点

1. **权威性**：结论与报文字节以 `autosar/dm/iso/ISO 14229-1-2020.pdf` 为准；本文件为中文检索译本。  
2. **MinerU 噪声（已按 PDF 校正）**：  
   - 十六进制写作粘连/公式化（如 `0 0₁₆ t0 FF₁₆`、`02 i₁₆`）→ 统一为 `XX₁₆`；  
   - 表 66–72、77–83 等参数名截断、Cvt 列错位、表 70/71 被拆坏；  
   - 表 74 子功能描述与条件脚注 C1/C2；  
   - 表 86 序列错误条件；  
   - B.5 全表取值与 Mnemonic。  
3. **与 AUTOSAR DM 关系**：AUTOSAR AP Diagnostics R25 仅强制 APCE 子集（`00/01/02/03/04/08`），ACR（`05/06/07`）不在 DM 范围；实现边界见交叉链接文档。  
4. **图**：图 8–11 已内嵌引用 `../markdown/ISO_14229-1-2020/images/` 下 MinerU 转换图。若本地无 `images/`，先执行 `uv run --project scripts scripts/unpack_markdown_images.py --stem ISO_14229-1-2020`。  
5. **消息流长表**：示例 #1–#7（表 87–118）均已按 PDF 落成完整表格，含 A_Data 编号、Byte value 与 Mnemonic；ISO 用 `00₁₆`–`FF₁₆` 表示的任意值区段照录为区间行。  
6. **本次 PDF 校对修订（2026-08-11）**：  
   - 开篇 security/safety 区分译法；  
   - `proofOfOwnership` 方向与 ISO 英文笔误说明；  
   - ACR 单向步骤编号 (9)/(13) 空缺按原文保留说明；NOTE 3/4 补全；  
   - 响应表 77–84 脚注 a/M₁/C 补齐；  
   - 示例 #4 表 105：补回 `challengeClient`（`0020₁₆`），纠正“无 challenge”误述；  
   - 示例 #5：澄清前提 `RV=21₁₆` 与表 110 `NRC=51₁₆` 两条路径；  
   - 示例 #7：失败原因为客户端/服务器 AES 密钥不匹配；  
   - 标明 ISO 原文问题：表 82 后误写 Bidirectional、表 99 缺 CEID、示例 #4 正文 7618→7816、B.5 SSS 说明句。
7. **本次修订（2026-08-25）**：补全 10.6.8.4–10.6.8.7（示例 #4–#7）此前以叙述行代替的表格，新增/展开 **表 101–118** 共 18 张完整表：  
   - 表 101/102、103/104、105/106：ACR 非对称成功路径；表 105 的 336 字节 POWN 按 TLV 锚点（`7F21` 模板、`7F4E` 内容、`5F37 82 01 00` 签名）逐字节列出；  
   - 表 107–110：ACR 非对称失败路径；补 PDF 表 109 末两行 A_Data 印作 `#390/#391` 的印本错误（应为 `#391/#392`）；  
   - 表 111–114：ACR 对称成功路径；challengeServer `32 43 F6 A8 88 5A 30 8D 31 31 98 A2 E0 37 07 34₁₆` 与 POWN `39 25 84 1D 02 DC 09 FB DC 11 85 97 19 6A 0B 32₁₆` 逐字节落表；Mnemonic 按 PDF 区分 `_HB`/`_LB`；  
   - 表 115–118：ACR 对称失败路径；错误 POWN 为 `01 02 … 0F 11₁₆`（末字节 `11₁₆`）；  
   - 修正文首交叉链接（`..._Authentication_Spec.md` → `..._APCE_Spec.md`），并补 ACR 单向 Spec 链接。

---

*文档结束。*
