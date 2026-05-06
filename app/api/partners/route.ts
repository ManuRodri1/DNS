import { getPartners } from "@/lib/data/partners"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const showOnHome = searchParams.get("show_on_home") === "true"
    
    let partners = await getPartners()
    
    if (showOnHome) {
      partners = partners.filter(p => p.show_on_home === true)
    }

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
