"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ExternalLink, MapPin, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  EVENT_CONTACT_EMAIL,
  EVENT_CONTACT_MAILTO,
  EVENT_DATE_EN,
  EVENT_DATE_ES,
  VENUE_MAP_URL,
  VENUE_NAME,
  VENUE_TOUR_URL,
} from "@/lib/event-config"

const STORAGE_KEY = "dns-event-update-2027-v1"

const content = {
  en: {
    eyebrow: "IMPORTANT EVENT UPDATE",
    title: "An Important Update from Digital Nomad Summit Santo Domingo",
    paragraphs: [
      "At Digital Nomad Summit Santo Domingo, our commitment has always been to deliver an exceptional experience that brings together entrepreneurs, innovators, investors, business leaders, policymakers, and global professionals to shape the future of innovation and economic development in the Dominican Republic and the Caribbean.",
      `After careful consideration, we have made the strategic decision to reschedule the inaugural Digital Nomad Summit Santo Domingo. The summit will now take place ${EVENT_DATE_EN}, at the ${VENUE_NAME}.`,
      "This additional planning period will allow us to further strengthen our programming, expand international participation, and create even greater opportunities for learning, collaboration, and meaningful connections.",
    ],
    sectionTitle: "What You Need to Know",
    dateLabel: "New Event Dates",
    venueLabel: "New Venue",
    continuation: [
      "All existing General Admission and VIP registrations will automatically be honored for the new event dates in accordance with our Terms & Conditions.",
      "We sincerely appreciate the continued support of our speakers, sponsors, partners, media, volunteers, creators, and attendees.",
      `We look forward to welcoming you to Digital Nomad Summit Santo Domingo on ${EVENT_DATE_EN}.`,
    ],
    transfer: "If you need to request a ticket transfer, please contact:",
    continue: "Continue to Site",
    tour: "Tour the Hotel",
    location: "View Location",
    close: "Close event update",
    newTab: "opens in a new tab",
  },
  es: {
    eyebrow: "ACTUALIZACIÓN IMPORTANTE DEL EVENTO",
    title: "Una actualización importante de Digital Nomad Summit Santo Domingo",
    paragraphs: [
      "En Digital Nomad Summit Santo Domingo, nuestro compromiso siempre ha sido ofrecer una experiencia excepcional que reúna a emprendedores, innovadores, inversionistas, líderes empresariales, responsables de políticas públicas y profesionales globales para dar forma al futuro de la innovación y el desarrollo económico en la República Dominicana y el Caribe.",
      `Después de una cuidadosa consideración, hemos tomado la decisión estratégica de reprogramar la edición inaugural de Digital Nomad Summit Santo Domingo. El summit ahora se celebrará los días 8 y 9 de abril de 2027 en ${VENUE_NAME}.`,
      "Este período adicional de planificación nos permitirá fortalecer aún más nuestra programación, ampliar la participación internacional y crear mayores oportunidades de aprendizaje, colaboración y conexiones significativas.",
    ],
    sectionTitle: "Lo que debes saber",
    dateLabel: "Nuevas fechas",
    venueLabel: "Nueva sede",
    continuation: [
      "Todas las inscripciones existentes de Admisión General y VIP serán reconocidas automáticamente para las nuevas fechas, de conformidad con nuestros Términos y Condiciones.",
      "Agradecemos sinceramente el apoyo continuo de nuestros speakers, patrocinadores, aliados, medios, voluntarios, creadores y asistentes.",
      "Esperamos darte la bienvenida a Digital Nomad Summit Santo Domingo los días 8 y 9 de abril de 2027.",
    ],
    transfer: "Para solicitar una transferencia de boleto, comunícate con:",
    continue: "Continuar al sitio",
    tour: "Recorrer el hotel",
    location: "Ver ubicación",
    close: "Cerrar actualización del evento",
    newTab: "abre en una pestaña nueva",
  },
}

export function EventUpdateModal() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const t = content[language]

  const close = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "dismissed")
    setIsOpen(false)
    window.setTimeout(() => previousFocusRef.current?.focus(), 0)
  }, [])

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const dialog = dialogRef.current
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    focusable()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== "Tab") return

      const elements = focusable()
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [close, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-update-title"
        aria-describedby="event-update-description"
        className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0a] text-white shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0a0a0a]/95 px-5 py-5 backdrop-blur md:px-8">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.eyebrow}</p>
            <h2 id="event-update-title" className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight md:text-3xl">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="shrink-0 rounded-full border border-white/15 p-2 text-white transition hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overscroll-contain overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          <div id="event-update-description" className="space-y-4 font-sans text-sm leading-7 text-white/75 md:text-base">
            {t.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <h3 className="mt-8 font-display text-xl font-bold">{t.sectionTitle}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#FF5757]/30 bg-[#FF5757]/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF5757]">{t.dateLabel}</p>
              <p className="mt-2 font-display text-xl font-bold">{language === "es" ? EVENT_DATE_ES : EVENT_DATE_EN}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">{t.venueLabel}</p>
              <p className="mt-2 font-display text-xl font-bold">{VENUE_NAME}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 font-sans text-sm leading-7 text-white/75 md:text-base">
            <p>{t.continuation[0]}</p>
            <p>
              {t.transfer}{" "}
              <a href={EVENT_CONTACT_MAILTO} className="break-all font-semibold text-[#FF5757] underline underline-offset-4">
                {EVENT_CONTACT_EMAIL}
              </a>
            </p>
            {t.continuation.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-[#FF5757] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.continue}
            </button>
            <a
              href={VENUE_TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.tour} — ${VENUE_NAME} (${t.newTab})`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]"
            >
              {t.tour}<ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.location} — ${VENUE_NAME} (${t.newTab})`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]"
            >
              {t.location}<MapPin className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
