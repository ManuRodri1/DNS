import {
  DINAMICA_ASSETS,
  DINAMICA_CAMPAIGN,
  DINAMICA_CANONICAL_URL,
  DINAMICA_PATH,
  DINAMICA_PUBLIC_LAUNCH_ENABLED,
  DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED,
  DINAMICA_TICKETS,
} from "@/lib/dinamica-ii/public-config"

export { DINAMICA_ASSETS, DINAMICA_CAMPAIGN, DINAMICA_CANONICAL_URL, DINAMICA_PATH, DINAMICA_TICKETS }

// Public content and application delivery have separate release gates.
// Applications can be opened in Production with one explicit operational switch.
export const DINAMICA_PUBLIC_LAUNCH =
  process.env.DINAMICA_PUBLIC_LAUNCH === "true" && DINAMICA_PUBLIC_LAUNCH_ENABLED
export const DINAMICA_HOME_PROMOTION_ENABLED =
  process.env.DINAMICA_HOME_PROMOTION_ENABLED === "true" && DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED
export const DINAMICA_APPLICATIONS_OPEN = process.env.DINAMICA_APPLICATIONS_OPEN === "true"

export const DINAMICA_PREVIEW_AVAILABLE =
  process.env.NODE_ENV !== "production" ||
  (process.env.VERCEL_ENV === "preview" && process.env.DINAMICA_PREVIEW_ENABLED === "true")

// Showing the form is a presentation decision. Sending is only enabled in
// Production and when the organizer explicitly opens the application window.
export const DINAMICA_FORM_SUBMISSION_ENABLED =
  process.env.VERCEL_ENV === "production" &&
  DINAMICA_APPLICATIONS_OPEN

// Retain the old name for existing consumers; it means the Production form is open.
export const DINAMICA_FORM_AVAILABLE = DINAMICA_FORM_SUBMISSION_ENABLED

export const DINAMICA_LAUNCH_READY =
  process.env.VERCEL_ENV === "production" &&
  DINAMICA_PUBLIC_LAUNCH && DINAMICA_HOME_PROMOTION_ENABLED && DINAMICA_FORM_AVAILABLE

export const DINAMICA_PUBLIC_CONTENT_VISIBLE =
  process.env.VERCEL_ENV === "production" || DINAMICA_PREVIEW_AVAILABLE

export const DINAMICA_FORM_VISIBLE = DINAMICA_PUBLIC_CONTENT_VISIBLE

export const DINAMICA_COMPETITION_MODAL_ENABLED =
  DINAMICA_PUBLIC_CONTENT_VISIBLE

export function isDinamicPageAvailable() {
  return DINAMICA_PUBLIC_CONTENT_VISIBLE
}

