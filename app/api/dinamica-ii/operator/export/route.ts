import { NextResponse } from "next/server"
import { getDinamicaAdminClient, isDinamicaOperator } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

function csvCell(value: unknown) {
  const raw = typeof value === "string" ? value : JSON.stringify(value ?? "")
  const text = /^[\s]*[=+\-@]/.test(raw) ? `'${raw}` : raw
  return `"${text.replaceAll('"', '""')}"`
}

const payloadColumns = [
  ["founder_role", "founder_role"], ["contact_language", "contact_language"],
  ["founder_origin_country", "founder_origin_country"], ["founder_residence_country", "founder_residence_country"],
  ["founder_city", "founder_city"], ["pitch_language", "pitch_language"],
  ["cofounders", "cofounders"], ["linkedin_url", "linkedin_url"], ["founder_website", "founder_website"],
  ["startup_brand_name", "startup_brand_name"], ["registration_proof", "registration_proof"],
  ["startup_profile_url", "startup_profile_url"], ["founded_year", "founded_year"], ["stage", "stage"],
  ["sector", "sector"], ["operation_countries", "operation_countries"], ["headquarters_country", "headquarters_country"],
  ["team_size", "team_size"], ["company_description", "company_description"], ["connections", "connections"],
  ["connection_explanation", "connection_explanation"], ["connection_evidence_url", "connection_evidence_url"],
  ["diaspora", "diaspora"], ["nomad", "nomad"], ["customer_problem", "customer_problem"],
  ["innovation", "innovation"], ["export_markets", "export_markets"], ["demand_evidence", "demand_evidence"],
  ["scale_milestones", "scale_milestones"], ["impact_contribution", "impact_contribution"],
  ["team_capacity", "team_capacity"], ["prize_use", "prize_use"], ["pitch_deck_url", "pitch_deck_url"],
  ["demo_url", "demo_url"], ["external_reference", "external_reference"],
  ["customer_count_range", "customer_count_range"], ["monthly_revenue_range", "monthly_revenue_range"],
  ["active_export_customers", "active_export_customers"], ["expected_market_entry", "expected_market_entry"],
  ["accuracy_ack", "accuracy_ack"], ["authority_ack", "authority_ack"], ["judging_ack", "judging_ack"],
  ["selection_ack", "selection_ack"], ["winner_terms_ack", "winner_terms_ack"], ["contact_ack", "contact_ack"],
  ["privacy_ack", "privacy_ack"], ["marketing_opt_in", "marketing_opt_in"],
  ["prior_funding", "prior_funding"], ["conflicts", "conflicts"],
] as const

const administrativeColumns = [
  ["application_id", "application_id"], ["created_at", "created_at"], ["status", "verification_status"],
  ["applicant_name", "applicant_name"], ["applicant_email", "applicant_email"],
  ["startup_name", "startup_name"], ["incorporation_country", "incorporation_country"],
  ["ticket_email", "ticket_email"], ["ticket_reference", "ticket_reference"], ["manual_follow_up_required", "manual_follow_up_required"],
  ["ticket_type", "ticket_type"], ["ticket_purchase_category", "ticket_purchase_category"],
  ["review_notes", "review_notes"], ["reviewed_by", "reviewed_by"], ["reviewed_at", "reviewed_at"],
] as const

export async function GET(request: Request) {
  if (!isDinamicaOperator(request)) return NextResponse.json({ code: "unauthorized" }, { status: 401 })
  const report = new URL(request.url).searchParams.get("status")
  if (report !== "pending" && report !== "verified") {
    return NextResponse.json({ code: "report_status_required" }, { status: 400 })
  }

  try {
    const client = getDinamicaAdminClient()
    let query = client
      .from("dinamica_applications")
      .select("id,status,created_at,applicant_name,applicant_email,startup_name,ticket_email,ticket_reference,ticket_type,ticket_purchase_category,manual_follow_up_required,review_notes,reviewed_by,reviewed_at,payload")
      .order("created_at", { ascending: true })
    query = report === "pending"
      ? query.in("status", ["pending_verification", "needs_information"])
      : query.eq("status", "verified")

    const { data, error } = await query
    if (error) throw error

    const headers = [...administrativeColumns.map(([, label]) => label), ...payloadColumns.map(([, label]) => label)]
    const rows = (data || []).map((row) => {
      const payload = row.payload && typeof row.payload === "object" ? row.payload as Record<string, unknown> : {}
      const application = {
        ...row,
        application_id: row.id,
        incorporation_country: payload.incorporation_country,
      } as Record<string, unknown>
      return [
        ...administrativeColumns.map(([key]) => application[key]),
        ...payloadColumns.map(([key]) => payload[key]),
      ].map(csvCell).join(",")
    })
    const csv = [headers.join(","), ...rows].join("\r\n")
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="dinamica-ii-${report}-applications.csv"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("[dinamica] CSV export unavailable", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
