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
// The competition page and announcement can be viewed in production while
// submission remains closed pending the Formspree and approval requirements.
export const DINAMICA_PUBLIC_LAUNCH =
  process.env.DINAMICA_PUBLIC_LAUNCH === "true" && DINAMICA_PUBLIC_LAUNCH_ENABLED
export const DINAMICA_HOME_PROMOTION_ENABLED =
  process.env.DINAMICA_HOME_PROMOTION_ENABLED === "true" && DINAMICA_PUBLIC_HOME_PROMOTION_ENABLED
export const DINAMICA_APPLICATIONS_OPEN = process.env.DINAMICA_APPLICATIONS_OPEN === "true"
export const DINAMICA_PRIVACY_APPROVED = process.env.DINAMICA_PRIVACY_APPROVED === "true"
export const DINAMICA_DUPLICATE_POLICY_APPROVED = process.env.DINAMICA_DUPLICATE_POLICY_APPROVED === "true"
export const DINAMICA_PRIVACY_NOTICE_URL = process.env.DINAMICA_PRIVACY_NOTICE_URL || ""

export const DINAMICA_PREVIEW_AVAILABLE =
  process.env.NODE_ENV !== "production" ||
  (process.env.VERCEL_ENV === "preview" && process.env.DINAMICA_PREVIEW_ENABLED === "true")

const DINAMICA_PREVIEW_FORMSPREE_READY =
  Boolean(process.env.NEXT_PUBLIC_DINAMICA_FORMSPREE_FORM_ID?.match(/^[a-zA-Z0-9]+$/)) &&
  Boolean(DINAMICA_PRIVACY_NOTICE_URL)

const DINAMICA_FORMSPREE_READY =
  process.env.DINAMICA_FORMSPREE_ENABLED === "true" &&
  Boolean(process.env.NEXT_PUBLIC_DINAMICA_FORMSPREE_FORM_ID?.match(/^[a-zA-Z0-9]+$/)) &&
  DINAMICA_PRIVACY_APPROVED &&
  Boolean(DINAMICA_PRIVACY_NOTICE_URL)

// Showing the form is a presentation decision. Accepting a submission is a
// separate server-side decision and can never use production credentials in a preview.
export const DINAMICA_FORM_SUBMISSION_ENABLED =
  DINAMICA_APPLICATIONS_OPEN &&
  DINAMICA_DUPLICATE_POLICY_APPROVED &&
  DINAMICA_FORMSPREE_READY &&
  ((process.env.VERCEL_ENV === "production" &&
    DINAMICA_PUBLIC_LAUNCH &&
    DINAMICA_HOME_PROMOTION_ENABLED) ||
    (process.env.VERCEL_ENV === "preview" &&
      process.env.DINAMICA_PREVIEW_ENABLED === "true" &&
      process.env.DINAMICA_PREVIEW_FORM_ENABLED === "true" &&
      process.env.DINAMICA_PREVIEW_SUBMISSIONS_ENABLED === "true" &&
      DINAMICA_PREVIEW_FORMSPREE_READY))

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

