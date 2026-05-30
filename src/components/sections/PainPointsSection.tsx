import { painPoints } from "../../data/content";
import { GlassCard, Section } from "../common";

export function PainPointsSection() {
  return (
    <Section
      id="pain"
      eyebrow="为什么要做"
      title="线性工地管理，难点不在“有没有人”，而在“如何有据可依地证明”"
      description="相较于围场式工地，线性工地天然缺乏门禁和固定边界，人员与机械在多项目间流转频繁，传统管理方式很难同时兼顾效率、合规和安全。"
    >
      <div className="pain-grid">
        {painPoints.map((item) => (
          <GlassCard key={item.title} className="pain-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="pain-card__impact">
              <span>直接影响</span>
              <strong>{item.impact}</strong>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
