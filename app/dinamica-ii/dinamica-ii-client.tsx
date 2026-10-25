"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { DINAMICA_ASSETS, DINAMICA_TICKETS } from "@/lib/dinamica-ii/config"
import { StartupApplicationForm } from "@/components/dinamica-ii/startup-application-form"
import "./dinamica-ii.css"

const copy = {
  en: {
    eyebrow: "DNS 2027 · DINAMICA II EXPORTABLE INNOVATION PRIZE",
    headline: "YOUR STARTUP COULD WIN",
    grandLabel: "Grand Prize",
    grand: "US$8,500.",
    subhead:
      "From the Dominican Republic. From the diaspora. Or building your next market here. If your startup has real cross-border ambition, this is your stage.",
    runner: "Runner-Up",
    finalists: "Finalists",
    ticket: "Get Your DNS Ticket",
    eligibility: "Check Eligibility",
    ticketNote:
      "A valid paid DNS 2027 ticket unlocks application submission. Purchasing a ticket does not guarantee selection.",
    event: "April 8–9, 2027 · Santo Domingo",
    initiative: "A regional initiative",
    institutionalTitle: "DINAMICA II initiative",
    institutional:
      "Supported by DINAMICA II, a partnership among the Central American Bank for Economic Integration (CABEI/BCIE), Germany through KfW and the European Union.",
    whoLabel: "01 / Eligibility",
    whoTitle: "Who can apply",
    whoIntro:
      "Dominican founders at home or abroad, and internationally mobile founders building a real connection to the Dominican market: we want to hear from you.",
    whoBody:
      "Your startup must be legally established, at pre-seed, seed or post-MVP stage, and have a product or service with export potential. It must also meet at least ONE Dominican connection: operating in the DR, having Dominican origins, or demonstrating a credible strategy to enter or expand in the Dominican market.",
    whoNote:
      "A founder's passport or current address alone does not establish eligibility. What matters is your startup's legal standing, export opportunity, and tangible Dominican connection.",
    connection: "At least one Dominican connection",
    connections: [
      "Operations in the Dominican Republic",
      "Dominican-origin startup or founding team",
      "Demonstrable plan to enter or expand in the Dominican Republic",
    ],
    processLabel: "02 / The process",
    processTitle: "Five steps to the stage",
    steps: [
      "Get a DNS 2027 ticket or verify your existing valid ticket.",
      "Complete your startup application, including your product, target markets, team, preferred pitch language and Dominican connection.",
      "Verify your ticket to submit. You can prepare the form before purchasing, but only verified ticket holders can submit.",
      "Applications are evaluated against published criteria; up to 10 startups will pitch live.",
      "One startup wins the US$8,500 Grand Prize; another receives US$4,250 as Runner-Up. Winners reinvest in their business and report on results.",
    ],
    juryLabel: "03 / Jury evaluation",
    juryTitle: "What the jury looks for",
    juryIntro: "Every application is assessed against the same five published criteria.",
    criteria: [
      ["Innovation & Differentiation", "25%"],
      ["Export Potential", "25%"],
      ["Scalability & Growth", "20%"],
      ["Digitalization, Sustainability or Economic Inclusion", "15%"],
      ["Founding Team Capacity", "15%"],
    ],
    total: "Total",
    applyLabel: "04 / Startup application",
    applyTitle: "Make your case",
    applyIntro:
      "Tell us what you are building, where it can go, and how the Dominican Republic is part of the plan.",
    openingSoon: "Applications opening soon",
    openingNote:
      "You can review the requirements and get your DNS 2027 ticket now. The official application window will be announced here.",
    faqLabel: "Questions, answered",
    faqTitle: "Before you apply",
    faqs: [
      ["Do I need to be based in the Dominican Republic?", "No. A legally established startup with Dominican operations, Dominican origins, or a demonstrable entry or expansion strategy in the DR may qualify."],
      ["Can diaspora founders apply?", "Yes, if their startup meets the program criteria and establishes the qualifying Dominican connection."],
      ["What about digital nomads or international founders?", "Yes, where the startup meets the requirements and shows a credible Dominican market-entry or expansion plan, or another qualifying connection. Nomad status alone is not an eligibility shortcut."],
      ["Do I need a ticket?", "Yes. Complete your application and verify a valid paid DNS 2027 ticket before final submission. Existing eligible ticket holders can verify without buying again."],
      ["Are applications open?", "The official window and closing date will be announced on this page. A ticket does not guarantee entry to the finalist shortlist."],
      ["What language should I pitch in?", "English presentations are preferred for DNS's international audience. Spanish-only pitches are welcome, and language support will be available for selected finalists. English slides are encouraged, but Spanish slides are not grounds for automatic rejection."],
    ],
    partnerLabel: "For companies, chambers and institutions",
    partnerCopy:
      "Help create measurable opportunities for startup growth and international market access at DNS 2027. Discuss a separate partnership with Successment and the DNS team.",
    partners: "Explore DNS Partnerships",
    closeEyebrow: "DNS 2027 · APRIL 8–9 · SANTO DOMINGO",
    closeTitle: "Build beyond borders.",
    closeCta: "Get your DNS ticket",
    footnote: "Ticket purchase does not guarantee selection.",
  },
  es: {
    eyebrow: "DNS 2027 · PREMIO DINAMICA II A LA INNOVACIÓN EXPORTABLE",
    headline: "TU STARTUP PODRÍA GANAR",
    grandLabel: "Gran premio",
    grand: "US$8,500.",
    subhead:
      "Desde República Dominicana. Desde la diáspora. O desarrollando aquí tu próximo mercado. Si tu startup tiene una verdadera ambición transfronteriza, este es tu escenario.",
    runner: "Segundo lugar",
    finalists: "finalistas",
    ticket: "Consigue tu entrada DNS",
    eligibility: "Comprueba tu elegibilidad",
    ticketNote:
      "Una entrada DNS 2027 válida y pagada habilita el envío de la solicitud. Comprar una entrada no garantiza la selección.",
    event: "8–9 de abril de 2027 · Santo Domingo",
    initiative: "Una iniciativa regional",
    institutionalTitle: "Iniciativa DINAMICA II",
    institutional:
      "Con el apoyo de DINAMICA II, una alianza entre el Banco Centroamericano de Integración Económica (BCIE/CABEI), Alemania a través de KfW y la Unión Europea.",
    whoLabel: "01 / Elegibilidad",
    whoTitle: "Quiénes pueden participar",
    whoIntro:
      "Buscamos fundadores dominicanos, en el país o en el exterior, y fundadores con movilidad internacional que estén creando un vínculo real con el mercado dominicano.",
    whoBody:
      "La startup debe estar legalmente constituida, en etapa pre-seed, seed o posterior al MVP, y ofrecer un producto o servicio con potencial exportador. Además, debe cumplir al menos UN vínculo dominicano: operar en RD, tener origen dominicano o demostrar una estrategia creíble para entrar o expandirse en el mercado dominicano.",
    whoNote:
      "El pasaporte o la dirección actual del fundador no determinan por sí solos la elegibilidad. Importan la situación legal de la startup, su oportunidad exportadora y su vínculo tangible con República Dominicana.",
    connection: "Al menos un vínculo con República Dominicana",
    connections: [
      "Operaciones en República Dominicana",
      "Startup o equipo fundador de origen dominicano",
      "Plan demostrable para entrar o expandirse en República Dominicana",
    ],
    processLabel: "02 / El proceso",
    processTitle: "Cinco pasos hasta el escenario",
    steps: [
      "Compra una entrada DNS 2027 o verifica una entrada válida que ya tengas.",
      "Completa la solicitud de tu startup con el producto, mercados objetivo, equipo, idioma de presentación y vínculo dominicano.",
      "Verifica tu entrada para enviar la solicitud. Puedes preparar el formulario antes de comprar, pero solo quienes tengan una entrada verificada pueden enviarlo.",
      "Las solicitudes se evalúan con los criterios publicados; hasta 10 startups presentarán en vivo.",
      "Una startup gana el gran premio de US$8,500 y otra recibe US$4,250 por el segundo lugar. Las ganadoras reinvierten en su negocio e informan sus resultados.",
    ],
    juryLabel: "03 / Evaluación del jurado",
    juryTitle: "Qué evalúa el jurado",
    juryIntro: "Todas las solicitudes se evalúan con los mismos cinco criterios publicados.",
    criteria: [
      ["Innovación y diferenciación", "25%"],
      ["Potencial exportador", "25%"],
      ["Escalabilidad y crecimiento", "20%"],
      ["Digitalización, sostenibilidad o inclusión económica", "15%"],
      ["Capacidad del equipo fundador", "15%"],
    ],
    total: "Total",
    applyLabel: "04 / Solicitud de startup",
    applyTitle: "Presenta tu propuesta",
    applyIntro:
      "Cuéntanos qué estás construyendo, hasta dónde puede llegar y cómo forma parte República Dominicana de ese plan.",
    openingSoon: "Las solicitudes abrirán próximamente",
    openingNote:
      "Ya puedes revisar los requisitos y conseguir tu entrada DNS 2027. El período oficial de solicitudes se anunciará aquí.",
    faqLabel: "Respuestas claras",
    faqTitle: "Antes de solicitar",
    faqs: [
      ["¿Debo vivir en República Dominicana?", "No. Puede calificar una startup legalmente constituida con operaciones u origen dominicano, o con una estrategia demostrable de entrada o expansión en RD."],
      ["¿Pueden participar fundadores de la diáspora?", "Sí, si su startup cumple los criterios del programa y establece el vínculo dominicano requerido."],
      ["¿Y los nómadas digitales o fundadores internacionales?", "Sí, cuando la startup cumple los requisitos y demuestra un plan creíble de entrada o expansión en el mercado dominicano u otro vínculo válido. La condición de nómada, por sí sola, no otorga elegibilidad."],
      ["¿Necesito una entrada?", "Sí. Completa tu solicitud y verifica una entrada DNS 2027 válida y pagada antes del envío final. Quienes ya tengan una entrada elegible pueden verificarla sin comprar otra."],
      ["¿Ya están abiertas las solicitudes?", "El período oficial y la fecha de cierre se anunciarán en esta página. Tener una entrada no garantiza entrar en la lista de finalistas."],
      ["¿En qué idioma debo presentar?", "Se prefieren presentaciones en inglés para la audiencia internacional de DNS. También se aceptan presentaciones solo en español y habrá apoyo de idioma para finalistas seleccionados. Se recomiendan diapositivas en inglés, pero las diapositivas en español no son motivo de rechazo automático."],
    ],
    partnerLabel: "Para empresas, cámaras e instituciones",
    partnerCopy:
      "Ayuda a crear oportunidades medibles de crecimiento para startups y acceso a mercados internacionales en DNS 2027. Conversa sobre una alianza independiente con Successment y el equipo DNS.",
    partners: "Explora alianzas con DNS",
    closeEyebrow: "DNS 2027 · 8–9 DE ABRIL · SANTO DOMINGO",
    closeTitle: "Crece más allá de las fronteras.",
    closeCta: "Consigue tu entrada DNS",
    footnote: "Comprar una entrada no garantiza la selección.",
  },
} as const

const institutions = [
  { name: "BCIE", src: DINAMICA_ASSETS.bcie, width: 240, height: 100, className: "dinamica-logo-bcie" },
  { name: "Global Gateway", src: DINAMICA_ASSETS.globalGateway, width: 200, height: 115, className: "dinamica-logo-gateway" },
  { name: "Unión Europea", src: DINAMICA_ASSETS.europeanUnion, width: 310, height: 164, className: "dinamica-logo-eu" },
  { name: "Cooperación Alemana", src: DINAMICA_ASSETS.germanCooperation, width: 735, height: 417, className: "dinamica-logo-german" },
  { name: "KfW", src: DINAMICA_ASSETS.kfw, width: 866, height: 497, className: "dinamica-logo-kfw" },
]

export function DinamicaIIPage({ applicationsOpen, privacyNoticeUrl }: { applicationsOpen: boolean; privacyNoticeUrl: string }) {
  const { language } = useLanguage()
  const t = copy[language]

  return (
    <div className="dinamica-page">
      <section className="dinamica-hero" aria-labelledby="dinamica-title">
        <Image
          src={DINAMICA_ASSETS.heroWide}
          alt="A founder presenting to an audience at a Dominican technology event"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
          className="dinamica-hero-photo dinamica-hero-photo-wide"
        />
        <Image
          src={DINAMICA_ASSETS.heroLaptop}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          className="dinamica-hero-photo dinamica-hero-photo-laptop"
          aria-hidden="true"
        />
        <Image
          src={DINAMICA_ASSETS.heroMobile}
          alt=""
          fill
          sizes="100vw"
          className="dinamica-hero-photo dinamica-hero-photo-mobile"
          aria-hidden="true"
        />
        <div className="dinamica-hero-wash" aria-hidden="true" />
        <div className="dinamica-hero-content">
          <p className="dinamica-eyebrow dinamica-hero-reveal">{t.eyebrow}</p>
          <h1 id="dinamica-title" className="dinamica-hero-reveal">
            {t.headline}
            <><span className="dinamica-grand-label">{t.grandLabel}</span><strong className="dinamica-grand-amount">{t.grand}</strong></>
          </h1>
          <p className="dinamica-hero-copy dinamica-hero-reveal">{t.subhead}</p>
          <div className="dinamica-prize-line dinamica-hero-reveal" aria-label={language === "en" ? "Additional prizes" : "Premios adicionales"}>
            <span><b>US$4,250</b><small>{t.runner}</small></span>
            <span className="dinamica-prize-rule" />
            <span><b>{language === "en" ? "Up to 10" : "Hasta 10"}</b><small>{t.finalists}</small></span>
          </div>
          <div className="dinamica-hero-actions dinamica-hero-reveal">
            <a className="dinamica-button dinamica-button-primary" href={DINAMICA_TICKETS.general} onClick={() => trackPrizeEvent("prize_ticket_click", language)} target="_blank" rel="noreferrer">
              {t.ticket}<ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="dinamica-button dinamica-button-quiet" href="#eligibility">{t.eligibility}<ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <p className="dinamica-ticket-note dinamica-hero-reveal">{t.ticketNote}</p>
          <p className="dinamica-event-date dinamica-hero-reveal">{t.event}</p>
        </div>
        <div className="dinamica-hero-index" aria-hidden="true">DINAMICA <span>II</span></div>
      </section>

      <section className="dinamica-institutions" data-header-theme="white" aria-labelledby="institution-title">
        <div className="dinamica-institution-intro">
          <p className="dinamica-kicker">{t.initiative}</p>
          <h2 id="institution-title">{t.institutionalTitle}</h2>
          <p>{t.institutional}</p>
        </div>
        <div className="dinamica-institution-logos" aria-label={language === "en" ? "DINAMICA II institutional partners" : "Instituciones aliadas de DINAMICA II"}>
          {institutions.map((institution) => (
            <div className={`dinamica-logo-cell ${institution.className}`} key={institution.name}>
              <Image src={institution.src} alt={institution.name} width={institution.width} height={institution.height} sizes="(max-width: 680px) 42vw, 18vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="dinamica-eligibility dinamica-section" data-header-theme="white" id="eligibility" aria-labelledby="eligibility-title">
        <div className="dinamica-section-heading">
          <p className="dinamica-kicker">{t.whoLabel}</p>
          <h2 id="eligibility-title">{t.whoTitle}</h2>
        </div>
        <div className="dinamica-eligibility-copy">
          <p className="dinamica-lede">{t.whoIntro}</p>
          <p>{t.whoBody}</p>
          <p className="dinamica-note">{t.whoNote}</p>
        </div>
        <aside className="dinamica-connection-list">
          <h3>{t.connection}</h3>
          <ul>{t.connections.map((item) => <li key={item}>{item}</li>)}</ul>
        </aside>
      </section>

      <section className="dinamica-process dinamica-section" aria-labelledby="process-title">
        <div className="dinamica-section-heading">
          <p className="dinamica-kicker">{t.processLabel}</p>
          <h2 id="process-title">{t.processTitle}</h2>
        </div>
        <ol className="dinamica-steps">
          {t.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
        </ol>
      </section>

      <section className="dinamica-jury dinamica-section" data-header-theme="white" aria-labelledby="jury-title">
        <div className="dinamica-section-heading">
          <p className="dinamica-kicker">{t.juryLabel}</p>
          <h2 id="jury-title">{t.juryTitle}</h2>
          <p>{t.juryIntro}</p>
        </div>
        <div className="dinamica-criteria">
          {t.criteria.map(([label, weight]) => <div className="dinamica-criterion" key={label}><span>{label}</span><b>{weight}</b></div>)}
          <div className="dinamica-criterion dinamica-criterion-total"><span>{t.total}</span><b>100%</b></div>
        </div>
      </section>

      <section className="dinamica-application dinamica-section" id="application" aria-labelledby="application-title">
        <div className="dinamica-section-heading">
          <p className="dinamica-kicker">{t.applyLabel}</p>
          <h2 id="application-title">{t.applyTitle}</h2>
          <p>{t.applyIntro}</p>
        </div>
        <StartupApplicationForm
          language={language}
          applicationsOpen={applicationsOpen}
          privacyNoticeUrl={privacyNoticeUrl}
          openingSoon={t.openingSoon}
          openingNote={t.openingNote}
          ticketUrl={DINAMICA_TICKETS.general}
          onTicketVerified={() => trackPrizeEvent("prize_ticket_verified", language)}
        />
      </section>

      <section className="dinamica-faq dinamica-section" data-header-theme="white" aria-labelledby="faq-title">
        <div className="dinamica-section-heading">
          <p className="dinamica-kicker">{t.faqLabel}</p>
          <h2 id="faq-title">{t.faqTitle}</h2>
        </div>
        <div className="dinamica-faq-list">
          {t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="dinamica-partners" data-header-theme="white" aria-labelledby="partners-title">
        <div>
          <p className="dinamica-kicker">{t.partnerLabel}</p>
          <h2 id="partners-title">{language === "en" ? "Create opportunity at DNS 2027." : "Crea oportunidades en DNS 2027."}</h2>
          <p>{t.partnerCopy}</p>
        </div>
        <Link href="/partners" className="dinamica-button dinamica-button-outline" onClick={() => trackPrizeEvent("prize_sponsor_click", language)}>
          {t.partners}<ExternalLink size={15} aria-hidden="true" />
        </Link>
      </section>

      <section className="dinamica-close">
        <p className="dinamica-kicker">{t.closeEyebrow}</p>
        <h2>{t.closeTitle}</h2>
        <a className="dinamica-button dinamica-button-primary" href={DINAMICA_TICKETS.general} onClick={() => trackPrizeEvent("prize_ticket_click", language)} target="_blank" rel="noreferrer">{t.closeCta}<ArrowRight size={16} aria-hidden="true" /></a>
        <p>{t.footnote}</p>
      </section>
    </div>
  )
}

function trackPrizeEvent(eventName: string, language: "en" | "es") {
  if (typeof window === "undefined") return
  const gtag = (window as Window & { gtag?: (command: "event", name: string, parameters: Record<string, string>) => void }).gtag
  gtag?.("event", eventName, { language, source_page: "dinamica_ii" })
}
