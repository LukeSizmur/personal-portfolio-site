"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { gsap } from "gsap"
import Image from "next/image"

const PHOTOS = [
  { src: "/sebastian_schub_photography.JPEG", alt: "Sebastian Schub Concert Photo" },
  { src: "/Fujifilm_photography.JPG",  alt: "Fujifilm X100T photography" },
  { src: "/London_photography.JPEG", alt: "Picture of Westminster Cathedral" },
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
  const [modalPhoto, setModalPhoto] = useState<{ src: string; alt: string } | null>(null)
  const isFannedRef = useRef(false)

  const closeModal = useCallback(() => setModalPhoto(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeModal])

  useEffect(() => {
    if (modalPhoto) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [modalPhoto])

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
      isFannedRef.current = true
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
          delay: i * 0.04,
          overwrite: true,
        })
      })
    }

    const collapse = () => {
      isFannedRef.current = false
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

    // Per-photo hover lift
    els.forEach((el, i) => {
      if (!el) return
      el.addEventListener("mouseenter", () => {
        if (!isFannedRef.current) return
        gsap.to(el, { y: -28, scale: 1.08, duration: 0.25, ease: "power2.out", overwrite: "auto" })
      })
      el.addEventListener("mouseleave", () => {
        if (!isFannedRef.current) return
        gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" })
      })
    })

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
          className="absolute inset-x-0 bottom-0 flex justify-center"
          style={{ height: 170 }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => { photoRefs.current[i] = el }}
              className="absolute bottom-0 cursor-pointer"
              onClick={() => isFannedRef.current && setModalPhoto(photo)}
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

      {/* Full-screen modal — portalled to body to escape stacking context */}
      {modalPhoto && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalPhoto.src}
              alt={modalPhoto.alt}
              width={1200}
              height={900}
              className="block"
              style={{ width: "auto", height: "auto", maxWidth: "90vw", maxHeight: "90vh" }}
              draggable={false}
            />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-lg hover:bg-black/75 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
