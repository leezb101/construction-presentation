export type NavItem = {
  id: string;
  label: string;
};

export type MetricCard = {
  label: string;
  value: string;
  note: string;
};

export type PainPoint = {
  title: string;
  description: string;
  impact: string;
};

export type Capability = {
  title: string;
  description: string;
  detail: string;
};

export type ProjectPhaseStep = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  signals: string[];
};

export type WorkflowAnimationVariant =
  | "fence"
  | "archive"
  | "check-in"
  | "monitor"
  | "events"
  | "settlement";

export type WorkflowActorVisual =
  | "map"
  | "worker"
  | "phone"
  | "helmet"
  | "badge"
  | "face"
  | "alert"
  | "ledger"
  | "clock"
  | "machine";

export type WorkflowDemoScene = {
  stepId: string;
  sceneTitle: string;
  resultMetrics: string[];
  actors: string[];
  actorVisuals: WorkflowActorVisual[];
  animationVariant: WorkflowAnimationVariant;
  resultBadge: string;
};

export type SafetyEvent = {
  id: string;
  state: string;
  title: string;
  description: string;
  action: string;
  tone: "normal" | "warning" | "danger";
};

export type MachineMetric = {
  name: string;
  rentHours: number;
  workHours: number;
  utilization: number;
};

export type TrendPoint = {
  period: string;
  attendance: number;
  machinery: number;
};

export type ResourcePoolFlow = {
  id: string;
  title: string;
  summary: string;
  from: string;
  to: string;
  type: "人员池" | "帽子池" | "机械池";
  count: number;
  note: string;
  rule: string;
  status: string;
};

export type ValueMetric = {
  title: string;
  value: string;
  description: string;
};
