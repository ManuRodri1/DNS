"use client"

import Link from "next/link"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

const translations = {
  en: {
    badge: (
      <>
        DIGITAL NOMAD <span className="text-[#FF5757] ml-1">SUMMIT</span>
      </>
    ),
    dates: (
      <>
        Santo Domingo <span className="text-[#FF5757]">·</span> August 6–7, 2026
      </>
    ),
    headline: (
      <>
        Where <span className="text-[#FF5757]">Creativity</span> and <span className="text-[#FF5757]">Innovation</span>{" "}
        Converge to Redefine Tourism, <span className="text-[#FF5757]">Real Estate</span> &{" "}
        <span className="text-[#FF5757]">Start-Ups</span>
      </>
    ),
    subheadline: "Join the global summit shaping the future of remote work, investment and digital mobility.",
    cta: "Reserve Your Pass",
    ctaSponsor: "Partner With DNS",
  },
  es: {
    badge: (
      <>
        DIGITAL NOMAD <span className="text-[#FF5757] ml-1">SUMMIT</span>
      </>
    ),
    dates: (
      <>
        Santo Domingo <span className="text-[#FF5757]">·</span> 6–7 de Agosto, 2026
      </>
    ),
    headline: (
      <>
        Donde la <span className="text-[#FF5757]">Creatividad</span> y la{" "}
        <span className="text-[#FF5757]">Innovación</span> Convergen para Redefinir Turismo,{" "}
        <span className="text-[#FF5757]">Bienes Raíces</span> y <span className="text-[#FF5757]">Startups</span>
      </>
    ),
    subheadline: "Únete al summit global que impulsa el futuro del trabajo remoto, inversión y movilidad digital.",
    cta: "Reserva Tu Pase",
    ctaSponsor: "Asociarse con DNS",
  },
}

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-4 md:mb-6 text-sm md:text-base lg:text-xl px-4 md:px-6 lg:px-8 py-2 md:py-3 tracking-wider">
          {t.badge}
        </Pill>
        <div className="mb-6 md:mb-8 text-white text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-display font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {t.dates}
        </div>
        <h1
          className="px-4 leading-tight mx-auto font-display"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 4rem)",
            maxWidth: "85vw",
          }}
        >
          {t.headline}
        </h1>
        <p className="font-display text-xs sm:text-sm md:text-base text-foreground/80 text-balance mt-4 md:mt-6 lg:mt-8 max-w-[90vw] md:max-w-[440px] mx-auto px-4">
          {t.subheadline}
        </p>

        <div className="mt-6 md:mt-10 lg:mt-14 flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center px-4">
          <Link href="/#tickets">
            <Button
              className="bg-[#FF5757] hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] transition-all duration-300 hover:scale-[1.03] px-6 md:px-8 py-4 md:py-6 text-sm md:text-base w-full sm:w-auto text-white font-display font-semibold"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {t.cta}
            </Button>
          </Link>
          <Button
            onClick={() => setIsSponsorModalOpen(true)}
            className="bg-[#FF5757] hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] transition-all duration-300 hover:scale-[1.03] px-6 md:px-8 py-4 md:py-6 text-sm md:text-base text-white w-full sm:w-auto font-display font-semibold"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {t.ctaSponsor}
          </Button>
        </div>
      </div>

      {isSponsorModalOpen && (
        <div>
          {typeof window !== "undefined" && (
            <>
              {/* @ts-ignore */}
              <SponsorModal isOpen={isSponsorModalOpen} onClose={() => setIsSponsorModalOpen(false)} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

import dynamic from "next/dynamic"
const SponsorModal = dynamic(() => import("./sponsor-modal").then((mod) => mod.SponsorModal), { ssr: false })
