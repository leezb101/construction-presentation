import { useReducedMotion } from "framer-motion";
import type { WorkflowDemoScene } from "../../types";

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
          <div className="workflow-stage__grid" aria-hidden="true" />
          {scene.animationVariant === "fence" && <FenceScene />}
          {scene.animationVariant === "archive" && <ArchiveScene />}
          {scene.animationVariant === "check-in" && <CheckInScene />}
          {scene.animationVariant === "monitor" && <MonitorScene />}
          {scene.animationVariant === "events" && <EventsScene />}
          {scene.animationVariant === "settlement" && <SettlementScene />}
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

function FenceScene() {
  return (
    <>
      <div className="wf-map wf-anim wf-anim--fade" />
      <div className="wf-fence-line wf-anim wf-anim--draw" />
      <div className="wf-fence-tag wf-anim wf-anim--rise">规则已建立</div>
      <div className="wf-fence-route wf-anim wf-anim--pulse-line" />
    </>
  );
}

function ArchiveScene() {
  return (
    <>
      <div className="wf-person-card wf-anim wf-anim--rise">
        <span className="wf-avatar" />
        <div>
          <strong>人员建档</strong>
          <span>实名信息已录入</span>
        </div>
      </div>
      <div className="wf-doc-card wf-anim wf-anim--rise-delayed">
        <span className="wf-doc-icon" />
        <div>
          <strong>证件资料</strong>
          <span>健康证 / 联系方式</span>
        </div>
      </div>
      <div className="wf-face-frame wf-anim wf-anim--scan">
        <div className="wf-face-frame__beam" />
      </div>
      <div className="wf-status-pill wf-anim wf-anim--fade-late">校验完成</div>
    </>
  );
}

function CheckInScene() {
  return (
    <>
      <div className="wf-user-node wf-anim wf-anim--rise">人员</div>
      <div className="wf-phone-node wf-anim wf-anim--rise-delayed">手机</div>
      <div className="wf-helmet-node wf-anim wf-anim--rise-late">安全帽</div>
      <div className="wf-link wf-link--user-phone wf-anim wf-anim--grow-line" />
      <div className="wf-link wf-link--phone-helmet wf-anim wf-anim--grow-line-late" />
      <div className="wf-nfc-ring wf-anim wf-anim--ring" />
      <div className="wf-check-badge wf-anim wf-anim--fade-late">绑定成功</div>
    </>
  );
}

function MonitorScene() {
  return (
    <>
      <div className="wf-monitor-fence wf-anim wf-anim--fade" />
      <div className="wf-monitor-person wf-anim wf-anim--pulse-soft" />
      <div className="wf-monitor-helmet wf-anim wf-anim--pulse-soft-delay" />
      <div className="wf-monitor-dot wf-anim wf-anim--ping" />
      <div className="wf-monitor-bar wf-anim wf-anim--grow-bar">
        <span />
      </div>
      <div className="wf-monitor-label wf-anim wf-anim--fade-late">持续在岗</div>
    </>
  );
}

function EventsScene() {
  return (
    <>
      <div className="wf-events-fence wf-anim wf-anim--fade" />
      <div className="wf-events-person wf-anim wf-anim--tilt-out" />
      <div className="wf-events-alert wf-anim wf-anim--alert-pop">!</div>
      <div className="wf-events-card wf-anim wf-anim--slide-in">
        <strong>班组长提醒</strong>
        <span>检测到异常，请立即核验</span>
      </div>
      <div className="wf-events-state wf-anim wf-anim--fade-late">待核验</div>
    </>
  );
}

function SettlementScene() {
  return (
    <>
      <div className="wf-hours-bar wf-anim wf-anim--grow-bar">
        <span />
      </div>
      <div className="wf-summary-card wf-summary-card--left wf-anim wf-anim--rise">
        <strong>工时</strong>
        <span>8.5 小时</span>
      </div>
      <div className="wf-summary-card wf-summary-card--mid wf-anim wf-anim--rise-delayed">
        <strong>工资支撑</strong>
        <span>合规计算中</span>
      </div>
      <div className="wf-summary-card wf-summary-card--right wf-anim wf-anim--rise-late">
        <strong>机械台账</strong>
        <span>已归档</span>
      </div>
      <div className="wf-ledger-card wf-anim wf-anim--fade-late">结算支撑已生成</div>
    </>
  );
}
