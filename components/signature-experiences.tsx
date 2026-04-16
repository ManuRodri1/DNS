"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

const content = {
  en: {
    mainTitle: "SIGNATURE EXPERIENCES",
    experiences: [
      {
        title: "Digital Nomad Media Lab",
        description:
          "DNS Influencer Collective producing a dedicated Digital Nomad miniseries and live panel content from Santo Domingo.",
      },
      {
        title: "$10M ARR From the Island",
        description: "Executive masterclass focused on building globally scalable companies from the Caribbean.",
      },
      {
        title: "RevOps Science® Growth Pop-Up",
        description: "Real-time startup diagnostics and growth assessments powered by RevOps Science®.",
      },
      {
        title: "Parallel Roundtables",
        description: "Private roundtables connecting underrepresented founders with foreign VCs and global operators.",
      },
    ],
    outcomesTitle: "STRATEGIC OUTCOMES",
    outcomes: [
      {
        title: "#ProvokeVisibility Startup Pitches",
        description: "DR-based startups with global backing pitching to international investors and ecosystem leaders.",
      },
    ],
  },
  es: {
    mainTitle: "EXPERIENCIAS SIGNATURE",
    experiences: [
      {
        title: "Digital Nomad Media Lab",
        description:
          "El DNS Influencer Collective produce una miniserie dedicada a Digital Nomads y contenido de paneles en vivo desde Santo Domingo.",
      },
      {
        title: "$10M ARR Desde la Isla",
        description:
          "Masterclass ejecutiva enfocada en la construcción de empresas escalables a nivel global desde el Caribe.",
      },
      {
        title: "RevOps Science® Growth Pop-Up",
        description:
          "Diagnósticos de startups y evaluaciones de crecimiento en tiempo real impulsadas por RevOps Science®.",
      },
      {
        title: "Mesas Redondas Paralelas",
        description:
          "Mesas redondas privadas que conectan a fundadores subrepresentados con VCs internacionales y operadores globales.",
      },
    ],
    outcomesTitle: "RESULTADOS ESTRATÉGICOS",
    outcomes: [
      {
        title: "#ProvokeVisibility Startup Pitches",
        description:
          "Startups dominicanas con respaldo global presentando sus proyectos ante inversionistas internacionales y líderes del ecosistema.",
      },
    ],
  },
}

export function SignatureExperiences() {
  const { language } = useLanguage()
  const t = content[language]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      data-header="dark"
      className="relative w-full overflow-hidden bg-[#F5F6F7] py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Main Section Title */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">
            {t.mainTitle}
          </h2>
        </div>

        {/* Experiences Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {t.experiences.map((experience, index) => (
            <div
              key={index}
              className={`group rounded-xl bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <h3 className="mb-4 font-display text-xl font-bold text-[#FF5757] md:text-2xl border-b-2 border-[#FF5757]/20 pb-3">
                {experience.title}
              </h3>
              <p className="text-black/80 leading-relaxed">{experience.description}</p>
            </div>
          ))}
        </div>

        {/* Strategic Outcomes Section */}
        <div className="mt-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">
              {t.outcomesTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:gap-8">
            {t.outcomes.map((outcome, index) => (
              <div
                key={index}
                className={`group rounded-xl bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(t.experiences.length + index) * 100}ms` : "0ms",
                }}
              >
                <h3 className="mb-4 font-display text-xl font-bold text-[#FF5757] md:text-2xl border-b-2 border-[#FF5757]/20 pb-3">
                  {outcome.title}
                </h3>
                <p className="text-black/80 leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
