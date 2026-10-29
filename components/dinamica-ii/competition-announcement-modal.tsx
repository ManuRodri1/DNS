"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const STORAGE_KEY = "dns-dinamica-ii-competition-announcement-v1"

const content = {
  en: {
    eyebrow: "DNS 2027 · STARTUP COMPETITION",
    title: "Your Startup Could Win US$8,500.",
    body: "Digital Nomad Summit Santo Domingo 2027 introduces the DINAMICA II Exportable Innovation Prize, offering US$12,750 in total cash prizes to qualified startups with a real connection to the Dominican Republic.",
    finalists: "Up to 10 finalists will have the opportunity to pitch live at DNS 2027.",
    grand: "Grand Prize",
    runner: "Runner-Up",
    primary: "Explore the Competition",
    secondary: "Continue to Website",
    footnote: "A valid paid DNS 2027 ticket is required for official competition admission. Applications are subject to ticket verification and eligibility review.",
    close: "Close competition announcement",
  },
  es: {
    eyebrow: "DNS 2027 · CONCURSO DE STARTUPS",
    title: "Tu startup podría ganar US$8,500.",
    body: "Digital Nomad Summit Santo Domingo 2027 presenta el Premio DINAMICA II a la Innovación Exportable, con US$12,750 en premios en efectivo para startups elegibles con una conexión real con República Dominicana.",
    finalists: "Hasta 10 finalistas tendrán la oportunidad de presentar sus proyectos en vivo durante DNS 2027.",
    grand: "Gran Premio",
    runner: "Segundo Lugar",
    primary: "Conoce el Concurso",
    secondary: "Continuar al Sitio",
    footnote: "Se requiere una entrada DNS 2027 válida y pagada para participar oficialmente. Las solicitudes estarán sujetas a verificación de entrada y revisión de elegibilidad.",
    close: "Cerrar anuncio del concurso",
  },
}

export function CompetitionAnnouncementModal() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const t = content[language]

  const close = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "dismissed")
    setIsOpen(false)
    window.setTimeout(() => previousFocusRef.current?.focus(), 0)
  }, [])

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? [])
    focusable()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== "Tab") return
      const elements = focusable()
      if (!elements.length) return
      if (event.shiftKey && document.activeElement === elements[0]) {
        event.preventDefault()
        elements[elements.length - 1].focus()
      } else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) {
        event.preventDefault()
        elements[0].focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [close, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dinamica-announcement-title"
        aria-describedby="dinamica-announcement-copy"
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0a0a] p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,0.75)] sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-white transition hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="pr-12 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5757]">{t.eyebrow}</p>
        <h2 id="dinamica-announcement-title" className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight sm:text-4xl">{t.title}</h2>
        <p id="dinamica-announcement-copy" className="mt-4 max-w-xl font-sans text-sm leading-6 text-white/75 sm:text-base">{t.body}</p>
        <p className="mt-2 font-sans text-sm leading-6 text-white/75 sm:text-base">{t.finalists}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#FF5757]/35 bg-[#FF5757]/10 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5757]">{t.grand}</p>
            <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">US$8,500</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">{t.runner}</p>
            <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">US$4,250</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dinamica-ii"
            onClick={close}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF5757] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {t.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="min-h-12 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {t.secondary}
          </button>
        </div>
        <p className="mb-0 mt-4 text-xs leading-5 text-white/55">{t.footnote}</p>
      </div>
    </div>
  )
}
