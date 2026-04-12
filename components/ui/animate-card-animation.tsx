"use client"

/* eslint-disable @next/next/no-img-element */

import { flushSync } from "react-dom"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CardItem {
  id: number
  title: string
  description: string
  image: string
  badge?: string
}

interface AnimatedCardStackProps {
  items?: CardItem[]
  className?: string
}

interface Card {
  id: number
  contentType: number
}

const defaultCardData: Record<number, CardItem> = {
  1: {
    id: 1,
    title: "SOCA Dashboard",
    description: "Cybersecurity SaaS platform",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    badge: "Founder",
  },
  2: {
    id: 2,
    title: "Selfie Roamer",
    description: "Web and automation workflows",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  3: {
    id: 3,
    title: "Security Dashboards",
    description: "Enterprise visualisation platform",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.955, y: -18 },
  { scale: 0.91, y: -46 },
]

// zIndex is intentionally omitted — it is controlled via the React style prop
// so the exiting card keeps its boosted z-index for the entire flight path.
const exitAnimation = {
  y: 340,
  scale: 1,
}

const enterAnimation = {
  y: -18,
  scale: 0.91,
}

function buildCardMap(items: CardItem[]) {
  return items.reduce<Record<number, CardItem>>((acc, item, index) => {
    acc[index + 1] = item
    return acc
  }, {})
}

function buildInitialCards(items: CardItem[]): Card[] {
  return items.slice(0, 3).map((_, index) => ({
    id: index + 1,
    contentType: index + 1,
  }))
}

function CardContent({
  contentType,
  cardData,
}: {
  contentType: number
  cardData: Record<number, CardItem>
}) {
  const data = cardData[contentType]

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[22px] bg-[#141412] p-3 text-oatmeal">
      <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden rounded-[18px] outline outline-1 outline-white/8">
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,0.03)_0%,rgba(20,20,18,0.18)_100%)]" />
        {data.badge ? (
          <span className="absolute left-4 top-4 rounded-full border border-[rgba(232,62,11,0.16)] bg-[rgba(232,62,11,0.14)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-apex">
            {data.badge}
          </span>
        ) : null}
      </div>
      <div className="flex w-full items-center justify-between gap-4 px-3 pb-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[20px] font-bold tracking-[-0.03em] text-oatmeal">
            {data.title}
          </span>
          <span className="text-[14px] text-oatmeal/58">{data.description}</span>
        </div>
        <button className="flex h-11 shrink-0 cursor-pointer select-none items-center gap-1 rounded-full bg-oatmeal pl-5 pr-4 text-sm font-semibold text-black transition-colors hover:bg-apex hover:text-cream">
          Read
          <ChevronRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isExiting,
  cardData,
}: {
  card: Card
  index: number
  /** True for the one render cycle before this card leaves the array,
   *  giving it a boosted z-index so it flies out above the new front card. */
  isExiting: boolean
  cardData: Record<number, CardItem>
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]

  // Exiting card must sit above everything (50).
  // New front card (index 0) gets 20 — above the rest but below the exiting card.
  // Remaining cards get their natural stacking order.
  const zIndex = isExiting ? 50 : index === 0 ? 20 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[338px] w-[min(100%,820px)] items-center justify-center overflow-hidden rounded-[26px] border border-white/[0.08] bg-[rgba(18,18,16,0.96)] p-1 shadow-[0_28px_90px_rgba(0,0,0,0.35)] will-change-transform"
    >
      <CardContent contentType={card.contentType} cardData={cardData} />
    </motion.div>
  )
}

export default function AnimatedCardStack({
  items = Object.values(defaultCardData),
  className,
}: AnimatedCardStackProps) {
  const normalizedItems = items.length >= 3 ? items : Object.values(defaultCardData)
  const cardData = buildCardMap(normalizedItems)
  const [cards, setCards] = useState<Card[]>(buildInitialCards(normalizedItems))
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(normalizedItems.length + 1)
  // Tracks the id of the card that is about to exit so we can boost its z-index
  // one synchronous render cycle before it is removed from the cards array.
  const [exitingCardId, setExitingCardId] = useState<number | null>(null)

  const handleAnimate = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const topCardId = cards[0].id
    const nextContentType = (cards[cards.length - 1].contentType % normalizedItems.length) + 1

    // Force a synchronous render that gives the current top card a high z-index
    // BEFORE we remove it from the cards array. AnimatePresence will then keep
    // that frozen z-index (50) for the entire exit animation, ensuring the card
    // flies out in front of the newly promoted front card (z-index 20).
    flushSync(() => {
      setExitingCardId(topCardId)
    })

    // Now swap cards — the exiting card is already painted at z-index 50.
    setCards((current) => [
      ...current.slice(1),
      { id: nextId, contentType: nextContentType },
    ])
    setExitingCardId(null)
    setNextId((prev) => prev + 1)

    window.setTimeout(() => {
      setIsAnimating(false)
    }, 220)
  }

  return (
    <div className={cn("flex w-full flex-col items-center justify-center pt-2", className)}>
      <div className="relative h-[460px] w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={index}
              isExiting={card.id === exitingCardId}
              cardData={cardData}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-white/8 py-5">
        <button
          onClick={handleAnimate}
          className="flex h-11 cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-5 text-[14px] font-semibold text-oatmeal transition-all hover:bg-white/[0.08] active:scale-[0.98]"
        >
          Next project
          <ChevronRight className="size-4" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
}
