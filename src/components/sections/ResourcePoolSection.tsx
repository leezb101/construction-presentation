import { useEffect, useState } from "react";
import { resourceFlows } from "../../data/content";
import { Section } from "../common";
import { ResourcePoolDiagram } from "../visuals/ResourcePoolDiagram";

export function ResourcePoolSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % resourceFlows.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section
      id="resource-pool"
      eyebrow="资源池调度"
      title="多项目并行时，仍保持人员、帽子、机械的唯一计量关系"
      description="系统将安全帽、施工人员、机械设备都视作可调度资源池，用统一规则处理跨工地临时来回调配，减少漏计、误计和重复计算。"
    >
      <ResourcePoolDiagram
        flows={resourceFlows}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </Section>
  );
}
