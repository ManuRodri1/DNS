"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

export function Location() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = {
    en: {
      sectionTitle: "Venue",
      title: "Catalonia Santo Domingo",
      description:
        "A premier waterfront destination on the Malecón, perfectly situated to host the most significant gathering of digital nomads and innovators in the region.",
      badge: "Santo Domingo · Dominican Republic",
      clickToOpen: "Click to open in Google Maps",
    },
    es: {
      sectionTitle: "Sede",
      title: "Catalonia Santo Domingo",
      description:
        "Un destino frente al mar de primer nivel en el Malecón, perfectamente ubicado para albergar el encuentro más significativo de nómadas digitales e innovadores en la región.",
      badge: "Santo Domingo · República Dominicana",
      clickToOpen: "Haz clic para abrir en Google Maps",
    },
  }

  const t = content[language]

  const googleMapsLink =
    "https://www.google.com/maps/place/Catalonia+Santo+Domingo/@18.458063,-69.909817,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaf89f2b2e0e0e5:0x7a0f0f0f0f0f0f0f!8m2!3d18.458063!4d-69.909817!16s%2Fg%2F11c1qy5qy5"

  return (
    <section
      id="location"
      ref={sectionRef}
      className={`relative w-full bg-black py-24 md:py-32 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-[family-name:var(--font-heading)]">
            {t.sectionTitle}
          </h2>
          <div className="flex justify-center">
            <div className="h-[3px] w-16 bg-[#FF5757] rounded-full" />
          </div>
        </div>

        <div
          className={`relative mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)]">
            {/* YouTube video background container */}
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/6IhHxdmlS-s?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&start=53&playlist=6IhHxdmlS-s&showinfo=0&fs=0&disablekb=1&iv_load_policy=3"
                title="Catalonia Santo Domingo Hotel Background Video"
                allow="autoplay; encrypted-media"
                loading="lazy"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />

              {/* Badge overlay */}
              <div className="absolute top-6 left-6 z-10">
                <div className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-sm border border-white/10">
                  <p className="text-white text-sm font-medium tracking-wide">{t.badge}</p>
                </div>
              </div>

              {/* Desktop text overlay */}
              <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
                <div className="max-w-[850px] mx-auto text-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-heading)] drop-shadow-lg">
                    {t.title}
                  </h3>
                  <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed font-[family-name:var(--font-body)] drop-shadow-md">
                    {t.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile text below video */}
            <div className="mt-6 px-2 text-center md:hidden">
              <h3 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">{t.title}</h3>
              <p className="text-white/80 text-base leading-relaxed font-[family-name:var(--font-body)]">
                {t.description}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] max-w-[900px] mx-auto hover:border-[#FF5757]/40 transition-all duration-300 cursor-pointer group relative"
            title={t.clickToOpen}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-10 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF5757] text-white px-6 py-3 rounded-full font-[family-name:var(--font-heading)] font-semibold shadow-lg">
                {t.clickToOpen}
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4982738951747!2d-69.91200668509795!3d18.45806398746707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89f163e485b1%3A0x956c9a937d42bb93!2sCatalonia%20Santo%20Domingo!5e0!3m2!1sen!2sdo!4v1635000000000!5m2!1sen!2sdo&markers=color:red%7Clabel:C%7C18.458063,-69.909817"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Catalonia Santo Domingo Hotel Location - Digital Nomad Summit 2026 Venue"
              className="w-full h-[260px] md:h-[400px] pointer-events-none"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
