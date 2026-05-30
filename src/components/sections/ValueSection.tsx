import { roadmap, valueMetrics } from "../../data/content";
import { GlassCard, Section } from "../common";

export function ValueSection() {
  return (
    <Section
      id="value"
      eyebrow="价值落地"
      title="先解决工资拨付和现场监管，再逐步沉淀成本基准"
      description="本次汇报聚焦两条主线：一条是把人、帽、机与工时结算支撑打通；一条是把项目过程数据长期沉淀为未来管理与估算能力。"
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
          <p>保持口径克制，只呈现当前真实进度和明确方向。</p>
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
