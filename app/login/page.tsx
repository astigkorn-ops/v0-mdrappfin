import type { Metadata } from "next"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login - MDRRMO Admin",
  description: "Admin login for MDRRMO Pio Duran",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}
