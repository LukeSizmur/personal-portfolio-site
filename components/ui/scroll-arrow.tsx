"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"

export function ScrollArrow() {
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = arrowRef.current
    if (!el) return

    // Fade in, then kick off the infinite bounce
    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 1.0,
        ease: "power2.out",
        onComplete() {
          gsap.to(el, {
            y: 10,
            duration: 0.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
          })
        },
      },
    )

    return () => gsap.killTweensOf(el)
  }, [])

  return (
    <div
      ref={arrowRef}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      style={{ opacity: 0 }}
    >
      <ChevronDown size={28} strokeWidth={1.5} className="text-apex" />
    </div>
  )
}
