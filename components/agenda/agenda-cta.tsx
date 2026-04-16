"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { SponsorModal } from "@/components/sponsor-modal"
import Link from "next/link"

const content = {
  en: {
    heading: "Want to align your brand with DNS?",
    primary: "Become a Strategic Partner",
    secondary: "Reserve Your Pass",
  },
  es: {
    heading: "¿Quieres alinear tu marca con DNS?",
    primary: "Conviértete en Socio Estratégico",
    secondary: "Reserva tu pase",
  },
}

export function AgendaCTA() {
  const { language } = useLanguage()
  const t = content[language]
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-black border-t border-white/8 py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      {/* Subtle dot-grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Coral glow accent (top) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-[#FF5757]/30" />

      <div
        ref={ref}
        className={`relative z-10 container text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Heading */}
        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-balance mx-auto max-w-2xl">
          {t.heading}
        </h2>

        {/* Coral divider */}
        <div className="mt-6 mx-auto h-[3px] w-16 bg-[#FF5757]" />

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-sans font-medium text-base text-white bg-[#FF5757] border-2 border-[#FF5757] hover:bg-white hover:text-[#FF5757] transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,87,87,0.3)] min-w-[220px]"
          >
            {t.primary}
          </button>

          {/* Secondary CTA */}
          <Link
            href="/#tickets"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-sans font-medium text-base text-[#FF5757] bg-transparent border-2 border-[#FF5757]/40 hover:border-[#FF5757] hover:bg-[#FF5757] hover:text-white transition-all duration-300 min-w-[220px]"
          >
            {t.secondary}
          </Link>
        </div>
      </div>

      {/* Sponsor Modal */}
      <SponsorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
