import { getPartners } from "@/lib/data/partners"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[api/partners] URL exists:", Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL))
    console.log("[api/partners] KEY exists:", Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
    
    const partners = await getPartners()
    
    console.log("[api/partners] rows found:", partners.length)

    return NextResponse.json(
      {
        partners,
        count: partners.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    )
  } catch (error: any) {
    console.error("[api/partners] Error:", error?.message)
    return NextResponse.json({ error: "Failed to fetch partners", partners: [] }, { status: 500 })
  }
}
