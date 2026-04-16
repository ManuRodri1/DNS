"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function AttendeeSegments() {
  const { language } = useLanguage()
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const content = {
    en: {
      title: "ATTENDEE SEGMENTS",
      subtitle: "Who Attends and What They Gain",
      segments: [
        {
          name: "Nomads & Remote Operators",
          description:
            "Residency pathways, real estate opportunities, and startup playbooks in the Dominican Republic.",
        },
        {
          name: "Local Entrepreneurs",
          description: "International visibility, access to capital, and global partnership opportunities.",
        },
        {
          name: "VCs & Investors",
          description: "Early access to Dominican ventures, deals, and emerging digital talent.",
        },
        {
          name: "Government & Tourism Orgs",
          description:
            "Innovation funnel to activate startup growth, tourism modernization, and national competitiveness.",
        },
        {
          name: "Media & Influencers",
          description: "Architects of the Caribbean's innovation story and global narrative.",
        },
      ],
    },
    es: {
      title: "SEGMENTOS DE ASISTENTES",
      subtitle: "Quiénes asisten y qué obtienen",
      segments: [
        {
          name: "Nómadas y Operadores Remotos",
          description:
            "Vías de residencia, oportunidades inmobiliarias y playbooks de startups en la República Dominicana.",
        },
        {
          name: "Emprendedores Locales",
          description: "Visibilidad internacional, acceso a capital y oportunidades de alianzas globales.",
        },
        {
          name: "VCs e Inversionistas",
          description:
            "Acceso temprano a emprendimientos dominicanos, oportunidades de inversión y talento digital emergente.",
        },
        {
          name: "Gobierno y Organismos de Turismo",
          description:
            "Un embudo de innovación para activar el crecimiento de startups, la modernización turística y la competitividad nacional.",
        },
        {
          name: "Medios e Influencers",
          description: "Arquitectos de la narrativa de innovación del Caribe y su proyección global.",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section ref={sectionRef} data-header="dark" className="relative py-12 md:py-16 bg-[rgba(245,245,245,1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-league-spartan text-3xl font-bold uppercase tracking-wide text-black md:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 font-poppins text-base text-gray-600 md:text-lg">{t.subtitle}</p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.segments.map((segment, index) => (
            <div
              key={index}
              className={`group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-lg md:p-8 ${
                hasAnimated ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: hasAnimated ? `${index * 100}ms` : "0ms",
              }}
            >
              <h3 className="mb-4 font-league-spartan text-lg font-bold uppercase leading-tight text-black md:text-xl">
                {segment.name}
              </h3>
              <p className="font-poppins text-sm leading-relaxed text-gray-700 md:text-base">{segment.description}</p>
              {/* Subtle accent line on hover */}
              <div className="mt-4 h-0.5 w-0 bg-[#FF5757] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
