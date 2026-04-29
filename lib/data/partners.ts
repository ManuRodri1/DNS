import { supabase } from "@/lib/supabase/client"

export interface Partner {
  id: string
  name: string
  logo: string
  websiteUrl: string
  category: string
  displayOrder: number
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
      id: item.id,
      name: item.name,
      logo: item.logo_url || "/placeholder.svg",
      websiteUrl: item.website_url || "#",
      category: item.category || "Partner",
      displayOrder: item.display_order || 0,
    }))
  } catch (error) {
    console.error("[supabase] Unexpected error in getPartners:", error)
    return []
  }
}
