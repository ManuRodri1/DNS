"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "./language-switcher"

interface MobileMenuProps {
  className?: string
  isWhiteHeader?: boolean
}

export const MobileMenu = ({ className, isWhiteHeader = false }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuItems = [
    { name: "Speakers", href: "/speakers" },
    { name: "Agenda", href: "/agenda" },
    { name: "Tickets", href: "/#tickets" },
    { name: "Location", href: "#location" },
    { name: "Sponsors & Partners", href: "/partners" },
    { name: "Contact", href: "#contact" },
    { name: "Successment", href: "https://www.successment.co/", external: true },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
    setIsWeeklyOpen(false)
    setIsAboutOpen(false)
  }

  const handleOverlayClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger toggle — always outside any pill/container clipping */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group xl:hidden p-2 transition-colors relative z-[60] shrink-0",
          isWhiteHeader ? "text-black" : "text-white",
          className,
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {!isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[55] xl:hidden backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer panel — always full-height, anchored to viewport top-right */}
      <div
        className={cn(
          "fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-sm z-[60] xl:hidden",
          "flex flex-col",
          "transform transition-transform duration-300 ease-out",
          "shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full",
          isWhiteHeader ? "bg-white" : "bg-[#0a0a0a]",
        )}
      >
        {/* Drawer header row — logo area + close button, fixed height */}
        <div
          className={cn(
            "flex items-center justify-between shrink-0 px-6 h-[72px] border-b",
            isWhiteHeader ? "border-black/10" : "border-white/10",
          )}
        >
          <span
            className={cn("text-xs font-medium tracking-widest uppercase font-sans", isWhiteHeader ? "text-black/40" : "text-white/40")}
          >
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isWhiteHeader ? "text-black hover:text-[#FF5757] hover:bg-black/5" : "text-white hover:text-[#FF5757] hover:bg-white/5",
            )}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav className="flex flex-col px-6 py-6 gap-0">
            {/* About accordion */}
            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className={cn(
                  "w-full flex items-center justify-between py-3.5 min-h-[48px] text-sm font-medium font-sans transition-colors duration-150",
                  isWhiteHeader ? "text-black hover:text-[#FF5757]" : "text-white hover:text-[#FF5757]",
                )}
                aria-expanded={isAboutOpen}
              >
                About
                <svg
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-200",
                    isAboutOpen ? "rotate-180 text-[#FF5757]" : isWhiteHeader ? "text-black/40" : "text-white/40",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  isAboutOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-4 pb-2 flex flex-col gap-0">
                  <Link
                    href="/#about"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 text-sm font-sans min-h-[44px] flex items-center transition-colors duration-150",
                      isWhiteHeader ? "text-black/70 hover:text-[#FF5757]" : "text-white/60 hover:text-[#FF5757]",
                    )}
                  >
                    About DNS
                  </Link>
                  <Link
                    href="/team"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 text-sm font-sans min-h-[44px] flex items-center transition-colors duration-150",
                      isWhiteHeader ? "text-black/70 hover:text-[#FF5757]" : "text-white/60 hover:text-[#FF5757]",
                    )}
                  >
                    Team
                  </Link>
                </div>
              </div>
            </div>

            {/* Flat items */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center py-3.5 min-h-[48px] text-sm font-medium font-sans transition-colors duration-150",
                  isWhiteHeader ? "text-black hover:text-[#FF5757]" : "text-white hover:text-[#FF5757]",
                )}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.name}
              </Link>
            ))}

            {/* Digital Nomad Weekly accordion */}
            <div className={cn("border-t mt-2 pt-2", isWhiteHeader ? "border-black/10" : "border-white/10")}>
              <button
                onClick={() => setIsWeeklyOpen(!isWeeklyOpen)}
                className={cn(
                  "w-full flex items-center justify-between py-3.5 min-h-[48px] text-sm font-medium font-sans transition-colors duration-150",
                  isWhiteHeader ? "text-black hover:text-[#FF5757]" : "text-white hover:text-[#FF5757]",
                )}
                aria-expanded={isWeeklyOpen}
              >
                Digital Nomad Weekly
                <svg
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-200",
                    isWeeklyOpen ? "rotate-180 text-[#FF5757]" : isWhiteHeader ? "text-black/40" : "text-white/40",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  isWeeklyOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-4 pb-2 flex flex-col gap-0">
                  <Link
                    href="https://dominicantoday.com/dr/digital-nomad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 text-sm font-sans min-h-[44px] flex items-center transition-colors duration-150",
                      isWhiteHeader ? "text-black/70 hover:text-[#FF5757]" : "text-white/60 hover:text-[#FF5757]",
                    )}
                  >
                    Dominican Today
                  </Link>
                  <Link
                    href="https://eldinero.com.do/author/jonathanjmentor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 text-sm font-sans min-h-[44px] flex items-center transition-colors duration-150",
                      isWhiteHeader ? "text-black/70 hover:text-[#FF5757]" : "text-white/60 hover:text-[#FF5757]",
                    )}
                  >
                    Periódico elDinero
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Footer — language switcher */}
        <div
          className={cn(
            "shrink-0 px-6 py-5 border-t",
            isWhiteHeader ? "border-black/10" : "border-white/10",
          )}
        >
          <LanguageSwitcher />
        </div>
      </div>
    </>
  )
}
