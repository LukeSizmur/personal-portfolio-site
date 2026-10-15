"use client"

import { forwardRef } from "react"

export const FooterName = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative z-0 select-none whitespace-nowrap text-[clamp(1rem,13vw,260px)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-black"
    >
      Luke Sizmur
    </div>
  )
})

FooterName.displayName = "FooterName"
