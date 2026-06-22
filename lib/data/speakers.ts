import { supabase } from "@/lib/supabase/client"

type SpeakerRow = Record<string, unknown>

export interface Speaker {
  id: string
  fullName: string
  slug: string
  headshot: string | null
  posterImage: string | null
  displayImage: string | null
  jobTitle: string
  company: string
  companyLogoPrimary: string | null
  companyLogoSecondary: string | null
  shortBio: string
  longBio: string
  country: string
  city: string
  speakerType: string
  industry: string
  topics: string[]
  language: string
  featured: boolean
  displayOrder: number
  speakerCategory: string
  sessionTitle: string
  sessionDescription: string
  sessionDate: string
  sessionTime: string
  sessionStage: string
  linkedin: string
  instagram: string
  website: string
  email: string
  companyDescription: string
  quote: string
  seoTitle: string
  seoDescription: string
  status: string
}

function safeStr(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (Array.isArray(value)) return value.map(String).join(", ").trim()
  if (typeof value === "string") return value.trim()
  return String(value).trim()
}

function safeUrl(value: unknown): string | null {
  const url = safeStr(value)
  return url || null
}

function safeBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1
}

function safeNumber(value: unknown, fallback = 999): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function normalizeTopics(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(safeStr).filter(Boolean)
  if (typeof raw === "string") {
    const trimmed = raw.trim()
    if (!trimmed) return []

    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed.map(safeStr).filter(Boolean)
    } catch {
      // Fall through to comma-separated text.
    }

    return trimmed
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean)
  }
  return []
}

function mapSpeaker(row: SpeakerRow): Speaker | null {
  const fullName = safeStr(row.full_name)
  if (!fullName) return null

  const slug = safeStr(row.slug) || nameToSlug(fullName) || safeStr(row.id)
  if (!slug) return null

  const headshot = safeUrl(row.headshot_url)
  const posterImage = safeUrl(row.poster_image_url)

  return {
    id: safeStr(row.id) || slug,
    fullName,
    slug,
    headshot,
    posterImage,
    displayImage: posterImage || headshot,
    jobTitle: safeStr(row.job_title),
    company: safeStr(row.company_organization),
    companyLogoPrimary: safeUrl(row.company_logo_primary_url),
    companyLogoSecondary: safeUrl(row.company_logo_secondary_url),
    shortBio: safeStr(row.short_bio),
    longBio: safeStr(row.long_bio),
    country: safeStr(row.country),
    city: safeStr(row.city),
    speakerType: safeStr(row.speaker_type),
    industry: safeStr(row.industry),
    topics: normalizeTopics(row.topics),
    language: safeStr(row.language),
    featured: safeBool(row.featured),
    displayOrder: safeNumber(row.display_order),
    speakerCategory: safeStr(row.speaker_category),
    sessionTitle: safeStr(row.session_title),
    sessionDescription: safeStr(row.session_description),
    sessionDate: safeStr(row.session_date),
    sessionTime: safeStr(row.session_time),
    sessionStage: safeStr(row.session_stage),
    linkedin: safeStr(row.linkedin_url),
    instagram: safeStr(row.instagram_url),
    website: safeStr(row.website_url),
    email: safeStr(row.email),
    companyDescription: safeStr(row.company_description),
    quote: safeStr(row.quote_highlight),
    seoTitle: safeStr(row.seo_title),
    seoDescription: safeStr(row.seo_description),
    status: safeStr(row.status),
  }
}

function sortSpeakers(speakers: Speaker[]): Speaker[] {
  return [...speakers].sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
    return a.fullName.localeCompare(b.fullName)
  })
}

function isMissingPublishedColumn(error: unknown) {
  if (!error || typeof error !== "object") return false
  const message = "message" in error ? String(error.message) : ""
  const details = "details" in error ? String(error.details) : ""
  return `${message} ${details}`.includes("published")
}

async function fetchPublishedRows(featuredOnly = false): Promise<SpeakerRow[]> {
  const buildQuery = (publishedColumn: "published" | "is_published") => {
    let query = supabase
      .from("speakers")
      .select("*")
      .eq(publishedColumn, true)
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true })

    if (featuredOnly) query = query.eq("featured", true)
    return query
  }

  let { data, error } = await buildQuery("published")

  if (error && isMissingPublishedColumn(error)) {
    const fallback = await buildQuery("is_published")
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    console.error("[supabase] Error fetching speakers:", error)
    return []
  }

  return (data || []) as SpeakerRow[]
}

export async function getSpeakers(): Promise<Speaker[]> {
  try {
    const rows = await fetchPublishedRows(false)
    return sortSpeakers(rows.map(mapSpeaker).filter((speaker): speaker is Speaker => speaker !== null))
  } catch (error) {
    console.error("[supabase] Unexpected error in getSpeakers:", error)
    return []
  }
}

export async function getFeaturedSpeakers(): Promise<Speaker[]> {
  try {
    const rows = await fetchPublishedRows(true)
    return sortSpeakers(rows.map(mapSpeaker).filter((speaker): speaker is Speaker => speaker !== null))
  } catch (error) {
    console.error("[supabase] Unexpected error in getFeaturedSpeakers:", error)
    return []
  }
}

export async function getSpeakerBySlug(slug: string): Promise<Speaker | null> {
  try {
    const buildQuery = (publishedColumn: "published" | "is_published") =>
      supabase
        .from("speakers")
        .select("*")
        .eq(publishedColumn, true)
        .eq("slug", slug)
        .maybeSingle()

    let { data, error } = await buildQuery("published")

    if (error && isMissingPublishedColumn(error)) {
      const fallback = await buildQuery("is_published")
      data = fallback.data
      error = fallback.error
    }

    if (error) {
      console.error("[supabase] Error fetching speaker by slug:", error)
      return null
    }

    return data ? mapSpeaker(data as SpeakerRow) : null
  } catch (error) {
    console.error("[supabase] Unexpected error in getSpeakerBySlug:", error)
    return null
  }
}

export async function getSpeakerSlugs(): Promise<string[]> {
  try {
    const buildQuery = (publishedColumn: "published" | "is_published") =>
      supabase
        .from("speakers")
        .select("slug")
        .eq(publishedColumn, true)
        .order("display_order", { ascending: true })
        .order("slug", { ascending: true })

    let { data, error } = await buildQuery("published")

    if (error && isMissingPublishedColumn(error)) {
      const fallback = await buildQuery("is_published")
      data = fallback.data
      error = fallback.error
    }

    if (error) {
      console.error("[supabase] Error fetching speaker slugs:", error)
      return []
    }

    return (data || []).map((row) => safeStr(row.slug)).filter(Boolean)
  } catch (error) {
    console.error("[supabase] Unexpected error in getSpeakerSlugs:", error)
    return []
  }
}
