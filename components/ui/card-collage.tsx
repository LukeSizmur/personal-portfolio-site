"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export interface CollageCardData {
  src?: string
  alt?: string
  bg?: string
}

interface CardCollageProps {
  cards?: [CollageCardData, CollageCardData, CollageCardData]
  label?: string
  className?: string
}

const DEFAULT_CARDS: [CollageCardData, CollageCardData, CollageCardData] = [
  { bg: "linear-gradient(145deg, #e8e4dd 0%, #d4d0cb 100%)" },
  { bg: "linear-gradient(145deg, #fdfbf7 0%, #ece8e1 100%)" },
  { bg: "linear-gradient(145deg, #f5f2ee 0%, #ddd9d2 100%)" },
]

const CARD_CONFIGS = [
  { style: { left: 0, top: 44, width: 172, height: 246 },              rotation: -5, depth: 0.022, zIndex: 1 },
  { style: { left: 144, top: 0, width: 172, height: 260 },             rotation: 6,  depth: 0.038, zIndex: 2 },
  { style: { left: "50%", bottom: 0, marginLeft: -78, width: 156, height: 156 }, rotation: 2,  depth: 0.012, zIndex: 3 },
]

export default function CardCollage({ cards = DEFAULT_CARDS, label, className = "" }: CardCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const isHovering  = useRef(false)
  const resetRef    = useRef<(() => void) | null>(null)

  useEffect(() => {
    const els = cardRefs.current

    CARD_CONFIGS.forEach(({ rotation }, i) => {
      if (els[i]) gsap.set(els[i], { rotation, transformOrigin: "center center" })
    })

    const movers = els.map((el, i) => {
      if (!el) return null
      return {
        x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
        depth: CARD_CONFIGS[i].depth,
      }
    })

    resetRef.current = () => {
      movers.forEach((m) => { if (m) { m.x(0); m.y(0) } })
    }

    // Single persistent listener — only acts when cursor is inside the collage.
    // This avoids the "missed mouseenter" failure mode of dynamic add/remove.
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering.current) return
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      movers.forEach((m) => {
        if (!m) return
        m.x((e.clientX - cx) * m.depth)
        m.y((e.clientY - cy) * m.depth)
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHovering.current = true }}
      onMouseLeave={() => { isHovering.current = false; resetRef.current?.() }}
      className={`relative select-none ${className}`}
      style={{ width: 340, height: 420 }}
    >
      {CARD_CONFIGS.map(({ style, zIndex }, i) => {
        const card = cards[i]
        return (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el }}
            className="absolute rounded-[18px] overflow-hidden"
            style={{
              ...style,
              zIndex,
              willChange: "transform",
              boxShadow: "0 6px 24px rgba(43,43,43,0.10), 0 2px 8px rgba(43,43,43,0.07)",
              border: "1px solid rgba(43,43,43,0.08)",
              background: card.bg ?? "var(--smoke)",
            }}
          >
            {card.src && (
              <Image
                src={card.src}
                alt={card.alt ?? ""}
                fill
                className="object-cover"
                draggable={false}
              />
            )}
          </div>
        )
      })}

      {label && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: -44, zIndex: 4 }}>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
