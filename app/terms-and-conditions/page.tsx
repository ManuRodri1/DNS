import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions and Refund Policy | Digital Nomad Summit Santo Domingo",
  description:
    "Review the registration, event participation, refund, cancellation, transfer, media, liability, and travel policies for Digital Nomad Summit Santo Domingo.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
}

type LegalSection = {
  id: string
  tocLabel: string
  heading: string
  paragraphs?: string[]
  list?: string[]
  afterListParagraphs?: string[]
}

const sections: LegalSection[] = [
  {
    id: "registration",
    tocLabel: "Registration",
    heading: "Registration",
    paragraphs: [
      "Registration is confirmed upon receipt of full payment. All registrations are subject to availability and are valid only for the registered attendee. Tickets may not be transferred without prior written approval from Digital Nomad Summit.",
    ],
  },
  {
    id: "event-programming",
    tocLabel: "Event Programming",
    heading: "Event Programming",
    paragraphs: [
      "Digital Nomad Summit reserves the right to modify the event agenda, schedule, speakers, session topics, venue, event format, or programming at any time as necessary. While every effort will be made to deliver the published program, changes may occur due to speaker availability, operational needs, or unforeseen circumstances.",
    ],
  },
  {
    id: "media-release",
    tocLabel: "Media Release",
    heading: "Photography, Video & Media Release",
    paragraphs: [
      "By attending Digital Nomad Summit, you grant DNS and its authorized partners permission to photograph, film, record, and capture your likeness, voice, and participation during the event. These materials may be used for promotional, editorial, educational, marketing, and commercial purposes across print, digital, broadcast, and social media channels without additional notice or compensation.",
    ],
  },
  {
    id: "code-of-conduct",
    tocLabel: "Code of Conduct",
    heading: "Code of Conduct",
    paragraphs: [
      "Digital Nomad Summit is committed to providing a professional, respectful, inclusive, and welcoming environment for all attendees, speakers, sponsors, exhibitors, partners, volunteers, and staff.",
      "Participants are expected to conduct themselves professionally at all times. DNS reserves the right to refuse admission or remove any participant whose behavior is disruptive, abusive, discriminatory, unlawful, or otherwise inconsistent with the values of the summit. Removal from the event will not entitle the participant to a refund or credit.",
    ],
  },
  {
    id: "liability",
    tocLabel: "Liability",
    heading: "Limitation of Liability",
    paragraphs: [
      "Attendees participate in the event voluntarily and assume all risks associated with their participation.",
      "To the fullest extent permitted by law, Digital Nomad Summit, its founders, organizers, affiliates, sponsors, partners, volunteers, contractors, employees, venue, and service providers shall not be liable for any personal injury, illness, loss, theft, property damage, delays, travel interruptions, or other expenses arising from participation in the event, except where caused by gross negligence or willful misconduct.",
    ],
  },
  {
    id: "force-majeure",
    tocLabel: "Force Majeure",
    heading: "Force Majeure",
    paragraphs: [
      "Digital Nomad Summit shall not be held responsible for any delay, modification, postponement, relocation, interruption, or cancellation of the event resulting from circumstances beyond its reasonable control, including but not limited to:",
    ],
    list: [
      "Natural disasters",
      "Severe weather",
      "Public health emergencies or pandemics",
      "Government actions or restrictions",
      "Civil unrest",
      "Acts of terrorism",
      "Labor disputes",
      "Venue closures",
      "Utility failures",
      "Transportation disruptions",
      "Any other force majeure event",
    ],
    afterListParagraphs: [
      "DNS reserves the right to make reasonable changes necessary to ensure the safety and successful delivery of the event.",
    ],
  },
  {
    id: "refund-policy",
    tocLabel: "Refund Policy",
    heading: "Refund & Cancellation Policy",
    paragraphs: [
      "General Registration",
      "All ticket purchases are final.",
      "Tickets are non-refundable except where required by applicable law.",
    ],
  },
  {
    id: "event-modifications",
    tocLabel: "Event Modifications",
    heading: "Event Modifications",
    paragraphs: [
      "If the event is postponed, rescheduled, relocated, or the event format is modified, all purchased registrations will automatically remain valid for the revised event.",
      "Refunds will not be issued as a result of these changes.",
    ],
  },
  {
    id: "event-cancellation",
    tocLabel: "Event Cancellation",
    heading: "Event Cancellation",
    paragraphs: [
      "In the event Digital Nomad Summit is canceled and cannot be held due to circumstances beyond the reasonable control of the organizers, including any force majeure event, purchased registrations will not be refunded.",
      "Instead, attendees will receive a registration credit equal to the full value of their ticket, which may be applied toward a future Digital Nomad Summit event or another official DNS-produced event designated by the organizers.",
      "Registration credits:",
    ],
    list: [
      "Remain valid for 24 months from the original event date.",
      "May be transferred to another attendee with prior written approval from Digital Nomad Summit.",
      "Have no cash value.",
      "May not be redeemed for cash or exchanged for monetary reimbursement.",
    ],
  },
  {
    id: "ticket-transfers",
    tocLabel: "Ticket Transfers",
    heading: "Ticket Transfers",
    paragraphs: [
      "If you are unable to attend, your registration may be transferred to another individual by submitting a written request to DNS no later than 10 business days before the event, subject to approval.",
    ],
  },
  {
    id: "travel",
    tocLabel: "Travel",
    heading: "Travel & Accommodation",
    paragraphs: [
      "Digital Nomad Summit is not responsible for airfare, hotel accommodations, transportation, visa fees, travel insurance, or any other travel-related expenses incurred by attendees.",
      "Participants are strongly encouraged to purchase travel insurance to protect against unforeseen travel interruptions or event changes.",
    ],
  },
  {
    id: "policy-updates",
    tocLabel: "Policy Updates",
    heading: "Policy Updates",
    paragraphs: [
      "Digital Nomad Summit reserves the right to modify, amend, or update these Terms & Conditions and Refund Policy at any time as necessary.",
      "Any revisions will become effective upon publication on the official Digital Nomad Summit website and will apply to all future registrations. Continued participation in the event constitutes acceptance of the most current Terms & Conditions and Refund Policy.",
    ],
  },
  {
    id: "our-commitment",
    tocLabel: "Our Commitment",
    heading: "Our Commitment",
    paragraphs: [
      "At Digital Nomad Summit Santo Domingo, we are committed to delivering a world-class experience that fosters meaningful connections, innovative ideas, and lasting partnerships.",
      "These Terms & Conditions and Refund Policy are designed to provide transparency, protect the integrity of the event, and support the successful planning and execution of the summit for all attendees, speakers, sponsors, exhibitors, partners, and collaborators.",
      "We appreciate your understanding, cooperation, and support as we work together to create an exceptional experience that advances entrepreneurship, innovation, investment, global mobility, and economic development in the Dominican Republic and beyond.",
    ],
  },
]

const tableOfContents = [
  ...sections
    .filter((section) => section.id !== "event-modifications" && section.id !== "our-commitment")
    .map((section) => ({ id: section.id, label: section.tocLabel })),
  { id: "contact", label: "Contact" },
]

export default function TermsAndConditionsPage() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <section className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-24 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(255,87,87,0.18),transparent_34%)]" />

          <div className="relative mx-auto max-w-4xl">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/10 px-4 py-2 font-sans text-sm font-medium text-white/70 transition-colors duration-200 hover:border-[#FF5757]/60 hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Back to Home
            </Link>

            <div className="mt-10 border-b border-white/10 pb-10">
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#FF5757]">
                Digital Nomad Summit Santo Domingo
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Terms & Conditions and Refund Policy
              </h1>
              <p className="mt-5 font-sans text-sm font-medium uppercase tracking-[0.18em] text-white/50">
                Last updated: July 2026
              </p>
              <p className="mt-8 max-w-3xl font-sans text-base leading-8 text-white/72 md:text-lg">
                By registering for and attending Digital Nomad Summit Santo Domingo ("DNS"), you acknowledge that you
                have read, understood, and agree to the following Terms & Conditions.
              </p>
            </div>

            <nav className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5" aria-label="Policy sections">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/45">Contents</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-flex rounded-full border border-white/10 px-3 py-1.5 font-sans text-sm text-white/70 transition-colors duration-200 hover:border-[#FF5757]/60 hover:text-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 divide-y divide-white/10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 py-10">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 font-sans text-base leading-8 text-white/72 md:text-[17px]">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul className="space-y-3 pl-5">
                        {section.list.map((item) => (
                          <li key={item} className="list-disc marker:text-[#FF5757]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.afterListParagraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section id="contact" className="scroll-mt-32 py-10">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Contact</h2>
                <div className="mt-5 space-y-5 font-sans text-base leading-8 text-white/72 md:text-[17px]">
                  <p>For questions regarding registrations, transfers, or these policies, please contact:</p>
                  <p>
                    Digital Nomad Summit Santo Domingo
                    <br />
                    <a
                      href="mailto:info@digitalnomadsummit.do"
                      className="font-medium text-[#FF5757] underline decoration-[#FF5757]/45 underline-offset-4 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      info@digitalnomadsummit.do
                    </a>
                  </p>
                </div>
              </section>
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex rounded-full border border-[#FF5757] px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#FF5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5757] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
