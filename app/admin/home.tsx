"use client"

import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { useState } from "react"

export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="h-full w-72 sm:w-80 lg:w-64 flex-shrink-0">
        <div className="h-full overflow-y-auto">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={"dashboard"}
            onSectionChange={() => {}}
          />
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen((open) => !open)} onLogout={() => {}} />
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-4xl font-bold text-blue-950 mb-4">Welcome to the MDRRMO Admin Panel</h1>
            <p className="text-lg text-gray-700 mb-8">
              Manage disaster response, resources, personnel, and more from a single dashboard. Use the sidebar to navigate between modules.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <i className="fas fa-users text-blue-950 text-3xl mb-2"></i>
                <span className="font-semibold text-blue-950">Personnel Directory</span>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <i className="fas fa-tasks text-yellow-500 text-3xl mb-2"></i>
                <span className="font-semibold text-blue-950">Response Tracking</span>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <i className="fas fa-calendar-alt text-purple-600 text-3xl mb-2"></i>
                <span className="font-semibold text-blue-950">Activities & Events</span>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <i className="fas fa-chart-bar text-green-600 text-3xl mb-2"></i>
                <span className="font-semibold text-blue-950">Analytics & Reports</span>
              </div>
            </div>
          </div>
        </main>
        <footer className="sticky bottom-0 w-full bg-blue-950 text-white border-t-4 border-yellow-500 shadow-lg z-50">
          <div className="text-center py-3">
            &copy; {new Date().getFullYear()} MDRRMO Pio Duran Admin Panel. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}
