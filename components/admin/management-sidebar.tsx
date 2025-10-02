"use client";

import { useState } from "react";
import {
  MapPin,
  Activity,
  MessageSquare,
  BarChart3,
  FileText,
  Newspaper,
  Calendar,
  Images,
  Video,
  FolderOpen,
  Map,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ManagementSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "activities-management", label: "Activities", icon: Calendar, description: "Manage events and activities" },
  { id: "alerts-management", label: "Alerts", icon: Activity, description: "Manage alerts and notifications" },
  { id: "announcement-management", label: "Announcements", icon: Newspaper, description: "Manage announcements" },
  { id: "contact-management", label: "Contacts", icon: MessageSquare, description: "Manage contacts" },
  { id: "documents-management", label: "Documents", icon: FileText, description: "Manage documents" },
  { id: "events-management", label: "Events", icon: Calendar, description: "Manage events" },
  { id: "feedback-analytics-management", label: "Feedback Analytics", icon: BarChart3, description: "View feedback statistics" },
  { id: "gallery-management", label: "Gallery", icon: Images, description: "Upload and organize images" },
  { id: "hotline-management", label: "Hotline Numbers", icon: Phone, description: "Manage emergency contact numbers" },
  { id: "image-upload", label: "Image Upload", icon: Images, description: "Upload images" },
  { id: "incident-management", label: "Incident Management", icon: MapPin, description: "Manage incidents" },
  { id: "incident-map-management", label: "Incident Map", icon: Map, description: "Manage incidents with location mapping" },
  { id: "incidents-management", label: "Incidents", icon: MapPin, description: "Manage all incidents" },
  { id: "maps-management", label: "Maps", icon: Map, description: "Manage disaster and evacuation maps" },
  { id: "news-management", label: "News", icon: Newspaper, description: "Create and manage news articles" },
  { id: "personnel-management", label: "Personnel", icon: Activity, description: "Manage personnel" },
  { id: "public-feedback-management", label: "Public Feedback", icon: MessageSquare, description: "Manage citizen feedback" },
  { id: "resources-management", label: "Resources", icon: FolderOpen, description: "Upload and manage documents" },
  { id: "response-tracking-management", label: "Response Tracking", icon: Activity, description: "Track emergency response progress" },
  { id: "schedules-management", label: "Schedules", icon: Calendar, description: "Manage schedules" },
  { id: "survey-responses-management", label: "Survey Responses", icon: FileText, description: "Manage survey data and responses" },
  { id: "teams-management", label: "Teams", icon: Activity, description: "Manage teams" },
  { id: "video-management", label: "Videos", icon: Video, description: "Manage video content" },
  { id: "volunteer-management", label: "Volunteers", icon: Activity, description: "Manage volunteers" },
];

export default function ManagementSidebar({ activeSection, onSectionChange }: ManagementSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sec) => sec !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        const isExpanded = expandedSections.includes(item.id);

        return (
          <div key={item.id} className="space-y-1">
            <button
              onClick={() => {
                onSectionChange(item.id);
                toggleSection(item.id);
              }}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                isActive
                  ? "bg-blue-950 text-yellow-500 shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-950"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div
                    className={cn(
                      "text-xs",
                      isActive ? "text-yellow-300" : "text-gray-500"
                    )}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {/* Optional: Render sub-items if needed when expanded */}
            {/* {isExpanded && <div>Sub-items go here</div>} */}
          </div>
        );
      })}
    </div>
  );
}
