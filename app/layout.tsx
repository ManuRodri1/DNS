import type React from "react"
import type { Metadata, Viewport } from "next"
import { Sora, Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/lib/language-context"
import { AIGuideWidget } from "@/components/ai-guide/ai-guide-widget"
import { EventUpdateModal } from "@/components/event-update-modal"
import {
  EVENT_DISPLAY_NAME,
  EVENT_END_DATE,
  EVENT_START_DATE,
  VENUE_NAME,
} from "@/lib/event-config"
import Script from "next/script"

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
  title: "Digital Nomad Summit Santo Domingo 2027 | Innovation, Investment & Global Mobility",
  description:
    "Join founders, investors, policymakers, brands, and global innovators April 8–9, 2027 at Crowne Plaza Santo Domingo.",
  keywords: [
    "Digital Nomad Summit",
    "Dominican Republic summit",
    "Santo Domingo conference 2027",
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
    title: EVENT_DISPLAY_NAME,
    description:
      "Innovation, investment, and global mobility meet April 8–9, 2027 at Crowne Plaza Santo Domingo.",
    type: "website",
    url: "https://www.digitalnomadsummit.co/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: EVENT_DISPLAY_NAME,
      },
    ],
    locale: "en_US",
    siteName: "Digital Nomad Summit",
  },

  // 3. TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    title: EVENT_DISPLAY_NAME,
    description: "Two days of innovation, investment, global mobility, and entrepreneurship in Santo Domingo.",
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
    <html lang="en" suppressHydrationWarning>
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
              name: EVENT_DISPLAY_NAME,
              startDate: EVENT_START_DATE,
              endDate: EVENT_END_DATE,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: VENUE_NAME,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. George Washington 218",
                  addressLocality: "Santo Domingo",
                  addressCountry: "DO",
                },
              },
              image: ["https://www.digitalnomadsummit.co/og-image.jpg"],
              description:
                "A global summit uniting leaders shaping the future of remote work, tourism 3.0, innovation, and emerging markets in the Caribbean.",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "149",
                highPrice: "399",
                priceCurrency: "USD",
                url: "https://www.digitalnomadsummit.co/tickets",
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
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
      </head>
      <body className={`${sora.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          {children}
          <AIGuideWidget />
          <EventUpdateModal />
        </LanguageProvider>
        {/* Klaviyo Onsite Script */}
        <Script
          id="klaviyo-onsite"
          strategy="afterInteractive"
          src="https://static.klaviyo.com/onsite/js/XEHeKi/klaviyo.js?company_id=XEHeKi"
        />
        <Script
          id="klaviyo-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`
          }}
        />
      </body>
    </html>
  )
}
