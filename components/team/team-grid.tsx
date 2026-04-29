"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const teamMembers = [
  {
    name: "Jonathan Joel Mentor",
    email: "Jonathan@successment.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/IMG-20260226-WA0010.jpg",
    shortBio:
      "Founder & CEO of Successment and ZARI Mobility, Jonathan Joel Mentor is a revenue strategist and innovation architect focused on scaling underrepresented founders and building global innovation platforms across emerging markets.",
    fullBio:
      "Jonathan Joel Mentor is a revenue provocateur and innovation architect redefining how underrepresented founders scale, monetize, and build power. He is the Founder & CEO of Successment, a revenue operations firm driving visibility and growth for underestimated startups, and of ZARI Mobility, a SaaS platform reshaping financial inclusion and risk modeling in emerging markets. Jonathan also owns a growing portfolio of scalable intellectual property, including data systems and strategic frameworks designed for public–private deployment. He is the creator of RevOps Science®, a proprietary framework that transforms operations into recurring revenue engines. He also leads the Digital Nomad Summit—a global platform connecting investment, policy, and innovation—and Digital Nomad Weekly in Dominican Today. In 2024 he was nominated for the United Nations World Summit Award for his work in digital inclusion and entrepreneurial ecosystems.",
  },
  {
    name: "Sacha Walton-Gutierrez",
    email: "sacha@swimgtgroup.com",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/sacha%20walton.webp",
    shortBio:
      "Co-founder of the Digital Nomad Summit Santo Domingo and CEO of SWI Management Group with over 25 years of experience producing high-level international events.",
    fullBio:
      "Sacha Walton-Gutierrez is the co-founder of the Digital Nomad Summit Santo Domingo, a business strategist, CEO of SWI Management Group, and founder of the Biz Her Way Series. Her work in entrepreneurship, innovation, and ecosystem development has been featured in Essence, Forbes, and American Express Business Class. With over 25 years of experience in event production, Sacha has produced and managed high-level events, concerts, business summits, and international gatherings across the Dominican Republic.",
  },
  {
    name: "Ivanna Price",
    email: "ivanna@thesocialbarcreative.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/IVANNA%20PRICE.JPG",
    shortBio:
      "Founder & CEO of The Social Bar, a digital creative agency specializing in social media strategy, brand storytelling, and content production.",
    fullBio:
      "Ivanna Price is the Founder and CEO of The Social Bar, a digital creative agency specializing in strategic social media marketing, creative direction, content creation, videography, and brand storytelling. With more than 10 years of experience in digital marketing and creative strategy, she helps entrepreneurs and organizations translate their vision into impactful content that drives measurable growth.",
  },
  {
    name: "Esther Akanbi",
    email: "esther@successment.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/Esther%20Akanbi.jpg",
    shortBio:
      "Program operations lead supporting Digital Nomad Summit execution across marketing, sponsorship, and strategic partnerships.",
    fullBio:
      "Esther Akanbi leads program operations and cross-functional coordination for the Digital Nomad Summit. Her work aligns marketing, sponsorship, and communications teams to ensure the summit operates with precision, professionalism, and global credibility.",
  },
  {
    name: "Jose Manuel De Jesus Rodriguez",
    email: "contact@jmrodri.site",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/fcafe12a-58b4-4dea-acb2-b8443d05932e.jpg",
    shortBio:
      "Software Engineer and Business Intelligence specialist focused on transforming complex data into strategic insights and scalable digital systems.",
    fullBio:
      "Jose Manuel De Jesus Rodriguez is a Software Engineer and Business Intelligence specialist focused on transforming complex data into actionable insights that drive organizational growth and smarter decision-making. His expertise spans web development, business intelligence, data modeling, and process automation. He has built more than 26 professional dashboards integrating multiple enterprise systems, ETL pipelines, and analytics solutions used by operational and executive teams.",
  },
]

const translations = {
  en: {
    title: "Team",
    subtitle: "Meet the team behind Digital Nomad Summit Santo Domingo 2026.",
    email: "Email",
    readMore: "Read more",
    readLess: "Read less",
    backToHome: "Back to Home",
  },
  es: {
    title: "Equipo",
    subtitle: "Conoce al equipo detrás del Digital Nomad Summit Santo Domingo 2026.",
    email: "Correo",
    readMore: "Ver más",
    readLess: "Ver menos",
    backToHome: "Volver al Inicio",
  },
}

interface TeamCardProps {
  member: (typeof teamMembers)[0]
  t: (typeof translations)["en"]
  priority?: boolean
}

function TeamCard({ member, t, priority = false }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const fullBioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 hover:border-white/20 hover:bg-white/[0.05]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, background-color 0.3s ease",
      }}
    >
      {/* Headshot */}
      <div className="relative flex justify-center pt-10 pb-8 px-8">
        <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-white/10 flex-shrink-0 shadow-2xl">
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
          )}
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="144px"
            className={`object-cover object-center transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            priority={priority}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-7 pb-7 gap-3">
        {/* Name */}
        <h3 className="font-display font-semibold text-white text-lg leading-snug text-balance">
          {member.name}
        </h3>

        {/* Email */}
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#FF5757] transition-colors duration-150 font-sans break-all"
          aria-label={`${t.email}: ${member.email}`}
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          {member.email}
        </a>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Short bio */}
        <p className="font-sans text-sm text-white/60 leading-relaxed">
          {member.shortBio}
        </p>

        {/* Expandable full bio */}
        <div
          ref={fullBioRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? `${fullBioRef.current?.scrollHeight ?? 400}px` : "0px" }}
        >
          <div className="h-px bg-white/10 mb-3 mt-1" />
          <p className="font-sans text-sm text-white/50 leading-relaxed">
            {member.fullBio}
          </p>
        </div>

        {/* Expand / collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-auto self-start inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#FF5757] hover:text-white transition-colors duration-150 pt-1"
          aria-expanded={expanded}
        >
          {expanded ? t.readLess : t.readMore}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function TeamGrid() {
  const { language } = useLanguage()
  const t = translations[language]
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background grain */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,87,87,0.06)_0%,_transparent_60%)] pointer-events-none" />

        <div
          ref={heroRef}
          className="relative z-10 max-w-4xl mx-auto"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-white/40 hover:text-[#FF5757] transition-colors duration-150 mb-10"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToHome}
          </Link>

          {/* Coral rule */}
          <div className="w-10 h-0.5 bg-[#FF5757] mb-6" />

          <h1 className="font-display font-bold text-white text-5xl md:text-7xl leading-none tracking-tight text-balance">
            {t.title}
          </h1>
          <p className="mt-5 font-sans text-white/50 text-lg md:text-xl leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.email}
              member={member}
              t={t}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
