import type { Metadata } from "next"
import { PressPage } from "@/components/press/press-page"

export const metadata: Metadata = {
  title: "Press Room | Digital Nomad Summit Santo Domingo 2026",
  description:
    "Official media hub for Digital Nomad Summit Santo Domingo 2026, featuring press coverage, media mentions, official releases, and institutional updates.",
  alternates: {
    canonical: "/press",
  },
  openGraph: {
    title: "Press Room | Digital Nomad Summit Santo Domingo 2026",
    description:
      "Official media hub for Digital Nomad Summit Santo Domingo 2026, featuring press coverage, media mentions, official releases, and institutional updates.",
    url: "https://www.digitalnomadsummit.co/press",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Room | Digital Nomad Summit Santo Domingo 2026",
    description:
      "Official media hub for Digital Nomad Summit Santo Domingo 2026, featuring press coverage, media mentions, official releases, and institutional updates.",
    images: ["/og-image.jpg"],
  },
}

export default function Page() {
  return <PressPage />
}
