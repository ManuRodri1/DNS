"use client"

import { useLanguage } from "@/lib/language-context"
import { Pill } from "@/components/pill"

const content = {
  en: {
    title: (
      <>
        About the Digital Nomad <span className="text-[#FF5757]">Summit</span> Santo Domingo (DNS 2026)
      </>
    ),
    subtitle: "A Global Innovation, Mobility & Entrepreneurship Summit in the Heart of the Caribbean",
    videoBadge: "Santo Domingo · August 6–7, 2026",
    intro1:
      "The Digital Nomad Summit Santo Domingo (DNS 2026) is a high-level global gathering designed for founders, investors, policymakers, remote-work leaders, and diaspora innovators shaping the future of work and cross-border business in emerging markets.",
    intro2:
      "Held August 6–7, 2026 in Santo Domingo, Dominican Republic, DNS positions the DR as a rising Caribbean innovation hub and a strategic connector between the United States, Latin America, and the global remote-work economy.",
    visionTitle: "Our Vision",
    visionIntro:
      "To accelerate the Caribbean's transition into a global center for innovation, mobility, entrepreneurship, digital transformation, and economic competitiveness.",
    visionText: "DNS serves as a platform where public and private sectors collaborate to design the next era of:",
    visionPoints: [
      "Future of Work & Global Mobility",
      "Entrepreneurship & Venture Scaling",
      "AI, Digital Technology & Emerging Innovation",
      "Tourism 3.0 & Real Estate Infrastructure",
      "Diaspora Influence & Cross-Border Opportunity",
    ],
    whyDRTitle: "Why the Dominican Republic?",
    whyDRIntro:
      "The Dominican Republic is one of the fastest-growing economies in the Caribbean and LATAM. With booming tourism, expanding real estate, rising tech adoption, and strong government interest in innovation, the DR is emerging as:",
    whyDRPoints: [
      "A strategic gateway for global talent",
      "A growth market for investment and startups",
      "A testbed for digital policy and remote-work systems",
      "A hub for diaspora-led entrepreneurship",
      "A new player in the global future-of-work landscape",
    ],
    whyDRClosing:
      "Santo Domingo, the region's cultural and economic capital, provides the perfect environment for serious conversations on competitiveness and transformation.",
    whoAttendsTitle: "Who Attends",
    whoAttendsList: [
      "Entrepreneurs & Founders",
      "Investors & Venture Firms",
      "Policymakers & Government Advisors",
      "Tech & AI Innovators",
      "Remote-Work & Mobility Leaders",
      "Tourism & Real Estate Executives",
      "Diaspora Professionals",
      "Corporate & Private-Sector Decision Makers",
    ],
  },
  es: {
    title: (
      <>
        Acerca del Digital Nomad <span className="text-[#FF5757]">Summit</span> Santo Domingo (DNS 2026)
      </>
    ),
    subtitle: "Una Cumbre Global de Innovación, Movilidad y Emprendimiento en el Corazón del Caribe",
    videoBadge: "Santo Domingo · 6–7 de Agosto, 2026",
    intro1:
      "El Digital Nomad Summit Santo Domingo (DNS 2026) es una reunión global de alto nivel diseñada para fundadores, inversionistas, responsables de políticas, líderes de trabajo remoto e innovadores de la diáspora que están dando forma al futuro del trabajo y los negocios transfronterizos en mercados emergentes.",
    intro2:
      "Celebrado del 6 al 7 de agosto de 2026 en Santo Domingo, República Dominicana, DNS posiciona a la RD como un centro de innovación caribeño en ascenso y un conector estratégico entre Estados Unidos, América Latina y la economía global del trabajo remoto.",
    visionTitle: "Nuestra Visión",
    visionIntro:
      "Acelerar la transición del Caribe hacia un centro global de innovación, movilidad, emprendimiento, transformación digital y competitividad económica.",
    visionText:
      "DNS sirve como plataforma donde los sectores público y privado colaboran para diseñar la próxima era de:",
    visionPoints: [
      "Futuro del Trabajo y Movilidad Global",
      "Emprendimiento y Escalamiento de Ventures",
      "IA, Tecnología Digital e Innovación Emergente",
      "Turismo 3.0 e Infraestructura Inmobiliaria",
      "Influencia de la Diáspora y Oportunidades Transfronterizas",
    ],
    whyDRTitle: "¿Por qué República Dominicana?",
    whyDRIntro:
      "La República Dominicana es una de las economías de más rápido crecimiento en el Caribe y LATAM. Con un turismo en auge, bienes raíces en expansión, adopción tecnológica creciente y fuerte interés gubernamental en innovación, la RD está emergiendo como:",
    whyDRPoints: [
      "Una puerta estratégica para talento global",
      "Un mercado de crecimiento para inversión y startups",
      "Un laboratorio para políticas digitales y sistemas de trabajo remoto",
      "Un hub para emprendimiento liderado por la diáspora",
      "Un nuevo jugador en el panorama global del futuro del trabajo",
    ],
    whyDRClosing:
      "Santo Domingo, la capital cultural y económica de la región, ofrece el ambiente perfecto para conversaciones serias sobre competitividad y transformación.",
    whoAttendsTitle: "Quién Asiste",
    whoAttendsList: [
      "Emprendedores y Fundadores",
      "Inversionistas y Firmas de Venture",
      "Responsables de Políticas y Asesores Gubernamentales",
      "Innovadores en Tecnología e IA",
      "Líderes de Trabajo Remoto y Movilidad",
      "Ejecutivos de Turismo y Bienes Raíces",
      "Profesionales de la Diáspora",
      "Tomadores de Decisiones Corporativos y del Sector Privado",
    ],
  },
}

export function About() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="about" className="relative w-full overflow-hidden bg-black">
      {/* Section Title + Subtitle */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {t.title}
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-fit bg-[#FF5757]" />
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl font-display">
          {t.subtitle}
        </p>
      </div>

      {/* Full-Width Video Block with Text Overlay */}
      <div className="relative mx-auto mb-10 max-w-7xl px-6 animate-in fade-in zoom-in-95 duration-700 delay-200">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Video Badge */}
          <div className="absolute left-6 top-6 z-20 animate-in fade-in slide-in-from-left-4 duration-500 delay-500">
            <Pill>{t.videoBadge}</Pill>
          </div>

          {/* Desktop text overlay */}
          <div className="hidden md:absolute md:inset-0 md:z-20 md:flex md:items-center md:justify-center md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="max-w-4xl text-center">
              <h3 className="font-display text-balance text-3xl font-bold leading-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] md:text-4xl lg:text-5xl">
                {language === "en"
                  ? "A Global Innovation, Mobility & Entrepreneurship Summit"
                  : "Una Cumbre Global de Innovación, Movilidad y Emprendimiento"}
              </h3>
            </div>
          </div>

          {/* Dark overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

          {/* YouTube video background - starts at 8:52 (532 seconds) */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src="https://www.youtube.com/embed/nS8rUpp0Crw?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&start=532&playlist=nS8rUpp0Crw&showinfo=0&fs=0&disablekb=1&iv_load_policy=3"
              title="Santo Domingo Background Video"
              allow="autoplay; encrypted-media"
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Mobile text below video */}
        <div className="mt-6 px-2 text-center md:hidden">
          <h3 className="font-display text-balance text-2xl font-bold leading-tight text-white">
            {language === "en"
              ? "A Global Innovation, Mobility & Entrepreneurship Summit"
              : "Una Cumbre Global de Innovación, Movilidad y Emprendimiento"}
          </h3>
        </div>
      </div>

      {/* Intro Paragraphs */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <p className="text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">{t.intro1}</p>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">{t.intro2}</p>
      </div>

      {/* Separator */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Vision Block */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{t.visionTitle}</h3>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
          {t.visionIntro}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-white/70 font-display">{t.visionText}</p>
        <ul className="mt-6 space-y-3">
          {t.visionPoints.map((point, index) => (
            <li
              key={index}
              className="group flex items-start gap-3 text-lg text-white/80 transition-all duration-300 hover:text-white hover:translate-x-2 font-display"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5757] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(255,87,87,0.8)]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why DR Block */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 animate-in fade-in zoom-in-95 duration-700 delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,87,87,0.15)] md:p-12">
          <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{t.whyDRTitle}</h3>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
            {t.whyDRIntro}
          </p>
          <ul className="mt-8 space-y-4">
            {t.whyDRPoints.map((point, index) => (
              <li
                key={index}
                className="group flex items-start gap-3 text-lg text-white/80 transition-all duration-300 hover:text-white hover:translate-x-2 font-display"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5757] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(255,87,87,0.8)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-pretty text-lg leading-relaxed text-white/70 font-display">{t.whyDRClosing}</p>
        </div>
      </div>

    </section>
  )
}
