"use client"

import { useEffect, useState } from "react"

interface Announcement {
  id: string
  text: string
  enabled: boolean
  createdAt: string
}

export default function AnnouncementWidget() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    // Load announcements from localStorage
    const stored = localStorage.getItem("announcements")
    if (stored) {
      setAnnouncements(JSON.parse(stored))
    }
  }, [])

  // Filter only enabled announcements
  const enabledAnnouncements = announcements.filter((a) => a.enabled)

  if (enabledAnnouncements.length === 0) {
    return null
  }

  return (
    <div className="w-full bg-primary text-primary-foreground py-3 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the announcements for seamless infinite scroll */}
        {[...enabledAnnouncements, ...enabledAnnouncements].map((announcement, index) => (
          <div key={`${announcement.id}-${index}`} className="inline-flex items-center mx-8">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
            </svg>
            <span className="text-sm md:text-base font-medium">{announcement.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
