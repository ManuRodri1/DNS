"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  EVENT_DATE_EN,
  EVENT_DATE_ES,
  VENUE_ADDRESS,
  VENUE_MAP_URL,
  VENUE_NAME,
  VENUE_TOUR_URL,
  VENUE_VIDEO_URL,
} from "@/lib/event-config"

const content = {
  en: {
    sectionTitle: "Venue",
    eyebrow: "OFFICIAL SUMMIT VENUE",
    date: EVENT_DATE_EN,
    description:
      "Crowne Plaza Santo Domingo will serve as the official venue for Digital Nomad Summit Santo Domingo 2027, bringing speakers, founders, investors, sponsors, institutions, creators, and attendees together along the city’s iconic Malecón.",
    badge: "Santo Domingo · Dominican Republic",
    tour: "Tour the Hotel",
    map: "View in Google Maps",
    newTab: "opens in a new tab",
    videoLabel: "Crowne Plaza Santo Domingo, official venue for Digital Nomad Summit 2027",
  },
  es: {
    sectionTitle: "Sede",
    eyebrow: "SEDE OFICIAL DEL SUMMIT",
    date: EVENT_DATE_ES,
    description:
      "Crowne Plaza Santo Domingo será la sede oficial de Digital Nomad Summit Santo Domingo 2027, reuniendo a speakers, fundadores, inversionistas, patrocinadores, instituciones, creadores y asistentes junto al icónico Malecón de la ciudad.",
    badge: "Santo Domingo · República Dominicana",
    tour: "Recorrer el hotel",
    map: "Ver en Google Maps",
    newTab: "abre en una pestaña nueva",
    videoLabel: "Crowne Plaza Santo Domingo, sede oficial de Digital Nomad Summit 2027",
  },
}

export function Location() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = content[language]

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldPlayVideo(!reducedMotion.matches)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className={`relative w-full bg-black py-24 transition-opacity duration-1000 md:py-32 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{t.sectionTitle}</h2>
          <div className="mt-3 flex justify-center"><div className="h-[3px] w-16 rounded-full bg-[#FF5757]" /></div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <div className="relative aspect-video min-h-[360px] md:min-h-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#343434,#080808_70%)]" aria-hidden="true" />
            <video
              autoPlay={shouldPlayVideo}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t.videoLabel}
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            >
              <source src={VENUE_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/45" aria-hidden="true" />

            <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/85 px-4 py-2 backdrop-blur-sm md:left-6 md:top-6">
              <p className="font-sans text-xs font-medium tracking-wide text-white md:text-sm">{t.badge}</p>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-center md:p-12">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.eyebrow}</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-white drop-shadow-lg md:text-5xl">{VENUE_NAME}</h3>
              <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white/75">{t.date}</p>
              <p className="mx-auto mt-4 hidden max-w-3xl font-sans text-base leading-7 text-white/85 sm:block md:text-lg">
                {t.description}
              </p>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-xs leading-5 text-white/70 md:text-sm">{VENUE_ADDRESS}</p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row md:mt-7">
                <a
                  href={VENUE_TOUR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.tour} — ${VENUE_NAME} (${t.newTab})`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FF5757] bg-[#FF5757] px-6 py-3 font-sans text-sm font-bold text-white transition hover:bg-white hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t.tour}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={VENUE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.map} — ${VENUE_NAME} (${t.newTab})`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/30 px-6 py-3 font-sans text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]"
                >
                  {t.map}<MapPin className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
