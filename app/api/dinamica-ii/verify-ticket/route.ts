import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { DINAMICA_FORM_AVAILABLE } from "@/lib/dinamica-ii/config"
import { getDinamicaAdminClient, takeDinamicaRateLimit } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  if (!DINAMICA_FORM_AVAILABLE) return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  try {
    if (Number(request.headers.get("content-length") || 0) > 4_000) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 413 })
    }
    const limited = await takeDinamicaRateLimit(request, "verify-ticket", 8)
    if (!limited) return NextResponse.json({ code: "submission_unavailable" }, { status: 429 })

    const body = await request.json() as Record<string, unknown>
    if (typeof body.ticketReference !== "string" || typeof body.token !== "string" || typeof body.representativeEmail !== "string") {
      return NextResponse.json({ code: "required_information_missing" }, { status: 400 })
    }
    const reference = body.ticketReference.trim().slice(0, 240)
    const email = body.representativeEmail.trim().toLowerCase().slice(0, 254)
    const tokenHash = createHash("sha256").update(body.token.trim()).digest("hex")
    const client = getDinamicaAdminClient()
    const { data, error } = await client
      .from("dinamica_ticket_verifications")
      .select("representative_email, verification_token_hash, expires_at, consumed_at")
      .eq("ticket_reference", reference)
      .maybeSingle()

    if (error) throw error
    if (!data) return NextResponse.json({ code: "payment_not_found" }, { status: 404 })
    if (data.consumed_at) return NextResponse.json({ code: "ticket_already_used" }, { status: 409 })
    if (new Date(data.expires_at).getTime() <= Date.now()) return NextResponse.json({ code: "verification_token_expired" }, { status: 410 })
    if (data.representative_email !== email || data.verification_token_hash !== tokenHash) {
      return NextResponse.json({ code: "ticket_not_verified" }, { status: 403 })
    }

    return NextResponse.json({ verified: true }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[dinamica] Ticket verification unavailable", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
