"use client"

import { useState } from "react"
import ManagementSidebar from "./management-sidebar"
import ManagementContent from "./management-content"

export default function ManagementDashboard() {
  const [activeSection, setActiveSection] = useState("incident-map")

  return (
    <div className="flex h-screen bg-gray-50">
      <ManagementSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ManagementContent activeSection={activeSection} />
    </div>
  )
}
