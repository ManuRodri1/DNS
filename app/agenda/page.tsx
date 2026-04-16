"use client"

import { AgendaHero } from "@/components/agenda/agenda-hero"
import { AgendaContent } from "@/components/agenda/agenda-content"
import { AgendaCTA } from "@/components/agenda/agenda-cta"
import { Footer } from "@/components/footer"

export default function AgendaPage() {
  return (
    <>
      <AgendaHero />
      <AgendaContent />
      <AgendaCTA />
      <Footer />
    </>
  )
}
