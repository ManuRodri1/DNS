import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { applicationSchema } from "@/lib/dinamica-ii/application-schema"
import { DINAMICA_FORM_AVAILABLE } from "@/lib/dinamica-ii/config"
import { getDinamicaAdminClient, takeDinamicaRateLimit } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  if (!DINAMICA_FORM_AVAILABLE) {
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }

  try {
    if (Number(request.headers.get("content-length") || 0) > 120_000) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 413 })
    }
    const limited = await takeDinamicaRateLimit(request, "submit-application", 5)
    if (!limited) return NextResponse.json({ code: "submission_unavailable" }, { status: 429 })

    const body = await request.json() as Record<string, unknown>
    const parsed = applicationSchema.safeParse(body.payload)
    if (!parsed.success) return NextResponse.json({ code: "required_information_missing" }, { status: 400 })

    const data = parsed.data
    if (
      typeof body.token !== "string" ||
      typeof body.ticketReference !== "string" ||
      typeof body.representativeEmail !== "string" ||
      data.ticket_reference !== body.ticketReference.trim() ||
      data.representative_ticket_email.toLowerCase() !== body.representativeEmail.trim().toLowerCase()
    ) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 400 })
    }

    const tokenHash = createHash("sha256").update(body.token.trim()).digest("hex")
    const safePayload = { ...data } as Record<string, unknown>
    delete safePayload.ticket_token
    const client = getDinamicaAdminClient()

    if (typeof body.draftId === "string" && typeof body.draftToken === "string") {
      const draftHash = createHash("sha256").update(body.draftToken.trim()).digest("hex")
      const { data: draft } = await client
        .from("dinamica_application_drafts")
        .select("id")
        .eq("id", body.draftId)
        .eq("access_token_hash", draftHash)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle()
      if (!draft) return NextResponse.json({ code: "submission_unavailable" }, { status: 404 })
    }

    const { data: result, error } = await client.rpc("dinamica_submit_application", {
      p_ticket_reference: data.ticket_reference,
      p_representative_email: data.representative_ticket_email.toLowerCase(),
      p_token_hash: tokenHash,
      p_payload: safePayload,
      p_draft_id: typeof body.draftId === "string" ? body.draftId : null,
    })
    if (error) {
      if (error.message.includes("ticket_not_verified")) return NextResponse.json({ code: "ticket_not_verified" }, { status: 403 })
      if (error.message.includes("application_already_submitted")) return NextResponse.json({ code: "application_already_submitted" }, { status: 409 })
      throw error
    }
    const row = Array.isArray(result) ? result[0] : result
    if (!row?.application_id) throw new Error("application_result_missing")

    return NextResponse.json(
      { id: row.application_id, submittedAt: row.submitted_at },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[dinamica] Application submission unavailable", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
