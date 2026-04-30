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
        Where <span className="text-[#FF5757]">Founders</span>, <span className="text-[#FF5757]">Investors</span> &{" "}
        <span className="text-[#FF5757]">Policymakers</span> Meet to Build in the Caribbean
      </>
    ),
    subheadline: "Access capital, strategic partnerships, and expansion opportunities in one of the fastest-growing emerging markets.",
    cta: "Get Your Pass",
    ctaSponsor: "Sponsor DNS",
    trustLine: "Featuring global speakers, institutional partners, and high-growth innovators",
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
        Donde <span className="text-[#FF5757]">fundadores</span>, <span className="text-[#FF5757]">inversionistas</span> y{" "}
        <span className="text-[#FF5757]">líderes públicos</span> se reúnen para construir en el Caribe
      </>
    ),
    subheadline: "Accede a capital, alianzas estratégicas y oportunidades de expansión en uno de los mercados emergentes de mayor crecimiento.",
    cta: "Comprar mi pase",
    ctaSponsor: "Patrocinar DNS",
    trustLine: "Con la participación de speakers globales, aliados institucionales e innovadores de alto crecimiento",
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
          className="px-4 leading-tight mx-auto font-display text-white"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 4rem)",
            maxWidth: "85vw",
          }}
        >
          {t.headline}
        </h1>
        <p className="font-display text-xs sm:text-sm md:text-base text-foreground/80 text-balance mt-4 md:mt-6 lg:mt-8 max-w-[90vw] md:max-w-[540px] mx-auto px-4">
          {t.subheadline}
        </p>

        <div className="mt-6 md:mt-10 lg:mt-14 flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center px-4">
          <Link href="/#tickets" className="w-full sm:w-auto">
            <Button
              className="bg-[#FF5757] hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] transition-all duration-300 hover:scale-[1.03] px-6 md:px-10 py-4 md:py-7 text-sm md:text-base w-full sm:w-auto text-white font-display font-bold uppercase tracking-wider"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {t.cta}
            </Button>
          </Link>
          <Button
            onClick={() => setIsSponsorModalOpen(true)}
            variant="outline"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white transition-all duration-300 hover:scale-[1.03] px-6 md:px-10 py-4 md:py-7 text-sm md:text-base w-full sm:w-auto font-display font-bold uppercase tracking-wider"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {t.ctaSponsor}
          </Button>
        </div>

        <p className="mt-8 text-[10px] md:text-xs text-white/50 font-display uppercase tracking-[0.15em] max-w-[80vw] mx-auto">
          {t.trustLine}
        </p>
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
