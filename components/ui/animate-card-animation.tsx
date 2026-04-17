"use client"

/* eslint-disable @next/next/no-img-element */

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export interface CardItem {
  id: number
  title: string
  description: string
  image: string
  badge?: string
  writeup?: {
    summary: string
    highlights: string[]
    tech: string[]
  }
}

const PANEL_THEMES = [
  { bg: "bg-soca",   badgeText: "text-[var(--apex)]",    badgeBg: "bg-[rgba(232,62,11,0.14)] border-[rgba(232,62,11,0.16)]" },
  { bg: "bg-selfie", badgeText: "text-[var(--amber)]",   badgeBg: "bg-[rgba(245,166,35,0.14)] border-[rgba(245,166,35,0.16)]" },
  { bg: "bg-hct",    badgeText: "text-[var(--apex)]",    badgeBg: "bg-[rgba(232,62,11,0.14)] border-[rgba(232,62,11,0.16)]" },
  { bg: "bg-soca",   badgeText: "text-[var(--oatmeal)]", badgeBg: "bg-white/[0.08] border-white/10" },
]

interface ProjectsOverscrollProps {
  items?: CardItem[]
  className?: string
}

function WriteupSection({ writeup, theme }: { writeup: NonNullable<CardItem["writeup"]>; theme: typeof PANEL_THEMES[0] }) {
  return (
    <div className="flex flex-col gap-10 pb-[60px]">
      <div className="border-t border-white/10" />

      <p className="text-[17px] leading-[1.8] text-[var(--oatmeal)]/70 max-w-[700px]">
        {writeup.summary}
      </p>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--oatmeal)]/35 font-semibold">
          What we built
        </span>
        <ul className="flex flex-col gap-3">
          {writeup.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-[var(--apex)] mt-[10px] flex-shrink-0" />
              <span className="text-[15px] leading-[1.7] text-[var(--oatmeal)]/65">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-8 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {writeup.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-[var(--oatmeal)]/50 font-medium">
              {t}
            </span>
          ))}
        </div>
        <button className="flex-shrink-0 flex items-center gap-1.5 rounded-full bg-[var(--oatmeal)] text-black px-6 py-3 text-[14px] font-semibold transition-colors hover:bg-[var(--apex)] hover:text-[var(--cream)]">
          Read <ChevronRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default function ProjectsOverscroll({ items = [], className }: ProjectsOverscrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (isMobile === null || isMobile) return
    const container = containerRef.current
    if (!container || items.length === 0) return

    const ctx = gsap.context(() => {
      const allPanels = Array.from(container.querySelectorAll<HTMLElement>(".overscroll-panel"))
      const animatedPanels = allPanels.slice(0, -1)

      animatedPanels.forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>(".overscroll-panel-inner")!
        const panelHeight = inner.offsetHeight
        const winHeight = window.innerHeight
        const difference = panelHeight - winHeight
        const fakeScrollRatio = difference > 0 ? difference / (difference + winHeight) : 0

        if (fakeScrollRatio) {
          panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () => fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
          },
        })

        if (fakeScrollRatio) {
          tl.to(inner, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          })
        }

        tl
          .fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 })
          .to(panel, { opacity: 0, duration: 0.1 })
      })

      ScrollTrigger.refresh()
    }, container)

    return () => ctx.revert()
  }, [isMobile, items])

  if (isMobile === null) return <div className="min-h-screen bg-black" />

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 px-4 pb-12">
        {items.map((item, i) => {
          const theme = PANEL_THEMES[i] ?? PANEL_THEMES[PANEL_THEMES.length - 1]
          return (
            <div key={item.id} className={`rounded-[24px] overflow-hidden ${theme.bg} p-6 flex flex-col gap-4`}>
              {item.badge && (
                <span className={`self-start rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${theme.badgeText} ${theme.badgeBg}`}>
                  {item.badge}
                </span>
              )}
              <img src={item.image} alt={item.title} className="w-full max-h-[220px] object-contain" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold tracking-tight text-[var(--oatmeal)]">{item.title}</h3>
                <p className="text-[14px] text-[var(--oatmeal)]/60">{item.description}</p>
              </div>
              {item.writeup && (
                <div className="flex flex-col gap-4 pt-2 border-t border-white/10">
                  <p className="text-[13px] leading-[1.7] text-[var(--oatmeal)]/60">{item.writeup.summary}</p>
                  <ul className="flex flex-col gap-2">
                    {item.writeup.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[var(--apex)] mt-[8px] flex-shrink-0" />
                        <span className="text-[13px] leading-[1.6] text-[var(--oatmeal)]/55">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.writeup.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-[var(--oatmeal)]/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {items.map((item, i) => {
        const theme = PANEL_THEMES[i] ?? PANEL_THEMES[PANEL_THEMES.length - 1]
        const hasWriteup = Boolean(item.writeup)
        return (
          <div key={item.id} className={`overscroll-panel ${theme.bg} w-full`}>
            <div className="overscroll-panel-inner flex flex-col px-[60px] pt-[60px] min-h-[100dvh]">

              {/* Top row: badge + title/desc on left, image on right */}
              <div className={`flex gap-12 ${hasWriteup ? "items-start" : "items-center flex-1"} ${!hasWriteup ? "pb-[60px]" : "pb-0"}`}>
                <div className="flex flex-col gap-6 flex-1">
                  {item.badge && (
                    <span className={`self-start rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${theme.badgeText} ${theme.badgeBg}`}>
                      {item.badge}
                    </span>
                  )}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[clamp(28px,3.5vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--oatmeal)]">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-[var(--oatmeal)]/60 max-w-[440px]">
                      {item.description}
                    </p>
                  </div>
                  {!hasWriteup && (
                    <button className="self-start flex items-center gap-1.5 rounded-full bg-[var(--oatmeal)] text-black px-6 py-3 text-[14px] font-semibold transition-colors hover:bg-[var(--apex)] hover:text-[var(--cream)]">
                      Read <ChevronRight className="size-4" strokeWidth={2.5} />
                    </button>
                  )}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`object-contain select-none flex-shrink-0 ${hasWriteup ? "w-[45%] max-h-[52vh] pt-2" : "w-[45%] max-h-[60vh]"}`}
                />
              </div>

              {/* Writeup section — only renders when content is provided */}
              {item.writeup && (
                <WriteupSection writeup={item.writeup} theme={theme} />
              )}

            </div>
          </div>
        )
      })}
    </div>
  )
}
