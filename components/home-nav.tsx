"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

const NAV_LINKS = ["about", "work", "skills", "personal", "contact"] as const

export function HomeNav() {
  const [activeSection, setActiveSection] = useState<string>("about")

  useEffect(() => {
    const sections = NAV_LINKS
      .map((section) => document.getElementById(section))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, section: string) {
    e.preventDefault()
    setActiveSection(section)
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${section}`, offsetY: 0 },
      ease: "power3.inOut",
    })
  }

  return (
    <nav className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full border border-[rgba(43,43,43,0.08)] bg-[rgba(253,251,247,0.85)] px-2 py-1.5 backdrop-blur-xl">
      {NAV_LINKS.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          onClick={(e) => handleNavClick(e, section)}
          className={`rounded-full px-4 py-[7px] text-[13px] font-medium tracking-[-0.01em] no-underline transition-all duration-[400ms] ${
            activeSection === section
              ? "bg-[#2b2b2b] text-[#fdfbf7]"
              : "text-muted hover:bg-[#2b2b2b] hover:text-[#fdfbf7]"
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </a>
      ))}
    </nav>
  )
}
