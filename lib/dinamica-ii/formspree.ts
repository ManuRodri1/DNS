import { FORMSPREE_ENDPOINT } from "@/lib/form-config"
import type { StartupApplication } from "@/lib/dinamica-ii/application-schema"

export type ApplicationLanguage = "en" | "es"

export class FormspreeSubmissionError extends Error {
  fieldNames: string[]

  constructor(message: string, fieldNames: string[] = []) {
    super(message)
    this.name = "FormspreeSubmissionError"
    this.fieldNames = fieldNames
  }
}

export function getDinamicaFormspreeEndpoint() {
  return FORMSPREE_ENDPOINT
}

export async function sendDinamicaApplicationToFormspree(
  application: StartupApplication,
  language: ApplicationLanguage,
) {
  const endpoint = getDinamicaFormspreeEndpoint()
  if (!endpoint) throw new Error("formspree_not_configured")

  const formData = new FormData()
  for (const [key, value] of Object.entries(application)) {
    if (Array.isArray(value)) formData.set(key, value.join(", "))
    else formData.set(key, String(value ?? ""))
  }

  formData.set("form_identifier", "DINAMICA_II_2027")
  formData.set("_subject", `DINAMICA II — New Application — ${application.startup_legal_name}`)
  formData.set("_replyto", application.founder_email)
  formData.set("application_language", language)
  formData.set("source", "DNS — DINAMICA II")
  formData.set("source_page", typeof window === "undefined" ? "/dinamica-ii" : window.location.pathname)
  formData.set("submitted_at", new Date().toISOString())

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    })
  } catch {
    throw new Error("formspree_network_error")
  }

  if (response.status === 429) throw new FormspreeSubmissionError("formspree_rate_limited")
  if (!response.ok) {
    let fieldNames: string[] = []
    try {
      const result = await response.json() as { errors?: Array<{ field?: unknown }> }
      fieldNames = Array.isArray(result.errors)
        ? result.errors.map((item) => typeof item.field === "string" ? item.field : "").filter(Boolean)
        : []
    } catch {
      // A generic provider error still leaves the participant's local answers intact.
    }
    throw new FormspreeSubmissionError("formspree_rejected", fieldNames)
  }
}
