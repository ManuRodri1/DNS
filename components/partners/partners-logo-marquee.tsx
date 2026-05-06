"use client"

import Image from "next/image"
import { Partner } from "@/lib/data/partners"
import { useRef } from "react"

interface PartnersLogoMarqueeProps {
  partners: Partner[]
}

export function PartnersLogoMarquee({ partners }: PartnersLogoMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (!partners || partners.length === 0) return null

  // Duplicate for seamless loop
  const items = [...partners, ...partners, ...partners]

  return (
    <section className="relative bg-[#0A0A0A] border-y border-white/5 py-8 overflow-hidden">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />

      <div
        ref={trackRef}
        className="flex items-center gap-6 will-change-transform"
        style={{
          animation: "dns-marquee 40s linear infinite",
          width: "max-content",
        }}
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "paused"
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "running"
        }}
      >
        {items.map((partner, i) => {
          const inner = (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 flex items-center gap-4 px-8 py-5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group cursor-pointer"
            >
              {partner.logo_url ? (
                <div className="relative w-32 h-14 flex-shrink-0">
                  <Image
                    src={partner.logo_url}
                    alt={partner.logo_alt || partner.name}
                    fill
                    sizes="128px"
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ) : (
                <span className="text-base font-bold text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap font-display tracking-wide">
                  {partner.name}
                </span>
              )}
            </div>
          )

          return partner.website_url ? (
            <a
              key={`${partner.id}-${i}`}
              href={partner.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] rounded-xl"
              aria-label={partner.name}
            >
              {inner}
            </a>
          ) : (
            <div key={`${partner.id}-${i}`}>{inner}</div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes dns-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
