import { NextResponse } from "next/server"

// Draft retrieval is intentionally retired from the public application flow.
function retired() {
  return NextResponse.json({ code: "drafts_disabled" }, { status: 410, headers: { "Cache-Control": "no-store" } })
}

export async function GET() { return retired() }
export async function DELETE() { return retired() }
