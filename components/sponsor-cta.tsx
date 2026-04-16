"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const SponsorModal = dynamic(() => import("./sponsor-modal").then((mod) => mod.SponsorModal), { ssr: false })

const content = {
  en: {
    headline: "Partner With the Digital Nomad Summit",
    subheadline: "Powering innovation, mobility, and global competitiveness from the Caribbean",
    paragraph1:
      "The Digital Nomad Summit Santo Domingo 2026 is a strategic convening platform bringing together founders, investors, policymakers, ecosystem builders, and global operators shaping the future of work, mobility, tourism 3.0, real estate, and emerging-market innovation.",
    paragraph2:
      "As a partner, your organization is not simply sponsoring an event — you are aligning with a movement accelerating the Dominican Republic's position as a global hub for innovation, investment, and cross-border growth.",
    outcomesTitle: "Strategic Alignment & Outcomes",
    outcomes: [
      "High-value decision-makers across technology, investment, and public sector leadership",
      "Cross-border business operators and global mobility leaders",
      "Government-adjacent innovation and policy conversations",
      "Diaspora influence and international narrative shaping",
      "The Caribbean's fastest-emerging innovation and investment corridor",
    ],
    ctaText: "Request the Partnership Deck",
    ctaHelper: "Request partnership details and sponsorship opportunities",
  },
  es: {
    headline: "Conviértete en Socio del Digital Nomad Summit",
    subheadline: "Impulsando innovación, movilidad y competitividad global desde el Caribe",
    paragraph1:
      "El Digital Nomad Summit Santo Domingo 2026 es una plataforma estratégica que reúne a fundadores, inversionistas, formuladores de políticas, constructores de ecosistema y operadores globales que están definiendo el futuro del trabajo, la movilidad, el turismo 3.0, el sector inmobiliario y la innovación en mercados emergentes.",
    paragraph2:
      "Como socio, tu organización no solo apoya un evento — se alinea con un movimiento que acelera el posicionamiento de la República Dominicana como un hub global de innovación, inversión y crecimiento transfronterizo.",
    outcomesTitle: "Alineación Estratégica y Resultados",
    outcomes: [
      "Tomadores de decisiones de alto nivel en tecnología, inversión y sector público",
      "Operadores de negocios transfronterizos y líderes en movilidad global",
      "Espacios de innovación y diálogo alineados con políticas públicas",
      "Influencia de la diáspora y posicionamiento narrativo internacional",
      "El corredor de innovación e inversión de mayor crecimiento en el Caribe",
    ],
    ctaText: "Solicitar el Deck de Asociación",
    ctaHelper: "Solicitar detalles de asociación y oportunidades de patrocinio",
  },
}

export function SponsorCTA() {
  const { language } = useLanguage()
  const t = content[language]
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="partners-sponsor-invite"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-24 md:py-32"
      style={{
        backgroundImage: `url('/images/terren-hurst-blgofmpilr0-unsplash.avif')`,
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h2
          className={`font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {t.headline}
        </h2>

        <p
          className={`mt-6 text-xl md:text-2xl text-[#FF5757] font-display font-semibold text-center transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {t.subheadline}
        </p>

        <div
          className={`mt-12 space-y-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-lg leading-relaxed text-white md:text-xl font-sans">{t.paragraph1}</p>
          <p className="text-lg leading-relaxed text-white md:text-xl font-sans">{t.paragraph2}</p>
        </div>

        <div
          className={`mt-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-8 text-center">
            {t.outcomesTitle}
          </h3>

          <ul className="space-y-4 max-w-3xl mx-auto">
            {t.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start text-white">
                <span className="text-[#FF5757] mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-lg leading-relaxed font-sans">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Button
            onClick={() => setIsSponsorModalOpen(true)}
            size="lg"
            className="bg-[#FF5757] text-white hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] transition-all duration-300 px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            {t.ctaText}
          </Button>

          <p className="mt-4 text-sm text-white/80 font-sans">{t.ctaHelper}</p>
        </div>
      </div>

      {/* Sponsor Modal */}
      {isSponsorModalOpen && <SponsorModal isOpen={isSponsorModalOpen} onClose={() => setIsSponsorModalOpen(false)} />}
    </section>
  )
}
