import { getPartnersGroupedBySection } from "@/lib/data/partners"
import { PartnersPageClient } from "@/components/partners/partners-page-client"
import { Metadata } from "next"

// Revalidate every 5 minutes (ISR)
export const revalidate = 300

export const metadata: Metadata = {
  title: "Sponsors & Partners | Digital Nomad Summit Santo Domingo 2026",
  description:
    "Partner with the Digital Nomad Summit Santo Domingo 2026 and connect your brand with founders, investors, policymakers, institutions, and global operators shaping Caribbean innovation, mobility, tourism, and emerging-market growth.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Sponsors & Partners | Digital Nomad Summit",
    description: "Partner with the Digital Nomad Summit Santo Domingo 2026 and connect your brand with global operators shaping Caribbean innovation.",
    url: "https://www.digitalnomadsummit.co/partners",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo 2026",
      },
    ],
  },
}

export default async function PartnersPage() {
  const groupedPartners = await getPartnersGroupedBySection()

  return (
    <main>
      <PartnersPageClient groupedPartners={groupedPartners} />
    </main>
  )
}
