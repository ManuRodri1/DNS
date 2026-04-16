import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Speakers | Digital Nomad Summit Santo Domingo 2026",
  description:
    "Meet the founders, executives, investors, policymakers, and innovators speaking at Digital Nomad Summit Santo Domingo 2026. Apply to join the stage.",
  alternates: {
    canonical: "https://www.digitalnomadsummit.co/speakers",
    languages: {
      "en-US": "/speakers",
      "es-DO": "/speakers",
    },
  },
  openGraph: {
    title: "Speakers | Digital Nomad Summit Santo Domingo 2026",
    description:
      "Founders, executives, policymakers, investors, and innovators joining Digital Nomad Summit Santo Domingo — August 6–7, 2026.",
    url: "https://www.digitalnomadsummit.co/speakers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit 2026 Speakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakers | Digital Nomad Summit Santo Domingo 2026",
    description: "Meet the voices shaping the future at DNS Santo Domingo 2026.",
    images: ["/og-image.jpg"],
  },
}

export default function SpeakersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
