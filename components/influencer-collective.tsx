"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import type { Influencer } from "@/lib/data/influencers"

function extractUsername(url: string, platform: "Instagram" | "YouTube"): string {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    // Instagram: https://www.instagram.com/username/ → @username
    if (platform === "Instagram") {
      const match = pathname.match(/^\/([^/]+)\/?$/)
      return match ? `@${match[1]}` : ""
    }

    // YouTube: https://www.youtube.com/@channelname → @channelname
    if (platform === "YouTube") {
      const match = pathname.match(/^\/@?([^/]+)\/?$/)
      return match ? `@${match[1]}` : ""
    }

    return ""
  } catch {
    return ""
  }
}

export function InfluencerCollective() {
  const { language } = useLanguage()
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [metrics, setMetrics] = useState({ audience: 0, impressions: 0, views: 0 })
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch influencers from API
  useEffect(() => {
    async function fetchInfluencers() {
      try {
        const response = await fetch("/api/influencers")
        const data = await response.json()
        setInfluencers(data.influencers || [])
      } catch (error) {
        console.error("[v0] Error fetching influencers:", error)
      }
    }
    fetchInfluencers()
  }, [])

  // Animate metrics on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateMetrics()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  function animateMetrics() {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = { audience: 600, impressions: 11, views: 150 }
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setMetrics({
        audience: Math.floor(targets.audience * progress),
        impressions: Math.floor(targets.impressions * progress),
        views: Math.floor(targets.views * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setMetrics(targets)
      }
    }, interval)
  }

  // Auto-rotate profiles
  useEffect(() => {
    if (influencers.length <= 4 || isPaused) return

    autoRotateRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 4
        // If we've reached or passed the end, go back to start
        if (nextIndex >= influencers.length) {
          return 0
        }
        return nextIndex
      })
    }, 7000)

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current)
    }
  }, [influencers.length, isPaused])

  function handlePrevious() {
    setCurrentIndex((prev) => {
      const newIndex = prev - 4
      if (newIndex < 0) {
        // Go to the last complete set of 4
        const lastSetIndex = Math.floor((influencers.length - 1) / 4) * 4
        return lastSetIndex
      }
      return newIndex
    })
  }

  function handleNext() {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 4
      if (nextIndex >= influencers.length) {
        return 0
      }
      return nextIndex
    })
  }

  function formatFollowers(followers: number): string {
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`
    }
    return followers.toString()
  }

  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  function handleImageError(influencerId: string) {
    setImageErrors((prev) => new Set(prev).add(influencerId))
  }

  const visibleInfluencers = influencers.slice(currentIndex, currentIndex + 4)

  const content = {
    en: {
      title: "DNS INFLUENCER COLLECTIVE",
      audience: "Audience",
      impressions: "Monthly impressions across social media",
      views: "Views",
    },
    es: {
      title: "COLECTIVO DE INFLUENCERS DNS",
      audience: "Audiencia",
      impressions: "Impresiones mensuales en redes sociales",
      views: "Visualizaciones",
    },
  }

  const t = content[language]

  return (
    <section ref={sectionRef} data-header-theme="white" className="relative bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="font-league-spartan text-3xl font-bold uppercase tracking-wide text-black md:text-4xl">
            {t.title}
          </h2>
        </div>

        {/* Metrics Bar */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="font-league-spartan text-5xl font-bold text-[#FF5757] md:text-6xl">
              {metrics.audience}K+
            </div>
            <div className="mt-2 font-poppins text-sm text-gray-700 md:text-base">{t.audience}</div>
          </div>

          <div className="text-center">
            <div className="font-league-spartan text-5xl font-bold text-[#FF5757] md:text-6xl">
              {metrics.impressions}–12M
            </div>
            <div className="mt-2 font-poppins text-sm text-gray-700 md:text-base">{t.impressions}</div>
          </div>

          <div className="text-center">
            <div className="font-league-spartan text-5xl font-bold text-[#FF5757] md:text-6xl">{metrics.views}M+</div>
            <div className="mt-2 font-poppins text-sm text-gray-700 md:text-base">{t.views}</div>
          </div>
        </div>

        {/* Influencer Grid - Desktop */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {influencers.length > 4 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition-all hover:bg-[#FF5757]"
                aria-label="Previous"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition-all hover:bg-[#FF5757]"
                aria-label="Next"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="grid grid-cols-4 gap-6">
            {visibleInfluencers.map((influencer, index) => {
              const username = extractUsername(influencer.platformUrl, influencer.platform)
              const hasError = imageErrors.has(influencer.id)
              const isPriority = index < 4

              return (
                <a
                  key={influencer.id}
                  href={influencer.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer overflow-hidden rounded-lg bg-gray-50 p-6 text-center transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className="mb-4 flex justify-center">
                    {hasError ? (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-600">
                        {getInitials(influencer.name)}
                      </div>
                    ) : (
                      <div className="relative h-24 w-24">
                        <Image
                          src={influencer.photo || "/placeholder.svg"}
                          alt={`Digital Nomad Summit Influencer – ${influencer.name}`}
                          fill
                          className="rounded-full object-cover transition-transform group-hover:scale-110"
                          sizes="96px"
                          priority={isPriority}
                          onError={() => handleImageError(influencer.id)}
                        />
                      </div>
                    )}
                  </div>

                  <h3 className="mb-3 font-league-spartan text-lg font-bold uppercase text-black">{influencer.name}</h3>

                  <div className="mb-2 flex items-center justify-center gap-2">
                    {influencer.platform === "Instagram" ? (
                      <svg
                        className="h-5 w-5 text-gray-700 transition-colors group-hover:text-[#FF5757]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Instagram"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-700 transition-colors group-hover:text-[#FF5757]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="YouTube"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                  </div>

                  {username && (
                    <p className="font-poppins text-sm font-medium text-gray-600 transition-colors group-hover:text-[#FF5757]">
                      {username}
                    </p>
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Influencer Carousel - Mobile */}
        <div className="md:hidden">
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {influencers.map((influencer, index) => {
                const username = extractUsername(influencer.platformUrl, influencer.platform)
                const hasError = imageErrors.has(influencer.id)
                const isPriority = index < 2

                return (
                  <a
                    key={influencer.id}
                    href={influencer.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 p-6 text-center active:scale-95"
                  >
                    <div className="mb-4 flex justify-center">
                      {hasError ? (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-600">
                          {getInitials(influencer.name)}
                        </div>
                      ) : (
                        <div className="relative h-20 w-20">
                          <Image
                            src={influencer.photo || "/placeholder.svg"}
                            alt={`Digital Nomad Summit Influencer – ${influencer.name}`}
                            fill
                            className="rounded-full object-cover"
                            sizes="80px"
                            priority={isPriority}
                            onError={() => handleImageError(influencer.id)}
                          />
                        </div>
                      )}
                    </div>

                    <h3 className="mb-3 font-league-spartan text-base font-bold uppercase text-black">
                      {influencer.name}
                    </h3>

                    <div className="mb-2 flex items-center justify-center gap-2">
                      {influencer.platform === "Instagram" ? (
                        <svg
                          className="h-4 w-4 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-label="Instagram"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-label="YouTube"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )}
                    </div>

                    {username && <p className="font-poppins text-xs font-medium text-gray-600">{username}</p>}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
