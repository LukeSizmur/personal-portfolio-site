import { MonitorSmartphone, LayoutTemplate, LineChart } from "lucide-react";

const CAPABILITIES = [
  {
    icon: <MonitorSmartphone size={30} strokeWidth={1.25} />,
    name: "Frontend Engineering",
    desc: "Production-grade React applications with a focus on performance, component architecture, and maintainability.",
    stack: ["React", "TypeScript", "SCSS", "Bootstrap", "Highcharts"],
  },
  {
    icon: <LayoutTemplate size={30} strokeWidth={1.25} />,
    name: "Design Systems",
    desc: "Multi-theme CSS architecture, design tokens, and component libraries that scale across entire products.",
    stack: ["CSS Custom Props", "SCSS", "Dark/Light themes", "Figma"],
  },
  {
    icon: <LineChart size={30} strokeWidth={1.25} />,
    name: "Data Visualisation",
    desc: "Complex charting, real-time dashboards, and Elasticsearch integrations for security and analytics products.",
    stack: ["Highcharts", "Elasticsearch", "Lucene", "D3"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-[120px] px-[60px] max-md:py-[80px] max-md:px-6">
      <div className="relative">
        <div className="pointer-events-none absolute top-[-20px] left-[-10px] z-0 select-none text-[140px] leading-none font-bold tracking-[-0.05em] text-smoke">
          03
        </div>
        <p className="relative z-10 mb-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-muted">
          Capabilities
        </p>
        <h2 className="reveal relative z-10 text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-black">
          What I<br />bring to the <em className="not-italic text-apex">table.</em>
        </h2>
        <p className="reveal reveal-delay-1 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] tracking-[-0.01em] text-[#5a5650]">
          The areas I lean on most in my work, from shipping polished React interfaces to building scalable design systems and shaping complex data into something people can actually use.
        </p>
      </div>

      <div className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#d4d0cb] mt-14">
        {CAPABILITIES.map(({ icon, name, desc, stack }, i, arr) => (
          <div
            key={name}
            className={`flex flex-col p-10 max-md:px-0 max-md:py-8
              ${i < arr.length - 1 ? "border-b border-[#d4d0cb] md:border-b-0 md:border-r md:border-[#d4d0cb]" : ""}
            `}
          >
            <div className="mb-6 text-black">{icon}</div>
            <div className="text-[19px] font-bold tracking-[-0.025em] text-black mb-3">{name}</div>
            <div className="text-[14px] leading-[1.65] text-muted">{desc}</div>
            <div className="flex flex-wrap gap-[6px] mt-auto pt-8">
              {stack.map((tag) => (
                <span key={tag} className="capability-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
