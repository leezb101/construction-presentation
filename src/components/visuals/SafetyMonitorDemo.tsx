import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SafetyEvent } from "../../types";
import { DotIcon, GlassCard, Pill } from "../common";

type SafetyMonitorDemoProps = {
  events: SafetyEvent[];
  activeEventId: string;
  onSelect: (id: string) => void;
};

export function SafetyMonitorDemo({
  events,
  activeEventId,
  onSelect,
}: SafetyMonitorDemoProps) {
  const activeEvent = events.find((event) => event.id === activeEventId) ?? events[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="safety-grid">
      <div className="safety-state-list">
        {events.map((event) => (
          <button
            key={event.id}
            className={`state-row ${event.id === activeEventId ? "is-active" : ""}`}
            onClick={() => onSelect(event.id)}
          >
            <DotIcon tone={event.tone} label={event.state} />
            <span className="state-row__hint">{event.title}</span>
          </button>
        ))}
      </div>
      <GlassCard className={`alert-panel tone-${activeEvent.tone}`}>
        <Pill>{activeEvent.state}</Pill>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3>{activeEvent.title}</h3>
            <p>{activeEvent.description}</p>
            <div className="alert-panel__action">
              <span>系统动作</span>
              <strong>{activeEvent.action}</strong>
            </div>
            <div className="alert-map" aria-hidden="true">
              <div className="alert-map__fence" />
              <motion.div
                className={`alert-map__signal tone-${activeEvent.tone}`}
                initial={reduceMotion ? false : { scale: 0.92, opacity: 0.5 }}
                animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
