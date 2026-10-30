import assert from "node:assert/strict"
import test from "node:test"
import { applicationSchema } from "@/lib/dinamica-ii/application-schema"
import { sendDinamicaApplicationToWeb3Forms } from "@/lib/dinamica-ii/web3forms"
import { submitToWeb3Forms } from "@/lib/web3forms"

const application = {
  founder_name: "QA Founder",
  founder_email: "qa@example.invalid",
  founder_phone: "+18095550123",
  founder_role: "Founder",
  founder_origin_country: "Dominican Republic",
  founder_residence_country: "Dominican Republic",
  founder_city: "Santo Domingo",
  contact_language: "en",
  pitch_language: "en",
  ticket_purchase_category: "purchased_dns_2027",
  ticket_type: "general_admission",
  ticket_email_same_as_application: "yes",
  representative_ticket_email: "qa@example.invalid",
  ticket_reference: "",
  ticket_reference_unknown: "no",
  ticket_reference_explanation: "",
  startup_legal_name: "QA Startup SRL",
  startup_brand_name: "",
  incorporation_country: "Dominican Republic",
  registration_proof: "QA-0001",
  startup_profile_url: "https://example.invalid/startup",
  founded_year: 2024,
  stage: "pre-seed",
  sector: "Technology",
  operation_countries: "Dominican Republic",
  headquarters_country: "Dominican Republic",
  team_size: 3,
  company_description: "Fictional QA company",
  connections: ["operations_dr"],
  connection_explanation_operations_dr: "Fictional QA connection",
  connection_explanation_dominican_origin: "",
  connection_explanation_market_plan_dr: "",
  connection_evidence_url: "",
  customer_problem: "Problem",
  innovation: "Innovation",
  export_markets: "Markets",
  demand_evidence: "Demand",
  scale_milestones: "Milestones",
  impact_contribution: "Impact",
  team_capacity: "Team",
  prize_use: "Prize use",
  pitch_deck_url: "https://example.invalid/deck.pdf",
  demo_url: "",
  customer_count_range: "",
  monthly_revenue_range: "",
  active_export_customers: "",
  expected_market_entry: "",
  external_reference: "",
  prior_funding: "",
  conflicts: "",
  accuracy_ack: "yes",
  authority_ack: "yes",
  judging_ack: "yes",
  selection_ack: "yes",
  winner_terms_ack: "yes",
  contact_ack: "yes",
  privacy_ack: "yes",
  marketing_opt_in: "",
}

test("the schema preserves ticket, eligibility, and all eight jury answers while keeping add-on metrics optional", () => {
  assert.equal(applicationSchema.safeParse(application).success, true)
  assert.equal(applicationSchema.safeParse({ ...application, ticket_purchase_category: "help_locating_confirmation" }).success, false)
  assert.equal(applicationSchema.safeParse({ ...application, connections: ["operations_dr", "market_plan_dr"] }).success, false)
  assert.equal(applicationSchema.safeParse({ ...application, pitch_deck_url: "" }).success, false)
  assert.equal(applicationSchema.safeParse({ ...application, prize_use: "x".repeat(501) }).success, false)
})

test("the public schema rejects legacy tokens and server review fields", () => {
  assert.equal(applicationSchema.safeParse({ ...application, ticket_token: "fictional-token" }).success, false)
  assert.equal(applicationSchema.safeParse({ ...application, verification_token: "fictional-token" }).success, false)
  assert.equal(applicationSchema.safeParse({ ...application, status: "verified" }).success, false)
})

test("the Web3Forms browser helper sends the complete application payload", async () => {
  const oldFetch = globalThis.fetch
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  let requestUrl = ""
  let body: FormData | undefined
  let headers: HeadersInit | undefined
  let fetchCount = 0
  try {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-public-access-key"
    globalThis.fetch = async (input, init) => {
      fetchCount += 1
      requestUrl = String(input)
      body = init?.body as FormData
      headers = init?.headers
      return new Response("{\"success\":true}", { status: 200 })
    }

    await sendDinamicaApplicationToWeb3Forms(applicationSchema.parse(application), "en", "test-captcha-token")

    assert.equal(fetchCount, 1)
    assert.equal(requestUrl, "https://api.web3forms.com/submit")
    assert.equal((headers as Record<string, string>).Accept, "application/json")
    assert.ok(body instanceof FormData)
    assert.equal(body?.get("access_key"), "test-public-access-key")
    assert.equal(body?.get("source_form"), "dinamica_ii_application")
    assert.equal(body?.get("submission_type"), "startup_application")
    assert.equal(body?.get("name"), "QA Founder")
    assert.equal(body?.get("email"), "qa@example.invalid")
    assert.equal(body?.get("replyto"), "qa@example.invalid")
    assert.equal(body?.get("h-captcha-response"), "test-captcha-token")
    assert.equal(body?.get("founder_name"), "QA Founder")
    assert.equal(body?.get("founder_email"), "qa@example.invalid")
    assert.equal(body?.get("ticket_purchase_category"), "purchased_dns_2027")
    assert.equal(body?.get("representative_ticket_email"), "qa@example.invalid")
    assert.equal(body?.get("startup_legal_name"), "QA Startup SRL")
    assert.equal(body?.get("customer_problem"), "Problem")
    assert.equal(body?.get("innovation"), "Innovation")
    assert.equal(body?.get("export_markets"), "Markets")
    assert.equal(body?.get("demand_evidence"), "Demand")
    assert.equal(body?.get("scale_milestones"), "Milestones")
    assert.equal(body?.get("impact_contribution"), "Impact")
    assert.equal(body?.get("team_capacity"), "Team")
    assert.equal(body?.get("prize_use"), "Prize use")
    assert.equal(body?.get("pitch_deck_url"), "https://example.invalid/deck.pdf")
    assert.equal(body?.get("accuracy_ack"), "yes")
    assert.equal(body?.get("privacy_ack"), "yes")
    assert.ok(Number.isFinite(Date.parse(String(body?.get("submitted_at")))))
    assert.match(String(body?.get("subject")), /DINAMICA II.*QA Startup SRL/)
    assert.equal(body?.get("source_page"), "/dinamica-ii")
    assert.equal(body?.get("marketing_opt_in"), "")
    assert.equal(body?.has("pitch_deck"), false)
  } finally {
    globalThis.fetch = oldFetch
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey
  }
})

test("the browser helper surfaces Web3Forms 429 without retrying", async () => {
  const oldFetch = globalThis.fetch
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  let fetchCount = 0
  try {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-public-access-key"
    globalThis.fetch = async () => {
      fetchCount += 1
      return new Response("{\"success\":false,\"message\":\"rate limited\"}", { status: 429 })
    }
    await assert.rejects(sendDinamicaApplicationToWeb3Forms(applicationSchema.parse(application), "en", "test-captcha-token"), /web3forms_rate_limited/)
    assert.equal(fetchCount, 1)
  } finally {
    globalThis.fetch = oldFetch
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey
  }
})

test("a success false payload does not report success, even with HTTP 200", async () => {
  const oldFetch = globalThis.fetch
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  try {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-public-access-key"
    globalThis.fetch = async () => new Response("{\"success\":false}", { status: 200 })
    await assert.rejects(sendDinamicaApplicationToWeb3Forms(applicationSchema.parse(application), "en", "test-captcha-token"), /web3forms_rejected/)
  } finally {
    globalThis.fetch = oldFetch
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey
  }
})

test("the shared client stops before fetch when the access key is missing", async () => {
  const oldFetch = globalThis.fetch
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  try {
    delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    globalThis.fetch = async () => { throw new Error("fetch should not run") }
    const formData = new FormData()
    formData.set("name", "Fictional User")
    formData.set("email", "qa@example.invalid")
    await assert.rejects(submitToWeb3Forms(formData, {
      sourceForm: "test", sourcePage: "/test", preferredLanguage: "en", submissionType: "test", subject: "DNS 2027 — Test",
    }, "test-captcha-token"), /web3forms_not_configured/)
  } finally {
    globalThis.fetch = oldFetch
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey
  }
})

test("the shared client rejects invalid JSON and network failures without exposing data", async () => {
  const oldFetch = globalThis.fetch
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  try {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-public-access-key"
    const formData = new FormData()
    formData.set("name", "Fictional User")
    formData.set("email", "qa@example.invalid")
    globalThis.fetch = async () => new Response("not json", { status: 200 })
    await assert.rejects(submitToWeb3Forms(formData, {
      sourceForm: "test", sourcePage: "/test", preferredLanguage: "en", submissionType: "test", subject: "DNS 2027 — Test",
    }, "test-captcha-token"), /web3forms_invalid_response/)

    globalThis.fetch = async () => new Response("server error", { status: 500 })
    await assert.rejects(submitToWeb3Forms(formData, {
      sourceForm: "test", sourcePage: "/test", preferredLanguage: "en", submissionType: "test", subject: "DNS 2027 — Test",
    }, "test-captcha-token"), /web3forms_server_error/)

    globalThis.fetch = async () => { throw new Error("network failure") }
    await assert.rejects(submitToWeb3Forms(formData, {
      sourceForm: "test", sourcePage: "/test", preferredLanguage: "en", submissionType: "test", subject: "DNS 2027 — Test",
    }, "test-captcha-token"), /web3forms_network_error/)
  } finally {
    globalThis.fetch = oldFetch
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey
  }
})
