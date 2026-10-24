import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { DinamicaIIPage } from "./dinamica-ii-client"
import {
  DINAMICA_CANONICAL_URL,
  DINAMICA_ASSETS,
  DINAMICA_FORM_AVAILABLE,
  DINAMICA_PRIVACY_NOTICE_URL,
  DINAMICA_PUBLIC_LAUNCH,
  isDinamicPageAvailable,
} from "@/lib/dinamica-ii/config"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Successment’s DINAMICA II Startup Competition | DNS 2027",
  description:
    "Explore the DINAMICA II Exportable Innovation Prize at Digital Nomad Summit Santo Domingo 2027. Qualified startups can compete for US$12,750 in prizes.",
  alternates: { canonical: DINAMICA_CANONICAL_URL },
  robots: DINAMICA_PUBLIC_LAUNCH
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  openGraph: {
    title: "Successment’s DINAMICA II Startup Competition | DNS 2027",
    description:
      "A Dominican-connected startup competition at DNS 2027, with US$8,500 for the Grand Prize and US$4,250 for the Runner-Up.",
    type: "website",
    url: DINAMICA_CANONICAL_URL,
    siteName: "Digital Nomad Summit",
    images: [{ url: DINAMICA_ASSETS.social, width: 1200, height: 630, alt: "A founder presenting at a Dominican technology event" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Successment’s DINAMICA II Startup Competition | DNS 2027",
    description: "US$12,750 in prizes for qualified startups connected to the Dominican Republic.",
    images: [{ url: DINAMICA_ASSETS.social, alt: "A founder presenting at a Dominican technology event" }],
  },
}

export default function DinamicaIIPageRoute() {
  if (!isDinamicPageAvailable()) notFound()

  return (
    <>
      <main id="main-content">
        <DinamicaIIPage
          applicationsOpen={DINAMICA_FORM_AVAILABLE}
          privacyNoticeUrl={DINAMICA_PRIVACY_NOTICE_URL}
        />
      </main>
      <Footer />
    </>
  )
}

