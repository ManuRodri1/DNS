interface AirtablePartner {
  id: string
  fields: {
    Name: string
    Logo?: Array<{
      url: string
      filename: string
    }>
    "Website URL"?: string
    Category?: string
    "Display Order"?: number
    Active?: boolean
  }
}

interface Partner {
  id: string
  name: string
  logo: string
  websiteUrl: string
  category: string
  displayOrder: number
}

interface AirtableInfluencer {
  id: string
  fields: {
    "Full Name": string
    "Role / Title"?: string
    "Profile Photo"?: Array<{
      url: string
      filename: string
    }>
    "Primary Platform"?: "Instagram" | "YouTube"
    "Instagram URL"?: string
    "YouTube URL"?: string
    Followers?: number
    "Monthly Impressions"?: number
    "Display Order"?: number
    Active?: boolean
    Country?: string
  }
}

export interface Influencer {
  id: string
  name: string
  role?: string
  photo: string
  platform: "Instagram" | "YouTube"
  platformUrl: string
  followers: number
  displayOrder: number
}

export async function getActivePartners(): Promise<Partner[]> {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Partners"

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("[airtable] Partners: missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID — returning empty array")
    return []
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`
    const filterFormula = `AND({Active}=TRUE())`
    const fetchUrl = `${url}?filterByFormula=${encodeURIComponent(filterFormula)}&sort[0][field]=Display Order&sort[0][direction]=asc`

    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error("[airtable] Partners fetch error:", response.status, response.statusText)
      return []
    }

    const data = await response.json()

    const partners: Partner[] = data.records
      .map((record: AirtablePartner) => {
        const { Name, Logo, "Website URL": websiteUrl, Category, "Display Order": displayOrder } = record.fields

        if (!Name || !Logo || Logo.length === 0) return null

        return {
          id: record.id,
          name: Name,
          logo: Logo[0].url,
          websiteUrl: websiteUrl || "#",
          category: Category || "Partner",
          displayOrder: displayOrder || 999,
        }
      })
      .filter((partner: Partner | null): partner is Partner => partner !== null)

    return partners
  } catch (error) {
    console.error("[airtable] Error fetching partners:", error)
    return []
  }
}

export async function getActiveInfluencers(): Promise<Influencer[]> {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
  const AIRTABLE_TABLE_NAME = "Influencers"

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("[airtable] Influencers: missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID — returning empty array")
    return []
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`
    const filterFormula = `{Active}=TRUE()`
    const fetchUrl = `${url}?filterByFormula=${encodeURIComponent(filterFormula)}&sort[0][field]=Display Order&sort[0][direction]=asc`

    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error("[airtable] Influencers fetch error:", response.status, response.statusText)
      return []
    }

    const data = await response.json()

    const influencers: Influencer[] = data.records
      .map((record: AirtableInfluencer) => {
        const {
          "Full Name": fullName,
          "Role / Title": roleTitle,
          "Profile Photo": profilePhoto,
          "Primary Platform": primaryPlatform,
          "Instagram URL": instagramUrl,
          "YouTube URL": youtubeUrl,
          Followers: followers,
          "Display Order": displayOrder,
        } = record.fields

        if (!fullName || !profilePhoto || profilePhoto.length === 0 || !primaryPlatform) return null

        const platformUrl =
          primaryPlatform === "Instagram"
            ? instagramUrl || "#"
            : primaryPlatform === "YouTube"
              ? youtubeUrl || "#"
              : "#"

        return {
          id: record.id,
          name: fullName,
          role: roleTitle,
          photo: profilePhoto[0].url,
          platform: primaryPlatform,
          platformUrl,
          followers: followers || 0,
          displayOrder: displayOrder || 999,
        }
      })
      .filter((influencer: Influencer | null): influencer is Influencer => influencer !== null)

    return influencers
  } catch (error) {
    console.error("[airtable] Error fetching influencers:", error)
    return []
  }
}
