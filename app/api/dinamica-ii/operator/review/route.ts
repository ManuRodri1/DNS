import { NextResponse } from "next/server"
import { z } from "zod"
import { getDinamicaAdminClient, isDinamicaOperator } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

const reviewSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.enum(["pending_verification", "needs_information", "verified", "rejected"]),
  operatorLabel: z.string().trim().min(2).max(160),
  reviewNotes: z.string().trim().min(3).max(2000),
}).strict()

export async function POST(request: Request) {
  if (!isDinamicaOperator(request)) return NextResponse.json({ code: "unauthorized" }, { status: 401 })

  try {
    if (Number(request.headers.get("content-length") || 0) > 8_000) {
      return NextResponse.json({ code: "required_information_missing" }, { status: 413 })
    }
    const parsed = reviewSchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ code: "required_information_missing" }, { status: 400 })

    const { data, error } = await getDinamicaAdminClient().rpc("dinamica_review_application", {
      p_application_id: parsed.data.applicationId,
      p_new_status: parsed.data.status,
      p_operator_label: parsed.data.operatorLabel,
      p_review_notes: parsed.data.reviewNotes,
    })
    if (error) {
      if (error.message.includes("application_not_found")) return NextResponse.json({ code: "application_not_found" }, { status: 404 })
      if (error.message.includes("review_status_unchanged")) return NextResponse.json({ code: "review_status_unchanged" }, { status: 409 })
      if (error.message.includes("invalid_review_status")) return NextResponse.json({ code: "required_information_missing" }, { status: 400 })
      throw error
    }

    const row = Array.isArray(data) ? data[0] : data
    return NextResponse.json({
      applicationId: row.application_id,
      previousStatus: row.previous_status,
      status: row.new_status,
      reviewedAt: row.reviewed_at,
    }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[dinamica] Manual application review failed", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "review_unavailable" }, { status: 503 })
  }
}
