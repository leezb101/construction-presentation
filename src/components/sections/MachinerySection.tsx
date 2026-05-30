import { machineMetrics, machineTrends } from "../../data/content";
import { GlassCard, Section } from "../common";
import { MachineCharts } from "../visuals/MachineCharts";

export function MachinerySection() {
  return (
    <Section
      id="machinery"
      eyebrow="机械管理"
      title="让机械租赁时间、工作时长和工况都可核算"
      description="系统计划结合机械工时采集设备，对档案信息、租赁成本和实际作业时长做统一记录，为项目支出台账和复盘提供依据。"
    >
      <div className="machine-summary">
        <GlassCard className="machine-summary__card">
          <span>档案维度</span>
          <strong>机械资料统一入池</strong>
          <p>型号、班组、租赁方式、供应单位等信息统一管理。</p>
        </GlassCard>
        <GlassCard className="machine-summary__card">
          <span>计量维度</span>
          <strong>租赁时长与实际工时分开记录</strong>
          <p>既能看支出，也能看利用率，便于识别低效使用。</p>
        </GlassCard>
        <GlassCard className="machine-summary__card">
          <span>核算维度</span>
          <strong>形成支出台账与成本基准样本</strong>
          <p>为后续同类线性工地估算提供数据底座。</p>
        </GlassCard>
      </div>
      <MachineCharts metrics={machineMetrics} trends={machineTrends} />
    </Section>
  );
}
