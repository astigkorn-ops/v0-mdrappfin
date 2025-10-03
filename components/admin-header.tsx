"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  onMenuToggle: () => void
  onLogout: () => void
}

export function AdminHeader({ onMenuToggle, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold text-blue-950">MDRRMO Admin Panel</h1>

          <Button variant="outline" onClick={onLogout} className="text-sm bg-transparent">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
