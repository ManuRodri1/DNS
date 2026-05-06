"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Mail, ArrowRight, ChevronDown } from "lucide-react"

interface Bio {
  en: string
  es: string
}

interface TeamMember {
  name: string
  email: string
  image: string
  imagePosition?: string
  role?: string
  shortBio: Bio
  fullBio: Bio
}

const teamMembers: TeamMember[] = [
  {
    name: "Jonathan Joel Mentor",
    email: "Jonathan@successment.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/IMG-20260226-WA0010.jpg",
    imagePosition: "object-top",
    role: "Strategy & Innovation",
    shortBio: {
      en: "Founder & CEO of Successment and ZARI Mobility, Jonathan is a revenue strategist and innovation architect focused on scaling underrepresented founders.",
      es: "Fundador y CEO de Successment y ZARI Mobility, Jonathan es un estratega de ingresos y arquitecto de innovación enfocado en escalar fundadores subrepresentados.",
    },
    fullBio: {
      en: "Jonathan Joel Mentor is a revenue provocateur and innovation architect redefining how underrepresented founders scale, monetize, and build power. He is the Founder & CEO of Successment, a revenue operations firm driving visibility and growth for underestimated startups, and of ZARI Mobility, a SaaS platform reshaping financial inclusion and risk modeling in emerging markets. Jonathan also owns a growing portfolio of scalable intellectual property, including data systems and strategic frameworks designed for public–private deployment. He is the creator of RevOps Science®, a proprietary framework that transforms operations into recurring revenue engines. He also leads the Digital Nomad Summit—a global platform connecting investment, policy, and innovation—and Digital Nomad Weekly in Dominican Today. In 2024 he was nominated for the United Nations World Summit Award for his work in digital inclusion and entrepreneurial ecosystems.",
      es: "Jonathan Joel Mentor es un provocador de ingresos y arquitecto de innovación que redefine cómo los fundadores subrepresentados escalan, monetizan y construyen poder. Es Fundador y CEO de Successment, una firma de operaciones de ingresos que impulsa la visibilidad y el crecimiento para startups subestimadas, y de ZARI Mobility, una plataforma SaaS que remodela la inclusión financiera y el modelado de riesgos en mercados emergentes. También lidera el Digital Nomad Summit, una plataforma global que conecta inversión, políticas e innovación, y el Digital Nomad Weekly en Dominican Today. En 2024 fue nominado al Premio Cumbre Mundial de las Naciones Unidas por su trabajo en inclusión digital y ecosistemas empresariales.",
    },
  },
  {
    name: "Sacha Walton-Gutierrez",
    email: "sacha@swimgtgroup.com",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/sacha%20walton.webp",
    role: "Events & Strategy",
    shortBio: {
      en: "Co-founder of the Digital Nomad Summit Santo Domingo and CEO of SWI Management Group with over 25 years of experience producing high-level international events.",
      es: "Cofundadora del Digital Nomad Summit Santo Domingo y CEO de SWI Management Group con más de 25 años de experiencia produciendo eventos internacionales de alto nivel.",
    },
    fullBio: {
      en: "Sacha Walton-Gutierrez is the co-founder of the Digital Nomad Summit Santo Domingo, a business strategist, CEO of SWI Management Group, and founder of the Biz Her Way Series. Her work in entrepreneurship, innovation, and ecosystem development has been featured in Essence, Forbes, and American Express Business Class. With over 25 years of experience in event production, Sacha has produced and managed high-level events, concerts, business summits, and international gatherings across the Dominican Republic.",
      es: "Sacha Walton-Gutierrez es cofundadora del Digital Nomad Summit Santo Domingo, estratega de negocios, CEO de SWI Management Group y fundadora de Biz Her Way Series. Su trabajo en emprendimiento, innovación y desarrollo de ecosistemas ha aparecido en Essence, Forbes y American Express Business Class. Con más de 25 años de experiencia en producción de eventos, Sacha ha producido y gestionado eventos de alto nivel, conciertos, cumbres empresariales y encuentros internacionales en toda la República Dominicana.",
    },
  },
  {
    name: "Ivanna Price",
    email: "ivanna@thesocialbarcreative.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/IVANNA%20PRICE.JPG",
    role: "Creative & Brand",
    shortBio: {
      en: "Founder & CEO of The Social Bar, a digital creative agency specializing in social media strategy, brand storytelling, and content production.",
      es: "Fundadora y CEO de The Social Bar, una agencia creativa digital especializada en estrategia de redes sociales, storytelling de marca y producción de contenido.",
    },
    fullBio: {
      en: "Ivanna Price is the Founder and CEO of The Social Bar, a digital creative agency specializing in strategic social media marketing, creative direction, content creation, videography, and brand storytelling. With more than 10 years of experience in digital marketing and creative strategy, she helps entrepreneurs and organizations translate their vision into impactful content that drives measurable growth.",
      es: "Ivanna Price es la Fundadora y CEO de The Social Bar, una agencia creativa digital especializada en marketing estratégico en redes sociales, dirección creativa, creación de contenido, videografía y storytelling de marca. Con más de 10 años de experiencia en marketing digital y estrategia creativa, ayuda a emprendedores y organizaciones a traducir su visión en contenido impactante que impulsa un crecimiento medible.",
    },
  },
  {
    name: "Esther Akanbi",
    email: "esther@successment.co",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/Esther%20Akanbi.jpg",
    role: "Program Operations",
    shortBio: {
      en: "Program operations lead supporting Digital Nomad Summit execution across marketing, sponsorship, and strategic partnerships.",
      es: "Líder de operaciones del programa que apoya la ejecución del Digital Nomad Summit en marketing, patrocinios y asociaciones estratégicas.",
    },
    fullBio: {
      en: "Esther Akanbi leads program operations and cross-functional coordination for the Digital Nomad Summit. Her work aligns marketing, sponsorship, and communications teams to ensure the summit operates with precision, professionalism, and global credibility.",
      es: "Esther Akanbi lidera las operaciones del programa y la coordinación multifuncional para el Digital Nomad Summit. Su trabajo alinea a los equipos de marketing, patrocinios y comunicaciones para garantizar que la cumbre opere con precisión, profesionalismo y credibilidad global.",
    },
  },
  {
    name: "Jose Manuel De Jesus",
    email: "contact@jmrodri.site",
    image: "https://nwlajcj4k3xtonve.public.blob.vercel-storage.com/fcafe12a-58b4-4dea-acb2-b8443d05932e.jpg",
    role: "Engineering & Data",
    shortBio: {
      en: "Software Engineer and Business Intelligence specialist focused on transforming complex data into strategic insights and scalable digital systems.",
      es: "Ingeniero de Software y especialista en Inteligencia de Negocios enfocado en transformar datos complejos en conocimientos estratégicos y sistemas digitales escalables.",
    },
    fullBio: {
      en: "Jose Manuel De Jesus Rodriguez is a Software Engineer and Business Intelligence specialist focused on transforming complex data into actionable insights that drive organizational growth and smarter decision-making. His expertise spans web development, business intelligence, data modeling, and process automation. He has built more than 26 professional dashboards integrating multiple enterprise systems, ETL pipelines, and analytics solutions used by operational and executive teams.",
      es: "Jose Manuel De Jesus Rodríguez es un Ingeniero de Software y especialista en Inteligencia de Negocios enfocado en transformar datos complejos en conocimientos procesables que impulsan el crecimiento organizacional y la toma de decisiones más inteligente. Su experiencia abarca el desarrollo web, la inteligencia de negocios, el modelado de datos y la automatización de procesos. Ha creado más de 26 paneles profesionales integrando múltiples sistemas empresariales, canales ETL y soluciones de análisis utilizadas por equipos operativos y ejecutivos.",
    },
  },
  {
    name: "Chinh Doan",
    email: "info@chinhdoan.com",
    image: "https://res.cloudinary.com/dzebed7jw/image/upload/v1778092621/Chinh_2025_cropped_headshot_fhswpx.png",
    role: "Storytelling Strategy",
    shortBio: {
      en: "Principal and storytelling strategist of Chinh Doan Marketing Media. Former award-winning TV news anchor transitioning into media consulting.",
      es: "Principal y estratega de storytelling de Chinh Doan Marketing Media. Ex presentadora de noticias de televisión galardonada que pasó a la consultoría de medios.",
    },
    fullBio: {
      en: "Chinh Doan believes everyone has a story. Hers includes a hut, a newsroom and a lot of heart. Chinh lived in a hut in Vietnam and moved to the United States at age four as a refugee with her father. She was able to reunite her mother with their family 18 years later. As the first in her family to graduate from college and own a home, Chinh learned early that hard work and a good sense of humor can carry you a long way. She discovered her love of storytelling by reading newspapers her janitor father brought home and watching the news together while they learned English. That curiosity grew into an award-winning journalism career and eventually her own storytelling company, which helps others share their voices. Chinh lives in Tulsa, Oklahoma, with her husband, her mother, from whom she was separated for 18 years, and their two rescue dogs. They speak English, Vietnamese and Spanish in their home. She enjoys traveling, trying new foods and creating social media content.",
      es: "Chinh Doan cree que todas las personas tienen una historia. La suya incluye una choza, una sala de redacción y mucho corazón. Chinh vivió en una choza en Vietnam y se mudó a Estados Unidos a los cuatro años como refugiada junto a su padre. Dieciocho años después, logró reunirse nuevamente con su madre. Como la primera persona de su familia en graduarse de la universidad y comprar una casa, Chinh aprendió desde temprano que el trabajo duro y un buen sentido del humor pueden llevarte muy lejos. Descubrió su amor por contar historias leyendo los periódicos que su padre, quien trabajaba como conserje, llevaba a casa y viendo las noticias junto a él mientras ambos aprendían inglés. Esa curiosidad se convirtió en una carrera periodística galardonada y, más adelante, en su propia empresa de storytelling, desde donde ayuda a otras personas a compartir sus voces. Chinh vive en Tulsa, Oklahoma, con su esposo, su madre, de quien estuvo separada durante 18 años, y sus dos perros rescatados. En su hogar hablan inglés, vietnamita y español. Disfruta viajar, probar nuevas comidas y crear contenido para redes sociales.",
    },
  },
]

const translations = {
  en: {
    title: "Team",
    subtitle: "Meet the team behind Digital Nomad Summit Santo Domingo 2026.",
    email: "Email",
    readMore: "View profile",
    readLess: "Show less",
    backToHome: "Back to Home",
  },
  es: {
    title: "Equipo",
    subtitle: "Conoce al equipo detrás de Digital Nomad Summit Santo Domingo 2026.",
    email: "Correo",
    readMore: "Ver perfil",
    readLess: "Ver menos",
    backToHome: "Volver al Inicio",
  },
}

interface TeamCardProps {
  member: TeamMember
  t: (typeof translations)["en"]
  lang: "en" | "es"
  index: number
}

function TeamCard({ member, t, lang, index }: TeamCardProps) {
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
      { threshold: 0.1, rootMargin: "50px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col bg-black/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#FF5757]/30 hover:bg-white/[0.03] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(255,87,87,0.08)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Visual Accent Header */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FF5757]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Headshot */}
      <div className="relative flex justify-center pt-10 pb-6 px-8 z-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#FF5757]/50 transition-all duration-500 flex-shrink-0 shadow-2xl group-hover:shadow-[#FF5757]/20">
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
          )}
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="128px"
            className={`object-cover ${member.imagePosition || "object-center"} transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            priority={index < 4}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-8 pb-8 gap-4 z-10">
        {/* Header (Name & Role) */}
        <div className="flex flex-col items-center text-center gap-1">
          {member.role && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#FF5757] bg-[#FF5757]/10 px-2.5 py-0.5 rounded-full mb-1">
              {member.role}
            </span>
          )}
          <h3 className="font-display font-semibold text-white text-xl leading-tight text-balance">
            {member.name}
          </h3>
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#FF5757] transition-colors duration-200 font-sans mt-1 group/email"
            aria-label={`${t.email}: ${member.email}`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover/email:opacity-100 transition-opacity" />
            <span className="truncate max-w-[200px]">{member.email}</span>
          </a>
        </div>

        <div className="h-px w-12 bg-white/10 mx-auto my-1 group-hover:bg-[#FF5757]/30 transition-colors duration-500" />

        {/* Short bio */}
        <p className="font-sans text-sm text-white/60 leading-relaxed text-center">
          {member.shortBio[lang]}
        </p>

        {/* Expandable full bio */}
        <div
          ref={fullBioRef}
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ maxHeight: expanded ? `${fullBioRef.current?.scrollHeight ?? 800}px` : "0px", opacity: expanded ? 1 : 0 }}
        >
          <div className="pt-4 pb-2">
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              {member.fullBio[lang]}
            </p>
          </div>
        </div>

        {/* Expand / collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-auto self-center flex items-center justify-center gap-1.5 text-xs font-sans font-medium text-white/50 hover:text-[#FF5757] transition-all duration-300 pt-2 group/btn"
          aria-expanded={expanded}
        >
          <span>{expanded ? t.readLess : t.readMore}</span>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 rotate-180 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          )}
        </button>
      </div>
    </div>
  )
}

export function TeamGrid() {
  const { language } = useLanguage()
  const t = translations[language as "en" | "es"] || translations.en
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
    <main className="min-h-screen bg-[#050505]">
      {/* Premium Hero Section */}
      <section className="relative pt-44 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Global/Premium Background Elements */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(255,87,87,0.15)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        
        <div
          ref={heroRef}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-white/50 hover:text-[#FF5757] transition-colors duration-200 mb-12 uppercase tracking-widest"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            {t.backToHome}
          </Link>

          {/* Premium Title Area */}
          <div className="relative inline-block mb-6">
            <div className="absolute -top-4 -right-6 w-3 h-3 bg-[#FF5757] rounded-full animate-pulse blur-[2px]" />
            <div className="absolute -top-4 -right-6 w-3 h-3 bg-[#FF5757] rounded-full" />
            <h1 className="font-display font-bold text-white text-6xl md:text-8xl leading-none tracking-tight text-balance drop-shadow-2xl">
              {t.title}
            </h1>
          </div>
          
          <p className="mt-6 font-sans text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl text-balance">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.email}
              member={member}
              t={t}
              lang={language as "en" | "es"}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

