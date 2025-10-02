import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.error("[v0] Missing Supabase environment variables:", { url: !!url, key: !!key })
      throw new Error("Missing Supabase environment variables")
    }

    console.log("[v0] Creating Supabase client with URL:", url)
    return createBrowserClient(url, key)
  } catch (error) {
    console.error("[v0] Error creating Supabase client:", error)
    throw error
  }
}
