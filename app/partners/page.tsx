import { getPartnersGroupedBySection } from "@/lib/data/partners"
import { PartnersPageClient } from "@/components/partners/partners-page-client"
import { Metadata } from "next"

// Revalidate every 5 minutes (ISR)
export const revalidate = 300

export const metadata: Metadata = {
  title: "Sponsors & Partners | Digital Nomad Summit Santo Domingo 2027",
  description:
    "Partner with the Digital Nomad Summit Santo Domingo 2027 and connect your brand with founders, investors, policymakers, institutions, and global operators shaping Caribbean innovation, mobility, tourism, and emerging-market growth.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Sponsors & Partners | Digital Nomad Summit Santo Domingo 2027",
    description: "Partner with the Digital Nomad Summit Santo Domingo 2027 and connect your brand with global operators shaping Caribbean innovation.",
    url: "https://www.digitalnomadsummit.co/partners",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors & Partners | Digital Nomad Summit Santo Domingo 2027",
    description: "Partner with Digital Nomad Summit Santo Domingo 2027 and connect with Caribbean innovation leaders.",
    images: ["/og-image.jpg"],
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
