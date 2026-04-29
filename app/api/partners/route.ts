import { getPartners } from "@/lib/data/partners"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const partners = await getPartners()

    return NextResponse.json(
      {
        partners,
        count: partners.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error in partners API route:", error)
    return NextResponse.json({ error: "Failed to fetch partners", partners: [] }, { status: 500 })
  }
}
