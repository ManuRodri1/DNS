"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface AIGuideBubbleProps {
  onOpen: () => void
  isChatOpen: boolean
}

export function AIGuideBubble({ onOpen, isChatOpen }: AIGuideBubbleProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const messages = [
    { en: "I can help you with DNS 2026.", es: "¿En qué puedo ayudarte con DNS 2026?" },
    { en: "Ask me about tickets or speakers.", es: "Pregúntame sobre tickets o speakers." },
    { en: "Need help planning your visit?", es: "¿Necesitas ayuda con tu visita?" },
  ]

  const [currentMessage, setCurrentMessage] = useState(messages[0])

  useEffect(() => {
    // Check session storage to see if it was dismissed
    const dismissed = sessionStorage.getItem("dns-ai-bubble-dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show after 6 seconds
    const timer = setTimeout(() => {
      if (!isChatOpen && !isDismissed) {
        setIsVisible(true)
        // Cycle message
        setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
      }
    }, 6000)

    return () => clearTimeout(timer)
  }, [isChatOpen, isDismissed])

  if (isDismissed || isChatOpen || !isVisible) return null

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("dns-ai-bubble-dismissed", "true")
  }

  return (
    <div 
      className={cn(
        "fixed bottom-24 right-6 z-[45] max-w-[240px] animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-none",
        "motion-reduce:animate-none"
      )}
    >
      <div 
        onClick={onOpen}
        className="relative bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl cursor-pointer group hover:border-[#FF5757]/50 transition-colors pointer-events-auto"
      >
        <button 
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 bg-black border border-white/10 rounded-full p-1 text-white/40 hover:text-white transition-colors"
        >
          <X size={12} />
        </button>
        
        <p className="text-xs text-white/90 font-sans leading-relaxed">
          {currentMessage.en}
          <span className="block mt-1 text-white/40 italic text-[10px]">
            {currentMessage.es}
          </span>
        </p>
        
        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-black/90 border-r border-b border-white/10 rotate-45" />
      </div>
    </div>
  )
}
