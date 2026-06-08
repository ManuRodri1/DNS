"use client"

import { Tickets } from "@/components/tickets"
import { Footer } from "@/components/footer"

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-white" data-header-theme="white">
      {/* Spacer to push down content below the fixed header */}
      <div className="h-24 md:h-28 bg-white" />
      <Tickets />
      <Footer />
    </div>
  )
}
