import { NextResponse } from "next/server"
import { getInfluencers } from "@/lib/data/influencers"

export async function GET() {
  try {
    const influencers = await getInfluencers()
    return NextResponse.json({ influencers })
  } catch (error) {
    console.error("[v0] Error in /api/influencers:", error)
    return NextResponse.json({ error: "Failed to fetch influencers", influencers: [] }, { status: 500 })
  }
}
