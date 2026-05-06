import { supabase } from "@/lib/supabase/client"

export interface Partner {
  id: string
  name: string
  slug?: string
  logo_url: string | null
  logo_alt?: string | null
  category?: string | null
  partner_type?: string | null
  section?: string | null
  initiative?: string | null
  website_url: string | null
  display_order: number
  active: boolean
  country?: string | null
  description?: string | null
  short_label?: string | null
  featured?: boolean
  show_on_home?: boolean
  show_on_partners_page?: boolean
  status?: string | null
  notes?: string | null
  created_at?: string
  // Legacy aliases to not break existing components if any
  logo?: string
  websiteUrl?: string
}

export interface GroupedPartners {
  brand_sponsors: Partner[]
  diter_intellectual_sponsors: Partner[]
  technical_alignment: Partner[]
  institutional_ecosystem: Partner[]
  media_partners: Partner[]
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      console.error("[supabase] Error fetching partners:", error)
      return []
    }

    if (!data) return []

    return data.map((item) => ({
      ...item,
      // Keep legacy fields for existing components
      logo: item.logo_url || "/placeholder.svg",
      websiteUrl: item.website_url || "#",
      displayOrder: item.display_order || 0,
    }))
  } catch (error) {
    console.error("[supabase] Unexpected error in getPartners:", error)
    return []
  }
}

export async function getPartnersGroupedBySection(): Promise<GroupedPartners> {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("active", true)
      .eq("show_on_partners_page", true)
      // We will sort mainly in memory to guarantee the specific section order
      // but we can ask Supabase to pre-sort by display_order and name
      .order("display_order", { ascending: true })
      .order("name", { ascending: true })

    if (error) {
      console.error("[supabase] Error fetching grouped partners:", error)
      return {
        brand_sponsors: [],
        diter_intellectual_sponsors: [],
        technical_alignment: [],
        institutional_ecosystem: [],
        media_partners: [],
      }
    }

    const partners: Partner[] = data || []

    return {
      brand_sponsors: partners.filter((p) => p.section === "brand_sponsors"),
      diter_intellectual_sponsors: partners.filter((p) => p.section === "diter_intellectual_sponsors"),
      technical_alignment: partners.filter((p) => p.section === "technical_alignment"),
      institutional_ecosystem: partners.filter((p) => p.section === "institutional_ecosystem"),
      media_partners: partners.filter((p) => p.section === "media_partners"),
    }
  } catch (error) {
    console.error("[supabase] Unexpected error in getPartnersGroupedBySection:", error)
    return {
      brand_sponsors: [],
      diter_intellectual_sponsors: [],
      technical_alignment: [],
      institutional_ecosystem: [],
      media_partners: [],
    }
  }
}
