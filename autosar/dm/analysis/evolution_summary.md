# AUTOSAR AP Diagnostics Evolution Analysis (auto-generated)

## R19-11

- requirements: 754, toc entries: 306, chars: 942898
- official change note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsPartly removed obsoleterequirementsRemoved obsolete service interfacesChanged Document Status fromFinal to published

## R20-11

- requirements: 951, toc entries: 265, chars: 1287316
- official change note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsValidated requirements from conceptDolPExtensionIntroduced UDS services 2A & 2C

## R21-11

- requirements: 1119, toc entries: 261, chars: 1528296
- official change note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsIntroduced UDS service 29Introduced Event Combination inchapter 7

## R22-11

- requirements: 1419, toc entries: 0, chars: 1941355
- official change note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsIntroduced DTC suppressed featureStandardize mapping of vendorspecific error codes to UDS ErrorcodesIntroduced 0x38 RequestFileTransferIntroduced SOVD Concept

## R23-11

- requirements: 1774, toc entries: 0, chars: 2431946
- official change note: • Document quality improvement andfixing bugs• Incorporated Quality Scope ReviewFindings• SOVD Concept Part 2 implemented• Service 0x29 refinements

## R24-11

- requirements: 1913, toc entries: 0, chars: 2815253
- official change note: • Document quality improvement,clarifications and fixing bugs• Document structure updated• Formalized generated interface classesfor DID, RID and DataElements• Standardized Violations added● Term Reentrancy is changed toConcurrency• Support DolP amendment 2023 protocolversion 4• Harmonization with CP• Explicit no-debouncing forara::diag::monitor• SecurityEvents added

## R25-11

- requirements: 2207, toc entries: 449, chars: 3333603

## Pairwise deltas

### R19-11 -> R20-11: +198 reqs, -1 reqs

- note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsValidated requirements from conceptDolPExtensionIntroduced UDS services 2A & 2C
- toc added sample:
  - 8.3.2.4.2 DataElement constructor
  - 7.4.3 Dispatching of UDS Requests
  - 7.5.2.1.1 Definition
  - 7.5.1.1.2 Life-cycle of a Diagnostic Conversation
  - 7.5.4.2.1 Supported Diagnostic Mappings
  - 8.3.2.2.7 Routine::StopOffer function
  - 8.3.3.6.5 diag::Indicator::SetNotifier function
  - 8.3.1.7.2 diag::GenericRoutine::GenericRoutine function
  - 8.3.1.4.6 diag::Monitor::ReportMonitorAction function
  - 8.3.3.1.1 diag::DTCFormatType type
  - 8.3.3.3.3 diag::SecurityLevelType type
  - 7.4.1.4 Channel Notifications
- keyword delta: {'SecurityEvent': 3, 'DoIP': 4, '0x2A': 23, '0x2C': 7, 'MetaInfo': 88, 'Reentrancy': 92, 'snapshot': 6, 'extended data': 36}

### R20-11 -> R21-11: +169 reqs, -1 reqs

- note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsIntroduced UDS service 29Introduced Event Combination inchapter 7
- toc added sample:
  - 8.3.1.15 ServiceValidation class .
  - 7.5.1.3.1 ExternalAuthentication
  - 7.5.2.2 Diagnostic Events
  - 8.3.1.20.5 diag::EcuResetRequest::ExecuteReset function
  - 8.3.1.20.3 diag::EcuResetRequest::Offer function
  - 8.3.1.22 ClientAuthentication class
  - 7.5.1.8.14 Service 0x31 – RoutineControl
  - 7.5.1.5 UDS request Validation/Verification
  - 7.5.1.8.16 Service 0x35 – RequestUpload
  - 8.3.1.9.1 diag::DTCFormatType type
  - 8.3.1.9.4 diag::Event::DebouncingState type
  - 7.5.2.5.1.1 Format
- keyword delta: {'Authentication': 499, 'DynamicAccessList': 290, 'DoIP': 1, 'Software Cluster': 1, 'Event Combination': 35, '0x29': 15, '0x2C': 1, 'MetaInfo': 14, 'Reentrancy': 11, 'snapshot': 15, 'extended data': 4}

### R21-11 -> R22-11: +300 reqs, -0 reqs

- note: Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsIntroduced DTC suppressed featureStandardize mapping of vendorspecific error codes to UDS ErrorcodesIntroduced 0x38 RequestFileTransferIntroduced SOVD Concept
- keyword delta: {'SOVD': 715, 'Authentication': 60, 'DynamicAccessList': 33, 'SecurityEvent': 1, 'DoIP': 86, 'Software Cluster': -1, 'suppressed': 45, 'RequestFileTransfer': 30, '0x2C': -1, '0x38': 10, 'MetaInfo': 54, 'Reentrancy': 23, 'snapshot': 21, 'extended data': 1}

### R22-11 -> R23-11: +355 reqs, -0 reqs

- note: • Document quality improvement andfixing bugs• Incorporated Quality Scope ReviewFindings• SOVD Concept Part 2 implemented• Service 0x29 refinements
- keyword delta: {'SOVD': 1058, 'Authentication': 116, 'DynamicAccessList': -7, 'DoIP': 142, 'Software Cluster': 2, 'RequestFileTransfer': 1, '0x29': 2, '0x2A': 1, '0x2C': 2, '0x38': 1, 'MetaInfo': 53, 'Reentrancy': 22, 'snapshot': 4, 'extended data': 10}

### R23-11 -> R24-11: +139 reqs, -0 reqs

- note: • Document quality improvement,clarifications and fixing bugs• Document structure updated• Formalized generated interface classesfor DID, RID and DataElements• Standardized Violations added● Term Reentrancy is changed toConcurrency• Support DolP amendment 2023 protocolversion 4• Harmonization with CP• Explicit no-debouncing forara::diag::monitor• SecurityEvents added
- keyword delta: {'SOVD': 191, 'Authentication': -12, 'DynamicAccessList': -40, 'SecurityEvent': 1, 'DoIP': -23, 'Event Combination': 4, 'suppressed': -24, 'RequestFileTransfer': 9, '0x29': 4, '0x2A': 1, '0x2C': 1, '0x38': 5, 'MetaInfo': -14, 'no-debouncing': 1, 'Reentrancy': -146, 'Concurrency': 176, 'snapshot': 15, 'extended data': 24, 'IAM': 1}

### R24-11 -> R25-11: +294 reqs, -0 reqs

- toc added sample:
  - 8.9.2 Global Variables
  - 8.5.1.2.3.5 operator=(ClientAuthentication&&) &
  - 8.11.3.1 Public Member Types
  - 8.10.4.1.3 Member Functions
  - 7.5.1 Security Events .
  - 8.10.4 Class: DataTransferReadSession
  - 8.9.3.2.1 Special Member Functions
  - 7.3.2.6 UDS response handling
  - 8.10.4.1 Public Member Functions
  - 8.10.4.1.1.2 Move Constructor .
  - 1.2 AUTOSAR Diagnostic Extract Template (DEXT)
  - 7.3.1.1.1 Provision of MetaInfo
- keyword delta: {'SOVD': 1793, 'Authentication': 54, 'DynamicAccessList': 34, 'SecurityEvent': 4, 'DoIP': 89, 'Software Cluster': 1, 'Event Combination': 1, 'RequestFileTransfer': 1, '0x29': 12, '0x38': 2, 'MetaInfo': 27, 'Reentrancy': -1, 'Concurrency': 59, 'snapshot': 88, 'extended data': 42, 'IAM': 6}

## R19 -> R25 overall

{
  "req_added_total": 1453,
  "req_removed_total": 0,
  "req_net": 1453,
  "req_added_sample": [
    "00514",
    "00515",
    "00516",
    "00517",
    "00518",
    "00519",
    "00520",
    "00521",
    "00522",
    "00523",
    "00524",
    "00525",
    "00527",
    "00528",
    "00529",
    "00530",
    "00531",
    "00532",
    "00533",
    "00534",
    "00535",
    "00536",
    "00537",
    "00621",
    "00622",
    "00623",
    "00624",
    "00625",
    "00626",
    "00627",
    "00628",
    "00629",
    "00630",
    "00631",
    "00632",
    "00633",
    "00705",
    "00706",
    "00707",
    "00708",
    "00786",
    "00796",
    "00916",
    "00918",
    "00919",
    "00920",
    "00921",
    "00922",
    "00923",
    "00924",
    "00925",
    "00926",
    "00927",
    "00928",
    "00929",
    "00930",
    "00932",
    "00933",
    "00934",
    "00935",
    "00936",
    "00937",
    "00938",
    "00939",
    "00940",
    "00941",
    "00942",
    "00943",
    "00944",
    "00945",
    "00946",
    "00947",
    "00948",
    "00949",
    "00950",
    "00951",
    "00952",
    "00953",
    "00954",
    "00955"
  ],
  "req_removed_sample": [],
  "apis_added": [
    "ara::diag::Authentication",
    "ara::diag::CancellationHandlercancellationHandler",
    "ara::diag::ClientAuthentication",
    "ara::diag::ClientAuthenticationHan",
    "ara::diag::ClientAuthenticationHandle",
    "ara::diag::CommunicationCon",
    "ara::diag::ConcurrencyType",
    "ara::diag::ConditionHandleType",
    "ara::diag::ControlDtcStatusType",
    "ara::diag::CounterBased",
    "ara::diag::DataIdentifier",
    "ara::diag::DataIdentifierConcurrency",
    "ara::diag::DataIdentifierConcurrencyType",
    "ara::diag::DataTransferExitType",
    "ara::diag::DataTransferReadByPull",
    "ara::diag::DataTransferReadByPullHandler",
    "ara::diag::DataTransferReadByPush",
    "ara::diag::DataTransferReadByPushHandler",
    "ara::diag::DataTransferReadSession",
    "ara::diag::DataTransferReadShared",
    "ara::diag::DataTransferReadSharedDataHandler",
    "ara::diag::DataTransferWriteHandler",
    "ara::diag::DataTransferWriteSession",
    "ara::diag::DataldentifierConcurrencyType",
    "ara::diag::DiagErrc",
    "ara::diag::DiagException",
    "ara::diag::DiagOfferErrorDomain",
    "ara::diag::DiagOfferException",
    "ara::diag::DiagReportingErrorDomain",
    "ara::diag::DiagReportingException",
    "ara::diag::DiagSovdErrc",
    "ara::diag::DiagSovdErrorDomain",
    "ara::diag::DiagSovdException",
    "ara::diag::DiagUdsNrcException",
    "ara::diag::DiagnosticServiceDynamic",
    "ara::diag::DiagnosticServiceDynamicAccessList",
    "ara::diag::DiagnosticSovdArrayCon",
    "ara::diag::DiagnosticSovdArrayContent",
    "ara::diag::DiagnosticSovdArrayContentElementDataConstIterator",
    "ara::diag::DiagnosticSovdArrayContentElementDataConstView",
    "ara::diag::DiagnosticSovdArrayContentElementDataConstlterator",
    "ara::diag::DiagnosticSovdArrayContentElementDataIterator",
    "ara::diag::DiagnosticSovdArrayContentElementDataView",
    "ara::diag::DiagnosticSovdArrayContentElementDatalterator",
    "ara::diag::DiagnosticSovdContent",
    "ara::diag::DiagnosticSovdContentData",
    "ara::diag::DiagnosticSovdContentElementData",
    "ara::diag::DiagnosticSovdContentElementDataType",
    "ara::diag::DiagnosticSovdContentElementDataWith",
    "ara::diag::DiagnosticSovdContentElementDataWithKey",
    "ara::diag::DiagnosticSovdPrimitive",
    "ara::diag::DiagnosticSovdPrimitiveContentValueType",
    "ara::diag::DiagnosticSovdRecord",
    "ara::diag::DiagnosticSovdRecordContentElementDataConstIterator",
    "ara::diag::DiagnosticSovdRecordContentElementDataConstView",
    "ara::diag::DiagnosticSovdRecordContentElementDataIterator",
    "ara::diag::DiagnosticSovdRecordContentElementDataView",
    "ara::diag::DiagnosticSovdRecordContentElementDatalterator",
    "ara::diag::DoIP",
    "ara::diag::DoIPActivation",
    "ara::diag::DoIPActivationLine",
    "ara::diag::DoIPEntityIdentification",
    "ara::diag::DoIPPower",
    "ara::diag::DoIPTriggerVehicleAnnouncement",
    "ara::diag::DolPEntityIdentification",
    "ara::diag::DolPEntityldentification",
    "ara::diag::DownloadSer",
    "ara::diag::DynamicAccessList",
    "ara::diag::DynamicAccessListDiag",
    "ara::diag::DynamicAccessListDiagService",
    "ara::diag::DynamicAccessListDiagServiceBuilder",
    "ara::diag::EcuResetRequest",
    "ara::diag::EventHandleType",
    "ara::diag::EventStatus",
    "ara::diag::EventStatusBit",
    "ara::diag::EventStatusByteNotifier",
    "ara::diag::ExternalAuthentication",
    "ara::diag::File",
    "ara::diag::FileTransferService",
    "ara::diag::GenericDataIdentifier"
  ],
  "apis_removed": [
    "ara::diag::ComCtrlRequestParamsType",
    "ara::diag::ComCtrlRequestParamsTypecontrolType",
    "ara::diag::ConditionTypecondition",
    "ara::diag::ConversationIdentifierType",
    "ara::diag::DataElement",
    "ara::diag::GidStatus",
    "ara::diag::MetaInfometa_info",
    "ara::diag::Metalnfometa_info",
    "ara::diag::MonitorActionaction",
    "ara::diag::OperationCycleType",
    "ara::diag::SnapshotRecordUpdatedType",
    "ara::diag::UdsDtcStatusByteType",
    "ara::diag::event"
  ],
  "services_added": [
    "29",
    "2A",
    "2C",
    "38"
  ],
  "services_removed": [
    "2F"
  ]
}