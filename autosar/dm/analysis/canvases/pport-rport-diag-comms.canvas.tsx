import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Scenario = "did" | "monitor" | "auth";

const scenarios: Array<{
  id: Scenario;
  label: string;
  uds: string;
  mapping: string;
  iface: string;
  appPort: "PPort" | "RPort";
  dmPort: "PPort" | "RPort";
  caller: string;
  callee: string;
  method: string;
}> = [
  {
    id: "did",
    label: "读 DID",
    uds: "UDS 0x22 ReadDataByIdentifier",
    mapping: "DiagnosticDataPortMapping",
    iface: "DiagnosticDataElementInterface",
    appPort: "PPort",
    dmPort: "RPort",
    caller: "DM（诊断服务器）",
    callee: "应用 SWC",
    method: "Read()",
  },
  {
    id: "monitor",
    label: "上报故障",
    uds: "应用 Monitor → DTC 存储",
    mapping: "DiagnosticMonitorPortMapping",
    iface: "DiagnosticMonitorInterface",
    appPort: "RPort",
    dmPort: "PPort",
    caller: "应用 SWC",
    callee: "DM",
    method: "ReportMonitorAction()",
  },
  {
    id: "auth",
    label: "0x29 认证",
    uds: "UDS 0x29 APCE",
    mapping: "DiagnosticAuthenticationPortMapping",
    iface: "DiagnosticAuthenticationInterface",
    appPort: "PPort",
    dmPort: "RPort",
    caller: "DM（诊断服务器）",
    callee: "应用 Authentication AA",
    method: "VerifyCertificateUnidirectional()",
  },
];

export default function PPortRPortDiagComms() {
  const [id, setId] = useCanvasState<Scenario>("scenario", "did");
  const s = scenarios.find((x) => x.id === id) ?? scenarios[0];
  const appProvides = s.appPort === "PPort";

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>诊断通信模型中的 PPort 与 RPort</H1>
        <Text tone="secondary">
          Manifest 的 DiagnosticSwMapping 始终指向应用 SWC 上的那个端口。对端
          DM 持有方向相反的端口。AUTOSAR AP R25-11：Manifest TPS + SWS
          Diagnostics。
        </Text>
      </Stack>

      <Row gap={8} wrap>
        {scenarios.map((item) => (
          <Button
            key={item.id}
            size="small"
            variant={item.id === id ? "primary" : "secondary"}
            onClick={() => setId(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </Row>

      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone={appProvides ? "success" : "warning"}>{s.appPort}</Pill>}>
            应用端口
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold">{s.iface}</Text>
              <Text tone="secondary" size="small">
                {appProvides ? "应用 Offer / 实现接口" : "应用 Find / 调用 DM"}
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm">{s.mapping}</Pill>}>映射类</CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              绑定 DEXT 诊断对象与 Executable 中的{" "}
              {appProvides ? "pPortPrototypeInExecutable" : "rPortPrototypeInExecutable"}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone={!appProvides ? "success" : "warning"}>{s.dmPort}</Pill>}>
            DM 对端
          </CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              {s.caller} 调用 {s.method}，由 {s.callee} 实现
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <H2>用例视图</H2>
      <UseCaseSvg scenario={id} />
      <Text size="small" tone="tertiary">
        Tester 只看见 UDS/DoIP。PPort/RPort 是 AdaptiveApplicationSwComponentType
        与 DM 之间的 ara::com 端口，不是 Tester 的端口。
      </Text>

      <H2>结构：谁提供、谁请求</H2>
      <PortStructureSvg appProvides={appProvides} iface={s.iface} />

      <H2>顺序图：{s.uds}</H2>
      <SequenceSvg scenario={id} method={s.method} />

      <Callout tone="info" title="读 SWS 时不要把两端端口写反">
        Manifest 写「映射到应用的 PPort/RPort」。SWS 写「Diagnostic Server 利用
        associated RPort 去 Read」时，说的是 DM 自己的客户端端口。两端合在一起才是一对。
      </Callout>

      <H2>三条通路对照</H2>
      <Table
        headers={["用例", "协议/触发", "应用端口", "DM 端口", "调用方向", "依据"]}
        rows={[
          [
            "读 DID",
            "0x22",
            "PPort",
            "RPort",
            "DM → App.Read",
            "[TPS_MANI_01263] [constr_10060] [SWS_DM 读外部 DataElement]",
          ],
          [
            "上报故障",
            "Monitor",
            "RPort",
            "PPort",
            "App → DM.ReportMonitorAction",
            "[TPS_MANI_01351] [constr_10047]",
          ],
          [
            "APCE 认证",
            "0x29",
            "PPort",
            "RPort",
            "DM → App.VerifyCertificate…",
            "[constr_10092] [SWS_DM_01124]",
          ],
        ]}
      />

      <Divider />
      <Text size="small" tone="tertiary">
        来源：autosar/dm/autosar/AUTOSAR_AP_TPS_ManifestSpecification_R25-11.pdf、
        AUTOSAR_AP_SWS_Diagnostics_R25-11.pdf。Markdown 仅作检索。
      </Text>
    </Stack>
  );
}

function UseCaseSvg({ scenario }: { scenario: Scenario }) {
  const t = useHostTheme();
  const hi = (id: Scenario) =>
    scenario === id ? t.accent.primary : t.stroke.secondary;
  const hiFill = (id: Scenario) =>
    scenario === id ? t.fill.tertiary : t.bg.elevated;

  return (
    <svg viewBox="0 0 760 280" width="100%" role="img" aria-label="诊断通信用例图">
      <rect x="1" y="1" width="758" height="278" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="20" y="24" fill={t.text.secondary} fontSize="12">
        系统边界：车载诊断（DM + 应用 SWC）
      </text>
      <rect x="150" y="40" width="460" height="220" fill="none" stroke={t.stroke.tertiary} strokeDasharray="4 3" />
      <text x="160" y="58" fill={t.text.tertiary} fontSize="11">
        Diagnostic Management 与 Adaptive Application
      </text>

      <ellipse cx="70" cy="150" rx="42" ry="22" fill={t.fill.secondary} stroke={t.stroke.primary} />
      <text x="70" y="154" textAnchor="middle" fill={t.text.primary} fontSize="11">
        Tester
      </text>

      <ellipse cx="690" cy="150" rx="48" ry="22" fill={t.fill.secondary} stroke={t.stroke.primary} />
      <text x="690" y="154" textAnchor="middle" fill={t.text.primary} fontSize="11">
        应用 SWC
      </text>

      <ellipse cx="380" cy="95" rx="108" ry="28" fill={hiFill("did")} stroke={hi("did")} />
      <text x="380" y="99" textAnchor="middle" fill={t.text.primary} fontSize="12">
        UC1 读取 DID（0x22）
      </text>

      <ellipse cx="380" cy="160" rx="108" ry="28" fill={hiFill("monitor")} stroke={hi("monitor")} />
      <text x="380" y="164" textAnchor="middle" fill={t.text.primary} fontSize="12">
        UC2 上报故障（Monitor）
      </text>

      <ellipse cx="380" cy="225" rx="108" ry="28" fill={hiFill("auth")} stroke={hi("auth")} />
      <text x="380" y="229" textAnchor="middle" fill={t.text.primary} fontSize="12">
        UC3 认证（0x29 APCE）
      </text>

      <line x1="112" y1="150" x2="272" y2="95" stroke={t.stroke.primary} />
      <line x1="112" y1="150" x2="272" y2="225" stroke={t.stroke.primary} />
      <line x1="488" y1="95" x2="642" y2="150" stroke={hi("did")} />
      <line x1="488" y1="160" x2="642" y2="150" stroke={hi("monitor")} />
      <line x1="488" y1="225" x2="642" y2="150" stroke={hi("auth")} />
    </svg>
  );
}

function PortStructureSvg({
  appProvides,
  iface,
}: {
  appProvides: boolean;
  iface: string;
}) {
  const t = useHostTheme();
  const pFill = t.fill.tertiary;
  const rFill = t.fill.secondary;

  return (
    <svg viewBox="0 0 760 170" width="100%" role="img" aria-label="PPort 与 RPort 结构">
      <rect x="20" y="20" width="280" height="130" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="160" y="42" textAnchor="middle" fill={t.text.secondary} fontSize="12">
        Diagnostic Manager
      </text>
      <rect
        x="70"
        y="70"
        width="180"
        height="54"
        fill={appProvides ? rFill : pFill}
        stroke={t.stroke.primary}
      />
      <text x="160" y="92" textAnchor="middle" fill={t.text.primary} fontSize="13">
        {appProvides ? "RPort（Required）" : "PPort（Provided）"}
      </text>
      <text x="160" y="110" textAnchor="middle" fill={t.text.tertiary} fontSize="11">
        {appProvides ? "Find / 调用" : "Offer / 被调用"}
      </text>

      <rect x="460" y="20" width="280" height="130" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="600" y="42" textAnchor="middle" fill={t.text.secondary} fontSize="12">
        Application SWC
      </text>
      <rect
        x="510"
        y="70"
        width="180"
        height="54"
        fill={appProvides ? pFill : rFill}
        stroke={t.stroke.primary}
      />
      <text x="600" y="92" textAnchor="middle" fill={t.text.primary} fontSize="13">
        {appProvides ? "PPort（Provided）" : "RPort（Required）"}
      </text>
      <text x="600" y="110" textAnchor="middle" fill={t.text.tertiary} fontSize="11">
        {appProvides ? "Offer / 实现" : "Find / 调用"}
      </text>

      <line x1="250" y1="97" x2="510" y2="97" stroke={t.accent.primary} />
      <text x="380" y="88" textAnchor="middle" fill={t.accent.primary} fontSize="11">
        同一 {iface}
      </text>
    </svg>
  );
}

function SequenceSvg({ scenario, method }: { scenario: Scenario; method: string }) {
  const t = useHostTheme();
  const actors =
    scenario === "monitor"
      ? ["传感器/任务", "应用 SWC", "App RPort", "DM PPort", "DM / DEM"]
      : ["Tester", "DoIP/UDS", "DM", "DM RPort", "App PPort / AA"];
  const xs = [70, 210, 350, 490, 650];
  const steps =
    scenario === "did"
      ? [
          { from: 0, to: 1, y: 70, label: "0x22 DID=F190" },
          { from: 1, to: 2, y: 95, label: "会话/安全校验" },
          { from: 2, to: 3, y: 120, label: "走 associated RPort" },
          { from: 3, to: 4, y: 145, label: method },
          { from: 4, to: 4, y: 170, label: "应用组装数据", self: true },
          { from: 4, to: 3, y: 195, label: "positive value" },
          { from: 2, to: 0, y: 220, label: "62 F190 + data" },
        ]
      : scenario === "monitor"
        ? [
            { from: 0, to: 1, y: 70, label: "故障条件成立" },
            { from: 1, to: 2, y: 95, label: "Monitor 对象" },
            { from: 2, to: 3, y: 120, label: method },
            { from: 3, to: 4, y: 145, label: "去抖 / 置位 DTC" },
            { from: 4, to: 4, y: 170, label: "事件存储器更新", self: true },
            { from: 4, to: 1, y: 195, label: "（可选）状态通知" },
          ]
        : [
            { from: 0, to: 1, y: 70, label: "29 01 + 证书" },
            { from: 1, to: 2, y: 95, label: "APCE 子功能分发" },
            { from: 2, to: 3, y: 120, label: "Find Authentication" },
            { from: 3, to: 4, y: 145, label: method },
            { from: 4, to: 4, y: 170, label: "PKI 校验", self: true },
            { from: 4, to: 2, y: 195, label: "RV / challenge" },
            { from: 2, to: 0, y: 220, label: "69 01 + 响应" },
          ];

  return (
    <Stack gap={8}>
      <svg viewBox="0 0 760 250" width="100%" role="img" aria-label="顺序图">
        {xs.map((x, i) => (
          <g key={actors[i]}>
            <rect x={x - 55} y={8} width={110} height={28} fill={t.fill.secondary} stroke={t.stroke.primary} />
            <text x={x} y={26} textAnchor="middle" fill={t.text.primary} fontSize="11">
              {actors[i]}
            </text>
            <line x1={x} y1={36} x2={x} y2={240} stroke={t.stroke.tertiary} />
          </g>
        ))}
        {steps.map((step, i) => {
          if ("self" in step && step.self) {
            return (
              <g key={i}>
                <rect
                  x={xs[step.from] + 8}
                  y={step.y - 10}
                  width={70}
                  height={20}
                  fill="none"
                  stroke={t.accent.primary}
                />
                <text x={xs[step.from] + 46} y={step.y + 4} textAnchor="middle" fill={t.text.secondary} fontSize="10">
                  {step.label}
                </text>
              </g>
            );
          }
          const x1 = xs[step.from];
          const x2 = xs[step.to];
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={i}>
              <line x1={x1} y1={step.y} x2={x2 - 8 * dir} y2={step.y} stroke={t.accent.primary} />
              <polygon
                points={`${x2},${step.y} ${x2 - 8 * dir},${step.y - 4} ${x2 - 8 * dir},${step.y + 4}`}
                fill={t.accent.primary}
              />
              <text
                x={(x1 + x2) / 2}
                y={step.y - 6}
                textAnchor="middle"
                fill={t.text.secondary}
                fontSize="10"
              >
                {step.label}
              </text>
            </g>
          );
        })}
      </svg>
      <Text size="small" tone="secondary">
        {scenario === "did" && (
          <>
            应用侧是 <Code>PPort</Code>，必须 Offer；DM 作为客户端走{" "}
            <Code>RPort</Code> 调 <Code>{method}</Code>。
          </>
        )}
        {scenario === "monitor" && (
          <>
            应用侧是 <Code>RPort</Code>：应用是客户端，DM Offer Monitor 服务。故障上报不经过
            Tester。
          </>
        )}
        {scenario === "auth" && (
          <>
            与 DID 同构：应用 Offer Authentication AA（<Code>PPort</Code>
            ），DM 调用证书校验。R25 标准化路径是 APCE，不是 ACR。
          </>
        )}
      </Text>
    </Stack>
  );
}
