"use client"

import { ArrowRight, FileText } from "lucide-react"
import { formatPressDate, type PressItem } from "@/lib/press"

type PressReleaseListProps = {
  items: PressItem[]
  language: "en" | "es"
}

const content = {
  en: {
    title: "Official Press Releases",
    button: "View Release",
    empty: "Official DNS press releases will be published here as they become available.",
  },
  es: {
    title: "Comunicados Oficiales",
    button: "Ver Comunicado",
    empty: "Los comunicados oficiales de DNS seran publicados aqui a medida que esten disponibles.",
  },
}

export function PressReleaseList({ items, language }: PressReleaseListProps) {
  const t = content[language]

  return (
    <section data-header-theme="white" className="bg-[#F7F7F7] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-bold text-black md:text-5xl">{t.title}</h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-white">
          {items.length > 0 ? (
            items.map((item) => {
              const date = formatPressDate(item.publish_date, language)

              return (
                <article key={item.id} className="grid gap-5 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[160px_1fr_auto] md:items-center md:p-7">
                  <div className="flex items-center gap-3 font-sans text-sm font-semibold text-black/55">
                    <FileText className="h-4 w-4 text-[#FF5757]" aria-hidden="true" />
                    {date && <time dateTime={item.publish_date || undefined}>{date}</time>}
                  </div>

                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                      {item.outlet || "Digital Nomad Summit"}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-black">{item.title}</h3>
                    {item.summary && <p className="mt-3 max-w-3xl font-sans text-sm leading-6 text-black/60">{item.summary}</p>}
                  </div>

                  {item.external_url && (
                    <a
                      href={item.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 font-sans text-sm font-bold text-black transition-all duration-200 hover:border-[#FF5757] hover:bg-[#FF5757] hover:text-white"
                    >
                      {t.button}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </article>
              )
            })
          ) : (
            <div className="p-8 font-sans text-black/60">{t.empty}</div>
          )}
        </div>
      </div>
    </section>
  )
}
