import { FooterShader } from "@/components/footer-shader"
import { HomeNav } from "@/components/home-nav"
import { ScrollReveal } from "@/components/scroll-reveal"
import StackIcon from 'tech-stack-icons';
import AnimatedProjectStack, { CardItem } from "@/components/ui/animate-card-animation"
import TechStack from "@/components/TechStack";
import { MonitorSmartphone, LayoutTemplate, LineChart, ArrowUpRight, ArrowRight } from "lucide-react";
import { FooterCard } from "@/components/footer-card"
import CardCollage from "@/components/ui/card-collage"
import { ScrollArrow } from "@/components/ui/scroll-arrow"

const NAV_LINKS = ["about", "work", "skills", "personal", "contact"] as const;

const PROJECTS: CardItem[] = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "Real-time data visualisation platform built with React & Highcharts",
    image: "/project-dashboard.svg",
    badge: "React",
  },
  {
    id: 2,
    title: "Design System",
    description: "Multi-theme component library with CSS custom properties & dark mode",
    image: "/project-design-system.svg",
    badge: "Design",
  },
  {
    id: 3,
    title: "Security Console",
    description: "Elasticsearch-powered SIEM event log viewer with live alerting",
    image: "/project-security.svg",
    badge: "Fullstack",
  },
  {
    id: 4,
    title: "Portfolio Site",
    description: "This site — hand-crafted in Next.js with custom scroll animations",
    image: "/project-portfolio.svg",
    badge: "Next.js",
  },
];

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <HomeNav />

      {/* Hero */}
      <section
        id="hero"
        className="min-h-[90dvh] flex items-start justify-between gap-16 px-[60px] pt-[160px] pb-[80px] relative overflow-hidden max-md:flex-col max-md:gap-10 max-md:px-6 max-md:pt-[120px] max-md:pb-[110px]"
      >
        {/* Left column: title + bio + tech stack */}
        <div className="flex flex-col flex-1">
          <h1 className="animate-hero-title text-[clamp(72px,11vw,160px)] font-bold leading-[0.9] tracking-[-0.04em] text-black">
            Full-Stack<br />Engineer.<span className="text-apex animate-cursor">|</span>
          </h1>

          <div className="animate-hero-sub mt-12">
            <p className="text-[18px] font-normal text-muted max-w-[420px] leading-[1.6] tracking-[-0.01em]">
              <strong className="text-black font-semibold">Luke Sizmur.</strong> - That&apos;s me! I am a developer with a degree in software engineering and a keen eye for detail.
            </p>
            <div style={{marginTop: '10px'}}>
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
          <a
            href="#contact"
            className="hero-cta inline-flex items-center gap-3 bg-black text-cream no-underline text-[14px] font-semibold tracking-[-0.01em] pl-6 pr-[14px] py-[14px] rounded-full transition-all duration-500 hover:bg-apex hover:scale-[1.02]"
          >
            Get in touch
            <span className="hero-cta-icon w-8 h-8 rounded-full bg-white/[0.12] flex items-center justify-center transition-transform duration-500">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        <ScrollArrow />
      </section>

      {/* About */}
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
            {[
              { num: '2–3', label: 'Years professional exp.' },
              { num: 'React', label: 'Primary stack' },
              { num: '∞', label: 'Details cared about' },
              { num: 'FS', label: 'Going fullstack' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-cream px-6 py-6 flex flex-col gap-1">
                <span className="text-[36px] font-bold tracking-[-0.04em] text-black">{num}</span>
                <span className="text-[12px] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
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
          <a
            href="#"
            className="reveal inline-flex items-center gap-2 no-underline text-[13px] font-semibold text-muted border border-white/10 px-5 py-2.5 rounded-full transition-all duration-[400ms] flex-shrink-0 mb-2 hover:bg-white/[0.06] hover:text-oatmeal"
          >
            View all <ArrowUpRight size={14} />
          </a>
        </div>

        <AnimatedProjectStack items={PROJECTS} />

      </section>

      {/* Skills */}
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
          {[
            {
              icon: <MonitorSmartphone size={30} strokeWidth={1.25} />,
              name: 'Frontend Engineering',
              desc: 'Production-grade React applications with a focus on performance, component architecture, and maintainability.',
              stack: ['React', 'TypeScript', 'SCSS', 'Bootstrap', 'Highcharts'],
            },
            {
              icon: <LayoutTemplate size={30} strokeWidth={1.25} />,
              name: 'Design Systems',
              desc: 'Multi-theme CSS architecture, design tokens, and component libraries that scale across entire products.',
              stack: ['CSS Custom Props', 'SCSS', 'Dark/Light themes', 'Figma'],
            },
            {
              icon: <LineChart size={30} strokeWidth={1.25} />,
              name: 'Data Visualisation',
              desc: 'Complex charting, real-time dashboards, and Elasticsearch integrations for security and analytics products.',
              stack: ['Highcharts', 'Elasticsearch', 'Lucene', 'D3'],
            },
          ].map(({ icon, name, desc, stack }, i, arr) => (
            <div
              key={name}
              className={`flex flex-col p-10 max-md:px-0 max-md:py-8
                ${i < arr.length - 1 ? 'border-b border-[#d4d0cb] md:border-b-0 md:border-r md:border-[#d4d0cb]' : ''}
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

      {/* Personal */}
      <section id="personal" className="bg-oatmeal py-[120px] px-[60px] max-md:py-[80px] max-md:px-6">
        <div className="relative mb-0">
          <div className="pointer-events-none absolute top-[-20px] left-[-10px] z-0 select-none text-[140px] leading-none font-bold tracking-[-0.05em] text-smoke">
            04
          </div>
          <p className="relative z-10 mb-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-muted">
            Beyond the code
          </p>
          <h2 className="reveal relative z-10 text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-black">
            Get To<br />Know Me
          </h2>
          <p className="reveal reveal-delay-1 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] tracking-[-0.01em] text-[#5a5650]">
            A little more about the person behind the screen: the films, interests, and small obsessions that shape how I think, create, and spend my time outside of work.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-16 max-md:grid-cols-1">
          {/* Film — wide */}
          <div className="reveal col-span-2 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light max-md:col-span-1">
            <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
              <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
                Film
              </div>
              <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">A proper cinephile.</div>
              <div className="text-[14px] leading-[1.7] text-muted">I track every film I watch. I love getting lost in other worlds, but also in the behind the scenes of those worlds, how they are made, how and <span className='text-apex'>why</span> every decision </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {['BlackBerry 2023', 'Interstellar', 'Project Hail Mary', 'Spider-Man: Across The Spider-Verse', 'Spider-Man: Into The Spider-Verse', 'Star Wars: Episode III - Revenge of the Sith'].map((film) => (
                  <span
                    key={film}
                    className="inline-flex items-center text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[rgba(43,43,43,0.06)] border border-[rgba(43,43,43,0.08)] text-[#5a5650] transition-all duration-[400ms] hover:bg-[rgba(232,62,11,0.08)] hover:border-[rgba(232,62,11,0.15)] hover:text-apex cursor-default"
                  >
                    {film}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="reveal reveal-delay-1 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light">
            <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
              <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
                Interests
              </div>
              <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">In my spare time</div>
              <div className="text-[14px] leading-[1.7] text-muted">Outside of my day to say work, I&apos;m usually keeping up with the latest tech trends, deep in a game, or running a small newsletter curating interesting corners of the internet.</div>
              <div className="flex gap-2.5 flex-wrap mt-5">
                <span className="text-[12px] font-semibold px-4 py-2 rounded-full tracking-[0.02em] bg-[rgba(232,62,11,0.08)] border border-[rgba(232,62,11,0.12)] text-apex">Football</span>
                <span className="text-[12px] font-semibold px-4 py-2 rounded-full tracking-[0.02em] bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.15)] text-amber">Gaming</span>
                <span className="text-[12px] font-semibold px-4 py-2 rounded-full tracking-[0.02em] bg-[rgba(100,180,255,0.08)] border border-[rgba(100,180,255,0.15)] text-[rgba(60,140,220,0.9)]">Movies</span>
                <span className="text-[12px] font-semibold px-4 py-2 rounded-full tracking-[0.02em] bg-[rgba(43,43,43,0.06)] border border-[rgba(43,43,43,0.08)] text-muted">Newsletter</span>
              </div>
            </div>
          </div>

          {/* Reading */}
          <div className="reveal reveal-delay-1 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light">
            <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
              <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
                Reading
              </div>
              <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">My current library</div>
              <div className="text-[14px] leading-[1.7] text-muted">I gravitate towards fiction as a way to explore new worlds and ideas. I particularly enjoy sci-fi.</div>
              <ul className="personal-list list-none mt-5 flex flex-col gap-2.5">
                {['Project Hail Mary', 'Ultra 85', 'Steve Jobs', 'The Oddysey'].map((book) => (
                  <li key={book} className="flex items-center gap-3 text-[14px] text-[#5a5650] font-medium">
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Football — wide */}
          <div className="reveal reveal-delay-2 col-span-2 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light max-md:col-span-1">
            <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
              <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
                Photography
              </div>
              <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">Life through my lense</div>
              <div className="text-[14px] leading-[1.7] text-muted">For as long as I can remember I have always loved taking photos.
                I tend to gravitate to architectural pieces and it shows when looking through my phones gallery.
                I shoot a lot of photos on my iphone 15 pro but occasionally I will take my FujiFilm X100T out with me - this always
                gives the photo a warmer feeling due to the film simulations baked in.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shader wrapper — shared background for contact + footer */}
      <div className="relative bg-[#1a1a18] overflow-hidden">
        {/* Shader fills the entire wrapper */}
        <FooterShader />
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,24,0.84)_0%,rgba(26,26,24,0.7)_48%,rgba(26,26,24,0.82)_100%)]" />

        {/* Contact section */}
        <section
          id="contact"
          className="relative z-10 text-center py-[140px] px-[60px] max-md:py-[100px] max-md:px-6"
        >
          <p className="reveal text-[10px] font-semibold tracking-[0.18em] uppercase text-oatmeal/60 mb-6">
            Let&apos;s build something
          </p>
          <h2 className="reveal text-[clamp(48px,7vw,100px)] font-bold tracking-[-0.04em] leading-none text-oatmeal mb-10">
            Got a project<br />in mind<span className="text-apex">?</span>
          </h2>
          <div className="reveal reveal-delay-1 flex justify-center gap-3 flex-wrap">
            <a
              href="mailto:luke@lukesizmur.com"
              className="btn-primary inline-flex items-center gap-3 bg-oatmeal text-black no-underline text-[14px] font-semibold pl-6 pr-[14px] py-[14px] rounded-full transition-all duration-500 hover:bg-apex hover:text-cream hover:scale-[1.02]"
            >
              Send an email
              <span className="btn-icon w-8 h-8 rounded-full bg-oatmeal/[0.08] flex items-center justify-center transition-transform duration-500">
                <ArrowRight size={13} />
              </span>
            </a>
            <a
              href="https://github.com/LukeSizmur"
              className="inline-flex items-center gap-2.5 bg-transparent text-oatmeal no-underline text-[14px] font-semibold py-[14px] px-6 rounded-full border-[1.5px] border-white/15 transition-all duration-500 hover:border-white/40 hover:bg-white/[0.06]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/luke-sizmur/"
              className="inline-flex items-center gap-2.5 bg-transparent text-oatmeal no-underline text-[14px] font-semibold py-[14px] px-6 rounded-full border-[1.5px] border-white/15 transition-all duration-500 hover:border-white/40 hover:bg-white/[0.06]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </section>

        {/* Footer — oatmeal card over the shader */}
        <footer className="relative z-10 p-6 max-md:p-3">
          <FooterCard />
        </footer>
      </div>
    </>
  );
}