"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Check, LoaderCircle, ShieldCheck } from "lucide-react"

type Language = "en" | "es"
type Props = {
  language: Language
  applicationsOpen: boolean
  privacyNoticeUrl: string
  openingSoon: string
  openingNote: string
  ticketUrl: string
  onTicketVerified: () => void
}

type FieldSpec = {
  name: string
  label: Record<Language, string>
  type?: "email" | "url" | "tel" | "number" | "select" | "textarea" | "checkbox"
  required?: boolean
  max?: number
  options?: Array<{ value: string; en: string; es: string }>
  wide?: boolean
}

const fields: FieldSpec[][] = [
  [
    { name: "founder_name", label: { en: "Applicant / founder full name", es: "Nombre completo del solicitante / fundador" }, required: true },
    { name: "founder_email", label: { en: "Email", es: "Correo electrónico" }, type: "email", required: true },
    { name: "founder_phone", label: { en: "Phone / WhatsApp with country code", es: "Teléfono / WhatsApp con código de país" }, type: "tel", required: true },
    { name: "founder_role", label: { en: "Role", es: "Cargo" }, required: true },
    { name: "contact_language", label: { en: "Preferred contact language", es: "Idioma preferido para comunicaciones" }, type: "select", required: true, options: [{ value: "en", en: "English", es: "Inglés" }, { value: "es", en: "Spanish", es: "Español" }] },
    { name: "founder_origin_country", label: { en: "Founder country of origin", es: "País de origen del fundador" }, required: true },
    { name: "founder_residence_country", label: { en: "Country of current residence", es: "País de residencia actual" }, required: true },
    { name: "founder_city", label: { en: "City", es: "Ciudad" }, required: true },
    { name: "pitch_language", label: { en: "Primary pitch language", es: "Idioma principal para presentar" }, type: "select", required: true, options: [{ value: "en", en: "English", es: "Inglés" }, { value: "es", en: "Spanish", es: "Español" }] },
    { name: "representative_ticket_email", label: { en: "Applicant representative's ticket email", es: "Correo asociado a la entrada del representante" }, type: "email", required: true },
    { name: "ticket_reference", label: { en: "Verified ticket reference", es: "Referencia de entrada verificada" }, wide: true },
    { name: "ticket_token", label: { en: "One-time verification token", es: "Token de verificación de un solo uso" }, wide: true },
    { name: "cofounders", label: { en: "Cofounder names and emails (optional)", es: "Nombres y correos de cofundadores (opcional)" }, wide: true },
    { name: "linkedin_url", label: { en: "LinkedIn profile (optional)", es: "Perfil de LinkedIn (opcional)" }, type: "url" },
    { name: "founder_website", label: { en: "Website (optional)", es: "Sitio web (opcional)" }, type: "url" },
  ],
  [
    { name: "startup_legal_name", label: { en: "Startup legal name", es: "Nombre legal de la startup" }, required: true },
    { name: "startup_brand_name", label: { en: "Public / brand name, if different", es: "Nombre comercial, si es diferente" } },
    { name: "incorporation_country", label: { en: "Country of incorporation / origin", es: "País de constitución / origen" }, required: true },
    { name: "registration_proof", label: { en: "Registration number or proof of legal establishment", es: "Número de registro o prueba de constitución legal" }, required: true },
    { name: "startup_profile_url", label: { en: "Startup website or public profile", es: "Sitio web o perfil público de la startup" }, type: "url", required: true },
    { name: "founded_year", label: { en: "Year founded", es: "Año de fundación" }, type: "number", required: true },
    { name: "stage", label: { en: "Development stage", es: "Etapa de desarrollo" }, type: "select", required: true, options: [{ value: "pre-seed", en: "Pre-seed", es: "Pre-seed" }, { value: "seed", en: "Seed", es: "Seed" }, { value: "post-mvp", en: "Post-MVP", es: "Posterior al MVP" }] },
    { name: "sector", label: { en: "Sector", es: "Sector" }, required: true },
    { name: "operation_countries", label: { en: "Current countries of operation", es: "Países donde opera actualmente" }, required: true },
    { name: "headquarters_country", label: { en: "Headquarters country", es: "País de sede principal" }, required: true },
    { name: "team_size", label: { en: "Approximate team size", es: "Tamaño aproximado del equipo" }, type: "number", required: true },
    { name: "company_description", label: { en: "One-sentence company description", es: "Descripción de la empresa en una oración" }, type: "textarea", required: true, max: 300, wide: true },
    { name: "connection_explanation", label: { en: "Explain and support your Dominican connection", es: "Explica y sustenta el vínculo con República Dominicana" }, type: "textarea", required: true, max: 1000, wide: true },
    { name: "connection_evidence_url", label: { en: "Evidence URL (optional)", es: "URL de evidencia (opcional)" }, type: "url", wide: true },
  ],
  [
    { name: "customer_problem", label: { en: "Customer problem and product / service", es: "Problema del cliente y producto / servicio" }, type: "textarea", required: true, max: 500, wide: true },
    { name: "innovation", label: { en: "What makes the startup innovative or different", es: "Qué hace innovadora o diferente a la startup" }, type: "textarea", required: true, max: 500, wide: true },
    { name: "export_markets", label: { en: "Target export markets and concrete route to customers", es: "Mercados de exportación y ruta concreta hacia clientes" }, type: "textarea", required: true, max: 700, wide: true },
    { name: "demand_evidence", label: { en: "Evidence of demand, MVP, revenue, customers or pilots", es: "Evidencia de demanda, MVP, ingresos, clientes o pilotos" }, type: "textarea", required: true, max: 500, wide: true },
    { name: "scale_milestones", label: { en: "Scale potential and next 12-month milestones", es: "Potencial de escala e hitos para los próximos 12 meses" }, type: "textarea", required: true, max: 500, wide: true },
    { name: "impact_contribution", label: { en: "Digitalization, sustainability or economic inclusion contribution", es: "Aporte a digitalización, sostenibilidad o inclusión económica" }, type: "textarea", required: true, max: 400, wide: true },
    { name: "team_capacity", label: { en: "Founding team's execution capacity and experience", es: "Capacidad de ejecución y experiencia del equipo fundador" }, type: "textarea", required: true, max: 400, wide: true },
    { name: "prize_use", label: { en: "Proposed use of prize capital and measurable six-month results", es: "Uso propuesto del premio y resultados medibles en seis meses" }, type: "textarea", required: true, max: 500, wide: true },
    { name: "pitch_deck_url", label: { en: "Pitch deck URL (PDF or public link)", es: "URL del pitch deck (PDF o enlace público)" }, type: "url", required: true, wide: true },
    { name: "demo_url", label: { en: "Demo / video URL (optional)", es: "URL de demo / video (opcional)" }, type: "url" },
    { name: "external_reference", label: { en: "External reference (optional)", es: "Referencia externa (opcional)" }, type: "url" },
    { name: "customer_count_range", label: { en: "Customer count range", es: "Rango de cantidad de clientes" }, required: true },
    { name: "monthly_revenue_range", label: { en: "Monthly revenue range (optional / prefer not to say)", es: "Rango de ingresos mensuales (opcional / prefiero no decirlo)" } },
    { name: "active_export_customers", label: { en: "Active export customers? (yes / no)", es: "¿Tiene clientes activos de exportación? (sí / no)" }, type: "select", required: true, options: [{ value: "yes", en: "Yes", es: "Sí" }, { value: "no", en: "No", es: "No" }] },
    { name: "expected_market_entry", label: { en: "Expected market entry date", es: "Fecha prevista de entrada al mercado" }, required: true },
  ],
  [
    { name: "accuracy_ack", label: { en: "I confirm the information is accurate and I am authorized to represent this company.", es: "Confirmo que la información es correcta y que estoy autorizado para representar a esta empresa." }, type: "checkbox", required: true },
    { name: "judging_ack", label: { en: "I consent to eligibility screening and judging.", es: "Acepto la revisión de elegibilidad y la evaluación del jurado." }, type: "checkbox", required: true },
    { name: "selection_ack", label: { en: "I understand a ticket purchase does not guarantee selection.", es: "Entiendo que comprar una entrada no garantiza la selección." }, type: "checkbox", required: true },
    { name: "winner_terms_ack", label: { en: "If awarded, I accept the reinvestment and reporting conditions.", es: "Si recibo un premio, acepto las condiciones de reinversión e informes." }, type: "checkbox", required: true },
    { name: "contact_ack", label: { en: "I consent to being contacted about the competition.", es: "Acepto que me contacten sobre el concurso." }, type: "checkbox", required: true },
    { name: "privacy_ack", label: { en: "I accept the applicable privacy information and sharing with authorized evaluators.", es: "Acepto la información de privacidad aplicable y compartir estos datos con evaluadores autorizados." }, type: "checkbox", required: true },
    { name: "marketing_opt_in", label: { en: "I would like to receive other DNS and Successment updates (optional).", es: "Quiero recibir otras novedades de DNS y Successment (opcional)." }, type: "checkbox" },
    { name: "prior_funding", label: { en: "Previous DINAMICA II awards or funding (disclose for review)", es: "Premios o fondos anteriores de DINAMICA II (declaración para revisión)" }, type: "textarea", max: 500, wide: true },
    { name: "conflicts", label: { en: "Potential conflicts of interest or related affiliations (disclose for review)", es: "Posibles conflictos de interés o afiliaciones relacionadas (declaración para revisión)" }, type: "textarea", max: 500, wide: true },
  ],
]

const sectionTitles: Record<Language, string[]> = {
  en: ["Founder & ticket", "Startup & Dominican connection", "Exportability & jury assessment", "Representations & submission"],
  es: ["Fundador y entrada", "Startup y vínculo dominicano", "Exportabilidad y evaluación", "Declaraciones y envío"],
}

const fieldError: Record<Language, string> = {
  en: "Complete the required fields in this step.",
  es: "Completa los campos obligatorios de este paso.",
}

export function StartupApplicationForm({ language, applicationsOpen, privacyNoticeUrl, openingSoon, openingNote, ticketUrl, onTicketVerified }: Props) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [connections, setConnections] = useState<string[]>([])
  const [diaspora, setDiaspora] = useState(false)
  const [nomad, setNomad] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verification, setVerification] = useState<"idle" | "checking" | "ok" | "error">("idle")
  const [verificationMessage, setVerificationMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState("")
  const [receiptTimestamp, setReceiptTimestamp] = useState("")
  const [draftState, setDraftState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const draftCredentials = useMemo(() => ({
    id: typeof window === "undefined" ? "" : sessionStorage.getItem("dinamica-draft-id") || "",
    token: typeof window === "undefined" ? "" : sessionStorage.getItem("dinamica-draft-token") || "",
  }), [])

  useEffect(() => {
    if (!applicationsOpen) return
    const id = sessionStorage.getItem("dinamica-draft-id")
    const token = sessionStorage.getItem("dinamica-draft-token")
    if (!id || !token) return
    void fetch(`/api/dinamica-ii/draft/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).then(async (response) => {
      if (!response.ok) throw new Error("draft_not_found")
      return response.json() as Promise<{ payload: Record<string, string | boolean | string[]> }>
    }).then(({ payload }) => {
      const restoredValues: Record<string, string> = {}
      for (const [key, value] of Object.entries(payload)) {
        if (key !== "ticket_token" && typeof value === "string") restoredValues[key] = value
      }
      setValues(restoredValues)
      setConnections(Array.isArray(payload.connections) ? payload.connections : [])
      setDiaspora(payload.diaspora === true)
      setNomad(payload.nomad === true)
    }).catch(() => {
      sessionStorage.removeItem("dinamica-draft-id")
      sessionStorage.removeItem("dinamica-draft-token")
    })
  }, [applicationsOpen])

  const t = language === "en"
  const saveDraft = useCallback(async () => {
    if (!Object.keys(values).length || !applicationsOpen || receipt) return
    const isNewDraft = !sessionStorage.getItem("dinamica-draft-id")
    const draftValues = { ...values }
    delete draftValues.ticket_token
    setDraftState("saving")
    try {
      const res = await fetch("/api/dinamica-ii/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: sessionStorage.getItem("dinamica-draft-id") || undefined,
          token: sessionStorage.getItem("dinamica-draft-token") || undefined,
          payload: { ...draftValues, connections, diaspora, nomad },
        }),
      })
      if (!res.ok) throw new Error("draft_unavailable")
      const data = await res.json() as { id: string; token: string }
      sessionStorage.setItem("dinamica-draft-id", data.id)
      sessionStorage.setItem("dinamica-draft-token", data.token)
      setDraftState("saved")
      if (isNewDraft) trackDinamicaEvent("prize_application_draft_started", language)
    } catch {
      setDraftState("error")
    }
  }, [applicationsOpen, connections, diaspora, language, nomad, receipt, values])

  const update = (name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }))
    if (name === "ticket_token" || name === "ticket_reference" || name === "representative_ticket_email") setVerified(false)
    setError("")
  }

  const stepIsComplete = (index: number) => {
    const required = fields[index].filter((field) => field.required && !(index === 0 && ["ticket_reference", "ticket_token"].includes(field.name)))
    return required.every((field) => Boolean(values[field.name]?.trim())) && (index !== 1 || connections.length > 0)
  }

  const moveNext = async () => {
    if (!stepIsComplete(step)) { setError(fieldError[language]); return }
    setError("")
    await saveDraft()
    setStep((current) => Math.min(current + 1, 3))
  }

  const verifyTicket = async () => {
    setVerification("checking")
    setVerificationMessage("")
    try {
      const response = await fetch("/api/dinamica-ii/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketReference: values.ticket_reference,
          token: values.ticket_token,
          representativeEmail: values.representative_ticket_email,
        }),
      })
      const result = await response.json() as { code?: string }
      if (!response.ok) throw new Error(result.code || "ticket_not_verified")
      setVerified(true)
      setVerification("ok")
      setVerificationMessage(t ? "Ticket verified for this representative." : "Entrada verificada para este representante.")
      onTicketVerified()
    } catch (cause) {
      setVerified(false)
      setVerification("error")
      const code = cause instanceof Error ? cause.message : "submission_unavailable"
      setVerificationMessage(ticketErrorCopy(code, language))
    }
  }

  const submit = async () => {
    if (!stepIsComplete(3)) { setError(fieldError[language]); return }
    if (!verified) { setError(ticketErrorCopy("ticket_not_verified", language)); return }
    setSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/dinamica-ii/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketReference: values.ticket_reference,
          token: values.ticket_token,
          representativeEmail: values.representative_ticket_email,
          payload: { ...values, connections, diaspora, nomad },
          draftId: draftCredentials.id || undefined,
          draftToken: sessionStorage.getItem("dinamica-draft-token") || undefined,
        }),
      })
      const result = await response.json() as { id?: string; submittedAt?: string; code?: string }
      if (!response.ok || !result.id) throw new Error(result.code || "submission_unavailable")
      setReceipt(result.id)
      setReceiptTimestamp(result.submittedAt || new Date().toISOString())
      trackDinamicaEvent("prize_application_submitted", language)
      sessionStorage.removeItem("dinamica-draft-id")
      sessionStorage.removeItem("dinamica-draft-token")
      setDraftState("idle")
    } catch (cause) {
      setError(ticketErrorCopy(cause instanceof Error ? cause.message : "submission_unavailable", language))
    } finally {
      setSubmitting(false)
    }
  }

  if (!applicationsOpen) {
    return (
      <div className="dinamica-opening-card">
        <h3>{openingSoon}</h3>
        <p>{openingNote}</p>
        <a className="dinamica-button dinamica-button-primary" href={ticketUrl} target="_blank" rel="noreferrer">
          {t ? "Get Your DNS Ticket" : "Consigue tu entrada DNS"}<ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    )
  }

  if (receipt) {
    const localReceiptTime = receiptTimestamp ? new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-DO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Santo_Domingo" }).format(new Date(receiptTimestamp)) : ""
    return <div className="dinamica-opening-card" role="status"><ShieldCheck size={25} aria-hidden="true" /><h3>{t ? "Application received" : "Solicitud recibida"}</h3><p>{t ? "Your official submission reference is" : "La referencia oficial de tu solicitud es"} <b>{receipt}</b>. {t ? "Submitted" : "Enviada"}: <b>{localReceiptTime} AST</b>. {t ? "Keep it for your records. No confirmation email is configured." : "Guárdala para tus registros. No hay un correo de confirmación configurado."}</p></div>
  }

  return (
    <form className="dinamica-form" onSubmit={(event) => { event.preventDefault(); void submit() }} noValidate>
      <div className="dinamica-form-progress" aria-label={t ? "Application progress" : "Progreso de la solicitud"}>
        <div className="dinamica-form-progress-track"><span style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
        <p>{t ? `Step ${step + 1} of 4` : `Paso ${step + 1} de 4`} · {sectionTitles[language][step]}</p>
      </div>
      <fieldset className="dinamica-form-step" aria-describedby={error ? "dinamica-form-error" : undefined}>
        <legend>{sectionTitles[language][step]}</legend>
        <div className="dinamica-form-grid">
          {fields[step].map((field) => {
            const label = field.label[language]
            const invalid = Boolean(error && field.required && !values[field.name]?.trim())
            const common = {
              id: field.name,
              name: field.name,
              required: field.required,
              "aria-invalid": invalid || undefined,
              value: values[field.name] || "",
              onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field.name, event.target.value),
            }
            if (field.type === "select") {
              return <label className={`dinamica-field ${field.wide ? "dinamica-field-wide" : ""}`} key={field.name} htmlFor={field.name}><span>{label}{field.required ? " *" : ""}</span><select {...common}><option value="">{t ? "Select" : "Selecciona"}</option>{field.options?.map((option) => <option value={option.value} key={option.value}>{option[language]}</option>)}</select>{invalid && <small>{t ? "This field is required." : "Este campo es obligatorio."}</small>}</label>
            }
            if (field.type === "checkbox") {
              return <label className={`dinamica-check-field ${field.wide ? "dinamica-field-wide" : ""}`} key={field.name} htmlFor={field.name}><input id={field.name} name={field.name} type="checkbox" checked={values[field.name] === "yes"} onChange={(event) => update(field.name, event.target.checked ? "yes" : "")} required={field.required} aria-invalid={Boolean(error && field.required && values[field.name] !== "yes") || undefined} /><span>{label}{field.required ? " *" : ""}</span></label>
            }
            if (field.type === "textarea") {
              return <label className={`dinamica-field ${field.wide ? "dinamica-field-wide" : ""}`} key={field.name} htmlFor={field.name}><span>{label}{field.required ? " *" : ""}</span><textarea {...common} maxLength={field.max} rows={4} />{invalid && <small>{t ? "This field is required." : "Este campo es obligatorio."}</small>}<small>{(values[field.name] || "").length}{field.max ? ` / ${field.max}` : ""}</small></label>
            }
            return <label className={`dinamica-field ${field.wide ? "dinamica-field-wide" : ""}`} key={field.name} htmlFor={field.name}><span>{label}{field.required ? " *" : ""}</span><input {...common} type={field.type || "text"} maxLength={field.max} />{invalid && <small>{t ? "This field is required." : "Este campo es obligatorio."}</small>}</label>
          })}
        </div>
        {step === 3 && privacyNoticeUrl && <p className="dinamica-privacy-link">{t ? "Privacy notice: " : "Aviso de privacidad: "}<a href={privacyNoticeUrl} target="_blank" rel="noreferrer">{t ? "Read the approved notice" : "Consulta el aviso aprobado"}</a>.</p>}
        {step === 1 && <div className="dinamica-connection-options"><p>{t ? "Select at least one Dominican connection *" : "Selecciona al menos un vínculo dominicano *"}</p>{[
          ["operations_dr", t ? "Operations in Dominican Republic" : "Operaciones en República Dominicana"],
          ["dominican_origin", t ? "Dominican-origin startup / founding team" : "Startup / equipo fundador de origen dominicano"],
          ["market_plan_dr", t ? "Plan to enter or expand in Dominican Republic" : "Plan para entrar o expandirse en República Dominicana"],
        ].map(([value, label]) => <label key={value}><input type="checkbox" checked={connections.includes(value)} onChange={(event) => setConnections((current) => event.target.checked ? [...current, value] : current.filter((item) => item !== value))} />{label}</label>)}<label><input type="checkbox" checked={diaspora} onChange={(event) => setDiaspora(event.target.checked)} />{t ? "Dominican diaspora founder (description only)" : "Fundador de la diáspora dominicana (solo descriptivo)"}</label><label><input type="checkbox" checked={nomad} onChange={(event) => setNomad(event.target.checked)} />{t ? "Digital nomad / internationally mobile founder (description only)" : "Nómada digital / fundador con movilidad internacional (solo descriptivo)"}</label></div>}
        {step === 0 && <div className="dinamica-ticket-check"><p>{t ? "Verify your ticket before final submission." : "Verifica tu entrada antes del envío final."}</p><button type="button" className="dinamica-button dinamica-button-outline" onClick={() => void verifyTicket()} disabled={verification === "checking" || !values.ticket_reference || !values.ticket_token || !values.representative_ticket_email}>{verification === "checking" ? <LoaderCircle size={16} className="dinamica-spin" /> : verification === "ok" ? <Check size={16} /> : <ShieldCheck size={16} />}{t ? "Verify ticket" : "Verificar entrada"}</button>{verificationMessage && <p className={`dinamica-ticket-status ${verification}`}>{verificationMessage}</p>}</div>}
      </fieldset>
      <div className="dinamica-form-actions">
        {step > 0 && <button type="button" className="dinamica-button dinamica-button-outline" onClick={() => { setError(""); setStep((current) => current - 1) }}><ArrowLeft size={16} />{t ? "Previous" : "Anterior"}</button>}
        <div className="dinamica-form-action-end">{draftState !== "idle" && <span className="dinamica-draft-state">{draftState === "saving" ? (t ? "Saving draft…" : "Guardando borrador…") : draftState === "saved" ? (t ? "Draft saved" : "Borrador guardado") : (t ? "Draft could not be saved" : "No se pudo guardar el borrador")}</span>}{step < 3 ? <button type="button" className="dinamica-button dinamica-button-primary" onClick={() => void moveNext()}>{t ? "Next" : "Siguiente"}<ArrowRight size={16} /></button> : <button type="submit" className="dinamica-button dinamica-button-primary" disabled={submitting || !verified}>{submitting ? <LoaderCircle size={16} className="dinamica-spin" /> : <Check size={16} />}{t ? "Submit application" : "Enviar solicitud"}</button>}</div>
      </div>
      {error && <p id="dinamica-form-error" className="dinamica-form-error" role="alert">{error}</p>}
      <p className="dinamica-form-privacy">{t ? "Drafts are stored securely on the server. Uploaded documents are not stored; provide a public pitch deck URL." : "Los borradores se guardan de forma segura en el servidor. No se almacenan documentos; proporciona una URL pública del pitch deck."}</p>
    </form>
  )
}

function trackDinamicaEvent(name: string, language: Language) {
  if (typeof window === "undefined") return
  const gtag = (window as Window & { gtag?: (command: "event", eventName: string, parameters: Record<string, string>) => void }).gtag
  gtag?.("event", name, { language, source_page: "dinamica_ii" })
}

function ticketErrorCopy(code: string, language: Language) {
  const en: Record<string, string> = {
    ticket_not_verified: "Ticket not verified. Enter a valid operator-issued token.",
    payment_not_found: "Payment not found. Check your ticket reference with DNS.",
    payment_not_completed: "Payment not completed. Only paid tickets qualify.",
    ticket_already_used: "Ticket already associated with another application.",
    verification_token_expired: "Verification token expired. Request a new check from DNS.",
    required_information_missing: "Required information missing. Review the highlighted fields.",
    application_already_submitted: "Application already submitted.",
    submission_unavailable: "Submission temporarily unavailable. Your answers have not been submitted.",
    draft_unavailable: "Draft could not be saved. Please try again.",
  }
  const es: Record<string, string> = {
    ticket_not_verified: "Entrada no verificada. Ingresa un token válido emitido por un operador.",
    payment_not_found: "No encontramos el pago. Confirma la referencia de entrada con DNS.",
    payment_not_completed: "El pago no se completó. Solo califican las entradas pagadas.",
    ticket_already_used: "La entrada ya está asociada a otra solicitud.",
    verification_token_expired: "El token de verificación venció. Solicita una nueva revisión a DNS.",
    required_information_missing: "Falta información obligatoria. Revisa los campos señalados.",
    application_already_submitted: "La solicitud ya fue enviada.",
    submission_unavailable: "El envío no está disponible temporalmente. Tus respuestas no se han enviado.",
    draft_unavailable: "No se pudo guardar el borrador. Inténtalo nuevamente.",
  }
  return (language === "en" ? en : es)[code] || (language === "en" ? en.submission_unavailable : es.submission_unavailable)
}
