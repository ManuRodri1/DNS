import { NextResponse } from "next/server"

// Draft storage is intentionally retired from the public application flow.
export async function POST() {
  return NextResponse.json({ code: "drafts_disabled" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}
