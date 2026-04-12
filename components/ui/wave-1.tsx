"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

export function WaveOne() {
  const [count, setCount] = useState(0)

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-3xl border border-black/10 bg-oatmeal p-4 text-black shadow-[0_20px_50px_rgba(43,43,43,0.08)]",
      )}
    >
      <h1 className="mb-2 text-2xl font-bold">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((prev) => prev - 1)}
          className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-smoke"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
          className="rounded-full border border-apex/20 bg-apex px-3 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-[#cf3709]"
        >
          +
        </button>
      </div>
    </div>
  )
}
