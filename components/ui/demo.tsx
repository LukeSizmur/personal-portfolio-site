import AnimatedCardStack, { type CardItem } from "@/components/ui/animate-card-animation"

const demoCards: CardItem[] = [
  {
    id: 1,
    title: "SOCA Dashboard",
    description: "Cybersecurity SaaS platform",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    badge: "Founder",
    gradient: "radial-gradient(ellipse at 30% 50%, rgba(232,62,11,0.3) 0%, rgba(232,62,11,0) 60%), #0d0d0b",
  },
  {
    id: 2,
    title: "Selfie Roamer",
    description: "Web and automation workflows",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(ellipse at 60% 40%, rgba(100,180,255,0.2) 0%, rgba(100,180,255,0) 60%), #0a0a12",
  },
  {
    id: 3,
    title: "Security Dashboards",
    description: "Enterprise visualisation platform",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(232,62,11,0.15) 0%, rgba(232,62,11,0) 70%), #0d0c0a",
  },
]

export default function DemoOne() {
  return <AnimatedCardStack items={demoCards} />
}
