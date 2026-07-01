"use client"

import { useEffect, useRef, useState } from "react"
import type { Speaker } from "@/lib/data/speakers"
import { SpeakersFilter } from "./speakers-filter"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const content = {
  en: {
    eventLabel: "Digital Nomad Summit 2026",
    heroHeadline1: "Meet the Voices",
    heroHeadline2: "Shaping the Future",
    heroSubheadline:
      "Founders, executives, policymakers, investors, and innovators joining Digital Nomad Summit Santo Domingo - August 6-7, 2026.",
    buyTickets: "Buy Tickets",
    allLabel: "Full Lineup",
    allHeadline: "All Speakers",
    emptyLabel: "Lineup in progress",
    emptyHeadline: "Speakers Dropping Soon",
    emptyBody:
      "We're curating an exceptional lineup of founders, executives, investors, and innovators for DNS Santo Domingo 2026. Follow our channels for announcements.",
    moreSpeakers: "More Speakers",
    exploreMore: "Explore More",
    viewAll: "View All",
    backToSpeakers: "Back to Speakers",
    session: "Session",
    about: "About",
    speakerInfo: "Speaker Info",
    topics: "Topics",
    theEvent: "The Event",
    getTicket: "Get your ticket",
    viewFullLineup: "View Full Lineup",
  },
  es: {
    eventLabel: "Digital Nomad Summit 2026",
    heroHeadline1: "Conoce las Voces",
    heroHeadline2: "Que Dan Forma al Futuro",
    heroSubheadline:
      "Fundadores, ejecutivos, legisladores, inversores e innovadores que se unen al Digital Nomad Summit Santo Domingo - 6-7 de agosto de 2026.",
    buyTickets: "Comprar Entradas",
    allLabel: "Lineup Completo",
    allHeadline: "Todos los Speakers",
    emptyLabel: "Lineup en progreso",
    emptyHeadline: "Speakers Proximamente",
    emptyBody:
      "Estamos curando un lineup excepcional de fundadores, ejecutivos, inversores e innovadores para DNS Santo Domingo 2026. Sigue nuestros canales para anuncios.",
    moreSpeakers: "Mas Speakers",
    exploreMore: "Explorar Mas",
    viewAll: "Ver Todos",
    backToSpeakers: "Volver a Speakers",
    session: "Sesion",
    about: "Acerca de",
    speakerInfo: "Info del Speaker",
    topics: "Temas",
    theEvent: "El Evento",
    getTicket: "Consigue tu entrada",
    viewFullLineup: "Ver Lineup Completo",
  },
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

function SpeakersHero({ t }: { t: typeof content["en"] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(tm)
  }, [])

  return (
    <section
      className="relative w-full min-h-[72vh] flex items-center overflow-hidden bg-black pt-32 pb-20"
      aria-label="Speakers hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle at 65% 35%, #FF5757 0%, transparent 60%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle at 30% 70%, #FF5757 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-10">
        <p
          className="flex items-center gap-2.5 text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#FF5757] mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span aria-hidden className="inline-block h-px w-6 bg-[#FF5757]" />
          {t.eventLabel}
        </p>

        <h1
          className="text-white font-bold leading-[1.0] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display), 'League Spartan', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {t.heroHeadline1}
          <br />
          <span className="text-[#FF5757]">{t.heroHeadline2}</span>
        </h1>

        <p
          className="text-white/55 font-sans text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {t.heroSubheadline}
        </p>

        <div
          className="flex flex-wrap items-center gap-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-sans font-semibold text-white/80 text-sm transition-all duration-300 hover:border-white/50 hover:text-white"
          >
            {t.buyTickets}
          </Link>
        </div>
      </div>
    </section>
  )
}

function AllSpeakersSection({ speakers, t }: { speakers: Speaker[]; t: typeof content["en"] }) {
  const { ref, visible } = useInView(0.04)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-[#050505] py-20 md:py-28" aria-label="All speakers directory">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="flex items-center gap-2.5 text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#FF5757] mb-4">
            <span className="inline-block h-px w-6 bg-[#FF5757]" />
            {t.allLabel}
          </p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            {t.allHeadline}
          </h2>
        </div>
        <SpeakersFilter speakers={speakers} />
      </div>
    </section>
  )
}

function NoSpeakersPublished({ t }: { t: typeof content["en"] }) {
  return (
    <section className="w-full bg-black py-32 px-6" aria-label="Speakers coming soon">
      <div className="mx-auto max-w-2xl text-center">
        <div className="w-24 h-24 rounded-full border border-[#FF5757]/20 bg-[#FF5757]/5 flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#FF5757]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-[#FF5757] text-[11px] font-bold uppercase tracking-[0.25em] font-sans mb-4">{t.emptyLabel}</p>
        <h2
          className="text-white font-bold mb-4"
          style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t.emptyHeadline}
        </h2>
        <p className="text-white/45 font-sans text-lg leading-relaxed mb-10">{t.emptyBody}</p>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-sans font-semibold text-white/80 text-sm transition-all duration-300 hover:border-white/50 hover:text-white"
        >
          {t.buyTickets}
        </Link>
      </div>
    </section>
  )
}

export function SpeakersPageClient({ speakers }: { speakers: Speaker[] }) {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <main className="bg-black min-h-screen">
      <SpeakersHero t={t} />

      {speakers.length === 0 ? (
        <NoSpeakersPublished t={t} />
      ) : (
        <AllSpeakersSection speakers={speakers} t={t} />
      )}

      <Footer />
    </main>
  )
}
