import type { CardItem } from "@/components/ui/animate-card-animation";

export const PROJECTS: CardItem[] = [
  {
    id: 1,
    title: "ReadySteadySmile",
    description: "A photobooth company operating globally",
    image: "/www.readysteadysmile.co.uk_.png",
    url: "https://www.readysteadysmile.co.uk",
    badge: "NextJS",
    gradient: "#242424",
    badgeText: "#fafafa",
    badgeBg: "rgba(250,250,250,0.08)",
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
    description: "A podcast platform and website for Fleur Siobhan",
    image: "/thefleursiohanpodcast.vercel.app_.png",
    url: "https://thefleursiohanpodcast.vercel.app",
    badge: "Next.js",
    gradient: "#5a1624",
    light: false,
    badgeText: "#fafafa",
    badgeBg: "rgba(250,250,250,0.08)",
    writeup: {
      summary: "Built and deployed a full podcast website for Fleur Siobhan. The site showcases episodes, links to streaming platforms, and gives Fleur a branded online home that matches her aesthetic.",
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
    gradient: "#242424",
    badgeText: "#fafafa",
    badgeBg: "rgba(250,250,250,0.08)",
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
