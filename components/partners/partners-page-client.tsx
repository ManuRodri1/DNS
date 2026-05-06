"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { GroupedPartners, Partner } from "@/lib/data/partners"
import { PartnerLogoGrid } from "./partner-logo-grid"
import { SponsorModal } from "@/components/sponsor-modal"
import { Footer } from "@/components/footer"
import { ArrowRight, Globe, TrendingUp, Users, Building2, Landmark, Zap, Shield, Rocket } from "lucide-react"
import Image from "next/image"

// Import the new subcomponents
import { HeroMetrics } from "./hero-metrics"
import { PartnersLogoMarquee } from "./partners-logo-marquee"
import { DiterArchitectureDiagram } from "./diter-diagram"
import { DiterPillarModal } from "./diter-pillar-modal"

const content = {
  en: {
    hero: {
      eyebrow: "STRATEGIC PARTNERSHIPS",
      title: "Partner With the Digital Nomad Summit",
      support: "Position your brand at the center of Caribbean opportunity.",
      sub: "Connect your brand with founders, investors, policymakers, institutions, ecosystem builders, and global operators shaping the future of work, mobility, tourism, real estate, innovation, and emerging-market growth.",
      event: "Santo Domingo · August 6–7, 2026 · Hotel Catalonia Santo Domingo",
      primaryCta: "Start Partnership Inquiry",
      secondaryCta: "Explore the Network",
    },
    curated: {
      title: "A Curated Room for High-Value Conversations",
      desc: "DNS 2026 is not a mass-market conference. It is a highly curated assembly of decision-makers. We cap attendance to ensure high signal-to-noise ratio and meaningful access for our partners.",
      audiences: [
        "Founders & Tech Entrepreneurs",
        "Angel Investors & VCs",
        "Public Sector Policymakers",
        "Corporate Innovation Leaders",
      ]
    },
    diter: {
      eyebrow: "INTELLECTUAL FRAMEWORK",
      title: "The DITER 2026 Operating System",
      desc: "Every partnership, session, and activation at the summit is mapped to the DITER framework—a thesis for how the Caribbean transforms into a global innovation hub.",
      pillars: [
        { id: "01", en: "Diaspora & Nomads", es: "Diáspora y Nómadas", desc: "Leveraging global talent." },
        { id: "02", en: "Export Intelligence", es: "Inteligencia Exportadora", desc: "Building for the world." },
        { id: "03", en: "Retention & Value", es: "Retención y Valor", desc: "Keeping IP local." },
        { id: "04", en: "Transnational Bridge", es: "Puente Transnacional", desc: "Connecting markets." },
        { id: "05", en: "Operational Interoperability", es: "Interoperabilidad Operacional", desc: "Frictionless business." },
        { id: "06", en: "Innovation Architecture", es: "Arquitectura de Innovación", desc: "Structural foundations." },
      ]
    },
    categories: {
      title: "Strategic Alignment Areas",
      items: [
        { icon: Globe, label: "Digital Infrastructure" },
        { icon: Landmark, label: "Government & Policy" },
        { icon: Building2, label: "Real Estate & Hospitality" },
        { icon: Zap, label: "Fintech & Payments" },
        { icon: Rocket, label: "Mobility & Transport" },
        { icon: Shield, label: "Legal & Corporate Services" },
        { icon: Users, label: "Community & Education" },
        { icon: TrendingUp, label: "Venture & Investment" },
      ]
    },
    models: {
      title: "Strategic Partnership Models",
      items: [
        {
          tier: "Strategic Partner",
          exclusivity: "Category Exclusivity Available",
          benefits: ["Co-branded positioning", "Keynote / Panel integration", "Curated VIP dinner access", "Custom experiential activation"]
        },
        {
          tier: "Track / Pillar Sponsor",
          exclusivity: "Aligned to DITER Pillars",
          benefits: ["Branded stage / track", "Speaking opportunity", "Lead generation tools", "Brand visibility package"]
        },
        {
          tier: "Ecosystem Partner",
          exclusivity: "Startups & Accelerators",
          benefits: ["Exhibition space", "Startup showcase participation", "Networking access", "Digital branding"]
        },
        {
          tier: "Institutional Ally",
          exclusivity: "Gov & Non-Profits",
          benefits: ["Policy roundtable access", "Institutional branding", "Key stakeholder matching", "Whitepaper inclusion"]
        }
      ]
    },
    activations: {
      title: "Ways to Activate",
      desc: "Beyond logo placement, we design meaningful touchpoints that drive business objectives.",
      items: [
        { title: "Thought Leadership", desc: "Keynotes, panels, and masterclasses." },
        { title: "Curated Networking", desc: "Private dinners, VIP lounges, and matched 1:1 meetings." },
        { title: "Experiential", desc: "Product showcases, interactive lounges, and on-site activations." },
        { title: "Digital & Content", desc: "Pre-summit webinars, newsletter features, and post-event reports." }
      ]
    },
    zari: {
      eyebrow: "ECOSYSTEM",
      title: "From Founders, For Founders",
      desc: "The Digital Nomad Summit is more than an event — it is a convening of the Successment Venture Labs ecosystem. We are building the tools and networks that enable cross-border innovation, starting with ZARI Mobility™.",
      quote: "ZARI is the flagship example of Caribbean-built innovation designed for global scale."
    },
    cta: {
      title: "Shape the Future of the Caribbean",
      desc: "Connect with our partnership team to explore custom alignment opportunities.",
      btn: "Start Partnership Inquiry"
    }
  },
  es: {
    hero: {
      eyebrow: "ALIANZAS ESTRATÉGICAS",
      title: "Asóciate con el Digital Nomad Summit",
      support: "Posiciona tu marca en el centro de la oportunidad del Caribe.",
      sub: "Conecta tu marca con fundadores, inversores, líderes públicos, instituciones y operadores globales que dan forma al futuro del trabajo, movilidad, turismo, innovación y mercados emergentes.",
      event: "Santo Domingo · 6–7 de Agosto, 2026 · Hotel Catalonia Santo Domingo",
      primaryCta: "Iniciar Solicitud de Alianza",
      secondaryCta: "Explorar la Red",
    },
    curated: {
      title: "Un Espacio Curado para Conversaciones de Alto Valor",
      desc: "DNS 2026 no es una conferencia masiva. Es una asamblea altamente curada de tomadores de decisiones. Limitamos la asistencia para asegurar una alta relación señal-ruido y acceso significativo para nuestros aliados.",
      audiences: [
        "Fundadores y Emprendedores Tech",
        "Inversores Ángeles y VCs",
        "Líderes de Políticas Públicas",
        "Líderes de Innovación Corporativa",
      ]
    },
    diter: {
      eyebrow: "MARCO INTELECTUAL",
      title: "El Sistema Operativo DITER 2026",
      desc: "Cada alianza, sesión y activación en la cumbre está mapeada al marco DITER—una tesis de cómo el Caribe se transforma en un hub global de innovación.",
      pillars: [
        { id: "01", en: "Diaspora & Nomads", es: "Diáspora y Nómadas", desc: "Aprovechando el talento global." },
        { id: "02", en: "Export Intelligence", es: "Inteligencia Exportadora", desc: "Construyendo para el mundo." },
        { id: "03", en: "Retention & Value", es: "Retención y Valor", desc: "Manteniendo la IP local." },
        { id: "04", en: "Transnational Bridge", es: "Puente Transnacional", desc: "Conectando mercados." },
        { id: "05", en: "Operational Interoperability", es: "Interoperabilidad Operacional", desc: "Negocios sin fricción." },
        { id: "06", en: "Innovation Architecture", es: "Arquitectura de Innovación", desc: "Fundaciones estructurales." },
      ]
    },
    categories: {
      title: "Áreas de Alineación Estratégica",
      items: [
        { icon: Globe, label: "Infraestructura Digital" },
        { icon: Landmark, label: "Gobierno y Políticas" },
        { icon: Building2, label: "Bienes Raíces y Hospitalidad" },
        { icon: Zap, label: "Fintech y Pagos" },
        { icon: Rocket, label: "Movilidad y Transporte" },
        { icon: Shield, label: "Servicios Legales y Corporativos" },
        { icon: Users, label: "Comunidad y Educación" },
        { icon: TrendingUp, label: "Capital Riesgo e Inversión" },
      ]
    },
    models: {
      title: "Modelos de Alianza Estratégica",
      items: [
        {
          tier: "Aliado Estratégico",
          exclusivity: "Exclusividad de Categoría Disponible",
          benefits: ["Posicionamiento de marca compartida", "Integración en Keynote / Panel", "Acceso a cena VIP curada", "Activación experiencial personalizada"]
        },
        {
          tier: "Patrocinador de Track / Pilar",
          exclusivity: "Alineado a Pilares DITER",
          benefits: ["Escenario / track con marca", "Oportunidad de hablar", "Herramientas de generación de leads", "Paquete de visibilidad de marca"]
        },
        {
          tier: "Aliado del Ecosistema",
          exclusivity: "Startups y Aceleradoras",
          benefits: ["Espacio de exhibición", "Participación en showcase de startups", "Acceso a networking", "Branding digital"]
        },
        {
          tier: "Aliado Institucional",
          exclusivity: "Gobierno y ONGs",
          benefits: ["Acceso a mesa redonda de políticas", "Branding institucional", "Conexión con actores clave", "Inclusión en whitepaper"]
        }
      ]
    },
    activations: {
      title: "Formas de Activar",
      desc: "Más allá de poner un logo, diseñamos puntos de contacto significativos que impulsan objetivos de negocio.",
      items: [
        { title: "Liderazgo de Pensamiento", desc: "Keynotes, paneles y masterclasses." },
        { title: "Networking Curado", desc: "Cenas privadas, salones VIP y reuniones 1:1." },
        { title: "Experiencial", desc: "Exhibición de productos, salones interactivos y activaciones in situ." },
        { title: "Digital y Contenido", desc: "Webinars pre-cumbre, menciones en newsletter y reportes post-evento." }
      ]
    },
    zari: {
      eyebrow: "ECOSISTEMA",
      title: "De Fundadores, Para Fundadores",
      desc: "El Digital Nomad Summit es más que un evento — es el punto de encuentro del ecosistema de Successment Venture Labs. Estamos creando las herramientas y redes que habilitan la innovación transfronteriza, comenzando con ZARI Mobility™.",
      quote: "ZARI es el ejemplo emblemático de innovación caribeña diseñada para escala global."
    },
    cta: {
      title: "Da Forma al Futuro del Caribe",
      desc: "Conecta con nuestro equipo de alianzas para explorar oportunidades de alineación personalizadas.",
      btn: "Iniciar Solicitud de Alianza"
    }
  }
}

export function PartnersPageClient({ groupedPartners }: { groupedPartners: GroupedPartners }) {
  const { language } = useLanguage()
  const t = content[language]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null)

  // Map the object keys to an ordered array for the logo grid sections
  const sections = [
    { key: 'brand_sponsors', title: language === 'en' ? 'Brand Sponsors' : 'Patrocinadores de Marca' },
    { key: 'diter_intellectual_sponsors', title: language === 'en' ? 'Intellectual Sponsors' : 'Patrocinadores Intelectuales' },
    { key: 'technical_alignment', title: language === 'en' ? 'Technical Alignment' : 'Alineación Técnica' },
    { key: 'institutional_ecosystem', title: language === 'en' ? 'Institutional Ecosystem' : 'Ecosistema Institucional' },
    { key: 'media_partners', title: language === 'en' ? 'Media Partners' : 'Aliados de Media' },
  ].map(s => ({
    title: s.title,
    section: s.key,
    partners: groupedPartners[s.key as keyof GroupedPartners] || []
  })).filter(s => s.partners.length > 0)

  // Collect all active partners for the marquee
  const allPartners = Object.values(groupedPartners).flat()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF5757] selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Premium multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D1A] to-[#0A0A0A] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,87,87,0.12),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <span className="inline-block rounded-full bg-[#FF5757]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5757] font-display border border-[#FF5757]/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-balance leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#FF5757] font-medium mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t.hero.support}
          </p>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mb-10 text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            {t.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md bg-[#FF5757] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#FF5757] font-display w-full sm:w-auto"
              suppressHydrationWarning
            >
              {t.hero.primaryCta}
            </button>
            <a
              href="#partner-network"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 font-display w-full sm:w-auto"
              suppressHydrationWarning
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-white/50 font-medium tracking-wide uppercase">
            <span className="w-8 h-px bg-white/20"></span>
            {t.hero.event}
            <span className="w-8 h-px bg-white/20"></span>
          </div>

          <HeroMetrics />
        </div>
      </section>

      {/* 2. LOGO MARQUEE */}
      <PartnersLogoMarquee partners={allPartners} />

      {/* 3. CURATED ROOM - ASYMMETRIC */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t.curated.title}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {t.curated.desc}
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {t.curated.audiences.map((aud, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF5757]/10 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#FF5757]"></span>
                    </span>
                    {aud}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black font-display text-white mb-2">300+</span>
                <span className="text-sm text-white/50 uppercase tracking-widest font-bold">Leaders</span>
              </div>
              <div className="bg-[#FF5757]/10 border border-[#FF5757]/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black font-display text-[#FF5757] mb-2">8</span>
                <span className="text-sm text-[#FF5757]/80 uppercase tracking-widest font-bold">Sectors</span>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black font-display text-white mb-2">DR</span>
                <span className="text-sm text-white/50 uppercase tracking-widest font-bold">Local</span>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black font-display text-white mb-2">Global</span>
                <span className="text-sm text-white/50 uppercase tracking-widest font-bold">Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DITER FRAMEWORK - WHITE THEME FOR HEADER INVERSION */}
      <section id="diter-2026" className="py-32 bg-white text-black scroll-mt-24" data-header-theme="white">
        <div className="max-w-7xl mx-auto px-6">

          {/* INTRO BLOCK */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-black/5 text-black font-bold uppercase tracking-widest text-xs">
                  Strategic Assessment 2026
                </span>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FF5757]/10 text-[#FF5757] font-bold uppercase tracking-widest text-xs">
                  {language === "es" ? "Edición Bilingüe" : "Bilingual Framework"}
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                DITER 2026
              </h2>
              <h3 className="text-xl md:text-2xl text-black/60 font-medium mb-8 leading-relaxed">
                Dominican Innovation & Transnational Export Report<br />
                Informe de Innovación Dominicana y Exportación Transnacional
              </h3>

              <div className="space-y-6 text-lg text-black/70 leading-relaxed mb-8">
                <p>
                  {language === "es"
                    ? "DITER 2026 es la capa de infraestructura intelectual detrás del Digital Nomad Summit — una evaluación estratégica bilingüe diseñada para definir cómo la República Dominicana convierte conocimiento, talento, servicios, capacidad institucional e innovación en poder económico exportable."
                    : "DITER 2026 is the intellectual infrastructure layer behind the Digital Nomad Summit — a bilingual strategic assessment designed to define how the Dominican Republic converts knowledge, talent, services, institutional capability, and innovation into exportable economic power."}
                </p>
                <p>
                  {language === "es"
                    ? "No es simplemente un reporte. Es un marco para entender qué puede exportar la República Dominicana a continuación, cómo los servicios modernos escalan a través de las fronteras, y dónde la política, el capital, la academia y el sector privado pueden alinearse para desbloquear crecimiento."
                    : "It is not simply a report. It is a framework for understanding what the Dominican Republic can export next, how modern services scale across borders, and where policy, capital, academia, and the private sector can align to unlock growth."}
                </p>
                <p>
                  {language === "es"
                    ? "DITER traza la arquitectura requerida para que la República Dominicana pase de ser un exportador de servicios a un motor de inteligencia soberana — conectando talento con capital global, academia con mercados de riesgo e instituciones con sistemas interoperables."
                    : "DITER maps the architecture required for the Dominican Republic to move from a service exporter to a sovereign intelligence engine — connecting talent with global capital, academia with venture markets, and institutions with interoperable systems."}
                </p>
              </div>

              <div className="border-l-4 border-[#FF5757] pl-6 py-2">
                <p className="text-xl font-bold text-black italic">
                  "{language === "es" ? "Lo que se define aquí, se vuelve invertible." : "What gets defined here becomes investable."}"
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-sm bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent z-10 pointer-events-none mix-blend-multiply" />
                <Image
                  src="https://res.cloudinary.com/dzebed7jw/image/upload/v1778088214/unnamed_1_uiwpzr.png"
                  alt="DITER 2026 Cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-sm group-hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>

          {/* WHY DITER MATTERS */}
          <div className="mb-24 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              {language === "es" ? "Por Qué DITER Importa" : "Why DITER Matters"}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center md:text-left">
                <h4 className="font-bold text-lg text-gray-900">{language === "es" ? "Conocimiento Exportable" : "Exportable Knowledge"}</h4>
                <p className="text-gray-600 leading-relaxed">{language === "es" ? "Define qué puede exportar la República Dominicana a continuación más allá de los sectores tradicionales." : "Defines what the Dominican Republic can export next beyond traditional sectors."}</p>
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h4 className="font-bold text-lg text-gray-900">{language === "es" ? "Alineación Institucional" : "Institutional Alignment"}</h4>
                <p className="text-gray-600 leading-relaxed">{language === "es" ? "Conecta capital, academia, liderazgo de exportación, emprendimiento y gobernanza digital." : "Connects capital, academia, export leadership, entrepreneurship, and digital governance."}</p>
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h4 className="font-bold text-lg text-gray-900">{language === "es" ? "Oportunidad Transnacional" : "Transnational Opportunity"}</h4>
                <p className="text-gray-600 leading-relaxed">{language === "es" ? "Construye el puente desde la capacidad dominicana hacia los mercados globales." : "Builds the bridge from Dominican capability to global markets."}</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "es" ? "El Sistema Operativo DITER 2026" : "The DITER 2026 Operating System"}
            </h3>
          </div>

          {/* 6 PILLARS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {t.diter.pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className="relative bg-white border border-gray-200 rounded-xl p-8 overflow-hidden group hover:border-[#FF5757] hover:shadow-lg transition-all duration-300 text-left w-full focus:outline-none focus:ring-2 focus:ring-[#FF5757]"
                aria-label={`Explore pillar ${pillar.en}`}
                suppressHydrationWarning
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 pointer-events-none" />
                <div className="absolute -right-4 -bottom-8 text-8xl font-black text-black/5 select-none pointer-events-none group-hover:text-[#FF5757]/5 group-hover:scale-110 transition-all duration-500 font-display">
                  {pillar.id}
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-1 bg-[#FF5757] mb-6 transition-all duration-300 group-hover:w-16"></div>
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-[#FF5757] transition-colors">
                    {language === "es" ? pillar.es : pillar.en}
                  </h3>
                  <h4 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-6">
                    {language === "es" ? pillar.en : pillar.es}
                  </h4>

                  <div className="flex items-center text-[#FF5757] text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                    {language === "es" ? "Explorar Pilar" : "Explore Pillar"} <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#partnership-models"
              className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-gray-900 font-display shadow-md"
              suppressHydrationWarning
            >
              {language === "es" ? "Explorar el Marco DITER" : "Explore the DITER Framework"}
            </a>
            <a
              href="#partner-network"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 font-display shadow-sm"
              suppressHydrationWarning
            >
              {language === "es" ? "Ver Patrocinadores Intelectuales" : "View Intellectual Sponsors"}
            </a>
          </div>
        </div>
      </section>

      <DiterPillarModal
        isOpen={!!selectedPillarId}
        onClose={() => setSelectedPillarId(null)}
        pillarId={selectedPillarId}
      />

      {/* 4.5 ALIGNMENT CATEGORIES */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.categories.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.categories.items.map((cat, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-[#FF5757]/40 hover:bg-white/[0.04] transition-all duration-300 group text-center relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-6xl font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#FF5757]/5 transition-colors duration-300 font-display">
                  0{i + 1}
                </div>
                <cat.icon className="w-8 h-8 text-[#FF5757] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="font-sans text-sm font-semibold text-white/90 relative z-10">{cat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRATEGIC MODELS */}
      <section id="partnership-models" className="py-24 bg-[#0A0A0A] border-b border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.models.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.models.items.map((model, i) => (
              <div key={i} className={`flex flex-col bg-white/[0.02] border ${i === 0 ? 'border-[#FF5757]/30' : 'border-white/10'} rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group`}>
                {i === 0 && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF5757] to-[#FF8080]" />}

                <div className="mb-8">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{model.tier}</h3>
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF5757] bg-[#FF5757]/10 px-3 py-1 rounded-full">
                    {model.exclusivity}
                  </span>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {model.benefits.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-white/70 text-sm">
                      <ArrowRight className="w-4 h-4 text-[#FF5757] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${i === 0
                      ? 'bg-[#FF5757] text-white hover:bg-white hover:text-[#FF5757]'
                      : 'bg-white/10 text-white hover:bg-white hover:text-black'
                    }`}
                  suppressHydrationWarning
                >
                  {t.hero.primaryCta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 WAYS TO ACTIVATE */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t.activations.title}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed text-pretty">
                {t.activations.desc}
              </p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {t.activations.items.map((item, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:bg-[#FF5757]/5 hover:border-[#FF5757]/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#FF5757]/20 transition-colors">
                    {i === 0 && <Users className="w-5 h-5 text-[#FF5757]" />}
                    {i === 1 && <Globe className="w-5 h-5 text-[#FF5757]" />}
                    {i === 2 && <Building2 className="w-5 h-5 text-[#FF5757]" />}
                    {i === 3 && <TrendingUp className="w-5 h-5 text-[#FF5757]" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOGO GROUPS & NETWORK */}
      <section id="partner-network" className="py-24 bg-[#0D0D1A] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {sections.map((group) => {
            // Determine variant based on group section string
            let variant: "dark" | "light-panel" | "white" = "dark"
            if (group.section.includes("intellectual") || group.section.includes("institutional")) variant = "light-panel"
            if (group.section.includes("technical")) variant = "white"

            return (
              <div key={group.section}>
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-white mb-4">
                    {group.title}
                  </h2>
                  <div className="w-12 h-1 bg-[#FF5757] mx-auto rounded-full"></div>
                </div>
                <PartnerLogoGrid partners={group.partners} variant={variant} />
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. ZARI & ECOSYSTEM */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block rounded-full bg-[#FF5757]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5757] mb-6">
                {t.zari.eyebrow}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                {t.zari.title}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {t.zari.desc}
              </p>
              <div className="border-l-2 border-[#FF5757] pl-6 py-2">
                <p className="text-lg text-white font-medium italic">
                  "{t.zari.quote}"
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-video lg:aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5757]/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <Image
                  src="/images/zari-20image.jpg"
                  alt="ZARI Mobility platform"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section id="sponsorship-form" className="py-32 bg-[#FF5757] text-white text-center scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-5xl font-bold tracking-tight mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {t.cta.desc}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md bg-white px-10 py-5 text-lg font-bold text-[#FF5757] transition-transform duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-display"
            suppressHydrationWarning
          >
            {t.cta.btn}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL MODAL */}
      <SponsorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
