"use client"

import { ExternalLink, BadgeCheck, Building2, Dumbbell, MapPin, UsersRound, Waves } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { EVENT_DATE_EN, EVENT_DATE_ES, VENUE_ADDRESS, VENUE_NAME, VENUE_TOUR_URL } from "@/lib/event-config"

const content = {
  en: {
    eyebrow: "Official Summit Venue",
    headline: VENUE_NAME,
    body: [
      `Digital Nomad Summit Santo Domingo will take place ${EVENT_DATE_EN} at ${VENUE_NAME}.`,
      "The official venue brings speakers, founders, investors, sponsors, institutions, creators, and attendees together along Santo Domingo's iconic Malecon.",
      VENUE_ADDRESS,
    ],
    ctaTitle: "Explore the Venue",
    ctaCopy: "Take the official virtual tour.",
    button: "Tour the Hotel",
    note: "An official accommodation reservation link has not yet been announced.",
    highlightsTitle: "Venue Details",
    highlights: [
      "Official venue of Digital Nomad Summit Santo Domingo 2027",
      EVENT_DATE_EN,
      "Location on the Santo Domingo Malecon",
      VENUE_ADDRESS,
      "Virtual hotel tour available",
      "Location available in Google Maps",
    ],
  },
  es: {
    eyebrow: "Sede Oficial del Summit",
    headline: VENUE_NAME,
    body: [
      `Digital Nomad Summit Santo Domingo se celebrará ${EVENT_DATE_ES} en ${VENUE_NAME}.`,
      "La sede oficial reunirá a speakers, fundadores, inversionistas, patrocinadores, instituciones, creadores y asistentes junto al icónico Malecón de Santo Domingo.",
      VENUE_ADDRESS,
    ],
    ctaTitle: "Explora la sede",
    ctaCopy: "Visita el recorrido virtual oficial.",
    button: "Recorrer el hotel",
    note: "Aún no se ha anunciado un enlace oficial de reservación.",
    highlightsTitle: "Detalles de la sede",
    highlights: [
      "Sede oficial de Digital Nomad Summit Santo Domingo 2027",
      EVENT_DATE_ES,
      "Ubicación en el Malecón de Santo Domingo",
      VENUE_ADDRESS,
      "Recorrido virtual disponible",
      "Ubicación disponible en Google Maps",
    ],
  },
}

const icons = [BadgeCheck, Building2, Waves, Dumbbell, UsersRound, MapPin]

export function OfficialHotelSection() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <div id="official-hotel" className="scroll-mt-32">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] md:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
        <div>
          <span className="inline-flex rounded-full border border-[#FF5757]/35 bg-[#FF5757]/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#FF5757]">
            {t.eyebrow}
          </span>
          <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-white md:text-4xl">{t.headline}</h3>
          <div className="mt-6 space-y-4 font-sans text-base leading-7 text-white/70">
            {t.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/35 p-5">
            <h4 className="font-display text-xl font-bold text-white">{t.ctaTitle}</h4>
            <p className="mt-2 font-sans text-sm leading-6 text-white/60">{t.ctaCopy}</p>
            <a
              href={VENUE_TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5757] px-6 py-3 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757] sm:w-auto"
            >
              {t.button}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{t.note}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-5 text-black md:p-7">
          <h4 className="font-display text-2xl font-bold text-black">{t.highlightsTitle}</h4>
          <ul className="mt-6 space-y-4">
            {t.highlights.map((highlight, index) => {
              const Icon = icons[index] || BadgeCheck

              return (
                <li key={highlight} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5757]/10 text-[#FF5757]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-sans text-sm leading-6 text-black/70">{highlight}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
