"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { fetchPublishedMediaCoverage, formatPressDate, getCategoryLabel, preferLanguage, type PressItem } from "@/lib/press"

const content = {
  en: {
    eyebrow: "Institutional Recognition",
    title: "As Featured In",
    cta: "View Press Room",
  },
  es: {
    eyebrow: "Reconocimiento Institucional",
    title: "Visto en Medios",
    cta: "Ver Sala de Prensa",
  },
}

export function HomepagePressStrip() {
  const { language } = useLanguage()
  const t = content[language]
  const [items, setItems] = useState<PressItem[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadPressItems() {
      const result = await fetchPublishedMediaCoverage()
      if (!isMounted || result.error) return
      setItems(result.data)
    }

    loadPressItems()

    return () => {
      isMounted = false
    }
  }, [])

  const visibleItems = useMemo(() => {
    const featured = items.filter((item) => item.is_featured)
    const fallback = items.filter((item) => !item.is_featured)
    const combined = featured.length >= 4 ? featured : [...featured, ...fallback]

    return preferLanguage(combined, language).slice(0, 6)
  }, [items, language])

  if (visibleItems.length === 0) return null

  return (
    <section data-header-theme="white" className="bg-white px-6 py-18 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.eyebrow}</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-black md:text-5xl">{t.title}</h2>
          </div>
          <Link
            href="/press"
            className="inline-flex items-center gap-2 font-sans text-sm font-bold text-black transition-colors hover:text-[#FF5757]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => {
            const date = formatPressDate(item.publish_date, language)

            return (
              <a
                key={item.id}
                href={item.external_url || "/press"}
                target={item.external_url ? "_blank" : undefined}
                rel={item.external_url ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5757]/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-black/45">{item.outlet}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-black/35 transition-colors group-hover:text-[#FF5757]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 line-clamp-2 min-h-[3.25rem] font-display text-lg font-bold leading-tight text-black">{item.title}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FF5757]/10 px-3 py-1 text-xs font-bold text-[#FF5757]">
                    {getCategoryLabel(item.category, language)}
                  </span>
                  {date && <span className="font-sans text-xs font-semibold text-black/45">{date}</span>}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
