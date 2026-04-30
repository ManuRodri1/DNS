"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const SponsorModal = dynamic(() => import("./sponsor-modal").then((mod) => mod.SponsorModal), { ssr: false })

const content = {
  en: {
    label: "Partnerships",
    headline: "Partner with the Future of Innovation",
    subheadline: "Accelerating investment, mobility, and global competitiveness.",
    paragraph1:
      "The Digital Nomad Summit is a strategic convening platform bringing together founders, investors, and policymakers shaping the future of business and emerging-market innovation.",
    paragraph2:
      "Align your organization with a movement accelerating the Caribbean's position as a global hub for investment and cross-border growth.",
    outcomesTitle: "Strategic Alignment & Outcomes",
    outcomes: [
      "Access to high-level decision-makers and investors",
      "Visibility within the Caribbean's fastest-growing innovation corridor",
      "Direct engagement with global mobility and industry leaders",
      "Alignment with government-adjacent innovation and policy conversations",
    ],
    ctaInquiry: "Submit Sponsorship Inquiry",
    ctaHelper: "Share your partnership interest through the sponsorship inquiry form.",
  },
  es: {
    label: "Alianzas",
    headline: "Únete al futuro de la innovación",
    subheadline: "Acelerando la inversión, movilidad y competitividad global.",
    paragraph1:
      "El Digital Nomad Summit es una plataforma estratégica que reúne a fundadores, inversionistas y líderes públicos que están definiendo el futuro de los negocios y la innovación.",
    paragraph2:
      "Alinea tu organización con un movimiento que posiciona al Caribe como un hub global de inversión y crecimiento transfronterizo.",
    outcomesTitle: "Alineación Estratégica y Resultados",
    outcomes: [
      "Acceso a tomadores de decisiones e inversionistas de alto nivel",
      "Visibilidad en el corredor de innovación de mayor crecimiento en el Caribe",
      "Interacción directa con líderes de la industria y movilidad global",
      "Sincronía con espacios de innovación y diálogo de políticas públicas",
    ],
    ctaInquiry: "Enviar solicitud de patrocinio",
    ctaHelper: "Comparte tu interés de alianza a través del formulario de solicitud de patrocinio.",
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
        <div className="text-center mb-8">
          <span className={`text-[#FF5757] font-display font-bold uppercase tracking-widest text-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
            {t.label}
          </span>
        </div>

        <h2
          className={`font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {t.headline}
        </h2>

        <p
          className={`mt-6 text-xl md:text-2xl text-white/80 font-display font-semibold text-center transition-all duration-700 delay-100 ${
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
          <p className="text-lg leading-relaxed text-white md:text-xl font-sans text-center max-w-3xl mx-auto">{t.paragraph1}</p>
          <p className="text-lg leading-relaxed text-white md:text-xl font-sans text-center max-w-3xl mx-auto">{t.paragraph2}</p>
        </div>

        <div
          className={`mt-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-8 text-center">
            {t.outcomesTitle}
          </h3>

          <ul className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {t.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start text-white p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[#FF5757] mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-base md:text-lg leading-snug font-sans">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-16 flex flex-col items-center justify-center gap-6 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Button
            onClick={() => setIsSponsorModalOpen(true)}
            size="lg"
            className="bg-[#FF5757] text-white hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] transition-all duration-300 px-10 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.05] w-full sm:w-auto uppercase tracking-wider"
          >
            {t.ctaInquiry}
          </Button>
        </div>
        <p className="mt-8 text-center text-sm text-white/60 font-sans italic">{t.ctaHelper}</p>

      </div>

      {/* Sponsor Modal */}
      {isSponsorModalOpen && <SponsorModal isOpen={isSponsorModalOpen} onClose={() => setIsSponsorModalOpen(false)} />}
    </section>
  )
}
