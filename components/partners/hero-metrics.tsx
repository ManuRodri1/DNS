"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

function CountUp({ target, suffix = "", prefix = "", duration = 1800 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  )
}

export function HeroMetrics() {
  const metrics = [
    { value: 300, suffix: "+", label: "Leaders", sublabel: "Founders · Investors · Policymakers" },
    { value: 8, suffix: "", label: "Strategic Sectors", sublabel: "Innovation · Tourism · Fintech · More" },
    { value: 2, suffix: " Days", label: "Intensive Summit", sublabel: "August 6–7, 2026" },
  ]

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-[#0D0D0D] px-8 py-8 text-center relative group hover:bg-[#111] transition-colors duration-300"
        >
          <div className="font-display text-5xl md:text-6xl font-black text-white tracking-tight mb-1">
            <CountUp target={m.value} suffix={m.suffix} duration={1600 + i * 200} />
          </div>
          <div className="text-sm font-bold text-[#FF5757] uppercase tracking-widest mb-1">{m.label}</div>
          <div className="text-xs text-white/40 font-medium">{m.sublabel}</div>
          {i < metrics.length - 1 && (
            <div className="absolute right-0 top-1/4 h-1/2 w-px bg-white/10 hidden sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}
