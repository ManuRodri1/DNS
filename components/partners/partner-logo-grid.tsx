import Image from "next/image"
import Link from "next/link"
import { Partner } from "@/lib/data/partners"

interface PartnerLogoGridProps {
  title?: string
  description?: string
  partners: Partner[]
  variant?: "dark" | "light-panel" | "white"
}

export function PartnerLogoGrid({
  title,
  description,
  partners,
  variant = "dark",
}: PartnerLogoGridProps) {
  if (!partners || partners.length === 0) {
    return null
  }

  // Variant styles
  const isDark = variant === "dark"
  const isLightPanel = variant === "light-panel"
  const isWhite = variant === "white"
  
  let cardBg = "bg-[#111111] border-[#222]"
  let cardHover = "hover:border-[#FF5757]/50"
  let textColor = "text-gray-300"

  if (isLightPanel) {
    cardBg = "bg-[#F8F9FA] border-gray-200"
    cardHover = "hover:border-[#FF5757]/40 hover:bg-white hover:shadow-sm"
    textColor = "text-gray-800"
  } else if (isWhite) {
    cardBg = "bg-white border-gray-100 shadow-sm"
    cardHover = "hover:border-[#FF5757]/40 hover:shadow-md"
    textColor = "text-gray-900"
  }

  const gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  const cardPadding = "p-8 md:p-10"

  return (
    <div className="w-full py-4">
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {partners.map((partner) => {
          const hasLogo = !!partner.logo_url
          const CardContent = (
            <div
              className={`
                relative flex items-center justify-center 
                h-32 md:h-40 rounded-xl border transition-colors duration-300
                ${cardBg} ${cardHover} ${cardPadding}
              `}
            >
              {hasLogo ? (
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo_url!}
                    alt={partner.logo_alt || `${partner.name} logo`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className={`font-display font-semibold text-center text-lg ${textColor}`}>
                  {partner.name}
                </span>
              )}
            </div>
          )

          if (partner.website_url) {
            return (
              <a
                key={partner.id}
                href={partner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] rounded-xl"
              >
                {CardContent}
              </a>
            )
          }

          return (
            <div key={partner.id}>
              {CardContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}
