import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tickets | Digital Nomad Summit Santo Domingo 2027",
  description:
    "Get your ticket for Digital Nomad Summit 2027 and join entrepreneurs, creators, and remote professionals for a global networking experience.",
  alternates: {
    canonical: "https://www.digitalnomadsummit.co/tickets",
    languages: {
      "en-US": "/tickets",
      "es-DO": "/tickets",
    },
  },
  openGraph: {
    title: "Tickets | Digital Nomad Summit Santo Domingo 2027",
    description:
      "Get your ticket for Digital Nomad Summit 2027 and join entrepreneurs, creators, and remote professionals for a global networking experience.",
    url: "https://www.digitalnomadsummit.co/tickets",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit 2027 Tickets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tickets | Digital Nomad Summit Santo Domingo 2027",
    description:
      "Get your ticket for Digital Nomad Summit 2027 and join entrepreneurs, creators, and remote professionals for a global networking experience.",
    images: ["/og-image.jpg"],
  },
}

export default function TicketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
