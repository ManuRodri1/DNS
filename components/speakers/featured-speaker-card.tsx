"use client"

// components/speakers/featured-speaker-card.tsx
// Large editorial / poster-style card for featured speakers

import Link from "next/link"
import Image from "next/image"
import type { Speaker } from "@/lib/airtable-speakers"
import { TopicPill } from "./topic-pill"
import { CompanyLogos } from "./company-logos"

interface FeaturedSpeakerCardProps {
  speaker: Speaker
  /** When true, renders in a wider single-column hero layout */
  hero?: boolean
}

export function FeaturedSpeakerCard({ speaker, hero = false }: FeaturedSpeakerCardProps) {
  // Headshot first → Poster Image as fallback → no image
  const image = speaker.headshot || speaker.posterImage || null

  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#0d0d0d] border border-white/8 transition-all duration-400 hover:border-[#FF5757]/50 hover:shadow-[0_8px_60px_rgba(255,87,87,0.12)] ${
        hero ? "md:flex-row min-h-[420px]" : "min-h-[480px]"
      }`}
    >
      {/* Coral accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5757] via-[#FF5757]/60 to-transparent z-10" />

      {/* Image panel */}
      <div
        className={`relative overflow-hidden bg-[#111] shrink-0 ${
          hero ? "w-full md:w-[45%] aspect-[4/5] md:aspect-auto" : "w-full aspect-[4/5]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={`${speaker.fullName} — featured speaker at Digital Nomad Summit`}
            fill
            className="object-cover object-center transition-transform duration-600 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
            <div className="w-24 h-24 rounded-full bg-[#FF5757]/10 border border-[#FF5757]/20 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#FF5757]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-white/20 text-xs font-sans uppercase tracking-widest">DNS 2026</span>
          </div>
        )}

        {/* Dark gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </div>

      {/* Content panel */}
      <div className={`relative flex flex-col justify-end p-6 md:p-8 flex-1 z-10 ${hero ? "" : "-mt-8"}`}>
        {/* Speaker type label */}
        {speaker.speakerType && (
          <p className="text-[#FF5757] text-[10px] font-bold uppercase tracking-[0.25em] font-sans mb-3">
            {speaker.speakerType}
          </p>
        )}

        {/* Name — oversized editorial */}
        <h3
          className="text-white font-bold leading-[1.0] tracking-tight mb-2 transition-colors duration-200 group-hover:text-[#FF5757]"
          style={{
            fontFamily: "var(--font-display), 'League Spartan', sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
          }}
        >
          {speaker.fullName}
        </h3>

        {/* Title + company text */}
        {(speaker.jobTitle || speaker.company) && (
          <p className="text-white/55 text-sm font-sans leading-snug mb-4">
            {speaker.jobTitle}
            {speaker.jobTitle && speaker.company && " · "}
            <span className="text-white/75">{speaker.company}</span>
          </p>
        )}

        {/* Company logos — md size for feature cards, clearly legible */}
        {(speaker.companyLogoPrimary || speaker.companyLogoSecondary) && (
          <CompanyLogos
            primary={speaker.companyLogoPrimary}
            secondary={speaker.companyLogoSecondary}
            primaryAlt={`${speaker.company} logo`}
            secondaryAlt={`${speaker.company} secondary logo`}
            size="md"
            className="mb-4"
          />
        )}

        {/* Quote */}
        {speaker.quote && (
          <p className="text-white/40 text-sm font-sans italic leading-relaxed mb-4 line-clamp-2">
            &ldquo;{speaker.quote}&rdquo;
          </p>
        )}

        {/* Topics */}
        {speaker.topics.slice(0, 3).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {speaker.topics.slice(0, 3).map((t) => (
              <TopicPill key={t} label={t} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[#FF5757] text-sm font-bold font-sans uppercase tracking-wider group-hover:gap-3 transition-all duration-200">
            View Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>

          {(speaker.city || speaker.country) && (
            <span className="text-white/25 text-xs font-sans flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {[speaker.city, speaker.country].filter(Boolean).join(", ")}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
