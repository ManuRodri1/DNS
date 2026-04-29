import { supabase } from "@/lib/supabase/client"

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

export async function getInfluencers(): Promise<Influencer[]> {
  try {
    const { data, error } = await supabase
      .from("influencers")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      console.error("[supabase] Error fetching influencers:", error)
      return []
    }

    if (!data) return []

    return data.map((item) => {
      const platformUrl =
        item.primary_platform === "Instagram"
          ? item.instagram_url || "#"
          : item.primary_platform === "YouTube"
            ? item.youtube_url || "#"
            : "#"

      return {
        id: item.id,
        name: item.full_name,
        role: item.role_title,
        photo: item.profile_photo_url || "/placeholder.svg",
        platform: item.primary_platform as "Instagram" | "YouTube",
        platformUrl,
        followers: item.followers || 0,
        displayOrder: item.display_order || 0,
      }
    })
  } catch (error) {
    console.error("[supabase] Unexpected error in getInfluencers:", error)
    return []
  }
}
