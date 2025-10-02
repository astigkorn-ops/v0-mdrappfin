import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ConditionalLayout } from "@/components/conditional-layout"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MDRRMO - Pio Duran",
  description: "Municipal Disaster Risk Reduction and Management Office",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <html lang="en" className={`${poppins.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="bg-gray-100 font-sans">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
