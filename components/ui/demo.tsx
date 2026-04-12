import AnimatedCardStack, { type CardItem } from "@/components/ui/animate-card-animation"

const demoCards: CardItem[] = [
  {
    id: 1,
    title: "SOCA Dashboard",
    description: "Cybersecurity SaaS platform",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    badge: "Founder",
  },
  {
    id: 2,
    title: "Selfie Roamer",
    description: "Web and automation workflows",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Security Dashboards",
    description: "Enterprise visualisation platform",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
]

export default function DemoOne() {
  return <AnimatedCardStack items={demoCards} />
}
