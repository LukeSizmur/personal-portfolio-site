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
  url?: string
  badge?: string
  gradient: string
  light?: boolean
  badgeText?: string
  badgeBg?: string
  writeup?: {
    summary: string
    highlights: string[]
    tech: string[]
  }
}

interface ProjectsOverscrollProps {
  items?: CardItem[]
  className?: string
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

  const dark = "text-[var(--oatmeal)]"
  const light = "text-[#2b2b2b]"

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 px-4 pb-12">
        {items.map((item) => {
          const isLight = item.light ?? false
          const txt = isLight ? light : dark
          return (
            <div
              key={item.id}
              className="rounded-[24px] overflow-hidden p-6 flex flex-col gap-4"
              style={{ background: item.gradient }}
            >
              {item.badge && (
                <span
                  className="self-start rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: item.badgeText, borderColor: item.badgeBg, background: item.badgeBg }}
                >
                  {item.badge}
                </span>
              )}
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-h-[220px] object-cover object-top rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <h3 className={`text-[22px] font-bold tracking-tight ${txt}`}>{item.title}</h3>
                <p className={`text-[14px] ${isLight ? "text-[#2b2b2b]/60" : "text-[var(--oatmeal)]/60"}`}>{item.description}</p>
              </div>
              {item.writeup && (
                <div className={`flex flex-col gap-4 pt-2 border-t ${isLight ? "border-black/10" : "border-white/10"}`}>
                  <p className={`text-[13px] leading-[1.7] ${isLight ? "text-[#2b2b2b]/60" : "text-[var(--oatmeal)]/60"}`}>{item.writeup.summary}</p>
                  <ul className="flex flex-col gap-2">
                    {item.writeup.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[var(--apex)] mt-[8px] flex-shrink-0" />
                        <span className={`text-[13px] leading-[1.6] ${isLight ? "text-[#2b2b2b]/55" : "text-[var(--oatmeal)]/55"}`}>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.writeup.tech.map((t) => (
                      <span key={t} className={`rounded-full border px-2.5 py-0.5 text-[10px] ${isLight ? "border-black/10 bg-black/5 text-[#2b2b2b]/50" : "border-white/10 bg-white/5 text-[var(--oatmeal)]/50"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`self-start flex items-center gap-1.5 rounded-full no-underline px-5 py-2.5 text-[13px] font-semibold transition-colors ${isLight ? "bg-[#2b2b2b] text-[var(--oatmeal)] hover:bg-[var(--apex)] hover:text-[var(--cream)]" : "bg-[var(--oatmeal)] text-black hover:bg-[var(--apex)] hover:text-[var(--cream)]"}`}
                    >
                      Visit <ChevronRight className="size-3.5" strokeWidth={2.5} />
                    </a>
                  )}
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
      {items.map((item) => {
        const isLight = item.light ?? false
        const hasWriteup = Boolean(item.writeup)
        return (
          <div
            key={item.id}
            className="overscroll-panel w-full"
            style={{ background: item.gradient }}
          >
            <div className="overscroll-panel-inner flex min-h-[100dvh]">

              {/* Left column: all text content */}
              <div className="flex flex-col justify-between px-[60px] py-[60px] w-[46%] flex-shrink-0">
                <div className="flex flex-col gap-6">
                  {item.badge && (
                    <span
                      className="self-start rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: item.badgeText, borderColor: item.badgeBg, background: item.badgeBg }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div className="flex flex-col gap-3">
                    <h3 className={`text-[clamp(28px,3.5vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] ${isLight ? "text-[#2b2b2b]" : "text-[var(--oatmeal)]"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[15px] leading-[1.6] max-w-[400px] ${isLight ? "text-[#2b2b2b]/60" : "text-[var(--oatmeal)]/60"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {hasWriteup && item.writeup ? (
                  <div className="flex flex-col gap-8 mt-10">
                    <div className={`border-t ${isLight ? "border-black/10" : "border-white/10"}`} />
                    <p className={`text-[16px] leading-[1.8] ${isLight ? "text-[#2b2b2b]/70" : "text-[var(--oatmeal)]/70"}`}>
                      {item.writeup.summary}
                    </p>
                    <div className="flex flex-col gap-3">
                      <span className={`text-[10px] uppercase tracking-[0.14em] font-semibold ${isLight ? "text-[#2b2b2b]/35" : "text-[var(--oatmeal)]/35"}`}>
                        What I built
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {item.writeup.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full bg-[var(--apex)] mt-[9px] flex-shrink-0" />
                            <span className={`text-[14px] leading-[1.65] ${isLight ? "text-[#2b2b2b]/65" : "text-[var(--oatmeal)]/65"}`}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between gap-4 flex-wrap pb-[60px]">
                      <div className="flex flex-wrap gap-2">
                        {item.writeup.tech.map((t) => (
                          <span key={t} className={`rounded-full border px-3 py-1 text-[11px] font-medium ${isLight ? "border-black/10 bg-black/5 text-[#2b2b2b]/50" : "border-white/10 bg-white/5 text-[var(--oatmeal)]/50"}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-shrink-0 flex items-center gap-1.5 rounded-full no-underline px-6 py-3 text-[14px] font-semibold transition-colors ${isLight ? "bg-[#2b2b2b] text-[var(--oatmeal)] hover:bg-[var(--apex)] hover:text-[var(--cream)]" : "bg-[var(--oatmeal)] text-black hover:bg-[var(--apex)] hover:text-[var(--cream)]"}`}
                        >
                          Visit <ChevronRight className="size-4" strokeWidth={2.5} />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  item.url && (
                    <div className="pb-[60px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full no-underline px-6 py-3 text-[14px] font-semibold transition-colors ${isLight ? "bg-[#2b2b2b] text-[var(--oatmeal)] hover:bg-[var(--apex)] hover:text-[var(--cream)]" : "bg-[var(--oatmeal)] text-black hover:bg-[var(--apex)] hover:text-[var(--cream)]"}`}
                      >
                        Visit <ChevronRight className="size-4" strokeWidth={2.5} />
                      </a>
                    </div>
                  )
                )}
              </div>

              {/* Right column: large image */}
              <div className="flex-1 flex items-center justify-center py-[60px] pr-[60px] pl-6">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full max-h-[80vh] object-cover object-top rounded-2xl select-none ${isLight ? "border border-black/10 shadow-[0_32px_80px_rgba(0,0,0,0.15)]" : "border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]"}`}
                  />
                </div>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}
