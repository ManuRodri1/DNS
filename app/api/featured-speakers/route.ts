// app/api/featured-speakers/route.ts
// Returns up to 3 featured+published speakers from the speaker-specific Airtable workspace.
// Used by the HomepageSpeakers client component.

import { getSpeakers } from "@/lib/airtable-speakers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const all = await getSpeakers()

    // Return all published speakers, already sorted by Display Order from getSpeakers()
    const speakers = all.map((s) => ({
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
