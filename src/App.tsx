import { useEffect, useState } from "react";
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
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="page-glow page-glow--left" aria-hidden="true" />
      <div className="page-glow page-glow--right" aria-hidden="true" />
      <div className="top-nav-shell">
        <TopNav items={navItems} activeId={activeId} />
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
