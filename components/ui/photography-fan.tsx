"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const PHOTOS = [
  { src: "/linkedin-profile-image.jpeg",      alt: "Luke Sizmur" },
  { src: "/HMS-Waverly-captain-portrait.jpeg", alt: "HMS Waverly" },
  { src: "/Ice-hockey.jpg",                   alt: "Ice Hockey" },
]

// Resting (fanned) positions relative to stack centre
const FAN_TARGETS = [
  { x: -72, rotation: -18 },
  { x: 0,   rotation: 0   },
  { x: 72,  rotation: 18  },
]

// How far below the card bottom the photos start (hidden by overflow-hidden)
const HIDDEN_Y = 220

export default function PhotographyFan() {
  const cardRef   = useRef<HTMLDivElement>(null)
  const photoRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    const els = photoRefs.current

    // Hidden state: stacked, pushed below the card edge
    els.forEach((el) => {
      if (el)
        gsap.set(el, {
          x: 0,
          y: HIDDEN_Y,
          rotation: 0,
          scale: 0.88,
          opacity: 0,
          transformOrigin: "bottom center",
        })
    })

    const card = cardRef.current
    if (!card) return

    const fanOut = () => {
      els.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          x: FAN_TARGETS[i].x,
          y: 0,
          rotation: FAN_TARGETS[i].rotation,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
          delay: i * 0.04,   // tiny stagger — left pops first
          overwrite: true,
        })
      })
    }

    const collapse = () => {
      // Reverse stagger: right first
      els.slice().reverse().forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          x: 0,
          y: HIDDEN_Y,
          rotation: 0,
          scale: 0.88,
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
          delay: i * 0.03,
          overwrite: true,
        })
      })
    }

    card.addEventListener("mouseenter", fanOut)
    card.addEventListener("mouseleave", collapse)
    return () => {
      card.removeEventListener("mouseenter", fanOut)
      card.removeEventListener("mouseleave", collapse)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="reveal reveal-delay-2 col-span-2 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light max-md:col-span-1"
    >
      {/* overflow-hidden clips the photos while they sit below the card edge */}
      <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full relative overflow-hidden">
        <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
          Photography
        </div>
        <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">
          Life through my lense
        </div>
        <div className="text-[14px] leading-[1.7] text-muted">
          For as long as I can remember I have always loved taking photos.
          I tend to gravitate to architectural pieces and it shows when looking through my phones gallery.
          I shoot a lot of photos on my iPhone 15 pro but occasionally I will take my FujiFilm X100T out with me. The Fuji always
          gives the photo a warmer feeling due to the film simulations baked in.
        </div>

        {/* Fan stage — absolutely positioned so it adds no height to the card */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none"
          style={{ height: 170 }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => { photoRefs.current[i] = el }}
              className="absolute bottom-0"
              style={{
                width: 120,
                height: 170,
                zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 32px rgba(43,43,43,0.20), 0 2px 8px rgba(43,43,43,0.10)",
                border: "1.5px solid rgba(255,255,255,0.75)",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
