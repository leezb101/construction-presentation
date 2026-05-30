import { motion, useReducedMotion } from "framer-motion";
import type { ProjectPhaseStep } from "../../types";

type WorkflowTimelineProps = {
  steps: ProjectPhaseStep[];
  activeStepId: string;
  onSelect: (id: string) => void;
};

export function WorkflowTimeline({
  steps,
  activeStepId,
  onSelect,
}: WorkflowTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="workflow-visual">
      <div className="workflow-track" aria-hidden="true">
        <motion.div
          className="workflow-track__progress"
          initial={false}
          animate={{
            width: `${((steps.findIndex((step) => step.id === activeStepId) + 1) / steps.length) * 100}%`,
          }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="workflow-nodes" role="tablist" aria-label="核心流程演示">
        {steps.map((step, index) => {
          const active = step.id === activeStepId;
          const reached = steps.findIndex((item) => item.id === activeStepId) >= index;

          return (
            <button
              key={step.id}
              className={`workflow-node ${active ? "is-active" : ""} ${reached ? "is-reached" : ""}`}
              onClick={() => onSelect(step.id)}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${step.id}`}
              id={`tab-${step.id}`}
            >
              <span className="workflow-node__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="workflow-node__title">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
