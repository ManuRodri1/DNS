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
      label: "Who Should Attend",
      title: "Who Should Be in This Room",
      segments: [
        {
          name: "Founders & Entrepreneurs",
          description:
            "Build strategic partnerships, access capital, and connect with leaders who can help you scale beyond borders.",
        },
        {
          name: "Investors",
          description:
            "Discover emerging opportunities, high-growth sectors, and new market entry points across the Caribbean.",
        },
        {
          name: "Brands & Ecosystem Builders",
          description:
            "Position your organization at the center of innovation, talent, tourism, real estate, and global mobility.",
        },
      ],
    },
    es: {
      label: "Para quién es",
      title: "Quién debe estar en esta sala",
      segments: [
        {
          name: "Fundadores y emprendedores",
          description:
            "Construye alianzas estratégicas, accede a capital y conecta con líderes que pueden ayudarte a escalar más allá de fronteras.",
        },
        {
          name: "Inversionistas",
          description:
            "Descubre oportunidades emergentes, sectores de alto crecimiento y nuevos puntos de entrada al mercado del Caribe.",
        },
        {
          name: "Marcas y constructores de ecosistema",
          description:
            "Posiciona tu organización en el centro de la innovación, el talento, el turismo, el real estate y la movilidad global.",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section ref={sectionRef} data-header-theme="white" className="relative py-24 md:py-32 bg-[rgba(245,245,245,1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-20">
          <span className="text-[#FF5757] font-display font-bold uppercase tracking-widest text-sm md:text-base">
            {t.label}
          </span>
          <h2 className="mt-4 font-league-spartan text-3xl font-bold uppercase tracking-wide text-black md:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <div className="mx-auto mt-6 h-0.5 w-24 bg-[#FF5757]" />
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.segments.map((segment, index) => (
            <div
              key={index}
              className={`group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl md:p-10 ${
                hasAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: hasAnimated ? `${index * 150}ms` : "0ms",
              }}
            >
              <h3 className="mb-6 font-league-spartan text-xl font-bold uppercase leading-tight text-black md:text-2xl">
                {segment.name}
              </h3>
              <p className="font-poppins text-base leading-relaxed text-gray-700 md:text-lg">{segment.description}</p>
              {/* Subtle accent line on hover */}
              <div className="mt-8 h-1 w-0 bg-[#FF5757] transition-all duration-300 group-hover:w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
