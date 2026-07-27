export const EVENT_NAME = "Digital Nomad Summit Santo Domingo"
export const EVENT_YEAR = 2027

export const EVENT_START_DATE = "2027-04-08"
export const EVENT_END_DATE = "2027-04-09"

export const EVENT_DATE_EN = "April 8–9, 2027"
export const EVENT_DATE_ES = "8–9 de abril de 2027"

export const EVENT_DAY_ONE_EN = "April 8, 2027"
export const EVENT_DAY_TWO_EN = "April 9, 2027"
export const EVENT_DAY_ONE_ES = "8 de abril de 2027"
export const EVENT_DAY_TWO_ES = "9 de abril de 2027"

export const VENUE_NAME = "Crowne Plaza Santo Domingo"
export const VENUE_ADDRESS = "Av. George Washington 218, Santo Domingo, Dominican Republic"
export const VENUE_VIDEO_URL =
  "https://res.cloudinary.com/dzebed7jw/video/upload/v1785164197/En_el_hotel_Crowne_Plaza_Santo_Domingo_cada_estad%C3%ADa_cuenta_una_historia._Algunas_inspiran_otras_frah0a.mp4"
export const VENUE_TOUR_URL = "https://tourcrowneplaza.rdvirtual360.com/"
export const VENUE_MAP_URL = "https://maps.app.goo.gl/cwQv5zTBjBTAQ9zP8"

export const EVENT_CONTACT_EMAIL = "digitalnomadsummit@successment.co"
export const EVENT_CONTACT_MAILTO = `mailto:${EVENT_CONTACT_EMAIL}`

export const EVENT_DISPLAY_NAME = `${EVENT_NAME} ${EVENT_YEAR}`
export const EVENT_SHORT_NAME = `DNS Santo Domingo ${EVENT_YEAR}`

export const EVENT_CONFIG = {
  name: EVENT_NAME,
  year: EVENT_YEAR,
  displayName: EVENT_DISPLAY_NAME,
  shortName: EVENT_SHORT_NAME,
  startDate: EVENT_START_DATE,
  endDate: EVENT_END_DATE,
  date: { en: EVENT_DATE_EN, es: EVENT_DATE_ES },
  days: {
    en: [EVENT_DAY_ONE_EN, EVENT_DAY_TWO_EN],
    es: [EVENT_DAY_ONE_ES, EVENT_DAY_TWO_ES],
  },
  venue: {
    name: VENUE_NAME,
    address: VENUE_ADDRESS,
    videoUrl: VENUE_VIDEO_URL,
    tourUrl: VENUE_TOUR_URL,
    mapUrl: VENUE_MAP_URL,
  },
  contactEmail: EVENT_CONTACT_EMAIL,
} as const
