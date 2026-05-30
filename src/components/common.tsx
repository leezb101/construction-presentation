import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: PropsWithChildren<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="section"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </motion.section>
  );
}

export function GlassCard({
  children,
  className = "",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} className={`glass-card ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Pill({ children }: PropsWithChildren) {
  return <span className="pill">{children}</span>;
}

export function DotIcon({ tone, label }: { tone: string; label: ReactNode }) {
  return (
    <div className="dot-icon">
      <span className={`dot-icon__mark dot-icon__mark--${tone}`} />
      <span>{label}</span>
    </div>
  );
}
