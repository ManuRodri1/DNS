import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { DINAMICA_FORM_AVAILABLE } from "@/lib/dinamica-ii/config"
import { getDinamicaAdminClient } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!DINAMICA_FORM_AVAILABLE) return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim()
  if (token.length < 32 || token.length > 100) return NextResponse.json({ code: "unauthorized" }, { status: 401 })

  try {
    const { id } = await context.params
    const tokenHash = createHash("sha256").update(token).digest("hex")
    const client = getDinamicaAdminClient()
    const { data, error } = await client
      .from("dinamica_application_drafts")
      .select("payload")
      .eq("id", id)
      .eq("access_token_hash", tokenHash)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle()
    if (error) throw error
    if (!data) return NextResponse.json({ code: "verification_token_expired" }, { status: 404 })
    return NextResponse.json({ payload: data.payload }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[dinamica] Draft could not be read", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
