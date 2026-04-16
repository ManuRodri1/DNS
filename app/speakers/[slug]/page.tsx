// app/speakers/[slug]/page.tsx
// Server component — fetches speaker + related data, renders client profile shell

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSpeakers, getSpeakerBySlug, getSpeakerSlugs } from "@/lib/airtable-speakers"
import type { Speaker } from "@/lib/airtable-speakers"
import { SpeakerProfileClient } from "@/components/speakers/speaker-profile-client"

// ISR — revalidate every 5 minutes
export const revalidate = 300

// ─── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getSpeakerSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const speaker = await getSpeakerBySlug(slug)
  if (!speaker) return { title: "Speaker | Digital Nomad Summit 2026" }

  const title =
    speaker.seoTitle || `${speaker.fullName} — Speaker at Digital Nomad Summit 2026`
  const description =
    speaker.seoDescription ||
    speaker.shortBio ||
    `${speaker.fullName} is speaking at Digital Nomad Summit Santo Domingo 2026.`

  // Prefer headshot for social previews; Poster Image as fallback
  const socialImage = speaker.headshot || speaker.posterImage || null

  return {
    title,
    description,
    alternates: { canonical: `https://www.digitalnomadsummit.co/speakers/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.digitalnomadsummit.co/speakers/${slug}`,
      images: socialImage
        ? [{ url: socialImage, alt: `${speaker.fullName} — DNS 2026` }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : ["/og-image.jpg"],
    },
  }
}

// ─── Related speakers (same industry/topics → featured → display order) ────────
function getRelatedSpeakers(current: Speaker, all: Speaker[]): Speaker[] {
  const others = all.filter((s) => s.id !== current.id)
  const scored = others.map((s) => {
    let score = 0
    if (current.industry && s.industry === current.industry) score += 3
    const shared = s.topics.filter((t) => current.topics.includes(t)).length
    score += shared * 2
    if (s.featured) score += 1
    return { speaker: s, score }
  })
  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.speaker.displayOrder !== b.speaker.displayOrder)
        return a.speaker.displayOrder - b.speaker.displayOrder
      return a.speaker.fullName.localeCompare(b.speaker.fullName)
    })
    .slice(0, 3)
    .map((x) => x.speaker)
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [speaker, allSpeakers] = await Promise.all([
    getSpeakerBySlug(slug),
    getSpeakers(),
  ])

  if (!speaker) notFound()

  const related = getRelatedSpeakers(speaker, allSpeakers)

  return <SpeakerProfileClient speaker={speaker} related={related} />
}
