"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isWhiteHeader, setIsWhiteHeader] = useState(false)
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const weeklyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const whiteHeaderSections = document.querySelectorAll('[data-header-theme="white"]')
    const intersectingSections = new Set<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.add(entry.target)
          } else {
            intersectingSections.delete(entry.target)
          }
        })
        
        setIsWhiteHeader(intersectingSections.size > 0)
      },
      {
        threshold: 0, // Trigger as soon as any part of the section enters the margin
        rootMargin: "-120px 0px 0px 0px", // Increased offset to account for pt-12 (48px) + header height
      },
    )

    whiteHeaderSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="fixed z-50 pt-6 md:pt-10 lg:pt-12 top-0 left-0 w-full transition-all duration-500">
      <header
        className={`flex items-center justify-between container mx-auto px-4 md:px-6 transition-all duration-500 ${
          isWhiteHeader ? "bg-white/95 backdrop-blur-md shadow-md rounded-full py-2.5 px-6 max-w-[95%] md:max-w-[90%] xl:max-w-6xl mt-2" : "py-4"
        }`}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 z-10">
          <Link href="/" className="relative block" onClick={() => setIsDropdownOpen(false)}>
            {/* Default logo for dark backgrounds */}
            <img
              src="/logo digital nomad summit - Editado.png"
              alt="Digital Nomad Summit"
              className={`w-[100px] sm:w-[110px] md:w-[120px] h-auto transition-opacity duration-500 ${
                isWhiteHeader ? "opacity-0 absolute inset-0" : "opacity-100"
              }`}
            />
            {/* White logo for light backgrounds (scrolled/white state) */}
            <img
              src="/images/dns-logo-white.jpg"
              alt="Digital Nomad Summit"
              className={`w-[100px] sm:w-[110px] md:w-[120px] h-auto transition-opacity duration-500 ${
                isWhiteHeader ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            />
          </Link>
        </div>

        {/* Navigation Section - Centered using flexbox layout */}
        <nav className="hidden xl:flex items-center justify-center gap-x-6 lg:gap-x-8">
          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
              setIsAboutOpen(true)
            }}
            onMouseLeave={() => {
              aboutTimeoutRef.current = setTimeout(() => {
                setIsAboutOpen(false)
              }, 150)
            }}
          >
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className={`text-[13px] font-semibold font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group flex items-center gap-1 ${
                isWhiteHeader ? "text-black" : "text-white"
              }`}
              aria-expanded={isAboutOpen}
              aria-haspopup="true"
              suppressHydrationWarning
            >
              About
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </button>
            {isAboutOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]"
                onMouseEnter={() => {
                  if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
                  setIsAboutOpen(true)
                }}
              >
                <Link
                  href="/#about"
                  className="block px-5 py-2.5 text-sm text-white/80 hover:bg-[#FF5757]/10 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                  onClick={() => setIsAboutOpen(false)}
                >
                  About DNS
                </Link>
                <Link
                  href="/team"
                  className="block px-5 py-2.5 text-sm text-white/80 hover:bg-[#FF5757]/10 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                  onClick={() => setIsAboutOpen(false)}
                >
                  Team
                </Link>
              </div>
            )}
          </div>

          {[
            { label: "Speakers", href: "/speakers" },
            { label: "Agenda", href: "/agenda" },
            { label: "Tickets", href: "/#tickets" },
            { label: "Location", href: "/#location" },
            { label: "Sponsors & Partners", href: "/partners" },
            { label: "Contact", href: "/#contact" },
            { label: "Successment", href: "https://www.successment.co/", external: true },
          ].map((item) => (
            <Link
              className={`text-[13px] font-semibold font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group ${
                isWhiteHeader ? "text-black" : "text-white"
              }`}
              href={item.href}
              key={item.label}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}

          {/* Digital Nomad Weekly dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (weeklyTimeoutRef.current) clearTimeout(weeklyTimeoutRef.current)
              setIsDropdownOpen(true)
            }}
            onMouseLeave={() => {
              weeklyTimeoutRef.current = setTimeout(() => {
                setIsDropdownOpen(false)
              }, 150)
            }}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`text-[13px] font-semibold font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group flex items-center gap-1 ${
                isWhiteHeader ? "text-black" : "text-white"
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              suppressHydrationWarning
            >
              Digital Nomad Weekly
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]"
                onMouseEnter={() => {
                  if (weeklyTimeoutRef.current) clearTimeout(weeklyTimeoutRef.current)
                  setIsDropdownOpen(true)
                }}
              >
                <Link
                  href="https://dominicantoday.com/dr/digital-nomad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-2.5 text-sm text-white/80 hover:bg-[#FF5757]/10 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dominican Today
                </Link>
                <Link
                  href="https://eldinero.com.do/author/jonathanjmentor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-2.5 text-sm text-white/80 hover:bg-[#FF5757]/10 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Periódico elDinero
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-4 z-10">
          <LanguageSwitcher className="hidden xl:flex" />
          <MobileMenu isWhiteHeader={isWhiteHeader} />
        </div>
      </header>
    </div>
  )
}
