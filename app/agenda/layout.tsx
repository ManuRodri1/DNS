import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Full Agenda | Digital Nomad Summit Santo Domingo 2026",
  description:
    "Explore the full two-day agenda for Digital Nomad Summit Santo Domingo 2026 — keynotes, panels, roundtables, pitch sessions, and signature experiences.",
  alternates: {
    canonical: "https://www.digitalnomadsummit.co/agenda",
    languages: {
      "en-US": "/agenda",
      "es-DO": "/agenda",
    },
  },
  openGraph: {
    title: "Full Agenda | Digital Nomad Summit Santo Domingo 2026",
    description:
      "Explore the full two-day agenda for Digital Nomad Summit Santo Domingo 2026 — keynotes, panels, roundtables, pitch sessions, and signature experiences.",
    url: "https://www.digitalnomadsummit.co/agenda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo 2026 — Full Agenda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Agenda | Digital Nomad Summit Santo Domingo 2026",
    description:
      "Two days of keynotes, panels, pitch sessions, and signature experiences in Santo Domingo.",
    images: ["/og-image.jpg"],
  },
}

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
