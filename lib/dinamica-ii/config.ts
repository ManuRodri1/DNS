export const DINAMICA_PATH = "/dinamica-ii"
export const DINAMICA_CANONICAL_URL = "https://www.digitalnomadsummit.co/dinamica-ii"
export const DINAMICA_CAMPAIGN = "dinamica_ii_2027"

// The public competition page and its Home announcement are enabled by default
// so a Vercel deployment works without a dashboard-only environment toggle.
// Set either variable to "false" when the content needs to be hidden.
export const DINAMICA_PUBLIC_LAUNCH = process.env.DINAMICA_PUBLIC_LAUNCH !== "false"
export const DINAMICA_HOME_PROMOTION_ENABLED = process.env.DINAMICA_HOME_PROMOTION_ENABLED !== "false"
export const DINAMICA_APPLICATIONS_OPEN = process.env.DINAMICA_APPLICATIONS_OPEN === "true"
export const DINAMICA_PRIVACY_APPROVED = process.env.DINAMICA_PRIVACY_APPROVED === "true"
export const DINAMICA_DUPLICATE_POLICY_APPROVED = process.env.DINAMICA_DUPLICATE_POLICY_APPROVED === "true"
export const DINAMICA_PRIVACY_NOTICE_URL = process.env.DINAMICA_PRIVACY_NOTICE_URL || ""

export const DINAMICA_PREVIEW_AVAILABLE =
  process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview"

export const DINAMICA_FORM_AVAILABLE =
  DINAMICA_PUBLIC_LAUNCH &&
  DINAMICA_APPLICATIONS_OPEN &&
  DINAMICA_PRIVACY_APPROVED &&
  DINAMICA_DUPLICATE_POLICY_APPROVED &&
  Boolean(process.env.DINAMICA_SUPABASE_URL) &&
  Boolean(process.env.DINAMICA_SUPABASE_SECRET_KEY || process.env.DINAMICA_SUPABASE_SERVICE_ROLE_KEY) &&
  Boolean(process.env.DINAMICA_OPERATOR_TOKEN) &&
  Boolean(DINAMICA_PRIVACY_NOTICE_URL)

export const DINAMICA_TICKETS = {
  general: "https://buy.stripe.com/aFa3cv13zaUPdae5w68EM08",
  vip: "https://buy.stripe.com/bJecN5bId7IDdae1fQ8EM09",
} as const

export const DINAMICA_ASSETS = {
  heroWide: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_900,y_450,w_3000,h_2000/c_limit,w_2400,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  heroLaptop: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1100,y_500,w_2600,h_1900/c_limit,w_2000,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  heroMobile: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1450,y_500,w_1800,h_2400/c_limit,w_1400,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  hero: "https://res.cloudinary.com/dzebed7jw/image/upload/c_crop,x_1100,y_500,w_2600,h_1900/c_limit,w_2000,q_auto:good/v1792860690/DSC06370_ulzfoh.jpg",
  // Use the DNS event identity for link previews. The hero photo is reserved
  // for the page itself so WhatsApp and social crawlers do not surface the QR.
  social: "https://www.digitalnomadsummit.co/og-image.jpg",
  socialWidth: 1024,
  socialHeight: 1024,
  bcie: "https://res.cloudinary.com/dzebed7jw/image/upload/v1792860647/bcie-logo-white_shgdsg.png",
  globalGateway: "https://res.cloudinary.com/dzebed7jw/image/upload/v1792860647/GG_logo-BLUE_nasfpt.png",
  europeanUnion: "https://res.cloudinary.com/dzebed7jw/image/upload/v1792863821/European-Union-Logo_axqlzz.jpg",
  germanCooperation: "https://res.cloudinary.com/dzebed7jw/image/upload/v1792860647/6ee8a0a302a011d40741d3de937df8b6_uejna3.jpg",
  kfw: "https://res.cloudinary.com/dzebed7jw/image/upload/v1792860647/kfw3694_eabaj7.jpg",
} as const

export const DINAMICA_ASSET_NOTES = {
  bcie: "The supplied bcie-logo-white asset renders as a navy mark on a white background.",
  europeanUnion: "The supplied JPEG has a clean white background, verified at 3840×2160; use on the light institutional surface.",
} as const

export function isDinamicPageAvailable() {
  return DINAMICA_PUBLIC_LAUNCH || DINAMICA_PREVIEW_AVAILABLE
}

