import { NextResponse } from "next/server"

// Kept as a compatibility tombstone while deployed clients roll forward.
// The simplified workflow does not verify tickets or issue participant tokens.
export async function POST() {
  return NextResponse.json({ code: "manual_review_only" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
