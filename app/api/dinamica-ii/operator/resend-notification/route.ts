import { NextResponse } from "next/server"

// Server-side notification retries belong to the retired Supabase workflow.
export async function POST() {
  return NextResponse.json({ code: "direct_formspree_submission_only" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
