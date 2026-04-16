"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

const content = {
  en: {
    label: "SUCCESSMENT FLAGSHIP",
    headline: "INTRODUCING ZARI MOBILITY™",
    subheadline: "A mobility-data platform built in the Caribbean and designed for global scale.",
    body: "ZARI Mobility™ powers the next generation of mobility-driven financial infrastructure — enabling mobility-based credit, real-time risk scoring, and modern rental ecosystems across emerging and developed markets.",
    whyDNSTitle: "Why DNS",
    whyDNS:
      "ZARI is the clearest example of the innovation emerging from Successment Venture Labs — Caribbean-built, U.S.-investable, and globally relevant.",
    ctaText: "Visit ZARI Mobility",
  },
  es: {
    label: "FLAGSHIP DE SUCCESSMENT",
    headline: "PRESENTAMOS ZARI MOBILITY™",
    subheadline: "Una plataforma de datos de movilidad creada en el Caribe y diseñada para escalar a nivel global.",
    body: "ZARI Mobility™ impulsa la próxima generación de infraestructura financiera basada en movilidad, habilitando crédito impulsado por movilidad, scoring de riesgo en tiempo real y ecosistemas modernos de renta en mercados emergentes y desarrollados.",
    whyDNSTitle: "¿Por qué DNS?",
    whyDNS:
      "ZARI es el ejemplo más claro de la innovación que surge desde Successment Venture Labs — creada en el Caribe, invertible desde EE. UU. y con relevancia global.",
    ctaText: "Visitar ZARI Mobility",
  },
}

export function ZariSection() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Desktop: Two Column Layout | Mobile: Stacked with image below */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="order-1 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Label */}
            <div className="mb-6">
              <span className="inline-block rounded-full bg-[#FF5757]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5757] font-display border border-[#FF5757]/20">
                {t.label}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl mb-6">
              {t.headline}
            </h2>

            {/* Subheadline */}
            <p className="text-xl leading-relaxed text-white/80 mb-6 font-display text-balance">{t.subheadline}</p>

            {/* Body Paragraph */}
            <p className="text-lg leading-relaxed text-white/70 mb-8 font-display text-pretty">{t.body}</p>

            {/* Why DNS Subsection */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-white mb-3">{t.whyDNSTitle}</h3>
              <p className="text-lg leading-relaxed text-white/70 font-display text-pretty">{t.whyDNS}</p>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.zariautoclub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[#FF5757] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#FF5757] hover:border-[#FF5757] border-2 border-[#FF5757] hover:scale-105 font-display"
            >
              {t.ctaText}
              <svg
                className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right Column: Image */}
          <div className="order-2 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-none">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5757]/10 via-transparent to-transparent pointer-events-none" />

              <Image
                src="/images/zari-20image.jpg"
                alt="ZARI Mobility platform interface showing driver scoring and mobility analytics"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
