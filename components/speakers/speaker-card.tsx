"use client"

// components/speakers/speaker-card.tsx
// Directory grid card — links to /speakers/[slug]

import Link from "next/link"
import Image from "next/image"
import type { Speaker } from "@/lib/airtable-speakers"
import { TopicPill } from "./topic-pill"
import { SocialLinks } from "./social-links"
import { CompanyLogos } from "./company-logos"

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  // Headshot first → Poster Image as fallback → no image
  const image = speaker.headshot || speaker.posterImage || null
  const visibleTopics = speaker.topics.slice(0, 2)
  const hasMoreTopics = speaker.topics.length > 2

  const hasLogos = !!(speaker.companyLogoPrimary || speaker.companyLogoSecondary)

  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#FF5757]/40 hover:shadow-[0_0_40px_rgba(255,87,87,0.08)] hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111]">
        {image ? (
          <Image
            src={image}
            alt={`${speaker.fullName} — speaker at Digital Nomad Summit`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          // Branded placeholder
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111] to-[#1a1a1a]">
            <div className="w-20 h-20 rounded-full bg-[#FF5757]/10 border border-[#FF5757]/20 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-[#FF5757]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-white/20 text-xs font-sans uppercase tracking-widest">DNS 2026</span>
          </div>
        )}

        {/* Coral accent line at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5757] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {speaker.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5757] rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider font-sans">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name + title */}
        <div>
          <h3
            className="text-white font-bold text-lg leading-tight tracking-tight group-hover:text-[#FF5757] transition-colors duration-200"
            style={{ fontFamily: "var(--font-display), 'League Spartan', sans-serif" }}
          >
            {speaker.fullName}
          </h3>
          {(speaker.jobTitle || speaker.company) && (
            <p className="text-white/50 text-sm font-sans mt-1 leading-snug">
              {speaker.jobTitle}
              {speaker.jobTitle && speaker.company && " · "}
              {speaker.company}
            </p>
          )}
        </div>

        {/* Company logos — key trust signal, placed prominently below title */}
        {hasLogos && (
          <CompanyLogos
            primary={speaker.companyLogoPrimary}
            secondary={speaker.companyLogoSecondary}
            primaryAlt={`${speaker.company} logo`}
            secondaryAlt={`${speaker.company} secondary logo`}
            size="sm"
          />
        )}

        {/* Location */}
        {(speaker.city || speaker.country) && (
          <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{[speaker.city, speaker.country].filter(Boolean).join(", ")}</span>
          </div>
        )}

        {/* Topics — capped at 2, more room now that logos are shown */}
        {visibleTopics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {visibleTopics.map((topic) => (
              <TopicPill key={topic} label={topic} />
            ))}
            {hasMoreTopics && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white/30 border border-white/10">
                +{speaker.topics.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Bottom row: social + view profile arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-1">
          <SocialLinks
            linkedin={speaker.linkedin}
            instagram={speaker.instagram}
            website={speaker.website}
            size="sm"
          />
          <span className="text-[#FF5757] text-xs font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all duration-200 uppercase tracking-wider">
            View
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
