import { motion, useReducedMotion } from "framer-motion";
import type { ResourcePoolFlow } from "../../types";
import { GlassCard } from "../common";

type ResourcePoolDiagramProps = {
  flows: ResourcePoolFlow[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const poolTones = {
  人员池: "blue",
  帽子池: "teal",
  机械池: "orange",
} as const;

export function ResourcePoolDiagram({
  flows,
  activeIndex,
  onSelect,
}: ResourcePoolDiagramProps) {
  const activeFlow = flows[activeIndex] ?? flows[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="pool-grid">
      <GlassCard className="pool-canvas">
        <div className="pool-column">
          <div className="pool-node">人员池</div>
          <div className="pool-node">帽子池</div>
          <div className="pool-node">机械池</div>
        </div>
        <div className="pool-lines" aria-hidden="true">
          {flows.map((flow, index) => {
            const tone = poolTones[flow.type];
            const active = index === activeIndex;
            return (
              <motion.div
                key={`${flow.type}-${flow.to}`}
                className={`pool-line pool-line--${tone} ${active ? "is-active" : ""}`}
                initial={reduceMotion ? false : { opacity: 0.4, scaleX: 0.92 }}
                animate={reduceMotion ? {} : { opacity: active ? 1 : 0.48, scaleX: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            );
          })}
        </div>
        <div className="pool-column pool-column--projects">
          <div className="pool-node pool-node--project">东线项目</div>
          <div className="pool-node pool-node--project">西线项目</div>
        </div>
      </GlassCard>

      <div className="pool-details">
        <div className="pool-flow-list">
          {flows.map((flow, index) => (
            <button
              key={`${flow.type}-${flow.to}-${index}`}
              className={`pool-flow-button ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => onSelect(index)}
            >
              <span>{flow.type}</span>
              <strong>
                {flow.to} · {flow.count}
              </strong>
            </button>
          ))}
        </div>
        <GlassCard className="pool-highlight">
          <span className={`pool-tag pool-tag--${poolTones[activeFlow.type]}`}>{activeFlow.type}</span>
          <h3>
            {activeFlow.from} → {activeFlow.to}
          </h3>
          <p>{activeFlow.note}</p>
          <div className="pool-highlight__count">当前调度示意：{activeFlow.count}</div>
        </GlassCard>
      </div>
    </div>
  );
}
