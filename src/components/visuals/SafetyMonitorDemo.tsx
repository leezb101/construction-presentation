import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
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
            <div className="state-row__main">
              <DotIcon tone={event.tone} label={event.state} />
              <span className="state-row__hint">{event.title}</span>
            </div>
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
            <div className={`alert-map alert-map--${activeEvent.id}`} aria-hidden="true">
              <div className="alert-map__wash alert-map__wash--a" />
              <div className="alert-map__wash alert-map__wash--b" />
              <svg viewBox="0 0 420 220" className="alert-map__svg">
                <path
                  className="alert-map__outer-road"
                  d="M52 158C98 136 140 126 186 130C236 134 282 156 340 148"
                />
                <path
                  className="alert-map__fence-shape"
                  d="M98 44C164 28 244 34 302 70C342 96 354 142 330 172C292 198 212 202 148 186C94 172 72 134 76 100C80 74 84 54 98 44Z"
                />
                <path
                  className="alert-map__safe-core"
                  d="M132 76C180 64 238 66 280 92C308 110 314 142 294 160C266 184 206 188 160 176C122 166 104 138 108 112C110 96 118 82 132 76Z"
                />
                {activeEvent.id === "boundary" && (
                  <>
                    <path
                      className="alert-map__boundary-route"
                      d="M238 142C208 138 178 134 146 130"
                    />
                    <path
                      className="alert-map__boundary-arrow"
                      d="M152 126L126 130L144 150"
                    />
                  </>
                )}
                {activeEvent.id === "normal" && (
                  <>
                    <path className="alert-map__link" d="M170 124C192 118 212 116 236 118" />
                    <path className="alert-map__link" d="M200 142C214 136 228 134 244 136" />
                  </>
                )}
                {activeEvent.id === "helmet" && (
                  <path className="alert-map__broken-link" d="M214 112C226 98 238 90 254 86" />
                )}
              </svg>

              {activeEvent.id === "normal" && <NormalScene />}
              {activeEvent.id === "boundary" && <BoundaryScene />}
              {activeEvent.id === "helmet" && <HelmetScene />}
              {activeEvent.id === "fall" && <FallScene />}
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}

function NormalScene() {
  return (
    <>
      <div className="alert-chip alert-chip--top">
        <CheckIcon />
        围栏内稳定在岗
      </div>
      <div className="alert-zone-pill alert-zone-pill--inside">围栏内</div>
      <svg viewBox="0 0 420 220" className="alert-map__overlay">
        <circle className="alert-svg-ring alert-svg-ring--normal-outer" cx="146" cy="126" r="42" />
        <circle className="alert-svg-ring alert-svg-ring--normal-inner" cx="146" cy="126" r="31" />
        <rect className="alert-svg-badge alert-svg-badge--normal" x="128" y="98" width="40" height="50" rx="18" />
        <g className="alert-svg-person" transform="translate(134 114)">
          <PersonGlyph />
        </g>
        <g className="alert-svg-helmet" transform="translate(134 100)">
          <HelmetGlyph />
        </g>
      </svg>
      <div className="alert-status-strip alert-status-strip--normal alert-status-strip--compact">
        <span>双定位重合</span>
        <strong>工时持续累计</strong>
      </div>
    </>
  );
}

function BoundaryScene() {
  return (
    <>
      <div className="alert-chip alert-chip--warning">
        <BoundaryIcon />
        已偏离围栏阈值
      </div>
      <div className="alert-zone-pill alert-zone-pill--inside alert-zone-pill--left">围栏内</div>
      <div className="alert-zone-pill alert-zone-pill--outside">围栏外</div>
      <svg viewBox="0 0 420 220" className="alert-map__overlay">
        <circle className="alert-svg-point alert-svg-point--inside" cx="146" cy="131" r="5.5" />
        <circle className="alert-svg-point alert-svg-point--breach" cx="116" cy="130" r="8" />
        <circle className="alert-svg-breach-halo" cx="116" cy="130" r="24" />
        <rect className="alert-svg-badge alert-svg-badge--warning" x="82" y="108" width="40" height="40" rx="16" />
        <g className="alert-svg-person alert-svg-person--warning" transform="translate(87 114)">
          <PersonGlyph />
        </g>
      </svg>
      <div className="alert-callout alert-callout--boundary alert-callout--boundary-compact">
        <BoundaryIcon />
        <div>
          <strong>越界提醒</strong>
          <span>请核验是否离岗或临时调位</span>
        </div>
      </div>
    </>
  );
}

function HelmetScene() {
  return (
    <>
      <div className="alert-chip alert-chip--warning">
        <HelmetOffIcon />
        脱帽感应触发
      </div>
      <div className="alert-zone-pill alert-zone-pill--inside">人员仍在围栏内</div>
      <svg viewBox="0 0 420 220" className="alert-map__overlay">
        <rect className="alert-svg-badge alert-svg-badge--warning-soft" x="144" y="112" width="38" height="38" rx="16" />
        <g className="alert-svg-person alert-svg-person--warning" transform="translate(149 118)">
          <PersonGlyph />
        </g>
        <circle className="alert-svg-head-flash" cx="162" cy="116" r="22" />
        <rect className="alert-svg-badge alert-svg-badge--helmet-off" x="183" y="90" width="36" height="36" rx="14" />
        <g className="alert-svg-helmet alert-svg-helmet--floating" transform="translate(188 95)">
          <HelmetGlyph />
        </g>
        <path className="alert-svg-broken-link" d="M170 116C178 108 187 102 196 100" />
      </svg>
      <div className="alert-callout alert-callout--helmet">
        <HelmetOffIcon />
        <div>
          <strong>佩戴异常</strong>
          <span>长时间脱帽可暂停工时计算</span>
        </div>
      </div>
    </>
  );
}

function FallScene() {
  return (
    <>
      <div className="alert-chip alert-chip--danger">
        <AlertIcon />
        跌倒姿态异常
      </div>
      <svg viewBox="0 0 420 220" className="alert-map__overlay">
        <circle className="alert-svg-wave alert-svg-wave--one" cx="207" cy="138" r="28" />
        <circle className="alert-svg-wave alert-svg-wave--two" cx="207" cy="138" r="40" />
        <rect className="alert-svg-badge alert-svg-badge--danger" x="188" y="119" width="38" height="38" rx="16" />
        <g className="alert-svg-person alert-svg-person--danger" transform="translate(193 124) rotate(90 12 12)">
          <FallGlyph />
        </g>
      </svg>
      <div className="alert-callout alert-callout--danger">
        <AlertIcon />
        <div>
          <strong>紧急告警已推送</strong>
          <span>班组长与负责人需立即到场核验</span>
        </div>
      </div>
    </>
  );
}

function Glyph({ children }: { children: ReactNode }) {
  return <span className="alert-glyph">{children}</span>;
}

function CheckIcon() {
  return (
    <Glyph>
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="14" fill="currentColor" opacity="0.16" />
        <path d="M17 24L22 29L31 19" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    </Glyph>
  );
}

function BoundaryIcon() {
  return (
    <Glyph>
      <svg viewBox="0 0 48 48">
        <path d="M12 12H30V30H12V12Z" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
        <path d="M27 27L36 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="36" cy="36" r="4" fill="currentColor" opacity="0.24" />
      </svg>
    </Glyph>
  );
}

function HelmetOffIcon() {
  return (
    <Glyph>
      <svg viewBox="0 0 48 48">
        <path d="M12 25C12 16.5 17.5 11 24 11C31.5 11 36 16.8 36 25" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M10 25H38" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M13 13L35 35" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </Glyph>
  );
}

function AlertIcon() {
  return (
    <Glyph>
      <svg viewBox="0 0 48 48">
        <path d="M24 10L38 35H10L24 10Z" fill="currentColor" opacity="0.18" />
        <path d="M24 18V27" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="24" cy="32.5" r="1.9" fill="currentColor" />
        <path d="M24 10L38 35H10L24 10Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </Glyph>
  );
}

function PersonGlyph() {
  return (
    <>
      <circle cx="12" cy="7" r="4" fill="currentColor" opacity="0.22" />
      <path d="M6 24C7 16.6 9.5 13 12 13C14.5 13 17 16.6 18 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </>
  );
}

function HelmetGlyph() {
  return (
    <>
      <path d="M3 16C3 9.6 7.4 5.6 12 5.6C17.2 5.6 20.4 10 20.4 16H3Z" fill="currentColor" opacity="0.18" />
      <path d="M3 16C3 9.6 7.4 5.6 12 5.6C17.2 5.6 20.4 10 20.4 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2 16H22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 6V16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  );
}

function FallGlyph() {
  return (
    <>
      <circle cx="12" cy="7" r="4" fill="currentColor" opacity="0.22" />
      <path d="M5.5 22C8.5 17.5 11 15 13 14.5C15.2 14 17.8 15.8 20.5 19.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </>
  );
}
