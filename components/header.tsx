"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  const pathname = usePathname()
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isWhiteHeader, setIsWhiteHeader] = useState(pathname === "/tickets")
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (pathname === "/tickets") {
      setIsWhiteHeader(true)
      return
    }

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
        threshold: 0,
        rootMargin: "-120px 0px 0px 0px",
      },
    )

    whiteHeaderSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="fixed left-0 top-0 z-50 w-full pt-6 transition-all duration-500 md:pt-10 lg:pt-12">
      <header
        className={`container mx-auto flex items-center justify-between px-4 transition-all duration-500 md:px-6 ${
          isWhiteHeader ? "mt-2 max-w-[95%] rounded-full bg-white/95 px-6 py-2.5 shadow-md backdrop-blur-md md:max-w-[90%] xl:max-w-6xl" : "py-4"
        }`}
      >
        <div className="z-10 flex-shrink-0">
          <Link href="/" className="relative block">
            <img
              src="/logo digital nomad summit - Editado.png"
              alt="Digital Nomad Summit"
              className={`h-auto w-[100px] transition-opacity duration-500 sm:w-[110px] md:w-[120px] ${
                isWhiteHeader ? "absolute inset-0 opacity-0" : "opacity-100"
              }`}
            />
            <img
              src="/images/dns-logo-white.jpg"
              alt="Digital Nomad Summit"
              className={`h-auto w-[100px] transition-opacity duration-500 sm:w-[110px] md:w-[120px] ${
                isWhiteHeader ? "opacity-100" : "absolute inset-0 opacity-0"
              }`}
            />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-x-6 xl:flex">
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
              className={`group relative flex items-center gap-1 whitespace-nowrap font-sans text-[13px] font-semibold transition-colors duration-150 ease-out hover:text-[#FF5757] ${
                isWhiteHeader ? "text-black" : "text-white"
              }`}
              aria-expanded={isAboutOpen}
              aria-haspopup="true"
              suppressHydrationWarning
            >
              About
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </button>

            {isAboutOpen && (
              <div
                className="absolute left-1/2 top-full z-[60] mt-3 w-48 -translate-x-1/2 animate-in rounded-xl border border-white/10 bg-black/95 py-3 shadow-2xl backdrop-blur-md duration-200 fade-in slide-in-from-top-2"
                onMouseEnter={() => {
                  if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
                  setIsAboutOpen(true)
                }}
              >
                {[
                  { label: "About DNS", href: "/#about" },
                  { label: "Team", href: "/team" },
                  { label: "Press Room", href: "/press" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-2.5 font-sans text-sm text-white/80 transition-colors duration-150 hover:bg-[#FF5757]/10 hover:text-[#FF5757]"
                    onClick={() => setIsAboutOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { label: "Speakers", href: "/speakers" },
            { label: "Agenda", href: "/agenda" },
            { label: "Tickets", href: "/tickets" },
            { label: "Location", href: "/#location" },
            { label: "Sponsors & Partners", href: "/partners" },
            { label: "Contact", href: "/#contact" },
            { label: "Successment", href: "https://www.successment.co/", external: true },
          ].map((item) => (
            <Link
              className={`group relative whitespace-nowrap font-sans text-[13px] font-semibold transition-colors duration-150 ease-out hover:text-[#FF5757] ${
                isWhiteHeader ? "text-black" : "text-white"
              }`}
              href={item.href}
              key={item.label}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-[#FF5757] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="z-10 flex items-center gap-4">
          <LanguageSwitcher className="hidden xl:flex" />
          <MobileMenu isWhiteHeader={isWhiteHeader} />
        </div>
      </header>
    </div>
  )
}
