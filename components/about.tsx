"use client"

import { useLanguage } from "@/lib/language-context"
import { Pill } from "@/components/pill"

const content = {
  en: {
    label: "Why DNS Matters",
    headline: "This Isn’t Just a Summit. It’s a Strategic Entry Point.",
    body: (
      <>
        <p className="text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
          The Digital Nomad Summit connects founders, investors, policymakers, brands, and ecosystem leaders around one
          shared opportunity: building from the Caribbean with global reach.
        </p>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
          This is where conversations turn into partnerships, and partnerships turn into market expansion.
        </p>
      </>
    ),
    videoBadge: "Santo Domingo · August 6–7, 2026",
    videoText: "A Strategic Gateway for Business & Innovation",
  },
  es: {
    label: "Por qué importa DNS",
    headline: "Esto no es solo una cumbre. Es una puerta de entrada estratégica.",
    body: (
      <>
        <p className="text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
          Digital Nomad Summit conecta fundadores, inversionistas, líderes públicos, marcas y actores del ecosistema
          alrededor de una misma oportunidad: construir desde el Caribe con alcance global.
        </p>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl font-display">
          Aquí las conversaciones se convierten en alianzas, y las alianzas se convierten en expansión de mercado.
        </p>
      </>
    ),
    videoBadge: "Santo Domingo · 6 y 7 de agosto de 2026",
    videoText: "Una puerta estratégica para negocios e innovación",
  },
}

export function About() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="about" className="relative w-full overflow-hidden bg-black">
      {/* Section Label + Headline */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <span className="text-[#FF5757] font-display font-bold uppercase tracking-widest text-sm md:text-base">
          {t.label}
        </span>
        <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl mt-4">
          {t.headline}
        </h2>
        <div className="mx-auto mt-6 h-0.5 w-24 bg-[#FF5757]" />
      </div>

      {/* Full-Width Video Block with Text Overlay */}
      <div className="relative mx-auto mb-16 max-w-7xl px-6 animate-in fade-in zoom-in-95 duration-700 delay-200">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Video Badge */}
          <div className="absolute left-6 top-6 z-20 animate-in fade-in slide-in-from-left-4 duration-500 delay-500">
            <Pill>{t.videoBadge}</Pill>
          </div>

          {/* Desktop text overlay */}
          <div className="hidden md:absolute md:inset-0 md:z-20 md:flex md:items-center md:justify-center md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="max-w-4xl text-center">
              <h3 className="font-display text-balance text-3xl font-bold leading-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] md:text-4xl lg:text-5xl">
                {t.videoText}
              </h3>
            </div>
          </div>

          {/* Dark overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

          {/* YouTube video background */}
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
            {t.videoText}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 text-center">
        {t.body}
      </div>
    </section>
  )
}
