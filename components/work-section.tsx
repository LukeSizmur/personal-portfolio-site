import ProjectsOverscroll from "@/components/ui/animate-card-animation";
import { PROJECTS } from "@/lib/projects";

export function WorkSection() {
  return (
    <section id="work" className="bg-black">
      <div className="flex items-end justify-between pt-[120px] pb-16 px-[60px] max-md:flex-col max-md:items-start max-md:gap-5 max-md:pt-[80px] max-md:pb-10 max-md:px-6">
        <div className="relative">
          <div className="pointer-events-none absolute top-[-20px] left-[-10px] z-0 select-none text-[140px] leading-none font-bold tracking-[-0.05em] text-white/[0.06]">
            02
          </div>
          <p className="relative z-10 mb-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-muted">
            Selected work
          </p>
          <h2 className="reveal relative z-10 text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-oatmeal">
            Projects &<br />Experience
          </h2>
          <p className="reveal reveal-delay-1 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] tracking-[-0.01em] text-oatmeal/62">
            A selection of product, dashboard, and client work that reflects how I approach frontend engineering: thoughtful UX, clean implementation, and a strong eye for presentation.
          </p>
        </div>
      </div>

      <ProjectsOverscroll items={PROJECTS} />
    </section>
  );
}
