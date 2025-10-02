"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/login")

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <BackToTop />
    </>
  )
}
