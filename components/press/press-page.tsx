"use client"

import { useEffect, useMemo, useState } from "react"
import { PressContactBlock } from "@/components/press/press-contact-block"
import { PressFilters, type PressFilterState } from "@/components/press/press-filters"
import { PressHero } from "@/components/press/press-hero"
import { PressCard } from "@/components/press/press-card"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { fetchPublishedMediaCoverage, type PressItem } from "@/lib/press"

const content = {
  en: {
    loading: "Loading press coverage...",
    error: "We couldn't load press items right now.",
    coverageEyebrow: "Coverage Database",
    coverageTitle: "Media Coverage",
    coverageIntro: "Browse published articles and editorial coverage connected to DNS 2026.",
    coverageEmpty: "No press items match the selected filters.",
    coverageCta: "Read Coverage",
  },
  es: {
    loading: "Cargando cobertura de prensa...",
    error: "No pudimos cargar los registros de prensa en este momento.",
    coverageEyebrow: "Base de cobertura",
    coverageTitle: "Cobertura de Medios",
    coverageIntro: "Explora articulos publicados y cobertura editorial conectada a DNS 2026.",
    coverageEmpty: "No hay registros de prensa que coincidan con los filtros seleccionados.",
    coverageCta: "Leer Cobertura",
  },
}

const initialFilters: PressFilterState = {
  category: "all",
  language: "all",
  mediaType: "all",
}

export function PressPage() {
  const { language } = useLanguage()
  const t = content[language]
  const [items, setItems] = useState<PressItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PressFilterState>(initialFilters)

  useEffect(() => {
    let isMounted = true

    async function loadPressItems() {
      setIsLoading(true)
      const result = await fetchPublishedMediaCoverage()

      if (!isMounted) return

      setItems(result.data)
      setError(result.error)
      setIsLoading(false)
    }

    loadPressItems()

    return () => {
      isMounted = false
    }
  }, [])

  const mediaCoverage = items
  const featuredItems = useMemo(
    () => mediaCoverage.filter((item) => item.is_featured).sort((a, b) => (b.publish_date || "").localeCompare(a.publish_date || "")),
    [mediaCoverage],
  )
  const spotlightItem = featuredItems[0] || mediaCoverage[0] || null

  const availableLanguages = useMemo(() => {
    const values = new Set(mediaCoverage.map((item) => item.language?.toLowerCase()).filter(Boolean) as string[])
    return Array.from(values).sort()
  }, [mediaCoverage])

  const filteredCoverage = useMemo(() => {
    return mediaCoverage.filter((item) => {
      const categoryMatches = filters.category === "all" || item.category === filters.category
      const languageMatches = filters.language === "all" || item.language?.toLowerCase() === filters.language.toLowerCase()
      const mediaTypeMatches = filters.mediaType === "all" || item.media_type === filters.mediaType

      return categoryMatches && languageMatches && mediaTypeMatches
    })
  }, [filters, mediaCoverage])

  // TODO: Re-enable Press Releases and Media Mentions sections when DNS has official data for these content types.

  return (
    <>
      <main>
        <PressHero language={language} spotlightItem={spotlightItem} />

        {isLoading ? (
          <section data-header-theme="white" className="bg-white px-6 py-20 md:py-28">
            <div className="mx-auto max-w-7xl">
              <p className="font-sans text-lg font-semibold text-black">{t.loading}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-64 animate-pulse rounded-2xl bg-black/5" />
                ))}
              </div>
            </div>
          </section>
        ) : error ? (
          <section data-header-theme="white" className="bg-white px-6 py-20 md:py-28">
            <div className="mx-auto max-w-7xl rounded-2xl border border-[#FF5757]/25 bg-[#FF5757]/5 p-8 font-sans text-black">
              {t.error}
            </div>
          </section>
        ) : (
          <>
            <section id="media-coverage" data-header-theme="white" className="scroll-mt-28 bg-[#F7F7F7] px-6 py-24 md:py-32">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <span className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.coverageEyebrow}</span>
                    <h2 className="mt-4 font-display text-4xl font-bold text-black md:text-5xl">{t.coverageTitle}</h2>
                    <p className="mt-4 font-sans text-base leading-7 text-black/60">{t.coverageIntro}</p>
                  </div>
                </div>

                <PressFilters value={filters} onChange={setFilters} language={language} availableLanguages={availableLanguages} />

                {filteredCoverage.length > 0 ? (
                  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCoverage.map((item) => (
                      <PressCard key={item.id} item={item} language={language} ctaLabel={t.coverageCta} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 font-sans text-black/60">{t.coverageEmpty}</div>
                )}
              </div>
            </section>
          </>
        )}

        <PressContactBlock language={language} />
      </main>
      <Footer />
    </>
  )
}
