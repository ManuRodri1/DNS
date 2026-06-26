"use client"

import { getCategoryLabel, getMediaTypeLabel, type PressCategory, type PressMediaType } from "@/lib/press"

export type PressFilterState = {
  category: "all" | PressCategory
  language: "all" | string
  mediaType: "all" | PressMediaType
}

type PressFiltersProps = {
  value: PressFilterState
  onChange: (next: PressFilterState) => void
  language: "en" | "es"
  availableLanguages: string[]
}

const categories: PressCategory[] = ["innovation", "investment", "global_talent", "dr_ecosystem", "other"]
const mediaTypes: PressMediaType[] = ["article", "interview", "video", "podcast", "social_post", "official_release", "other"]

const content = {
  en: {
    category: "Category",
    language: "Language",
    mediaType: "Media Type",
    allCategories: "All Categories",
    allLanguages: "All Languages",
    allMediaTypes: "All Media Types",
  },
  es: {
    category: "Categoria",
    language: "Idioma",
    mediaType: "Tipo de Medio",
    allCategories: "Todas las categorias",
    allLanguages: "Todos los idiomas",
    allMediaTypes: "Todos los tipos",
  },
}

export function PressFilters({ value, onChange, language, availableLanguages }: PressFiltersProps) {
  const t = content[language]
  const selectClass =
    "h-12 w-full rounded-xl border border-black/10 bg-white px-4 font-sans text-sm font-medium text-black shadow-sm outline-none transition-colors focus:border-[#FF5757] focus:ring-2 focus:ring-[#FF5757]/20"

  return (
    <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:grid-cols-3">
      <label className="block">
        <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-black/45">{t.category}</span>
        <select
          value={value.category}
          onChange={(event) => onChange({ ...value, category: event.target.value as PressFilterState["category"] })}
          className={selectClass}
        >
          <option value="all">{t.allCategories}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {getCategoryLabel(category, language)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-black/45">{t.language}</span>
        <select
          value={value.language}
          onChange={(event) => onChange({ ...value, language: event.target.value })}
          className={selectClass}
        >
          <option value="all">{t.allLanguages}</option>
          {availableLanguages.map((itemLanguage) => (
            <option key={itemLanguage} value={itemLanguage}>
              {itemLanguage.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-black/45">{t.mediaType}</span>
        <select
          value={value.mediaType}
          onChange={(event) => onChange({ ...value, mediaType: event.target.value as PressFilterState["mediaType"] })}
          className={selectClass}
        >
          <option value="all">{t.allMediaTypes}</option>
          {mediaTypes.map((mediaType) => (
            <option key={mediaType} value={mediaType}>
              {getMediaTypeLabel(mediaType, language)}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
