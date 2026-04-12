"use client"

import dynamic from "next/dynamic"

const DitheringShader = dynamic(
  () => import("@/components/ui/dithering-shader").then((mod) => mod.DitheringShader),
  { ssr: false },
)

export function FooterShader() {
  return (
    <DitheringShader
      className="absolute inset-0 h-full w-full"
      shape="wave"
      type="8x8"
      colorBack="#2b2b2b"
      colorFront="#e83e0b"
      pxSize={3}
      speed={0.6}
      style={{ position: "absolute", inset: 0 }}
    />
  )
}
