import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

const REQ_SERIES = {
  categories: ["R19", "R20", "R21", "R22", "R23", "R24", "R25"],
  counts: [754, 951, 1119, 1419, 1774, 1913, 2207],
  deltas: [0, 198, 168, 300, 355, 139, 294],
};

const KEYWORD_GROWTH = {
  categories: ["R20", "R21", "R22", "R23", "R24", "R25"],
  series: [
    {
      name: "SOVD (年增引用)",
      data: [0, 0, 715, 1058, 191, 1793],
      tone: "info" as const,
    },
    {
      name: "Authentication (年增引用)",
      data: [0, 499, 60, 116, -12, 54],
      tone: "warning" as const,
    },
  ],
};

export default function ApDmR19R25Evolution() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1>AUTOSAR AP DM：R19 → R25 技术演进</H1>
          <Pill tone="info">Specification of Diagnostics</Pill>
        </Row>
        <Text tone="secondary">
          从单一 UDS/DoIP 诊断服务器，演进为 UDS + SOVD 双栈、认证驱动、安全可观测、与
          CP 对齐的诊断管理平台。数据来源：AUTOSAR AP Diagnostic Management (R19~R25) 官方 PDF 文档。
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="754 → 2207" label="SWS_DM 需求数" tone="info" />
        <Stat value="+1453" label="净增需求（无删除）" tone="success" />
        <Stat value="~3.5×" label="规范文本体量" />
        <Stat value="+4" label="新增 UDS 服务" tone="warning" />
      </Grid>

      <Divider />

      <H2>规范体量与年度增量</H2>
      <Grid columns="1.4fr 1fr" gap={16}>
        <Card>
          <CardHeader>各版本 SWS_DM 需求规模</CardHeader>
          <CardBody>
            <LineChart
              categories={REQ_SERIES.categories}
              series={[
                {
                  name: "需求数（去重）",
                  data: REQ_SERIES.counts,
                  tone: "info",
                },
              ]}
              height={220}
              beginAtZero
            />
            <Text tone="tertiary" size="small" style={{ marginTop: 8 }}>
              Source: evolution_summary · R19-11～R25-11 · 统计 [SWS_DM_xxxxx]
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>相对上一版净增需求</CardHeader>
          <CardBody>
            <BarChart
              categories={REQ_SERIES.categories}
              series={[
                {
                  name: "净增条数",
                  data: REQ_SERIES.deltas,
                  tone: "success",
                },
              ]}
              height={220}
              beginAtZero
            />
            <Text tone="tertiary" size="small" style={{ marginTop: 8 }}>
              R22/R23 增幅最大（SOVD）；R24 以结构/术语收敛为主
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      <H2>四大技术演进方向</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone="info">协议</Pill>}>
            传输与协议扩展
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>DoIP Extension（R20）→ 0x29（R21）→ 0x38（R22）</Text>
              <Text>DoIP Amd 2023 / protocol v4 版本感知（R24/R25）</Text>
              <Text tone="secondary" size="small">
                新增服务：0x29 / 0x2A / 0x2C / 0x38
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone="info">SOVD</Pill>}>
            SOVD 引入与成熟
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>R22 概念 → R23 Part 2 可实施 → R25 原生数据/操作</Text>
              <Text>快照/扩展数据与 SOVD 记录 harmonization（R25）</Text>
              <Text tone="secondary" size="small">
                HTTP/HTTPS REST 与 UDS/DoIP 并列
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone="warning">安全</Pill>}>
            安全与访问控制
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>0x27 会话/安全级 → 0x29 + DynamicAccessList</Text>
              <Text>SecurityEvents + IAM（R24/R25，含 DoIP）</Text>
              <Text tone="secondary" size="small">
                External / ClientAuthentication、ServiceValidation
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm">工程</Pill>}>
            事件能力 + 平台一致性
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Event Combination、DTC suppressed、no-debouncing</Text>
              <Text>Reentrancy → Concurrency；CP 谐调；Violations</Text>
              <Text tone="secondary" size="small">
                DID/RID/DataElement 生成接口正式化
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      <H2>R19 vs R25 能力对比</H2>
      <Table
        headers={["维度", "R19-11 基线", "R25-11 目标态"]}
        columnAlign={["left", "left", "left"]}
        rows={[
          [
            "协议栈",
            "UDS + DoIP",
            "UDS + DoIP + SOVD/REST",
          ],
          [
            "客户端模型",
            "Diagnostic Conversation",
            "UDS Conversation + SOVD Conversation / Locks",
          ],
          [
            "访问控制",
            "Session + SecurityLevel (0x27)",
            "+ Authentication (0x29) + DynamicAccessList",
          ],
          [
            "配置输入",
            "DEXT",
            "DEXT + OpenAPI / SOVD 能力描述",
          ],
          [
            "UDS 增量服务",
            "0x10/11/14/19/22/27/28/2E/31/34–37/3E/85/86",
            "+0x29 / 0x2A / 0x2C / 0x38（0x2F 仍未实现）",
          ],
          [
            "安全可观测",
            "基础诊断处理",
            "SecurityEvents（UDS/DoIP）+ IAM 扩展",
          ],
          [
            "并发契约",
            "Reentrancy",
            "Concurrency + Standardized Violations",
          ],
          [
            "DoIP",
            "ISO 13400-2 基础",
            "v4 / 版本感知语义 + DoIP SecurityEvents",
          ],
        ]}
      />

      <Divider />

      <H2>分年度里程碑</H2>
      <Table
        headers={["版本", "需求", "新增要点", "收敛/更改"]}
        columnAlign={["left", "right", "left", "left"]}
        rows={[
          [
            "R19",
            "754",
            "基线：ara::diag、Conversation、DoIP、DEM",
            "过时需求/SI 移除；Final→published",
          ],
          [
            "R20",
            "951",
            "0x2A / 0x2C；DoIP Extension；MetaInfo/Reentrancy",
            "少量修订；目录重组",
          ],
          [
            "R21",
            "1119",
            "0x29 Authentication；Event Combination；认证 API",
            "会话/权限模型扩展",
          ],
          [
            "R22",
            "1419",
            "SOVD 概念；0x38；DTC suppressed；NRC 映射",
            "双栈架构萌芽",
          ],
          [
            "R23",
            "1774",
            "SOVD Part 2 落地；0x29 细化；SOVD API 全集",
            "可实施 REST 资源与锁",
          ],
          [
            "R24",
            "1913",
            "SecurityEvents；DoIP v4；no-debouncing；Violations",
            "结构重组；CP 对齐；Concurrency 术语迁移",
          ],
          [
            "R25",
            "2207",
            "SOVD 原生处理；快照/EDR harmonization；IAM/DoIP SE",
            "C++ 类型映射约束；可靠性增强",
          ],
        ]}
        rowTone={[
          "neutral",
          "info",
          "info",
          "success",
          "success",
          "warning",
          "success",
        ]}
      />

      <Divider />

      <H2>关键词密度跃迁（年度增量）</H2>
      <Card>
        <CardHeader>SOVD / Authentication 年增引用次数</CardHeader>
        <CardBody>
          <BarChart
            categories={KEYWORD_GROWTH.categories}
            series={KEYWORD_GROWTH.series}
            height={240}
          />
          <Text tone="tertiary" size="small" style={{ marginTop: 8 }}>
            Source: evolution_summary keyword delta · 负值表示相对上一版引用减少（如
            R24 Authentication −12）
          </Text>
        </CardBody>
      </Card>

      <Divider />

      <H2>对 DM 实现方的增量要求</H2>
      <Grid columns={2} gap={16}>
        <Stack gap={12}>
          <H3>必须新增</H3>
          <Table
            headers={["能力", "引入版本"]}
            rows={[
              ["SOVD 完整栈（REST / Locks / Operations）", "R22→R25"],
              ["UDS 0x29 + DynamicAccessList", "R21+"],
              ["0x2A / 0x2C / 0x38", "R20 / R22"],
              ["SecurityEvents + IAM", "R24/R25"],
              ["Event Combination + DTC suppressed", "R21/R22"],
              ["厂商错误码 → UDS NRC 标准映射", "R22"],
            ]}
          />
        </Stack>
        <Stack gap={12}>
          <H3>必须调整</H3>
          <Table
            headers={["既有能力", "变更要点"]}
            rows={[
              ["并发模型", "Reentrancy → Concurrency"],
              ["Monitor", "显式 no-debouncing"],
              ["DoIP", "按协议版本分支 + 2023 修订"],
              ["生成接口", "DID/RID/DataElement 正式类"],
              ["快照/EDR", "与 SOVD 数据记录统一"],
              ["与 CP 谐调", "行为/术语/NRC 语义对齐"],
            ]}
          />
        </Stack>
      </Grid>

      <Callout tone="warning" title="Known Limitations（R25 仍适用）">
        DM 仍不实现 0x2F InputOutputControlByIdentifier（RS_Diag_04218 →
        SWS_DM_NA）。另：RS_Diag_04171（与外部服务处理器的同步/异步双模式交互）亦为
        NA——AP 统一用 ara::core::Future，不做 CP Dcm 式 OpStatus sync/async
        配置。替代路径：0x2E / 0x31 / GenericUDSService / SOVD Operations。
      </Callout>

      <Divider />

      <H2>建议实现路线图</H2>
      <Grid columns={5} gap={8}>
        <Card>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>
                阶段 1
              </Text>
              <Text weight="semibold">R19 核心</Text>
              <Text tone="secondary" size="small">
                UDS/DoIP/Conversation/DEM + DEXT
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>
                阶段 2
              </Text>
              <Text weight="semibold">R20–R21</Text>
              <Text tone="secondary" size="small">
                0x2A/0x2C/0x29 + 认证基础设施
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>
                阶段 3
              </Text>
              <Text weight="semibold">R22–R23</Text>
              <Text tone="secondary" size="small">
                SOVD REST + 0x38 + Event Combo
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>
                阶段 4
              </Text>
              <Text weight="semibold">R24</Text>
              <Text tone="secondary" size="small">
                Concurrency / SE / DoIP v4 / CP
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stack gap={4}>
              <Text weight="semibold" style={{ color: theme.accent.primary }}>
                阶段 5
              </Text>
              <Text weight="semibold">R25</Text>
              <Text tone="secondary" size="small">
                SOVD 原生 + harmonization + IAM
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Text tone="tertiary" size="small">
        完整 Markdown 报告：autosar/dm/analysis/AUTOSAR_AP_DM_Evolution_Report_R19-R25.md
        · 机器摘要：evolution_summary.md / .json · 生成日 2026-07-21
      </Text>
    </Stack>
  );
}
