import type React from "react"
import type { Metadata, Viewport } from "next"
import { Sora, Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/lib/language-context"
import { AIGuideWidget } from "@/components/ai-guide/ai-guide-widget"

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  // 1. PAGE TITLE & META DESCRIPTION
  title: "Digital Nomad Summit Santo Domingo 2026 | Remote Work • Innovation • Tourism 3.0",
  description:
    "A global summit in Santo Domingo accelerating innovation, remote work, tourism 3.0, real estate, and emerging-market entrepreneurship. August 6–7, 2026 at Catalonia Santo Domingo.",
  keywords: [
    "Digital Nomad Summit",
    "Dominican Republic summit",
    "Santo Domingo conference 2026",
    "remote work Caribbean",
    "tourism 3.0",
    "startup summit DR",
    "real estate innovation DR",
    "Caribbean innovation event",
  ],
  authors: [{ name: "Successment" }],
  robots: "index, follow",

  // 5. CANONICAL URL
  metadataBase: new URL("https://www.digitalnomadsummit.co"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-DO": "/es",
      "x-default": "/",
    },
  },

  // 2. OPEN GRAPH (FACEBOOK / LINKEDIN)
  openGraph: {
    title: "Digital Nomad Summit Santo Domingo 2026",
    description:
      "A global summit bringing together founders, investors, policymakers, and innovators shaping the future of remote work, tourism 3.0, and emerging markets.",
    type: "website",
    url: "https://www.digitalnomadsummit.co/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Summit Santo Domingo 2026",
      },
    ],
    locale: "en_US",
    siteName: "Digital Nomad Summit",
  },

  // 3. TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    title: "Digital Nomad Summit Santo Domingo 2026",
    description: "Two days of innovation, remote work, tourism 3.0, and entrepreneurship in Santo Domingo.",
    images: ["/og-image.jpg"],
  },

  // 6. FAVICONS
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/web-app-manifest-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* 4. Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Digital Nomad Summit",
              url: "https://www.digitalnomadsummit.co",
              logo: "https://www.digitalnomadsummit.co/og-image.jpg",
              description:
                "A global summit accelerating innovation, remote work, tourism 3.0, and emerging-market entrepreneurship in the Caribbean.",
              foundingDate: "2025",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Santo Domingo",
                addressCountry: "DO",
              },
              parentOrganization: {
                "@type": "Organization",
                name: "Successment",
                url: "https://www.successment.co",
              },
              sameAs: [
                "https://www.instagram.com/digitalnomadsummit",
                "https://www.linkedin.com/company/digital-nomad-summit",
              ],
            }),
          }}
        />
        {/* 7. STRUCTURED DATA (GOOGLE EVENT SCHEMA) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Digital Nomad Summit Santo Domingo 2026",
              startDate: "2026-08-06T09:00:00-04:00",
              endDate: "2026-08-07T18:00:00-04:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Catalonia Santo Domingo",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "George Washington Avenue, Malecón",
                  addressLocality: "Santo Domingo",
                  addressRegion: "Distrito Nacional",
                  postalCode: "10205",
                  addressCountry: "DO",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 18.458063395804366,
                  longitude: -69.90981728465985,
                },
              },
              image: ["https://www.digitalnomadsummit.co/og-image.jpg"],
              description:
                "A global summit uniting leaders shaping the future of remote work, tourism 3.0, innovation, and emerging markets in the Caribbean.",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "99",
                highPrice: "399",
                priceCurrency: "USD",
                url: "https://www.digitalnomadsummit.co/#tickets",
                availability: "https://schema.org/InStock",
              },
              organizer: {
                "@type": "Organization",
                name: "Digital Nomad Summit",
                url: "https://www.digitalnomadsummit.co/",
              },
            }),
          }}
        />
        {/* 8. Preload hero image */}
        <link rel="preload" href="/images/promo-20image.jpg" as="image" />
      </head>
      <body className={`${sora.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          {children}
          <AIGuideWidget />
        </LanguageProvider>
      </body>
    </html>
  )
}
