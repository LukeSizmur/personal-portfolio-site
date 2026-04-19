import { TypewriterWord } from "@/components/typewriter-word"
import { FooterShader } from "@/components/footer-shader"
import { HomeNav } from "@/components/home-nav"
import { ScrollReveal } from "@/components/scroll-reveal"
import ProjectsOverscroll, { CardItem } from "@/components/ui/animate-card-animation"
import TechStack from "@/components/TechStack";
import { MonitorSmartphone, LayoutTemplate, LineChart, ArrowUpRight, ArrowRight } from "lucide-react";
import { FooterCard } from "@/components/footer-card"
import CardCollage from "@/components/ui/card-collage"
import PhotographyFan from "@/components/ui/photography-fan"
import { ScrollArrow } from "@/components/ui/scroll-arrow"
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { fetchWeatherApi } from "openmeteo";

const LONDON_COORDS = {
  latitude: 51.5072,
  longitude: -0.1276,
} as const;

function getWeatherDescription(code: number | undefined) {
  switch (code) {
    case 0:
      return "clear skies";
    case 1:
      return "mostly clear skies";
    case 2:
      return "partly cloudy skies";
    case 3:
      return "overcast skies";
    case 45:
    case 48:
      return "foggy conditions";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "drizzly weather";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "rain";
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "snow";
    case 95:
    case 96:
    case 99:
      return "thunderstorms";
    default:
      return "typical London weather";
  }
}

async function getLondonWeather() {
  await connection();

  const params = {
    latitude: [LONDON_COORDS.latitude],
    longitude: [LONDON_COORDS.longitude],
    current: "temperature_2m,weather_code",
    timezone: "Europe/London",
    forecast_days: 1,
  };

  try {
    const responses = await fetchWeatherApi(
      "https://api.open-meteo.com/v1/forecast",
      params,
    );
    const response = responses[0];
    const current = response?.current();

    if (!current) {
      return null;
    }

    const temperature = current.variables(0)?.value();
    const weatherCode = current.variables(1)?.value();

    if (typeof temperature !== "number" || Number.isNaN(temperature)) {
      return null;
    }

    return {
      temperature: Math.round(temperature),
      weatherCode: typeof weatherCode === "number" ? Math.round(weatherCode) : undefined,
      description: getWeatherDescription(
        typeof weatherCode === "number" ? weatherCode : undefined,
      ),
    };
  } catch {
    return null;
  }
}

function WeatherIcon({ code }: { code: number | undefined }) {
  const svgProps = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (code === 0 || code === 1) {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="4.5"/>
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.64 5.64l1.77 1.77M16.59 16.59l1.77 1.77M18.36 5.64l-1.77 1.77M7.41 16.59l-1.77 1.77"/>
      </svg>
    );
  }
  if (code === 2) {
    return (
      <svg {...svgProps}>
        <path d="M10 3v1m4.24 1.76-.7.7M17 9h-1m-2.3 5.3.7.7"/>
        <circle cx="10" cy="7" r="3"/>
        <path d="M19 17H5a4 4 0 0 1-.67-7.94A5 5 0 0 1 14 10.3a3.5 3.5 0 0 1 5 3.2 2.5 2.5 0 0 1 0 3.5z"/>
      </svg>
    );
  }
  if (code === 3) {
    return (
      <svg {...svgProps}>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
      </svg>
    );
  }
  if (code === 45 || code === 48) {
    return (
      <svg {...svgProps}>
        <path d="M3 8h18M3 12h18M3 16h18M5 20h14"/>
      </svg>
    );
  }
  if (code !== undefined && code >= 51 && code <= 57) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19v.01M12 19v2M16 19v.01M10 21v.01M14 21v.01"/>
      </svg>
    );
  }
  if (code !== undefined && ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19v2M12 19v3M16 19v2"/>
      </svg>
    );
  }
  if (code !== undefined && ((code >= 71 && code <= 77) || code === 85 || code === 86)) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19h.01M12 19h.01M16 19h.01M8 22h.01M12 22h.01M16 22h.01"/>
      </svg>
    );
  }
  if (code !== undefined && code >= 95) {
    return (
      <svg {...svgProps}>
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
        <path d="M13 11l-4 6h6l-4 6"/>
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
    </svg>
  );
}

async function LondonWeather() {
  const weather = await getLondonWeather();

  if (!weather) return null;

  return (
    <div className="inline-flex items-center gap-2.5 mb-5 pl-3 pr-4 py-[9px] rounded-full bg-cream border border-smoke select-none">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-muted shrink-0">
        <span className="w-[6px] h-[6px] rounded-full bg-apex status-dot" />
        Live
      </span>
      <span className="w-px h-3.5 bg-smoke shrink-0" />
      <span className="text-[#5a5650] shrink-0">
        <WeatherIcon code={weather.weatherCode} />
      </span>
      <span className="font-bold text-black text-[14px] tracking-[-0.02em] shrink-0">{weather.temperature}°C</span>
      <span className="w-px h-3.5 bg-smoke shrink-0" />
      <span className="text-[12px] text-muted">London · {weather.description}</span>
    </div>
  );
}

const PROJECTS: CardItem[] = [
  {
    id: 1,
    title: "ReadySteadySmile",
    description: "A photobooth company operating globally",
    image: "/www.readysteadysmile.co.uk_.png",
    url: "https://www.readysteadysmile.co.uk",
    badge: "NextJS",
    gradient: `
      radial-gradient(ellipse at 25% 55%, rgba(139,92,246,0.75) 0%, rgba(139,92,246,0) 55%),
      radial-gradient(ellipse at 80% 25%, rgba(192,132,252,0.55) 0%, rgba(192,132,252,0) 50%),
      radial-gradient(ellipse at 60% 80%, rgba(109,40,217,0.4) 0%, rgba(109,40,217,0) 45%),
      #0d0a1a
    `,
    badgeText: "rgba(192,132,252,1)",
    badgeBg: "rgba(139,92,246,0.18)",
    writeup: {
      summary: "ReadySteadySmile offers a variety of photobooths and TheSelfieRoamer™ at events across the UK and Europe. I built and maintain their full booking and marketing website which uses Make.com as a backend workflow. I setup a webhook which handles emails and calendar automation so the customer and client stay informed about the enquiry. I have also built a dashboard which helps keep their bookings in an organised and central place utilising GitHub actions to automtically update booking status from Future, Active and Past.",
      highlights: [
        "Customer booking flow with real-time availability, add-ons, and automated confirmation emails",
        "Ops dashboard for managing events",
        "Full redesign from their previous GoDaddy template into a custom NextJS site"
      ],
      tech: ["React", "TypeScript", "Node.js", "Make.com", "NextJS", "Vercel"],
    },
  },
  {
    id: 2,
    title: "The Fleur Siobhan Podcast",
    description: "A podcast platform and website for a lifestyle content creator",
    image: "/thefleursiohanpodcast.vercel.app_.png",
    url: "https://thefleursiohanpodcast.vercel.app",
    badge: "Next.js",
    gradient: `
      radial-gradient(ellipse at 20% 60%, rgba(255,182,193,0.55) 0%, rgba(255,182,193,0) 55%),
      radial-gradient(ellipse at 78% 25%, rgba(221,160,221,0.45) 0%, rgba(221,160,221,0) 50%),
      radial-gradient(ellipse at 55% 85%, rgba(255,218,185,0.4) 0%, rgba(255,218,185,0) 45%),
      #fdf8f5
    `,
    light: true,
    badgeText: "rgba(180,80,160,1)",
    badgeBg: "rgba(221,160,221,0.3)",
    writeup: {
      summary: "Built and deployed a full podcast website for Fleur Siobhan — a lifestyle and wellness content creator. The site showcases episodes, links to streaming platforms, and gives Fleur a branded online home that matches her aesthetic.",
      highlights: [
        "Clean, editorial layout designed to match the podcast's brand identity",
        "Episode listing with direct links to Spotify, Apple Podcasts, and YouTube",
        "Fully responsive — optimised for mobile listeners discovering the show on the go",
        "Deployed on Vercel with fast cold-start performance and zero downtime updates",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
  },
  {
    id: 3,
    title: "Brook Rose Photography",
    description: "A photography business based in Chichester, England",
    image: "/brookrosephotography.png",
    badge: "Astro",
    gradient: `
      radial-gradient(ellipse at 20% 55%, rgba(170,145,80,0.7) 0%, rgba(170,145,80,0) 55%),
      radial-gradient(ellipse at 78% 22%, rgba(90,110,50,0.6) 0%, rgba(90,110,50,0) 50%),
      radial-gradient(ellipse at 55% 88%, rgba(150,105,55,0.55) 0%, rgba(150,105,55,0) 45%),
      #514D38
    `,
    badgeText: "rgba(210,195,140,1)",
    badgeBg: "rgba(170,145,80,0.2)",
    writeup: {
      summary: "Brook Rose Photography is a Chichester-based photography studio specialising in portraits, families, and special occasions. I designed and built their website to reflect the warmth and artistry behind their work — giving them a beautiful online home to showcase their portfolio and attract new clients.",
      highlights: [
        "Portfolio gallery with curated collections, full-screen lightbox, and smooth transitions",
        "Fully responsive design optimised for couples and families browsing on mobile",
      ],
      tech: ["Astro", "TypeScript", "Tailwind CSS", "Vercel"],
    },
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
        className="min-h-[90dvh] flex items-start justify-between gap-16 px-[90px] pt-[100px] pb-[80px] relative overflow-hidden max-md:flex-col max-md:gap-10 max-md:px-6 max-md:pt-[120px] max-md:pb-[110px]"
      >
        {/* Left column: title + bio + tech stack */}
        <div className="flex flex-col flex-1">
          <h1 className="animate-hero-title text-[clamp(56px,11vw,160px)] font-bold leading-[0.9] tracking-[-0.04em] text-black whitespace-nowrap">
            Software<br /><TypewriterWord /><span className="text-apex animate-cursor">|</span>
          </h1>

          <div className="animate-hero-sub mt-10">
            <Suspense fallback={null}>
              <LondonWeather />
            </Suspense>
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
        </div>

        <ProjectsOverscroll items={PROJECTS} />

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
              <div className="text-[14px] leading-[1.7] text-muted">I love watching movies and tv shows, to the point that I track all the movies and shows via some awesome apps called <a className="text-blue-600 underline" href='https://apps.apple.com/app/id1630746993'>Sequel</a> and <a className="text-blue-600 underline" href='https://apps.apple.com/app/id6504503117'>Flix</a>. My favourite film within the last few years has to be <span className='text-apex'>BlackBerry 2023</span>, it just embodies all of what I love about the tech industry.</div>
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
            <div className="relative rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 pb-[130px] xl:pb-9 h-full">
              <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
                Interests
              </div>
              <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">In my spare time</div>
              <div className="text-[14px] leading-[1.7] text-muted">Outside of my day to day work, I&apos;m usually keeping up with the latest tech trends, deep in a game, or running a small newsletter curating interesting corners of the internet.</div>
              <ul className="personal-list list-none mt-5 flex flex-col gap-2.5">
                {['Football', 'Gaming', 'Movies', 'Substack Newsletter'].map((hobby) => (
                  <li key={hobby} className="flex items-center gap-3 text-[14px] text-[#5a5650] font-medium">
                    {hobby}
                  </li>
                ))}
              </ul>
              {/* Curved dashed guide arrow */}
              <svg
                width="140"
                height="80"
                viewBox="0 0 130 80"
                fill="none"
                className="annotation-appear absolute bottom-[8px] right-[96px] pointer-events-none select-none hidden xl:block"
              >
                <defs>
                  <marker id="qr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M 1 1 L 6 4 L 1 7" stroke="#8a8580" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </marker>
                </defs>
                <text x="4" y="62" fontSize="10.5" fontStyle="italic" fontWeight="500" fill="#8a8580" transform="rotate(10, 4, 22)">
                  Click Me!
                </text>
                <path
                  d="M 22 54 C 45 5, 85 -8, 122 12"
                  stroke="#8a8580"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4.5 3.5"
                  markerEnd="url(#qr-arrow)"
                />
              </svg>

              <div className="group absolute bottom-2 right-2 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted lg:hidden">Click Me!</span>
                <div className="p-1.5 rounded-2xl bg-black/5 ring-1 ring-black/[0.06]">
                  <div className="relative p-2 rounded-[calc(1rem-0.375rem)] bg-white overflow-hidden">
                    <a href="https://lukesizmur.substack.com/">
                      <Image
                        src="/substack-qr-code.svg"
                        alt="Substack newsletter QR code"
                        className="w-14 h-14 block"
                        width={14}
                        height={14}
                      />
                    </a>
                    <div className="qr-shimmer pointer-events-none absolute inset-0 rounded-[calc(1rem-0.375rem)]" />
                  </div>
                </div>
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

          {/* Photography — wide, with fan animation */}
          <PhotographyFan />
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
