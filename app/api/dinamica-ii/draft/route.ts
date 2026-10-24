import { createHash, randomBytes, randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { draftPayloadSchema } from "@/lib/dinamica-ii/application-schema"
import { DINAMICA_FORM_AVAILABLE } from "@/lib/dinamica-ii/config"
import { getDinamicaAdminClient, takeDinamicaRateLimit } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  if (!DINAMICA_FORM_AVAILABLE) return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })

  try {
    if (Number(request.headers.get("content-length") || 0) > 350_000) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 413 })
    }
    const limited = await takeDinamicaRateLimit(request, "save-draft", 35)
    if (!limited) return NextResponse.json({ code: "submission_unavailable" }, { status: 429 })

    const body = await request.json() as Record<string, unknown>
    const payload = draftPayloadSchema.safeParse(body.payload)
    if (!payload.success) return NextResponse.json({ code: "required_information_missing" }, { status: 400 })

    const client = getDinamicaAdminClient()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    if (typeof body.id === "string" && typeof body.token === "string") {
      const tokenHash = createHash("sha256").update(body.token.trim()).digest("hex")
      const { data, error } = await client
        .from("dinamica_application_drafts")
        .update({ payload: payload.data, updated_at: new Date().toISOString(), expires_at: expiresAt })
        .eq("id", body.id)
        .eq("access_token_hash", tokenHash)
        .gt("expires_at", new Date().toISOString())
        .select("id")
        .maybeSingle()
      if (error) throw error
      if (!data) return NextResponse.json({ code: "verification_token_expired" }, { status: 404 })
      return NextResponse.json({ id: data.id, token: body.token }, { headers: { "Cache-Control": "no-store" } })
    }

    const token = randomBytes(32).toString("base64url")
    const tokenHash = createHash("sha256").update(token).digest("hex")
    const id = randomUUID()
    const { data, error } = await client
      .from("dinamica_application_drafts")
      .insert({ id, access_token_hash: tokenHash, payload: payload.data, expires_at: expiresAt })
      .select("id")
      .single()
    if (error) throw error
    return NextResponse.json({ id: data.id, token }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[dinamica] Draft could not be saved", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
