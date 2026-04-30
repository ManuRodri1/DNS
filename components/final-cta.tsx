"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

const content = {
  en: {
    label: "Don't miss out",
    title: "Join the Movement in Santo Domingo",
    primaryCTA: "Get Your Pass",
    secondaryCTA: "Sponsor DNS",
  },
  es: {
    label: "No te lo pierdas",
    title: "Únete al movimiento en Santo Domingo",
    primaryCTA: "Comprar mi pase",
    secondaryCTA: "Patrocinar DNS",
  },
}

export function FinalCTA() {
  const { language } = useLanguage()
  const t = content[language]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Background visual - subtle coral mesh gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#FF5757] blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#FF5757] blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#FF5757]/30 bg-[#FF5757]/5 text-[#FF5757] font-display font-bold uppercase tracking-widest text-xs mb-6">
            {t.label}
          </span>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-12 text-balance">
            {t.title}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/#tickets"
              className="group relative inline-flex items-center justify-center rounded-full bg-[#FF5757] px-10 py-5 font-display text-lg font-bold text-white shadow-[0_0_20px_rgba(255,87,87,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,87,87,0.5)] hover:scale-[1.05] w-full sm:w-auto uppercase tracking-wider"
            >
              <span className="relative z-10">{t.primaryCTA}</span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-10" />
            </Link>

            <Link
              href="/#partners-sponsor-invite"
              className="group inline-flex items-center justify-center rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 font-display text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white w-full sm:w-auto uppercase tracking-wider"
            >
              {t.secondaryCTA}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
