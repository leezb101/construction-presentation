import { TopNav } from "./components/sections/TopNav";
import { HeroSection } from "./components/sections/HeroSection";
import { PainPointsSection } from "./components/sections/PainPointsSection";
import { SolutionSection } from "./components/sections/SolutionSection";
import { WorkflowSection } from "./components/sections/WorkflowSection";
import { SafetySection } from "./components/sections/SafetySection";
import { MachinerySection } from "./components/sections/MachinerySection";
import { ResourcePoolSection } from "./components/sections/ResourcePoolSection";
import { ValueSection } from "./components/sections/ValueSection";
import { navItems } from "./data/content";

export default function App() {
  return (
    <div className="app-shell">
      <div className="page-glow page-glow--left" aria-hidden="true" />
      <div className="page-glow page-glow--right" aria-hidden="true" />
      <div className="top-nav-shell">
        <TopNav items={navItems} />
      </div>
      <main className="scroll-deck">
        <HeroSection />
        <PainPointsSection />
        <SolutionSection />
        <WorkflowSection />
        <SafetySection />
        <MachinerySection />
        <ResourcePoolSection />
        <ValueSection />
      </main>
    </div>
  );
}
