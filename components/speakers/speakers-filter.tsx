"use client"

// components/speakers/speakers-filter.tsx
// Client-side filter + search panel. Drives the visible speaker grid via React state.

import { useState, useMemo, useCallback } from "react"
import type { Speaker } from "@/lib/airtable-speakers"
import { SpeakerCard } from "./speaker-card"
import { TopicPill } from "./topic-pill"
import { useLanguage } from "@/lib/language-context"

// ─── Translations ─────────────────────────────────────────────────────────────
const content = {
  en: {
    searchPlaceholder: "Search by name, company, or topic…",
    filters: "Filters",
    clearBtn: "Clear",
    clearAllFilters: "Clear all filters",
    allIndustries: "All Industries",
    allCountries: "All Countries",
    allTopics: "All Topics",
    allTypes: "All Types",
    allLanguages: "All Languages",
    speakersCount: (n: number, hasFilters: boolean) =>
      `${n} speaker${n !== 1 ? "s" : ""}${hasFilters ? " matching" : ""}`,
    noResultsTitle: (hasFilters: boolean) =>
      hasFilters ? "No speakers found" : "Speakers Coming Soon",
    noResultsBody: (hasFilters: boolean) =>
      hasFilters
        ? "Try adjusting your filters or search terms to find more speakers."
        : "We're finalizing our speaker lineup. Check back soon or apply to be a speaker.",
    clearFilters: "Clear filters",
  },
  es: {
    searchPlaceholder: "Buscar por nombre, empresa o tema…",
    filters: "Filtros",
    clearBtn: "Limpiar",
    clearAllFilters: "Limpiar todos los filtros",
    allIndustries: "Todas las Industrias",
    allCountries: "Todos los Países",
    allTopics: "Todos los Temas",
    allTypes: "Todos los Tipos",
    allLanguages: "Todos los Idiomas",
    speakersCount: (n: number, hasFilters: boolean) =>
      `${n} speaker${n !== 1 ? "s" : ""}${hasFilters ? " encontrado" + (n !== 1 ? "s" : "") : ""}`,
    noResultsTitle: (hasFilters: boolean) =>
      hasFilters ? "No se encontraron speakers" : "Speakers Próximamente",
    noResultsBody: (hasFilters: boolean) =>
      hasFilters
        ? "Intenta ajustar tus filtros o términos de búsqueda para encontrar más speakers."
        : "Estamos finalizando nuestro lineup. Vuelve pronto o postúlate como speaker.",
    clearFilters: "Limpiar filtros",
  },
}

interface SpeakersFilterProps {
  speakers: Speaker[]
}

function unique(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean))).sort()
}

export function SpeakersFilter({ speakers }: SpeakersFilterProps) {
  const { language } = useLanguage()
  const t = content[language]

  const [search, setSearch] = useState("")
  const [filterIndustry, setFilterIndustry] = useState<string>("")
  const [filterCountry, setFilterCountry] = useState<string>("")
  const [filterTopic, setFilterTopic] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterLanguage, setFilterLanguage] = useState<string>("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const industries = useMemo(() => unique(speakers.map((s) => s.industry)), [speakers])
  const countries = useMemo(() => unique(speakers.map((s) => s.country)), [speakers])
  const topics = useMemo(() => unique(speakers.flatMap((s) => s.topics)), [speakers])
  const types = useMemo(() => unique(speakers.map((s) => s.speakerType)), [speakers])
  const languages = useMemo(() => unique(speakers.map((s) => s.language)), [speakers])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return speakers.filter((s) => {
      if (q) {
        const haystack = [s.fullName, s.company, ...s.topics, s.industry, s.speakerType].join(" ").toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (filterIndustry && s.industry !== filterIndustry) return false
      if (filterCountry && s.country !== filterCountry) return false
      if (filterTopic && !s.topics.includes(filterTopic)) return false
      if (filterType && s.speakerType !== filterType) return false
      if (filterLanguage && s.language !== filterLanguage) return false
      return true
    })
  }, [speakers, search, filterIndustry, filterCountry, filterTopic, filterType, filterLanguage])

  const hasActiveFilters =
    search || filterIndustry || filterCountry || filterTopic || filterType || filterLanguage

  const clearAll = useCallback(() => {
    setSearch("")
    setFilterIndustry("")
    setFilterCountry("")
    setFilterTopic("")
    setFilterType("")
    setFilterLanguage("")
  }, [])

  const selectClass =
    "w-full bg-[#111] border border-white/10 text-white/80 text-sm font-sans rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-[#FF5757]/50 transition-colors duration-200 cursor-pointer hover:border-white/20"

  return (
    <div>
      {/* Search + filter toggle row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#111] border border-white/10 text-white placeholder-white/30 text-sm font-sans rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF5757]/50 transition-colors duration-200"
          />
        </div>

        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-white/60 text-sm font-sans font-medium hover:border-[#FF5757]/40 hover:text-white transition-all duration-200 sm:hidden"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          {t.filters}
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#FF5757] ml-0.5" />}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-white/10 text-white/40 text-sm font-sans hover:border-[#FF5757]/40 hover:text-[#FF5757] transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t.clearBtn}
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      <div className={`${filtersOpen ? "block" : "hidden"} sm:block mb-8`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {industries.length > 0 && (
            <div className="relative">
              <select value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className={selectClass}>
                <option value="">{t.allIndustries}</option>
                {industries.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          )}

          {countries.length > 0 && (
            <div className="relative">
              <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className={selectClass}>
                <option value="">{t.allCountries}</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          )}

          {topics.length > 0 && (
            <div className="relative">
              <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className={selectClass}>
                <option value="">{t.allTopics}</option>
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          )}

          {types.length > 0 && (
            <div className="relative">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
                <option value="">{t.allTypes}</option>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          )}

          {languages.length > 0 && (
            <div className="relative">
              <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} className={selectClass}>
                <option value="">{t.allLanguages}</option>
                {languages.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
          )}
        </div>

        {/* Mobile clear */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="mt-3 sm:hidden inline-flex items-center gap-1.5 text-white/40 text-sm font-sans hover:text-[#FF5757] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t.clearAllFilters}
          </button>
        )}
      </div>

      {/* Active topic pill */}
      {filterTopic && (
        <div className="flex flex-wrap gap-2 mb-6">
          <TopicPill label={filterTopic} active onClick={() => setFilterTopic("")} />
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/30 text-sm font-sans">
          {t.speakersCount(filtered.length, !!hasActiveFilters)}
        </p>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <NoResults onClear={clearAll} hasFilters={!!hasActiveFilters} t={t} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── No-results state ─────────────────────────────────────────────────────────
function NoResults({ onClear, hasFilters, t }: { onClear: () => void; hasFilters: boolean; t: typeof content["en"] }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
      <div className="w-20 h-20 rounded-full border border-[#FF5757]/20 bg-[#FF5757]/5 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-[#FF5757]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
        </svg>
      </div>
      <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
        {t.noResultsTitle(hasFilters)}
      </h3>
      <p className="text-white/40 text-sm font-sans max-w-sm leading-relaxed mb-6">
        {t.noResultsBody(hasFilters)}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FF5757]/40 text-[#FF5757] text-sm font-semibold font-sans hover:bg-[#FF5757]/10 transition-all duration-200"
        >
          {t.clearFilters}
        </button>
      )}
    </div>
  )
}
