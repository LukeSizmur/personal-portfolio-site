"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Menu, X } from "lucide-react"

gsap.registerPlugin(ScrollToPlugin)

const NAV_LINKS = ["home", "about", "work", "skills", "personal", "contact"] as const
const SCROLL_THRESHOLD = 80

export function HomeNav() {
  const [activeSection, setActiveSection] = useState<string>("about")
  const [menuOpen, setMenuOpen] = useState(false)

  const pillRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const naturalWidth = useRef(0)
  const isScrolled = useRef(false)
  const isOpen = useRef(false)

  // Active section tracking
  useEffect(() => {
    const sections = NAV_LINKS
      .filter((id) => id !== "home")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Mount setup
  useEffect(() => {
    const pill = pillRef.current
    const burger = burgerRef.current
    const overlay = overlayRef.current
    if (!pill || !burger || !overlay) return

    const isMobile = window.innerWidth < 768

    naturalWidth.current = pill.offsetWidth
    gsap.set(overlay, { display: "none" })

    if (isMobile) {
      // On mobile: always show burger, never show pill
      gsap.set(pill, { display: "none", pointerEvents: "none" })
      gsap.set(burger, { opacity: 1, scale: 1, pointerEvents: "auto" })
      isScrolled.current = true
    } else {
      gsap.set(pill, { opacity: 1, left: (window.innerWidth - naturalWidth.current) / 2 })
      gsap.set(burger, { opacity: 0, scale: 0.75, pointerEvents: "none" })
    }
  }, [])

  // Re-centre pill on resize + handle desktop↔mobile breakpoint crossing
  useEffect(() => {
    const onResize = () => {
      const isMobile = window.innerWidth < 768
      const pill = pillRef.current
      const burger = burgerRef.current
      if (!pill || !burger) return

      if (!isMobile) {
        // Crossed into desktop: always show pill, hide burger
        gsap.set(pill, { display: "", opacity: 1, y: 0, pointerEvents: "auto", left: (window.innerWidth - naturalWidth.current) / 2 })
        gsap.set(burger, { opacity: 0, scale: 0.75, pointerEvents: "none" })
        isScrolled.current = false
      } else {
        // Crossed into mobile: hide pill, show burger
        if (!isScrolled.current) {
          gsap.set(pill, { display: "none", opacity: 0, pointerEvents: "none" })
          gsap.set(burger, { opacity: 1, scale: 1, pointerEvents: "auto" })
          isScrolled.current = true
        }
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const showBurger = useCallback(() => {
    const pill = pillRef.current
    const burger = burgerRef.current
    if (!pill || !burger) return
    gsap.timeline()
      .to(pill, { opacity: 0, y: -6, duration: 0.22, ease: "power2.in",
        onComplete: () => { gsap.set(pill, { pointerEvents: "none" }) } })
      .to(burger, { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.28, ease: "back.out(1.7)" }, "-=0.05")
  }, [])

  const openMenu = useCallback(() => {
    const overlay = overlayRef.current
    const links = linkRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!overlay) return

    isOpen.current = true
    setMenuOpen(true)

    gsap.set(overlay, { display: "flex" })
    gsap.fromTo(
      overlay,
      { clipPath: "circle(0% at calc(100% - 46px) 46px)" },
      { clipPath: "circle(150% at calc(100% - 46px) 46px)", duration: 0.65, ease: "power3.inOut" },
    )
    gsap.fromTo(
      links,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.3 },
    )
  }, [])

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current
    const links = linkRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!overlay) return

    isOpen.current = false
    setMenuOpen(false)

    gsap.to(links, { opacity: 0, x: -24, stagger: 0.04, duration: 0.18, ease: "power2.in" })
    gsap.to(overlay, {
      clipPath: "circle(0% at calc(100% - 46px) 46px)",
      duration: 0.52,
      ease: "power3.inOut",
      delay: 0.1,
      onComplete: () => { gsap.set(overlay, { display: "none" }) },
    })
  }, [])

  // Scroll handler — pill → burger on mobile only when scrolled past threshold
  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.innerWidth < 768
      if (isMobile && !isScrolled.current && window.scrollY > SCROLL_THRESHOLD) {
        isScrolled.current = true
        showBurger()
      }
      if (window.scrollY < 40) setActiveSection("home")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showBurger])

  function handleBurgerClick() {
    isOpen.current ? closeMenu() : openMenu()
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, section: string) {
    e.preventDefault()
    setActiveSection(section)
    if (isOpen.current) closeMenu()
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: section === "home" ? 0 : `#${section}`, offsetY: 0 },
      ease: "power3.inOut",
    })
  }

  return (
    <>
      {/* Pill nav — top of page */}
      <nav
        ref={pillRef}
        style={{ opacity: 0 }}
        className="fixed top-6 z-50 flex items-center gap-0.5 whitespace-nowrap rounded-full border border-[rgba(43,43,43,0.08)] bg-[rgba(253,251,247,0.85)] px-2 py-1.5 backdrop-blur-xl"
      >
        {NAV_LINKS.map((section) => (
          <a
            key={section}
            href={section === "home" ? "#" : `#${section}`}
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

      {/* Burger / close button — appears when scrolled */}
      <button
        ref={burgerRef}
        onClick={handleBurgerClick}
        style={{ opacity: 0 }}
        className="fixed top-6 right-6 z-[60] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[rgba(43,43,43,0.08)] bg-[rgba(253,251,247,0.85)] text-[#2b2b2b] backdrop-blur-xl transition-colors duration-200"
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex flex-col justify-center"
        style={{ display: "none", background: "#2b2b2b" }}
      >
        <nav className="flex flex-col gap-1 px-12 pb-4">
          {NAV_LINKS.map((section, i) => (
            <a
              key={section}
              ref={(el) => { linkRefs.current[i] = el }}
              href={section === "home" ? "#" : `#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              style={{ opacity: 0 }}
              className={`text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight no-underline leading-[1.1] transition-colors duration-200 ${
                activeSection === section ? "text-[#fdfbf7]" : "text-[rgba(253,251,247,0.35)] hover:text-[#fdfbf7]"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
