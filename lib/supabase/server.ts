import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.error("[v0] Missing Supabase environment variables on server:", { url: !!url, key: !!key })
      throw new Error("Missing Supabase environment variables")
    }

    console.log("[v0] Creating server Supabase client with URL:", url)
    const cookieStore = await cookies()

    return createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch (error) {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.log("[v0] Cookie setting ignored in Server Component:", error)
          }
        },
      },
    })
  } catch (error) {
    console.error("[v0] Error creating server Supabase client:", error)
    throw error
  }
}
