"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  DINAMICA_PATH,
  DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED,
  DINAMICA_PUBLIC_LAUNCH_ENABLED,
} from "@/lib/dinamica-ii/public-config"

export function DinamicaIIHomepageBanner() {
  const { language } = useLanguage()
  if (!DINAMICA_PUBLIC_LAUNCH_ENABLED || !DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED) return null

  const en = language === "en"
  return (
    <aside
      aria-labelledby="dinamica-home-promo-title"
      className="group relative isolate overflow-hidden border-y border-white/15 bg-[#0b0b0b] px-6 py-9 text-white md:px-10 md:py-10"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary md:w-1.5" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl transition duration-500 group-hover:bg-primary/15" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary">DINAMICA II</p>
            <span className="h-px w-8 bg-white/25" aria-hidden="true" />
            <p className="m-0 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/55">Startup Competition</p>
          </div>
          <p className="m-0 mt-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/55">
            {en ? "DNS 2027 · April 8–9 · Santo Domingo" : "DNS 2027 · 8–9 de abril · Santo Domingo"}
          </p>
          <h2 id="dinamica-home-promo-title" className="mt-3 max-w-2xl font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
            {en ? "Your startup could win" : "Tu startup podría ganar"} <span className="text-primary">US$8,500.</span>
          </h2>
          <p className="mb-0 mt-4 max-w-2xl font-sans text-sm leading-6 text-white/72 md:text-base">
            {en
              ? "US$12,750 in cash prizes. Up to 10 finalists. One stage for startups ready to scale beyond borders."
              : "US$12,750 en premios en efectivo. Hasta 10 finalistas. Un escenario para startups listas para crecer más allá de las fronteras."}
          </p>
        </div>
        <Link href={DINAMICA_PATH} className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-5 font-sans text-xs font-semibold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:w-auto">
          {en ? "Explore the Competition" : "Conoce el concurso"}<ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
