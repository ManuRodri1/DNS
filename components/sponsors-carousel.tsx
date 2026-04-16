"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const SponsorModal = dynamic(() => import("./sponsor-modal").then((mod) => mod.SponsorModal), { ssr: false })

const content = {
  en: {
    title: "Partners & Sponsors",
    subtitle: "Global innovators powering the Digital Nomad Summit",
    ctaText: "Partner With the Summit",
  },
  es: {
    title: "Socios y Patrocinadores",
    subtitle: "Innovadores globales impulsando el Digital Nomad Summit",
    ctaText: "Asociarse con el Summit",
  },
}

interface Partner {
  id: string
  name: string
  logo: string
  websiteUrl: string
  category: string
  displayOrder: number
}

export function SponsorsCarousel() {
  const { language } = useLanguage()
  const t = content[language]
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false)
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/partners")
        if (response.ok) {
          const data = await response.json()
          setPartners(data.partners || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching partners:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPartners()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const displayPartners = partners.length > 0 ? [...partners, ...partners, ...partners] : []

  return (
    <section id="partners-section" className="relative w-full overflow-hidden bg-[#FF5757] py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-32 bg-white/60" />
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white md:text-xl">
            {t.subtitle}
          </p>
        </div>

        <div className="relative mb-16 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
          ) : partners.length > 0 ? (
            <div
              className={`flex gap-8 md:gap-12 py-8 ${
                isMobile ? "animate-scroll-mobile" : "animate-scroll-desktop"
              } hover:pause-animation`}
            >
              {displayPartners.map((partner, index) => (
                <a
                  key={`${partner.id}-${index}`}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 flex-col items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="flex h-32 w-64 md:h-40 md:w-80 items-center justify-center rounded-2xl bg-white/12 p-4 md:p-6 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`Partner logo - ${partner.name}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  {/* Partner Name */}
                  <span className="text-xs md:text-sm font-medium text-white/70 text-center transition-colors duration-300 group-hover:text-white group-hover:underline decoration-[#FF5757] underline-offset-4">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/80 py-16">No partners to display</p>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button
            onClick={() => setIsSponsorModalOpen(true)}
            size="lg"
            className="bg-white text-[#FF5757] hover:bg-[#FF5757] hover:text-white border-2 border-white transition-all duration-300"
          >
            {t.ctaText}
          </Button>
        </div>
      </div>

      {/* Sponsor Modal */}
      {isSponsorModalOpen && (
        <>
          <SponsorModal isOpen={isSponsorModalOpen} onClose={() => setIsSponsorModalOpen(false)} />
        </>
      )}

      <style jsx>{`
        @keyframes scroll-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-desktop {
          animation: scroll-infinite 40s linear infinite;
        }

        .animate-scroll-mobile {
          animation: scroll-infinite 20s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
