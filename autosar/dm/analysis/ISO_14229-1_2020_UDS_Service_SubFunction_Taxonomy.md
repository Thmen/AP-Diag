# ISO 14229-1:2020 UDS 服务分类：SubFunction、类子功能参数与隐式模式

## 1. 目的

回答一个工程上经常被混淆的问题：**ISO 14229-1:2020 里哪些 UDS 服务真正带 SubFunction 参数、各自的子功能是什么；哪些服务没有 SubFunction，但用一个数据参数（data-parameter）实现了"看起来像子服务"的行为分支**（典型如 `0x38` 的 `modeOfOperation`、`0x2F` 的 `inputOutputControlParameter`）。

这个区分不是术语洁癖：SubFunction 与"类子功能数据参数"在 **suppressPosRspMsgIndicationBit（SPRMIB）、NRC 选择、功能寻址下的响应抑制规则、最短报文长度校验** 上遵循两套不同的规范条款（8.7.3 vs 8.7.4），实现时混用会直接导致一致性测试失败。

## 2. 方法与局限

- 数据来源：`autosar/dm/markdown/ISO_14229-1-2020/ISO_14229-1-2020.md`（由 `autosar/dm/iso/ISO 14229-1-2020.pdf` 经 MinerU `parse_method=txt` 转换）。
- 覆盖范围：ISO 14229-1:2020（第 3 版，Annex C.5 记为版本 3.0.0.0）第 10～16 章全部服务定义，以及 Annex C.4 / E / F / G 的数据参数定义。
- 关键判据取自各服务的 `<x>.2.1 Request message definition` 表（是否存在 `SubFunction = [...]` 行）与 `<x>.2.2 Request message SubFunction parameter $Level (LEV_) definition`（是否写明 "This service does not use a SubFunction parameter"）。这两处是规范自身的显式声明，不依赖文本推断。
- 局限：MinerU 转换可能丢表格行。本文中所有"某取值范围未出现"的判断都补做了全文关键字检索（见 4.3 对 `0x19` 的说明），但最终以 PDF 原文为准。
- AP 侧的对照结论引用 `autosar/dm/markdown/AUTOSAR_AP_SWS_Diagnostics_R25-11/`，仅用于说明"AUTOSAR AP 如何落地这两类参数"，不构成 ISO 结论。

## 3. 结论速览

ISO 14229-1:2020 共定义 **26 个** UDS 服务（不含 ISO 15031-5/SAE J1979 的 `0x01`–`0x0F` 段）。按"行为分支载体"可分三类：

| 类别 | 数量 | 服务 |
|------|------|------|
| **A. 带 SubFunction** | 12 | `0x10` `0x11` `0x19` `0x27` `0x28` `0x29` `0x2C` `0x31` `0x3E` `0x85` `0x86` `0x87` |
| **B. 无 SubFunction，但首个/关键数据参数是模式选择子（"类子功能"）** | 5 | `0x14` `0x2A` `0x2F` `0x38` `0x84` |
| **C. 无 SubFunction，也无模式选择子（参数纯为数据/地址/格式），行为由 SID 或服务器状态机决定** | 9 | `0x22` `0x23` `0x24` `0x2E` `0x34` `0x35` `0x36` `0x37` `0x3D` |

三点需要特别指出：

1. **`0x31` RoutineControl 属于 A 类，不属于 B 类。** `routineControlType`（`startRoutine` / `stopRoutine` / `requestRoutineResults`）在 Table 425 中被明确写作 `SubFunction = [routineControlType]`，占 A_Data #2，支持 SPRMIB，不支持时回 NRC `0x12`。把它和 `0x38` 归为一类是常见误解。真正与 `0x38 modeOfOperation` 同类的是 `0x2F` 的 `inputOutputControlParameter` 和 `0x2A` 的 `transmissionMode`。
2. **`0x3E` TesterPresent 的 SubFunction 只有一个合法值 `0x00`（zeroSubFunction）**，其存在的唯一理由是让客户端能用 bit7 发 `3E 80` 抑制正响应。这是"SubFunction 字节 ≠ 有多个子服务"的反例。
3. **`0x86` ResponseOnEvent 的 SubFunction 值域只有 6 位**，因为 bit6 被 `storageState` 占用（Table 139），bit7 是 SPRMIB，只剩 bit5–0 表示 eventType。这是全规范唯一一个 SubFunction 字节被三段瓜分的服务。

## 4. A 类：带 SubFunction 的 12 个服务

规范定义（9.2.2、Table 11/14）：SubFunction 字节 bit7 = SPRMIB，bit6–0 = SubFunction 参数值（`0x00`–`0x7F`）。正响应回显时 bit7 清零。下表所有取值均为 bit6–0（SPRMIB 未计入）。

### 4.1 `0x10` DiagnosticSessionControl — `diagnosticSessionType`（Table 25）

| 值 | 子功能 | 说明 |
|----|--------|------|
| `0x01` | defaultSession (M) | 默认会话，无 S3 超时管理；进入时重锁安全访问、复位本会话内所有激活的控制 |
| `0x02` | programmingSession (U) | 使能刷写所需服务；若跑在 Boot 中，只能通过 `0x11`、`0x10 01` 或会话超时退出 |
| `0x03` | extendedDiagnosticSession (U) | 使能标定/扩展诊断功能 |
| `0x04` | safetySystemDiagnosticSession (U) | 安全系统相关功能（如气囊引爆） |
| `0x40`–`0x5F` / `0x60`–`0x7E` | VMS / SSS | 整车厂 / 供应商自定义 |
| `0x00`、`0x05`–`0x3F`、`0x7F` | ISOSAEReserved | — |

### 4.2 `0x11` ECUReset — `resetType`（Table 34）

| 值 | 子功能 | 说明 |
|----|--------|------|
| `0x01` | hardReset | 模拟断电上电，可能重初始化易失+非易失存储 |
| `0x02` | keyOffOnReset | 模拟钥匙 OFF→ON，通常保留非易失内容 |
| `0x03` | softReset | 立即重启应用程序，不重初始化已学习的自适应值 |
| `0x04` | enableRapidPowerShutDown | 使能"快速下电"，正响应额外带 `powerDownTime`（1 s/count，`0xFF` = 不可用） |
| `0x05` | disableRapidPowerShutDown | 关闭上述功能 |
| `0x40`–`0x5F` / `0x60`–`0x7E` | VMS / SSS | — |

注意 `0x04` 是"SubFunction 决定正响应长度"的例子（Table 35 的 `powerDownTime` 标 C）。

### 4.3 `0x19` ReadDTCInformation — `reportType`（Table 317）

数量最多的 SubFunction 服务，本质是一族 DTC 查询子服务：

| 值 | 子功能 | 功能 |
|----|--------|------|
| `0x01` | reportNumberOfDTCByStatusMask | 按状态掩码返回 DTC **数量** |
| `0x02` | reportDTCByStatusMask | 按状态掩码返回 DTC **列表 + 状态** |
| `0x03` | reportDTCSnapshotIdentification | 返回所有快照记录的标识（DTC 号 + 快照记录号） |
| `0x04` | reportDTCSnapshotRecordByDTCNumber | 按 DTC 号 + 快照记录号读快照（`0xFF` = 全部） |
| `0x05` | reportDTCStoredDataByRecordNumber | 按 StoredData 记录号读（`0xFF` = 全部） |
| `0x06` | reportDTCExtDataRecordByDTCNumber | 按 DTC 号 + 扩展数据记录号读（`0xFF` 全部，`0xFE` 全部 OBD） |
| `0x07` | reportNumberOfDTCBySeverityMaskRecord | 按严重度掩码记录返回数量 |
| `0x08` | reportDTCBySeverityMaskRecord | 按严重度掩码记录返回列表 |
| `0x09` | reportSeverityInformationOfDTC | 返回指定 DTC 的严重度信息 |
| `0x0A` | reportSupportedDTC | 返回服务器支持的全部 DTC 及状态 |
| `0x0B` | reportFirstTestFailedDTC | 上次清码后第一个 testFailed 的 DTC |
| `0x0C` | reportFirstConfirmedDTC | 上次清码后第一个 confirmed 的 DTC |
| `0x0D` | reportMostRecentTestFailedDTC | 最近一个 testFailed 的 DTC |
| `0x0E` | reportMostRecentConfirmedDTC | 最近一个 confirmed 的 DTC |
| `0x14` | reportDTCFaultDetectionCounter | 返回 FDC 为正且 < `0x7F` 的"预失效"DTC 列表 |
| `0x15` | reportDTCWithPermanentStatus | 返回 permanent 状态 DTC |
| `0x16` | reportDTCExtDataRecordByRecordNumber | 按扩展数据记录号（< `0xF0`）跨 DTC 读 |
| `0x17` | reportUserDefMemoryDTCByStatusMask | 用户自定义 DTC 存储器：按状态掩码取列表（带 `MemorySelection`） |
| `0x18` | reportUserDefMemoryDTCSnapshotRecordByDTCNumber | 用户自定义存储器：读快照 |
| `0x19` | reportUserDefMemoryDTCExtDataRecordByDTCNumber | 用户自定义存储器：读扩展数据 |
| `0x1A` | reportDTCExtendedDataRecordIdentification | 返回支持某扩展数据记录号的 DTC 集合 |
| `0x42` | reportWWHOBDDTCByMaskRecord | WWH-OBD：按状态+严重度掩码取 DTC（带 `FunctionalGroupIdentifier`） |
| `0x55` | reportWWHOBDDTCWithPermanentStatus | WWH-OBD：permanent 状态 DTC |
| `0x56` | reportDTCInformationByDTCReadinessGroupIdentifier | 按 DTC 就绪组标识取 OBD DTC |
| `0x00`、`0x1B`–`0x41`、`0x43`–`0x54`、`0x57`–`0x7F` | ISOSAEReserved | — |

两点核对说明：

- Table 317 中 **`0x0F`–`0x13` 没有出现任何行**。对全文检索 `reportMirrorMemory` 得到 0 命中，可判定 2013 版的镜像内存报告类型（`reportMirrorMemoryDTCByStatusMask` 等）在 2020 版已被移除，其功能由 `0x17`–`0x19` 的 userDefMemory 系列取代。该区间在 PDF 中是否印有显式 `ISOSAEReserved` 行，建议以原 PDF 复核。
- `0x1A` 在 Table 317 中名为 `reportDTCExtendedDataRecordIdentification`，而 Table 314 的请求报文标题写作 `reportSupportedDTCExtDataRecord`，两处命名不一致，属规范内部措辞差异，语义相同。

### 4.4 `0x27` SecurityAccess — `securityAccessType`（Table 42）

不是"两个子功能"，而是**奇偶配对的等级序列**：奇数 = requestSeed，紧邻的偶数 = 对应的 sendKey。

| 值 | 子功能 |
|----|--------|
| `0x01` / `0x02` | requestSeed / sendKey（等级 1，整车厂定义） |
| `0x03`、`0x05`、`0x07`–`0x41` | requestSeed（其余等级） |
| `0x04`、`0x06`、`0x08`–`0x42` | sendKey（其余等级） |
| `0x5F` / `0x60` | ISO 26021-2 的烟火装置报废激活专用 requestSeed / sendKey |
| `0x61`–`0x7E` | systemSupplierSpecific |
| `0x00`、`0x43`–`0x5E`、`0x7F` | ISOSAEReserved |

`0x27` 是少数受**顺序检查**约束的 SubFunction（Figure 6 脚注 2 与 Annex I 状态机）：sendKey 必须紧跟对应的 requestSeed，否则回 NRC `0x24` requestSequenceError。请求报文结构也随 SubFunction 变化（requestSeed 带可选 `securityAccessDataRecord`，sendKey 带强制 `securityKey`）。

### 4.5 `0x28` CommunicationControl — `controlType`（Table 54）

| 值 | 子功能 | 说明 |
|----|--------|------|
| `0x00` | enableRxAndTx | 使能收发 |
| `0x01` | enableRxAndDisableTx | 使能收、禁止发 |
| `0x02` | disableRxAndEnableTx | 禁止收、使能发 |
| `0x03` | disableRxAndTx | 禁止收发 |
| `0x04` | enableRxAndDisableTxWithEnhancedAddressInformation | 总线主节点把子总线段切到 diagnostic-only 调度 |
| `0x05` | enableRxAndTxWithEnhancedAddressInformation | 切回应用调度 |
| `0x40`–`0x5F` / `0x60`–`0x7E` | VMS / SSS | — |

`0x04`/`0x05` 时请求必须追加 2 字节 `nodeIdentificationNumber` —— 又一个"SubFunction 决定后续数据参数是否存在"的例子。

### 4.6 `0x29` Authentication — `authenticationTask`（Table 74）

| 值 | 子功能 | 适用路径 |
|----|--------|----------|
| `0x00` | deAuthenticate (M) | 通用 |
| `0x01` | verifyCertificateUnidirectional | APCE |
| `0x02` | verifyCertificateBidirectional | APCE |
| `0x03` | proofOfOwnership | APCE |
| `0x04` | transmitCertificate | APCE |
| `0x05` | requestChallengeForAuthentication | ACR |
| `0x06` | verifyProofOfOwnershipUnidirectional | ACR |
| `0x07` | verifyProofOfOwnershipBidirectional | ACR |
| `0x08` | authenticationConfiguration (M) | 通用（查询服务器支持哪条路径） |
| `0x09`–`0x7F` | ISOSAEReserved | — |

`0x29` 是全规范中"每个 SubFunction 一张独立请求/响应报文表"最极端的服务（Table 65–73 请求 + Table 76–84 响应）。深入分析见 [`UDS_0x29/ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md`](UDS_0x29/ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md)，AP 侧标准化范围（仅 APCE，ACR out of scope）见 [`UDS_0x29/AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md`](UDS_0x29/AUTOSAR_AP_DM_R25_UDS_0x29_APCE_Spec.md) 与 [`UDS_0x29/AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md`](UDS_0x29/AUTOSAR_AP_DM_R25_UDS_0x29_ACR_Config_API_Gap.md)。

### 4.7 `0x2C` DynamicallyDefineDataIdentifier — `definitionType`（Table 239）

| 值 | 子功能 | 说明 |
|----|--------|------|
| `0x01` | defineByIdentifier | 用源 DID + 起始位置 + 长度组合动态 DID |
| `0x02` | defineByMemoryAddress | 用内存地址 + 长度组合动态 DID |
| `0x03` | clearDynamicallyDefinedDataIdentifier | 清除；不带 DDDID 参数时清除全部 |

### 4.8 `0x31` RoutineControl — `routineControlType`（Table 426）

| 值 | 子功能 | Cvt | 说明 |
|----|--------|-----|------|
| `0x01` | startRoutine | M | 启动 RID 指定的例程 |
| `0x02` | stopRoutine | U | 停止例程 |
| `0x03` | requestRoutineResults | U | 取例程结果（退出状态信息） |
| `0x00`、`0x04`–`0x7F` | ISOSAEReserved | M | — |

`startRoutine` 是**唯一强制**的子功能。正响应中的 `routineInfo`（C1）用于让通用诊断仪判断该例程是否还需要 stop/requestResults。

### 4.9 `0x3E` TesterPresent — `zeroSubFunction`

只有 `0x00` 一个合法值；`0x01`–`0x7F` 全部 ISOSAEReserved。请求报文固定为 `3E 00`（要响应）或 `3E 80`（抑制响应）。

### 4.10 `0x85` ControlDTCSetting — `DTCSettingType`（Table 128）

| 值 | 子功能 |
|----|--------|
| `0x01` | on —— 恢复 DTC 状态位更新 |
| `0x02` | off —— 停止 DTC 状态位更新 |
| `0x40`–`0x5F` / `0x60`–`0x7E` | VMS / SSS |

可选的 `DTCSettingControlOptionRecord` 允许把开关限定到指定 DTC 集合。

### 4.11 `0x86` ResponseOnEvent — `eventType`（Table 140）+ bit6 `storageState`（Table 139）

bit6：`0` = doNotStoreEvent（掉电即终止）；`1` = storeEvent（掉电后恢复；**仅 startResponseOnEvent / stopResponseOnEvent 允许**）。

bit5–0：

| 值 | 子功能 | 类型 | eventTypeRecord 长度 |
|----|--------|------|----------------------|
| `0x00` | stopResponseOnEvent | control | 0 |
| `0x01` | onDTCStatusChange | setup | 1（DTCStatusMask） |
| `0x03` | onChangeOfDataIdentifier | setup | 2（被监视 DID；排除 `F200`–`F3FF` 动态 DID） |
| `0x04` | reportActivatedEvents | control | 0 |
| `0x05` | startResponseOnEvent (M) | control | 0 |
| `0x06` | clearResponseOnEvent | control | 0 |
| `0x07` | onComparisonOfValues | setup | 10（DID + 比较逻辑 + 参考值 + 迟滞 + 定位） |
| `0x08` | reportMostRecentDtcOnStatusChange | control | 1（`0x0D` 或 `0x0E`，带 FIFO 队列保证不漏报） |
| `0x09` | reportDTCRecordInformationOnDtcStatusChange | control | 3–4（掩码 + 被复用的 `0x19` 子功能 + 其参数） |
| `0x02`、`0x0A`–`0x3F` | ISOSAEReserved | — | — |

`0x09` 值得单独注意：它把 `0x19` 的 SubFunction **作为数据参数嵌进 `0x86` 的 eventTypeRecord**，是规范里"子功能被降级成数据参数"的唯一先例。

### 4.12 `0x87` LinkControl — `linkControlType`（Table 171）

| 值 | 子功能 | 说明 |
|----|--------|------|
| `0x01` | verifyModeTransitionWithFixedParameter | 用 `linkControlModeIdentifier`（Annex B.3）验证预定义模式可否切换 |
| `0x02` | verifyModeTransitionWithSpecificParameter | 用 `linkRecord` 验证具体参数（如具体波特率）可否切换 |
| `0x03` | transitionMode | 执行前一步已验证的切换；请求只有 2 字节 |
| `0x40`–`0x5F` / `0x60`–`0x7E` | VMS / SSS | — |

与 `0x27` 一样受顺序检查约束：`0x03` 前面必须有成功的 `0x01`/`0x02`，否则 NRC `0x24`。

## 5. B 类：无 SubFunction，但用数据参数实现"类子功能"

这五个服务的 `<x>.2.2` 小节都明确写着 *This service does not use a SubFunction parameter*（`0x14` 写作 *There are no SubFunction parameters used by this service*），但报文里存在一个决定服务行为分支的枚举/位域参数。

### 5.1 `0x38` RequestFileTransfer — `modeOfOperation`（A_Data #2，Annex G Table G.1）

| 值 | 模式 | 说明 |
|----|------|------|
| `0x01` | AddFile | 新增文件（下载），后续用 `0x36`/`0x37` |
| `0x02` | DeleteFile | 删除文件；不使用 `0x36`/`0x37` |
| `0x03` | ReplaceFile | 替换文件（不存在则新增） |
| `0x04` | ReadFile | 读文件（上传） |
| `0x05` | ReadDir | 读目录；请求不含文件名 |
| `0x06` | ResumeFile | 从响应返回的 `filePosition` 断点续传；文件必须已存在 |
| `0x00`、`0x07`–`0xFF` | ISO/SAE reserved | — |

它在功能上完全等价于子功能：决定请求中 `dataFormatIdentifier` / `fileSizeParameterLength` / `fileSizeUnCompressed` / `fileSizeCompressed` 是否出现（Table 480 的 C2），也决定响应中 `lengthFormatIdentifier` / `maxNumberOfBlockLength` / `fileSizeOrDirInfoParameterLength` / `filePosition` 是否出现（Table 482 的 C1）。

**但它不是 SubFunction**，因此：不支持的 `modeOfOperation` 回 NRC `0x31` requestOutOfRange（Table 484 明确列出 "The specified modeOfOperation is not valid"），**不是** `0x12`；且 `0x38` 无法抑制正响应。

### 5.2 `0x2F` InputOutputControlByIdentifier — `inputOutputControlParameter`（`controlOptionRecord` 首字节，Annex E Table E.1）

| 值 | 模式 | 请求 controlState 字节数 |
|----|------|--------------------------|
| `0x00` | returnControlToECU | 0 |
| `0x01` | resetToDefault | 0 |
| `0x02` | freezeCurrentState | 0 |
| `0x03` | shortTermAdjustment | 等于该 DID dataRecord 的大小与格式 |
| `0x04`–`0xFF` | ISOSAEReserved | — |

与 `0x38` 的差别：这个模式选择子**不在 A_Data #2**，而在 DID 之后（#4）。它同样决定后续字节存在与否，同样不享有 SPRMIB。

### 5.3 `0x2A` ReadDataByPeriodicIdentifier — `transmissionMode`（A_Data #2，Annex C.4 Table C.10）

| 值 | 模式 |
|----|------|
| `0x01` | sendAtSlowRate |
| `0x02` | sendAtMediumRate |
| `0x03` | sendAtFastRate |
| `0x04` | stopSending —— 停止周期发送 |
| `0x00`、`0x05`–`0xFF` | ISOSAEReserved |

`0x04` 是典型的"行为分支"：同一 SID 下 start 与 stop 两种语义，靠数据参数区分——这正是 `0x31` 用 SubFunction 做的事。两者形式不同、语义同构。`0x2A` 的 NRC 表（Table 223）未像 `0x38`/`0x2F` 那样单列"transmissionMode 非法"条目，非法值落在通用 ROOR / CNC 处理下（CNC 一条明确覆盖"客户端请求了不同 transmissionMode 而服务器不支持并发多模式"的情形）。

### 5.4 `0x84` SecuredDataTransmission — `Administrative Parameter`（A_Data #2–#3，Table 490）

不是枚举模式，而是 16 bit **特性位域**：

| bit | 含义 |
|-----|------|
| 0 | 本报文是请求（否则为响应） |
| 3 | 使用预置密钥（否则用安全链路建立时协商的密钥） |
| 4 | 报文已加密 |
| 5 | 报文已签名 |
| 6 | 要求对响应签名 |
| 1–2、7–15 | ISO Reserved |

配合 `Signature/Encryption Calculation`（算法选择字节：`0x00`–`0x7F` VMS，`0x80`–`0x8F` 供应商，`0x90`–`0xFF` 保留）。`0x84` 还是唯一把**另一个完整 UDS 服务**（`Internal Message Service Request ID` + service specific parameters）封装在自己 payload 里的服务。

### 5.5 `0x14` ClearDiagnosticInformation — `groupOfDTC` + `MemorySelection`

`groupOfDTC`（3 字节，Annex D.1）与可选的 `MemorySelection` 是**作用域选择子**而非行为模式：服务行为始终是"清除"，变的是清除范围。归入 B 类是因为它同样是"靠数据参数缩放服务语义"，实现时的 NRC 与响应模型也与 `0x38` 一致（不支持的 group → NRC `0x31`）。

## 6. C 类：无 SubFunction 也无模式选择子

| SID | 服务 | 请求参数性质 |
|-----|------|--------------|
| `0x22` | ReadDataByIdentifier | 1..m 个 DID（数据选择，非行为分支） |
| `0x23` | ReadMemoryByAddress | `addressAndLengthFormatIdentifier` + 地址 + 长度（格式描述子） |
| `0x24` | ReadScalingDataByIdentifier | 单个 DID |
| `0x2E` | WriteDataByIdentifier | DID + dataRecord |
| `0x3D` | WriteMemoryByAddress | ALFID + 地址 + 长度 + 数据 |
| `0x34` | RequestDownload | `dataFormatIdentifier`（压缩/加密方法）+ ALFID + 地址长度 |
| `0x35` | RequestUpload | 同上；上传/下载由 **SID 本身**区分，不靠参数 |
| `0x36` | TransferData | `blockSequenceCounter`（序号，不是模式） |
| `0x37` | RequestTransferExit | 仅可选的 `transferRequestParameterRecord` |

这里有一种值得单列的"**隐式模式**"：`0x36` / `0x37` 的实际行为（写入还是读出）**不由报文任何字节决定**，而由前序 `0x34` / `0x35` / `0x38` 在服务器上建立的状态决定——模式存在于会话状态机里，不在线格式里。Table 450 用 "C = Conditional: this parameter is mandatory if a download is in progress" 表达这一点；无前序服务时 `0x36` 回 NRC `0x24` requestSequenceError。

`0x34`/`0x35` 的 `dataFormatIdentifier` 常被误认为模式选择子，但它描述的是**数据编码格式**（高半字节 compressionMethod、低半字节 encryptingMethod），不改变服务的动作。

## 7. SubFunction 与"类子功能数据参数"的八点实现差异

这是本文最有工程价值的部分。两者由 8.7.3（Table 4/5）与 8.7.4（Table 6/7）两套独立条款约束。

| 维度 | A 类（SubFunction） | B 类（数据参数模式选择子） |
|------|---------------------|----------------------------|
| **报文位置** | 固定为 A_Data #2 | 服务专属（`0x38`/`0x2A` 在 #2，`0x2F` 在 #4） |
| **bit7 语义** | SPRMIB —— 可请求抑制正响应 | 无特殊语义，属取值域一部分 |
| **可用值域** | 7 bit，`0x00`–`0x7F` | 完整 8 bit（`0x38` 定义 `0x01`–`0x06`，其余保留） |
| **不支持时 NRC** | `0x12` SFNS 或 `0x7E` SFNSIAS | `0x31` ROOR。`0x38` Table 484 明确列 "The specified modeOfOperation is not valid"；`0x2F` Table 403 明确列 "the value contained in the inputOu[t]putControlParameter is invalid"；`0x14` Table 299 明确列 "the specified groupOfDTC parameter is not supported" |
| **响应行为模型** | 8.7.3.2 / 8.7.3.3 | 8.7.4.2 / 8.7.4.3 |
| **功能寻址下抑制的 NRC** | SNS、SNSIAS、SFNS、SFNSIAS、ROOR 全部抑制 | SNS、SNSIAS、ROOR 抑制（无 SFNS 概念） |
| **"部分支持"语义** | 子功能是原子的：支持或不支持 | 8.7.4 允许"至少 1 个数据参数被支持"就发**正响应**（Table 6 case b） |
| **正响应回显** | 回显 bit6–0，bit7 强制为 0（Table 17） | 原值整字节回显（`0x38` Table 483: "This parameter echoes the value of the request"） |

补充两条容易踩的规则：

- **物理寻址下 SPRMIB 对负响应无效。** Table 4 case g/h/i/j 明确：即使 SPRMIB = TRUE，任何需要发的负响应仍然要发。SPRMIB 只抑制**正**响应。
- **`0x78` RCRRP 例外。** 一旦用了 RCRRP，无论 SPRMIB 取值如何都必须给最终响应（8.7.3.2 f 项下注）。规范同时建议：对大数据量响应（如 `19 0A`）不要设 SPRMIB，否则分页缓冲场景下服务器无法告知延迟。

## 8. 对 AUTOSAR AP DM 实现的含义

AP SWS Diagnostics R25-11 的处理方式印证了本文的分类，同时说明**"是否是 SubFunction"是线格式问题，不是 API 抽象问题**：

- **A 类在 AP 中"每子功能一个 API 入口 + 一个配置属性"。** `[SWS_DM_00203]` 要求 DM 通过检查 `DiagnosticRoutine` 配置中 `start` / `stop` / `requestResult` 属性是否存在来判断 `0x31` 的子功能是否被支持，缺失则回 NRC `0x12`；对应 API 是 `ara::diag::GenericRoutine::Start / Stop / RequestResults`。
- **B 类在 AP 中同样被"子服务化"，但 NRC 语义必须按 ISO 走。** `0x38` 的 `modeOfOperation` 被逐值映射到不同的 `ara::diag::FileTransferService` 方法：`[SWS_DM_01311]` AddFile → `RequestWriteFile(kAdd)`、`[SWS_DM_01312]` DeleteFile → `DeleteFile`、`[SWS_DM_01313]` ReplaceFile → `RequestWriteFile(kReplace)`、`[SWS_DM_01314]` ReadFile → `RequestReadFile`、`[SWS_DM_01315]` ReadDir → `RequestReadDirectory`、`[SWS_DM_01316]` ResumeFile → `RequestResumeWriteFile`。API 形态与 `0x31` 无异，但 `[SWS_DM_01310]` 把除通用检查外的 NRC 判定全部推给应用——应用必须自己在非法 `modeOfOperation` 时返回 `0x31` 而不是 `0x12`。
- **DM 的服务分发规则只对 A 类成立。** AP R25 规定"若存在 SID 级的 service processor 但不存在该子功能级的 processor，则回 NRC `0x12`"。这条规则不能套用到 `0x38`/`0x2F`/`0x2A`：这些服务在 DM 眼里只有 SID 级分发，模式分支发生在应用侧。
- AP 明确不支持 ISO 14229-1 Figure 6 中的"厂商/供应商特定服务检查"扩展点（见 AP R25 关于 Figure 6 的说明），实现自定义子功能校验时需自行在应用层处理。

## 9. 交叉引用

- 跨版本演进背景：[`AUTOSAR_AP_DM_Evolution_Report_R19-R25.md`](AUTOSAR_AP_DM_Evolution_Report_R19-R25.md)
- 五大技术方向（本文对应"事件/DTC 能力增强"与"安全与访问控制"）：[`AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md`](AUTOSAR_AP_DM_R25_vs_R19_Five_Directions.md)
- `0x29` 专题（A 类中结构最复杂的服务）：[`UDS_0x29/`](UDS_0x29/)

## 10. 数据来源与版本

| 项 | 值 |
|----|----|
| 权威原文 | `autosar/dm/iso/ISO 14229-1-2020.pdf`（ISO 14229-1:2020，第 3 版） |
| 检索载体 | `autosar/dm/markdown/ISO_14229-1-2020/ISO_14229-1-2020.md`（MinerU `parse_method=txt`） |
| AP 对照 | `autosar/dm/markdown/AUTOSAR_AP_SWS_Diagnostics_R25-11/`（对应 `autosar/dm/autosar/AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf`） |
| 主要引用表 | Table 2、Table 8–18（描述约定）、Table 4–7（8.7 响应行为）、Table 25/34/42/54/74/128/139/140/171/239/317/426（各服务 SubFunction 定义）、Table C.10、Table E.1、Table F.1、Table G.1 |
