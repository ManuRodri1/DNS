"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Send, X, MessageSquare, Sparkles, Loader2, User, Bot } from "lucide-react"
import { AIGuideBubble } from "./ai-guide-bubble"

interface Message {
  role: "user" | "assistant"
  content: string
}

const QUICK_PROMPTS = [
  { en: "Ticket prices", es: "Precios de tickets" },
  { en: "Who are the speakers?", es: "¿Quiénes son los speakers?" },
  { en: "How can I sponsor?", es: "¿Cómo puedo ser sponsor?" },
  { en: "Where is the venue?", es: "¿Dónde es el evento?" },
  { en: "What is the agenda?", es: "¿Cuál es la agenda?" },
]

export function AIGuideWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm having trouble connecting right now. Please try again later or contact digitalnomadsummit@gmail.com." 
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AIGuideBubble onOpen={() => setIsOpen(true)} isChatOpen={isOpen} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {/* Chat Window */}
        <div 
          className={cn(
            "mb-4 w-[90vw] sm:w-[400px] h-[500px] max-h-[70vh] bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right pointer-events-auto",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none hidden"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF5757] flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white leading-none">DNS AI Guide</h3>
                <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1 block">Official Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/40 hover:text-white transition-colors"
              suppressHydrationWarning
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans custom-scrollbar">
            {messages.length === 0 && (
              <div className="space-y-4 py-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-sm text-white/80 leading-relaxed">
                    Hi! I&apos;m your DNS AI Guide. Ask me about tickets, speakers, sponsors, the venue, or the agenda.
                  </p>
                  <p className="text-xs text-white/40 italic mt-2">
                    Hola! Soy tu guía de DNS. Pregúntame sobre tickets, speakers, sponsors, ubicación o agenda.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 px-2">Suggestions / Sugerencias</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt.en)}
                        className="text-[11px] bg-white/5 hover:bg-[#FF5757]/20 border border-white/10 hover:border-[#FF5757]/30 text-white/70 py-1.5 px-3 rounded-full transition-all"
                        suppressHydrationWarning
                      >
                        {prompt.en} / {prompt.es}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-start gap-2",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                  msg.role === "user" ? "bg-white/10" : "bg-[#FF5757]/20"
                )}>
                  {msg.role === "user" ? <User size={12} className="text-white/40" /> : <Bot size={12} className="text-[#FF5757]" />}
                </div>
                <div 
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-white/10 text-white rounded-tr-none" 
                      : "bg-white/[0.03] border border-white/5 text-white/90 rounded-tl-none whitespace-pre-wrap"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF5757]/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={12} className="text-[#FF5757]" />
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 size={14} className="text-[#FF5757] animate-spin" />
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter">Thinking / Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/[0.01]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 focus-within:border-[#FF5757]/50 transition-colors"
            >
              <input 
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DNS Guide..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-white/20 h-9"
              />
              <button 
                disabled={!input.trim() || isLoading}
                className="p-1.5 bg-[#FF5757] rounded-xl text-white disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 relative pointer-events-auto",
            isOpen ? "bg-white text-black rotate-90" : "bg-[#FF5757] text-white rotate-0"
          )}
          suppressHydrationWarning
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-[#FF5757] animate-ping opacity-20 pointer-events-none" />
          )}
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  )
}
