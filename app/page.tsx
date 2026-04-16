"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SummitExperience } from "@/components/summit-experience"
import { ZariSection } from "@/components/zari-section"
import { HomepageSpeakers } from "@/components/homepage-speakers"
import { SpeakerCTA } from "@/components/speaker-cta"
import { InfluencerCollective } from "@/components/influencer-collective"
import { AttendeeSegments } from "@/components/attendee-segments"
import { Tickets } from "@/components/tickets"
import { SignatureExperiences } from "@/components/signature-experiences"
import { SponsorsCarousel } from "@/components/sponsors-carousel"
import { SponsorCTA } from "@/components/sponsor-cta"
import { Location } from "@/components/location"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      {/* 1 */ }<Hero />
      {/* 2 */ }<About />
      {/* 3 */ }<SummitExperience />
      {/* 4 */ }<ZariSection />
      {/* 5 — NEW: Featured Speakers section */ }<HomepageSpeakers />
      {/* 6 — NEW: Apply as Speaker CTA (opens speaker modal) */ }<SpeakerCTA />
      {/* 7 */ }<InfluencerCollective />
      {/* 8 */ }<AttendeeSegments />
      {/* 9 */ }<Tickets />
      {/* 10 */ }<SignatureExperiences />
      {/* 11 */ }<SponsorsCarousel />
      {/* 12 — Sponsor partnership CTA (sponsor modal only, no speaker content) */ }<SponsorCTA />
      {/* 13 */ }<Location />
      {/* 14 */ }<Contact />
      <Footer />
      <Leva hidden />
    </>
  )
}
