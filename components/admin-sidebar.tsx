"use client"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function AdminSidebar({ isOpen, onClose, activeSection, onSectionChange }: AdminSidebarProps) {
  // Update menuItems to reflect ADMIN-UPDATE structure
  const menuItems = [
  { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard", active: true },
  { id: "personnel", icon: "fas fa-users", label: "Personnel Directory" },
  { id: "teams", icon: "fas fa-user-check", label: "Team Assignments" },
  { id: "schedules", icon: "fas fa-calendar-check", label: "Schedules" },
  { id: "alerts", icon: "fas fa-exclamation-triangle", label: "Emergency Alerts" },
  { id: "activities", icon: "fas fa-calendar-alt", label: "Activities" },
  { id: "gallery", icon: "fas fa-images", label: "Gallery" },
  { id: "resources", icon: "fas fa-file-alt", label: "Resources" },
  { id: "maps", icon: "fas fa-map-marked", label: "Maps" },
  { id: "hotline-management", icon: "fas fa-phone-alt", label: "Hotline Numbers" },
  { id: "incident-management", icon: "fas fa-file-medical", label: "Incident Management" },
  { id: "incident-map-management", icon: "fas fa-map-marked", label: "Incident Map" },
  { id: "incidents-management", icon: "fas fa-file-medical", label: "Incidents" },
  { id: "management", icon: "fas fa-cogs", label: "Management Center" },
  { id: "news-management", icon: "fas fa-newspaper", label: "News & Updates" },
  { id: "feedback-analytics-management", icon: "fas fa-chart-bar", label: "Feedback Analytics" },
  { id: "public-feedback-management", icon: "fas fa-comment-alt", label: "Public Feedback" },
  { id: "response-tracking-management", icon: "fas fa-tasks", label: "Response Tracking" },
  { id: "survey-responses-management", icon: "fas fa-envelope-open-text", label: "Survey Responses" },
  { id: "video-management", icon: "fas fa-video", label: "Videos" },
  { id: "volunteer-management", icon: "fas fa-user-check", label: "Volunteers" },
  { id: "contact-management", icon: "fas fa-address-book", label: "Contacts" },
  { id: "announcement-management", icon: "fas fa-bullhorn", label: "Announcements" },
  { id: "documents-management", icon: "fas fa-file-alt", label: "Documents" },
  { id: "events-management", icon: "fas fa-calendar-alt", label: "Events" },
  { id: "image-upload", icon: "fas fa-upload", label: "Image Upload" },
  { id: "profile", icon: "fas fa-user", label: "Profile" },
  { id: "logout", icon: "fas fa-sign-out-alt", label: "Logout" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-blue-950 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
        aria-label="Admin Navigation"
      >
  <div className="sticky top-0 z-10 bg-blue-950 p-3 sm:p-4 border-b border-blue-800">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i className="fas fa-shield-alt text-blue-950 text-lg sm:text-xl"></i>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">MDRRMO Admin</h1>
              <p className="text-blue-200 text-xs sm:text-sm truncate">Pio Duran, Albay</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 bg-blue-950 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-blue-900 pb-15">
          <div className="px-2 sm:px-4 py-2 text-blue-300 text-xs uppercase font-semibold tracking-wider">Main</div>
          {menuItems.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                // Auto-close sidebar on mobile after selection
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-2 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-2 sm:px-4 py-2 text-blue-300 text-xs uppercase font-semibold tracking-wider mt-4">
            Content Management
          </div>
          {menuItems.slice(2, 9).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-2 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-2 sm:px-4 py-2 text-blue-300 text-xs uppercase font-semibold tracking-wider mt-4">
            System
          </div>
          {menuItems.slice(9, 20).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-2 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-2 sm:px-4 py-2 text-blue-300 text-xs uppercase font-semibold tracking-wider mt-4">
            Admin
          </div>
          {menuItems.slice(20, 25).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-2 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="h-6"></div>
        </nav>
      </aside>
    </>
  )
}
