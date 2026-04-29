import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // NOTE: `unoptimized` removed — Vercel handles image optimization in production.
    // Airtable serves attachments from multiple CDN subdomains; both patterns are covered.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nwlajcj4k3xtonve.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        // Airtable attachment CDN (primary)
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        // Airtable attachment CDN (wildcard for future subdomain changes)
        protocol: "https",
        hostname: "*.airtableusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        // Cloudinary CDN
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        // Supabase Storage
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
