import { ScrollReveal } from "@/components/scroll-reveal";
import { HomeNav } from "@/components/home-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { WorkSection } from "@/components/work-section";
import { SkillsSection } from "@/components/skills-section";
import { PersonalSection } from "@/components/personal-section";
import { ElsewhereSection } from "@/components/elsewhere-section";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <HomeNav />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <PersonalSection />
      <ElsewhereSection />
    </>
  );
}
