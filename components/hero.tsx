"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const translations = {
  en: {
    eyebrow: "Crowne Plaza · Santo Domingo",
    headline: (
      <>
        Build what’s next
        <br />
        from the <span className="text-primary">Caribbean.</span>
      </>
    ),
    subheadline: "Two days to turn Caribbean potential into partnerships, capital, and expansion.",
    primaryCta: "Get tickets",
    secondaryCta: "View agenda",
    month: "APRIL",
    dateLabel: "April 8–9, 2027",
  },
  es: {
    eyebrow: "Crowne Plaza · Santo Domingo",
    headline: (
      <>
        Construye lo próximo
        <br />
        desde el <span className="text-primary">Caribe.</span>
      </>
    ),
    subheadline: "Dos días para convertir el potencial del Caribe en alianzas, capital y expansión.",
    primaryCta: "Comprar pase",
    secondaryCta: "Ver agenda",
    month: "ABRIL",
    dateLabel: "8–9 de abril de 2027",
  },
}

export function Hero() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B0A0A] text-white"
    >
      <div className="container mx-auto grid min-h-[640px] items-center gap-14 pb-16 pt-32 md:min-h-[680px] md:pb-20 md:pt-36 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-7">
          <p className="mb-7 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/65 md:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            {t.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="max-w-[850px] text-balance font-display text-[clamp(2.65rem,6.3vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.045em]"
          >
            {t.headline}
          </h1>

          <p className="mt-7 max-w-[590px] text-pretty font-sans text-base leading-7 text-white/75 md:mt-8 md:text-lg md:leading-8">
            {t.subheadline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4 md:mt-10">
            <Link
              href="/tickets"
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-white hover:text-[#0B0A0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {t.primaryCta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>

            <Link
              href="/agenda"
              className="group inline-flex min-h-12 items-center gap-2 whitespace-nowrap border-b border-white/35 font-display text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {t.secondaryCta}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <aside
          aria-label={t.dateLabel}
          className="relative border-l border-white/20 pl-6 md:pl-9 lg:col-span-5 lg:ml-auto lg:w-full lg:max-w-[480px]"
        >
          <div className="grid grid-cols-[auto_minmax(2.5rem,1fr)_auto] items-center gap-4 font-display tabular-nums md:gap-5">
            <p className="text-[clamp(4.5rem,7vw,6.5rem)] font-bold leading-none tracking-[-0.07em]">08</p>
            <span className="h-[3px] w-full bg-primary" aria-hidden="true" />
            <p className="text-[clamp(4.5rem,7vw,6.5rem)] font-bold leading-none tracking-[-0.07em]">09</p>
          </div>

          <div className="mt-6 flex items-baseline justify-between border-t border-white/20 pt-5 font-display">
            <p className="text-lg font-bold uppercase tracking-[0.14em] text-primary md:text-xl">{t.month}</p>
            <p className="text-sm font-semibold tracking-[0.2em] text-white/60 tabular-nums">2027</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
