import { NextResponse } from "next/server"

// Compatibility tombstone. Participant verification tokens are no longer used.
export async function POST() {
  return NextResponse.json({ code: "manual_review_only" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
