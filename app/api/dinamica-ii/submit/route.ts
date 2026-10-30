import { NextResponse } from "next/server"

// The public application posts directly to Web3Forms. Keep this route as a compatibility tombstone for stale clients.
export async function POST() {
  return NextResponse.json({ code: "public_submission_disabled" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
