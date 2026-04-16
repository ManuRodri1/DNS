"use client"

import { useLanguage } from "@/lib/language-context"
import { Pill } from "@/components/pill"

const content = {
  en: {
    badge: "Limited Availability · Secure Your Spot Early",
    title: "Tickets & Passes",
    subtitle: "Choose your experience for DNS 2026 in Santo Domingo.",
    tickets: [
      {
        title: "Early Bird",
        price: "$99",
        description: "Limited-time offer for early decision-makers. Secure your pass at the best price.",
        benefits: ["Full Summit Access", "Keynotes & Panels", "Networking Sessions"],
        ctaText: "Buy Early Bird",
        ctaLink: "https://buy.stripe.com/5kQ9AT4fL1kf5HM7Ee8EM06",
        highlight: false,
      },
      {
        title: "General Admission",
        price: "$149",
        description: "The standard pass for attendees seeking the full DNS experience.",
        benefits: ["Full Summit Access", "Keynotes & Panels", "Networking Sessions", "Access to Expo Area"],
        ctaText: "Buy General Admission",
        ctaLink: "https://buy.stripe.com/fZubJ127De71eei4s28EM05",
        highlight: false,
      },
      {
        title: "VIP Ticket",
        price: "$399",
        description:
          "Designed for leaders, founders, investors and global operators who want the premium DNS experience.",
        benefits: [
          "Full Summit Access",
          "VIP Breakfast",
          "Dinner on the Malecón",
          "Swag Bag",
          "Priority Seating",
          "VIP Registration",
        ],
        ctaText: "Buy VIP Ticket",
        ctaLink: "https://buy.stripe.com/9B67sL3bH9QLc6af6G8EM04",
        highlight: true,
        highlightLabel: "Most Exclusive",
      },
    ],
  },
  es: {
    badge: "Disponibilidad Limitada · Asegura Tu Lugar Ahora",
    title: "Tickets y Pases",
    subtitle: "Elige tu experiencia para DNS 2026 en Santo Domingo.",
    tickets: [
      {
        title: "Early Bird",
        price: "$99",
        description: "Oferta limitada para quienes toman decisiones tempranas. Asegura tu pase al mejor precio.",
        benefits: ["Acceso Completo al Summit", "Keynotes y Paneles", "Sesiones de Networking"],
        ctaText: "Comprar Early Bird",
        ctaLink: "https://buy.stripe.com/5kQ9AT4fL1kf5HM7Ee8EM06",
        highlight: false,
      },
      {
        title: "Admisión General",
        price: "$149",
        description: "El pase estándar para asistentes que buscan la experiencia completa DNS.",
        benefits: ["Acceso Completo al Summit", "Keynotes y Paneles", "Sesiones de Networking", "Acceso al Área Expo"],
        ctaText: "Comprar Admisión General",
        ctaLink: "https://buy.stripe.com/fZubJ127De71eei4s28EM05",
        highlight: false,
      },
      {
        title: "Ticket VIP",
        price: "$399",
        description:
          "Diseñado para líderes, fundadores, inversores y operadores globales que desean la experiencia premium DNS.",
        benefits: [
          "Acceso Completo al Summit",
          "Desayuno VIP",
          "Cena en el Malecón",
          "Swag Bag",
          "Asientos Prioritarios",
          "Registro VIP",
        ],
        ctaText: "Comprar Ticket VIP",
        ctaLink: "https://buy.stripe.com/9B67sL3bH9QLc6af6G8EM04",
        highlight: true,
        highlightLabel: "Más Exclusivo",
      },
    ],
  },
}

export function Tickets() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="tickets" data-header="dark" className="relative w-full overflow-hidden bg-white py-32">
      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Pill className="mb-6 bg-black/5 text-black border-black/10 font-display">{t.badge}</Pill>
        <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl lg:text-6xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-black/70 md:text-xl font-display">
          {t.subtitle}
        </p>
      </div>

      {/* Ticket Cards Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.tickets.map((ticket, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl border border-gray-200 p-8 shadow-lg transition-all duration-500 hover:border-[#FF5757]/50 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-[rgba(245,245,245,1)]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Highlight Badge */}
              {ticket.highlight && (
                <div className="absolute -top-3 right-6 rounded-full bg-[#FF5757] px-4 py-1 text-xs font-semibold text-white shadow-lg font-display">
                  {ticket.highlightLabel}
                </div>
              )}

              {/* Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5757]/20 transition-all duration-500 group-hover:bg-[#FF5757]/30 group-hover:shadow-[0_0_20px_rgba(255,87,87,0.4)]">
                <svg
                  className="h-6 w-6 text-[#FF5757]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>

              {/* Title & Price */}
              <h3 className="font-display text-2xl font-bold text-black md:text-3xl">{ticket.title}</h3>
              <div className="mt-2 mb-4">
                <span className="font-display text-4xl font-bold text-[#FF5757] md:text-5xl">{ticket.price}</span>
              </div>

              {/* Description */}
              <p className="mb-6 text-balance text-black/70 leading-relaxed font-display">{ticket.description}</p>

              {/* Benefits List */}
              <ul className="mb-8 space-y-3 flex-grow">
                {ticket.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/80 font-display">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF5757]/20">
                      <svg className="h-3 w-3 text-[#FF5757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={ticket.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-md px-8 py-3 text-sm font-semibold transition-all duration-300 bg-[#FF5757] text-white hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] font-display"
              >
                {ticket.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
