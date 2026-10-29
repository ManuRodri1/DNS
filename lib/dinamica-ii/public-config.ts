// Only presentation-safe values belong here: this module is imported by client components.
export const DINAMICA_PATH = "/dinamica-ii"
export const DINAMICA_CANONICAL_URL = "https://www.digitalnomadsummit.co/dinamica-ii"
export const DINAMICA_CAMPAIGN = "dinamica_ii_2027"

export const DINAMICA_PUBLIC_LAUNCH_ENABLED =
  process.env.NEXT_PUBLIC_DINAMICA_PUBLIC_LAUNCH === "true"

export const DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED =
  process.env.NEXT_PUBLIC_DINAMICA_HOME_PROMOTION_ENABLED === "true"

export const DINAMICA_TICKETS = {
  general: "https://buy.stripe.com/aFa3cv13zaUPdae5w68EM08",
  vip: "https://buy.stripe.com/bJecN5bId7IDdae1fQ8EM09",
} as const

export const DINAMICA_ASSETS = {
  heroWide: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_900,y_450,w_3000,h_2000/c_limit,w_2400,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  heroLaptop: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1100,y_500,w_2600,h_1900/c_limit,w_2000,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  heroMobile: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1450,y_500,w_1800,h_2400/c_limit,w_1400,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  hero: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1100,y_500,w_2600,h_1900/c_limit,w_2000,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  social: "https://www.digitalnomadsummit.co/og-image.jpg",
  socialWidth: 1024,
  socialHeight: 1024,
  institutionalLockup: "/dinamica-ii-institutional-lockup.png",
  institutionalLockupWidth: 1600,
  institutionalLockupHeight: 545,
} as const
