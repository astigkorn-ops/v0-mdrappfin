"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Shield,
  MapPin,
  AlertTriangle,
  Radio,
  GraduationCap,
  FileText,
  Backpack,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const preparednessLinks = [
  {
    href: "/preparedness/emergency-procedures",
    label: "Emergency Procedures",
    icon: Shield,
    description: "Step-by-step emergency response procedures",
  },
  {
    href: "/preparedness/evacuation",
    label: "Evacuation Management",
    icon: MapPin,
    description: "Evacuation routes and procedures",
  },
  {
    href: "/preparedness/hazard-maps",
    label: "Hazard Maps",
    icon: AlertTriangle,
    description: "Interactive hazard and risk maps",
  },
  {
    href: "/preparedness/early-warning-systems",
    label: "Early Warning Systems",
    icon: Radio,
    description: "Alert systems and notifications",
  },
  {
    href: "/preparedness/community-training",
    label: "Community Training",
    icon: GraduationCap,
    description: "Training programs and workshops",
  },
  {
    href: "/preparedness/our-plans",
    label: "Our Plans",
    icon: FileText,
    description: "Municipal emergency response plans",
  },
  {
    href: "/preparedness/go-bag",
    label: "What's in your GO-BAG?",
    icon: Backpack,
    description: "Emergency kit checklist and guide",
  },
  {
    href: "/preparedness/family-plan",
    label: "Family Emergency Plan",
    icon: Users,
    description: "Create your family emergency plan",
  },
  {
    href: "/preparedness/ice-materials",
    label: "IEC Materials",
    icon: BookOpen,
    description: "Educational resources and materials",
  },
  {
    href: "/preparedness/training-and-drill",
    label: "Training and Drill",
    icon: Calendar,
    description: "Upcoming trainings and past events",
  },
]

export function PreparednessSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full lg:w-80 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-mdrrmo-primary">
            <Shield className="h-5 w-5" />
            Preparedness Menu
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="space-y-1">
            {preparednessLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50 border-l-4 ${
                    isActive
                      ? "bg-blue-50 border-mdrrmo-primary text-mdrrmo-primary font-medium"
                      : "border-transparent text-gray-700 hover:text-mdrrmo-primary"
                  }`}
                >
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{link.label}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{link.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-yellow-50 border-mdrrmo-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-mdrrmo-primary" />
            <span className="text-sm font-semibold text-mdrrmo-primary">Emergency Tip</span>
          </div>
          <p className="text-xs text-gray-600">
            Always keep your emergency kit updated and practice your family emergency plan regularly. Preparedness saves
            lives!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
