export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzeyakd"

export type PublicFormMetadata = {
  sourceForm: string
  sourcePage: string
  preferredLanguage: "en" | "es"
  submissionType: string
}

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters: Record<string, string | number>,
  ) => void
}

export async function submitPublicForm(
  form: HTMLFormElement,
  metadata: PublicFormMetadata,
) {
  const formData = new FormData(form)
  formData.set("source_form", metadata.sourceForm)
  formData.set("source_page", metadata.sourcePage)
  formData.set("preferred_language", metadata.preferredLanguage)
  formData.set("submission_type", metadata.submissionType)
  formData.set("submitted_at", new Date().toISOString())

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`Formspree returned ${response.status}`)
  }

  ;(window as GtagWindow).gtag?.("event", "form_submission_success", {
    source_form: metadata.sourceForm,
    source_page: metadata.sourcePage,
    language: metadata.preferredLanguage,
  })
}

