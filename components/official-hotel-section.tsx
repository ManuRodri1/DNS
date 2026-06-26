"use client"

import { ArrowRight, BadgeCheck, Building2, Dumbbell, MapPin, UsersRound, Waves } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const bookingLink = "https://www.cataloniahotels.com/en/pages/digital-nomad-summit-2026"

const content = {
  en: {
    eyebrow: "Official Summit Hotel",
    headline: "Your DNS Home Base at Hotel Catalonia Santo Domingo",
    body: [
      "Enhance your Digital Nomad Summit experience by staying at Hotel Catalonia Santo Domingo, the official host hotel for DNS 2026 and the central gathering place for speakers, sponsors, founders, investors, ecosystem leaders, and attendees from around the world.",
      "Perfectly situated along Santo Domingo's iconic Malecon waterfront, Hotel Catalonia offers modern accommodations, premium amenities, Caribbean Sea views, and convenient access to the city's business, cultural, and entertainment districts.",
      "Throughout the summit, the hotel will serve as the hub for keynote sessions, networking opportunities, executive meetings, and community gatherings.",
      "As an official DNS attendee, you will have access to exclusive event rates through our reserved room block. We encourage guests to secure accommodations early, as availability is limited and rooms will be allocated on a first-come, first-served basis.",
    ],
    ctaTitle: "Reserve Your Accommodations",
    ctaCopy: "Secure your room today and stay at the center of the DNS experience.",
    button: "Reserve Accommodations",
    note: "Special negotiated rates available for DNS attendees.",
    highlightsTitle: "Hotel Highlights",
    highlights: [
      "Official host hotel of Digital Nomad Summit Santo Domingo 2026",
      "Special negotiated rates for DNS attendees",
      "Oceanfront location on the Santo Domingo Malecon",
      "Onsite restaurants, fitness center, pool, and business amenities",
      "Convenient access to summit programming, networking, and VIP experiences",
      "Room block available for the summit week",
    ],
  },
  es: {
    eyebrow: "Hotel Oficial del Summit",
    headline: "Tu base DNS en Hotel Catalonia Santo Domingo",
    body: [
      "Mejora tu experiencia en Digital Nomad Summit hospedandote en Hotel Catalonia Santo Domingo, el hotel anfitrion oficial de DNS 2026 y el punto central de encuentro para speakers, sponsors, founders, inversionistas, lideres del ecosistema y asistentes de todo el mundo.",
      "Ubicado estrategicamente frente al iconico Malecon de Santo Domingo, Hotel Catalonia ofrece alojamiento moderno, amenidades premium, vistas al Mar Caribe y acceso conveniente a las zonas de negocios, cultura y entretenimiento de la ciudad.",
      "Durante el summit, el hotel funcionara como el hub principal para sesiones clave, oportunidades de networking, reuniones ejecutivas y encuentros de comunidad.",
      "Como asistente oficial de DNS, tendras acceso a tarifas especiales a traves del bloque de habitaciones reservado para el evento. Recomendamos asegurar tu alojamiento con anticipacion, ya que la disponibilidad es limitada y las habitaciones seran asignadas por orden de reserva.",
    ],
    ctaTitle: "Reserva tu alojamiento",
    ctaCopy: "Asegura tu habitacion hoy y hospedate en el centro de la experiencia DNS.",
    button: "Reservar alojamiento",
    note: "Tarifas especiales disponibles para asistentes de DNS.",
    highlightsTitle: "Beneficios del Hotel",
    highlights: [
      "Hotel anfitrion oficial de Digital Nomad Summit Santo Domingo 2026",
      "Tarifas especiales para asistentes de DNS",
      "Ubicacion frente al mar en el Malecon de Santo Domingo",
      "Restaurantes, gimnasio, piscina y amenidades de negocios",
      "Acceso conveniente a programacion, networking y experiencias VIP",
      "Bloque de habitaciones disponible durante la semana del summit",
    ],
  },
}

const icons = [BadgeCheck, Building2, Waves, Dumbbell, UsersRound, MapPin]

export function OfficialHotelSection() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <div id="official-hotel" className="scroll-mt-32">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] md:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
        <div>
          <span className="inline-flex rounded-full border border-[#FF5757]/35 bg-[#FF5757]/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#FF5757]">
            {t.eyebrow}
          </span>
          <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-white md:text-4xl">{t.headline}</h3>
          <div className="mt-6 space-y-4 font-sans text-base leading-7 text-white/70">
            {t.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/35 p-5">
            <h4 className="font-display text-xl font-bold text-white">{t.ctaTitle}</h4>
            <p className="mt-2 font-sans text-sm leading-6 text-white/60">{t.ctaCopy}</p>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5757] px-6 py-3 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757] sm:w-auto"
            >
              {t.button}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{t.note}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-5 text-black md:p-7">
          <h4 className="font-display text-2xl font-bold text-black">{t.highlightsTitle}</h4>
          <ul className="mt-6 space-y-4">
            {t.highlights.map((highlight, index) => {
              const Icon = icons[index] || BadgeCheck

              return (
                <li key={highlight} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5757]/10 text-[#FF5757]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-sans text-sm leading-6 text-black/70">{highlight}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
