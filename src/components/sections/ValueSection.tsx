import { roadmap, valueMetrics } from "../../data/content";
import { GlassCard, Section } from "../common";

export function ValueSection() {
  return (
    <Section
      id="value"
      eyebrow="价值落地"
      title="先解决工资拨付和现场监管，再逐步沉淀成本基准"
      description="当前阶段优先打通工资拨付与现场监管闭环，并同步沉淀项目过程数据，为后续成本管理和估算能力建设建立基础。"
    >
      <div className="value-grid">
        {valueMetrics.map((item) => (
          <GlassCard key={item.title} className="value-card">
            <span>{item.title}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="roadmap-card">
        <div className="roadmap-card__heading">
          <h3>当前进展与下一步</h3>
        </div>
        <div className="roadmap-list">
          {roadmap.map((item, index) => (
            <div key={item} className="roadmap-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
