"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("dns-language")
    if (savedLanguage === "en" || savedLanguage === "es") {
      setLanguage(savedLanguage)
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const updateLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
    window.localStorage.setItem("dns-language", lang)
    document.documentElement.lang = lang
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
