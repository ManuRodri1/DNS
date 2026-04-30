"use client"

import type React from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwpdaprd"

const content = {
  en: {
    tagline: "Work. Live. Scale.",
    copy:
      "Digital Nomad Summit Santo Domingo 2026 brings founders, investors, policymakers, brands, and global innovators together to build from the Caribbean.",
    primaryCta: "Get Tickets",
    getInvolved: {
      heading: "Get Involved",
      links: [
        { label: "Become a Sponsor", href: "/#partners-sponsor-invite" },
        { label: "Speakers", href: "/speakers" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    event: {
      heading: "Event",
      links: [
        { label: "About DNS", href: "/#about" },
        { label: "Tickets", href: "/#tickets" },
        { label: "Location", href: "/#location" },
        { label: "Partners", href: "/#partners-section" },
      ],
    },
    ecosystem: {
      heading: "Ecosystem",
      links: [
        { label: "Successment", href: "https://www.successment.co/", external: true },
        { label: "ZARI Mobility", href: "https://www.zariautoclub.com/", external: true },
        { label: "Digital Nomad Weekly", href: "https://dominicantoday.com/dr/digital-nomad/", external: true },
      ],
    },
    newsletter: {
      heading: "Subscribe to DNS Updates",
      description:
        "Get speaker announcements, partner updates, ticket releases, and strategic opportunities around DNS 2026.",
      placeholder: "Enter your email",
      button: "Subscribe",
      sending: "Subscribing...",
      success: "You're subscribed. Watch your inbox for DNS updates.",
      error: "Something went wrong. Please try again.",
    },
    rights: "© 2026 Digital Nomad Summit. All rights reserved.",
    presentedBy: "Presented by Successment.",
    contact: "Contact",
    designedBy: "Designed by ING. JMDR",
  },
  es: {
    tagline: "Trabaja. Vive. Escala.",
    copy:
      "Digital Nomad Summit Santo Domingo 2026 reúne a fundadores, inversionistas, líderes públicos, marcas e innovadores globales para construir desde el Caribe.",
    primaryCta: "Comprar boletas",
    getInvolved: {
      heading: "Participa",
      links: [
        { label: "Patrocinar DNS", href: "/#partners-sponsor-invite" },
        { label: "Speakers", href: "/speakers" },
        { label: "Contacto", href: "/#contact" },
      ],
    },
    event: {
      heading: "Evento",
      links: [
        { label: "Sobre DNS", href: "/#about" },
        { label: "Boletas", href: "/#tickets" },
        { label: "Ubicación", href: "/#location" },
        { label: "Aliados", href: "/#partners-section" },
      ],
    },
    ecosystem: {
      heading: "Ecosistema",
      links: [
        { label: "Successment", href: "https://www.successment.co/", external: true },
        { label: "ZARI Mobility", href: "https://www.zariautoclub.com/", external: true },
        { label: "Digital Nomad Weekly", href: "https://dominicantoday.com/dr/digital-nomad/", external: true },
      ],
    },
    newsletter: {
      heading: "Suscríbete a novedades de DNS",
      description:
        "Recibe anuncios de speakers, actualizaciones de aliados, lanzamientos de boletas y oportunidades estratégicas alrededor de DNS 2026.",
      placeholder: "Ingresa tu email",
      button: "Suscribirme",
      sending: "Suscribiendo...",
      success: "Listo. Recibirás novedades de DNS en tu correo.",
      error: "Algo salió mal. Inténtalo nuevamente.",
    },
    rights: "© 2026 Digital Nomad Summit. Todos los derechos reservados.",
    presentedBy: "Presentado por Successment.",
    contact: "Contacto",
    designedBy: "Designed by ING. JMDR",
  },
}

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">{heading}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => {
          const className =
            "font-sans text-sm text-white/60 transition-colors duration-200 hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"

          return (
            <li key={link.label}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Footer() {
  const { language } = useLanguage()
  const t = content[language]
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "DNS footer newsletter",
          language,
          subject: "DNS footer newsletter signup",
        }),
      })

      if (!response.ok) {
        throw new Error("Newsletter signup failed")
      }

      setEmail("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,87,87,0.16),transparent_34%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_0.75fr_0.85fr_1.35fr] lg:gap-10">
          <div className="max-w-md">
            <Link href="/" className="inline-flex" aria-label="Digital Nomad Summit home">
              <img
                src="/logo digital nomad summit - Editado.png"
                alt="Digital Nomad Summit"
                width={160}
                height={160}
                loading="lazy"
                className="h-auto w-[132px] rounded-md shadow-[0_10px_35px_rgba(255,255,255,0.05)] md:w-[150px]"
              />
            </Link>

            <p className="mt-7 font-display text-2xl font-bold tracking-tight text-white">{t.tagline}</p>
            <p className="mt-4 max-w-sm font-sans text-sm leading-6 text-white/70">{t.copy}</p>
            <Link
              href="/#tickets"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#FF5757] bg-[#FF5757] px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <FooterColumn heading={t.getInvolved.heading} links={t.getInvolved.links} />
          <FooterColumn heading={t.event.heading} links={t.event.links} />
          <FooterColumn heading={t.ecosystem.heading} links={t.ecosystem.links} />

          <div className="min-w-0">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              {t.newsletter.heading}
            </h3>
            <p className="mt-5 font-sans text-sm leading-6 text-white/70">{t.newsletter.description}</p>

            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              <div className="flex min-w-0 overflow-hidden rounded-full border border-white/15 bg-white/[0.06] p-1 shadow-inner shadow-white/5 transition-colors duration-200 focus-within:border-[#FF5757]/80">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder={t.newsletter.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 font-sans text-sm text-white outline-none placeholder:text-white/38"
                  aria-label={t.newsletter.placeholder}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF5757] text-white transition-all duration-200 hover:bg-white hover:text-[#FF5757] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={status === "submitting" ? t.newsletter.sending : t.newsletter.button}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p
                className={`mt-3 min-h-5 font-sans text-xs ${
                  status === "success" ? "text-[#FF5757]" : status === "error" ? "text-white/80" : "text-white/45"
                }`}
                aria-live="polite"
              >
                {status === "success" ? t.newsletter.success : status === "error" ? t.newsletter.error : " "}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 md:mt-16">
          <div className="flex flex-col gap-5 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 font-sans">
              <p>{t.rights}</p>
              <p>{t.presentedBy}</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans">
              <Link href="/#contact" className="transition-colors duration-200 hover:text-[#FF5757]">
                {t.contact}
              </Link>
              <a
                href="https://www.linkedin.com/in/jose-manuel-de-jesus-rodriguez-5a0981177"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/38 transition-colors duration-200 hover:text-white/70"
              >
                {t.designedBy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
