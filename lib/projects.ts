import type { CardItem } from "@/components/ui/animate-card-animation";

export const PROJECTS: CardItem[] = [
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
        "Full redesign from their previous GoDaddy template into a custom NextJS site",
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
