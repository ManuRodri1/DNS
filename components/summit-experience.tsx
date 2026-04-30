"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const content = {
  en: {
    label: "What You Gain",
    title: "What You Walk Away With",
    bullets: [
      "High-level networking with founders, investors, and decision-makers",
      "Access to strategic partnerships across industries",
      "Market insights on tourism, real estate, startups, and digital mobility",
      "Exposure to Caribbean innovation and global expansion opportunities",
      "Conversations designed to create real business outcomes",
    ],
    cta: "Get Your Pass",
  },
  es: {
    label: "Qué obtienes",
    title: "Con qué sales de esta experiencia",
    bullets: [
      "Networking de alto nivel con fundadores, inversionistas y tomadores de decisión",
      "Acceso a alianzas estratégicas entre industrias",
      "Perspectivas de mercado sobre turismo, real estate, startups y movilidad digital",
      "Exposición a la innovación caribeña y oportunidades de expansión global",
      "Conversaciones diseñadas para generar resultados reales de negocio",
    ],
    cta: "Comprar mi pase",
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
          <span className="text-[#FF5757] font-display font-bold uppercase tracking-widest text-sm md:text-base">
            {t.label}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.title}
          </h2>

          {/* Animated coral underline */}
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-[#FF5757]" />
        </div>

        {/* Bullets List */}
        <div
          ref={gridRef}
          className="mt-16 mx-auto max-w-4xl"
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 900ms ease-out 200ms, transform 900ms ease-out 200ms",
          }}
        >
          <div className="grid gap-6 md:grid-cols-1">
            {t.bullets.map((bullet, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF5757] shadow-[0_0_10px_rgba(255,87,87,0.5)] group-hover:scale-125 transition-transform" />
                <p className="font-display text-lg md:text-xl text-white/80 group-hover:text-white transition-colors">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-16 flex justify-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 900ms ease-out 400ms, transform 900ms ease-out 400ms",
          }}
        >
          <Link
            href="/#tickets"
            className="group inline-flex items-center justify-center rounded-full border-2 border-[#FF5757] bg-[#FF5757] px-10 py-5 font-display text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#FF5757] uppercase tracking-wider"
          >
            {t.cta}
            <svg
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
