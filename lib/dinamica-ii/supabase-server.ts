import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { timingSafeEqual } from "node:crypto"

let adminClient: SupabaseClient | undefined

export function getDinamicaAdminClient() {
  const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV !== "production"
  const url = isPreview ? process.env.DINAMICA_PREVIEW_SUPABASE_URL : process.env.DINAMICA_SUPABASE_URL
  const key = isPreview
    ? process.env.DINAMICA_PREVIEW_SUPABASE_SECRET_KEY || process.env.DINAMICA_PREVIEW_SUPABASE_SERVICE_ROLE_KEY
    : process.env.DINAMICA_SUPABASE_SECRET_KEY || process.env.DINAMICA_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error("dinamica_storage_unavailable")

  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return adminClient
}

export function getDinamicaOperatorToken() {
  const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV !== "production"
  const token = isPreview ? process.env.DINAMICA_PREVIEW_OPERATOR_TOKEN : process.env.DINAMICA_OPERATOR_TOKEN
  if (!token || token.length < 32) throw new Error("dinamica_operator_unavailable")
  return token
}

export function isDinamicaOperator(request: Request) {
  try {
    const expected = Buffer.from(getDinamicaOperatorToken())
    const authorization = request.headers.get("authorization") || ""
    const provided = Buffer.from(authorization.replace(/^Bearer\s+/i, ""))
    return provided.length === expected.length && timingSafeEqual(provided, expected)
  } catch {
    return false
  }
}

export async function takeDinamicaRateLimit(request: Request, scope: string, maxHits = 12) {
  const client = getDinamicaAdminClient()
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const address = forwarded || "unknown"
  const { createHash } = await import("node:crypto")
  const keyHash = createHash("sha256").update(`${scope}:${address}`).digest("hex")
  const { data, error } = await client.rpc("dinamica_take_rate_limit", {
    p_key_hash: keyHash,
    p_max_hits: maxHits,
    p_window_seconds: 900,
  })
  if (error) throw new Error("dinamica_storage_unavailable")
  return data === true
}

