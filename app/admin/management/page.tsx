import type { Metadata } from "next"
import ManagementDashboard from "@/components/admin/management-dashboard"

export const metadata: Metadata = {
  title: "Management Dashboard - MDRRMO Admin",
  description: "Content and data management dashboard for MDRRMO",
}

export default function ManagementPage() {
  return <ManagementDashboard />
}
