import { NextResponse } from "next/server"
import { getDinamicaAdminClient, isDinamicaOperator } from "@/lib/dinamica-ii/supabase-server"

export const runtime = "nodejs"

function csvCell(value: unknown) {
  const raw = typeof value === "string" ? value : JSON.stringify(value ?? "")
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw
  return `"${text.replaceAll('"', '""')}"`
}

export async function GET(request: Request) {
  if (!isDinamicaOperator(request)) return NextResponse.json({ code: "unauthorized" }, { status: 401 })
  try {
    const client = getDinamicaAdminClient()
    const { data, error } = await client
      .from("dinamica_applications")
      .select("id,status,ticket_reference,payload,submitted_at,reviewer_notes,reviewer_scores,reviewed_at")
      .eq("status", "final_submitted")
      .order("submitted_at", { ascending: true })
    if (error) throw error

    const columns = ["id", "status", "ticket_reference", "submitted_at", "payload", "reviewer_notes", "reviewer_scores", "reviewed_at"]
    const rows = (data || []).map((row) => columns.map((column) => csvCell(row[column as keyof typeof row])).join(","))
    const csv = [columns.join(","), ...rows].join("\r\n")
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="dinamica-ii-final-submissions.csv"',
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("[dinamica] CSV export unavailable", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ code: "submission_unavailable" }, { status: 503 })
  }
}
