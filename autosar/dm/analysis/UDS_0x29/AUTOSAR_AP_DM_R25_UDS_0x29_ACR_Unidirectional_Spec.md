# AUTOSAR AP DM R25-11 UDS 0x29 ACR 单向认证功能 Spec

> **边界声明**：本文组合两类基线：UDS `0x29` 公共处理、Diagnostic Client 状态与授权复用 AUTOSAR AP DM R25-11；ACR 单向认证 `0x05/0x06` 严格依据 ISO 14229-1:2020。AUTOSAR R25-11 仅实现 APCE 子集 `0x00/01/02/03/04/08`，[SWS_DM_01226] **不包含 ACR `0x05/0x06/0x07`**。因此本文出现的 ACR callback、crypto adapter 和配置均是项目逻辑接口需求或待冻结项，绝不是 `ara::diag` 标准接口。

| 文档属性 | 值 |
|---|---|
| 文档状态 | 工程实现与验收基线（项目扩展 Spec） |
| 覆盖版本 | AUTOSAR AP Diagnostics R25-11；ISO 14229-1:2020 |
| ACR 范围 | 单向 ACR：`requestChallengeForAuthentication (0x05)`、`verifyProofOfOwnershipUnidirectional (0x06)` |
| 公共机制范围 | `0x00` 去认证、`0x08` 能力查询、UDS 公共校验/响应/定时、AUTOSAR 状态/Role/DAL/SecurityEvent 可复用机制 |
| 编写日期 | 2026-08-21 |
| 自定义需求 | `ACR29-xxx`；不是 AUTOSAR Requirement ID |

## 0. 执行摘要

1. 单向 ACR 是 `0x05 → 0x06` 两阶段协议：服务器先产生一次性 challenge，客户端再提交 POWN；只有 POWN、算法、challenge 上下文和授权映射全部成功，才提交新的认证状态与权限并返回 `69 06 12 ...`。
2. `0x05/0x06` 的 wire contract 来自 ISO 14229-1:2020 §10.6.5 表 70/71、§10.6.6 表 81/82；长度前缀均为 2 字节 MSB-first，`algorithmIndicator` 固定 16 字节，承载 BER 编码 OID、左对齐、右补 `00`。`0x06` 的 AI 必须逐字节等于前序 `0x05`。
3. 非对称 POWN 是客户端私钥签名的 OEM 认证令牌；对称 POWN 是基于预共享密钥对 challenge 及项目冻结上下文计算的 MAC/签名。具体 token canonicalization、密钥标识、rights/roles、KDF 与 `sessionKeyInfo` 均不是 ISO/AUTOSAR 已冻结格式。
4. challenge、在途序列、认证结果、Role/DAL、timer 和密钥上下文必须按 Diagnostic Client/diagnostic channel 隔离。challenge 单次使用；过期、被新 `0x05` 替换、取消或完成后不可重放。
5. 认证状态独立于 Diagnostic Session 和 `0x27 SecurityLevel`。受认证保护服务在 Role/DAL 均不允许时返回 NRC `0x34`；`kAuthenticated` 不是无条件授权通票。
6. AUTOSAR 的 `ClientAuthentication`、`ExternalAuthentication`、Role/DAL、超时与 SecurityEvent 机制可复用；项目不得为 `0x05/0x06` 虚构 `ara::diag::Authentication` 标准方法。

## 1. 范围、非范围与证据规则

### 1.1 In scope

- ISO 单向 ACR 的非对称和对称前提、流程、wire contract、成功/失败语义；
- AUTOSAR R25-11 可复用的请求入口、Conversation、P2/P2*、取消、客户端状态、Role/DAL、`0x34` 与 SecurityEvent；
- challenge 生命周期、防重放、再次认证、去认证、超时和里程退出的项目实现约束；
- ACR 逻辑接口、配置维度、错误边界、需求 Catalog 与验收测试。

### 1.2 Out of scope

- ACR 双向 `0x07` 与 server-side POWN；
- 把 ACR 加入 AUTOSAR DEXT 六子类或伪造 `ara::diag` API；
- APCE 证书交换细节（见现有 APCE Spec）；
- OEM 具体密钥、密钥导入流程、生产证书、HSM 厂商接口；
- secure diagnostic communication 的具体封装协议；
- ISO/IEC 9798、ISO/IEC 7816-8、X.690、具体密码算法标准的全文复述；
- 量产算法、token、rights/roles、超时、里程阈值的最终取值；这些必须经项目决议冻结。

### 1.3 证据等级

| 标签 | 含义 | 使用规则 |
|---|---|---|
| `ISO-NORM` | ISO 14229-1:2020 规范性要求 | 可写“必须”，引用 ISO 章节/表；不伪造 SWS ID |
| `AUTOSAR-NORM` | AUTOSAR R25-11 SHALL/条件 SHALL | 必须给出五位 `[SWS_DM_xxxxx]` |
| `DERIVED` | 为满足规范、安全或可测试性推导的设计约束 | 必须标明推导，不冒充标准原文 |
| `PROJECT-DECISION` | OEM/供应商需冻结的选择 | 未决时相关验收项为 BLOCKED，不得默认通过 |

### 1.4 源文件与章节地图

| 主题 | 权威源 | 检索/校对载体 |
|---|---|---|
| ACR 前提与单向流程 | [`autosar/dm/iso/ISO 14229-1-2020.pdf`](../iso/ISO%2014229-1-2020.pdf)，§10.6.3、Figure 10 | [ISO 0x29 全量中文译本](./ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md) §10.6.3 |
| 公共认证状态、退出条件 | 同上，§10.6.4 | 同上 §10.6.4 |
| `0x05/0x06` 请求 | 同上，§10.6.5，Tables 70/71/74/75 | 同上 §10.6.5 |
| `0x05/0x06` 正响应 | 同上，§10.6.6，Tables 81/82/85 | 同上 §10.6.6 |
| NRC | 同上，§10.6.7、Figure 11、Annex A | 同上 §10.6.7；MinerU 仅定位 |
| 示例向量 | 同上，§10.6.8.4–10.6.8.7，Tables 101–118 | 同上 §10.6.8.4–10.6.8.7（2026-08-11 PDF 校对） |
| AUTOSAR 状态/Role/DAL | [`AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf`](../autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf)，§7.3.2.3–7.3.2.4 | R25 Markdown L3335–3587 |
| 公共校验/异步处理 | 同上，§7.3.2.5 | R25 Markdown L3595–3779 |
| AUTOSAR APCE 边界 | 同上，§7.3.2.8.11 | R25 Markdown L4513–4694 |
| API 与 SecurityEvent | 同上，§8.5–8.6、§8.17、§7.5.1 | R25 Markdown L9135–9352、L11284–11386、L8424–8530 |

字段表已依据仓库中标记为“按 PDF 校正”的译本回查；该译本记录了 Tables 70/71/81/82 的 OCR 修复。量产联调仍必须用已授权 PDF golden vector 复核完整 A_Data，尤其是 OEM token、BER OID、POWN、附加参数和 `sessionKeyInfo`；不得复制 MinerU 长十六进制串作为测试真值。

## 2. 架构与职责

```text
Diagnostic Client
  -> UDS TP / Diagnostic Conversation
  -> AUTOSAR DM common validation and timing
  -> Project ACR 0x29 dispatcher (05/06 only)
  -> Project ACR policy + crypto adapter + HSM
  -> Project authorization bridge
  -> AUTOSAR ExternalAuthentication / ClientAuthentication
  -> AUTOSAR Role + DAL authorization
  -> Protected UDS service
```

| 组件 | 责任 | 禁止事项 |
|---|---|---|
| DM 公共入口 | SID/SF、长度/session/security/环境校验，P2/P2*、78、Conversation 与取消 | 不解析 OEM POWN |
| ACR Dispatcher（项目） | 解析/编码 05/06，管理 per-client transaction | 不声明为 AUTOSAR 标准 handler |
| ACR Policy/Crypto（项目） | 算法许可、challenge、POWN、密钥、rights/roles | 不直接改其他客户端状态 |
| Auth Bridge（项目） | 将成功结果原子提交到正确 `ClientAuthentication` | 不以 RV 代替状态提交 |
| AUTOSAR 状态授权 | `Authenticate()`、Role、DAL、去认证、`0x34` | 不把 0x29 与 0x27 合并 |
| IdsM/日志 | 成功、失败、受保护服务拒绝、审计关联 | 不记录秘密、原始 POWN 或 session key |

## 3. 0x29 公共报文处理

### 3.1 SID、SubFunction 与响应

- 请求 SID：`0x29`；正响应 SID：`0x69`；负响应：`7F 29 NRC`。`ISO-NORM`
- SubFunction byte 的 bit 7 是 SPRMIB，实际任务码取 `byte & 0x7F`；单向 ACR 任务码是 `0x05/0x06`。`ISO-NORM`
- SPRMIB=1 只抑制最终肯定响应；需要发送的否定响应不被抑制。若处理期间发送 `0x78`，最终响应行为遵循 ISO §8.7：最终响应不因 SPRMIB 而消失。`ISO-NORM`
- 正响应回显 bit 6..0 的 SubFunction，不回显 SPRMIB。`ISO-NORM`
- 物理和功能寻址均进入通用服务支持判定；响应始终使用物理寻址。功能寻址下 `0x11/0x12/0x7F/0x7E/0x31` 等 ISO 指定类别可能被抑制，必须由通用响应矩阵统一处理，不能由 ACR callback 自行发送。`ISO-NORM`
- `PROJECT-DECISION`：出于凭据喷洒、响应风暴和客户端身份不唯一风险，量产是否允许功能寻址执行有状态 `0x05/0x06` 必须冻结。推荐配置为只允许物理寻址；若功能寻址被配置拒绝，返回/抑制行为仍按 ISO 通用矩阵。

### 3.2 通用校验与执行门

AUTOSAR 公共校验顺序以 [SWS_DM_00096] 为入口；格式错误 `0x13` 见 [SWS_DM_00098]，未知 SF `0x12` 见 [SWS_DM_00100]，session gate 见 [SWS_DM_00101]、[SWS_DM_00102]，SecurityLevel gate 见 [SWS_DM_00103]、[SWS_DM_00450]，环境条件见 [SWS_DM_00111]、[SWS_DM_00286]–[SWS_DM_00289]。ACR 专属逻辑只在全部前置校验成功后调用。`AUTOSAR-NORM`

通用部分的**校验先后不是实现自由**：[SWS_DM_00096] 明示依据 ISO §8.7.2 **Figure 5 — General server response behaviour**；`0x29` 带 SubFunction，因此实际适用 §8.7.3.1 **Figure 6**。Figure 6 的强制顺序为：

1. Minimum length check → `0x13`；
2. SubFunction supported ever for the SID? → `0x12`；
3. **Authentication check OK? → `0x34`**；
4. SubFunction supported in active session for the SID? → `0x7E`；
5. SubFunction security check OK?（Optional）→ `0x33`；
6. request sequence respected for the SubFunction?（Optional）→ `0x24`；
7. manufacturer/supplier specific check → `XX`；
8. Specific SID checks（ACR 专属逻辑从这里开始）。

`ISO-NORM` ISO 14229-1:2020 §8.7.3.1。要点：`0x34` 先于 `0x33`，`0x33` 先于 `0x24`；`Authentication check` 在 **Mandatory** 列，`security check` 与 `request sequence` 在 **Optional** 列。

落到 ACR 实现，专属逻辑位于第 8 步之后，其内部分层为：

1. SF 精确长度与所有长度前缀一致性；
2. per-client 序列检查（ACR transaction 层，区别于第 6 步的通用 sequence 检查）；
3. AI/算法/profile、challenge 状态；
4. crypto/授权映射/状态原子提交；
5. 组装 final response、SecurityEvent 与审计。

`0x29` 服务特定 NRC 的分支裁决另见 ISO §10.6.7 与 Figure 11；Figure 5/6 管通用顺序，Figure 11 管 `0x29` 内部的服务特定分支，两者层级不同、不冲突。

Role/DAL 与 NRC `0x34` 是认证完成后对**受保护业务服务**执行的授权门。它**不可能**成为 `0x05/0x06` 的前置条件——DEXT `constr_10038`（imposition time **CP: IT_DiagDes, AP: IT_DiagDes**）明文规定，被 **`sub-classes of DiagnosticAuthentication`** 引用的 `DiagnosticAccessPermission` 不得存在 `authenticationEnabled`。因此"未认证就不能认证"的死锁在元模型层面已被排除，无需项目自行设计引导与恢复路径。`AUTOSAR-NORM`

约束范围需注意：`constr_10038` 只禁止 `authenticationEnabled` 这一个聚合。`DiagnosticAuthentication` 作为 `DiagnosticServiceInstance` 子类仍继承 `accessPermission`（0..1），所以用 **session 门、`0x27` SecurityLevel 门或环境条件**保护 `0x05/0x06` 是合法配置——对既有栈而言，`0x27` 门是可直接复用的加固点。`AUTOSAR-NORM` + `PROJECT-DECISION`（是否启用）

### 3.3 Conversation、并发、取消和定时

- 每个物理请求只产生一个 final response；`0x78` 是 interim response。`ISO-NORM`
- ACR crypto Future 未在 P2 内完成时，由 DM 发送 `0x78` 并进入 P2*；达到配置的 response-pending 上限后返回 `0x10`。[SWS_DM_00368]、[SWS_DM_00369]。`AUTOSAR-NORM`
- `0x78` 不消费 challenge；final 成功或 final 失败才消费。Conversation cancel、连接关闭或项目超时必须使 challenge 不再可用。`DERIVED`
- 取消后必须取消/隔离 crypto job；晚到结果不得发送第二个 final response，不得提交 Role、DAL 或密钥。`DERIVED`
- 同一 client/channel 最多一个 ACR transaction；不同 client/channel 可并发。相同 handler 若配置非并发，则由调度层串行化，但 client transaction 仍须独立。`DERIVED`

### 3.4 与 Session、SecurityLevel 和受保护服务解耦

ISO §10.6.4 明确认证与 Diagnostic Session、SecurityLevel 无直接关系。AUTOSAR 进一步把认证状态/Role/DAL作为独立授权轴：

- 启动状态 `kDeAuthenticated`：[SWS_DM_01205]；
- default Role：[SWS_DM_01204]；
- 应用调用 `ClientAuthentication::Authenticate(roles)` 后才设置认证状态/Role：[SWS_DM_01206]；
- Role 检查失败后再检查 DAL：[SWS_DM_01223]、[SWS_DM_01224]；
- 两者均失败返回 `0x34` 并停止服务：[SWS_DM_01225]；
- 0x27 gate 失败仍返回 `0x33`，不得由 ACR 成功绕过。

受保护服务验收至少选择 `RequestDownload (SID 0x34)`：未认证且 default Role/DAL 不允许时返回 `7F 34 34`；认证后仅当新 Role 或 DAL 授权时才允许。这里第一个 `34` 是原请求 SID，第二个 `34` 是 NRC。

## 4. 单向 ACR 前提与完整流程

### 4.1 密钥前提

| 模式 | ISO 前提 | 项目必须冻结 |
|---|---|---|
| 非对称 | 客户端持有私钥，服务器持有对应客户端公钥 | keyId/identity、算法参数、token canonicalization、rights/roles 表示、吊销/轮换 |
| 对称 | 客户端与服务器预共享对称密钥 | keyId/层级、MAC/签名算法、输入拼接、anti-rollback、轮换与失败锁定 |

私钥/对称密钥不得通过 UDS wire contract 传输。POWN 验证必须在受控 crypto/HSM 边界内完成；比较 MAC 使用恒定时间实现。`DERIVED`

### 4.2 两阶段流程

1. 客户端发送 `29 05 COCO AI[16]`，指示算法和是否建立会话密钥。`ISO-NORM`
2. 服务器校验请求、算法/profile、限流和 client/channel 状态，产生高质量唯一 challenge。`ISO-NORM` + `DERIVED`
3. 服务器保存 transaction：client/channel、AI、COCO、challenge、neededAdditionalParameter、issuedAt、expiry、generation，并发送 `69 05 RV AI LOCHSE CHSE LONAP [NAP]`。`ISO-NORM`
4. 客户端可产生 challengeClient；非对称模式构建并签名含 challenge/身份/rights/roles/上下文的 token，对称模式对冻结输入计算 MAC/签名。`ISO-NORM`
5. 客户端发送 `29 06 AI LPOWNCL POWNCL LOCHCL [CHCL] LOAP [AP]`。`ISO-NORM`
6. 服务器先原子标记 transaction“验证中”，校验 sequence、expiry、AI 一致、可选字段与前序需求一致，再验证 POWN。`ISO-NORM` + `DERIVED`
7. 若请求建立 session key，服务器创建/派生并启用密钥，生成 `sessionKeyInfo`；密钥最长只在当前 authenticated session 内有效。`ISO-NORM`
8. 项目选择复用 AUTOSAR 状态授权通路时，将新的 rights/roles 映射结果原子提交到对应 `ClientAuthentication::Authenticate(roles)`，替换旧认证授权；按项目策略设置 DAL。`ClientAuthentication::Authenticate` 的行为是 `AUTOSAR-NORM`（[SWS_DM_01206]），ACR 选择该通路属于 `DERIVED` + `PROJECT-DECISION`。
9. 成功返回 `69 06 12 AI LOSKI [SKI]`；失败返回冻结的 NRC，或 OEM 明确采用的非成功 RV 路径。任一 final 结果后 transaction/challenge 都不可复用。`ISO-NORM` + `DERIVED`

### 4.3 非对称与对称 POWN

- 非对称：token 至少绑定 server challenge；应绑定 client identity、server identity/channel、AI、COCO、rights/roles、freshness 和协议用途标签。ISO 给出 CVC/ISO 9798 类构造作为示例，但未规定唯一 wire token。`ISO-NORM`/`PROJECT-DECISION`
- 对称：POWN 是对 server challenge 以及项目选定的 challengeClient/additionalParameter/rights/roles 计算的一次性签名、HMAC、CMAC 或 GMAC。具体输入序列与编码必须字节级冻结。`ISO-NORM`/`PROJECT-DECISION`
- 对称模式不得仅以可预测计数器作为 challenge；非对称签名也不能弥补 challenge 重用。`DERIVED`
- ISO 示例：非对称成功使用 RSASSA-PSS OID、64 字节 server challenge、32 字节 client challenge、336 字节 CVC token；对称成功使用 AES-128-CBC OID、16 字节 challenge/POWN。这些是示例向量，不是量产算法推荐或强制长度。

### 4.4 会话密钥

`communicationConfiguration` 决定是否及如何继续保护后续通信；`sessionKeyInfo` 可包含加密的会话密钥和/或密钥确认材料。其格式、KDF、proof value 和传输保护均由 OEM 选择。`ISO-NORM`

`PROJECT-DECISION` 必须冻结：COCO 值域、KDF/label/context、key confirmation、SKI 格式、secure communication 激活点、失败回滚、密钥销毁、重认证换钥。认证结束、显式/隐式去认证、channel 销毁时必须销毁会话密钥；日志不得输出 SKI 明文或密钥材料。`DERIVED`

## 5. 字段级 Wire Contract

### 5.1 编码通则

- 所有 `lengthOf...` 均为 2 字节 unsigned，MSB-first；长度值只覆盖紧随其后的 payload。`ISO-NORM`
- 长度为 `0000` 的条件字段不出现；报文不得附带尾随字节。`ISO-NORM`
- `algorithmIndicator` 恰为 16 字节：BER 编码 OID 左对齐，剩余字节右填 `00`。应拒绝 BER 非法、OID 超出 16 字节、非零垃圾 padding 或未配置 OID。`ISO-NORM` + `DERIVED`
- 表中 `m/n/o` 是运行时长度值；最大允许值还受 TP、PDU 与项目资源限额约束。项目上限不得改变 2 字节 wire 长度字段。

### 5.2 `0x05` 请求：requestChallengeForAuthentication

| 偏移（0-based） | 长度 | 字段 | 约束 |
|---|---:|---|---|
| 0 | 1 | SID | `29` |
| 1 | 1 | SubFunction | bit 6..0=`05`；bit 7=SPRMIB |
| 2 | 1 | `communicationConfiguration` | `00`–`FF`；有效值由 OEM profile 冻结 |
| 3..18 | 16 | `algorithmIndicator` | BER OID + 右侧 `00` padding |

总 A_Data 长度固定 **19 字节**。`ISO-NORM`，ISO §10.6.5 Table 70。任何缺字节/多字节均为 `0x13`。

### 5.3 `0x05` 正响应

| 偏移 | 长度 | 字段 | 约束 |
|---|---:|---|---|
| 0 | 1 | Response SID | `69` |
| 1 | 1 | echoed SF | `05` |
| 2 | 1 | `returnValue` | 成功接受通常为 `00` |
| 3..18 | 16 | `algorithmIndicator` | 必须等于请求 AI |
| 19..20 | 2 | `lengthOfChallengeServer` | `m`，MSB-first |
| 21..20+m | m | `challengeServer` | Mandatory；项目 profile 冻结 `m>0` |
| 21+m..22+m | 2 | `lengthOfNeededAdditionalParameter` | `n`，MSB-first |
| 23+m..22+m+n | n | `neededAdditionalParameter` | `n=0` 时不出现 |

总长度为 **23 + m + n 字节**。`ISO-NORM`，ISO §10.6.6 Table 81。虽然 ISO 表把 challenge 标为 mandatory，具体最小/最大长度仍需项目与 PDF 联调向量冻结。

### 5.4 `0x06` 请求：verifyProofOfOwnershipUnidirectional

| 偏移 | 长度 | 字段 | 约束 |
|---|---:|---|---|
| 0 | 1 | SID | `29` |
| 1 | 1 | SubFunction | bit 6..0=`06`；bit 7=SPRMIB |
| 2..17 | 16 | `algorithmIndicator` | 必须逐字节等于前序 05 AI |
| 18..19 | 2 | `lengthOfProofOfOwnershipClient` | `m`，MSB-first |
| 20..19+m | m | `proofOfOwnershipClient` | Mandatory；项目 profile 要求 `m>0` |
| 20+m..21+m | 2 | `lengthOfChallengeClient` | `n`，MSB-first |
| 22+m..21+m+n | n | `challengeClient` | `n=0` 时不出现 |
| 22+m+n..23+m+n | 2 | `lengthOfAdditionalParameter` | `o`，MSB-first |
| 24+m+n..23+m+n+o | o | `additionalParameter` | `o=0` 时不出现 |

总长度为 **24 + m + n + o 字节**。`ISO-NORM`，ISO §10.6.5 Table 71。解析器必须用检查过的整数加法防止 length overflow、截断和尾随数据。

### 5.5 `0x06` 正响应

| 偏移 | 长度 | 字段 | 约束 |
|---|---:|---|---|
| 0 | 1 | Response SID | `69` |
| 1 | 1 | echoed SF | `06` |
| 2 | 1 | `returnValue` | 认证完成为 `12` |
| 3..18 | 16 | `algorithmIndicator` | 等于本序列 05/06 AI |
| 19..20 | 2 | `lengthOfSessionKeyInfo` | `m`，MSB-first |
| 21..20+m | m | `sessionKeyInfo` | `m=0` 时不出现 |

总长度为 **21 + m 字节**。`ISO-NORM`，ISO §10.6.6 Table 82。若 COCO 指示“不建立会话密钥”，应返回 `LOSKI=0000`；若指示建立密钥，SKI 是否可为零及失败映射必须由 OEM profile/PDF 联调确认。

### 5.6 负响应与 RV 边界

- 负响应固定 `7F 29 NRC`，用于 UDS 请求处理/条件/序列/密码与资源失败。
- `returnValue` 只存在于 `0x69` 正响应语法，描述认证过程结果。按子功能区分：`0x05` 接受请求通常为 `00=RequestAccepted`；`0x06` 完成认证为 `12=OwnershipVerifiedAuthenticationComplete`；`0x00` 去认证成功为 `10=DeAuthenticationSuccessful`；`0x03/0x04` **仅用于 `0x08 authenticationConfiguration`** 宣告 ACR 非对称/对称能力。
- ISO B.5 允许 OEM/供应商专用 RV。不得同时对同一 final 结果发送正响应 RV 和负响应 NRC。
- ISO 示例 #5 同时展示“可用 OEM RV `0x21`”的说明和实际 NRC `0x51` 报文；项目必须二选一并冻结。推荐量产失败统一走 NRC，避免把 `0x69` 误判为认证成功。`PROJECT-DECISION`

## 6. 状态机、隔离与生命周期

### 6.1 每 client/channel 状态

```text
IDLE
  -- valid 05 / issue challenge --> CHALLENGE_ISSUED
CHALLENGE_ISSUED
  -- replacement 05 --> CHALLENGE_ISSUED(new generation; old consumed)
  -- valid 06 --> VERIFYING(old challenge atomically reserved)
  -- expiry/cancel/channel close --> IDLE
VERIFYING
  -- success + auth commit --> AUTHENTICATED / no reusable transaction
  -- final failure/cancel --> IDLE / no reusable transaction
AUTHENTICATED
  -- new 05 --> REAUTH_IN_PROGRESS while old authorization remains active
  -- successful 06 --> AUTHENTICATED(new authorization replaces old)
  -- failed 06 --> AUTHENTICATED(old authorization remains)
  -- 00/timeout/mileage/channel teardown --> DEAUTHENTICATED
```

ISO §10.6.4 要求已认证客户端再次发起认证时，在新认证成功前保持原已认证状态；成功后以新认证信息更新。失败重认证不得清旧授权。`ISO-NORM`

### 6.2 隔离键与事务数据

事务键至少包含：Diagnostic Server instance、protocol/channel identity、Diagnostic Client identity/source address；若系统存在远端地址扩展，还应包含能唯一识别连接的 A_AE/globalChannelId。`DERIVED`

事务保存：generation、AI、COCO、challenge、neededAdditionalParameter、issue/expiry monotonic time、attempt count、crypto mode/profile、cancellation token、旧认证快照引用。禁止仅以 source address 全局索引，避免跨 DoIP connection 串扰。

[SWS_DM_01229] 要求一个 Diagnostic Client 的认证状态不得影响其他 Diagnostic Connection。Role、DAL、challenge、timer、session key、日志 correlation 均适用该隔离原则。`AUTOSAR-NORM`/`DERIVED`

### 6.3 challenge 与防重放

- challenge 使用 CSPRNG，熵/长度由 crypto profile 冻结；
- challenge 仅对一个 client/channel、一个 AI/COCO、一个 generation 有效；
- 新 `0x05` 原子替换旧 challenge；旧 `0x06` 必须失败；
- `0x06` 进入验证前用 CAS/锁将 challenge 从 issued 改为 verifying，阻止双提交；
- final 成功、final 失败、取消、超时、连接断开后擦除 challenge；
- 缓存最近已消费 challenge digest 或 transaction nonce，在风险窗口内检测跨线程/重连重放；digest 不可还原秘密；
- 重放失败不得改变当前有效认证状态。

以上为 `DERIVED`，用于实现 ISO freshness 与单次 challenge 语义。

### 6.4 去认证与隐式退出

ISO §10.6.4：

- 显式 `0x00 deAuthenticate` 必须支持；
- 至少实现一种隐式退出：认证超时或里程偏移上限；
- 同一诊断协议经 TP 收到的每条请求至少应保持认证状态活跃并重置超时；
- 会话密钥最长有效到 authenticated session 结束。

AUTOSAR 可复用行为：

- S3 timeout 使对应 client 去认证：[SWS_DM_01211]；
- `authenticationTimeout` 行为见 [SWS_DM_01210]；
- 从 authenticated 到 deauthenticated 时恢复 default Role 并清 DAL：[SWS_DM_01212]；
- 初始 DAL 为空：[SWS_DM_01214]；
- Handle `Revoke()`/`Refresh()` 见 [SWS_DM_01216]、[SWS_DM_01217]。

里程退出不是 AUTOSAR AP DM R25-11 已标准化接口；里程源、可信度、阈值、回退及持久化均为 `PROJECT-DECISION`。任一退出路径都必须取消在途 ACR、销毁 session key 并产生审计记录。`DERIVED`

## 7. NRC 决策、来源与优先级

### 7.1 服务特定 NRC

| NRC | 含义/适用 | 来源 |
|---|---|---|
| `0x12` | SF 不支持/未配置 | ISO §10.6.7；[SWS_DM_00100] |
| `0x13` | 长度、格式、BER/padding 或 length sum 不合法 | ISO §10.6.7；[SWS_DM_00098] |
| `0x22` | Authentication 请求准则/运行条件不满足 | ISO §10.6.7；AUTOSAR 环境条件基线 |
| `0x24` | 无成功 `0x05` 就发 `0x06`；过期/替换/已消费 transaction 按项目 sequence profile | ISO §10.6.7 |
| `0x50` | certificate verification failed — invalid time period | ISO Annex A；主要为 APCE，ACR token 若使用证书需 profile |
| `0x51` | certificate verification failed — invalid signature | ISO Annex A；示例 #5 使用 |
| `0x52` | invalid chain of trust | ISO Annex A；APCE/证书型 token |
| `0x53` | invalid type | ISO Annex A |
| `0x54` | invalid format | ISO Annex A |
| `0x55` | invalid content | ISO Annex A |
| `0x56` | invalid scope | ISO Annex A |
| `0x57` | certificate verification failed — certificate revoked | ISO Annex A；量产前须按 PDF Annex A 核对精确英文 mnemonic |
| `0x58` | ownership verification failed | ISO Annex A；对称示例 #7 使用 |
| `0x59` | challenge calculation failed | ISO Annex A |
| `0x5A` | setting access rights failed | ISO Annex A |
| `0x5B` | session key creation/derivation failed | ISO Annex A |
| `0x5C` | configuration data usage failed | ISO Annex A |
| `0x5D` | deAuthentication failed | ISO Annex A |

**PDF 联调门禁**：`0x50–0x5D` 的精确名称、适用分支与 mnemonic 必须在实现冻结时逐项回查授权 PDF Annex A；本文不以 MinerU 结果代替该审查。

### 7.2 通用/项目常见 NRC

| NRC | 使用边界 |
|---|---|
| `0x10` | generalReject；可替代详细 `0x50–0x5D`，也用于 response-pending 达上限 |
| `0x21` | busyRepeatRequest；资源/并发策略允许客户端稍后重试时，不能代替 sequence error |
| `0x31` | requestOutOfRange；算法 OID/profile/参数值不支持时是否用 31 或 22 必须冻结 |
| `0x34` | authenticationRequired；受保护服务 Role/DAL 均失败，[SWS_DM_01225]；按 ISO Figure 6 该检查**先于** `0x33`，双门同时失败时唯一 NRC 为 `0x34` |
| `0x78` | requestCorrectlyReceivedResponsePending；仅 interim，不是 final |

### 7.3 决策顺序

通用段的顺序由 ISO §8.7.3.1 Figure 6 强制规定（详见 §3.2），不可由实现调整：

1. 最小长度 → `0x13`；
2. SF 支持性 → `0x12`；
3. **认证门（Role → DAL）→ `0x34`**；
4. SF 在当前 session 是否支持 → `0x7E`；
5. SF SecurityLevel 门 → `0x33`；
6. 通用 request sequence → `0x24`；
7. manufacturer/supplier 检查。

ACR 专属段（Figure 6 的 "Specific SID checks" 之后）：

8. ACR transaction sequence；无有效前序 05 的 06 为 `0x24`。
9. AI/profile/资源检查；项目冻结 `0x22/0x31/0x21` 的边界。
10. crypto、rights、session key；用冻结的 `0x50–0x5D` 或 `0x10`。
11. 异步处理中可发 `0x78`；超过上限 final `0x10`。

**双重失败的裁决**：通用段内的双重失败按 Figure 6 的位次决定，`0x34` 优先于 `0x33`，`0x33` 优先于 `0x24`——这是 `ISO-NORM`，不是 OEM 可选项。ACR 专属段（第 8–10 步）内部的分支优先级按 ISO §10.6.7、Figure 11 与冻结的 OEM 表裁决。任一层的唯一 NRC 都不得由线程完成先后决定。NRC 与 RV 映射表应是单一配置源。

## 8. 对外接口与项目扩展边界

### 8.1 标准 wire contract

外部互操作接口就是第 5 章的 UDS `0x29` A_Data。网络层不得暴露内部 key handle、Role object、HSM error 或异常堆栈。

### 8.2 可复用 AUTOSAR 状态授权 API

项目可复用下列标准状态授权能力，且只能按 R25-11 含义使用；“ACR 必须使用这些 API”本身不是 AUTOSAR SHALL：

- `ara::diag::ExternalAuthentication::Get(metaInfo/address)` 定位客户端；
- `ara::diag::ClientAuthentication::Authenticate(roles)` 提交状态和 Role；
- `GetState()`、`SetNotifier()`；
- `ClientAuthenticationHandle::Set/Append/Revoke/Refresh()` 管理 DAL/生命周期；
- `DiagnosticServiceDynamicAccessList` Builder 构建 DAL。

相关依据：[SWS_DM_01191]–[SWS_DM_01201]、[SWS_DM_01132]–[SWS_DM_01155]、[SWS_DM_01206]、[SWS_DM_01218]–[SWS_DM_01225]。

### 8.3 ACR 专属逻辑接口需求（非 AUTOSAR API）

本节分三层：§8.3.1 描述**必须存在的能力**（不绑定语言）；§8.3.2 给出**参考 C++ 接口设计**，其形状严格模仿 APCE 的 DM↔应用分工；§8.3.3 说明该设计的规范依据与偏离点。

**全节前提**：[SWS_DM_01226] 的子功能白名单不含 `0x05`/`0x06`，且其 Note 明确 "Authentication with challenge-response (ACR) is currently out of scope of the Diagnostic Manager"。因此本节所有类名、方法名与命名空间均为**项目工程构件**，不得声称为 `ara::diag` 标准 API。`AUTOSAR-NORM`（排除性）

#### 8.3.1 逻辑能力

以下仅描述能力，不冻结 C++ ABI：

```text
RequestChallenge(context, communicationConfiguration, algorithmIndicator, cancel)
  -> {returnValue, algorithmIndicator, challengeServer, neededAdditionalParameter, transactionToken}

VerifyUnidirectional(context, transactionToken, algorithmIndicator,
                     proofOfOwnershipClient, challengeClient, additionalParameter, cancel)
  -> {returnValue, roles, optionalDal, sessionKeyInfo, keyHandle}

Abort(context, transactionToken, reason)
Deauthenticate(context, reason)
```

逻辑约束：

- `context` 能唯一定位 client/channel，不能长期保存借用引用；
- 输入 buffer 生命周期、ownership、最大长度和异步取消必须冻结；
- `transactionToken` 不上 wire，只用于防串序；
- crypto 返回值与 UDS NRC/RV 分层；应用错误不得直接泄露；
- `roles/optionalDal/keyHandle` 只在原子提交阶段生效；
- 同一逻辑接口是否并发、StopOffer/关闭时的晚到结果处置必须冻结。

> **上表中 `returnValue` 与 `roles` 的归属需按 §8.3.3 收窄**：`returnValue`（RV）由 DM 层填充，不应作为回调返回值；`roles`/`optionalDal` 建议不经回调返回，而由应用直接注入标准状态通路。上表保留它们只表示"这些信息必须在某处产生"。

#### 8.3.2 参考 C++ 接口设计

```cpp
// 项目命名空间——不是 AUTOSAR 标准 API（见 §8.3 前提）
namespace myoem::diag {

class ChallengeResponseAuthentication {
public:
  // ISO 14229-1:2020 Table 70/71：AI 恰为 16 字节。
  // 用 std::array 而非 Span，在类型层面表达固定长度约束。
  static constexpr std::size_t kAlgorithmIndicatorSize = 16U;
  using AlgorithmIndicator = std::array<ara::core::Byte, kAlgorithmIndicatorSize>;

  // 显式客户端标识：对应 [SWS_DM_00421] 的 (sourceAddr, globalChannelId) 元组。
  // 相对 APCE 的有意偏离，理由见 §8.3.3。
  struct ClientContext {
    std::uint16_t sourceAddress;
    std::uint32_t globalChannelId;
  };

  // 0x05 的业务返回：只含数据。长度前缀（LOCHSE/LONAP）与 RV 由 DM 层填充。
  struct ChallengeResult {
    ara::core::Vector<ara::core::Byte> challengeServer;            // Mandatory，ISO Table 81
    ara::core::Vector<ara::core::Byte> neededAdditionalParameter;  // 空 => 响应 LONAP = 0x0000
  };

  // ---- 构造与特殊成员：照搬 APCE 约束（对应 [SWS_DM_01124]、[SWS_DM_01607]–[SWS_DM_01610]）----
  explicit ChallengeResponseAuthentication(
      const ara::core::InstanceSpecifier& specifier,
      ara::diag::ConcurrencyType concurrencyType) noexcept;

  ChallengeResponseAuthentication(ChallengeResponseAuthentication&&) noexcept = delete;
  ChallengeResponseAuthentication(ChallengeResponseAuthentication&)           = delete;
  ChallengeResponseAuthentication& operator=(ChallengeResponseAuthentication&&) = delete;
  ChallengeResponseAuthentication& operator=(ChallengeResponseAuthentication&)  = delete;
  virtual ~ChallengeResponseAuthentication() noexcept;

  // 未 Offer / 已 StopOffer 时 DM 应答 0x94（对应 [SWS_DM_01257] 的等价行为）
  ara::core::Result<void> Offer() noexcept;
  void StopOffer() noexcept;

  // ---- 0x05 requestChallengeForAuthentication ----
  // 失败：Promise::SetError(DiagUdsNrcErrc)，由 DM 转为 NRC（对应 [SWS_DM_01231] 的等价行为）
  virtual ara::core::Future<ChallengeResult>
  RequestChallengeForAuthentication(
      ara::core::Byte communicationConfiguration,
      const AlgorithmIndicator& algorithmIndicator,
      const ClientContext& clientContext,
      const ara::diag::MetaInfo& metaInfo,
      ara::diag::CancellationHandler cancellationHandler) noexcept = 0;

  // ---- 0x06 verifyProofOfOwnershipUnidirectional ----
  // 返回 sessionKeyInfo；COCO 指示不建立会话密钥时返回空 vector（=> LOSKI = 0x0000）
  // 不返回 roles：授权注入走 ExternalAuthentication 标准通路（见 §8.2、§8.3.3）
  virtual ara::core::Future<ara::core::Vector<ara::core::Byte>>
  VerifyProofOfOwnershipUnidirectional(
      const AlgorithmIndicator& algorithmIndicator,
      ara::core::Span<const ara::core::Byte> proofOfOwnershipClient,
      ara::core::Span<const ara::core::Byte> challengeClient,      // 可为空 Span
      ara::core::Span<const ara::core::Byte> additionalParameter,  // 可为空 Span
      const ClientContext& clientContext,
      const ara::diag::MetaInfo& metaInfo,
      ara::diag::CancellationHandler cancellationHandler) noexcept = 0;
};

}  // namespace myoem::diag
```

实现约束与 APCE 逐条对齐（`DERIVED`，来源见 §8.3.3）：

| 约束 | 内容 |
|---|---|
| 缓冲区生命周期 | 所有 `Span` 入参仅在 Promise 完成或被 `cancellationHandler` 取消前有效；**异步处理必须先拷贝** |
| 线程安全 | 由构造时的 `ConcurrencyType` 决定；传 `kConcurrent` 则实现必须自带同步 |
| 可重入 | 不同客户端的请求可并发进入同一回调 |
| 错误返回 | 只用 `DiagUdsNrcErrc`；密码库内部错误、异常文本、密钥状态不得外泄 |
| 单实例 | 拷贝/移动构造与赋值全部 `delete` |
| 序列状态 | **由应用维护**（challenge 生命周期、`0x05`→`0x06` 绑定、AI 一致性），DM 不跟踪 |

#### 8.3.3 设计依据与偏离点

**照搬 APCE 的四条分工先例**（均来自 [SWS_DM_01233] 及其上下文，`AUTOSAR-REF`）：

1. **长度前缀由 DM 派生**——原文 "The field lengthOfChallengeServer (LOCHSE) ... shall be derived by the Diagnostic Server instance from the returned Challenge and filled in the positive response"。故回调只返回数据，不返回长度。
2. **RV 由 DM 设置**——原文 "shall set the parameter authenticationReturnParameter (RV) to 0x11"。故 `0x05`/`0x06` 的 RV（`0x00`/`0x12`）由 DM 层填，回调不返回 RV。
3. **应用错误码由 DM 转译**——[SWS_DM_01231]：应用返回错误码，DM 发送对应 NRC 的负响应。
4. **DM 不维护序列状态**——[SWS_DM_01233] 后的说明："The Diagnostic Server instance shall treat each verifyCertificateUnidirectional sub function request **individually and shall not keep track of previously received** ... requests"。ACR 的 transaction 状态因此落在应用侧（本文 §6、M04）。

**一处有意偏离：显式 `ClientContext` 参数。** APCE 的回调只传 `const MetaInfo&`。但 ACR 的 challenge 必须严格绑定发起方（§6.2、§6.3），应用维护的 transaction 表需要 [SWS_DM_00421] 的 `(sourceAddr, globalChannelId)` 二元组作键；而 `ara::diag::MetaInfo` 只提供 `GetContext()` 与 `GetValue(StringView key) -> Optional<StringView>`，**R25-11 未在任何需求体中标准化 key 名称**，应用无法以标准方式取出该二元组。三个备选中，依赖供应商私有 key 不可移植，用 `ClientAuthentication` 实例当身份代理受地址段粒度限制（见配套参考文档 §3.3），因此选择在项目自定义签名中显式传入。由于 ACR 报文处理本就需要供应商 DM 扩展点（`GAP-DM-01`），让该扩展点传出其内部已有的 `globalChannelId` 是合理要求。`DERIVED` + `PROJECT-DECISION`

**两项不属于本接口的能力**：

- `0x08 authenticationConfiguration` 的 RV（ACR 为 `0x03`/`0x04`）是 DM 行为而非回调；[SWS_DM_01246] 把 APCE 的 RV **硬编码为 `0x02`**，共存规则只能在 DM 扩展层用配置或扩展点解决（`GAP-DM-02`、ACR29-PD-07 关联项）。
- `0x00 deAuthenticate` 已由 DM 处理（[SWS_DM_01244]、[SWS_DM_01245]），**不需要 ACR 专属 `Abort`/`Deauthenticate` 回调**。ACR 侧的 transaction 清理与会话密钥销毁可通过 `ClientAuthentication::SetNotifier`（[SWS_DM_01208]）监听状态转为 `kDeAuthenticated` 来触发，该通知同时覆盖显式去认证、`authenticationTimeout`（[SWS_DM_01210]）与 S3 超时（[SWS_DM_01211]）三种来源。这是纯标准复用点，优于自定义回调。`AUTOSAR-REF`

配置/API 未决项及建议 schema 见配套缺口文档：[AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md](./AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md)。认证状态管理机制、`MetaInfo` 能力与 `ara::diag` 认证类的完整 C++ 约束见 [认证状态管理与 API 约束参考](./AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md)。在项目决策冻结前，任何具体类名、manifest 元类或 callback 签名都不得标为标准。

## 9. 配置、安全、日志与流程

### 9.1 配置维度

- 服务：05/06 enable、允许寻址方式、session、SecurityLevel、P2/P2*、78 上限；
- client/channel：identity key、最大并发 transaction、重试/锁定；
- 算法：OID、模式（asymmetric/symmetric）、参数、允许 keyId、最小安全强度；
- challenge：长度、熵、TTL、替换、replay cache 窗口；
- POWN：最大长度、token/MAC canonicalization、必需 challengeClient/AP；
- 授权：rights/roles 映射、未知 Role、DAL 策略、重认证替换；
- 会话密钥：COCO 值、KDF、SKI、激活点、销毁；
- 生命周期：authentication timeout、S3、mileage delta、channel teardown；
- NRC/RV：详细/通用错误策略、OEM RV、限流响应；
- 日志/IdsM：事件 enable、rate limit、context、脱敏和保留期。

### 9.2 安全要求

- CSPRNG、approved algorithms、HSM-backed key、constant-time compare；
- 所有变长输入先做上限和 checked arithmetic，再分配/解析；
- 认证成功、Role/DAL 和 key activation 是单一原子事务；失败回滚；
- 权限映射默认拒绝；未知/空 Role 不自动获得访问；
- 防 online guessing：per-client 和全局限流、指数退避/锁定由项目冻结；
- 日志不含私钥、PSK、原始 POWN、challenge 全值、session key/SKI 敏感内容；
- 生产禁止测试 key、弱算法、全零 challenge、固定 RNG seed；
- 时间/里程源失效时采用 fail-safe 策略并可审计。

### 9.3 日志与 SecurityEvent

- AUTOSAR 对 APCE `0x03` 成功规定 event 104、任一 0x29 负响应规定 event 105、受保护服务 `0x34` 规定 event 101：[SWS_DM_02017]、[SWS_DM_02018]、[SWS_DM_02023]–[SWS_DM_02026]。
- 因 R25-11 不含 ACR 05/06，event 104 对 ACR 成功的直接适用是 `PROJECT-DECISION`；推荐以项目扩展事件记录 ACR 成功，同时保留 AUTOSAR schema 兼容层，不伪称 [SWS_DM_02023] 覆盖 06。
- 若 05/06 作为项目 0x29 扩展产生负响应，推荐复用 event 105 语义；是否满足供应商 IdsM 接口契约需冻结。
- 审计字段：monotonic timestamp、client/channel pseudonymous ID、SF、AI profile ID、generation、result class/NRC/RV、latency、retry count、Role-set digest、key handle ID（非 key）、退出原因、correlation ID。

### 9.4 正常与异常流程摘要

| 流程 | 关键结果 |
|---|---|
| 非对称成功 | 05 challenge → 签名 token → 06 校验 → 新 Role/密钥原子提交 → RV 12 |
| 对称成功 | 05 challenge → MAC/签名 → 06 恒定时间校验 → 提交 → RV 12 |
| POWN 失败 | final NRC（例 51/58）；challenge consumed；旧认证保持 |
| 顺序错/重放 | 24；不进 crypto 或不重复提交；当前授权不变 |
| AI 不一致 | 冻结为 24/22/31 之一；必须在 crypto 前拒绝 |
| 长度错 | 13；不创建/消费 transaction，不调用 crypto |
| timeout/cancel | 无晚到 final/提交；challenge 和临时 key 销毁 |
| 未认证访问 34 | `7F 34 34`；报告/记录认证不足 |

## 10. ACR29 需求 Catalog

验证方法缩写：`I` 检查、`T` 测试、`A` 分析、`R` PDF/设计评审。

### 10.1 公共处理（10）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-GEN-001 | 支持请求 29、正响应 69、负响应 7F 29 NRC | ISO §10.6；ISO-NORM | T |
| ACR29-GEN-002 | 正确解析 SPRMIB；只抑制肯定响应 | ISO §8.7；ISO-NORM | T |
| ACR29-GEN-003 | 物理/功能寻址响应遵循 ISO 通用矩阵 | ISO §7.4/§8.7；ISO-NORM | T/R |
| ACR29-GEN-004 | ACR callback 仅在公共校验全部通过后调用 | [SWS_DM_00096]；AUTOSAR-NORM | T |
| ACR29-GEN-005 | 长度/格式错误返回 13 | [SWS_DM_00098]；AUTOSAR-NORM | T |
| ACR29-GEN-006 | 未支持 05/06 返回 12 或按功能寻址规则抑制 | ISO §10.6.7；[SWS_DM_00100]；ISO-NORM/AUTOSAR-NORM | T |
| ACR29-GEN-007 | P2/P2*/78/上限 10 由 DM 统一管理 | [SWS_DM_00368]、[SWS_DM_00369]；AUTOSAR-NORM | T |
| ACR29-GEN-008 | 一个请求至多一个 final response | ISO §8；ISO-NORM | T |
| ACR29-GEN-009 | 取消/关闭后晚到结果不得提交或响应 | DERIVED | T/A |
| ACR29-GEN-010 | 认证、session、SecurityLevel 三个状态轴解耦 | ISO §10.6.4；[SWS_DM_01223]–[SWS_DM_01225] | T |

### 10.2 Wire contract（12）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-WIRE-001 | 05 请求固定 19 字节 | ISO Table 70；ISO-NORM | T |
| ACR29-WIRE-002 | 05 COCO 为 1 字节且按 profile 校验 | ISO Table 70；ISO-NORM/PROJECT | T |
| ACR29-WIRE-003 | AI 固定 16 字节 BER OID、左对齐右零填充 | ISO Tables 70/75；ISO-NORM | T/R |
| ACR29-WIRE-004 | 05 响应按 Table 81 编码 challenge/NAP | ISO Table 81；ISO-NORM | T |
| ACR29-WIRE-005 | 所有长度字段 2 字节 MSB-first | ISO Tables 71/81/82；ISO-NORM | T |
| ACR29-WIRE-006 | 06 请求按 m/n/o 精确解析且无尾随字节 | ISO Table 71；ISO-NORM | T |
| ACR29-WIRE-007 | 零长度 CHCL/AP/SKI 不携带 payload | ISO Tables 71/82；ISO-NORM | T |
| ACR29-WIRE-008 | 06 AI 与前序 05 逐字节相等 | ISO Tables 71/82；ISO-NORM | T |
| ACR29-WIRE-009 | 06 成功响应 RV=12 | ISO B.5/Table 82；ISO-NORM | T |
| ACR29-WIRE-010 | 06 成功响应 LOSKI/SKI 与 COCO/profile 一致 | ISO Table 82；ISO-NORM/PROJECT | T |
| ACR29-WIRE-011 | checked arithmetic 防溢出/越界分配 | DERIVED | T/A |
| ACR29-WIRE-012 | 联调 golden vector 逐字节回查 ISO PDF | PROJECT-DECISION | R/T |

### 10.3 状态与并发（10）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-STATE-001 | transaction 按 client/channel 隔离 | [SWS_DM_01229]；AUTOSAR-NORM/DERIVED | T |
| ACR29-STATE-002 | challenge 单次使用 | DERIVED | T |
| ACR29-STATE-003 | challenge 有 TTL，过期后 06 不成功 | DERIVED/PROJECT | T |
| ACR29-STATE-004 | 新 05 原子替换同 client 旧 challenge | DERIVED | T |
| ACR29-STATE-005 | 并发两个 06 最多一个进入提交 | DERIVED | T |
| ACR29-STATE-006 | 重认证成功以新授权替换旧授权 | ISO §10.6.4；ISO-NORM | T |
| ACR29-STATE-007 | 重认证失败保持旧认证/授权 | ISO §10.6.4；ISO-NORM | T |
| ACR29-STATE-008 | 00、超时、里程、channel teardown 清 transaction/key | ISO §10.6.4；DERIVED | T |
| ACR29-STATE-009 | 去认证恢复 default Role 并清 DAL | [SWS_DM_01212]；AUTOSAR-NORM | T |
| ACR29-STATE-010 | 不同客户端可并发且互不串 challenge/Role/key | [SWS_DM_01229]；AUTOSAR-NORM | T |

### 10.4 安全与密码（8）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-SEC-001 | challenge 来自 approved CSPRNG | DERIVED/PROJECT | A/T |
| ACR29-SEC-002 | 非对称 POWN 绑定 challenge、身份、权限与用途 | ISO §10.6.3；ISO-NORM/PROJECT | R/T |
| ACR29-SEC-003 | 对称 POWN 输入与 canonicalization 字节级冻结 | ISO §10.6.3；PROJECT | R/T |
| ACR29-SEC-004 | MAC 比较恒定时间，key 在 HSM/受控边界 | DERIVED | A/I |
| ACR29-SEC-005 | rights/roles 映射默认拒绝 | DERIVED | T |
| ACR29-SEC-006 | 认证状态/Role/key 原子提交，失败回滚 | DERIVED | T/A |
| ACR29-SEC-007 | session key 不超过 authenticated session 生命周期 | ISO §10.6.3；ISO-NORM | T |
| ACR29-SEC-008 | 限流/失败尝试策略已冻结且不跨 client 误锁 | ISO NOTE/OEM；PROJECT | T |

### 10.5 接口与授权（8）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-API-001 | 05/06 仅作为项目逻辑接口，不声明 AUTOSAR API | [SWS_DM_01226]；AUTOSAR-NORM | I/R |
| ACR29-API-002 | 用 ExternalAuthentication 定位正确客户端 | [SWS_DM_01191]–[SWS_DM_01201] | T |
| ACR29-API-003 | 项目选择复用标准状态通路时，ACR 成功后调用 Authenticate(newRoles) | [SWS_DM_01206] 定义调用效果；DERIVED/PROJECT | T |
| ACR29-API-004 | Role 失败后检查 DAL，均失败为 34 | [SWS_DM_01223]–[SWS_DM_01225] | T |
| ACR29-API-005 | 受保护 SID 34 未授权时返回 7F 34 34 | [SWS_DM_01225]；AUTOSAR-NORM | T |
| ACR29-API-006 | callback buffer ownership/取消/并发 ABI 冻结；参考设计与分工约束见 §8.3.2，仍须冻结供应商扩展点契约（含 `globalChannelId` 的传出方式） | PROJECT-DECISION | R/T |
| ACR29-API-007 | NRC、RV、crypto error 三层映射单一来源 | DERIVED/PROJECT | I/T |
| ACR29-API-008 | 遵守 APCE 分工先例：长度前缀与 RV 由 DM 层填充、应用错误以 `DiagUdsNrcErrc` 返回、序列状态（challenge 生命周期与 AI 一致性）由应用维护 | [SWS_DM_01233]、[SWS_DM_01231]；AUTOSAR-REF/DERIVED | I/R/T |

### 10.6 配置与可观测性（12）

| ID | 要求 | 来源/等级 | 验证 |
|---|---|---|---|
| ACR29-CFG-001 | 配置 05/06、寻址、session/security 与 timing | PROJECT-DECISION | I/T |
| ACR29-CFG-002 | 配置 OID/profile/keyId 与安全强度 | PROJECT-DECISION | I/T |
| ACR29-CFG-003 | 配置 challenge/POWN/AP/SKI 上限与 TTL | PROJECT-DECISION | I/T |
| ACR29-CFG-004 | 配置 rights→Role/DAL 映射并检查引用 | PROJECT-DECISION | I/T |
| ACR29-CFG-005 | 配置 timeout/mileage/退出与 key erase | ISO §10.6.4；PROJECT | I/T |
| ACR29-CFG-006 | 配置 NRC/RV 详细错误策略（仅 ACR 专属段；通用段顺序由 ISO Figure 6 固定） | ISO §10.6.7/B.5；PROJECT | R/T |
| ACR29-CFG-007 | 不得为 `0x29` 任一子功能（含 ACR `0x05/0x06`）配置 `authenticationEnabled`；如需前置保护只用 session / `0x27` / 环境条件 | `constr_10038`；AUTOSAR-NORM | I/T |
| ACR29-OBS-001 | 成功、失败、退出均有 correlation 审计 | DERIVED | T |
| ACR29-OBS-002 | 日志不含 key、原始 POWN、完整 challenge/SKI | DERIVED | I/T |
| ACR29-OBS-003 | 负响应/event 105 复用策略已冻结 | [SWS_DM_02025]、[SWS_DM_02026]；PROJECT | R/T |
| ACR29-OBS-004 | 受保护服务 34 报告 event 101 | [SWS_DM_02017]、[SWS_DM_02018] | T |
| ACR29-OBS-005 | ACR 成功事件不得冒充 AUTOSAR 03 event 104 SHALL | [SWS_DM_02023]、[SWS_DM_02024]；PROJECT | I/R |

**Catalog 合计：60 条需求。**

## 11. 验收测试矩阵

每项记录 wire bytes、client/channel、session、SecurityLevel、旧/新 Authentication State、Role、DAL、transaction generation、NRC/RV、callback 次数、日志/SecurityEvent。所有 PROJECT-DECISION 未冻结的断言标记 `BLOCKED`。

### 11.1 协议与公共处理（8）

| TC | 场景 | 核心断言 |
|---|---|---|
| ACR29-TC-001 | 物理寻址 05，SPRMIB=0 | 69 05 正响应，字段/长度正确 |
| ACR29-TC-002 | 05，SPRMIB=1 | 处理成功但抑制 final positive；状态为 challenge issued |
| ACR29-TC-003 | SPRMIB=1 且失败 | 需要的 negative 仍发送 |
| ACR29-TC-004 | 功能寻址 05/06 | 按冻结策略和 ISO suppression matrix |
| ACR29-TC-005 | 未配置 05/06 | 12/功能寻址抑制；无 callback |
| ACR29-TC-006 | session/security/environment gate 失败 | 对应 NRC；无 challenge/crypto |
| ACR29-TC-007 | crypto 超 P2 后完成 | 78、P2*、唯一 final |
| ACR29-TC-008 | 超过 78 上限 | final 10；晚到结果不提交 |

### 11.2 Wire/格式（10）

| TC | 场景 | 核心断言 |
|---|---|---|
| ACR29-TC-009 | 05 恰 19 字节 | 接受 |
| ACR29-TC-010 | 05 18/20 字节 | 13；无 transaction |
| ACR29-TC-011 | 合法 16 字节 BER OID/padding | AI 原样回显 |
| ACR29-TC-012 | OID 非法/非零 padding/超长 | 冻结 NRC；无 crypto |
| ACR29-TC-013 | 06 m/n/o 均非零 | 偏移和 payload 逐字节正确 |
| ACR29-TC-014 | 06 n=o=0 | 不出现 CHCL/AP，长度正确 |
| ACR29-TC-015 | 长度前缀大于剩余数据 | 13 |
| ACR29-TC-016 | 长度前缀小于实际且有尾随字节 | 13 |
| ACR29-TC-017 | m/n/o 加法溢出/超项目上限 | 安全拒绝，无大分配/崩溃 |
| ACR29-TC-018 | AI 与前序 05 不一致 | crypto 前拒绝；challenge 按策略消费 |

### 11.3 非对称/对称和密钥（10）

| TC | 场景 | 核心断言 |
|---|---|---|
| ACR29-TC-019 | 非对称有效签名、无 SKI | RV12、LOSKI=0、新 Role 生效 |
| ACR29-TC-020 | 非对称错误签名 | 51/冻结 NRC；无新授权 |
| ACR29-TC-021 | 非对称 token challenge 不匹配 | 验证失败；无提交 |
| ACR29-TC-022 | 非对称 token rights 非法 | 55/5A/冻结 NRC；默认拒绝 |
| ACR29-TC-023 | 对称有效 POWN、无 SKI | RV12、恒定时间校验路径 |
| ACR29-TC-024 | 对称错误 key/POWN | 58；无新授权 |
| ACR29-TC-025 | 对称 additionalParameter 缺失/错误 | 冻结 NRC；无提交 |
| ACR29-TC-026 | 请求建立 session key 成功 | SKI 格式、key confirmation、激活点正确 |
| ACR29-TC-027 | KDF/session key 创建失败 | 5B/冻结 NRC；认证/授权/key 全回滚 |
| ACR29-TC-028 | 去认证/timeout 后使用旧 session key | key 已销毁，secure request 被拒 |

### 11.4 序列、并发、防重放（10）

| TC | 场景 | 核心断言 |
|---|---|---|
| ACR29-TC-029 | 无 05 直接 06 | 24 |
| ACR29-TC-030 | challenge 过期后 06 | 24/冻结 NRC；无 crypto success |
| ACR29-TC-031 | 05A、05B、06A | A 已替换，失败；B 仍按策略有效 |
| ACR29-TC-032 | 相同 06 重放 | 第一次至多成功一次，第二次 24/失败 |
| ACR29-TC-033 | 同 client 并发两个相同 06 | CAS 保证单提交 |
| ACR29-TC-034 | A/B client 交错 05/06 | challenge、AI、Role、key 不串扰 |
| ACR29-TC-035 | cancel during verify | 无 final positive、无提交、challenge consumed |
| ACR29-TC-036 | cancel 后 Future 晚完成 | 无第二响应、无状态变化 |
| ACR29-TC-037 | channel close/reconnect 后旧 06 | 旧 transaction 不可复用 |
| ACR29-TC-038 | 全局限流与 client 限流 | 21/冻结 NRC；无跨 client 误锁 |

### 11.5 生命周期、授权、日志（12）

| TC | 场景 | 核心断言 |
|---|---|---|
| ACR29-TC-039 | 已认证时重认证成功 | 旧授权保持至提交点，随后由新授权替换 |
| ACR29-TC-040 | 已认证时重认证失败 | 旧 Role/DAL/key 策略保持 |
| ACR29-TC-041 | 显式 00 | 去认证、default Role、DAL 清空、key/transaction 清除 |
| ACR29-TC-042 | inactivity/S3 timeout | 仅对应 client 去认证 |
| ACR29-TC-043 | mileage threshold | 去认证并记录可信里程退出原因 |
| ACR29-TC-044 | 未认证访问 SID 34 | `7F 34 34`，event 101 |
| ACR29-TC-045 | 已认证但 Role/DAL 不允许 SID 34 | 仍为 `7F 34 34` |
| ACR29-TC-046 | Role 或 DAL 允许 SID 34 | 通过 0x29 gate；仍独立检查 0x27 |
| ACR29-TC-047 | 05/06 失败日志 | correlation/NRC 正确，无秘密数据 |
| ACR29-TC-048 | ACR 成功日志/事件 | 项目事件与 event 104 边界清楚，不伪称 AUTOSAR 03 |
| ACR29-TC-049 | 认证门与 `0x27` 门**同时**失败访问受保护服务 | 唯一 NRC 为 `0x34`（ISO Figure 6 认证检查先行），不得返回 `0x33` |
| ACR29-TC-050 | 为 `0x29` 子功能配置 `authenticationEnabled` | 配置期被拒（`constr_10038`）；确认运行时不存在"认证才能认证"的死锁路径 |

**验收测试合计：50 项。**

## 12. 风险与项目待决项

### 12.1 待决项

| PD | 待冻结内容 | 阻塞测试 |
|---|---|---|
| ACR29-PD-01 | 功能寻址是否允许 05/06及拒绝响应 | 004 |
| ACR29-PD-02 | OID、算法参数、安全强度、key profile | 011–012、019–025 |
| ACR29-PD-03 | 非对称 token 与对称 MAC canonicalization | 019–025 |
| ACR29-PD-04 | COCO、KDF、SKI、key confirmation/激活点 | 026–028 |
| ACR29-PD-05 | rights/roles/DAL 映射与原子提交点 | 022、039–046 |
| ACR29-PD-06 | challenge 长度、TTL、替换与 replay cache | 030–033 |
| ACR29-PD-07 | ACR 专属段的 NRC 0x22/24/31、0x50–5D、RV 的映射与分支优先级（通用段顺序已由 ISO Figure 6 裁决，不在本项范围） | ACR 专属失败路径 |
| ACR29-PD-08 | callback ABI、buffer lifetime、并发、取消、shutdown。**参考设计已在 §8.3.2 给出**，待冻结项收窄为：供应商扩展点如何传出 `globalChannelId`、AI 一致性校验落在 DM 扩展层还是应用层、StopOffer/关闭时晚到结果的处置 | 007–008、033–038 |
| ACR29-PD-09 | 限流、失败次数、锁定与恢复 | 038 |
| ACR29-PD-10 | authentication timeout、里程源/阈值、失效策略 | 042–043 |
| ACR29-PD-11 | ACR SecurityEvent IDs/schema 与 AUTOSAR 104/105 复用 | 044、047–048 |
| ACR29-PD-12 | 量产 ISO PDF golden vectors 与供应商互操作基线 | 009–028 |

### 12.2 主要风险

| 风险 | 后果 | 控制 |
|---|---|---|
| 把 05/06 当 AUTOSAR API | 不可移植、合规错误 | API 命名空间隔离；trace 标 PROJECT |
| challenge 重用/跨客户端串扰 | 重放、越权 | per-channel transaction、generation、CAS、TTL |
| POWN 输入编码歧义 | 客户端/服务器不互通或签名绕过 | canonicalization golden vectors |
| 重认证非原子 | 短暂扩大/丢失权限 | old-auth-until-commit、事务回滚 |
| key/session 生命周期不一致 | 密钥超期、通信失锁 | 单一退出处理器、HSM erase 证明 |
| NRC/RV 双轨不一致 | 测试误判、信息泄露 | 单一映射表、量产错误粒度评审 |
| 功能寻址状态操作 | 响应风暴/身份歧义 | 默认 physical-only，配置期校验 |
| 日志泄密 | 凭据泄漏 | schema allowlist、自动敏感字段扫描 |
| MinerU 表格噪声 | wire 偏移错误 | PDF golden vector 门禁 |

## 13. 方法局限与交叉链接

### 13.1 方法局限

1. 权威结论来自两份 PDF；Markdown 只用于定位。本文未整段复制 ISO/AUTOSAR 版权原文。
2. ACR 字段表依据已在 2026-08-11 对 PDF Tables 70/71/81/82 校正的仓库译本；未在本文复制长 POWN 向量。量产互操作必须再次以授权 PDF 和 OEM profile 做逐字节确认。
3. ISO 规定框架但把 token、算法参数、rights/roles、COCO/SKI、失败尝试等留给制造商；本文以 `PROJECT-DECISION` 明示。
4. AUTOSAR R25-11 没有 ACR callback/DEXT 子类；复用其状态授权 API 不等于 ACR 被 AUTOSAR 标准化。
5. SecurityEvent 104 的标准触发点是 AUTOSAR APCE `0x03` 成功，不能无依据扩展为 ACR 06 的 AUTOSAR SHALL。
6. `0x50–0x5D` 的精确英文定义/mnemonic、Figure 11 内 `0x29` 服务特定分支的冲突优先级及功能寻址抑制必须纳入 PDF 联调评审。通用校验顺序已由 ISO §8.7.2/§8.7.3.1 确定，不在待评审范围。
7. **2026-08-27 修订（二）**：§8.3 扩充为三层结构，新增 §8.3.2 参考 C++ 接口设计与 §8.3.3 设计依据。设计的分工模式源自 [SWS_DM_01233]（长度前缀与 RV 由 DM 填、DM 不跟踪序列状态）与 [SWS_DM_01231]（错误码转译）；相对 APCE 有一处有意偏离（显式 `ClientContext`），原因是 `ara::diag::MetaInfo` 的 `GetValue` key 名称在 R25-11 未被标准化，应用无法以标准方式取得 [SWS_DM_00421] 的二元组。同时新增 ACR29-API-008、收窄 ACR29-API-006 与 ACR29-PD-08 的待冻结范围。**该接口设计不是 AUTOSAR API**。
8. **2026-08-27 修订（一）**：本版更正两处定性。① §3.2/§7.3 的通用校验顺序原按"session/security 先于认证"描述并将双门优先级列为 OEM/项目决策，实际 ISO §8.7.2 Figure 5 与 §8.7.3.1 Figure 6 明确 `0x34` 先于 `0x33`（认证检查在 Mandatory 列、安全检查在 Optional 列），故改为 `ISO-NORM` 并收窄 ACR29-PD-07 范围。② §3.2 关于"是否需要保护 `0x29` 自身"原标为 `PROJECT-DECISION`，实际 DEXT `constr_10038` 明文禁止对 `DiagnosticAuthentication` 子类配置 `authenticationEnabled`，故改为 `AUTOSAR-NORM` 并新增 ACR29-CFG-007、ACR29-TC-049、ACR29-TC-050。

### 13.2 交叉链接

- [ISO 14229-1:2020 UDS 0x29 Authentication 全量中文译本](./ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md)
- [AUTOSAR AP DM R25-11 UDS 0x29 APCE Spec](./AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md)
- [AUTOSAR R25-11 UDS 0x29 DEXT 与 AP Manifest 配置项清单](./AUTOSAR_AP_DM_R25_0x29_DEXT_Manifest_Config.md)
- [ACR Config/API 缺口与项目决策框架](./AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md)
- [ACR 增量实现模块拆分（从既有 UDS 栈出发）](./UDS_0x29_ACR_Unidirectional_Incremental_Module_Breakdown.md)
- [认证状态管理与 API 约束参考](./AUTOSAR_AP_DM_R25_Authentication_State_and_API_Reference.md)——本文 §6.2 隔离键、§3.2/§7.3 的 Role/DAL 判定与 `constr_10038` 的**规范依据与机制细节**在该文档展开（客户端标识二元组 [SWS_DM_00421]、Conversation 与 ClientAuthentication 的粒度差异、完整 C++ 接口约束）
- [AUTOSAR AP DM R25 vs R19 五大技术方向](../AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md)（方向 3：安全与访问控制）
- [AUTOSAR AP DM 演进报告 R19–R25](../AUTOSAR_AP_DM_Evolution_Report_R19-R25.md)

---

*本文的 `ACR29-*`、逻辑 callback 名和项目状态机均为工程需求；只有明确标注并引用的 ISO/AUTOSAR 条目属于标准规范。*
