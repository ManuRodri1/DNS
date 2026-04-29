import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const result: any = {
    supabaseUrlExists: Boolean(supabaseUrl),
    supabaseAnonKeyExists: Boolean(supabaseAnonKey),
    envVarsSnapshot: {
      urlLength: supabaseUrl?.length ?? 0,
      urlPrefix: supabaseUrl?.substring(0, 15) ?? null,
      keyLength: supabaseAnonKey?.length ?? 0,
      keyPrefix: supabaseAnonKey?.substring(0, 15) ?? null,
    }
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(result, { status: 500 })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const partners = await supabase
      .from("partners")
      .select("name, category, active, display_order, country")
      .eq("active", true)

    const influencers = await supabase
      .from("influencers")
      .select("full_name, primary_platform, active, display_order, country")
      .eq("active", true)

    result.partnersCount = partners.data?.length ?? 0
    result.partnersError = partners.error?.message ?? null

    result.influencersCount = influencers.data?.length ?? 0
    result.influencersError = influencers.error?.message ?? null

    // Check if tables even exist (if count is 0 and no error)
    if (result.partnersCount === 0 && !result.partnersError) {
      const { error: tableCheck } = await supabase.from("partners").select("id").limit(1)
      result.partnersTableStatus = tableCheck ? `Error: ${tableCheck.message}` : "Table exists but empty or active=false"
    }

  } catch (err: any) {
    result.globalError = err.message
  }

  return NextResponse.json(result)
}
