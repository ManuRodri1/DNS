"use client"

// components/homepage-speakers.tsx
// Homepage featured speakers section — placed between ZARI and Influencer Collective.
// Uses Poster Image as primary visual (promotional artwork) with Headshot as fallback.

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CompanyLogos } from "@/components/speakers/company-logos"
import { useLanguage } from "@/lib/language-context"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

// ─── Translations ──────────────────────────────────────────────────────────────────────────────
const content = {
  en: {
    sectionLabel: "Speakers & Leaders",
    headline: "Meet the Leaders Driving Global Impact",
    subheadline:
      "From government executives to global entrepreneurs, investors, innovators, and ecosystem builders — these are the voices shaping the future of business across borders.",
    allSpeakers: "All Speakers",
    viewProfile: "View Profile",
    exploreAll: "Explore All Speakers",
    attribution: "DNS Santo Domingo \u00b7 August 2026",
    comingSoon: "Speaker announcements coming soon.",
  },
  es: {
    sectionLabel: "Speakers y líderes",
    headline: "Conoce a los líderes que impulsan impacto global",
    subheadline:
      "Desde líderes gubernamentales hasta emprendedores globales, inversionistas, innovadores y constructores de ecosistema — estas son las voces que están moldeando el futuro de los negocios sin fronteras.",
    allSpeakers: "Todos los Speakers",
    viewProfile: "Ver Perfil",
    exploreAll: "Ver Todos los Speakers",
    attribution: "DNS Santo Domingo \u00b7 Agosto 2026",
    comingSoon: "Anuncios de speakers pr\u00f3ximamente.",
  },
}

interface HomepageSpeaker {
  id: string
  fullName: string
  slug: string
  jobTitle: string
  company: string
  posterImage: string | null
  headshot: string | null
  companyLogoPrimary: string | null
  companyLogoSecondary: string | null
}

// ─── Branded placeholder card ─────────────────────────────────────────────────
function SpeakerPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111] to-[#1a1a1a]">
      <div className="w-16 h-16 rounded-full bg-[#FF5757]/10 border border-[#FF5757]/20 flex items-center justify-center mb-3">
        <svg className="w-7 h-7 text-[#FF5757]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span className="text-white/15 text-[10px] font-sans uppercase tracking-widest">DNS 2026</span>
    </div>
  )
}

// ─── Individual speaker card ──────────────────────────────────────────────────
function SpeakerCard({ speaker, viewProfileLabel }: { speaker: HomepageSpeaker; viewProfileLabel: string }) {
  // Homepage: Poster Image first → Headshot fallback → placeholder
  const image = speaker.posterImage || speaker.headshot || null

  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className="group relative flex flex-col shrink-0 w-[280px] sm:w-auto overflow-hidden rounded-2xl bg-[#0d0d0d] border border-white/8 transition-all duration-400 hover:border-[#FF5757]/40 hover:shadow-[0_8px_48px_rgba(255,87,87,0.12)] hover:-translate-y-1"
    >
      {/* Top coral accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5757] via-[#FF5757]/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image block — tall poster ratio */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111]">
        {image ? (
          <Image
            src={image}
            alt={`${speaker.fullName} — Digital Nomad Summit 2026`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <SpeakerPlaceholder />
        )}

        {/* Gradient overlay for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
      </div>

      {/* Text below image */}
      <div className="flex flex-col gap-2 px-5 py-4">
        <div>
          <h3
            className="text-white font-bold text-base leading-snug tracking-tight group-hover:text-[#FF5757] transition-colors duration-200"
            style={{ fontFamily: "var(--font-display), 'League Spartan', sans-serif" }}
          >
            {speaker.fullName}
          </h3>
          {(speaker.jobTitle || speaker.company) && (
            <p className="text-white/45 text-sm font-sans leading-snug line-clamp-2 mt-0.5">
              {speaker.jobTitle}
              {speaker.jobTitle && speaker.company && " · "}
              <span className="text-white/60">{speaker.company}</span>
            </p>
          )}
        </div>

        {/* Company logos — sm size, trust signal below title */}
        {(speaker.companyLogoPrimary || speaker.companyLogoSecondary) && (
          <CompanyLogos
            primary={speaker.companyLogoPrimary}
            secondary={speaker.companyLogoSecondary}
            primaryAlt={`${speaker.company} logo`}
            secondaryAlt={`${speaker.company} secondary logo`}
            size="sm"
          />
        )}

        <span className="inline-flex items-center gap-1 text-[#FF5757] text-xs font-semibold font-sans mt-1 group-hover:gap-2 transition-all duration-200 uppercase tracking-wider">
          {viewProfileLabel}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="shrink-0 w-[280px] sm:w-auto rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/8 animate-pulse">
      <div className="w-full aspect-[3/4] bg-white/5" />
      <div className="px-5 py-4 flex flex-col gap-2">
        <div className="h-4 bg-white/8 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function HomepageSpeakers() {
  const { language } = useLanguage()
  const t = content[language]
  const [speakers, setSpeakers] = useState<HomepageSpeaker[]>([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Fetch featured speakers from the dedicated speaker API route
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/featured-speakers")
        if (res.ok) {
          const data = await res.json()
          setSpeakers(data.speakers || [])
        }
      } catch (err) {
        console.error("[HomepageSpeakers] fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Autoplay logic for carousel
  useEffect(() => {
    if (!api) return
    
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [api])

  return (
    <section
      id="speakers"
      ref={sectionRef}
      aria-label="Featured Speakers"
      className="relative w-full overflow-hidden bg-black py-16 md:py-24"
    >
      {/* Ambient coral glow — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle at 70% 20%, #FF5757 0%, transparent 65%)" }}
      />
      {/* Ambient coral glow — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full opacity-8"
        style={{ background: "radial-gradient(circle at 30% 80%, #FF5757 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Section header ─────────────────────────────────────────────────── */}
        <div
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Label */}
          <p className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#FF5757]">
            <span aria-hidden className="inline-block h-px w-6 bg-[#FF5757]" />
            {t.sectionLabel}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="font-bold text-white leading-[1.0] tracking-tight"
                style={{
                  fontFamily: "var(--font-display), 'League Spartan', sans-serif",
                  fontSize: "clamp(2.25rem, 5vw, 4rem)",
                }}
              >
                {t.headline}
              </h2>
              <p className="mt-4 font-sans text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
                {t.subheadline}
              </p>
            </div>

            {/* Desktop — View All link */}
            <Link
              href="/speakers"
              className="hidden sm:inline-flex items-center gap-2 text-white/40 text-sm font-sans font-semibold uppercase tracking-wider hover:text-[#FF5757] transition-colors duration-200 shrink-0 pb-1"
            >
              {t.allSpeakers}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Cards — horizontal scroll on mobile, 3-col grid on desktop ─────── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
          }}
        >
          {loading ? (
            /* Skeleton */
            <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-none">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : speakers.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-full bg-[#FF5757]/10 border border-[#FF5757]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FF5757]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-white/30 font-sans text-sm">{t.comingSoon}</p>
            </div>
          ) : (
            /* Speaker cards */
            <div className="-mx-6 px-6 sm:mx-0 sm:px-0">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                  skipSnaps: false,
                  dragFree: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4 md:-ml-6">
                  {speakers.map((speaker, i) => (
                    <CarouselItem 
                      key={speaker.id} 
                      className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.6s ease ${0.1 + (i % 3) * 0.1}s, transform 0.6s ease ${0.1 + (i % 3) * 0.1}s`,
                      }}
                    >
                      <SpeakerCard speaker={speaker} viewProfileLabel={t.viewProfile} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────────── */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          <Link
            href="/speakers"
            id="homepage-explore-all-speakers"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5757] px-8 py-4 font-sans font-semibold text-white text-sm transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,87,87,0.45)] hover:scale-[1.03]"
          >
            {t.exploreAll}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <span className="text-white/20 text-xs font-sans uppercase tracking-widest hidden sm:block">{t.attribution}</span>
        </div>
      </div>

      {/* Thin bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]" />

      <style>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
