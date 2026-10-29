"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check, ChevronDown, LoaderCircle, ShieldCheck } from "lucide-react"
import { applicationSchema, type StartupApplication } from "@/lib/dinamica-ii/application-schema"
import { FormspreeSubmissionError, sendDinamicaApplicationToFormspree } from "@/lib/dinamica-ii/formspree"

type Language = "en" | "es"
type Props = {
  language: Language
  formVisible: boolean
  submissionEnabled: boolean
  privacyNoticeUrl: string
  openingSoon: string
  openingNote: string
  ticketUrl: string
}

type FieldErrors = Record<string, string>
type Connection = "operations_dr" | "dominican_origin" | "market_plan_dr"
type FormPayload = Record<string, string | Connection[]> & { connections: Connection[] }

const connections: Array<{ value: Connection; en: string; es: string }> = [
  { value: "operations_dr", en: "Operations in the Dominican Republic", es: "Operaciones en República Dominicana" },
  { value: "dominican_origin", en: "Dominican-origin startup or founding team", es: "Startup o equipo fundador de origen dominicano" },
  { value: "market_plan_dr", en: "Plan to enter or expand in the Dominican market", es: "Plan para entrar o expandirse en el mercado dominicano" },
]

const evaluationGroups = [
  { id: "product", en: "Problem & differentiation", es: "Problema y diferenciación", fields: ["customer_problem", "innovation"] },
  { id: "market", en: "Export market & demand", es: "Mercado exportador y demanda", fields: ["export_markets", "demand_evidence"] },
  { id: "growth", en: "Growth, impact & team", es: "Crecimiento, impacto y equipo", fields: ["scale_milestones", "impact_contribution", "team_capacity"] },
  { id: "prize", en: "Prize plan", es: "Plan para el premio", fields: ["prize_use"] },
] as const

const requiredByStep = [
  ["founder_name", "founder_email", "founder_phone", "founder_role", "founder_origin_country", "founder_residence_country", "founder_city", "contact_language", "pitch_language", "ticket_purchase_category", "ticket_type", "representative_ticket_email"],
  ["startup_legal_name", "incorporation_country", "registration_proof", "startup_profile_url", "founded_year", "stage", "sector", "operation_countries", "headquarters_country", "team_size", "company_description"],
  ["customer_problem", "innovation", "export_markets", "demand_evidence", "scale_milestones", "impact_contribution", "team_capacity", "prize_use", "pitch_deck_url"],
  ["accuracy_ack", "authority_ack", "judging_ack", "selection_ack", "winner_terms_ack", "contact_ack", "privacy_ack"],
] as const

const stepNames: Record<Language, string[]> = {
  en: ["About You & Your Ticket", "About Your Startup", "Tell Us About Your Idea", "Review & Submit"],
  es: ["Sobre ti y tu entrada", "Sobre tu startup", "Cuéntanos tu propuesta", "Revisar y enviar"],
}

function errorText(code: string, language: Language) {
  const en: Record<string, string> = {
    formspree_not_configured: "Online submission is not configured yet. Your answers are still here.",
    formspree_rate_limited: "Formspree is receiving requests too quickly. Wait a moment, then try again.",
    formspree_rejected: "Formspree could not accept this application. Your answers are still here; review the form and try again.",
    formspree_network_error: "We could not confirm receipt because of a connection issue. Your answers are still here. Please try again once your connection is stable.",
    invalid_application: "Review the highlighted answers before submitting.",
  }
  const es: Record<string, string> = {
    formspree_not_configured: "El envío en línea aún no está configurado. Tus respuestas siguen aquí.",
    formspree_rate_limited: "Formspree está recibiendo solicitudes muy rápido. Espera un momento e inténtalo de nuevo.",
    formspree_rejected: "Formspree no pudo aceptar esta solicitud. Tus respuestas siguen aquí; revisa el formulario e inténtalo de nuevo.",
    formspree_network_error: "No pudimos confirmar la recepción por un problema de conexión. Tus respuestas siguen aquí. Inténtalo de nuevo cuando la conexión esté estable.",
    invalid_application: "Revisa las respuestas señaladas antes de enviar.",
  }
  return (language === "en" ? en : es)[code] || (language === "en" ? en.formspree_rejected : es.formspree_rejected)
}

export function StartupApplicationForm({ language, formVisible, submissionEnabled, privacyNoticeUrl, openingSoon, openingNote, ticketUrl }: Props) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({ contact_language: language, pitch_language: language, ticket_email_same_as_application: "no", ticket_reference_unknown: "no" })
  const [selectedConnections, setSelectedConnections] = useState<Connection[]>([])
  const [sameTicketEmail, setSameTicketEmail] = useState(false)
  const [additionalOpen, setAdditionalOpen] = useState(false)
  const [openEvaluationGroups, setOpenEvaluationGroups] = useState<string[]>(["product"])
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [received, setReceived] = useState(false)
  const submitLock = useRef(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const t = language === "en"
  const label = (en: string, es: string) => t ? en : es
  const currentStepTitle = stepNames[language][step]

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [step])

  if (!formVisible) {
    return (
      <div className="dinamica-opening-card">
        <h3>{openingSoon}</h3>
        <p>{openingNote}</p>
        <a className="dinamica-button dinamica-button-primary" href={ticketUrl} target="_blank" rel="noreferrer">
          {label("Get Your DNS Ticket", "Consigue tu entrada DNS")}<ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    )
  }

  if (received) {
    return (
      <section className="dinamica-opening-card dinamica-application-receipt" role="status" aria-live="polite">
        <ShieldCheck size={25} aria-hidden="true" />
        <h3>{label("Application Received", "Solicitud recibida")}</h3>
        <p>{label("Thank you for applying to DINAMICA II.", "Gracias por participar en DINAMICA II.")}</p>
        <p>{label("The Digital Nomad Summit team has received your application and will review your ticket information and startup eligibility.", "El equipo de Digital Nomad Summit ha recibido tu solicitud y revisará la información de tu entrada y la elegibilidad de tu startup.")}</p>
        <p>{label("Your submission is pending verification. You will be contacted if additional information is required.", "Tu solicitud está pendiente de verificación. Nos comunicaremos contigo si necesitamos información adicional.")}</p>
        <p>{label("Submitting an application does not guarantee selection as a finalist.", "Enviar tu solicitud no garantiza la selección como finalista.")}</p>
      </section>
    )
  }

  const setValue = (name: string, value: string) => {
    setValues((current) => ({
      ...current,
      [name]: value,
      ...(name === "founder_email" && sameTicketEmail ? { representative_ticket_email: value } : {}),
    }))
    setFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setFormError("")
  }

  const updateConnections = (connection: Connection, checked: boolean) => {
    setSelectedConnections((current) => checked
      ? [...new Set([...current, connection])]
      : current.filter((item) => item !== connection))
    setFieldErrors((current) => {
      const next = { ...current }
      delete next.connections
      if (!checked) delete next[`connection_explanation_${connection}`]
      return next
    })
    setFormError("")
  }

  const payload = (): FormPayload => ({
    ...values,
    founder_phone: (values.founder_phone || "").replace(/[\s()-]/g, ""),
    representative_ticket_email: sameTicketEmail ? (values.founder_email || "") : (values.representative_ticket_email || ""),
    ticket_email_same_as_application: sameTicketEmail ? "yes" : "no",
    ticket_reference_unknown: values.ticket_reference_unknown || "no",
    connections: selectedConnections,
  })

  const validateStep = (index: number) => {
    const current = payload()
    const errors: FieldErrors = {}
    for (const name of requiredByStep[index]) {
      const value = current[name]
      if (typeof value !== "string" || !value.trim()) errors[name] = label("This field is required.", "Este campo es obligatorio.")
    }

    if (index === 0) {
      const founderEmail = String(current.founder_email || "")
      const founderPhone = String(current.founder_phone || "")
      const ticketEmail = String(current.representative_ticket_email || "")
      const ticketCategory = String(current.ticket_purchase_category || "")
      const ticketExplanation = String(current.ticket_reference_explanation || "")
      if (founderEmail && !/^\S+@\S+\.\S+$/.test(founderEmail)) errors.founder_email = label("Enter a valid email address.", "Escribe un correo electrónico válido.")
      if (founderPhone && !/^\+[1-9]\d{6,14}$/.test(founderPhone.replace(/[\s()-]/g, ""))) errors.founder_phone = label("Use international format, e.g. +1 809 555 0100.", "Usa el formato internacional, por ejemplo +1 809 555 0100.")
      if (ticketEmail && !/^\S+@\S+\.\S+$/.test(ticketEmail)) errors.representative_ticket_email = label("Enter a valid purchase email.", "Escribe un correo de compra válido.")
      if ((current.ticket_reference_unknown === "yes" || ticketCategory === "help_locating_confirmation") && !ticketExplanation.trim()) {
        errors.ticket_reference_explanation = label("Add a short note to help the team locate your confirmation.", "Añade una nota breve para ayudar al equipo a localizar tu confirmación.")
      }
    }

    if (index === 1) {
      if (!selectedConnections.length) errors.connections = label("Select at least one Dominican connection.", "Selecciona al menos un vínculo con República Dominicana.")
      for (const connection of selectedConnections) {
        const name = `connection_explanation_${connection}`
        if (!String(current[name] || "").trim()) errors[name] = label("Explain this connection briefly.", "Explica brevemente este vínculo.")
      }
      const profileUrl = String(current.startup_profile_url || "")
      const evidenceUrl = String(current.connection_evidence_url || "")
      const foundedYear = String(current.founded_year || "")
      const teamSizeValue = String(current.team_size || "")
      if (profileUrl && !isValidUrl(profileUrl)) errors.startup_profile_url = label("Enter a complete public URL.", "Escribe una URL pública completa.")
      if (evidenceUrl && !isValidUrl(evidenceUrl)) errors.connection_evidence_url = label("Enter a complete URL.", "Escribe una URL completa.")
      const year = Number(foundedYear)
      if (foundedYear && (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear())) errors.founded_year = label("Enter a valid founding year.", "Escribe un año de fundación válido.")
      const teamSize = Number(teamSizeValue)
      if (teamSizeValue && (!Number.isInteger(teamSize) || teamSize < 1)) errors.team_size = label("Enter a team size of at least 1.", "Escribe un tamaño de equipo de al menos 1.")
    }

    if (index === 2) {
      for (const name of ["startup_profile_url", "pitch_deck_url"]) {
        const value = String(current[name] || "")
        if (value && !isValidUrl(value)) errors[name] = label("Enter a complete URL.", "Escribe una URL completa.")
      }
      for (const group of evaluationGroups) {
        for (const name of group.fields) {
          const value = String(current[name] || "")
          if (value && value.length > getCharacterLimit(name)) errors[name] = label(`Keep this answer within ${getCharacterLimit(name)} characters.`, `Mantén esta respuesta dentro de ${getCharacterLimit(name)} caracteres.`)
        }
      }
    }

    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      if (index === 2) setOpenEvaluationGroups(evaluationGroups.filter((group) => group.fields.some((name) => errors[name])).map((group) => group.id))
      return false
    }
    return true
  }

  const goToStep = (index: number) => {
    setFormError("")
    setStep(Math.max(0, Math.min(3, index)))
  }

  const next = () => {
    if (!validateStep(step)) return
    goToStep(step + 1)
  }

  const toggleEvaluationGroup = (id: string) => {
    setOpenEvaluationGroups((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const submit = async () => {
    if (!submissionEnabled || submitLock.current) return
    if (!validateStep(3)) return

    const parsed = applicationSchema.safeParse(payload())
    if (!parsed.success) {
      const errors = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), label("Review this answer.", "Revisa esta respuesta.")]))
      const issueName = String(parsed.error.issues[0]?.path[0] || "")
      goToStep(issueName.startsWith("founder_") || issueName.startsWith("ticket_") || issueName === "representative_ticket_email" ? 0 : issueName.startsWith("startup_") || issueName.startsWith("connection_") || issueName === "connections" ? 1 : 2)
      setFieldErrors(errors)
      setFormError(errorText("invalid_application", language))
      return
    }

    submitLock.current = true
    setSubmitting(true)
    setFormError("")
    try {
      await sendDinamicaApplicationToFormspree(parsed.data as StartupApplication, language)
      setReceived(true)
    } catch (cause) {
      if (cause instanceof FormspreeSubmissionError && cause.fieldNames.length) {
        const providerErrors = Object.fromEntries(cause.fieldNames.map((name) => [name, label("Check this answer and try again.", "Revisa esta respuesta e inténtalo de nuevo.")]))
        setFieldErrors((current) => ({ ...current, ...providerErrors }))
        const fieldName = cause.fieldNames[0]
        goToStep(fieldName.startsWith("founder_") || fieldName.startsWith("ticket_") || fieldName === "representative_ticket_email" ? 0 : fieldName.startsWith("startup_") || fieldName.startsWith("connection_") || fieldName === "connections" ? 1 : fieldName.endsWith("_ack") || fieldName === "marketing_opt_in" ? 3 : 2)
      }
      setFormError(errorText(cause instanceof Error ? cause.message : "formspree_rejected", language))
    } finally {
      submitLock.current = false
      setSubmitting(false)
    }
  }

  const input = (name: string, fieldLabel: string, options: { required?: boolean; type?: string; maxLength?: number; placeholder?: string; autoComplete?: string; hint?: string; wide?: boolean; min?: number; max?: number }) => {
    const error = fieldErrors[name]
    const describedBy = error ? `${name}-error` : options.hint ? `${name}-hint` : undefined
    return (
      <label className={`dinamica-field${options.wide ? " dinamica-field-wide" : ""}`} htmlFor={name} key={name}>
        <span>{fieldLabel}{options.required && <b aria-hidden="true"> *</b>}</span>
        <input
          id={name}
          name={name}
          type={options.type || "text"}
          value={values[name] || ""}
          onChange={(event) => setValue(name, event.target.value)}
          required={options.required}
          maxLength={options.maxLength}
          placeholder={options.placeholder}
          autoComplete={options.autoComplete}
          min={options.min}
          max={options.max}
          aria-required={options.required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {error && <small className="dinamica-field-error" id={`${name}-error`}>{error}</small>}
        {!error && options.hint && <small className="dinamica-field-hint" id={`${name}-hint`}>{options.hint}</small>}
      </label>
    )
  }

  const select = (name: string, fieldLabel: string, options: Array<{ value: string; en: string; es: string }>, required = true) => {
    const error = fieldErrors[name]
    return (
      <label className="dinamica-field" htmlFor={name} key={name}>
        <span>{fieldLabel}{required && <b aria-hidden="true"> *</b>}</span>
        <select id={name} name={name} value={values[name] || ""} onChange={(event) => setValue(name, event.target.value)} required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined} aria-describedby={error ? `${name}-error` : undefined}>
          <option value="">{label("Choose one", "Selecciona una opción")}</option>
          {options.map((option) => <option value={option.value} key={option.value}>{option[language]}</option>)}
        </select>
        {error && <small className="dinamica-field-error" id={`${name}-error`}>{error}</small>}
      </label>
    )
  }

  const textarea = (name: string, fieldLabel: string, maxLength: number, options: { required?: boolean; hint?: string; rows?: number } = {}) => {
    const error = fieldErrors[name]
    const value = values[name] || ""
    return (
      <label className="dinamica-field dinamica-field-wide" htmlFor={name} key={name}>
        <span>{fieldLabel}{options.required && <b aria-hidden="true"> *</b>}</span>
        {options.hint && <small className="dinamica-field-hint">{options.hint}</small>}
        <textarea id={name} name={name} value={value} onChange={(event) => setValue(name, event.target.value)} rows={options.rows || 4} maxLength={maxLength} required={options.required} aria-required={options.required || undefined} aria-invalid={error ? true : undefined} aria-describedby={error ? `${name}-error` : undefined} />
        <span className="dinamica-field-meta">
          {error && <small className="dinamica-field-error" id={`${name}-error`}>{error}</small>}
          <small aria-live="polite">{value.length} / {maxLength}</small>
        </span>
      </label>
    )
  }

  const checkbox = (name: string, text: string, required = false) => {
    const error = fieldErrors[name]
    return (
      <label className={`dinamica-check-field${error ? " has-error" : ""}`} key={name}>
        <input id={name} name={name} type="checkbox" checked={values[name] === "yes"} onChange={(event) => setValue(name, event.target.checked ? "yes" : "")} required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined} aria-describedby={error ? `${name}-error` : undefined} />
        <span>{text}{required && <b aria-hidden="true"> *</b>}{error && <small className="dinamica-field-error" id={`${name}-error`}>{error}</small>}</span>
      </label>
    )
  }

  const country = (name: string, fieldLabel: string, required = true) => input(name, fieldLabel, {
    required,
    autoComplete: "country-name",
    placeholder: label("Start typing a country", "Escribe el nombre de un país"),
  })

  const summaryValue = (value: string | undefined) => value?.trim() || label("Not provided", "No indicado")
  const selectLabel = (name: string, choices: Array<{ value: string; en: string; es: string }>) => choices.find((choice) => choice.value === values[name])?.[language] || summaryValue(values[name])

  return (
    <form className="dinamica-form" onSubmit={(event) => { event.preventDefault(); void submit() }} noValidate>
      <nav className="dinamica-form-progress" aria-label={label("Application progress", "Progreso de la solicitud")}>
        <ol className="dinamica-form-progress-steps">
          {stepNames[language].map((name, index) => (
            <li key={name}>
              <button type="button" className={step === index ? "is-current" : step > index ? "is-complete" : ""} aria-label={`${index + 1}/4 · ${name}`} aria-current={step === index ? "step" : undefined} onClick={() => goToStep(index)}>
                <span>{index + 1}/4</span><span>{name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="dinamica-form-progress-track" aria-hidden="true"><span style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
      </nav>

      <div className="dinamica-form-step-content" key={step}>
        <h3 className="dinamica-form-step-title" tabIndex={-1} ref={headingRef}>{currentStepTitle}</h3>

        {step === 0 && <>
          <section className="dinamica-form-group" aria-labelledby="founder-group-title">
            <div className="dinamica-form-group-heading"><p>{label("FOUNDER", "FUNDADOR/A")}</p><h4 id="founder-group-title">{label("Your details", "Tus datos")}</h4></div>
            <div className="dinamica-form-grid">
              {input("founder_name", label("Full name", "Nombre completo"), { required: true, autoComplete: "name" })}
              {input("founder_email", label("Email", "Correo electrónico"), { required: true, type: "email", autoComplete: "email" })}
              {input("founder_phone", "WhatsApp", { required: true, type: "tel", autoComplete: "tel", placeholder: "+1 809 555 0100", hint: label("Include your international calling code.", "Incluye el código internacional del país.") })}
              {input("founder_role", label("Role", "Cargo"), { required: true, autoComplete: "organization-title", placeholder: label("Founder, co-founder, CEO…", "Fundador/a, cofundador/a, CEO…") })}
              {country("founder_origin_country", label("Country of origin", "País de origen"))}
              {country("founder_residence_country", label("Country of residence", "País de residencia"))}
              {input("founder_city", label("City of residence", "Ciudad de residencia"), { required: true, autoComplete: "address-level2" })}
              {select("contact_language", label("Contact language", "Idioma de contacto"), [{ value: "en", en: "English", es: "Inglés" }, { value: "es", en: "Spanish", es: "Español" }])}
              {select("pitch_language", label("Pitch language", "Idioma de presentación"), [{ value: "en", en: "English", es: "Inglés" }, { value: "es", en: "Spanish", es: "Español" }])}
            </div>
          </section>

          <section className="dinamica-form-group" aria-labelledby="ticket-group-title">
            <div className="dinamica-form-group-heading"><p>{label("TICKET", "ENTRADA")}</p><h4 id="ticket-group-title">{label("Your DNS ticket", "Tu entrada DNS")}</h4></div>
            <div className="dinamica-form-grid">
              {select("ticket_purchase_category", label("Which best describes your ticket?", "¿Cuál opción describe mejor tu entrada?"), [
                { value: "purchased_dns_2027", en: "I purchased a DNS 2027 ticket.", es: "Compré una entrada para DNS 2027." },
                { value: "pre_reschedule_ticket", en: "I have a ticket from before the event was rescheduled.", es: "Tengo una entrada de antes del cambio de fecha del evento." },
                { value: "help_locating_confirmation", en: "I need help locating my ticket confirmation.", es: "Necesito ayuda para localizar la confirmación de mi entrada." },
              ])}
              {select("ticket_type", label("Ticket type", "Tipo de entrada"), [
                { value: "general_admission", en: "General Admission", es: "Admisión general" },
                { value: "vip", en: "VIP", es: "VIP" },
                { value: "unknown_requires_review", en: "Not sure", es: "No estoy seguro/a" },
              ])}
              <div className="dinamica-field dinamica-field-wide">
                <label htmlFor="representative_ticket_email">{label("Email used to purchase", "Correo usado para comprar") } <b aria-hidden="true">*</b></label>
                <div className="dinamica-inline-check"><input id="ticket_email_same_as_application" name="ticket_email_same_as_application_ui" type="checkbox" checked={sameTicketEmail} onChange={(event) => {
                  const checked = event.target.checked
                  setSameTicketEmail(checked)
                  setValue("ticket_email_same_as_application", checked ? "yes" : "no")
                  if (checked) setValue("representative_ticket_email", values.founder_email || "")
                }} /><label htmlFor="ticket_email_same_as_application">{label("Same email as my application", "El mismo correo de mi solicitud")}</label></div>
                <input id="representative_ticket_email" name="representative_ticket_email" type="email" autoComplete="email" value={sameTicketEmail ? (values.founder_email || "") : (values.representative_ticket_email || "")} onChange={(event) => setValue("representative_ticket_email", event.target.value)} required aria-required="true" disabled={sameTicketEmail} aria-disabled={sameTicketEmail || undefined} aria-invalid={fieldErrors.representative_ticket_email ? true : undefined} aria-describedby={fieldErrors.representative_ticket_email ? "representative_ticket_email-error" : undefined} />
                {fieldErrors.representative_ticket_email && <small className="dinamica-field-error" id="representative_ticket_email-error">{fieldErrors.representative_ticket_email}</small>}
              </div>
              {input("ticket_reference", label("Ticket reference or confirmation number", "Referencia o número de confirmación"), { placeholder: label("If available", "Si está disponible"), hint: label("A reference helps the team verify your purchase.", "La referencia ayuda al equipo a verificar tu compra.") })}
              <label className="dinamica-inline-check dinamica-field-wide" htmlFor="ticket_reference_unknown"><input id="ticket_reference_unknown" name="ticket_reference_unknown" type="checkbox" checked={values.ticket_reference_unknown === "yes"} onChange={(event) => setValue("ticket_reference_unknown", event.target.checked ? "yes" : "no")} /><span>{label("I don't know the reference number", "No conozco la referencia")}</span></label>
              {(values.ticket_reference_unknown === "yes" || values.ticket_purchase_category === "help_locating_confirmation") && textarea("ticket_reference_explanation", label("What could help us locate it?", "¿Qué podría ayudarnos a localizarla?"), 300, { required: true, rows: 3, hint: label("For example, approximate purchase date or name used.", "Por ejemplo, fecha aproximada de compra o nombre utilizado.") })}
            </div>
          </section>
        </>}

        {step === 1 && <>
          <section className="dinamica-form-group" aria-labelledby="startup-group-title">
            <div className="dinamica-form-group-heading"><p>{label("STARTUP", "STARTUP")}</p><h4 id="startup-group-title">{label("Company details", "Datos de la empresa")}</h4></div>
            <div className="dinamica-form-grid">
              {input("startup_legal_name", label("Legal name", "Nombre legal"), { required: true, autoComplete: "organization" })}
              {input("startup_brand_name", label("Brand name, if different", "Nombre comercial, si es diferente"), { autoComplete: "organization" })}
              {country("incorporation_country", label("Country of incorporation", "País de constitución"))}
              {input("registration_proof", label("Registration number or proof of legal establishment", "Número de registro o prueba de constitución legal"), { required: true, hint: label("A number or a brief description is enough.", "Basta con el número o una descripción breve.") })}
              {input("startup_profile_url", label("Website or public profile", "Sitio web o perfil público"), { required: true, type: "url", placeholder: "https://" })}
              {input("founded_year", label("Year founded", "Año de fundación"), { required: true, type: "number", min: 1900, max: new Date().getFullYear(), placeholder: String(new Date().getFullYear()) })}
              {select("stage", label("Development stage", "Etapa de desarrollo"), [{ value: "pre-seed", en: "Pre-seed", es: "Pre-seed" }, { value: "seed", en: "Seed", es: "Seed" }, { value: "post-mvp", en: "Post-MVP", es: "Posterior al MVP" }])}
              {input("sector", label("Sector", "Sector"), { required: true, autoComplete: "organization-title" })}
              {input("operation_countries", label("Countries where you operate", "Países donde opera"), { required: true, placeholder: label("Dominican Republic, United States…", "República Dominicana, Estados Unidos…"), hint: label("Separate countries with commas.", "Separa los países con comas.") , wide: true})}
              {country("headquarters_country", label("Headquarters", "Sede principal"))}
              {input("team_size", label("Team size", "Tamaño del equipo"), { required: true, type: "number", min: 1, max: 100000 })}
              {textarea("company_description", label("Describe your company in one sentence", "Describe tu empresa en una oración"), 300, { required: true, rows: 3 })}
            </div>
          </section>

          <section className="dinamica-form-group dinamica-connection-options" aria-labelledby="connection-group-title">
            <div className="dinamica-form-group-heading"><p>{label("ELIGIBILITY", "ELEGIBILIDAD")}</p><h4 id="connection-group-title">{label("Your Connection to the Dominican Republic", "Tu vínculo con República Dominicana")}</h4><small>{label("Select at least one connection. A founder's passport or current address alone is not enough.", "Selecciona al menos un vínculo. El pasaporte o la dirección actual del fundador no bastan por sí solos.")}</small></div>
            {connections.map((connection) => {
              const checked = selectedConnections.includes(connection.value)
              const explanationName = `connection_explanation_${connection.value}`
              return (
                <div className={`dinamica-connection-choice${checked ? " is-selected" : ""}`} key={connection.value}>
                  <label className="dinamica-check-field" htmlFor={connection.value}>
                    <input id={connection.value} type="checkbox" checked={checked} onChange={(event) => updateConnections(connection.value, event.target.checked)} aria-invalid={fieldErrors.connections ? true : undefined} />
                    <span>{connection[language]}</span>
                  </label>
                  {checked && textarea(explanationName, label("Briefly explain this connection", "Explica brevemente este vínculo"), 400, { required: true, rows: 3 })}
                </div>
              )
            })}
            {fieldErrors.connections && <p className="dinamica-field-error" role="alert">{fieldErrors.connections}</p>}
            {selectedConnections.length > 0 && <div className="dinamica-conditional-evidence">{input("connection_evidence_url", label("Supporting link (optional)", "Enlace de respaldo (opcional)"), { type: "url", placeholder: "https://", hint: label("Share one public link relevant to the connection you selected.", "Comparte un enlace público relacionado con el vínculo seleccionado."), wide: true })}</div>}
          </section>
        </>}

        {step === 2 && <>
          <p className="dinamica-form-intro">{label("Keep each answer focused. The jury reviews all applications against the same published criteria.", "Responde de forma concreta. El jurado evalúa todas las solicitudes con los mismos criterios publicados.")}</p>
          <div className="dinamica-evaluation-groups">
            {evaluationGroups.map((group) => {
              const isOpen = openEvaluationGroups.includes(group.id)
              return (
                <section className="dinamica-evaluation-group" key={group.id}>
                  <button type="button" className="dinamica-disclosure" aria-expanded={isOpen} onClick={() => toggleEvaluationGroup(group.id)}>
                    <span>{group[language]}</span><ChevronDown size={17} aria-hidden="true" />
                  </button>
                  {isOpen && <div className="dinamica-form-grid dinamica-evaluation-fields">
                    {group.fields.map((name) => {
                      const specs: Record<string, { en: string; es: string; limit: number; hint?: { en: string; es: string } }> = {
                        customer_problem: { en: "What problem are you solving, and what is your product or service?", es: "¿Qué problema resuelves y cuál es tu producto o servicio?", limit: 500 },
                        innovation: { en: "What makes your solution innovative or meaningfully different?", es: "¿Qué hace innovadora o claramente diferente tu solución?", limit: 500 },
                        export_markets: { en: "Which export markets are you targeting, and how will you reach customers there?", es: "¿A qué mercados exportarás y cómo llegarás a esos clientes?", limit: 700 },
                        demand_evidence: { en: "What evidence shows demand? Share customers, pilots, revenue, or other proof.", es: "¿Qué evidencia demuestra la demanda? Comparte clientes, pilotos, ingresos u otra prueba.", limit: 500 },
                        scale_milestones: { en: "How can the startup scale, and what are the next 12-month milestones?", es: "¿Cómo puede escalar la startup y cuáles son sus próximos hitos de 12 meses?", limit: 500 },
                        impact_contribution: { en: "How does the startup contribute to digitalization, sustainability, or economic inclusion?", es: "¿Cómo contribuye la startup a la digitalización, sostenibilidad o inclusión económica?", limit: 400 },
                        team_capacity: { en: "What experience and capabilities help the founding team execute this plan?", es: "¿Qué experiencia y capacidades ayudan al equipo fundador a ejecutar este plan?", limit: 400 },
                        prize_use: { en: "How would you use the prize, and what measurable results would you achieve in six months?", es: "¿Cómo usarías el premio y qué resultados medibles lograrías en seis meses?", limit: 500 },
                      }
                      const spec = specs[name]
                      return textarea(name, spec[language], spec.limit, { required: true, rows: 4, hint: spec.hint?.[language] })
                    })}
                  </div>}
                </section>
              )
            })}
          </div>
          <section className="dinamica-form-group dinamica-pitch-deck" aria-labelledby="pitch-deck-title">
            <div className="dinamica-form-group-heading"><h4 id="pitch-deck-title">{label("Pitch deck", "Pitch deck")}</h4><small>{label("Required. Add a public link to a PDF or presentation.", "Obligatorio. Añade un enlace público a un PDF o presentación.")}</small></div>
            {input("pitch_deck_url", label("Pitch deck link", "Enlace al pitch deck"), { required: true, type: "url", placeholder: "https://", wide: true })}
          </section>
          <section className="dinamica-additional-info">
            <button type="button" className="dinamica-disclosure" aria-expanded={additionalOpen} onClick={() => setAdditionalOpen((open) => !open)}>
              <span>{label("Additional Information (Optional)", "Información adicional (opcional)")}</span><ChevronDown size={17} aria-hidden="true" />
            </button>
            {additionalOpen && <div className="dinamica-form-grid dinamica-form-grid-optional">
              {input("demo_url", label("Demo or video link", "Enlace a demo o video"), { type: "url", placeholder: "https://" })}
              {textarea("cofounders", label("Cofounder names and roles", "Nombres y cargos de cofundadores"), 1000, { rows: 3 })}
              {input("linkedin_url", label("Founder LinkedIn profile", "Perfil de LinkedIn del fundador/a"), { type: "url", placeholder: "https://" })}
              {input("customer_count_range", label("Customer count or range", "Cantidad o rango de clientes"), { placeholder: label("Optional", "Opcional") })}
              {input("monthly_revenue_range", label("Monthly revenue range", "Rango de ingresos mensuales"), { placeholder: label("Optional · you may skip", "Opcional · puedes omitirlo") })}
              {select("active_export_customers", label("Active export customers?", "¿Tiene clientes activos de exportación?"), [{ value: "yes", en: "Yes", es: "Sí" }, { value: "no", en: "No", es: "No" }, { value: "", en: "Prefer not to say", es: "Prefiero no responder" }], false)}
              {input("expected_market_entry", label("Expected market entry timing", "Fecha prevista de entrada al mercado"), { placeholder: label("Optional", "Opcional") })}
              {input("external_reference", label("External reference", "Referencia externa"), { type: "url", placeholder: "https://" })}
              {textarea("prior_funding", label("Previous DINAMICA II awards or funding", "Premios o fondos anteriores de DINAMICA II"), 500, { rows: 3 })}
              {textarea("conflicts", label("Potential conflicts or related affiliations", "Posibles conflictos o afiliaciones relacionadas"), 500, { rows: 3 })}
            </div>}
          </section>
        </>}

        {step === 3 && <>
          <section className="dinamica-review-summary" aria-labelledby="review-summary-title">
            <div className="dinamica-form-group-heading"><p>{label("SUMMARY", "RESUMEN")}</p><h4 id="review-summary-title">{label("Check your application", "Revisa tu solicitud")}</h4></div>
            <dl>
              <SummaryRow label={label("Applicant", "Participante")} value={summaryValue(values.founder_name)} onEdit={() => goToStep(0)} editLabel={label("Edit applicant details", "Editar datos del participante")} />
              <SummaryRow label={label("Startup", "Startup")} value={summaryValue(values.startup_legal_name)} onEdit={() => goToStep(1)} editLabel={label("Edit startup details", "Editar datos de la startup")} />
              <SummaryRow label={label("Country", "País")} value={summaryValue(values.incorporation_country)} onEdit={() => goToStep(1)} editLabel={label("Edit country", "Editar país")} />
              <SummaryRow label={label("Ticket situation", "Situación de la entrada")} value={selectLabel("ticket_purchase_category", [
                { value: "purchased_dns_2027", en: "Purchased a DNS 2027 ticket", es: "Compré una entrada DNS 2027" }, { value: "pre_reschedule_ticket", en: "Ticket from before rescheduling", es: "Entrada anterior al cambio de fecha" }, { value: "help_locating_confirmation", en: "Need help locating confirmation", es: "Necesito ayuda para localizar la confirmación" },
              ])} onEdit={() => goToStep(0)} editLabel={label("Edit ticket situation", "Editar situación de la entrada")} />
              <SummaryRow label={label("Ticket category", "Categoría de entrada")} value={selectLabel("ticket_type", [
                { value: "general_admission", en: "General Admission", es: "Admisión general" }, { value: "vip", en: "VIP", es: "VIP" }, { value: "unknown_requires_review", en: "Not sure", es: "No estoy seguro/a" },
              ])} onEdit={() => goToStep(0)} editLabel={label("Edit ticket details", "Editar datos de la entrada")} />
              <SummaryRow label={label("Purchase email", "Correo de compra")} value={summaryValue(sameTicketEmail ? values.founder_email : values.representative_ticket_email)} onEdit={() => goToStep(0)} editLabel={label("Edit purchase email", "Editar correo de compra")} />
              <SummaryRow label={label("Reference", "Referencia")} value={summaryValue(values.ticket_reference)} onEdit={() => goToStep(0)} editLabel={label("Edit ticket reference", "Editar referencia de entrada")} />
              <SummaryRow label={label("Pitch deck", "Pitch deck")} value={summaryValue(values.pitch_deck_url)} onEdit={() => goToStep(2)} editLabel={label("Edit pitch deck", "Editar pitch deck")} />
            </dl>
          </section>
          <section className="dinamica-form-group dinamica-declarations" aria-labelledby="declaration-title">
            <div className="dinamica-form-group-heading"><p>{label("DECLARATIONS", "DECLARACIONES")}</p><h4 id="declaration-title">{label("Required confirmations", "Confirmaciones obligatorias")}</h4></div>
            {checkbox("accuracy_ack", label("I confirm the information in this application is accurate.", "Confirmo que la información de esta solicitud es correcta."), true)}
            {checkbox("authority_ack", label("I am authorized to represent this startup in this application.", "Estoy autorizado/a para representar a esta startup en esta solicitud."), true)}
            {checkbox("judging_ack", label("I consent to eligibility screening and evaluation by the jury.", "Acepto la revisión de elegibilidad y la evaluación del jurado."), true)}
            {checkbox("selection_ack", label("I understand that a ticket or application does not guarantee finalist selection.", "Entiendo que tener una entrada o enviar una solicitud no garantiza ser finalista."), true)}
            {checkbox("winner_terms_ack", label("If selected for an award, I accept the reinvestment and reporting conditions.", "Si recibo un premio, acepto las condiciones de reinversión e informes."), true)}
            {checkbox("contact_ack", label("I agree to be contacted about this competition and my application.", "Acepto que me contacten sobre este concurso y mi solicitud."), true)}
            {checkbox("privacy_ack", label("I have read and accept the approved privacy notice, including review by authorized evaluators and delivery through Formspree.", "He leído y acepto el aviso de privacidad aprobado, incluida la revisión por evaluadores autorizados y el envío mediante Formspree."), true)}
            {privacyNoticeUrl && <p className="dinamica-form-privacy"><a href={privacyNoticeUrl} target="_blank" rel="noreferrer">{label("Read the approved privacy notice", "Leer el aviso de privacidad aprobado")}</a></p>}
            <div className="dinamica-marketing-opt-in">{checkbox("marketing_opt_in", label("I would also like to receive other DNS and Successment updates (optional).", "También quiero recibir otras novedades de DNS y Successment (opcional)."))}</div>
          </section>
          <p className="dinamica-form-privacy">{privacyNoticeUrl
            ? label("Your application details will be sent directly to the dedicated Formspree form and delivered to the organizer configured in that account. This submission confirms receipt for manual review only; it is not official registration or a guarantee of selection.", "Los datos de tu solicitud se enviarán directamente al formulario Formspree dedicado y llegarán al organizador configurado en esa cuenta. Este envío confirma la recepción para revisión manual; no es una inscripción oficial ni garantiza la selección.")
            : label("Submissions remain disabled until the approved privacy notice and dedicated Formspree form are configured.", "Los envíos seguirán deshabilitados hasta configurar el aviso de privacidad aprobado y el formulario dedicado de Formspree.")}</p>
        </>}
      </div>

      <div className="dinamica-form-actions">
        {step > 0 && <button type="button" className="dinamica-button dinamica-button-outline" onClick={() => goToStep(step - 1)}><ArrowLeft size={16} aria-hidden="true" />{label("Previous", "Anterior")}</button>}
        {step < 3
          ? <button type="button" className="dinamica-button dinamica-button-primary dinamica-form-next" onClick={next}>{label("Next", "Siguiente")}<ArrowRight size={16} aria-hidden="true" /></button>
          : <button type="submit" className="dinamica-button dinamica-button-primary dinamica-form-submit" disabled={submitting || !submissionEnabled} aria-describedby={!submissionEnabled ? "dinamica-submit-disabled" : undefined}>
            {submitting ? <LoaderCircle size={16} className="dinamica-spin" aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
            {submitting ? label("Sending…", "Enviando…") : label("Submit Application for Review", "Enviar solicitud para revisión")}
          </button>}
      </div>

      {!submissionEnabled && <p id="dinamica-submit-disabled" className="dinamica-form-note" role="note">{label("Applications are not accepting submissions yet. The complete form is available to review while the dedicated Formspree form, recipient, privacy notice, and launch approvals are finalized. Your answers are not saved when you leave this page.", "Todavía no se aceptan solicitudes. Puedes revisar el formulario completo mientras se finalizan el Formspree dedicado, el destinatario, el aviso de privacidad y las aprobaciones de lanzamiento. Tus respuestas no se guardan al salir de esta página.")}</p>}
      {formError && <p className="dinamica-form-error" role="alert" aria-live="assertive">{formError}</p>}
      <p className="dinamica-form-privacy">{label("Your application is reviewed manually. A valid ticket is required, but purchasing one does not guarantee finalist selection.", "Tu solicitud se revisará manualmente. Se requiere una entrada válida, pero comprarla no garantiza ser finalista.")}</p>
    </form>
  )
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

function getCharacterLimit(name: string) {
  const limits: Record<string, number> = { customer_problem: 500, innovation: 500, export_markets: 700, demand_evidence: 500, scale_milestones: 500, impact_contribution: 400, team_capacity: 400, prize_use: 500 }
  return limits[name] || 0
}

function SummaryRow({ label, value, onEdit, editLabel }: { label: string; value: string; onEdit: () => void; editLabel: string }) {
  return <div className="dinamica-summary-row"><dt>{label}</dt><dd>{value}</dd><button type="button" onClick={onEdit} aria-label={editLabel}>{editLabel}</button></div>
}
