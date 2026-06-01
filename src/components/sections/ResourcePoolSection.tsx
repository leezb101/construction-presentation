import { useState } from "react";
import { resourceFlows } from "../../data/content";
import { Section } from "../common";
import { ResourcePoolDiagram } from "../visuals/ResourcePoolDiagram";

export function ResourcePoolSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section
      id="resource-pool"
      eyebrow="资源池调度"
      title="多项目并行时，仍保持人员、帽子、机械的唯一计量关系"
      description="资源统一入池，跨项目复用时先回池再派发，保证工时、绑定和成本口径始终唯一。"
    >
      <ResourcePoolDiagram
        flows={resourceFlows}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </Section>
  );
}
