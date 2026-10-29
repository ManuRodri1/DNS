import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { DinamicaIIPage } from "./dinamica-ii-client"
import {
  DINAMICA_CANONICAL_URL,
  DINAMICA_ASSETS,
  DINAMICA_FORM_VISIBLE,
  DINAMICA_FORM_SUBMISSION_ENABLED,
  DINAMICA_LAUNCH_READY,
  DINAMICA_PRIVACY_NOTICE_URL,
  isDinamicPageAvailable,
} from "@/lib/dinamica-ii/config"

export const dynamic = "force-dynamic"

const DINAMICA_PAGE_TITLE = "DINAMICA II Startup Competition | Digital Nomad Summit 2027"
const DINAMICA_PAGE_DESCRIPTION =
  "DINAMICA II is the DNS 2027 startup competition in Santo Domingo for Dominican-connected startups, with US$12,750 in prizes and up to 10 finalists."
const DINAMICA_SOCIAL_ALT = "Digital Nomad Summit Santo Domingo 2027 event logo"

export const metadata: Metadata = {
  title: DINAMICA_PAGE_TITLE,
  description: DINAMICA_PAGE_DESCRIPTION,
  keywords: [
    "DINAMICA II",
    "DINAMICA II Exportable Innovation Prize",
    "startup competition Dominican Republic",
    "startup competition Santo Domingo",
    "Digital Nomad Summit 2027",
    "Caribbean innovation prize",
  ],
  authors: [{ name: "Successment" }],
  creator: "Successment",
  publisher: "Digital Nomad Summit",
  category: "Business",
  alternates: { canonical: DINAMICA_CANONICAL_URL },
  robots: DINAMICA_LAUNCH_READY
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, noarchive: true },
  openGraph: {
    title: DINAMICA_PAGE_TITLE,
    description: DINAMICA_PAGE_DESCRIPTION,
    type: "website",
    url: DINAMICA_CANONICAL_URL,
    siteName: "Digital Nomad Summit",
    images: [
      {
        url: DINAMICA_ASSETS.social,
        width: DINAMICA_ASSETS.socialWidth,
        height: DINAMICA_ASSETS.socialHeight,
        alt: DINAMICA_SOCIAL_ALT,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DINAMICA_PAGE_TITLE,
    description: DINAMICA_PAGE_DESCRIPTION,
    images: [{ url: DINAMICA_ASSETS.social, alt: DINAMICA_SOCIAL_ALT }],
  },
}

const DINAMICA_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${DINAMICA_CANONICAL_URL}#webpage`,
  url: DINAMICA_CANONICAL_URL,
  name: DINAMICA_PAGE_TITLE,
  description: DINAMICA_PAGE_DESCRIPTION,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://www.digitalnomadsummit.co/#website",
    url: "https://www.digitalnomadsummit.co/",
    name: "Digital Nomad Summit",
  },
  about: {
    "@type": "Thing",
    name: "DINAMICA II Exportable Innovation Prize",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: DINAMICA_ASSETS.social,
    width: DINAMICA_ASSETS.socialWidth,
    height: DINAMICA_ASSETS.socialHeight,
    caption: DINAMICA_SOCIAL_ALT,
  },
  publisher: {
    "@type": "Organization",
    name: "Successment",
    url: "https://www.successment.co",
  },
}

export default function DinamicaIIPageRoute() {
  if (!isDinamicPageAvailable()) notFound()

  return (
    <>
      <script
        id="dinamica-ii-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DINAMICA_STRUCTURED_DATA) }}
      />
      <main id="main-content">
        <DinamicaIIPage
          formVisible={DINAMICA_FORM_VISIBLE}
          submissionEnabled={DINAMICA_FORM_SUBMISSION_ENABLED}
          privacyNoticeUrl={DINAMICA_PRIVACY_NOTICE_URL}
        />
      </main>
      <Footer />
    </>
  )
}

