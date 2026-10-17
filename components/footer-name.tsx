"use client"

import Image from "next/image"
import { forwardRef } from "react"

export const FooterName = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="footer-wordmark relative z-0 select-none"
    >
      <Image
        src="/high-res-logo-white.png"
        alt="Luke Sizmur."
        width={1774}
        height={887}
        sizes="(max-width: 767px) 90vw, 80vw"
        className="block h-auto w-full"
        draggable={false}
      />
    </div>
  )
})

FooterName.displayName = "FooterName"
