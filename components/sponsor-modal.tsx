"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

// ─── Speaker application content ───────────────────────────────────────────
const speakerContent = {
  en: {
    title: "Apply to be a Speaker",
    intro:
      "We curate a select group of builders, operators, investors, and thinkers for the Digital Nomad Summit stage. Share your story and let us know why you belong on it.",
    submit: "Submit Application",
    submitting: "Submitting...",
    successTitle: "Application Received",
    successMsg:
      "Thank you for applying. Our team will review your submission and follow up if there's a match.",
    close: "Close",
    errorMsg: "There was a problem submitting your application. Please try again.",
    bottomNote: "We review all applications carefully. Selective. Curated. High-signal.",
    optionalPrompt: "(optional)",
    fields: {
      fullName: "Full Name",
      titleRole: "Title / Role",
      company: "Company / Organization",
      email: "Email Address",
      website: "Website",
      linkedin: "LinkedIn URL",
      instagram: "Instagram",
      topics: "Topics you speak about",
      bio: "Short Bio",
      whySpeak: "Why do you want to speak at DNS 2026?",
      sessionIdea: "Session idea or talk title",
      language: "Preferred language",
    },
    languageOptions: ["English", "Spanish", "Both"],
  },
  es: {
    title: "Postularse como Speaker",
    intro:
      "Reunimos un grupo selecto de constructores, operadores, inversores y pensadores para el escenario del Digital Nomad Summit. Comparte tu historia y dinos por qué mereces estar en él.",
    submit: "Enviar Postulación",
    submitting: "Enviando...",
    successTitle: "Postulación Recibida",
    successMsg:
      "Gracias por postularte. Nuestro equipo revisará tu solicitud y hará seguimiento si hay compatibilidad.",
    close: "Cerrar",
    errorMsg: "Hubo un problema al enviar tu postulación. Por favor intenta de nuevo.",
    bottomNote: "Revisamos todas las postulaciones con cuidado. Selectivo. Curado. Alta señal.",
    optionalPrompt: "(opcional)",
    fields: {
      fullName: "Nombre Completo",
      titleRole: "Cargo / Puesto",
      company: "Empresa / Organización",
      email: "Correo Electrónico",
      website: "Sitio Web",
      linkedin: "URL de LinkedIn",
      instagram: "Instagram",
      topics: "Temas sobre los que hablas",
      bio: "Bio Corta",
      whySpeak: "¿Por qué quieres hablar en DNS 2026?",
      sessionIdea: "Idea de sesión o título de la charla",
      language: "Idioma preferido",
    },
    languageOptions: ["Inglés", "Español", "Ambos"],
  },
}

const content = {
  en: {
    title: "DNS Sponsorship Inquiry Form",
    intro: "The Digital Nomad Summit partners with a select group of brands aligned with innovation, global mobility, and economic growth in the Caribbean. All inquiries are reviewed carefully by our team.",
    sections: {
      basic: "Basic Information",
      brand: "Brand Overview",
      interest: "Sponsorship Interest",
      alignment: "Alignment & Activation",
      investment: "Investment Range",
      timing: "Timing & Next Steps",
      final: "Final",
    },
    fields: {
      fullName: "Full Name",
      company: "Company / Organization Name",
      titleRole: "Title / Role",
      email: "Email Address",
      phone: "Phone Number",
      website: "Company Website",
      describe: "Briefly describe your company or brand",
      industry: "Primary industry",
      partnershipType: "What type of partnership are you interested in?",
      goals: "What are your primary goals for sponsoring DNS 2026?",
      goalsHelper: "Examples: Brand awareness, Market entry (DR / Caribbean), Lead generation, Thought leadership, Community engagement",
      aligning: "How do you see your brand aligning with the Digital Nomad Summit?",
      leading: "Are you interested in leading or participating in a curated session or conversation?",
      ideas: "Do you have any initial ideas for activations or presence at the summit?",
      investmentLevel: "What level of investment are you considering for sponsorship?",
      decisionMaker: "Are you the decision-maker for this partnership?",
      finalizeTimeline: "When are you looking to finalize sponsorship decisions?",
      anythingElse: "Is there anything else you’d like us to know?",
    },
    options: {
      industries: [
        "Tech",
        "Aviation",
        "CPG",
        "Finance",
        "Media",
        "Real Estate",
        "Tourism",
        "Mobility",
        "Government / Public Sector",
        "Other",
      ],
      partnershipTypes: [
        "Brand Visibility",
        "Thought Leadership (Speaking / Panels)",
        "Experiential Activation",
        "Content & Media Integration",
        "Strategic Partnership",
        "Not sure yet",
      ],
      leadingAnswers: ["Yes", "No", "Open to exploring"],
      investmentLevels: [
        "$5,000 – $10,000",
        "$10,000 – $25,000",
        "$25,000 – $50,000",
        "$50,000+",
        "Open / To be discussed",
      ],
      decisionMakerAnswers: ["Yes", "Part of the decision process", "No"],
      finalizeTimelines: [
        "Within 2 weeks",
        "Within 30 days",
        "Within 60 days",
        "Still exploring",
        "Not sure yet",
      ],
    },
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    successTitle: "Inquiry Received",
    successMsg: "Thank you for your interest. Our team will review your inquiry carefully and follow up with you shortly.",
    close: "Close",
    selectPlaceholder: "Select an option",
    optionalPrompt: "(optional)",
    errorMsg: "There was a problem submitting your inquiry. Please try again.",
    bottomNote: "Our team reviews inquiries carefully and follows up with aligned partners.",
  },
  es: {
    title: "Formulario de Solicitud de Patrocinio DNS",
    intro: "El Digital Nomad Summit se asocia con un selecto grupo de marcas alineadas con la innovación, la movilidad global y el crecimiento económico en el Caribe. Nuestro equipo revisa cuidadosamente todas las solicitudes.",
    sections: {
      basic: "Información Básica",
      brand: "Resumen de la Marca",
      interest: "Interés de Patrocinio",
      alignment: "Alineación y Activación",
      investment: "Rango de Inversión",
      timing: "Tiempos y Próximos Pasos",
      final: "Final",
    },
    fields: {
      fullName: "Nombre Completo",
      company: "Nombre de la Empresa / Organización",
      titleRole: "Cargo / Puesto",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      website: "Sitio Web de la Empresa",
      describe: "Describe brevemente tu empresa o marca",
      industry: "Industria Principal",
      partnershipType: "¿En qué tipo de alianza estás interesado?",
      goals: "¿Cuáles son tus objetivos principales al patrocinar DNS 2026?",
      goalsHelper: "Ejemplos: Reconocimiento de marca, Ingreso al mercado (RD / Caribe), Generación de leads, Liderazgo de pensamiento, Participación comunitaria",
      aligning: "¿Cómo ves que tu marca se alinea con el Digital Nomad Summit?",
      leading: "¿Estás interesado en liderar o participar en una sesión curada o panel?",
      ideas: "¿Tienes alguna idea inicial para activaciones o presencia en la cumbre?",
      investmentLevel: "¿Qué nivel de inversión estás considerando para el patrocinio?",
      decisionMaker: "¿Eres el responsable de la toma de decisiones para esta alianza?",
      finalizeTimeline: "¿Cuándo esperas concretar la decisión de patrocinio?",
      anythingElse: "¿Hay algo más que te gustaría que supiéramos?",
    },
    options: {
      industries: [
        "Tecnología",
        "Aviación",
        "CPG",
        "Finanzas",
        "Medios de Comunicación",
        "Bienes Raíces",
        "Turismo",
        "Movilidad",
        "Gobierno / Sector Público",
        "Otro",
      ],
      partnershipTypes: [
        "Visibilidad de Marca",
        "Liderazgo (Oratorias / Paneles)",
        "Activación Experiencial",
        "Integración de Contenido y Medios",
        "Alianza Estratégica",
        "Aún no estoy seguro",
      ],
      leadingAnswers: ["Sí", "No", "Abierto a explorar"],
      investmentLevels: [
        "$5,000 – $10,000",
        "$10,000 – $25,000",
        "$25,000 – $50,000",
        "$50,000+",
        "Abierto / A discutir",
      ],
      decisionMakerAnswers: ["Sí", "Parte del proceso de decisión", "No"],
      finalizeTimelines: [
        "Dentro de 2 semanas",
        "Dentro de 30 días",
        "Dentro de 60 días",
        "Sigo explorando",
        "Aún no estoy seguro",
      ],
    },
    submit: "Enviar Solicitud",
    submitting: "Enviando...",
    successTitle: "Solicitud Recibida",
    successMsg: "Gracias por tu interés. Nuestro equipo revisará tu solicitud detenidamente y te contactará en breve.",
    close: "Cerrar",
    selectPlaceholder: "Selecciona una opción",
    optionalPrompt: "(opcional)",
    errorMsg: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.",
    bottomNote: "Nuestro equipo revisa meticulosamente las solicitudes y da seguimiento a los socios alineados.",
  },
}

// ─── Speaker Application Form ────────────────────────────────────────────────
export function SpeakerForm({
  onClose,
  isModal = false,
}: {
  onClose?: () => void
  isModal?: boolean
}) {
  const { language } = useLanguage()
  const t = speakerContent[language]
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center h-full animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-[#FF5757]/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#FF5757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">{t.successTitle}</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">{t.successMsg}</p>
        <Button
          onClick={() => { if (isModal && onClose) onClose(); else setStatus("idle") }}
          className="bg-[#FF5757] hover:bg-white text-white hover:text-[#FF5757] border border-transparent hover:border-[#FF5757] font-semibold py-3 px-8 rounded-lg transition-all duration-300"
        >
          {t.close}
        </Button>
      </div>
    )
  }

  const labelClass = "block text-sm font-semibold text-gray-900 mb-2"
  const inputClass = "w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 text-gray-900 focus:bg-white focus:outline-none focus:border-[#FF5757] focus:ring-2 focus:ring-[#FF5757]/20 transition-all duration-200"

  return (
    <div className={`p-6 md:p-10 ${!isModal ? "bg-white rounded-2xl shadow-sm border border-gray-100" : ""}`}>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t.title}</h2>
      <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-3xl">{t.intro}</p>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium">{t.errorMsg}</div>
      )}

      <form action="https://formspree.io/f/xwpdaprd" method="POST" onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="form_type" value="speaker_application" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="sp-fullName" className={labelClass}>{t.fields.fullName} <span className="text-red-500">*</span></label>
            <input type="text" id="sp-fullName" name="fullName" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-titleRole" className={labelClass}>{t.fields.titleRole} <span className="text-red-500">*</span></label>
            <input type="text" id="sp-titleRole" name="titleRole" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-company" className={labelClass}>{t.fields.company} <span className="text-red-500">*</span></label>
            <input type="text" id="sp-company" name="company" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-email" className={labelClass}>{t.fields.email} <span className="text-red-500">*</span></label>
            <input type="email" id="sp-email" name="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-website" className={labelClass}>{t.fields.website} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span></label>
            <input type="url" id="sp-website" name="website" placeholder="https://" className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-linkedin" className={labelClass}>{t.fields.linkedin} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span></label>
            <input type="url" id="sp-linkedin" name="linkedin" placeholder="https://linkedin.com/in/" className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-instagram" className={labelClass}>{t.fields.instagram} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span></label>
            <input type="text" id="sp-instagram" name="instagram" placeholder="@handle" className={inputClass} />
          </div>
          <div>
            <label htmlFor="sp-language" className={labelClass}>{t.fields.language} <span className="text-red-500">*</span></label>
            <div className="relative">
              <select id="sp-language" name="language" required defaultValue="" className={`${inputClass} appearance-none pr-10`}>
                <option value="" disabled>—</option>
                {t.languageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="sp-topics" className={labelClass}>{t.fields.topics} <span className="text-red-500">*</span></label>
          <input type="text" id="sp-topics" name="topics" required placeholder="e.g. Remote Work, Web3, Innovation" className={inputClass} />
        </div>

        <div>
          <label htmlFor="sp-sessionIdea" className={labelClass}>{t.fields.sessionIdea} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span></label>
          <input type="text" id="sp-sessionIdea" name="session_idea" className={inputClass} />
        </div>

        <div>
          <label htmlFor="sp-bio" className={labelClass}>{t.fields.bio} <span className="text-red-500">*</span></label>
          <textarea id="sp-bio" name="bio" rows={3} required className={`${inputClass} resize-y`} />
        </div>

        <div>
          <label htmlFor="sp-whySpeak" className={labelClass}>{t.fields.whySpeak} <span className="text-red-500">*</span></label>
          <textarea id="sp-whySpeak" name="why_speak" rows={4} required className={`${inputClass} resize-y`} />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#FF5757] hover:bg-white text-white hover:text-[#FF5757] border border-transparent hover:border-[#FF5757] font-bold py-4 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t.submitting}</span>
              </span>
            ) : t.submit}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">{t.bottomNote}</p>
        </div>
      </form>
    </div>
  )
}

// ─── Sponsor Application Form (original, unchanged) ───────────────────────────
export function SponsorForm({
  onClose,
  isModal = false,
}: {
  onClose?: () => void
  isModal?: boolean
}) {
  const { language } = useLanguage()
  const t = content[language]

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center h-full animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-[#FF5757]/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#FF5757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          {t.successTitle}
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">{t.successMsg}</p>
        <Button
          onClick={() => {
            if (isModal && onClose) onClose()
            else setStatus("idle")
          }}
          className="bg-[#FF5757] hover:bg-white text-white hover:text-[#FF5757] border border-transparent hover:border-[#FF5757] font-semibold py-3 px-8 rounded-lg transition-all duration-300"
        >
          {t.close}
        </Button>
      </div>
    )
  }

  // Label and Input consistent styling
  const labelClass = "block text-sm font-semibold text-gray-900 mb-2"
  const inputClass =
    "w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 text-gray-900 focus:bg-white focus:outline-none focus:border-[#FF5757] focus:ring-2 focus:ring-[#FF5757]/20 transition-all duration-200"

  return (
    <div className={`p-6 md:p-10 ${!isModal ? "bg-white rounded-2xl shadow-sm border border-gray-100" : ""}`}>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        {t.title}
      </h2>
      <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-3xl">{t.intro}</p>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium">
          {t.errorMsg}
        </div>
      )}

      <form action="https://formspree.io/f/xwpdaprd" method="POST" onSubmit={handleSubmit} className="space-y-12">
        {/* --- SECTION 1: BASIC INFORMATION --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.basic}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                {t.fields.fullName} <span className="text-red-500">*</span>
              </label>
              <input type="text" id="fullName" name="fullName" required className={inputClass} suppressHydrationWarning />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>
                {t.fields.company} <span className="text-red-500">*</span>
              </label>
              <input type="text" id="company" name="company" required className={inputClass} suppressHydrationWarning />
            </div>
            <div>
              <label htmlFor="titleRole" className={labelClass}>
                {t.fields.titleRole} <span className="text-red-500">*</span>
              </label>
              <input type="text" id="titleRole" name="titleRole" required className={inputClass} suppressHydrationWarning />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                {t.fields.email} <span className="text-red-500">*</span>
              </label>
              <input type="email" id="email" name="email" required className={inputClass} suppressHydrationWarning />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                {t.fields.phone} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span>
              </label>
              <input type="tel" id="phone" name="phone" className={inputClass} suppressHydrationWarning />
            </div>
            <div>
              <label htmlFor="website" className={labelClass}>
                {t.fields.website} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span>
              </label>
              <input type="url" id="website" name="website" placeholder="https://" className={inputClass} />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: BRAND OVERVIEW --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.brand}
          </h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="describe" className={labelClass}>
                {t.fields.describe} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="describe"
                name="brand_description"
                rows={2}
                required
                className={`${inputClass} resize-y`}
              />
            </div>
            <div>
              <label htmlFor="industry" className={labelClass}>
                {t.fields.industry} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="industry"
                  name="primary_industry"
                  required
                  className={`${inputClass} appearance-none pr-10`}
                  defaultValue=""
                  suppressHydrationWarning
                >
                  <option value="" disabled>
                    {t.selectPlaceholder}
                  </option>
                  {t.options.industries.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: SPONSORSHIP INTEREST --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.interest}
          </h3>
          <fieldset className="space-y-6">
            <div>
              <span className={labelClass}>{t.fields.partnershipType}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {t.options.partnershipTypes.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="partnership_interest[]"
                      value={opt}
                      className="w-5 h-5 text-[#FF5757] border-gray-300 rounded focus:ring-[#FF5757]/20"
                    />
                    <span className="text-sm text-gray-800 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="goals" className={labelClass}>
                {t.fields.goals} <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">{t.fields.goalsHelper}</p>
              <textarea id="goals" name="sponsorship_goals" rows={3} required className={inputClass} />
            </div>
          </fieldset>
        </section>

        {/* --- SECTION 4: ALIGNMENT & ACTIVATION --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.alignment}
          </h3>
          <fieldset className="space-y-6">
            <div>
              <label htmlFor="aligning" className={labelClass}>
                {t.fields.aligning} <span className="text-red-500">*</span>
              </label>
              <textarea id="aligning" name="brand_alignment" rows={3} required className={inputClass} />
            </div>

            <div>
              <span className={labelClass}>
                {t.fields.leading} <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-col sm:flex-row gap-4 mt-3">
                {t.options.leadingAnswers.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="interested_in_leading"
                      value={opt}
                      required
                      className="w-4 h-4 text-[#FF5757] border-gray-300 focus:ring-[#FF5757]/20"
                    />
                    <span className="text-sm text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="ideas" className={labelClass}>
                {t.fields.ideas} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span>
              </label>
              <textarea id="ideas" name="activation_ideas" rows={2} className={inputClass} />
            </div>
          </fieldset>
        </section>

        {/* --- SECTION 5: INVESTMENT RANGE --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.investment}
          </h3>
          <fieldset className="space-y-4">
            <legend className={labelClass}>{t.fields.investmentLevel}</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {t.options.investmentLevels.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="investment_range"
                    value={opt}
                    required
                    className="w-4 h-4 text-[#FF5757] border-gray-300 focus:ring-[#FF5757]/20"
                    suppressHydrationWarning
                  />
                  <span className="text-sm text-gray-800 font-medium">{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* --- SECTION 6: TIMING & NEXT STEPS --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.timing}
          </h3>
          <fieldset className="space-y-6">
            <div>
              <span className={labelClass}>
                {t.fields.decisionMaker} <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-col sm:flex-row gap-4 mt-3">
                {t.options.decisionMakerAnswers.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is_decision_maker"
                      value={opt}
                      required
                      className="w-4 h-4 text-[#FF5757] border-gray-300 focus:ring-[#FF5757]/20"
                    />
                    <span className="text-sm text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="finalizeTimeline" className={labelClass}>
                {t.fields.finalizeTimeline} <span className="text-red-500">*</span>
              </label>
              <div className="relative md:w-1/2">
                <select
                  id="finalizeTimeline"
                  name="finalize_timeline"
                  required
                  className={`${inputClass} appearance-none pr-10`}
                  defaultValue=""
                  suppressHydrationWarning
                >
                  <option value="" disabled>
                    {t.selectPlaceholder}
                  </option>
                  {t.options.finalizeTimelines.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </fieldset>
        </section>

        {/* --- SECTION 7: FINAL --- */}
        <section>
          <h3 className="font-display text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
            {t.sections.final}
          </h3>
          <div>
            <label htmlFor="anythingElse" className={labelClass}>
              {t.fields.anythingElse} <span className="text-gray-400 font-normal">{t.optionalPrompt}</span>
            </label>
            <textarea id="anythingElse" name="additional_info" rows={3} className={inputClass} />
          </div>
        </section>

        <div className="pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#FF5757] hover:bg-white text-white hover:text-[#FF5757] border border-transparent hover:border-[#FF5757] font-bold py-4 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group relative"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white group-hover:text-[#FF5757]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t.submitting}
              </span>
            ) : (
              t.submit
            )}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">{t.bottomNote}</p>
        </div>
      </form>
    </div>
  )
}

interface SponsorModalProps {
  isOpen: boolean
  onClose: () => void
  /** When "speaker", opens the speaker application form instead of the sponsor form */
  variant?: "sponsor" | "speaker"
}

export function SponsorModal({ isOpen, onClose, variant = "sponsor" }: SponsorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[800px] bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button sticky top */}
        <div className="sticky top-0 z-20 flex justify-end p-4 pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 shadow-sm transition-all duration-200 border border-gray-100"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Outer container negative margin to lift up under sticky close button */}
        <div className="-mt-14">
          {variant === "speaker" ? (
            <SpeakerForm onClose={onClose} isModal={true} />
          ) : (
            <SponsorForm onClose={onClose} isModal={true} />
          )}
        </div>
      </div>
    </div>
  )
}
