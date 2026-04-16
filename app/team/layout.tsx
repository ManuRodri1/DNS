import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Team | Digital Nomad Summit Santo Domingo",
  description:
    "Meet the team behind the Digital Nomad Summit Santo Domingo and the people shaping the US–Caribbean innovation corridor.",
  alternates: {
    canonical: "https://www.digitalnomadsummit.co/team",
  },
  openGraph: {
    title: "Team | Digital Nomad Summit Santo Domingo",
    description:
      "Meet the team behind the Digital Nomad Summit Santo Domingo and the people shaping the US–Caribbean innovation corridor.",
    url: "https://www.digitalnomadsummit.co/team",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo — Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | Digital Nomad Summit Santo Domingo",
    description:
      "Meet the team behind the Digital Nomad Summit Santo Domingo and the people shaping the US–Caribbean innovation corridor.",
    images: ["/og-image.jpg"],
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
