"use client"

import { forwardRef } from "react"

export const FooterName = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative z-0 select-none whitespace-nowrap text-[clamp(1rem,15vw,260px)] font-bold leading-[0.85] tracking-[-0.05em] text-black/[0.09]"
    >
      Luke Sizmur
    </div>
  )
})

FooterName.displayName = "FooterName"
