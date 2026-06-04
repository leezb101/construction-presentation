import { roadmap, valueMetrics } from "../../data/content";
import { GlassCard, Section } from "../common";

export function ValueSection() {
  const roadmapItems = roadmap.map((item, index) => ({
    text: item,
    status: index < 2 ? "progress" : "next",
    statusLabel: index < 2 ? "当前进展" : "下一步",
    stepLabel: index < 2 ? `进展 0${index + 1}` : "下一阶段",
  }));

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
          <p>用一条阶段轨道区分已经推进的事项与下一阶段的建设重点。</p>
        </div>
        <div className="roadmap-track" aria-label="阶段进展">
          {roadmapItems.map((item, index) => (
            <div
              key={item.text}
              className={`roadmap-node roadmap-node--${item.status}`}
            >
              <div className="roadmap-node__rail" aria-hidden="true">
                <span className="roadmap-node__dot">{index + 1}</span>
              </div>
              <div className="roadmap-node__body">
                <div className="roadmap-node__meta">
                  <span className={`roadmap-badge roadmap-badge--${item.status}`}>
                    {item.statusLabel}
                  </span>
                  <strong>{item.stepLabel}</strong>
                </div>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
