"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

const content = {
  en: {
    label: "Ecosystem",
    headline: "From Founders, For Founders",
    subheadline: "Building the infrastructure for the next generation of global nomads.",
    body: "The Digital Nomad Summit is more than an event — it is a convening of the Successment Venture Labs ecosystem. We are building the tools and networks that enable cross-border innovation, starting with ZARI Mobility™.",
    whyDNSTitle: "Why It Matters",
    whyDNS:
      "ZARI is the flagship example of Caribbean-built innovation designed for global scale — moving from regional potential to international investability.",
    ctaText: "Visit ZARI Mobility",
  },
  es: {
    label: "Ecosistema",
    headline: "De fundadores, para fundadores",
    subheadline: "Construyendo la infraestructura para la próxima generación de nómadas globales.",
    body: "El Digital Nomad Summit es más que un evento — es el punto de encuentro del ecosistema de Successment Venture Labs. Estamos creando las herramientas y redes que habilitan la innovación transfronteriza, comenzando con ZARI Mobility™.",
    whyDNSTitle: "Por qué es importante",
    whyDNS:
      "ZARI es el ejemplo emblemático de innovación caribeña diseñada para escala global — pasando del potencial regional a la invertibilidad internacional.",
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
