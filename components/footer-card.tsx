"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { FooterName } from "@/components/footer-name"

const NAV_LINKS = ["about", "work", "skills", "personal", "contact"] as const

export function FooterCard() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const nameRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const card    = cardRef.current
    const name    = nameRef.current
    if (!wrapper || !card || !name) return

    // perspective on the PARENT so card's 3D rotation has a vanishing point
    gsap.set(wrapper, { perspective: 650 })

    // card: 3D tilt — rotationX/Y
    const cardRX = gsap.quickTo(card, "rotationX", { ease: "power3", duration: 0.6 })
    const cardRY = gsap.quickTo(card, "rotationY", { ease: "power3", duration: 0.6 })

    // text: 2D translation inside the tilted card — x/y
    // Moving in the same direction as the cursor within a perspective-rotated
    // parent is what makes the text appear to float above the card surface
    const nameX = gsap.quickTo(name, "x", { ease: "power3", duration: 0.5 })
    const nameY = gsap.quickTo(name, "y", { ease: "power3", duration: 0.5 })

    function onPointerMove(e: PointerEvent) {
      if (!card) return
      const rect  = card.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width   // 0 → 1
      const yNorm = (e.clientY - rect.top)  / rect.height  // 0 → 1

      // 3-arg interpolate(a, b, progress) returns the value directly
      cardRX(gsap.utils.interpolate(15, -15, yNorm))
      cardRY(gsap.utils.interpolate(-15, 15, xNorm))
      nameX(gsap.utils.interpolate(-25, 25, xNorm))
      nameY(gsap.utils.interpolate(-25, 25, yNorm))
    }

    function onPointerLeave() {
      cardRX(0)
      cardRY(0)
      nameX(0)
      nameY(0)
    }

    card.addEventListener("pointermove",  onPointerMove)
    card.addEventListener("pointerleave", onPointerLeave)

    return () => {
      card.removeEventListener("pointermove",  onPointerMove)
      card.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <div>
      {/* wrapper owns the perspective — card is its immediate child */}
      <div ref={wrapperRef}>
        <div
          ref={cardRef}
          className="bg-oatmeal rounded-[28px] px-[60px] pt-14 pb-12 overflow-hidden relative max-md:px-6 max-md:pt-10 max-md:pb-8 max-md:rounded-[20px]"
        >
          <div className="flex justify-between items-start mb-[60px] relative z-10">
            <div>
              <div className="text-[18px] font-bold tracking-[-0.02em] text-black">
                Luke<span className="text-apex">.</span>
              </div>
              <div className="text-[13px] text-muted mt-1">Developer — England</div>
            </div>
          </div>

          {/* FooterName translates in x/y within the perspective-tilted card */}
          <FooterName ref={nameRef} />

          <div className="flex justify-between items-center pt-7 border-t border-[rgba(43,43,43,0.1)] relative z-10">
            <span className="text-[12px] text-muted">© 2026 Luke Sizmur. All rights reserved.</span>
            <div className="flex items-center gap-1.5 text-[12px] text-muted">
              <span className="status-dot w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block"></span>
              Open to opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Nav links live outside the tilt — stable and always tappable */}
      <div className="flex justify-center gap-8 pt-6 pb-2 max-md:gap-5">
        {NAV_LINKS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className="no-underline text-[13px] font-medium text-oatmeal/40 transition-colors duration-300 hover:text-oatmeal/80"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>
    </div>
  )
}
