import { createHash, randomBytes } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getDinamicaAdminClient, isDinamicaOperator } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

const issueSchema = z.object({
  ticketReference: z.string().trim().min(1).max(240),
  representativeEmail: z.string().trim().email().max(254),
  ticketType: z.enum(["general_admission", "vip", "legacy_eligible"]),
  paymentVerified: z.literal(true),
}).strict()

// Operators call this only after independently confirming paid status and DNS 2027 eligibility in Stripe.
export async function POST(request: Request) {
  if (!isDinamicaOperator(request)) return NextResponse.json({ code: "unauthorized" }, { status: 401 })

  try {
    if (Number(request.headers.get("content-length") || 0) > 4_000) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 413 })
    }
    const body = issueSchema.safeParse(await request.json())
    if (!body.success) return NextResponse.json({ code: "required_information_missing" }, { status: 400 })

    const token = randomBytes(32).toString("base64url")
    const tokenHash = createHash("sha256").update(token).digest("hex")
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
    const client = getDinamicaAdminClient()
    const { error } = await client.from("dinamica_ticket_verifications").insert({
      ticket_reference: body.data.ticketReference,
      representative_email: body.data.representativeEmail.toLowerCase(),
      ticket_type: body.data.ticketType,
      payment_verified_at: new Date().toISOString(),
      verification_token_hash: tokenHash,
      expires_at: expiresAt,
    })
    if (error?.code === "23505") return NextResponse.json({ code: "ticket_already_used" }, { status: 409 })
    if (error) throw error

    return NextResponse.json({ token, expiresAt }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[dinamica] Operator token could not be issued", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
