// app/api/featured-speakers/route.ts
// Returns featured+published speakers from Supabase.
// Used by the HomepageSpeakers client component.

import { getFeaturedSpeakers } from "@/lib/data/speakers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const featured = await getFeaturedSpeakers()

    const speakers = featured.map((s) => ({
      id: s.id,
      fullName: s.fullName,
      slug: s.slug,
      jobTitle: s.jobTitle,
      company: s.company,
      // Homepage: Poster Image first, Headshot as fallback
      posterImage: s.posterImage,
      headshot: s.headshot,
      // Company logos for trust-building display
      companyLogoPrimary: s.companyLogoPrimary,
      companyLogoSecondary: s.companyLogoSecondary,
    }))

    return NextResponse.json(
      { speakers, count: speakers.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    )
  } catch (err) {
    console.error("[featured-speakers] Error:", err)
    return NextResponse.json({ speakers: [], error: "Failed to fetch speakers" }, { status: 500 })
  }
}
