"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SummitExperience } from "@/components/summit-experience"
import { ZariSection } from "@/components/zari-section"
import { HomepageSpeakers } from "@/components/homepage-speakers"
import { InfluencerCollective } from "@/components/influencer-collective"
import { AttendeeSegments } from "@/components/attendee-segments"
import { Tickets } from "@/components/tickets"
import { SignatureExperiences } from "@/components/signature-experiences"
import { TrustedNetwork } from "@/components/trusted-network"
import { HomepagePressStrip } from "@/components/homepage-press-strip"
import { SponsorCTA } from "@/components/sponsor-cta"
import { Location } from "@/components/location"
import { Contact } from "@/components/contact"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SummitExperience />
      <ZariSection />
      <HomepageSpeakers />
      <TrustedNetwork />
      <HomepagePressStrip />
      <InfluencerCollective />
      <AttendeeSegments />
      <Tickets />
      <SignatureExperiences />
      <SponsorCTA />
      <Location />
      <Contact />
      <FinalCTA />
      <Footer />
      <Leva hidden />
    </>
  )
}
