import ActivitiesManagement from "./admin/activities-management"
import AlertsManagement from "./admin/alerts-management"
import AnnouncementManagement from "./admin/announcement-management"
import ContactManagement from "./admin/contact-management"
import DocumentsManagement from "./admin/documents-management"
import EventsManagement from "./admin/events-management"
import FeedbackAnalyticsManagement from "./admin/feedback-analytics-management"
import GalleryManagement from "./admin/gallery-management"
import HotlineManagement from "./admin/hotline-management"
import IncidentManagement from "./admin/incident-management"
import IncidentMapManagement from "./admin/incident-map-management"
import IncidentsManagement from "./admin/incidents-management"
import ManagementDashboard from "./admin/management-dashboard"
import ManagementContent from "./admin/management-content"
import ManagementSidebar from "./admin/management-sidebar"
import MapsManagement from "./admin/maps-management"
import NewsManagement from "./admin/news-management"
import PersonnelManagement from "./admin/personnel-management"
import PublicFeedbackManagement from "./admin/public-feedback-management"
import ResourcesManagement from "./admin/resources-management"
import ResponseTrackingManagement from "./admin/response-tracking-management"
import SchedulesManagement from "./admin/schedules-management"
import SurveyResponsesManagement from "./admin/survey-responses-management"
import TeamsManagement from "./admin/teams-management"
import VideoManagement from "./admin/video-management"
import VolunteerManagement from "./admin/volunteer-management"

interface AdminContentProps {
  activeSection: string
}

export default function AdminContent({ activeSection }: AdminContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "personnel":
        return <PersonnelManagement />
      case "teams":
        return <TeamsManagement />
      case "schedules":
        return <SchedulesManagement />
      case "alerts":
        return <AlertsManagement />
      case "activities":
        return <ActivitiesManagement />
      case "gallery":
        return <GalleryManagement />
      case "resources":
        return <ResourcesManagement />
      case "maps":
        return <MapsManagement />
      case "hotline-management":
        return <HotlineManagement />
      case "incident-management":
        return <IncidentManagement />
      case "incident-map-management":
        return <IncidentMapManagement />
      case "incidents-management":
        return <IncidentsManagement />
      case "management":
        return <ManagementDashboard />
      case "news-management":
        return <NewsManagement />
      case "feedback-analytics-management":
        return <FeedbackAnalyticsManagement />
      case "public-feedback-management":
        return <PublicFeedbackManagement />
      case "response-tracking-management":
        return <ResponseTrackingManagement />
      case "survey-responses-management":
        return <SurveyResponsesManagement />
      case "video-management":
        return <VideoManagement />
      case "volunteer-management":
        return <VolunteerManagement />
      case "contact-management":
        return <ContactManagement />
      case "announcement-management":
        return <AnnouncementManagement />
      case "documents-management":
        return <DocumentsManagement />
      case "events-management":
        return <EventsManagement />
      case "image-upload":
        return <ImageUpload />
      default:
        return <DashboardContent />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900 p-3 sm:p-4 lg:p-6">
      {renderContent()}
    </main>
  )
}

function DashboardContent() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Personnel</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-950">24</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-users text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Incidents</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">3</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Teams</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-user-check text-green-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Equipment Ready</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">95%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-tools text-yellow-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-bullhorn text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Announcement</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-newspaper text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add News</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-calendar-plus text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Activity</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-upload text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Upload Media</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-plus text-blue-950 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New announcement posted</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-user text-yellow-500 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New user registered</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-edit text-white text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">News article updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-950 pl-4 py-1">
              <h3 className="font-medium text-blue-950">Community Disaster Preparedness Training</h3>
              <p className="text-sm text-gray-600">Dec 15, 2024 • 9:00 AM</p>
              <p className="text-xs text-gray-500 mt-1">Barangay Hall, Poblacion</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-1">
              <h3 className="font-medium text-blue-950">Emergency Equipment Check</h3>
              <p className="text-sm text-gray-600">Dec 18, 2024 • 2:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">MDRRMO Office</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="font-medium text-blue-950">Monthly Coordination Meeting</h3>
              <p className="text-sm text-gray-600">Dec 20, 2024 • 10:00 AM</p>
              <p className="text-xs text-gray-500 mt-1">Conference Room</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Weather Overview</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-blue-950">28°C</p>
              <p className="text-sm text-gray-600">Partly Cloudy</p>
            </div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-cloud-sun text-yellow-600 text-2xl"></i>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-medium">78%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Wind</p>
              <p className="font-medium">12 km/h</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Rain</p>
              <p className="font-medium">10%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Incident Reports Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">12</p>
            <p className="text-sm text-gray-600">Flood Reports</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">5</p>
            <p className="text-sm text-gray-600">Landslide Reports</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-600">Road Incidents</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-600">Other Reports</p>
          </div>
        </div>
      </div>
    </>
  )
}
