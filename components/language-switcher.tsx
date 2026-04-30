"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={() => setLanguage("es")}
        className={cn(
          "transition-all duration-300 hover:scale-110 relative z-20 cursor-pointer",
          language === "es" ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70",
        )}
        aria-label="Switch to Spanish"
      >
        <img
          src="/images/design-mode/dominican-republic.png"
          alt="Español"
          className="w-8 h-8 rounded-sm pointer-events-none"
        />
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "transition-all duration-300 hover:scale-110 relative z-20 cursor-pointer",
          language === "en" ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70",
        )}
        aria-label="Switch to English"
      >
        <img src="/images/design-mode/usa.png" alt="English" className="w-8 h-8 rounded-sm pointer-events-none" />
      </button>
    </div>
  )
}
