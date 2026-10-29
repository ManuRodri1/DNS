import {
  DINAMICA_ASSETS,
  DINAMICA_CAMPAIGN,
  DINAMICA_CANONICAL_URL,
  DINAMICA_PATH,
  DINAMICA_PUBLIC_LAUNCH_ENABLED,
  DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED,
  DINAMICA_TICKETS,
} from "@/lib/dinamica-ii/public-config"
import { FORMSPREE_ENDPOINT } from "@/lib/form-config"

export { DINAMICA_ASSETS, DINAMICA_CAMPAIGN, DINAMICA_CANONICAL_URL, DINAMICA_PATH, DINAMICA_TICKETS }

// Public content and application delivery have separate release gates.
// The competition page and announcement can be viewed in production while
// submission remains closed pending the Formspree and approval requirements.
export const DINAMICA_PUBLIC_LAUNCH =
  process.env.DINAMICA_PUBLIC_LAUNCH === "true" && DINAMICA_PUBLIC_LAUNCH_ENABLED
export const DINAMICA_HOME_PROMOTION_ENABLED =
  process.env.DINAMICA_HOME_PROMOTION_ENABLED === "true" && DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED
export const DINAMICA_APPLICATIONS_OPEN = process.env.DINAMICA_APPLICATIONS_OPEN === "true"
export const DINAMICA_PRIVACY_APPROVED = process.env.DINAMICA_PRIVACY_APPROVED === "true"
export const DINAMICA_PRIVACY_NOTICE_URL = process.env.DINAMICA_PRIVACY_NOTICE_URL || ""
export const DINAMICA_FORMSPREE_ENDPOINT_CONFIRMED =
  process.env.DINAMICA_FORMSPREE_ENDPOINT_CONFIRMED === "true"

export const DINAMICA_PREVIEW_AVAILABLE =
  process.env.NODE_ENV !== "production" ||
  (process.env.VERCEL_ENV === "preview" && process.env.DINAMICA_PREVIEW_ENABLED === "true")

const DINAMICA_PRIVACY_NOTICE_VALID = (() => {
  try {
    return new URL(DINAMICA_PRIVACY_NOTICE_URL).protocol === "https:"
  } catch {
    return false
  }
})()

const DINAMICA_FORMSPREE_ENDPOINT_VALID = (() => {
  try {
    const endpoint = new URL(FORMSPREE_ENDPOINT)
    return endpoint.protocol === "https:" && endpoint.hostname === "formspree.io" && endpoint.pathname === "/f/mvzeyakd"
  } catch {
    return false
  }
})()

// Showing the form is a presentation decision. Accepting a submission is a
// separate server-side decision and can never use production credentials in a preview.
export const DINAMICA_FORM_SUBMISSION_ENABLED =
  process.env.VERCEL_ENV === "production" &&
  DINAMICA_APPLICATIONS_OPEN &&
  DINAMICA_FORMSPREE_ENDPOINT_CONFIRMED &&
  DINAMICA_FORMSPREE_ENDPOINT_VALID &&
  DINAMICA_PRIVACY_APPROVED &&
  DINAMICA_PRIVACY_NOTICE_VALID

// Retain the old name for existing consumers; it means an approved Formspree
// submission path, never whether the UI is visible.
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

