"use client"

import Link from "next/link"
import { ArrowUpRight, Check, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  GENERAL_ADMISSION_TICKET_URL,
  VIP_TICKET_URL,
  trackTicketClick,
  type TicketType,
} from "@/lib/ticket-config"

/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4
 * Hallmark · redesign: ticket comparison · genre: editorial-premium · anchor: DNS coral
 * states: default · hover · focus · active · disabled · loading · error · success
 */

const content = {
  en: {
    label: "TICKETS · DNS 2027",
    title: "Choose Your Summit Experience",
    subtitle:
      "Join founders, investors, innovators, institutional leaders, and global professionals in Santo Domingo on April 8–9, 2027.",
    date: "April 8–9, 2027",
    venue: "Crowne Plaza Santo Domingo",
    accessLabel: "2027 Summit Access",
    premiumAccessLabel: "Premium 2027 Summit Access",
    note:
      "Existing General Admission and VIP registrations will automatically remain valid for the new event dates in accordance with our",
    terms: "Terms & Conditions",
    support: "Questions about an existing registration or ticket transfer?",
    tickets: [
      {
        type: "general_admission" as TicketType,
        eyebrow: "GENERAL ADMISSION",
        title: "General Admission",
        description:
          "Full access to Digital Nomad Summit Santo Domingo 2027, including keynotes, panels, networking sessions, and the summit experience at Crowne Plaza Santo Domingo.",
        benefits: [
          "Full Summit Access",
          "Keynotes and Panels",
          "Networking Sessions",
          "Access to the Expo Area",
          "April 8–9, 2027",
          "Crowne Plaza Santo Domingo",
        ],
        cta: "Get General Admission",
        url: GENERAL_ADMISSION_TICKET_URL,
        access: "2027 Summit Access",
        premium: false,
      },
      {
        type: "vip" as TicketType,
        eyebrow: "PREMIUM EXPERIENCE",
        title: "VIP Ticket",
        description:
          "Designed for founders, investors, executives, institutional leaders, and global operators seeking a more elevated summit experience.",
        benefits: [
          "Full Summit Access",
          "VIP Registration",
          "Priority Seating",
          "VIP Networking Opportunities",
          "VIP Breakfast",
          "Swag Bag",
        ],
        cta: "Get VIP Access",
        url: VIP_TICKET_URL,
        access: "Premium 2027 Summit Access",
        premium: true,
        badge: "Premium Access",
      },
    ],
  },
  es: {
    label: "TICKETS · DNS 2027",
    title: "Elige tu experiencia en el Summit",
    subtitle:
      "Únete a founders, inversionistas, innovadores, líderes institucionales y profesionales globales en Santo Domingo los días 8 y 9 de abril de 2027.",
    date: "8–9 de abril de 2027",
    venue: "Crowne Plaza Santo Domingo",
    accessLabel: "Acceso al Summit 2027",
    premiumAccessLabel: "Acceso premium al Summit 2027",
    note:
      "Todas las inscripciones existentes de Admisión General y VIP continuarán siendo válidas para las nuevas fechas, de conformidad con nuestros",
    terms: "Términos y Condiciones",
    support: "¿Tienes preguntas sobre una inscripción existente o una transferencia de boleto?",
    tickets: [
      {
        type: "general_admission" as TicketType,
        eyebrow: "ADMISIÓN GENERAL",
        title: "Admisión General",
        description:
          "Acceso completo al Digital Nomad Summit Santo Domingo 2027, incluyendo keynotes, paneles, sesiones de networking y la experiencia del Summit en Crowne Plaza Santo Domingo.",
        benefits: [
          "Acceso completo al Summit",
          "Keynotes y paneles",
          "Sesiones de networking",
          "Acceso al área de exhibición",
          "8–9 de abril de 2027",
          "Crowne Plaza Santo Domingo",
        ],
        cta: "Comprar Admisión General",
        url: GENERAL_ADMISSION_TICKET_URL,
        access: "Acceso al Summit 2027",
        premium: false,
      },
      {
        type: "vip" as TicketType,
        eyebrow: "EXPERIENCIA PREMIUM",
        title: "Entrada VIP",
        description:
          "Diseñada para founders, inversionistas, ejecutivos, líderes institucionales y operadores globales que buscan una experiencia más elevada.",
        benefits: [
          "Acceso completo al Summit",
          "Registro VIP",
          "Asientos prioritarios",
          "Oportunidades de networking VIP",
          "Desayuno VIP",
          "Swag bag",
        ],
        cta: "Comprar Acceso VIP",
        url: VIP_TICKET_URL,
        access: "Acceso premium al Summit 2027",
        premium: true,
        badge: "Acceso Premium",
      },
    ],
  },
}

export function Tickets() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section
      id="tickets"
      data-header-theme="white"
      aria-labelledby="tickets-title"
      className="relative w-full overflow-x-clip bg-white px-4 py-20 text-black sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <header className="grid min-w-0 max-w-4xl grid-cols-1 gap-5 border-b border-black/15 pb-10">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#D73535]">{t.label}</p>
          <div className="min-w-0">
            <h2
              id="tickets-title"
              className="min-w-0 [overflow-wrap:anywhere] font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.045em]"
            >
              {t.title}
            </h2>
            <p className="mt-5 max-w-3xl font-sans text-base leading-7 text-black/68 md:text-lg md:leading-8">
              {t.subtitle}
            </p>
          </div>
        </header>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
          {t.tickets.map((ticket) => (
            <article
              key={ticket.type}
              className={`group flex min-w-0 flex-col border p-6 sm:p-8 md:p-9 ${
                ticket.premium
                  ? "border-black bg-black text-white shadow-[0_18px_55px_rgba(0,0,0,0.16)]"
                  : "border-black/20 bg-[#F7F7F5] text-black"
              }`}
            >
              <div className="flex min-h-7 items-start justify-between gap-4">
                <p
                  className={`font-sans text-xs font-bold uppercase tracking-[0.18em] ${
                    ticket.premium ? "text-[#FF7777]" : "text-[#D73535]"
                  }`}
                >
                  {ticket.eyebrow}
                </p>
                {ticket.premium && ticket.badge ? (
                  <span className="shrink-0 border border-[#FF5757]/60 bg-[#FF5757]/10 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF8A8A]">
                    {ticket.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-7 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{ticket.title}</h3>
              <p className={`mt-3 font-sans text-sm font-semibold ${ticket.premium ? "text-white/70" : "text-black/58"}`}>
                {ticket.access}
              </p>
              <p className={`mt-6 min-h-24 font-sans text-sm leading-7 sm:text-base ${ticket.premium ? "text-white/72" : "text-black/68"}`}>
                {ticket.description}
              </p>

              <div className={`my-7 h-px ${ticket.premium ? "bg-white/16" : "bg-black/12"}`} aria-hidden="true" />

              <ul className="grid flex-1 content-start gap-4" aria-label={`${ticket.title} benefits`}>
                {ticket.benefits.map((benefit) => (
                  <li key={benefit} className="flex min-w-0 items-start gap-3 font-sans text-sm leading-6">
                    <Check className={`mt-0.5 size-4 shrink-0 ${ticket.premium ? "text-[#FF7777]" : "text-[#D73535]"}`} aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href={ticket.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ticket.cta} — opens Stripe Checkout in a new tab`}
                onClick={() =>
                  trackTicketClick({
                    ticketType: ticket.type,
                    sourcePage: "tickets_section",
                    language,
                    destinationUrl: ticket.url,
                  })
                }
                className={`mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D73535] active:translate-y-px ${
                  ticket.premium
                    ? "border-[#FF5757] bg-[#FF5757] text-white hover:bg-white hover:text-black"
                    : "border-black bg-black text-white hover:border-[#D73535] hover:bg-[#D73535]"
                }`}
              >
                {ticket.cta}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 border-t border-black/15 pt-7 font-sans text-sm leading-6 text-black/64 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-start md:gap-10">
          <p>
            {t.note}{" "}
            <Link
              href="/terms-and-conditions"
              className="whitespace-nowrap font-semibold text-[#C92F2F] underline decoration-[#C92F2F]/45 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D73535]"
            >
              {t.terms}
            </Link>
            .
          </p>
          <p className="md:text-right">
            {t.support}{" "}
            <a
              href="mailto:digitalnomadsummit@successment.co"
              className="inline-flex items-center gap-1.5 font-semibold text-black underline decoration-[#D73535]/45 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D73535]"
            >
              <Mail className="size-4 shrink-0 text-[#D73535]" aria-hidden="true" />
              digitalnomadsummit@successment.co
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
