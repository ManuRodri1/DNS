"use client"

// components/speakers/company-logos.tsx
// Reusable premium company logo display for the speakers experience.
//
// Design decisions:
// - Logos sit in a frosted glass chip (dark bg + subtle border) so white/transparent
//   PNGs remain visible on any dark background without harsh white boxes.
// - No forced color inversion — logos are shown in their original colors to
//   preserve brand integrity. The chip provides enough contrast.
// - Primary logo is displayed at full opacity; secondary at 80% so there's a
//   clear hierarchy when two logos appear together.
// - Three size scales: sm (cards), md (featured cards), lg (profile hero).

import Image from "next/image"

interface CompanyLogosProps {
  primary: string | null
  secondary?: string | null
  primaryAlt?: string
  secondaryAlt?: string
  /** sm = speaker cards, md = featured cards, lg = profile hero */
  size?: "sm" | "md" | "lg"
  /** Extra Tailwind classes on the wrapper row */
  className?: string
}

const sizeMap = {
  sm: {
    // Grid card: h-7 (28px) max-height, compact chip
    imgClass: "h-7 w-auto max-w-[96px]",
    chipClass: "px-3 py-1.5",
    gap: "gap-2.5",
  },
  md: {
    // Featured card: h-9 (36px) max-height
    imgClass: "h-9 w-auto max-w-[120px]",
    chipClass: "px-3.5 py-2",
    gap: "gap-3",
  },
  lg: {
    // Profile hero: h-11 (44px) max-height
    imgClass: "h-11 w-auto max-w-[160px]",
    chipClass: "px-4 py-2.5",
    gap: "gap-4",
  },
}

export function CompanyLogos({
  primary,
  secondary,
  primaryAlt = "Company logo",
  secondaryAlt = "Company logo",
  size = "sm",
  className = "",
}: CompanyLogosProps) {
  if (!primary && !secondary) return null

  const { imgClass, chipClass, gap } = sizeMap[size]

  // Shared glass chip style — subtle frosted dark container
  const chipBase =
    "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/[0.10]"

  return (
    <div className={`flex flex-wrap items-center ${gap} ${className}`}>
      {primary && (
        <div className={`${chipBase} ${chipClass}`}>
          <Image
            src={primary}
            alt={primaryAlt}
            width={160}
            height={44}
            className={`${imgClass} object-contain`}
            style={{ objectPosition: "center" }}
          />
        </div>
      )}
      {secondary && (
        <div className={`${chipBase} ${chipClass} opacity-80`}>
          <Image
            src={secondary}
            alt={secondaryAlt}
            width={160}
            height={44}
            className={`${imgClass} object-contain`}
            style={{ objectPosition: "center" }}
          />
        </div>
      )}
    </div>
  )
}
