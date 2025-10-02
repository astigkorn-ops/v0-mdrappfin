"use client"

import * as React from "react"
import type { JSX } from "react"
import IncidentMapManagement from "./incident-map-management"
import ResponseTrackingManagement from "./response-tracking-management"
import PublicFeedbackManagement from "./public-feedback-management"
import FeedbackAnalyticsManagement from "./feedback-analytics-management"
import SurveyResponsesManagement from "./survey-responses-management"
import NewsManagement from "./news-management"
import ActivitiesManagement from "./activities-management"
import GalleryManagement from "./gallery-management"
import VideoManagement from "./video-management"
import ResourcesManagement from "./resources-management"
import MapsManagement from "./maps-management"
import HotlineManagement from "./hotline-management"

interface ManagementContentProps {
  activeSection: string
}

export default function ManagementContent({ activeSection }: ManagementContentProps) {
  const components: { [key: string]: JSX.Element } = {
    "activities-management": <ActivitiesManagement />,
    "alerts-management": <div>Alerts Management Component</div>,
    "announcement-management": <div>Announcement Management Component</div>,
    "contact-management": <div>Contact Management Component</div>,
    "documents-management": <div>Documents Management Component</div>,
    "events-management": <div>Events Management Component</div>,
    "feedback-analytics-management": <FeedbackAnalyticsManagement />,
    "gallery-management": <GalleryManagement />,
    "hotline-management": <HotlineManagement />,
    "image-upload": <div>Image Upload Component</div>,
    "incident-management": <div>Incident Management Component</div>,
    "incident-map-management": <IncidentMapManagement />,
    "incidents-management": <div>Incidents Management Component</div>,
    "maps-management": <MapsManagement />,
    "news-management": <NewsManagement />,
    "personnel-management": <div>Personnel Management Component</div>,
    "public-feedback-management": <PublicFeedbackManagement />,
    "resources-management": <ResourcesManagement />,
    "response-tracking-management": <ResponseTrackingManagement />,
    "schedules-management": <div>Schedules Management Component</div>,
    "survey-responses-management": <SurveyResponsesManagement />,
    "teams-management": <div>Teams Management Component</div>,
    "video-management": <VideoManagement />,
    "volunteer-management": <div>Volunteer Management Component</div>
  }

  const renderContent = () => {
    return components[activeSection] || <DefaultDashboard />
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {renderContent()}
    </div>
  )
}

function DefaultDashboard() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-chart-line text-yellow-500 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-blue-950 mb-2">Management Dashboard</h2>
        <p className="text-gray-600">Select a management module from the sidebar to get started.</p>
      </div>
    </div>
  )
}
