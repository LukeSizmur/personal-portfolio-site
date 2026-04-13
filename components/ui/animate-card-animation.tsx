"use client"

/* eslint-disable @next/next/no-img-element */

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export interface CardItem {
  id: number
  title: string
  description: string
  image: string
  badge?: string
}

interface AnimatedCardStackProps {
  items?: CardItem[]
  className?: string
  header?: React.ReactNode
}

// Visual stack — index 0 is the front (topmost) card
const STACK_POSITIONS = [
  { scale: 1,     y: 0   },
  { scale: 0.955, y: -22 },
  { scale: 0.91,  y: -44 },
]

function CardContent({ item }: { item: CardItem }) {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[28px] bg-[#141412] p-3 text-oatmeal">
      <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-[24px] outline outline-1 outline-white/8">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,0.03)_0%,rgba(20,20,18,0.18)_100%)]" />
        {item.badge ? (
          <span className="absolute left-4 top-4 rounded-full border border-[rgba(232,62,11,0.16)] bg-[rgba(232,62,11,0.14)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-apex">
            {item.badge}
          </span>
        ) : null}
      </div>
      <div className="flex w-full items-center justify-between gap-4 px-3 pb-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[20px] font-bold tracking-[-0.03em] text-oatmeal">
            {item.title}
          </span>
          <span className="text-[14px] text-oatmeal/58">{item.description}</span>
        </div>
        <button className="flex h-11 shrink-0 cursor-pointer select-none items-center gap-1 rounded-full bg-oatmeal pl-5 pr-4 text-sm font-semibold text-black transition-colors hover:bg-apex hover:text-cream">
          Read
          <ChevronRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

// Simple vertical list used on mobile — no pinning or scroll hijacking
function MobileCardList({ items, className }: { items: CardItem[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 px-4 pb-12", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-[rgba(18,18,16,0.96)] p-1.5 shadow-[0_32px_100px_rgba(0,0,0,0.45)]"
        >
          <CardContent item={item} />
        </div>
      ))}
    </div>
  )
}

export default function AnimatedProjectStack({
  items = [],
  className,
  header,
}: AnimatedCardStackProps) {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile]           = useState<boolean | null>(null)
  const [revealedCount, setRevealedCount] = useState(1)
  const revealedRef = useRef(1)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Desktop-only: pinned scroll animation
  useEffect(() => {
    if (isMobile === null || isMobile) return
    const el = sectionRef.current
    if (!el || items.length === 0) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${items.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const count = Math.round(self.progress * items.length)
          if (count !== revealedRef.current) {
            revealedRef.current = count
            setRevealedCount(count)
          }
        },
      })
    }, el)

    return () => ctx.revert()
  }, [isMobile, items.length])

  if (isMobile === null) return <div className="min-h-screen bg-black" />

  if (isMobile) {
    return (
      <div className="bg-black pt-10">
        {header && <div className="px-6 mb-8">{header}</div>}
        <MobileCardList items={items} className={className} />
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative flex min-h-dvh flex-col bg-black",
        className,
      )}
    >
      {header && (
        <div className="relative shrink-0 px-[60px] pt-[72px] pb-8 max-md:px-6 max-md:pt-10">
          {header}
        </div>
      )}

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-12">
        <div className="relative h-[560px] w-[min(100%,calc(100vw-32px))]">
          <AnimatePresence>
            {items.slice(0, revealedCount).map((item, i) => {
              const stackIndex = revealedCount - 1 - i
              const pos    = STACK_POSITIONS[stackIndex] ?? STACK_POSITIONS[STACK_POSITIONS.length - 1]
              const zIndex = items.length - stackIndex

              return (
                <motion.div
                  key={item.id}
                  initial={{ y: 300, scale: 0.92, opacity: 0 }}
                  animate={{ y: pos.y, scale: pos.scale, opacity: 1 }}
                  exit={{ y: 300, scale: 0.92, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.72 }}
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex }}
                  className="flex h-[500px] items-center justify-center overflow-hidden rounded-[32px] border border-white/[0.08] bg-[rgba(18,18,16,0.96)] p-1.5 shadow-[0_32px_100px_rgba(0,0,0,0.45)] will-change-transform"
                >
                  <CardContent item={item} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "rounded-full transition-all duration-500",
                i < revealedCount
                  ? "h-1.5 w-6 bg-oatmeal/60"
                  : "h-1.5 w-1.5 bg-white/20",
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ opacity: revealedCount > 1 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 right-[60px] flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/30 max-md:right-6"
        aria-hidden
      >
        <span className="h-px w-8 bg-white/20" />
        Scroll
      </motion.div>
    </div>
  )
}
