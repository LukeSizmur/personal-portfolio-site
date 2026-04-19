const STATS = [
  { num: "2–3", label: "Years professional exp." },
  { num: "React", label: "Primary stack" },
  { num: "∞", label: "Details cared about" },
  { num: "FS", label: "Going fullstack" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="grid grid-cols-2 gap-[80px] items-center py-[120px] px-[60px] max-md:grid-cols-1 max-md:gap-10 max-md:py-[80px] max-md:px-6"
    >
      <div className="about-left relative reveal">
        <div className="absolute text-[140px] font-bold tracking-[-0.05em] leading-none text-smoke top-[-20px] left-[-10px] pointer-events-none z-0 select-none">
          01
        </div>
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted mb-6 relative z-10">
          About me
        </p>
        <h2 className="text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-black relative z-10">
          Obsessed with the<br /><em className="not-italic text-apex">craft</em> of building.
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <p className="reveal reveal-delay-1 text-[17px] leading-[1.75] text-[#5a5650] tracking-[-0.01em]">
          I&apos;m a frontend developer with 2–3 years of professional experience building React-based dashboards and data visualisation applications. I care deeply about the intersection of engineering and design — the kind of work where every shadow, every transition, and every interaction is considered.
        </p>
        <p className="reveal reveal-delay-2 text-[17px] leading-[1.75] text-[#5a5650] tracking-[-0.01em]">
          Currently transitioning toward fullstack development, working with Elasticsearch, Node, and cloud-native tooling. Based in England, working globally.
        </p>
        <div className="reveal reveal-delay-3 grid grid-cols-2 gap-px bg-smoke rounded-2xl overflow-hidden">
          {STATS.map(({ num, label }) => (
            <div key={label} className="bg-cream px-6 py-6 flex flex-col gap-1">
              <span className="text-[36px] font-bold tracking-[-0.04em] text-black">{num}</span>
              <span className="text-[12px] text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
