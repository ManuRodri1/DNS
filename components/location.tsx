"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, MapPin, Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  EVENT_DATE_EN,
  EVENT_DATE_ES,
  VENUE_ADDRESS,
  VENUE_MAP_URL,
  VENUE_NAME,
  VENUE_TOUR_URL,
  VENUE_VIDEO_URL,
} from "@/lib/event-config"

const content = {
  en: {
    sectionTitle: "Venue",
    eyebrow: "OFFICIAL SUMMIT VENUE",
    date: EVENT_DATE_EN,
    badge: "Santo Domingo · Dominican Republic",
    tour: "Tour the Hotel",
    map: "View in Google Maps",
    listen: "Listen to video",
    mute: "Mute video",
    newTab: "opens in a new tab",
    videoLabel: "Crowne Plaza Santo Domingo, official venue for Digital Nomad Summit 2027",
  },
  es: {
    sectionTitle: "Sede",
    eyebrow: "SEDE OFICIAL DEL SUMMIT",
    date: EVENT_DATE_ES,
    badge: "Santo Domingo · República Dominicana",
    tour: "Recorrer el hotel",
    map: "Ver en Google Maps",
    listen: "Escuchar video",
    mute: "Silenciar video",
    newTab: "abre en una pestaña nueva",
    videoLabel: "Crowne Plaza Santo Domingo, sede oficial de Digital Nomad Summit 2027",
  },
}

export function Location() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const t = content[language]

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldPlayVideo(!reducedMotion.matches)
  }, [])

  const handleSoundToggle = async () => {
    const video = videoRef.current
    if (!video) return

    if (isVideoMuted) {
      video.muted = false
      try {
        await video.play()
        setIsVideoMuted(false)
      } catch {
        video.muted = true
      }
      return
    }

    video.muted = true
    setIsVideoMuted(true)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className={`relative w-full bg-black py-16 transition-opacity duration-1000 sm:py-20 md:py-32 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t.sectionTitle}</h2>
          <div className="mt-3 flex justify-center"><div className="h-[3px] w-16 rounded-full bg-[#FF5757]" /></div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0A0A] shadow-[0_0_40px_rgba(255,255,255,0.08)] md:rounded-3xl">
          <div className="relative h-64 min-w-0 sm:h-72 md:aspect-video md:h-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#343434,#080808_70%)]" aria-hidden="true" />
            <video
              ref={videoRef}
              autoPlay={shouldPlayVideo}
              muted={isVideoMuted}
              loop
              playsInline
              preload="metadata"
              aria-label={t.videoLabel}
              className="absolute inset-0 h-full w-full bg-black object-contain"
            >
              <source src={VENUE_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40 md:from-black/95 md:via-black/55 md:to-black/45" aria-hidden="true" />

            <div className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-2xl border border-white/10 bg-black/85 px-4 py-2 backdrop-blur-sm md:left-6 md:top-6 md:rounded-full">
              <p className="font-sans text-[11px] font-medium leading-4 tracking-wide text-white sm:text-xs md:text-sm">{t.badge}</p>
            </div>

            <button
              type="button"
              onClick={handleSoundToggle}
              aria-label={isVideoMuted ? t.listen : t.mute}
              aria-pressed={!isVideoMuted}
              className="absolute bottom-4 right-4 z-20 inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-black/80 px-3 font-sans text-xs font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] sm:px-4 md:bottom-auto md:right-6 md:top-6"
              suppressHydrationWarning
            >
              {isVideoMuted ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
              <span>{isVideoMuted ? t.listen : t.mute}</span>
            </button>
          </div>

          <div className="relative z-10 min-w-0 p-5 text-left sm:p-6 md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent md:p-12 md:text-center">
            <p className="font-sans text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-[#FF5757] sm:text-xs md:tracking-[0.2em]">{t.eyebrow}</p>
            <h3 className="mt-2 min-w-0 break-words font-display text-2xl font-bold leading-tight text-white drop-shadow-lg [overflow-wrap:anywhere] sm:text-3xl md:mt-3 md:text-5xl">
              {VENUE_NAME}
            </h3>
            <p className="mt-2 font-sans text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-white/75 sm:text-sm md:tracking-[0.14em]">{t.date}</p>
            <p className="mt-3 min-w-0 break-words font-sans text-xs leading-5 text-white/70 [overflow-wrap:anywhere] md:mx-auto md:max-w-2xl md:text-sm">{VENUE_ADDRESS}</p>
            <div className="mt-5 flex min-w-0 flex-col justify-center gap-3 sm:flex-row md:mt-7">
              <a
                href={VENUE_TOUR_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.tour} — ${VENUE_NAME} (${t.newTab})`}
                className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-[#FF5757] bg-[#FF5757] px-4 py-3 font-sans text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:px-6"
              >
                {t.tour}<ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={VENUE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.map} — ${VENUE_NAME} (${t.newTab})`}
                className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-black/30 px-4 py-3 font-sans text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-[#FF5757] hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] sm:w-auto sm:px-6"
              >
                {t.map}<MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
