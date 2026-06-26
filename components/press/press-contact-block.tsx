"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Check, Mail } from "lucide-react"

type PressContactBlockProps = {
  language: "en" | "es"
}

const content = {
  en: {
    eyebrow: "PRESS CONTACT",
    headline: "Media inquiries",
    body:
      "For interviews, institutional coverage, press credentials, or requests related to Digital Nomad Summit Santo Domingo 2026, contact the DNS team.",
    name: "Name",
    outlet: "Media Outlet",
    email: "Email",
    requestType: "Request Type",
    deadline: "Deadline",
    message: "Message",
    submit: "Send Inquiry",
    submitting: "Sending...",
    successTitle: "Inquiry received",
    success:
      "Thank you. The DNS team will review your media request and follow up shortly.",
    error:
      "There was a problem submitting your request. Please try again.",
    reset: "Send another inquiry",
    requestTypes: ["Interview Request", "Media Coverage", "Press Credentials", "Institutional Inquiry", "Other"],
  },
  es: {
    eyebrow: "CONTACTO DE PRENSA",
    headline: "Solicitudes de medios",
    body:
      "Para entrevistas, cobertura institucional, credenciales de prensa o solicitudes relacionadas con Digital Nomad Summit Santo Domingo 2026, contacta al equipo DNS.",
    name: "Nombre",
    outlet: "Medio",
    email: "Email",
    requestType: "Tipo de Solicitud",
    deadline: "Fecha Limite",
    message: "Mensaje",
    submit: "Enviar Solicitud",
    submitting: "Enviando...",
    successTitle: "Solicitud recibida",
    success:
      "Gracias. El equipo DNS revisara tu solicitud de medios y te contactara pronto.",
    error:
      "Hubo un problema al enviar tu solicitud. Intentalo de nuevo.",
    reset: "Enviar otra solicitud",
    requestTypes: ["Solicitud de Entrevista", "Cobertura de Medios", "Credenciales de Prensa", "Solicitud Institucional", "Otro"],
  },
}

export function PressContactBlock({ language }: PressContactBlockProps) {
  const t = content[language]
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white px-4 py-3 font-sans text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#FF5757] focus:ring-2 focus:ring-[#FF5757]/25"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("loading")

    const form = event.currentTarget
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
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="press-contact" className="scroll-mt-28 bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
        <div>
          <span className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">{t.headline}</h2>
          <p className="mt-6 max-w-xl font-sans text-lg leading-8 text-white/70">{t.body}</p>
          <a
            href="mailto:digitalnomadsummit@gmail.com"
            className="mt-8 inline-flex items-center gap-3 font-sans text-sm font-bold text-white transition-colors hover:text-[#FF5757]"
          >
            <Mail className="h-5 w-5 text-[#FF5757]" aria-hidden="true" />
            digitalnomadsummit@gmail.com
          </a>
        </div>

        <div>
          {status === "success" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white p-8 text-center text-black">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5757]/10 text-[#FF5757]">
                <Check className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-black">{t.successTitle}</h3>
              <p className="mt-3 max-w-md font-sans text-sm leading-6 text-black/60">{t.success}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-7 rounded-full border border-black/10 px-5 py-3 font-sans text-sm font-bold text-black transition-all hover:border-[#FF5757] hover:text-[#FF5757]"
              >
                {t.reset}
              </button>
            </div>
          ) : (
            <>
              {status === "error" && (
                <div className="mb-5 rounded-xl border border-[#FF5757]/25 bg-[#FF5757]/10 p-4 font-sans text-sm font-semibold text-white">
                  {t.error}
                </div>
              )}

              {/* TODO: Replace with dedicated press email when available. */}
              <form action="https://formspree.io/f/xwpdaprd" method="POST" onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="form_type" value="press_inquiry" />
                <input type="hidden" name="pagina_origen" value="press" />
                <input type="hidden" name="idioma_actual" value={language} />

                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.name}</span>
                  <input required name="name" className={fieldClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.outlet}</span>
                  <input required name="media_outlet" className={fieldClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.email}</span>
                  <input required type="email" name="email" className={fieldClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.requestType}</span>
                  <select required name="request_type" className={fieldClass}>
                    {t.requestTypes.map((requestType) => (
                      <option key={requestType} value={requestType}>
                        {requestType}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.deadline}</span>
                  <input type="date" name="deadline" className={fieldClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/50">{t.message}</span>
                  <textarea required name="message" rows={5} className={fieldClass} />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF5757] px-6 py-3 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                >
                  {status === "loading" ? t.submitting : t.submit}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
