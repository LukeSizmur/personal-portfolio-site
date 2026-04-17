"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const DELAY_MAP: Record<string, number> = {
  "reveal-delay-3": 0.3,
  "reveal-delay-2": 0.2,
  "reveal-delay-1": 0.1,
}

export function ScrollReveal() {
  useEffect(() => {
    let ctx: gsap.Context

    // Defer until after AnimatedProjectStack's useEffect has run and added
    // its pin spacer — otherwise trigger positions for sections 03/04 are
    // calculated against the wrong scroll offsets.
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          const delay =
            Object.entries(DELAY_MAP).find(([cls]) => el.classList.contains(cls))?.[1] ?? 0

          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        })
      })
    }, 500)

    return () => {
      clearTimeout(timer)
      ctx?.revert()
    }
  }, [])

  return null
}
