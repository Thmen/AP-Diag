<table><tr><td rowspan=1 colspan=1>Document Title</td><td rowspan=1 colspan=1>Specification of Diagnostics</td></tr><tr><td rowspan=1 colspan=1>Document Owner</td><td rowspan=1 colspan=1>AUTOSAR</td></tr><tr><td rowspan=1 colspan=1>Document Responsibility</td><td rowspan=1 colspan=1>AUTOSAR</td></tr><tr><td rowspan=1 colspan=1>Document Identification No</td><td rowspan=1 colspan=1>723</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Document Status</td><td rowspan=1 colspan=1>published</td></tr><tr><td rowspan=1 colspan=1>Part of AUTOSAR Standard</td><td rowspan=1 colspan=1>Adaptive Platform</td></tr><tr><td rowspan=1 colspan=1>Part of Standard Release</td><td rowspan=1 colspan=1>R19-11</td></tr></table>

<table><tr><td colspan="4" rowspan="1">Document Change History</td></tr><tr><td colspan="1" rowspan="1">Date</td><td colspan="1" rowspan="1">Release</td><td colspan="1" rowspan="1">Changed by</td><td colspan="1" rowspan="1">Description</td></tr><tr><td colspan="1" rowspan="1">2019-11-28</td><td colspan="1" rowspan="1">R19-11</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">Document quality improvement andfixing bugsIncorporated Quality Scope ReviewFindingsPartly removed obsoleterequirementsRemoved obsolete service interfacesChanged Document Status fromFinal to published</td></tr><tr><td colspan="1" rowspan="1">2019-03-29</td><td colspan="1" rowspan="1">19-03</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">Document quality improvement andfixing bugsIntroduced ara::diag interfaces indraft state</td></tr><tr><td colspan="1" rowspan="1">2018-10-31</td><td colspan="1" rowspan="1">18-10</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">Diagnostic Protocol replaced byDiagnostic ConversationsResponseOnEvent,CommunicationControl, EcuResetaddedChapter 7 overall rework andupdatesChapter 8 split into chapter 8 (C++API) and chapter 9 (ServiceInterfaces)</td></tr><tr><td colspan="1" rowspan="1">2018-03-29</td><td colspan="1" rowspan="1">18-03</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">Chapter 7.1. Software Cluster addedChapter 7.2. Diagnostic ServiceManagement, common parts for allservices separatedChapter 7.3. Event Management,several additions and reworkChapter 8. API specification,complete rework</td></tr><tr><td colspan="1" rowspan="1">2017-10-27</td><td colspan="1" rowspan="1">17-10</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">General API reworkTP Plug-in interfaceIntroduction of SoftwareCluster inAPIsAdditional UDS services likeSecurityAccess</td></tr><tr><td colspan="1" rowspan="1">2017-03-31</td><td colspan="1" rowspan="1">17-03</td><td colspan="1" rowspan="1">AUTOSARReleaseManagement</td><td colspan="1" rowspan="1">Initial release</td></tr></table>

## Disclaimer

This work (specification and/or software implementation) and the material contained in it, as released by AUTOSAR, is for the purpose of information only. AUTOSAR and the companies that have contributed to it shall not be liable for any use of the work.

The material contained in this work is protected by copyright and other types of intellectual property rights. The commercial exploitation of the material contained in this work requires a license to such intellectual property rights.

This work may be utilized or reproduced without any modification, in any form or by any means, for informational purposes only. For any other purpose, no part of the work may be utilized or reproduced, in any form or by any means, without permission in writing from the publisher.

The work has been developed for automotive applications only. It has neither been developed, nor tested for non-automotive applications.

The word AUTOSAR and the AUTOSAR logo are registered trademarks.

## Table of Contents

Introduction and functional overview 15   
1.1 Diagnostic interface . 15   
1.2 AUTOSAR Diagnostic Extract Template (DEXT) 15   
1.3 Software Cluster 15   
1.3.1 Diagnostic Server 15   
1.3.2 Diagnostic Managers external dependencies 18   
2 Acronyms and Abbreviations 18   
3 Related documentation 21   
3.1 Input documents & related standards and norms 21   
3.2 Further applicable specification 22   
4 Constraints and assumptions 23   
4.1 Known Limitations 23   
5 Dependencies to other modules 24   
6 Requirements Tracing 25   
6.1 Not applicable requirements 33   
7 Functional specification 33   
7.1 UDS Transport Layer 34   
7.1.1 Support of proprietary UDS Transport Layer 35   
7.1.1.1 Initialization, Starting and Stopping of a proprietary   
UDS TransportLayer 35   
7.1.1.2 UDS message reception on a proprietary UDS   
TransportLayer 36   
7.1.1.3 UDS message transmission on a proprietary UDS   
TransportLayer 38   
7.1.1.4 Channel Notifications 39   
7.1.2 DoIP 40   
7.1.3 Dispatching of UDS Requests 41   
7.2 Diagnostic Server 42   
7.2.1 Diagnostic Communication Management 43   
7.2.1.1 Diagnostic Conversations 43   
7.2.1.1.1 Parallel Client Handling Variants 43   
7.2.1.1.2 Life-cycle of a Diagnostic Conversation 44   
7.2.1.1.3 Diagnostic Conversation Service Interface 45   
7.2.1.2 Assignment of UDS requests to Diagnostic Conver  
sations 46   
7.2.1.2.1 Prioritization 48   
7.2.1.2.2 Replacement of Diagnostic Conversations and   
initial values 49   
7.2.1.2.3 Refusal of incoming diagnostic request 49   
7.2.1.3 UDS request Validation/Verification 50   
7.2.1.3.1 UDS request format checks 50   
7.2.1.3.2 Supported service checks 51   
7.2.1.3.3 Session and Security Checks 51   
7.2.1.3.4 Manufacturer and Supplier Permission Checks   
and Confirmation 52   
7.2.1.3.5 Condition checks 53   
7.2.1.4 UDS response handling 54   
7.2.1.4.1 Positive and negative responses 54   
7.2.1.4.2 Suppression of responses 54   
7.2.1.4.3 Sending busy Responses 55   
7.2.1.5 Keep track of active non-default sessions 55   
7.2.1.6 UDS service processing 56   
7.2.1.6.1 Supported UDS Services 56   
7.2.1.6.2 Common service processing items 57   
7.2.1.6.3 Service 0x10 – DiagnosticSessionControl 57   
7.2.1.6.4 Service 0x11 – ECUReset 58   
7.2.1.6.5 Service 0x14 – ClearDiagnosticInformation 59   
7.2.1.6.5.1 Clearing user-defined fault memory 61   
7.2.1.6.6 Service 0x19 – ReadDTCInformation 62   
7.2.1.6.6.1 SF 0x01 – reportNumberOfDTCBySta  
tusMask . 62   
7.2.1.6.6.2 SF 0x02 – reportDTCByStatusMask 63   
7.2.1.6.6.3 SF 0x04 – reportDTCSnapshotRecord-  
ByDTCNumber 63   
7.2.1.6.6.4 SF 0x06 – reportDTCExtDataRecord-  
ByDTCNumber 63   
7.2.1.6.6.5 SF 0x07 – reportNumberOfDTCBy-  
SeverityMaskRecord 63   
7.2.1.6.6.6 SF 0x14 – reportDTCFaultDetection-  
Counter 64   
7.2.1.6.6.7 SF 0x17 reportUserDefMemory-  
DTCByStatusMask 64   
7.2.1.6.6.8 SF 0x18 – reportUserDefMemoryDTC-  
SnapshotRecordByDTCNumber 64   
7.2.1.6.6.9 SF 0x19 reportUserDefMemory-  
DTCExtDataRecordByDTCNumber   
64   
7.2.1.6.7 Service 0x22 – ReadDataByIdentifier 65   
7.2.1.6.8 Service 0x27 – SecurityAccess 66   
7.2.1.6.9 Service 0x28 – CommunicationControl 68   
7.2.1.6.10 Service 0x2E – WriteDataByIdentifier 69   
7.2.1.6.11 Service 0x31 – RoutineControl 70   
7.2.1.6.12 Service 0x34 – RequestDownload 71   
7.2.1.6.13 Service 0x35 – RequestUpload 71   
7.2.1.6.14 Service 0x36 – TransferData 72   
7.2.1.6.15 Service 0x37 – RequestTransferExit 73   
7.2.1.6.16 Service 0x3E – TesterPresent 73   
7.2.1.6.17 Service 0x85 – ControlDTCSetting 73   
7.2.1.6.18 Service 0x86 – ResponseOnEvent 75   
7.2.1.6.19 Custom Diagnostic Services 77   
7.2.1.7 Cancellation of a Diagnostic Conversation 77   
7.2.2 Diagnostic Event Management 78   
7.2.2.1 Diagnostic Events 78   
7.2.2.1.1 Definition 78   
7.2.2.1.2 Monitors 79   
7.2.2.1.3 Reporting 81   
7.2.2.1.4 Debouncing 81   
7.2.2.1.4.1 Counter-based debouncing 82   
7.2.2.1.4.2 Time-based debouncing . 84   
7.2.2.1.4.3 Debounce algorithm reset 87   
7.2.2.1.4.4 Dependencies to enable conditions 88   
7.2.2.1.4.5 Dependencies to UDS service 0x85   
ControlDTCSettings 88   
7.2.2.2 DTC Status processing 88   
7.2.2.2.1 Status processing 89   
7.2.2.2.2 Status change notifications 90   
7.2.2.2.3 Indicators 90   
7.2.2.2.4 User controlled WarningIndicatorRequest-bit 91   
7.2.2.3 Operation Cycles Management 92   
7.2.2.4 Event memory 93   
7.2.2.4.1 DTC Introduction 93   
7.2.2.4.1.1 Format 94   
7.2.2.4.1.2 Groups 94   
7.2.2.4.2 Destination 95   
7.2.2.4.3 EnableConditions 95   
7.2.2.4.4 DTC related data 96   
7.2.2.4.4.1 Triggering for data storage 96   
7.2.2.4.4.2 Storage of snapshot record data 96   
7.2.2.4.4.3 Storage of extended data 97   
7.2.2.4.5 Clearing DTCs 98   
7.2.2.4.5.1 Locking of the DTC clearing process by   
a client 98   
7.2.2.4.5.2 ClearConditions 99   
7.2.2.4.5.3 DTC clearing triggered by application 99   
7.2.2.4.6 Aging 100   
7.2.2.4.7 NumberOfStoredEntries 101   
7.2.3 Required Configuration 102   
7.2.4 Diagnostic Data Management 102   
7.2.4.1 Internal and External Diagnostic Data Elements 103   
7.2.4.2 Reading and Writing Diagnostic Data Identifier 105   
7.2.4.2.1 Supported Diagnostic Mappings 105   
7.2.4.2.2 Reading Diagnostic Data Identifier 106   
7.2.4.2.3 Writing Diagnostic Data Identifier 107   
7.2.4.2.4 Reading and writing VIN data 108   
8 API specification 109   
8.1 C++ UDS Transportlayer API Interfaces 109   
8.1.1 UDS Transportlayer Types 109   
8.1.1.1 uds\_transport::ByteVector 109   
8.1.1.2 uds\_transport::ChannelID 109   
8.1.1.3 uds\_transport::Priority 110   
8.1.1.4 uds\_transport::ProtocolKind 110   
8.1.1.5 uds\_transport::UdsMessageConstPtr 110   
8.1.1.6 uds\_transport::UdsMessagePtr 111   
8.1.1.7 uds\_transport::UdsTransportProtocolHandlerID 111   
8.1.2 UdsMessage Class 112   
8.1.2.1 Types 112   
8.1.2.1.1 uds\_transport::UsdMessage::Address 112   
8.1.2.1.2 uds\_transport::UsdMessage::MetaInfoMap 113   
8.1.2.1.3 uds\_transport::UsdMessage::TargetAddressType113   
8.1.2.2 Methods 113   
8.1.2.2.1 uds\_transport::UdsMessage::UdsMessage 113   
8.1.2.2.2 uds\_transport::UdsMessage::UdsMessage 114   
8.1.2.2.3 uds\_transport::UdsMessage::UdsMessage 114   
8.1.2.2.4 uds\_transport::UdsMessage::UdsMessage::   
operator= 115   
8.1.2.2.5 uds\_transport::UdsMessage::UdsMessage::   
operator= 115   
8.1.2.2.6 uds\_transport::UdsMessage::\~UdsMessage 115   
8.1.2.2.7 uds\_transport::UdsMessage::AddMetaInfo 116   
8.1.2.2.8 uds\_transport::UdsMessage::GetPayload 116   
8.1.2.2.9 uds\_transport::UdsMessage::GetSa 117   
8.1.2.2.10 uds\_transport::UdsMessage::GetTa 117   
8.1.2.2.11 uds\_transport::UdsMessage::GetTaType 118   
8.1.3 UdsTransportProtocolHandler Class 118   
8.1.3.1 Types 119   
8.1.3.1.1 uds\_transport::UdsTransportProtocolHandler::   
InitializationResult 119   
8.1.3.2 Methods 119   
8.1.3.2.1 uds\_transport::UdsTransportProtocolHandler::   
UdsTransportProtocolHandler 119   
8.1.3.2.2 uds\_transport::UdsTransportProtocolHandler::   
\~UdsTransport 120   
8.1.3.2.3 uds\_transport::UdsTransportProtocolHandler::   
GetHandlerID 120   
8.1.3.2.4 uds\_transport::UdsTransportProtocolHandler::   
Initialize 120   
8.1.3.2.5 uds\_transport::UdsTransportProtocolHandler::   
NotifyReestablishment 121   
8.1.3.2.6 uds\_transport::UdsTransportProtocolHandler::   
Start 121   
8.1.3.2.7 uds\_transport::UdsTransportProtocolHandler::   
Stop 122   
8.1.3.2.8 uds\_transport::UdsTransportProtocolHandler::   
Transmit 122   
8.1.4 UdsTransportProtocolMgr Class 123   
8.1.4.1 Types 123   
8.1.4.1.1 uds\_transport::UdsTransportProtocolMgr::   
GlobalChannelIdentifier 123   
8.1.4.1.2 uds\_transport::UdsTransportProtocolMgr::   
IndicationResult 124   
8.1.4.1.3 uds\_transport::UdsTransportProtocolMgr::   
TransmissionResult 124   
8.1.4.2 Methods 125   
8.1.4.2.1 uds\_transport::UdsTransportProtocolMgr::   
ChannelReestablished 125   
8.1.4.2.2 uds\_transport::UdsTransportProtocolMgr::   
HandleMessage 125   
8.1.4.2.3 uds\_transport::UdsTransportProtocolMgr::   
HandlerStopped 125   
8.1.4.2.4 uds\_transport::UdsTransportProtocolMgr::   
IndicateMessage 126   
8.1.4.2.5 uds\_transport::UdsTransportProtocolMgr::   
NotifyMessageFailure 127   
8.1.4.2.6 uds\_transport::UdsTransportProtocolMgr::   
TransmitConfirmation 127   
8.1.5 Sequence Diagramms of UDS Transport Layer Interaction 128   
8.1.5.1 Lifecycle 128   
8.1.5.2 UDS Request Processing 130   
8.1.5.3 UDS Response Transmission 132   
8.1.5.4 Channel Reestablishment 134   
8.2 C++ Diagnostic API Interfaces 135   
8.2.1 Introduction 135   
8.2.2 Monitor class 135   
8.2.2.1 diag::Monitor::CounterBased 136   
8.2.2.2 diag::Monitor::TimeBased 136   
8.2.2.3 diag::Monitor::InitMonitorReason 137   
8.2.2.4 diag::Monitor::MonitorAction 137   
8.2.2.5 diag::Monitor::Monitor 138   
8.2.2.6 diag::Monitor::ReportMonitorAction 139   
8.2.3 GenericUDSService class 139   
8.2.3.1 diag::GenericUDSService::OperationOutput 140   
8.2.3.2 diag::GenericUDSService::GenericUDSService   
function 140   
8.2.3.3 diag::GenericUDSService::\~GenericUDSService   
function 140   
8.2.3.4 diag::GenericUDSService::Offer function 141   
8.2.3.5 diag::GenericUDSService::StopOffer function 141   
8.2.3.6 diag::GenericUDSService::HandleMessage function 141   
8.2.4 GenericDataIdentifier class 142   
8.2.4.1 diag::GenericDataIdentifier::OperationOutput type 142   
8.2.4.2 diag::GenericDataIdentifier::GenericDataIdentifier   
function 143   
8.2.4.3 diag::GenericDataIdentifier::\~GenericDataIdentifier   
function 143   
8.2.4.4 diag::GenericDataIdentifier::Offer function 143   
8.2.4.5 diag::GenericDataIdentifier::StopOffer function 144   
8.2.4.6 diag::GenericDataIdentifier::Read function 144   
8.2.4.7 diag::GenericDataIdentifier::Write function 145   
8.2.5 GenericRoutine class 145   
8.2.5.1 diag::GenericRoutine::OperationOutput 146   
8.2.5.2 diag::GenericRoutine::GenericRoutine function 146   
8.2.5.3 diag::GenericRoutine::\~GenericRoutine function 146   
8.2.5.4 diag::GenericRoutine::Offer function 147   
8.2.5.5 diag::GenericRoutine::StopOffer function 147   
8.2.5.6 diag::GenericRoutine::Start function 147   
8.2.5.7 diag::GenericRoutine::Stop function 148   
8.2.5.8 diag::GenericRoutine::RequestResults function 149   
8.2.6 CancellationHandler class 149   
8.2.6.1 diag::CancellationHandler::CancellationHandler   
function 149   
8.2.6.2 diag::CancellationHandler::IsCanceled function 151   
8.2.6.3 diag::CancellationHandler::SetNotifier function 151   
8.3 C++ Diagnostic generated API Interfaces 152   
8.3.1 Implementation Types header files 152   
8.3.2 Typed Routine class 153   
8.3.2.1 diag::Routine::StartOutput 153   
8.3.2.2 diag::Routine::StopOutput 154   
8.3.2.3 diag::Routine::RequestResultsOutput 154   
8.3.2.4 Routine Constructor function 154   
8.3.2.5 Routine Destructor function 155   
8.3.2.6 Routine ::Offer function 155   
8.3.2.7 Routine ::StopOffer function 156   
8.3.2.8 Routine::Start function 156   
8.3.2.9 Routine::Stop function 157   
8.3.2.10 Routine::RequestResults function 157   
8.3.3 Typed DataIdentifier class . 158   
8.3.3.1 diag::DataIdentifier::OperationOutput 158   
8.3.3.2 DataIdentifier Constructor function 159   
8.3.3.3 DataIdentifier Destructor function 159   
8.3.3.4 DataIdentifier ::Offer function 160   
8.3.3.5 DataIdentifier ::StopOffer function 160   
8.3.3.6 DataIdentifier::Read function 160   
8.3.3.7 DataIdentifier::Write function 161   
8.3.4 Typed DataElement class 161   
8.3.4.1 diag::DataElement::OperationOutput 162   
8.3.4.2 DataElement Constructor function 162   
8.3.4.3 DataElement Destructor function 163   
8.3.4.4 DataElement ::Offer function 163   
8.3.4.5 DataElement ::StopOffer function 163   
8.3.4.6 DataElement ::Read function 164   
8.4 C++ Diagnostic Error Types 164   
8.5 C++ Diagnostic API Interfaces 167   
8.5.1 Event class 167   
8.5.1.1 diag::Event::DTCFormatType type 168   
8.5.1.2 diag::Event::EventStatusBit type 168   
8.5.1.3 diag::Event::EventStatusByte type 169   
8.5.1.4 diag::Event::DebouncingState type 169   
8.5.1.5 diag::Event::Event function 169   
8.5.1.6 diag::Event::\~Event function 170   
8.5.1.7 diag::Event::GetEventStatus function 170   
8.5.1.8 diag::Event::SetEventStatusChangedNotifier function 170   
8.5.1.9 diag::Event::GetLatchedWIRStatus function 171   
8.5.1.10 diag::Event::SetLatchedWIRStatus function 171   
8.5.1.11 diag::Event::GetDTCNumber function 172   
8.5.1.12 diag::Event::GetDebouncingStatus function 172   
8.5.1.13 diag::Event::GetTestComplete function 172   
8.5.1.14 diag::Event::GetFaultDetectionCounter function 173   
8.5.2 DTCInformation class 173   
8.5.2.1 diag::DTCInformation::ControlDtcStatusType type 173   
8.5.2.2 diag::DTCInformation::UdsDtcStatusBitType type 174   
8.5.2.3 diag::DTCInformation::UdsDtcStatusByteType type . 174   
8.5.2.4 diag::DTCInformation::SnapshotDataIdentiferType   
type 175   
8.5.2.5 diag::DTCInformation::SnapshotDataRecordType type 175   
8.5.2.6 diag::DTCInformation::SnapshotRecordUpdatedType   
type 175   
8.5.2.7 diag::DTCInformation::DTCInformation function . 176   
8.5.2.8 diag::DTCInformation::\~DTCInformation function . 176   
8.5.2.9 diag::DTCInformation::GetCurrentStatus function 176   
8.5.2.10 diag::DTCInformation::SetDTCStatusChangedNotifier   
function 177   
8.5.2.11 diag::DTCInformation::SetSnapshotRecordUpdat  
edNotifier function 177   
8.5.2.12 diag::DTCInformation::GetNumberOfStoredEntries   
function 178   
8.5.2.13 diag::DTCInformation::SetNumberOfStoredEntries-  
Notifier function 178   
8.5.2.14 diag::DTCInformation::Clear function 179   
8.5.2.15 diag::DTCInformation::GetControlDTCStatus function 179   
8.5.2.16 diag::DTCInformation::SetControlDtcStatusNotifier   
function 179   
8.5.2.17 diag::DTCInformation::EnableControlDtc function 180   
8.5.3 Conversation class 180   
8.5.3.1 diag::Conversation::ActivityStatusType type 181   
8.5.3.2 diag::Conversation::ConversationIdentifierType type 181   
8.5.3.3 diag::Conversation::GetConversation function 181   
8.5.3.4 diag::Conversation::GetAllConversations function . 182   
8.5.3.5 diag::Conversation::GetCurrentActiveConversations   
function 182   
8.5.3.6 diag::Conversation::GetActivityStatus function 183   
8.5.3.7 diag::Conversation::SetActivityNotifier function 183   
8.5.3.8 diag::Conversation::GetConversationIdentifier function 183   
8.5.3.9 diag::Conversation::GetDiagnosticSession function . 184   
8.5.3.10 diag::Conversation::SetDiagnosticSessionNotifier   
function 184   
8.5.3.11 diag::Conversation::GetDiagnosticSecurityLevel   
function 184   
8.5.3.12 diag::Conversation::SetSecurityLevelNotifier function 185   
8.5.3.13 diag::Conversation::ResetToDefaultSession function 185   
8.5.3.14 diag::Conversation::Cancel function 186   
8.5.4 Condition class 186   
8.5.4.1 diag::Condition::ConditionType type 186   
8.5.4.2 diag::Condition::Condition function 187   
8.5.4.3 diag::Condition::\~Condition function 187   
8.5.4.4 diag::Condition::GetCurrentStatus function 187   
8.5.4.5 diag::Condition::SetCondition function 188   
8.5.5 OperationCycle class 188   
8.5.5.1 diag::OperationCycle::OperationCycleType type 189   
8.5.5.2 diag::OperationCycle::OperationCycle function 189   
8.5.5.3 diag::OperationCycle::\~OperationCycle function 189   
8.5.5.4 diag::OperationCycle::GetOperationCycle function 190   
8.5.5.5 diag::OperationCycle::SetNotifier function 190   
8.5.5.6 diag::OperationCycle::SetOperationCycle function 190   
8.5.6 Indicator class 191   
8.5.6.1 diag::Indicator::IndicatorType type 191   
8.5.6.2 diag::Indicator::Indicator function 192   
8.5.6.3 diag::Indicator::\~Indicator function 192   
8.5.6.4 diag::Indicator::GetIndicator function 193   
8.5.6.5 diag::Indicator::SetNotifier function 193   
8.5.7 ServiceValidation class 193   
8.5.7.1 diag::ServiceValidation::ConfirmationStatusType 194   
8.5.7.2 diag::ServiceValidation::ServiceValidation function 194   
8.5.7.3 diag::ServiceValidation::\~ServiceValidation function 195   
8.5.7.4 diag::ServiceValidation::Validate function 195   
8.5.7.5 diag::ServiceValidation::Confirmation function 195   
8.5.7.6 diag::ServiceValidation::Offer function 196   
8.5.7.7 diag::ServiceValidation::StopOffer function 196   
8.5.8 SecurityAccess class 197   
8.5.8.1 diag::SecurityAccess::KeyCompareResultType type 197   
8.5.8.2 diag::SecurityAccess::SecurityAccess function 197   
8.5.8.3 diag::SecurityAccess::\~SecurityAccess function 198   
8.5.8.4 diag::SecurityAccess::GetSeed function 198   
8.5.8.5 diag::SecurityAccess::CompareKey function 199   
8.5.8.6 diag::SecurityAccess::Offer function 199   
8.5.8.7 diag::SecurityAccess::StopOffer function 199   
8.5.9 CommunicationControl class 200   
8.5.9.1 diag::CommunicationCon  
trol::ComCtrlRequestParamsType type 200   
8.5.9.2 diag::CommunicationControl::CommunicationControl   
function 201   
8.5.9.3 diag::CommunicationControl::\~CommunicationControl   
function 201   
8.5.9.4 diag::CommunicationControl::CommCtrlRequest   
function 201   
8.5.9.5 diag::CommunicationControl::Offer function 202   
8.5.9.6 diag::CommunicationControl::StopOffer function 202   
8.5.10 DownloadService class 203   
8.5.10.1 diag::DownloadService::OperationOutput type 203   
8.5.10.2 diag::DownloadService::DownloadServicefunction 203   
8.5.10.3 diag::DownloadService::\~DownloadServicefunction 204   
8.5.10.4 diag::DownloadService::RequestDownload function 204   
8.5.10.5 diag::DownloadService::DownloadData function 205   
8.5.10.6 diag::DownloadService::RequestDownloadExit func  
tion 205   
8.5.10.7 diag::DownloadService::Offer function 206   
8.5.10.8 diag::DownloadService::StopOffer function 206   
8.5.11 UploadService class 207   
8.5.11.1 diag::UploadService::OperationOutput type 207   
8.5.11.2 diag::UploadService::UploadServicefunction 207   
8.5.11.3 diag::UploadService::\~UploadServicefunction 208   
8.5.11.4 diag::UploadService::RequestUpload function 208   
8.5.11.5 diag::UploadService::UploadData function 209   
8.5.11.6 diag::UploadService::RequestUploadExit function 209   
8.5.11.7 diag::UploadService::Offer function 210   
8.5.11.8 diag::UploadService::StopOffer function 210   
8.5.12 DoIPGroupIdentification class 211   
8.5.12.1 diag::DoIPGroupIdentification::DoIPGroupIdentifica  
tionType type 211   
8.5.12.2 diag::DoIPGroupIdentification::DoIPGroupIdentifica  
tion function 212   
8.5.12.3 diag::DoIPGroupIdentification::\~DoIPGroupIdentifi  
cation function 212   
8.5.12.4 diag::DoIPGroupIdentification::GetGidStatus function 212   
8.5.12.5 diag::DoIPGroupIdentification::Offer function 213   
8.5.12.6 diag::DoIPGroupIdentification::StopOffer function 213   
8.5.13 DoIPPowerMode class 213   
8.5.13.1 diag::DoIPPowerMode::PowerModeType type 214   
8.5.13.2 diag::DoIPPowerMode::DoIPPowerMode function 214   
8.5.13.3 diag::DoIPPowerMode::\~DoIPPowerMode function 215   
8.5.13.4 diag::DoIPPowerMode::GetDoIPPowerMode function 215   
8.5.13.5 diag::DoIPPowerMode::Offer function 215   
8.5.13.6 diag::DoIPPowerMode::StopOffer function 216   
8.5.14 DoIPActivationLine class 216   
8.5.14.1 diag::DoIPActivationLine::DoIPActivationLine function 216   
8.5.14.2 diag::DoIPActivationLine::\~DoIPActivationLine function217   
8.5.14.3 diag::DoIPActivationLine::GetNetworkInterfaceId   
function 217   
8.5.14.4 diag::DoIPActivationLine::UpdateActivationLineState   
function 218   
8.5.14.5 diag::DoIPActivationLine::GetActivationLineState   
function 218   
8.5.14.6 diag::DoIPActivationLine::Offer function 218   
8.5.14.7 diag::DoIPActivationLine::StopOffer function 219   
8.5.15 DoIPTriggerVehicleAnnouncement class 219   
8.5.15.1 diag::DoIPTriggerVehicleAnnouncement::GetDoIP   
TriggerVehicleAnnouncement function 220   
8.5.15.2 diag::DoIPTriggerVehicleAnnouncement::TriggerVe  
hicleAnnouncement function . 220   
Mentioned Manifest Elements 220   
History of Constraints and Specification Items 269   
B.1 Constraint and Specification Item History of this document according   
to AUTOSAR Release 17-10 270   
B.1.1 Added Traceables in 17-10 270   
B.1.2 Changed Traceables in 17-10 272   
B.1.3 Deleted Traceables in 17-10 274   
B.1.4 Added Constraints in 17-10 275   
B.1.5 Changed Constraints in 17-10 275   
B.1.6 Deleted Constraints in 17-10 275   
B.2 Constraint and Specification Item History of this document according   
to AUTOSAR Release 18-03 275   
B.2.1 Added Traceables in 18-03 275   
B.2.2 Changed Traceables in 18-03 277   
B.2.3 Deleted Traceables in 18-03 283   
B.2.4 Added Constraints in 18-03 283   
B.2.5 Changed Constraints in 18-03 283   
B.2.6 Deleted Constraints in 18-03 284   
B.3 Constraint and Specification Item History of this document according   
to AUTOSAR Release 18-10 . 284   
B.3.1 Added Traceables in 18-10 284   
B.3.2 Changed Traceables in 18-10 286   
B.3.3 Deleted Traceables in 18-10 292   
B.3.4 Added Constraints in 18-10 293   
B.3.5 Changed Constraints in 18-10 294   
B.3.6 Deleted Constraints in 18-10 294   
B.4 Constraint and Specification Item History of this document according   
to AUTOSAR Release 19-03 294   
B.4.1 Added Traceables in 19-03 294   
B.4.2 Changed Traceables in 19-03 299   
B.4.3 Deleted Traceables in 19-03 300   
B.4.4 Added Constraints in 19-03 300   
B.4.5 Changed Constraints in 19-03 301   
B.4.6 Deleted Constraints in 19-03 301   
B.5 Constraint and Specification Item History of this document according   
to AUTOSAR Release 19-11 301   
B.5.1 Added Traceables in 19-11 301   
B.5.2 Changed Traceables in 19-11 305   
B.5.3 Deleted Traceables in 19-11 310   
B.5.4 Added Constraints in 19-11 312   
B.5.5 Changed Constraints in 19-11 312   
B.5.6 Deleted Constraints in 19-11 312

## 1 Introduction and functional overview

This specification describes the functionality, API and the configuration for the AUTOSAR Adaptive Diagnostic Management (DM).

The DM is an UDS diagnostic implementation according to ISO 14229-1[1] for the Autosar Adaptive Platform. Unless stated otherwise in this document, the DM implements the functionality as defined in the ISO 14229-1[1]. Derivations, limitation, OEM or supplier-specific behaviour according to ISO 14229-1[1] are described in this document.

## 1.1 Diagnostic interface

Since release R19-03 a C++ interface was introduced for diagnostics as a replacement for the former ara::com based service interface.

## 1.2 AUTOSAR Diagnostic Extract Template (DEXT)

The AUTOSAR Diagnostic Extract Template (DEXT) [2] is the configuration input to the DM.

## 1.3 Software Cluster

The AUTOSAR adaptive platform is able to be extended with new software packages without re-flashing the entire ECU. The individual software packages are described by SoftwareClusters. To support the current approaches of diagnostic management (like software updates), each SoftwareCluster have its own DiagnosticAddresses.

DM is intended to support an own diagnostic server instance per installed SoftwareCluster. All diagnostic server instances share a single TransportLayer instance (e.g. DoIP on TCP/IP port 13400).

## 1.3.1 Diagnostic Server

The Diagnostic Communication Management response handling basically resembles the functionality of the Dcm BSW module of the AUTOSAR Classic platform. I.e. it is responsible for processing/dispatching of diagnostic services according to ISO 14229-1[1]. That means:

• Receiving UDS diagnostic request messages from the network layer

• Extracting transport layer independent UDS information from it.

• Dispatching the request towards the Diagnostic Server instances depending on target address and target address type (physical or functional) of received UDS request message

• Correlating the diagnostic request to an existing UDS session (if already exists)

• Checking whether the diagnostic request is allowed within current session and security settings

• If diagnostic request is NOT allowed, generate negative UDS response and send it to the network layer

• If diagnostic request is allowed, depending on DM’s configuration and request type,

– either process the service internally within Diagnostic Communication Management function block of DM

– or process the service internally within Diagnostic Event Management function block of DM

– or hand it over for processing to an (external to DM) Adaptive Application

The figure below depicts those processing steps and functional blocks of DM’s Diagnostic Communication Management part.

![](./images/c00_0f94d578791fda5e27999abaa243a297f12781ac075e64f7a6eebf7648c7929c.jpg)  
Figure 1.1: Architecture Diagnostic Communication Management

## 1.3.2 Diagnostic Managers external dependencies

![](./images/c00_e95a69e3acae06117a0ee572cc1b50d200d55f9c18b3547a5b18ee8f15b25cdd.jpg)  
Figure 1.2: Diagnostic Managers external dependencies

## 2 Acronyms and Abbreviations

The glossary below includes acronyms and abbreviations relevant to the DM module that are not included in the [3, AUTOSAR glossary].

<table><tr><td colspan="1" rowspan="1">Abbreviation / Acronym:</td><td colspan="1" rowspan="1">Description:</td></tr><tr><td colspan="1" rowspan="1">AA</td><td colspan="1" rowspan="1">AUTOSAR Adaptive Application</td></tr><tr><td colspan="1" rowspan="1">AP</td><td colspan="1" rowspan="1">AUTOSAR Adaptive Platform</td></tr><tr><td colspan="1" rowspan="1">Channel</td><td colspan="1" rowspan="1">An abstraction of a network specific communication channel. InCAN networks a Channel can be identified via CAN identifier. InEthernet networks a Channel might be defined by the quadrupleSrc-IP, Src-Port, Target-IP, Target-Port.</td></tr><tr><td colspan="1" rowspan="1">CP</td><td colspan="1" rowspan="1">AUTOSAR Classic Platform</td></tr><tr><td colspan="1" rowspan="1">DEXT</td><td colspan="1" rowspan="1">AUTOSAR Diagnostic Extract[2], describing diagnostic configu-ration of an ECU</td></tr><tr><td colspan="1" rowspan="1">DM</td><td colspan="1" rowspan="1">AUTOSAR Adaptive Diagnostic Management</td></tr><tr><td colspan="1" rowspan="1">DTC</td><td colspan="1" rowspan="1">Diagnostic Trouble Code according to ISO 14229-1[1]</td></tr><tr><td colspan="1" rowspan="1">DID</td><td colspan="1" rowspan="1">Data Identified according to ISO 14229-1[1]. This 16 bit valueuniquely defines one ore more data elements (parameters) thatcan are used in diagnostics to read, write or control data.</td></tr><tr><td colspan="1" rowspan="1">ECU</td><td colspan="1" rowspan="1">Electronic control unit</td></tr><tr><td colspan="1" rowspan="1">Execution Management</td><td colspan="1" rowspan="1">Functional cluster Execution Management</td></tr><tr><td colspan="1" rowspan="1">FDC</td><td colspan="1" rowspan="1">Fault Detection Counter according to 14229-1[1]</td></tr><tr><td colspan="1" rowspan="1">GID</td><td colspan="1" rowspan="1">Group identifier as used in DolP</td></tr><tr><td colspan="1" rowspan="1">Metalnfo</td><td colspan="1" rowspan="1">Meta-Information in the form of a key-value map, which is givenfrom DM to external service processors.</td></tr><tr><td colspan="1" rowspan="1">NRC</td><td colspan="1" rowspan="1">Negative Response Code used by UDS in the diagnostic re-sponse to indicate the tester that a certain failure has occurredand the diagnostic request was not processed.</td></tr><tr><td colspan="1" rowspan="1">PowerMode</td><td colspan="1" rowspan="1">Vehicle basic status information retrieval of DolP</td></tr><tr><td colspan="1" rowspan="1">SA</td><td colspan="1" rowspan="1">SourceAddress of a UDS request</td></tr><tr><td colspan="1" rowspan="1">SID</td><td colspan="1" rowspan="1">Service Identifier, identifying a diagnostic service according toUDS, such as 0x14 ClearDiagnosticInformation</td></tr><tr><td colspan="1" rowspan="1">TA</td><td colspan="1" rowspan="1">TargetAddress of a UDS request</td></tr><tr><td colspan="1" rowspan="1">UDS</td><td colspan="1" rowspan="1">Unified Diagnostic Services</td></tr><tr><td colspan="1" rowspan="1">VIN</td><td colspan="1" rowspan="1">Vehicle Identification Number according to ISO-3779</td></tr><tr><td colspan="1" rowspan="1">Dcm</td><td colspan="1" rowspan="1">Diagnostic Communication Manager (Module of the AUTOSARClassic Platform)</td></tr><tr><td colspan="1" rowspan="1">DolP</td><td colspan="1" rowspan="1">Diagnostics over Internet Protocol (Communication protocol ofautomotive electronics according to ISO-13400[4])</td></tr></table>

<table><tr><td colspan="1" rowspan="1">Terms:</td><td colspan="1" rowspan="1">Description:</td></tr><tr><td colspan="1" rowspan="1">Aging</td><td colspan="1" rowspan="1">Unlearning/deleting of a no longer failed event/DTC after a de-fined number of operation cycles from event memory.</td></tr><tr><td colspan="1" rowspan="1">Associated Servicelnterface</td><td colspan="1" rowspan="1">Describes the association of a ServiceInterface to a Diag-nosticServiceSwMapping by means of a referenced Swc-ServiceDependency, see section 7.2.4.2.1.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Client</td><td colspan="1" rowspan="1">A Diagnostic Client is a diagnostic service requester, i.e. sendsa UDS request to the Diagnostic Server. Usually the DiagnosticClient is an external tester equipment but can also be anothervehicle internal ECU.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic      CommunicationManagement</td><td colspan="1" rowspan="1">Diagnostic Communication Management is the part of the Di ag-nostic Management which belongs to tester communicationand the processing of UDS services.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Conversation</td><td colspan="1" rowspan="1">Diagnostic Conversation represents a conversation between Di-agnostic Client (Tester) and Diagnostic Server.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Event Management</td><td colspan="1" rowspan="1">Diagnostic Event Management is the part of the DiagnosticManagement which belongs to processing and storing of diag-nostic events and associated data.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Management</td><td colspan="1" rowspan="1">Diagnostic Management is a placeholder for the complete func-tionality of diagnostic communication and event handling.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Server instance</td><td colspan="1" rowspan="1">Diagnostic Server (DM) is intended to support an own DiagnosticServer instance per installed SoftwareCluster, see section 7.2 fora detailed description. Each of those Server instances has andmanages its own resources and is responsible for dispatchingand processing of diagnostic services.</td></tr><tr><td colspan="1" rowspan="1">Diagnostic Service instance</td><td colspan="1" rowspan="1">A diagnostic service instance implements a concrete use of a di-agnostic service in a given context. It refers to a DiagnosticSer-viceClass and the DiagnosticAccessPermission, see 7.2.1.3.3for a detailed description.</td></tr><tr><td colspan="1" rowspan="1">DTC group</td><td colspan="1" rowspan="1">Uniquely identifies a set of DTCs. A DTC group is mapped tothe range of valid DTCs. By providing a group of DTCs it is ex-pressed that a certain operation is requested on all DTCs of thatgroup. The DTC group definition is provided by ISO 14229-1[1]and OEM/supplier-specific.</td></tr><tr><td colspan="1" rowspan="1">Enable Conditions</td><td colspan="1" rowspan="1">The criteria / conditions under which the test results from themonitors in the AA's are valid and shall be processed by DM.Configuration is done per event.</td></tr><tr><td colspan="1" rowspan="1">Extended Data Records</td><td colspan="1" rowspan="1">Contains statistical data for a DTC. Extended data records areassigned to DTCs and maintained and stored by the DM.</td></tr><tr><td colspan="1" rowspan="1">Event</td><td colspan="1" rowspan="1">An event (also diagnostic event) uniquely identifies a fault pathof the system. An application monitors the system and reportsevents to the DM.</td></tr><tr><td colspan="1" rowspan="1">Event memory</td><td colspan="1" rowspan="1">The DM stores information about events in the event memory.There can be multiple event memories, each keeping informationindependently from each other. Examples of the event memoryis the UDS primary event memory or the up to 256 user-definedevent memories.</td></tr><tr><td colspan="1" rowspan="1">GroupOfAlIDTCs</td><td colspan="1" rowspan="1">Identifies a special DTC group that contains all DTCs. This DTCgroup is identified by the DTC value 0xFFFFFF in 14229-1[1] andcontains by default all DTCs of a fault memory. It is present bydefault in the DM and requires no configuration.</td></tr><tr><td colspan="1" rowspan="1">Internal, External</td><td colspan="1" rowspan="1">Classifies if aDiagnosticDataElement is either managed in-ternally inside DM or by an external adaptive applications, see7.2.4.1 for the precise definition.</td></tr><tr><td colspan="1" rowspan="1">Internally, Externally</td><td colspan="1" rowspan="1">Definition of the support type of a SID by the DM. Internallymeans processing is done by DM itself, Externally means an ex-ternal service processor is used.</td></tr><tr><td colspan="1" rowspan="1">Monitor</td><td colspan="1" rowspan="1">A monitor (also diagnostic monitor) is a piece of software runningwithin an application, monitoring the correct functionality of a cer-tain system part. The result of such a function check is reportedto the DM in form of an diagnostic event.</td></tr><tr><td colspan="1" rowspan="1">Operation cycle</td><td colspan="1" rowspan="1">An operation cycle is the execution of monitor within an applica-tion, from a start point to a defined end point inside the applicationrun.</td></tr><tr><td colspan="1" rowspan="1">Primary event memory</td><td colspan="1" rowspan="1">The primary event memory is used to store events and eventrelated data. It is typically used by OEMs for after sales purposes,containing information to repair the vehicle.</td></tr><tr><td colspan="1" rowspan="1">Snapshot Record</td><td colspan="1" rowspan="1">Set of measurement values stored in the fault memory at a cer-tain point of time during fault detection. It is used to gain environ-mental data information for occurred faults.</td></tr><tr><td colspan="1" rowspan="1">SoftwareCluster</td><td colspan="1" rowspan="1">A SoftwareCluster groups all AUTOSAR artifacts which are rele-vant to deploy software on a machine. This includes the defini-tion of applications, i.e. their executables, application manifests,communication and diagnostics. In the context of diagnostics aSoftwareCluster can be addressed individually by its own set ofdiagnostic addresses.</td></tr><tr><td colspan="1" rowspan="1">SourceAddress</td><td colspan="1" rowspan="1">A Source Address is used to encode client and server identifiers.In a UDS request the source address encodes the Diagnos-tic Client whereas the source address in a UDS responseencodes the Diagnostic Server.</td></tr><tr><td colspan="1" rowspan="1">TargetAddress</td><td colspan="1" rowspan="1">A Target Address is used to encode client and server identifiers.In a UDS request the target address encodes the DiagnosticServer whereas the target address in a UDS response encodestheDiagnostic Client.</td></tr><tr><td colspan="1" rowspan="1">Transport Protocol Handler</td><td colspan="1" rowspan="1">A subcomponent of DM implementing a particular Transport Pro-tocol (either DoIP or any other proprietary UDS Transport Layer).</td></tr><tr><td colspan="1" rowspan="1">Transport Protocol Manager</td><td colspan="1" rowspan="1">Link between UDS Transport Layer and Application Layer.</td></tr><tr><td colspan="1" rowspan="1">UDS service</td><td colspan="1" rowspan="1">A diagnostic service as defined in ISO 14229-1[1].</td></tr><tr><td colspan="1" rowspan="1">UDS DTC status bit</td><td colspan="1" rowspan="1">UDS DTC status bit as defined in ISO 14229-1[1] Annex D.2;Each single bit position represents and documents a certain sta-tus information for the connected diagnostic event or DTC.The following eight bits are defined:Nr: Definition:0 testFailed1 testFailedThisOperationCycle2 pendingDTC3 confirmedDTC4 testNotCompletedSinceLastClear5 testFailedSinceLastClear6 testNotCompletedThisOperationCycle7warningIndicatorRequestedAll eight bits constitute the UDS DTC status byte.</td></tr><tr><td colspan="1" rowspan="1">UDS DTC status byte</td><td colspan="1" rowspan="1">Bit-packed DTC status information byte as defined in ISO 14229-1[1], based on DTC level. Contains the UDS DTC statusbits.</td></tr><tr><td colspan="1" rowspan="1">User-defined event memory</td><td colspan="1" rowspan="1">The user-defined event memory is used by the UDS service 0x19with subfunctions 0x17, 0x18 and 0x19. It behaves as the pri-mary event memory but contains data independent from the pri-mary fault memory. It is used to store information that are rele-vant for different purposes such as warranty or development.</td></tr><tr><td colspan="1" rowspan="1">Non-volatile Memory</td><td colspan="1" rowspan="1">In the context of DM, Non-volatile Memory refers to the persistentinformation over the shutdown of the DM process. This does notdepend on HW details.</td></tr></table>

## 3 Related documentation

## 3.1 Input documents & related standards and norms

[1] Unified diagnostic services (UDS) – Part 1: Specification and requirements (Release 2013-03) http://www.iso.org

[2] Diagnostic Extract Template AUTOSAR\_TPS\_DiagnosticExtractTemplate

[3] Glossary AUTOSAR\_TR\_Glossary

[4] Road vehicles – Diagnostic communication over Internet Protocol (DoIP) http://www.iso.org

[5] General Specification of Adaptive Platform AUTOSAR\_SWS\_General

[6] Specification of Execution Management AUTOSAR\_SWS\_ExecutionManagement

[7] Specification of Log and Trace AUTOSAR\_SWS\_LogAndTrace

[8] Specification of Persistency AUTOSAR\_SWS\_Persistency

[9] Requirements on Diagnostics AUTOSAR\_RS\_Diagnostics

[10] Road vehicles – Diagnostics on Controller Area Networks (CAN) – Part2: Network layer services

[11] Road vehicles – Diagnostic communication over Internet Protocol (DoIP) – Part 2: Network and transport layer requirements and services http://www.iso.org

[12] Specification of Manifest AUTOSAR\_TPS\_ManifestSpecification

[13] Unified diagnostic services (UDS) - Part 2: Session layer services (Release 2013- 03) http://www.iso.org

[14] Specification of Core Types for Adaptive Platform AUTOSAR\_SWS\_CoreTypes

## 3.2 Further applicable specification

AUTOSAR provides a general specification [5] which is also applicable for Diagnostic Management. The specification SWS General shall be considered as additional and required specification for implementation of Diagnostic Management.

## 4 Constraints and assumptions

## 4.1 Known Limitations

This chapter describes known limitation of the DM in respect to general claimed goals of the module. The nature of constraints can be a general exclusion of a certain domain / functionality or it can be that the provided standard has not yet integrated this functionality and will do so in future releases.

• OBD ISO 15031 and WWH OBD ISO 27145 is not supported by the DM.

• Software Cluster/Diagnostic Server instances are supported by DM interfaces but are not specified in detail.

• DoIP edge node is not supported by the DM.

• The following UDS services are not implemented by the DM:

– 0x23 ReadMemoryByAddress

– 0x24 ReadScalingDataByIdentifier

– 0x2A ReadDataByPeriodicIdentifier

– 0x2C DynamicallyDefineDataIdentifier

– 0x2F InputOutputControlByIdentifier

– 0x38 RequestFileTransfer

– 0x3D WriteMemoryByAddress

– 0x83 AccessTimingParameter

– 0x84 SecuredDataTransmission

– 0x87 LinkControl

• Sub-functions of UDS services are implemented according to ISO 14229-1[1] unless explicitly stated.

• The UDS mirror event memory is not supported by the DM. As a result of this, the DM does not support the UDS service.

– 0x19 with subfunction 0x0F (reportMirrorMemoryDTCByStatusMask)

– 0x19 with subfunction 0x10 (reportMirrorMemoryDTCExtDataRecordBy-DTCNumber)

– 0x19 with subfunction 0x11 (reportNumberOfMirrorMemoryDTCByStatus-Mask)

• The OBD/WWH OBD is not supported by the DM. As a result of this, the DM does not support the UDS service.

– 0x19 with subfunction 0x05 (reportDTCStoredDataByRecordNumber)

– 0x19 with subfunction 0x12 (reportNumberOfEmissionsOBDDTCByStatus-Mask)

– 0x19 with subfunction 0x13 (reportEmissionsOBDDTCByStatusMask)

– 0x19 with subfunction 0x42 (reportWWHOBDDTCByMaskRecord)

– 0x19 with subfunction 0x55 (reportWWHOBDDTCWithPermanentStatus)

• The following general UDS services are currently not supported, but still under discussion:

– 0x19 with subfunction 0x03 (reportDTCSnapshotIdentification)

– 0x19 with subfunction 0x08 (reportDTCBySeverityMaskRecord)

– 0x19 with subfunction 0x09 (reportSeverityInformationOfDTC)

– 0x19 with subfunction 0x0A (reportSupportedDTC)

– 0x19 with subfunction 0x0B (reportFirstTestFailedDTC)

– 0x19 with subfunction 0x0C (reportFirstConfirmedDTC)

– 0x19 with subfunction 0x0D (reportMostRecentTestFailedDTC)

– 0x19 with subfunction 0x0E (reportMostRecentConfirmedDTC)

– 0x19 with subfunction 0x15 (reportDTCWithPermanentStatus)

– 0x19 with subfunction 0x16 (reportDTCExtDataRecordByRecordNumber)

• Event Memory: Variant handling at runtime for events/DTCs is not supported.

• Event Memory: Details for combined events are not specified.

• Event Memory: Event displacement is not supported. The DM stores for each DTC related data.

• Event Memory: Internal configuration parameters and DM values as extended data are not supported.

• Persistent Storage of failed attempts to change security level : After each increment of the attempt counter, it shall be persisted to survive accidental or intended resets. Here the option to select the persistent storage is mandatory in Adaptive Autosar.

## 5 Dependencies to other modules

As any other process started by Execution Management [6], DM needs to interact with the Execution Management.

The DM may use ara::log ([7], Log and Trace) for logging and tracing purposes.   
DM may use ara::per ([8], Persistency) to store non-volatile data.

## 6 Requirements Tracing

The following tables reference the requirements specified in [9] and links to the fulfilling requirements by this document. Please note that the column “Satisfied by” being empty for a specific requirement means that the requirement is not fulfilled by this document.

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=1>Description</td><td rowspan=1 colspan=6>Satisfied by</td></tr><tr><td rowspan=1 colspan=1>[RS AP_00125]</td><td rowspan=1 colspan=1>Enumerator and constantnames.</td><td rowspan=1 colspan=6>[SWS_DM_00642][SWS_DM_00643][SWS_DM_00645]</td></tr><tr><td rowspan=9 colspan=1>[RS_AP_00134]</td><td rowspan=9 colspan=1>noexcept behavior of classdestructors</td><td rowspan=1 colspan=6>[SWS_DM_00553][SWS_DM_00584]</td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00586][SWS_DM_00588]</td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00590][SWS__DM_00635]</td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00648][SWS_DM_00665]</td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00713][SWS_DM_00723][SWS_DM_00733][SWS_DM_00743]</td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00753][SWS_DM_00763]</td></tr><tr><td rowspan=2 colspan=5>[SWS_DM_00773][SWS_DM</td><td rowspan=1 colspan=1>_00788]</td></tr><tr><td rowspan=1 colspan=3>[SWS D</td><td rowspan=2 colspan=5>[SWS_DM_00807][SWS_DM_00832]</td></tr><tr><td></td><td rowspan=1 colspan=2>DM</td><td rowspan=1 colspan=1>DM</td></tr><tr><td rowspan=10 colspan=1>[RS_AP_00137]</td><td rowspan=10 colspan=1>Connecting run-time interfacewith model.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00548]</td><td rowspan=2 colspan=1>[SWS_DM_00549]SWS_DM_00552]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00550][</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00585][</td><td rowspan=1 colspan=1>SWS_DM_00587]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00589][</td><td rowspan=1 colspan=1>SWS_DM_00616]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00634][1</td><td rowspan=1 colspan=1>[SWS_DM_00647]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00664][</td><td rowspan=1 colspan=1>SWS_DM_00712]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00722]</td><td rowspan=1 colspan=1>[SWS_DM_00732]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00742][</td><td rowspan=1 colspan=1>SWS_DM_00752]</td></tr><tr><td rowspan=2 colspan=5>[SWS_DM_00787][[SWS_DM_00806]</td><td rowspan=1 colspan=2>[SWS_DM_00762]</td><td rowspan=2 colspan=1>SWS_DM_00797]</td></tr><tr><td rowspan=1 colspan=1>[SWS DN</td></tr><tr><td rowspan=13 colspan=1>[RS_AP_00138]</td><td rowspan=13 colspan=1>Return type of asynchronousfunction calls.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00554]</td><td rowspan=1 colspan=1>[SWS_DM_00555]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00557][</td><td rowspan=1 colspan=1>SWS_DM_00591]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00592]</td><td rowspan=1 colspan=1>[SWS_DM_00593]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00596]</td><td rowspan=1 colspan=1>[SWS DM_00598]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00618][</td><td rowspan=1 colspan=1>SWS_DM_00636]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00637][</td><td rowspan=1 colspan=1>SWS_DM_00640]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00724][</td><td rowspan=1 colspan=1>SWS_DM_00734]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00764]</td><td rowspan=1 colspan=1>[SWS_DM_00765]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00774]</td><td rowspan=1 colspan=1>[SWS_DM_00775]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00789][</td><td rowspan=1 colspan=1>SWS_DM_00790]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00791]</td><td rowspan=1 colspan=1>[SWS_DM_00799]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00800]</td><td rowspan=2 colspan=1>[SWS_DM_00801]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>[SWS_DM_00808]</td></tr></table>

<table><tr><td colspan="1" rowspan="1">Requirement</td><td colspan="3" rowspan="1">Description</td><td colspan="6" rowspan="1">Satisfied by</td></tr><tr><td colspan="1" rowspan="23">[RS_AP_00139]</td><td colspan="3" rowspan="23">Return type of synchronousfunction calls.</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00543]</td><td colspan="3" rowspan="1">[SWS_DM_00594]</td><td colspan="1" rowspan="2"></td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00597]</td><td colspan="3" rowspan="1">[SWS_DM_00599]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00619]</td><td colspan="3" rowspan="1">]1[SWS_DM_00638</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00649]</td><td colspan="2" rowspan="1">[SWS_D</td><td colspan="1" rowspan="1">M_00650</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00651]</td><td colspan="2" rowspan="1">[SWS D</td><td colspan="1" rowspan="1">M 00652]</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00653]</td><td colspan="3" rowspan="1">[SWS_DM_00654</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00655]</td><td colspan="3" rowspan="1">[SWS_DM_00656]</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00666]</td><td colspan="3" rowspan="1">[SWS_DM_00667]</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00668]</td><td colspan="3" rowspan="1">[SWS_DM_00669</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="2" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00670]</td><td colspan="3" rowspan="1">[SWS_DM_00671]</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00672]</td><td colspan="3" rowspan="1">[SWS_DM_00673</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00674]</td><td colspan="3" rowspan="1">[SWS_DM_00692</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00694]</td><td colspan="3" rowspan="1">[SWS_DM_00695</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00696]</td><td colspan="3" rowspan="1">[SWS_DM_00697</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00698]</td><td colspan="3" rowspan="1">[SWS_DM_00699]</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00700]</td><td colspan="3" rowspan="1">[SWS_DM_00714</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00715]</td><td colspan="3" rowspan="1">[SWS_DM_00725]]</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">[SWS_DM_00735]</td><td colspan="3" rowspan="1">][SWS_DM_00744</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="1" rowspan="2"></td><td colspan="1" rowspan="3">[SWS_DM_00745][SWS_DM_00755][SWS_DM_00766]</td><td colspan="3" rowspan="2">[SWS_DM_00754]</td><td colspan="1" rowspan="1">]</td></tr><tr><td colspan="2" rowspan="2">[SWS_DM_00776]</td><td colspan="1" rowspan="2"></td></tr><tr><td colspan="1" rowspan="3"></td><td colspan="1" rowspan="3">[SWS_DM_00792]][SWS_DM_00809]</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="3" rowspan="2">[SWS_DM_00802</td><td colspan="2" rowspan="1">SWS_DM_00802</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="2">[RS_Diag_04005]</td><td colspan="3" rowspan="2">Manage Security Access levelhandling</td><td colspan="1" rowspan="2"></td><td colspan="1" rowspan="2">[SWS_DM_00047][SWS_DM_00236][SWS_DM_00760][SWS_DM_00762][SWS_DM_00764][SWS_DM_00766]</td><td colspan="3" rowspan="2">[SWS_DM_00103][SWS_DM_00421][SWS_DM_00761][SWS_DM_00763][SWS_DM_00765][SWS_DM_00767]</td><td colspan="1" rowspan="1">」</td></tr><tr><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04006]</td><td colspan="3" rowspan="1">Manage session handling</td><td colspan="2" rowspan="1">[SWS_DM_00046][SWS_DM_00102][SWS_DM_00381][SWS_DM_00383]</td><td colspan="3" rowspan="1">[SWS_DM_00101]1[SWS_DM_00380]][SWS_DM_00382][SWS_DM_00842]</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04016]</td><td colspan="3" rowspan="1">Support "Busy handling" bysending a negative response0x78</td><td colspan="6" rowspan="1">[SWS_DM_00368][SWS_DM_00369]</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04019]</td><td colspan="3" rowspan="1">Provide confirmation aftertransmit diagnostic responses tothe application</td><td colspan="6" rowspan="1">[SWS_DM_00268][SWS_DM_00859]</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04020]</td><td colspan="3" rowspan="1">Suppress responses todiagnostic tool requests</td><td colspan="2" rowspan="1">[SWS_DM_00365][SWS_DM_00862]</td><td colspan="4" rowspan="1">[SWS_DM_00433]</td></tr><tr><td colspan="1" rowspan="1">[RS_ Diag_04033]</td><td colspan="3" rowspan="1">Support the upload/downloadservices for reading/writing datain an ECU in an extended andmanufacturer specific diagnosticsession</td><td colspan="6" rowspan="1">[SWS DM_00128][SWS_DM_00868][SWS_DM_00869][SWS_DM_00870][SWS_DM_00871][SWS_DM_00872]</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04059]</td><td colspan="3" rowspan="1">Configuration of timingparameters</td><td colspan="6" rowspan="1">[SWS_DM_NA]</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04063]</td><td colspan="3" rowspan="1">Process a dedicated eventidentifier for each monitoringpath to support an autonomoushandling of different events/faults</td><td colspan="6" rowspan="1">[SWS_DM_00007]</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04064]</td><td colspan="3" rowspan="1">Provide configurable buffer sizesfor storage of the events, statusinformation and environmentaldata</td><td colspan="6" rowspan="1">[SWS_DM_NA]</td></tr><tr><td colspan="1" rowspan="4">[RS_Diag_04067]</td><td colspan="2" rowspan="4">Provide the diagnostic statusinformation according to ISO14229-1</td><td colspan="2" rowspan="1">[SWS_DM_00061]</td><td colspan="1" rowspan="1">[SWS DM_00062]</td><td colspan="6" rowspan="4"></td></tr><tr><td colspan="2" rowspan="3">[SWS_DM_00063][SWS_DM_00244][SWS_DM_00246][SWS_DM_00371][SWS_DM_00373][SWS_DM_00658]</td><td colspan="6" rowspan="1">[SWS_DM_00217][SWS_DM_00245]</td></tr><tr><td colspan="6" rowspan="1">[SWS_DM_00370]</td></tr><tr><td colspan="6" rowspan="1">[SWS_DM_00372][SWS_DM_00374][SWS_DM_00659</td></tr><tr><td colspan="1" rowspan="9">[RS_Diag_04068]</td><td colspan="2" rowspan="9">The diagnostic in AUTOSARshall support event specificdebounce counters to improvesignal quality internally(According to ISO 14229-1Appendix D)</td><td colspan="2" rowspan="4">[SWS_DM_00013][SWS_DM_00021][SWS_DM_00023]][SWS_DM_00025][SWS_DM_00039]</td><td colspan="1" rowspan="1">[SWS_DM_00014][SWS_DM_00022]</td><td colspan="6" rowspan="3"></td></tr><tr><td colspan="6" rowspan="1">[SWS_DM_00024]</td></tr><tr><td colspan="6" rowspan="1">[SWS_DM_00029]</td></tr><tr><td colspan="1" rowspan="1">[SWS_DM_00040]</td><td colspan="6" rowspan="6"></td></tr><tr><td colspan="2" rowspan="1">[SWS_DM_00086]</td><td colspan="6" rowspan="1">[SWS_DM_00538]</td></tr><tr><td colspan="2" rowspan="1">[SWS_DM_00549]</td><td colspan="6" rowspan="1">[SWS_DM_00645]</td></tr><tr><td colspan="2" rowspan="3">[SWS_DM_00654][SWS_DM_00874][SWS_DM_00876][SWS_DM_00880]</td><td colspan="6" rowspan="1">[SWS_DM_00656][SWS_DM_00875]</td></tr><tr><td colspan="1" rowspan="1">M 00876</td><td colspan="5" rowspan="1">[SWS_DM_00879]</td></tr><tr><td colspan="6" rowspan="1"></td></tr><tr><td colspan="1" rowspan="5">[RS_Diag_04097]</td><td colspan="2" rowspan="5">Decentralized and modulardiagnostic configuration inapplications</td><td colspan="2" rowspan="2">SWS DM 0073</td><td colspan="7" rowspan="5">[SWS_DM_00849][SWS_DM_00905][SWS_DM_00908][SWS_DM_CONSTR_00394][SWS_DM_CONSTR_00395][SWS_DM_CONSTR_00396]</td></tr><tr><td colspan="5" rowspan="1">[SWS_DM_00572</td></tr><tr><td colspan="2" rowspan="1">[SWS_DM_00848]</td><td colspan="5" rowspan="1">[SWS_DM_00849]</td></tr><tr><td colspan="2" rowspan="1">S M </td><td colspan="5" rowspan="1">[SWS_DM_00903</td></tr><tr><td></td><td></td><td colspan="5" rowspan="1">[SWS_DM_00905</td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04105]</td><td colspan="2" rowspan="1">Event memory management</td><td colspan="2" rowspan="1">[SWS_DM_00148][SWS_DM_00657]</td><td colspan="1" rowspan="1">[SWS_DM_00150][SWS_DM_00664]</td><td colspan="6" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04109]</td><td colspan="2" rowspan="1">Provide an interface to retrievethe number of event memoryentries</td><td colspan="3" rowspan="1">[SWS_DM_00669][SWS DM_00670][SWS_DM_00902]</td><td colspan="6" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">[RS_Diag_04115]</td><td colspan="3" rowspan="1">The optional parameterDTCSettingControlOptionRecord as part of UDS serviceControlDTCSetting shall belimited to GroupOfDTC</td><td colspan="6" rowspan="1">[SWS_DM_00064][SWS_DM_00231]</td></tr><tr><td colspan="1" rowspan="9">[RS_Diag_04117]</td><td colspan="2" rowspan="9">Configurable behavior for DTCdeletion</td><td colspan="2" rowspan="1">[SWS DM_00064]</td><td colspan="1" rowspan="1">[SWS_DM_00065]</td><td colspan="6" rowspan="9">[SWS_DM_00124]_00082]</td></tr><tr><td colspan="2" rowspan="2">[SWS_DM_00091]</td><td colspan="6" rowspan="2">SWS DM 001922</td></tr><tr><td colspan="5" rowspan="4">[SWS_DM_00121]][SWS_DM_00123][SWS_DM_00144]</td></tr><tr><td colspan="4" rowspan="1">[SWS_DM_00122]</td></tr><tr><td colspan="4" rowspan="1">[SWS_DM_00124]</td></tr><tr><td colspan="2" rowspan="2">[SWS_DM_00146]</td><td colspan="4" rowspan="1">[SWS_DM_00145</td></tr><tr><td colspan="6" rowspan="1">[SWS_DM_00147</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="2" rowspan="1">[SWS_DM_00159]</td><td colspan="5" rowspan="1">[SWS_DM_00160]</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="2" rowspan="1">[SWS_DM_00896][SWS_DM_CONSTR</td><td colspan="5"></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=1>Description</td><td rowspan=1 colspan=4>Satisfied by</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04119]</td><td rowspan=1 colspan=1>Handle the execution ofdiagnostic services according tothe assigned diagnostic session</td><td rowspan=1 colspan=4>[SWS_DM_00046]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04120]</td><td rowspan=1 colspan=1>Support a predefined AddressAndLengthFormatIdentifier</td><td rowspan=1 colspan=4>[SWS_DM_00129][SWS_DM_00130]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04124]</td><td rowspan=1 colspan=1>Store the current debouncecounter value non-volatile toover a power-down cycle</td><td rowspan=1 colspan=4>[SWS_DM_00018][SWS_DM_00028]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04125]</td><td rowspan=1 colspan=1>Event debounce counter shall beconfigurable</td><td rowspan=1 colspan=4>[SWS_DM_00017][SWS_DM_00024][SWS_DM_00025][SWS_DM_00029][SWS_DM_00088][SWS_DM_00378][SWS_DM_00564][SWS_DM_00565][SWS_DM_00875][SWS_DM_00876][SWS_DM_00881][SWS_DM_00882]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04127]</td><td rowspan=1 colspan=1>Configurable record numbersand trigger options forDTCSnapshotRecords andDTCExtendedDataRecords</td><td rowspan=1 colspan=4>[SWS_DM_00893][SWS_DM_00895]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04133]</td><td rowspan=1 colspan=1>Aging for event memory entries</td><td rowspan=1 colspan=2>[SWS_DM_00237][SWS_DM_00239][SWS_DM_00241]</td><td rowspan=1 colspan=1>[SWS DM_00238][SWS_DM_00240][SWS_DM_00242]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04136]</td><td rowspan=1 colspan=1>Configurable &quot;confirmed&quot;threshold</td><td rowspan=1 colspan=4>[SWS_DM_00218]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04140]</td><td rowspan=1 colspan=1>Aging for UDS status bits&quot;confirmedDTC” and &quot;testFailedSinceLastClear&quot;</td><td rowspan=1 colspan=4>[SWS_DM_00243]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04148]</td><td rowspan=1 colspan=1>Provide capabilities to informapplications about diagnosticdata changes</td><td rowspan=1 colspan=4>[SWS_DM_00667][SWS_DM_00894]</td></tr><tr><td rowspan=2 colspan=1>[RS_Diag_04150]</td><td rowspan=2 colspan=1>Support the primary faultmemory defined by ISO 14229-1</td><td rowspan=2 colspan=2>[SWS_DM_00055][SWS_DM_00083][SWS_DM_00664][SWS_DM_CONSTR</td><td rowspan=1 colspan=1>[SWS_DM_00056][SWS_DM_00657]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00911]_00084]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=4 colspan=1>[RS_Diag_04151]</td><td rowspan=4 colspan=1>Event status handling</td><td rowspan=4 colspan=2>[SWS_DM_00213][SWS_DM_00644][SWS_DM_00647][SWS_DM_00649][SWS_DM_00655][SWS_DM_00659][SWS_DM_00884]</td><td rowspan=1 colspan=1>[SWS_DM_00643][SWS_DM_00646]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00648]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00652][SWS_DM_00658]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00883]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=7 colspan=1>[RS_Diag_04157]</td><td rowspan=7 colspan=1>Reporting of DTCs and relateddata</td><td rowspan=1 colspan=2>[SWS_DM_00058]</td><td rowspan=1 colspan=1>[SWS_DM_00061]</td><td rowspan=3 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00062]</td><td rowspan=1 colspan=1>[SWS_DM_00063]</td></tr><tr><td rowspan=3 colspan=2>[SWS_DM_00218][SWS_DM_00245][SWS_DM_00247]</td><td rowspan=1 colspan=1>[SWS_DM_00244]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00246]</td><td rowspan=4 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00370]</td></tr><tr><td rowspan=2 colspan=2>[SWS_DM_00371][SWS_DM_00373]</td><td rowspan=1 colspan=1>[SWS_DM_00372]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00374]</td></tr><tr><td rowspan=5 colspan=1>[RS_Diag_04159]</td><td rowspan=5 colspan=1>Control of DTC storage</td><td></td><td rowspan=1 colspan=1>[SWS_DM_00088]</td><td rowspan=1 colspan=1>[SWS_DM_00229]</td><td rowspan=5 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00378]</td><td rowspan=1 colspan=1>[SWS_DM_00565]</td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00663]</td><td rowspan=1 colspan=1>[SWS_DM_00672]</td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00673]</td><td rowspan=1 colspan=1>[SWS_DM_00674]</td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00909]</td><td rowspan=1 colspan=1>[SWS_DM_00910]</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=1>Description</td><td rowspan=1 colspan=6>Satisfied by</td></tr><tr><td rowspan=5 colspan=1>[RS_Diag_04160]</td><td rowspan=5 colspan=1>ResponseOnEvent according toISO 14229-1</td><td rowspan=3 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00491][</td><td rowspan=1 colspan=1>SWS_D</td><td rowspan=1 colspan=1>M_00492]</td><td rowspan=3 colspan=1></td></tr><tr><td rowspan=2 colspan=2>[SWS_DM_00493][SWS_DM_00495][</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00494]</td></tr><tr><td rowspan=1 colspan=1>SWS_D</td><td rowspan=1 colspan=1>M_00496]</td></tr><tr><td rowspan=2 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00497]</td><td rowspan=1 colspan=1>[SWS D</td><td rowspan=1 colspan=1>M 00498]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00499][SWS_DM_00501]</td><td rowspan=1 colspan=2>[SWS_DM_00500]</td></tr><tr><td rowspan=1 colspan=1>[RS Diag_04164]</td><td rowspan=1 colspan=1>Independent event memories formultiple diagnostic serverinstances (virtual ECUs)</td><td rowspan=1 colspan=6>[SWS DM_00657][SWS DM_00664]</td></tr><tr><td rowspan=6 colspan=1>[RS_Diag_04166]</td><td rowspan=6 colspan=1>Several tester conversations inparallel with assigned priorities</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00425]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00426]</td><td rowspan=3 colspan=1></td></tr><tr><td rowspan=5 colspan=1></td><td rowspan=5 colspan=2>[SWS_DM_00427][SWS_DM_00429][SWS_DM_00840][SWS_DM_00843][SWS_DM_00844][SWS_DM_00856]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00428]</td></tr><tr><td rowspan=2 colspan=1>[SWS_D[SWS_D</td><td rowspan=1 colspan=1>M_00430]</td></tr><tr><td rowspan=1 colspan=1>M_00841]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>DM 00843</td><td rowspan=1 colspan=1>[SWS</td><td rowspan=1 colspan=1>DM 00844</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=5 colspan=1>[RS_Diag_04167]</td><td rowspan=5 colspan=1>Conversation preemption/abortion</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00049]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00277]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00278]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00279]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=3 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00280]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00290]</td></tr><tr><td rowspan=2 colspan=2>[SWS_DM_00431][SWS_DM_00577]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00482]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00847]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=13 colspan=1>[RS_Diag_04168]</td><td rowspan=13 colspan=1>Adding of user-defined transportlayers</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS DM_00329]</td><td rowspan=1 colspan=1>[SWS D</td><td rowspan=1 colspan=1>M_00330]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00331]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00332]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00333]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00340]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00342]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00345]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00346]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00347]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00348]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00349]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=3 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00350]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00351]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00356]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00357]</td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00358]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00359]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00385]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00386]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00387]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00388]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00389]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00392]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00487]</td><td rowspan=1 colspan=2></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04169]</td><td rowspan=1 colspan=1>Provide an interface for externalUDS service processors.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=5>[SWS_DM_00865]</td></tr><tr><td rowspan=13 colspan=1>[RS_Diag_04170]</td><td rowspan=13 colspan=1>Provide connection specificmeta information to externalservice processors</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS DM_00294]</td><td rowspan=1 colspan=1>[SWS D</td><td rowspan=1 colspan=1>M_00302]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00554]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00555]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00556]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00591]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00592]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00593]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00596]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00598]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00618]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00636]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00637]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00640]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00692]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00764]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=2 colspan=2>[SWS_DM_00765][SWS_DM_00775]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00774]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00789]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00790]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00791]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00799]</td><td rowspan=1 colspan=1>[SWS_D</td><td rowspan=1 colspan=1>M_00800]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>[SWS_DM_00801]</td><td rowspan=1 colspan=2>[SWS_DM_00808]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04171]</td><td rowspan=1 colspan=1>Synchronous and asynchronousinteraction with external serviceprocessors</td><td rowspan=1 colspan=6>[SWS_DM_NA]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04172]</td><td rowspan=1 colspan=1>Inform external serviceprocessors about outcome ofthe final response</td><td rowspan=1 colspan=6>[SWS_DM_00859]</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=2>Description</td><td rowspan=1 colspan=9>Satisfied by</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04177]</td><td rowspan=1 colspan=2>Custom diagnostic services</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS DM_00502]</td><td rowspan=1 colspan=5></td></tr><tr><td rowspan=5 colspan=1>[RS_Diag_04178]</td><td rowspan=5 colspan=2>Support operation cyclesaccording to ISO 14229-1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS DM_00004]</td><td rowspan=1 colspan=4>[SWS_DM_00567]</td><td rowspan=2 colspan=1>]</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00750]</td><td rowspan=1 colspan=4>[SWS_DM_00751</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00752]</td><td rowspan=1 colspan=4>[SWS_DM_00753</td><td rowspan=1 colspan=1>]</td></tr><tr><td rowspan=2 colspan=4>[SWS_DM_00754][SWS_DM_00756][SWS_DM_00889][SWS_DM_00891][SWS_DM_CONSTR</td><td rowspan=1 colspan=2>DM 00754</td><td rowspan=1 colspan=4>[SWS_DM_00755]</td><td rowspan=1 colspan=1>]</td></tr><tr><td rowspan=1 colspan=5>[SWS_DM_00885][SWS_DM_00890][[SWS_DM_00892]_00168]</td></tr><tr><td rowspan=3 colspan=1>[RS Diag 04179]</td><td rowspan=3 colspan=2>Provide interfaces for monitoringapplication.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00007]</td><td rowspan=1 colspan=4>[SWS_DM_00540</td><td rowspan=2 colspan=1>]</td></tr><tr><td rowspan=2 colspan=4>[SWS_DM_00541][SWSDM_00543][SWS_DM_00549][SWS_DM_00873]</td><td rowspan=1 colspan=1>41</td><td rowspan=1 colspan=2>[S</td><td rowspan=1 colspan=3>[SWS_DM_00542]</td></tr><tr><td rowspan=1 colspan=5>[SWS_DM_00550]</td><td rowspan=1 colspan=2>NS_DM_00548</td></tr><tr><td rowspan=7 colspan=1>[RS_Diag_04180]</td><td rowspan=7 colspan=2>Process all UDS Servicesrelated to diagnostic faultmemory of ISO 14229-1internally</td><td rowspan=2 colspan=1></td><td rowspan=2 colspan=3>[SWS_DM_00062][SWS_DM_00091]</td><td rowspan=2 colspan=4>[SWS_DM_00090[SWS_DM_00092]</td><td rowspan=1 colspan=1>]</td></tr><tr><td rowspan=1 colspan=1>]</td></tr><tr><td rowspan=2 colspan=1></td><td rowspan=2 colspan=3>[SWS_DM_00115][SWS_DM_00163]</td><td rowspan=1 colspan=4>[SWS_DM_00162]</td><td rowspan=1 colspan=1>]</td></tr><tr><td rowspan=1 colspan=5>[SWS_DM_00164]</td></tr><tr><td rowspan=3 colspan=4>[SWS_DM_00217][SWS_DM_00229][SWS_DM_00245][SWS_DM_00247][SWS_DM_00371][SWS_DM_00373][SWS_DM_00909]</td><td rowspan=1 colspan=5>[SWS_DM_00218][SWS_DM_00244]</td></tr><tr><td rowspan=1 colspan=5>[SWS_DM_00246][SWS_DM_00370]</td></tr><tr><td></td><td rowspan=1 colspan=4>[SWS_DM_00374][SWS_DM_00910]</td><td rowspan=1 colspan=1>100372</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04182]</td><td rowspan=1 colspan=2>Provide an application interfaceto change operation cyclesstates</td><td rowspan=1 colspan=9>[SWS DM_00756][SWS_DM_00885]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04183]</td><td rowspan=1 colspan=2>Notify interested parties aboutevent status changes</td><td rowspan=1 colspan=4>[SWS_DM_00650][SWS_DM_00887]</td><td rowspan=1 colspan=5>[SWS_DM_00886]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04185]</td><td rowspan=1 colspan=2>Notify applications about theclearing of an event</td><td rowspan=1 colspan=9>[SWS_DM_00562]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04186]</td><td rowspan=1 colspan=2>Notify applications about thestart or restart of an operationcycle</td><td rowspan=1 colspan=9>[SWS_DM_00563][SWS_DM_00755]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04189]</td><td rowspan=1 colspan=2>Support a fine grainedconfiguration for SnapshotRecords and ExtendedDataRecords</td><td rowspan=1 colspan=9>[SWS_DM_00151]1[SWS_DM_00155]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04190]</td><td rowspan=1 colspan=2>Usage of internal data elementsin SnapshotRecords andExtendedDataRecords</td><td rowspan=1 colspan=9>[SWS DM_00017][SWS DM_00030][SWS_DM_00152][SWS_DM_00154]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04192]</td><td rowspan=1 colspan=2>Provide the ability to handleevent specific enable conditions</td><td rowspan=1 colspan=9>[SWS DM_00564][SWS_DM_00568][SWS_DM_00881][SWS_DM_00882]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04194]</td><td rowspan=1 colspan=2>ClearDTC shall be accessible forapplications</td><td rowspan=1 colspan=9>[SWS DM_00262][SWS_DM_00671][SWS_DM_00897][SWS_DM_00898][SWS_DM_00899][SWS_DM_00900][SWS_DM_00901]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04195]</td><td rowspan=1 colspan=2>Chronological reporting order ofthe DTCs located in theconfigured event memory</td><td rowspan=1 colspan=9>[SWS DM_NA]</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=7>Description</td><td rowspan=1 colspan=5>Satisfied by</td></tr><tr><td rowspan=18 colspan=1>[RS_Diag_04196]</td><td rowspan=2 colspan=7>UDS Service handling for alldiagnostic services defined in</td><td></td><td rowspan=1 colspan=1>[SWS_DM_00090]</td><td rowspan=1 colspan=2>[SWS_DM_00096]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00097]</td><td rowspan=1 colspan=2>[SWS_DM_00113]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=3 colspan=7>ISO 14229-2</td><td rowspan=1 colspan=4>14229-2</td><td rowspan=1 colspan=2>[SWS_DM_00114]</td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00127]</td><td rowspan=1 colspan=2>[SWS_DM_00128]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00134]</td><td rowspan=1 colspan=2>[SWS_DM_00137]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=13 colspan=7></td><td rowspan=1 colspan=2>[SWS_DM_00140]</td><td rowspan=1 colspan=2>[SWS_DM_00141]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00162]</td><td rowspan=1 colspan=2>[SWS_DM_00170]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00186]</td><td rowspan=1 colspan=2>[SWS_DM_00199]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00201]</td><td rowspan=1 colspan=2>[SWS_DM_00227]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00234]</td><td rowspan=1 colspan=2>[SWS_DM_00235]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00236]</td><td rowspan=1 colspan=2>[SWS_DM_00269]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00360]</td><td rowspan=1 colspan=2>[SWS_DM_00361]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00363]</td><td rowspan=1 colspan=2>[SWS_DM_00376]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00571]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0573]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00574]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0575]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00576]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0860]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00861</td><td rowspan=1 colspan=1>1[SWS_DM_0</td><td rowspan=1 colspan=1>0866]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1>[SWS_DM_00867]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=2 colspan=1>[RS_Diag_04197]</td><td rowspan=2 colspan=7>Clearing the user defined faultmemory</td><td></td><td rowspan=1 colspan=1>[SWS DM_00193]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0194]</td><td rowspan=2 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00195]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0208]</td></tr><tr><td rowspan=2 colspan=1>[RS Diag_04198]</td><td rowspan=2 colspan=7>Process all UDS Servicesrelated to session and securitymanagement of ISO 14229internally</td><td rowspan=1 colspan=2>[SWS DM_00226]</td><td rowspan=1 colspan=1>[SWS DM_0</td><td rowspan=1 colspan=1>0228]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=5></td></tr><tr><td rowspan=9 colspan=1>[RS_Diag_04199]</td><td rowspan=9 colspan=7>Provide a configurable UDSservice execution mechanism atruntime to decide if a UDSrequest shall be processed ornot</td><td></td><td rowspan=1 colspan=1>[SWS_DM_00111]</td><td rowspan=1 colspan=1>[SWS DM_0</td><td rowspan=1 colspan=1>0112]</td><td rowspan=3 colspan=1></td></tr><tr><td rowspan=2 colspan=2>t</td><td rowspan=2 colspan=2>[SWS_DM_00286]</td><td rowspan=2 colspan=1>[SWS_DM_0</td><td rowspan=2 colspan=1>0287]</td></tr><tr><td rowspan=1 colspan=2></td></tr><tr><td rowspan=2 colspan=2>[SWS_DM_00288][SWS_DM_00770]</td><td rowspan=1 colspan=1>[SWS DM 0</td><td rowspan=1 colspan=1>0289]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0771]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00772]</td><td rowspan=1 colspan=2>[SWS_DM_00773]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00774]</td><td rowspan=1 colspan=1>[SWS DM 0</td><td rowspan=1 colspan=1>0775]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00776]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0777]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00857]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0858]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04200]</td><td rowspan=1 colspan=7>Support event combination</td><td rowspan=1 colspan=2>[SWS DM_NA]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=2 colspan=1>[RS_Diag_04201]</td><td rowspan=2 colspan=7>Support a configuration toassign specific events to acustomer specific DTC</td><td rowspan=1 colspan=2>[SWS_DM_00060]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0642]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=4>[SWS_DM_00653][SWS_DM_CONSTR_00059]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04202]</td><td rowspan=1 colspan=7>Report DTCs getting active tothe error logging module/system</td><td rowspan=1 colspan=5>[SWS_DM_NA]</td></tr><tr><td rowspan=12 colspan=1>[RS Diag 04203]</td><td rowspan=12 colspan=7>Common checks on allsupported UDS ServicesRequests</td><td rowspan=1 colspan=2>[SWS_DM_00096]</td><td rowspan=1 colspan=1>[SWS DM 0</td><td rowspan=1 colspan=1>0098]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=5>vices</td><td rowspan=1 colspan=2>[SWS_DM_00099]]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0100]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=4></td><td rowspan=1 colspan=2>[SWS_DM_00101]</td><td rowspan=1 colspan=1>[SWS DM 0</td><td rowspan=1 colspan=1>0102]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00103]</td><td rowspan=1 colspan=1>[SWS_DM_0</td><td rowspan=1 colspan=1>0202]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00203]</td><td rowspan=1 colspan=2>[SWS_DM_00230]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=3></td><td rowspan=1 colspan=2>[SWS_DM_00231]</td><td rowspan=1 colspan=2>[SWS_DM_00252]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=3></td><td rowspan=1 colspan=2>[SWS_DM_00409]</td><td rowspan=1 colspan=2>[SWS_DM_00412]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00413]</td><td rowspan=1 colspan=2>[SWS_DM_00414]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00415]</td><td rowspan=1 colspan=2>[SWS_DM_00416]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00417]</td><td rowspan=1 colspan=2>[SWS_DM_00437]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00438][</td><td rowspan=1 colspan=2>SWS_DM_00439]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=2>[SWS_DM_00440]</td><td rowspan=1 colspan=2>[SWS_DM_00441]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Requirement</td><td rowspan=1 colspan=1>Description</td><td rowspan=1 colspan=6>Satisfied by</td></tr><tr><td rowspan=2 colspan=1></td><td rowspan=2 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00442][SWS_DM_00444]</td><td rowspan=1 colspan=1>[SWS_DM_00443][SWS_DM_00445]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00448][SWS_DM_00450][SWS_DM_00507][SWS_DM_00863][SWS_DM_00864]</td><td rowspan=1 colspan=1>[SWS_DM_00447</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=2 colspan=1>[RS_Diag_04204]</td><td rowspan=2 colspan=1>Provide the current status ofeach warning indicator.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00221]</td><td rowspan=1 colspan=1>[SWS_DM_00223]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=6>[SWS_DM_00224][SWS_DM_00740][SWS_DM_00742][SWS_DM_00743][SWS_DM_00744][SWS_DM_00745][SWS_DM_00888]</td><td rowspan=1 colspan=1>[SWS_DM_00651]</td><td rowspan=1 colspan=1>[SWS DM _0074</td></tr><tr><td rowspan=2 colspan=1>[RS_Diag_04205]</td><td rowspan=2 colspan=1>Support of SnapshotRecords</td><td rowspan=1 colspan=1></td><td rowspan=2 colspan=4>[SWS_DM_00151][SWS_DM_00152][SWS_DM_00660][SWS_DM_00661][SWS_DM_00662][SWS_DM_00668][SWS_DM_00893]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04206]</td><td rowspan=1 colspan=1>Support of ExtendedDataRecords</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00154][SWS_DM_00895]</td><td rowspan=1 colspan=2>[SWS_DM_00155]</td></tr><tr><td rowspan=3 colspan=1>[RS Diag 04208]</td><td rowspan=3 colspan=1>Inform the application aboutdiagnostic session anddiagnostic security level changeson each tester connection.</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00270][SWS_DM_00272]</td><td rowspan=1 colspan=1>[SWS_DM_00271][SWS_DM_00478]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=2 colspan=4>[SWS_DM_00479][SWS_DM_00845][SWS_DM_CONSTR</td><td rowspan=2 colspan=1>[SWS_DM_00480][SWS_DM_00846]_00208]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04211]</td><td rowspan=1 colspan=1>Persistent storage of DTC statusand environmental data</td><td rowspan=1 colspan=6>[SWS_DM_00148][SWS_DM_00150]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04214]</td><td rowspan=1 colspan=1>Support the user defined faultmemories defined by ISO14229-1</td><td rowspan=1 colspan=4>[SWS_DM_00055][SWS_DM_00083][SWS_DM_CONSTR</td><td rowspan=1 colspan=2>[SWS_DM_00057][SWS_DM_00911]_00084]</td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04216]</td><td rowspan=1 colspan=1>Support for multiple DiagnosticServer Instances</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>[SWS_DM_00390][SWS_DM_00420]</td><td rowspan=1 colspan=1>[SWS_DM_00391]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[RS_Diag_04218]</td><td rowspan=1 colspan=1>Support of UDS service 0x2FInputOutputControlByIDentifier</td><td rowspan=1 colspan=6>[SWS_DM_NA]</td></tr><tr><td rowspan=12 colspan=1>[RS Diag 04224]</td><td rowspan=12 colspan=1>Support the UDS service 0x31(RoutineControl) according toISO 14229-1</td><td></td><td rowspan=1 colspan=3>[SWS_DM_00201]1</td><td rowspan=1 colspan=1>[SWS_DM_00202]</td><td rowspan=2 colspan=1>]</td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00203]</td><td rowspan=1 colspan=1>[SWS_DM_00437</td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00448]</td><td rowspan=1 colspan=1>[SWS_DM_00551]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00552]</td><td rowspan=1 colspan=1>[SWS_DM_00553]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00554]</td><td rowspan=1 colspan=1>[SWS_DM_00555]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00556]</td><td rowspan=1 colspan=1>[SWS_DM_00557]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=3 colspan=1>[SWS_</td><td></td><td></td><td></td><td></td></tr><tr><td></td><td rowspan=2 colspan=1></td><td></td><td></td><td></td></tr><tr><td></td><td rowspan=1 colspan=2>DM_00574]</td><td rowspan=1 colspan=1>[SWS_DM_00575]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00576]</td><td rowspan=1 colspan=1>[SWS_DM_00591]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00592]</td><td rowspan=1 colspan=1>[SWS_DM_00593]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00594]</td><td rowspan=1 colspan=1>[SWS_DM_00605]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=10 colspan=1>[RS_Diag_04225]</td><td rowspan=10 colspan=1>The diagnostic in AUTOSARshall support event specific timebase debounce counters</td><td></td><td rowspan=1 colspan=3>[SWS DM_00015]</td><td rowspan=1 colspan=1>[SWS DM_00030]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=2 colspan=4>[SWS_DM_00032][SWS_DM_00035]</td><td rowspan=1 colspan=1>[SWS_DM_00033]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00036]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=4>[SWS_DM_00038]</td><td rowspan=1 colspan=1>[SWS_DM_00039]</td><td rowspan=2 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00040]</td><td rowspan=1 colspan=1>[SWS_DM_00085]</td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00086]</td><td rowspan=1 colspan=1>[SWS_DM_00539]</td><td rowspan=1 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00550]</td><td rowspan=1 colspan=1>[SWS_DM_00645]</td><td rowspan=3 colspan=1></td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00654]</td><td rowspan=1 colspan=1>[SWS_DM_00877]</td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00878]</td><td rowspan=1 colspan=1>[SWS_DM_00879]</td></tr><tr><td></td><td rowspan=1 colspan=3>[SWS_DM_00880]</td><td rowspan=1 colspan=2></td></tr></table>

<table><tr><td>Requirement</td><td>Description</td><td colspan="3">Satisfied by</td></tr><tr><td>[RS_Diag_04242]</td><td rowspan="8">The DolP module shall support</td><td rowspan="8"></td><td>[SWS_DM_00815]</td><td>[SWS DM_00816] [SWS_DM_00820][SWS_DM_00821]</td></tr><tr><td>Vehicle Internal Testers.</td><td>[SWS_DM_00822]</td></tr><tr><td></td><td>[SWS_DM_00830]</td></tr><tr><td>[SWS_DM_00831]</td><td>[SWS_DM_00832]</td></tr><tr><td>[SWS_DM_00833]</td><td>[SWS_DM_00834]</td></tr><tr><td>[SWS_DM_00835]</td><td>[SWS_DM_00836]</td></tr><tr><td>[SWS_DM_00837]</td><td></td></tr><tr><td>[SWS_DM_00165]</td><td></td></tr><tr><td rowspan="6">[SRS_Diag_04180] [SRS_Eth_00026]</td><td rowspan="6">No description No description</td><td>[SWS_DM_00449]</td><td></td><td>[SWS_DM_00720]</td></tr><tr><td>[SWS_DM_00721]</td><td></td><td>[SWS_DM_00722]</td></tr><tr><td>[SWS_DM_00723]</td><td></td><td>[SWS_DM_00724]</td></tr><tr><td></td><td></td><td></td></tr><tr><td>[SWS_DM_00725]</td><td></td><td>[SWS_DM_00726]</td></tr><tr><td>[SWS_DM_00855]</td><td></td><td>[SWS_DM_00813][SWS_DM_00814]</td></tr><tr><td>[SRS_Eth_00027]</td><td>No description</td><td>[SWS_DM_CONSTR_00206] [SWS_DM_00449]</td><td></td></tr><tr><td>[SRS_Eth_00080]</td><td>No description</td><td>[SWS_DM_00449] [SWS_DM_00731]</td><td></td><td>[SWS_DM_00730] [SWS_DM_00732]</td></tr><tr><td></td><td></td><td>[SWS_DM_00735]</td><td>[SWS_DM_00733]</td><td>[SWS_DM_00734] [SWS_DM_00736]</td></tr><tr><td>[SRS_Eth_00082]</td><td>No description</td><td></td><td>[SWS_DM_00814]</td><td></td></tr><tr><td>[SRS_Eth_00083]</td><td>No description</td><td>[SWS_DM_00005]]</td><td>[SWS_DM_00449]</td><td>[SWS_DM_00449]</td></tr><tr><td>[SRS_Eth_00084]</td><td>No description</td><td></td><td>[SWS_DM_00449]</td><td></td></tr></table>

## 6.1 Not applicable requirements

[SWS\_DM\_NA]{DRAFT} dThese requirements are not applicable as they are not within the scope of this release.c(RS\_Diag\_04059, RS\_Diag\_04064, RS\_Diag\_04171, RS\_Diag\_04195, RS\_Diag\_04200, RS\_Diag\_04202, RS\_Diag\_04218)

## 7 Functional specification

The functionality of DM is split into two layers: the UDS Transport Layer and the Application Layer. On the UDS Transport Layer, DM handles connections to Diagnostic Clients via standardized or user defined UDS Transport Protocols, see section 7.1 for details. The subcomponent of DM implementing a particular Transport Protocol is called a Transport Protocol Handler.

On the Application Layer, DM implements the two main building blocks of diagnostics: Diagnostic Event Management and Diagnostic Communication Management, both according to UDS ISO 14229-1[1]. On AUTOSAR adaptive platform the Application Layer can be split into multiple SoftwareClusters, each with its own diagnostic address. Accordingly, DM instantiates for each SoftwareCluster a Diagnostic Server that implements diagnostics with scope given by this SoftwareCluster, see section 7.2.

The link between the UDS Transport Layer and the Application Layer is implemented by the Transport Protocol Manager ( see subsection 8.1.4 “UdsTransportProtocolMgr Class”.), which dispatches UDS messages in both directions: UDS requests from Diagnostic Clients are forwarded to the respective responsible Diagnostic Server Instance, and UDS responses created by Diagnostic Server Instance are dispatched towards the respective Transport Protocol Handler ( see subsection 8.1.3 “UdsTransportProtocolHandler Class”.) that handles the connection to the Diagnostic Client.

A broad subcomponent view on DM is given as follows:

![](./images/c01_2baebccd70ebbff3af3b4ec8fbe01552991a24ed32fbf063ab2b5d25c7bb6585.jpg)  
Figure 7.1: Component view on Diagnostic Management

## 7.1 UDS Transport Layer

Since there exist standardized as well as OEM specific UDS Transport Layers, the DM supports a standardized C++ API (called Transport Protocol API) where different kinds of UDS Transport Layers can be connected. Currently the Adaptive Platform only provides a detailed description of Ethernet-based network technologies, which mandates support of DoIP [4]. It is very likely, that upcoming releases of the DM will also detail CAN, CAN-FD, FR, ... networks. The Transport Protocol API allows for extensions of DM towards not-yet-detailed and proprietary UDS Transport Protocols.

## 7.1.1 Support of proprietary UDS Transport Layer

The UDS Transport Protocol API is formally described in section 8.1. This section describes the required interaction of the components using this API. Each (proprietary) UDS Transport Protocol implementation subclasses the abstract class UdsTransportProtocolHandler, which shall be provided by DM according to [ SWS\_DM\_00315].

## 7.1.1.1 Initialization, Starting and Stopping of a proprietary UDS TransportLayer

[SWS_DM_00329]{DRAFT} Lifecycle management of an Uds Transport Protocol implementation dThe lifecycle of an Uds Transport Protocol implementation shall be managed by the DM in the following order:

• Creation of Uds Transport Protocol implementation by calling its constructor (see [SWS_DM_09015]).

• Initializing of Uds Transport Protocol implementation by calling Initialize (see [SWS_DM_00319])

• Starting of Uds Transport Protocol implementation by calling Start (see [SWS_DM_00322])

• Stopping of Uds Transport Protocol implementation by calling Stop (see [SWS_DM_00323])

c(RS\_Diag\_04168)

[SWS_DM_00330]{DRAFT} Construction of an Uds Transport Protocol implementation dThe DM shall call the specific constructor of the Uds Transport Protocol implementation, where the argument handler\_id is unique among all by DM instantiated Uds Transport Protocol implementations and the transport\_protocol\_mgr is set to the reference of the instance of UdsTransportProtocolMgr (see [SWS_DM_00306]) provided by DM.c(RS\_Diag\_04168)

[SWS_DM_00331]{DRAFT} Initialization of an Uds Transport Protocol implementation dThe DM shall call the Initialize (see [SWS_DM_00319]) method of the Uds Transport Protocol implementation during startup/initialization phase, before reporting ApplicationState.kRunning to the execution management.c(RS\_- Diag\_04168)

[SWS_DM_00332]{DRAFT} Starting of an Uds Transport Protocol implementation dThe DM shall call the Start (see [SWS_DM_00322]) method of the Uds Transport Protocol implementation during startup/initialization phase, before reporting ApplicationState.kRunning to the execution management and after call to Initialize has returned.c(RS\_Diag\_04168)

[SWS_DM_00333]{DRAFT} Stopping of an Uds Transport Protocol implementation dThe DM shall call the Stop (see [SWS_DM_00323]) method of each Uds

Transport Protocol implementation, it has started, if it is switching to state ApplicationState.kTerminating.c(RS\_Diag\_04168)

[SWS_DM_00340]{DRAFT} Waiting for Stop confirmation dAfter having called Stop method of any Uds Transport Protocol implementation, it shall wait for the corresponding HandlerStopped (see [SWS_DM_00314]) callback with the related handler\_id, before it finally terminates the process.c(RS\_Diag\_04168)

## 7.1.1.2 UDS message reception on a proprietary UDS TransportLayer

[SWS_DM_00342]{DRAFT} Indication of UDS message reception dUds Transport Protocol implementation shall call IndicateMessage ([SWS_DM_00309]) on its UdsTransportProtocolMgr reference ((see [SWS_DM_00330])), as soon as it has at least the following information of an incoming UDS request available:

• UDS source address of the request.

• UDS target address of the request.

• Type of the UDS target address (physical or functional)

• Size of the entire UDS message starting from SID

c(RS\_Diag\_04168)

[SWS_DM_00347]{DRAFT} Channel identification in Indication dUds Transport Protocol implementation shall determine a distinct identifier to identify the network specific channel over which the UDS request has been received, which can be later used to deliver the UDS response to the source of the UDS request.c(RS\_Diag\_04168)

Note: A diagnostic client has basically two address parts which together serve for its unique identification:

• The UDS source address (SA) in the clients/testers request which represent a technology/transport layer independent part.

• The technology/transport layer specific/dependent network endpoint source address, from which the request from the client originates. In Ethernet-based networks this typically is an IP-address/port number pair, while in CAN networks it is the CAN identifier of the CAN-TP message used by the client. In UDS on CAN (ISO ISO-15765-2[10]) contrary to DoIP, the SA is not explicitly transmitted, but directly deduced from the CAN identifier of the CAN-TP message. That means on CAN we do not have two separate address parts, only the network endpoint source address part is used for identification.

The side effect of this is that from the viewpoint of Diagnostic Server, which supports parallel Diagnostic Clients, it is a perfectly valid scenario that two Diagnostic Clients with the same UDS SA can be active in parallel if they originate from different/distinguishable network endpoints.

[SWS_DM_00385]{DRAFT} Acceptance of UDS message reception dIf the DM is able to process the indicated request, it shall return a std::pair with IndicationResult set to kIndicationOk and a UdsMessagePtr, which owns a valid UdsMessage object, with a capacity of so many bytes, the DM wants to process of the indicated request. The minimum size of the UdsMessage object shall be one byte.c (RS\_Diag\_04168)

Note: For details about std::pair see [SWS_DM_00309].

[SWS_DM_00392]{DRAFT} Properties of returned UdsMessage dIf the DM accepted the UDS message reception, the returned UdsMessage owned by UdsMessagePtr shall return a ByteVector from GetPayload, which shall be empty (i.e. empty() returns true, size() returns 0).c(RS\_Diag\_04168)

Note: In the normal case, where DM accepts the complete UDS request for processing, it will provide a std::pair with IndicationResult set to kIndicationOk and a UdsMessagePtr, which owns a valid UdsMessage object, with the capacity equal (or greater) to parameter Size indicated by Uds Transport Protocol implementation. There are use cases (typically for negative responses), where the DM does NOT need the entire UDS request message data to generate the UDS response and therefore might return a UdsMessagePtr, which owns a valid UdsMessage object, with a capacity smaller than the indicated parameter Size. E.g. this is useful e.g. in the case, where DM is busy and wants to ignore/reject a second parallel request. For declining a second request WITH sending a negative response according to [SWS_DM_00049], the DM would return an UdsMessagePtr with only enough capacity to be able to construct a valid negative response.

[SWS_DM_00386]{DRAFT} Ignoring UDS message reception because DM is busy dIf the DM is busy and not able to process the indicated UDS request, it shall return a std::pair with IndicationResult set to kIndicationOccupied and a UdsMessagePtr equal to UdsMessagePtr(nullptr).c(RS\_Diag\_04168)

Note: For details about std::pair see [SWS_DM_00309].

Note: For declining/ignoring a second request without sending a negative response according to [SWS_DM_00290], the DM would choose this behavior.

[SWS_DM_00387]{DRAFT} Ignoring UDS message reception because DM has no (memory) ressources dIf the DM is not able to process the indicated UDS request, because it has not enough (memory) resources to hold the indicated UDS request, it shall return a std::pair with IndicationResult set to kIndicationOverflow and a UdsMessagePtr equal to UdsMessagePtr(nullptr).c(RS\_Diag\_04168)

Note: For details about std::pair see [SWS_DM_00309].

Note: There might exist Uds Transport Protocol implementations, which make NO distinction between [SWS_DM_00386] and [SWS_DM_00387]. I.e. regardless, whether the DM returns a kIndicationOverflow or kIndicationOccupied, the behavior on transport layer level is the same. But, for instance, a CanTP Uds Transport Protocol implementation, would explicitly react on a kIndicationOverflow with sending a FC.OFLW on CanTP level to the UDS request sender.

[SWS_DM_00487]{DRAFT} Ignoring UDS message reception because of unknown target address dIf the DM is not able to process the indicated UDS request, because the indicated target address is unknown to DM, it shall return a std::pair with IndicationResult set to kIndicationUnknownTargetAddress and a UdsMessagePtr equal to UdsMessagePtr(nullptr).c(RS\_Diag\_04168)

Note: For details about std::pair see [SWS_DM_00309].

[SWS_DM_00388]{DRAFT} Filling provided UdsMessage dIf the DM returned kIndicationOK from the IndicateMessage, the Uds Transport Protocol implementation shall fill the UdsMessage owned by UdsMessagePtr from the received UDS request starting from SID up to either UdsMessage full capacity or up to the entire received UDS request message, whatever happens first.c(RS\_Diag\_04168)

[SWS_DM_00345]{DRAFT} Forwarding of UDS message dIf the Uds Transport Protocol implementation has filled the payload of the returned UdsMessagePtr, it shall call HandleMessage ([SWS_DM_00311]) on its UdsTransportProtocolMgr reference ((see [SWS_DM_00330]) with the returned UdsMessagePtr as argument.c (RS\_Diag\_04168)

[SWS_DM_00389]{DRAFT} Skipping Forwarding of UDS message dIf the DM returned a IndicationResult NOT equal to kIndicationOK from the IndicateMessage, the Uds Transport Protocol implementation shall NOT call HandleMessage.c(RS\_Diag\_04168)

[SWS_DM_00346]{DRAFT} Aborting of UDS message dIf the Uds Transport Protocol implementation has already called IndicateMessage (see [SWS_DM_00342]), but is not willing to call HandleMessage (maybe due to errors receiving the entire/remaining UDS request), it shall notify DM by calling NotifyMessageFailure ([SWS_DM_00310]) on its UdsTransportProtocolMgr reference ((see [SWS_DM_00330]) with the returned UdsMessagePtr as argument.c (RS\_Diag\_04168)

## 7.1.1.3 UDS message transmission on a proprietary UDS TransportLayer

[SWS_DM_00348]{DRAFT} Transmission of UDS response message dDM shall send a diagnostic response UDS message to the same Uds Transport Protocol implementation, where it has received the UDS request message (see [SWS_DM_00345]) by calling the Transmit (see [SWS_DM_00327]) method of the Uds Transport Protocol implementation.c(RS\_Diag\_04168)

[SWS_DM_00349]{DRAFT} Reuse channel identifier of Indication dDM shall set the argument channel\_id in the Transmit call to the same value as in the Indication of the corresponding UDS request message (see [SWS_DM_00347]).c(RS\_Diag\_04168)

[SWS_DM_00350]{DRAFT} Confirmation of UDS message transmission dWhen the Uds Transport Protocol implementation has a final feedback of the network layer, whether the UDS message triggered for transmission (see [SWS_DM_00348]) could be sent on the network or not, it shall notify DM by calling TransmitConfirmation ([SWS_DM_00312]) on its UdsTransportProtocolMgr reference ((see [SWS_DM_00330]) setting the message argument to the message parameter of the Transmit call ([SWS_DM_00348]).c(RS\_Diag\_04168)

[SWS_DM_00351]{DRAFT} Confirmation Result dWhen the the network layer was able to send the UDS response message to the network, the result argument in the TransmitConfirmation shall be set to kTransmitOk, otherwise to kTransmit-Failed.c(RS\_Diag\_04168)

## 7.1.1.4 Channel Notifications

Each incoming UDS request message is assigned an exact Uds Transport Protocol implementation specific Channel. With the normal request/reply paradigm in diagnostics, the UDS response message is sent out at the same Channel, from which the UDS request has been received. Therefore the Channel identifier is given to the DM in IndicateMessage (see [SWS_DM_00309]) in the form of parameter global\_channel\_id. The Channel part from this parameter is then used in the corresponding response in Transmit (see [SWS_DM_00327]).

There are use cases, where a diagnostic request might be answered deferred after the restart of the DM. The UDS service for ECU reset is a candidate for such a requirement. The upcoming requirements shall cover this use case.

[SWS_DM_00356]{DRAFT} Requesting Notification of a channel reestablishment dThe DM shall call the NotifyReestablishment (see [SWS_DM_00326]) method of a Uds Transport Protocol implementation, with the parameter channel\_id set to the identifier of the Channel, where it needs a re-establishment notification.c(RS\_- Diag\_04168)

[SWS_DM_00357]{DRAFT} Validity/lifetime of a Notification Request dA notification request registered at a Uds Transport Protocol implementation according to [SWS_DM_00356] is valid only for the next call to Start until the following call to Stop of this Uds Transport Protocol implementation.c(RS\_Diag\_04168)

[SWS_DM_00358]{DRAFT} Notification of a channel reestablishment dUds Transport Protocol implementation shall call ChannelReestablished on its UdsTransportProtocolMgr reference ((see [SWS_DM_00330]) setting the global\_channel\_id argument to the tuple consisting of its own handler\_id and the ChannelID it has received in NotifyReestablishment (see [SWS_DM_00356]) once, in case it detects, that the underlying network Channel represented by ChannelID is getting available again.c(RS\_Diag\_04168)

[SWS_DM_00359]{DRAFT} Persistent Storage of Notification Request dUds Transport Protocol implementation shall store the notification request (see [SWS_DM_00356]) persistently, to be able to fulfill the notification even after a DM restart.c(RS\_Diag\_04168)

## 7.1.2 DoIP

[SWS_DM_00005]{DRAFT} DoIP Support dDM shall implement/provide a UDS Transport Layer implementation on Ethernet compliant with ISO-13400[4], also called DoIP.c (SRS\_Eth\_00083)

[SWS_DM_00475]{DRAFT} DoIP Version dDM shall support following version of the DoIP ISO 13400-2 specification: 2020.c()

Note: According to the ISO 13400-2[11] specification, the DoIP entity shall support protocol version = 0xFF in the vehicle identification request message.

[SWS_DM_00449]{DRAFT} Supported DoIP message types dDM shall support the DoIP message types listed in Table 7.1.c(SRS\_Eth\_00026, SRS\_Eth\_00080, SRS\_- Eth\_00082, SRS\_Eth\_00083, SRS\_Eth\_00084, SRS\_Eth\_00027)

<table><tr><td rowspan=1 colspan=1>Payload type value</td><td rowspan=1 colspan=1>Payload type Name</td></tr><tr><td rowspan=1 colspan=1>0x0000</td><td rowspan=1 colspan=1>Generic DolP header negative acknowledge</td></tr><tr><td rowspan=1 colspan=1>0x0001</td><td rowspan=1 colspan=1>Vehicle identification</td></tr><tr><td rowspan=1 colspan=1>0x0002</td><td rowspan=1 colspan=1>Vehicle identification request message with EID</td></tr><tr><td rowspan=1 colspan=1>0x0003</td><td rowspan=1 colspan=1>Vehicle identification request message with VIN</td></tr><tr><td rowspan=1 colspan=1>0x0004</td><td rowspan=1 colspan=1>Vehicle announcement message/vehicle identification response message</td></tr><tr><td rowspan=1 colspan=1>0x0005</td><td rowspan=1 colspan=1>Routing activation request</td></tr><tr><td rowspan=1 colspan=1>0x0006</td><td rowspan=1 colspan=1>Routing activation response</td></tr><tr><td rowspan=1 colspan=1>0x0007</td><td rowspan=1 colspan=1>Alive check request</td></tr><tr><td rowspan=1 colspan=1>0x0008</td><td rowspan=1 colspan=1>Alive check response</td></tr><tr><td rowspan=1 colspan=1>0x4001</td><td rowspan=1 colspan=1>DolP entity status request</td></tr><tr><td rowspan=1 colspan=1>0x4002</td><td rowspan=1 colspan=1>DolP entity status response</td></tr><tr><td rowspan=1 colspan=1>0x4003</td><td rowspan=1 colspan=1>Diagnostic power mode information request</td></tr><tr><td rowspan=1 colspan=1>0x4004</td><td rowspan=1 colspan=1>Diagnostic power mode information response</td></tr><tr><td rowspan=1 colspan=1>0x8001</td><td rowspan=1 colspan=1>Diagnostic message</td></tr><tr><td rowspan=1 colspan=1>0x8002</td><td rowspan=1 colspan=1>Diagnostic message positive acknowledgement</td></tr><tr><td rowspan=1 colspan=1>0x8003</td><td rowspan=1 colspan=1>Diagnostic message negative acknowledgement</td></tr></table>

Table 7.1: Supported DoIp message types

[SWS_DM_00855]{DRAFT} Providing the VIN in DoIP protocol messages dIf the DM needs to know VIN to be able to react or answer on some DoIP messages, it shall obtain it according to [SWS_DM_00903].c(SRS\_Eth\_00026)

[SWS_DM_00814]{DRAFT} Providing the PowerMode in DoIP protocol messages dIf the DM needs to know the PowerMode to be able to react or answer on any DoIP message, it shall obtain it by calling the method ara::diag::DoIPPowerMode::GetDoIPPowerMode() ([SWS_DM_00734]).c(SRS\_Eth\_- 00026, SRS\_Eth\_00080)

[SWS_DM_00813]{DRAFT} Providing the GID in DoIP protocol messages dIf the DM needs to know the GID and the status of the GID to be able to react or answer on any DoIP message, it shall obtain it by calling the method ara::diag::DoIPGroupIdentification::GetGidStatus() ([SWS_DM_00724]).c(SRS\_Eth\_- 00026)

[SWS_DM_00815]{DRAFT} When to send Vehicle announcement messages on interfaces without activation line control dThe DM gets notified, when to send out vehicle announcement messages on a network interface without activation line control (isActivationLineDependent == FALSE) by a call to method diag::DoIPTriggerVehicleAnnouncement::TriggerVehicleAnnouncement() ([SWS_DM_00822]), which DM has to provide. The method call contains the network interface identified via networkInterfaceId on which the announcement shall be sent.c(RS\_Diag\_04242)

[SWS_DM_00816]{DRAFT} Notification of activation line status change on activation line controlled network interfaces dThe DM gets notified, when the activation line status changes for activation line controlled network interfaces (isActivationLineDependent == TRUE) via software components providing an instance of DiagnosticDoIPActivationLineInterface. The DM shall identify for which network interface an instance of Diagnostic-DoIPActivationLineInterface is providing the activation line status via call to method diag::DoIPTriggerVehicleAnnouncement::GetNetworkInterfaceId() ([SWS_DM_00833]). Whenever the status of the activation line of the related network interface changes, the application calls diag::DoIPTriggerVehicleAnnouncement::UpdateActivationLineState() ([SWS_DM_00834]).c(RS\_Diag\_04242)

## 7.1.3 Dispatching of UDS Requests

The Transport Protocol Manager has to dispatch the UDS-messages between the Transport Protocol Handler and the Diagnostic Server instances. To do this the Transport Protocol Manager uses the following information as provided by the Transport Protocol Handler indication function on received UDS requests:

• Target Address

• Target Address Type (phys / func)

In transmit direction the Transport Protocol Manager provides the UDS message from the Diagnostic Server and calls the Transmit method from the Transport Protocol Handler.

[SWS_DM_00390]{DRAFT} Dispatching physical Request dDM shall dispatch each UDS physical request to the Diagnostic Server instance responsible for the SoftwareCluster with diagnosticAddress matching the TargetAddress of the received UDS request and addressSemantics set to physicalAddress.c(RS\_- Diag\_04216)

[SWS_DM_00391]{DRAFT} Dispatching functional Request dDM shall dispatch each UDS functional request to all Diagnostic Server instances responsible for those SoftwareClusters with a diagnosticAddress matching the TargetAddress of the received UDS request and addressSemantics set to functionalAddress.c (RS\_Diag\_04216)

## 7.2 Diagnostic Server

The AUTOSAR adaptive platform is able to be extended with new software packages without re-flashing the entire ECU. The individual software packages are described by SoftwareClusters. To support the current approaches of diagnostic management (like software updates), each SoftwareCluster has its own diagnosticAddresses. For details on the semantics and precise configuration of SoftwareClusters, see [12].

DM is intended to support an own Diagnostic Server instance per installed SoftwareCluster. All Diagnostic Server instances share the same UDS TransportLayer (see Figure 7.1) and each Diagnostic Server manages its own resources.

[SWS_DM_00420]{DRAFT} Instantiation of Diagnostic Server dDM shall instantiate an independent Diagnostic Server per configured SoftwareCluster which references a DiagnosticContributionSet in the role of diagnosticExtract with dedicated resources and functionality configured by this DiagnosticContributionSet.c(RS\_Diag\_04216)

Details on required configuration items are described in section 7.2.3.

This chapter focuses on requirements concerning a single Diagnostic Server, hence we assume that

• requests from Diagnostic Clients are already dispatched towards this Diagnostic Server according to [SWS_DM_00390] and [SWS_DM_00391],

• DEXT configuration elements used in a requirement are meant to be part of the DiagnosticContributionSet associated to the Diagnostic Server according to [SWS_DM_00420].

In particular, we note that requests addressing different SoftwareClusters shall be processed independently by the respective Diagnostic Servers.

## 7.2.1 Diagnostic Communication Management

A central element in the handling of diagnostic communication is the term Diagnostic Conversation, which is described in section 7.2.1.1. A UDS request is always processed in the context of a Diagnostic Conversation. A single Diagnostic Server can handle multiple Diagnostic Conversations in parallel. In contrast to Classic Platform, Adaptive Platform provides two different modes of parallelism: fully and pseudo parallel mode.

## 7.2.1.1 Diagnostic Conversations

A Diagnostic Conversation depicts a conversation between a distinct Diagnostic Client and a Diagnostic Server instance. In contrast to CP, on AP the details of connections between Diagnostic Clients and Diagnostic Server instances are not statically configured, but a Diagnostic Conversation is dynamically allocated during run-time of the Diagnostic Server instance.

For an incoming UDS request, the Diagnostic Server instance is identified via the target address of the UDS request (see [SWS_DM_00390], [SWS_DM_00391]), whereas the identification of the Diagnostic Client is transport layer specific.

[SWS_DM_00421]{DRAFT} Identification of a Diagnostic Client dThe Diagnostic Server instance shall identify a Diagnostic Client by means of the tuple of source\_addr and gobal\_channel\_id provided by the TP Layer on call of IndicateMessage, see [SWS_DM_00347].c(RS\_Diag\_04005)

[SWS_DM_00046]{DRAFT} Each Diagnostic Conversation has its own session resources dThe Diagnostic Server instance shall provide each Diagnostic Conversation with its own and independently managed diagnostic session, which can be any valid UDS session type.c(RS\_Diag\_04119, RS\_Diag\_04006)

[SWS_DM_00047]{DRAFT} Each Diagnostic Conversation has its own security-level resources dThe Diagnostic Server instance shall provide each Diagnostic Conversation with its own and independently managed securitylevel.c(RS\_Diag\_04005)

## 7.2.1.1.1 Parallel Client Handling Variants

There are generally various approaches for a server (which the Diagnostic Server instance implements) how to handle parallel/concurrent client requests. The ISO 14229-1[1] does not prescribe a certain approach, because different variants of parallelism also require different amount of resources available within an ECU. Since the ISO 14229-1 also needs to support ECUs which are low on resources, it allows for greater flexibility in terms of supported parallelism.

Pseudo Parallel Mode The characteristic of this parallelism mode is, that there is only a real parallelism as long as no Diagnostic Client switches to a non-default session. At the point in time one Diagnostic Client has switched to a non-default session, requests of other diagnostic clients (other Diagnostic Conversations) get rejected with the exception if the newly requested Diagnostic Conver sation has a higher priority than the current Diagnostic Conversation in non-default session. This characteristic of the ’pseudo parallel mode’ means, that the diagnostic session state is not an individual state per Diagnostic Client, but it becomes a global state for the entire Diagnostic Server instance.

Fully Parallel Mode The characteristic of this parallelism mode is, that it more reflects the classical client-server architectures from the business IT, where a great extent of parallelism is provided by the server and where each client has its own conversational context with the server, totally shielded from other clients. The session context is also well known from web based technology, where it is naturally/common sense, that it is a separate state/context individually for each client. This Fully Parallel Mode obviously requires more resources from the ECU (Diagnostic Server instance) acting as the server compared to the Pseudo Parallel Mode. This is an important reason, that the ISO did not require it from UDS ISO 14229-1[1] compliant ECUs as default implementation for handling of parallel clients. Previous ECUs (i.e. based on the CP) were not always capable of providing this. AP based ECUs are not resource-restricted in the same way, so the implementation of Fully Parallel Mode is usually possible.

A Diagnostic Server instance configured for Fully Parallel Mode allows, that it has at the same time N Diagnostic Conversations) with N different Diagnostic Clients, where each is in a — possibly different — non-default session.

The different behavior of the Diagnostic Server instance depending on the configured parallelism mode is enforced via specification items that distinguish on the parallelism mode of the Diagnostic Server instance. This applies to

• the evaluation of incoming UDS requests as described in section 7.2.1.2,

• processing of UDS requests for UDS Services SessionControl (0x10).

In addition, note that some UDS Services involve global aspects of the Diagnostic Server instance, e.g. the ControlDTCSetting Service 0x85, that cannot be handled independently on multiple Diagnostic Conversations. Such UDS Services require additional restrictions to avoid or coordinate parallel execution. Detailed specification of such restrictions is given per UDS Service in section 7.2.1.6, if applicable.

## 7.2.1.1.2 Life-cycle of a Diagnostic Conversation

The life-cycle of a Diagnostic Conversation starts with the first reception of a UDS request from the given Diagnostic Client to the Diagnostic Server instance and ends either if it is canceled (see section 7.2.1.7) or if all of the following conditions are satisfied:

• UDS request processing is finished by either

– sending positive or final negative response and processing TransmitConfirmation ([SWS_DM_00312]) call from TP-layer according to [SWS_DM_00350],

– suppressing positive response according to [SWS_DM_00365],

– suppressing negative response according to [SWS_DM_00862].

– suppressing any response according to [SWS_DM_00860].

• associated Session is the Default Session.

Note: A Diagnostic Conversation in Non-Default Session is kept alive, as long as no Session time-out occurred. In this case, possibly multiple UDS requests are processed within this Lifecycle.

## 7.2.1.1.3 Diagnostic Conversation Service Interface

In some cases, the current state of a Diagnostic Conversation needs to be known by some Adaptive Applications. For this purpose, the Diagnostic Server instance provides instances of the Service Interface diag::Conversation.

[SWS_DM_00840]{DRAFT} Instantiation of Diagnostic Conversation Interface dThe Diagnostic Server instance shall provide as many instances of diag::Conversation class ([SWS_DM_00693])as the number of potential parallel Diagnostic Clients is configured by maxTesterConnections.c(RS\_Diag\_- 04166)

[SWS_DM_00841]{DRAFT} Assignment of Diagnostic Conversation to Service Instances dOn establishment of a new Diagnostic Conversation, the Diagnostic Server instance shall assign this Diagnostic Conversation to an inactive diag::Conversation class Instance, i.e. the field value of diag::Conversation::ActivityStatusType is set to kInactive. After assignment, the fields of the diag::Conversation class Instance shall be updated according to the state of the given Diagnostic Conversation, i.e.,

• diag::Conversation::ActivityStatusType set to kActive,

• diag::Conversation::ConversationIdentifierType matching the values of udstransport::UdsTransportProtocolMgr::IndicateMessage ([SWS_DM_00309]) call, that initiated the creation of this Diagnostic Conversation (see [SWS_DM_00347]),

• a call to diag::Conversation::GetDiagnosticSession ([SWS_DM_00696]) will return the Diagnostic Session of this Diagnostic Conversation,

• a call to diag::Conversation::GetDiagnosticSecurityLevel ([SWS_DM_00698]) will return the Diagnostic Security Level of this Diagnostic Conversation.

c(RS\_Diag\_04166)

[SWS_DM_00844]{DRAFT} Updating DiagnosticConversation Service Instance fields dDuring the life-cycle of a Diagnostic Conversation, the Diagnostic Server instance shall update the fields of the assigned ara::diag::Conversation class instance according to any change of the state of the Diagnostic Conversation.c(RS\_Diag\_04166)

[SWS_DM_00843]{DRAFT} Reset Service Instance fields on end of Diagnostic Conversation dIf the life-cycle of a Diagnostic Conversation ends, the Diagnostic Server instance shall reset the field values of the assigned diag::Conversation class Instance to its predefined initial values.c(RS\_Diag\_- 04166)

Besides the described informative character of the diag::Conversation class Interface, it also provides methods for interaction with the state of a Diagnostic Conversation.

[SWS_DM_00842]{DRAFT} Default session change trigger from AAs dIf diag::Conversation::ResetToDefaultSession method is called, the Diagnostic Server instance shall complete the latest ongoing request and then switch the Diagnostic Session of this Diagnostic Conversation to Default Session.c(RS\_Diag\_04006)

## 7.2.1.2 Assignment of UDS requests to Diagnostic Conversations

A UDS request is always processed within the context of a Diagnostic Conversation. On reception, the Diagnostic Server instance has to choose from the following three options:

• assign the UDS request to an existing Diagnostic Conversation,

• establish a new Diagnostic Conversation and assign the UDS request to this Diagnostic Conversation,

• reject the UDS request.

The evaluation which option to choose involves several steps that are summarized in Figure 7.2. The following requirements provide the details.

![](./images/c01_e8b335a2f4ff6169d1aa7b74601e7093294eba91a2ed720ac3a898561bc1c899.jpg)  
Figure 7.2: UDS request assignment to a Diagnostic Conversation and Prioritization

[SWS_DM_00425]{DRAFT} Procedure to assign UDS requests to Diagnostic Conversations dThe Diagnostic Server instance shall handle a newly received UDS request as specified in Figure 7.2.c(RS\_Diag\_04166)

[SWS_DM_00426]{DRAFT} Assigning a UDS request to an existing Diagnostic Conversation dIf a UDS request is received and there already exists a Diagnostic Conversation associated to the transmitting Diagnostic Client, then the Diagnostic Server instance shall assign this UDS request to the same Diagnostic Conversation.c(RS\_Diag\_04166)

Note that the assignment of a UDS request to a Diagnostic Conversation does not necessarily mean that the UDS request is actually processed, see [SWS_DM_00433].

## 7.2.1.2.1 Prioritization

If the Diagnostic Server instance lacks resources for new Diagnostic Conversations, a prioritization of the requested Diagnostic Conversation against existing Diagnostic Conversations shall take place. For a Diagnostic Server instance in pseudo parallel mode, prioritization is also required in case of an existing Diagnostic Conversation in non-default session.

[SWS_DM_00427]{DRAFT} Priority of a Diagnostic Conversation dThe Diagnostic Server instance shall take as the priority of a Diagnostic Conversation the respective value provided by IndicateMessage call according to [SWS_DM_00309] that established the Diagnostic Conversation.c(RS\_Diag\_- 04166)

[SWS_DM_00428]{DRAFT} Treatment of priority values dThe Diagnostic Server instance shall consider a lower value as higher priority and vice versa. In particular, priority value 0 represents highest priority.c(RS\_Diag\_04166)

[SWS_DM_00429]{DRAFT} Prioritization in active non-default session dIf a Diagnostic Conversation is in non-default session, the Diagnostic Server shall compare the priority of the requested Diagnostic Conversation against the priority of the given Diagnostic Conversation in non-default session. If the priority of the requested Diagnostic Conversation is higher than the priority of the Diagnostic Conversation in non-default Session, the Diagnostic Server instance shall replace the Diagnostic Conversation in non- default session by the requested Diagnostic Conversation according to [SWS_DM_00431] and assign the UDS request to the newly established Diagnostic Conversation.c(RS\_Diag\_- 04166)

[SWS_DM_00430]{DRAFT} Prioritization against all Diagnostic Conversations dOn prioritization, the Diagnostic Server instance shall compare the priority of the requested Diagnostic Conversation against the priorities of the existing Diagnostic Conversations:

• If all priorities of the existing Diagnostic Conversations are higher or equal to the priority of the requested Diagnostic Conversation, the Diagnostic Server instance shall refuse the UDS request according to [SWS_DM_00049] and [SWS_DM_00290].

• If some priority of the existing Diagnostic Conversations is lower than the priority of the requested Diagnostic Conversation, the Diagnostic Server instance shall replace the Diagnostic Conversation of lowest priority by the requested Diagnostic Conversation according to [SWS_DM_00431] and assign the UDS request to the newly established Diagnostic Conversation. If multiple Diagnostic Conversations exist with the same lowest priority, the Diagnostic Server instance shall prefer replacement of a Diagnostic Conversation within default Session before replacement of a Diagnostic Conversation in non-default Session.

c(RS\_Diag\_04166)

## 7.2.1.2.2 Replacement of Diagnostic Conversations and initial values

[SWS_DM_00431]{DRAFT} Replacement of Diagnostic Conversations dOn replacement of a given Diagnostic Conversation by a requested Diagnostic Conversation, the Diagnostic Server instance shall cancel the given Diagnostic Conversation according to [SWS_DM_00482] and establish a new Diagnostic Conversation as requested.c(RS\_Diag\_04167)

[SWS_DM_00856]{DRAFT} Initial values for Diagnostic Conversation dFor a newly established Diagnostic Conversation, the Diagnostic Server instance shall use the following initial values:

• Session set to Default Session, which is synonymous with returning an according ara::core::StringView when diag::Conversation::GetDiagnosticSession() ([SWS_DM_00696]) is called and

• Security Level set to status Locked, which is synonymous with returning an according ara::core::StringView when diag::Conversation::GetDiagnosticSecurityLevel() ([SWS_DM_00698]) is called .

c(RS\_Diag\_04166)

## 7.2.1.2.3 Refusal of incoming diagnostic request

[SWS_DM_00433]{DRAFT} Refusal of diagnostic request due to busy Diagnostic Conversation dIf a UDS request is assigned to a Diagnostic Conversation that has not finished processing of a formerly assigned UDS request, then the Diagnostic Server instance shall ignore the new UDS request according to [SWS_DM_00386].c(RS\_Diag\_04020)

[SWS_DM_00049]{DRAFT} Refusal of diagnostic request due to prioritization with BusyRepeatRequest dIf prioritization demands refusal of an incoming UDS request and the configuration parameter DiagnosticCommonProps.responseOn-SecondDeclinedRequest is TRUE, the Diagnostic Server instance shall accept this request according to [SWS_DM_00385] without further processing and a negative response with NRC 0x21 (BusyRepeatRequest) shall be issued for this request.c(RS\_Diag\_04167)

[SWS_DM_00290]{DRAFT} Refusal of diagnostic request due to prioritization without response dIf prioritization demands refusal of an incoming UDS request and the configuration parameter DiagnosticCommonProps.responseOnSecond-DeclinedRequest is FALSE, the Diagnostic Server instance shall ignore this request according to [SWS_DM_00386] without further processing and no response shall be issued.c(RS\_Diag\_04167)

## 7.2.1.3 UDS request Validation/Verification

[SWS_DM_00096]{DRAFT} Validation Steps and Order dThe Diagnostic Server instance shall execute the request validation, negative response code determination and processing according to ISO 14229-1[1].c(RS\_Diag\_04196, RS\_- Diag\_04203)

ISO 14229-1[1] describes a common processing for all requests in “Figure 5 – General server response behavior”. There are further optional SID specific processing sequences. This document describes the Diagnostic Server instance behavior for certain types of checks:

• manufacturer specific failure detected? Decision by applying manufacturer specific checks according to section 7.2.1.3.4

• SID supported? Decision according to section 7.2.1.3.2

• SID supported in active session? Decision according to section 7.2.1.3.3

• SID security check o.k.? Decision according to section 7.2.1.3.3

• supplier-specific failure detected? Decision by applying supplier-specific checks according to section 7.2.1.3.4

[SWS_DM_00097]{DRAFT} Abort on failed verification step dWhenever one of the verification steps fails, further processing of the request shall be aborted and a negative response shall be sent back.c(RS\_Diag\_04196)

The negative response code to be used will be defined in each step described in the following sections.

## 7.2.1.3.1 UDS request format checks

[SWS_DM_00098]{DRAFT} UDS message checks dThe Diagnostic Server instance shall check, whether the diagnostic request is syntactically correct. I.e. whether it conforms to ISO 14229-1 message format specification. If it does not conform, the Verification shall be considered as failed and the negative response code shall be 0x13 (incorrectMessageLengthOrInvalidFormat)c(RS\_Diag\_04203)

## 7.2.1.3.2 Supported service checks

[SWS_DM_00099]{DRAFT} Supported Service SID level checks dThe Diagnostic Server instance shall check, whether there is a configured internal or external service processor for the incoming diagnostic request. If there is no service processor on SID level, the Verification shall be considered as failed and the negative response code shall be 0x11 (serviceNotSupported)c(RS\_Diag\_04203)

[SWS_DM_00100]{DRAFT} Supported Service subfunction level checks dThe Diagnostic Server instance shall check, whether there is a configured internal or external service processor for the incoming diagnostic request. If there exists a service processor on SID level, but not for the subfunction of the request, the Verification shall be considered as failed and the negative response code shall be 0x12 (subFunctionNotSupported)c(RS\_Diag\_04203)

## 7.2.1.3.3 Session and Security Checks

[SWS_DM_00101]{DRAFT} Session Access SID level Permission dThe Diagnostic Server instance shall check, whether the service processor (Diagnostic-ServiceInstance), which is assigned to handle the service has the permission to process the service in the current Diagnostic Session according to its DiagnosticAccessPermission.diagnosticSession. If DiagnosticServiceInstance has no access permissions in the current Diagnostic Session and:

• either the SID of the service has no subfunction

• or all other sub-functions also have no access permissions in the current Diagnostic Session,

the Verification shall be considered as failed and the negative response code shall be 0x7F (serviceNotSupportedInActiveSession)c(RS\_Diag\_04203, RS\_Diag\_04006)

[SWS_DM_00102]{DRAFT} Session Access subfunction level Permission dThe Diagnostic Server instance shall check, whether the service processor (DiagnosticServiceInstance), which is assigned to handle the service has the permission to process the service in the current Diagnostic Session according to its DiagnosticAccessPermission.diagnosticSession. If DiagnosticServiceInstance has no access permissions in the current Diagnostic Session and:

• the SID of the service has subfunctions

• and at least one other sub-functions has access permissions in the current Diagnostic Session,

the Verification shall be considered as failed and the negative response code shall be 0x7E (subFunctionNotSupportedInActiveSession)c(RS\_Diag\_04203, RS\_Diag\_- 04006)

[SWS_DM_00103]{DRAFT} Security Access level Permission dThe Diagnostic Server instance shall check, whether the service processor (DiagnosticServiceInstance), which is assigned to handle the service has the permission to process the service in the current Security-Level according to its DiagnosticAccessPermission.securityLevel. If DiagnosticServiceInstance has no access permissions in the current Security-Level, the Verification shall be considered as failed and the negative response code shall be 0x33 (securityAccessDenied).c(RS\_Diag\_04203, RS\_Diag\_04005)

[SWS_DM_00450]{DRAFT} Security Access subfunction level Permission dThe Diagnostic Server instance shall check, whether the service processor (DiagnosticServiceInstance), which is assigned to handle the service has the permission to process the service in the current Security Level according to its DiagnosticAccessPermission.securityLevel. If DiagnosticServiceInstance has no access permissions in the current Security Level and:

• the SID of the service has subfunctions

• and at least one other sub-functions has access permissions in the current Security Level,

the Verification shall be considered as failed and the negative response code shall be 0x33 (securityAccessDenied)c(RS\_Diag\_04203)

## 7.2.1.3.4 Manufacturer and Supplier Permission Checks and Confirmation

[SWS_DM_00857]{DRAFT} Signature of Manufacturer Permission Check Method dThe Diagnostic Server instance shall call diag::ServiceValidation::Validate() ([SWS_DM_00774]) on each received request message. In case a call returned an error, the Verification shall be considered as failed and the negative response code shall be equal to the value of the error code according to [SWS_DM_00547].c(RS\_Diag\_04199)

[SWS_DM_00858]{DRAFT} Signature of Supplier Permission Check Method dThe Diagnostic Server instance shall call diag::ServiceValidation::Validate() ([SWS_DM_00774]) on each received request message. In case a call returned an error, the Verification shall be considered as failed and the negative response code shall be equal to the value of the error code according to [SWS_DM_00547].c(RS\_Diag\_04199)

[SWS_DM_00859]{DRAFT} Confirmation of service processing dThe Diagnostic Server instance shall call the method diag::ServiceValidation::Confirmation() ([SWS_DM_00775]) on every service instances for which diag::ServiceValidation::Validate() ([SWS_DM_00774]) was called. If message handling results in sending a positive or negative response, the diag::ServiceValidation::Confirmation() ([SWS_DM_00775]) call shall be deferred after reception of TransmitConfirmation ([SWS_DM_00312]). In any other case, it shall be the last step of request processing.c (RS\_Diag\_04019, RS\_Diag\_04172)

[SWS_DM_00860]{DRAFT} No service processing dIf Manufacturer- or Supplier Permission Check (according to [SWS_DM_00857] or [SWS_DM_00858]) returns the error code kNoProcessingNoResponse, the Diagnostic Server instance shall call without any service processing the diag::ServiceValidation::Confirmation() ([SWS_DM_00775]) with diag::ServiceValidation::ConfirmationStatusType status parameter set to kNoProcessingNoResponse and do no response message.c(RS\_Diag\_- 04196)

## 7.2.1.3.5 Condition checks

In some cases, diagnostic functionality shall only be executed if the vehicle is in a certain state. An example is the condition is that the vehicle is stopped (vehicle speed == 0).

[SWS_DM_00111]{DRAFT} Configurable environment condition checks dThe Diagnostic Server instance shall perform a condition check when the ISO 14229- 1[1] mentions a service specific “Condition check” in the defined NRC handling for a given diagnostic service. The Diagnostic Server instance shall send the configured NRC value (see [SWS_DM_00289]) if the condition is not fulfilled.c(RS\_Diag\_- 04199)

[SWS_DM_00112]{DRAFT} Condition check definition dThe Diagnostic Server instance shall execute a condition check according to [SWS_DM_00111] by the presence of a DiagnosticEnvironmentalCondition referenced in the role environmentalCondition by the processed DiagnosticServiceInstance.c (RS\_Diag\_04199)

[SWS_DM_00286]{DRAFT} Configurable environmental condition check execution dThe Diagnostic Server instance shall execute an environmental condition check before executing the requested service if defined. (see DiagnosticEnvironmentalCondition element from DEXT [2]).c(RS\_Diag\_04199)

[SWS_DM_00287]{DRAFT} Configurable environmental condition check criteria dThe environmental condition check shall be done by evaluation of the configured DiagnosticEnvConditionFormula.c(RS\_Diag\_04199)

The DiagnosticEnvConditionFormula may reference a DiagnosticDataElement by a DiagnosticEnvDataCondition with a logical operator given as DiagnosticEnvCompareCondition.

[SWS_DM_00288]{DRAFT} Configurable environmental condition check evaluates to TRUE dIf the computation of the DiagnosticEnvConditionFormula evaluated to TRUE, the Diagnostic Server instance shall execute the requested service.c(RS\_Diag\_04199)

[SWS_DM_00289]{DRAFT} Configurable environmental condition check evaluates to FALSE dThe Diagnostic Server instance shall send the NRC defined in nrcValue, if the computation of the DiagnosticEnvConditionFormula evaluated to FALSE. If nrcValue does not define a NRC, the Diagnostic Server instance shall send NRC 0x22 (ConditionsNotCorrect).c(RS\_Diag\_04199)

## 7.2.1.4 UDS response handling

## 7.2.1.4.1 Positive and negative responses

[SWS_DM_00376]{DRAFT} Positive response processing dIf an external service processor did not raise an ApApplicationError, the Diagnostic Server instance shall return a positive response.c(RS\_Diag\_04196)

[SWS_DM_00861]{DRAFT} Negative response processing dIf the external processor raised an error according to [SWS_DM_00547], the Diagnostic Server instance shall return a negative response with the value of the error code. For details see ISO 14229-1[1]; chapter 10.2.c(RS\_Diag\_04196)

## 7.2.1.4.2 Suppression of responses

[SWS_DM_00365]{DRAFT} Suppression of positive response in accordance to ISO 14229-1[1] dIn the case that the "suppressPosRspMsgIndicationBit" is set in the request, the Diagnostic Server instance shall suppress the positive response.c (RS\_Diag\_04020)

[SWS_DM_00862]{DRAFT} Suppression of negative response for functional requests in accordance to ISO 14229-1[1] dIf the external processor raised an error according to [SWS_DM_00547], the Diagnostic Server instance shall suppress a negative response for the following error codes:

• kServiceNotSupported ([SWS_DM_00526]),

• kSubfunctionNotSupported ([SWS_DM_00526]),

• kRequestOutOfRange ([SWS_DM_00526]),

• kServiceNotSupportedInActiveSession ([SWS_DM_00526]) or

• kSubFunctionNotSupportedInActiveSession ([SWS_DM_00526])

and the request is functional addressed.c(RS\_Diag\_04020)

## 7.2.1.4.3 Sending busy Responses

[SWS_DM_00368]{DRAFT} Sending busy responses dIf the Diagnostic Server instance is able to perform a diagnostic service, but needs additional time to finish the task and prepare the response, then the Diagnostic Server instance shall send a negative response with NRC 0x78 (Response pending) when reaching the response time (p2ServerMax/p2StarServerMax).c(RS\_Diag\_04016)

[SWS_DM_00369]{DRAFT} Maximum number of busy responses dIf the number of negative responses for a requested diagnostic request reaches the value defined in the configuration parameter maxNumberOfRequestCorrectlyReceivedResponsePending, the Diagnostic Server instance module shall cancel the processing the active diagnostic request (according to [SWS_DM_00482]) and send a negative response with NRC 0x10 (General reject).c(RS\_Diag\_04016)

## 7.2.1.5 Keep track of active non-default sessions

[SWS_DM_00380]{DRAFT} Support for S3 timer dThe Diagnostic Server instance shall provide support for $S3_{\mathrm{Server}}$ (session timeout) with a fixed value of 5 second. The timer handling shall be implemented according to ISO 14229-2[13].c(RS\_- Diag\_04006)

[SWS_DM_00381]{DRAFT} Session timeout dWhenever a non-default session is active and when the session timeout $({ \mathrm{S} } 3_{ { \mathrm{Server} } })$ is reached without receiving any diagnostic request, the Diagnostic Server instance shall reset to the default session state. Diagnostic Server instance internal states for service processing shall be reset according to ISO 14229-2[13].c(RS\_Diag\_04006)

[SWS_DM_00382]{DRAFT} Session timeout start dThe session timeout timer $(S3_{\mathrm{server}})$ shall be started on

• Completion of any final response message or an error indication during sending of the response ([SWS_DM_00312])

• Completion of the requested action in case no response message (positive and negative) is required / allowed.

• In case of an error during the reception of a multi-frame request message ([SWS_DM_00310])

Start of $S3_{\mathrm{Server}}$ means reset the timer and start counting from the beginning.c(RS\_- Diag\_04006)

[SWS_DM_00383]{DRAFT} Session timeout stop dThe session timeout timer $({ \mathrm{S} } 3_{ { \mathrm{Server} } })$ shall be stopped when the reception of an UDS message was indicated ([SWS_DM_00309]).c(RS\_Diag\_04006)

[SWS_DM_00812]{DRAFT} Re-enabling on transition to default session dIf DTC setting is disabled and DM is transitioning into default session, then DM shall enable the DTC setting again.c()

## 7.2.1.6 UDS service processing

This chapter describes the UDS service processing behavior of the Diagnostic Server instance.

[SWS_DM_00127]{DRAFT} Availability of diagnostic service processors dThe Diagnostic Server instance shall provide a service processor on SID level for all services by existence of a DiagnosticServiceClass referenced by a DiagnosticServiceInstance.serviceClass.c(RS\_Diag\_04196)

## 7.2.1.6.1 Supported UDS Services

The Diagnostic Server instance shall support the following listed UDS services:

<table><tr><td rowspan=1 colspan=1>SID</td><td rowspan=1 colspan=1>Service</td><td rowspan=1 colspan=1>Support Type</td><td rowspan=1 colspan=1>Reference</td></tr><tr><td rowspan=1 colspan=1>0x10</td><td rowspan=1 colspan=1>DiagnosticSessionControl</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.3</td></tr><tr><td rowspan=1 colspan=1>0x11</td><td rowspan=1 colspan=1>ECUReset</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.4</td></tr><tr><td rowspan=1 colspan=1>0x14</td><td rowspan=1 colspan=1>ClearDiagnosticInformation</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.5</td></tr><tr><td rowspan=1 colspan=1>0x19</td><td rowspan=1 colspan=1>ReadDTCInformation</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.6</td></tr><tr><td rowspan=1 colspan=1>0x22</td><td rowspan=1 colspan=1>ReadDataByldentifier</td><td rowspan=1 colspan=1>Internally &amp; Externally</td><td rowspan=1 colspan=1>7.2.1.6.7</td></tr><tr><td rowspan=1 colspan=1>0x27</td><td rowspan=1 colspan=1>SecurityAccess</td><td rowspan=1 colspan=1>Internally &amp; Externally</td><td rowspan=1 colspan=1>7.2.1.6.8</td></tr><tr><td rowspan=1 colspan=1>0x28</td><td rowspan=1 colspan=1>CommunicationControl</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.9</td></tr><tr><td rowspan=1 colspan=1>0x2E</td><td rowspan=1 colspan=1>WriteDataByldentifier</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.10</td></tr><tr><td rowspan=1 colspan=1>0x31</td><td rowspan=1 colspan=1>RoutineControl</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.11</td></tr><tr><td rowspan=1 colspan=1>0x34</td><td rowspan=1 colspan=1>RequestDownload</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.12</td></tr><tr><td rowspan=1 colspan=1>0x35</td><td rowspan=1 colspan=1>RequestUpload</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.13</td></tr><tr><td rowspan=1 colspan=1>0x36</td><td rowspan=1 colspan=1>TransferData</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.14</td></tr><tr><td rowspan=1 colspan=1>0x37</td><td rowspan=1 colspan=1>RequestTransferExit</td><td rowspan=1 colspan=1>Externally</td><td rowspan=1 colspan=1>7.2.1.6.15</td></tr><tr><td rowspan=1 colspan=1>0x3E</td><td rowspan=1 colspan=1>TesterPresent</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.16</td></tr><tr><td rowspan=1 colspan=1>0x85</td><td rowspan=1 colspan=1>ControlDTCSetting</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.17</td></tr><tr><td rowspan=1 colspan=1>0x86</td><td rowspan=1 colspan=1>ResponseOnEvent</td><td rowspan=1 colspan=1>Internally</td><td rowspan=1 colspan=1>7.2.1.6.18</td></tr></table>

Table 7.2: UDS Services supported by Diagnostic Server instance

## Note:

• UDS services which are not supported by DM, are documented in the section Known Limitations.

• Support Type Internally means, that the service with the given SID can be completely processed internally within the Diagnostic Server instance without relying on external functionality - typically in form of an AA. Support Type Externally means, that the Diagnostic Server instance needs to call an external function, to be able to process the service with the given SID. The mixed support Type "Internally & Externally" means, that for the service with the given SID partially calls to an external function have to be done, but it partially could be also handled internally.

## 7.2.1.6.2 Common service processing items

This chapter contains rules for service processors, shared among multiple services.

Memory related UDS services (such as 0x34 RequestDownload) use the request parameter addressAndLengthFormatIdentifier to identify the number of bytes transmitted on the bus for memory address and size. Regardless of the wire representation of address and length information, within the Diagnostic Server instance and external service processors all addresses and data length information are mapped to a uint64 datatype.

[SWS_DM_00129]{DRAFT} Supported addressAndLengthFormatIdentifier dThe Diagnostic Server instance shall support for each nibble of the addressAndLengthFormatIdentifier a value between 1 and 8.c(RS\_Diag\_04120)

[SWS_DM_00130]{DRAFT} Not supported addressAndLengthFormatIdentifier dThe Diagnostic Server instance shall send the negative response 0x31 (requestOutOfRange), if an addressAndLengthFormatIdentifier with a value outside the range between 1 and 8 is received.c(RS\_Diag\_04120)

## 7.2.1.6.3 Service 0x10 – DiagnosticSessionControl

The UDS service DiagnosticSessionControl is used to enable different diagnostic sessions in the server.

[SWS_DM_00226]{DRAFT} Support of UDS service DiagnosticSessionControl dThe Diagnostic Server instance shall provide the UDS service 0x10 DiagnosticSessionControl according to ISO 14229-1[1].c(RS\_Diag\_04198)

[SWS_DM_00227]{DRAFT} Check for supported sessions dIf the Subfunction addressed by the DiagnosticSessionControl according to [SWS_DM_00226] is not supported by the configuration, i.e., there is no DiagnosticSession configured with id matching the requested Subfunction value, the Diagnostic Server instance shall return a NRC 0x12 (SubfunctionNotSupported).c(RS\_Diag\_04196)

In the context of parallel clients, a DiagnosticSessionControl may lead to negative responses even for supported Subfunctions with positive permission checks.

[SWS_DM_00228]{DRAFT} Switch to requested Diagnostic Session dOn positive evaluation of a DiagnosticSessionControl request, the Diagnostic Server instance shall send the positive response message. After the response message is sent, the Diagnostic Server shall internally switch to the DiagnosticSession with id matching the requested Subfunction value, and shall set new timing parameters according to the associated parameters p2ServerMax and p2StarServerMax.c(RS\_- Diag\_04198)

[SWS_DM_00845]{DRAFT} Notification about session change dIf the Diagnostic Server instance did successfully change the session of a conversation, it shall update the diagnostic session of the according ara::diag::Conversation class ([SWS_DM_00693]) instance internally.c(RS\_Diag\_04208)

## 7.2.1.6.4 Service 0x11 – ECUReset

[SWS_DM_00234]{DRAFT} Support of UDS service ECUReset dThe Diagnostic Server instance shall provide the UDS service 0x11 ECUReset according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00235]{DRAFT} ECUReset service processing dThe Diagnostic Server instance shall call the method RequestRestart of the interface RequestRestart to process an ECU-Reset. The RestartType parameter shall be set according to the value of the DiagnosticEcuReset.category.

The ExecutionType parameter shall be set:

In case the parameter DiagnosticEcuResetClass.respondToReset is either not present or present and set to DiagnosticResponseToEcuResetEnum.respond-BeforeReset to: kImmediate

In case the parameter DiagnosticEcuResetClass.respondToReset is present and set to DiagnosticResponseToEcuResetEnum.respondAfterReset to: kDeferedc(RS\_Diag\_04196)

[SWS_DM_00268]{DRAFT} EcuReset positive response processing before reset dIf the external processor did NOT raise an ApApplicationError, the Diagnostic Server instance shall return a positive response before the actual reset, in case the parameter DiagnosticEcuResetClass.respondToReset is either not present or present and set to DiagnosticResponseToEcuResetEnum.respond-BeforeReset.c(RS\_Diag\_04019)

[SWS_DM_00360]{DRAFT} EcuReset positive response processing after reset dIf the external processor did NOT raise an ApApplicationError, the Diagnostic Server instance shall return a positive response after the actual reset if NotifyReestablishment method (see [SWS_DM_00326]) is called (which could also happen after a restart of DM itself), in case the parameter DiagnosticEcuResetClass. respondToReset is present and set to DiagnosticResponseToEcuResetEnum. respondAfterReset.c(RS\_Diag\_04196)

Note: The information that the reset shall be transmitted after the NotifyReestablishment method (see [SWS_DM_00326]) is called can be stored by a flag in non-volatile memory.

[SWS_DM_00361]{DRAFT} EcuReset application error processing dIf RequestRestart raised an ApApplicationError contained in RequestRestart, the Diagnostic Server instance shall return a negative response with the value 0x22.c(RS\_Diag\_04196)

[SWS_DM_00269]{DRAFT} Reaction on Unsupported Subfunction dThe Diagnostic Server instance shall send a negative response 0x12 (SubfunctionNot-Supported), if the requested subfunction value is neither in configured range of default subfunction values (requestType, see ISO 14229-1[1]) nor in range of the configured DiagnosticEcuReset.customSubFunctionNumber in the ECU.c(RS\_Diag\_- 04196)

## 7.2.1.6.5 Service 0x14 – ClearDiagnosticInformation

The UDS service ClearDiagnosticInformation is used to clear the ECUs fault memory.

[SWS_DM_00090]{DRAFT} Support of UDS service ClearDiagnosticInformation dThe Diagnostic Server instance shall provide the UDS service 0x14 Clear-DiagnosticInformation according to ISO 14229-1[1].c(RS\_Diag\_04180, RS\_Diag\_- 04196)

[SWS_DM_00091]{DRAFT} Evaluation of ClearDiagnosticInformation parameters dThe Diagnostic Server instance shall determine the DTC group or single DTC to clear from the ‘groupOfDTC’ parameter the UDS request.c(RS\_Diag\_04180, RS\_Diag\_04117)

[SWS_DM_00092]{DRAFT} Parameter range check for groupOfDTC request parameter dThe Diagnostic Server instance shall reply with an NRC 0x31 (RequestOutOfRange) if the requested ‘groupOfDTC’ has no matching configured DTC group according to [SWS_DM_00064] or configured DTC by DiagnosticTrouble-CodeUds.udsDtcValue.c(RS\_Diag\_04180, RS\_Diag\_04117)

[SWS_DM_00113]{DRAFT} Positive response for UDS service 0x14 dIf Diagnostic Server instance has cleared the requested ‘groupOfDTC’, the Diagnostic Server instance shall send a positive response.c(RS\_Diag\_04196)

The DTC clearing behavior is described in detail in section 7.2.2.4.5. It consists of resetting the DTC status and deleting snapshot records and extended data records.

[SWS_DM_00114]{DRAFT} Limitation to one simultaneous DTC clear operation dIf a DTC clear operation is already in progress, the Diagnostic Server instance shall deny an UDS request 0x14 and send a negative response 0x22 (conditionsNotCorrect).c(RS\_Diag\_04196)

[SWS_DM_00115]{DRAFT} Memory error handling while clearing DTCs dThe Diagnostic Server instance shall return a negative response NRC 0x72 (general-ProgrammingFailure) if it encounters an error in the non-volatile memory while clearing the DTCs.c(RS\_Diag\_04180)

The definition of a failure of the non-volatile memory is hardware and project specific. In general if the clear DTC operation could not delete the snapshot records, extended data records and if it could not reset the UDS DTC status byte because the underlying storage system reported and error, a non-volatile memory error can be assumed.

[SWS_DM_00122]{DRAFT} UDS response behavior on not allowed clear operations dIf a DTC clear operation is requested and the DTC clear operation shall clear a DTC with a forbidden clear allowance according to [SWS_DM_00896], the Diagnostic Server instance shall send a negative response 0x22 (conditionsNotCorrect) in the following situations:

• it was requested to clear a single DTC and the DTC could not be cleared according to [SWS_DM_00896]

• it was requested to clear a DTC group and all the DTCs of the DTC group could not be cleared according to [SWS_DM_00896] (This doesn’t apply when one or more DTC are allowed to be cleared.)

## c(RS\_Diag\_04117)

[SWS_DM_00159]{DRAFT} Allow only to clear GroupOfAllDTCs dIf the configuration DiagnosticCommonProps.clearDtcLimitation is set to clearAllDtcs, the Diagnostic Server instance shall only allow to clear all DTCs via the GroupOfAllDTC as defined in [SWS_DM_00065]. In case a different value is given in groupOfDTC request parameter, the Diagnostic Server instance shall return a negative response 0x31 (RequestOutOfRange).c(RS\_Diag\_04117)

[SWS_DM_00160]{DRAFT} Allow to clear single DTCs dIf the configuration DiagnosticCommonProps.clearDtcLimitation is set to allSupportedDtcs, the Diagnostic Server instance shall allow to clear single DTCs or DTCGroups. [SWS_DM_00092] defines the possible and refused values.c(RS\_Diag\_04117)

[SWS_DM_00162]{DRAFT} Point in time for positive response for ClearDTC dThe Diagnostic Server instance shall send a positive response for a ClearDiagnosticInformation service after all memory is cleared in the server. This is regardless how the Diagnostic Server instance memory is organized (splitted, volatile, nonvolatile).c(RS\_Diag\_04180, RS\_Diag\_04196)

[SWS_DM_00163]{DRAFT} Definition of a failed clear operation with event clear allowed and event combination dIf it is requested to clear a single DTC and multiple DiagnosticEventToTroubleCodeUdsMapping referencing this DiagnosticEventToTroubleCodeUdsMapping.troubleCodeUds the Diagnostic Server instance shall send a negative response 0x22 (conditionsNotCorrect) if one event forbids the clearance of the DTC according to [SWS_DM_00896].c(RS\_Diag\_- 04180)

[SWS_DM_00164]{DRAFT} Definition of a failed clear operation with event clear allowed and clearing a group of DTCs dIf it is requested to clear a group of DTCs, the Diagnostic Server instance shall send a negative response 0x22 (conditionsNotCorrect) if all DTCs of that group of DTC forbid the clearance according to [SWS_DM_00163] or [SWS_DM_00896].c(RS\_Diag\_04180)

## 7.2.1.6.5.1 Clearing user-defined fault memory

According to [SWS_DM_00090] the Diagnostic Server instance implements an ISO 14229-1[1] compatible UDS service ClearDiagnosticInformation. This implies a limitation that only the primary fault memory can be cleared using this UDS service. To provide means to clear the user-defined fault memories, the Diagnostic Server instance prospectively implements an agreed proposal by ISO 14229-1 to allow clearance of used defined fault memories. The proposal can be found in the ISO 14229 document: “02\_ISO\_14229-1\_Comments-Summary\_2016-09-13.docx”. Until the next final release of ISO 14229-1[1] containing this extension, the Diagnostic Server instance will implement this proposed extension in the way described in this chapter.

The clearance of a user-defined fault memory has the same behavior as the clearing of the primary fault memory. All requirements that are provided to clear the primary fault memory also apply to a clear of a user-defined fault memory. So finally it is a pure extension.

[SWS_DM_00193]{DRAFT} Support of a user-defined fault memory clear request dIf the Diagnostic Server instance receives a a UDS service 0x14 ClearDiagnosticInformation with a length of 5 bytes, the Diagnostic Server instance shall interpret this request as a request to clear user-defined fault memory.c(RS\_Diag\_- 04197)

[SWS_DM_00194]{DRAFT} Definition of the user-defined fault memory number for ClearDiagnosticInformation dIf the Diagnostic Server instance receives a UDS request to clear user-defined fault memory according to [SWS_DM_00193], the DM shall get the number of user-defined fault memory to be cleared from the fifth byte in the request.c(RS\_Diag\_04197)

[SWS_DM_00195]{DRAFT} Clearing a user-defined memory dIf the Diagnostic Server instance is requested to clear the user-defined fault memory according to [SWS_DM_00193] and an DiagnosticMemoryDestinationUserDefined.memoryId exists with the requested user-defined memory number according to [SWS_DM_00194], the Diagnostic Server instance shall clear the requested user-defined fault memory.c(RS\_Diag\_04197)

For details about the fault memory clearing process please also refer to section 7.2.2.4.5.

[SWS_DM_00208]{DRAFT} Validation of the requested user-defined memory number dIf the Diagnostic Server instance is requested to clear the userdefined fault memory according to [SWS_DM_00193] and no DiagnosticMemory-DestinationUserDefined.memoryId exists with the requested user-defined memory number according to [SWS_DM_00194], the Diagnostic Server instance shall return a NRC 0x31 (RequestOutOfRange).c(RS\_Diag\_04197)

## 7.2.1.6.6 Service 0x19 – ReadDTCInformation

Some UDS responses for the Service “0x19 – ReadDTCInformation” use the parameter “DTCFormatIdentifier” as part of the response PDU. The Diagnostic Server instance obtains the value used from the global configuration item DiagnosticCommonProps.typeOfDtcSupported. To provide the correct UDS values, the following mapping is used:

[SWS_DM_00062]{DRAFT} Mapping between ISO 14229-1[1] and Autosar Diagnostic Extract Template [2] of the DTCFormatIdentifier dIf a positive response for service 0x19 with the ISO 14229-1[1] parameter “DTCFormatIdentifier” is sent, the Diagnostic Server instance shall derive the value from DiagnosticCommonProps.typeOfDtcSupported applying the following mapping rule:c(RS\_Diag\_- 04180, RS\_Diag\_04157, RS\_Diag\_04067)

<table><tr><td rowspan=1 colspan=1>typeOfDtcSupported</td><td rowspan=1 colspan=1>“DTCFormatIdentifier”</td></tr><tr><td rowspan=1 colspan=1>iso11992_4</td><td rowspan=1 colspan=1>0x03</td></tr><tr><td rowspan=1 colspan=1>iso14229_1</td><td rowspan=1 colspan=1>0x01</td></tr><tr><td rowspan=1 colspan=1>saeJ2012_da</td><td rowspan=1 colspan=1>0x00</td></tr></table>

## 7.2.1.6.6.1 SF 0x01 – reportNumberOfDTCByStatusMask

[SWS_DM_00244]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x01 dThe Diagnostic Server instance shall support Subfunction 0x01 (reportNumberOfDTCByStatusMask) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_NUMBER\_OF\_DTC\_BY\_STATUS\_MASK’.c(RS\_Diag\_04180, RS\_Diag\_- 04157, RS\_Diag\_04067)

[SWS_DM_00061]{DRAFT} Providing rule for DTCFormatIdentifier in positive response ReadDTCInformation.reportNumberOfDTCByStatusMask dWhile sending the positive response for ReadDTCInformation.reportNumberOfDTCByStatusMask, the Diagnostic Server instance shall set the response PDU “DTCFormatIdentifier” according to the mapping of [SWS_DM_00062].c(RS\_Diag\_04157, RS\_Diag\_- 04067)

## 7.2.1.6.6.2 SF 0x02 – reportDTCByStatusMask

[SWS_DM_00245]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x02 dThe Diagnostic Server instance shall support Subfunction 0x02 (reportDTCByStatusMask) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticRead-DTCInformation of category ’REPORT\_DTC\_BY\_STATUS\_MASK’.c(RS\_Diag\_- 04180, RS\_Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.3 SF 0x04 – reportDTCSnapshotRecordByDTCNumber

[SWS_DM_00246]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x04 dThe Diagnostic Server instance shall support Subfunction 0x04 (reportDTCSnapshotRecordByDTCNumber) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_DTC\_SNAPSHOT\_RECORD\_BY\_DTC\_NUMBER’.c(RS\_Diag\_04180, RS\_- Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.4 SF 0x06 – reportDTCExtDataRecordByDTCNumber

[SWS_DM_00370]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x06 dThe Diagnostic Server instance shall support Subfunction 0x06 (reportDTCExtDataRecordByDTCNumber) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_DTC\_EXT\_DATA\_RECORD\_BY\_DTC\_NUMBER’.c(RS\_Diag\_04180, RS\_- Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.5 SF 0x07 – reportNumberOfDTCBySeverityMaskRecord

[SWS_DM_00247]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x07 dThe Diagnostic Server instance shall support Subfunction 0x07 (reportNumberOfDTCBySeverityMaskRecord) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_NUMBER\_OF\_DTC\_BY\_SEVERITY\_MASK\_RECORD’.c(RS\_Diag\_04180, RS\_Diag\_04157)

[SWS_DM_00063]{DRAFT} Providing rule for DTCFormatIdentifier in positive response ReadDTCInformation.reportNumberOfDTCBySeverityMaskRecord dWhile sending the positive response for ReadDTCInformation.reportNumberOfDTCBySeverityMaskRecord, the Diagnostic Server instance shall set the response PDU “DTCFormatIdentifier” according to the mapping of [SWS_DM_00062].c(RS\_Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.6 SF 0x14 – reportDTCFaultDetectionCounter

[SWS_DM_00371]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x14 dThe Diagnostic Server instance shall support Subfunction 0x14 (reportDTCFaultDetectionCounter) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_DTC\_FAULT\_DETECTION\_COUNTER’.c(RS\_Diag\_04180, RS\_Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.7 SF 0x17 – reportUserDefMemoryDTCByStatusMask

[SWS_DM_00372]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x17 dThe Diagnostic Server instance shall support Subfunction 0x17 (reportUserDefMemoryDTCByStatusMask) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_USER\_DEF\_MEMORY\_DTC\_BY\_STATUS\_MASK’.c(RS\_Diag\_04180, RS\_- Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.8 SF 0x18 – reportUserDefMemoryDTCSnapshotRecordByDTCNumber

[SWS_DM_00373]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x18 dThe Diagnostic Server instance shall support Subfunction 0x18 (reportUserDefMemoryDTCSnapshotRecordByDTCNumber) of the UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_USER\_DEF\_MEMORY\_DTC\_SNAPSHOT\_RECORD\_BY\_DTC\_NUMBER’.c (RS\_Diag\_04180, RS\_Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.6.9 SF 0x19 – reportUserDefMemoryDTCExtDataRecordByDTCNumber

[SWS_DM_00374]{DRAFT} Support of UDS service ReadDTCInformation, Subfunction 0x19 dThe Diagnostic Server instance shall support Subfunction 0x19 (reportUserDefMemoryDTCExtDataRecordByDTCNumber) of the

UDS service 0x19 ReadDTCInformation according to ISO 14229-1[1], provided the configuration contains a DiagnosticReadDTCInformation of category ’RE-PORT\_USER\_DEF\_MEMORY\_DTC\_EXT\_DATA\_RECORD\_BY\_DTC\_NUMBER’.c (RS\_Diag\_04180, RS\_Diag\_04157, RS\_Diag\_04067)

## 7.2.1.6.7 Service 0x22 – ReadDataByIdentifier

The processing of a UDS Service ReadDataByIdentifier (0x22) is described in ISO 14229-1[1], see in particular the evaluation sequence in Figure 15. On processing, the Diagnostic Server instance needs to perform various checks. The following requirements determine the relation between the input data to be checked and the configuration provided to the Diagnostic Server instance via DEXT parameters.

[SWS_DM_00170]{DRAFT} Realisation of UDS service ReadDataByIdentifier (0x22) dThe Diagnostic Server instance shall implement the diagnostic service 0x22 ReadDataByIdentifier according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00412]{DRAFT} Check requested number of DataIdentifiers dOn reception of the UDS Service ReadDataByIdentifier (0x22), the Diagnostic Server instance shall check the number of the requested DataIdentifiers against the configuration parameter maxDidToRead.c(RS\_Diag\_04203)

[SWS_DM_00409]{DRAFT} Check supported DataIdentifier dOn reception of the UDS Service ReadDataByIdentifier (0x22), a requested DataIdentifier shall be considered as supported if and only if there exists a DiagnosticDataIdentifier with id matching the DataIdentifier and this DiagnosticDataIdentifier is referenced by a DiagnosticReadDataByIdentifier.c(RS\_Diag\_04203)

[SWS_DM_00413]{DRAFT} Check supported DataIdentifier in active session dOn reception of the UDS Service ReadDataByIdentifier (0x22), a requested DataIdentifier shall be considered as supported in active session if and only if the DataIdentifier is supported according to [SWS_DM_00409] and the active session passes the execution permission check as per [SWS_DM_00101].c(RS\_Diag\_04203)

[SWS_DM_00414]{DRAFT} Check supported DataIdentifier on active security level dOn reception of the UDS Service ReadDataByIdentifier (0x22), a requested DataIdentifier shall be considered as supported on active security level if and only if the DataIdentifier is supported according to [SWS_DM_00409] and the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_Diag\_- 04203)

[SWS_DM_00570]{DRAFT} Retrieving data for requested DataIdentifier dOn reception of the UDS Service ReadDataByIdentifier (0x22), the Diagnostic Server instance shall retrieve the data for a DataIdentifier from the mapped RPortPrototypes.c(RS\_Diag\_04097)

[SWS_DM_00571]{DRAFT} Reaction on ApplicationError dIf the Result of external processor has an error of ara::diag::DiagUdsNrcErrorDomain, the Diagnostic Server instance shall return a negative response with the value of the error code.c(RS\_Diag\_04196)

Note: If multiple DataIdentifer are requested within one ReadDataByIdentifier request, [SWS_DM_00571] might result in a deviation from ISO 14229-1[1] in case the AA raises an ApApplicationError kRequestOutOfRange (resulting in NRC 0x31). According to ISO 14229-1[1], chapter 10.2, a tester expects to receive NRC 0x31 only in case none of the requested DataIdentifier are supported. Handling of ApApplication-Errors as described in [SWS_DM_00571] might lead to NRC 0x31 on processing one of the requested DataIdentfier without checking the other requested DataIdentifier.

## 7.2.1.6.8 Service 0x27 – SecurityAccess

[SWS_DM_00236]{DRAFT} Realization of UDS service 0x27 SecurityAccess dThe Diagnostic Server instance shall implement the diagnostic service 0x27 SecurityAccess according to ISO 14229-1[1].c(RS\_Diag\_04196, RS\_Diag\_04005)

[SWS_DM_00863]{DRAFT} Checking Supported Subfunction for RequestSeed dOn reception of a request for UDS Service SecurityAccess (0x27), the Diagnostic Server instance shall call diag::SecurityAccess::GetSeed ([SWS_DM_00764]) if the requested subfunction value (access type) matches to the value of the instance of DiagnosticSecurityAccess with request-SeedId. The security\_access\_data\_record parameter of the method diag::SecurityAccess::GetSeed ([SWS_DM_00764]) shall be filled with the securityAccessDataRecord provided by the tester. If no data is provided by the tester, the security\_access\_data\_record parameter shall be empty.c(RS\_Diag\_- 04203)

Note: The static seed mechanism, as specified in ISO 14229-1[1] - annex I.2 table I.1, needs to be done by the application with the implementation of “ diag::SecurityAccess::GetSeed function” / “diag::SecurityAccess::CompareKey function”.

[SWS_DM_00507]{DRAFT} Length check on UDS Service 0x27 request with Subfunction for RequestSeed dOn reception of a request for UDS Service SecurityAccess (0x27) with subfunction value matching the requestSeedId of a configured DiagnosticSecurityAccess, the Diagnostic Server instance shall perform the message length check against the optionally configured accessDataRecord-Size of the related DiagnosticSecurityLevel. A non-present parameter accessDataRecordSize results in a check against 0 additional request bytes. If the length check fails, the Diagnostic Server instance shall send NRC 0x13 (IncorrectMessageLengthOrInvalidFormat).c(RS\_Diag\_04203)

[SWS_DM_00864]{DRAFT} Checking Supported Subfunction for CompareKey dThe Diagnostic Server instance shall call diag::SecurityAccess::CompareKey() ([SWS_DM_00765]) when the requested subfunction value (access type) - 1 (to get the corresponding requestSeed) is similar to the value of instance of DiagnosticSecurityAccess with request-SeedId.c(RS\_Diag\_04203)

[SWS_DM_00363]{DRAFT} Unsupported Subfunction dIf the requested subfunction value is not configured (no instances of DiagnosticSecurityAccess with requestSeedId, as well as the corresponding CompareKey values), a negative response 0x12 (SubfunctionNotSupported) shall be returned. (SubFunction not supported).c(RS\_Diag\_04196)

[SWS_DM_00846]{DRAFT} Notification about security-level change dIf Diagnostic Server instance did successfully change the security-level of a conversation, it shall update the security level of according diag::Conversation class instance internally. Whether a security level is applicable by the DiagnosticSecurityAccess is defined by securityLevel.c(RS\_Diag\_04208)

[SWS_DM_00270]{DRAFT} Counting of attempts to change security level dThe Diagnostic Server instance module shall count the number of failed attempts to change a requested security level. The Counter shall be reset if the security level change has passed successfully.c(RS\_Diag\_04208)

[SWS_DM_00271]{DRAFT} Evaluate the number of failed security level change attempts dThe Diagnostic Server instance shall compare the number of failed DiagnosticSecurityLevel changes with threshold value numFailedSecurity-Access after each failed attempt.

If the number of failed attempts is below the threshold value numFailedSecurityAccess the Diagnostic Server instance module shall send a negative response with NRC 0x35 (InvalidKey).

If the number of failed attempts reaches the threshold value numFailedSecurityAccess the Diagnostic Server instance module shall start a delay timer configured with value securityDelayTime (see [SWS_DM_00272]) and send a negative response with NRC 0x36 (exceededNumberOfAttempts).

In both cases a DiagnosticSecurityLevel change must not be done if the attempt failed before.c(RS\_Diag\_04208)

The delay timer represents the required minimum time between security access attempts, after one time negative response with NRC 0x36 (exceededNumberOfAttempts) was sent out.

[SWS_DM_00272]{DRAFT} Expiration of the delay timer dAs long as the delay timer (see [SWS_DM_00271]) configured with threshold value securityDelayTime has not expired, all requests for DiagnosticSecurityLevel change with subfunction value (access type) requestSeed shall be responded with NRC 0x37 (requiredTimeDelayNotExpired).

c(RS\_Diag\_04208)

[SWS_DM_00478]{DRAFT} Persistent Storage of failed attempts to change security level dThe Diagnostic Server instance module shall store the number of failed attempts persistently for every security access type separately. (see [SWS_DM_00270])c(RS\_Diag\_04208)

[SWS_DM_00479]{DRAFT} Blocking Timer for security access on Restart or Power down - power up cycle dThe Diagnostic Server instance module shall restart the security delay timer with the higher value of DiagnosticCommonProps.securityDelayTimeOnBoot / DiagnosticSecurityLevel.securityDelayTime of the according DiagnosticSecurityLevel if at least one of the stored numbers of failed attempts are greater or equal than the threshold value DiagnosticSecurityLevel.numFailedSecurityAccess. The behavior is equal to the behavior on runtime [SWS_DM_00272]) In case failed attempts are lower than the threshold value, the handling is equal to the behavior on runtime. (see [SWS_DM_00270] and [SWS_DM_00271])c(RS\_Diag\_04208)

[SWS_DM_00480]{DRAFT} Security Access Blocking Timer dIf DiagnosticSecurityAccessClass.sharedTimer exists and is set to true, a shared delay timer instance and shared value DiagnosticSecurityLevel.securityDelayTime shall be used for all security levels. As long as the blocking timer is running and not expired, all requests for every DiagnosticSecurityLevel change with subfunction value (access type) requestSeed shall be responded with NRC 0x37 (requiredTimeDelayNotExpired). (see [SWS_DM_00272]) If DiagnosticSecurityAccessClass.sharedTimer not exists or is set to false, an independent timer instance and timer value shall be used for each security level.c(RS\_Diag\_04208)

[SWS\_DM\_CONSTR\_00208]{DRAFT} Delay time value for sharedTimer dIf DiagnosticSecurityAccessClass.sharedTimer exists and is set to true, the value DiagnosticSecurityLevel.securityDelayTime shall be identical for all configured security levels.c(RS\_Diag\_04208)

## 7.2.1.6.9 Service 0x28 – CommunicationControl

[SWS_DM_00140]{DRAFT} Realisation of UDS service 0x28 CommunicationControl dThe Diagnostic Server instance shall implement the diagnostic service 0x28 CommunicationControl according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00252]{DRAFT} Reaction on Unsupported Subfunction dThe Diagnostic Server instance shall check, whether the Subfunction addressed by the CommunicationControl is supported by an existing DiagnosticComControl.category in the configuration and allow further processing. If the Subfunction addressed by the CommunicationControl is not supported by an existing DiagnosticComControl. category in the configuration a negative response 0x12 (SubfunctionNotSupported) shall be returned.c(RS\_Diag\_04203)

[SWS_DM_00865]{DRAFT} Communication control service processing dThe Diagnostic Server instance shall call the method diag::CommunicationControl::CommCtrlRequest ([SWS_DM_00808]) to process a communication control service.c(RS\_Diag\_04169)

[SWS_DM_00866]{DRAFT} Negative Response processing dIf the external processor raised an error according to [SWS_DM_00526], the Diagnostic Server instance shall return a negative response with the value of the error code.c(RS\_Diag\_- 04196)

[SWS_DM_00199]{DRAFT} Positive Response processing dIf the external processor did raise no ApApplicationError, the Diagnostic Server instance shall return a positive response.c(RS\_Diag\_04196)

## 7.2.1.6.10 Service 0x2E – WriteDataByIdentifier

The processing of a UDS Service WriteDataByIdentifier (0x2E) is described in ISO 14229-1[1], see in particular the evaluation sequence in Figure 21. On processing, the Diagnostic Server instance needs to perform various checks. The following requirements determine the relation between the input data to be checked and the configuration provided to the Diagnostic Server instance via DEXT parameters.

[SWS_DM_00186]{DRAFT} Realisation of UDS service WriteDataByIdentifier (0x2E) dThe Diagnostic Server instance shall implement the diagnostic service 0x2E WriteDataByIdentifier according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00415]{DRAFT} Check supported DataIdentifier dOn reception of the UDS Service WriteDataByIdentifier (0x2E), a requested DataIdentifier shall be considered as supported if and only if there exists a DiagnosticDataIdentifier with id matching the DataIdentifier and this DiagnosticDataIdentifier is referenced by a DiagnosticWriteDataByIdentifier.c(RS\_Diag\_04203)

[SWS_DM_00416]{DRAFT} Check supported DataIdentifier in active session dOn reception of the UDS Service WriteDataByIdentifier (0x2E), a requested DataIdentifier shall be considered as supported in active session if and only if the DataIdentifier is supported according to [SWS_DM_00415] and the active session passes the execution permission check as per [SWS_DM_00101].c(RS\_Diag\_04203)

[SWS_DM_00417]{DRAFT} Check supported DataIdentifier on active security level dOn reception of the UDS Service WriteDataByIdentifier (0x2E), a requested DataIdentifier shall be considered as supported on active security level if and only if the DataIdentifier is supported according to [SWS_DM_00415] and the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_Diag\_- 04203)

[SWS_DM_00572]{DRAFT} Writing data for requested DataIdentifier dOn reception of the UDS Service WriteDataByIdentifier (0x2E) the Diagnostic Server instance shall retrieve the data for a DataIdentifier from the mapped RPortPrototypes.c (RS\_Diag\_04097)

[SWS_DM_00573]{DRAFT} Reaction on ApplicationError dIf the Result of external processor has an error of ara::diag::DiagUdsNrcErrorDomain, the Diagnostic Server instance shall return a negative response with the value of the error code.c(RS\_Diag\_04196)

## 7.2.1.6.11 Service 0x31 – RoutineControl

[SWS_DM_00201]{DRAFT} Realization of UDS service RoutineControl (0x31) dThe Diagnostic Server instance shall implement the diagnostic service RoutineControl (0x31) according to ISO 14229-1[1] for subFunctions startRoutine, stopRoutine and requestRoutineResults.c(RS\_Diag\_04196, RS\_Diag\_04224)

[SWS_DM_00202]{DRAFT} Check for Supported RoutineIdentifier and Reaction dThe Diagnostic Server instance shall check, whether the RoutineIdentifier addressed by the UDS Service RoutineControl (0x31) is supported by an existing DiagnosticRoutine with a matching id in the configuration. If the RoutineIdentifier addressed by the UDS Service RoutineControl (0x31) is not supported a negative response with NRC 0x31 (requestOutOfRange) shall be returned.c(RS\_Diag\_04203, RS\_Diag\_04224)

[SWS_DM_00448]{DRAFT} Check supported RoutineIdentifier subfunction in active session dOn reception of the UDS Service RoutineControl (0x31), a requested subfunction of a RoutineIdentifiershall be considered as supported in active session if and only if the RoutineIdentifier is supported according to [SWS_DM_00202] and the active session passes the execution permission check. If the session permission check fails, NRC 0x31 shall be returned.c(RS\_Diag\_04203, RS\_Diag\_04224)

[SWS_DM_00437]{DRAFT} Check supported RoutineIdentifier subfunction on active security level dOn reception of the UDS Service RoutineControl (0x31), a requested subfunction of a RoutineIdentifier shall be considered as supported on active security level if and only if the RoutineIdentifier is supported according to [SWS_DM_00202] and the active security level passes the execution permission check as per [SWS_DM_00450].c(RS\_Diag\_04203, RS\_Diag\_04224)

[SWS_DM_00203]{DRAFT} Check for Supported Subfunction and Reaction dThe Diagnostic Server instance shall check, whether the Subfunction addressed by the UDS Service RoutineControl (0x31) is supported by checking the existence of the corresponding attributes start or stop or requestResult in the related DiagnosticRoutine configuration. If the Subfunction addressed by the UDS Service RoutineControl (0x31) is not supported by the configuration a negative response NRC 0x12 (SubfunctionNotSupported) shall be returned.c(RS\_Diag\_04203, RS\_Diag\_04224)

[SWS_DM_00574]{DRAFT} UDS Service RoutineControl (0x31) startRoutine processing dThe Diagnostic Server instance shall call the diag::GenericRoutine::Start ([SWS_DM_00554]) or Routine::Start ([SWS_DM_00591]) according to the mapped diagnostic interface to process the subfunction startRoutine.c(RS\_Diag\_04196, RS\_Diag\_04224)

[SWS_DM_00575]{DRAFT} UDS Service RoutineControl (0x31) requestRoutineResults processing dThe Diagnostic Server instance shall call diag::GenericRoutine::RequestResults() ([SWS_DM_00554]) or Routine::RequestResults ([SWS_DM_00593]) according to the mapped diagnostic interface to process the subfunction requestRoutineResults.c(RS\_Diag\_04196, RS\_Diag\_04224)

[SWS_DM_00576]{DRAFT} UDS Service RoutineControl (0x31) stopRoutine processing dThe Diagnostic Server instance shall call Routine::Stop ([SWS_DM_00592]) or diag::GenericRoutine::Stop ([SWS_DM_00555]) according to the mapped diagnostic interface to process the subfunction stopRoutine.c (RS\_Diag\_04196, RS\_Diag\_04224)

## 7.2.1.6.12 Service 0x34 – RequestDownload

[SWS_DM_00128]{DRAFT} Realization of UDS service RequestDownload (0x34) dThe Diagnostic Server instance shall implement the UDS service Request-Download (0x34) according to ISO 14229-1[1].c(RS\_Diag\_04196, RS\_Diag\_04033)

[SWS_DM_00446]{DRAFT} Check Support of UDS service RequestDownload (0x34) in active session dOn reception of the UDS service RequestDownload (0x34), the service shall be considered as supported in active session if and only if the active session passes the execution permission check as per [SWS_DM_00101].c(RS\_- Diag\_04203)

[SWS_DM_00447]{DRAFT} Check Support of UDS service RequestDownload (0x34) on active security level dOn reception of the UDS service RequestDownload (0x34), the service shall be considered as supported on active security level if and only if the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_Diag\_04203)

[SWS_DM_00867]{DRAFT} UDS service RequestDownload (0x34) processing dThe Diagnostic Server instance shall call diag::DownloadService::RequestDownload ([SWS_DM_00789]) to process an UDS service RequestDownload (0x34).c(RS\_Diag\_04196)

## 7.2.1.6.13 Service 0x35 – RequestUpload

[SWS_DM_00134]{DRAFT} Realization of UDS service RequestUpload (0x35) dThe Diagnostic Server instance shall implement the UDS service RequestUpload (0x35) according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00438]{DRAFT} Check Support of UDS service RequestUpload (0x35) in active session dOn reception of the UDS service RequestUpload (0x35), the service shall be considered as supported in active session if and only if the active session passes the execution permission check as per [SWS_DM_00101].c(RS\_Diag\_04203)

[SWS_DM_00439]{DRAFT} Check Support of UDS service RequestUpload (0x35) on active security level dOn reception of the UDS service RequestUpload (0x35), the service shall be considered as supported on active security level if and only if the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_- Diag\_04203)

[SWS_DM_00868]{DRAFT} UDS service RequestUpload (0x35) processing dThe Diagnostic Server instance shall call diag::UploadService::RequestUpload ([SWS_DM_00799]) to process a UDS service RequestUpload (0x35).c(RS\_Diag\_04033)

## 7.2.1.6.14 Service 0x36 – TransferData

[SWS_DM_00137]{DRAFT} Realization of UDS service TransferData (0x36) dThe Diagnostic Server instance shall implement the UDS service TransferData (0x36) according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00440]{DRAFT} Check Support of UDS service TransferData (0x36) in active session dOn reception of the UDS service TransferData (0x36), the service shall be considered as supported in active session if and only if the active session passes the execution permission check as per [SWS_DM_00101].c(RS\_Diag\_04203)

[SWS_DM_00441]{DRAFT} Check Support of UDS service TransferData (0x36) on active security level dOn reception of the UDS service TransferData (0x36), the service shall be considered as supported on active security level if and only if the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_- Diag\_04203)

[SWS_DM_00869]{DRAFT} UDS service TransferData (0x36) processing dThe Diagnostic Server instance shall call diag::GenericUDSService::HandleMessage() ([SWS_DM_00618]) to process an UDS service TransferData (0x36).c(RS\_Diag\_04033)

ISO 14229-1[1] provides a UDS service TransferData (0x36) specific NRC evaluation sequence. This sequence has checks that in rotating order needs to be done by the Diagnostic Server instance and by the service processor itself. Therefore before actually running the service processor, the service processor needs means to do a certain verification step. As the “GenericUDSService class” has only one single method this is not possible for the “GenericUDSService class”. As a result of this, the entire service specific NRC handling is inside the “GenericUDSService class” for UDS service TransferData (0x36).

[SWS_DM_00870]{DRAFT} UDS service TransferData (0x36) validation dThe Diagnostic Server instance shall realize all service specific NRC validation with diag::GenericUDSService [SWS_DM_00602].c(RS\_Diag\_04033)

## 7.2.1.6.15 Service 0x37 – RequestTransferExit

[SWS_DM_00141]{DRAFT} Realization of UDS service RequestTransferExit (0x37) dThe Diagnostic Server instance shall implement the UDS service RequestTransferExit (0x37) according to ISO 14229-1[1].c(RS\_Diag\_04196)

[SWS_DM_00442]{DRAFT} Check Support of UDS service RequestTransferExit (0x37) in active session dOn reception of the UDS service RequestTransferExit (0x37), the service shall be considered as supported in active session if and only if the active session passes the execution permission check as per [SWS_DM_00101].c (RS\_Diag\_04203)

(0x37) on active security level dOn reception of the UDS service RequestTransfer-Exit (0x37), the service shall be considered as supported on active security level if and only if the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_Diag\_04203)

[SWS_DM_00871]{DRAFT} UDS service RequestTransferExit (0x37) processing dThe Diagnostic Server instance shall call diag::GenericUDSService::HandleMessage ([SWS_DM_00618]) to process a UDS service RequestTransferExit (0x37).c(RS\_Diag\_04033)

[SWS_DM_00872]{DRAFT} UDS service RequestTransferExit (0x37) validation dThe Diagnostic Server instance shall realize all service specific NRC validation with the diag::GenericUDSService class ([SWS_DM_00602]) of the service processors.c(RS\_Diag\_04033)

## 7.2.1.6.16 Service 0x3E – TesterPresent

[SWS_DM_00126]{DRAFT} Realisation of UDS service 0x3E TesterPresent dThe Diagnostic Server instance shall internally implement the diagnostic service 0x3E TesterPresent according to ISO 14229-1[1].c(RS\_Diag\_04196)

## 7.2.1.6.17 Service 0x85 – ControlDTCSetting

The UDS service ControlDTCSetting is used by a client to stop or resume the updating of DTC status bits in the server.

[SWS_DM_00229]{DRAFT} Support of UDS service ControlDTCSetting (0x85) dThe Diagnostic Server instance shall provide the UDS service ControlDTC-Setting (0x85) according to ISO 14229-1[1].c(RS\_Diag\_04180, RS\_Diag\_04159)

[SWS_DM_00444]{DRAFT} Check Support of UDS service ControlDTCSetting (0x85) in active session dOn reception of the UDS service ControlDTCSetting (0x85), a requested subfunction shall be considered as supported in active session if and only if the active session passes the execution permission check as per [SWS_DM_00101].c (RS\_Diag\_04203)

[SWS_DM_00445]{DRAFT} Check Support of UDS service ControlDTCSetting (0x85) on active security level dOn reception of the UDS service ControlDTCSetting (0x85), a requested subfunction shall be considered as supported on active security level if and only if the active security level passes the execution permission check as per [SWS_DM_00103].c(RS\_Diag\_04203)

[SWS_DM_00230]{DRAFT} Check for supported subfunctions dIf the Subfunction addressed by the UDS service ControlDTCSetting (0x85) according to [SWS_DM_00229] is not supported by the configuration, i.e., there is no DiagnosticControlDTCSetting configured with dtcSettingParameter matching the requested Subfunction value, the Diagnostic Server instance shall return a NRC 0x12 (SubfunctionNotSupported).c(RS\_Diag\_04203)

[SWS_DM_00231]{DRAFT} Invalid value for optional request parameter dIf the Diagnostic Server instance receives a UDS service ControlDTCSetting (0x85) request with DTCSettingControlOptionRecord != 0xFFFFFF, the Diagnostic Server instance shall send a NRC 0x31 (RequestOutOfRange).c(RS\_Diag\_- 04203, RS\_Diag\_04115)

[SWS_DM_00909]{DRAFT} Support of Subfunction 0x01 (ON) dIf the Diagnostic Server instance receives a valid UDS service ControlDTCSetting (0x85) with Subfunction 0x01 (ON) and optionally with DTCSettingControlOptionRecord of value 0xFFFFFF, the Diagnostic Server instance shall:

• enable the update of the UDS DTC status byte

• enable the storage in event memory

• update diag::DTCInformation::ControlDtcStatusType ([SWS_DM_00663]) to kDTCSettingOn

c(RS\_Diag\_04180, RS\_Diag\_04159)

[SWS_DM_00910]{DRAFT} Support of Subfunction 0x02 (OFF) dIf the Diagnostic Server instance receives a valid UDS service ControlDTCSetting (0x85) with Subfunction 0x02 (OFF) and optionally with DTCSettingControlOptionRecord of value 0xFFFFFF, the Diagnostic Server instance shall:

• disable the update of the UDS DTC status byte

• disable the storage in event memory

• update diag::DTCInformation::ControlDtcStatusType ([SWS_DM_00663]) to kDTCSettingOff

c(RS\_Diag\_04180, RS\_Diag\_04159)

[SWS_DM_00811]{DRAFT} Re-enabling of ControlDTCSetting by Diagnostic Application dIn case the DTCSetting is disabled and the Diagnostic Server receives a call EnableControlDtc function ([SWS_DM_00674]) the Diagnostic Server instance shall:

• enable the update of the UDS DTC status byte

• enable the storage in event memory

• update diag::DTCInformation::ControlDtcStatusType ([SWS_DM_00663]) to kDTCSettingOn

Hint: The monitoring application is responsible for the re-enabling of ControlDTCSetting in case some conditions or states demands so. For this purpose the application can use the interface diag::DTCInformation with the function EnableControlDtc() ([SWS_DM_00674]).

## 7.2.1.6.18 Service 0x86 – ResponseOnEvent

With the UDS Service ResponseOnEvent (0x86), a tester requests an ECU to start or stop transmission of responses initiated by a specified event. Upon registering an event for transmission, the tester also specifies the corresponding service to respond to (e.g: UDS Service ReadDataByIdentifier 0x22).

<table><tr><td rowspan=1 colspan=1>Sub functionID</td><td rowspan=1 colspan=1>Sub-function name</td><td rowspan=1 colspan=1>Kind ofsub-function</td><td rowspan=1 colspan=1>ServiceToRespondTo</td><td rowspan=1 colspan=1>Supportstatus</td></tr><tr><td rowspan=1 colspan=1>0x00/0x40</td><td rowspan=1 colspan=1>stopResponseOnEvent</td><td rowspan=1 colspan=1>Control</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x01/0x41</td><td rowspan=1 colspan=1>onDTCStatusChange</td><td rowspan=1 colspan=1>Setup</td><td rowspan=1 colspan=1>0x19, 0x0E</td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x02/0x42</td><td rowspan=1 colspan=1>onTimerInterrupt</td><td rowspan=1 colspan=1>Setup</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Not supported</td></tr><tr><td rowspan=1 colspan=1>0x03/0x43</td><td rowspan=1 colspan=1>onChangeOfDataldentifier</td><td rowspan=1 colspan=1>Setup</td><td rowspan=1 colspan=1>0x22</td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x04</td><td rowspan=1 colspan=1>reportActivatedEvents</td><td rowspan=1 colspan=1>Control</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x05/0x45</td><td rowspan=1 colspan=1>StartResponseOnEvent</td><td rowspan=1 colspan=1>Control</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x06/0x46</td><td rowspan=1 colspan=1>clearResponseOnEvent</td><td rowspan=1 colspan=1>Control</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>0x07/0x47</td><td rowspan=1 colspan=1>onComparisonOfValues</td><td rowspan=1 colspan=1>Setup</td><td rowspan=1 colspan=1>0x22</td><td rowspan=1 colspan=1>Supported</td></tr><tr><td rowspan=1 colspan=1>Other</td><td rowspan=1 colspan=1>OEM Specific</td><td rowspan=1 colspan=1>Setup</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>Not supported</td></tr></table>

Table 7.3: Supported sub function of ResponseonEvent (0x86)

[SWS_DM_00491]{DRAFT} Realisation of UDS service 0x86 ResponseOnEvent dThe DM shall internally implement the diagnostic service 0x86 ResponseOnEvent according to ISO 14229-1[1].c(RS\_Diag\_04160)

[SWS_DM_00492]{DRAFT} Client Server communication dThe service ResponseOnEvent is related to a distinct client, i.e. the client performing the ResponseOn-Event initialisation receives the serviceToRespondTo-responses.c(RS\_Diag\_04160)

[SWS_DM_00493]{DRAFT} Reestablishing of Client Server communication dIn case of a canceled diagnostic conversation this client receives the serviceToRespondTo-responses after a successful reestablishing of a diagnostic conversation.c(RS\_Diag\_04160)

[SWS_DM_00494]{DRAFT} Supported sub functions of ResponseOnEvent service dThe client can request different subfunctions of service ResponseOnEvent to initialised ResponseOnEvent services. The ECU supported subfunctions are listed in Table 7.3 Supported sub function of Response on Event (0x86).c(RS\_Diag\_04160)

[SWS_DM_00495]{DRAFT} Start initialisation of ResponseOnEvent dThe subfunction startResponseOnEvent shall always control all initialised ResponseOnEvent services.c(RS\_Diag\_04160)

[SWS_DM_00496]{DRAFT} Stop initialisation of ResponseOnEvent dThe subfunction stopResponseOnEvent shall always control all initialised ResponseOnEvent services.c(RS\_Diag\_04160)

[SWS_DM_00497]{DRAFT} Clear initialisation of ResponseOnEvent dThe subfunction clearResponseOnEvent shall set the ResponseOnEvent services to status ResponseOnEvent-cleared.c(RS\_Diag\_04160)

[SWS_DM_00498]{DRAFT} Exclusive ResponseOnEvent ressources dThere is only one ResponseOnEvent resource per server which can be used by multiple clients.c(RS\_Diag\_04160)

[SWS_DM_00499]{DRAFT} Replacement of a not started ResponseOnEvent initialisation dIf a new ResponseOnEvent initialisation is requested from a second client while a previous ResponseOnEvent initialisation is not started the new ResponseOn-Event initialisation replaces the previous ResponseOnEvent initialisation.c(RS\_Diag\_- 04160)

[SWS_DM_00500]{DRAFT} Replacement of a started ResponseOnEvent initialisation dIf a new ResponseOnEvent initialisation is requested from a second client while a previous ResponseOnEvent initialisation is active the ResponseOnEvent services have to be stopped and the new ResponseOnEvent initialisation replaces the previous ResponseOnEvent initialisation.c(RS\_Diag\_04160)

[SWS_DM_00501]{DRAFT} Behavior while trying ResponseOnEvent activation while ResponseOnEvent is not initialised dA NRC 0x24 has to be sent if a ResponseOnEvent service is not initialised.c(RS\_Diag\_04160)

Note: The upcoming ISO 14229-1 will provides a more detailed description of ResponseOnEvent handling.

## 7.2.1.6.19 Custom Diagnostic Services

[SWS_DM_00502]{DRAFT} Support for Custom Diagnostic Services dCustom Diagnostic Services shall be supported according to ISO 14429-1[1], table 2 - service identifier values, to allow UDS services, which are defined by OEM / system suppliers.c(RS\_Diag\_04177)

Meta-class DiagnosticCustomServiceInstance can be used to define the instance of a Custom Service. Modeling of Custom Diagnostic Services is described in the TPS Manifest Specification [ [12]].

## 7.2.1.7 Cancellation of a Diagnostic Conversation

There are two root causes for the cancellation of a Diagnostic Conversation:

• Replacement by a newly requested Diagnostic Conversation according to [SWS_DM_00431],

• Maximum number of busy responses reached (according to [SWS_DM_00369])

This section describes the actions to be performed on cancellation of a Diagnostic Conversation.

[SWS_DM_00482]{DRAFT} Cancellation of a Diagnostic Conversation dCancellation of a Diagnostic Conversation shall be performed according to [SWS_DM_00277], [SWS_DM_00278], [SWS_DM_00279], [SWS_DM_00280], [SWS_DM_00847].c(RS\_Diag\_04167)

[SWS_DM_00277]{DRAFT} Cancellation of a Diagnostic Conversation in case of External Service Processing dOn Cancellation of a Diagnostic Conversation in case a diagnostic request is currently processed on this Diagnostic Conversation by a service processor external to the Diagnostic Server instance, the Diagnostic Server instance shall notify this external service processor, that the processing for this service shall be canceled according to [SWS_DM_00577].c(RS\_- Diag\_04167)

[SWS_DM_00278]{DRAFT} Cancellation of a Diagnostic Conversation in case of Internal Processing dOn Cancellation of a Diagnostic Conversation in case a diagnostic request is currently processed on this protocol internally within the Diagnostic Server instance, the Diagnostic Server instance shall abort started activity as far as possible.c(RS\_Diag\_04167)

[SWS_DM_00279]{DRAFT} Cancellation of a Diagnostic Conversation before Response Transmission dOn Cancellation of a Diagnostic Conversation in case a diagnostic request is currently processed on this protocol and response transmission has not yet been started, the Diagnostic Server instance shall skip sending any response, which implies not to call Transmit ([SWS_DM_00327]) of the respective UDS Transport Protocol Handler.c(RS\_Diag\_04167)

[SWS_DM_00280]{DRAFT} Cancellation of a Diagnostic Conversation at Response Transmission dOn Cancellation of a Diagnostic Conversation in case a diagnostic request is currently processed on this Diagnostic Conversation and Transmit ([SWS_DM_00327]) of the UDS TransportLayer was already called, nothing has to be done by the Diagnostic Server instance. This implies a sent out response.c(RS\_Diag\_04167)

[SWS_DM_00847]{DRAFT} Reinitialization of Service Instance on Cancellation of a Diagnostic Conversation dOn Cancellation of a Diagnostic Conversation, the Diagnostic Server instance shall reset the values of the fields of the associated diag::Conversation class Instance according to [SWS_DM_00843].c (RS\_Diag\_04167)

[SWS_DM_00577]{DRAFT} Canceling external service processors dExternal service processors, which are supporting a CancellationHandler shall be signaled via the ara::diag::CancellationHandler ([SWS_DM_00608]) to cancel their processing.c(RS\_Diag\_04167)

## 7.2.2 Diagnostic Event Management

## 7.2.2.1 Diagnostic Events

## 7.2.2.1.1 Definition

Diagnostic events are used by applications to report the state of a monitored entity to the DM. An event uniquely identifies the monitored entity in the system. The DM receives event notifications from the applications and performs defined actions such as DTC status changes or capturing and storage of extended data records or snapshot records. In other words, events are the input source for the Diagnostic Event Management unit of the DM.

![](./images/c02_71e4bffba5abcda689f8df2223d820a801f390bfb2ac797597fd78e4867c075d.jpg)  
Figure 7.3: Example of diagnostic event usage

[SWS_DM_00007]{DRAFT} Uniqueness of diagnostic events dAn event is unique within the system and the DM shall only support notifications for a certain event from one single source. This implies that only one application can report a certain event and the event reporting interface is explicitly not re-entrant.c(RS\_Diag\_04063, RS\_- Diag\_04179)

[SWS_DM_00873]{DRAFT} Diagnostic event processing interface dThe DM shall provide an instance of ara::diag::Event ([SWS_DM_00646]) per configured DiagnosticEvent.c(RS\_Diag\_04179)

The available events are derived from DiagnosticEvent.

[SWS_DM_00165]{DRAFT} Considering only events referencing a DTC dThe DM shall consider configured events according to [SWS_DM_00873] only if a DiagnosticEventToTroubleCodeUdsMapping exists referencing the DiagnosticEvent and a DiagnosticEventToTroubleCodeUdsMapping.trouble-CodeUds.c(SRS\_Diag\_04180)

## 7.2.2.1.2 Monitors

A diagnostic monitor is a routine running inside an AA entity determining the proper functionality of a component. This monitoring function identifies a specific fault type (e.g. short-circuit to ground, missing signal, etc.) for a monitoring path. A monitoring path represents the physical system or a circuit, that is being monitored (e.g. sensor input). Each monitoring path is associated with exactly one diagnostic event.

In general diagnostic monitors are independent from the DM. Once the ECU is started and initialized they are permanently monitoring a part of the system and reporting the state to the DM. There are use cases, where it might not be required to continue to monitor the system part and the monitor could stop it’s task until a certain situation arises.

Besides to the reporting direction of the monitors (AAs report the monitoring status towards the DM), there is also a connection in the opposite direction: The DM uses the initMonitor notifier method of the ara::diag::Monitor::Monitor ([SWS_DM_00548], [SWS_DM_00549] or [SWS_DM_00550]) instance to trigger a (re-)initialization of diagnostic monitors in the AA. The initMonitor notifier method is registered via the ara::diag::Monitor::Monitor constructors.

[SWS_DM_00562]{DRAFT} Monitor initialization for clearing reason dIf an associated DTC, belonging to the current monitoring path, was actually cleared via the Clear() function of the ara::diag::DTCInformation instance ([SWS_DM_00671]), the DM shall call the registered initMonitor notifier method with the parameter InitMonitorReason ([SWS_DM_00548], [SWS_DM_00549] or [SWS_DM_00550]) set to kClear ([SWS_DM_00540]).c(RS\_Diag\_04185)

[SWS_DM_00563]{DRAFT} Monitor initialization for operation cycle restart reason dIf a diagnostic event was (re)started by calling the ara::diag::OperationCycle method SetOperationCycle ([SWS_DM_00756]) with the parameter kOperationCycleStart ([SWS_DM_00750]), the DM shall call the registered initMonitor notifier method with the parameter InitMonitorReason ([SWS_DM_00548], [SWS_DM_00549] or [SWS_DM_00550]) set to value kRestart ([SWS_DM_00540]).c(RS\_Diag\_04186)

reason dIn case an enable condition mapped to the diagnostic event was changed to fulfilled and in this way all related enable conditions of the event were fulfilled, the DM shall call the registered initMonitor() notifier method ([SWS_DM_00548]) with initMonitorReason parameter set to the value kReenabled ([SWS_DM_00540]).c(RS\_Diag\_04125, RS\_Diag\_04192)

The detailed description of enable conditions can be found in section 7.2.2.4.3.

[SWS_DM_00565]{DRAFT} Monitor initialization for DTC setting re-enabling reason dIn case DTC-setting is re-enabled via the UDS service request ControlDTC-Setting - 0x85 (see ISO 14229-1[1]), the DM shall call the registered initMonitor() notifier method ([SWS_DM_00548]) with initMonitorReason parameter set to the value kReenabled ([SWS_DM_00540]).c(RS\_Diag\_04125, RS\_Diag\_04159)

For reference see paragraph 7.2.1.6.17.

## 7.2.2.1.3 Reporting

Per diagnostic monitor an instance of the class ara::diag::Monitor ([ SWS\_DM\_00542]) is created by the application. Diagnostic results are reported to the DM via the method ReportMonitorAction() ([SWS_DM_00543]) of class ara::diag::Monitor. The method ReportMonitorAction() calculates the update of the corresponding instance of ara::diag::Event ([SWS_DM_00646]) (from DiagnosticEvent) and the UDS DTC status byte as well as the storage in the event memory and the capturing of DTC related data. The DM provides also means to ignore a certain call of ReportMonitorAction() in some situations.

[SWS_DM_00567]{DRAFT} Ignoring reported events for not started operation cycles dIf the function ReportMonitorAction() ([SWS_DM_00543]) was called and the referenced DiagnosticOperationCycle of this reported DiagnosticEvent (via DiagnosticEventToOperationCycleMapping) is set to kOperationCycleEnd, the DM shall do no processing and set the error kReportIgnored to the Result.c(RS\_Diag\_04178)

For more details about operation cycles see subsubsection 7.2.2.3.

## 7.2.2.1.4 Debouncing

Debouncing of reported events is the capability of the DM to filter out undesirable noise reported by monitors. This is used to mature the result of the monitor.

Debouncing means that a report from a monitor does not immediately lead to a change of the UDS DTC status bit kTestFailed but that a delaying threshold value must be reached before. This results in the states for ara::diag::Event::DebouncingState (compare [SWS_DM_00645]). If this threshold value is reached (FDC-equivalent is +127 $(\mathrm{FDC}_{ \mathrm{max} })$ or -128 $(\mathrm{FDC}_{ \mathrm{min} }))$ , the DebouncingState is either kFinallyDefective or kFinallyHealed. This finally also leads to a change of the UDS DTC status bit kTestFailed.

There are two kind of different debounce algorithms implemented by the DM:

• Counter-based debouncing

• Time-based debouncing

Besides the here described debouncing algorithms within the DM implementation, there is also the possibility to do the debouncing monitor-internal within the AA (compare [SWS_DM_00548]). But since this is not part of the DM, no further details are given here.

Which algorithm is used can be configured on a per event basis.

[SWS_DM_00013]{DRAFT} Events without debouncing dIf an event is not referenced by any DiagnosticEventToDebounceAlgorithmMapping.diagnosticEvent, the DM shall not use a debounce algorithm for this event.c(RS\_Diag\_- 04068)

A monitoring application will call the ReportMonitorAction() ([SWS_DM_00543]) with kPrepassed or kPrefailed ([SWS_DM_00541]) for events, that are debounced by the DM.

[SWS_DM_00874]{DRAFT} Reporting kPrepassed or kPrefailed for events without an assigned debouncing algorithm dA new received ReportMonitorAction ([SWS_DM_00543]) with kPrepassed or kPrefailed ([SWS_DM_00541]) for an diagnostic event without assigned debouncing algorithm, the DM shall interpret a reported kPrepassed as kPassed and kPrefailed as kFailed.c(RS\_Diag\_- 04068)

## 7.2.2.1.4.1 Counter-based debouncing

Counter-based debouncing is done on a per event based counting policy of reported kPrepassed or kPrefailed ([SWS_DM_00541]) from diagnostic monitors. Per event an internal debounce counter is used. Passed or failed event states for events are calculated by evaluating configured thresholds of the internal debounce counter.

[SWS_DM_00014]{DRAFT} Use of counter-based debouncing for events dA DiagnosticEvent shall be subject to counter-based debouncing if the DiagnosticEvent is referenced in the role diagnosticEvent by a DiagnosticEvent-ToDebounceAlgorithmMapping, where the referenced debounceAlgorithm aggregates a DiagEventDebounceCounterBased in the role debounceAlgorithm.c (RS\_Diag\_04068)

[SWS_DM_00018]{DRAFT} Internal debounce counter init and storage dIf DiagnosticDebounceAlgorithmProps.debounceCounterStorage is set to false, the DM shall initialize the event’s internal debounce counter to ’0’ upon start-up. If DiagnosticDebounceAlgorithmProps.debounceCounterStorage is set to true, the DM shall initialize the event’s internal debounce counter to the value stored in nonvolatile memory.c(RS\_Diag\_04124)

[SWS_DM_00028]{DRAFT} Debounce counter persistency dIf DiagnosticDebounceAlgorithmProps.debounceCounterStorage is set to True, the DM shall store the current value of the debounce counter in non-volatile memory.c(RS\_Diag\_- 04124)

[SWS_DM_00017]{DRAFT} Calculation of the FDC based on the internal debounce counter dThe DM shall calculate the FDC based on the value and range of the internal debounce counter by linear mapping.c(RS\_Diag\_04125, RS\_Diag\_04190)

## [SWS_DM_00875]{DRAFT} Internal debounce counter incrementation dThe DM

shall increment the event’s internal debounce counter by the configured step-size value of DiagEventDebounceCounterBased.counterIncrementStepSize, when the related monitor calls the method ReportMonitorAction ([SWS_DM_00543]) with kPrefailed ([SWS_DM_00541]).c(RS\_Diag\_04125, RS\_Diag\_04068)

## [SWS_DM_00024]{DRAFT} Qualified failed event using counter-based debounc-

ing dIf the internal debounce counter is greater or equal to DiagEventDebounce-CounterBased.counterFailedThreshold the DM shall process the event as kFinallyDefective ([SWS_DM_00645]).c(RS\_Diag\_04125, RS\_Diag\_04068)

[SWS_DM_00876]{DRAFT} Internal debounce counter decrementation dThe DM shall decrement the event’s internal debounce counter by the configured stepsize value of DiagEventDebounceCounterBased.counterDecrementStep-Size, when the related monitor calls the method ReportMonitorAction ([SWS_DM_00543]) with kPrepassed ([SWS_DM_00541]).c(RS\_Diag\_04125, RS\_- Diag\_04068)

## [SWS_DM_00025]{DRAFT} Qualified passed event using counter-based de-

bouncing dIf the internal debounce counter is less or equal to DiagEventDebounce-CounterBased.counterPassedThreshold the DM shall process the event as kFinallyHealed ([SWS_DM_00645]).c(RS\_Diag\_04125, RS\_Diag\_04068)

## [SWS_DM_00021]{DRAFT} Direct failed qualification of counter-based events dIf

the monitor reports kFailed, the DM shall set the internal debounce counter to the value DiagEventDebounceCounterBased.counterFailedThreshold and process the event as kFinallyDefective ([SWS_DM_00645]).c(RS\_Diag\_04125, RS\_Diag\_04068)

## [SWS_DM_00029]{DRAFT} Direct passed qualification of counter-based events

dIf the monitor reports kPassed, the DM shall set the internal debounce counter to the value DiagEventDebounceCounterBased.counterPassedThreshold and process the event as kFinallyHealed ([SWS_DM_00645]).c(RS\_Diag\_04125, RS\_- Diag\_04068)

[SWS_DM_00022]{DRAFT} Debounce counter jump up behavior dIf DiagEvent-DebounceCounterBased.counterJumpUp is set to true for an event, the DM shall set the event’s internal debounce counter to DiagEventDebounceCounterBased.counterJumpUpValue if kPrefailed is reported for this event and the current debounce counter value is less than DiagEventDebounceCounter-Based.counterJumpUpValue. After setting the internal debounce counter to DiagEventDebounceCounterBased.counterJumpUpValue the processing according to [SWS_DM_00875] shall be done.c(RS\_Diag\_04068)

[SWS_DM_00023]{DRAFT} Debounce counter jump down behavior dIf kPrepassed is reported for an event and the current debounce counter value is greater than DiagEventDebounceCounterBased.counterJumpDownValue and counterJumpDown is set to true for this event, the DM shall set the event’s internal debounce counter to DiagEventDebounceCounterBased.counter-JumpDownValue. After setting the internal debounce counter to DiagEventDebounceCounterBased.counterJumpDownValue the processing according to [SWS_DM_00876] shall be done.c(RS\_Diag\_04068)

![](./images/c02_4199a98617d62dea50aea6d0718751da6ada25d5b704904644780cacaa8612c4.jpg)  
Figure 7.4: Counter-based debouncing

## 7.2.2.1.4.2 Time-based debouncing

Time-based debouncing is done on a per event based counting policy of reported kPrepassed or kPrefailed from diagnostic monitors. Per event an internal debounce timer value is used. Passed or failed event states for events are calculated by evaluating configured thresholds of the internal debounce counter.

[SWS_DM_00015]{DRAFT} Use of timer based debouncing for events dThe existence of a DiagnosticEventToDebounceAlgorithmMapping with an aggregation of DiagEventDebounceTimeBased by the referenced DiagnosticDebounceAlgorithmProps.debounceAlgorithm shall activate a time-based debouncing for this event.c(RS\_Diag\_04225)

[SWS_DM_00085]{DRAFT} Internal debounce counter init dThe DM shall initialize the event’s internal debounce counter to ’0’ upon start-up.c(RS\_Diag\_04225)

Note: debounceCounterStorage is not supported for time-based debouncing.

[SWS_DM_00030]{DRAFT} Calculation of the FDC based on the internal debounce timer dThe DM shall calculate the FDC based on the value and range of the internal debounce timer by linear mapping.c(RS\_Diag\_04225, RS\_Diag\_04190)

The debounce counter is used to count upon a kPrefailed towards the qualified failed and upon a kPrepassed towards a qualified passed.

[SWS_DM_00877]{DRAFT} Starting time-based event debouncing for failed dThe DM module shall start the debounce timer when the related monitor calls the method ReportMonitorAction ([SWS_DM_00543]) with kPrefailed ([SWS_DM_00541]) to qualify the reported event as kFinallyDefective only when the following conditions are met:

• The debounce timer for the event is not already counting towards kFinallyDefective.

• The event is not already qualified as kFinallyDefective.

## c(RS\_Diag\_04225)

[SWS_DM_00032]{OBSOLETE} Restrictions on restarting a running event debounce timer for failed dObsolete, since redundant to [SWS_DM_00877]. If the debounce timer of a specific event is already counting towards kFinallyDefective, the DM shall not restart the debounce timer upon a further report of kPrefailed.c (RS\_Diag\_04225)

[SWS_DM_00033]{DRAFT} Debounce timer behavior upon reported failed dIf the monitor reports kFailed, the DM shall set the debounce timer value to DiagEvent-DebounceTimeBased.timeFailedThreshold and process the event as kFinallyDefective.c(RS\_Diag\_04225)

[SWS_DM_00878]{DRAFT} Starting time-based event debouncing for passed dThe DM module shall start the debounce timer when the related monitor calls the method ReportMonitorAction ([SWS_DM_00543]) with kPrepassed ([SWS_DM_00541]) to qualify the reported event as kFinallyHealed only when the following conditions are met:

• The debounce timer for the event is not already counting towards kFinally-Healed.

• The event is not already qualified as kFinallyHealed.

c(RS\_Diag\_04225)

[SWS_DM_00035]{OBSOLETE} Restrictions on restarting a running event debounce timer for passed dObsolete, since redundant to [SWS_DM_00878]. If the debounce timer of a specific event is already counting towards kFinallyHealed, the DM shall not restart the debounce timer upon a further report of kPrepassed.c(RS\_- Diag\_04225)

[SWS_DM_00036]{DRAFT} Debounce timer behavior upon reported passed dIf the monitor reports kPassed, the DM shall set the debounce timer value to DiagEventDebounceTimeBased.timePassedThreshold and process the event as kFinallyHealed.c(RS\_Diag\_04225)

![](./images/c02_a90d94f589e9b8b81e8dabe9ade798113da552033a246c689c5b0cd4ee083864.jpg)  
Figure 7.5: Timer based debouncing

[SWS_DM_00880]{DRAFT} Debounce time freeze request dIf the ReportMonitorAction ([SWS_DM_00543]) method of a ara::diag::Monitor instance is called with kFreezeDebouncing ([SWS_DM_00541]), the DM shall freeze the related debounce timer of the corresponding event.c(RS\_Diag\_04068, RS\_Diag\_04225)

Freezing of the timer is only supported for events with DiagEventDebounceTime-Based debouncing.

[SWS_DM_00038]{DRAFT} Continuing a frozen debounce timer dIf a debounce timer is frozen (i.e. the corresponding monitor has called ReportMonitorAction() with kFreezeDebouncing (see [SWS_DM_00541])) and a new kPrepassed or kPrefailed is reported for this event, the DM module shall continue running the debounce timer starting with the frozen value.c(RS\_Diag\_04225)

## 7.2.2.1.4.3 Debounce algorithm reset

In some situations the application might want to reset the debouncing or to freeze it. The DM provides the parameters kFreezeDebouncing and kResetDebouncing ([SWS_DM_00541]) for the method ReportMonitorAction ([SWS_DM_00543]) of class ara::diag::Monitor to provide some means of external control of the debounce counter.

[SWS_DM_00040]{DRAFT} Definition of debounce counter reset dTo reset the debounce counter of an event, the DM shall set the corresponding debounce counter to zero. For time-based debouncing the debounce timer shall be stopped as well.c (RS\_Diag\_04068, RS\_Diag\_04225)

Only on the next call of ReportMonitorAction() with kPrepassed or with kPrefailed the debouncing shall start over again.

[SWS_DM_00879]{DRAFT} Application resetting the debounce counter dIf the ReportMonitorAction ([SWS_DM_00543]) method of a ara::diag::Monitor instance is called with kResetDebouncing ([SWS_DM_00541]), the DM shall reset the debounce counter or timer of the corresponding event.c(RS\_Diag\_04068, RS\_- Diag\_04225)

While resetting a timer based debounce counter, it is regardless if the timer is counting towards a failed or passed.

[SWS_DM_00039]{DRAFT} Resetting the debounce counter upon starting or restarting an operation cycle dIf an operation cycle is started or restarted, the DM shall reset the debounce counter for all events referenced by DiagnosticEvent-ToOperationCycleMapping.diagnosticEvent and referencing the started or restarted operation cycle by DiagnosticEventToOperationCycleMapping.operationCycle.c(RS\_Diag\_04068, RS\_Diag\_04225)

[SWS_DM_00086]{DRAFT} Resetting the debounce counter after clearing DTC dIf the DM executes a ClearDTC command, the DM shall reset the debounce counter for all events that have a DiagnosticEventToTroubleCodeUdsMapping to one of the cleared DTCs.c(RS\_Diag\_04068, RS\_Diag\_04225)

## 7.2.2.1.4.4 Dependencies to enable conditions

As described in section 7.2.2.4.3 enable conditions are used to suppress the result of reported event status information. Enable Conditions have also effect on the debouncing behavior of the DM.

[SWS_DM_00881]{DRAFT} Enable condition influence on debouncing behavior (freeze) dIf the enable conditions are not fulfilled for an event according to [SWS_DM_00568] and the debounce algorithm referenced by that event has the DiagnosticDebounceAlgorithmProps.debounceBehavior set to freeze, the DM shall freeze the according debounce timer or counter for the time the enable conditions are not fulfilled. This means that the debounce timer or counter remains unchanged.c(RS\_Diag\_04192, RS\_Diag\_04125)

[SWS_DM_00882]{DRAFT} Enable condition influence on debouncing behavior (reset) dIf the enable conditions are not fulfilled for an event according to [SWS_DM_00568] and the debounce algorithm referenced by that event has the DiagnosticDebounceAlgorithmProps.debounceBehavior set to reset, the DM shall reset the according debounce counter or timer and freeze it for the time the enable conditions are not fulfilled.c(RS\_Diag\_04192, RS\_Diag\_04125)

## 7.2.2.1.4.5 Dependencies to UDS service 0x85 ControlDTCSettings

[SWS_DM_00088]{DRAFT} ControlDTCSetting influence (freeze) dIf ControlDTC-Setting is set to disabled according to [SWS_DM_00910] for an event and the debounce algorithm referenced by that event has the DiagnosticDebounceAlgorithmProps.debounceBehavior set to freeze, the DM shall freeze the according debounce counter or timer for the time the ControlDTCSetting is set to disabled. This means that the debounce counter or timer remains unchanged.c(RS\_Diag\_04159, RS\_Diag\_04125)

[SWS_DM_00378]{DRAFT} ControlDTCSetting influence (reset) dIf ControlDTC-Setting is set to disabled according to [SWS_DM_00910] for an event and the debounce algorithm referenced by that event has the DiagnosticDebounceAlgorithmProps.debounceBehavior set to reset, the DM shall reset the according debounce counter or timer and freeze it for the time the ControlDTCSetting is set to disabled.c(RS\_Diag\_04159, RS\_Diag\_04125)

## 7.2.2.2 DTC Status processing

The ’DTC Status processing’ is the DMs ability to record and retain UDS status and associated interactions with other SW parts.

## 7.2.2.2.1 Status processing

’Status processing’ is an essential part of the DM functionality. The DM provides means to other SW parts in order to control the UDS DTC status bits.

## [SWS_DM_00213]{DRAFT} DTC status processing d

The DM shall process the UDS DTC status byte harmonizing with the ISO 14229- 1[1] standard.c(RS\_Diag\_04151)

ISO 14229-1 Annex D generally defines UDS DTC status byte handling and the corresponding triggerings for them. The following requirements map interfaces and configuration parameters of the DM to generic UDS DTC status bit transition descriptions.

[SWS_DM_00883]{DRAFT} UDS DTC status bit transitions triggered by test results dThe DM shall process the UDS DTC status byte triggered by the test results (kPassed or kFailed) reported via the ReportMonitorAction() ([SWS_DM_00543]) function of the corresponding ara::diag::monitor instance ([SWS_DM_00542]). Here, kPassed shall be used as "TestResult [Passed]" and kFailed as "TestResult [Failed]" ([SWS_DM_00541]) as described in [ISO 14229-1] Annex D.2.c(RS\_Diag\_04151)

Note that if debouncing for an event is configured, kPrepassed or kPrefailed of enumeration MonitorAction ([SWS_DM_00541]) status reports, reported via ReportMonitorAction, trigger debounce mechanisms (see section 7.2.2.1.4). These status reports do not have direct impact on the UDS DTC status byte. If the status of an event gets fully qualified after debouncing (i.e. kFinallyHealed or kFinallyDefective of enumeration ara::diag::Event::DebouncingState ([SWS_DM_00645])), this information has the same impact on the UDS DTC status byte as if kPassed or kFailed would have been reported via ReportMonitorAction() ([SWS_DM_00543]).

[SWS_DM_00884]{DRAFT} Resetting the status of the DTC dIf the parameter action in the function ReportMonitorAction ([SWS_DM_00543]) is set to kResetTestFailed ([SWS_DM_00541]), the DM shall update the UDS DTC status byte by setting only the kTestFailed bit to FALSE ([SWS_DM_00658]: ara::diag::DTCInformation::UdsStatusBit) and leave all other bits unchanged.c(RS\_Diag\_04151)

Rationale: This is an AUTOSAR-specific additional reset condition for the ’testFailed’ bit of the UDS DTC status bits.

[SWS_DM_00885]{DRAFT} UDS DTC status bit transitions triggered by operation cycle changes dIf the function SetOperationCycle() ([SWS_DM_00756]) of the corresponding ara::diag::OperationCycle ([SWS_DM_00751]) instance changes the state of that operation cycle, the DM shall reprocess the UDS DTC status byte according to the operation cycle state change.c(RS\_Diag\_04178, RS\_Diag\_04182)

Note that operation cycles are assigned to events by DiagnosticEventTo-OperationCycleMapping configuration items.

[SWS_DM_00217]{DRAFT} UDS DTC status bit transitions triggered by ClearDiagnosticInformation UDS service dIf the clearing of a DTC is triggered by the UDS service 0x14 ClearDiagnosticInformation, the DM shall process the UDS DTC status byte according to ISO 14229-1[1].c(RS\_Diag\_04180, RS\_Diag\_- 04067)

[SWS_DM_00218]{DRAFT} Trip Counter dThe DM shall take the eventFailure-CycleCounterThreshold configuration parameter as the ConfirmationThreshold value, as defined by ISO 14229-1[1] Annex D.2 . If the TripCounter reaches this ConfirmationThreshold, the DM shall set the UDS DTC status bit kConfirmedDTC to TRUE.c(RS\_Diag\_04136, RS\_Diag\_04180, RS\_Diag\_04157)

Note that the TripCounter is processed according to the ISO 14229-1[1] Annex D.2 specification.

(In contrast to the TripCounter, the FaultDetectionCounter controls the UDS DTC status bit kTestFailed.)

If Aging is supported for an event, the status is handled according to [SWS_DM_00243].

If there is an indicator mapped to the DTC, the ’warningIndicatorRequested’ bit is handled as described in section 7.2.2.2.3.

## 7.2.2.2.2 Status change notifications

[SWS_DM_00886]{DRAFT} Observability of the status byte dIf an AA calls the function GetEventStatus() ([SWS_DM_00649]), the DM shall provide the current status of this event from the corresponding ara::diag::Event instance ([SWS_DM_00646]).c(RS\_Diag\_04183)

[SWS_DM_00887]{DRAFT} Notification about DTC status changes dIf the AA has registered for a DTC status change notification via the function SetEventStatusChangedNotifier() ([SWS_DM_00650]) of the corresponding ara::diag::Event instance ([SWS_DM_00646]), the DM shall call this notifier for each status change of this DTC.c(RS\_Diag\_04183)

## 7.2.2.2.3 Indicators

Indicators can be associated with a particular DTC. Indicators or ’warning outputs’ may consist of lamp(s), displayed text information or similar vendor specific expressions.

[SWS_DM_00221]{DRAFT} Handling indicator status dThe DM shall handle the status of indicators assigned to events by the DiagnosticConnectedIndicator configuration item.c(RS\_Diag\_04204)

[SWS_DM_00888]{DRAFT} Observability of indicator status dThe DM shall provide the status of an indicator via the GetIndicator() function ([SWS_DM_00744]) of the corresponding ara::diag::Indicator instance ([SWS_DM_00741]).c(RS\_Diag\_- 04204)

Note that the status of an indicator is determined by all the status information votes provided by events assigned to the corresponding indicator.

[SWS_DM_00223]{DRAFT} Handling of ’warningIndicatorRequested’ bit dThe DM shall process the ’warningIndicatorRequested’ bit of events and DTCs in accordance with the status vote for the assigned indicator. The ’warningIndicatorRequested’ bit shall be set in case the status gets confirmed and consequently the events shall vote positively for setting the indicator.c(RS\_Diag\_04204)

For confirmation check [SWS_DM_00218].

[SWS_DM_00224]{DRAFT} Indicator healing dThe DM shall process indicator healing based on the DiagnosticConnectedIndicator.healingCycleCounterThreshold configuration parameter of the corrsponding indicator assigned to an event via DiagnosticConnectedIndicator.indicator. If the number of cycles (DiagnosticConnectedIndicator.healingCycle) in which the status was reported, but not failed, reaches the threshold, the ’warningIndicatorRequested’ bit shall be set to 0, and the event shall vote negatively for the activation of the indicator.c(RS\_- Diag\_04204)

## 7.2.2.2.4 User controlled WarningIndicatorRequest-bit

In some cases (e.g. controlling a failsafe reaction in an application) the WIR-bit (WarningIndicatorRequest-bit) of a corresponding event in DM shall be set/reset by a dedicated "failsafe AA". The "failsafe AA" has to ensure a proper status of the WIR-bit (e.g. regarding to ISO- 14229-1[2] or manufacture specific requirements).

The failsafe AA shall report the required WIR-status to DM (via the function SetLatchedWIRStatus() ([SWS_DM_00652]) of the corresponding ara::diag::event instance ([SWS_DM_00646])) and has to ensure that the current WIR-status of an event (in DM) fits to the current failsafe-status in application:

• failsafe running: WIR-bit shall be set to "1"

• failsafe not running: WIR-bit shall be set to "0"

The failsafe AA has to report the status after every change of its failsafe state. Each invocation of the function SetLatchedWIRStatus() ([SWS_DM_00652]) of an ara::diag::event instance ([SWS_DM_00646]) updates the WIR-bit for the corresponding event

Due to not storing the Status-Bit 7 (’warningIndicatorRequested’ bit) on Shutdown, the failesafe AA has to ensure that the ’warningIndicatorRequest’ bit of an event fits to the current failsafe status after inizalization of the DM.

## 7.2.2.3 Operation Cycles Management

The DM supports operation cycles according to ISO 14229-1[1]. Operation cycles have direct effect on the event memory behavior, such as calculation of event or DTC status.

Examples of typical operation cycles are:

• Ignition on/off cycles

• Power up/power down cycle

• Accumulated operating time cycles

Operation cycles are managed by the AA, the DM is notified about changes to operation cycle states by using the API interface ara::diag::OperationCycle::SetOperationCycle ([SWS_DM_00756]).

[SWS_DM_00889]{DRAFT} Automatic starting of operation cycles dIf the configuration of DiagnosticOperationCycle.cycleAutostart is set to true, the DM shall set the respective state of an ara::diag::OperationCycle instance ([SWS_DM_00751]) to kOperationCycleStart ([SWS_DM_00750]) during the DM is initializing.c(RS\_Diag\_04178)

[SWS_DM_00890]{DRAFT} Automatic ending of operation cycles dIf the configuration of DiagnosticOperationCycle.automaticEnd is set to true, the DM shall set the respective state of an ara::diag::OperationCycle instance ([SWS_DM_00751]) to kOperationCycleEnd ([SWS_DM_00750]) while the DM is shut down.c(RS\_Diag\_04178)

[SWS_DM_00004]{DRAFT} Operation cycle persistency dIf the configuration of DiagnosticOperationCycle.cycleStatusStorage is set to true, the DM shall persist the operation cycle state over the DM shut down.c(RS\_Diag\_04178)

[SWS_DM_00891]{DRAFT} Restart of operation cycles dIf the operation cycle state of an ara::diag::OperationCycle instance ([SWS_DM_00751]) was already set to kOperationCycleStart ([SWS_DM_00750]) before and the function Set-OperationCycle() ([SWS_DM_00756]) is called with the value kOperationCycleStart ([SWS_DM_00750]), the DM shall restart the operation cycle and perform all steps triggered with a started operation cycle.c(RS\_Diag\_04178)

[SWS_DM_00892]{DRAFT} Operation cycles are only ended once dIf the operation cycle state of an ara::diag::OperationCycle instance ([SWS_DM_00751])

was already set to kOperationCycleEnd ([SWS_DM_00750]) before and the function SetOperationCycle() ([SWS_DM_00756]) is called with the value kOperationCycleEnd ([SWS_DM_00750]), the DM shall leave this operation cycle state set to kOperationCycleEnd and take no further actions.c(RS\_Diag\_04178)

## 7.2.2.4 Event memory

The event memory is the database for faults detected by the system. It stores status information for events, DTCs and DTC related data. The DM uses the event memory for an ISO 14229-1[1] compliant handling of the fault memory.

There can be multiple event memories handled by the DM.

[SWS_DM_00055]{DRAFT} Supported event memories dThe DM shall support the

• primary event memory

• up to 256 user-defined event memories

according to ISO 14229-1[1].c(RS\_Diag\_04214, RS\_Diag\_04150)

[SWS_DM_00911]{DRAFT} Instances of DTCInformation interface dThe DM shall offer for every configured DiagnosticMemoryDestination a specific instance of the ara::diag::DTCInformation class ([SWS_DM_00657]).c(RS\_Diag\_04214, RS\_Diag\_04150)

[SWS_DM_00056]{DRAFT} Availability of the primary event memory dThe DM shall support the primary event memory if a DTC exists having a DiagnosticMemory-DestinationPrimary referenced by its DiagnosticTroubleCodeProps.memoryDestination.c(RS\_Diag\_04150)

[SWS_DM_00057]{DRAFT} Availability of a user-defined event memory dThe DM shall support the user-defined event memory with the number DiagnosticMemoryDestinationUserDefined.memoryId if a DTC exists having a DiagnosticMemoryDestinationUserDefined with that user-defined number referenced by its DiagnosticTroubleCodeProps.memoryDestination.c(RS\_Diag\_- 04214)

## 7.2.2.4.1 DTC Introduction

A diagnostic trouble code (DTC) defines a unique identifier mapped to a diagnostic event. The DTC is used by diagnostics, including e.g. UDS communication with an external tester, to uniquely identify data within the event memory database.

[SWS_DM_00060]{DRAFT} Set of supported DTCs dThe existence of a DiagnosticTroubleCodeUds indicates that the DM shall support this DTC.c(RS\_Diag\_04201)

Note: Due to DM restrictions the ’DiagnosticTroubleCodeObd’ and ’DiagnosticTrouble-CodeJ1939’ are not supported.

## 7.2.2.4.1.1 Format

The DTC itself is a 3 byte value, that could have different interpretations.

[SWS_DM_00058]{DRAFT} DTC interpretation format dThe DM shall use one internal DTC format interpretation that is defined in DiagnosticCommonProps.type-OfDtcSupported.c(RS\_Diag\_04157)

Note: Refers to [TPS\_DEXT\_01008] in [2].

[SWS\_DM\_CONSTR\_00059]{DRAFT} Restriction on supported DTC format dThe DM shall support the following literals from interpreted DiagnosticCommonProps. typeOfDtcSupported (see also [SWS_DM_00058])

• iso11992\_4

• iso14229\_1

• saeJ2012\_da

Further information about the format mapping is defined in [SWS_DM_00062].

The following literals are not supported by the DM:

• iso15031\_6

• saeJ1939\_73

c(RS\_Diag\_04201)

## 7.2.2.4.1.2 Groups

Besides the term DTC, diagnostics uses DTC groups to address a range of single DTCs. A DTC group is defined by using a dedicated DTC value out of the range of valid DTCs to identify the group of DTCs.

A definition of valid DTC groups is provided by ISO 14229-1 [1] - Annex D.1. The DTC group is used in diagnostic just as any other DTC value, the DM internally resolves the DTC group and applies the requested operation to all DTCs of that group. The most common DTC group is the group of all DTCs, assigned to the DTC value 0xFFFFFF.

[SWS_DM_00064]{DRAFT} Definition of DTC groups dThe existence of a DiagnosticTroubleCodeGroup shall define the existence of the DTC group with the DTC identifier DiagnosticTroubleCodeGroup.groupNumberc(RS\_Diag\_04117, RS\_Diag\_04115)

Note: Refers to [TPS\_DEXT\_03014] in [2].

[SWS_DM_00065]{DRAFT} Always supported availability of the group of all DTCs dThe DM shall provide by default the DTC group ’GroupOfAllDTCs’ assigned to the DTC group identifier 0xFFFFFF. This DTC group contains always all configured DTCs.c(RS\_Diag\_04117)

[SWS\_DM\_CONSTR\_00082]{DRAFT} Restriction on the configuration of the DTC group GroupOfAllDTCs dThe DM shall ignore any configuration of a Diagnostic-TroubleCodeGroup.groupNumber with a value of 0xFFFFFF.c(RS\_Diag\_04117)

A configuration of the DTC group 0xFFFFFF via DiagnosticTroubleCodeGroup. groupNumber is not required. Within the DM basically all services and diagnostic requests having a DTC as input parameter accept also DTC group. As result of this, the operation is applied on all DTCs of that DTC group. To provide the reader a clear understanding if the DTC also can be a DTC group, it is explicitly mentioned in this specification. In case a DTC group is also valid, the DTC group definition of this chapter applies.

## 7.2.2.4.2 Destination

Each DTC is stored in one of the supported event memories according to [SWS_DM_00056] and [SWS_DM_00057].

[SWS_DM_00083]{DRAFT} Event memory destination of an DTC dThe existence of DiagnosticTroubleCodeProps.memoryDestination shall assign all DTCs referencing this DiagnosticTroubleCodeProps to the event memory referenced by DiagnosticTroubleCodeProps.memoryDestination.c(RS\_Diag\_- 04150, RS\_Diag\_04214)

[SWS\_DM\_CONSTR\_00084]{DRAFT} Each DTC shall be assigned to an event memory destination dThe DM shall only support DTCs with a configured DiagnosticTroubleCodeProps.memoryDestination.c(RS\_Diag\_04150, RS\_Diag\_- 04214)

## 7.2.2.4.3 EnableConditions

DiagnosticEnableConditions are mapped to DiagnosticEvents by DiagnosticEventToEnableConditionGroupMappings.

[SWS_DM_00568]{DRAFT} Handling of enable conditions dIf any of the enable conditions mapped to the event are not fulfilled, diag::Monitor::ReportMonitorAction() ([SWS_DM_00543]) shall instantly return without any processing.c(RS\_Diag\_04192)

Note: For a regular processing of diag::Monitor::ReportMonitorAction() all of the enable conditions mapped to the corresponding event have to be fulfilled.

## 7.2.2.4.4 DTC related data

The following sections deal with the DTC related data, what includes the triggering and location of freeze frames and extended data records to be stored to. Freeze frames consist of a set of DIDs and extended data records consist of a set of data elements, which shall be stored in configuration dependent situations.

[SWS_DM_00148]{DRAFT} Persistent storage of event memory entries dThe DM shall be able to persistently store the status of all DTCs and its DTC related data:

• snapshot data if configured (at least one corresponding DiagnosticTrouble-CodeProps.freezeFrame reference exists in the configuration)

• extended data if configured (at least one corresponding DiagnosticTrouble-CodeProps.extendedDataRecord reference exists in the configuration)

c(RS\_Diag\_04211, RS\_Diag\_04105)

## 7.2.2.4.4.1 Triggering for data storage

[SWS_DM_00150]{DRAFT} Primary trigger for event memory entry storage dCreating and storing memory entries (incl. collecting DTC-related data) shall be triggered according to the DiagnosticCommonProps.memoryEntryStorageTrigger configuration parameter (see [2]).c(RS\_Diag\_04211, RS\_Diag\_04105)

Note that for updating snapshot record and extended data information record specific configuration options are available. For details check the following sections.

## 7.2.2.4.4.2 Storage of snapshot record data

[SWS_DM_00151]{DRAFT} snapshot record numeration dIn case DiagnosticMemoryDestination.typeOfFreezeFrameRecordNumeration is set to calculated, the DM shall store freeze frames numbered consecutively starting with 1 in their chronological order. If the parameter is set to configured, the DM shall store the records based on the DiagnosticFreezeFrame.recordNumber configuration parameters of the respective freeze frames.c(RS\_Diag\_04205, RS\_Diag\_04189)

[SWS_DM_00152]{DRAFT} Number of snapshot records for a DTC dIn case DiagnosticMemoryDestination.typeOfFreezeFrameRecordNumeration is set to calculated, the number of snapshot record the DM is able to store for a DTC shall be determined by the DiagnosticTroubleCodeProps.maxNumberFreeze-FrameRecords configuration parameter. In case DiagnosticMemoryDestination.typeOfFreezeFrameRecordNumeration is set to configured, the number of snapshot recordss is determined by the number of DiagnosticFreeze-Frames configured for a DTC.c(RS\_Diag\_04205, RS\_Diag\_04190)

Note that different snapshot records represent different snapshots collected in different points in time.

[SWS_DM_00893]{DRAFT} Triggering for snapshot record storage dThe data collection and the storage of the snapshot record shall be triggered by the DiagnosticFreezeFrame.trigger configuration parameter. The data layout of snapshot records is defined by the DiagnosticTroubleCodeProps.snapshotRecordContent configuration class. Each referenced DiagnosticDataIdentifier shall be captured in its order via the diag::GenericDataIdentifier::Read() function ([SWS_DM_00636]) or diag::DataIdentifier::Read() ([SWS_DM_00640]) according to its PortPrototype mapping.c(RS\_Diag\_04205, RS\_Diag\_04127)

[SWS_DM_00894]{DRAFT} Notification event upon snapshot record updates dAfter the DM has captured and stored a new snapshot record or overwritten an existing snapshot record with new data and there is a registered update notification via the function SetSnapshotRecordUpdatedNotifier() of the corresponding ara::diag::DTCInformation instance ([SWS_DM_00668]), the DM shall call this notifier for each snapshot record update.c(RS\_Diag\_04148)

## 7.2.2.4.4.3 Storage of extended data

[SWS_DM_00154]{DRAFT} Number of extended data for a DTC dThe DM shall store zero or one extended data for a DTC. Extended data consists of extended data records. If at least one DiagnosticTroubleCodeProps.extendedDataRecord is configured for the corresponding DTC, the extended data shall be present in the event memory entry.c(RS\_Diag\_04206, RS\_Diag\_04190)

Note that contrary to snapshot records, extended data records do not necessarily represent data collected in different points in time. Extended data consists of a configurable number of extended data records, which are all collected when the respective memory entry is created in the event memory. The update mechanism of extended data records is configurable.

[SWS_DM_00155]{DRAFT} Extended data record numeration dExtended data record numbers shall always be determined by the configuration. The DiagnosticExtendedDataRecord.recordNumber configuration parameter defines the record number for each extended data record.c(RS\_Diag\_04206, RS\_Diag\_- 04189)

[SWS_DM_00895]{DRAFT} Triggering for extended data record storage and updates dThe data collection and storage of the extended data record shall be triggered by the DiagnosticCommonProps.memoryEntryStorageTrigger trigger condition. Updating extended data records after being first stored, shall be configurable with the DiagnosticExtendedDataRecord.update configuration parameter. The data layout of extended data record is defined by the order of DiagnosticExtendedDataRecord.recordElement. Each DiagnosticDataElement shall be captured in its order via the Read() function of the ara::diag::DataElement instance ([SWS_DM_00596]).c(RS\_Diag\_04206, RS\_Diag\_04127)

## 7.2.2.4.5 Clearing DTCs

Clearing a DTC or a DTC group is the ability of the DM to reset the UDS DTC status byte of each DTC and deleting DTC assigned snapshot records, extended data records and further DTC-related data.

[SWS_DM_00116]{DRAFT} Clearing a DTC group dWhen the DM is about to clear a DTC group it shall apply the same clear operation process as for a single DTC on all the DTCs of the DTC group which is cleared.c(RS\_Diag\_04117)

[SWS_DM_00117]{DRAFT} Clearing a DTC dWhen the DM is about to clear a DTC it shall reset the event and UDS DTC status byte and clear the snapshot records and extended data records stored for this DTC and its DTC-related data.c(RS\_- Diag\_04117)

## 7.2.2.4.5.1 Locking of the DTC clearing process by a client

The DM supports more than one Diagnostic Clients as described in section 7.2.1.1.1. All configured clients can simultaneously send a ClearDTC diagnostic request. This chapter describes the DM behavior in this situations.

[SWS_DM_00144]{DRAFT} Parallel clearing DTCs in different DiagnosticMemoryDestination dThe DM shall support parallel clearing of DTCs if the target of the clear DTC operation is a different DiagnosticMemoryDestination.c(RS\_Diag\_- 04117)

[SWS_DM_00145]{DRAFT} Allow only one simultaneous clear DTC operation for one DiagnosticMemoryDestination dIf a Diagnostic Client is clearing the DTCs of a DiagnosticMemoryDestination the DM shall lock the clear DTC operation for all other clients requesting to clear the DTCs of the same DiagnosticMemoryDestination.c(RS\_Diag\_04117)

[SWS_DM_00146]{DRAFT} Unlock clear DTC operation for one DiagnosticMemoryDestination dAfter the DM has finished the clear DTC operation, it shall unlock the clear DTC operation for this DiagnosticMemoryDestination.c(RS\_Diag\_- 04117)

[SWS_DM_00147]{DRAFT} Behavior while trying to clear DTCs on a locked DiagnosticMemoryDestination dIf the DM is requested to clear DTCs of a DiagnosticMemoryDestination and the DM has locked this DiagnosticMemoryDestination for clearing DTCs according to [SWS_DM_00144], the DM shall refuse the second clear DTC operation and shall return a NRC 0x22 (ConditionsNotCorrect).c (RS\_Diag\_04117)

## 7.2.2.4.5.2 ClearConditions

In certain situations it is desirable to avoid that a DTC is cleared from the event memory. DiagnosticClearConditions are mapped to DTCs by DiagnosticTroubleCodeUdsToClearConditionGroupMappings.

[SWS_DM_00896]{DRAFT} Handling of DiagnosticClearConditions dIf any of the clear conditions mapped to the DTC to be cleared are not fulfilled by a call of the function SetCondition() from an ara::diag::Condition instance ([SWS_DM_00715]) with the value kConditionFalse ([SWS_DM_00710]), the clear is forbidden. Otherwise (all of the clear conditions mapped to the DTC are fulfilled) the clear is allowed.c(RS\_Diag\_04117)

The effect of a forbidden clear DTC operation is described in the requirements below:

[SWS_DM_00123]{DRAFT} Block clearing of UDS DTC status byte during a clear DTC operation dIf the DM is requested to clear a DTC with a forbidden clear according to [SWS_DM_00896] and a DiagnosticEventToTroubleCodeUdsMapping exists with a mapping from this DTC to an event and the event has DiagnosticEvent.clearEventBehavior set to noStatusByteChange, the DM shall not change the UDS DTC status byte.c(RS\_Diag\_04117)

[SWS_DM_00124]{DRAFT} Limited clearing of UDS DTC status byte during a clear DTC operation dIf the DM is requested to clear a DTC with a forbidden clear according to [SWS_DM_00896] and a DiagnosticEventToTroubleCodeUdsMapping exists with a mapping from this DTC to an event and the event has DiagnosticEvent.clearEventBehavior set to onlyThisCycleAndReadiness, the DM shall set the following UDS DTC status bits:

• Bit 1 TestFailedThisOperationCycle to ’0’

• Bit 4 TestNotCompletedSinceLastClear to ’1’

• Bit 5 TestFailedSinceLastClear to ’0

• Bit 6 TestNotCompletedThisOperationCycle to ’1’

and leave all other bits unchanged.c(RS\_Diag\_04117)

[SWS_DM_00121]{DRAFT} Forbidden clearing of snapshot records and extended data records dIf the DM is requested to clear a DTC with a forbidden clear according to [SWS_DM_00896] the DM shall leave all snapshot records and extended data records for this DTC unchanged.c(RS\_Diag\_04117)

## 7.2.2.4.5.3 DTC clearing triggered by application

Besides the UDS request ClearDiagnosticInformation according to section 7.2.1.6.5.1 the DM supports the use case that the fault memory is cleared by an application call. One of the use cases is clearing of user-defined event memory for diagnostic implementation without the ISO 14229-1[1] extension as described in section 7.2.1.6.5.1.

This could be realized using a dedicated diagnostic routine service, whose application is in charge of the clearing process.

[SWS_DM_00262]{DRAFT} Common semantic behavior for ClearDTC triggered via diagnostics or application dThe clear DTC operation itself is semantically identical, independent if triggered via diagnostic service or application method call. All requirements for clear DTC apply in either case.c(RS\_Diag\_04194)

[SWS_DM_00897]{DRAFT} Usage of ClearDTC Interface dIf the function Clear() of the ara::diag::DTCInformation instance ([SWS_DM_00671]) is called, the DM shall clear the DTC or DTC group provided in the parameter DTC-Group (compare function declaration ara::diag::DTCInformation::Clear(); ([SWS_DM_00671]) ). The clear DTC shall clear the fault memory associated to the instance of the ara::diag::DTCInformation class only.c(RS\_Diag\_04194)

[SWS_DM_00898]{DRAFT} ClearDTC call on invalid DTC or DTC group dIf the function Clear() of the ara::diag::DTCInformation instance ([SWS_DM_00671]) is called and the parameter DTCGroup of the function Clear() has no matching configured DTC group according to [SWS_DM_00064] or configured DTC by DiagnosticTroubleCodeUds.udsDtcValue, the DM shall trigger the error kWrongDtc for that function call and the DM shall return without any further action.c (RS\_Diag\_04194)

[SWS_DM_00899]{DRAFT} ClearDTC called while another clear operation is in progress dIf the function Clear() of the ara::diag::DTCInformation instance ([SWS_DM_00671]) is called and another clear DTC operation is currently in progress, the DM shall trigger the error kBusy.c(RS\_Diag\_04194)

[SWS_DM_00900]{DRAFT} ClearDTC processing in case of memory errors dIf the function Clear() of the ara::diag::DTCInformation instance ([SWS_DM_00671]) is called and the DM receives physical memory errors upon its access to the Non-volatile Memory and thus cannot guarantee that the clear operation was done successfully, the DM shall trigger the error kMemoryError.c(RS\_- Diag\_04194)

[SWS_DM_00901]{DRAFT} Possible failure of ClearDTC dIf the function Clear() of the ara::diag::DTCInformation instance ([SWS_DM_00671]) is called and the clear operation fails due to the reasons according to [SWS_DM_00122], the DM shall trigger the error kFailed.c(RS\_Diag\_04194)

## 7.2.2.4.6 Aging

A stored DTC can age in terms of reaching a threshold value of passed operation cycles, specified by the vendor, where no failed tests have been reported by a monitoring application. The amount of operation cycles, where these non-failed reports occur is called the Aging counter. After the threshold is reached, the DTC is cleared from the event memory.

[SWS_DM_00237]{DRAFT} Aging dThe DM shall only support Aging for DTCs, if the corresponding DiagnosticTroubleCodeProps.agingAllowed configuration parameter is set.c(RS\_Diag\_04133)

[SWS_DM_00238]{DRAFT} Aging and healing dIf an indicator is configured for the corresponding event, the process of Aging (counting of Aging counter) shall be started only after the healing (according to [SWS_DM_00224]) is completed (’warningIndicatorRequested’ bit is set to 0).c(RS\_Diag\_04133)

[SWS_DM_00239]{DRAFT} Aging counter dThe DM shall support an Aging counter for each event memory entry.c(RS\_Diag\_04133)

Note that this counter shall be available as internal data element of extended data or snapshot record.

[SWS_DM_00240]{DRAFT} Processing the Aging counter dThe DM shall only allow processing the Aging counter if the related DTC is stored in the event memory, the status is qualified as passed (’testFailed’ bit is set to 0) and healing, according to [SWS_DM_00238], is fulfilled.c(RS\_Diag\_04133)

[SWS_DM_00241]{DRAFT} Aging cycle and threshold dThe Aging shall be calculated based on the referred DiagnosticOperationCycle via the reference DiagnosticAging.agingCycle. The DiagnosticAging.threshold defines the number of Aging cycles until Aging. If DiagnosticCommonProps.agingRequiresTestedCycle is set, the cycle shall only be considered in which the status was reported but not failed (’testNotCompletedThisOperationCycle’ bit and ’testFailedThisOperationCycle’ bit are set to 0). If the threshold is reached, the event memory entry shall be deleted (aged) from the event memory.c(RS\_Diag\_04133)

[SWS_DM_00243]{DRAFT} Aging-related UDS DTC status byte processing dAs a consequence of Aging, the DM shall set the following UDS DTC status bits to 0:

• ’confirmedDTC’ unconditionally

• ’testFailedSinceLastClear’ conditionally, if statusBitHandlingTest-FailedSinceLastClear is set to statusBitAgingAndDisplacement

## c(RS\_Diag\_04140)

[SWS_DM_00242]{DRAFT} Re-occurrence after Aging dThe DM shall treat the reoccurrence of previously aged events like new events, since they were previously deleted from the event memory by Aging. This corresponds to all DTC-related data (i.e. counters, thresholds, etc.) being reset to their initial values.c(RS\_Diag\_04133)

## 7.2.2.4.7 NumberOfStoredEntries

[SWS_DM_00902]{DRAFT} NumberOfStoredEntries dIf the function GetNumberOfStoredEntries() from the ara::diag::DTCInformation instance ([SWS_DM_00669]) is called, the DM shall return the number of event memory entries (DTCs) currently stored in this event memory, where the status of a DTC is pendingDTC = 1 and/or confirmedDTC = 1. An update notification shall be sent to the function registered via SetNumberOfStoredEntriesNotifier() ([SWS_DM_00670]) whenever the value of NumberOfStoredEntries has changed.c(RS\_Diag\_04109)

Note: For the primary memory, the reported number of NumberOfStoredEntries shall be identical to the response of ReadDTCInformation (0x19) service with sub-function 0x01 (reportNumberOfDTCByStatusMask) and a DTCStatusMask set to 0x0C.

## 7.2.3 Required Configuration

The Autosar Diagnostic Extract Template (DEXT) [2] is used for the DM configuration. By design this format is made as exchange format between the tools in the diagnostic workflow, in different steps data is added. To accommodate the fact that data is incomplete and refined in a later step, the DEXT [2] allows most of the elements to be optional and added at a later point in time. However at the point in time, when the DEXT [2] is used to configure the DM, a certain minimum content is required. In this chapter a loose list of DEXT [2] constraints is given. The mentioned elements need to be present so that the DM can be configured. Also the reaction on such missing elements is implementation specific, it is stated that the DM will not be able to behave as described in the document. A possible but not mandatory reaction is to refuse the DM generation at all and forcing the user to provide complete data.

[SWS\_DM\_CONSTR\_00168]{DRAFT} Required operation cycles for diagnostic events dEach DiagnosticEvent requires exactly one DiagnosticEventToOperationCycleMapping referencing the diagnosticEvent and one Diagnostic-OperationCycle.c(RS\_Diag\_04178)

[SWS\_DM\_CONSTR\_00206]{DRAFT} Supported format for data identifier for VINDataIdentifier dA DiagnosticDataIdentifier with representsVin set to true, requires that it aggregates only one DiagnosticParameter which itself aggregates a DiagnosticDataElement having a 17 byte uint8 array as baseType.c (SRS\_Eth\_00026)

## 7.2.4 Diagnostic Data Management

In various situations, the Diagnostic Server instance facilitates reading or writing of particular diagnostic data. One needs to distinguish between internal and external diagnostic data. By definition, internal data is managed by the Diagnostic Server instance itself, and external data is managed by external applications. In the latter case, communication between Diagnostic Server instance and the external application takes place via Service Interfaces. There are several Service Interfaces defined concerning diagnostic data.

The purpose of this chapter is to describe the supported use-cases for handling diagnostic data and the way how to configure each use-case within the DEXT.

Recall that a DiagnosticDataIdentifier is composed of DiagnosticParameters each of which aggregates a single DiagnosticDataElement. In different use cases, it is required to manage diagnostic data either on the level of Diagnostic-DataIdentifier or on the fine granular level of DiagnosticDataElements.

## 7.2.4.1 Internal and External Diagnostic Data Elements

A DiagnosticDataElement is called internal if there exists a DiagnosticProvidedDataMapping referencing this DiagnosticDataElement, otherwise it is called an external DiagnosticDataElement.

Table 7.4 gives a list of the supported internal DiagnosticDataElements, where

Data Provider refers to the NameToken defined in the role of dataProvider of the associated DiagnosticProvidedDataMapping,

Content describes the actual content of the data,

Format describes the data format of the DiagnosticDataElement.

Context defines the exclusive context in which this DiagnosticDataElement is defined (if applicable).

<table><tr><td colspan="1" rowspan="1">Data Provider</td><td colspan="1" rowspan="1">Content</td><td colspan="1" rowspan="1">Format</td><td colspan="1" rowspan="1">Context</td></tr><tr><td colspan="1" rowspan="1">DEM AGINGCTR DOWNCNT</td><td colspan="1" rowspan="1">Down-counting aging counter of contex-tual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM AGINGCTR_UPCNT</td><td colspan="1" rowspan="1">Up-counting aging counter of contextualDTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM AGINGCTR UPCNTFIRST ACTIVE</td><td colspan="1" rowspan="1">Up-counting aging counter of contextualDTC, starting at 1 when aging starts</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM_CURRENT_FDC</td><td colspan="1" rowspan="1">Fault Detection Counter of contextual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM CYCLES SINCEFIRST_FAILED</td><td colspan="1" rowspan="1">Operation Cycle Counter of contextualDTC- Cycles since first failed</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM CYCLES SINCE LASTFAILED</td><td colspan="1" rowspan="1">Operation Cycle Counter of contextualDTC – Cycles since last failed</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM FAILED_CYCLES</td><td colspan="1" rowspan="1">Operation Cycle Counter of contextualDTC – Failed cycles</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM_MAX_FDC DURINGCURRENT_CYCLE</td><td colspan="1" rowspan="1">Fault Detection Counter maximum valueduring current operation cycle of contex-tual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM MAX FDC SINCELAST_CLEAR</td><td colspan="1" rowspan="1">Fault Detection Counter maximum valuesince last clear of contextual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM OCCCTR</td><td colspan="1" rowspan="1">Occurrence counter of contextual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM_OVFLIND</td><td colspan="1" rowspan="1">Overflow indication of contextual DTC (0 =False, 1 = True)</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM SIGNIFICANCE</td><td colspan="1" rowspan="1">Event significance of contextual DTC (re-fer to DemDTCSignificance) (0 = OC-CURRENCE, 1 = FAULT)</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DEM_PRIORITY</td><td colspan="1" rowspan="1">Priority of the contextual DTC</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DEM</td></tr><tr><td colspan="1" rowspan="1">DCM SESSION</td><td colspan="1" rowspan="1">Current session of contextual Diagnos-tic Conversation</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DCM</td></tr><tr><td colspan="1" rowspan="1">DCM SECURITY LEVEL</td><td colspan="1" rowspan="1">Current security level of contextual Di-agnostic Conversation</td><td colspan="1" rowspan="1">1 byte</td><td colspan="1" rowspan="1">DCM</td></tr></table>

Table 7.4: Supported internal DiagnosticDataElements

[SWS_DM_00393]{DRAFT} Retrieving data for internal DiagnosticDataElements dIf DM requires to provide or store data configured as internal DiagnosticDataElement which is supported by the Diagnostic Server instance according to Table 7.4, then DM shall use the respective internally managed data value as defined in Table 7.4.c(RS\_Diag\_04097)

[SWS\_DM\_CONSTR\_00394]{DRAFT} Internal DiagnosticDataElements are read-only dA DiagnosticDataIdentifier referenced by a DiagnosticWrite-DataByIdentifier service shall not contain any internal Diagnostic-DataElement.c(RS\_Diag\_04097)

An internal DiagnosticDataElement is called DCM-exclusive resp. DEMexclusive if the context of the name token described in Table 7.4 is set accordingly. The implicit restriction of such DiagnosticDataElements to the context in which they are defined is made explicit in the following requirements. These requirements are formulated in a way that Table 7.4 might in future be extended by internal DiagnosticDataElements not restricted to exclusive use within a DCM resp. DEM context.

[SWS\_DM\_CONSTR\_00395]{DRAFT} Restriction on DEM-exclusive DiagnosticDataElements dA DiagnosticParameter containing a DEM-exclusive internal DiagnosticDataElement shall not be contained in a Diagnostic-DataIdentifier referenced by a DiagnosticReadDataByIdentifier, nor shall it be contained in a realization of DiagnosticRoutineSubfunction.c(RS\_Diag\_- 04097)

[SWS\_DM\_CONSTR\_00396]{DRAFT} Restriction on DCM-exclusive DiagnosticDataElements dA DiagnosticParameter containing a DCM-exclusive internal DiagnosticDataElement shall not be contained in a Diagnostic-DataIdentifier referenced by a DiagnosticDataIdentifierSet which is referenced by some DiagnosticTroubleCodeProps in the role of freezeFrame-Content, nor shall it be contained in a DiagnosticExtendedDataRecord.c(RS\_- Diag\_04097)

Note: The notion of internal and external is exclusively defined for DiagnosticDataElements and does not apply to DiagnosticDataIdentifier.

[SWS_DM_00905]{DRAFT} Retrieving data for external DiagnosticDataElements dIf the Diagnostic Server instance is required to read data configured as external DiagnosticDataElement, then the Diagnostic Server instance shall utilize the associated RPortPrototype typed by the DataElement class ([SWS_DM_00603]) and call its DataElement::Read ([SWS_DM_00596]) function.c(RS\_Diag\_04097)

Note: In general, there are multiple instances of DataElement class ([SWS_DM_00603]) available in the running system. Which instance to choose for the given request to read an external DiagnosticDataElement is part of system integration. Support for this integration is provided by DiagnosticMappings described in section 7.2.4.2.1.

## 7.2.4.2 Reading and Writing Diagnostic Data Identifier

The Diagnostic Server instance supports multiple ways to read or write diagnostic data defined as DiagnosticDataIdentifier:

• reading each DiagnosticDataElement contained in the Diagnostic-DataIdentifier independently as described in section 7.2.4.1,

• reading or writing the DiagnosticDataIdentifier as a whole via the DataIdentifier diagnostic interface,

• reading or writing the DiagnosticDataIdentifier as a whole via the GenericService diagnostic interface.

The method to choose between these ways of data handling is by configuration of DiagnosticMappings referring to the DiagnosticDataIdentifier. This chapter describes the supported DiagnosticMappings and provides requirements on reading and writing DiagnosticDataIdentifier reflecting the short description above.

## 7.2.4.2.1 Supported Diagnostic Mappings

There are multiple types of DiagnosticMappings related to DiagnosticDataElements and DiagnosticDataIdentifier:

<table><tr><td rowspan=1 colspan=1>DiagnosticMapping</td><td rowspan=1 colspan=1>diagnostics endpoint</td><td rowspan=1 colspan=1>target endpoint</td></tr><tr><td rowspan=1 colspan=1>DiagnosticProvided-DataMapping</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>DM internal data provider</td></tr><tr><td rowspan=1 colspan=1>DiagnosticService-DataMapping</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>DataPrototype</td></tr><tr><td rowspan=1 colspan=1>DiagnosticServiceSwMap-ping</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>SwcServiceDependency</td></tr><tr><td rowspan=1 colspan=1>DiagnosticService-DataIdentifierPortMap-ping</td><td rowspan=1 colspan=1>DiagnosticDataIdenti-fier</td><td rowspan=1 colspan=1>SwcServiceDependency</td></tr></table>

Table 7.5: Diagnostic Mappings

The DiagnosticProvidedDataMapping is used to distinguish between internal and external DiagnosticDataElement as described in section 7.2.4.1.

The DiagnosticServiceDataMapping is currently not supported as input for the configuration of the Diagnostic Server instance.

The DiagnosticServiceSwMapping maps a DiagnosticDataElement in the role of diagnosticDataElement to a SwcServiceDependency in the role of mappedSwcServiceDependencyInExecutable.

Note: The DiagnosticServiceSwMapping also provides an indirect reference to a DiagnosticDataIdentifier by means of referencing a DiagnosticDataByIdentifier in the role of serviceInstance which itself references the DiagnosticDataIdentifier in the role of dataIdentifier. However, this variant of configuration shall not be used on AP, instead DiagnosticServiceDataIdentifierPortMapping shall be used. Main rational for this restriction is that DiagnosticServiceSwMapping would allow for different configurations for reading and writing the same DiagnosticDataIdentifier. Instead, the DiagnosticService-DataIdentifierPortMapping shall be used to map a DiagnosticDataIdentifier to some application port.

The DiagnosticServiceDataIdentifierPortMapping maps a Diagnostic-DataByIdentifier in the role of diagnosticDataIdentifier to a SwcServiceDependency in the role of swcServiceDependencyInExecutable.

Details regarding the modeling of diagnostic mappings can be found in the TPS Manifest Specification [12].

## 7.2.4.2.2 Reading Diagnostic Data Identifier

[SWS_DM_00401]{DRAFT} Reading Diagnostic Data Identifier on Data Element level dIf the Diagnostic Server instance is required to read data configured as DiagnosticDataIdentifier and at least on of the DiagnosticDataElements aggregated in this DiagnosticDataIdentifier is referenced by some DiagnosticMapping, then Diagnostic Server instance shall retrieve the data by reading data from each DiagnosticDataElement separately according to [SWS_DM_00393] and [SWS_DM_00905].c(RS\_Diag\_04097)

[SWS_DM_00848]{DRAFT} Reading Diagnostic Data Identifier by DataIdentifier interface dIf the Diagnostic Server instance is required to read data configured as DiagnosticDataIdentifier which is referenced by a DiagnosticServiceDataIdentifierPortMapping of category DATA\_IDEN-TIFIER, then the Diagnostic Server instance shall use the DataIdentifier class ([SWS_DM_00601]) or diag::GenericDataIdentifier class ([SWS_DM_00607] instance according to its PortPrototype mapping and associated to the DiagnosticDataIdentifier for reading the data.c(RS\_Diag\_04097)

[SWS_DM_00849]{DRAFT} Reading Diagnostic Data Identifier by GenericUD-SService interface dIf the Diagnostic Server instance is required to read data configured as DiagnosticDataIdentifier which is referenced by a DiagnosticServiceDataIdentifierPortMapping of category GENERIC\_

UDS\_SERVICE, then the Diagnostic Server instance shall use the instance of the diag::GenericUDSService class ([SWS_DM_00602]) referenced by the DiagnosticServiceDataIdentifierPortMapping and call its diag::GenericUDSService::HandleMessage ([SWS_DM_00618]) method with sid parameter set to 0x22 and request\_data set to the id of the DiagnosticDataIdentifier. The diag::GenericUDSService::OperationOutput ([SWS_DM_00578]) is respectively composed of the requested id and the content of every diag::DataElement::OperationOutput ([SWS_DM_00580]) of the related dataElement.c(RS\_Diag\_04097)

[SWS_DM_00850]{DRAFT} Default Service Interface for reading Diagnostic-DataIdentifier dIf the Diagnostic Server instance is required to read data configured as DiagnosticDataIdentifier and none of the requirements [SWS_DM_00401], [SWS_DM_00848], [SWS_DM_00849] applies, then the Diagnostic Server instance shall utilize the associated RPortPrototype typed by the DataIdentifier class ([SWS_DM_00601]) and call its DataIdentifier::Read ([SWS_DM_00640]) function.c(RS\_Diag\_04097)

Note: The default configuration as described in [SWS_DM_00850] assumes, that there is a single instance of PPortPrototype defined in the system, matching the RPortPrototype associated to the requested DiagnosticDataIdentifier. In this case, it is part of integration step to link these two ports.

## 7.2.4.2.3 Writing Diagnostic Data Identifier

[SWS_DM_00906]{DRAFT} Writing Diagnostic Data Identifier by DataIdentifier interface dIf the Diagnostic Server instance is required to write data configured as DiagnosticDataIdentifier which is referenced by a DiagnosticServiceDataIdentifierPortMapping of category DATA\_IDENTIFIER, then the Diagnostic Server instance shall use the diag::GenericDataIdentifier class ([SWS_DM_00607]) or DataIdentifier class ([SWS_DM_00601]) according to its PortPrototype mapping and associated to the DiagnosticDataIdentifier for writing the data.c(RS\_Diag\_04097)

[SWS_DM_00908]{DRAFT} Writing Diagnostic Data Identifier by GenericUDSService interface dIf the Diagnostic Server instance is required to writing data configured as DiagnosticDataIdentifier which is referenced by a DiagnosticServiceDataIdentifierPortMapping of category GENERIC\_UDS\_SERVICE, then the Diagnostic Server instance shall use the instance of the diag::GenericUDSService class referenced by the DiagnosticServiceDataIdentifierPortMapping and call its diag::GenericUDSService::HandleMessage ([SWS_DM_00618]) with SID set to 0x2E and request\_data set to the id of this DiagnosticDataIdentifier followed by the data to be written to this DiagnosticDataIdentifier.c (RS\_Diag\_04097)

[SWS_DM_00907]{DRAFT} Default Service Interface for writing DiagnosticDataIdentifier dIf the Diagnostic Server instance is required to write data configured as DiagnosticDataIdentifier and none of the requirements [SWS_DM_00906], [SWS_DM_00908] applies, then the Diagnostic Server instance shall utilize the associated RPortPrototype typed by the DataIdentifier class ([SWS_DM_00601]) and call DataIdentifier::Write() ([SWS_DM_00598]).c(RS\_Diag\_04097)

Note: The default configuration as described in [SWS_DM_00907] assumes, that there is a single instance of PPortPrototype defined in the system matching the RPortPrototype associated to the requested DiagnosticDataIdentifier. In this case, it is part of integration step to link these two ports.

## 7.2.4.2.4 Reading and writing VIN data

[SWS_DM_00903]{DRAFT} Reading DiagnosticDataIdentifier configured for representing VIN dIf the Diagnostic Server instance needs to read data configured as DiagnosticDataIdentifier with attribute representsVin set to true, the Diagnostic Server instance shall obtain it by using diag::GenericDataIdentifier::Read() ([SWS_DM_00636]) or diag::DataIdentifier::Read() ([SWS_DM_00640]) according to its PortPrototype mapping.c(RS\_Diag\_04097)

[SWS_DM_00904]{DRAFT} Writing DiagnosticDataIdentifier configured for representing VIN dIf the Diagnostic Server instance needs to write data configured as DiagnosticDataIdentifier with attribute representsVin set to true, the Diagnostic Server instance shall call diag::GenericDataIdentifier::Write() ([SWS_DM_00637]) or diag::DataIdentifier::Write() ([SWS_DM_00598]) according to its PortPrototype mapping.c(RS\_Diag\_04097)

## 8 API specification

This chapter lists all provided and required C++ API interfaces of the DM. The C++ API interfaces are divided into two parts:

• UDS Transportlayer interface

A plug-in interface to extend the DM by own transport layers

• Diagnostic Application interface

A DiagnosticPortInterfaces is representing a corresponding code instance. The deployment is simplified due to a direct mapping to DiagnosticObject in DEXT.

## 8.1 C++ UDS Transportlayer API Interfaces

This chapter lists all provided and required C++ API interfaces of the DM for interaction with a UDS Transportlayer implementation.

## 8.1.1 UDS Transportlayer Types

## 8.1.1.1 uds\_transport::ByteVector

## [SWS_DM_00338]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::ByteVector</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef ara::core::Span&lt;uint8_t&gt;</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::ByteVector = ara::core::Span&lt;uint8_t&gt;;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_types.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This is the type of ByteVector.</td></tr></table>


## 8.1.1.2 uds\_transport::ChannelID

[SWS_DM_00337]{DRAFT} d



<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::ChannelID</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef uint32_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::ChannelID = uint32_t;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_types.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1></td></tr></table>

## 8.1.1.3 uds\_transport::Priority

[SWS_DM_00451]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::Priority</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::Priority = uint8_t;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_types.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1></td></tr></table>

## 8.1.1.4 uds\_transport::ProtocolKind

[SWS_DM_00452]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::ProtocolKind</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef ara::core::String</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::ProtocolKind = ara::core::String;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_types.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1></td></tr></table>


## 8.1.1.5 uds\_transport::UdsMessageConstPtr

[SWS_DM_00304]{DRAFT} d


<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessageConstPtr</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef std::unique_ptr&lt;const UdsMessage, std::function&lt;void(const UdsMessage*)&gt; &gt;</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::UdsMessageConstPtr = std::unique_ptr&lt;const UdsMessage, std::function&lt;void(const UdsMessage*)&gt; &gt;;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This is the unique_ptr for constant UdsMessages containing a custom deleter as provided bythe generic/core DM part towards the UdsTransportLayer-Plugin.</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=1>How the exact typedef for UdsMessageConstPtr looks like, is up to the DM product vendor. I.e.how f.i. the deleter signature looks like ... basically the minimal agreement is: UdsMessageConstPtr shall behave like a std::unique_ptr&lt;const UdsMessage&gt;!</td></tr></table>

## 8.1.1.6 uds\_transport::UdsMessagePtr

[SWS_DM_00303]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessagePtr</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef std::unique_ptr&lt;UdsMessage, std::function&lt;void(UdsMessage*)&gt; &gt;</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::UdsMessagePtr = std::unique_ptr&lt;UdsMessage, std::function&lt;void(UdsMessage*)&gt; &gt;;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds transport/uds message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This is the unique_ptr for UdsMessages containing a custom deleter as provided by thegeneric/core DM part towards the UdsTransportLayer-Plugin.</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=1>How the exact typedef for UdsMessagePtr looks like, is up to the DM product vendor. I.e. howf.i. the deleter signature looks like ... basically the minimal agreement is: UdsMessagePtr shallbehave like a std::unique_ptr&lt;UdsMessage&gt;!</td></tr></table>


## 8.1.1.7 uds\_transport::UdsTransportProtocolHandlerID

[SWS_DM_00336]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandlerlD</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>typedef uint8_t</td></tr></table>

## 8.1.2 UdsMessage Class

## [SWS_DM_00291]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class UdsMessage {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>class represents an UDS message exchanged between DM generic core (UdsTransportProtocolMgr) and a specific implementation of UdsTransportProtocolHandler on diagnosticrequest reception path or diagnostic response transmission path.UdsMessage provides the storage for UDS requests/responses. Instances of UdsMessage(with optimized resource allocation) are only created by DM generic core. UdsTransportProtocolHandler read/write on it.</td></tr></table>


## 8.1.2.1 Types

## 8.1.2.1.1 uds\_transport::UsdMessage::Address

## [SWS_DM_00293]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessage::Address</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>uint16_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::UdsMessage::Address = uint16_t;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>type for UDS source and target addresses</td></tr></table>

## 8.1.2.1.2 uds\_transport::UsdMessage::MetaInfoMap

[SWS_DM_00294]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessage::MetalnfoMap</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>ara::core::Map&lt;ara::core::String, ara::core::String&gt;</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::UdsMessage::MetaInfoMap=ara::core::Map&lt;ara::core::String, ara::core::String&gt;;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Type for the meta information attached to a UdsMessage. .</td></tr></table>

## c(RS\_Diag\_04170)

## 8.1.2.1.3 uds\_transport::UsdMessage::TargetAddressType

[SWS_DM_00296]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::TargetAddressType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>std::uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class TargetAddressType : std::uint8_t {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kPhysical= 0</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kFunctional= 1</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>type of target address in UdsMessage</td></tr></table>


## 8.1.2.2 Methods

## 8.1.2.2.1 uds\_transport::UdsMessage::UdsMessage

## [SWS_DM_09012]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsMessage::UdsMessage()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Visibility:</td><td rowspan=1 colspan=1>protected</td></tr></table>

## 8.1.2.2.2 uds\_transport::UdsMessage::UdsMessage

[SWS_DM_09011]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::UdsMessage(const UdsMessage &amp;other)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Visibility:</td><td rowspan=1 colspan=2>protected</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>UdsMessage (const UdsMessage &amp;other)=default;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>other</td><td rowspan=1 colspan=1>Object to copy-construct from</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>reentrant</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Copy constructing the uds message.</td></tr></table>

## 8.1.2.2.3 uds\_transport::UdsMessage::UdsMessage

## [SWS_DM_09013]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::UdsMessage(UdsMessage &amp;&amp;other)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Visibility:</td><td rowspan=1 colspan=2>protected</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>UdsMessage (UdsMessage &amp;&amp;other) noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>other</td><td rowspan=1 colspan=1>Object to move-construct from</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=2>noexcept</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>reentrant</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Move constructing the uds message.</td></tr></table>

## 8.1.2.2.4 uds\_transport::UdsMessage::UdsMessage::operator=

[SWS_DM_09014]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::operator=(const UdsMessage &amp;other)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Visibility:</td><td rowspan=1 colspan=2>protected</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>UdsMessage&amp; operator= (const UdsMessage &amp;other)=default;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>other</td><td rowspan=1 colspan=1>Object to copy-assign from.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>UdsMessage &amp;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>reentrant</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Copy assigning the uds message.</td></tr></table>

## 8.1.2.2.5 uds\_transport::UdsMessage::UdsMessage::operator=

[SWS_DM_09018]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::operator=(UdsMessage &amp;&amp;other)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Visibility:</td><td rowspan=1 colspan=2>protected</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>UdsMessage&amp; operator= (UdsMessage &amp;&amp;other) noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>other</td><td rowspan=1 colspan=1>Object to move-assign from.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>UdsMessage &amp;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=2>noexcept</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>reentrant</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Move assigning the uds message.</td></tr></table>


## 8.1.2.2.6 uds\_transport::UdsMessage::\~UdsMessage

[SWS_DM_09010]{DRAFT} d

## 8.1.2.2.7 uds\_transport::UdsMessage::AddMetaInfo

## [SWS_DM_00302]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::AddMetalnfo(std::shared_ptr&lt; const MetalnfoMap &gt;meta_info)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual void AddMetaInfo (std::shared_ptr&lt; const MetaInfoMap &gt; meta_info);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>meta information relevant for UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>unsafe</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>add new metalnfo to this message.</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=2>typically called by the transport plugin to add channel specific meta-info. (see SWS - there arealready predefined meta-info keys for DolP....)</td></tr></table>

## c(RS\_Diag\_04170)

## 8.1.2.2.8 uds\_transport::UdsMessage::GetPayload

## [SWS_DM_00300]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::GetPayload()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual const uds_transport::ByteVector&amp; GetPayload () const;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>const uds_transport::ByteVector &amp;</td><td rowspan=1 colspan=1>The entire payload (A_Data)</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>unsafe</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get the UDS message data starting with the SID (A_Data as per ISO)</td></tr></table>


| Notes: | marked as "unsafe" with regard to threadsafety as implementation is allowed to do ressource allocation of buffer in the context of this call. |


## [SWS_DM_00301]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::GetPayload()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual uds_transport::ByteVector&amp; GetPayload ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>uds transport::ByteVector &amp;</td><td rowspan=1 colspan=1>payload of the UDSMessage starting from SID.</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>unsafe</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>return the underlying buffer for write access.</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=2>needed by UdsTransportProtocolHandler impl. to fill the UdsMessage with data in RX path. I.e.UdsTransportProtocolHandler impl. gets the UdsMessage instance from call to UdsTransportProtocolMgr::IndicateMessage() and then calls this method on it and write into returned uds_transport::ByteVector.marked as &quot;unsafe&quot; with regard to threadsafety as implementation is allowed to do ressourceallocation of buffer in the context of this call.</td></tr></table>

## 8.1.2.2.9 uds\_transport::UdsMessage::GetSa

## [SWS_DM_00297]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="2" rowspan="1">function</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::uds_transport::UdsMessage::GetSa()</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::uds_transport::UdsMessage</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual Address GetSa () const noexcept;</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="1" rowspan="1">Address</td><td colspan="1" rowspan="1">The source address of the uds message.</td></tr><tr><td colspan="1" rowspan="1">Exception Safety:</td><td colspan="2" rowspan="1">noexcept</td></tr><tr><td colspan="1" rowspan="1">Thread Safety:</td><td colspan="2" rowspan="1">reentrant</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/uds_transport/uds_message.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">Get the source address of the uds message.</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::uds_transport::UdsMessage::GetTa()</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::uds_transport::UdsMessage</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual Address GetTa () const noexcept;</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="1" rowspan="1">Address</td><td colspan="1" rowspan="1">The target address of the uds message.</td></tr><tr><td colspan="1" rowspan="1">Exception Safety:</td><td colspan="2" rowspan="1">noexcept</td></tr><tr><td colspan="1" rowspan="1">Thread Safety:</td><td colspan="2" rowspan="1">reentrant</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/uds_transport/uds_message.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">Get the target address of the uds message.</td></tr></table>

## 8.1.2.2.11 uds\_transport::UdsMessage::GetTaType

## [SWS_DM_00299]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsMessage::GetTaType()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsMessage</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual TargetAddressType GetTaType () const noexcept;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>TargetAddressType</td><td rowspan=1 colspan=1>The target address type of the uds message.</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=2>noexcept</td></tr><tr><td rowspan=1 colspan=1>Thread Safety:</td><td rowspan=1 colspan=2>reentrant</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/uds_message.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get the target address type (phys/func) of the uds message.</td></tr></table>


## 8.1.3 UdsTransportProtocolHandler Class

[SWS_DM_00315]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag::uds_transport</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class UdsTransportProtocolHandler {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Abstract Class, which a specific UDS Transport Protocol (plugin) shall subclass.</td></tr></table>

## 8.1.3.1 Types

## 8.1.3.1.1 uds\_transport::UdsTransportProtocolHandler::InitializationResult

[SWS_DM_09017]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolHandler::InitializationResult</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>std::uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class InitializationResult :std::uint8_t {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kInitializeOk= 0</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kInitializeFailed= 1</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_handler.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Result of Initialize handler.</td></tr></table>


## 8.1.3.2 Methods

8.1.3.2.1 uds\_transport::UdsTransportProtocolHandler::UdsTransportProtocolHandler

## [SWS_DM_09015]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandler::UdsTransportProtocolHandler(constUdsTransportProtocolHandlerlD handler_id, UdsTransportProtocolMgr &amp;transport_protocol_mgr)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>explicit UdsTransportProtocolHandler (const UdsTransportProtocolHandlerID handler_id, UdsTransportProtocolMgr &amp;transport_protocol_mgr);</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>handler_id                               the handler ID used by DM to identify this handler.This is just a number/identification given by the DMcore when instantiating a UdsTransportProtocolHandler instance to be able to distinguish it fromother handler-plugins or built-in UdsTransportProtocolHandler implementations.</td></tr><tr><td rowspan=1 colspan=1>reference to UdsTransportProtocolMgr owned bythis DM, with which UdsTransportProtocolHandlerinstance shall interact.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Constructor of UdsTransportProtocolHandler.</td></tr></table>

## 8.1.3.2.2 uds\_transport::UdsTransportProtocolHandler::\~UdsTransport

[SWS_DM_09016]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandler::~UdsTransportProtocolHandler()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~UdsTransportProtocolHandler ();</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_handler.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of UdsTransportProtocolHandler.</td></tr></table>

## 8.1.3.2.3 uds\_transport::UdsTransportProtocolHandler::GetHandlerID

[SWS_DM_00325]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolHandler::GetHandlerlD()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual UdsTransportProtocolHandlerID GetHandlerID () const;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>UdsTransportProtocolHandlerlD</td><td rowspan=1 colspan=1>UdsTransportProtocolHandlerlD.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Return the UdsTransportProtocolHandlerlD, which was given to the implementation duringconstruction (ctor call).</td></tr></table>


## 8.1.3.2.4 uds\_transport::UdsTransportProtocolHandler::Initialize

[SWS_DM_00319]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolHandler::Initialize()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual InitializationResult Initialize ()=0;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>InitializationResult</td><td rowspan=1 colspan=1>kInitializeOk if initialization was successful, else kInitializeFailed.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Initializes handler.Must be called before Start(). The idea is to have &quot;initialization&quot; of handler-plugin separatedfrom its ctor.</td></tr></table>

## 8.1.3.2.5 uds\_transport::UdsTransportProtocolHandler::NotifyReestablishment

[SWS_DM_00326]{DRAFT}
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolHandler::NotifyReestablishment(ChannelIDchannel_id)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual bool NotifyReestablishment (ChannelIDchannel_id)=0;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>channel_id</td><td rowspan=1 colspan=1>channellD, whose re-establishment shall be notifiedto UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>bool</td><td rowspan=1 colspan=1>true if notification request is accepted and can befulfilled.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Tells the UdsTransportProtocolHandler, that it shall notify the DM core via UdsTransportProtocolMgr::ChannelReestablished()) if the given channel has been re-established after next UdsTransportProtocolHandler::Start().The main purpose of this method is to allow DM to provide an ECU-Reset (0x11 service), withconfiguration option &quot;Pos. response AFTER reset&quot;. In this scenario the request for 0x11 will bereceived on a certain channel with identifying tuple &lt;p_x, c_y&gt; (GlobalChannelldentifier). Thenthe ECU-Reset takes place and after ECU-Restart all UdsProtocolHandlers/plugins getrestarted via call to UdsTransportProtocolHandler::Start(). Now there are two expectations,when this method has been called before and returned &quot;true&quot;: IF the same remote clientconnects to the UdsProtocolHandler, it shall get a channel identification with the sameidentifying tuple &lt;p_x, c_y&gt; as last time. it shall call UdsTransportProtocolMgr::ChannelReestablished(GlobalChannelldentifier&lt;p_x, c_y&gt;)</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=2>: IF the underlying network layer of the UdsTransportProtocolHandler isn&#x27;t really connectionbased (e.g. a UDP based protocol), then the UdsTransportProtocolHandler shall call UdsTransportProtocolMgr::ChannelReestablished() after UdsTransportProtocolHandler::Start() assoon as it detects/assumes that the remote client/tester will be reachable again.: The detection/decision, whether the &quot;same&quot; client reconnects as before is an UdsProtocolHandler implementation specific decision. The general expectation is: If the channel is set upfrom exactly the same remote network-endpoint, it typically shall be given the same channellD(c_y part of the tuple). To support this functionality the implementation at least has to storenon-volatile, that this notification has to be done. Further it might be needed to store someadditional connection specific info non-volatile to make sure, that the same channellD (c_y partof the tuple) can be reassigned. This is the case if the mapping of protocol specific channel info-&gt; channellD isn&#x27;t a stable bijective mapping! Small example: The underlying network protocol,which UdsProtocolHandler implements is based on TCP. At the point in time, where the 0x11 SIrequest is received on channel identified by &lt;p_x, c_y&gt; the DM calls NotifyReestablishment()on this channelID. Now the implementation of UdsProtocolHandler stores non-volatile in thecontext of this call: the NetworkEndpoint (IP-address and port number) of the channel theNetworkEndpoint (IP-address and port number) of the local port (because in this example, theUdsTransportProtocolHandler listens on/supports different ports) the channelID (c_y part) it hascurrently assigned. After restart this channellD only shall be reused for a channel with exactlythe same NetworkEndpoint addresses as stored non-volatile. If this channellD then getsreassigned, then UdsTransportProtocolMgr::ChannelReestablished() has to be called.</td></tr></table>


<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds transport::UdsTransportProtocolHandler::Start()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual void Start ()=0;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Start processing the implemented Uds Transport Protocol.The implementation shall call its superclass Start() method as there might be some stackspecific implementation. Implementation shall be asynchronous as DM might start many/different UdsTransportProtocolHandler in parallel and strong serialization of all those starts justunnecessarily slows down DM startup.</td></tr></table>

## 8.1.3.2.7 uds\_transport::UdsTransportProtocolHandler::Stop

## [SWS_DM_00323]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandler::Stop()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual void Stop ()=0;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Method to indicate that this UdsTransportProtocolHandler should terminate.If UdsTransportProtocolHandler has stopped, it shall call UdsTransportProtocolMgr::HandlerStopped(UdsTransportProtocolHandlerlD)After return from Stop(), the handler-plugin shall NOT call to UdsTransportProtocolMgr with anyother method but UdsTransportProtocolMgr::HandlerStopped()</td></tr></table>


## 8.1.3.2.8 uds\_transport::UdsTransportProtocolHandler::Transmit

[SWS_DM_00327]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolHandler::Transmit(UdsMessageConstPtrmessage, ChannelID channel_id)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsTransportProtocolHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual void Transmit (UdsMessageConstPtr message, ChannelID channel_id) =0;</td></tr></table>

<table><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>message</td><td rowspan=1 colspan=1>The message to be transmitted as a UdsMessage::Ptr (unique_ptr style). UdsTransportProtocolHandler has to give back this UdsMessage::Ptr via UdsTransportProtocolMgr::TransmitConfirmation() to signal, that it is donewith this message.</td></tr><tr><td rowspan=1 colspan=1>channel_id</td><td rowspan=1 colspan=1>identification of channel on which to transmit.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Transmit a Uds message via the underlying Uds Transport Protocol channel.This transmit API covers T_Data.req of ISO 14229-2 Figure 2.</td></tr></table>


## 8.1.4 UdsTransportProtocolMgr Class

## [SWS_DM_00306]{DRAFT} d

| Kind: | class |
| --- | --- |
| Symbol: | ara::diag::uds_transport::UdsTransportProtocolMgr |
| Scope: | namespace ara::diag::uds_transport |
| Syntax: | class UdsTransportProtocolMgr {...}; |
| Header file: | #include "ara/diag/uds_transport/protocol_mgr.h" |
| Description: |  |


## 8.1.4.1 Types

## 8.1.4.1.1 uds\_transport::UdsTransportProtocolMgr::GlobalChannelIdentifier

## [SWS_DM_09021]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>type alias</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::uds_transport::UdsTransportProtocolMgr::GlobalChannelldentifier</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Derived from:</td><td rowspan=1 colspan=1>std::tuple&lt;UdsTransportProtocolHandlerID, ChannelID&gt;</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>using ara::diag::uds_transport::UdsTransportProtocolMgr::GlobalChannelIdentifier = std::tuple&lt;UdsTransportProtocolHandlerID, ChannelID&gt;;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr></table>

## 8.1.4.1.2 uds\_transport::UdsTransportProtocolMgr::IndicationResult

## [SWS_DM_00384]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolMgr::IndicationResult</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>std::uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class IndicationResult :std::uint8_t {...};</td></tr><tr><td rowspan=4 colspan=1>Values:</td><td rowspan=1 colspan=1>kIndicationOk= 0</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kIndicationOccupied=1</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kIndicationOverflow= 2</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kIndicationUnknownTargetAddress= 3</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2></td></tr></table>

## 8.1.4.1.3 uds\_transport::UdsTransportProtocolMgr::TransmissionResult

[SWS_DM_00307]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolMgr::TransmissionResult</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>std::uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class TransmissionResult : std::uint8_t {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kTransmitOk= 0</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>kTransmitFailed= 1</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2></td></tr></table>


## 8.1.4.2 Methods

## 8.1.4.2.1 uds\_transport::UdsTransportProtocolMgr::ChannelReestablished

[SWS_DM_00313]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds transport::UdsTransportProtocolMgr::ChannelReestablished(GlobalChannelIdentifier global_channel_id)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual void ChannelReestablished (GlobalChannelIdentifier global_channel_id) =0;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>global_channel_id</td><td rowspan=1 colspan=1>transport protocol channel, which is available again.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>notification call from the given transport channel, that it has been reestablished since the last(Re)Start from the UdsTransportProtocolHandler to which this channel belongs. To activate thisnotification a previous call to UdsTransportProtocolHandler::NotifyReestablishment() has to bedone. See further documentation at UdsTransportProtocolHandler::NotifyReestablishment().</td></tr></table>

## 8.1.4.2.2 uds\_transport::UdsTransportProtocolMgr::HandleMessage

## [SWS_DM_00311]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="2" rowspan="1">function</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::uds_transport::UdsTransportProtocolMgr::HandleMessage(UdsMessagePtrmessage)</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual void HandleMessage (UdsMessagePtr message)=0;</td></tr><tr><td colspan="1" rowspan="1">Parameters (in):</td><td colspan="1" rowspan="1">message</td><td colspan="1" rowspan="1">The Uds message ptr (unique_ptr semantics) withthe request. Ownership of the UdsMessage is givenback to the generic DM core here.</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="2" rowspan="1">None</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/uds_transport/protocol_mgr.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">Hands over a valid received Uds message (currently this is only a request type) from transportlayer to session layer. It corresponds to T_Data.ind of Figure 2 from ISO 14229-2. The behavioris asynchronously. l.e. the UdsMessage is handed over to Session Layer and it is expected,that it "instantly" returns, which means, that real processing of the message shall be doneasynchronously!</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::uds_transport::UdsTransportProtocolMgr::HandlerStopped(UdsTransportProtocolHandlerlD handler_id)</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual void HandlerStopped (UdsTransportProtocolHandlerID handler_id) =0;</td></tr><tr><td colspan="1" rowspan="1">Parameters (in):</td><td colspan="1" rowspan="1">handler_id</td><td colspan="1" rowspan="1">indication, which plugin stopped.</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="2" rowspan="1">None</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/uds_transport/protocol_mgr.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">notification from handler, that it has stopped now (e.g. closed down network connections, freedresources, etc...)This callback is expected as a reaction from handler to a call to UdsTransportProtocolHandler::Stop.</td></tr></table>

## 8.1.4.2.4 uds\_transport::UdsTransportProtocolMgr::IndicateMessage

[SWS_DM_00309]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolMgr::IndicateMessage(UdsMessage::Addresssource_addr, UdsMessage::Address target_addr, UdsMessage::TargetAddressType type,GlobalChannelldentifier global_channel_id, std::size_t size, Priority priority, ProtocolKindprotocol_kind)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual std::pair&lt;IndicationResult, UdsMessagePtr&gt; IndicateMessage(UdsMessage::Address source_addr, UdsMessage::Address target_addr, UdsMessage::TargetAddressType type, GlobalChannelIdentifier global_channel_id, std::size_t size, Priority priority, ProtocolKindprotocol_kind) =0;</td></tr><tr><td rowspan=7 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>source_addr</td><td rowspan=1 colspan=1>UDS source address of message</td></tr><tr><td rowspan=1 colspan=1>target_addr</td><td rowspan=1 colspan=1>UDS target address of message</td></tr><tr><td rowspan=1 colspan=1>type</td><td rowspan=1 colspan=1>indication whether its is phys/func request</td></tr><tr><td rowspan=1 colspan=1>global_channel_id</td><td rowspan=1 colspan=1>transport protocol channel on which message starthappened</td></tr><tr><td rowspan=1 colspan=1>size</td><td rowspan=1 colspan=1>size in bytes of the UdsMessage starting from SID.</td></tr><tr><td rowspan=1 colspan=1>priority</td><td rowspan=1 colspan=1>the priority of the given message, used forprioritization of conversations</td></tr><tr><td rowspan=1 colspan=1>protocol_kind</td><td rowspan=1 colspan=1>identifier of protocol kind associated to message</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>std::pair&lt; IndicationResult, UdsMessagePtr &gt;</td><td rowspan=1 colspan=1>Pair of IndicationResult and a pointer to UdsMessage owned/created by DM core and returnedto the handler to get filled.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Indicates a message start. This is an interface, which is just served/called by UdsTransportProtocolHandlers, which return true from UdsTransportProtocolHandlers::isStartOfMessageIndicationSupported().</td></tr></table>

## 8.1.4.2.5 uds\_transport::UdsTransportProtocolMgr::NotifyMessageFailure

[SWS_DM_00310]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolMgr::NotifyMessageFailure(UdsMessagePtrmessage)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual void NotifyMessageFailure (UdsMessagePtr message)=0;</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>message</td><td rowspan=1 colspan=1>the pointer to UdsMessage handed back over to thesession layer.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Indicates, that the message indicated via IndicateMessage() has failure and will not lead to afinal HandleMessage() call.</td></tr></table>

## 8.1.4.2.6 uds\_transport::UdsTransportProtocolMgr::TransmitConfirmation

[SWS_DM_00312]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::uds_transport::UdsTransportProtocolMgr::TransmitConfirmation(UdsMessageConstPtr message, TransmissionResult result)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::uds_transport::UdsTransportProtocolMgr</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual void TransmitConfirmation (UdsMessageConstPtr message,TransmissionResult result)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>message</td><td rowspan=1 colspan=1>for which message (created in IndicateMessage())this is the confirmation.</td></tr><tr><td rowspan=1 colspan=1>result</td><td rowspan=1 colspan=1>Result of transmission. In case UDS message couldbe transmitted on network layer: kTransmitOk), kTransmitFailed else.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/uds_transport/protocol_mgr.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>notification about the outcome of a transmit request called by core DM at the handler via UdsTransportProtocolHandler::TransmitThis transmit API covers T_Data.con of ISO 14229-2 Figure 2.</td></tr></table>

## 8.1.5 Sequence Diagramms of UDS Transport Layer Interaction

## 8.1.5.1 Lifecycle

![](./images/c03_983f8a6828323ded8ba3837255c0bbe8dd5e961165ca14bc780267e90a954198.jpg)  
Figure 8.1: UDS Transport Lifecycle

## 8.1.5.2 UDS Request Processing

![](./images/c04_e585bebac966de02193a23caade91ba3877a3ce36a9d8ec5464405d81f3b834e.jpg)  
Figure 8.2: UDS Transport Request Processing<sub>Document</sub> <sub>ID</sub> <sub>723:</sub> <sub>AUTOSAR\_SWS\_Diagnostics</sub> — AUTOSAR CONFIDENTIAL —

## 8.1.5.3 UDS Response Transmission

![](./images/c04_c521c15d4bba177416bc9a1e2c37e7723349d44920e268ebfda3ba51487ed965.jpg)

## 8.1.5.4 Channel Reestablishment

![](./images/c04_c47415395ca67c7c293777670ba65e1bb5bcfafddd1382a0398267ba137a8b54.jpg)  
Figure 8.4: UDS Transport Channel Reestablishment <sub>Document</sub> <sub>ID</sub> <sub>723:</sub> <sub>AUTOSAR\_SWS\_Diagnostics</sub> — AUTOSAR CONFIDENTIAL —

## 8.2 C++ Diagnostic API Interfaces

This chapter lists all provided and required C++ API interfaces of the DM for interaction with application.

## 8.2.1 Introduction

Specialized PortInterfaces (DiagnosticPortInterfaces) allow an optimized deployment in the integration. In comparison of a regular ServiceInterface where each interface instance could be deployed individually, the diagnostic PortInterfaces can only be deployed for a complete process.

[SWS_DM_00561]{DRAFT} Deployment of diagnostic PortInterfaces dDiagnosticPortInterfaces shall by default interact with the machine local DM.c()

Note: It is recommend to use ara::com as communication binding between the ara::diag library and the DM process.

Note: Platform vendors should optionally support a diagnostic deployment over machine boundaries per process (i.e. the used communication binding should support communication across machines).

The AA could instantiated specialzed DiagnosticPortInterfaces for different purposes:

• DiagnosticRoutineInterface A typed interface for a single RoutineIdentifier

• DiagnosticRoutineGenericInterface A generic routine interface for multiple RoutineIdentifier(s)

• DiagnosticDataIdentifierInterface A typed data identifier interface for a single DataIdentifier

• DiagnosticDataIdentifierGenericInterface A generic data identifier interface for multiple DataIdentifier(s)

• DiagnosticDataElementInterface

• DiagnosticGenericUdsInterface A generic interface for diagnostic services

• DiagnosticMonitorInterface A interface for a single DiagnosticEvent

## 8.2.2 Monitor class

This interface is replacing the obsolete DiagnosticMonitor service interface. The constructor offers the possibility to add the debouncing options CounterBased or Time-Based. Further the functionality of the deprecated InitMonitorcould be added as a

## notifier callback.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticMonitor-Interface.

[SWS_DM_00542]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class Monitor final {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Class to implement operations on diagnostic Monitor interface.</td></tr></table>

c(RS\_Diag\_04179)

## 8.2.2.1 diag::Monitor::CounterBased

[SWS_DM_00538]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Monitor::CounterBased</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct CounterBased {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Represents the parameters for counter-based debouncing.</td></tr></table>

## c(RS\_Diag\_04068)

## 8.2.2.2 diag::Monitor::TimeBased

## [SWS_DM_00539]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Monitor::TimeBased</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct TimeBased {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Represents the parameters for time-based debouncing.</td></tr></table>

c(RS\_Diag\_04225)

## 8.2.2.3 diag::Monitor::InitMonitorReason

[SWS_DM_00540]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Monitor::InitMonitorReason</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>1</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class InitMonitorReason {...};</td></tr><tr><td rowspan=3 colspan=1>Values:</td><td rowspan=1 colspan=1>kClear= 0x00</td><td rowspan=1 colspan=1>Event was cleared and all internal values and statesare reset.</td></tr><tr><td rowspan=1 colspan=1>kRestart= 0x01</td><td rowspan=1 colspan=1>Operation cycle of the event was (re-)started.</td></tr><tr><td rowspan=1 colspan=1>kReenabled= 0x02</td><td rowspan=1 colspan=1>Enable conditions or DTC settings re-enabled</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the status information reported to AAs why the monitor may be re-initalized.</td></tr></table>

## c(RS\_Diag\_04179)

## 8.2.2.4 diag::Monitor::MonitorAction

[SWS_DM_00541]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Monitor::MonitorAction</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2></td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class MonitorAction {...};</td></tr><tr><td rowspan=10 colspan=1>Values:</td><td rowspan=1 colspan=1>kPassed= 0x00</td><td rowspan=1 colspan=1>Monitor reports qualified test result passed.</td></tr><tr><td rowspan=1 colspan=1>kFailed= 0x01</td><td rowspan=1 colspan=1>Monitor reports qualified test result failed.</td></tr><tr><td rowspan=1 colspan=1>kPrepassed= 0x02</td><td rowspan=1 colspan=1>Monitor reports unqualified test result pre-passed.</td></tr><tr><td rowspan=1 colspan=1>kPrefailed= 0x03</td><td rowspan=1 colspan=1>Monitor reports unqualified test result pre-failed.</td></tr><tr><td rowspan=1 colspan=1>kFdcThresholdReached= 0x04</td><td rowspan=1 colspan=1>Monitor triggers the storage of ExtendedDataRecords and Freeze Frames (if the triggeringcondition is connected to this threshold).</td></tr><tr><td rowspan=1 colspan=1>kResetTestFailed= 0x05</td><td rowspan=1 colspan=1>Reset TestFailed Bit without any other side effectslike readiness.</td></tr><tr><td rowspan=1 colspan=1>kFreezeDebouncing= 0x06</td><td rowspan=1 colspan=1>Freeze the internal debounce counter/timer.</td></tr><tr><td rowspan=1 colspan=1>kResetDebouncing= 0x07</td><td rowspan=1 colspan=1>Reset the internal debounce counter/timer.</td></tr><tr><td rowspan=1 colspan=1>kPrestore= 0x08</td><td rowspan=1 colspan=1>Capture and prestores the freeze frame data.</td></tr><tr><td rowspan=1 colspan=1>kClearPrestore= 0x09</td><td rowspan=1 colspan=1>Clears a prestored freeze frame.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the status information reported by AAs being relevant for error monitoring.</td></tr></table>

c(RS\_Diag\_04179)

## 8.2.2.5 diag::Monitor::Monitor

## [SWS_DM_00548]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Monitor::Monitor(const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, std::Function&lt; std::sint8_t()&gt; get_fault_detection_counter)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>Monitor (const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, std::Function&lt;std::sint8_t()&gt; get_fault_detection_counter);</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticMonitorInterface</td></tr><tr><td rowspan=1 colspan=1>initMonitor</td><td rowspan=1 colspan=1>Possibility to register an InitMonitor callback</td></tr><tr><td rowspan=1 colspan=1>get_fault_detection_counter</td><td rowspan=1 colspan=1>Possibility to register a function to get the currentFDC for this event.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Monitor constructor for Monitors with Monitor-internal debouncing.</td></tr></table>

## c(RS\_AP\_00137, RS\_Diag\_04179)

## [SWS_DM_00549]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Monitor::Monitor(const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, CounterBased debouncing)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>Monitor (const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, CounterBaseddebouncing);</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticMonitorInterface</td></tr><tr><td rowspan=1 colspan=1>initMonitor</td><td rowspan=1 colspan=1>Possibility to register an InitMonitor callback</td></tr><tr><td rowspan=1 colspan=1>debouncing</td><td rowspan=1 colspan=1>CounterBased debouncing option is added to themonitor</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Monitor constructor for Monitors with counter-based debouncing.</td></tr></table>

## c(RS\_AP\_00137, RS\_Diag\_04179, RS\_Diag\_04068)

## [SWS_DM_00550]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Monitor::Monitor(const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, TimeBased debouncing)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>Monitor (const ara::core::InstanceSpecifier &amp;specifier, std::Function&lt;void(ara::diag::InitMonitorReason)&gt; initMonitor, TimeBaseddebouncing);</td></tr></table>

<table><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticMonitorInterface</td></tr><tr><td rowspan=1 colspan=1>initMonitor</td><td rowspan=1 colspan=1>Possibility to register an InitMonitor callback</td></tr><tr><td rowspan=1 colspan=1>debouncing</td><td rowspan=1 colspan=1>TimeBased debouncing option is added to themonitor</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Monitor constructor for Monitors with time-based debouncing.</td></tr></table>

## c(RS\_AP\_00137, RS\_Diag\_04179, RS\_Diag\_04225)

## 8.2.2.6 diag::Monitor::ReportMonitorAction

## [SWS_DM_00543]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Monitor::ReportMonitorAction(ara::diag::MonitorAction action)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Monitor</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; ReportMonitorAction (ara::diag::MonitorActionaction);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>action</td><td rowspan=1 colspan=1>Contains either the last (un-)qualified test result ofthe diagnostic monitor or commands to control thedebouncing or to force a prestorage.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>a Result with either void or an error</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in reporting.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/monitor.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Function to report the status information being relevant for error monitoring paths.</td></tr></table>

c(RS\_Diag\_04179, RS\_AP\_00139)

## 8.2.3 GenericUDSService class

This interface allows a generic implementation to handle UDS messages. Several DiagnosticServiceSwMappings with a reference to tbd can map to the same Port-Prototype.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticGenericUdsInterface.

[SWS_DM_00602]{DRAFT} d

## 8.2.3.1 diag::GenericUDSService::OperationOutput

[SWS_DM_00578]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::GenericUDSService::OperationOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::GenericUDSService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct OperationOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/generic_uds_service.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data of positive respone message.</td></tr></table>


## 8.2.3.2 diag::GenericUDSService::GenericUDSService function

[SWS_DM_00616]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericUDSService::GenericUDSService(const ara::core::InstanceSpecifier&amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericUDSService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit GenericUDSService (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>An InstanceSpecifier linking this instance with thePortPrototype in the manifest</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_uds_service.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of GenericUDSService.</td></tr></table>

c(RS\_AP\_00137)

## 8.2.3.3 diag::GenericUDSService::\~GenericUDSService function

## [SWS_DM_00584]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::GenericUDSService::~GenericUDSService()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::GenericUDSService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~GenericUDSService () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/generic_uds_service.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of GenericUDSService.</td></tr></table>

c(RS\_AP\_00134)

## 8.2.3.4 diag::GenericUDSService::Offer function

## [SWS_DM_00619]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericUDSService::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericUDSService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_uds_service.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139)

## 8.2.3.5 diag::GenericUDSService::StopOffer function

[SWS_DM_00620]{DRAFT} d
<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="2" rowspan="1">function</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::GenericUDSService::StopOffer()</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::GenericUDSService</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">void StopOffer ();</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="2" rowspan="1">None</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/generic_uds_service.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">This StopOffer will disable the forwaring of request messages from DM.</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::GenericUDSService::HandleMessage(std::uint8_t sid, ara::core::Span&lt; std::uint8_t&gt;request_data, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::GenericUDSService</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual ara::core::Future&lt;OperationOutput&gt; HandleMessage (std::uint8_tsid, ara::core::Span&lt; std::uint8_t &gt; request_data, ara::diag::MetaInfometa_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td colspan="1" rowspan="4">Parameters (in):</td><td colspan="1" rowspan="1">sid</td><td colspan="1" rowspan="1">Diagnostic Request Service Identifier.</td></tr><tr><td colspan="1" rowspan="1">request_data</td><td colspan="1" rowspan="1">Diagnostic request data (starting after SID).</td></tr><tr><td colspan="1" rowspan="1">meta_info</td><td colspan="1" rowspan="1">Metalnfo of the request.</td></tr><tr><td colspan="1" rowspan="1">cancellation_handler</td><td colspan="1" rowspan="1">Set if the current conversation is canceled.</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="1" rowspan="1">ara::core::Future&lt; OperationOutput &gt;</td><td colspan="1" rowspan="1">a Result with either a OperationOutput (Diagnosticresponse data (starting after SID)) or an error</td></tr><tr><td colspan="1" rowspan="1">Errors:</td><td colspan="1" rowspan="1">tbd</td><td colspan="1" rowspan="1">This error set includes all NegativeResponseCodesdefined in UDS.</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/generic_uds_service.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">Called for any request messsage.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.2.4 GenericDataIdentifier class

This interface allows a generic implementation of an data identifier handler. Multiple DiagnosticServiceDataIdentifierPortMappings can reference to the same PortPrototype.

The InstanceSpecifier is only compatible with PortInterface of Diagnostic-DataIdentifierGenericInterface.

## [SWS_DM_00607]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::GenericDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class GenericDataIdentifier {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/generic_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Generic Dataldentifer interface.</td></tr></table>


## 8.2.4.1 diag::GenericDataIdentifier::OperationOutput type

## [SWS_DM_00641]{DRAFT} d

## 8.2.4.2 diag::GenericDataIdentifier::GenericDataIdentifier function

[SWS_DM_00634]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericDataldentifier::GenericDataldentifier(const ara::core::InstanceSpecifier&amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit GenericDataIdentifier (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticDataldentifierGenericInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Class for an GenericDataldentifier.</td></tr></table>

c(RS\_AP\_00137)

## 8.2.4.3 diag::GenericDataIdentifier::\~GenericDataIdentifier function

[SWS_DM_00635]{DRAFT} d
| Kind: | function |
| --- | --- |
| Symbol: | ara::diag::GenericDataldentifier::~GenericDataldentifier() |
| Scope: | class ara::diag::GenericDataldentifier |
| Syntax: | virtual ~GenericDataIdentifier () noexcept=default; |
| Exception Safety: | noexcept |
| Header file: | #include "ara/diag/generic_data_identifier.h" |
| Description: | Destructor of class GenericDataldentifier. |

c(RS\_AP\_00134)

## 8.2.4.4 diag::GenericDataIdentifier::Offer function

[SWS_DM_00638]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericDataldentifier::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139)

## 8.2.4.5 diag::GenericDataIdentifier::StopOffer function

[SWS_DM_00639]{DRAFT} d
| Kind: | function |
| --- | --- |
| Symbol: | ara::diag::GenericDataldentifier::StopOffer() |
| Scope: | class ara::diag::GenericDataldentifier |
| Syntax: | void StopOffer (); |
| Return value: | None |
| Header file: | #include "ara/diag/generic_data_identifier.h" |
| Description: | This StopOffer will disable the forwaring of request messages from DM. |


## 8.2.4.6 diag::GenericDataIdentifier::Read function

## [SWS_DM_00636]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericDataldentifier::Read(std::uint16_t data_identifier, ara::diag::Metalnfo metainfo, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; Read (std::uint16_t data_identifier, ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>data_identifier</td><td rowspan=1 colspan=1>the corresponding Dataldentifer</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for ReadDataByldentifer request for this DiagnosticDataldentifier.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.2.4.7 diag::GenericDataIdentifier::Write function

## [SWS_DM_00637]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericDataldentifier::Write(std::uint16_t data_identifier, ara::core::Span&lt; std::uint8t &gt; request_data, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; Write (std::uint16_t data_identifier,ara::core::Span&lt; std::uint8_t &gt; request_data, ara::diag::MetaInfometa_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=4 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>data_identifier</td><td rowspan=1 colspan=1>the corresponding Dataldentifer</td></tr><tr><td rowspan=1 colspan=1>request_data</td><td rowspan=1 colspan=1>Content of request message (without Dataldentifer)</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>a Result with either void (for a positive responsemessage) or an UDS NRC value (for an negativeresponse message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for WriteDataByldentifer request for this DiagnosticDataldentifier.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.2.5 GenericRoutine class

This interface allows a generic implementation of an routine handler. Several DiagnosticServiceSwMappings with a reference to DiagnosticRoutineControl can map to the same PortPrototype.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticRoutine-GenericInterface.

[SWS_DM_00605]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class GenericRoutine {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Generic Routine interface.</td></tr></table>

c(RS\_Diag\_04224)

## 8.2.5.1 diag::GenericRoutine::OperationOutput

[SWS_DM_00551]{DRAFT} d
| Kind: | struct |
| --- | --- |
| Symbol: | ara::diag::GenericRoutine::OperationOutput |
| Scope: | class ara::diag::GenericRoutine |
| Syntax: | struct OperationOutput {...}; |
| Header file: | #include "ara/diag/generic_routine.h" |
| Description: | Response data of positive respone message. |

c(RS\_Diag\_04224)

## 8.2.5.2 diag::GenericRoutine::GenericRoutine function

[SWS_DM_00552]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericRoutine::GenericRoutine(const ara::core::InstanceSpecifier &amp;specifier</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit GenericRoutine (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticRoutineGenericInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Class for an GenericRoutine.</td></tr></table>

c(RS\_AP\_00137, RS\_Diag\_04224)

## 8.2.5.3 diag::GenericRoutine::\~GenericRoutine function

## [SWS_DM_00553]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::GenericRoutine::~GenericRoutine()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~GenericRoutine () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class GenericRoutine.</td></tr></table>

c(RS\_AP\_00134, RS\_Diag\_04224)

## 8.2.5.4 diag::GenericRoutine::Offer function

[SWS_DM_00557]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericRoutine::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04224)

## 8.2.5.5 diag::GenericRoutine::StopOffer function

[SWS_DM_00558]{DRAFT} d
<table><tr><td>Kind:</td><td colspan="2">function</td></tr><tr><td>Symbol:</td><td colspan="2">ara::diag::GenericRoutine::StopOffer()</td></tr><tr><td>Scope:</td><td colspan="2">class ara::diag::GenericRoutine</td></tr><tr><td>Syntax:</td><td colspan="2">void StopOffer ();</td></tr><tr><td>Return value:</td><td colspan="2">None</td></tr><tr><td>Header file:</td><td colspan="2">#include "ara/diag/generic_routine.h"</td></tr><tr><td>Description:</td><td colspan="2">This StopOffer will disable the forwaring of request messages from DM.</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::GenericRoutine::Start(std::uint16t routine id, ara::core::Span&lt; std::uint8 t &gt;request_data, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::GenericRoutine</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">virtual ara::core::Future&lt;OperationOutput&gt; Start (std::uint16_troutine_id, ara::core::Span&lt; std::uint8_t &gt; request_data,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td colspan="1" rowspan="4">Parameters (in):</td><td colspan="1" rowspan="1">routine_id</td><td colspan="1" rowspan="1">the corresponding Routineldentifer</td></tr><tr><td colspan="1" rowspan="1">request_data</td><td colspan="1" rowspan="1">Content of request message (without RoutineIdentifer)</td></tr><tr><td colspan="1" rowspan="1">meta_info</td><td colspan="1" rowspan="1">contains additional meta information</td></tr><tr><td colspan="1" rowspan="1">cancellation_handler</td><td colspan="1" rowspan="1">informs if the current conversation is canceled</td></tr><tr><td colspan="1" rowspan="1">Return value:</td><td colspan="1" rowspan="1">ara::core::Future&lt; OperationOutput &gt;</td><td colspan="1" rowspan="1">a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td colspan="1" rowspan="1">Errors:</td><td colspan="1" rowspan="1">tbd</td><td colspan="1" rowspan="1">Any applicable NegativeResponseValue</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/generic_routine.h"</td></tr><tr><td colspan="1" rowspan="1">Description:</td><td colspan="2" rowspan="1">Called for RoutineControl with SubFunction Start request for this DiagnosticRoutineldentifier.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04224, RS\_Diag\_04170)

## 8.2.5.7 diag::GenericRoutine::Stop function

## [SWS_DM_00555]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericRoutine::Stop(std::uint16 t routine id, ara::core::Span&lt; std::uint8 t &gt;request_data, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; Stop (std::uint16_troutine_id, ara::core::Span&lt; std::uint8_t &gt; request_data,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=4 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>routine_id</td><td rowspan=1 colspan=1>the corresponding Routineldentifer</td></tr><tr><td rowspan=1 colspan=1>request_data</td><td rowspan=1 colspan=1>Content of request message (without RoutineIdentifer)</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RoutineControl with SubFunction Stop request for this DiagnosticRoutineldentifier.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04224, RS\_Diag\_04170)

## 8.2.5.8 diag::GenericRoutine::RequestResults function

[SWS_DM_00556]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::GenericRoutine::RequestResults(std::uint16_t routine_id, ara::core::Span&lt;std::uint8_t &gt; request_data, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandlercancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::GenericRoutine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; RequestResults(std::uint16_t routine_id, ara::core::Span&lt; std::uint8_t &gt; request_data, ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=4 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>routine_id</td><td rowspan=1 colspan=1>the corresponding Routineldentifer</td></tr><tr><td rowspan=1 colspan=1>request_data</td><td rowspan=1 colspan=1>Content of request message (without RoutineIdentifer)</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/generic_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RoutineControl with SubFunction RequestResults request for this DiagnosticRoutineIdentifier.</td></tr></table>

c(RS\_Diag\_04224, RS\_Diag\_04170)

## 8.2.6 CancellationHandler class

## [SWS_DM_00608]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class CancellationHandler final {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/cancellation handler.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>CancellationHandler contains a shared state if the processing should be canceled .</td></tr></table>


## 8.2.6.1 diag::CancellationHandler::CancellationHandler function

[SWS_DM_00609]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CancellationHandler::CancellationHandler()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>CancellationHandler ()=delete;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Constructor of CancellationHandler cannot be used.</td></tr></table>


## [SWS_DM_00610]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::CancellationHandler::CancellationHandler(CancellationHandler &amp;&amp;)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>CancellationHandler (CancellationHandler &amp;&amp;) noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>CancellationHandler &amp;&amp;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=2>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Move constructor of CancellationHandler.</td></tr></table>


## [SWS_DM_00611]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CancellationHandler::CancellationHandler(CancellationHandler &amp;)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>CancellationHandler (CancellationHandler &amp;)=delete;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Copy constructor of CancellationHandler cannot be used.</td></tr></table>


## [SWS_DM_00612]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::CancellationHandler::operator=(CancellationHandler &amp;&amp;)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>CancellationHandler&amp; operator= (CancellationHandler &amp;&amp;)noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>CancellationHandler &amp;&amp;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>CancellationHandler &amp;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=2>noexcept</td></tr></table>

| Header file: | #include "ara/diag/cancellation_handler.h" |
| --- | --- |
| Description: | Move assignment operator of CancellationHandler. |


## [SWS_DM_00613]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CancellationHandler::operator=(CancellationHandler &amp;)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>CancellationHandler&amp; operator= (CancellationHandler &amp;)=delete;</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Copy assignment operator of CancellationHandler cannot be used.</td></tr></table>


## 8.2.6.2 diag::CancellationHandler::IsCanceled function

[SWS_DM_00614]{DRAFT} d

<table><tr><td>Kind:</td><td colspan="2">function</td></tr><tr><td>Symbol:</td><td colspan="2">ara::diag::CancellationHandler::IsCanceled()</td></tr><tr><td>Scope:</td><td colspan="2">class ara::diag::CancellationHandler</td></tr><tr><td>Syntax:</td><td colspan="2">bool IsCanceled () const;</td></tr><tr><td>Return value:</td><td>bool 一</td><td></td></tr><tr><td>Header file:</td><td colspan="2">#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td>Description:</td><td colspan="2">Returns true in if the diagnostic service execution is cancelled in DM.</td></tr></table>


## 8.2.6.3 diag::CancellationHandler::SetNotifier function

## [SWS_DM_00615]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::CancellationHandler::SetNotifier(std::Function&lt; void()&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::CancellationHandler</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>void SetNotifier (std::Function&lt; void()&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1></td></tr></table>


152 of 312

<table><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/cancellation_handler.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Regisering a notifier function which is called if the diagnostic service execution is canceled inDM.</td></tr></table>

## 8.3 C++ Diagnostic generated API Interfaces

Namespaces are used to separate the definition of services from each other to prevent name conflicts and they allow to use reasonably short names.

[SWS_DM_00510]{DRAFT} Namespace of Service header files dBased on the symbol attributes of the ordered SymbolProps aggregated by PortInterface in role namespace, the C++ namespace of the Service header file shall be:

```typescript
1 namespace <PortInterface.namespace[0].symbol> {
2 namespace <PortInterface.namespace[1].symbol> {
3 namespace <...> {
4 namespace <PortInterface.namespace[n].symbol> {
5
6 } // namespace <PortInterface.namespace[n].symbol>
7 } // namespace <...>
8 } // namespace <PortInterface.namespace[1].symbol>
9 } // namespace <PortInterface.namespace[0].symbol>
```

with all namespace names converted to lower-case letters.c()

## 8.3.1 Implementation Types header files

The Implementation Types header files include the ara::diag specific type declarations derived from the CppImplementationDataTypes created from the definitions of AUTOSAR meta model classes within the DiagnosticPortInterface description.

[SWS_DM_00511]{DRAFT} Implementation Types header files existence dThe diagnostic management shall provide an Implementation Types header file for each CppImplementationDataType defined in the input by using the file name impl\_type\_<symbol>.h, where <symbol> is the Cpp Implementation Data Type symbol converted to lower-case letters.c()

The Implementation Types header files might need to include other header files, e.g.   
for ara::core::String or ara::core::Vector.

[SWS_DM_00512]{DRAFT} Data Type definitions for AUTOSAR Data Types in Implementation Types header files dThe Implementation Types header files shall include the type definitions and structure and class definitions for all the AUTOSAR Data Types.c()

[SWS_DM_00513]{DRAFT} Implementation Types header file namespace dThe C++ namespace of the Implementation Types header file for a given CppImplementationDataType is defined via the aggregated namespace. Based on the symbol attributes of the ordered SymbolProps aggregated by CppImplementationDataType in role namespace, the C++ namespace of the Implementation Types header file shall be:

1 namespace <CppImplementationDataType.namespace[0].symbol> {   
2 namespace <CppImplementationDataType.namespace[1].symbol> {   
3 namespace <...> {   
4 namespace <CppImplementationDataType.namespace[n].symbol> {   
5   
6 } // namespace <CppImplementationDataType.namespace[n].symbol>   
7 } // namespace <...>   
8 } // namespace <CppImplementationDataType.namespace[1].symbol>   
9 } // namespace <CppImplementationDataType.namespace[0].symbol>

with all namespace names converted to lower-case letters.c()

## 8.3.2 Typed Routine class

This routine interface is replacing the obsolete RoutineService service interface. The InstanceSpecifier is only compatible with PortInterface of DiagnosticRoutineInterface.

## [SWS_DM_00604]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace Namespace_1_OfPortInterface::Namespace_2_OfPortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class ShortnameOf_RI_PortInterface {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_routine.h&quot;#include &quot;ara/diag/Namespace_1OfPortInterface/Namespace_2_OfPortInterface/.../ShortnameOf_PortInterface_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Typed Routine interface.</td></tr></table>

## 8.3.2.2 diag::Routine::StopOutput

[SWS_DM_00582]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::StopOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct StopOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data.</td></tr></table>


## 8.3.2.3 diag::Routine::RequestResultsOutput

[SWS_DM_00583]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::RequestResultsOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct RequestResultsOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data.</td></tr></table>


## 8.3.2.4 Routine Constructor function

## [SWS_DM_00589]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::ShortnameOfPortInterface(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit ShortnameOfPortInterface (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>An InstanceSpecifier linking this instance with thePortPrototype in the manifest</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of typed Routine interface.</td></tr></table>

## c(RS\_AP\_00137)

## 8.3.2.5 Routine Destructor function

## [SWS_DM_00590]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::~ShortnameOfPortInterface()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~ShortnameOfPortInterface () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of typed Routine interface</td></tr></table>

## c(RS\_AP\_00134)

## 8.3.2.6 Routine ::Offer function

## [SWS_DM_00594]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_routine.h&quot;</td></tr></table>

| Description: | This Offer will enable the DM to forward request messages to this handler. |
| --- | --- |
|  |  |

c(RS\_Diag\_04224, RS\_AP\_00139)

## 8.3.2.7 Routine ::StopOffer function

[SWS_DM_00595]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>


## 8.3.2.8 Routine::Start function

[SWS_DM_00591]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface::Start(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;StartOutput&gt; Start (Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;... ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; StartOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr></table>

| Header file: | #include "ara/diag/name_routine.h" |
| --- | --- |
| Description: | Called for RoutineControl with SubFunction Start request for this DiagnosticRoutineldentifier. |

c(RS\_AP\_00138, RS\_Diag\_04224, RS\_Diag\_04170)

## 8.3.2.9 Routine::Stop function

## [SWS_DM_00592]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace 1 OfPortInterface::Namespace 2 OfPortInterface::ShortnameOf RI PortInterface::Stop(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace 1 OfPortInterface::Namespace 2 OfPortInterface::ShortnameOf RI PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;StopOutput&gt; Stop(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; StopOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RoutineControl with SubFunction Stop request for this DiagnosticRoutineldentifier.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04224, RS\_Diag\_04170)

## 8.3.2.10 Routine::RequestResults function

## [SWS_DM_00593]{DRAFT} d

<table><tr><td rowspan="3">Kind: Symbol:</td><td>function Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_Port</td></tr><tr><td>Interface::RequestResults(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_Of ArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOf ArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentData</td></tr><tr><td>Prototype;... ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_ handler)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_RI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;RequestResultsOutput&gt; RequestResults(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::MetaInfo meta_info,ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; RequestResultsOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_routine.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RoutineControl with SubFunction RequestResults request for this DiagnosticRoutineIdentifier.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04224, RS\_Diag\_04170)

## 8.3.3 Typed DataIdentifier class

This data identifier interface is replacing the obsolete DataIdentifier service interface.

The InstanceSpecifier is only compatible with PortInterface of Diagnostic-DataIdentifierInterface.

[SWS_DM_00601]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace Namespace_1_OfPortInterface::Namespace_2_OfPortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class ShortnameOf_DI_PortInterface {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/Namespace_1_OfPortInterface/Namespace_2_OfPortInterface/.../ShortnameOf_PortInterface_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Typed Dataldentifer interface.</td></tr></table>

## 8.3.3.2 DataIdentifier Constructor function

[SWS_DM_00585]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::ShortnameOfPortInterface(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit ShortnameOfPortInterface (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>An InstanceSpecifier linking this instance with thePortPrototype in the manifest</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of typed Dataldentifer interface.</td></tr></table>

## c(RS\_AP\_00137)

## 8.3.3.3 DataIdentifier Destructor function

## [SWS_DM_00586]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::~ShortnameOfPortInterface()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~ShortnameOfPortInterface () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name data identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of typed Dataldentifer interface.</td></tr></table>

c(RS\_AP\_00134)

## 8.3.3.4 DataIdentifier ::Offer function

[SWS_DM_00599]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139)

## 8.3.3.5 DataIdentifier ::StopOffer function

## [SWS_DM_00600]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>


## 8.3.3.6 DataIdentifier::Read function

## [SWS_DM_00640]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::Read(ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace 1 OfPortInterface::Namespace 2 OfPortInterface::ShortnameOf DI PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ara::core::Future&lt;Output&gt; Read (ara::diag::MetaInfo meta_info,ara::diag::CancellationHandler cancellation_handler)=0;</td></tr></table>

<table><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; Output &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for ReadDataByldentifer request for this DiagnosticDataldentifier.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.3.3.7 DataIdentifier::Write function

[SWS_DM_00598]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface::Write(Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DI_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; Write (Namespace_1_OfTypeOfArgumentDataPrototype::Type_1_OfArgumentDataPrototype Shortname_1_OfArgumentDataPrototype;Namespace_2_OfTypeOfArgumentDataPrototype::Type_2_OfArgumentDataPrototype Shortname_2_OfArgumentDataPrototype;...ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>a Result with either void (for a positive responsemessage) or an UDS NRC value (for an negativeresponse message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_identifier.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for WriteDataByldentifer request for this DiagnosticDataldentifier.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.3.4 Typed DataElement class

This data element interface is replacing the obsolete DataElement service interface. The InstanceSpecifier is only compatible with PortInterface of DiagnosticDataElementInterface.

[SWS_DM_00603]{DRAFT} d


<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace Namespace_1_OfPortInterface::Namespace_2_OfPortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class ShortnameOf_DE_PortInterface {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/Namespace_1_OfPortInterface/Namespace_2_OfPortInterface/.../ShortnameOf_PortInterface_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Typed DataElement interface.</td></tr></table>

## 8.3.4.1 diag::DataElement::OperationOutput

[SWS_DM_00580]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::OperationOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct OperationOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data.</td></tr></table>


## 8.3.4.2 DataElement Constructor function

## [SWS_DM_00587]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::ShortnameOfPortInterface(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit ShortnameOfPortInterface (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>An InstanceSpecifier linking this instance with thePortPrototype in the manifest</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of typed DataElement interface.</td></tr></table>

c(RS\_AP\_00137)

## 8.3.4.3 DataElement Destructor function

[SWS_DM_00588]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::~ShortnameOfPortInterface()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~ShortnameOfPortInterface () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/name_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of typed DataElement interface.</td></tr></table>

## c(RS\_AP\_00134)

## 8.3.4.4 DataElement ::Offer function

## [SWS_DM_00597]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

## c(RS\_AP\_00139)

## 8.3.4.5 DataElement ::StopOffer function

## [SWS_DM_00617]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr></table>

## 8.3.4.6 DataElement ::Read function

[SWS_DM_00596]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface::Read(ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class Namespace_1_OfPortInterface::Namespace_2_OfPortInterface::ShortnameOf_DE_PortInterface</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; Read (ara::diag::MetaInfometa_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Result with either OperationOutput (for a positiveresponse message) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/name_data_element.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for reading a DataElement.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.4 C++ Diagnostic Error Types

[SWS_DM_00544]{DRAFT} Use of general ara::diag errors dAny Checked Error of a service interface shall be reported via the return type as specified in [14].c()

In ara::diag, there are the following types of Checked Errors:

1. Offer ara::diag errors: These errors can occur in a call of a any Offer interface method. They are defined in the error domain ara::diag::DiagErrorDomain.

2. Reporting ara::diag errors: These errors can occur in a call of a ReportMonitorAction interface method. They are defined in the error domain ara::diag::DiagErrorDomain.

3. UDS NRC ara::diag errors: These errors can be returned by the skeletons. They are defined in the error domain ara::diag::DiagUdsNrcErrorDomain.

[SWS_DM_00545]{DRAFT} Definition Offer ara::diag errors dOffer ara::diag errors shall be defined in the error domain ara::diag::DiagErrorDomain in accordance with [14].c()

## [SWS_DM_00559]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DiagOfferErrc</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>ara::core::ErrorDomain::CodeType</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class DiagOfferErrc :  ara::core::ErrorDomain::CodeType {...};</td></tr><tr><td rowspan=3 colspan=1>Values:</td><td rowspan=1 colspan=1>kAlreadyOffered= 101</td><td rowspan=1 colspan=1>The service is already offered.</td></tr><tr><td rowspan=1 colspan=1>kConfigurationMismatch= 102</td><td rowspan=1 colspan=1>monitor configuration does not match dext</td></tr><tr><td rowspan=1 colspan=1>kDebouncingConfigurationInconsistent= 103</td><td rowspan=1 colspan=1>monitor debouncing configuration invalid, e.g.passed threshold larger than failed threshold..</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/diag_error_domain.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>The DiagOfferErrc enumeration defines the error codes for the DiagErrorDomain</td></tr></table>


[SWS_DM_00546]{DRAFT} Definition Reporting ara::diag errors dReporting ara::diag errors shall be defined in the error domain ara::diag::DiagErrorDomain in accordance with [14].c()

## [SWS_DM_00560]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DiagReportingErrc</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>ara::core::ErrorDomain::CodeType</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class DiagReportingErrc :ara::core::ErrorDomain::CodeType{. . .};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kInvalidArgument= 105</td><td rowspan=1 colspan=1>e.g. kPreFailed with internal debouncing</td></tr><tr><td rowspan=1 colspan=1>kGenericError= 107</td><td rowspan=1 colspan=1>generic issue, e.g. connection to DM lost</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/diag_error_domain.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>The DiagOfferErrc enumeration defines the error codes for the DiagErrorDomain. .</td></tr></table>


[SWS_DM_00547]{DRAFT} Definition UDS NRC ara::diag errors dUDS NRC ara::diag errors shall be defined in the error domain ara::diag::DiagUdsNrcErrorDomain in accordance with [14].c()

[SWS_DM_00526]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>int32_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class DiagUdsNrcErrc :int32_t {...};</td></tr><tr><td rowspan=34 colspan=1>Values:</td><td rowspan=1 colspan=1>kGeneralReject= 0x10</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kServiceNotSupported= 0x11</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kSubfunctionNotSupported= 0x12</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kIncorrectMessageLengthOrlnvalidFormat= 0x13</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kResponseTooLong= 0x14</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kBusyRepeatRequest= 0x21</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kConditionsNotCorrect= 0x22</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kRequestSequenceError= 0x24</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kNoResponseFromSubnetComponent= 0x25</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kFailurePreventsExecutionOfRequestedAction= 0x26</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kRequestOutOfRange= 0x31</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kSecurityAccessDenied= 0x33</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kInvalidKey= 0x35</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kExceedNumberOfAttempts= 0x36</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kRequiredTimeDelayNotExpired= 0x37</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kUploadDownloadNotAccepted= 0x70</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTransferDataSuspended= 0x71</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kGeneralProgrammingFailure= 0x72</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kWrongBlockSequenceCounter= 0x73</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kSubFunctionNotSupportedInActiveSession= 0x7E</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kServiceNotSupportedInActiveSession= 0x7F</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kRpmTooHigh= 0x81</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kRpmTooLow= 0x82</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kEnginelsRunning= 0x83</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kEnginelsNotRunning= 0x84</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kEngineRunTimeTooLow= 0x85</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTemperatureTooHigh= 0x86</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTemperatureTooLow= 0x87</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kVehicleSpeedTooHigh= 0x88</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kVehicleSpeedTooLow= 0x89</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kThrottlePedalTooHigh= 0x8A</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kThrottlePedalTooLow= 0x8B</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTransmissionRangeNotInNeutral=0x8C</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTransmissionRangeNotInGear= 0x8D</td><td rowspan=1 colspan=1>According to ISO.</td></tr></table>

<table><tr><td rowspan=6 colspan=1></td><td rowspan=1 colspan=1>kBrakeSwitchNotClosed= 0x8F</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kShifterLeverNotInPark= 0x90</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kTorqueConverterClutchLocked= 0x91</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kVoltageTooHigh= 0x92</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kVoltageTooLow= 0x93</td><td rowspan=1 colspan=1>According to ISO.</td></tr><tr><td rowspan=1 colspan=1>kNoProcessingNoResponse= 0xFF</td><td rowspan=1 colspan=1>Deviating from ISO - no further service processingand no response (silently ignore request message).</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/diag_uds_nrc_error_domain.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Specifies the types of internal errors that can occur upon calling Offer or ReportMonitorAction.</td></tr></table>

## 8.5 C++ Diagnostic API Interfaces

This chapter is considered to be experimental and thus might be subject to design changes and additional interfaces in the upcoming release. This chapter lists all experimental C++ API interfaces of the DM for interaction with application.

<table><tr><td rowspan=1 colspan=1>service interface</td><td rowspan=1 colspan=1>diagnostic interface</td></tr><tr><td rowspan=1 colspan=1>DiagnosticConversation</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>DiagnosticEvent</td><td rowspan=1 colspan=1>ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>DTCInformationDiagnosticMemoryDiagnosticServer</td><td rowspan=1 colspan=1>ara::diag:DTCInformation</td></tr><tr><td rowspan=1 colspan=1>EnableConditionClearCondition</td><td rowspan=1 colspan=1>ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>OperationCycle</td><td rowspan=1 colspan=1>ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Indicator</td><td rowspan=1 colspan=1>ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>ServiceManufacturerValidationServiceSupplierValidation</td><td rowspan=1 colspan=1>ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>SecurityAccess</td><td rowspan=1 colspan=1>ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>DolPGroupldentification</td><td rowspan=1 colspan=1>ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>DolPPowerModelnformation</td><td rowspan=1 colspan=1>ara::diag::DolPPowerMode</td></tr></table>

Table 8.1: Overview obsolete service interfaces with new C++ interfaces

## 8.5.1 Event class

This interface is replacing the obsolete DiagnosticEvent service interface. The InstanceSpecifier is only compatible with PortInterface of DiagnosticEventInterface.

[SWS_DM_00646]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class Event {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Class to implement operations on diagnostic Events.</td></tr></table>

## c(RS\_Diag\_04151)

## 8.5.1.1 diag::Event::DTCFormatType type

## [SWS_DM_00642]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::DTCFormatType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class DTCFormatType :uint8_t {...};</td></tr><tr><td rowspan=3 colspan=1>Values:</td><td rowspan=1 colspan=1>kDTCFormatOBD= 0</td><td rowspan=1 colspan=1>SAE J2012-DA DTCFormat 00 as defined in ISO15031-6 specification.</td></tr><tr><td rowspan=1 colspan=1>kDTCFormatUDS= 1</td><td rowspan=1 colspan=1>ISO_14229-1_DTCFormat as defined in ISO14229-1 specification.</td></tr><tr><td rowspan=1 colspan=1>kDTCFormatJ1939= 2</td><td rowspan=1 colspan=1>SAE_J1939-73_DTCFormat as defined in SAEJ1939-73.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the type of the DTC format according to ISO 14229-1.</td></tr></table>

## c(RS\_Diag\_04201, RS\_AP\_00125)

## 8.5.1.2 diag::Event::EventStatusBit type

## [SWS_DM_00643]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="2" rowspan="1">enumeration</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::Event::EventStatusBit</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::Event</td></tr><tr><td colspan="1" rowspan="1">Underlying type:</td><td colspan="2" rowspan="1">uint8_t</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">enum class EventStatusBit : uint8_t {...};</td></tr><tr><td colspan="1" rowspan="3">Values:</td><td colspan="1" rowspan="1">kTestFailed</td><td colspan="1" rowspan="1">bit 0: TestFailed</td></tr><tr><td colspan="1" rowspan="1">kTestFailedThisOperationCycle</td><td colspan="1" rowspan="1">bit 1: TestFailedThisOperationCycle</td></tr><tr><td colspan="1" rowspan="1">kTestNotCompletedThisOperationCycle</td><td colspan="1" rowspan="1">bit 6: TestNotCompletedThisOperationCycle</td></tr><tr><td>Header file:</td><td>#include "ara/diag/event.h"</td></tr><tr><td>Description:</td><td>Single event status bits.</td></tr></table>

c(RS\_Diag\_04151, RS\_AP\_00125)

## 8.5.1.3 diag::Event::EventStatusByte type

[SWS_DM_00644]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Event::EventStatusByte</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct EventStatusByte : public uint8_t {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/event.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Current event status byte, bit-encoded.</td></tr></table>

c(RS\_Diag\_04151)

## 8.5.1.4 diag::Event::DebouncingState type

[SWS_DM_00645]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::DebouncingState</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class DebouncingState : uint8_t {...};</td></tr><tr><td rowspan=5 colspan=1>Values:</td><td rowspan=1 colspan=1>kNeutral= 0x00</td><td rowspan=1 colspan=1>Neutral (corresponds to FDC = 0)</td></tr><tr><td rowspan=1 colspan=1>kTemporarilyDefective= 0x01</td><td rowspan=1 colspan=1>Temporarily Defective (corresponds to 0 &lt; FDC &lt;127)</td></tr><tr><td rowspan=1 colspan=1>kFinallyDefective= 0x02</td><td rowspan=1 colspan=1>finally Defective (corresponds to FDC = 127)</td></tr><tr><td rowspan=1 colspan=1>kTemporarilyHealed= 0x04</td><td rowspan=1 colspan=1>temporarily healed (corresponds to -128 &lt; FDC &lt; 0)</td></tr><tr><td rowspan=1 colspan=1>kFinallyHealed= 0x08</td><td rowspan=1 colspan=1>finally healed (corresponds to FDC = -128)</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Debounce status of event .</td></tr></table>

c(RS\_Diag\_04068, RS\_Diag\_04225, RS\_AP\_00125)

## 8.5.1.5 diag::Event::Event function

[SWS_DM_00647]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::Event(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit Event (const ara::core::InstanceSpecifier &amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticEventInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor fct. for objects of class Event.</td></tr></table>

c(RS\_Diag\_04151, RS\_AP\_00137)

## 8.5.1.6 diag::Event::\~Event function

[SWS_DM_00648]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Event::~Event()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>~Event () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class Event.</td></tr></table>

c(RS\_Diag\_04151, RS\_AP\_00134)

## 8.5.1.7 diag::Event::GetEventStatus function

[SWS_DM_00649]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetEventStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;EventStatusByte&gt; GetEventStatus();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; EventStatusByte &gt;</td><td rowspan=1 colspan=1>the current diagnostic event status</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Returns the current diagnostic event status.</td></tr></table>

c(RS\_Diag\_04151, RS\_AP\_00139)

## 8.5.1.8 diag::Event::SetEventStatusChangedNotifier function

[SWS_DM_00650]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::SetEventStatusChangedNotifier(std::Function&lt; void(ara::diag::EventStatusByte)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetEventStatusChangedNotifier (std::Function&lt;void(ara::diag::EventStatusByte)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>The function to be called if a diagnostic event ischanged.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if a diagnostic event is changed.</td></tr></table>

c(RS\_Diag\_04183, RS\_AP\_00139)

## 8.5.1.9 diag::Event::GetLatchedWIRStatus function

## [SWS_DM_00651]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetLatchedWIRStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;std::bool&gt; GetLatchedWIRStatus ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; std::bool &gt;</td><td rowspan=1 colspan=1>the current warning indicator status</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Returns the current warning indicator status.</td></tr></table>

## c(RS\_Diag\_04204, RS\_AP\_00139)

## 8.5.1.10 diag::Event::SetLatchedWIRStatus function

[SWS_DM_00652]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::SetLatchedWIRStatus(std::bool status)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetLatchedWIRStatus (std::bool status);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>status</td><td rowspan=1 colspan=1>Limp-home status as determined by the AA. &#x27;0&#x27;means limp-home not actice; &#x27;1&#x27; means limp-homeactice;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Set the warning indicator status.</td></tr></table>

## c(RS\_Diag\_04151, RS\_AP\_00139)

## 8.5.1.11 diag::Event::GetDTCNumber function

[SWS_DM_00653]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetDTCNumber(ara::diag::DTCFormatType dtc_format)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;std::uint32_t&gt; GetDTCNumber (ara::diag::DTCFormatType dtc_format);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>dtc_format</td><td rowspan=1 colspan=1>Define DTC format for the return value.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; std::uint32_t &gt;</td><td rowspan=1 colspan=1>DTC number in respective DTCFormatType</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>kNoSuchDTC</td><td rowspan=1 colspan=1>No DTC available.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Returns the DTC-ID related to this event instance.</td></tr></table>

c(RS\_Diag\_04201, RS\_AP\_00139)

## 8.5.1.12 diag::Event::GetDebouncingStatus function

[SWS_DM_00654]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetDebouncingStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ara::diag::DebouncingState&gt; GetDebouncingStatus ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt;ara::diag::DebouncingState &gt;</td><td rowspan=1 colspan=1>Return the current debouncing state of this event.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get the current debouncing status.</td></tr></table>

## c(RS\_Diag\_04068, RS\_Diag\_04225, RS\_AP\_00139)

## 8.5.1.13 diag::Event::GetTestComplete function

## [SWS_DM_00655]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetTestComplete()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;std::bool&gt; GetTestComplete ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; std::bool &gt;</td><td rowspan=1 colspan=1>Return the current test completed-state of thisevent. &quot;true&quot;, if FDC = -128 or FDC = 127; &quot;false&quot; inall other cases.</td></tr></table>

| Header file: | #include "ara/diag/event.h" |
| --- | --- |
| Description: | Get the status if the event has matured to test completed (corresponds to FDC = -128 or FDC = 127). |

c(RS\_Diag\_04151, RS\_AP\_00139)

## 8.5.1.14 diag::Event::GetFaultDetectionCounter function

## [SWS_DM_00656]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Event::GetFaultDetectionCounter()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Event</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;std::sint8_t&gt; GetFaultDetectionCounter ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; std::sint8_t &gt;</td><td rowspan=1 colspan=1>current FaultDetectionCounter value.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/event.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Returns the current value of Fault Detection Counter of this event.</td></tr></table>

c(RS\_Diag\_04068, RS\_AP\_00139)

## 8.5.2 DTCInformation class

This interface is replacing the obsolete DTCInformation, DiagnosticMemory and DiagnosticServer service interfaces.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticDTCInformationInterface.

## [SWS_DM_00657]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DTCInformation {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Class to implement operations on DTC informations per configured DiagnosticMemoryDestination.</td></tr></table>

c(RS\_Diag\_04150, RS\_Diag\_04164, RS\_Diag\_04105)

## 8.5.2.1 diag::DTCInformation::ControlDtcStatusType type

## [SWS_DM_00663]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::ControlDtcStatusType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>一</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class ControlDtcStatusType {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kDTCSettingOn= 0x00</td><td rowspan=1 colspan=1>Updating of diagnostic trouble code status bits isunder normal operating conditions.</td></tr><tr><td rowspan=1 colspan=1>kDTCSettingOff= 0x01</td><td rowspan=1 colspan=1>Updating of diagnostic trouble code status bits isstopped.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Type for ControlDTCStatus status as requested by UDS service 0x85 ControlDTCSetting.</td></tr></table>

c(RS\_Diag\_04159)

## 8.5.2.2 diag::DTCInformation::UdsDtcStatusBitType type

## [SWS_DM_00658]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::UdsDtcStatusBitType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>uint8_t</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class UdsDtcStatusBitType : uint8_t {...};</td></tr><tr><td rowspan=8 colspan=1>Values:</td><td rowspan=1 colspan=1>kTestFailed= 0x01</td><td rowspan=1 colspan=1>bit 0: TestFailed</td></tr><tr><td rowspan=1 colspan=1>kTestFailedThisOperationCycle= 0x02</td><td rowspan=1 colspan=1>bit 1: TestFailedThisOperationCycle</td></tr><tr><td rowspan=1 colspan=1>kPendingDTC= 0x04</td><td rowspan=1 colspan=1>bit 2: PendingDTC</td></tr><tr><td rowspan=1 colspan=1>kConfirmedDTC= 0x08</td><td rowspan=1 colspan=1>bit 3: ConfirmedDTC</td></tr><tr><td rowspan=1 colspan=1>kTestNotCompletedSinceLastClear=0x10</td><td rowspan=1 colspan=1>bit 4: TestNotCompletedSinceLastClear</td></tr><tr><td rowspan=1 colspan=1>kTestFailedSinceLastClear= 0x20</td><td rowspan=1 colspan=1>bit 5: TestFailedSinceLastClear</td></tr><tr><td rowspan=1 colspan=1>kTestNotCompletedThisOperationCycle= 0x40</td><td rowspan=1 colspan=1>bit 6: TestNotCompletedThisOperationCycle</td></tr><tr><td rowspan=1 colspan=1>kWarningIndicatorRequested= 0x80</td><td rowspan=1 colspan=1>bit 7: WarningIndicatorRequested</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>UDS DTC status bits according to ISO 14229-1</td></tr></table>

c(RS\_Diag\_04151, RS\_Diag\_04067)

## 8.5.2.3 diag::DTCInformation::UdsDtcStatusByteType type

[SWS_DM_00659]{DRAFT} d

| Kind: | struct |
| --- | --- |
| Symbol: | ara::diag::DTCInformation::UdsDtcStatusByteType |
| Scope: | class ara::diag::DTCInformation |
| Syntax: | struct UdsDtcStatusByteType {...}; |
| Header file: | #include "ara/diag/dtc_information.h' |
| Description: | Type for UDS DTC status byte. |

c(RS\_Diag\_04151, RS\_Diag\_04067)

## 8.5.2.4 diag::DTCInformation::SnapshotDataIdentiferType type

[SWS_DM_00660]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DTCInformation::SnapshotDataldentiferType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct SnapshotDataIdentiferType {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/dtc_information.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Type for SnapshotDataldentiferType status.</td></tr></table>

c(RS\_Diag\_04205)

## 8.5.2.5 diag::DTCInformation::SnapshotDataRecordType type

[SWS_DM_00661]{DRAFT} d

| Kind: | struct |
| --- | --- |
| Symbol: | ara::diag::DTCInformation::SnapshotDataRecordType |
| Scope: | class ara::diag::DTCInformation |
| Syntax: | struct SnapshotDataRecordType {...}; |
| Header file: | #include "ara/diag/dtc_information.h" |
| Description: | Type for SnapshotDataRecordType status. |

c(RS\_Diag\_04205)

## 8.5.2.6 diag::DTCInformation::SnapshotRecordUpdatedType type

[SWS_DM_00662]{DRAFT} d

| Kind: | struct |
| --- | --- |
| Symbol: | ara::diag::DTCInformation::SnapshotRecordUpdatedType |
| Scope: | class ara::diag::DTCInformation |
| Syntax: | struct SnapshotRecordUpdatedType {...}; |
| Header file: | #include "ara/diag/dtc_information.h" |
| Description: | Type for SnapshotRecordUpdatedType status. |

## c(RS\_Diag\_04205)

## 8.5.2.7 diag::DTCInformation::DTCInformation function

## [SWS_DM_00664]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::DTCInformation(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit DTCInformation (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticDTCInformationInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor for a DTCInformation instance which allows for DTC related operation perDiagnosticMemoryDestination.</td></tr></table>

c(RS\_AP\_00137, RS\_Diag\_04150, RS\_Diag\_04164, RS\_Diag\_04105)

## 8.5.2.8 diag::DTCInformation::\~DTCInformation function

[SWS_DM_00665]{DRAFT} d

| Kind: | function |
| --- | --- |
| Symbol: | ara::diag::DTCInformation::~DTCInformation() |
| Scope: | class ara::diag::DTCInformation |
| Syntax: | ~DTCInformation () noexcept=default; |
| Exception Safety: | noexcept |
| Header file: | #include "ara/diag/dtc_information.h" |
| Description: | Destructor of class DTCInformation. |

c(RS\_AP\_00134)

## 8.5.2.9 diag::DTCInformation::GetCurrentStatus function

## [SWS_DM_00666]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::GetCurrentStatus(std::uint32_t dtc)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;UdsDtcStatusByteType&gt; GetCurrentStatus (std::uint32_t dtc);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>dtc</td><td rowspan=1 colspan=1>DTC indentifier for which the status should beretrieved.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; UdsDtcStatusByteType &gt;</td><td rowspan=1 colspan=1>the current UDS DTC status byte of the given DTCidentifier.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Retrieves the current UDS DTC status byte of the given DTC identifier.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.2.10 diag::DTCInformation::SetDTCStatusChangedNotifier function

## [SWS_DM_00667]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::SetDTCStatusChangedNotifier(std::Function&lt; void(std::uint32_t dtc,ara::diag::UdsDtcStatusByteType udsStatusByteOld, ara::diag::UdsDtcStatusByteType udsStatusByteNew)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetDTCStatusChangedNotifier (std::Function&lt;void(std::uint32_t dtc, ara::diag::UdsDtcStatusByteType udsStatusByteOld, ara::diag::UdsDtcStatusByteType udsStatusByteNew)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>The function to be called if a DTC status haschanged.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if a UDS DTC status is changed.</td></tr></table>

## c(RS\_Diag\_04148, RS\_AP\_00139)

## 8.5.2.11 diag::DTCInformation::SetSnapshotRecordUpdatedNotifier function

## [SWS_DM_00668]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DTCInformation::SetSnapshotRecordUpdatedNotifier(std::Function&lt;void(ara::diag::SnapshotRecordUpdatedType)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>ara::core::Result&lt;void&gt; SetSnapshotRecordUpdatedNotifier(std::Function&lt; void(ara::diag::SnapshotRecordUpdatedType)&gt; notifier);</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>The function to be called if the SnapshotRecord ischanged.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the SnapshotRecord is changed.</td></tr></table>

c(RS\_Diag\_04205, RS\_AP\_00139)

## 8.5.2.12 diag::DTCInformation::GetNumberOfStoredEntries function

[SWS_DM_00669]{DRAFT} d

<table><tr><td>Kind:</td><td colspan="2">function</td></tr><tr><td>Symbol:</td><td colspan="2">ara::diag::DTCInformation::GetNumberOfStoredEntries()</td></tr><tr><td>Scope:</td><td colspan="2">class ara::diag::DTCInformation</td></tr><tr><td>Syntax:</td><td colspan="2">ara::core::Result&lt;std::uint32_t&gt; GetNumberOfStoredEntries ();</td></tr><tr><td>Return value:</td><td>ara::core::Result&lt; std::uint32_t &gt;</td><td>Number of currently stored fault memory entries.</td></tr><tr><td>Header file:</td><td colspan="2">#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td>Description:</td><td colspan="2">Contains the number of currently stored fault memory entries.</td></tr></table>

c(RS\_Diag\_04109, RS\_AP\_00139)

## 8.5.2.13 diag::DTCInformation::SetNumberOfStoredEntriesNotifier function

[SWS_DM_00670]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::SetNumberOfStoredEntriesNotifier(std::Function&lt; void(std::uint32_t)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetNumberOfStoredEntriesNotifier(std::Function&lt; void(std::uint32_t)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>The function to be called if the number of entries forthis diagnostic memory instance has changed.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the number of currently stored fault memory entrieschanged.</td></tr></table>

c(RS\_Diag\_04109, RS\_AP\_00139)

## 8.5.2.14 diag::DTCInformation::Clear function

[SWS_DM_00671]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::Clear(std::uint32_t DTCGroup)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Clear (std::uint32_t DTCGroup);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>DTCGroup</td><td rowspan=1 colspan=1>DTC group to be cleared.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void or errors</td></tr><tr><td rowspan=4 colspan=1>Errors:</td><td rowspan=1 colspan=1>DiagErrorDomain::DiagErrc::kBusy</td><td rowspan=1 colspan=1>Busy processing.</td></tr><tr><td rowspan=1 colspan=1>DiagErrorDomain::DiagErrc::kFailed</td><td rowspan=1 colspan=1>Clear failed.</td></tr><tr><td rowspan=1 colspan=1>DiagErrorDomain::DiagErrc::kMemoryError</td><td rowspan=1 colspan=1>Memory error reported.</td></tr><tr><td rowspan=1 colspan=1>DiagErrorDomain::DiagErrc::kWrongDtc</td><td rowspan=1 colspan=1>Wrong DTC group passed.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Method for Clearing a DTC or a group of DTCs.</td></tr></table>

c(RS\_Diag\_04194, RS\_AP\_00139)

## 8.5.2.15 diag::DTCInformation::GetControlDTCStatus function

## [SWS_DM_00672]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::GetControlDTCStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ControlDtcStatusType&gt; GetControlDTCStatus ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; ControlDtcStatusType &gt;</td><td rowspan=1 colspan=1>The current status of ControlDtcStatus (related toUDS service 0x85) or an UDS NRC value (for annegative response message)</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Contains the current status of the ControlDTCStatus.</td></tr></table>

c(RS\_Diag\_04159, RS\_AP\_00139)

## 8.5.2.16 diag::DTCInformation::SetControlDtcStatusNotifier function

[SWS_DM_00673]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::SetControlDtcStatusNotifier(std::Function&lt; void(ControlDtcStatusType)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetControlDtcStatusNotifier (std::Function&lt;void(ControlDtcStatusType)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>The function to be called if the ControlDTCStatus(related to UDS service 0x85) for this diagnosticmemory instance has changed.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc_information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Registers a notifier function which is called if the control DTC setting is changed.</td></tr></table>

c(RS\_Diag\_04159, RS\_AP\_00139)

## 8.5.2.17 diag::DTCInformation::EnableControlDtc function

[SWS_DM_00674]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DTCInformation::EnableControlDtc()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DTCInformation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; EnableControlDtc ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/dtc information.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Enforce restoring ControlDTCStatus setting to enabled in case the monitor has someconditions or states demands to do so.</td></tr></table>

## c(RS\_Diag\_04159, RS\_AP\_00139)

## 8.5.3 Conversation class

This interface is replacing the obsolete DiagnosticConversation service interface.   
The conversation object can only be retrieved by a given meta\_info object.

## [SWS_DM_00693]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="1" rowspan="1">class</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="1" rowspan="1">ara::diag::Conversation</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="1" rowspan="1">namespace ara::diag</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="1" rowspan="1">class Conversation {...};</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="1" rowspan="1">#include "ara/diag/conversation.h"</td></tr><tr><td>Description:</td><td>Conversation interface.</td></tr><tr><td></td><td></td></tr></table>


## 8.5.3.1 diag::Conversation::ActivityStatusType type

[SWS_DM_00690]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::ActivityStatusType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>一</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class ActivityStatusType {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kActive= 0x00</td><td rowspan=1 colspan=1>Currently active; i.e. request is currently processedor non-default session is active.</td></tr><tr><td rowspan=1 colspan=1>kInactive= 0x01</td><td rowspan=1 colspan=1>Currently not active.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Type for current activity status</td></tr></table>

## 8.5.3.2 diag::Conversation::ConversationIdentifierType type

[SWS_DM_00691]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Conversation::ConversationldentifierType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct ConversationIdentifierType {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Properties allowing an identification of the conversation.</td></tr></table>


## 8.5.3.3 diag::Conversation::GetConversation function

[SWS_DM_00692]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetConversation(ara::diag::Metalnfo meta_info)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>static ara::core::Result&lt;ara::diag::Conversation&amp;&gt; GetConversation(ara::diag::MetaInfo meta_info);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt;ara::diag::Conversation &amp; &gt;</td><td rowspan=1 colspan=1>Conversation object or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get one conversation based on given Metalnfo.</td></tr></table>

## c(RS\_AP\_00139, RS\_Diag\_04170)

## 8.5.3.4 diag::Conversation::GetAllConversations function

## [SWS_DM_00782]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetAllConversations()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>static ara::core::Vector&lt;ara::diag::Conversation&amp;&gt; GetAllConversations( );</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Vector&lt;ara::diag::Conversation &amp; &gt;</td><td rowspan=1 colspan=1>a vector of all possibe Conversation objects</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get all possible conversations</td></tr></table>


## 8.5.3.5 diag::Conversation::GetCurrentActiveConversations function

[SWS_DM_00783]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetCurrentActiveConversations()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>static ara::core::Vector&lt;ara::diag::Conversation&amp;&gt; GetCurrentActiveConversations ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Vector&lt;ara::diag::Conversation &amp; &gt;</td><td rowspan=1 colspan=1>a vector of all currently active (GetActivityStatus() ==kActive) Conversation objects</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get all currently active conversations.</td></tr></table>

## 8.5.3.6 diag::Conversation::GetActivityStatus function

[SWS_DM_00694]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetActivityStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ara::diag::ActivityStatusType&gt; GetActivityStatus ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; ara::diag::ActivityStatusType &gt;</td><td rowspan=1 colspan=1>the activity status of the conversation</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the status of an active conversation.</td></tr></table>

c(RS\_AP\_00139)

## 8.5.3.7 diag::Conversation::SetActivityNotifier function

[SWS_DM_00695]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::SetActivityNotifier(std::function&lt; void(ara::diag::ActivityStatusType)&gt;notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetActivityNotifier (std::function&lt;void(ara::diag::ActivityStatusType)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>notifier function to be called</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void when the registering went fine or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the activity is changed.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.3.8 diag::Conversation::GetConversationIdentifier function

## [SWS_DM_00700]{DRAFT} d

<table><tr><td>Kind:</td><td colspan="2">function</td></tr><tr><td>Symbol:</td><td colspan="2">ara::diag::Conversation::GetConversationIdentifier()</td></tr><tr><td>Scope:</td><td colspan="2">class ara::diag::Conversation</td></tr><tr><td>Syntax:</td><td colspan="2">ara::core::Result&lt;ara::diag::ConversationIdentifierType&gt; Get ConversationIdentifier ();</td></tr><tr><td>Return value:</td><td>ara::core::Result&lt; ara::diag::ConversationIdentifierType &gt;</td><td>the conversation information</td></tr></table>

| Header file: | #include "ara/diag/conversation.h" |
| --- | --- |
| Description: | Getter for the current identification properties of the active conversation. |

c(RS\_AP\_00139)

## 8.5.3.9 diag::Conversation::GetDiagnosticSession function

[SWS_DM_00696]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetDiagnosticSession()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ara::core::StringView&gt; GetDiagnosticSession ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; ara::core::StringView &gt;</td><td rowspan=1 colspan=1>the current session</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the current active diagnostic session of an active conversation.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.3.10 diag::Conversation::SetDiagnosticSessionNotifier function

## [SWS_DM_00697]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::SetDiagnosticSessionNotifier(std::Function&lt;void(ara::core::StringView)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetDiagnosticSessionNotifier (std::Function&lt;void(ara::core::StringView)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>notifier function to be called</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void when the registering went fine or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the Session is changed.</td></tr></table>

c(RS\_AP\_00139)

## 8.5.3.11 diag::Conversation::GetDiagnosticSecurityLevel function

[SWS_DM_00698]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::GetDiagnosticSecurityLevel()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ara::core::StringView&gt; GetDiagnosticSecurityLevel() ;</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; ara::core::StringView &gt;</td><td rowspan=1 colspan=1>the current SecurityLevel</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the current active diagnostic SecurityLevel of an active conversation.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.3.12 diag::Conversation::SetSecurityLevelNotifier function

[SWS_DM_00699]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::SetSecurityLevelNotifier(std::Function&lt; void(ara::core::StringView)&gt;notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetSecurityLevelNotifier (std::Function&lt;void(ara::core::StringView)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>notifier function to be called</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void when the registering went fine or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the SecurityLevel is changed.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.3.13 diag::Conversation::ResetToDefaultSession function

## [SWS_DM_00701]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::ResetToDefaultSession()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; ResetToDefaultSession ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void on success or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Method to reset the current session to default session.</td></tr></table>



## 8.5.3.14 diag::Conversation::Cancel function

[SWS_DM_00702]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Conversation::Cancel()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Conversation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Cancel ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>void on success or error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/conversation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Method to cancel the current diagnostic conversation. This includes current request executionand reset of any conversation-specific states i.e. Session or Security.</td></tr></table>

## 8.5.4 Condition class

This interface is replacing the obsolete EnableCondition and ClearCondition service interfaces.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticConditionInterface.

[SWS_DM_00711]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class Condition {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/condition.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticConditionInterface.</td></tr></table>

## 8.5.4.1 diag::Condition::ConditionType type

## [SWS_DM_00710]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Condition::ConditionType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>enum class ConditionType {...};</td></tr></table>

## 8.5.4.2 diag::Condition::Condition function

[SWS_DM_00712]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Condition::Condition(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit Condition (const ara::core::InstanceSpecifier &amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticConditionInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/condition.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of Condition Class.</td></tr></table>

c(RS\_AP\_00137)

## 8.5.4.3 diag::Condition::\~Condition function

[SWS_DM_00713]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Condition::~Condition()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>~Condition () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/condition.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class Condition.</td></tr></table>

c(RS\_AP\_00134)

## 8.5.4.4 diag::Condition::GetCurrentStatus function

[SWS_DM_00714]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Condition::GetCondition()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;ConditionType&gt; GetCondition ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; ConditionType &gt;</td><td rowspan=1 colspan=1>the current condition</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/condition.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get current condition.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.4.5 diag::Condition::SetCondition function

[SWS_DM_00715]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Condition::SetCondition(ara::diag::ConditionType condition)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Condition</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetCondition (ara::diag::ConditionTypecondition);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>condition</td><td rowspan=1 colspan=1>current condition</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/condition.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Set condition.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.5 OperationCycle class

This interface is replacing the obsolete OperationCycle service interface.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticOperationCycleInterface.

[SWS_DM_00751]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class OperationCycle {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticOperationCyclelnterface provides functionality for handling of operation cycles.</td></tr></table>

c(RS\_Diag\_04178)

## 8.5.5.1 diag::OperationCycle::OperationCycleType type

[SWS_DM_00750]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::OperationCycle::OperationCycleType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2></td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class OperationCycleType {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kOperationCycleStart= 0x00</td><td rowspan=1 colspan=1>Start/restart the operation cycle</td></tr><tr><td rowspan=1 colspan=1>kOperationCycleEnd= 0x01</td><td rowspan=1 colspan=1>End the operation cycle.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the state information of operation cycles.</td></tr></table>

## c(RS\_Diag\_04178)

## 8.5.5.2 diag::OperationCycle::OperationCycle function

## [SWS_DM_00752]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::OperationCycle::OperationCycle(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit OperationCycle (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticOperationCyclelnterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor for DiagnosticOperationCyclelnterface.</td></tr></table>

## c(RS\_AP\_00137, RS\_Diag\_04178)

## 8.5.5.3 diag::OperationCycle::\~OperationCycle function

## [SWS_DM_00753]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="1" rowspan="1">function</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="1" rowspan="1">ara::diag::OperationCycle::~OperationCycle()</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="1" rowspan="1">class ara::diag::OperationCycle</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="1" rowspan="1">~OperationCycle () noexcept=default;</td></tr><tr><td colspan="1" rowspan="1">Exception Safety:</td><td colspan="1" rowspan="1">noexcept</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="1" rowspan="1">#include "ara/diag/operation_cycle.h"</td></tr><tr><td>Description:</td><td>Destructor of DiagnosticOperationCyclelnterface.</td></tr></table>

c(RS\_AP\_00134, RS\_Diag\_04178)

## 8.5.5.4 diag::OperationCycle::GetOperationCycle function

[SWS_DM_00754]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::OperationCycle::GetOperationCycle()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;OperationCycleType&gt; GetOperationCycle ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; OperationCycleType&gt;</td><td rowspan=1 colspan=1>the current OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get current OperationCycle.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04178)

## 8.5.5.5 diag::OperationCycle::SetNotifier function

[SWS_DM_00755]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::OperationCycle::SetNotifier(std::Function&lt; void(OperationCycleType)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetNotifier (std::Function&lt; void(OperationCycleType)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Registering a notifier function which is called if the operation cycle is changed.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04178, RS\_Diag\_04186)

## 8.5.5.6 diag::OperationCycle::SetOperationCycle function

[SWS_DM_00756]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::OperationCycle::SetOperationCycle(ara::diag::OperationCycleType operation_cycle)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetOperationCycle (ara::diag::OperationCycleType operation_cycle);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>operation_cycle</td><td rowspan=1 colspan=1>current OperationCycle</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/operation_cycle.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Set OperationCycle.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04178, RS\_Diag\_04182)

## 8.5.6 Indicator class

This interface is replacing the obsolete Indicator service interface.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticIndicatorInterface.

## [SWS_DM_00741]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class Indicator {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticlndicatorInterface provides functionality for handling indicators.</td></tr></table>

## c(RS\_Diag\_04204)

## 8.5.6.1 diag::Indicator::IndicatorType type

## [SWS_DM_00740]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Indicator::IndicatorType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2></td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class IndicatorType {...};</td></tr><tr><td rowspan=3 colspan=1>Values:</td><td rowspan=1 colspan=1>kOff= 0x00</td><td rowspan=1 colspan=1>Indicator off mode {default}.</td></tr><tr><td rowspan=1 colspan=1>kContinouse= 0x01</td><td rowspan=1 colspan=1>Indicator continuously on mode</td></tr><tr><td rowspan=1 colspan=1>kBlinking= 0x02</td><td rowspan=1 colspan=1>Indicator blinking mode.</td></tr></table>

<table><tr><td rowspan=5 colspan=1></td><td rowspan=1 colspan=1>kBlinkingAndContinouse= 0x03</td><td rowspan=1 colspan=1>Indicator blinking or continuously on mode.</td></tr><tr><td rowspan=1 colspan=1>kSlowFlash= 0x04</td><td rowspan=1 colspan=1>Indicator slow flashing mode.</td></tr><tr><td rowspan=1 colspan=1>kFastFlash= 0x05</td><td rowspan=1 colspan=1>Indicator fast flashing mode.</td></tr><tr><td rowspan=1 colspan=1>kOnDemand= 0x06</td><td rowspan=1 colspan=1>Indicator on-demand mode.</td></tr><tr><td rowspan=1 colspan=1>kShort= 0x07</td><td rowspan=1 colspan=1>Indicator short mode.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the state of an indicator.</td></tr></table>

c(RS\_Diag\_04204)

## 8.5.6.2 diag::Indicator::Indicator function

[SWS_DM_00742]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Indicator::Indicator(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit Indicator (const ara::core::InstanceSpecifier &amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticIndicatorInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor for DiagnosticIndicatorlnterface</td></tr></table>

c(RS\_AP\_00137, RS\_Diag\_04204)

## 8.5.6.3 diag::Indicator::\~Indicator function

[SWS_DM_00743]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::Indicator::~Indicator()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>~Indicator () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of DiagnosticIndicatorlnterface.</td></tr></table>

c(RS\_AP\_00134, RS\_Diag\_04204)

## 8.5.6.4 diag::Indicator::GetIndicator function

[SWS_DM_00744]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Indicator::GetIndicator()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;IndicatorType&gt; GetIndicator ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; IndicatorType &gt;</td><td rowspan=1 colspan=1>the current Indicator</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get current Indicator.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04204)

## 8.5.6.5 diag::Indicator::SetNotifier function

## [SWS_DM_00745]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::Indicator::SetNotifier(std::Function&lt; void(IndicatorType)&gt; notifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::Indicator</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; SetNotifier (std::Function&lt; void(IndicatorType)&gt; notifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>notifier</td><td rowspan=1 colspan=1>notifier function</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/indicator.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Register a notifier function which is called if the indicator is updated.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04204)

## 8.5.7 ServiceValidation class

This interface is replacing the obsolete ServiceManufacturerValidation and ServiceSupplierValidation service interface.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticService-ValidationInterface.

[SWS_DM_00771]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class ServiceValidation {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticServiceValidationInterface.</td></tr></table>

c(RS\_Diag\_04199)

## 8.5.7.1 diag::ServiceValidation::ConfirmationStatusType

## [SWS_DM_00770]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::ServiceValidation::ConfirmationStatusType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2></td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class ConfirmationStatusType {...};</td></tr><tr><td rowspan=8 colspan=1>Values:</td><td rowspan=1 colspan=1>kResPosOk= 0x00</td><td rowspan=1 colspan=1>Positive response has been sent out successfully.</td></tr><tr><td rowspan=1 colspan=1>kResPosNotOk= 0x01</td><td rowspan=1 colspan=1>Positive response has not been sent outsuccessfully.</td></tr><tr><td rowspan=1 colspan=1>kResNegOk= 0x02</td><td rowspan=1 colspan=1>Negative response has been sent out successfull.</td></tr><tr><td rowspan=1 colspan=1>kResNegNotOk= 0x03</td><td rowspan=1 colspan=1>Negative response has not been sent outsuccessfully.</td></tr><tr><td rowspan=1 colspan=1>kResPosSuppressed= 0x04</td><td rowspan=1 colspan=1>Positive answer suppressed.</td></tr><tr><td rowspan=1 colspan=1>kResNegSuppressed= 0x05</td><td rowspan=1 colspan=1>Negative answer suppressed.</td></tr><tr><td rowspan=1 colspan=1>kCanceled= 0x06</td><td rowspan=1 colspan=1>Processing is canceled.</td></tr><tr><td rowspan=1 colspan=1>kNoProcessingNoResponse= 0x07</td><td rowspan=1 colspan=1>Processing rejected in Validation.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the status of the service processing.</td></tr></table>

## c(RS\_Diag\_04199)

## 8.5.7.2 diag::ServiceValidation::ServiceValidation function

## [SWS_DM_00772]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::ServiceValidation::ServiceValidation(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit ServiceValidation (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticServiceValidationInterface</td></tr></table>


<table><tr><td rowspan="2">Header file:</td><td>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td></td></tr><tr><td>Description:</td><td>Constructor of ServiceValidation.</td></tr></table>

c(RS\_AP\_00137, RS\_Diag\_04199)

## 8.5.7.3 diag::ServiceValidation::\~ServiceValidation function

[SWS_DM_00773]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::ServiceValidation::~ServiceValidation()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~ServiceValidation () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of ServiceValidation.</td></tr></table>

c(RS\_AP\_00134, RS\_Diag\_04199)

## 8.5.7.4 diag::ServiceValidation::Validate function

[SWS_DM_00774]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::ServiceValidation::Validate(ara::core::Span&lt; std::uint8_t &gt; request_data,ara::diag::Metalnfo meta_info)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; Validate (ara::core::Span&lt; std::uint8_t &gt; request_data, ara::diag::MetaInfo meta_info);</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>request_data</td><td rowspan=1 colspan=1>Diagnostic request data (including SID).</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>Metalnfo of the request.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>Returns nothing or an error</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error set includes all NegativeResponseCodesdefined in UDS.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for any request messsage.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170, RS\_Diag\_04199)

## 8.5.7.5 diag::ServiceValidation::Confirmation function

[SWS_DM_00775]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::ServiceValidation::Confirmation(ara::diag::ConfirmationStatusType status,ara::diag::Metalnfo meta_info)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; Confirmation (ara::diag::ConfirmationStatusType status, ara::diag::MetaInfo meta_info);</td></tr><tr><td rowspan=2 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>status</td><td rowspan=1 colspan=1>status/outcome of the service processing</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>Metalnfo of the request.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>Returns nothing or an error</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This method is called, when a diagnostic request has been finished, to notify about theoutcome.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170, RS\_Diag\_04199)

## 8.5.7.6 diag::ServiceValidation::Offer function

## [SWS_DM_00776]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::ServiceValidation::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>Returns nothing or an error</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

## c(RS\_AP\_00139, RS\_Diag\_04199)

## 8.5.7.7 diag::ServiceValidation::StopOffer function

[SWS_DM_00777]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::ServiceValidation::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::ServiceValidation</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/service_validation.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>

## c(RS\_Diag\_04199)

## 8.5.8 SecurityAccess class

This interface is replacing the obsolete SecurityAccess service interface. The InstanceSpecifier is only compatible with PortInterface of DiagnosticSecurityLevelInterface.

## [SWS_DM_00761]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class SecurityAccess {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticSecurityAccessInterface.</td></tr></table>

## c(RS\_Diag\_04005)

## 8.5.8.1 diag::SecurityAccess::KeyCompareResultType type

[SWS_DM_00760]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::SecurityAccess::KeyCompareResultType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2>一</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class KeyCompareResultType {...};</td></tr><tr><td rowspan=2 colspan=1>Values:</td><td rowspan=1 colspan=1>kKeyValid= 0x00</td><td rowspan=1 colspan=1>Key is valid.</td></tr><tr><td rowspan=1 colspan=1>kKeyInvalid= 0x01</td><td rowspan=1 colspan=1>Key is invalid.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Represents the status of the key compare.</td></tr></table>

## c(RS\_Diag\_04005)

## 8.5.8.2 diag::SecurityAccess::SecurityAccess function

## [SWS_DM_00762]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::SecurityAccess::SecurityAccess(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>explicit SecurityAccess (const ara::core::InstanceSpecifier&amp;specifier);</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticSecurityAccessInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of SecurityAccess.</td></tr></table>

c(RS\_AP\_00137, RS\_Diag\_04005)

## 8.5.8.3 diag::SecurityAccess::\~SecurityAccess function

[SWS_DM_00763]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::SecurityAccess::~SecurityAccess()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~SecurityAccess () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of SecurityAccess.</td></tr></table>

c(RS\_AP\_00134, RS\_Diag\_04005)

## 8.5.8.4 diag::SecurityAccess::GetSeed function

[SWS_DM_00764]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::SecurityAccess::GetSeed(ara::core::Span&lt; std::uint8t &gt; securityaccessdatarecord, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;ara::core::Span&lt;std::uint8_t&gt; &gt; GetSeed(ara::core::Span&lt; std::uint8_t &gt; security_access_data_record,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>security_access_data_record</td><td rowspan=1 colspan=1>Security Access payload</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>Metalnfo of the request.</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>Set if the current conversation is canceled.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; ara::core::Span&lt;std::uint8_t &gt; &gt;</td><td rowspan=1 colspan=1>provided seed</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error set includes all NegativeResponseCodesdefined in UDS.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for any request messsage.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04005, RS\_Diag\_04170)

## 8.5.8.5 diag::SecurityAccess::CompareKey function

[SWS_DM_00765]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::SecurityAccess::CompareKey(ara::core::Span&lt; std::uint8_t &gt; key, ara::diag::Metalnfometa_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;ara::diag::KeyCompareResultType&gt; CompareKey(ara::core::Span&lt; std::uint8_t &gt; key, ara::diag::MetaInfo meta_info,ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>key</td><td rowspan=1 colspan=1>The key to be validated</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>Metalnfo of the request.</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>Set if the current conversation is canceled.</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; ara::diag::KeyCompareResultType &gt;</td><td rowspan=1 colspan=1>Result of the key validation.</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error set includes all NegativeResponseCodesdefined in UDS.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This method is called, when a diagnostic request has been finished, to notify about theoutcome.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04005, RS\_Diag\_04170)

## 8.5.8.6 diag::SecurityAccess::Offer function

[SWS_DM_00766]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::SecurityAccess::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139, RS\_Diag\_04005)

## 8.5.8.7 diag::SecurityAccess::StopOffer function

[SWS_DM_00767]{DRAFT} d


<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::SecurityAccess::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/security_access.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>

c(RS\_Diag\_04005)

## 8.5.9 CommunicationControl class

This interface is replacing the obsolete CommunicationControl service interface. The InstanceSpecifier is only compatible with PortInterface of DiagnosticCommunicationControlInterface.

## [SWS_DM_00804]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class CommunicationControl {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>CommunicationControl interface.</td></tr></table>

## 8.5.9.1 diag::CommunicationControl::ComCtrlRequestParamsType type

[SWS_DM_00805]{DRAFT} d
<table><tr><td>Kind:</td><td>struct</td></tr><tr><td>Symbol:</td><td>ara::diag::CommunicationControl::ComCtrlRequestParamsType</td></tr><tr><td>Scope:</td><td>class ara::diag::CommunicationControl</td></tr><tr><td rowspan="2">Syntax: Header file:</td><td>struct ComCtrlRequestParamsType {...};</td></tr><tr><td>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td>Description:</td><td>ComCtrlRequestParamsType is a structure, which holds all parameters of an UDS 0x28 communicationControl request.</td></tr></table>

## c() CommunicationControl

## 8.5.9.2 diag::CommunicationControl::CommunicationControl function

[SWS_DM_00806]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::CommunicationControl::CommunicationControl(const ara::core::InstanceSpecifier&amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit CommunicationControl (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticCommunicationControllnterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Class for an CommunicationControl.</td></tr></table>

## c(RS\_AP\_00137)

## 8.5.9.3 diag::CommunicationControl::\~CommunicationControl function

[SWS_DM_00807]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CommunicationControl::~CommunicationControl()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~CommunicationControl () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class CommunicationControl.</td></tr></table>

## c(RS\_AP\_00134)

## 8.5.9.4 diag::CommunicationControl::CommCtrlRequest function

## [SWS_DM_00808]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CommunicationControl::CommCtrlRequest(ara::diag::ComCtrlRequestParamsTypecontrolType, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ara::core::Future&lt;void&gt; CommCtrlRequest (ara::diag::ComCtrlRequestParamsType controlType, ara::diag::MetaInfo meta_info,ara::diag::CancellationHandler cancellation_handler)=0;</td></tr></table>

<table><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>controlType</td><td rowspan=1 colspan=1>All UDS request parameters packed into a structuresince it holds optional elements</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>Any applicable NegativeResponseValue</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for CommunicationControl (x028) with any subfunction as subfunction value is part ofargument list. Typically provider of this interface is considered as part of the state management.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.9.5 diag::CommunicationControl::Offer function

## [SWS_DM_00809]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::CommunicationControl::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

## c(RS\_AP\_00139)

## 8.5.9.6 diag::CommunicationControl::StopOffer function

## [SWS_DM_00810]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::CommunicationControl::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/communication_control.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>


## 8.5.10 DownloadService class

This interface is newly introduced.   
The InstanceSpecifier is only compatible with PortInterface of DiagnosticDownloadInterface.

[SWS_DM_00784]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DownloadService {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/download.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Download service interface.</td></tr></table>

## 8.5.10.1 diag::DownloadService::OperationOutput type

[SWS_DM_00785]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DownloadService::OperationOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct OperationOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data of positive respone message.</td></tr></table>

## 8.5.10.2 diag::DownloadService::DownloadServicefunction

## [SWS_DM_00787]{DRAFT} d

<table><tr><td colspan="1" rowspan="1">Kind:</td><td colspan="2" rowspan="1">function</td></tr><tr><td colspan="1" rowspan="1">Symbol:</td><td colspan="2" rowspan="1">ara::diag::DownloadService::DownloadService(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td colspan="1" rowspan="1">Scope:</td><td colspan="2" rowspan="1">class ara::diag::DownloadService</td></tr><tr><td colspan="1" rowspan="1">Syntax:</td><td colspan="2" rowspan="1">explicit DownloadService (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td colspan="1" rowspan="1">Parameters (in):</td><td colspan="1" rowspan="1">specifier</td><td colspan="1" rowspan="1">InstanceSpecifier to an PortPrototype of anDownloadServicelnterface</td></tr><tr><td colspan="1" rowspan="1">Header file:</td><td colspan="2" rowspan="1">#include "ara/diag/download.h"</td></tr><tr><td>Description:</td><td colspan="2">Class for an DownloadService.</td></tr></table>

c(RS\_AP\_00137)

## 8.5.10.3 diag::DownloadService::\~DownloadServicefunction

[SWS_DM_00788]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DownloadService::~DownloadService()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~DownloadService () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class DownloadService.</td></tr></table>

c(RS\_AP\_00134)

## 8.5.10.4 diag::DownloadService::RequestDownload function

[SWS_DM_00789]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DownloadService::RequestDownload(std::uint8t dataFormatIdentifier, std::uint8taddressAndLengthFormatIdentifier, ara::core::Span&lt; std::uint8_t &gt; memoryAddressAndSize,ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; RequestDownload (std::uint8_t dataFormatIdentifier, std::uint8_t addressAndLengthFormatIdentifier,ara::core::Span&lt; std::uint8_t &gt; memoryAddressAndSize, ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler) =0;</td></tr><tr><td rowspan=5 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>dataFormatIdentifier</td><td rowspan=1 colspan=1>UDS dataFormat Identifier</td></tr><tr><td rowspan=1 colspan=1>addressAndLengthFormatIdentifier</td><td rowspan=1 colspan=1>UDS addressAndLengthFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>memoryAddressAndSize</td><td rowspan=1 colspan=1>memoryAddress and memorySize part of therequest</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>a Future, which either gets readied to void (for apositive response message) or readied with ErrorCode from DiagUdsNrcErrc (for an negativeresponse message)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RequestDownload.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.10.5 diag::DownloadService::DownloadData function

[SWS_DM_00790]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DownloadService::DownloadData(ara::core::Span&lt; std::uint8t &gt; transferRequestParameterRecord, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; DownloadData(ara::core::Span&lt; std::uint8_t &gt; transferRequestParameterRecord,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>transferRequestParameterRecord</td><td rowspan=1 colspan=1>data to be transferred (copied/downloaded to theECU/server).</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Future, which either gets readied to OperationOutput (transferResponseParameterRecord for apositive response message) or readied with ErrorCode from DiagUdsNrcErrc (for an negativeresponse message). Data in OperationOutput.response_data will be placed after blockSequenceCounter as transferResponseParameterRecord in the positive response.</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for TransferData following a previous RequestDownload.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.10.6 diag::DownloadService::RequestDownloadExit function

[SWS_DM_00791]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DownloadService::RequestDownloadExit(ara::core::Span&lt; std::uint8_t &gt; transferRequestParameterRecord, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandlercancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; RequestDownloadExit(ara::core::Span&lt; std::uint8_t &gt; transferRequestParameterRecord,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>transferRequestParameterRecord</td><td rowspan=1 colspan=1>This parameter record contains parameter(s), whichare required by the server to support the transfer ofdata. Format and length of this parameter(s) arevehicle manufacturer specific.</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Future, which either gets readied to OperationOutput (transferResponseParameterRecord for apositive response message) or readied with ErrorCode from DiagUdsNrcErrc (for an negativeresponse message) Data in OperationOutput.response_data will be placed after SID astransferResponseParameterRecord in the positiveresponse.</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RequestTransferExit.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.10.7 diag::DownloadService::Offer function

## [SWS_DM_00792]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DownloadService::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DownloadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/download.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139)

## 8.5.10.8 diag::DownloadService::StopOffer function

## [SWS_DM_00793]{DRAFT} d


## 8.5.11 UploadService class

This interface is newly inroduced.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticUpload-Interface.

[SWS_DM_00794]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class UploadService {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/upload.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Upload service interface.</td></tr></table>

## 8.5.11.1 diag::UploadService::OperationOutput type

[SWS_DM_00795]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>struct</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::UploadService::OperationOutput</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>struct OperationOutput {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Response data of positive respone message.</td></tr></table>

## 8.5.11.2 diag::UploadService::UploadServicefunction

[SWS_DM_00797]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::UploadService::UploadService(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit UploadService (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDownloadServicelnterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Class for an UploadService</td></tr></table>

## c(RS\_AP\_00137)

## 8.5.11.3 diag::UploadService::\~UploadServicefunction

## [SWS_DM_00798]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::UploadService::~UploadService()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~UploadService () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of class UploadService.</td></tr></table>

## c(RS\_AP\_00134)

## 8.5.11.4 diag::UploadService::RequestUpload function

## [SWS_DM_00799]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::UploadService::RequestUpload(std::uint8 t dataFormatIdentifier, std::uint8t addressAndLengthFormatIdentifier, ara::core::Span&lt; std::uint8 t &gt; memoryAddressAndSize,ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;void&gt; RequestUpload (std::uint8 t dataFormatIdentifier, std::uint8_t addressAndLengthFormatIdentifier,ara::core::Span&lt; std::uint8_t &gt; memoryAddressAndSize, ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>dataFormatIdentifier</td><td rowspan=1 colspan=1>UDS dataFormat Identifier</td></tr><tr><td rowspan=1 colspan=1>addressAndLengthFormatIdentifier</td><td rowspan=1 colspan=1>UDS addressAndLengthFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>memoryAddressAndSize</td><td rowspan=1 colspan=1>memoryAddress and memorySize part of therequest</td></tr></table>

<table><tr><td rowspan=2 colspan=1></td><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; void &gt;</td><td rowspan=1 colspan=1>a Result with either void (for a positive responsemessage) or an UDS NRC value (for an negativeresponse message)</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RequestDownload.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.11.5 diag::UploadService::UploadData function

[SWS_DM_00800]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::UploadService::UploadData(std_size_t numBytesToReturn, ara::diag::Metalnfometa_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; UploadData (std_size_t numBytesToReturn, ara::diag::MetaInfo meta_info, ara::diag::CancellationHandler cancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>numBytesToReturn</td><td rowspan=1 colspan=1>number of bytes DM accepts (due to its internalbuffer) for this chunk.</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Future, which either gets readied to OperationOutput (transferResponseParameterRecord for apositive response message) or readied with ErrorCode from DiagUdsNrcErrc (for an negativeresponse message). Data in OperationOutput.response_data will be placed after blockSequenceCounter as transferResponseParameterRecord in the positive response.</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for TransferData following a previous RequestUpload.</td></tr></table>

c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.11.6 diag::UploadService::RequestUploadExit function

[SWS_DM_00801]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::UploadService::RequestUploadExit(ara::core::Span&lt; std::uint8_t &gt; transferRequestParameterRecord, ara::diag::Metalnfo meta_info, ara::diag::CancellationHandler cancellation_handler)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;OperationOutput&gt; RequestUploadExit(ara::core::Span&lt; std::uint8_t &gt; transferRequestParameterRecord,ara::diag::MetaInfo meta_info, ara::diag::CancellationHandlercancellation_handler)=0;</td></tr><tr><td rowspan=3 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>transferRequestParameterRecord</td><td rowspan=1 colspan=1>This parameter record contains parameter(s), whichare required by the server to support the transfer ofdata. Format and length of this parameter(s) arevehicle manufacturer specific.</td></tr><tr><td rowspan=1 colspan=1>meta_info</td><td rowspan=1 colspan=1>contains additional meta information</td></tr><tr><td rowspan=1 colspan=1>cancellation_handler</td><td rowspan=1 colspan=1>informs if the current conversation is canceled</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; OperationOutput &gt;</td><td rowspan=1 colspan=1>a Future, which either gets readied to OperationOutput (transferResponseParameterRecord for apositive response message) or readied with ErrorCode from DiagUdsNrcErrc (for an negativeresponse message) Data in OperationOutput.response_data will be placed after SID astransferResponseParameterRecord in the positiveresponse.</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>Any</td><td rowspan=1 colspan=1>applicable NegativeResponseValue according toDiagUdsNrcErrc</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called for RequestTransferExit.</td></tr></table>

## c(RS\_AP\_00138, RS\_Diag\_04170)

## 8.5.11.7 diag::UploadService::Offer function

[SWS_DM_00802]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::UploadService::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::UploadService</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/upload.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139)

## 8.5.11.8 diag::UploadService::StopOffer function

## [SWS_DM_00803]{DRAFT} d

## 8.5.12 DoIPGroupIdentification class

This interface is replacing the obsolete DoIPGroupIdentification service interface.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticDoIP-GroupIdentificationInterface.

## [SWS_DM_00720]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DoIPGroupIdentification {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_group_identification.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DolPGroupldentificationInterface.</td></tr></table>

## c(SRS\_Eth\_00026)

## 8.5.12.1 diag::DoIPGroupIdentification::DoIPGroupIdentificationType type

[SWS_DM_00721]{DRAFT} d
| Kind: | struct |
| --- | --- |
| Symbol: | ara::diag::DolPGroupldentification::GidStatus |
| Scope: | class ara::diag::DolPGroupldentification |
| Syntax: | struct GidStatus {...}; |
| Header file: | #include "ara/diag/doip_group_identification.h" |
| Description: | Response data of positive respone message. |

c(SRS\_Eth\_00026)

## 8.5.12.2 diag::DoIPGroupIdentification::DoIPGroupIdentification function

[SWS_DM_00722]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPGroupldentification::DolPGroupldentification(const ara::core::InstanceSpecifier&amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit DoIPGroupIdentification (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticDolPGroupldentificationInterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_group_identification.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of DolPGroupldentification.</td></tr></table>

c(RS\_AP\_00137, SRS\_Eth\_00026)

## 8.5.12.3 diag::DoIPGroupIdentification::\~DoIPGroupIdentification function

[SWS_DM_00723]{DRAFT} d
| Kind: | function |
| --- | --- |
| Symbol: | ara::diag::DolPGroupldentification::~DolPGroupldentification() |
| Scope: | class ara::diag::DolPGroupldentification |
| Syntax: | virtual ~DoIPGroupIdentification () noexcept=default; |
| Exception Safety: | noexcept |
| Header file: | #include "ara/diag/doip_group_identification.h" |
| Description: | Destructor of DolPGroupldentification. |

c(RS\_AP\_00134, SRS\_Eth\_00026)

## 8.5.12.4 diag::DoIPGroupIdentification::GetGidStatus function

[SWS_DM_00724]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPGroupldentification::GetGidStatus()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;ara::diag::GidStatus&gt; GetGidStatus ()=0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>void</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; ara::diag::GidStatus&gt;</td><td rowspan=1 colspan=1>group identification and state</td></tr></table>

| Header file: | #include "ara/diag/doip_group_identification.h" |
| --- | --- |
| Description: | Called to get the current GID state for the DolP protocol. |

c(RS\_AP\_00138, SRS\_Eth\_00026)

## 8.5.12.5 diag::DoIPGroupIdentification::Offer function

[SWS_DM_00725]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPGroupldentification::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_group_identification.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to forward request messages to this handler.</td></tr></table>

c(RS\_AP\_00139, SRS\_Eth\_00026)

## 8.5.12.6 diag::DoIPGroupIdentification::StopOffer function

[SWS_DM_00726]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPGroupldentification::StopOffer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DolPGroupldentification</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>void StopOffer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_group_identification.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>

c(SRS\_Eth\_00026)

## 8.5.13 DoIPPowerMode class

This interface is replacing the obsolete DoIPPowerModeInformation service interface.

The InstanceSpecifier is only compatible with PortInterface of DiagnosticDoIPPowerModeInterface.

[SWS_DM_00731]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DoIPPowerMode {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticDolPPowerModeInterface.</td></tr></table>

c(SRS\_Eth\_00080)

## 8.5.13.1 diag::DoIPPowerMode::PowerModeType type

## [SWS_DM_00730]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>enumeration</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPPowerMode::PowerModeType</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Underlying type:</td><td rowspan=1 colspan=2></td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>enum class PowerModeType {...};</td></tr><tr><td rowspan=3 colspan=1>Values:</td><td rowspan=1 colspan=1>kNotReady= 0x00</td><td rowspan=1 colspan=1>not all ECUs accessible via DolP can communicate</td></tr><tr><td rowspan=1 colspan=1>kReady= 0x01</td><td rowspan=1 colspan=1>all ECUs accessible via DolP can communicate</td></tr><tr><td rowspan=1 colspan=1>kNotSupported= 0x02</td><td rowspan=1 colspan=1>the Diagnostic Information Power Mode InformationRequest message is not supported</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>PowerMode as defined in ISO13400-2.</td></tr></table>

## c(SRS\_Eth\_00080)

## 8.5.13.2 diag::DoIPPowerMode::DoIPPowerMode function

## [SWS_DM_00732]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPPowerMode::DolPPowerMode(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit DoIPPowerMode (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticDolPPowerModelnterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of DolPPowerMode.</td></tr></table>

## c(RS\_AP\_00137, SRS\_Eth\_00080)

## 8.5.13.3 diag::DoIPPowerMode::\~DoIPPowerMode function

[SWS_DM_00733]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPPowerMode::~DolPPowerMode()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~DoIPPowerMode () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of DolPPowerMode.</td></tr></table>

c(RS\_AP\_00134, SRS\_Eth\_00080)

## 8.5.13.4 diag::DoIPPowerMode::GetDoIPPowerMode function

[SWS_DM_00734]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPPowerMode::GetDolPPowerMode()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;ara::diag::PowerModeType&gt; GetDoIPPowerMode() =0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>void</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; ara::diag::PowerModeType &gt;</td><td rowspan=1 colspan=1>current diagnostic power mode</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called to get the current Power Mode for the DolP protocol.</td></tr></table>

c(RS\_AP\_00138, SRS\_Eth\_00080)

## 8.5.13.5 diag::DoIPPowerMode::Offer function

[SWS_DM_00735]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPPowerMode::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr></table>

| Header file: | #include "ara/diag/doip_power_mode.h" |
| --- | --- |
| Description: | This Offer will enable the DM to forward request messages to this handler. |

c(RS\_AP\_00139, SRS\_Eth\_00080)

## 8.5.13.6 diag::DoIPPowerMode::StopOffer function

[SWS_DM_00736]{DRAFT} d
<table><tr><td>Kind:</td><td>function</td></tr><tr><td>Symbol:</td><td>ara::diag::DolPPowerMode::StopOffer()</td></tr><tr><td>Scope:</td><td>class ara::diag::DolPPowerMode</td></tr><tr><td rowspan="3">Syntax: Return value:</td><td>void StopOffer ();</td></tr><tr><td>None</td></tr><tr><td>#include &quot;ara/diag/doip_power_mode.h&quot;</td></tr><tr><td>Description:</td><td>This StopOffer will disable the forwaring of request messages from DM.</td></tr></table>

c(SRS\_Eth\_00080)

## 8.5.14 DoIPActivationLine class

The InstanceSpecifier is only compatible with PortInterface of Diagnostic-DoIPActivationLineInterface. Note : For DoIPActivationLineInterface, DM has to have a R-PORT.

[SWS_DM_00830]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DoIPActivationLine {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticDolPActivationLinelnterface.</td></tr></table>

c(RS\_Diag\_04242)

## 8.5.14.1 diag::DoIPActivationLine::DoIPActivationLine function

[SWS_DM_00831]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPActivationLine::DolPActivationLine(const ara::core::InstanceSpecifier &amp;specifier)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>explicit DoIPActivationLine (const ara::core::InstanceSpecifier&amp;specifier);</td></tr><tr><td rowspan=1 colspan=1>Parameters (in):</td><td rowspan=1 colspan=1>specifier</td><td rowspan=1 colspan=1>InstanceSpecifier to an PortPrototype of anDiagnosticDolPActivationLinelnterface</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Constructor of DolPActivationLine.</td></tr></table>

## c(RS\_Diag\_04242)

## 8.5.14.2 diag::DoIPActivationLine::\~DoIPActivationLine function

## [SWS_DM_00832]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPActivationLine::~DolPActivationLine()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>virtual ~DoIPActivationLine () noexcept=default;</td></tr><tr><td rowspan=1 colspan=1>Exception Safety:</td><td rowspan=1 colspan=1>noexcept</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>Destructor of DolPActivationLine.</td></tr></table>

## c(RS\_Diag\_04242, RS\_AP\_00134)

## 8.5.14.3 diag::DoIPActivationLine::GetNetworkInterfaceId function

## [SWS_DM_00833]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPActivationLine::GetNetworkInterfaceld()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;std::uint8_t&gt; GetNetworkInterfaceId ()=0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>void</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; std::uint8_t &gt;</td><td rowspan=1 colspan=1>network interface id for which this activation line isresponsible.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called to get the get the network interface Id (see DolpNetworkConfiguration.networkInterfaceId) for which this DolPActivationLine instance is responsible.</td></tr></table>


| Notes: | If the reported DolpNetworkConfiguration.networkInterfaceld belongs to a DolpNetwork Configuration with property isActivationLineDependent = 'FALSE', this is an error! |

c(RS\_Diag\_04242)

## 8.5.14.4 diag::DoIPActivationLine::UpdateActivationLineState function

[SWS_DM_00834]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPActivationLine::UpdateActivationLineState(std::bool)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual void UpdateActivationLineState (std::bool)=0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>std::bool</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called to update current activation line state.</td></tr></table>

c(RS\_Diag\_04242)

## 8.5.14.5 diag::DoIPActivationLine::GetActivationLineState function

[SWS_DM_00835]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPActivationLine::GetActivationLineState()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>virtual ara::core::Future&lt;std::bool&gt; GetActivationLineState ()=0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>void</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Future&lt; std::bool &gt;</td><td rowspan=1 colspan=1>TRUE in case the activation line is active, eleseFALSE.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called to get the current activation line state.</td></tr></table>

c(RS\_Diag\_04242)

## 8.5.14.6 diag::DoIPActivationLine::Offer function

[SWS_DM_00836]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPActivationLine::Offer()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPActivationLine</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>ara::core::Result&lt;void&gt; Offer ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>ara::core::Result&lt; void &gt;</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Errors:</td><td rowspan=1 colspan=1>tbd</td><td rowspan=1 colspan=1>This error includes errors in offering this instance.</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_activationline.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>This Offer will enable the DM to listen to activation line state changes for the given interface.</td></tr></table>

c(RS\_Diag\_04242)

## 8.5.14.7 diag::DoIPActivationLine::StopOffer function

## [SWS_DM_00837]{DRAFT} d

| Kind: | function |
| --- | --- |
| Symbol: | ara::diag::DolPActivationLine::StopOffer() |
| Scope: | class ara::diag::DolPActivationLine |
| Syntax: | void StopOffer (); |
| Return value: | None |
| Header file: | #include "ara/diag/doip_activationline.h" |
| Description: | This StopOffer will disable the provision of activation line state to DM. |

c(RS\_Diag\_04242)

## 8.5.15 DoIPTriggerVehicleAnnouncement class

For DiagnosticDoIPTriggerVehicleAnnouncementInterface, DM has to provide a P-Port per supported DoIP network interface.

## [SWS_DM_00820]{DRAFT} d

<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=1>class</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=1>ara::diag::DolPTriggerVehicleAnnouncement</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=1>namespace ara::diag</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=1>class DoIPTriggerVehicleAnnouncement {...};</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=1>#include &quot;ara/diag/doip_trigger_announcement.h&#x27;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=1>DiagnosticDolPTriggerVehicleAnnouncement.</td></tr></table>

c(RS\_Diag\_04242)

## 8.5.15.1 diag::DoIPTriggerVehicleAnnouncement::GetDoIPTriggerVehicleAnnouncement function

[SWS_DM_00821]{DRAFT}
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPTriggerVehicleAnnouncement::GetDolPTriggerVehicleAnnouncement()</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPTriggerVehicleAnnouncement</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>static Result&lt;DoIPTriggerVehicleAnnouncement&amp;&gt; GetDoIPTriggerVehicleAnnouncement ();</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=1>Result&lt; DolPTriggerVehicleAnnouncement &amp; &gt;</td><td rowspan=1 colspan=1>DolPTriggerVehicleAnnouncement object</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_trigger_announcement.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Get DolPTriggerVehicleAnnouncement interface from DM.</td></tr></table>

## c(RS\_Diag\_04242)

## 8.5.15.2 diag::DoIPTriggerVehicleAnnouncement::TriggerVehicleAnnouncement function

[SWS_DM_00822]{DRAFT} d
<table><tr><td rowspan=1 colspan=1>Kind:</td><td rowspan=1 colspan=2>function</td></tr><tr><td rowspan=1 colspan=1>Symbol:</td><td rowspan=1 colspan=2>ara::diag::DolPTriggerVehicleAnnouncement::TriggerVehicleAnnouncement(std::uint8_tnetworkInterfaceld)</td></tr><tr><td rowspan=1 colspan=1>Scope:</td><td rowspan=1 colspan=2>class ara::diag::DolPTriggerVehicleAnnouncement</td></tr><tr><td rowspan=1 colspan=1>Syntax:</td><td rowspan=1 colspan=2>void TriggerVehicleAnnouncement (std::uint8_t networkInterfaceId)=0;</td></tr><tr><td rowspan=1 colspan=1>DIRECTION NOTDEFINED</td><td rowspan=1 colspan=1>networkInterfaceld</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>Return value:</td><td rowspan=1 colspan=2>None</td></tr><tr><td rowspan=1 colspan=1>Header file:</td><td rowspan=1 colspan=2>#include &quot;ara/diag/doip_trigger_announcement.h&quot;</td></tr><tr><td rowspan=1 colspan=1>Description:</td><td rowspan=1 colspan=2>Called by application to frigger DM sending out vehicle announcements on the given networkinterface Id.</td></tr><tr><td rowspan=1 colspan=1>Notes:</td><td rowspan=1 colspan=2>If the reported DolpNetworkConfiguration.networkInterfaceld belongs to a DolpNetworkConfiguration with property isActivationLineDependent = &#x27;TRUE&#x27;, this is an error as on thoseinterfaces sending of announcements happens automatically after activation line going up/ipaddress assignment.</td></tr></table>

## c(RS\_Diag\_04242)

## A Mentioned Manifest Elements

For the sake of completeness, this chapter contains a set of class tables representing meta-classes mentioned in the context of this document but which are not contained directly in the scope of describing specific meta-model semantics.


<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>ApApplicationError</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to formally specify the semantics of an application error on theAUTOSAR adaptive platformTags:atp.Status=draftatp.recommendedPackage=ApplicationErrors</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable, UploadablePackageElement</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>errorCode</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute has the ability to specify the error codevalue within the enclosing AdaptivePlatformApplicationError.</td></tr><tr><td rowspan=1 colspan=1>errorDomain</td><td rowspan=1 colspan=1>ApApplicationErrorDomain</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the error domain of the ApApplicationError.Tags:atp.Status=draft</td></tr></table>

Table A.1: ApApplicationError

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>CpplmplementationDataType (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::CpplmplementationDataType</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the way to specify a reusable data type definition taken as a the basis for aC++ language bindingTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AbstractImplementationDataType, AtpBlueprint, AtpBlueprintable, AtpClassifier,AtpType, AutosarDataType, CollectableElement, CppImplementationDataTypeContextTarget,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>CustomCpplmplementationDataType, StdCppImplementationDataType</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>arraySize</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute can be used to specify the array size if theenclosing CpplmplementationDataType has arraysemantics.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>namespace(ordered)</td><td rowspan=1 colspan=1>SymbolProps</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This aggregation allows for the definition an ownnamespace for the enclosing CpplmplementationDataType.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>subElement(ordered)</td><td rowspan=1 colspan=1>CppImplementationDataTypeElement</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the collection of sub-elements of theenclosing CpplmplementationDataTypeTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>templateArgument(ordered)</td><td rowspan=1 colspan=1>CppTemplateArgument</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This aggreation allows for the specification of propertiesof template argumentsTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>typeEmitter</td><td rowspan=1 colspan=1>NameToken</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute can be taken to control how the respectiveCpplmplementationDataType is contributed to thelanguage binding.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>CpplmplementationDataType (abstract)</td></tr><tr><td rowspan=1 colspan=1>typeReference</td><td rowspan=1 colspan=1>CpplmplementationDataType</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference shall be defined to define a type reference(a.k.a. typedef).Tags:atp.Status=draft</td></tr></table>

Table A.2: CppImplementationDataType

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DataPrototype (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::SWComponentTemplate::Datatype::DataPrototypes</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Base class for prototypical roles of any data type.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, AtpFeature, AtpPrototype, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>ApplicationCompositeElementDataPrototype, AutosarDataPrototype</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>swDataDefProps</td><td rowspan=1 colspan=1>SwDataDefProps</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This property allows to specify data definition propertieswhich apply on data prototype level.</td></tr></table>

Table A.3: DataPrototype

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagEventDebounceCounterBased</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::CommonStructure::ServiceNeeds</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to indicate that the counter-based debounce algorithm shall beused by the DEM for this diagnostic monitor.This is related to set the ECUC choice container DemDebounceAlgorithmClass to DemDebounceCounterBased.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, DiagEventDebounceAlgorithm, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>counterBasedFdcThresholdStorageValue</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Threshold to allocate an event memory entry and tocapture the Freeze Frame.</td></tr><tr><td rowspan=1 colspan=1>counterDecrementStepSize</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value shall be taken to decrement the internaldebounce counter.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterFailedThreshold</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value defines the event-specific limit that indicatesthe &quot;failed&quot; counter status.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterIncrementStepSize</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value shall be taken to increment the internaldebounce counter.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterJumpDown</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value activates or deactivates the counterjump-down behavior.Stereotypes: atpVariationTags:vh.IatestBindingTime=preCompileTime</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagEventDebounceCounterBased</td></tr><tr><td rowspan=1 colspan=1>counterJumpDownValue</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value represents the initial value of the internaldebounce counter if the counting direction changes fromincrementing to decrementing.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterJumpUp</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value activates or deactivates the counter jump-upbehavior.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterJumpUpValue</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value represents the initial value of the internaldebounce counter if the counting direction changes fromdecrementing to incrementing.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>counterPassedThreshold</td><td rowspan=1 colspan=1>Integer</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This value defines the event-specific limit that indicatesthe &quot;passed&quot; counter status.Stereotypes: atpVariationTags:vh.IatestBindingTime=preCompileTime</td></tr></table>

Table A.4: DiagEventDebounceCounterBased

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagEventDebounceTimeBased</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::CommonStructure::ServiceNeeds</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to indicate that the time-based pre-debounce algorithm shall beused by the Dem for this diagnostic monitor.This is related to set the EcuC choice container DemDebounceAlgorithmClass to DemDebounceTimeBase.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, DiagEventDebounceAlgorithm, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">timeBasedFdcThresholdStorageValue</td><td colspan="1" rowspan="1">TimeValue</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">Threshold to allocate an event memory entry and tocapture the Freeze Frame.Stereotypes: atpVariationTags:vh.latestBindingTime=postBuild</td></tr><tr><td colspan="1" rowspan="1">timeFailedThreshold</td><td colspan="1" rowspan="1">TimeValue</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This value represents the event-specific delay indicatingthe "failed" status.Stereotypes: atpVariationTags:vh.latestBindingTime=postBuild</td></tr><tr><td colspan="1" rowspan="1">timePassedThreshold</td><td colspan="1" rowspan="1">TimeValue</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This value represents the event-specific delay indicatingthe "passed" status.Stereotypes: atpVariationTags:vh.latestBindingTime=postBuild</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticAbstractDataldentifier (abstract)</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents an abstract base class for the modeling of a diagnostic data identifier (DID).</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Subclasses</td><td colspan="4" rowspan="1">DiagnosticDataldentifier, DiagnosticDynamicDataldentifier</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">id</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This is the numerical identifier used to identify theDiagnosticAbstractDataldentifier in the scope ofdiagnostic workflowStereotypes: atpVariationTags:vh.latestBindingTime=postBuild</td></tr></table>

Table A.5: DiagEventDebounceTimeBased

Table A.6: DiagnosticAbstractDataIdentifier

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticAccessPermission</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents the specification of whether a given service can be accessed according to the existenceof meta-classes referenced by a particular DiagnosticAccessPermission.In other words, this meta-class acts as a mapping element between several (otherwise unrelated) piecesof information that are put into context for the purpose of checking for access rights.Tags:atp.recommendedPackage=DiagnosticAccessPermissions</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticSession</td><td rowspan=1 colspan=1>DiagnosticSession</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the associated DiagnosticSessions</td></tr><tr><td rowspan=1 colspan=1>environmentalCondition</td><td rowspan=1 colspan=1>DiagnosticEnvironmentalCondition</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the environmental conditions associatedwith the access permission.</td></tr><tr><td rowspan=1 colspan=1>securityLevel</td><td rowspan=1 colspan=1>DiagnosticSecurityLevel</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the associated DiagnosticSecurityLevels</td></tr></table>

Table A.7: DiagnosticAccessPermission

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticAging</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticAging</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Defines the aging algorithm.Tags:atp.recommendedPackage=DiagnosticAgings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>agingCycle</td><td rowspan=1 colspan=1>DiagnosticOperationCycle</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the applicable aging cycle.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=agingCycle, variationPoint.shortLabelvh.latestBindingTime=preCompileTime</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticAging</td></tr><tr><td rowspan=1 colspan=1>threshold</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Number of aging cycles needed to unlearn/delete theevent.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr></table>

Table A.8: DiagnosticAging

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticClearCondition</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::DiagnosticDesign::DiagnosticClearCondition</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class describes a clear condition for diagnostic purposes.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticConditions</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticCondition,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>7</td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.9: DiagnosticClearCondition

<table><tr><td rowspan=1 colspan=1>Enumeration</td><td rowspan=1 colspan=1>DiagnosticClearDtcLimitationEnum</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::DiagnosticCommonProps</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>Scope of the DEM_ClearDTC Api.</td></tr><tr><td rowspan=1 colspan=1>Literal</td><td rowspan=1 colspan=1>Description</td></tr><tr><td rowspan=1 colspan=1>allSupportedDtcs</td><td rowspan=1 colspan=1>DEM_ClearDtc API accepts all supported DTC values.Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td rowspan=1 colspan=1>clearAlIDtcs</td><td rowspan=1 colspan=1>DEM_ClearDtc API accepts ClearAlIDTCs only.Tags:atp.EnumerationLiterallndex=1</td></tr></table>

Table A.10: DiagnosticClearDtcLimitationEnum

<table><tr><td colspan="1" rowspan="1">Enumeration</td><td colspan="4" rowspan="1">DiagnosticClearEventBehaviorEnum</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticEvent</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Possible behavior for clearing events.</td></tr><tr><td colspan="1" rowspan="1">Literal</td><td colspan="4" rowspan="1">Description</td></tr><tr><td colspan="1" rowspan="1">noStatusByteChange</td><td colspan="4" rowspan="1">The event status byte keeps unchanged.Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td colspan="1" rowspan="1">onlyThisCycleAndReadiness</td><td colspan="4" rowspan="1">The OperationCycle and readiness bits of the event status byte are reset.Tags:atp.EnumerationLiterallndex=1</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticComControl</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::CommunicationControl</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This represents an instance of the "Communication Control" diagnostic service.Tags:atp.recommendedPackage=DiagnosticCommunicationControls</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">comControlClass</td><td colspan="1" rowspan="1">DiagnosticComControlClass</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticComControl in thegiven context.</td></tr><tr><td colspan="1" rowspan="1">customSubFunctionNumber</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute shall be used to define a customsub-function number if none of the standardized values ofcategory shall be used.</td></tr></table>

Table A.11: DiagnosticClearEventBehaviorEnum

Table A.12: DiagnosticComControl

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt; DiagnosticCommonProps</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::DiagnosticCommonProps</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class aggregates a number of common properties that are shared among a diagnostic extract.Tags:vh.latestBindingTime=codeGenerationTime</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>agingRequiresTestedCycle</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines whether the aging cycle counter is processedevery aging cycles or else only tested aging cycle areconsidered.If the attribute is set to TRUE: only tested aging cycle areconsidered for aging cycle counter.If the attribute is set to FALSE: aging cycle counter isprocessed every aging cycle.</td></tr><tr><td rowspan=1 colspan=1>clearDtcLimitation</td><td rowspan=1 colspan=1>DiagnosticClearDtcLimitationEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines the scope of the DEM_ClearDTC Api.</td></tr><tr><td rowspan=1 colspan=1>debounceAlgorithmProps</td><td rowspan=1 colspan=1>DiagnosticDebounceAlgorithmProps</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Defines the used debounce algorithms relevant in thecontext of the enclosing DiagnosticCommonProps.Usually, there is a variety of debouncing algorithms totake into account and therefore the multiplicity of thisaggregation is set to 0..*.</td></tr><tr><td rowspan=1 colspan=1>defaultEndianness</td><td rowspan=1 colspan=1>ByteOrderEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines the default endianness of the data belonging to aDID or RID which is applicable if the DiagnosticDataElement does not define the endianness via the swDataDefProps.baseType attribute</td></tr><tr><td rowspan=1 colspan=1>environmentDataCapture</td><td rowspan=1 colspan=1>DiagnosticDataCaptureEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute determines whether the capturing ofenvironment data is done synchronously inside the reportAPl function or whether the capturing shall be doneasynchronously, i.e. after the report API function alreadyterminated.</td></tr><tr><td rowspan=1 colspan=1>eventDisplacementStrategy</td><td rowspan=1 colspan=1>DiagnosticEventDisplacementStrategyEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines, whether support for eventdisplacement is enabled or not, and which displacementstrategy is followed.</td></tr><tr><td rowspan=1 colspan=1>maxNumberOfEventEntries</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute fixes the maximum number of event entriesin the fault memory.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt; DiagnosticCommonProps</td></tr><tr><td rowspan=1 colspan=1>maxNumberOfRequestCorrectlyReceivedResponsePending</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Maximum number of negative responses with responsecode 0x78 (requestCorrectlyReceived-ResponsePending)allowed per request. DCM will send a negative responsewith response code 0x10 (generalReject), in case the limitvalue gets reached. Value 0xFF means that no limitnumber of NRC 0x78 response apply.</td></tr><tr><td rowspan=1 colspan=1>memoryEntryStorageTrigger</td><td rowspan=1 colspan=1>DiagnosticMemoryEntryStorageTriggerEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Describes the primary trigger to allocate an eventmemory entry.</td></tr><tr><td rowspan=1 colspan=1>occurrenceCounterProcessing</td><td rowspan=1 colspan=1>DiagnosticOccurrenceCounterProcessingEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the consideration of the faultconfirmation process for the occurrence counter.</td></tr><tr><td rowspan=1 colspan=1>resetConfirmedBitOnOverflow</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines, whether the confirmed bit is resetor not while an event memory entry will be displaced.</td></tr><tr><td rowspan=1 colspan=1>responseOnAllRequestSids</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>If set to FALSE the DCM will not respond to diagnosticrequest that contains a service ID which is in the rangefrom 0x40 to 0x7F or in the range from 0xC0 to 0xFF(Response IDs).</td></tr><tr><td rowspan=1 colspan=1>responseOnSecondDeclinedRequest</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines the reaction upon a second request (ClientB) thatcan not be processed (e.g. due to priority assessment).TRUE: when the second request (Client B) can not beprocessed, it shall be answered with NRC21 BusyRepeatRequest.FALSE: when the second request (Client B) can not beprocessed, it shall not be responded.</td></tr><tr><td rowspan=1 colspan=1>securityDelayTimeOnBoot</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Start delay timer on power on in seconds.This delay indicates the time at ECU boot power-on timewhere the Dcm remains in the default session and doesnot accept a security access.</td></tr><tr><td rowspan=1 colspan=1>statusBitHandlingTestFailedSinceLastClear</td><td rowspan=1 colspan=1>DiagnosticStatusBitHandlingTestFailedSinceLastClearEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines, whether the aging anddisplacement mechanism shall be applied to the &quot;TestFailedSinceLastClear&quot; status bits.</td></tr><tr><td rowspan=1 colspan=1>statusBitStorageTestFailed</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This parameter is used to activate/deactivate thepermanent storage of the &quot;TestFailed&quot; status bits.true: storage activatedfalse: storage deactivated</td></tr><tr><td rowspan=1 colspan=1>typeOfDtcSupported</td><td rowspan=1 colspan=1>DiagnosticTypeOfDtcSupportedEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the format returned by Dem_DcmGetTranslationType and does not relate to/influence thesupported Dem functionality.</td></tr></table>

Table A.13: DiagnosticCommonProps

| Class | DiagnosticConditionInterface |
| --- | --- |
| Package | M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface |
| Note | This meta-class represents the ability to implement a PortInterface to process requests for diagnostic conditions on the adaptive platform. Tags: atp.Status=draft atp.recommendedPackage=DiagnosticPortInterfaces |

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticConditionInterface</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.14: DiagnosticConditionInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticConnectedIndicator</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticEvent</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Description of indicators that are defined per DiagnosticEvent.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>behavior</td><td rowspan=1 colspan=1>DiagnosticConnectedIndicatorBehaviorEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Behavior of the linked indicator.</td></tr><tr><td rowspan=1 colspan=1>healingCycle</td><td rowspan=1 colspan=1>DiagnosticOperationCycle</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>The deactivation of indicators per event is defined ashealing of a diagnostic event. The operation cycle inwhich the warning indicator will be switched off is definedhere.</td></tr><tr><td rowspan=1 colspan=1>healingCycleCounterThreshold</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the number of healing cycles for theWarningIndicatorOffCriteriaStereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>indicator</td><td rowspan=1 colspan=1>DiagnosticIndicator</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to the used indicator.</td></tr></table>

Table A.15: DiagnosticConnectedIndicator

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticContributionSet</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::DiagnosticContribution</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents a root node of a diagnostic extract. It bundles a given set of diagnostic modelelements. The granularity of the DiagonsticContributionSet is arbitrary in order to support the aspect ofdecentralized configuration, i.e. different contributors can come up with an own DiagnosticContributionSet.Tags:atp.recommendedPackage=DiagnosticContributionSets</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>commonProperties</td><td rowspan=1 colspan=1>DiagnosticCommonProps</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This attribute represents a collection of diagnosticproperties that are shared among the entire DiagnosticContributionSet.Stereotypes: atpSplitableTags:atp.Splitkey=commonProperties, variationPoint.shortLabel</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticContributionSet</td></tr><tr><td rowspan=1 colspan=1>element</td><td rowspan=1 colspan=1>DiagnosticCommonElement</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents a DiagnosticCommonElement consideredin the context of the DiagnosticContributionSetStereotypes: atpSplitable; atpVariationTags:atp.Splitkey=element, variationPoint.shortLabelvh.latestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>serviceTable</td><td rowspan=1 colspan=1>DiagnosticServiceTable</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the collection of DiagnosticServiceTablesto be considered in the scope of this DiagnosticContributionSet.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=serviceTable, variationPoint.shortLabelvh.latestBindingTime=postBuild</td></tr></table>

Table A.16: DiagnosticContributionSet

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticControlDTCSetting</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::ControlDTCSetting</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an instance of the &quot;Control DTC Setting&quot; diagnostic service.Tags:atp.recommendedPackage=DiagnosticControlDtcSettings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstanceIdentifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>dtcSettingClass</td><td rowspan=1 colspan=1>DiagnosticControlDTCSettingClass</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticControlDTCSettingin the given context.</td></tr><tr><td rowspan=1 colspan=1>dtcSettingParameter</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the DTCSettingType defined by ISO14229-1. The pre-defined values are 1 (ON) and 2 (OFF).</td></tr></table>

Table A.17: DiagnosticControlDTCSetting

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticCustomServicelnstance</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::CustomServicelnstance</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class has the ability to define an instance of a custom diagnostic service.Tags:atp.recommendedPackage=DiagnosticCustomInstances</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">customServiceClass</td><td colspan="1" rowspan="1">DiagnosticCustomServiceClass</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">Reference to the corresponding DiagnosticCustomServiceClass.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDTCInformationInterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a PortInterface to access the properties of DTCs onthe adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr></table>

Table A.18: DiagnosticCustomServiceInstance

Table A.19: DiagnosticDTCInformationInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticDataByldentifier (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::DataByldentifier</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an abstract base class for all diagnostic services that access data by identifier.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>DiagnosticReadDataByldentifier, DiagnosticReadScalingDataByldentifier, DiagnosticWriteDataByIdentifier</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>dataldentifier</td><td rowspan=1 colspan=1>DiagnosticAbstractDataIdentifier</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the linked DiagnosticDataldentifier.</td></tr></table>

Table A.20: DiagnosticDataByIdentifier

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDataElement</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to describe a concrete piece of data to be taken into account fordiagnostic purposes.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">arraySizeSemantics</td><td colspan="1" rowspan="1">ArraySizeSemanticsEnum</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute controls the meaning of the value of thearray size.</td></tr><tr><td colspan="1" rowspan="1">maxNumberOfElements</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">The existence of this attribute turns the data instance intoan array of data. The attribute determines the size of thearray in terms of how many elements the array can take.</td></tr><tr><td colspan="1" rowspan="1">scalinglnfoSize</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">Size in bytes of scaling information for the DiagnosticDataElement if used with DiagnosticReadScalingDataByIdentifier</td></tr><tr><td colspan="1" rowspan="1">swDataDefProps</td><td colspan="1" rowspan="1">SwDataDefProps</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This property allows to specify data definition propertiesin order to support the definition of e.g. computationformulae and data constraints</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDataElementInterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a element-of-DID-focused PortInterface fordiagnostics on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticAbstractDataldentifierInterface, DiagnosticPortInterface, Identifiable, MultilanguageReferrable,PackageableElement, PortInterface, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">read</td><td colspan="1" rowspan="1">ClientServerOperation</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the method to read the content of anelement of a diagnostic data identifier.Tags:atp.Status=draft</td></tr><tr><td colspan="1" rowspan="1">write</td><td colspan="1" rowspan="1">ClientServerOperation</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the method to write the content of anelement of a diagnostic data identifier.Tags:atp.Status=draft</td></tr></table>

Table A.21: DiagnosticDataElement

Table A.22: DiagnosticDataElementInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticDataldentifier</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to model a diagnostic data identifier (DID) that is fully specifiedregarding the payload at configuration-time.Tags:atp.recommendedPackage=DiagnosticDataldentifiers</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticAbstractDataldentifier, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>dataElement</td><td rowspan=1 colspan=1>DiagnosticParameter</td><td rowspan=1 colspan=1>1..*</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This is the dataElement associated with the DiagnosticDataldentifier.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=bitOffset, variationPoint.shortLabelvh.latestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>didSize</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute indicates the size in bytes of the DiagnosticDataldentifier.</td></tr><tr><td rowspan=1 colspan=1>representsVin</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attributes indicates whether the specific DiagnosticDataldentifier represents the vehicle identification</td></tr><tr><td rowspan=1 colspan=1>supportInfoByte</td><td rowspan=1 colspan=1>DiagnosticSupportInfoByte</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This attribute represents the supported informationassociated with the DiagnosticDataldentifier.</td></tr></table>

Table A.23: DiagnosticDataIdentifier

| Class | DiagnosticDataldentifierGenericInterface |
| --- | --- |
| Package | M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface |

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticDataldentifierGenericlnterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a generic DID-focused PortInterface for diagnosticson the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticAbstractDataldentifierInterface, DiagnosticPortInterface, Identifiable, MultilanguageReferrable,PackageableElement, PortInterface, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.24: DiagnosticDataIdentifierGenericInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticDataldentifierInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a DID-focused PortInterface for diagnostics on theadaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticAbstractDataldentifierInterface, DiagnosticPortInterface, Identifiable, MultilanguageReferrable,PackageableElement, PortInterface, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>read</td><td rowspan=1 colspan=1>ClientServerOperation</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the method to read the content of adiagnostic data identifierTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>write</td><td rowspan=1 colspan=1>ClientServerOperation</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the method to write the contents of adiagnostic data identifier.Tags:atp.Status=draft</td></tr></table>

Table A.25: DiagnosticDataIdentifierInterface

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDataldentifierSet</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This represents the ability to define a list of DiagnosticDataldentifiers that can be reused in differentcontexts.Tags:atp.recommendedPackage=DiagnosticDataldentifierSets</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">dataldentifier(ordered)</td><td colspan="1" rowspan="1">DiagnosticDataldentifier</td><td colspan="1" rowspan="1">★</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">Reference to an orderd list of Data Identifiers.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDebounceAlgorithmProps</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticDebouncingAlgorithm</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Defines properties for the debounce algorithm class</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">debounceAlgorithm</td><td colspan="1" rowspan="1">DiagEventDebounceAlgorithm</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the actual debounce algorithm.</td></tr><tr><td colspan="1" rowspan="1">debounceBehavior</td><td colspan="1" rowspan="1">DiagnosticDebounceBehaviorEnum</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute defines how the event debounce algorithmwill behave, if a related enable condition is not fulfilled orControlDTCSetting of the related event is disabled.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td colspan="1" rowspan="1">debounceCounterStorage</td><td colspan="1" rowspan="1">Boolean</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">Switch to store the debounce counter value non-volatileor not.true: debounce counter value shall be stored non-volatilefalse: debounce counter value is volatile</td></tr></table>

Table A.26: DiagnosticDataIdentifierSet

Table A.27: DiagnosticDebounceAlgorithmProps

<table><tr><td rowspan=1 colspan=1>Enumeration</td><td rowspan=1 colspan=1>DiagnosticDebounceBehaviorEnum</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticDebouncingAlgorithm</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>Event debounce algorithm behavior options.</td></tr><tr><td rowspan=1 colspan=1>Literal</td><td rowspan=1 colspan=1>Description</td></tr><tr><td rowspan=1 colspan=1>freeze</td><td rowspan=1 colspan=1>The event debounce counter will be frozen with the current value and will not change while a relatedenable condition is not fulfilled or ControlDTCSetting of the related event is disabled. After all relatedenable conditions are fulfilled and ControlDTCSetting of the related event is enabled again, the eventqualification will continue with the next report of the event (i.e. SetEventStatus).Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td rowspan=1 colspan=1>reset</td><td rowspan=1 colspan=1>The event debounce counter will be reset to initial value if a related enable condition is not fulfilled orControlDTCSetting of the related event is disabled. The qualification of the event will be restarted withthe next valid event report.Tags:atp.EnumerationLiterallndex=1</td></tr></table>

Table A.28: DiagnosticDebounceBehaviorEnum

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDolPActivationLinelnterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a PortInterface to implement the DolPActivationLineon the adaptive platformTags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDolPGroupldentificationInterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a PortInterface to implement the DolP GroupIdentification on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr></table>

Table A.29: DiagnosticDoIPActivationLineInterface

Table A.30: DiagnosticDoIPGroupIdentificationInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticDolPPowerModelnterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to implement the DolP Power Modeon the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.31: DiagnosticDoIPPowerModeInterface

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDolPTriggerVehicleAnnouncementInterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a PortInterface to implement the DolPTriggerVehicleAnnouncement on the adaptive platformTags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticDownloadInterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a PortInterface to process requests for downloadingdata using diagnostic channels on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr></table>

Table A.32: DiagnosticDoIPTriggerVehicleAnnouncementInterface

Table A.33: DiagnosticDownloadInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEcuReset</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EcuReset</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an instance of the &quot;ECU Reset&quot; diagnostic service.Tags:atp.recommendedPackage=DiagnosticEcuResets</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>customSubFunctionNumber</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute shall be used to define a customsub-function number if none of the standardized values ofcategory shall be used.</td></tr><tr><td rowspan=1 colspan=1>ecuResetClass</td><td rowspan=1 colspan=1>DiagnosticEcuResetClass</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticEcuReset in thegiven context.</td></tr></table>

Table A.34: DiagnosticEcuReset

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticEcuResetClass</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EcuReset</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class contains attributes shared by all instances of the "Ecu Reset" diagnostic service.Tags:atp.recommendedPackage=DiagnosticEcuResets</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServiceClass,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">respondToReset</td><td colspan="1" rowspan="1">DiagnosticResponseToEcuResetEnum</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute defines whether the response to the EcuReset service shall be transmitted before or after theactual reset.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticEnableCondition</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticCondition</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Specification of an enable condition.Tags:atp.recommendedPackage=DiagnosticConditions</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticCondition,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr></table>

Table A.35: DiagnosticEcuResetClass

Table A.36: DiagnosticEnableCondition

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEnvCompareCondition (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EnvironmentalCondition</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>DiagnosticCompareConditions are atomic conditions. They are based on the idea of a comparison atruntime of some variable data with something constant. The type of the comparison $( = = , \ l = , < , < = , \ \ldots )$ isspecified in DiagnosticCompareCondition.compareType.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, DiagnosticEnvConditionFormulaPart</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>DiagnosticEnvDataCondition, DiagnosticEnvModeCondition</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>compareType</td><td rowspan=1 colspan=1>DiagnosticCompareTypeEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attributes represents the concrete type of thecomparison.</td></tr></table>

Table A.37: DiagnosticEnvCompareCondition

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticEnvConditionFormula</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EnvironmentalCondition</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">A DiagnosticEnvConditionFormula embodies the computation instruction that is to be evaluated atruntime to determine if the DiagnosticEnvironmentalCondition is currently present (i.e. the formula isevaluated to true) or not (otherwise). The formula itself consists of parts which are combined by thelogical operations specified by DiagnosticEnvConditionFormula.op.If a diagnostic functionality cannot be executed because an environmental condition fails then thediagnostic stack shall send a negative response code (NRC) back to the client. The value of the NRC isdirectly related to the specific formula and is therefore formalized in the attribute DiagnosticEnvConditionFormula.nrcValue.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, DiagnosticEnvConditionFormulaPart</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">nrcValue</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute represents the concrete NRC value thatshall be returned if the condition fails.</td></tr><tr><td colspan="1" rowspan="1">op</td><td colspan="1" rowspan="1">DiagnosticLogicalOperatorEnum</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute represents the concrete operator(supported operators: and, or) of the condition formula.</td></tr><tr><td colspan="1" rowspan="1">part (ordered)</td><td colspan="1" rowspan="1">DiagnosticEnvConditionFormulaPart</td><td colspan="1" rowspan="1">★</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This aggregation represents the collection of formulaparts that can be combined by logical operators.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticEnvDataCondition</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EnvironmentalCondition</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">A DiagnosticEnvDataCondition is an atomic condition that compares the current value of the referencedDiagnosticDataElement with a constant value defined by the ValueSpecification. All compareTypes aresupported.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, DiagnosticEnvCompareCondition, DiagnosticEnvConditionFormulaPart</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">compareValue</td><td colspan="1" rowspan="1">ValueSpecification</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This attribute represents a fixed compare value taken toevaluate the compare condition.</td></tr><tr><td colspan="1" rowspan="1">dataElement</td><td colspan="1" rowspan="1">DiagnosticDataElement</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This reference represents the related diagnostic dataelement.</td></tr></table>

Table A.38: DiagnosticEnvConditionFormula

Table A.39: DiagnosticEnvDataCondition

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEnvironmentalCondition</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EnvironmentalCondition</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>The meta-class DiagnosticEnvironmentalCondition formalizes the idea of a condition which is evaluatedduring runtime of the ECU by looking at &quot;environmental&quot; states (e.g. one such condition is that thevehicle is not driving, i.e. vehicle speed == 0).Tags:atp.recommendedPackage=DiagnosticEnvironmentalConditions</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>formula</td><td rowspan=1 colspan=1>DiagnosticEnvConditionFormula</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This attribute represents the formula part of theDiagnosticEnvironmentalCondition.</td></tr><tr><td rowspan=1 colspan=1>modeElement</td><td rowspan=1 colspan=1>DiagnosticEnvModeElement</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This aggregation contains a representation of ModeDeclarations in the context of a DiagnosticEnvironmentalCondition.</td></tr></table>

Table A.40: DiagnosticEnvironmentalCondition

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEvent</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticEvent</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This element is used to configure DiagnosticEvents.Tags:atp.recommendedPackage=DiagnosticEvents</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>clearEventBehavior</td><td rowspan=1 colspan=1>DiagnosticClearEventBehaviorEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the resulting UDS DTC status bytefor the related event, which shall not be cleared accordingto the ClearEventAllowed callback.</td></tr><tr><td rowspan=1 colspan=1>connectedIndicator</td><td rowspan=1 colspan=1>DiagnosticConnectedIndicator</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Event specific description of Indicators.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=shortName, variationPoint.shortLabelvh.latestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>eventClearAllowed</td><td rowspan=1 colspan=1>DiagnosticEventClearAllowedEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines whether the Dem has access to a&quot;ClearEventAllowed&quot; callback.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEvent</td></tr><tr><td rowspan=1 colspan=1>eventFailureCycleCounterThreshold</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the number of failure cycles for theevent based fault confirmation.Stereotypes: atpVariationTags:vh.latestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>prestorageFreezeFrame</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute describes whether the Prestorage of FreezeFrames is supported by the assigned event or not.True: Prestorage of FreezeFrames is supportedFalse: Prestorage of FreezeFrames is not supported</td></tr><tr><td rowspan=1 colspan=1>prestoredFreezeframeStoredInNvm</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>If the Event uses a prestored freeze-frame (using theoperations PrestoreFreezeFrame and ClearPrestoredFreezeFrame of the service interface DiagnosticMonitor)this attribute indicates if the Event requires the data to bestored in non-volatile memory. TRUE = Dem shall storethe prestored data in non-volatile memory, FALSE = Datacan be lost at shutdown (not stored in Nvm)</td></tr><tr><td rowspan=1 colspan=1>recoverablelnSameOperationCycle</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>If the attribute is set to true then reporting PASSED willreset the indication of a failed test in the current operationcycle. If the attribute is set to false then reportingPASSED will be ignored and not lead to a reset of theindication of a failed test.</td></tr></table>

Table A.41: DiagnosticEvent

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEventInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to access the properties of diagnosticevents on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterfaceReferrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.42: DiagnosticEventInterface

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticEventToDebounceAlgorithmMapping</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticMapping</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Defines which Debounce Algorithm is applicable for a DiagnosticEvent.Tags:atp.recommendedPackage=DiagnosticMappings</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">debounceAlgorithm</td><td colspan="1" rowspan="1">DiagnosticDebounceAlgorithmProps</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">Reference to a DebounceAlgorithm assigned to aDiagnosticEvent</td></tr><tr><td colspan="1" rowspan="1">diagnosticEvent</td><td colspan="1" rowspan="1">DiagnosticEvent</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">Reference to a DiagnosticEvent to which a DebounceAlgorithm is assigned.</td></tr></table>

Table A.43: DiagnosticEventToDebounceAlgorithmMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEventToEnableConditionGroupMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Defines which EnableConditionGroup is applicable for a DiagnosticEvent.Tags:atp.recommendedPackage=DiagnosticMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticEvent</td><td rowspan=1 colspan=1>DiagnosticEvent</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to a DiagnosticEvent to which an EnableConditionGroup is assigned.</td></tr><tr><td rowspan=1 colspan=1>enableConditionGroup</td><td rowspan=1 colspan=1>DiagnosticEnableConditionGroup</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to an EnableConditionGroup assigned to aDiagnosticEvent.</td></tr></table>

Table A.44: DiagnosticEventToEnableConditionGroupMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEventToOperationCycleMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Defines which OperationCycle is applicable for a DiagnosticEvent.Tags:atp.recommendedPackage=DiagnosticMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticEvent</td><td rowspan=1 colspan=1>DiagnosticEvent</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to a DiagnosticEvent to which an OperationCycle is assigned.</td></tr><tr><td rowspan=1 colspan=1>operationCycle</td><td rowspan=1 colspan=1>DiagnosticOperationCycle</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to an OperationCycle assigned to a DiagnosticEvent.</td></tr></table>

Table A.45: DiagnosticEventToOperationCycleMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEventToTroubleCodeUdsMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Defines which UDS Diagnostic Trouble Code is applicable for a DiagnosticEvent.Tags:atp.recommendedPackage=DiagnosticMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMappingIdentifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticEvent</td><td rowspan=1 colspan=1>DiagnosticEvent</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to a DiagnosticEvent to which a UDSDiagnostic Trouble Code is assigned.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticEventToTroubleCodeUdsMapping</td></tr><tr><td rowspan=1 colspan=1>troubleCodeUds</td><td rowspan=1 colspan=1>DiagnosticTroubleCodeUds</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to an UDS Diagnostic Trouble Code assignedto a DiagnosticEvent.</td></tr></table>

Table A.46: DiagnosticEventToTroubleCodeUdsMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticExtendedDataRecord</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticExtendedDataRecord</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Description of an extended data record.Tags:atp.recommendedPackage=DiagnosticExtendedDataRecords</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>customTrigger</td><td rowspan=1 colspan=1>String</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute shall be taken to verbally describe thenature of the custom trigger.</td></tr><tr><td rowspan=1 colspan=1>recordElement</td><td rowspan=1 colspan=1>DiagnosticParameter</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Defined DataElements in the extended record element.</td></tr><tr><td rowspan=1 colspan=1>recordNumber</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute specifies an unique identifier for anextended data record.</td></tr><tr><td rowspan=1 colspan=1>trigger</td><td rowspan=1 colspan=1>DiagnosticRecordTriggerEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute specifies the primary trigger to allocate anevent memory entry.</td></tr><tr><td rowspan=1 colspan=1>update</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines when an extended data record iscaptured.True: This extended data record is captured every time.False: This extended data record is only captured for newevent memory entries.</td></tr></table>

Table A.47: DiagnosticExtendedDataRecord

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticFreezeFrame</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticFreezeFrame</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This element describes combinations of DIDs for a non OBD relevant freeze frame.Tags:atp.recommendedPackage=DiagnosticFreezeFrames</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>customTrigger</td><td rowspan=1 colspan=1>String</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute shall be taken to verbally describe thenature of the custom trigger.</td></tr><tr><td rowspan=1 colspan=1>recordNumber</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines a record number for a freeze framerecord.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>trigger</td><td rowspan=1 colspan=1>DiagnosticRecordTriggerEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the primary trigger to allocate anevent memory entry.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticFreezeFrame</td></tr><tr><td rowspan=1 colspan=1>update</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the approach when the freeze framerecord is stored/updated.True: FreezeFrame record is captured every time.False: FreezeFrame record is only captured for new eventmemory entries.</td></tr></table>

Table A.48: DiagnosticFreezeFrame

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticGenericUdsInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a generic UDS PortInterface for diagnostics on theadaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>_</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>-</td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.49: DiagnosticGenericUdsInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticIndicatorlnterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to implement indicator functionality onthe adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>_</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.50: DiagnosticIndicatorInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=1>DiagnosticMapping (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>Abstract element for different kinds of diagnostic mappings.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=1>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMapping (abstract)</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>DiagnosticEventToDebounceAlgorithmMapping, DiagnosticEventToEnableConditionGroupMapping,DiagnosticEventToOperationCycleMapping, DiagnosticEventToTroubleCodeJ1939Mapping, DiagnosticEventToTroubleCodeUdsMapping, DiagnosticFimAliasEventGroupMapping, DiagnosticFimAliasEventMapping, DiagnosticInhibitSourceEventMapping, DiagnosticJ1939SpnMapping, DiagnosticProvidedDataMapping, DiagnosticServiceDataMapping, DiagnosticSwMapping, DiagnosticTroubleCodeUdsToClearConditionGroupMapping, DiagnosticTroubleCodeUdsToTroubleCodeObdMapping</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.51: DiagnosticMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMemoryDestination (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This abstract meta-class represents a possible memory destination for a diagnostic event.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>DiagnosticMemoryDestinationMirror, DiagnosticMemoryDestinationPrimary, DiagnosticMemoryDestinationUserDefined</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>dtcStatusAvailabilityMask</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Mask for the supported DTC status bits by the Dem.</td></tr><tr><td rowspan=1 colspan=1>typeOfFreezeFrameRecordNumeration</td><td rowspan=1 colspan=1>DiagnosticTypeOfFreezeFrameRecordNumerationEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the type of assigning freeze framerecord numbers for event-specific freeze frame records.</td></tr></table>

Table A.52: DiagnosticMemoryDestination

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMemoryDestinationPrimary</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents a primary memory for a diagnostic event.Tags:atp.recommendedPackage=DiagnosticMemoryDestinations</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMemoryDestination, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.53: DiagnosticMemoryDestinationPrimary

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMemoryDestinationUserDefined</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents a user-defined memory for a diagnostic event.Tags:atp.recommendedPackage=DiagnosticMemoryDestinations</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMemoryDestination, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMemoryDestinationUserDefined</td></tr><tr><td rowspan=1 colspan=1>memoryld</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the identifier of the user-defined memory.</td></tr></table>

Table A.54: DiagnosticMemoryDestinationUserDefined

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticMonitorlnterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a monitor-focused PortInterface for diagnostics onthe adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td></tr></table>

Table A.55: DiagnosticMonitorInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticOperationCycle</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticOperationCycle</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Definition of an operation cycle that is the base of the event qualifying and for Dem scheduling.Tags:atp.recommendedPackage=DiagnosticOperationCycles</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>automaticEnd</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>If set to true the driving cycle shall automatically end ateither Dem_Shutdown() or Dem_Init().</td></tr><tr><td rowspan=1 colspan=1>cycleAutostart</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines if the operation cycles isautomatically re-started during Dem_Prelnit.</td></tr><tr><td rowspan=1 colspan=1>cycleStatusStorage</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines if the operation cycle state is available over thepower cycle (stored non-volatile) or not.• true: the operation cycle state is storednon-volatile• false: the operation cycle state is only storedvolatile</td></tr><tr><td rowspan=1 colspan=1>type</td><td rowspan=1 colspan=1>DiagnosticOperationCycleTypeEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Operation cycles types for the Dem.</td></tr></table>

Table A.56: DiagnosticOperationCycle

| Class | DiagnosticOperationCyclelnterface |
| --- | --- |
| Package | M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface |

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticOperationCyclelnterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to process requests for operationcycles on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.57: DiagnosticOperationCycleInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticParameter</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to describe information relevant for the execution of a specificdiagnostic service, i.e. it can be taken to parameterize the service.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>bitOffset</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the bitOffset of the DiagnosticParameter</td></tr><tr><td rowspan=1 colspan=1>dataElement</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the related dataElement of the DiagnosticParameterStereotypes: atpSplitable; atpVariationTags:atp.Splitkey=shortName, variationPoint.shortLabelvh.IatestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>supportInfo</td><td rowspan=1 colspan=1>DiagnosticParameterSupportInfo</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This attribute represents the ability to define which bit ofthe support info byte is representing this part of the PID.</td></tr></table>

Table A.58: DiagnosticParameter

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticPortInterface (abstract)</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class serves as an abstract base-class for all diagnostics-related PortInterfaces.Tags:atp.Status=draft</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,Identifiable, MultilanguageReferrable, PackageableElement, PortInterface, Referrable</td></tr><tr><td colspan="1" rowspan="1">Subclasses</td><td colspan="4" rowspan="1">DiagnosticAbstractDataldentifierInterface, DiagnosticAbstractRoutinelnterface, DiagnosticConditionInterface, DiagnosticDTCInformationInterface, DiagnosticDolPActivationLineInterface, DiagnosticDolPGroupldentificationInterface, DiagnosticDolPPowerModelnterface, DiagnosticDolPTriggerVehicleAnnouncementInterface, DiagnosticDownloadInterface, DiagnosticEventInterface, DiagnosticGenericUdsInterface, DiagnosticIndicatorInterface, DiagnosticMonitorlnterface, DiagnosticOperationCyclelnterface,DiagnosticSecurityLevellnterface, DiagnosticServiceValidationInterface, DiagnosticUploadInterface</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1">_</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticProvidedDataMapping</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::DiagnosticDesign::DiagnosticProvidedDataMapping</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This represents the ability to define the nature of a data access for a DiagnosticDataElement based on adata provider that cannot be modeled explicitly.Tags:atp.Status=draftatp.recommendedPackage=DataMappings</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">dataElement</td><td colspan="1" rowspan="1">DiagnosticDataElement</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This represents the DiagnosticDataElement for which theaccess is further qualified by the DiagnosticProvidedDataMapping.dataProvider.Tags:atp.Status=draft</td></tr><tr><td colspan="1" rowspan="1">dataProvider</td><td colspan="1" rowspan="1">NameToken</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This represents the ability to further specify the dataprovider.</td></tr></table>

Table A.59: DiagnosticPortInterface

Table A.60: DiagnosticProvidedDataMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticReadDTCInformation</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::ReadDTCInformation</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an instance of the &quot;Read DTC Information&quot; diagnostic service.Tags:atp.recommendedPackage=DiagnosticReadDtcInformations</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>readDTCInformationClass</td><td rowspan=1 colspan=1>DiagnosticReadDTCInformationClass</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticReadDTCInformation in the given context.</td></tr></table>

Table A.61: DiagnosticReadDTCInformation

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticReadDataByldentifier</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::DataByldentifier</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This represents an instance of the "Read Data by Identifier" diagnostic service.Tags:atp.recommendedPackage=DiagnosticDataByldentifiers</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticDataByldentifier,DiagnosticServicelnstance, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">readClass</td><td colspan="1" rowspan="1">DiagnosticReadDataByIdentifierClass</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticReadDataByIdentifier in the given context.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticReadDataByldentifierClass</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::DataByldentifier</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class contains attributes shared by all instances of the "Read Data by Identifier" diagnosticservice.Tags:atp.recommendedPackage=DiagnosticDataByldentifiers</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServiceClass,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">maxDidToRead</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute represents the maximum number of allowedDIDs in a single instance of DiagnosticReadDataByIdentifier.</td></tr></table>

Table A.62: DiagnosticReadDataByIdentifier

Table A.63: DiagnosticReadDataByIdentifierClass

<table><tr><td rowspan=1 colspan=1>Enumeration</td><td rowspan=1 colspan=1>DiagnosticResponseToEcuResetEnum</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::EcuReset</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>Literal</td><td rowspan=1 colspan=1>Description</td></tr><tr><td rowspan=1 colspan=1>respondAfterReset</td><td rowspan=1 colspan=1>Answer to EcuReset service should come after the reset.Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td rowspan=1 colspan=1>respondBeforeReset</td><td rowspan=1 colspan=1>Answer to EcuReset service should come before the reset.Tags:atp.EnumerationLiterallndex=1</td></tr></table>

Table A.64: DiagnosticResponseToEcuResetEnum

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticRoutine</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to define a diagnostic routine.Tags:atp.recommendedPackage=DiagnosticRoutines</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">id</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This is the numerical identifier used to identify theDiagnosticRoutine in the scope of diagnostic workflowStereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td colspan="1" rowspan="1">requestResult</td><td colspan="1" rowspan="1">DiagnosticRequestRoutineResults</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the ability to request the result of arunning routine.</td></tr><tr><td colspan="1" rowspan="1">routinelnfo</td><td colspan="1" rowspan="1">Positivelnteger</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This represents the routine info byte. The info bytecontains a manufacturer-specific value (for theidentification of record identifiers) that is reported to thetester.Other use cases for this attribute are mentioned in ISO27145 and ISO 26021.</td></tr><tr><td colspan="1" rowspan="1">start</td><td colspan="1" rowspan="1">DiagnosticStartRoutine</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the ability to start a routine</td></tr><tr><td colspan="1" rowspan="1">stop</td><td colspan="1" rowspan="1">DiagnosticStopRoutine</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the ability to stop a running routine.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticRoutineControl</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::RoutineControl</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This represents an instance of the "Routine Control" diagnostic service.Tags:atp.recommendedPackage=DiagnosticRoutineControls</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">routine</td><td colspan="1" rowspan="1">DiagnosticRoutine</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This refers to the applicable DiagnosticRoutine.</td></tr><tr><td colspan="1" rowspan="1">routineControlClass</td><td colspan="1" rowspan="1">DiagnosticRoutineControlClass</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticRoutineControl inthe given context.</td></tr></table>

Table A.65: DiagnosticRoutine

Table A.66: DiagnosticRoutineControl

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticRoutineGenericInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a generic Routine-focused PortInterface fordiagnostics on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticAbstractRoutinelnterface, DiagnosticPortInterface, Identifiable, MultilanguageReferrable,PackageableElement, PortInterface, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>_</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.67: DiagnosticRoutineGenericInterface

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticRoutinelnterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a routine-focused PortInterface for diagnostics on theadaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticAbstractRoutinelnterface, DiagnosticPortInterface, Identifiable, MultilanguageReferrable,PackageableElement, PortInterface, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">requestResult</td><td colspan="1" rowspan="1">ClientServerOperation</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the request result method of thediagnostic routine.Tags:atp.Status=draft</td></tr><tr><td colspan="1" rowspan="1">start</td><td colspan="1" rowspan="1">ClientServerOperation</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the start method of the diagnostic routine.Tags:atp.Status=draft</td></tr><tr><td colspan="1" rowspan="1">stop</td><td colspan="1" rowspan="1">ClientServerOperation</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">aggr</td><td colspan="1" rowspan="1">This represents the stop method of the diagnostic routine.Tags:atp.Status=draft</td></tr></table>

Table A.68: DiagnosticRoutineInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticRoutineSubfunction (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::CommonDiagnostics</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class acts as an abstract base class to routine subfunctions.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, Identifiable, MultilanguageReferrable, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>DiagnosticRequestRoutineResults, DiagnosticStartRoutine, DiagnosticStopRoutine</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>accessPermission</td><td rowspan=1 colspan=1>DiagnosticAccessPermission</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the access permission of theowning routine subfunction.</td></tr></table>

Table A.69: DiagnosticRoutineSubfunction

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticSecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an instance of the &quot;Security Access&quot; diagnostic service.Tags:atp.recommendedPackage=DiagnosticSecurityAccesss</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServicelnstance,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>requestSeedld</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This would be 0x01, 0x03, 0x05, ...The sendKey id can be computed by adding 1 to therequestSeedId</td></tr><tr><td rowspan=1 colspan=1>securityAccessClass</td><td rowspan=1 colspan=1>DiagnosticSecurityAccessClass</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticSecurityAccess inthe given context.</td></tr><tr><td rowspan=1 colspan=1>securityLevel</td><td rowspan=1 colspan=1>DiagnosticSecurityLevel</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies the applicable security level forthe security access.Stereotypes: atpSplitableTags:atp.Splitkey=securityLevel</td></tr></table>

Table A.70: DiagnosticSecurityAccess
| Class | DiagnosticSecurityAccessClass |
| --- | --- |
| Package | M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::SecurityAccess |
| Note | This meta-class contains attributes shared by all instances of the "Security Access" diagnostic service. Tags:atp.recommendedPackage=DiagnosticSecurityAccesss |
| Base | ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticServiceClass Identifiable, MultilanguageReferrable, PackageableElement, Referrable |

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticSecurityAccessClass</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>sharedTimer</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Switch between separate or single shared timer instanceand timer value.• True: use shared timer instance and timer valuefor all security access levels combined.• False: use separate timer instance and timervalues for each security level.Tags:atp.Status=draft</td></tr></table>

Table A.71: DiagnosticSecurityAccessClass

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticSecurityLevel</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to define a security level considered for diagnostic purposes.Tags:atp.recommendedPackage=DiagnosticSecurityLevels</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>accessDataRecordSize</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the size of the AccessDataRecord usedin GetSeed. Unit:byte.</td></tr><tr><td rowspan=1 colspan=1>keySize</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the size of the security key. Unit: byte.</td></tr><tr><td rowspan=1 colspan=1>numFailedSecurityAccess</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the number of failed security accessesafter which the delay time is activated.</td></tr><tr><td rowspan=1 colspan=1>securityDelayTime</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the delay time after a failed securityaccess. Unit: second.</td></tr><tr><td rowspan=1 colspan=1>seedSize</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the size of the security seed. Unit: byte.</td></tr></table>

Table A.72: DiagnosticSecurityLevel

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticSecurityLevellnterface</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class represents the ability to implement a security-level-focused PortInterface for diagnosticson the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1">一</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">DiagnosticServiceClass (abstract)</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::CommonService</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">This meta-class provides the ability to define common properties that are shared among all instances ofsub-classes of DiagnosticServicelnstance.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td colspan="1" rowspan="1">Subclasses</td><td colspan="4" rowspan="1">DiagnosticClearDiagnosticInformationClass, DiagnosticClearResetEmissionRelatedInfoClass, DiagnosticComControlClass, DiagnosticControlDTCSettingClass, DiagnosticCustomServiceClass, DiagnosticDataTransferClass, DiagnosticDynamicallyDefineDataldentifierClass, DiagnosticEcuResetClass, DiagnosticloControlClass, DiagnosticReadDTCInformationClass, DiagnosticReadDataByldentifierClass, DiagnosticReadDataByPeriodicIDClass, DiagnosticReadMemoryByAddressClass, DiagnosticReadScalingDataByIdentifierClass, DiagnosticRequestControlOfOnBoardDeviceClass, DiagnosticRequestCurrentPowertrainDataClass, DiagnosticRequestDownloadClass, DiagnosticRequestEmissionRelatedDTCClass,DiagnosticRequestEmissionRelatedDTCPermanentStatusClass, DiagnosticRequestFileTransferClass,DiagnosticRequestOnBoardMonitoringTestResultsClass, DiagnosticRequestPowertrainFreezeFrameDataClass, DiagnosticRequestUploadClass, DiagnosticRequestVehiclelnfoClass, DiagnosticResponseOnEventClass, DiagnosticRoutineControlClass, DiagnosticSecurityAccessClass, DiagnosticSessionControlClass, DiagnosticTransferExitClass, DiagnosticWriteDataByldentifierClass, DiagnosticWriteMemoryByAddressClass</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">accessPermission</td><td colspan="1" rowspan="1">DiagnosticAccessPermission</td><td colspan="1" rowspan="1">0..1</td><td colspan="1" rowspan="1">ref</td><td colspan="1" rowspan="1">This represents the collection of DiagnosticAccessPermissions that allow for the execution of the referencingDiagnosticServiceClass.</td></tr><tr><td colspan="1" rowspan="1">accessPermissionValidity</td><td colspan="1" rowspan="1">DiagnosticAccessPermissionValidityEnum</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">This attribute is responsible for clarifying the validity of theaccessPermission reference.</td></tr></table>

Table A.73: DiagnosticSecurityLevelInterface

Table A.74: DiagnosticServiceClass

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceDataldentifierPortMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::DiagnosticDesign::DiagnosticMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class provides the ability to define a diagnostic access to an entire DID.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticServiceMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,DiagnosticSwMapping, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticDataIdentifier</td><td rowspan=1 colspan=1>DiagnosticDataldentifier</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the applicable DiagnosticDataIdentfiier.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>process</td><td rowspan=1 colspan=1>ProcessDesign</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to the representation of a Process that isrequired because the mapping could be different fordifferent Processes referring to a specific Executable.Stereotypes: atpSplitableTags:atp.Splitkey=processatp.Status=draft</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceDataldentifierPortMapping</td></tr><tr><td rowspan=1 colspan=1>swcServiceDependencylnExecutable</td><td rowspan=1 colspan=1>SwcServiceDependency</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>iref</td><td rowspan=1 colspan=1>This reference identifies the applicable SwcServiceDependency. The reference has the ability to point intothe component hierarchy (under possible consideration ofthe rootSoftwareComposition).Tags:atp.Status=draft</td></tr></table>

Table A.75: DiagnosticServiceDataIdentifierPortMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceDataMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::ServiceMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents the ability to define a mapping of a diagnostic service to a software-component.This kind of service mapping is applicable for the usage of SenderReceiverlnterfaces or event/notifiersemantics in Servicelnterfaces on the adaptive platform.Tags:atp.recommendedPackage=DiagnosticServiceMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticDataElement</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the applicable payload that correspondsto the referenced DataPrototype in the role mappedDataElement or (in case of a usage on the adaptive platform)mappedApDataElement.</td></tr><tr><td rowspan=1 colspan=1>mappedApDataElement</td><td rowspan=1 colspan=1>DataPrototype</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>iref</td><td rowspan=1 colspan=1>This represents the dataElement in the applicationsoftware of an adaptive AUTOSAR application that isaccessed for diagnostic purpose.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>mappedDataElement</td><td rowspan=1 colspan=1>DataPrototype</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>iref</td><td rowspan=1 colspan=1>This represents the dataElement in the applicationsoftware that is accessed for diagnostic purpose. Thisrole is applicable on the classic platform.</td></tr><tr><td rowspan=1 colspan=1>process</td><td rowspan=1 colspan=1>ProcessDesign</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to the representation of a Process that isrequired because the mapping could be different fordifferent Processes referring to a specific Executable.Stereotypes: atpSplitableTags:atp.Splitkey=processatp.Status=draft</td></tr></table>

Table A.76: DiagnosticServiceDataMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=1>DiagnosticServicelnstance (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::CommonService</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>This represents a concrete instance of a diagnostic service.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=1>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=1>DiagnosticClearDiagnosticInformation, DiagnosticClearResetEmissionRelatedInfo, DiagnosticComControl, DiagnosticControlDTCSetting, DiagnosticCustomServicelnstance, DiagnosticDataByldentifier,DiagnosticDynamicallyDefineDataldentifier, DiagnosticEcuReset, DiagnosticlOControl, DiagnosticMemoryByAddress, DiagnosticReadDTCInformation, DiagnosticReadDataByPeriodicID, Diagnostic∇</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServicelnstance (abstract)</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>△RequestControlOfOnBoardDevice, DiagnosticRequestCurrentPowertrainData, DiagnosticRequestEmissionRelatedDTC, DiagnosticRequestEmissionRelatedDTCPermanentStatus, DiagnosticRequestFileTransfer, DiagnosticRequestOnBoardMonitoringTestResults, DiagnosticRequestPowertrainFreezeFrameData, DiagnosticRequestVehiclelnfo, DiagnosticResponseOnEvent, DiagnosticRoutineControl,DiagnosticSecurityAccess, DiagnosticSessionControl</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>accessPermission</td><td rowspan=1 colspan=1>DiagnosticAccessPermission</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the collection of DiagnosticAccessPermissions that allow for the execution of the referencingDiagnosticServicelnstance..</td></tr><tr><td rowspan=1 colspan=1>serviceClass</td><td rowspan=1 colspan=1>DiagnosticServiceClass</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the corresponding &quot;class&quot;, i.e. thismeta-class provides properties that are shared among allinstances of applicable sub-classes of DiagnosticServiceInstance.The subclasses that affected by this pattern implementreferences to the applicable &quot;class&quot;-role that substantiatethis abstract reference.Stereotypes: atpAbstract</td></tr></table>

Table A.77: DiagnosticServiceInstance

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceSwMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::ServiceMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents the ability to define a mapping of a diagnostic service to a software-component or abasic-software module. If the former is used then this kind of service mapping is applicable for the usageof ClientServerInterfaces.Tags:atp.recommendedPackage=DiagnosticServiceMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,DiagnosticSwMapping, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>diagnosticDataElement</td><td rowspan=1 colspan=1>DiagnosticDataElement</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents a DiagnosticDataElement required toexecute the respective diagnostic service in the context ofthe diagnostic service mapping,</td></tr><tr><td rowspan=1 colspan=1>mappedBswServiceDependency</td><td rowspan=1 colspan=1>BswServiceDependencyldent</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This is supposed to represent a reference to a BswServiceDependency. the latter is not derived fromReferrable and therefore this detour needs to beimplemented to still let BswServiceDependency becomethe target of a reference.</td></tr><tr><td rowspan=1 colspan=1>mappedFlatSwcServiceDependency</td><td rowspan=1 colspan=1>SwcServiceDependency</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the ability to refer to an AtomicSwComponentType that is available without the definition ofhow it will be embedded into the component hierarchy.</td></tr><tr><td rowspan=1 colspan=1>mappedSwcServiceDependencyInExecutable</td><td rowspan=1 colspan=1>SwcServiceDependency</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>iref</td><td rowspan=1 colspan=1>This represents the ability to point into the componenthiearchy of an adaptive AUTOSAR model (under possibleconsideration of the rootSoftwareComposition)Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>mappedSwcServiceDependencyInSystem</td><td rowspan=1 colspan=1>SwcServiceDependency</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>iref</td><td rowspan=1 colspan=1>This represents the ability to point into the componenthiearchy (under possible consideration of the rootSoftwareComposition)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceSwMapping</td></tr><tr><td rowspan=1 colspan=1>process</td><td rowspan=1 colspan=1>ProcessDesign</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to the representation of a Process that isrequired because the mapping could be different fordifferent Processes referring to a specific Executable.Stereotypes: atpSplitableTags:atp.Splitkey=processatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>servicelnstance</td><td rowspan=1 colspan=1>DiagnosticServiceInstance</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the service instance that needs to beconsidered in this diagnostics service mapping.</td></tr></table>

Table A.78: DiagnosticServiceSwMapping

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticServiceValidationInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to process requests for servicevalidation on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.79: DiagnosticServiceValidationInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticSession</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to define a diagnostic session.Tags:atp.recommendedPackage=DiagnosticSessions</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>id</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This is the numerical identifier used to identify theDiagnosticSession in the scope of diagnostic workflow</td></tr><tr><td rowspan=1 colspan=1>p2ServerMax</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This is the session value for P2ServerMax in seconds(per Session Control).The AUTOSAR configuration standard is to use SI units,so this parameter is defined as a float value in seconds.</td></tr><tr><td rowspan=1 colspan=1>p2StarServerMax</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This is the session value for P2*ServerMax in seconds(per Session Control).The AUTOSAR configuration standard is to use SI units,so this parameter is defined as a float value in seconds.</td></tr></table>

Table A.80: DiagnosticSession

<table><tr><td rowspan=1 colspan=1>Enumeration</td><td rowspan=1 colspan=1>DiagnosticStatusBitHandlingTestFailedSinceLastClearEnum</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::DiagnosticCommonProps</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>Aging and displacement has no impact on the &quot;TestFailedSinceLastClear&quot; status bits.</td></tr><tr><td rowspan=1 colspan=1>Literal</td><td rowspan=1 colspan=1>Description</td></tr><tr><td rowspan=1 colspan=1>statusBitAgingAndDisplacement</td><td rowspan=1 colspan=1>Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td rowspan=1 colspan=1>statusBitNormal</td><td rowspan=1 colspan=1>Tags:atp.EnumerationLiterallndex=1</td></tr></table>

Table A.81: DiagnosticStatusBitHandlingTestFailedSinceLastClearEnum

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeGroup</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>The diagnostic trouble code group defines the DTCs belonging together and thereby forming a group.Tags:atp.recommendedPackage=DiagnosticTroubleCodes</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>dtc</td><td rowspan=1 colspan=1>DiagnosticTroubleCode</td><td rowspan=1 colspan=1>￥</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the collection of DiagnosticTroubleCodesdefined by this DiagnosticTroubleCodeGroup.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=dtc, variationPoint.shortLabelvh.latestBindingTime=postBuild</td></tr><tr><td rowspan=1 colspan=1>groupNumber</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the base number of the DTC group.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr></table>

Table A.82: DiagnosticTroubleCodeGroup

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeProps</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This element defines common Dtc properties that can be reused by different non OBD-relevant DTCs.Tags:atp.recommendedPackage=DiagnosticTroubleCodePropss</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>aging</td><td rowspan=1 colspan=1>DiagnosticAging</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Reference to an aging algorithm in case that an aging/unlearning of the event is allowed.</td></tr><tr><td rowspan=1 colspan=1>agingAllowed</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the decision whether aging is allowed forthis DiagnosticTroubleCodeProps.</td></tr><tr><td rowspan=1 colspan=1>environmentCaptureToReporting</td><td rowspan=1 colspan=1>EnvironmentCaptureToReportingEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute determines the point in time, when the dataactually is captured.</td></tr><tr><td rowspan=1 colspan=1>extendedDataRecord</td><td rowspan=1 colspan=1>DiagnosticExtendedDataRecord</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Defines the links to an extended data class sampler.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=extendedDataRecord, variationPoint.shortLabelvh.IatestBindingTime=preCompileTime</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeProps</td></tr><tr><td rowspan=1 colspan=1>freezeFrame</td><td rowspan=1 colspan=1>DiagnosticFreezeFrame</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Define the links to a freeze frame class sampler.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=freezeFrame, variationPoint.shortLabelvh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>immediateNvDataStorage</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Switch to enable immediate storage triggering of anaccording event memory entry persistently to NVRAM.true: immediate non-volatile storage triggering enabledfalse: immediate non-volatile storage triggering disabled</td></tr><tr><td rowspan=1 colspan=1>legislatedFreezeFrameContentWwhObd</td><td rowspan=1 colspan=1>DiagnosticDataldentifierSet</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies the layout of the WWH-OBDfreeze frame.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>maxNumberFreezeFrameRecords</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the number of according freezeframe records, which can maximal be stored for thisevent. Therefore all these freeze frame records have thesame freeze frame class.</td></tr><tr><td rowspan=1 colspan=1>memoryDestination</td><td rowspan=1 colspan=1>DiagnosticMemoryDestination</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>The event destination assigns events to none, one ormultiple origins.</td></tr><tr><td rowspan=1 colspan=1>priority</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Priority of the event, in view of full event buffer. A lowervalue means higher priority.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>significance</td><td rowspan=1 colspan=1>DiagnosticSignificanceEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Significance of the event, which indicates additionalinformation concerning fault classification and resolution.</td></tr><tr><td rowspan=1 colspan=1>snapshotRecordContent</td><td rowspan=1 colspan=1>DiagnosticDataldentifierSet</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This represents the freeze frame layout as a set of DIDs.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr></table>

Table A.83: DiagnosticTroubleCodeProps

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeUds</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This element is used to describe non OBD-relevant DTCs.Tags:atp.recommendedPackage=DiagnosticTroubleCodes</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticTroubleCode,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>considerPtoStatus</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute describes the affection of the event by theDem PTO handling.True: the event is affected by the Dem PTO handling.False: the event is not affected by the Dem PTO handling.</td></tr><tr><td rowspan=1 colspan=1>dtcProps</td><td rowspan=1 colspan=1>DiagnosticTroubleCodeProps</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Defined properties associated with the DemDTC.</td></tr><tr><td rowspan=1 colspan=1>eventObdReadinessGroup</td><td rowspan=1 colspan=1>NameToken</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute specifies the Event OBD Readiness groupfor PID $01 and PID $41 computation. This attribute isonly applicable for emission-related ECUs.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeUds</td></tr><tr><td rowspan=1 colspan=1>functionalUnit</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute specifies a 1-byte value which identifies thecorresponding basic vehicle / system function whichreports the DTC. This parameter is necessary for thereport of severity information.</td></tr><tr><td rowspan=1 colspan=1>severity</td><td rowspan=1 colspan=1>DiagnosticUdsSeverityEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>DTC severity according to ISO 14229-1.</td></tr><tr><td rowspan=1 colspan=1>udsDtcValue</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Unique Diagnostic Trouble Code value for UDS.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>wwhObdDtcClass</td><td rowspan=1 colspan=1>DiagnosticWwhObdDtcClassEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute is used to identify (if applicable) thecorresponding severity class of an WWH-OBD DTC.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr></table>

Table A.84: DiagnosticTroubleCodeUds

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticTroubleCodeUdsToClearConditionGroupMapping</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::DiagnosticDesign::DiagnosticClearCondition</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class provides the ability to map a DiagnosticClearConditionGroup to a collection of DiagnosticTroubleCodeUds.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticMappings</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticMapping,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>clearConditionGroup</td><td rowspan=1 colspan=1>DiagnosticClearConditionGroup</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Thi reference identifies the applicable DiagnosticClearConditionGroup.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>troubleCodeUds</td><td rowspan=1 colspan=1>DiagnosticTroubleCodeUds</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies the DiagnosticTroubleCodeUdsthat are relevant for the mapping.Tags:atp.Status=draft</td></tr></table>

Table A.85: DiagnosticTroubleCodeUdsToClearConditionGroupMapping

<table><tr><td rowspan=1 colspan=1>Enumeration</td><td rowspan=1 colspan=1>DiagnosticTypeOfFreezeFrameRecordNumerationEnum</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::DiagnosticExtract::Dem::DiagnosticTroubleCode</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>FreezeFrame record numeration type</td></tr><tr><td rowspan=1 colspan=1>Literal</td><td rowspan=1 colspan=1>Description</td></tr><tr><td rowspan=1 colspan=1>calculated</td><td rowspan=1 colspan=1>Freeze frame records will be numbered consecutive starting by 1 in their chronological order.Tags:atp.EnumerationLiterallndex=0</td></tr><tr><td rowspan=1 colspan=1>configured</td><td rowspan=1 colspan=1>Freeze frame records will be numbered based on the given configuration in their chronological order.Tags:atp.EnumerationLiterallndex=1</td></tr></table>

Table A.86: DiagnosticTypeOfFreezeFrameRecordNumerationEnum

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticUploadInterface</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface::DiagnosticPortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to implement a PortInterface to process requests for uploadingdata using diagnostic channels on the adaptive platform.Tags:atp.Status=draftatp.recommendedPackage=DiagnosticPortInterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,DiagnosticPortInterface, Identifiable, MultilanguageReferrable, PackageableElement, PortInterface,Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

Table A.87: DiagnosticUploadInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DiagnosticWriteDataByldentifier</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::DiagnosticExtract::Dcm::DiagnosticService::DataByldentifier</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents an instance of the &quot;Write Data by Identifier&quot; diagnostic service.Tags:atp.recommendedPackage=DiagnosticDataByldentifiers</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, CollectableElement, DiagnosticCommonElement, DiagnosticDataByldentifier,DiagnosticServiceInstance, Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>writeClass</td><td rowspan=1 colspan=1>DiagnosticWriteDataByIdentifierClass</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference substantiates that abstract reference in therole serviceClass for this specific concrete class.Thereby, the reference represents the ability to accessshared attributes among all DiagnosticWriteDataByIdentifier in the given context.</td></tr></table>

Table A.88: DiagnosticWriteDataByIdentifier

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DolpNetworkConfiguration</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::PlatformModuleDeployment::AdaptiveModuleImplementation</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This element collects DolP properties that are network interface specific.Tags:atp.ManifestKind=MachineManifestatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>eidUseMac</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines whther the MAC of the networkinterface is used as eid. True: MAC is used False: eidneeds to be configured manually by Dolplnstantiation.eid.</td></tr><tr><td rowspan=1 colspan=1>isActivationLineDependent</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines whether the network interface• is started &quot;on-demand&quot; when an activation line issensed or• is always available.</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>DolpNetworkConfiguration</td></tr><tr><td rowspan=1 colspan=1>maxInitialVehicleAnnouncementTime</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Upper bound for the time to wait in [s] for sending firstvehicle anouncement message after IP addressassignment. Represents parameter A_DolP_Announce_Wait of ISO 13400-2:2012. The value of this timing shallbe determined randomly in the closed interval [0..maxInitialVehicleAnnouncementTime].</td></tr><tr><td rowspan=1 colspan=1>maxTesterConnections</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Maximum amount of tester connections that shall bemaintained at one time before alive check is performed.</td></tr><tr><td rowspan=1 colspan=1>networkConfiguration</td><td rowspan=1 colspan=1>EthernetNetworkConfiguration</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Network configuration (Protocol, Port, IP Address) fortransmission of DolP messages on a specific VLAN.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>networkInterfaceld</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute defines the identifier for the DolPInterface.</td></tr><tr><td rowspan=1 colspan=1>tcpAliveCheckResponseTimeout</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Timeout in [s] for waiting for a response to an Alive Checkrequest before the connection is considered to bedisconnected. Represents parameter T_TCP_AliveCheckof ISO 13400-2:2012.</td></tr><tr><td rowspan=1 colspan=1>tcpGeneralInactivityTime</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Timeout in [s] for maximum inactivity of a TCP socketconnection before the DolP module will close theaccording socket connection. Represents parameter T_TCP_General_Inactivity of ISO 13400-2:2012.</td></tr><tr><td rowspan=1 colspan=1>tcpInitialInactivityTime</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Timeout in [s] used for initial inactivity of a connectedTCP socket connection directly after socket connection.Represents parameter T_TCP_Initial_Inactivity of ISO13400-2:2012.</td></tr><tr><td rowspan=1 colspan=1>vehicleAnnouncementCount</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Number of vehicle announcement messages on IPaddress assignment. Represents parameter A_DolP_Announce_Num of ISO 13400-2:2012.</td></tr><tr><td rowspan=1 colspan=1>vehicleAnnouncementInterval</td><td rowspan=1 colspan=1>TimeValue</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Time to wait in [s] for sending subsequent vehicleanouncement messages. Represents parameter A_DoIP_Announce_Interval of ISO 13400-2:2012.</td></tr><tr><td rowspan=1 colspan=1>vehicleIdentificationSyncStatus</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Defines if the optional VIN/GID synchronization status isused additionally in the vehicle identification/announcement.</td></tr></table>

Table A.89: DoIpNetworkConfiguration

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="1" rowspan="1">Identifiable (abstract)</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="1" rowspan="1">M2::AUTOSARTemplates::GenericStructure::GeneralTemplateClasses::Identifiable</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="1" rowspan="1">Instances of this class can be referred to by their identifier (within the namespace borders). In addition tothis, Identifiables are objects which contribute significantly to the overall structure of an AUTOSARdescription. In particular, Identifiables might contain Identifiables.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="1" rowspan="1">ARObject, MultilanguageReferrable, Referrable</td></tr><tr><td colspan="1" rowspan="1">Subclasses</td><td colspan="1" rowspan="1">ARPackage, AbstractEvent, AbstractImplementationDataTypeElement, AbstractServicelnstance,AbstractSignalBasedTolSignalTriggeringMapping, AdaptiveModuleInstantiation, AdaptiveSwclnternalBehavior, ApplicationEndpoint, ApplicationError, ApplicationPartitionToEcuPartitionMapping,AsynchronousServerCallResultPoint, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpFeature, AutosarOperationArgumentInstance, AutosarVariablelnstance, BswInternalTriggeringPoint, BswModuleDependency, BuildActionEntity, BuildActionEnvironment, CanTpAddress, CanTpChannel, CanTpNode,Chapter, CheckpointTransition, ClassContentConditional, ClientIdDefinition, ClientServerOperation,Code, CollectableElement, ComManagementMapping, CommConnectorPort, CommunicationConnector, CommunicationController, Compiler, ConsistencyNeeds, ConsumedEventGroup, Coupling∇</td></tr><tr><td>SecureCommunicationDeployment, SecureCommunicationFreshnessProps, ServerCallPoint, Service EventDeployment, ServiceFieldDeployment, ServicelnstanceToSignalMapping, ServicelnterfaceElement Mapping, ServicelnterfaceElementSecureComConfig, ServicelnterfaceMapping, ServiceMethod</td><td>△ Port, CouplingPortStructuralElement, CryptoKeySlot, CryptoServiceMapping, DataPrototypeGroup, Data Transformation, DdsRpcServiceDeployment, DependencyOnArtifact, DeterministicClientResourceNeeds. DiagEventDebounceAlgorithm, DiagnosticConnectedIndicator, DiagnosticDataElement, Diagnostic FunctionInhibitSource, DiagnosticMasterToSlaveEventMapping, DiagnosticRoutineSubfunction, DIt Argument, DItLogChannel, DItMessage, DolpInterface, DolpLogicAddress, E2EProfileConfiguration, EC UMapping, EOCExecutableEntityRefAbstract, EcuPartition, EcucContainerValue, EcucDefinition Element, EcucDestinationUriDef, EcucEnumerationLiteralDef, EcucQuery, EcucValidationCondition, End2EndEventProtectionProps, EndToEndProtection, EventMapping, ExclusiveArea, ExecutableEntity, ExecutionTime, FMAttributeDef, FMFeatureMapAssertion, FMFeatureMapCondition, FMFeatureMap Element, FMFeatureRelation, FMFeatureRestriction, FMFeatureSelection, FieldMapping, FireAndForget Mapping, FlatInstanceDescriptor, FlexrayArTpNode, FlexrayTpConnectionControl, FlexrayTpNode, FlexrayTpPduPool, FrameTriggering, GeneralParameter, GlobalTimeGateway, Globa/TimeMaster, Globa/TimeSlave, HealthChannel, HeapUsage, HwAttributeDef, HwAttributeLiteralDef, HwPin, HwPin Group, IPSecRule, IPv6ExtHeaderFilterList, ISignalTolPduMapping, ISignalTriggering, IdentCaption, InterfaceMapping, InternalTriggeringPoint, J1939SharedAddressCluster, J1939TpNode, Keyword, Life CycleState, LinScheduleTable, LinTpNode, Linker, MacMulticastGroup, McDatalnstance, Memory Section, MethodMapping, ModeDeclaration, ModeDeclarationMapping, ModeSwitchPoint, Network Endpoint, NmCluster, NmNode, NvBlockDescriptor, PackageableElement, ParameterAccess, PduTo FrameMapping, PduTriggering, PerlnstanceMemory, PersistencyFileProxy, PersistencyKeyValuePair, PhmActionltem, PhmActionList, PhmLogicalExpression, PhmRule, PhmSupervision, PhysicalChannel, PortGroup, PortInterfaceMapping, PossibleErrorReaction, ProcessDesignToMachineDesignMapping, ProcessToMachineMapping, Processor, ProcessorCore, PskIdentityToKeySlotMapping, RawDataStream MethodDeployment, ResourceConsumption, ResourceGroup, RestAbstractEndpoint, RestElementDef, RestResourceDef, RootSwClusterDesignComponentPrototype, RootSwComponentPrototype, RootSw CompositionPrototype, RptComponent, RptContainer, RptExecutableEntity, RptExecutableEntityEvent, RptExecutionContext, RptProfile, RptServicePoint, RunnableEntityGroup, SdgAttribute, SdgClass, Sec OcJobMapping, SecOcJobRequirement, SecureComProps, SecureCommunicationAuthenticationProps</td></tr><tr><td>Attribute adminData</td><td>VariableAccess, VariationPointProxy, VehicleRolloutStep, ViewMap, VlanConfig, WaitPoint Type Mult. Kind 0..1 aggr AdminData</td></tr><tr><td>annotation Annotation</td><td>This represents the administrative data for the identifiable object. Tags:xml.sequenceOffset=-40 ★ aggr Possibility to provide additional notes while defining a</td></tr><tr><td>category CategoryString</td><td>model element (e.g. the ECU Configuration Parameter Values). These are not intended as documentation but are mere design notes. Tags:xml.sequenceOffset=-25 0..1 attr The category is a keyword that specializes the semantics of the Identifiable. It affects the expected existence of</td></tr></table>


<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>Identifiable (abstract)</td></tr><tr><td rowspan=1 colspan=1>desc</td><td rowspan=1 colspan=1>MultiLanguageOverviewParagraph</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents a general but brief (one paragraph)description what the object in question is about. It is onlyone paragraph! Desc is intended to be collected intooverview tables. This property helps a human reader toidentify the object in question.More elaborate documentation, (in particular how theobject is built or used) should go to &quot;introduction&quot;.Tags:xml.sequenceOffset=-60</td></tr><tr><td rowspan=1 colspan=1>introduction</td><td rowspan=1 colspan=1>DocumentationBlock</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents more information about how the object inquestion is built or is used. Therefore it is aDocumentationBlock.Tags:xml.sequenceOffset=-30</td></tr><tr><td rowspan=5 colspan=1>uuid</td><td rowspan=5 colspan=1>String</td><td rowspan=5 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=5 colspan=1>The purpose of this attribute is to provide a globallyunique identifier for an instance of a meta-class. Thevalues of this attribute should be globally unique stringsprefixed by the type of identifier. For example, to include aDCE UUID as defined by The Open Group, the UUIDwould be preceded by &quot;DCE:&quot;. The values of this attributemay be used to support merging of different AUTOSARmodels. The form of the UUID (Universally UniqueIdentifier) is taken from a standard defined by the OpenGroup (was Open Software Foundation). This standard iswidely used, including by Microsoft for COM (GUIDs) andby many companies for DCE, which is based on CORBA.The method for generating these 128-bit IDs is publishedin the standard and the effectiveness and uniqueness ofthe IDs is not in practice disputed. If the id namespace isomitted, DCE is assumed. An example is&quot;DCE:2fac1234-31f8-11b4-a222-08002b34c003&quot;. Theuuid attribute has no semantic meaning for an AUTOSARmodel and there is no requirement for AUTOSAR tools tomanage the timestamp.Tags:xml.attribute=true</td></tr><tr><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td></tr></table>

Table A.90: Identifiable

<table><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">ImplementationProps (abstract)</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::CommonStructure::Implementation</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Defines a symbol to be used as (depending on the concrete case) either a complete replacement or aprefix when generating code artifacts.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, Referrable</td></tr><tr><td colspan="1" rowspan="1">Subclasses</td><td colspan="4" rowspan="1">BswSchedulerNamePrefix, ExecutableEntityActivationReason, SectionNamePrefix, SymbolProps,SymbolicNameProps</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">symbol</td><td colspan="1" rowspan="1">Cldentifier</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">attr</td><td colspan="1" rowspan="1">The symbol to be used as (depending on the concretecase) either a complete replacement or a prefix.</td></tr><tr><td colspan="1" rowspan="1">Class</td><td colspan="4" rowspan="1">PPortPrototype</td></tr><tr><td colspan="1" rowspan="1">Package</td><td colspan="4" rowspan="1">M2::AUTOSARTemplates::SWComponentTemplate::Components</td></tr><tr><td colspan="1" rowspan="1">Note</td><td colspan="4" rowspan="1">Component port providing a certain port interface.</td></tr><tr><td colspan="1" rowspan="1">Base</td><td colspan="4" rowspan="1">ARObject, AbstractProvidedPortPrototype, AtpBlueprintable, AtpFeature, AtpPrototype, Identifiable,MultilanguageReferrable, PortPrototype, Referrable</td></tr><tr><td colspan="1" rowspan="1">Attribute</td><td colspan="1" rowspan="1">Type</td><td colspan="1" rowspan="1">Mult.</td><td colspan="1" rowspan="1">Kind</td><td colspan="1" rowspan="1">Note</td></tr><tr><td colspan="1" rowspan="1">providedInterface</td><td colspan="1" rowspan="1">PortInterface</td><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">tref</td><td colspan="1" rowspan="1">The interface that this port provides.Stereotypes: isOfType</td></tr></table>

Table A.91: ImplementationProps

Table A.92: PPortPrototype

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>PortInterface (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::SWComponentTemplate::PortInterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Abstract base class for an interface that is either provided or required by a port of a software component.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,Identifiable, MultilanguageReferrable, PackageableElement, Referrable</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>ClientServerInterface, Compositelnterface, Datalnterface, DiagnosticPortInterface, ModeSwitchInterface,PersistencyInterface, PlatformHealthManagementInterface, RawDataStreamInterface, RestServiceInterface, Servicelnterface, TimeSynchronizationInterface, TriggerInterface</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>namespace(ordered)</td><td rowspan=1 colspan=1>SymbolProps</td><td rowspan=1 colspan=1>*</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the SymbolProps used for the definitionof a hierarchical namespace applicable for the generationof code artifacts out of the definition of a Servicelnterface.Stereotypes: atpSplitableTags:atp.Splitkey=shortNameatp.Status=draft</td></tr></table>

Table A.93: PortInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>RPortPrototype</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::SWComponentTemplate::Components</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Component port requiring a certain port interface.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, AbstractRequiredPortPrototype, AtpBlueprintable, AtpFeature, AtpPrototype, Identifiable,MultilanguageReferrable, PortPrototype, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>requiredInterface</td><td rowspan=1 colspan=1>PortInterface</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>tref</td><td rowspan=1 colspan=1>The interface that this port requires.Stereotypes: isOfType</td></tr></table>

Table A.94: RPortPrototype

| Class | Servicelnterface |
| --- | --- |
| Package | M2::AUTOSARTemplates::AdaptivePlatform::ApplicationDesign::PortInterface |

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>Servicelnterface</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This represents the ability to define a PortInterface that consists of a heterogeneous collection ofmethods, events and fields.Tags:atp.Status=draftatp.recommendedPackage=Servicelnterfaces</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARElement, ARObject, AtpBlueprint, AtpBlueprintable, AtpClassifier, AtpType, CollectableElement,Identifiable, MultilanguageReferrable, PackageableElement, PortInterface, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>event</td><td rowspan=1 colspan=1>VariableDataPrototype</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the collection of events defined in thecontext of a Servicelnterface.Stereotypes: atpVariationTags:atp.Status=draftvh.latestBindingTime=blueprintDerivationTimexml.sequenceOffset=30</td></tr><tr><td rowspan=1 colspan=1>field</td><td rowspan=1 colspan=1>Field</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the collection of fields defined in thecontext of a Servicelnterface.Stereotypes: atpVariationTags:atp.Status=draftvh.latestBindingTime=blueprintDerivationTimexml.sequenceOffset=40</td></tr><tr><td rowspan=1 colspan=1>majorVersion</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Major version of the service contract.Tags:atp.Status=draftxml.sequenceOffset=10</td></tr><tr><td rowspan=1 colspan=1>method</td><td rowspan=1 colspan=1>ClientServerOperation</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This represents the collection of methods defined in thecontext of a Servicelnterface.Stereotypes: atpVariationTags:atp.Status=draftvh.latestBindingTime=blueprintDerivationTimexml.sequenceOffset=50</td></tr><tr><td rowspan=1 colspan=1>minorVersion</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Minor version of the service contract.Tags:atp.Status=draftxml.sequenceOffset=20</td></tr></table>

Table A.95: ServiceInterface

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=1>SoftwareCluster</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=1>M2::AUTOSARTemplates::AdaptivePlatform::UploadableSoftwarePackage</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=1>This meta-class represents the ability to define an uploadable software-package, i.e. the SoftwareClustershall contain all software and configuration for a given purpose.Tags:atp.ManifestKind=SoftwareDistributionatp.Status=draftatp.recommendedPackage=SoftwareClusters</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=1>ARElement, ARObject, CollectableElement, Identifiable, MultilanguageReferrable, PackageableElement, Referrable, SoftwareActivationDependency</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SoftwareCluster</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>containedARElement</td><td rowspan=1 colspan=1>ARElement</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the collection of modelelements that cannot derive from UploadablePackageElement and that contribute to the completeness of thedefinition of the SoftwareCluster.Stereotypes: atpSplitableTags:atp.Splitkey=containedARElementatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>containedFibexElement</td><td rowspan=1 colspan=1>FibexElement</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This allows for referencing FibexElements that need to beconsidered in the context of a SoftwareCluster.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>containedPackageElement</td><td rowspan=1 colspan=1>UploadablePackageElement</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies model elements that are requiredto complete the manifest content.Stereotypes: atpSplitableTags:atp.Splitkey=containedPackageElementatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>containedProcess</td><td rowspan=1 colspan=1>Process</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represent the processes contained in theenclosing SoftwareCluster.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>design</td><td rowspan=1 colspan=1>SoftwareClusterDesign</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the identification of all SoftwareClusterDesigns applicable for the enclosing SoftwareCluster.Stereotypes: atpUriDefTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>diagnosticAddress</td><td rowspan=1 colspan=1>SoftwareClusterDiagnosticAddress</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This aggregation represents the collection of diagnosticaddresses that apply for the SoftwareCluster.Stereotypes: atpSplitableTags:atp.Splitkey=diagnosticAddressatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>diagnosticExtract</td><td rowspan=1 colspan=1>DiagnosticContributionSet</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference represents the definition of the diagnosticextract applicable to the referencing SoftwareClusterTags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>license</td><td rowspan=1 colspan=1>Documentation</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This attribute allows for the inclusion of the the full text ofa license of the enclosing SoftwareCluster. In many casesopen source licenses require the inclusion of the fulllicense text to any software that is released under therespective license.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>moduleInstantiation</td><td rowspan=1 colspan=1>AdaptiveModuleInstantiation</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies AdaptiveModulelnstantiationsthat need to be included with the SoftwareCluster in orderto establish infrastructure required for the installation ofthe SoftwareCluster.Stereotypes: atpSplitableTags:atp.Splitkey=modulelnstantiationatp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>releaseNotes</td><td rowspan=1 colspan=1>Documentation</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This attribute allows for the explanations of changes sincethe previous version. The list of changes might requirethe creation of multiple paragraphs of test.Tags:atp.Status=draft</td></tr></table>


<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SoftwareCluster</td></tr><tr><td rowspan=1 colspan=1>subSoftwareCluster</td><td rowspan=1 colspan=1>SoftwareCluster</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference is used to identify the sub-SoftwareClusters of an &quot;umbrella&quot; SoftwareCluster.Stereotypes: atpSplitableTags:atp.Splitkey=subSoftwareClusteratp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>typeApproval</td><td rowspan=1 colspan=1>String</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute carries the homologation information thatmay be specific for a given country.</td></tr><tr><td rowspan=1 colspan=1>vendorld</td><td rowspan=1 colspan=1>Positivelnteger</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Vendor ID of this Implementation according to theAUTOSAR vendor list.</td></tr><tr><td rowspan=1 colspan=1>vendorSignature</td><td rowspan=1 colspan=1>CryptoServiceCertificate</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference identifies the certificate that represents thevendor&#x27;s signature.Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>version</td><td rowspan=1 colspan=1>StrongRevisionLabelString</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute can be used to describe a versioninformation for the enclosing SoftwareCluster.</td></tr></table>

Table A.96: SoftwareCluster

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SoftwareClusterDiagnosticAddress (abstract)</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::AdaptivePlatform::UploadableSoftwarePackage</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to define a diagnostic address in an abstract form. Sub-classes aresupposed to clarify how the diagnostic address shall be defined according to the applicable addressingscheme (DolP vs. CAN TP vs. ...).Tags:atp.Status=draft</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject</td></tr><tr><td rowspan=1 colspan=1>Subclasses</td><td rowspan=1 colspan=4>SoftwareClusterDoipDiagnosticAddress</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>addressSemantics</td><td rowspan=1 colspan=1>SoftwareClusterDiagnosticAddressSemanticsEnum</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute clarifies whether the address value shall beinterpreted as a physical or a functional address.</td></tr></table>

Table A.97: SoftwareClusterDiagnosticAddress

<table><tr><td>Enumeration</td><td>SoftwareClusterDiagnosticAddressSemanticsEnum</td></tr><tr><td>Package</td><td>M2::AUTOSARTemplates::AdaptivePlatform::UploadableSoftwarePackage</td></tr><tr><td>Note</td><td>This meta-class defines a list of semantics for the interpretation of diagnostic addresses in the context of a SoftwareCluster.</td></tr><tr><td>Literal</td><td>Tags: atp.ManifestKind=SoftwareDistribution atp.Status=draft</td></tr><tr><td>functionalAddress</td><td>Description</td></tr><tr><td rowspan="2"></td><td>This address represents a functional address.</td></tr><tr><td>Tags:atp.EnumerationLiterallndex=1</td></tr></table>

| Enumeration | SoftwareClusterDiagnosticAddressSemanticsEnum |
| --- | --- |
| physicalAddress | This address represents a physical address. |
|  | Tags:atp.EnumerationLiterallndex=0 |

Table A.98: SoftwareClusterDiagnosticAddressSemanticsEnum

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt;SwDataDefProps</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::MSR::DataDictionary::DataDefProperties</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This class is a collection of properties relevant for data objects under various aspects. One couldconsider this class as a &quot;pattern of inheritance by aggregation&quot;. The properties can be applied to allobjects of all classes in which SwDataDefProps is aggregated.Note that not all of the attributes or associated elements are useful all of the time. Hence, the processdefinition (e.g. expressed with an OCL or a Document Control Instance MSR-DCl) has the task ofimplementing limitations.SwDataDefProps covers various aspects:• Structure of the data element for calibration use cases: is it a single value, a curve, or a map, butalso the recordLayouts which specify how such elements are mapped/converted to the DataTypes in the programming language (or in AUTOSAR). This is mainly expressed by propertieslike swRecordLayout and swCalprmAxisSet• Implementation aspects, mainly expressed by swImplPolicy, swVariableAccessImplPolicy, swAddrMethod, swPointerTagetProps, baseType, implementationDataType and additionalNativeTypeQualifier• Access policy for the MCD system, mainly expressed by swCalibrationAccess• Semantics of the data element, mainly expressed by compuMethod and/or unit, dataConstr,invalidValue• Code generation policy provided by swRecordLayoutTags:vh.latestBindingTime=codeGenerationTime</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>additionalNativeTypeQualifier</td><td rowspan=1 colspan=1>NativeDeclarationString</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute is used to declare native qualifiers of theprogramming language which can neither be deducedfrom the baseType (e.g. because the data objectdescribes a pointer) nor from other more abstractattributes. Examples are qualifiers like &quot;volatile&quot;, &quot;strict&quot; or&quot;enum&quot; of the C-language. All such declarations have tobe put into one string.Tags:xml.sequenceOffset=235</td></tr><tr><td rowspan=1 colspan=1>annotation</td><td rowspan=1 colspan=1>Annotation</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This aggregation allows to add annotations (yellow pads...) related to the current data object.Tags:xml.roleElement=truexml.roleWrapperElement=truexml.sequenceOffset=20xml.typeElement=falsexml.typeWrapperElement=false</td></tr><tr><td rowspan=1 colspan=1>baseType</td><td rowspan=1 colspan=1>SwBaseType</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Base type associated with the containing data object.Tags:xml.sequenceOffset=50</td></tr><tr><td rowspan=1 colspan=1>compuMethod</td><td rowspan=1 colspan=1>CompuMethod</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Computation method associated with the semantics ofthis data object.Tags:xml.sequenceOffset=180</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt; SwDataDefProps</td></tr><tr><td rowspan=1 colspan=1>dataConstr</td><td rowspan=1 colspan=1>DataConstr</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Data constraint for this data object.Tags:xml.sequenceOffset=190</td></tr><tr><td rowspan=1 colspan=1>displayFormat</td><td rowspan=1 colspan=1>DisplayFormatString</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This property describes how a number is to be renderede.g. in documents or in a measurement and calibrationsystem.Tags:xml.sequenceOffset=210</td></tr><tr><td rowspan=1 colspan=1>displayPresentation</td><td rowspan=1 colspan=1>DisplayPresentationEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute controls the presentation of the related datafor measurement and calibration tools.</td></tr><tr><td rowspan=1 colspan=1>implementationDataType</td><td rowspan=1 colspan=1>AbstractImplementationDataType</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This association denotes the ImplementationDataType ofa data declaration via its aggregated SwDataDefProps. Itis used whenever a data declaration is not directlyreferring to a base type. Especially• redefinition of an ImplementationDataType via a&quot;typedef&quot; to another ImplementationDatatype• the target type of a pointer (see SwPointerTargetProps), if it does not refer to a base type directly• the data type of an array or record element withinan ImplementationDataType, if it does not refer toa base type directly• the data type of an SwServiceArg, if it does notrefer to a base type directlyTags:xml.sequenceOffset=215</td></tr><tr><td rowspan=1 colspan=1>invalidValue</td><td rowspan=1 colspan=1>ValueSpecification</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Optional value to express invalidity of the actual dataelement.Tags:xml.sequenceOffset=255</td></tr><tr><td rowspan=1 colspan=1>stepSize</td><td rowspan=1 colspan=1>Float</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute can be used to define a value which isadded to or subtracted from the value of a DataPrototypewhen using up/down keys while calibrating.</td></tr><tr><td rowspan=1 colspan=1>swAddrMethod</td><td rowspan=1 colspan=1>SwAddrMethod</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Addressing method related to this data object. Via anassociation to the same SwAddrMethod it can bespecified that several DataPrototypes shall be located inthe same memory without already specifying the memorysection itself.Tags:xml.sequenceOffset=30</td></tr><tr><td rowspan=1 colspan=1>swAlignment</td><td rowspan=1 colspan=1>AlignmentType</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>The attribute describes the intended alignment of theDataPrototype. If the attribute is not defined the alignmentis determined by the swBaseType size and the memoryAllocationKeywordPolicy of the referenced SwAddrMethod.Tags:xml.sequenceOffset=33</td></tr><tr><td rowspan=1 colspan=1>swBitRepresentation</td><td rowspan=1 colspan=1>SwBitRepresentation</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Description of the binary representation in case of a bitvariable.Tags:xml.sequenceOffset=60</td></tr><tr><td rowspan=1 colspan=1>swCalibrationAccess</td><td rowspan=1 colspan=1>SwCalibrationAccessEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Specifies the read or write access by MCD tools for thisdata object.Tags:xml.sequenceOffset=70</td></tr><tr><td rowspan=1 colspan=1>swCalprmAxisSet</td><td rowspan=1 colspan=1>SwCalprmAxisSet</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This specifies the properties of the axes in case of acurve or map etc. This is mainly applicable to calibrationparameters.Tags:xml.sequenceOffset=90</td></tr></table>


<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt; SwDataDefProps</td></tr><tr><td rowspan=1 colspan=1>swComparisonVariable</td><td rowspan=1 colspan=1>SwVariableRefProxy</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Variables used for comparison in an MCD process.Tags:xml.sequenceOffset=170xml.typeElement=false</td></tr><tr><td rowspan=1 colspan=1>swDataDependency</td><td rowspan=1 colspan=1>SwDataDependency</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Describes how the value of the data object has to becalculated from the value of another data object (by theMCD system).Tags:xml.sequenceOffset=200</td></tr><tr><td rowspan=1 colspan=1>swHostVariable</td><td rowspan=1 colspan=1>SwVariableRefProxy</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Contains a reference to a variable which serves as ahost-variable for a bit variable. Only applicable to bitobjects.Tags:xml.sequenceOffset=220xml.typeElement=false</td></tr><tr><td rowspan=1 colspan=1>swImplPolicy</td><td rowspan=1 colspan=1>SwImplPolicyEnum</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>Implementation policy for this data object.Tags:xml.sequenceOffset=230</td></tr><tr><td rowspan=1 colspan=1>swIntendedResolution</td><td rowspan=1 colspan=1>Numerical</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>The purpose of this element is to describe the requestedquantization of data objects early on in the designprocess.The resolution ultimately occurs via the conversionformula present (compuMethod), which specifies thetransition from the physical world to the standardizedworld (and vice-versa) (here, &quot;the slope per bit&quot; is presentimplicitly in the conversion formula)In the case of a development phase without a fixedconversion formula, a pre-specification can occur throughswIntendedResolution.The resolution is specified in the physical domainaccording to the property &quot;unit&quot;.Tags:xml.sequenceOffset=240</td></tr><tr><td rowspan=1 colspan=1>swInterpolationMethod</td><td rowspan=1 colspan=1>Identifier</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This is a keyword identifying the mathematical method tobe applied for interpolation. The keyword needs to berelated to the interpolation routine which needs to beinvoked.Tags:xml.sequenceOffset=250</td></tr><tr><td rowspan=1 colspan=1>swlsVirtual</td><td rowspan=1 colspan=1>Boolean</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This element distinguishes virtual objects. Virtual objectsdo not appear in the memory, their derivation is muchmore dependent on other objects and hence they shallhave a swDataDependencyTags:xml.sequenceOffset=260</td></tr><tr><td rowspan=1 colspan=1>swPointerTargetProps</td><td rowspan=1 colspan=1>SwPointerTargetProps</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Specifies that the containing data object is a pointer toanother data object.Tags:xml.sequenceOffset=280</td></tr><tr><td rowspan=1 colspan=1>swRecordLayout</td><td rowspan=1 colspan=1>SwRecordLayout</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Record layout for this data object.Tags:xml.sequenceOffset=290</td></tr><tr><td rowspan=1 colspan=1>swRefreshTiming</td><td rowspan=1 colspan=1>MultidimensionalTime</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>This element specifies the frequency in which the objectinvolved shall be or is called or calculated. This timingcan be collected from the task in which write accessprocesses to the variable run. But this cannot be done bythe MCD system.∇</td></tr></table>


<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>&lt;&lt;atpVariation&gt;&gt;SwDataDefProps</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>△So this attribute can be used in an early phase to expressthe desired refresh timing and later on to specify the realrefresh timing.Tags:xml.sequenceOffset=300</td></tr><tr><td rowspan=1 colspan=1>swTextProps</td><td rowspan=1 colspan=1>SwTextProps</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>the specific properties if the data object is a text object.Tags:xml.sequenceOffset=120</td></tr><tr><td rowspan=1 colspan=1>swValueBlockSize</td><td rowspan=1 colspan=1>Numerical</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This represents the size of a Value BlockStereotypes: atpVariationTags:vh.latestBindingTime=preCompileTimexml.sequenceOffset=80</td></tr><tr><td rowspan=1 colspan=1>swValueBlockSizeMult(ordered)</td><td rowspan=1 colspan=1>Numerical</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>attr</td><td rowspan=1 colspan=1>This attribute is used to specify the dimensions of a valueblock (VAL_BLK) for the case that that value block hasmore than one dimension.The dimensions given in this attribute are ordered suchthat the first entry represents the first dimension, thesecond entry represents the second dimension, and soon.For one-dimensional value blocks the attribute swValueBlockSize shall be used and this attribute shall not exist.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>unit</td><td rowspan=1 colspan=1>Unit</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>Physical unit associated with the semantics of this dataobject. This attribute applies if no compuMethod isspecified. If both units (this as well as via compuMethod)are specified the units shall be compatible.Tags:xml.sequenceOffset=350</td></tr><tr><td rowspan=1 colspan=1>valueAxisDataType</td><td rowspan=1 colspan=1>ApplicationPrimitiveDataType</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>The referenced ApplicationPrimitiveDataType representsthe primitive data type of the value axis within acompound primitive (e.g. curve, map). It supersedesCompuMethod, Unit, and BaseType.Tags:xml.sequenceOffset=355</td></tr></table>

Table A.99: SwDataDefProps

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SwcServiceDependency</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::SWComponentTemplate::SwcInternalBehavior::ServiceMapping</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>Specialization of ServiceDependency in the context of an SwcInternalBehavior. It allows to associateports, port groups and (in special cases) data defined for an atomic software component to a givenServiceNeeds element.</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, AtpClassifier, AtpFeature, AtpStructureElement, Identifiable, MultilanguageReferrable,Referrable, ServiceDependency</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1>assignedData</td><td rowspan=1 colspan=1>RoleBasedDataAssignment</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Defines the role of an associated data object of the samecomponent.Stereotypes: atpVariationTags:vh.latestBindingTime=preCompileTime</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SwcServiceDependency</td></tr><tr><td rowspan=1 colspan=1>assignedPort</td><td rowspan=1 colspan=1>RoleBasedPortAssignment</td><td rowspan=1 colspan=1>★</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>Defines the role of an associated port of the samecomponent.Stereotypes: atpSplitable; atpVariationTags:atp.Splitkey=assignedPort, variationPoint.shortLabelvh.latestBindingTime=preCompileTime</td></tr><tr><td rowspan=1 colspan=1>representedPortGroup</td><td rowspan=1 colspan=1>PortGroup</td><td rowspan=1 colspan=1>0..1</td><td rowspan=1 colspan=1>ref</td><td rowspan=1 colspan=1>This reference specifies an association between theServiceNeeeds and a PortGroup, for example to requesta communication mode which applies for communicationvia these ports. The referred PortGroup shall be local tothis atomic SWC, but via the links between the PortGroups, a tool can evaluate this information such that allthe ports linked via this port group on the same ECU canbe found.</td></tr><tr><td rowspan=1 colspan=1>serviceNeeds</td><td rowspan=1 colspan=1>ServiceNeeds</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>aggr</td><td rowspan=1 colspan=1>The associated ServiceNeeds.</td></tr></table>

Table A.100: SwcServiceDependency

<table><tr><td rowspan=1 colspan=1>Class</td><td rowspan=1 colspan=4>SymbolProps</td></tr><tr><td rowspan=1 colspan=1>Package</td><td rowspan=1 colspan=4>M2::AUTOSARTemplates::SWComponentTemplate::Components</td></tr><tr><td rowspan=1 colspan=1>Note</td><td rowspan=1 colspan=4>This meta-class represents the ability to contribute a part of a namespace</td></tr><tr><td rowspan=1 colspan=1>Base</td><td rowspan=1 colspan=4>ARObject, ImplementationProps, Referrable</td></tr><tr><td rowspan=1 colspan=1>Attribute</td><td rowspan=1 colspan=1>Type</td><td rowspan=1 colspan=1>Mult.</td><td rowspan=1 colspan=1>Kind</td><td rowspan=1 colspan=1>Note</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>一</td></tr></table>

Table A.101: SymbolProps

## B History of Constraints and Specification Items

Please note that the lists in this chapter also include constraints and specification items that have been removed from the specification in a later version. These constraints and specification items do not appear as hyperlinks in the document.

## B.1 Constraint and Specification Item History of this document according to AUTOSAR Release 17-10

B.1.1 Added Traceables in 17-10
<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00277]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in case of External Service Processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00278]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in case of Internal Processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00279]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol before Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00280]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol during Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00281]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in Non-Default Session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00282]</td><td rowspan=1 colspan=1>Handling of CurrentActiveProtocols</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00284]</td><td rowspan=1 colspan=1>SecurityAccess Service Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00286]</td><td rowspan=1 colspan=1>Configurable environmental condition check execution</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00287]</td><td rowspan=1 colspan=1>Configurable environmental condition check criteria</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00288]</td><td rowspan=1 colspan=1>Configurable environmental condition check evaluates to TRUE</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00289]</td><td rowspan=1 colspan=1>Configurable environmental condition check evaluates to FALSE</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00290]</td><td rowspan=1 colspan=1>Refusal of second diagnostic request from different diagnostic client withoutresponse</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00291]</td><td rowspan=1 colspan=1>UdsMessage class</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00292]</td><td rowspan=1 colspan=1>UdsMessage non public constructors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00293]</td><td rowspan=1 colspan=1>UdsMessage Address type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00294]</td><td rowspan=1 colspan=1>meta info map type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00295]</td><td rowspan=1 colspan=1>meta info map vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00296]</td><td rowspan=1 colspan=1>TargetAddressType Address type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00297]</td><td rowspan=1 colspan=1>GetSa method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00298]</td><td rowspan=1 colspan=1>GetTa method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00299]</td><td rowspan=1 colspan=1>GetTaType method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00300]</td><td rowspan=1 colspan=1>GetPayload method readonly</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00301]</td><td rowspan=1 colspan=1>GetPayload method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00302]</td><td rowspan=1 colspan=1>AddMetalnfo method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00303]</td><td rowspan=1 colspan=1>UdsMessage Pointer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00304]</td><td rowspan=1 colspan=1>Const UdsMessage Pointer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00305]</td><td rowspan=1 colspan=1>Const UdsMessage Pointer vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00306]</td><td rowspan=1 colspan=1>UdsTransportProtocolMgr class</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00307]</td><td rowspan=1 colspan=1>TransmissionResult type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00308]</td><td rowspan=1 colspan=1>Global Channel Identifier type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00309]</td><td rowspan=1 colspan=1>IndicateMessage method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00310]</td><td rowspan=1 colspan=1>NotifyMessageFailure method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00311]</td><td rowspan=1 colspan=1>HandleMessage method</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00312]</td><td rowspan=1 colspan=1>TransmitConfirmation method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00313]</td><td rowspan=1 colspan=1>ChannelReestablished method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00314]</td><td rowspan=1 colspan=1>HandlerStopped method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00315]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler class</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00316]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00317]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler constructor</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00318]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler destructor</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00319]</td><td rowspan=1 colspan=1>Initialize method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00320]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler UdsTransportProtocolMgr member</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00321]</td><td rowspan=1 colspan=1>constructor member initialization</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00322]</td><td rowspan=1 colspan=1>Start method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00323]</td><td rowspan=1 colspan=1>Stop method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00324]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler UdsTransportProtocolHandlerlD member</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00325]</td><td rowspan=1 colspan=1>GetHandlerID method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00326]</td><td rowspan=1 colspan=1>NotifyReestablishment method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00327]</td><td rowspan=1 colspan=1>Transmit method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00328]</td><td rowspan=1 colspan=1>UdsMessage Pointer vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00329]</td><td rowspan=1 colspan=1>Lifecycle management of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00330]</td><td rowspan=1 colspan=1>Construction of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00331]</td><td rowspan=1 colspan=1>Initialization of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00332]</td><td rowspan=1 colspan=1>Starting of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00333]</td><td rowspan=1 colspan=1>Stopping of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00334]</td><td rowspan=1 colspan=1>UdsTransportProtocolMgr may be an abstract class</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00335]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00336]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandlerlD</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00337]</td><td rowspan=1 colspan=1>ChannelID</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00338]</td><td rowspan=1 colspan=1>ByteVector</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00339]</td><td rowspan=1 colspan=1>ByteVector vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00340]</td><td rowspan=1 colspan=1>Waiting for Stop confirmation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00341]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00342]</td><td rowspan=1 colspan=1>Indication of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00343]</td><td rowspan=1 colspan=1>Acceptance of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00344]</td><td rowspan=1 colspan=1>Refusal of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00345]</td><td rowspan=1 colspan=1>Forwarding of UDS message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00346]</td><td rowspan=1 colspan=1>Aborting of UDS message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00347]</td><td rowspan=1 colspan=1>Channel identification in Indication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00348]</td><td rowspan=1 colspan=1>Transmission of UDS response message</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00349]</td><td rowspan=1 colspan=1>Reuse channel identifier of Indication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00350]</td><td rowspan=1 colspan=1>Confirmation of UDS message transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00351]</td><td rowspan=1 colspan=1>Confirmation Result</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00356]</td><td rowspan=1 colspan=1>Requesting Notification of a channel reestablishment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00357]</td><td rowspan=1 colspan=1>Validity/lifetime of a Notification Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00358]</td><td rowspan=1 colspan=1>Notification of a channel reestablishment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00359]</td><td rowspan=1 colspan=1>Persistent Storage of Notification Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00360]</td><td rowspan=1 colspan=1>EcuReset positive response processing after reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00361]</td><td rowspan=1 colspan=1>EcuReset application error processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00362]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for CompareKey</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00363]</td><td rowspan=1 colspan=1>Positive response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00364]</td><td rowspan=1 colspan=1>Negative response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00365]</td><td rowspan=1 colspan=1>Suppression of response</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00366]</td><td rowspan=1 colspan=1>Suppression of response for functional requests</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00367]</td><td rowspan=1 colspan=1>No service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00368]</td><td rowspan=1 colspan=1>Sending busy responses</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00369]</td><td rowspan=1 colspan=1>Max. number of busy responses</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00370]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x06</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00371]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x14</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00372]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x17</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00373]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x18</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00374]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x19</td></tr></table>

Table B.1: Added Traceables in 17-10

## B.1.2 Changed Traceables in 17-10

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00002]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00003]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00004]</td><td rowspan=1 colspan=1>Operation cycle persistency</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00019]</td><td rowspan=1 colspan=1>Internal debounce counter incrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00020]</td><td rowspan=1 colspan=1>Internal debounce counter decrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00023]</td><td rowspan=1 colspan=1>Debounce counter jump down behavior</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00030]</td><td rowspan=1 colspan=1>Calculation of the FDC based on the internal debounce timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00042]</td><td rowspan=1 colspan=1>Canceling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00043]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00044]</td><td rowspan=1 colspan=1>Request refusal in case of non-default session active</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00045]</td><td rowspan=1 colspan=1>Ignore ISO same resource access check</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00046]</td><td rowspan=1 colspan=1>Each Diagnostic Protocol has own session resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00047]</td><td rowspan=1 colspan=1>Each Diagnostic Protocol has own security-level resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00048]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00049]</td><td rowspan=1 colspan=1>Refusal of second diagnostic request from different diagnostic client withBusyRepeatRequest</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00051]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol with lower priority</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00052]</td><td rowspan=1 colspan=1>Selection between multiple cancellation candidates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00066]</td><td rowspan=1 colspan=1>Monitor initialization</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00072]</td><td rowspan=1 colspan=1>Availability of enable condition service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00074]</td><td rowspan=1 colspan=1>Unsatisfied enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00088]</td><td rowspan=1 colspan=1>ControlDTCSetting influence</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00089]</td><td rowspan=1 colspan=1>Reporting PREPASSED or PREFAILED for events without assigned debounc-ing algorithm</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00096]</td><td rowspan=1 colspan=1>Validation Steps and Order</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00098]</td><td rowspan=1 colspan=1>UDS message checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00099]</td><td rowspan=1 colspan=1>Supported Service SID level checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00100]</td><td rowspan=1 colspan=1>Supported Service subfunction level checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00101]</td><td rowspan=1 colspan=1>Session Access SID level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00102]</td><td rowspan=1 colspan=1>Session Access subfunction level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00103]</td><td rowspan=1 colspan=1>Security Access level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00105]</td><td rowspan=1 colspan=1>Configurable Manufacturer Permission Check Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00106]</td><td rowspan=1 colspan=1>Signature of Manufacturer Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00107]</td><td rowspan=1 colspan=1>Configurable Supplier Permission Check Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00108]</td><td rowspan=1 colspan=1>Signature of Supplier Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00111]</td><td rowspan=1 colspan=1>Configurable environment condition checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00112]</td><td rowspan=1 colspan=1>Condition check definition</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00136]</td><td rowspan=1 colspan=1>Request upload service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00148]</td><td rowspan=1 colspan=1>Persistent storage of event memory entries</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00153]</td><td rowspan=1 colspan=1>Triggering for snapshot record storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00156]</td><td rowspan=1 colspan=1>Triggering for extended data record storage and updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00166]</td><td rowspan=1 colspan=1>Trigger to process event status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00167]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00169]</td><td rowspan=1 colspan=1>Restart of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00172]</td><td rowspan=1 colspan=1>Reaction on Unsupported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00176]</td><td rowspan=1 colspan=1>External ReadDataByldentifier processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00177]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00179]</td><td rowspan=1 colspan=1>Positive Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00180]</td><td rowspan=1 colspan=1>Provide Protocol Priority Configurability</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00182]</td><td rowspan=1 colspan=1>Identification of a protocol for Priority Assignment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00184]</td><td rowspan=1 colspan=1>Protocol Match Search</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00188]</td><td rowspan=1 colspan=1>Reaction on Unsupported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00189]</td><td rowspan=1 colspan=1>WriteDataByldentifier processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00192]</td><td rowspan=1 colspan=1>Operation cycles are only ended once</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00202]</td><td rowspan=1 colspan=1>Check for Supported Routineldentifier and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00203]</td><td rowspan=1 colspan=1>Check for Supported Subfunction and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00205]</td><td rowspan=1 colspan=1>Providing the VIN in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00214]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00215]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00249]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for RequestSeed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00252]</td><td rowspan=1 colspan=1>Reaction on Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00258]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in non-default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00268]</td><td rowspan=1 colspan=1>EcuReset positive response processing before reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00269]</td><td rowspan=1 colspan=1>Reaction on Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00270]</td><td rowspan=1 colspan=1>Counting of attempts to change security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00271]</td><td rowspan=1 colspan=1>Evaluate the number of failed security level change attempts</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00272]</td><td rowspan=1 colspan=1>Expiration of the delay timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00273]</td><td rowspan=1 colspan=1>Notification event upon snapshot record updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00274]</td><td rowspan=1 colspan=1>Definition of an active Diagnostic Protocol</td></tr></table>

Table B.2: Changed Traceables in 17-10

## B.1.3 Deleted Traceables in 17-10

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00001]</td><td rowspan=1 colspan=1>Availability of operation cycle service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00053]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00054]</td><td rowspan=1 colspan=1>Generic UDS Service Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00073]</td><td rowspan=1 colspan=1>Checking enable conditions after status reports</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00075]</td><td rowspan=1 colspan=1>Fulfilled enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00076]</td><td rowspan=1 colspan=1>Checking storage conditions in case the storage of event-related data is trig-gered</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00077]</td><td rowspan=1 colspan=1>Checking storage conditions in case the update of event-related data is trig-gered</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00081]</td><td rowspan=1 colspan=1>Routine Service Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00093]</td><td rowspan=1 colspan=1>Service Validation Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00094]</td><td rowspan=1 colspan=1>Data Services Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00149]</td><td rowspan=1 colspan=1>DTC related data</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00157]</td><td rowspan=1 colspan=1>Snapshot record record data layout</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00171]</td><td rowspan=1 colspan=1>Check for Supported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00187]</td><td rowspan=1 colspan=1>Check for Supported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00204]</td><td rowspan=1 colspan=1>Reaction on Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00251]</td><td rowspan=1 colspan=1>Check for Supported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00275]</td><td rowspan=1 colspan=1>Response processing after the actual reset</td></tr></table>

Table B.3: Deleted Traceables in 17-10

## B.1.4 Added Constraints in 17-10

none

## B.1.5 Changed Constraints in 17-10

none

## B.1.6 Deleted Constraints in 17-10

none

## B.2 Constraint and Specification Item History of this document according to AUTOSAR Release 18-03

## B.2.1 Added Traceables in 18-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00001]</td><td rowspan=1 colspan=1>SRS Diagnostics</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00376]</td><td rowspan=1 colspan=1>Positive response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00377]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (reset)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00378]</td><td rowspan=1 colspan=1>ControlDTCSetting influence (reset)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00379]</td><td rowspan=1 colspan=1>Handling of storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00380]</td><td rowspan=1 colspan=1>Support for S3 timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00381]</td><td rowspan=1 colspan=1>Session timeout</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00382]</td><td rowspan=1 colspan=1>Session timeout start</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00383]</td><td rowspan=1 colspan=1>Session timeout stop</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00384]</td><td rowspan=1 colspan=1>IndicationResult type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00385]</td><td rowspan=1 colspan=1>Acceptance of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00386]</td><td rowspan=1 colspan=1>Ignoring UDS message reception because DM is busy</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00387]</td><td rowspan=1 colspan=1>Ignoring UDS message reception because DM has no (memory) ressources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00388]</td><td rowspan=1 colspan=1>Filling provided UdsMessage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00389]</td><td rowspan=1 colspan=1>Skipping Forwarding of UDS message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00390]</td><td rowspan=1 colspan=1>Dispatching physical Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00391]</td><td rowspan=1 colspan=1>Dispatching functional Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00392]</td><td rowspan=1 colspan=1>Properties of returned UdsMessage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00393]</td><td rowspan=1 colspan=1>Retrieving data for internal DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00397]</td><td rowspan=1 colspan=1>Retrieving data for external DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00401]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier on Data Element level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00402]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00403]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00404]</td><td rowspan=1 colspan=1>Default Service Interface for reading DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00405]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00406]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00407]</td><td rowspan=1 colspan=1>Default Service Interface for writing DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00408]</td><td rowspan=1 colspan=1>Retrieving data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00409]</td><td rowspan=1 colspan=1>Check supported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00410]</td><td rowspan=1 colspan=1>Check session permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00411]</td><td rowspan=1 colspan=1>Check security level permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00412]</td><td rowspan=1 colspan=1>Check requested number of Dataldentifiers</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00413]</td><td rowspan=1 colspan=1>Check supported Dataldentifier in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00414]</td><td rowspan=1 colspan=1>Check supported Dataldentifier on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00415]</td><td rowspan=1 colspan=1>Check supported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00416]</td><td rowspan=1 colspan=1>Check supported Dataldentifier in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00417]</td><td rowspan=1 colspan=1>Check supported Dataldentifier on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00418]</td><td rowspan=1 colspan=1>Writing data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00419]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00420]</td><td rowspan=1 colspan=1>Instantiation of Diagnostic Server</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00434]</td><td rowspan=1 colspan=1>Providing the PowerMode in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00394]</td><td rowspan=1 colspan=1>Internal DiagnosticDataElements are read-only</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00395]</td><td rowspan=1 colspan=1>Restriction on DEM-exclusive DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00396]</td><td rowspan=1 colspan=1>Restriction on DCM-exclusive DiagnosticDataElements</td></tr></table>

Table B.4: Added Traceables in 18-03

## B.2.2 Changed Traceables in 18-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00002]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00003]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00005]</td><td rowspan=1 colspan=1>DolP Support</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00007]</td><td rowspan=1 colspan=1>Uniqueness of diagnostic events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00008]</td><td rowspan=1 colspan=1>Diagnostic event processing interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00012]</td><td rowspan=1 colspan=1>DolP configurable source address identification</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00013]</td><td rowspan=1 colspan=1>Events without debouncing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00014]</td><td rowspan=1 colspan=1>Use of counter-based debouncing for events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00015]</td><td rowspan=1 colspan=1>Use of timer based debouncing for events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00017]</td><td rowspan=1 colspan=1>Calculation of the FDC based on the internal debounce counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00018]</td><td rowspan=1 colspan=1>Internal debounce counter init and storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00019]</td><td rowspan=1 colspan=1>Internal debounce counter incrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00020]</td><td rowspan=1 colspan=1>Internal debounce counter decrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00021]</td><td rowspan=1 colspan=1>Direct failed qualification of counter-based events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00022]</td><td rowspan=1 colspan=1>Debounce counter jump up behavior</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00023]</td><td rowspan=1 colspan=1>Debounce counter jump down behavior</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00024]</td><td rowspan=1 colspan=1>Qualified failed event using counter-based debouncing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00025]</td><td rowspan=1 colspan=1>Qualified passed event using counter-based debouncing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00026]</td><td rowspan=1 colspan=1>Application resetting the debounce counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00028]</td><td rowspan=1 colspan=1>Debounce counter persistency</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00029]</td><td rowspan=1 colspan=1>Direct passed qualification of counter-based events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00030]</td><td rowspan=1 colspan=1>Calculation of the FDC based on the internal debounce timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00031]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00032]</td><td rowspan=1 colspan=1>Restrictions on restarting a running event debounce timer for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00033]</td><td rowspan=1 colspan=1>Debounce timer behavior upon reported failed</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00034]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00035]</td><td rowspan=1 colspan=1>Restrictions on restarting a running event debounce timer for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00036]</td><td rowspan=1 colspan=1>Debounce timer behavior upon reported passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00037]</td><td rowspan=1 colspan=1>Debounce time freeze request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00038]</td><td rowspan=1 colspan=1>Continuing a frozen debounce timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00039]</td><td rowspan=1 colspan=1>Resetting the debounce counter upon starting or restarting an operation cycle</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00040]</td><td rowspan=1 colspan=1>Definition of debounce counter reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00041]</td><td rowspan=1 colspan=1>Behavior according to ISO Multiple client handling flow</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00042]</td><td rowspan=1 colspan=1>Cancelling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00043]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00044]</td><td rowspan=1 colspan=1>Request refusal in case of non-default session active</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00045]</td><td rowspan=1 colspan=1>Ignore ISO same resource access check</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00046]</td><td rowspan=1 colspan=1>Each Diagnostic Protocol has own session resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00047]</td><td rowspan=1 colspan=1>Each Diagnostic Protocol has own security-level resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00048]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00049]</td><td rowspan=1 colspan=1>Refusal of second diagnostic request from different diagnostic client withBusyRepeatRequest</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00052]</td><td rowspan=1 colspan=1>Selection between multiple cancellation candidates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00055]</td><td rowspan=1 colspan=1>Supported event memories</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00057]</td><td rowspan=1 colspan=1>Availability of a user-defined event memory</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00058]</td><td rowspan=1 colspan=1>DTC interpretation format</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00060]</td><td rowspan=1 colspan=1>Set of supported DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00061]</td><td rowspan=1 colspan=1>Providing rule for DTCFormatIdentifier in positive response ReadDTCInfor-mation.reportNumberOfDTCByStatusMask</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00062]</td><td rowspan=1 colspan=1>Mapping between ISO 14229-1[1] and Autosar Diagnostic Extract Template[2] of the DTCFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00063]</td><td rowspan=1 colspan=1>Providing rule for DTCFormatIdentifier in positive response ReadDTCInfor-mation.reportNumberOfDTCBySeverityMaskRecord</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00064]</td><td rowspan=1 colspan=1>Definition of DTC groups</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00065]</td><td rowspan=1 colspan=1>Always supported availability of the group of all DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00069]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00070]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00071]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00074]</td><td rowspan=1 colspan=1>Handling of enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00085]</td><td rowspan=1 colspan=1>Internal debounce counter init</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00086]</td><td rowspan=1 colspan=1>Resetting the debounce counter after clearing DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00087]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (freeze)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00088]</td><td rowspan=1 colspan=1>ControlDTCSetting influence (freeze)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00089]</td><td rowspan=1 colspan=1>Reporting PREPASSED or PREFAILED for events without assigned debounc-ing algorithm</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00090]</td><td rowspan=1 colspan=1>Support of UDS service ClearDiagnosticInformation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00091]</td><td rowspan=1 colspan=1>Evaluation of ClearDiagnosticInformation parameters</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00092]</td><td rowspan=1 colspan=1>Parameter range check for groupOfDTC request parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00096]</td><td rowspan=1 colspan=1>Validation Steps and Order</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00097]</td><td rowspan=1 colspan=1>Abort on failed verification step</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00111]</td><td rowspan=1 colspan=1>Configurable environment condition checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00112]</td><td rowspan=1 colspan=1>Condition check definition</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00113]</td><td rowspan=1 colspan=1>Positive response for UDS service 0x14</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00114]</td><td rowspan=1 colspan=1>Limitation to one simultaneous DTC clear operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00115]</td><td rowspan=1 colspan=1>Memory error handling while clearing DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00116]</td><td rowspan=1 colspan=1>Clearing a DTC group</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00117]</td><td rowspan=1 colspan=1>Clearing a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00118]</td><td rowspan=1 colspan=1>Event specific configuration to allow clearing of a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00119]</td><td rowspan=1 colspan=1>Init value for events with clear allowed information</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00120]</td><td rowspan=1 colspan=1>Description of application interface to control the clear event behavior</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00121]</td><td rowspan=1 colspan=1>Forbidden clearing of snapshot records and extended data records</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00122]</td><td rowspan=1 colspan=1>UDS response behavior on not allowed clear operations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00123]</td><td rowspan=1 colspan=1>Block status byte clearing during a clear DTC operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00124]</td><td rowspan=1 colspan=1>Limited status byte clearing during a clear DTC operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00125]</td><td rowspan=1 colspan=1>Linking between event clear allowed and clearing a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00128]</td><td rowspan=1 colspan=1>Realisation of UDS service 0x34 RequestDownload</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00129]</td><td rowspan=1 colspan=1>Supported addressAndLengthFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00130]</td><td rowspan=1 colspan=1>Not supported addressAndLengthFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00136]</td><td rowspan=1 colspan=1>Request upload service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00138]</td><td rowspan=1 colspan=1>Transfer data service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00139]</td><td rowspan=1 colspan=1>Transfer data service validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00142]</td><td rowspan=1 colspan=1>Transfer data service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00143]</td><td rowspan=1 colspan=1>Transfer data service validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00144]</td><td rowspan=1 colspan=1>Parallel clearing DTCs in different DiagnosticMemoryDestination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00145]</td><td rowspan=1 colspan=1>Allow only one simultaneous clear DTC operation for one DiagnosticMem-oryDestination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00146]</td><td rowspan=1 colspan=1>Unlock clear DTC operation for one DiagnosticMemoryDestination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00147]</td><td rowspan=1 colspan=1>Behavior while trying to clear DTCs on a locked DiagnosticMemoryDes-tination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00148]</td><td rowspan=1 colspan=1>Persistent storage of event memory entries</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00151]</td><td rowspan=1 colspan=1>Snapshot record numeration</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00152]</td><td rowspan=1 colspan=1>Number of snapshot records for a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00153]</td><td rowspan=1 colspan=1>Triggering for snapshot record storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00154]</td><td rowspan=1 colspan=1>Number of extended data for a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00155]</td><td rowspan=1 colspan=1>Extended data record numeration</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00156]</td><td rowspan=1 colspan=1>Triggering for extended data record storage and updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00159]</td><td rowspan=1 colspan=1>Allow only to clear GroupOfAl1DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00160]</td><td rowspan=1 colspan=1>Allow to clear single DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00161]</td><td rowspan=1 colspan=1>Negative response on not supported GroupOfDTC parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00162]</td><td rowspan=1 colspan=1>Point in time for positive response for ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00166]</td><td rowspan=1 colspan=1>Trigger to process event status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00167]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00168]</td><td rowspan=1 colspan=1>Availability of DiagnosticMonitor service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00177]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00180]</td><td rowspan=1 colspan=1>Provide Protocol Priority Configurability</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00182]</td><td rowspan=1 colspan=1>Identification of a protocol for Priority Assignment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00183]</td><td rowspan=1 colspan=1>Wildcards per attribute</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00184]</td><td rowspan=1 colspan=1>Protocol Match Search</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00194]</td><td rowspan=1 colspan=1>Definition of the user-defined fault memory number for ClearDiagnosticInfor-mation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00202]</td><td rowspan=1 colspan=1>Check for Supported Routineldentifier and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00203]</td><td rowspan=1 colspan=1>Check for Supported Subfunction and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00205]</td><td rowspan=1 colspan=1>Providing the VIN in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00213]</td><td rowspan=1 colspan=1>DTC status processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00214]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00215]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00217]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by ClearDiagnosticInformation UDS ser-vice</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00218]</td><td rowspan=1 colspan=1>Confirmation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00219]</td><td rowspan=1 colspan=1>Observability of the status byte</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00220]</td><td rowspan=1 colspan=1>Notification about the changes of the status byte</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00223]</td><td rowspan=1 colspan=1>Handling of &#x27;warningIndicatorRequested&#x27; bit</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00227]</td><td rowspan=1 colspan=1>Check for supported sessions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00229]</td><td rowspan=1 colspan=1>Support of UDS service ControlDTCSetting</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00230]</td><td rowspan=1 colspan=1>Check for supported subfunctions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00231]</td><td rowspan=1 colspan=1>Invalid value for optional request parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00232]</td><td rowspan=1 colspan=1>Support of Subfunction 0x01 (ON)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00233]</td><td rowspan=1 colspan=1>Support of Subfunction 0x02 (OFF)</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00236]</td><td rowspan=1 colspan=1>Realization of UDS service 0x27 SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00237]</td><td rowspan=1 colspan=1>Aging</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00238]</td><td rowspan=1 colspan=1>Aging and healing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00239]</td><td rowspan=1 colspan=1>Aging counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00240]</td><td rowspan=1 colspan=1>Processing the aging counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00241]</td><td rowspan=1 colspan=1>Aging cycle and threshold</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00242]</td><td rowspan=1 colspan=1>Reoccurrence after aging</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00243]</td><td rowspan=1 colspan=1>Aging-related UDS status byte processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00244]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x01</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00245]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x02</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00246]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x04</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00247]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x07</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00248]</td><td rowspan=1 colspan=1>Notification about session change</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00249]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for RequestSeed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00250]</td><td rowspan=1 colspan=1>Notification about security-level change</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00258]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in non-default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00259]</td><td rowspan=1 colspan=1>Completion of already Active Protocols in default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00260]</td><td rowspan=1 colspan=1>instances of interface ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00261]</td><td rowspan=1 colspan=1>Usage of ClearDTC Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00262]</td><td rowspan=1 colspan=1>Common semantic behavior for ClearDTC triggered via diagnostics or appli-cation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00265]</td><td rowspan=1 colspan=1>ClearDTC called while another clear operation is in progress</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00268]</td><td rowspan=1 colspan=1>EcuReset positive response processing before reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00270]</td><td rowspan=1 colspan=1>Counting of attempts to change security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00271]</td><td rowspan=1 colspan=1>Evaluate the number of failed security level change attempts</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00272]</td><td rowspan=1 colspan=1>Expiration of the delay timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00273]</td><td rowspan=1 colspan=1>Notification event upon snapshot record updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00277]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in case of External Service Processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00278]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in case of Internal Processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00279]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol before Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00280]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol at Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00281]</td><td rowspan=1 colspan=1>Cancellation of active DiagnosticConversation in Non-Default Session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00282]</td><td rowspan=1 colspan=1>Handling of non-/active diagnostic conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00286]</td><td rowspan=1 colspan=1>Configurable environmental condition check execution</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00290]</td><td rowspan=1 colspan=1>Refusal of second diagnostic request from different diagnostic client withoutresponse</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00309]</td><td rowspan=1 colspan=1>IndicateMessage method</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00316]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00329]</td><td rowspan=1 colspan=1>Lifecycle management of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00330]</td><td rowspan=1 colspan=1>Construction of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00331]</td><td rowspan=1 colspan=1>Initialization of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00332]</td><td rowspan=1 colspan=1>Starting of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00333]</td><td rowspan=1 colspan=1>Stopping of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00335]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00340]</td><td rowspan=1 colspan=1>Waiting for Stop confirmation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00341]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00342]</td><td rowspan=1 colspan=1>Indication of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00345]</td><td rowspan=1 colspan=1>Forwarding of UDS message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00346]</td><td rowspan=1 colspan=1>Aborting of UDS message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00347]</td><td rowspan=1 colspan=1>Channel identification in Indication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00348]</td><td rowspan=1 colspan=1>Transmission of UDS response message</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00349]</td><td rowspan=1 colspan=1>Reuse channel identifier of Indication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00350]</td><td rowspan=1 colspan=1>Confirmation of UDS message transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00351]</td><td rowspan=1 colspan=1>Confirmation Result</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00356]</td><td rowspan=1 colspan=1>Requesting Notification of a channel reestablishment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00357]</td><td rowspan=1 colspan=1>Validity/lifetime of a Notification Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00358]</td><td rowspan=1 colspan=1>Notification of a channel reestablishment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00359]</td><td rowspan=1 colspan=1>Persistent Storage of Notification Request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00362]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for CompareKey</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00363]</td><td rowspan=1 colspan=1>Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00366]</td><td rowspan=1 colspan=1>Suppression of response for functional requests</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00369]</td><td rowspan=1 colspan=1>Max. number of busy responses</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00370]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x06</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00371]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x14</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00372]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x17</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00373]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x18</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00374]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x19</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00059]</td><td rowspan=1 colspan=1>Restriction on supported DTC format</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00082]</td><td rowspan=1 colspan=1>Restriction on the configuration of the DTC group GroupOfAlIDTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS DM CON-STR_00084]</td><td rowspan=1 colspan=1>Each DTC shall be assigned to an event memory destination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00168]</td><td rowspan=1 colspan=1>Required operation cycles for diagnostic events</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00206]</td><td rowspan=1 colspan=1>Supported format for data identifier for VINDataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00207]</td><td rowspan=1 colspan=1>Required VINDataldentifier</td></tr></table>

Table B.5: Changed Traceables in 18-03

## B.2.3 Deleted Traceables in 18-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00072]</td><td rowspan=1 colspan=1>Availability of enable condition service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00078]</td><td rowspan=1 colspan=1>Unsatisfied storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00079]</td><td rowspan=1 colspan=1>Fulfilled storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00172]</td><td rowspan=1 colspan=1>Reaction on Unsupported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00173]</td><td rowspan=1 colspan=1>Classification as Internally implemented DID</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00174]</td><td rowspan=1 colspan=1>Internally implemented DID ActiveDiagnosticSessionDataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00175]</td><td rowspan=1 colspan=1>Classification as Externally implemented DID</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00176]</td><td rowspan=1 colspan=1>External ReadDataByldentifier processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00178]</td><td rowspan=1 colspan=1>Check requested number of Dataldentifiers</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00179]</td><td rowspan=1 colspan=1>Positive Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00188]</td><td rowspan=1 colspan=1>Reaction on Unsupported Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00189]</td><td rowspan=1 colspan=1>WriteDataByldentifier processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00190]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00191]</td><td rowspan=1 colspan=1>Positive Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00264]</td><td rowspan=1 colspan=1>ClearDTC call on invalid DTCOrigin</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00292]</td><td rowspan=1 colspan=1>UdsMessage non public constructors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00343]</td><td rowspan=1 colspan=1>Acceptance of UDS message reception</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00344]</td><td rowspan=1 colspan=1>Refusal of UDS message reception</td></tr></table>

Table B.6: Deleted Traceables in 18-03

## B.2.4 Added Constraints in 18-03

none

## B.2.5 Changed Constraints in 18-03

none

## B.2.6 Deleted Constraints in 18-03

none

# B.3 Constraint and Specification Item History of this document according to AUTOSAR Release 18-10

## B.3.1 Added Traceables in 18-10

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00421]</td><td rowspan=1 colspan=1>Identification of a Diagnostic Client</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00422]</td><td rowspan=1 colspan=1>Instantiation of Diagnostic Conversation Service Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00423]</td><td rowspan=1 colspan=1>Assignment of Diagnostic Conversation to Service Instances</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00424]</td><td rowspan=1 colspan=1>Reset Service Instance fields on end of Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00425]</td><td rowspan=1 colspan=1>Procedure to assign UDS requests to Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00426]</td><td rowspan=1 colspan=1>Assigning a UDS request to an existing Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00427]</td><td rowspan=1 colspan=1>Priority of a Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00428]</td><td rowspan=1 colspan=1>Treatment of priority values</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00429]</td><td rowspan=1 colspan=1>Prioritization in case of Pseudo Parallel Mode and active non-default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00430]</td><td rowspan=1 colspan=1>Prioritization against all Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00431]</td><td rowspan=1 colspan=1>Replacement of Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00432]</td><td rowspan=1 colspan=1>Initial values for Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00433]</td><td rowspan=1 colspan=1>Refusal of diagnostic request due to busy Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00435]</td><td rowspan=1 colspan=1>Default session change trigger from AAs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00436]</td><td rowspan=1 colspan=1>Providing the GID in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00437]</td><td rowspan=1 colspan=1>Check supported Routineldentifier on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00438]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestUpload (0x35) in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00439]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestUpload (0x35) on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00440]</td><td rowspan=1 colspan=1>Check Support of UDS service TransferData (0x36) in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00441]</td><td rowspan=1 colspan=1>Check Support of UDS service TransferData (0x36) on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00442]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestTransferExit (0x37) in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00443]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestTransferExit (0x37) on active securitylevel</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00444]</td><td rowspan=1 colspan=1>Check Support of UDS service ControlDTCSetting (0x85) in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00445]</td><td rowspan=1 colspan=1>Check Support of UDS service ControlDTCSetting (0x85) on active securitylevel</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00446]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestDownload (0x34) in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00447]</td><td rowspan=1 colspan=1>Check Support of UDS service RequestDownload (0x34) on active securitylevel</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00448]</td><td rowspan=1 colspan=1>Check supported Routineldentifier in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00449]</td><td rowspan=1 colspan=1>Supported DolP message types</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00451]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00452]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00475]</td><td rowspan=1 colspan=1>DolP Version</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00476]</td><td rowspan=1 colspan=1>User Controlled Warning IndicatorRequest-bit</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00477]</td><td rowspan=1 colspan=1>Not Storing of &#x27;warningIndicatorRequested&#x27; bit</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00478]</td><td rowspan=1 colspan=1>Persistent Storage of failed attempts to change security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00479]</td><td rowspan=1 colspan=1>Blocking Timer for security access on Restart or Power down - power up cycle</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00480]</td><td rowspan=1 colspan=1>Security Access Blocking Timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00481]</td><td rowspan=1 colspan=1>Handling of DiagnosticClearConditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00482]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00483]</td><td rowspan=1 colspan=1>Cancellation trigger from AAs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00484]</td><td rowspan=1 colspan=1>Updating DiagnosticConversation Service Instance fields</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00485]</td><td rowspan=1 colspan=1>Reinitialization of Service Instance on Cancellation of a Diagnostic Conver-sation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00487]</td><td rowspan=1 colspan=1>Ignoring UDS message reception because of unknown target address</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00491]</td><td rowspan=1 colspan=1>Realisation of UDS service 0x86 ResponseOnEvent</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00492]</td><td rowspan=1 colspan=1>Client Server communication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00493]</td><td rowspan=1 colspan=1>Reestablishing of Client Server communication</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00494]</td><td rowspan=1 colspan=1>Supported sub functions of ResponseOnEvent service</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00495]</td><td rowspan=1 colspan=1>Start initialisation of ResponseOnEvent</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00496]</td><td rowspan=1 colspan=1>Stop initialisation of ResponseOnEvent</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00497]</td><td rowspan=1 colspan=1>Clear initialisation of ResponseOnEvent</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00498]</td><td rowspan=1 colspan=1>Exclusive ResponseOnEvent ressources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00499]</td><td rowspan=1 colspan=1>Replacement of a not started ResponseOnEvent initialisation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00500]</td><td rowspan=1 colspan=1>Replacement of a started ResponseOnEvent initialisation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00501]</td><td rowspan=1 colspan=1>Behavior while trying ResponseOnEvent activation while ResponseOnEventis not initialised</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00503]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00504]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00505]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00506]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00507]</td><td rowspan=1 colspan=1>Length check on UDS Service 0x27 request with Subfunction for Request-Seed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00508]</td><td rowspan=1 colspan=1>Reading DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00509]</td><td rowspan=1 colspan=1>Writing DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00651]</td><td rowspan=1 colspan=1>NumberOfStoredEntries</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09010]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09012]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09015]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09016]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09017]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09021]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09028]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00208]</td><td rowspan=1 colspan=1>Delay time value for sharedTimer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_NA]</td><td rowspan=1 colspan=1></td></tr></table>

Table B.7: Added Traceables in 18-10

## B.3.2 Changed Traceables in 18-10

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00002]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00003]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00004]</td><td rowspan=1 colspan=1>Operation cycle persistency</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00005]</td><td rowspan=1 colspan=1>DolP Support</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00008]</td><td rowspan=1 colspan=1>Diagnostic event processing interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00011]</td><td rowspan=1 colspan=1>Selectability of parallelism mode</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00014]</td><td rowspan=1 colspan=1>Use of counter-based debouncing for events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00015]</td><td rowspan=1 colspan=1>Use of timer based debouncing for events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00016]</td><td rowspan=1 colspan=1>Configurable number of supported parallel Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00020]</td><td rowspan=1 colspan=1>Internal debounce counter decrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00026]</td><td rowspan=1 colspan=1>Application resetting the debounce counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00031]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00034]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00037]</td><td rowspan=1 colspan=1>Debounce time freeze request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00042]</td><td rowspan=1 colspan=1>Canceling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00046]</td><td rowspan=1 colspan=1>Each Diagnostic Conversation has its own session resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00047]</td><td rowspan=1 colspan=1>Each Diagnostic Conversation has its own security-level resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00049]</td><td rowspan=1 colspan=1>Refusal of diagnostic request due to prioritization with BusyRepeatRequest</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00061]</td><td rowspan=1 colspan=1>Providing rule for DTCFormatIdentifier in positive response ReadDTCInfor-mation.reportNumberOfDTCByStatusMask</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00062]</td><td rowspan=1 colspan=1>Mapping between ISO 14229-1[1] and Autosar Diagnostic Extract Template[2] of the DTCFormatIdentifier</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00063]</td><td rowspan=1 colspan=1>Providing rule for DTCFormatIdentifier in positive response ReadDTCInfor-mation.reportNumberOfDTCBySeverityMaskRecord</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00067]</td><td rowspan=1 colspan=1>Monitor initialization for clearing reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00068]</td><td rowspan=1 colspan=1>Monitor initialization for operation cycle restart reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00069]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00070]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00071]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00074]</td><td rowspan=1 colspan=1>Handling of enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00089]</td><td rowspan=1 colspan=1>Reporting kPrepassed or kPrefailed for events without an assigned de-bouncing algorithm</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00090]</td><td rowspan=1 colspan=1>Support of UDS service ClearDiagnosticInformation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00091]</td><td rowspan=1 colspan=1>Evaluation of ClearDiagnosticInformation parameters</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00092]</td><td rowspan=1 colspan=1>Parameter range check for groupOfDTC request parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00096]</td><td rowspan=1 colspan=1>Validation Steps and Order</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00098]</td><td rowspan=1 colspan=1>UDS message checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00099]</td><td rowspan=1 colspan=1>Supported Service SID level checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00100]</td><td rowspan=1 colspan=1>Supported Service subfunction level checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00101]</td><td rowspan=1 colspan=1>Session Access SID level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00102]</td><td rowspan=1 colspan=1>Session Access subfunction level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00103]</td><td rowspan=1 colspan=1>Security Access level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00104]</td><td rowspan=1 colspan=1>Supported UDS Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00106]</td><td rowspan=1 colspan=1>Signature of Manufacturer Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00108]</td><td rowspan=1 colspan=1>Signature of Supplier Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00111]</td><td rowspan=1 colspan=1>Configurable environment condition checks</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00112]</td><td rowspan=1 colspan=1>Condition check definition</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00113]</td><td rowspan=1 colspan=1>Positive response for UDS service 0x14</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00114]</td><td rowspan=1 colspan=1>Limitation to one simultaneous DTC clear operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00115]</td><td rowspan=1 colspan=1>Memory error handling while clearing DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00117]</td><td rowspan=1 colspan=1>Clearing a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00121]</td><td rowspan=1 colspan=1>Forbidden clearing of snapshot records and extended data records</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00122]</td><td rowspan=1 colspan=1>UDS response behavior on not allowed clear operations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00123]</td><td rowspan=1 colspan=1>Block status byte clearing during a clear DTC operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00124]</td><td rowspan=1 colspan=1>Limited status byte clearing during a clear DTC operation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00126]</td><td rowspan=1 colspan=1>Realisation of UDS service 0x3E TesterPresent</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00127]</td><td rowspan=1 colspan=1>Availability of diagnostic service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00128]</td><td rowspan=1 colspan=1>Realization of UDS service RequestDownload (0x34)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00129]</td><td rowspan=1 colspan=1>Supported addressAndLengthFormatIdentifier</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00130]</td><td rowspan=1 colspan=1>Not supported addressAndLengthFormatIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00131]</td><td rowspan=1 colspan=1>UDS service RequestDownload (0x34) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00134]</td><td rowspan=1 colspan=1>Realization of UDS service RequestUpload (0x35)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00136]</td><td rowspan=1 colspan=1>UDS service RequestUpload (0x35) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00137]</td><td rowspan=1 colspan=1>Realization of UDS service TransferData (0x36)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00138]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00139]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00140]</td><td rowspan=1 colspan=1>Realisation of UDS service 0x28 CommunicationControl</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00141]</td><td rowspan=1 colspan=1>Realization of UDS service RequestTransferExit (0x37)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00142]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00143]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00153]</td><td rowspan=1 colspan=1>Triggering for snapshot record storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00156]</td><td rowspan=1 colspan=1>Triggering for extended data record storage and updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00159]</td><td rowspan=1 colspan=1>Allow only to clear GroupOfAl1DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00160]</td><td rowspan=1 colspan=1>Allow to clear single DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00162]</td><td rowspan=1 colspan=1>Point in time for positive response for ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00163]</td><td rowspan=1 colspan=1>Definition of a failed clear operation with event clear allowed and event com-bination</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00164]</td><td rowspan=1 colspan=1>Definition of a failed clear operation with event clear allowed and clearing agroup of DTCs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00167]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00168]</td><td rowspan=1 colspan=1>Availability of DiagnosticMonitor service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00169]</td><td rowspan=1 colspan=1>Restart of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00170]</td><td rowspan=1 colspan=1>Realisation of UDS service ReadDataByldentifier (0x22)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00177]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00186]</td><td rowspan=1 colspan=1>Realisation of UDS service WriteDataByldentifier (0x2E)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00192]</td><td rowspan=1 colspan=1>Operation cycles are only ended once</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00193]</td><td rowspan=1 colspan=1>Support of a user-defined fault memory clear request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00194]</td><td rowspan=1 colspan=1>Definition of the user-defined fault memory number for ClearDiagnosticlnfor-mation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00195]</td><td rowspan=1 colspan=1>Clearing a user-defined memory</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00197]</td><td rowspan=1 colspan=1>Communication control service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00198]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00199]</td><td rowspan=1 colspan=1>Positive Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00201]</td><td rowspan=1 colspan=1>Realization of UDS service RoutineControl (0x31)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00202]</td><td rowspan=1 colspan=1>Check for Supported Routineldentifier and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00203]</td><td rowspan=1 colspan=1>Check for Supported Subfunction and Reaction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00205]</td><td rowspan=1 colspan=1>Providing the VIN in DolP protocol messages</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00208]</td><td rowspan=1 colspan=1>Validation of the requested user-defined memory number</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00210]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) startRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00211]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) requestRoutineResults processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00212]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) stopRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00213]</td><td rowspan=1 colspan=1>DTC status processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00214]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00215]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00216]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by operation cycle changes</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00217]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by ClearDiagnosticlnformation UDS service</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00218]</td><td rowspan=1 colspan=1>Confirmation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00219]</td><td rowspan=1 colspan=1>Observability of the status byte</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00220]</td><td rowspan=1 colspan=1>Notification about DTC status changes</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00222]</td><td rowspan=1 colspan=1>Observability of indicator status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00226]</td><td rowspan=1 colspan=1>Support of UDS service DiagnosticSessionControl</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00227]</td><td rowspan=1 colspan=1>Check for supported sessions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00228]</td><td rowspan=1 colspan=1>Switch to requested Diagnostic Session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00229]</td><td rowspan=1 colspan=1>Support of UDS service ControlDTCSetting (0x85)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00230]</td><td rowspan=1 colspan=1>Check for supported subfunctions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00231]</td><td rowspan=1 colspan=1>Invalid value for optional request parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00232]</td><td rowspan=1 colspan=1>Support of Subfunction 0x01 (ON)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00233]</td><td rowspan=1 colspan=1>Support of Subfunction 0x02 (OFF)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00234]</td><td rowspan=1 colspan=1>Support of UDS service ECUReset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00235]</td><td rowspan=1 colspan=1>ECUReset service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00236]</td><td rowspan=1 colspan=1>Realization of UDS service 0x27 SecurityAccess</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00237]</td><td rowspan=1 colspan=1>Aging</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00240]</td><td rowspan=1 colspan=1>Processing the aging counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00241]</td><td rowspan=1 colspan=1>Aging cycle and threshold</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00242]</td><td rowspan=1 colspan=1>Re-occurrence after aging</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00243]</td><td rowspan=1 colspan=1>Aging-related UDS DTC status byte processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00244]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x01</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00245]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x02</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00246]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x04</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00247]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x07</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00248]</td><td rowspan=1 colspan=1>Notification about session change</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00249]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for RequestSeed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00250]</td><td rowspan=1 colspan=1>Notification about security-level change</td></tr></table>

5  
4
<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00252]</td><td rowspan=1 colspan=1>Reaction on Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00260]</td><td rowspan=1 colspan=1>instances of interface ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00261]</td><td rowspan=1 colspan=1>Usage of ClearDTC Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00263]</td><td rowspan=1 colspan=1>ClearDTC call on invalid DTC or DTCgroup</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00265]</td><td rowspan=1 colspan=1>ClearDTC called while another clear operation is in progress</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00266]</td><td rowspan=1 colspan=1>ClearDTC processing in case of memory errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00267]</td><td rowspan=1 colspan=1>Possible failure of ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00268]</td><td rowspan=1 colspan=1>EcuReset positive response processing before reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00269]</td><td rowspan=1 colspan=1>Reaction on Unsupported Subfunction</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00270]</td><td rowspan=1 colspan=1>Counting of attempts to change security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00271]</td><td rowspan=1 colspan=1>Evaluate the number of failed security level change attempts</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00273]</td><td rowspan=1 colspan=1>Notification event upon snapshot record updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00277]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation in case of External Service Pro-cessing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00278]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation in case of Internal Processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00279]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation before Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00280]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation at Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00286]</td><td rowspan=1 colspan=1>Configurable environmental condition check execution</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00288]</td><td rowspan=1 colspan=1>Configurable environmental condition check evaluates to TRUE</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00289]</td><td rowspan=1 colspan=1>Configurable environmental condition check evaluates to FALSE</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00290]</td><td rowspan=1 colspan=1>Refusal of diagnostic request due to prioritization without response</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00291]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00293]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00294]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00296]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00297]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00298]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00299]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00300]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00301]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00302]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00303]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00304]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00306]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00307]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00309]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00310]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00311]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00312]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00313]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00314]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00315]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00319]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00322]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00323]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00325]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00326]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00327]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00329]</td><td rowspan=1 colspan=1>Lifecycle management of an Uds Transport Protocol implementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00336]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00337]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00338]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00341]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00360]</td><td rowspan=1 colspan=1>EcuReset positive response processing after reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00361]</td><td rowspan=1 colspan=1>EcuReset application error processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00362]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for CompareKey</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00364]</td><td rowspan=1 colspan=1>Negative response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00365]</td><td rowspan=1 colspan=1>Suppression of positive response in accordance to ISO 14229-1[1]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00366]</td><td rowspan=1 colspan=1>Suppression of negative response for functional requests in accordance toISO 14229-1[1]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00367]</td><td rowspan=1 colspan=1>No service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00368]</td><td rowspan=1 colspan=1>Sending busy responses</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00369]</td><td rowspan=1 colspan=1>Maximum number of busy responses</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00370]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x06</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00371]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x14</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00372]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x17</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00373]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x18</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00374]</td><td rowspan=1 colspan=1>Support of UDS service ReadDTCInformation, Subfunction 0x19</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00376]</td><td rowspan=1 colspan=1>Positive response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00379]</td><td rowspan=1 colspan=1>Handling of storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00380]</td><td rowspan=1 colspan=1>Support for S3 timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00381]</td><td rowspan=1 colspan=1>Session timeout</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00384]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00385]</td><td rowspan=1 colspan=1>Acceptance of UDS message reception</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00386]</td><td rowspan=1 colspan=1>Ignoring UDS message reception because DM is busy</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00393]</td><td rowspan=1 colspan=1>Retrieving data for internal DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00397]</td><td rowspan=1 colspan=1>Retrieving data for external DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00401]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier on Data Element level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00404]</td><td rowspan=1 colspan=1>Default Service Interface for reading DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00407]</td><td rowspan=1 colspan=1>Default Service Interface for writing DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00408]</td><td rowspan=1 colspan=1>Retrieving data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00412]</td><td rowspan=1 colspan=1>Check requested number of Dataldentifiers</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00413]</td><td rowspan=1 colspan=1>Check supported Dataldentifier in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00414]</td><td rowspan=1 colspan=1>Check supported Dataldentifier on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00416]</td><td rowspan=1 colspan=1>Check supported Dataldentifier in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00417]</td><td rowspan=1 colspan=1>Check supported Dataldentifier on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00418]</td><td rowspan=1 colspan=1>Writing data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00419]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00420]</td><td rowspan=1 colspan=1>Instantiation of Diagnostic Server</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00434]</td><td rowspan=1 colspan=1>Providing the PowerMode in DolP protocol messages</td></tr></table>

Table B.8: Changed Traceables in 18-10

## B.3.3 Deleted Traceables in 18-10

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00001]</td><td rowspan=1 colspan=1>SRS Diagnostics</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00012]</td><td rowspan=1 colspan=1>DolP configurable source address identification</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00041]</td><td rowspan=1 colspan=1>Behavior according to ISO Multiple client handling flow</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00043]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00044]</td><td rowspan=1 colspan=1>Request refusal in case of non-default session active</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00045]</td><td rowspan=1 colspan=1>Ignore ISO same resource access check</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00048]</td><td rowspan=1 colspan=1>Request refusal in case of no resources</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00051]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol with lower priority</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00052]</td><td rowspan=1 colspan=1>Selection between multiple cancellation candidates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00066]</td><td rowspan=1 colspan=1>Monitor initialization</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00105]</td><td rowspan=1 colspan=1>Configurable Manufacturer Permission Check Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00107]</td><td rowspan=1 colspan=1>Configurable Supplier Permission Check Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00118]</td><td rowspan=1 colspan=1>Event specific configuration to allow clearing of a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00119]</td><td rowspan=1 colspan=1>Init value for events with clear allowed information</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00120]</td><td rowspan=1 colspan=1>Description of application interface to control the clear event behavior</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00125]</td><td rowspan=1 colspan=1>Linking between event clear allowed and clearing a DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00161]</td><td rowspan=1 colspan=1>Negative response on not supported GroupOfDTC parameter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00166]</td><td rowspan=1 colspan=1>Trigger to process event status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00180]</td><td rowspan=1 colspan=1>Provide Protocol Priority Configurability</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00182]</td><td rowspan=1 colspan=1>Identification of a protocol for Priority Assignment</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00183]</td><td rowspan=1 colspan=1>Wildcards per attribute</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00184]</td><td rowspan=1 colspan=1>Protocol Match Search</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00185]</td><td rowspan=1 colspan=1>No Match</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00258]</td><td rowspan=1 colspan=1>Cancellation of Active Protocol in non-default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00259]</td><td rowspan=1 colspan=1>Completion of already Active Protocols in default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00274]</td><td rowspan=1 colspan=1>Definition of an active Diagnostic Protocol</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00281]</td><td rowspan=1 colspan=1>Cancellation of active DiagnosticConversation in Non-Default Session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00282]</td><td rowspan=1 colspan=1>Handling of non-/active diagnostic conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00295]</td><td rowspan=1 colspan=1>meta info map vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00305]</td><td rowspan=1 colspan=1>Const UdsMessage Pointer vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00308]</td><td rowspan=1 colspan=1>Global Channel Identifier type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00316]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00317]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler constructor</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00318]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler destructor</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00320]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler UdsTransportProtocolMgr member</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00321]</td><td rowspan=1 colspan=1>constructor member initialization</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00324]</td><td rowspan=1 colspan=1>UdsTransportProtocolHandler UdsTransportProtocolHandlerlD member</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00328]</td><td rowspan=1 colspan=1>UdsMessage Pointer vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00334]</td><td rowspan=1 colspan=1>UdsTransportProtocolMgr may be an abstract class</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00335]</td><td rowspan=1 colspan=1>Header file</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00339]</td><td rowspan=1 colspan=1>ByteVector vendor type</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00402]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00403]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00405]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00406]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00410]</td><td rowspan=1 colspan=1>Check session permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00411]</td><td rowspan=1 colspan=1>Check security level permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00207]</td><td rowspan=1 colspan=1>Required VINDataldentifier</td></tr></table>

Table B.9: Deleted Traceables in 18-10

## B.3.4 Added Constraints in 18-10

none

## B.3.5 Changed Constraints in 18-10

none

## B.3.6 Deleted Constraints in 18-10

none

## B.4 Constraint and Specification Item History of this document according to AUTOSAR Release 19-03

## B.4.1 Added Traceables in 19-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00510]</td><td rowspan=1 colspan=1>Namespace of Service header files</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00511]</td><td rowspan=1 colspan=1>Implementation Types header files existence</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00512]</td><td rowspan=1 colspan=1>Data Type definitions for AUTOSAR Data Types in Implementation Typesheader files</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00513]</td><td rowspan=1 colspan=1>Implementation Types header file namespace</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00526]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00538]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00539]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00540]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00541]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00542]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00543]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00544]</td><td rowspan=1 colspan=1>Use of general ara::diag errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00545]</td><td rowspan=1 colspan=1>Definition Offer ara::diag errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00546]</td><td rowspan=1 colspan=1>Definition Reporting ara::diag errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00547]</td><td rowspan=1 colspan=1>Definition UDS NRC ara::diag errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00548]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00549]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00550]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00551]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00552]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00553]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00554]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00555]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00556]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00557]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00558]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00559]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00560]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00561]</td><td rowspan=1 colspan=1>Deployment of diagnostic PortInterfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00562]</td><td rowspan=1 colspan=1>Monitor initialization for clearing reason</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00563]</td><td rowspan=1 colspan=1>Monitor initialization for operation cycle restart reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00564]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00565]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00566]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00567]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00568]</td><td rowspan=1 colspan=1>Handling of enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00569]</td><td rowspan=1 colspan=1>Handling of storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00570]</td><td rowspan=1 colspan=1>Retrieving data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00571]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00572]</td><td rowspan=1 colspan=1>Writing data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00573]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00574]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) startRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00575]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) requestRoutineResults processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00576]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) stopRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00577]</td><td rowspan=1 colspan=1>Canceling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00578]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00579]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00580]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00581]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00582]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00583]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00584]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00585]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00586]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00587]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00588]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00589]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00590]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00591]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00592]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00593]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00594]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00595]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00596]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00597]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00598]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00599]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00600]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00601]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00602]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00603]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00604]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00605]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00607]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00608]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00609]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00610]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00611]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00612]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00613]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00614]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00615]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00616]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00617]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00618]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00619]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00620]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00634]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00635]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00636]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00637]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00638]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00639]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00640]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00641]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00644]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00646]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00647]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00648]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00649]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00650]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00652]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00653]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00654]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00655]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00656]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00657]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00658]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00663]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00664]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00665]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00666]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00667]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00668]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00669]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00670]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00671]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00672]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00673]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00674]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00691]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00692]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00693]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00694]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00695]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00696]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00697]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00698]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00699]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00700]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00701]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00710]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00711]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00712]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00713]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00714]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00715]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00720]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00721]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00722]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00723]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00724]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00725]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00726]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00731]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00732]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00733]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00734]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00735]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00736]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00740]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00741]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00742]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00743]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00744]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00745]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00750]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00751]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00752]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00753]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00754]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00755]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00756]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00781]</td><td rowspan=1 colspan=1>NumberOfStoredEntries</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00782]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00783]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00784]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00785]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00787]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00788]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00789]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00790]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00791]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00792]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00793]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00794]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00795]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00797]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00798]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00799]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00800]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00801]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00802]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00803]</td><td rowspan=1 colspan=1></td></tr></table>

Table B.10: Added Traceables in 19-03

## B.4.2 Changed Traceables in 19-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00002]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00003]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00042]</td><td rowspan=1 colspan=1>Canceling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00058]</td><td rowspan=1 colspan=1>DTC interpretation format</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00064]</td><td rowspan=1 colspan=1>Definition of DTC groups</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00067]</td><td rowspan=1 colspan=1>Monitor initialization for clearing reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00068]</td><td rowspan=1 colspan=1>Monitor initialization for operation cycle restart reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00069]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00070]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00071]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00106]</td><td rowspan=1 colspan=1>Signature of Manufacturer Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00108]</td><td rowspan=1 colspan=1>Signature of Supplier Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00177]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00198]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00199]</td><td rowspan=1 colspan=1>Positive Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00214]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00215]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00216]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by operation cycle changes</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00218]</td><td rowspan=1 colspan=1>Trip Counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00268]</td><td rowspan=1 colspan=1>EcuReset positive response processing before reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00296]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00307]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00341]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00360]</td><td rowspan=1 colspan=1>EcuReset positive response processing after reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00361]</td><td rowspan=1 colspan=1>EcuReset application error processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00364]</td><td rowspan=1 colspan=1>Negative response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00366]</td><td rowspan=1 colspan=1>Suppression of negative response for functional requests in accordance toISO 14229-1[1]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00367]</td><td rowspan=1 colspan=1>No service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00376]</td><td rowspan=1 colspan=1>Positive response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00382]</td><td rowspan=1 colspan=1>Session timeout start</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00383]</td><td rowspan=1 colspan=1>Session timeout stop</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00384]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00419]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00436]</td><td rowspan=1 colspan=1>Providing the GID in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00479]</td><td rowspan=1 colspan=1>Blocking Timer for security access on Restart or Power down - power up cycle</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00503]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00504]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00505]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00506]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00651]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09017]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_CON-STR_00395]</td><td rowspan=1 colspan=1>Restriction on DEM-exclusive DiagnosticDataElements</td></tr></table>

Table B.11: Changed Traceables in 19-03

## B.4.3 Deleted Traceables in 19-03

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00104]</td><td rowspan=1 colspan=1>Supported UDS Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00483]</td><td rowspan=1 colspan=1>Cancellation trigger from AAs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09028]</td><td rowspan=1 colspan=1></td></tr></table>

Table B.12: Deleted Traceables in 19-03

## B.4.4 Added Constraints in 19-03

none

## B.4.5 Changed Constraints in 19-03

none

## B.4.6 Deleted Constraints in 19-03

none

## B.5 Constraint and Specification Item History of this document according to AUTOSAR Release 19-11

## B.5.1 Added Traceables in 19-11

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00450]</td><td rowspan=1 colspan=1>Security Access subfunction level Permission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00502]</td><td rowspan=1 colspan=1>Support for Custom Diagnostic Services</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00642]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00643]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00645]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00659]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00660]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00661]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00662]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00690]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00702]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00730]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00760]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00761]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00762]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00763]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00764]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00765]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00766]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00767]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00770]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00771]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00772]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00773]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00774]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00775]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00776]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00777]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00804]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00805]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00806]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00807]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00808]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00809]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00810]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00811]</td><td rowspan=1 colspan=1>Re-enabling of ControlDTCSetting by Diagnostic Application</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00812]</td><td rowspan=1 colspan=1>Re-enabling on transition to default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00813]</td><td rowspan=1 colspan=1>Providing the GID in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00814]</td><td rowspan=1 colspan=1>Providing the PowerMode in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00815]</td><td rowspan=1 colspan=1>When to send Vehicle announcement messages on interfaces without activa-tion line control</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00816]</td><td rowspan=1 colspan=1>Notification of activation line status change on activation line controlled net-work interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00820]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00821]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00822]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00830]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00831]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00832]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00833]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00834]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00835]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00836]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00837]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00840]</td><td rowspan=1 colspan=1>Instantiation of Diagnostic Conversation Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00841]</td><td rowspan=1 colspan=1>Assignment of Diagnostic Conversation to Service Instances</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00842]</td><td rowspan=1 colspan=1>Default session change trigger from AAs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00843]</td><td rowspan=1 colspan=1>Reset Service Instance fields on end of Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00844]</td><td rowspan=1 colspan=1>Updating DiagnosticConversation Service Instance fields</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00845]</td><td rowspan=1 colspan=1>Notification about session change</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00846]</td><td rowspan=1 colspan=1>Notification about security-level change</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00847]</td><td rowspan=1 colspan=1>Reinitialization of Service Instance on Cancellation of a Diagnostic Conver-sation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00848]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00849]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00850]</td><td rowspan=1 colspan=1>Default Service Interface for reading DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00855]</td><td rowspan=1 colspan=1>Providing the VIN in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00856]</td><td rowspan=1 colspan=1>Initial values for Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00857]</td><td rowspan=1 colspan=1>Signature of Manufacturer Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00858]</td><td rowspan=1 colspan=1>Signature of Supplier Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00859]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00860]</td><td rowspan=1 colspan=1>No service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00861]</td><td rowspan=1 colspan=1>Negative response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00862]</td><td rowspan=1 colspan=1>Suppression of negative response for functional requests in accordance toISO 14229-1[1]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00863]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for RequestSeed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00864]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for CompareKey</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00865]</td><td rowspan=1 colspan=1>Communication control service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00866]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00867]</td><td rowspan=1 colspan=1>UDS service RequestDownload (0x34) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00868]</td><td rowspan=1 colspan=1>UDS service RequestUpload (0x35) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00869]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00870]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00871]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00872]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00873]</td><td rowspan=1 colspan=1>Diagnostic event processing interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00874]</td><td rowspan=1 colspan=1>Reporting kPrepassed or kPrefailed for events without an assigned debounc-ing algorithm</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00875]</td><td rowspan=1 colspan=1>Internal debounce counter incrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00876]</td><td rowspan=1 colspan=1>Internal debounce counter decrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00877]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00878]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00879]</td><td rowspan=1 colspan=1>Application resetting the debounce counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00880]</td><td rowspan=1 colspan=1>Debounce time freeze request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00881]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (freeze)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00882]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (reset)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00883]</td><td rowspan=1 colspan=1>UDS DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00884]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00885]</td><td rowspan=1 colspan=1>UDS DTC status bit transitionstriggered byoperation cyclechanges</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00886]</td><td rowspan=1 colspan=1>Observability of the status byte</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00887]</td><td rowspan=1 colspan=1>Notification about DTC status changes</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00888]</td><td rowspan=1 colspan=1>Observability of indicator status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00889]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00890]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00891]</td><td rowspan=1 colspan=1>Restart of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00892]</td><td rowspan=1 colspan=1>Operation cycles are only ended once</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00893]</td><td rowspan=1 colspan=1>Triggering for snapshot record storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00894]</td><td rowspan=1 colspan=1>Notification event upon snapshot record updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00895]</td><td rowspan=1 colspan=1>Triggering for extended data record storage and updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00896]</td><td rowspan=1 colspan=1>Handling of DiagnosticClearConditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00897]</td><td rowspan=1 colspan=1>Usage of ClearDTC Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00898]</td><td rowspan=1 colspan=1>ClearDTC call on invalid DTC or DTC group</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00899]</td><td rowspan=1 colspan=1>ClearDTC called while another clear operation is in progress</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00900]</td><td rowspan=1 colspan=1>ClearDTC processing in case of memory errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00901]</td><td rowspan=1 colspan=1>Possible failure of ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00902]</td><td rowspan=1 colspan=1>NumberOfStoredEntries</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00903]</td><td rowspan=1 colspan=1>Reading DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00904]</td><td rowspan=1 colspan=1>Writing DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00905]</td><td rowspan=1 colspan=1>Retrieving datafor external DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00906]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00907]</td><td rowspan=1 colspan=1>Default Service Interface for writing DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00908]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00909]</td><td rowspan=1 colspan=1>Support of Subfunction 0x01 (ON)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00910]</td><td rowspan=1 colspan=1>Support of Subfunction 0x02 (OFF)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00911]</td><td rowspan=1 colspan=1>Instances of DTCInformation interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09011]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09013]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09014]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09018]</td><td rowspan=1 colspan=1></td></tr></table>

Table B.13: Added Traceables in 19-11

B.5.2 Changed Traceables in 19-11
<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00021]</td><td rowspan=1 colspan=1>Direct failed qualification of counter-based events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00024]</td><td rowspan=1 colspan=1>Qualified failed event using counter-based debouncing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00025]</td><td rowspan=1 colspan=1>Qualified passed event using counter-based debouncing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00029]</td><td rowspan=1 colspan=1>Direct passed qualification of counter-based events</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00032]</td><td rowspan=1 colspan=1>Restrictions on restarting a running event debounce timer for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00033]</td><td rowspan=1 colspan=1>Debounce timer behavior upon reported failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00035]</td><td rowspan=1 colspan=1>Restrictions on restarting a running event debounce timer for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00036]</td><td rowspan=1 colspan=1>Debounce timer behavior upon reported passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00038]</td><td rowspan=1 colspan=1>Continuing a frozen debounce timer</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00217]</td><td rowspan=1 colspan=1>UDS DTC status bit transitions triggered by ClearDiagnosticlnformationUDS service</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00218]</td><td rowspan=1 colspan=1>Trip Counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00242]</td><td rowspan=1 colspan=1>Re-occurrence after Aging</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00243]</td><td rowspan=1 colspan=1>Aging-related uDs DTC status byte processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00268]</td><td rowspan=1 colspan=1>EcuReset positive response processing before reset</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00279]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation before Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00280]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation at Response Transmission</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00296]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00307]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00393]</td><td rowspan=1 colspan=1>Retrieving data for internal DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00401]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier on Data Element level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00412]</td><td rowspan=1 colspan=1>Check requested number of Dataldentifiers</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00421]</td><td rowspan=1 colspan=1>Identification of a Diagnostic Client</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00425]</td><td rowspan=1 colspan=1>Procedure to assign UDS requests to Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00426]</td><td rowspan=1 colspan=1>Assigning a UDS request to an existing Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00427]</td><td rowspan=1 colspan=1>Priority of a Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00428]</td><td rowspan=1 colspan=1>Treatment of priority values</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00429]</td><td rowspan=1 colspan=1>Prioritization in active non-default session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00430]</td><td rowspan=1 colspan=1>Prioritization against all Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00431]</td><td rowspan=1 colspan=1>Replacement of Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00433]</td><td rowspan=1 colspan=1>Refusal of diagnostic request due to busy Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00437]</td><td rowspan=1 colspan=1>Check supported Routineldentifier subfunction on active security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00448]</td><td rowspan=1 colspan=1>Check supported Routineldentifier subfunction in active session</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00449]</td><td rowspan=1 colspan=1>Supported DolP message types</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00475]</td><td rowspan=1 colspan=1>DolP Version</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00478]</td><td rowspan=1 colspan=1>Persistent Storage of failed attempts to change security level</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00479]</td><td rowspan=1 colspan=1>Blocking Timer for security access on Restart or Power down - power up cycle</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00482]</td><td rowspan=1 colspan=1>Cancellation of a Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00507]</td><td rowspan=1 colspan=1>Length check on UDS Service 0x27 request with Subfunction for Request-Seed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00526]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00538]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00539]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00540]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00541]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00542]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00543]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00548]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00549]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00550]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00551]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00552]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00553]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00554]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00555]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00556]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00557]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00559]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00560]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00562]</td><td rowspan=1 colspan=1>Monitor initialization for clearing reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00563]</td><td rowspan=1 colspan=1>Monitor initialization for operation cycle restart reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00564]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00565]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00567]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00568]</td><td rowspan=1 colspan=1>Handlingof enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00570]</td><td rowspan=1 colspan=1>Retrieving data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00571]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00572]</td><td rowspan=1 colspan=1>Writing data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00573]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00574]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) startRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00575]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) requestRoutineResults processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00576]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) stopRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00584]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00585]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00586]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00587]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00588]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00589]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00590]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00591]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00592]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00593]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00594]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00596]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00597]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00598]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00599]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00601]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00603]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00604]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00605]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00616]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00618]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00634]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00635]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00636]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00637]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00638]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00640]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00644]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00646]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00647]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00648]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00649]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00650]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00651]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00652]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00653]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00654]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00655]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00656]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00657]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00658]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00663]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00664]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00665]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00666]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00667]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00668]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00669]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00670]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00671]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00672]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00673]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00674]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00692]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00694]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00695]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00696]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00697]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00698]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00699]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00700]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00701]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00712]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00713]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00714]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00715]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00720]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00721]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00722]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00723]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00724]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00725]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00726]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00731]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00732]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00733]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00734]</td><td rowspan=1 colspan=1></td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00735]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00736]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00740]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00741]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00742]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00743]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00744]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00745]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00750]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00751]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00752]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00753]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00754]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00755]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00756]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00782]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00783]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00787]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00788]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00789]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00790]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00791]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00792]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00797]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00798]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00799]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00800]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00801]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00802]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09012]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_09017]</td><td rowspan=1 colspan=1></td></tr></table>

Table B.14: Changed Traceables in 19-11

B.5.3 Deleted Traceables in 19-11
<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00002]</td><td rowspan=1 colspan=1>Automatic starting of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00003]</td><td rowspan=1 colspan=1>Automatic ending of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00008]</td><td rowspan=1 colspan=1>Diagnostic event processing interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00011]</td><td rowspan=1 colspan=1>Selectability of parallelism mode</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00016]</td><td rowspan=1 colspan=1>Configurable number of supported parallel Diagnostic Conversations</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00019]</td><td rowspan=1 colspan=1>Internal debounce counter incrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00020]</td><td rowspan=1 colspan=1>Internal debounce counter decrementation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00026]</td><td rowspan=1 colspan=1>Application resetting the debounce counter</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00031]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for failed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00034]</td><td rowspan=1 colspan=1>Starting time-based event debouncing for passed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00037]</td><td rowspan=1 colspan=1>Debounce time freeze request</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00042]</td><td rowspan=1 colspan=1>Canceling external service processors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00067]</td><td rowspan=1 colspan=1>Monitor initialization for clearing reason</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00068]</td><td rowspan=1 colspan=1>Monitor initialization for operation cycle restart reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00069]</td><td rowspan=1 colspan=1>Monitor initialization for enable condition re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00070]</td><td rowspan=1 colspan=1>Monitor initialization for DTC setting re-enabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00071]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00074]</td><td rowspan=1 colspan=1>Handling of enable conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00087]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (freeze)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00089]</td><td rowspan=1 colspan=1>Reporting kPrepassed or kPrefailed for events without an assigned debounc-ing algorithm</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00106]</td><td rowspan=1 colspan=1>Signature of Manufacturer Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00108]</td><td rowspan=1 colspan=1>Signature of Supplier Permission Check Method</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00131]</td><td rowspan=1 colspan=1>UDS service RequestDownload (0x34) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00136]</td><td rowspan=1 colspan=1>UDS service RequestUpload (0x35) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00138]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00139]</td><td rowspan=1 colspan=1>UDS service TransferData (0x36) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00142]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00143]</td><td rowspan=1 colspan=1>UDS service RequestTransferExit (0x37) validation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00153]</td><td rowspan=1 colspan=1>Triggering for snapshot record storage</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00156]</td><td rowspan=1 colspan=1>Triggering for extended data record storage and updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00167]</td><td rowspan=1 colspan=1>Ignoring reported events for not started operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00168]</td><td rowspan=1 colspan=1>Availability of DiagnosticMonitor service interfaces</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00169]</td><td rowspan=1 colspan=1>Restart of operation cycles</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00177]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00192]</td><td rowspan=1 colspan=1>Operation cycles are only ended once</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00197]</td><td rowspan=1 colspan=1>Communication control service processing</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00198]</td><td rowspan=1 colspan=1>Negative Response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00205]</td><td rowspan=1 colspan=1>Providing the VIN in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00210]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) startRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00211]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) requestRoutineResults processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00212]</td><td rowspan=1 colspan=1>UDS Service RoutineControl (0x31) stopRoutine processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00214]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by test results</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00215]</td><td rowspan=1 colspan=1>Resetting the status of the DTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00216]</td><td rowspan=1 colspan=1>DTC status bit transitions triggered by operation cycle changes</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00219]</td><td rowspan=1 colspan=1>Observability of the status byte</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00220]</td><td rowspan=1 colspan=1>Notification about DTC status changes</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00222]</td><td rowspan=1 colspan=1>Observability of indicator status</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00232]</td><td rowspan=1 colspan=1>Support of Subfunction 0x01 (ON)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00233]</td><td rowspan=1 colspan=1>Support of Subfunction 0x02 (OFF)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00248]</td><td rowspan=1 colspan=1>Notification about session change</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00249]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for RequestSeed</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00250]</td><td rowspan=1 colspan=1>Notification about security-level change</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00260]</td><td rowspan=1 colspan=1>instances of interface ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00261]</td><td rowspan=1 colspan=1>Usage of ClearDTC Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00263]</td><td rowspan=1 colspan=1>ClearDTC call on invalid DTC or DTCgroup</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00265]</td><td rowspan=1 colspan=1>ClearDTC called while another clear operation is in progress</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00266]</td><td rowspan=1 colspan=1>ClearDTC processing in case of memory errors</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00267]</td><td rowspan=1 colspan=1>Possible failure of ClearDTC</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00273]</td><td rowspan=1 colspan=1>Notification event upon snapshot record updates</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00341]</td><td rowspan=1 colspan=1>Confirmation of service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00362]</td><td rowspan=1 colspan=1>Checking Supported Subfunction for CompareKey</td></tr><tr><td rowspan=1 colspan=1>[SWS DM_00364]</td><td rowspan=1 colspan=1>Negative response processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00366]</td><td rowspan=1 colspan=1>Suppression of negative response for functional requests in accordance toISO 14229-1[1]</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00367]</td><td rowspan=1 colspan=1>No service processing</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00377]</td><td rowspan=1 colspan=1>Enable condition influence on debouncing behavior (reset)</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00379]</td><td rowspan=1 colspan=1>Handling of storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00397]</td><td rowspan=1 colspan=1>Retrieving data for external DiagnosticDataElements</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00404]</td><td rowspan=1 colspan=1>Default Service Interface for reading DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00407]</td><td rowspan=1 colspan=1>Default Service Interface for writing DiagnosticDataIdentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00408]</td><td rowspan=1 colspan=1>Retrieving data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00418]</td><td rowspan=1 colspan=1>Writing data for requested Dataldentifier</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00419]</td><td rowspan=1 colspan=1>Reaction on ApplicationError</td></tr></table>

<table><tr><td rowspan=1 colspan=1>Number</td><td rowspan=1 colspan=1>Heading</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00422]</td><td rowspan=1 colspan=1>Instantiation of Diagnostic Conversation Service Interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00423]</td><td rowspan=1 colspan=1>Assignment of Diagnostic Conversation to Service Instances</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00424]</td><td rowspan=1 colspan=1>Reset Service Instance fields on end of Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00432]</td><td rowspan=1 colspan=1>Initial values for Diagnostic Conversation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00434]</td><td rowspan=1 colspan=1>Providing the PowerMode in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00435]</td><td rowspan=1 colspan=1>Default session change trigger from AAs</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00436]</td><td rowspan=1 colspan=1>Providing the GID in DolP protocol messages</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00476]</td><td rowspan=1 colspan=1>User Controlled Warning IndicatorRequest-bit</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00477]</td><td rowspan=1 colspan=1>Not Storing of &#x27;warningIndicatorRequested&#x27; bit</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00481]</td><td rowspan=1 colspan=1>Handling of DiagnosticClearConditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00484]</td><td rowspan=1 colspan=1>Updating DiagnosticConversation Service Instance fields</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00485]</td><td rowspan=1 colspan=1>Reinitialization of Service Instance on Cancellation of a Diagnostic Conver-sation</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00503]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00504]</td><td rowspan=1 colspan=1>Reading Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00505]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by Dataldentifier interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00506]</td><td rowspan=1 colspan=1>Writing Diagnostic Data Identifier by GenericUDSService interface</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00508]</td><td rowspan=1 colspan=1>Reading DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00509]</td><td rowspan=1 colspan=1>Writing DiagnosticDataldentifier configured for representing VIN</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00566]</td><td rowspan=1 colspan=1>Monitor initialization for storage condition reenabling reason</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00569]</td><td rowspan=1 colspan=1>Handling of storage conditions</td></tr><tr><td rowspan=1 colspan=1>[SWS_DM_00781]</td><td rowspan=1 colspan=1>NumberOfStoredEntries</td></tr></table>

Table B.15: Deleted Traceables in 19-11

## B.5.4 Added Constraints in 19-11

none

## B.5.5 Changed Constraints in 19-11

none

## B.5.6 Deleted Constraints in 19-11

none
