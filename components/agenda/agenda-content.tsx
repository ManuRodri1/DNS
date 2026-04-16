"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface AgendaItem {
  text: string
  inviteOnly?: boolean
  note?: string
}

interface TimeBlock {
  period: string
  items: AgendaItem[]
}

interface DayData {
  dayLabel: string
  dayTitle: string
  dayTheme: string
  blocks: TimeBlock[]
}

const content: Record<"en" | "es", { day1: DayData; day2: DayData }> = {
  en: {
    day1: {
      dayLabel: "DAY 1",
      dayTitle: "Market Momentum & Global Positioning",
      dayTheme: "August 6, 2026",
      blocks: [
        {
          period: "Morning",
          items: [
            { text: "VIP & Speaker Breakfast", inviteOnly: true },
            { text: "Opening Ceremony & Vision Keynote" },
            { text: "Flagship Panels: Innovation, AI, Mobility, Tourism 3.0" },
          ],
        },
        {
          period: "Midday",
          items: [
            { text: "Keynote" },
            { text: "Branded Networking & Sponsor Activations" },
            { text: "Ecosystem Breakouts (Capital, Policy, Tech)" },
          ],
        },
        {
          period: "Afternoon",
          items: [
            { text: "Fireside Chats with Global Leaders" },
            { text: "Curated Networking Experiences" },
            { text: "Pitch Lab" },
          ],
        },
        {
          period: "Evening",
          items: [
            { text: "VIP Dinner on the Malecón", note: "Alternative: Zona Colonial", inviteOnly: false },
            { text: "Signature DNS Experience" },
          ],
        },
      ],
    },
    day2: {
      dayLabel: "DAY 2",
      dayTitle: "Activation, Talent & The Future",
      dayTheme: "August 7, 2026",
      blocks: [
        {
          period: "Morning",
          items: [
            { text: "Coffee Circles & Executive Roundtables" },
            { text: "Keynote: The Japan of the Caribbean", note: "TBD" },
          ],
        },
        {
          period: "Midday",
          items: [
            { text: "University & Workforce Spotlights" },
            { text: "Sponsor-Led Activations & Pitch Moments / Competition" },
            { text: "ZARI Mobility Reveal" },
          ],
        },
        {
          period: "Afternoon",
          items: [
            { text: '"The Corridor" Sessions (U.S. ↔ DR)' },
            { text: "Curated Cultural & Economic Excursion" },
            { text: "Influencer Panel" },
          ],
        },
        {
          period: "Evening",
          items: [{ text: "VIP Closing Reception", inviteOnly: true, note: "TBD" }],
        },
      ],
    },
  },
  es: {
    day1: {
      dayLabel: "DÍA 1",
      dayTitle: "Impulso del Mercado y Posicionamiento Global",
      dayTheme: "6 de agosto de 2026",
      blocks: [
        {
          period: "Mañana",
          items: [
            { text: "Desayuno VIP y de Speakers", inviteOnly: true },
            { text: "Ceremonia de Apertura y Keynote de Visión" },
            { text: "Paneles Principales: Innovación, IA, Movilidad, Turismo 3.0" },
          ],
        },
        {
          period: "Mediodía",
          items: [
            { text: "Keynote" },
            { text: "Networking con Marca y Activaciones de Sponsors" },
            { text: "Breakouts del Ecosistema (Capital, Políticas, Tecnología)" },
          ],
        },
        {
          period: "Tarde",
          items: [
            { text: "Conversaciones tipo Fireside con Líderes Globales" },
            { text: "Experiencias de Networking Curadas" },
            { text: "Pitch Lab" },
          ],
        },
        {
          period: "Noche",
          items: [
            { text: "Cena VIP en el Malecón", note: "Alternativa: Zona Colonial" },
            { text: "Experiencia Signature DNS" },
          ],
        },
      ],
    },
    day2: {
      dayLabel: "DÍA 2",
      dayTitle: "Activación, Talento y el Futuro",
      dayTheme: "7 de agosto de 2026",
      blocks: [
        {
          period: "Mañana",
          items: [
            { text: "Coffee Circles y Mesas Redondas Ejecutivas" },
            { text: "Keynote: El Japón del Caribe", note: "Por confirmar" },
          ],
        },
        {
          period: "Mediodía",
          items: [
            { text: "Spotlight de Universidades y Fuerza Laboral" },
            { text: "Activaciones Lideradas por Sponsors y Momentos / Competencia de Pitch" },
            { text: "Revelación de ZARI Mobility" },
          ],
        },
        {
          period: "Tarde",
          items: [
            { text: 'Sesiones "El Corredor" (EE. UU. ↔ RD)' },
            { text: "Excursión Cultural y Económica Curada" },
            { text: "Panel de Influencers" },
          ],
        },
        {
          period: "Noche",
          items: [{ text: "Recepción de Cierre VIP", inviteOnly: true, note: "Por confirmar" }],
        },
      ],
    },
  },
}

const inviteOnlyLabel: Record<"en" | "es", string> = {
  en: "Invite Only",
  es: "Solo por Invitación",
}

function AgendaDay({ day, index }: { day: DayData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { language } = useLanguage()
  const label = inviteOnlyLabel[language]

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
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const periodIcons: Record<string, string> = {
    Morning: "☀",
    Midday: "⬛",
    Afternoon: "◈",
    Evening: "◯",
    Mañana: "☀",
    Mediodía: "⬛",
    Tarde: "◈",
    Noche: "◯",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative bg-[#0a0a0a] border border-white/8 rounded-2xl overflow-hidden">
        {/* Day header */}
        <div className="px-8 pt-10 pb-8 md:px-12 border-b border-white/8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
            <span className="inline-block text-[#FF5757] font-sans font-medium text-sm uppercase tracking-[0.2em]">
              {day.dayTheme}
            </span>
          </div>
          <h2 className="mt-3 font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-balance">
            <span className="text-[#FF5757]">{day.dayLabel}</span>{" "}
            <span className="text-white/90">— {day.dayTitle}</span>
          </h2>
          {/* Coral divider */}
          <div className="mt-5 h-[2px] w-16 bg-[#FF5757]" />
        </div>

        {/* Time blocks */}
        <div className="px-8 py-8 md:px-12 md:py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {day.blocks.map((block) => (
            <div key={block.period} className="flex flex-col gap-3">
              {/* Period label */}
              <div className="flex items-center gap-2.5">
                <span className="text-[#FF5757] text-xs leading-none select-none" aria-hidden="true">
                  {periodIcons[block.period] ?? "•"}
                </span>
                <h3 className="font-sans font-medium text-white/50 uppercase text-xs tracking-[0.18em]">
                  {block.period}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-2.5 pl-1">
                {block.items.map((item, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#FF5757] mt-[5px] flex-shrink-0 text-[8px]">●</span>
                      <span className="font-sans text-white/85 text-sm md:text-base leading-snug">
                        {item.text}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pl-5">
                      {item.inviteOnly && (
                        <span className="inline-flex items-center border border-[#FF5757]/60 text-[#FF5757] font-sans text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">
                          {label}
                        </span>
                      )}
                      {item.note && (
                        <span className="text-white/35 font-sans text-[11px] italic">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AgendaContent() {
  const { language } = useLanguage()
  const t = content[language]

  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-black py-16 md:py-24" aria-label="Agenda schedule">
      <div className="container">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-14 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="font-sans text-white/40 uppercase text-xs tracking-[0.25em] mb-3">
            DIGITAL NOMAD SUMMIT SANTO DOMINGO 2026
          </p>
          <div className="h-[1px] w-full bg-white/8" />
        </div>

        {/* Days */}
        <div className="flex flex-col gap-8 md:gap-12">
          <AgendaDay day={t.day1} index={0} />
          <AgendaDay day={t.day2} index={1} />
        </div>
      </div>
    </section>
  )
}
