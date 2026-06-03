import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { WorkflowActorVisual, WorkflowDemoScene } from "../../types";

type WorkflowDemoStageProps = {
  scene: WorkflowDemoScene;
  playToken: number;
};

export function WorkflowDemoStage({
  scene,
  playToken,
}: WorkflowDemoStageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="workflow-stage-card">
      <div
        key={`${scene.stepId}-${playToken}-${reduceMotion ? "reduce" : "full"}`}
        className={`workflow-stage workflow-stage--${scene.animationVariant} ${
          reduceMotion ? "is-reduced" : ""
        }`}
      >
        <div className="workflow-stage__screen">
          <div className="workflow-stage__wash workflow-stage__wash--a" aria-hidden="true" />
          <div className="workflow-stage__wash workflow-stage__wash--b" aria-hidden="true" />
          <div className="workflow-stage__grid" aria-hidden="true" />
          {scene.animationVariant === "fence" && (
            <FenceScene resultBadge={scene.resultBadge} />
          )}
          {scene.animationVariant === "archive" && (
            <ArchiveScene resultBadge={scene.resultBadge} />
          )}
          {scene.animationVariant === "check-in" && (
            <CheckInScene resultBadge={scene.resultBadge} />
          )}
          {scene.animationVariant === "monitor" && (
            <MonitorScene resultBadge={scene.resultBadge} />
          )}
          {scene.animationVariant === "events" && (
            <EventsScene resultBadge={scene.resultBadge} />
          )}
          {scene.animationVariant === "settlement" && (
            <SettlementScene resultBadge={scene.resultBadge} />
          )}
        </div>

        <div className="workflow-stage__footer">
          <div className="workflow-stage__copy">
            <span className="workflow-stage__eyebrow">{scene.sceneTitle}</span>
            <p>{scene.statusText}</p>
          </div>
          <div className="workflow-stage__chips">
            {scene.resultMetrics.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkflowActorPills({ scene }: { scene: WorkflowDemoScene }) {
  return (
    <div className="workflow-actors">
      {scene.actors.map((actor, index) => (
        <span key={actor}>
          <ActorIcon type={scene.actorVisuals[index] ?? "badge"} />
          {actor}
        </span>
      ))}
    </div>
  );
}

function FenceScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-scene-chip wf-anim wf-anim--rise">东线项目 A 段</div>
      <div className="wf-map-panel wf-anim wf-anim--fade">
        <svg viewBox="0 0 420 240" className="wf-svg" aria-hidden="true">
          <path
            className="wf-road wf-road--soft"
            d="M48 60C118 22 176 28 228 58C280 88 326 104 372 76"
          />
          <path
            className="wf-road wf-road--soft"
            d="M68 182C146 140 214 138 272 172C316 198 344 202 378 186"
          />
          <path
            className="wf-route wf-anim wf-anim--draw-stroke"
            d="M90 150C138 128 186 112 232 118C278 124 320 148 354 144"
          />
          <path
            className="wf-fence-shape wf-anim wf-anim--draw-stroke-delayed"
            d="M108 74C176 54 254 58 312 96C348 120 356 160 328 184C288 214 204 218 142 198C92 182 72 138 78 110C82 92 92 80 108 74Z"
          />
          <circle className="wf-pin wf-anim wf-anim--rise" cx="114" cy="149" r="7" />
          <circle className="wf-pin wf-anim wf-anim--rise-delayed" cx="354" cy="144" r="7" />
        </svg>
      </div>
      <div className="wf-badge wf-badge--top wf-anim wf-anim--fade-late">
        <BadgeIcon />
        {resultBadge}
      </div>
      <div className="wf-mini-card wf-mini-card--route wf-anim wf-anim--slide-in">
        <MapIcon />
        <div>
          <strong>电子围栏</strong>
          <span>后续在岗判定统一使用同一边界</span>
        </div>
      </div>
    </>
  );
}

function ArchiveScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-info-card wf-info-card--person wf-anim wf-anim--rise">
        <div className="wf-icon-bubble wf-icon-bubble--worker">
          <WorkerIcon />
        </div>
        <div>
          <strong>施工人员建档</strong>
          <span>姓名、电话、日薪、健康证统一录入</span>
        </div>
      </div>
      <div className="wf-info-card wf-info-card--doc wf-anim wf-anim--rise-delayed">
        <div className="wf-icon-bubble wf-icon-bubble--badge">
          <BadgeIcon />
        </div>
        <div>
          <strong>资料完整校验</strong>
          <span>实名信息与证件资料同步留痕</span>
        </div>
      </div>
      <div className="wf-face-panel wf-anim wf-anim--scan">
        <FaceIcon />
        <div className="wf-face-panel__scan" aria-hidden="true" />
      </div>
      <div className="wf-badge wf-badge--bottom wf-anim wf-anim--fade-late">
        <BadgeIcon />
        {resultBadge}
      </div>
    </>
  );
}

function CheckInScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-node wf-node--worker wf-anim wf-anim--rise">
        <WorkerIcon />
        <span>人员</span>
      </div>
      <div className="wf-node wf-node--phone wf-anim wf-anim--rise-delayed">
        <PhoneIcon />
        <span>手机</span>
      </div>
      <div className="wf-node wf-node--helmet wf-anim wf-anim--rise-late">
        <HelmetIcon />
        <span>安全帽</span>
      </div>
      <div className="wf-link-segment wf-link-segment--worker-phone wf-anim wf-anim--grow-line" aria-hidden="true" />
      <div className="wf-link-segment wf-link-segment--phone-helmet wf-anim wf-anim--grow-line-late" aria-hidden="true" />
      <div className="wf-nfc-waves wf-anim wf-anim--ring-pair" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="wf-badge wf-badge--bottom-right wf-anim wf-anim--fade-late">
        <BadgeIcon />
        {resultBadge}
      </div>
    </>
  );
}

function MonitorScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-monitor-zone wf-anim wf-anim--fade">
        <svg viewBox="0 0 420 240" className="wf-svg" aria-hidden="true">
          <path
            className="wf-fence-shape wf-fence-shape--monitor"
            d="M108 74C176 54 254 58 312 96C348 120 356 160 328 184C288 214 204 218 142 198C92 182 72 138 78 110C82 92 92 80 108 74Z"
          />
        </svg>
      </div>
      <div className="wf-avatar-spot wf-avatar-spot--worker wf-anim wf-anim--pulse-soft">
        <WorkerIcon />
      </div>
      <div className="wf-avatar-spot wf-avatar-spot--helmet wf-anim wf-anim--pulse-soft-delay">
        <HelmetIcon />
      </div>
      <div className="wf-locator">
        <span className="wf-locator__pulse wf-anim wf-anim--ping" />
        <span className="wf-locator__dot" />
      </div>
      <div className="wf-status-rail wf-anim wf-anim--rise-delayed">
        <div className="wf-status-rail__label">
          <span>在岗状态</span>
          <strong>{resultBadge}</strong>
        </div>
        <div className="wf-status-rail__bar">
          <span className="wf-anim wf-anim--fill-bar" />
        </div>
      </div>
    </>
  );
}

function EventsScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-monitor-zone wf-anim wf-anim--fade">
        <svg viewBox="0 0 420 240" className="wf-svg" aria-hidden="true">
          <path
            className="wf-fence-shape wf-fence-shape--monitor"
            d="M108 74C176 54 254 58 312 96C348 120 356 160 328 184C288 214 204 218 142 198C92 182 72 138 78 110C82 92 92 80 108 74Z"
          />
        </svg>
      </div>
      <div className="wf-avatar-spot wf-avatar-spot--worker wf-avatar-spot--alert wf-anim wf-anim--tilt-out">
        <WorkerIcon />
      </div>
      <div className="wf-alert-burst wf-anim wf-anim--alert-pop">
        <AlertIcon />
      </div>
      <div className="wf-info-card wf-info-card--alert wf-anim wf-anim--slide-in">
        <div className="wf-icon-bubble wf-icon-bubble--alert">
          <BadgeIcon />
        </div>
        <div>
          <strong>班组长提醒</strong>
          <span>检测到越界/跌倒，请立即现场核验</span>
        </div>
      </div>
      <div className="wf-badge wf-badge--bottom-right wf-badge--warning wf-anim wf-anim--fade-late">
        <AlertIcon />
        {resultBadge}
      </div>
    </>
  );
}

function SettlementScene({ resultBadge }: { resultBadge: string }) {
  return (
    <>
      <div className="wf-time-rail wf-anim wf-anim--rise">
        <ClockIcon />
        <div className="wf-time-rail__bar">
          <span className="wf-anim wf-anim--fill-bar" />
        </div>
        <strong>8.5h</strong>
      </div>
      <div className="wf-metric-card wf-metric-card--hours wf-anim wf-anim--rise">
        <ClockIcon />
        <div>
          <strong>工时累计</strong>
          <span>真实在岗自动沉淀</span>
        </div>
      </div>
      <div className="wf-metric-card wf-metric-card--pay wf-anim wf-anim--rise-delayed">
        <LedgerIcon />
        <div>
          <strong>工资支撑</strong>
          <span>考勤与在岗形成证据</span>
        </div>
      </div>
      <div className="wf-metric-card wf-metric-card--machine wf-anim wf-anim--rise-late">
        <MachineIcon />
        <div>
          <strong>机械台账</strong>
          <span>租赁与工况同步归档</span>
        </div>
      </div>
      <div className="wf-badge wf-badge--bottom-center wf-anim wf-anim--fade-late">
        <BadgeIcon />
        {resultBadge}
      </div>
    </>
  );
}

function ActorIcon({ type }: { type: WorkflowActorVisual }) {
  switch (type) {
    case "map":
      return <MapIcon />;
    case "worker":
      return <WorkerIcon />;
    case "phone":
      return <PhoneIcon />;
    case "helmet":
      return <HelmetIcon />;
    case "face":
      return <FaceIcon />;
    case "alert":
      return <AlertIcon />;
    case "ledger":
      return <LedgerIcon />;
    case "clock":
      return <ClockIcon />;
    case "machine":
      return <MachineIcon />;
    default:
      return <BadgeIcon />;
  }
}

function IconFrame({ children }: { children: ReactNode }) {
  return <span className="wf-glyph">{children}</span>;
}

function WorkerIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 18C15 10 22 7 29 9C33 10 36 13 37 18H14Z" fill="currentColor" opacity="0.9" />
        <circle cx="24" cy="23" r="8" fill="currentColor" opacity="0.25" />
        <path d="M17 40C18 33 21 29 24 29C27 29 30 33 31 40" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M17 19H31" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function PhoneIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="15" y="8" width="18" height="32" rx="6" fill="currentColor" opacity="0.2" />
        <rect x="17.5" y="11" width="13" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="37.5" r="1.8" fill="currentColor" />
      </svg>
    </IconFrame>
  );
}

function HelmetIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 25C12 16.5 17.5 11 24 11C31.5 11 36 16.8 36 25H12Z" fill="currentColor" opacity="0.24" />
        <path d="M12 25C12 16.5 17.5 11 24 11C31.5 11 36 16.8 36 25" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M10 25H38" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M24 12V25" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function MapIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 12L19 9L29 13L38 10V36L29 39L19 35L10 38V12Z" fill="currentColor" opacity="0.16" />
        <path d="M10 12L19 9L29 13L38 10V36L29 39L19 35L10 38V12Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M19 9V35M29 13V39" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function FaceIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M16 18C17 12.5 20 10 24 10C28 10 31 12.5 32 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="22" r="7" fill="currentColor" opacity="0.16" />
        <path d="M18 36C19.5 31 21.8 29 24 29C26.2 29 28.5 31 30 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 18V12H16M38 18V12H32M10 30V36H16M38 30V36H32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

function AlertIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 10L38 35H10L24 10Z" fill="currentColor" opacity="0.2" />
        <path d="M24 18V27" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="24" cy="32.5" r="1.9" fill="currentColor" />
        <path d="M24 10L38 35H10L24 10Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

function LedgerIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="12" y="9" width="24" height="30" rx="5" fill="currentColor" opacity="0.14" />
        <rect x="12" y="9" width="24" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M18 18H30M18 24H30M18 30H26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function ClockIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="14" fill="currentColor" opacity="0.14" />
        <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 16V24L29 27" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

function MachineIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="18" cy="34" r="4.5" fill="currentColor" opacity="0.24" />
        <circle cx="33" cy="34" r="4.5" fill="currentColor" opacity="0.24" />
        <path d="M10 31H35L39 25H28L24 16H18L15 25H10V31Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 16L31 11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function BadgeIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="21" r="9" fill="currentColor" opacity="0.18" />
        <circle cx="24" cy="21" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M18.5 31L21.5 38L24 35.8L26.5 38L29.5 31" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}
