import AnnouncementManagement from "@/components/announcement-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Announcement Management | MDRRMO - Pio Duran",
  description: "Manage announcements for the MDRRMO website",
}

export default function AnnouncementsPage() {
  return <AnnouncementManagement />
}
