import {
  FaceScanIcon,
  FenceIcon,
  HelmetIcon,
  MachineIcon,
  NfcIcon,
} from "../icons";
import { capabilities } from "../../data/content";
import { GlassCard, Section } from "../common";

const icons = [FaceScanIcon, FenceIcon, NfcIcon, HelmetIcon, MachineIcon];

export function SolutionSection() {
  return (
    <Section
      id="solution"
      eyebrow="方案全景"
      title="把“人、帽、机、场”联成一体"
      description="系统不是单点能力叠加，而是围绕线性工地场景，把身份、空间、设备和规则统一到同一套业务闭环中。"
    >
      <div className="capability-grid">
        {capabilities.map((item, index) => {
          const Icon = icons[index];

          return (
            <GlassCard key={item.title} className="capability-card">
              <div className="capability-card__icon">
                <Icon width={24} height={24} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.detail}</strong>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
