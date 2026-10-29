import type { MetadataRoute } from "next"
import { DINAMICA_LAUNCH_READY } from "@/lib/dinamica-ii/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", ...(!DINAMICA_LAUNCH_READY ? ["/dinamica-ii"] : [])],
    },
    sitemap: "https://www.digitalnomadsummit.co/sitemap.xml",
  }
}
