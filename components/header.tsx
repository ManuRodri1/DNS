"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "./language-switcher"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-header="dark"]')

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if any dark section is intersecting
        const anyDarkSectionVisible = Array.from(darkSections).some((section) => {
          const entry = entries.find((e) => e.target === section)
          return entry ? entry.isIntersecting : false
        })

        setIsDarkMode(anyDarkSectionVisible)
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: "-80px 0px 0px 0px", // Offset for header height
      },
    )

    darkSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full transition-colors duration-500">
      <header
        className={`flex items-center justify-between container transition-all duration-500 ${
          isDarkMode ? "bg-white/90 backdrop-blur-md shadow-sm rounded-full px-6 py-3" : ""
        }`}
      >
        <Link href="/" className="relative">
          {/* Default logo for dark backgrounds (light mode) */}
          <img
            src="/logo digital nomad summit - Editado.png"
            alt="Digital Nomad Summit"
            className={`w-[100px] sm:w-[120px] md:w-[130px] h-auto transition-opacity duration-500 ${
              isDarkMode ? "opacity-0 absolute inset-0" : "opacity-100"
            }`}
          />
          {/* White logo for light backgrounds (dark mode) */}
          <img
            src="/images/dns-logo-white.jpg"
            alt="Digital Nomad Summit"
            className={`w-[100px] sm:w-[120px] md:w-[130px] h-auto transition-opacity duration-500 ${
              isDarkMode ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className={`text-sm font-medium font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group ${
                isDarkMode ? "text-black" : "text-white"
              }`}
              aria-expanded={isAboutOpen}
              aria-haspopup="true"
            >
              About
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </button>
            {isAboutOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-black/95 backdrop-blur-sm border border-white/10 rounded-md shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/#about"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-[#FF5757]/20 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                >
                  About DNS
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-[#FF5757]/20 hover:text-[#FF5757] transition-colors duration-150 font-sans"
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
            { label: "Location", href: "#location" },
            { label: "Sponsors & Partners", href: "#partners-section" },
            { label: "Contact", href: "#contact" },
            { label: "Successment", href: "https://www.successment.co/", external: true },
          ].map((item) => (
            <Link
              className={`text-sm font-medium font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group ${
                isDarkMode ? "text-black" : "text-white"
              }`}
              href={item.href}
              key={item.label}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`text-sm font-medium font-sans hover:text-[#FF5757] duration-150 transition-colors ease-out whitespace-nowrap relative group ${
                isDarkMode ? "text-black" : "text-white"
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Digital Nomad Weekly
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-black/95 backdrop-blur-sm border border-white/10 rounded-md shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="https://dominicantoday.com/dr/digital-nomad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-[#FF5757]/20 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                >
                  Dominican Today
                </Link>
                <Link
                  href="https://eldinero.com.do/author/jonathanjmentor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-[#FF5757]/20 hover:text-[#FF5757] transition-colors duration-150 font-sans"
                >
                  Periódico elDinero
                </Link>
              </div>
            )}
          </div>
        </nav>
        <LanguageSwitcher className="max-lg:hidden" />
        <MobileMenu isDarkMode={isDarkMode} />
      </header>
    </div>
  )
}
