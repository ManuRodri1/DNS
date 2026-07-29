export const GENERAL_ADMISSION_TICKET_URL =
  "https://buy.stripe.com/aFa3cv13zaUPdae5w68EM08"

export const VIP_TICKET_URL =
  "https://buy.stripe.com/bJecN5bId7IDdae1fQ8EM09"

export type TicketType = "general_admission" | "vip"

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters: Record<string, string | number>,
  ) => void
}

export function trackTicketClick({
  ticketType,
  sourcePage,
  language,
  destinationUrl,
}: {
  ticketType: TicketType
  sourcePage: string
  language: "en" | "es"
  destinationUrl: string
}) {
  ;(window as GtagWindow).gtag?.("event", "ticket_cta_click", {
    ticket_type: ticketType,
    source_page: sourcePage,
    language,
    destination_url: destinationUrl,
    event_year: 2027,
  })
}

