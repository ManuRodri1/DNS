export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export type PublicFormMetadata = {
  sourceForm: string
  sourcePage: string
  preferredLanguage: "en" | "es"
  submissionType: string
  subject: string
  replyToEmail?: string
  fromName?: string
}

export class Web3FormsSubmissionError extends Error {
  constructor(code: string) {
    super(code)
    this.name = "Web3FormsSubmissionError"
  }
}

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters: Record<string, string | number>,
  ) => void
}

function readField(formData: FormData, ...names: string[]) {
  for (const name of names) {
    const value = formData.get(name)
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return ""
}

export async function submitToWeb3Forms(formDataOrElement: FormData | HTMLFormElement, metadata: PublicFormMetadata, captchaToken: string) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey?.trim()) throw new Web3FormsSubmissionError("web3forms_not_configured")
  if (!captchaToken) throw new Web3FormsSubmissionError("captcha_required")

  const formData = formDataOrElement instanceof FormData
    ? formDataOrElement
    : new FormData(formDataOrElement)
  const name = readField(formData, "name", "fullName", "founder_name")
  const email = metadata.replyToEmail?.trim() || readField(formData, "email", "founder_email")
  formData.set("access_key", accessKey)
  formData.set("subject", metadata.subject)
  formData.set("from_name", metadata.fromName || "Digital Nomad Summit Santo Domingo 2027")
  formData.set("name", name)
  formData.set("email", email)
  formData.set("replyto", email)
  formData.set("source_form", metadata.sourceForm)
  formData.set("source_page", metadata.sourcePage)
  formData.set("submission_type", metadata.submissionType)
  formData.set("preferred_language", metadata.preferredLanguage)
  formData.set("submitted_at", new Date().toISOString())
  formData.set("h-captcha-response", captchaToken)

  let response: Response
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    })
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === "TimeoutError") {
      throw new Web3FormsSubmissionError("web3forms_timeout")
    }
    throw new Web3FormsSubmissionError("web3forms_network_error")
  }

  if (response.status === 429) throw new Web3FormsSubmissionError("web3forms_rate_limited")
  if (!response.ok) {
    throw new Web3FormsSubmissionError(response.status >= 500 ? "web3forms_server_error" : "web3forms_rejected")
  }

  let result: { success?: unknown }
  try {
    result = await response.json() as { success?: unknown }
  } catch {
    throw new Web3FormsSubmissionError("web3forms_invalid_response")
  }

  if (result.success !== true) throw new Web3FormsSubmissionError("web3forms_rejected")

  if (typeof window !== "undefined") {
    (window as GtagWindow).gtag?.("event", "form_submission_success", {
      source_form: metadata.sourceForm,
      source_page: metadata.sourcePage,
      language: metadata.preferredLanguage,
    })
  }
}
