import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
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

const projectLoads = {
  东线项目: { 人员: "18 人在岗", 帽子: "18 顶在用", 机械: "6 台作业" },
  西线项目: { 人员: "12 人待接", 帽子: "12 顶待绑", 机械: "4 台待接" },
} as const;

export function ResourcePoolDiagram({
  flows,
  activeIndex,
  onSelect,
}: ResourcePoolDiagramProps) {
  const activeFlow = flows[activeIndex] ?? flows[0];
  const reduceMotion = useReducedMotion() ?? false;
  const [playToken, setPlayToken] = useState(0);

  function handleSelect(index: number) {
    if (index !== activeIndex) {
      onSelect(index);
    }
    setPlayToken((value) => value + 1);
  }

  return (
    <div className="pool-visual">
      <div className="pool-pill-row">
        {flows.map((flow, index) => {
          const tone = poolTones[flow.type];
          return (
            <button
              key={flow.id}
              className={`pool-pill pool-pill--${tone} ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => handleSelect(index)}
            >
              {flow.title}
            </button>
          );
        })}
      </div>

      <GlassCard className="pool-stage pool-stage--minimal">
        <div className="pool-stage__head">
          <div>
            <span className="pool-stage__eyebrow">统一资源池</span>
            <h3>先回池，再派发</h3>
          </div>
          <span className={`pool-stage__status pool-stage__status--${poolTones[activeFlow.type]}`}>
            {activeFlow.status}
          </span>
        </div>

        <div className="pool-stage__canvas pool-stage__canvas--minimal">
          <div className="pool-stage__wash pool-stage__wash--a" />
          <div className="pool-stage__wash pool-stage__wash--b" />

          <svg viewBox="0 0 1000 420" className="pool-map" aria-hidden="true">
            <defs>
              <marker
                id="pool-arrow-blue"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10Z" fill="#0ea5e9" />
              </marker>
              <marker
                id="pool-arrow-teal"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10Z" fill="#14b8a6" />
              </marker>
              <marker
                id="pool-arrow-orange"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10Z" fill="#f59e0b" />
              </marker>
            </defs>

            <path className="pool-map__rail" d="M246 208C322 208 364 208 438 208" />
            <path className="pool-map__rail" d="M562 208C638 208 680 208 756 208" />

            <path className="pool-map__core-glow" d="M420 72H580A42 42 0 0 1 622 114V302A42 42 0 0 1 580 344H420A42 42 0 0 1 378 302V114A42 42 0 0 1 420 72Z" />

            {activeFlow.id === "workers-east" && (
              <AnimatedRoute
                key={`route-${activeFlow.id}-${playToken}`}
                reduceMotion={reduceMotion}
                tone="blue"
                path="M500 208C442 208 392 208 336 208C306 208 278 208 246 208"
                marker="url(#pool-arrow-blue)"
                tokenStart={{ x: 500, y: 208 }}
                tokenEnd={{ x: 246, y: 208 }}
              />
            )}

            {activeFlow.id === "helmets-reuse" && (
              <>
                <AnimatedRoute
                  key={`route-a-${activeFlow.id}-${playToken}`}
                  reduceMotion={reduceMotion}
                  tone="teal"
                  path="M246 208C282 208 320 208 364 208C392 208 424 208 474 208"
                  marker="url(#pool-arrow-teal)"
                  tokenStart={{ x: 246, y: 208 }}
                  tokenEnd={{ x: 474, y: 208 }}
                />
                <AnimatedRoute
                  key={`route-b-${activeFlow.id}-${playToken}`}
                  reduceMotion={reduceMotion}
                  tone="teal"
                  path="M526 208C576 208 608 208 636 208C680 208 718 208 756 208"
                  marker="url(#pool-arrow-teal)"
                  tokenStart={{ x: 526, y: 208 }}
                  tokenEnd={{ x: 756, y: 208 }}
                  delay={0.45}
                />
              </>
            )}

            {activeFlow.id === "machine-transfer" && (
              <>
                <AnimatedRoute
                  key={`route-a-${activeFlow.id}-${playToken}`}
                  reduceMotion={reduceMotion}
                  tone="orange"
                  thick
                  path="M246 208C282 208 320 208 364 208C392 208 424 208 474 208"
                  marker="url(#pool-arrow-orange)"
                  tokenStart={{ x: 246, y: 208 }}
                  tokenEnd={{ x: 474, y: 208 }}
                />
                <AnimatedRoute
                  key={`route-b-${activeFlow.id}-${playToken}`}
                  reduceMotion={reduceMotion}
                  tone="orange"
                  thick
                  path="M526 208C576 208 608 208 636 208C680 208 718 208 756 208"
                  marker="url(#pool-arrow-orange)"
                  tokenStart={{ x: 526, y: 208 }}
                  tokenEnd={{ x: 756, y: 208 }}
                  delay={0.45}
                />
              </>
            )}
          </svg>

          <ProjectNode
            className="pool-node-card pool-node-card--left"
            title="东线项目"
            resources={projectLoads.东线项目}
            tone={poolTones[activeFlow.type]}
            activeFlow={activeFlow.id}
            side="left"
          />

          <div className="pool-core">
            <h4>统一校验与调度</h4>
            <div className="pool-core__chips">
              <PoolMiniChip tone="blue" icon={<WorkerGlyph />} label="人员池" />
              <PoolMiniChip tone="teal" icon={<HelmetGlyph />} label="帽子池" />
              <PoolMiniChip tone="orange" icon={<MachineGlyph />} label="机械池" />
            </div>
            <div className="pool-core__rules">
              <span>统一入池</span>
              <span>回池校验</span>
              <span>重新派发</span>
            </div>
          </div>

          <ProjectNode
            className="pool-node-card pool-node-card--right"
            title="西线项目"
            resources={projectLoads.西线项目}
            tone={poolTones[activeFlow.type]}
            activeFlow={activeFlow.id}
            side="right"
          />

          <div className="pool-center-chip-row">
            <div className="pool-center-chip">系统总池</div>
            <div className={`pool-flow-hint pool-flow-hint--center pool-flow-hint--${poolTones[activeFlow.type]}`}>
              {activeFlow.id === "machine-transfer" ? "工时切段" : "重新校验"}
            </div>
          </div>

          <div className={`pool-flow-hint pool-flow-hint--left pool-flow-hint--${poolTones[activeFlow.type]}`}>
            {activeFlow.id === "workers-east" ? "派发" : "回池"}
          </div>
          <div className={`pool-flow-hint pool-flow-hint--right pool-flow-hint--${poolTones[activeFlow.type]}`}>
            {activeFlow.id === "workers-east" ? "待接收" : "复用"}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlow.id}
            className="pool-principle-bar"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <span className={`pool-tag pool-tag--${poolTones[activeFlow.type]}`}>{activeFlow.type}</span>
            <strong>{activeFlow.rule}</strong>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}

function AnimatedRoute({
  reduceMotion,
  tone,
  path,
  marker,
  tokenStart,
  tokenEnd,
  delay = 0,
  thick = false,
}: {
  reduceMotion: boolean;
  tone: "blue" | "teal" | "orange";
  path: string;
  marker: string;
  tokenStart: { x: number; y: number };
  tokenEnd: { x: number; y: number };
  delay?: number;
  thick?: boolean;
}) {
  return (
    <>
      <motion.path
        className={`pool-map__route pool-map__route--${tone} ${thick ? "is-thick" : ""}`}
        d={path}
        markerEnd={marker}
        initial={reduceMotion ? false : { pathLength: 0.15, opacity: 0.35 }}
        animate={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut", delay }}
      />
      {!reduceMotion ? (
        <motion.circle
          className={`pool-map__token pool-map__token--${tone}`}
          r={thick ? 8 : 7}
          initial={{ cx: tokenStart.x, cy: tokenStart.y, opacity: 0 }}
          animate={{ cx: tokenEnd.x, cy: tokenEnd.y, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.05, ease: "easeInOut", delay }}
        />
      ) : null}
    </>
  );
}

function ProjectNode({
  className,
  title,
  resources,
  tone,
  activeFlow,
  side,
}: {
  className: string;
  title: string;
  resources: { 人员: string; 帽子: string; 机械: string };
  tone: "blue" | "teal" | "orange";
  activeFlow: string;
  side: "left" | "right";
}) {
  return (
    <div className={className}>
      <div className="pool-node-card__head">
        <strong>{title}</strong>
      </div>
      <div className="pool-node-card__list">
        <ResourceBadge
          tone="blue"
          icon={<WorkerGlyph />}
          label="人员"
          value={resources.人员}
          active={tone === "blue" && ((activeFlow === "workers-east" && side === "left") || (activeFlow !== "workers-east" && side === "right"))}
          fading={tone === "blue" && activeFlow === "workers-east" && side === "right"}
        />
        <ResourceBadge
          tone="teal"
          icon={<HelmetGlyph />}
          label="帽子"
          value={resources.帽子}
          active={tone === "teal" && side === "right"}
          fading={tone === "teal" && side === "left"}
        />
        <ResourceBadge
          tone="orange"
          icon={<MachineGlyph />}
          label="机械"
          value={resources.机械}
          active={tone === "orange" && side === "right"}
          fading={tone === "orange" && side === "left"}
        />
      </div>
    </div>
  );
}

function ResourceBadge({
  tone,
  icon,
  label,
  value,
  active,
  fading,
}: {
  tone: "blue" | "teal" | "orange";
  icon: ReactNode;
  label: string;
  value: string;
  active?: boolean;
  fading?: boolean;
}) {
  return (
    <div
      className={`pool-resource-badge pool-resource-badge--${tone} ${
        active ? "is-active" : fading ? "is-fading" : ""
      }`}
    >
      <span className="pool-resource-badge__icon">{icon}</span>
      <span className="pool-resource-badge__label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PoolMiniChip({
  tone,
  icon,
  label,
}: {
  tone: "blue" | "teal" | "orange";
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className={`pool-mini-chip pool-mini-chip--${tone}`}>
      <span>{icon}</span>
      <small>{label}</small>
    </div>
  );
}

function WorkerGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 11C5.4 7.5 8.1 5.4 11.2 5.4C14.4 5.4 17 7.6 17.4 11H5Z" fill="currentColor" opacity="0.2" />
      <path d="M5 11C5.4 7.5 8.1 5.4 11.2 5.4C14.4 5.4 17 7.6 17.4 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.3 11H18.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11.2" cy="14.3" r="2.9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.4 21C8.8 18.3 9.8 16.8 11.2 16.8C12.7 16.8 13.7 18.3 14 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HelmetGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13.5C4 8.8 7.2 6.1 11 6.1C15.1 6.1 18 9.1 18 13.5H4Z" fill="currentColor" opacity="0.18" />
      <path d="M4 13.5C4 8.8 7.2 6.1 11 6.1C15.1 6.1 18 9.1 18 13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 13.5H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 6.4V13.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MachineGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16.5H11.5L15.2 12.5H18.4L20 16.5H21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 16.5V10.6H15.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.1 10.6L18.8 7.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.2" cy="18.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.8" cy="18.2" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
