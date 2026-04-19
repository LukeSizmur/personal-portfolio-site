import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { TypewriterWord } from "@/components/typewriter-word";
import { LondonWeather } from "@/components/london-weather";
import TechStack from "@/components/TechStack";
import CardCollage from "@/components/ui/card-collage";
import { ScrollArrow } from "@/components/ui/scroll-arrow";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[90dvh] flex items-start justify-between gap-16 px-[90px] pt-[100px] pb-[80px] relative overflow-hidden max-md:flex-col max-md:gap-10 max-md:px-6 max-md:pt-[120px] max-md:pb-[110px]"
    >
      {/* Left column: title + bio + tech stack */}
      <div className="flex flex-col flex-1">
        <h1 className="animate-hero-title text-[clamp(36px,11vw,160px)] font-bold leading-[0.9] tracking-[-0.04em] text-black whitespace-nowrap">
          Software<br /><TypewriterWord /><span className="text-apex animate-cursor">|</span>
        </h1>

        <div className="animate-hero-sub mt-10">
          <Suspense fallback={null}>
            <LondonWeather />
          </Suspense>
          <p className="text-[18px] font-normal text-muted max-w-[420px] leading-[1.6] tracking-[-0.01em]">
            <strong className="text-black font-semibold">Luke Sizmur.</strong> - That&apos;s me! I am a developer with a degree in software engineering and a keen eye for detail.
          </p>
          <div style={{ marginTop: "10px" }}>
            <TechStack />
          </div>
        </div>
      </div>

      {/* Right column: collage + CTA — desktop right-aligned, mobile centred below bio */}
      <div className="flex flex-col items-end gap-6 flex-shrink-0 max-md:items-center max-md:w-full">
        <CardCollage
          cards={[
            { src: "/linkedin-profile-image.jpeg", alt: "Luke Sizmur" },
            { src: "/HMS-Waverly-captain-portrait.jpeg", alt: "HMS Waverly" },
            { src: "/Ice-hockey.jpg", alt: "Ice Hockey Match" },
          ]}
        />
      </div>
      <ScrollArrow />
    </section>
  );
}
