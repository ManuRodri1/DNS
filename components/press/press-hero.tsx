"use client"

import { ArrowRight, CalendarDays, ExternalLink, Layers3 } from "lucide-react"
import { formatPressDate, getCategoryLabel, type PressItem } from "@/lib/press"

type PressHeroProps = {
  language: "en" | "es"
  spotlightItem?: PressItem | null
}

const content = {
  en: {
    eyebrow: "DNS PRESS ROOM",
    headline: "Press Coverage and Institutional Presence for Digital Nomad Summit",
    subheadline:
      "Explore the press coverage and publications positioning Digital Nomad Summit Santo Domingo 2026 as a key platform for innovation, investment, global talent, and Dominican ecosystem growth.",
    support:
      "A resource for journalists, sponsors, institutions, and partners following the growth of DNS across the Dominican Republic, LATAM, and international markets.",
    primary: "View Media Coverage",
    secondary: "Press Contact",
    spotlightBadge: "Media Coverage",
    readCoverage: "Read Coverage",
    fallback:
      "Institutional coverage of DNS 2026 across national and international media.",
    themesTitle: "Coverage themes:",
    themes: ["Innovation", "Investment", "Global Talent", "DR Ecosystem"],
    micro:
      "Centralized coverage from business, technology, institutional, and innovation media outlets.",
    outlets: "Dominican Today · Diario Libre · elDinero · Acento · Entorno VC",
  },
  es: {
    eyebrow: "SALA DE PRENSA DNS",
    headline: "Cobertura, medios y presencia institucional de Digital Nomad Summit",
    subheadline:
      "Explora la cobertura de prensa y publicaciones que posicionan a Digital Nomad Summit Santo Domingo 2026 como una plataforma clave para innovacion, inversion, talento global y crecimiento del ecosistema dominicano.",
    support:
      "Un recurso para periodistas, sponsors, instituciones y aliados que siguen el crecimiento de DNS en Republica Dominicana, LATAM y mercados internacionales.",
    primary: "Ver Cobertura de Medios",
    secondary: "Contacto de Prensa",
    spotlightBadge: "Cobertura de Medios",
    readCoverage: "Leer Cobertura",
    fallback:
      "Cobertura institucional de DNS 2026 en medios nacionales e internacionales.",
    themesTitle: "Temas de cobertura:",
    themes: ["Innovacion", "Inversion", "Talento Global", "Ecosistema RD"],
    micro:
      "Cobertura centralizada desde medios economicos, tecnologicos, institucionales y de innovacion.",
    outlets: "Dominican Today · Diario Libre · elDinero · Acento · Entorno VC",
  },
}

export function PressHero({ language, spotlightItem }: PressHeroProps) {
  const t = content[language]
  const date = spotlightItem ? formatPressDate(spotlightItem.publish_date, language) : ""

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-14 pt-32 text-white md:pb-20 md:pt-44">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute left-[-12%] top-[-18%] h-[460px] w-[460px] rounded-full bg-[#FF5757]/18 blur-[130px]" />
      <div className="absolute bottom-[-20%] right-[-12%] h-[520px] w-[520px] rounded-full bg-white/8 blur-[140px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#FF5757]">
            {t.eyebrow}
          </span>
          <h1 className="mt-7 max-w-5xl font-display text-4xl font-bold leading-[1.02] text-white md:text-6xl lg:text-7xl">
            {t.headline}
          </h1>
          <p className="mt-7 max-w-3xl font-sans text-lg leading-8 text-white/78 md:text-xl">{t.subheadline}</p>
          <p className="mt-5 max-w-3xl font-sans text-base leading-7 text-white/58">{t.support}</p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href="#media-coverage"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF5757] px-6 py-3 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757]"
            >
              {t.primary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#press-contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/5 px-6 py-3 font-sans text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-[#FF5757] hover:text-[#FF5757]"
            >
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#FF5757]/25" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[#FF5757] px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-white">
                {t.spotlightBadge}
              </span>
              <Layers3 className="h-5 w-5 text-white/45" aria-hidden="true" />
            </div>

            {spotlightItem ? (
              <>
                <p className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  {spotlightItem.outlet || "Digital Nomad Summit"}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                  {spotlightItem.title}
                </h2>
                <div className="mt-5 flex flex-wrap items-center gap-3 font-sans text-sm text-white/55">
                  {date && (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#FF5757]" aria-hidden="true" />
                      <time dateTime={spotlightItem.publish_date || undefined}>{date}</time>
                    </span>
                  )}
                  <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-white/70">
                    {getCategoryLabel(spotlightItem.category, language)}
                  </span>
                </div>
                {spotlightItem.external_url && (
                  <a
                    href={spotlightItem.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-bold text-white transition-colors hover:text-[#FF5757]"
                  >
                    {t.readCoverage}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </>
            ) : (
              <p className="mt-8 font-display text-2xl font-bold leading-tight text-white md:text-3xl">{t.fallback}</p>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/42">{t.themesTitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.themes.map((theme) => (
                  <span key={theme} className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-sans text-xs font-semibold text-white/72">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/10 pt-5 md:mt-16">
        <div className="flex flex-col gap-2 font-sans text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>{t.micro}</p>
          <p className="font-semibold text-white/55">{t.outlets}</p>
        </div>
      </div>
    </section>
  )
}
