import type {
  Capability,
  MachineMetric,
  MetricCard,
  NavItem,
  PainPoint,
  ProjectPhaseStep,
  ResourcePoolFlow,
  SafetyEvent,
  TrendPoint,
  ValueMetric,
  WorkflowDemoScene,
} from "../types";

export const navItems: NavItem[] = [
  { id: "hero", label: "项目定位" },
  { id: "pain", label: "核心痛点" },
  { id: "solution", label: "方案全景" },
  { id: "workflow", label: "流程演示" },
  { id: "safety", label: "安全监管" },
  { id: "machinery", label: "机械管理" },
  { id: "resource-pool", label: "资源池" },
  { id: "value", label: "价值落地" },
];

export const heroMetrics: MetricCard[] = [
  {
    label: "工资拨付支撑",
    value: "自动留痕",
    note: "出勤、工时、在岗状态形成可追溯依据",
  },
  {
    label: "现场安全管控",
    value: "双重监测",
    note: "手机端与智能安全帽联动识别异常",
  },
  {
    label: "成本基准形成",
    value: "持续沉淀",
    note: "按长度、时间、任务逐步形成估算基准",
  },
];

export const painPoints: PainPoint[] = [
  {
    title: "工地边界不固定",
    description: "线性工地沿管网路线展开，作业面长条分散，难以像围场式工地设置门禁。",
    impact: "出勤认定难、在岗管理难、现场真实性核验难。",
  },
  {
    title: "人工台账分散",
    description: "人员、帽子、机械在多个项目间流动，传统纸面和群消息记录容易遗漏。",
    impact: "漏计、误计、重复计薪和机械成本失真风险高。",
  },
  {
    title: "安全监管滞后",
    description: "脱帽、越界、跌倒等行为仅依赖班组长巡视，异常发现与响应存在时间差。",
    impact: "安全风险不可视，管理证据链薄弱。",
  },
  {
    title: "成本基准难形成",
    description: "相同类型任务在不同线路、环境、班组中的消耗数据缺乏持续沉淀。",
    impact: "后续项目预算、监督与复盘缺少可靠参照。",
  },
];

export const capabilities: Capability[] = [
  {
    title: "人脸识别签到",
    description: "班前安全会现场完成人员身份确认与签到留痕。",
    detail: "解决代签、错签和纸质记录难复核的问题。",
  },
  {
    title: "虚拟电子围栏",
    description: "立项初期在商业地图上划定项目边界，作为出勤与在岗规则基础。",
    detail: "适配没有围挡、无固定出入口的线性工地场景。",
  },
  {
    title: "NFC 领帽绑定",
    description: "通过 NFC 将手机端人员身份与当班智能安全帽绑定。",
    detail: "确保每个出勤人员与安全帽一一对应，当班关系可追溯。",
  },
  {
    title: "智能安全帽感知",
    description: "内置脱帽感应、定位模块、陀螺仪，持续感知佩戴和现场状态。",
    detail: "对脱帽、越界、跌倒等异常行为主动预警。",
  },
  {
    title: "机械工时采集",
    description: "结合机械工时设备记录租赁时长、实际工作时长和工况。",
    detail: "为机械成本台账与项目成本基准提供客观数据支撑。",
  },
];

export const workflowSteps: ProjectPhaseStep[] = [
  {
    id: "fence",
    title: "立项圈定电子围栏",
    summary: "负责人在地图上圈定线路沿线作业范围，建立项目基础空间规则。",
    outcome: "形成后续签到、在岗、越界判定的统一边界。",
    signals: ["地图围栏", "项目基线", "范围可追溯"],
  },
  {
    id: "archive",
    title: "人员建档与人脸录入",
    summary: "录入姓名、联系方式、日薪、健康证等资料，并完成手机端校验。",
    outcome: "每位施工人员具备统一、可核验的身份档案。",
    signals: ["实名档案", "人脸校验", "资料完整"],
  },
  {
    id: "check-in",
    title: "班前签到与领帽绑定",
    summary: "班前安全会人脸签到，领取智能安全帽，并通过 NFC 完成当班绑定。",
    outcome: "将人员、手机端、智能安全帽建立一对一当班关系。",
    signals: ["出勤留痕", "NFC 绑定", "当班生效"],
  },
  {
    id: "monitor",
    title: "在岗与佩戴持续监测",
    summary: "手机与安全帽双定位叠加，结合脱帽感应判断是否在岗、是否规范佩戴。",
    outcome: "异常及时预警，工时计算基于真实在岗状态。",
    signals: ["双定位", "脱帽感应", "班组提醒"],
  },
  {
    id: "events",
    title: "异常事件快速处置",
    summary: "对越界、长时间脱帽、跌倒/昏迷等异常状态发出通知并要求现场确认。",
    outcome: "实现安全事件的更早发现、更快响应和更清晰留痕。",
    signals: ["告警推送", "状态升级", "处置闭环"],
  },
  {
    id: "settlement",
    title: "工时沉淀与薪资支撑",
    summary: "系统自动汇总考勤、在岗、工时和机械作业记录，形成结算支撑台账。",
    outcome: "为农民工工资合理拨付和后续成本估算提供依据。",
    signals: ["工时沉淀", "结算凭据", "成本基线"],
  },
];

export const workflowDemoScenes: WorkflowDemoScene[] = [
  {
    stepId: "fence",
    sceneTitle: "项目范围规则生成",
    statusText: "地图底板加载后，线路围栏自动描绘并锁定项目边界。",
    resultMetrics: ["围栏已建立", "边界可追溯", "规则已生效"],
    actors: ["地图底板", "项目围栏", "规则标识"],
    actorVisuals: ["map", "badge", "worker"],
    animationVariant: "fence",
    resultBadge: "规则已建立",
  },
  {
    stepId: "archive",
    sceneTitle: "人员资料建档校验",
    statusText: "人物卡片、证件资料与人脸识别框依次进入，档案状态切为已完成。",
    resultMetrics: ["实名档案", "人脸通过", "资料完整"],
    actors: ["人员卡", "证件卡", "人脸扫描框"],
    actorVisuals: ["worker", "face", "badge"],
    animationVariant: "archive",
    resultBadge: "校验完成",
  },
  {
    stepId: "check-in",
    sceneTitle: "签到与安全帽绑定",
    statusText: "手机、人员、安全帽通过 NFC 波纹和连线建立当班关系。",
    resultMetrics: ["签到完成", "NFC 绑定", "当班生效"],
    actors: ["施工人员", "手机终端", "智能安全帽"],
    actorVisuals: ["worker", "phone", "helmet"],
    animationVariant: "check-in",
    resultBadge: "绑定成功",
  },
  {
    stepId: "monitor",
    sceneTitle: "在岗与佩戴持续监测",
    statusText: "围栏内定位点与安全帽状态同步脉冲，系统进入持续监测。",
    resultMetrics: ["双定位在线", "佩戴正常", "工时累计中"],
    actors: ["围栏区域", "定位点", "状态条"],
    actorVisuals: ["map", "worker", "helmet"],
    animationVariant: "monitor",
    resultBadge: "持续在岗",
  },
  {
    stepId: "events",
    sceneTitle: "异常触发与通知下发",
    statusText: "人物偏离或跌倒触发告警，班组长通知卡弹出等待现场核验。",
    resultMetrics: ["异常识别", "通知已发", "待现场核验"],
    actors: ["人员状态", "告警图标", "通知卡"],
    actorVisuals: ["worker", "alert", "badge"],
    animationVariant: "events",
    resultBadge: "待核验",
  },
  {
    stepId: "settlement",
    sceneTitle: "工时汇总与结算支撑",
    statusText: "时间、工时与费用卡逐步汇总，最终形成工资拨付支撑台账。",
    resultMetrics: ["工时已汇总", "台账已生成", "结算可支撑"],
    actors: ["工时条", "费用卡", "支撑台账"],
    actorVisuals: ["clock", "ledger", "machine"],
    animationVariant: "settlement",
    resultBadge: "结算支撑已生成",
  },
];

export const safetyEvents: SafetyEvent[] = [
  {
    id: "normal",
    state: "正常在岗",
    title: "双定位稳定落在围栏内",
    description: "手机端与安全帽坐标稳定，佩戴状态正常，工时连续累计。",
    action: "系统后台持续记录，无需人工干预。",
    tone: "normal",
  },
  {
    id: "boundary",
    state: "越界提醒",
    title: "坐标偏离围栏阈值",
    description: "超过设定时间差或距离差后，系统判定存在离岗或误差风险。",
    action: "通知班组长确认是否临时离岗、调位或定位异常。",
    tone: "warning",
  },
  {
    id: "helmet",
    state: "脱帽预警",
    title: "光电脱帽感应触发",
    description: "现场长时间未佩戴安全帽，可视作违规脱帽或离岗候选状态。",
    action: "预警推送班组长，必要时暂停工时计算。",
    tone: "warning",
  },
  {
    id: "fall",
    state: "跌倒告警",
    title: "陀螺仪识别异常跌落姿态",
    description: "安全帽姿态和运动轨迹异常，疑似跌倒、昏迷或突发状况。",
    action: "同时通知班组长与相关负责人，要求现场快速核验。",
    tone: "danger",
  },
];

export const machineMetrics: MachineMetric[] = [
  { name: "挖机 A", rentHours: 10, workHours: 7.8, utilization: 78 },
  { name: "勾机 B", rentHours: 9, workHours: 6.9, utilization: 77 },
  { name: "吊机 C", rentHours: 8, workHours: 5.6, utilization: 70 },
  { name: "切割机 D", rentHours: 6, workHours: 5.1, utilization: 85 },
];

export const machineTrends: TrendPoint[] = [
  { period: "周一", attendance: 42, machinery: 28 },
  { period: "周二", attendance: 46, machinery: 31 },
  { period: "周三", attendance: 44, machinery: 30 },
  { period: "周四", attendance: 49, machinery: 35 },
  { period: "周五", attendance: 47, machinery: 33 },
];

export const resourceFlows: ResourcePoolFlow[] = [
  {
    from: "人员池",
    to: "东线项目",
    type: "人员池",
    count: 18,
    note: "班组按当班计划动态分配，避免同人重复计薪。",
  },
  {
    from: "帽子池",
    to: "东线项目",
    type: "帽子池",
    count: 18,
    note: "确保当班安全帽与出勤人员数量和绑定关系一致。",
  },
  {
    from: "机械池",
    to: "东线项目",
    type: "机械池",
    count: 6,
    note: "机械按工序调用，租赁时长与工时同步记录。",
  },
  {
    from: "人员池",
    to: "西线项目",
    type: "人员池",
    count: 12,
    note: "多项目并行时按围栏与班次切分工时。",
  },
  {
    from: "帽子池",
    to: "西线项目",
    type: "帽子池",
    count: 12,
    note: "跨现场调拨时仍保持当班绑定闭环。",
  },
  {
    from: "机械池",
    to: "西线项目",
    type: "机械池",
    count: 4,
    note: "避免同设备跨工地重复入账。",
  },
];

export const valueMetrics: ValueMetric[] = [
  {
    title: "工资拨付更有依据",
    value: "从经验判断转向数据支撑",
    description: "把出勤、在岗、异常处置、工时累计串成完整证据链。",
  },
  {
    title: "项目监管更可视",
    value: "从被动巡查转向主动预警",
    description: "越界、脱帽、跌倒等异常即时暴露，提升现场反应速度。",
  },
  {
    title: "成本估算更精准",
    value: "从单次结算转向长期沉淀",
    description: "逐步形成单位长度、时间、任务维度的基准成本模型。",
  },
];

export const roadmap = [
  "系统开发已启动，管理端与移动端框架同步推进。",
  "第一版智能安全帽设备对接已进入技术细节核对阶段。",
  "下一步将围绕规则精度、设备稳定性和多项目资源调度持续完善。",
];
