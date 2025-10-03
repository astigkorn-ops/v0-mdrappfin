"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, FileText, ImageIcon, Video, Bell, Phone, Shield, Settings } from "lucide-react"
import Link from "next/link"

export default function ManagementDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("management")

  const contentModules = [
    {
      title: "Personnel Management",
      description: "Manage MDRRMO staff and personnel",
      icon: Users,
      href: "/admin/personnel",
      color: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Activities & Events",
      description: "Manage trainings, drills, and events",
      icon: Calendar,
      href: "/admin/activities",
      color: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "News Management",
      description: "Create and manage news articles",
      icon: FileText,
      href: "/admin/news",
      color: "bg-yellow-50 hover:bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Gallery Management",
      description: "Upload and organize photos",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "bg-green-50 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Video Management",
      description: "Manage educational videos",
      icon: Video,
      href: "/admin/videos",
      color: "bg-red-50 hover:bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Alerts Management",
      description: "Create and manage emergency alerts",
      icon: Bell,
      href: "/admin/alerts",
      color: "bg-orange-50 hover:bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Hotlines Management",
      description: "Manage emergency contact numbers",
      icon: Phone,
      href: "/admin/hotlines",
      color: "bg-indigo-50 hover:bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Resources Management",
      description: "Manage documents and resources",
      icon: Shield,
      href: "/admin/resources",
      color: "bg-teal-50 hover:bg-teal-100",
      iconColor: "text-teal-600",
    },
  ]

  const systemModules = [
    {
      title: "DRRM Council",
      description: "Manage council members",
      icon: Users,
      href: "/admin/drrm-council",
    },
    {
      title: "Quick Links",
      description: "Manage homepage quick links",
      icon: Settings,
      href: "/admin/quick-links",
    },
    {
      title: "Public Messages",
      description: "Manage public announcements",
      icon: Bell,
      href: "/admin/public-messages",
    },
    {
      title: "Incident Reports",
      description: "View and manage incident reports",
      icon: FileText,
      href: "/admin/incidents",
    },
  ]

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="h-full w-72 sm:w-80 lg:w-64 flex-shrink-0">
        <div className="h-full overflow-y-auto">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen((open) => !open)} onLogout={() => {}} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-950 mb-2">Content Management</h1>
              <p className="text-gray-600">Manage all website content and data from one place</p>
            </div>

            <Tabs defaultValue="content" className="space-y-6">
              <TabsList>
                <TabsTrigger value="content">Content Modules</TabsTrigger>
                <TabsTrigger value="system">System Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                {/* Content Management Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentModules.map((module, index) => (
                    <Link key={index} href={module.href}>
                      <Card
                        className={`${module.color} border-none transition-all hover:shadow-lg cursor-pointer h-full`}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                              <module.icon className={`h-6 w-6 ${module.iconColor}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-blue-950">{module.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-700">{module.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                {/* System Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemModules.map((module, index) => (
                    <Link key={index} href={module.href}>
                      <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <module.icon className="h-6 w-6 text-blue-950" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-blue-950">{module.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{module.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
                <CardDescription>Overview of your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-950">45</p>
                    <p className="text-sm text-gray-600">Personnel</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-950">23</p>
                    <p className="text-sm text-gray-600">Events</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-950">67</p>
                    <p className="text-sm text-gray-600">News Articles</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-950">156</p>
                    <p className="text-sm text-gray-600">Gallery Images</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
