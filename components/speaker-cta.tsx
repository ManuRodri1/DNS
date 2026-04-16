"use client"

// components/speaker-cta.tsx
// Standalone "Apply as Speaker" CTA section.
// Placed directly below the HomepageSpeakers section.
// Opens the existing SponsorModal with variant="speaker".

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useLanguage } from "@/lib/language-context"

const SponsorModal = dynamic(
  () => import("./sponsor-modal").then((mod) => mod.SponsorModal),
  { ssr: false },
)

// ─── Translations ─────────────────────────────────────────────────────────────
const content = {
  en: {
    label: "Call for Speakers",
    headline1: "Have a Voice",
    headline2: "Worth Sharing?",
    body: "We\u2019re looking for founders, operators, policymakers, creators, and innovators shaping what\u2019s next. If you\u2019re building, scaling, or redefining industries \u2014 this is your stage.",
    badges: ["Selective", "Curated", "High-Signal"],
    applyBtn: "Apply as Speaker",
    lineupBtn: "View Full Lineup",
  },
  es: {
    label: "Convocatoria de Speakers",
    headline1: "¿Tienes una Voz",
    headline2: "que Vale la Pena?",
    body: "Buscamos fundadores, operadores, legisladores, creadores e innovadores que est\u00e9n dando forma al futuro. Si est\u00e1s construyendo, escalando o redefiniendo industrias \u2014 este es tu escenario.",
    badges: ["Selectivo", "Curado", "Alta Se\u00f1al"],
    applyBtn: "Postularse como Speaker",
    lineupBtn: "Ver Lineup Completo",
  },
}

export function SpeakerCTA() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { language } = useLanguage()
  const t = content[language]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        ref={ref}
        id="call-for-speakers"
        aria-label={t.label}
        className="relative w-full overflow-hidden bg-[#060606]"
      >
        {/* Top coral rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5757] to-transparent" />

        {/* Ambient coral glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(255,87,87,0.06) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 py-24 md:py-32">
          <div
            className="text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.75s ease, transform 0.75s ease",
            }}
          >
            {/* Label */}
            <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-sans font-semibold uppercase tracking-[0.26em] text-[#FF5757]">
              <span aria-hidden className="inline-block h-px w-6 bg-[#FF5757]" />
              {t.label}
              <span aria-hidden className="inline-block h-px w-6 bg-[#FF5757]" />
            </p>

            {/* Headline */}
            <h2
              className="text-white font-bold leading-[1.05] tracking-tight text-balance"
              style={{
                fontFamily: "var(--font-display), 'League Spartan', sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              }}
            >
              {t.headline1}{" "}
              <span className="text-[#FF5757]">{t.headline2}</span>
            </h2>

            {/* Divider */}
            <div className="mx-auto mt-8 h-px w-12 bg-[#FF5757]/40" />

            {/* Body */}
            <p
              className="mx-auto mt-8 max-w-2xl font-sans text-white/55 text-base md:text-lg leading-relaxed text-pretty"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.75s ease 0.15s",
              }}
            >
              {t.body}
            </p>

            {/* Qualifier badges */}
            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.75s ease 0.22s",
              }}
            >
              {t.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-white/30"
                >
                  <span className="w-1 h-1 rounded-full bg-[#FF5757]/50" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.75s ease 0.3s",
              }}
            >
              <button
                id="homepage-speaker-cta-apply"
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5757] px-9 py-4 font-sans font-bold text-white text-sm transition-all duration-300 hover:shadow-[0_0_36px_rgba(255,87,87,0.5)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
              >
                {t.applyBtn}
                <svg
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <Link
                href="/speakers"
                id="homepage-speaker-cta-lineup"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 font-sans font-semibold text-white/60 text-sm transition-all duration-300 hover:border-[#FF5757]/40 hover:text-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
              >
                {t.lineupBtn}
                <svg
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]" />
      </section>

      <SponsorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="speaker"
      />
    </>
  )
}
