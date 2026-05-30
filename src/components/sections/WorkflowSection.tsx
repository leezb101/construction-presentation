import { useMemo, useState } from "react";
import { workflowDemoScenes, workflowSteps } from "../../data/content";
import { GlassCard, Pill, Section } from "../common";
import { WorkflowTimeline } from "../visuals/WorkflowTimeline";
import { WorkflowDemoStage } from "../visuals/WorkflowDemoStage";

export function WorkflowSection() {
  const [activeStepId, setActiveStepId] = useState(workflowSteps[0].id);
  const [playToken, setPlayToken] = useState(0);
  const activeIndex = workflowSteps.findIndex((step) => step.id === activeStepId);
  const activeStep = workflowSteps[activeIndex] ?? workflowSteps[0];
  const activeScene = useMemo(
    () =>
      workflowDemoScenes.find((scene) => scene.stepId === activeStepId) ??
      workflowDemoScenes[0],
    [activeStepId],
  );

  const handleSelectStep = (id: string) => {
    setActiveStepId(id);
    setPlayToken((current) => current + 1);
  };

  return (
    <Section
      id="workflow"
      eyebrow="流程演示"
      title="以流程驱动规则，以规则沉淀证据"
      description="核心业务按项目生命周期组织，既适合汇报展示，也可逐步衔接到真实系统能力。点击节点可查看对应动作、结果和管理价值。"
    >
      <div className="workflow-layout">
        <div className="workflow-layout__content">
          <WorkflowTimeline
            steps={workflowSteps}
            activeStepId={activeStepId}
            onSelect={handleSelectStep}
          />

          <GlassCard
            className="workflow-detail"
            key={activeStep.id}
            id={`panel-${activeStep.id}`}
          >
            <div className="workflow-detail__header">
              <Pill>第 {String(activeIndex + 1).padStart(2, "0")} 步</Pill>
              <div className="workflow-detail__title-row">
                <h3>{activeStep.title}</h3>
                <button
                  type="button"
                  className="workflow-replay"
                  onClick={() => setPlayToken((current) => current + 1)}
                >
                  重播本步
                </button>
              </div>
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

        <div className="workflow-layout__stage">
          <WorkflowDemoStage scene={activeScene} playToken={playToken} />
          <div className="workflow-actors">
            {activeScene.actors.map((actor) => (
              <span key={actor}>{actor}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
