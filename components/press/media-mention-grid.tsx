"use client"

import { Mic2, Newspaper, PlayCircle, Radio, Share2 } from "lucide-react"
import { PressCard } from "@/components/press/press-card"
import type { PressItem, PressMediaType } from "@/lib/press"

type MediaMentionGridProps = {
  items: PressItem[]
  language: "en" | "es"
}

const content = {
  en: {
    title: "Media Mentions",
    empty: "Media mentions will be added as they become available.",
    cta: "Open Mention",
  },
  es: {
    title: "Menciones en Medios",
    empty: "Las menciones en medios seran agregadas a medida que esten disponibles.",
    cta: "Abrir Mencion",
  },
}

const icons: Partial<Record<PressMediaType, typeof Newspaper>> = {
  article: Newspaper,
  interview: Mic2,
  video: PlayCircle,
  podcast: Radio,
  social_post: Share2,
}

export function MediaMentionGrid({ items, language }: MediaMentionGridProps) {
  const t = content[language]

  return (
    <section data-header-theme="white" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-bold text-black md:text-5xl">{t.title}</h2>

        {items.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const Icon = icons[item.media_type || "other"] || Share2

              return (
                <div key={item.id} className="relative">
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-black p-2 text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <PressCard item={item} language={language} ctaLabel={t.cta} compact />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-black/10 bg-black/[0.02] p-8 font-sans text-black/60">{t.empty}</div>
        )}
      </div>
    </section>
  )
}
