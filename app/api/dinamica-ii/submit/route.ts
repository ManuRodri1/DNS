import { NextResponse } from "next/server"

// The public application now posts directly to its dedicated Formspree form.
// Keep this route as a compatibility tombstone for stale clients.
export async function POST() {
  return NextResponse.json({ code: "direct_formspree_submission_only" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
