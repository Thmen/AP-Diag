import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type View = "overview" | "process" | "messages" | "examples" | "failure";
type Variant = "uni" | "bi";

const views: Array<{ id: View; label: string }> = [
  { id: "overview", label: "总览" },
  { id: "process", label: "处理流程" },
  { id: "messages", label: "认证消息流" },
  { id: "examples", label: "示例报文" },
  { id: "failure", label: "失败与 NRC" },
];

/** 表 74 中与 ACR 相关的 authenticationTask（不含 APCE C1：01–04） */
const authTasks = [
  ["00₁₆", "deAuthenticate", "DA", "M", "请求离开已认证状态"],
  ["05₁₆", "requestChallengeForAuthentication", "RCFA", "C2 ACR", "请求服务器输出 challenge"],
  ["06₁₆", "verifyProofOfOwnershipUnidirectional", "VPOWNU", "C2 ACR", "单向：验证 client POWN"],
  ["07₁₆", "verifyProofOfOwnershipBidirectional", "VPOWNB", "C2 ACR", "双向：验证 client POWN + 返回 server POWN"],
  ["08₁₆", "authenticationConfiguration", "AC", "M", "查询服务器认证配置（ACR 可选前置；RV 可返回 03/04）"],
];

const configReturn = [
  ["03₁₆", "ACACRAC", "ACR + 非对称密码学"],
  ["04₁₆", "ACACRSC", "ACR + 对称密码学"],
];

type Step = {
  n: string;
  actor: "Client" | "Server" | "Both";
  title: string;
  detail: string;
  wire?: string;
  note?: string;
  optional?: boolean;
  biOnly?: boolean;
  uniSkip?: boolean;
};

const processSteps: Step[] = [
  {
    n: "1",
    actor: "Client",
    title: "请求挑战",
    detail: "指示算法与是否建立会话密钥",
    wire: "0x29 / 05 · COCO · algorithmIndicator",
  },
  {
    n: "2–3",
    actor: "Server",
    title: "创建并返回 challengeServer",
    detail: "可指示 neededAdditionalParameter",
    wire: "0x69 / 05 · RV=00 · challengeServer · LOAP?",
  },
  {
    n: "4",
    actor: "Client",
    title: "创建 challengeClient",
    detail: "单向：若 POWN 需要则创建；双向：应创建",
    note: "d：若 challenge client 用于 Proof of Ownership client",
    optional: true,
  },
  {
    n: "5",
    actor: "Client",
    title: "计算 client-side POWN",
    detail: "非对称：私钥签令牌；对称：预共享密钥签名/MAC（HMAC/CMAC/GMAC 等）",
  },
  {
    n: "6",
    actor: "Client",
    title: "准备附加参数",
    detail: "仅当服务器在 (3) 指示需要时",
    note: "b：仅当服务器需要附加参数",
    optional: true,
  },
  {
    n: "7",
    actor: "Client",
    title: "发送 POWN 验证请求",
    detail: "单向用 06；双向用 07（challengeClient 为强制）",
    wire: "0x29 / 06|07 · AI · POWNCL · CHCL? · AP?",
  },
  {
    n: "8",
    actor: "Server",
    title: "验证 client-side POWN",
    detail: "失败则停止并返回适当响应",
  },
  {
    n: "9",
    actor: "Server",
    title: "计算 server-side POWN",
    detail: "对 client challenge（及视情况 server challenge）签名/MAC",
    biOnly: true,
    note: "a：仅双向",
  },
  {
    n: "10",
    actor: "Server",
    title: "会话密钥创建/派生",
    detail: "仅当 (1) 指示建立会话密钥",
    note: "c：仅安全诊断通信",
    optional: true,
  },
  {
    n: "11",
    actor: "Server",
    title: "按 rights/roles 授予访问",
    detail: "可再次 ACR 并用新 roles 替换当前授权（NOTE 5）",
  },
  {
    n: "12",
    actor: "Server",
    title: "肯定响应",
    detail: "RV=12；双向附加 server POWN；可选 sessionKeyInfo",
    wire: "0x69 / 06|07 · RV=12 · POWNSE? · SKI?",
  },
  {
    n: "13",
    actor: "Client",
    title: "验证 server-side POWN",
    detail: "失败可选择 deAuthenticate(00)，离开已认证状态",
    biOnly: true,
    note: "a：仅双向；见 NOTE 4",
  },
  {
    n: "14–16",
    actor: "Client",
    title: "会话密钥提取 / 验证 / 启用",
    detail: "步骤 (15) 确保会话密钥建立完整有效",
    note: "c：仅安全诊断通信",
    optional: true,
  },
];

type SeqItem = {
  kind: "msg" | "act";
  n: string;
  /** msg: 发送方；act: 执行方。"c" = Client，"s" = Server。 */
  side: "c" | "s";
  label: string;
  sub?: string;
  cond?: string;
  optional?: boolean;
  biOnly?: boolean;
};

const sequence: SeqItem[] = [
  {
    kind: "msg",
    n: "1",
    side: "c",
    label: "29 05  requestChallengeForAuthentication",
    sub: "communicationConfiguration · algorithmIndicator",
  },
  { kind: "act", n: "2", side: "s", label: "创建 challengeServer" },
  {
    kind: "msg",
    n: "3",
    side: "s",
    label: "69 05  RV=00 Request accepted",
    sub: "challengeServer · neededAdditionalParameter?",
  },
  {
    kind: "act",
    n: "4",
    side: "c",
    label: "创建 challengeClient",
    cond: "d｜双向为强制",
    optional: true,
  },
  {
    kind: "act",
    n: "5",
    side: "c",
    label: "计算 client-side POWN",
    cond: "非对称签名 / 对称 MAC",
  },
  {
    kind: "act",
    n: "6",
    side: "c",
    label: "准备 additionalParameter",
    cond: "b｜服务器指示需要时",
    optional: true,
  },
  {
    kind: "msg",
    n: "7",
    side: "c",
    label: "29 06｜07  verifyProofOfOwnership",
    sub: "AI · POWNCL · challengeClient · additionalParameter?",
  },
  { kind: "act", n: "8", side: "s", label: "验证 client-side POWN" },
  {
    kind: "act",
    n: "9",
    side: "s",
    label: "计算 server-side POWN",
    cond: "a｜仅双向",
    biOnly: true,
  },
  {
    kind: "act",
    n: "10",
    side: "s",
    label: "创建/派生并启用会话密钥",
    cond: "c｜安全诊断通信",
    optional: true,
  },
  { kind: "act", n: "11", side: "s", label: "按 rights/roles 授予访问" },
  {
    kind: "msg",
    n: "12",
    side: "s",
    label: "69 06｜07  RV=12 Ownership verified",
    sub: "proofOfOwnershipServer? · sessionKeyInfo?",
  },
  {
    kind: "act",
    n: "13",
    side: "c",
    label: "验证 server-side POWN",
    cond: "a｜仅双向，失败可发 00 deAuthenticate",
    biOnly: true,
  },
  {
    kind: "act",
    n: "14–16",
    side: "c",
    label: "提取 / 验证 / 启用会话密钥",
    cond: "c｜(15) 确保建立完整有效",
    optional: true,
  },
];

type MsgHop = {
  dir: "→" | "←";
  sf: string;
  name: string;
  payload: string;
  rv?: string;
};

const uniMsg: MsgHop[] = [
  {
    dir: "→",
    sf: "05",
    name: "requestChallengeForAuthentication",
    payload: "COCO · algorithmIndicator",
  },
  {
    dir: "←",
    sf: "05",
    name: "Challenge response",
    payload: "AI echo · challengeServer · neededAdditionalParameter?",
    rv: "00 Request accepted",
  },
  {
    dir: "→",
    sf: "06",
    name: "verifyProofOfOwnershipUnidirectional",
    payload: "AI · POWNCL · challengeClient? · additionalParameter?",
  },
  {
    dir: "←",
    sf: "06",
    name: "Ownership verified",
    payload: "AI echo · sessionKeyInfo?",
    rv: "12 Ownership verified, Authentication complete",
  },
];

const biMsg: MsgHop[] = [
  {
    dir: "→",
    sf: "05",
    name: "requestChallengeForAuthentication",
    payload: "COCO · algorithmIndicator",
  },
  {
    dir: "←",
    sf: "05",
    name: "Challenge response",
    payload: "AI echo · challengeServer · neededAdditionalParameter?",
    rv: "00 Request accepted",
  },
  {
    dir: "→",
    sf: "07",
    name: "verifyProofOfOwnershipBidirectional",
    payload: "AI · POWNCL · challengeClient(M) · additionalParameter?",
  },
  {
    dir: "←",
    sf: "07",
    name: "Ownership verified + server POWN",
    payload: "AI echo · proofOfOwnershipServer · sessionKeyInfo?",
    rv: "12 Ownership verified, Authentication complete",
  },
];

function FlowNode({
  title,
  detail,
  accent = false,
  muted = false,
}: {
  title: string;
  detail: string;
  accent?: boolean;
  muted?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        minWidth: 140,
        flex: "1 1 140px",
        padding: 10,
        border: `1px solid ${
          accent ? theme.accent.primary : muted ? theme.stroke.tertiary : theme.stroke.secondary
        }`,
        borderRadius: 6,
        background: accent
          ? theme.fill.secondary
          : muted
            ? theme.bg.editor
            : theme.fill.quaternary,
        opacity: muted ? 0.7 : 1,
      }}
    >
      <Text weight="semibold" style={{ margin: 0 }}>
        {title}
      </Text>
      <Text size="small" tone="secondary" style={{ margin: "4px 0 0" }}>
        {detail}
      </Text>
    </div>
  );
}

function Arrow() {
  const theme = useHostTheme();
  return (
    <div
      aria-hidden
      style={{
        alignSelf: "center",
        color: theme.text.tertiary,
        fontSize: 16,
        padding: "0 2px",
        flexShrink: 0,
      }}
    >
      →
    </div>
  );
}

function Overview() {
  return (
    <Stack gap={16}>
      <Callout tone="info" title="规范范围">
        ISO 14229-1:2020 §10.6.3 Authentication with Challenge-Response (ACR)。子功能 05/06/07
        仅用于 ACR（表 74 C2）。AUTOSAR AP DM R25 强制 APCE 子集，ACR 不在 DM 范围。
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="05→06|07" label="核心消息序" />
        <Stat value="非对称 / 对称" label="密码学模式" />
        <Stat value="单向 / 双向" label="认证变体" />
      </Grid>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>先决条件</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">
                <Text weight="semibold">非对称：</Text>
                客户端密钥对（私钥在客户端，公钥在服务器）；双向另需服务器密钥对。
              </Text>
              <Text size="small">
                <Text weight="semibold">对称：</Text>
                客户端与服务器预共享对称密钥。
              </Text>
              <Text size="small" tone="secondary">
                令牌构建建议参考 ISO/IEC 9798-2 / 9798-4（单向两遍 / 相互三遍）。
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>与 APCE 的差异</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">ACR 不交换证书链，直接以 challenge–POWN 证明所有权。</Text>
              <Text size="small">启动用 requestChallenge(05)，而非 verifyCertificate(01/02)。</Text>
              <Text size="small">POWN 验证用 06/07，而非 proofOfOwnership(03)。</Text>
              <Text size="small" tone="secondary">
                可选前置 authenticationConfiguration(08) 查询配置（RV=03/04）。
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3 style={{ margin: 0 }}>ACR 相关 authenticationTask（表 74）</H3>
      <Text size="small" tone="secondary">
        仅列 ACR 路径相关子功能：C2 = 仅 ACR；M = 强制。核心为 05→06|07；08 为可选前置；00
        用于去认证。已省略 APCE 专用子功能 01–04。
      </Text>
      <Table
        headers={["值", "authenticationTask", "Mnemonic", "Cvt", "作用"]}
        rows={authTasks}
        rowTone={[undefined, "info", "info", "info", "success"]}
      />

      <H3 style={{ margin: 0 }}>配置查询返回值（B.5，与 08 相关）</H3>
      <Table headers={["RV", "Mnemonic", "含义"]} rows={configReturn} />
    </Stack>
  );
}

function SequenceDiagram({ variant }: { variant: Variant }) {
  const theme = useHostTheme();
  const items = sequence.filter((s) => variant === "bi" || !s.biOnly);

  const width = 940;
  const clientX = 200;
  const serverX = 740;
  const headTop = 8;
  const headHeight = 34;
  const actWidth = 320;
  const actHeight = 40;
  const msgHeight = 54;
  const gap = 12;

  let cursor = headTop + headHeight + 24;
  const placed = items.map((item) => {
    const y = cursor;
    cursor += (item.kind === "msg" ? msgHeight : actHeight) + gap;
    return { item, y };
  });
  const height = cursor + 16;

  const muted = theme.stroke.tertiary;
  const line = theme.stroke.secondary;
  const accent = theme.accent.primary;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ minWidth: 720, display: "block" }}
        role="img"
        aria-label="ACR 认证时序图"
      >
        <defs>
          <marker
            id="acr-arrow-accent"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill={accent} />
          </marker>
          <marker
            id="acr-arrow-line"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill={theme.text.secondary} />
          </marker>
        </defs>

        {[
          { x: clientX, label: "Client（外部测试仪）" },
          { x: serverX, label: "Server（ECU）" },
        ].map((ll) => (
          <g key={ll.label}>
            <rect
              x={ll.x - 110}
              y={headTop}
              width={220}
              height={headHeight}
              rx={6}
              fill={theme.fill.secondary}
              stroke={line}
            />
            <text
              x={ll.x}
              y={headTop + headHeight / 2 + 4}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill={theme.text.primary}
            >
              {ll.label}
            </text>
            <line
              x1={ll.x}
              y1={headTop + headHeight}
              x2={ll.x}
              y2={height - 8}
              stroke={muted}
              strokeDasharray="4 4"
            />
          </g>
        ))}

        {placed.map(({ item, y }) => {
          const dimmed = item.optional === true;
          const stroke = item.biOnly ? accent : dimmed ? muted : line;

          if (item.kind === "msg") {
            const fromX = item.side === "c" ? clientX : serverX;
            const toX = item.side === "c" ? serverX : clientX;
            const dir = item.side === "c" ? 1 : -1;
            const arrowY = y + 34;
            return (
              <g key={item.n + item.label}>
                <text
                  x={(clientX + serverX) / 2}
                  y={y + 12}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill={theme.text.primary}
                >
                  {`(${item.n})  ${item.label}`}
                </text>
                {item.sub ? (
                  <text
                    x={(clientX + serverX) / 2}
                    y={y + 27}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill={theme.text.tertiary}
                  >
                    {item.sub}
                  </text>
                ) : null}
                <line
                  x1={fromX + 4 * dir}
                  y1={arrowY}
                  x2={toX - 10 * dir}
                  y2={arrowY}
                  stroke={theme.text.secondary}
                  strokeWidth={1.4}
                  markerEnd="url(#acr-arrow-line)"
                />
              </g>
            );
          }

          const cx = item.side === "c" ? clientX : serverX;
          return (
            <g key={item.n + item.label}>
              <rect
                x={cx - actWidth / 2}
                y={y}
                width={actWidth}
                height={actHeight}
                rx={5}
                fill={dimmed ? theme.bg.editor : theme.fill.quaternary}
                stroke={stroke}
                strokeDasharray={dimmed ? "4 3" : undefined}
              />
              <text
                x={cx - actWidth / 2 + 12}
                y={item.cond ? y + 17 : y + 24}
                fontSize={11.5}
                fontWeight={600}
                fill={theme.text.primary}
              >
                {`(${item.n})  ${item.label}`}
              </text>
              {item.cond ? (
                <text
                  x={cx - actWidth / 2 + 12}
                  y={y + 31}
                  fontSize={10}
                  fill={theme.text.tertiary}
                >
                  {item.cond}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ProcessFlowchart({ variant }: { variant: Variant }) {
  const theme = useHostTheme();
  const isBi = variant === "bi";
  const poSf = isBi ? "07" : "06";

  type NodeKind = "start" | "end" | "proc" | "msg" | "dec" | "fail";
  type FlowNodeSpec = {
    id: string;
    kind: NodeKind;
    label: string;
    sub?: string;
  };

  const nodes: FlowNodeSpec[] = [
    { id: "start", kind: "start", label: "开始 ACR" },
    {
      id: "d08",
      kind: "dec",
      label: "可选 08 查询配置？",
      sub: "authenticationConfiguration",
    },
    {
      id: "m08",
      kind: "msg",
      label: "29 / 08 → 69 / 08",
      sub: "RV=03 ACACRAC 或 04 ACACRSC",
    },
    {
      id: "m05",
      kind: "msg",
      label: "29 / 05  requestChallenge",
      sub: "(1) COCO · algorithmIndicator",
    },
    {
      id: "a23",
      kind: "proc",
      label: "服务器创建并返回 challenge",
      sub: "(2–3) 69 / 05 · RV=00 · challengeServer",
    },
    {
      id: "dap",
      kind: "dec",
      label: "需要附加参数？",
      sub: "图注 b",
    },
    {
      id: "a6",
      kind: "proc",
      label: "准备 additionalParameter",
      sub: "(6)",
    },
    {
      id: "dch",
      kind: isBi ? "proc" : "dec",
      label: isBi ? "创建 challengeClient（强制）" : "POWN 需要 challengeClient？",
      sub: isBi ? "(4) 双向" : "图注 d · (4)",
    },
    {
      id: "a4",
      kind: "proc",
      label: "创建 challengeClient",
      sub: "(4)",
    },
    {
      id: "a5",
      kind: "proc",
      label: "计算 client-side POWN",
      sub: "(5) 非对称签名 / 对称 MAC",
    },
    {
      id: "m67",
      kind: "msg",
      label: `29 / ${poSf}  verifyProofOfOwnership`,
      sub: `(7) AI · POWNCL · CHCL${isBi ? "" : "?"} · AP?`,
    },
    {
      id: "dv",
      kind: "dec",
      label: "client POWN 验证通过？",
      sub: "(8)",
    },
    {
      id: "fail8",
      kind: "fail",
      label: "否定响应 / 厂商 RV",
      sub: "例：NRC 51 invalidSignature",
    },
    ...(isBi
      ? ([
          {
            id: "a9",
            kind: "proc",
            label: "计算 server-side POWN",
            sub: "(9) 图注 a",
          },
        ] as FlowNodeSpec[])
      : []),
    {
      id: "dski",
      kind: "dec",
      label: "建立会话密钥？",
      sub: "图注 c · COCO",
    },
    {
      id: "a10",
      kind: "proc",
      label: "派生并启用会话密钥",
      sub: "(10) sessionKeyInfo",
    },
    {
      id: "a11",
      kind: "proc",
      label: "按 rights/roles 授予访问",
      sub: "(11)",
    },
    {
      id: "m12",
      kind: "msg",
      label: `69 / ${poSf}  RV=12`,
      sub: isBi
        ? "(12) Ownership verified · server POWN · SKI?"
        : "(12) Ownership verified · SKI?",
    },
    ...(isBi
      ? ([
          {
            id: "dv13",
            kind: "dec",
            label: "server POWN 验证通过？",
            sub: "(13) 图注 a",
          },
          {
            id: "fail13",
            kind: "fail",
            label: "可选 deAuthenticate 00",
            sub: "NOTE 4：离开已认证状态",
          },
        ] as FlowNodeSpec[])
      : []),
    {
      id: "dski2",
      kind: "dec",
      label: "启用会话密钥？",
      sub: "图注 c",
    },
    {
      id: "a1416",
      kind: "proc",
      label: "提取 / 验证 / 启用会话密钥",
      sub: "(14–16)",
    },
    { id: "ok", kind: "end", label: "认证完成" },
  ];

  // Vertical spine layout with side exits for failure / optional branches
  const width = 920;
  const cx = 460;
  const boxW = 280;
  const boxH = 44;
  const decSize = 58;
  const gapY = 22;
  const sideX = 720;

  type Placed = {
    id: string;
    kind: NodeKind;
    label: string;
    sub?: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };

  const placed: Placed[] = [];
  let y = 24;
  const sideIds = new Set(["fail8", "fail13", "m08", "a6", "a4", "a10", "a1416"]);
  for (const n of nodes) {
    // 双向时 a4 已并入主轴 dch，完全跳过
    if (isBi && n.id === "a4") continue;
    if (sideIds.has(n.id)) continue;
    const h = n.kind === "dec" ? decSize * 2 : boxH;
    const w = n.kind === "dec" ? decSize * 2 : boxW;
    placed.push({
      id: n.id,
      kind: n.kind,
      label: n.label,
      sub: n.sub,
      x: cx - w / 2,
      y,
      w,
      h,
    });
    y += h + gapY;
  }

  const byId = (id: string) => placed.find((p) => p.id === id)!;
  const nodeBySpec = (id: string) => nodes.find((n) => n.id === id)!;

  // Side / optional nodes anchored to decisions
  const attachSide = (
    afterId: string,
    sideId: string,
    dx: number,
  ): Placed => {
    const anchor = byId(afterId);
    const spec = nodeBySpec(sideId);
    const w = boxW * 0.92;
    const h = boxH;
    const p: Placed = {
      id: sideId,
      kind: spec.kind,
      label: spec.label,
      sub: spec.sub,
      x: dx - w / 2,
      y: anchor.y + (anchor.h - h) / 2,
      w,
      h,
    };
    placed.push(p);
    return p;
  };

  attachSide("d08", "m08", sideX);
  attachSide("dap", "a6", sideX);
  if (!isBi) attachSide("dch", "a4", sideX);
  attachSide("dv", "fail8", sideX);
  attachSide("dski", "a10", sideX);
  if (isBi) attachSide("dv13", "fail13", sideX);
  attachSide("dski2", "a1416", sideX);

  const height = y + 40;

  type Edge = {
    from: string;
    to: string;
    label?: string;
    dashed?: boolean;
    side?: boolean;
  };

  const edges: Edge[] = [
    { from: "start", to: "d08" },
    { from: "d08", to: "m08", label: "是", side: true },
    { from: "d08", to: "m05", label: "否" },
    { from: "m08", to: "m05", dashed: true, side: true },
    { from: "m05", to: "a23" },
    { from: "a23", to: "dap" },
    { from: "dap", to: "a6", label: "是", side: true },
    { from: "dap", to: "dch", label: "否" },
    { from: "a6", to: "dch", dashed: true, side: true },
  ];
  if (isBi) {
    edges.push({ from: "dch", to: "a5" });
  } else {
    edges.push(
      { from: "dch", to: "a4", label: "是", side: true },
      { from: "dch", to: "a5", label: "否" },
      { from: "a4", to: "a5", dashed: true, side: true },
    );
  }
  edges.push(
    { from: "a5", to: "m67" },
    { from: "m67", to: "dv" },
    { from: "dv", to: "fail8", label: "否", side: true },
    {
      from: "dv",
      to: isBi ? "a9" : "dski",
      label: "是",
    },
  );
  if (isBi) {
    edges.push({ from: "a9", to: "dski" });
  }
  edges.push(
    { from: "dski", to: "a10", label: "是", side: true },
    { from: "dski", to: "a11", label: "否" },
    { from: "a10", to: "a11", dashed: true, side: true },
    { from: "a11", to: "m12" },
  );
  if (isBi) {
    edges.push(
      { from: "m12", to: "dv13" },
      { from: "dv13", to: "fail13", label: "否", side: true },
      { from: "dv13", to: "dski2", label: "是" },
    );
  } else {
    edges.push({ from: "m12", to: "dski2" });
  }
  edges.push(
    { from: "dski2", to: "a1416", label: "是", side: true },
    { from: "dski2", to: "ok", label: "否" },
    { from: "a1416", to: "ok", dashed: true, side: true },
  );

  const find = (id: string) => placed.find((p) => p.id === id)!;
  const center = (p: Placed) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 });
  const bottom = (p: Placed) => ({ x: p.x + p.w / 2, y: p.y + p.h });
  const top = (p: Placed) => ({ x: p.x + p.w / 2, y: p.y });
  const right = (p: Placed) => ({ x: p.x + p.w, y: p.y + p.h / 2 });
  const left = (p: Placed) => ({ x: p.x, y: p.y + p.h / 2 });

  const stroke = theme.stroke.secondary;
  const accent = theme.accent.primary;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ minWidth: 760, display: "block" }}
        role="img"
        aria-label="ACR 认证处理流程图"
      >
        <defs>
          <marker
            id="acr-fc-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill={theme.text.secondary} />
          </marker>
        </defs>

        {edges.map((e, i) => {
          const a = find(e.from);
          const b = find(e.to);
          let d: string;
          let lx = 0;
          let ly = 0;
          if (e.side && b.x > a.x + a.w) {
            // horizontal then maybe vertical to side node
            const s = right(a);
            const t = left(b);
            d = `M ${s.x} ${s.y} L ${t.x} ${t.y}`;
            lx = (s.x + t.x) / 2;
            ly = s.y - 8;
          } else if (e.side && e.dashed && a.x > cx) {
            // return from side node down into next main node
            const s = bottom(a);
            const t = top(b);
            const midY = (s.y + t.y) / 2;
            d = `M ${s.x} ${s.y} L ${s.x} ${midY} L ${t.x} ${midY} L ${t.x} ${t.y}`;
            lx = (s.x + t.x) / 2;
            ly = midY - 6;
          } else {
            const s = bottom(a);
            const t = top(b);
            d = `M ${s.x} ${s.y} L ${t.x} ${t.y}`;
            lx = s.x + 10;
            ly = (s.y + t.y) / 2;
          }
          return (
            <g key={`${e.from}-${e.to}-${i}`}>
              <path
                d={d}
                fill="none"
                stroke={stroke}
                strokeWidth={1.3}
                strokeDasharray={e.dashed ? "5 4" : undefined}
                markerEnd="url(#acr-fc-arrow)"
              />
              {e.label ? (
                <text
                  x={lx}
                  y={ly}
                  fontSize={10}
                  fill={theme.text.tertiary}
                >
                  {e.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {placed.map((p) => {
          const c = center(p);
          if (p.kind === "dec") {
            const s = p.w / 2;
            const pts = `${c.x},${p.y} ${p.x + p.w},${c.y} ${c.x},${p.y + p.h} ${p.x},${c.y}`;
            return (
              <g key={p.id}>
                <polygon
                  points={pts}
                  fill={theme.fill.secondary}
                  stroke={accent}
                  strokeWidth={1.4}
                />
                <text
                  x={c.x}
                  y={c.y - (p.sub ? 2 : 0)}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={theme.text.primary}
                >
                  {p.label}
                </text>
                {p.sub ? (
                  <text
                    x={c.x}
                    y={c.y + 12}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill={theme.text.tertiary}
                  >
                    {p.sub}
                  </text>
                ) : null}
              </g>
            );
          }

          const fill =
            p.kind === "fail"
              ? theme.fill.quaternary
              : p.kind === "msg"
                ? theme.fill.secondary
                : p.kind === "start" || p.kind === "end"
                  ? theme.fill.secondary
                  : theme.fill.quaternary;
          const border =
            p.kind === "fail"
              ? theme.stroke.primary
              : p.kind === "msg"
                ? accent
                : stroke;

          return (
            <g key={p.id}>
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={p.kind === "start" || p.kind === "end" ? 20 : 6}
                fill={fill}
                stroke={border}
                strokeWidth={p.kind === "msg" || p.kind === "fail" ? 1.4 : 1}
              />
              <text
                x={c.x}
                y={p.sub ? c.y - 4 : c.y + 4}
                textAnchor="middle"
                fontSize={11.5}
                fontWeight={600}
                fill={theme.text.primary}
              >
                {p.label}
              </text>
              {p.sub ? (
                <text
                  x={c.x}
                  y={c.y + 12}
                  textAnchor="middle"
                  fontSize={10}
                  fill={theme.text.tertiary}
                >
                  {p.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ProcessFlow() {
  const [variant, setVariant] = useCanvasState<Variant>("acr-variant", "uni");
  const [mode, setMode] = useCanvasState<"flowchart" | "diagram" | "table">(
    "acr-proc-mode-v2",
    "flowchart",
  );
  const visible = processSteps.filter((s) => {
    if (variant === "uni" && s.biOnly) return false;
    return true;
  });

  return (
    <Stack gap={16}>
      <Row gap={8} style={{ flexWrap: "wrap" }}>
        <Pill active={variant === "uni"} onClick={() => setVariant("uni")}>
          变体 1：单向
        </Pill>
        <Pill active={variant === "bi"} onClick={() => setVariant("bi")}>
          变体 2：双向
        </Pill>
        <Spacer />
        <Pill active={mode === "flowchart"} onClick={() => setMode("flowchart")}>
          流程图
        </Pill>
        <Pill active={mode === "diagram"} onClick={() => setMode("diagram")}>
          时序图
        </Pill>
        <Pill active={mode === "table"} onClick={() => setMode("table")}>
          步骤表
        </Pill>
      </Row>

      <Callout tone="neutral" title={variant === "uni" ? "单向 ACR" : "双向 ACR"}>
        {variant === "uni"
          ? "仅认证客户端相对服务器。步骤 (9)/(13) 不使用。服务器不对客户端认证自身（NOTE 4）。"
          : "相互三遍：客户端验证 server-side POWN（步骤 13）。challengeClient 在 07 请求中为强制。"}
      </Callout>

      {mode === "flowchart" ? (
        <Stack gap={8}>
          <ProcessFlowchart variant={variant} />
          <Text size="small" tone="tertiary">
            菱形 = 决策分支；圆角框 = 起止；蓝色描边框 = 0x29/0x69 报文；右侧支路为「是/可选」或失败出口。
            步骤号对应 ISO 14229-1:2020 §10.6.3 与图 10。
          </Text>
        </Stack>
      ) : null}

      {mode === "diagram" ? (
        <Stack gap={8}>
          <SequenceDiagram variant={variant} />
          <Text size="small" tone="tertiary">
            实线箭头为 0x29/0x69 报文；方框为本地处理步骤。虚线框 = 条件步骤（图注 b/c/d）；蓝色描边 =
            仅双向（图注 a）。步骤号对应 ISO 14229-1:2020 §10.6.3 与图 10。
          </Text>
        </Stack>
      ) : null}

      {mode === "table" ? (
        <Table
          headers={["步骤", "角色", "动作", "报文 / 备注"]}
          rows={visible.map((s) => [
            s.n,
            s.actor,
            `${s.title}${s.optional ? "（可选）" : ""}${s.biOnly ? "（仅双向）" : ""}`,
            [s.detail, s.wire, s.note].filter(Boolean).join(" · "),
          ])}
          rowTone={visible.map((s) =>
            s.biOnly ? ("info" as const) : s.optional ? ("neutral" as const) : undefined,
          )}
        />
      ) : null}

      <H3 style={{ margin: 0 }}>图 10 条件标记</H3>
      <Grid columns={2} gap={8}>
        {[
          ["a", "使用双向认证时"],
          ["b", "仅当服务器需要附加参数进行认证时"],
          ["c", "仅当使用安全诊断通信时"],
          ["d", "若 challenge client 用于 Proof of Ownership client"],
          ["e", "可选地在各 POWN 中包含 challenge server 与 challenge client"],
        ].map(([k, v]) => (
          <span key={k}>
            <Row gap={8} style={{ alignItems: "center" }}>
              <Pill size="sm">{k}</Pill>
              <Text size="small">{v}</Text>
            </Row>
          </span>
        ))}
      </Grid>
    </Stack>
  );
}

function MessageFlow() {
  const [variant, setVariant] = useCanvasState<Variant>("acr-msg-variant", "uni");
  const hops = variant === "uni" ? uniMsg : biMsg;
  const theme = useHostTheme();

  return (
    <Stack gap={16}>
      <Row gap={8} style={{ flexWrap: "wrap" }}>
        <Pill active={variant === "uni"} onClick={() => setVariant("uni")}>
          单向消息流（05→06）
        </Pill>
        <Pill active={variant === "bi"} onClick={() => setVariant("bi")}>
          双向消息流（05→07）
        </Pill>
      </Row>

      <Text size="small" tone="secondary">
        Client（外部测试仪） ←→ Server（ECU）。可选前置 08 查询配置；会话结束后可用 00
        deAuthenticate。
      </Text>

      <Stack gap={10}>
        {hops.map((h, i) => (
          <div
            key={`${h.sf}-${i}`}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 28px 1fr",
              gap: 10,
              alignItems: "start",
              padding: 12,
              borderRadius: 6,
              border: `1px solid ${theme.stroke.secondary}`,
              background: h.dir === "→" ? theme.fill.quaternary : theme.fill.secondary,
            }}
          >
            <Stack gap={4}>
              <Text weight="semibold" size="small">
                {h.dir === "→" ? "请求" : "响应"}
              </Text>
              <Code>{h.dir === "→" ? "29" : "69"} / {h.sf}</Code>
            </Stack>
            <Text
              style={{
                textAlign: "center",
                color: theme.accent.primary,
                fontWeight: 600,
                paddingTop: 2,
              }}
            >
              {h.dir}
            </Text>
            <Stack gap={4}>
              <Text weight="semibold">{h.name}</Text>
              <Text size="small" tone="secondary">
                {h.payload}
              </Text>
              {h.rv ? (
                <Text size="small">
                  returnValue: <Code>{h.rv}</Code>
                </Text>
              ) : null}
            </Stack>
          </div>
        ))}
      </Stack>

      <Divider />

      <H3 style={{ margin: 0 }}>关键字段对照</H3>
      <Table
        headers={["字段", "出现条件", "说明"]}
        rows={[
          [
            "challengeClient",
            "06：C（length≠0）；07：M",
            "客户端挑战；双向强制，用于 server POWN",
          ],
          [
            "proofOfOwnershipClient",
            "06/07：M",
            "对 challengeServer（及可选 CHCL/附加信息）的所有权证明",
          ],
          [
            "proofOfOwnershipServer",
            "仅 07 正响应",
            "服务器对 challengeClient 的所有权证明",
          ],
          [
            "neededAdditionalParameter / additionalParameter",
            "图注 b",
            "服务器在 05 响应指示需要时，客户端在 06/07 携带",
          ],
          [
            "sessionKeyInfo",
            "图注 c",
            "COCO 指示安全诊断通信时出现；会话内最长有效",
          ],
          [
            "algorithmIndicator",
            "05 请求与 06/07 请求；响应回显",
            "16 字节算法 OID BER，右填 0",
          ],
        ]}
      />

      <Callout tone="warning" title="顺序约束（NRC 24）">
        未先成功处理 requestChallengeForAuthentication(05) 就收到
        verifyProofOfOwnershipUnidirectional/Bidirectional(06/07) → requestSequenceError（24₁₆）。
      </Callout>
    </Stack>
  );
}

function Examples() {
  const [ex, setEx] = useCanvasState<"e4" | "e5" | "e6" | "e7">("acr-example", "e4");

  const tabs: Array<{ id: "e4" | "e5" | "e6" | "e7"; label: string }> = [
    { id: "e4", label: "#4 非对称成功" },
    { id: "e5", label: "#5 非对称失败" },
    { id: "e6", label: "#6 对称成功" },
    { id: "e7", label: "#7 对称失败" },
  ];

  return (
    <Stack gap={16}>
      <Row gap={8} style={{ flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <span key={t.id}>
            <Pill active={ex === t.id} onClick={() => setEx(t.id)}>
              {t.label}
            </Pill>
          </span>
        ))}
      </Row>

      {ex === "e4" ? (
        <Stack gap={12}>
          <Callout tone="success" title="示例 #4 — ACR 非对称，不建会话密钥（成功）">
            AI = RSASSA-PSS OID 1.2.840.113549.1.1.10（BER，16 字节右填 0）。COCO=00。client
            POWN 为 ISO/IEC 7816-8 CVC 风格 TLV（7F21 / 7F4E / 5F37）。
          </Callout>
          <Table
            headers={["步骤", "方向", "关键字节", "要点"]}
            rows={[
              ["可选 08", "→←", "RV=03 ACACRAC", "确认 ACR 非对称配置"],
              [
                "表 103/104",
                "→← 05",
                "CHSE len=0040₁₆；LOAP=0000",
                "64 B challengeServer（标识‖随机）",
              ],
              [
                "表 105",
                "→ 06",
                "POWNCL=0150₁₆；CHCL=0020₁₆；AP=0000",
                "336 B 令牌 + 32 B challengeClient",
              ],
              ["表 106", "← 06", "RV=12；SKI=0000", "Ownership verified, Authentication complete"],
            ]}
          />
        </Stack>
      ) : null}

      {ex === "e5" ? (
        <Stack gap={12}>
          <Callout tone="danger" title="示例 #5 — 同 #4，但 POWN 签名无效">
            表 110 否定响应：7F / 29 / 51（invalidSignature）。前提另述可用正响应
            RV=21（厂商范围）指示无效签名——实现以 OEM 规范选择路径。
          </Callout>
          <Table
            headers={["步骤", "结果", "说明"]}
            rows={[
              ["05 请求/响应", "同 #4 成功", "challenge 正常下发"],
              ["06 请求", "布局同表 105", "含 32 B challengeClient，但签名错误"],
              ["表 110", "NRC 51₁₆", "invalidSignature / NRC_CVFIS"],
            ]}
          />
        </Stack>
      ) : null}

      {ex === "e6" ? (
        <Stack gap={12}>
          <Callout tone="success" title="示例 #6 — ACR 对称，不建会话密钥（成功）">
            AI = AES-128-CBC OID 2.16.840.1.101.3.4.1.2。示例密钥
            2B7E151628AED2A6ABF7158809CF4F3C。无 challengeClient、无附加参数。
          </Callout>
          <Table
            headers={["步骤", "方向", "关键字节", "要点"]}
            rows={[
              ["表 111/112", "→← 05", "CHSE len=0010₁₆", "16 B challengeServer"],
              [
                "表 113",
                "→ 06",
                "POWNCL=0010₁₆；CHCL=0000；AP=0000",
                "POWN = AES(challengeServer)",
              ],
              ["表 114", "← 06", "RV=12；SKI=0000", "认证完成"],
            ]}
          />
          <Text size="small" tone="secondary">
            challengeServer 示例：32 43 F6 A8 88 5A 30 8D 31 31 98 A2 E0 37 07 34₁₆；POWN 示例：39
            25 84 1D 02 DC 09 FB DC 11 85 97 19 6A 0B 32₁₆。
          </Text>
        </Stack>
      ) : null}

      {ex === "e7" ? (
        <Stack gap={12}>
          <Callout tone="danger" title="示例 #7 — 同 #6，但双方 AES 密钥不匹配">
            客户端用错误密钥计算 POWN，服务器验证失败。否定响应路径同签名/所有权验证失败类 NRC。
          </Callout>
          <Table
            headers={["步骤", "结果", "说明"]}
            rows={[
              ["05", "成功", "challenge 正常"],
              ["06 请求", "POWN 长度仍 0010₁₆", "密文由错误密钥产生"],
              ["否定响应", "所有权验证失败", "停止认证；失败尝试策略由 OEM 决定（NOTE 3）"],
            ]}
          />
        </Stack>
      ) : null}
    </Stack>
  );
}

function Failure() {
  return (
    <Stack gap={16}>
      <Callout tone="warning" title="任一步验证失败">
        服务器或客户端应停止认证并发送适当响应。客户端应显示适当消息（外部测试设备规范）。失败尝试管理（最大次数、延时等）由整车厂决定（NOTE 3）。
      </Callout>

      <Table
        headers={["NRC / RV", "Mnemonic", "与 ACR 相关的触发"]}
        rows={[
          [
            "24₁₆",
            "requestSequenceError",
            "未先成功 05 就收到 06/07",
          ],
          ["51₁₆", "invalidSignature", "示例 #5：POWN 签名无效"],
          [
            "12₁₆ (RV)",
            "Ownership verified, Authentication complete",
            "06/07 成功完成认证",
          ],
          [
            "00₁₆ (RV)",
            "Request accepted",
            "05 挑战请求被接受",
          ],
          [
            "21₁₆ (RV)",
            "厂商特定（示例前提）",
            "可用正响应指示无效签名；与 NRC 51 二选一（OEM）",
          ],
        ]}
      />

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>客户端侧认证失败（双向）</CardHeader>
          <CardBody>
            <Text size="small">
              尤其在服务器已接受客户端并设置访问权限之后，客户端可发送{" "}
              <Code>deAuthenticate (00)</Code>，确保服务器离开已认证状态并拒绝后续未授权请求（NOTE
              4）。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>会话密钥寿命</CardHeader>
          <CardBody>
            <Text size="small">
              本子条款建立的会话密钥，最长有效期为该已认证会话的持续时间。rights/roles
              可通过再次 ACR 在步骤 (4) 使用新值替换（NOTE 5）。
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <H3 style={{ margin: 0 }}>服务顺序（§10.6.4）</H3>
      <Row gap={6} style={{ flexWrap: "wrap", alignItems: "stretch" }}>
        <FlowNode title="1. Authentication" detail="0x29 ACR 完成" accent />
        <Arrow />
        <FlowNode title="2. 受保护服务" detail="其后的诊断请求" />
      </Row>
    </Stack>
  );
}

export default function Iso14229AcrAuthFlow() {
  const [view, setView] = useCanvasState<View>("acr-view", "process");

  return (
    <Stack gap={20} style={{ padding: 20, maxWidth: 1100 }}>
      <Stack gap={6}>
        <H1 style={{ margin: 0 }}>ACR 认证处理与消息流</H1>
        <Text tone="secondary">
          ISO 14229-1:2020 §10.6.3 / 图 10 / 示例 #4–#7 · Authentication with Challenge-Response
        </Text>
      </Stack>

      <Row gap={8} style={{ flexWrap: "wrap" }}>
        {views.map((v) => (
          <span key={v.id}>
            <Pill active={view === v.id} onClick={() => setView(v.id)}>
              {v.label}
            </Pill>
          </span>
        ))}
      </Row>

      <Divider />

      {view === "overview" ? <Overview /> : null}
      {view === "process" ? <ProcessFlow /> : null}
      {view === "messages" ? <MessageFlow /> : null}
      {view === "examples" ? <Examples /> : null}
      {view === "failure" ? <Failure /> : null}

      <Divider />
      <Text size="small" tone="tertiary">
        数据来源：autosar/dm/analysis/UDS_0x29/ISO_14229-1_2020_UDS_0x29_Translation_Full_Spec.md（对照
        ISO 14229-1:2020 PDF §10.6.3、B.5）
      </Text>
    </Stack>
  );
}
