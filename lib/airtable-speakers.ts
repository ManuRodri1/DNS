// ─── Speaker Airtable Utility ───────────────────────────────────────────────
// Uses ONLY the speaker-workspace environment variables:
//   AIRTABLE_BASE_ID_SPEAKER
//   AIRTABLE_API_KEY_SPEAKER
//   AIRTABLE_TABLE_NAME_SPEAKER
// Do NOT import or use the shared Airtable credentials from other sections.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Raw Airtable attachment ─────────────────────────────────────────────────
interface AirtableAttachment {
  id: string
  url: string
  filename: string
  size?: number
  type?: string
  width?: number
  height?: number
}

// ─── Raw Airtable record (fields as returned from the API) ───────────────────
interface AirtableSpeakerRecord {
  id: string
  fields: {
    "Full Name"?: string
    Slug?: string
    Headshot?: AirtableAttachment[]
    "Poster Image"?: AirtableAttachment[]
    "Job Title"?: string
    "Company / Organization"?: string
    "Company Logo Primary"?: AirtableAttachment[]
    "Company Logo Secondary"?: AirtableAttachment[]
    "Short Bio"?: string
    "Long Bio"?: string
    Country?: string
    City?: string
    "Speaker Type"?: string
    Industry?: string
    Topics?: string[] | string
    Language?: string
    Featured?: boolean
    Publish?: boolean
    "Display Order"?: number
    "Speaker Category"?: string
    "Session Title"?: string
    "Session Description"?: string
    "Session Date"?: string
    "Session Time"?: string
    "Session Stage"?: string
    LinkedIn?: string
    Instagram?: string
    Website?: string
    Email?: string
    "Company Description"?: string
    "Quote / Highlight"?: string
    "SEO Title"?: string
    "SEO Description"?: string
    Status?: string
    Notes?: string
  }
}

// ─── Clean Speaker type exposed to UI ────────────────────────────────────────
export interface Speaker {
  id: string
  fullName: string
  slug: string
  headshot: string | null
  posterImage: string | null
  /** Resolved image: posterImage → headshot → null */
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

// ─── Helper: coerce any value to a trimmed string ───────────────────────────
// Airtable can return single-select / linked-record fields as arrays.
// This helper handles string | string[] | number | boolean | undefined | null.
function safeStr(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (Array.isArray(value)) return value.map(String).join(", ").trim()
  if (typeof value === "string") return value.trim()
  return String(value).trim()
}

// ─── Helper: safely extract the first URL from an attachment array ────────────
function firstAttachmentUrl(
  arr: AirtableAttachment[] | undefined | null,
): string | null {
  if (!arr || arr.length === 0) return null
  return arr[0].url || null
}

// ─── Helper: normalise topics (could be string array or comma-separated string)
function normTopics(raw: string[] | string | undefined | null): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

// ─── Helper: generate a URL-safe slug from the speaker name ──────────────────
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// ─── Map a raw Airtable record → clean Speaker object ────────────────────────
function mapRecord(record: AirtableSpeakerRecord): Speaker | null {
  const f = record.fields
  const fullName = safeStr(f["Full Name"])
  if (!fullName) return null // must have a name

  const headshot = firstAttachmentUrl(f.Headshot)
  const posterImage = firstAttachmentUrl(f["Poster Image"])
  const displayImage = headshot || posterImage

  const slug =
    safeStr(f.Slug) ||
    nameToSlug(fullName) ||
    record.id

  return {
    id: record.id,
    fullName,
    slug,
    headshot,
    posterImage,
    displayImage,
    jobTitle: safeStr(f["Job Title"]),
    company: safeStr(f["Company / Organization"]),
    companyLogoPrimary: firstAttachmentUrl(f["Company Logo Primary"]),
    companyLogoSecondary: firstAttachmentUrl(f["Company Logo Secondary"]),
    shortBio: safeStr(f["Short Bio"]),
    longBio: safeStr(f["Long Bio"]),
    country: safeStr(f.Country),
    city: safeStr(f.City),
    speakerType: safeStr(f["Speaker Type"]),
    industry: safeStr(f.Industry),
    topics: normTopics(f.Topics),
    language: safeStr(f.Language),
    featured: f.Featured === true,
    displayOrder: typeof f["Display Order"] === "number" ? f["Display Order"] : 999,
    speakerCategory: safeStr(f["Speaker Category"]),
    sessionTitle: safeStr(f["Session Title"]),
    sessionDescription: safeStr(f["Session Description"]),
    sessionDate: safeStr(f["Session Date"]),
    sessionTime: safeStr(f["Session Time"]),
    sessionStage: safeStr(f["Session Stage"]),
    linkedin: safeStr(f.LinkedIn),
    instagram: safeStr(f.Instagram),
    website: safeStr(f.Website),
    email: safeStr(f.Email),
    companyDescription: safeStr(f["Company Description"]),
    quote: safeStr(f["Quote / Highlight"]),
    seoTitle: safeStr(f["SEO Title"]),
    seoDescription: safeStr(f["SEO Description"]),
    status: safeStr(f.Status),
  }
}

// ─── Sort: featured first → Display Order → Full Name ────────────────────────
function sortSpeakers(speakers: Speaker[]): Speaker[] {
  return [...speakers].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
    return a.fullName.localeCompare(b.fullName)
  })
}

// ─── Fetch all speakers across all Airtable pages ────────────────────────────
async function fetchAllPages(
  baseUrl: string,
  headers: HeadersInit,
): Promise<AirtableSpeakerRecord[]> {
  const records: AirtableSpeakerRecord[] = []
  let offset: string | undefined

  do {
    const url = new URL(baseUrl)
    url.searchParams.set("filterByFormula", "{Publish}=TRUE()")
    url.searchParams.set("sort[0][field]", "Display Order")
    url.searchParams.set("sort[0][direction]", "asc")
    url.searchParams.set("pageSize", "100")
    if (offset) url.searchParams.set("offset", offset)

    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 300 }, // revalidate every 5 min
    })

    if (!res.ok) {
      const txt = await res.text()
      console.error("[speakers] Airtable error:", res.status, txt)
      break
    }

    const data = await res.json()
    records.push(...(data.records || []))
    offset = data.offset
  } while (offset)

  return records
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetch all published speakers from the speaker-specific Airtable workspace.
 * Returns them sorted: featured first → Display Order → Full Name.
 */
export async function getSpeakers(): Promise<Speaker[]> {
  const API_KEY = process.env.AIRTABLE_API_KEY_SPEAKER
  const BASE_ID = process.env.AIRTABLE_BASE_ID_SPEAKER
  const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME_SPEAKER

  if (!API_KEY || !BASE_ID || !TABLE_NAME) {
    console.warn(
      "[speakers] Missing one or more speaker Airtable env vars " +
        "(AIRTABLE_API_KEY_SPEAKER / AIRTABLE_BASE_ID_SPEAKER / AIRTABLE_TABLE_NAME_SPEAKER). " +
        "Returning empty array.",
    )
    return []
  }

  const baseUrl = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`
  const headers = { Authorization: `Bearer ${API_KEY}` }

  try {
    const raw = await fetchAllPages(baseUrl, headers)
    const speakers = raw
      .map(mapRecord)
      .filter((s): s is Speaker => s !== null)

    const sorted = sortSpeakers(speakers)
    return sorted
  } catch (err) {
    console.error("[speakers] Unexpected error:", err)
    return []
  }
}

/**
 * Fetch a single published speaker by slug.
 * Returns null if not found.
 */
export async function getSpeakerBySlug(slug: string): Promise<Speaker | null> {
  const speakers = await getSpeakers()
  return speakers.find((s) => s.slug === slug) ?? null
}

/**
 * Return all slugs of published speakers (used for generateStaticParams).
 */
export async function getSpeakerSlugs(): Promise<string[]> {
  const speakers = await getSpeakers()
  return speakers.map((s) => s.slug)
}
