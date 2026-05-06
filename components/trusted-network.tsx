"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"

const content = {
  en: {
    eyebrow: "TRUSTED NETWORK",
    title: "Sponsors, Partners & Intellectual Collaborators",
    subtitle: "DNS brings together brands, institutions, research partners, and ecosystem builders shaping the next wave of innovation, investment, tourism, and exportable talent across the Caribbean and beyond.",
    categories: [
      "Brand Partners",
      "Intellectual Sponsors",
      "Technical Alignment",
      "Institutional Ecosystem",
      "Media Partners"
    ],
    diter: {
      eyebrow: "DITER 2026",
      title: "Dominican Innovation & Transnational Export Report",
      quote: "“This is not a report. It’s infrastructure.”",
      desc: "A bilingual strategic framework connecting talent, capital, academia, institutions, export intelligence, and transnational opportunity.",
      cta: "Explore DITER 2026"
    },
    cta: {
      primary: "Explore Partnerships",
      secondary: "View DITER Framework"
    }
  },
  es: {
    eyebrow: "RED DE CONFIANZA",
    title: "Patrocinadores, Aliados y Colaboradores Intelectuales",
    subtitle: "DNS reúne marcas, instituciones, aliados intelectuales y constructores de ecosistema que impulsan la próxima ola de innovación, inversión, turismo y talento exportable desde el Caribe.",
    categories: [
      "Marcas Patrocinadoras",
      "Patrocinadores Intelectuales",
      "Alineación Técnica",
      "Ecosistema Institucional",
      "Media Partners"
    ],
    diter: {
      eyebrow: "DITER 2026",
      title: "Informe de Innovación Dominicana y Exportación Transnacional",
      quote: "“Esto no es un informe. Es infraestructura.”",
      desc: "Un marco estratégico bilingüe que conecta talento, capital, academia, instituciones, inteligencia exportadora y oportunidad transnacional.",
      cta: "Explorar DITER 2026"
    },
    cta: {
      primary: "Explorar Alianzas",
      secondary: "Ver Marco DITER"
    }
  }
}

interface Partner {
  id: string
  name: string
  logo: string
  websiteUrl: string
  category?: string
  partner_type?: string
  section?: string
  short_label?: string
  displayOrder: number
}

const sectionPriority: Record<string, number> = {
  brand_sponsors: 1,
  diter_intellectual_sponsors: 2,
  technical_alignment: 3,
  institutional_ecosystem: 4,
  media_partners: 5,
}

export function TrustedNetwork() {
  const { language } = useLanguage()
  const t = content[language]
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/partners?show_on_home=true")
        if (response.ok) {
          const data = await response.json()
          
          let fetchedPartners = data.partners || []
          
          // Sort by section priority, then display_order, then name
          fetchedPartners.sort((a: Partner, b: Partner) => {
            const pA = sectionPriority[a.section || ""] || 99
            const pB = sectionPriority[b.section || ""] || 99
            if (pA !== pB) return pA - pB
            
            if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
            
            return a.name.localeCompare(b.name)
          })
          
          setPartners(fetchedPartners)
        }
      } catch (error) {
        console.error("[TrustedNetwork] Error fetching partners:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPartners()
  }, [])

  // Duplicate for infinite scroll (we need enough items to fill the screen twice)
  const displayPartners = partners.length > 0 ? [...partners, ...partners, ...partners, ...partners] : []

  return (
    <section id="trusted-network" className="relative w-full overflow-hidden bg-[#0A0A0A] py-16 md:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#FF5757]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#FF5757] font-sans font-semibold text-xs tracking-wider uppercase mb-6">
            {t.eyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
            {t.title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          {t.categories.map((cat, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
              {cat}
            </span>
          ))}
        </div>

        {/* Animated Marquee */}
        <div className="relative -mx-6 md:mx-0 mb-20 overflow-hidden group">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF5757] border-t-transparent" />
            </div>
          ) : partners.length > 0 ? (
            <div className="flex gap-4 md:gap-6 py-4 animate-marquee hover:[animation-play-state:paused] w-max">
              {displayPartners.map((partner, index) => {
                const label = partner.short_label || partner.partner_type || partner.category || "Partner"
                
                const CardWrapper = partner.websiteUrl && partner.websiteUrl !== "#" ? "a" : "div"
                const wrapperProps = partner.websiteUrl && partner.websiteUrl !== "#" 
                  ? { href: partner.websiteUrl, target: "_blank", rel: "noopener noreferrer" } 
                  : {}

                return (
                  <CardWrapper
                    key={`${partner.id}-${index}`}
                    {...wrapperProps}
                    className="flex flex-col w-[280px] shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF5757]/50 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Logo Well */}
                    <div className="h-32 bg-white flex items-center justify-center p-6 relative">
                      {partner.logo && partner.logo !== "/placeholder.svg" ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                           <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="w-full h-full object-contain mix-blend-multiply"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <span className="font-display font-bold text-gray-400 text-xl text-center">
                          {partner.name}
                        </span>
                      )}
                    </div>
                    {/* Partner Details */}
                    <div className="p-4 flex flex-col gap-1 border-t border-white/10">
                      <h3 className="text-white font-semibold text-sm truncate">{partner.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[#FF5757] text-xs font-medium uppercase tracking-wider">{label}</span>
                        {partner.websiteUrl && partner.websiteUrl !== "#" && (
                          <ExternalLink className="w-3 h-3 text-white/30" />
                        )}
                      </div>
                    </div>
                  </CardWrapper>
                )
              })}
            </div>
          ) : null}
        </div>

        {/* DITER Spotlight & CTAs layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          
          {/* DITER Compact Card */}
          <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#FF5757]/0 group-hover:bg-[#FF5757]/5 transition-colors duration-500" />
            <div className="p-8 flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-[#FF5757]/20 text-[#FF5757] text-xs font-bold tracking-wider rounded-full uppercase">
                  {t.diter.eyebrow}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                {t.diter.title}
              </h3>
              
              <div className="pl-4 border-l-2 border-[#FF5757] mb-6">
                <p className="text-white/90 italic font-serif text-lg">
                  {t.diter.quote}
                </p>
              </div>
              
              <p className="text-white/60 text-sm mb-8 flex-1">
                {t.diter.desc}
              </p>
              
              <a 
                href="/partners#diter-2026"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#FF5757] transition-colors w-fit"
              >
                {t.diter.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            {/* Optional subtle DITER image overlay in the background */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700">
               <Image 
                 src="https://res.cloudinary.com/dzebed7jw/image/upload/v1778088214/unnamed_1_uiwpzr.png" 
                 alt="DITER Cover" 
                 fill 
                 className="object-cover object-left-top mask-image-linear-gradient-to-r" 
               />
            </div>
          </div>

          {/* Action Area */}
          <div className="lg:w-1/3 flex flex-col justify-center gap-4">
            <Button
              asChild
              size="default"
              className="w-full bg-[#FF5757] text-white hover:bg-white hover:text-[#FF5757] h-14 text-base font-semibold transition-all duration-300"
            >
              <a href="/partners">{t.cta.primary}</a>
            </Button>
            <Button
              asChild
              size="default"
              className="w-full bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:text-white h-14 text-base font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              <a href="/partners#diter-2026">{t.cta.secondary}</a>
            </Button>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        }
        .mask-image-linear-gradient-to-r {
          mask-image: linear-gradient(to right, transparent, black);
          -webkit-mask-image: linear-gradient(to right, transparent, black);
        }
      `}</style>
    </section>
  )
}
