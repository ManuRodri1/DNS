"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "./language-switcher"

interface MobileMenuProps {
  className?: string
  isWhiteHeader?: boolean
}

export const MobileMenu = ({ className, isWhiteHeader = false }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuItems = [
    { name: "Speakers", href: "/speakers" },
    { name: "Agenda", href: "/agenda" },
    { name: "Tickets", href: "/tickets" },
    { name: "Location", href: "/#location" },
    { name: "Sponsors & Partners", href: "/partners" },
    { name: "Contact", href: "/#contact" },
    { name: "Successment", href: "https://www.successment.co/", external: true },
  ]

  const aboutItems = [
    { name: "About DNS", href: "/#about" },
    { name: "Team", href: "/team" },
    { name: "Press Room", href: "/press" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
    setIsAboutOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("group relative z-[60] shrink-0 p-2 transition-colors xl:hidden", isWhiteHeader ? "text-black" : "text-white", className)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {!isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-[60] flex h-[100dvh] w-[85vw] max-w-sm flex-col shadow-2xl transition-transform duration-300 ease-out xl:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
          isWhiteHeader ? "bg-white" : "bg-[#0a0a0a]",
        )}
      >
        <div className={cn("flex h-[72px] shrink-0 items-center justify-between border-b px-6", isWhiteHeader ? "border-black/10" : "border-white/10")}>
          <span className={cn("font-sans text-xs font-medium uppercase tracking-widest", isWhiteHeader ? "text-black/40" : "text-white/40")}>Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "rounded-full p-2 transition-colors",
              isWhiteHeader ? "text-black hover:bg-black/5 hover:text-[#FF5757]" : "text-white hover:bg-white/5 hover:text-[#FF5757]",
            )}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav className="flex flex-col px-6 py-6">
            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className={cn(
                  "flex min-h-[48px] w-full items-center justify-between py-3.5 font-sans text-sm font-medium transition-colors duration-150",
                  isWhiteHeader ? "text-black hover:text-[#FF5757]" : "text-white hover:text-[#FF5757]",
                )}
                aria-expanded={isAboutOpen}
              >
                About
                <svg
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
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
              <div className={cn("overflow-hidden transition-all duration-300 ease-out", isAboutOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0")}>
                <div className="flex flex-col pb-2 pl-4">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex min-h-[44px] items-center py-3 font-sans text-sm transition-colors duration-150",
                        isWhiteHeader ? "text-black/70 hover:text-[#FF5757]" : "text-white/60 hover:text-[#FF5757]",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex min-h-[48px] items-center py-3.5 font-sans text-sm font-medium transition-colors duration-150",
                  isWhiteHeader ? "text-black hover:text-[#FF5757]" : "text-white hover:text-[#FF5757]",
                )}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className={cn("shrink-0 border-t px-6 py-5", isWhiteHeader ? "border-black/10" : "border-white/10")}>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  )
}
