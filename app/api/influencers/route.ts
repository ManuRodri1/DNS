import { NextResponse } from "next/server"
import { getInfluencers } from "@/lib/data/influencers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[api/influencers] URL exists:", Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL))
    console.log("[api/influencers] KEY exists:", Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))

    const influencers = await getInfluencers()

    console.log("[api/influencers] rows found:", influencers.length)

    return NextResponse.json(
      { influencers },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  } catch (error: any) {
    console.error("[api/influencers] Error:", error?.message)
    return NextResponse.json({ error: "Failed to fetch influencers", influencers: [] }, { status: 500 })
  }
}
