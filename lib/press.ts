import { supabase } from "@/lib/supabase/client"

export type PressContentType = "media_coverage" | "press_release" | "media_mention"
export type PressCategory = "innovation" | "investment" | "global_talent" | "dr_ecosystem" | "other"
export type PressMediaType = "article" | "interview" | "video" | "podcast" | "social_post" | "official_release" | "other"

export type PressItem = {
  id: string
  title: string
  outlet: string | null
  publish_date: string | null
  language: string | null
  content_type: PressContentType
  category: PressCategory | null
  media_type: PressMediaType | null
  external_url: string | null
  summary: string | null
  is_featured: boolean | null
  is_published: boolean | null
  created_at: string | null
}

export type PressItemsResult = {
  data: PressItem[]
  error: string | null
}

export async function fetchPublishedPressItems(): Promise<PressItemsResult> {
  const { data, error } = await supabase
    .from("press_items")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("[press] Error loading press items:", error)
    return { data: [], error: error.message }
  }

  return { data: (data || []) as PressItem[], error: null }
}

export async function fetchPublishedMediaCoverage(): Promise<PressItemsResult> {
  const { data, error } = await supabase
    .from("press_items")
    .select("*")
    .eq("is_published", true)
    .eq("content_type", "media_coverage")
    .order("publish_date", { ascending: false })

  if (error) {
    console.error("[press] Error loading media coverage:", error)
    return { data: [], error: error.message }
  }

  return { data: (data || []) as PressItem[], error: null }
}

export function formatPressDate(value: string | null, language: "en" | "es") {
  if (!value) return ""

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""

  return new Intl.DateTimeFormat(language === "es" ? "es-DO" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function getCategoryLabel(category: PressCategory | null, language: "en" | "es") {
  const labels: Record<PressCategory, Record<"en" | "es", string>> = {
    innovation: { en: "Innovation", es: "Innovacion" },
    investment: { en: "Investment", es: "Inversion" },
    global_talent: { en: "Global Talent", es: "Talento Global" },
    dr_ecosystem: { en: "Dominican Republic Ecosystem", es: "Ecosistema RD" },
    other: { en: "Other", es: "Otro" },
  }

  return labels[category || "other"][language]
}

export function getMediaTypeLabel(mediaType: PressMediaType | null, language: "en" | "es") {
  const labels: Record<PressMediaType, Record<"en" | "es", string>> = {
    article: { en: "Article", es: "Articulo" },
    interview: { en: "Interview", es: "Entrevista" },
    video: { en: "Video", es: "Video" },
    podcast: { en: "Podcast", es: "Podcast" },
    social_post: { en: "Social Post", es: "Publicacion Social" },
    official_release: { en: "Official Release", es: "Comunicado Oficial" },
    other: { en: "Other", es: "Otro" },
  }

  return labels[mediaType || "other"][language]
}

export function preferLanguage(items: PressItem[], language: "en" | "es") {
  return [...items].sort((a, b) => {
    const aMatches = a.language?.toLowerCase() === language
    const bMatches = b.language?.toLowerCase() === language

    if (aMatches === bMatches) return 0
    return aMatches ? -1 : 1
  })
}
