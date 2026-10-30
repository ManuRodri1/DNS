import { submitToWeb3Forms } from "@/lib/web3forms"
import type { StartupApplication } from "@/lib/dinamica-ii/application-schema"

export type ApplicationLanguage = "en" | "es"

export async function sendDinamicaApplicationToWeb3Forms(
  application: StartupApplication,
  language: ApplicationLanguage,
  captchaToken: string,
) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(application)) {
    formData.set(key, Array.isArray(value) ? value.join(", ") : String(value ?? ""))
  }

  const startupName = application.startup_brand_name || application.startup_legal_name
  await submitToWeb3Forms(formData, {
    sourceForm: "dinamica_ii_application",
    sourcePage: "/dinamica-ii",
    preferredLanguage: language,
    submissionType: "startup_application",
    subject: `DINAMICA II — New Application — ${startupName}`,
    replyToEmail: application.founder_email,
    fromName: "DINAMICA II — DNS 2027",
  }, captchaToken)
}
