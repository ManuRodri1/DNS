import { z } from "zod"

const requiredText = (max: number) => z.string().trim().min(1).max(max)
const optionalText = (max: number) => z.string().trim().max(max).optional().default("")
const optionalUrl = () => z.union([z.string().trim().url().max(2048), z.literal("")]).optional().default("")

export const applicationSchema = z.object({
  founder_name: requiredText(160),
  founder_email: z.string().trim().email().max(254),
  founder_phone: z.string().trim().regex(/^\+[1-9]\d{6,14}$/, "Use international format, including country code"),
  founder_role: requiredText(120),
  founder_origin_country: requiredText(120),
  founder_residence_country: requiredText(120),
  founder_city: requiredText(120),
  contact_language: z.enum(["en", "es"]),
  pitch_language: z.enum(["en", "es"]),
  ticket_purchase_category: z.enum(["purchased_dns_2027", "pre_reschedule_ticket", "help_locating_confirmation"]),
  ticket_type: z.enum(["general_admission", "vip", "unknown_requires_review"]),
  ticket_email_same_as_application: z.enum(["yes", "no"]).default("no"),
  representative_ticket_email: z.string().trim().email().max(254),
  ticket_reference: optionalText(240),
  ticket_reference_unknown: z.enum(["yes", "no"]).default("no"),
  ticket_reference_explanation: optionalText(300),
  cofounders: optionalText(1000),
  linkedin_url: optionalUrl(),

  startup_legal_name: requiredText(240),
  startup_brand_name: optionalText(240),
  incorporation_country: requiredText(120),
  registration_proof: requiredText(600),
  startup_profile_url: z.string().trim().url().max(2048),
  founded_year: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  stage: z.enum(["pre-seed", "seed", "post-mvp"]),
  sector: requiredText(160),
  operation_countries: requiredText(500),
  headquarters_country: requiredText(120),
  team_size: z.coerce.number().int().min(1).max(100000),
  company_description: requiredText(300),
  connections: z.array(z.enum(["operations_dr", "dominican_origin", "market_plan_dr"])).min(1),
  connection_explanation_operations_dr: optionalText(400),
  connection_explanation_dominican_origin: optionalText(400),
  connection_explanation_market_plan_dr: optionalText(400),
  connection_evidence_url: optionalUrl(),

  customer_problem: requiredText(500),
  innovation: requiredText(500),
  export_markets: requiredText(700),
  demand_evidence: requiredText(500),
  scale_milestones: requiredText(500),
  impact_contribution: requiredText(400),
  team_capacity: requiredText(400),
  prize_use: requiredText(500),
  pitch_deck_url: z.string().trim().url().max(2048),
  demo_url: optionalUrl(),
  customer_count_range: optionalText(120),
  monthly_revenue_range: optionalText(120),
  active_export_customers: z.enum(["yes", "no", ""]).optional().default(""),
  expected_market_entry: optionalText(80),
  external_reference: optionalUrl(),
  prior_funding: optionalText(500),
  conflicts: optionalText(500),

  accuracy_ack: z.literal("yes"),
  authority_ack: z.literal("yes"),
  judging_ack: z.literal("yes"),
  selection_ack: z.literal("yes"),
  winner_terms_ack: z.literal("yes"),
  contact_ack: z.literal("yes"),
  privacy_ack: z.literal("yes"),
  marketing_opt_in: z.enum(["yes", ""]).optional().default(""),
}).strict().superRefine((value, context) => {
  if ((value.ticket_reference_unknown === "yes" || value.ticket_purchase_category === "help_locating_confirmation") && !value.ticket_reference_explanation.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["ticket_reference_explanation"],
      message: "Add a short note to help the team locate your confirmation",
    })
  }

  const explanationFields = {
    operations_dr: "connection_explanation_operations_dr",
    dominican_origin: "connection_explanation_dominican_origin",
    market_plan_dr: "connection_explanation_market_plan_dr",
  } as const

  for (const connection of value.connections) {
    const field = explanationFields[connection]
    if (!value[field].trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: "Explain this connection briefly",
      })
    }
  }
})

export type StartupApplication = z.infer<typeof applicationSchema>
