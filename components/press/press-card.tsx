"use client"

import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react"
import { formatPressDate, getCategoryLabel, getMediaTypeLabel, type PressItem } from "@/lib/press"

type PressCardProps = {
  item: PressItem
  language: "en" | "es"
  ctaLabel?: string
  compact?: boolean
  featured?: boolean
}

export function PressCard({ item, language, ctaLabel, compact = false, featured = false }: PressCardProps) {
  const date = formatPressDate(item.publish_date, language)
  const outlet = item.outlet || "Digital Nomad Summit"
  const actionLabel = ctaLabel || (language === "es" ? "Leer Cobertura" : "Read Coverage")

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border transition-all duration-300 ${
        featured
          ? "border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]"
          : "border-black/10 bg-white hover:border-[#FF5757]/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className={compact ? "p-5" : "p-6 md:p-7"}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#FF5757]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#FF5757]">
            {getCategoryLabel(item.category, language)}
          </span>
          {item.language && (
            <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase text-black/55">
              {item.language}
            </span>
          )}
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-black/55">
            {getMediaTypeLabel(item.media_type, language)}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-black/50">{outlet}</p>
          {item.external_url && <ExternalLink className="h-4 w-4 shrink-0 text-black/35 transition-colors group-hover:text-[#FF5757]" />}
        </div>

        <h3 className={`mt-3 font-display font-bold leading-tight text-black ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {item.title}
        </h3>

        {date && (
          <div className="mt-4 flex items-center gap-2 font-sans text-sm text-black/55">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <time dateTime={item.publish_date || undefined}>{date}</time>
          </div>
        )}

        {!compact && item.summary && <p className="mt-5 line-clamp-3 font-sans text-sm leading-6 text-black/65">{item.summary}</p>}
      </div>

      {item.external_url && (
        <a
          href={item.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 px-6 py-4 font-sans text-sm font-bold text-black transition-colors duration-200 hover:text-[#FF5757]"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      )}
    </article>
  )
}
