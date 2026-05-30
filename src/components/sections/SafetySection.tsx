import { useEffect, useState } from "react";
import { safetyEvents } from "../../data/content";
import { Section } from "../common";
import { SafetyMonitorDemo } from "../visuals/SafetyMonitorDemo";

export function SafetySection() {
  const [activeEventId, setActiveEventId] = useState(safetyEvents[0].id);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveEventId((current) => {
        const index = safetyEvents.findIndex((event) => event.id === current);
        return safetyEvents[(index + 1) % safetyEvents.length].id;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section
      id="safety"
      eyebrow="安全监管"
      title="把巡查经验转成系统可执行的主动预警"
      description="手机定位、安全帽定位、脱帽感应和姿态识别形成多层验证，不依赖单一感知手段，更适合复杂、随机、开放式的现场环境。"
    >
      <SafetyMonitorDemo
        events={safetyEvents}
        activeEventId={activeEventId}
        onSelect={setActiveEventId}
      />
    </Section>
  );
}
