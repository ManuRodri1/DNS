"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const content = {
  en: {
    backToHome: "Back to Home",
    title: "Full Agenda",
    subtitle: "Digital Nomad Summit Santo Domingo 2026",
    meta: "August 6–7, 2026 · Santo Domingo, Dominican Republic",
    theme: "Theme: The Japan of the Caribbean",
  },
  es: {
    backToHome: "Volver al Inicio",
    title: "Agenda Completa",
    subtitle: "Digital Nomad Summit Santo Domingo 2026",
    meta: "6–7 de agosto de 2026 · Santo Domingo, República Dominicana",
    theme: "Tema: El Japón del Caribe",
  },
}

export function AgendaHero() {
  const { language } = useLanguage()
  const t = content[language]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-end bg-black overflow-hidden"
      aria-label="Agenda hero"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom fade vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      <div className="relative z-20 container pt-36 pb-16 md:pt-44 md:pb-20">
        {/* Back to Home */}
        <div
          className={`mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF5757] text-sm font-sans transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToHome}
          </Link>
        </div>

        {/* Title */}
        <h1
          className={`font-display font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-balance transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "100ms" }}
        >
          {t.title}
        </h1>

        {/* Coral underline accent */}
        <div
          className={`mt-5 h-[3px] w-24 bg-[#FF5757] transition-all duration-700 ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
          style={{ transitionDelay: "250ms", transformOrigin: "left" }}
        />

        {/* Subtitle */}
        <p
          className={`mt-6 text-white/80 font-sans font-medium text-xl md:text-2xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          {t.subtitle}
        </p>

        {/* Meta line */}
        <p
          className={`mt-3 text-white/55 font-sans text-base md:text-lg transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {t.meta}
        </p>

        {/* Theme pill */}
        <div
          className={`mt-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="inline-block border border-[#FF5757]/50 text-[#FF5757] font-sans text-xs uppercase tracking-[0.15em] px-4 py-1.5 rounded-full">
            {t.theme}
          </span>
        </div>
      </div>
    </section>
  )
}
