"use client"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Send, X, User } from "lucide-react"
import { AIGuideBubble } from "./ai-guide-bubble"

interface Message {
  role: "user" | "assistant"
  content: string
}

const AI_AGENT_AVATAR_URL = "https://res.cloudinary.com/dzebed7jw/image/upload/v1779293789/ChatGPT_Image_20_may_2026_12_16_08_p.m._coumkk.png";

function sanitizeAssistantResponse(text: string): string {
  if (!text) return ""
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown asterisks
    .replace(/\*(.*?)\*/g, "$1")     // Remove italic markdown asterisks
    .replace(/__(.*?)__/g, "$1")     // Remove bold markdown underscores
    .replace(/_(.*?)_/g, "$1")       // Remove italic markdown underscores
    .replace(/`([^`]+)`/g, "$1")     // Remove inline code backticks
    .replace(/^#{1,6}\s?/gm, "")     // Remove markdown header indicators (#, ##, etc.)
    .replace(/^\s*[-*]\s+/gm, "• ")  // Replace markdown list dashes/asterisks with a standard bullet point (•)
    .replace(/\n{3,}/g, "\n\n")      // Limit max consecutive newlines to 2
    .trim();
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
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevMessagesLengthRef = useRef(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant") {
        // Scroll to the start of the new assistant message
        const lastIndex = messages.length - 1
        setTimeout(() => {
          const lastEl = messageRefs.current[lastIndex]
          if (lastEl) {
            lastEl.scrollIntoView({
              behavior: "smooth",
              block: "start"
            })
          }
        }, 100)
      } else {
        // User message, scroll to bottom
        scrollToBottom()
      }
    } else if (isLoading) {
      // Loading started, scroll to bottom to show typing indicator
      scrollToBottom()
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      // Focus input when opened and scroll to bottom
      setTimeout(() => {
        inputRef.current?.focus()
        scrollToBottom()
      }, 300)
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
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5757]/40 to-transparent animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-zinc-800 shrink-0 shadow-md">
                <img 
                  src={AI_AGENT_AVATAR_URL} 
                  alt="DNS IA" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-zinc-950 rounded-full shadow-sm" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide leading-none flex items-center gap-1.5">
                  DNS IA
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-white/50 leading-none">Your website assistant</span>
                  <span className="text-[8px] bg-[#FF5757]/15 text-[#FF5757] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider scale-95 font-semibold">AI Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
              suppressHydrationWarning
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans custom-scrollbar">
            {messages.length === 0 && (
              <div className="space-y-4 py-4 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm bg-zinc-800">
                    <img 
                      src={AI_AGENT_AVATAR_URL} 
                      alt="DNS IA" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl rounded-tl-none flex-1">
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      Hi! I&apos;m your DNS IA assistant. Ask me about tickets, speakers, sponsors, the venue, or the agenda.
                    </p>
                    <p className="text-xs text-white/40 italic mt-2">
                      ¡Hola! Soy tu asistente de IA DNS. Pregúntame sobre tickets, speakers, sponsors, ubicación o agenda.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 pl-12">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 px-2 font-semibold">Suggestions / Sugerencias</p>
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

            {messages.map((msg, idx) => {
              const isUser = msg.role === "user"
              return (
                <div 
                  key={idx} 
                  ref={(el) => { messageRefs.current[idx] = el }}
                  className={cn(
                    "flex items-start gap-3",
                    isUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {isUser ? (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1 border border-white/5 shadow-sm">
                      <User size={14} className="text-white/60" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm bg-zinc-800">
                      <img 
                        src={AI_AGENT_AVATAR_URL} 
                        alt="DNS IA" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div 
                    className={cn(
                      "max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm transition-all duration-200",
                      isUser 
                        ? "bg-white/10 text-white rounded-tr-none border border-white/5" 
                        : "bg-white/[0.03] border border-white/5 text-white/90 rounded-tl-none whitespace-pre-wrap"
                    )}
                  >
                    {isUser ? msg.content : sanitizeAssistantResponse(msg.content)}
                  </div>
                </div>
              )
            })}
            
            {isLoading && (
              <div className="flex items-start gap-3 flex-row animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm bg-zinc-800">
                  <img 
                    src={AI_AGENT_AVATAR_URL} 
                    alt="DNS IA" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 min-h-[44px]">
                  <span className="w-2 h-2 bg-[#FF5757] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-[#FF5757] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-[#FF5757] rounded-full animate-bounce" />
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
            "w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 relative pointer-events-auto",
            isOpen ? "bg-zinc-900 border border-white/15 text-white rotate-90" : "bg-black border border-white/10 text-white rotate-0"
          )}
          aria-label="Toggle AI Assistant"
          suppressHydrationWarning
        >
          {isOpen ? (
                  <X size={22} className="transition-transform duration-300" />
                ) : (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/15 hover:border-[#FF5757]/30 transition-colors">
                    <img 
                      src={AI_AGENT_AVATAR_URL} 
                      alt="DNS IA" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Active status indicator dot */}
                    <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border border-zinc-950 rounded-full shadow-sm animate-pulse" />
                  </div>
                )}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-[#FF5757]/5 animate-ping pointer-events-none" />
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
