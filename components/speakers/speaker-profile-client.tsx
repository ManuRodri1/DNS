"use client"

// components/speakers/speaker-profile-client.tsx
// Full speaker profile page — client component for state management

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Speaker } from "@/lib/airtable-speakers"
import { TopicPill } from "./topic-pill"
import { SocialLinks } from "./social-links"
import { SpeakerCard } from "./speaker-card"
import { CompanyLogos } from "./company-logos"
import { SponsorModal } from "@/components/sponsor-modal"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

// ─── Translations ──────────────────────────────────────────────────────────────────────────────
const content = {
  en: {
    session: "Session",
    about: "About",
    aboutCompany: (name: string) => `About ${name || "the Company"}`,
    speakerInfo: "Speaker Info",
    type: "Type",
    industry: "Industry",
    language: "Language",
    location: "Location",
    topics: "Topics",
    theEvent: "The Event",
    eventDate: "August 6–7, 2026",
    eventVenue: "Catalonia Santo Domingo",
    getTicket: "Get your ticket",
    exploreMore: "Explore More",
    moreSpeakers: "More Speakers",
    viewAll: "View All",
    viewAllSpeakers: "View All Speakers",
    backToSpeakers: "Back to Speakers",
    callForSpeakers: "Call for Speakers",
    shareVoice: "Want to share your voice?",
    ctaBody:
      "We\u2019re looking for builders, operators, leaders, and thinkers shaping the future of work, mobility, innovation, and global opportunity.",
    applyBtn: "Apply to be a Speaker",
  },
  es: {
    session: "Sesi\u00f3n",
    about: "Acerca de",
    aboutCompany: (name: string) => `Acerca de ${name || "la Empresa"}`,
    speakerInfo: "Info del Speaker",
    type: "Tipo",
    industry: "Industria",
    language: "Idioma",
    location: "Ubicaci\u00f3n",
    topics: "Temas",
    theEvent: "El Evento",
    eventDate: "6–7 de agosto de 2026",
    eventVenue: "Catalonia Santo Domingo",
    getTicket: "Consigue tu entrada",
    exploreMore: "Explorar M\u00e1s",
    moreSpeakers: "M\u00e1s Speakers",
    viewAll: "Ver Todos",
    viewAllSpeakers: "Ver Todos los Speakers",
    backToSpeakers: "Volver a Speakers",
    callForSpeakers: "Convocatoria de Speakers",
    shareVoice: "\u00bfQuieres compartir tu voz?",
    ctaBody:
      "Buscamos constructores, operadores, l\u00edderes y pensadores que est\u00e9n dando forma al futuro del trabajo, la movilidad, la innovaci\u00f3n y la oportunidad global.",
    applyBtn: "Postularse como Speaker",
  },
}

// ─── Session block (conditionally rendered) ────────────────────────────────────
function SessionBlock({ speaker, sessionLabel }: { speaker: Speaker; sessionLabel: string }) {
  const hasSession =
    speaker.sessionTitle ||
    speaker.sessionDescription ||
    speaker.sessionDate ||
    speaker.sessionTime ||
    speaker.sessionStage

  if (!hasSession) return null

  return (
    <div className="rounded-2xl border border-[#FF5757]/20 bg-[#FF5757]/5 p-6 md:p-8">
      <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-3">{sessionLabel}</p>
      {speaker.sessionTitle && (
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          {speaker.sessionTitle}
        </h3>
      )}
      {speaker.sessionDescription && (
        <p className="text-white/60 font-sans text-sm leading-relaxed mb-4">{speaker.sessionDescription}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm font-sans">
        {speaker.sessionDate && (
          <span className="flex items-center gap-2 text-white/50">
            <svg className="w-4 h-4 text-[#FF5757]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {speaker.sessionDate}
          </span>
        )}
        {speaker.sessionTime && (
          <span className="flex items-center gap-2 text-white/50">
            <svg className="w-4 h-4 text-[#FF5757]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {speaker.sessionTime}
          </span>
        )}
        {speaker.sessionStage && (
          <span className="flex items-center gap-2 text-white/50">
            <svg className="w-4 h-4 text-[#FF5757]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {speaker.sessionStage}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Speaker profile client ────────────────────────────────────────────────────
export function SpeakerProfileClient({
  speaker,
  related,
}: {
  speaker: Speaker
  related: Speaker[]
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const { language } = useLanguage()
  const t = content[language]
  // Headshot first → Poster Image as fallback → no image
  const image = speaker.headshot || speaker.posterImage || null
  const bio = speaker.longBio || speaker.shortBio

  return (
    <main className="bg-black min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full bg-black overflow-hidden"
        data-header="dark"
        aria-label="Speaker profile"
      >
        {/* Coral gradient bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle at 70% 30%, #FF5757 0%, transparent 65%)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-32 pb-16">
          {/* Back link */}
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 text-white/40 text-sm font-sans hover:text-[#FF5757] transition-colors duration-200 mb-10 group"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.backToSpeakers}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                {/* Top coral accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5757] to-transparent z-10" />

                {image ? (
                  <Image
                    src={image}
                    alt={`${speaker.fullName} — Digital Nomad Summit 2026`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#1a1a1a] flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#FF5757]/10 border border-[#FF5757]/20 flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-[#FF5757]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-white/20 text-xs font-sans uppercase tracking-widest">DNS 2026</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

            </div>
            {/* No logos in image column — they live in the info column for reading hierarchy */}

            {/* Right: info */}
            <div className="flex flex-col gap-5">
              {speaker.speakerType && (
                <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.28em] font-sans">{speaker.speakerType}</p>
              )}

              <h1
                className="text-white font-bold leading-[1.0] tracking-tight"
                style={{ fontFamily: "var(--font-display), 'League Spartan', sans-serif", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
              >
                {speaker.fullName}
              </h1>

              {(speaker.jobTitle || speaker.company) && (
                <p className="text-white/70 font-sans text-lg leading-snug">
                  {speaker.jobTitle}
                  {speaker.jobTitle && speaker.company && <span className="text-white/30"> · </span>}
                  <span className="text-white/90 font-semibold">{speaker.company}</span>
                </p>
              )}

              {/* Company logos — lg size, prominent trust signal in info column */}
              {(speaker.companyLogoPrimary || speaker.companyLogoSecondary) && (
                <CompanyLogos
                  primary={speaker.companyLogoPrimary}
                  secondary={speaker.companyLogoSecondary}
                  primaryAlt={`${speaker.company} logo`}
                  secondaryAlt={`${speaker.company} secondary logo`}
                  size="lg"
                />
              )}

              {(speaker.city || speaker.country) && (
                <div className="flex items-center gap-2 text-white/40 text-sm font-sans">
                  <svg className="w-4 h-4 text-[#FF5757]/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {[speaker.city, speaker.country].filter(Boolean).join(", ")}
                </div>
              )}

              <SocialLinks linkedin={speaker.linkedin} instagram={speaker.instagram} website={speaker.website} />

              <div className="h-px bg-white/8 w-full" />

              {speaker.shortBio && (
                <p className="text-white/70 font-sans text-base leading-relaxed">{speaker.shortBio}</p>
              )}

              {speaker.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {speaker.topics.map((t) => <TopicPill key={t} label={t} />)}
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm font-sans text-white/40">
                {speaker.industry && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5757]/40" />{speaker.industry}
                  </span>
                )}
                {speaker.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />{speaker.language}
                  </span>
                )}
                {speaker.speakerCategory && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />{speaker.speakerCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#050505]" aria-label="Speaker details">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main — 2/3 */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {bio && (
                <div>
                  <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-4">{t.about}</p>
                  <div className="text-white/65 font-sans text-base leading-relaxed whitespace-pre-line">{bio}</div>
                </div>
              )}

              {speaker.quote && (
                <blockquote className="relative border-l-2 border-[#FF5757] pl-6 py-2">
                  <p className="text-white/80 font-sans text-lg italic leading-relaxed">&ldquo;{speaker.quote}&rdquo;</p>
                </blockquote>
              )}

              {speaker.companyDescription && (
                <div>
                  <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-4">
                    {t.aboutCompany(speaker.company)}
                  </p>
                  <p className="text-white/55 font-sans text-sm leading-relaxed">{speaker.companyDescription}</p>
                </div>
              )}

              <SessionBlock speaker={speaker} sessionLabel={t.session} />
            </div>

            {/* Sidebar — 1/3 */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-6">
                <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-4">{t.speakerInfo}</p>
                <ul className="flex flex-col gap-3 text-sm font-sans">
                  {speaker.speakerType && (
                    <li className="flex items-center justify-between">
                      <span className="text-white/35">{t.type}</span>
                      <span className="text-white/75 font-medium">{speaker.speakerType}</span>
                    </li>
                  )}
                  {speaker.industry && (
                    <li className="flex items-center justify-between">
                      <span className="text-white/35">{t.industry}</span>
                      <span className="text-white/75 font-medium">{speaker.industry}</span>
                    </li>
                  )}
                  {speaker.language && (
                    <li className="flex items-center justify-between">
                      <span className="text-white/35">{t.language}</span>
                      <span className="text-white/75 font-medium">{speaker.language}</span>
                    </li>
                  )}
                  {(speaker.city || speaker.country) && (
                    <li className="flex items-center justify-between">
                      <span className="text-white/35">{t.location}</span>
                      <span className="text-white/75 font-medium">{[speaker.city, speaker.country].filter(Boolean).join(", ")}</span>
                    </li>
                  )}
                </ul>
                <div className="mt-5 pt-5 border-t border-white/8">
                  <SocialLinks linkedin={speaker.linkedin} instagram={speaker.instagram} website={speaker.website} size="sm" />
                </div>
              </div>

              {speaker.topics.length > 0 && (
                <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-6">
                  <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-4">{t.topics}</p>
                  <div className="flex flex-wrap gap-2">
                    {speaker.topics.map((tp) => <TopicPill key={tp} label={tp} />)}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#FF5757]/15 bg-[#FF5757]/5 p-6">
                <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-3">{t.theEvent}</p>
                <p className="text-white font-bold font-sans text-base mb-1">DNS Santo Domingo 2026</p>
                <p className="text-white/50 text-sm font-sans mb-1">{t.eventDate}</p>
                <p className="text-white/40 text-sm font-sans mb-4">{t.eventVenue}</p>
                <Link href="/#tickets" className="inline-flex items-center gap-2 text-[#FF5757] text-sm font-bold font-sans hover:gap-3 transition-all duration-200">
                  {t.getTicket}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More Speakers ─────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-black" aria-label="More speakers">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-3">{t.exploreMore}</p>
                <h2 className="text-white font-bold" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
                  {t.moreSpeakers}
                </h2>
              </div>
              <Link href="/speakers" className="hidden sm:inline-flex items-center gap-2 text-[#FF5757] text-sm font-bold font-sans hover:gap-3 transition-all duration-200 uppercase tracking-wider">
                {t.viewAll}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => <SpeakerCard key={s.id} speaker={s} />)}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/speakers" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white/70 text-sm font-sans hover:border-[#FF5757]/40 hover:text-[#FF5757] transition-all duration-200">
                {t.viewAllSpeakers}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Apply CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#080808] overflow-hidden py-20 px-6" aria-label="Apply to speak">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF5757]" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[#FF5757] text-[11px] font-bold uppercase tracking-[0.25em] font-sans mb-4">{t.callForSpeakers}</p>
          <h2 className="text-white font-bold mb-5" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {t.shareVoice}
          </h2>
          <p className="text-white/50 font-sans text-base leading-relaxed mb-8 max-w-xl mx-auto">{t.ctaBody}</p>
          <button
            id="speaker-profile-apply-cta"
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5757] px-8 py-4 font-sans font-bold text-white text-sm transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,87,87,0.45)] hover:scale-[1.03]"
          >
            {t.applyBtn}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />

      <SponsorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="speaker"
      />
    </main>
  )
}
