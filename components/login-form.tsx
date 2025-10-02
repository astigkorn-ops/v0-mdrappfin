"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting login for email:", email)
      const supabase = createClient()

      if (!supabase) {
        throw new Error("Failed to initialize Supabase client")
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })

      if (authError) {
        console.error("[v0] Login error:", authError)
        throw authError
      }

      console.log("[v0] Login successful, user:", data.user?.email)
      // Successful login - redirect to admin
      router.push("/admin")
    } catch (error: unknown) {
      console.error("[v0] Login failed:", error)
      if (error instanceof Error) {
        // Provide more user-friendly error messages
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.")
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please check your email and confirm your account before logging in.")
        } else if (error.message.includes("Too many requests")) {
          setError("Too many login attempts. Please wait a moment and try again.")
        } else {
          setError(error.message)
        }
      } else {
        setError("An unexpected error occurred during login. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 w-full max-w-6xl mx-auto">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center text-center text-white">
        <div className="relative mb-8">
          <div className="w-48 h-48 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
          <div className="w-48 h-48 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation flex items-center justify-center">
            <i className="fas fa-shield-alt text-yellow-500 text-7xl"></i>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">MDRRMO Admin Portal</h1>
        <p className="text-xl max-w-md opacity-90">
          Secure access to disaster management resources and emergency response systems
        </p>
        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
              <i className="fas fa-lock text-blue-950"></i>
            </div>
            <div className="text-left">
              <p className="font-semibold">Secure Access</p>
              <p className="text-sm opacity-80">Encrypted Connection</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-shield-alt text-blue-950"></i>
            </div>
            <div className="text-left">
              <p className="font-semibold">Trusted</p>
              <p className="text-sm opacity-80">Official Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transform transition-all hover:shadow-3xl">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-blue-950 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Admin Login</h2>
            <p className="text-gray-600 mt-2">Access your account</p>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-950">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-envelope mr-2 text-blue-950"></i>Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-lock mr-2 text-blue-950"></i>Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-blue-950 transition-colors duration-200"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-950 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-950 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>Sign In
                  </>
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500 pt-4">
              <p>
                <i className="fas fa-shield-alt mr-1"></i>
                Your credentials are securely encrypted
              </p>
            </div>
          </form>

          {/* Emergency Contact */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">Emergency access issues? Contact support:</p>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="tel:911" className="text-blue-950 hover:text-blue-700">
                  <i className="fas fa-phone mr-1"></i>911
                </a>
                <span className="text-gray-300">|</span>
                <a href="mailto:support@mdrrmo.gov.ph" className="text-blue-950 hover:text-blue-700">
                  <i className="fas fa-envelope mr-1"></i>support@mdrrmo.gov.ph
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
