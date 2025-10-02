export default function BarangayPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Barangay Portal</h1>
          <p className="text-xl text-yellow-200 max-w-3xl mx-auto">
            Access barangay-specific information, services, and resources for disaster risk reduction and management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Barangay Directory */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Barangay Directory</h3>
            <p className="text-yellow-200 mb-4">
              Find contact information and officials for all barangays in Pio Duran.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              View Directory
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Emergency Contacts</h3>
            <p className="text-yellow-200 mb-4">Quick access to emergency hotlines and contact numbers by barangay.</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              View Contacts
            </button>
          </div>

          {/* Evacuation Centers */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Evacuation Centers</h3>
            <p className="text-yellow-200 mb-4">
              Locate the nearest evacuation centers and their current capacity status.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              Find Centers
            </button>
          </div>

          {/* Report Incident */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Report Incident</h3>
            <p className="text-yellow-200 mb-4">Submit incident reports and request assistance from your barangay.</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              Report Now
            </button>
          </div>

          {/* Local Announcements */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Local Announcements</h3>
            <p className="text-yellow-200 mb-4">Stay updated with barangay-specific announcements and advisories.</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              View Updates
            </button>
          </div>

          {/* Resources & Forms */}
          <div className="bg-blue-900 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Resources & Forms</h3>
            <p className="text-yellow-200 mb-4">
              Access barangay-specific forms, documents, and educational materials.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium transition-colors">
              Access Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
