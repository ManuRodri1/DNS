import type { MetadataRoute } from "next"
import { DINAMICA_PUBLIC_LAUNCH } from "@/lib/dinamica-ii/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", ...(!DINAMICA_PUBLIC_LAUNCH ? ["/dinamica-ii"] : [])],
    },
    sitemap: "https://www.digitalnomadsummit.co/sitemap.xml",
  }
}
