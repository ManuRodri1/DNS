"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef } from "react"

export function Footer() {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const initParticles = () => {
      particles = []
      const numParticles = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 8000)
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const content = {
    en: {
      rights: "© 2026 · All Rights Reserved",
      designedBy: "Designed by ING. JMDR",
      fromSuccessment: "From Successment",
    },
    es: {
      rights: "© 2026 · Todos los Derechos Reservados",
      designedBy: "Diseñado por ING. JMDR",
      fromSuccessment: "From Successment",
    },
  }

  const t = content[language]

  return (
    <footer className="relative bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />

      {/* Top Divider */}
      <div className="relative z-10 w-full h-[1px] bg-white/15" />

      {/* Footer Content */}
      <div className="relative z-10 py-12 md:py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
            {/* COLUMN 1 - LOGO */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/logo digital nomad summit - Editado.png"
                alt="Digital Nomad Summit - Remote Work Conference Santo Domingo 2026"
                width={200}
                height={200}
                loading="lazy"
                className="w-[180px] md:w-[200px] h-auto rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.06)]"
              />
            </div>

            {/* COLUMN 2 - COPYRIGHT */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-['League_Spartan'] font-bold text-lg md:text-xl tracking-wide">
                  Digital Nomad <span className="text-[#FF5757]">Summit</span>
                </h3>
                <p className="text-white/70 font-['Inter'] text-xs md:text-sm">{t.fromSuccessment}</p>
              </div>
              <p className="text-white/80 font-['Inter'] text-sm">{t.rights}</p>
            </div>

            {/* COLUMN 3 - DESIGNER CREDIT */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
              <p className="text-white font-['Inter'] text-sm">{t.designedBy}</p>
              <a
                href="https://www.linkedin.com/in/jose-manuel-de-jesus-rodriguez-5a0981177"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FF5757] font-['Inter'] text-sm hover:underline hover:drop-shadow-[0_0_8px_rgba(255,87,87,0.6)] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
