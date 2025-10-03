"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ClipboardList, Calendar, BarChart3, Settings, X } from "lucide-react"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "personnel", label: "Personnel", icon: Users },
  { id: "response", label: "Response Tracking", icon: ClipboardList },
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ isOpen, onClose, activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-blue-950 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-900 p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-blue-950 font-bold text-sm">MD</span>
              </div>
              <span className="font-semibold">MDRRMO</span>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-900" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    onClose()
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-yellow-500 text-blue-950" : "text-white hover:bg-blue-900",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-blue-900 p-4">
            <div className="text-xs text-blue-300">© {new Date().getFullYear()} MDRRMO Pio Duran</div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
