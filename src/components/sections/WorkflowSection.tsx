import { useEffect, useState } from "react";
import { workflowSteps } from "../../data/content";
import { GlassCard, Pill, Section } from "../common";
import { WorkflowTimeline } from "../visuals/WorkflowTimeline";

export function WorkflowSection() {
  const [activeStepId, setActiveStepId] = useState(workflowSteps[0].id);
  const activeIndex = workflowSteps.findIndex((step) => step.id === activeStepId);
  const activeStep = workflowSteps[activeIndex] ?? workflowSteps[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStepId((current) => {
        const index = workflowSteps.findIndex((step) => step.id === current);
        return workflowSteps[(index + 1) % workflowSteps.length].id;
      });
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section
      id="workflow"
      eyebrow="流程演示"
      title="以流程驱动规则，以规则沉淀证据"
      description="核心业务按项目生命周期组织，既适合汇报展示，也可逐步衔接到真实系统能力。点击节点可查看对应动作、结果和管理价值。"
    >
      <div className="workflow-layout">
        <WorkflowTimeline
          steps={workflowSteps}
          activeStepId={activeStepId}
          onSelect={setActiveStepId}
        />

        <GlassCard className="workflow-detail" key={activeStep.id} id={`panel-${activeStep.id}`}>
          <div className="workflow-detail__header">
            <Pill>第 {String(activeIndex + 1).padStart(2, "0")} 步</Pill>
            <h3>{activeStep.title}</h3>
          </div>
          <p>{activeStep.summary}</p>
          <div className="workflow-detail__outcome">
            <span>形成结果</span>
            <strong>{activeStep.outcome}</strong>
          </div>
          <div className="signal-list">
            {activeStep.signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
