"use client"

import { useEffect } from "react"
import { X, ExternalLink, Network, Database, Globe2, ShieldCheck, Zap, Columns } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface DiterPillarModalProps {
  isOpen: boolean
  onClose: () => void
  pillarId: string | null
}

const pillarData = {
  "01": {
    enTitle: "The Diaspora + Digital Nomads",
    esTitle: "La Diáspora y Nómadas Digitales",
    label: "Talent & Capital Network",
    expandedEn: "This pillar recognizes the Dominican diaspora and global digital nomad movement as strategic channels for knowledge transfer, investment access, market visibility, and international collaboration. It positions mobile talent and transnational communities as part of the Dominican innovation engine.",
    expandedEs: "Este pilar reconoce a la diáspora dominicana y al movimiento global de nómadas digitales como canales estratégicos para la transferencia de conocimiento, acceso a inversión, visibilidad de mercado y colaboración internacional. Posiciona al talento móvil y las comunidades transnacionales como parte del motor de innovación dominicano.",
    whyItMattersEn: "Global talent networks can help convert local capability into international opportunity.",
    whyItMattersEs: "Las redes de talento global pueden ayudar a convertir la capacidad local en oportunidad internacional.",
    Icon: Globe2,
  },
  "02": {
    enTitle: "Export Intelligence",
    esTitle: "Inteligencia de Exportación",
    label: "Knowledge Transfer",
    expandedEn: "Export Intelligence focuses on identifying what the Dominican Republic can export next beyond traditional sectors. It connects modern services, digital capabilities, creative production, technology, and professional expertise to global demand.",
    expandedEs: "La Inteligencia de Exportación se centra en identificar qué puede exportar la República Dominicana a continuación, más allá de los sectores tradicionales. Conecta servicios modernos, capacidades digitales, producción creativa, tecnología y experiencia profesional con la demanda global.",
    whyItMattersEn: "The next export economy is not only about goods. It is about knowledge, systems, services, and scalable capabilities.",
    whyItMattersEs: "La próxima economía de exportación no se trata solo de bienes. Se trata de conocimiento, sistemas, servicios y capacidades escalables.",
    Icon: Database,
  },
  "03": {
    enTitle: "Retention, Value & Compliance",
    esTitle: "Retención, Valor y Cumplimiento",
    label: "Structural Integrity",
    expandedEn: "This pillar focuses on keeping intellectual value, business substance, and compliance structures aligned so innovation created in the Dominican Republic produces durable economic benefit. It connects growth with governance, retention, and long-term value capture.",
    expandedEs: "Este pilar se centra en mantener alineados el valor intelectual, la sustancia comercial y las estructuras de cumplimiento para que la innovación creada en la República Dominicana produzca un beneficio económico duradero. Conecta el crecimiento con la gobernanza, la retención y la captura de valor a largo plazo.",
    whyItMattersEn: "Innovation must create local value, protect business substance, and remain investable.",
    whyItMattersEs: "La innovación debe crear valor local, proteger la sustancia comercial y seguir siendo invertible.",
    Icon: ShieldCheck,
  },
  "04": {
    enTitle: "The Transnational Bridge",
    esTitle: "El Puente Transnacional",
    label: "Cross-Border Scaling",
    expandedEn: "The Transnational Bridge connects Dominican capability to global markets, diaspora networks, investors, partners, and institutional channels. It frames the Dominican Republic not only as a destination, but as a platform for cross-border growth.",
    expandedEs: "El Puente Transnacional conecta la capacidad dominicana con los mercados globales, redes de la diáspora, inversores, socios y canales institucionales. Enmarca a la República Dominicana no solo como un destino, sino como una plataforma para el crecimiento transfronterizo.",
    whyItMattersEn: "The bridge between local capability and global opportunity is where partnerships, capital, and export pathways are built.",
    whyItMattersEs: "El puente entre la capacidad local y la oportunidad global es donde se construyen alianzas, capital y vías de exportación.",
    Icon: Network,
  },
  "05": {
    enTitle: "Operational Interoperability",
    esTitle: "Interoperabilidad Operacional",
    label: "Frictionless Business",
    expandedEn: "Operational Interoperability focuses on reducing friction between institutions, systems, policies, and operating environments. It is about making it easier for companies, talent, institutions, and investors to collaborate and scale across borders.",
    expandedEs: "La Interoperabilidad Operacional se centra en reducir la fricción entre instituciones, sistemas, políticas y entornos operativos. Se trata de facilitar que las empresas, el talento, las instituciones y los inversores colaboren y escalen a través de las fronteras.",
    whyItMattersEn: "Without interoperable systems, innovation remains fragmented. With interoperability, markets become easier to access and scale.",
    whyItMattersEs: "Sin sistemas interoperables, la innovación permanece fragmentada. Con interoperabilidad, es más fácil acceder y escalar en los mercados.",
    Icon: Zap,
  },
  "06": {
    enTitle: "Innovation Architecture",
    esTitle: "Arquitectura de Innovación",
    label: "Ecosystem Design",
    expandedEn: "Innovation Architecture defines the structural foundations needed for long-term competitiveness: ecosystem design, institutional coordination, capital pathways, talent development, export intelligence, and venture-building infrastructure.",
    expandedEs: "La Arquitectura de Innovación define los cimientos estructurales necesarios para la competitividad a largo plazo: diseño de ecosistemas, coordinación institucional, vías de capital, desarrollo de talento, inteligencia de exportación e infraestructura para la creación de empresas.",
    whyItMattersEn: "Sustainable innovation requires architecture — not isolated activity.",
    whyItMattersEs: "La innovación sostenible requiere arquitectura, no actividades aisladas.",
    Icon: Columns,
  }
}

export function DiterPillarModal({ isOpen, onClose, pillarId }: DiterPillarModalProps) {
  const { language } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !pillarId) return null

  const data = pillarData[pillarId as keyof typeof pillarData]
  if (!data) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className="relative z-10 w-full sm:max-w-4xl max-h-[90vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5757]"
          aria-label="Close modal"
          suppressHydrationWarning
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Visual Panel (Left side on desktop, top on mobile) */}
        <div className="w-full sm:w-2/5 bg-gray-50 border-r border-gray-100 relative p-8 flex flex-col items-center justify-center overflow-hidden min-h-[300px] sm:min-h-full">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* DITER 2026 Badge */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 shadow-sm">
              DITER 2026 Framework
            </div>

            {/* Central Node Visual */}
            <div className="relative mb-8">
              <div className="absolute inset-0 border border-[#FF5757]/20 rounded-full scale-150 animate-pulse" />
              <div className="absolute inset-0 border border-[#FF5757]/10 rounded-full scale-125" />
              <div className="w-24 h-24 rounded-full bg-white border-2 border-[#FF5757] shadow-[0_0_30px_rgba(255,87,87,0.15)] flex items-center justify-center relative z-10">
                <data.Icon className="w-10 h-10 text-[#FF5757]" strokeWidth={1.5} />
              </div>
              
              {/* Connector lines */}
              <div className="absolute top-1/2 -left-12 w-12 h-px bg-gradient-to-r from-transparent to-[#FF5757]/50" />
              <div className="absolute top-1/2 -right-12 w-12 h-px bg-gradient-to-l from-transparent to-[#FF5757]/50" />
              <div className="absolute -top-12 left-1/2 w-px h-12 bg-gradient-to-b from-transparent to-[#FF5757]/50" />
              <div className="absolute -bottom-12 left-1/2 w-px h-12 bg-gradient-to-t from-transparent to-[#FF5757]/50" />
            </div>

            <span className="text-6xl font-black font-display text-gray-200 mb-4">{pillarId}</span>
            <h4 className="font-display text-xl font-bold text-gray-900 leading-tight">
              {data.enTitle}
            </h4>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#FF5757] mt-3 bg-[#FF5757]/10 px-3 py-1 rounded-full">
              {data.label}
            </span>
          </div>
        </div>

        {/* Content Panel (Right side on desktop, bottom on mobile) */}
        <div className="w-full sm:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[60vh] sm:max-h-full">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
              {language === "es" ? data.esTitle : data.enTitle}
            </h2>
            <h3 className="text-lg font-medium text-gray-400">
              {language === "es" ? data.enTitle : data.esTitle}
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {language === "es" ? data.expandedEs : data.expandedEn}
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5757]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
                {language === "es" ? "Por Qué Es Importante" : "Why It Matters"}
              </h4>
              <p className="text-gray-700 font-medium italic">
                "{language === "es" ? data.whyItMattersEs : data.whyItMattersEn}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
