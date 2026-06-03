import { motion, useReducedMotion } from "framer-motion";
import { heroMetrics } from "../../data/content";
import { GlassCard, Pill } from "../common";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="hero">
      <div className="hero-copy">
        <Pill>线性工地数字化管理方案</Pill>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="hero-title-line">面向线性工地的</span>
          <span className="hero-title-line hero-title-line--lead">人员与机械</span>
          <span className="hero-title-line">一体化管理系统</span>
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          以人脸识别、电子围栏、NFC 绑定、智能安全帽和机械工时采集为核心，
          将线性工地人员出勤、现场安全、机械成本和工资拨付支撑串成一套完整、可留痕、可核验的数据闭环。
        </motion.p>
        <div className="hero-highlights">
          <div>
            <span>目标一</span>
            <strong>支撑农民工工资高效、精准、合理拨付</strong>
          </div>
          <div>
            <span>目标二</span>
            <strong>沉淀线性工地成本基准，支撑后续项目监管与估算</strong>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <GlassCard className="hero-stage__board">
          <div className="hero-stage__grid" />
          <div className="hero-stage__fence">
            <span>项目围栏</span>
          </div>
          <div className="hero-stage__signal hero-stage__signal--person">
            <span>人员</span>
          </div>
          <div className="hero-stage__signal hero-stage__signal--helmet">
            <span>安全帽</span>
          </div>
          <div className="hero-stage__signal hero-stage__signal--machine">
            <span>机械</span>
          </div>
          <div className="hero-stage__panel">
            <strong>当班概览</strong>
            <span>出勤 46 人</span>
            <span>在线机械 10 台</span>
            <span>异常告警 2 条</span>
          </div>
        </GlassCard>

        <div className="hero-metrics">
          {heroMetrics.map((metric) => (
            <GlassCard key={metric.label} className="metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
