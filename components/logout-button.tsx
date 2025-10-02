"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      console.log("[v0] Attempting logout")
      const supabase = createClient()

      if (!supabase) {
        throw new Error("Failed to initialize Supabase client")
      }

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("[v0] Logout error:", error)
        throw error
      }

      console.log("[v0] Logout successful")
      router.push("/login")
    } catch (error) {
      console.error("[v0] Error logging out:", error)
      // Even if there's an error, redirect to login for security
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
    >
      <i className={`fas ${isLoading ? "fa-spinner fa-spin" : "fa-sign-out-alt"} mr-2`}></i>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  )
}
