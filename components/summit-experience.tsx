"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const content = {
  en: {
    title: "SUMMIT EXPERIENCE",
    subtitle: "Two Days of Strategic Momentum.",
    description:
      "From executive roundtables and global keynotes to curated networking and signature VIP experiences on the Malecón, DNS is designed to move capital, talent, and narrative across borders.",
    columns: [
      {
        heading: "GLOBAL VOICES",
        body: "International leaders, policymakers, founders, and investors shaping the future of mobility, innovation, and emerging markets.",
      },
      {
        heading: "CAPITAL & ACTIVATION",
        body: "Pitch labs, investor sessions, sponsor activations, and curated networking designed to create real opportunity.",
      },
      {
        heading: "CULTURE & CORRIDOR",
        body: "VIP signature experiences, curated cultural moments, and cross-border dialogue between the U.S. and the Caribbean.",
      },
    ],
    cta: "Explore the Full Agenda",
  },
  es: {
    title: "EXPERIENCIA DEL SUMMIT",
    subtitle: "Dos días de impulso estratégico.",
    description:
      "Desde mesas ejecutivas y keynotes globales hasta networking curado y experiencias VIP en el Malecón, DNS está diseñado para mover capital, talento y narrativa a través de fronteras.",
    columns: [
      {
        heading: "VOCES GLOBALES",
        body: "Líderes internacionales, policymakers, fundadores e inversionistas que están moldeando el futuro de la movilidad y la innovación.",
      },
      {
        heading: "CAPITAL Y ACTIVACIÓN",
        body: "Pitch labs, sesiones con inversionistas, activaciones de sponsors y networking estratégico diseñado para generar oportunidades reales.",
      },
      {
        heading: "CULTURA Y CORREDOR",
        body: "Experiencias VIP signature, momentos culturales curados y diálogo transfronterizo entre EE. UU. y el Caribe.",
      },
    ],
    cta: "Explorar la Agenda Completa",
  },
}

export function SummitExperience() {
  const { language } = useLanguage()
  const t = content[language]

  const [titleVisible, setTitleVisible] = useState(false)
  const [descVisible, setDescVisible] = useState(false)
  const [gridVisible, setGridVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const observe = (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: (v: boolean) => void,
      threshold = 0.2,
    ) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setter(true)
            observer.disconnect()
          }
        },
        { threshold },
      )
      if (ref.current) observer.observe(ref.current)
      observers.push(observer)
    }

    observe(titleRef, setTitleVisible, 0.3)
    observe(descRef, setDescVisible, 0.2)
    observe(gridRef, setGridVisible, 0.1)
    observe(ctaRef, setCtaVisible, 0.3)

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      id="summit-experience"
      className="relative w-full overflow-hidden bg-black py-28 md:py-36"
    >
      {/* Subtle radial accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,87,87,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Title block */}
        <div
          ref={titleRef}
          className="text-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 900ms ease-out, transform 900ms ease-out",
          }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.title}
          </h2>

          {/* Animated coral underline */}
          <div className="mx-auto mt-4 h-[2px] w-16 rounded-full bg-[#FF5757]" />

          <p className="mx-auto mt-6 max-w-xl font-display text-xl font-semibold leading-snug text-white/75 md:text-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Description */}
        <div
          ref={descRef}
          className="mx-auto mt-8 max-w-3xl text-center"
          style={{
            opacity: descVisible ? 1 : 0,
            transform: descVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 900ms ease-out 150ms, transform 900ms ease-out 150ms",
          }}
        >
          <p className="font-display text-lg leading-relaxed text-white/65 md:text-xl text-pretty">
            {t.description}
          </p>
        </div>

        {/* 3-column grid */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.columns.map((col, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_8px_40px_rgba(255,87,87,0.12)]"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 700ms ease-out ${i * 150}ms, transform 700ms ease-out ${i * 150}ms`,
              }}
            >
              {/* Coral accent dot */}
              <div className="mb-5 h-2 w-2 rounded-full bg-[#FF5757] transition-all duration-300 group-hover:shadow-[0_0_14px_rgba(255,87,87,0.9)] group-hover:scale-125" />

              <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                {col.heading}
              </h3>

              {/* Thin coral rule under heading */}
              <div className="mt-3 h-px w-10 bg-[#FF5757]/50 transition-all duration-300 group-hover:w-16 group-hover:bg-[#FF5757]" />

              <p className="mt-4 font-display text-base leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {col.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-14 flex justify-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 900ms ease-out 200ms, transform 900ms ease-out 200ms",
          }}
        >
          <Link
            href="/agenda"
            className="group inline-flex items-center justify-center rounded-md border-2 border-[#FF5757] bg-[#FF5757] px-8 py-4 font-display text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#FF5757]"
          >
            {t.cta}
            <svg
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
