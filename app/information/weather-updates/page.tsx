"use client"

export default function WeatherUpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}

      {/* Header Section */}
      <header className="bg-blue-950 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="bg-repeat w-full h-full"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMEg1MFY1MEgweiIgc3Ryb2tlPSIjZmNkNTMwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">MDRRMO Weather Dashboard</h1>
              <p className="text-xl mb-6">Real-time Weather Monitoring & Disaster Preparedness</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold text-sm">
                  <i className="fas fa-satellite mr-2"></i>Live Monitoring
                </div>
                <div className="bg-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                  <i className="fas fa-bolt mr-2"></i>Real-time Alerts
                </div>
                <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold text-sm">
                  <i className="fas fa-shield-alt mr-2"></i>Disaster Preparedness
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-yellow-500 rounded-full opacity-20 absolute -top-4 -left-4"></div>
                <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-950 rounded-full opacity-20 absolute -bottom-4 -right-4"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-500 flex items-center justify-center animate-pulse">
                  <i className="fas fa-cloud-sun-rain text-blue-950 text-4xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <div className="mb-8">
          <div className="bg-red-600 text-white p-4 rounded-xl animate-pulse">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-2xl mr-3"></i>
              <div>
                <h3 className="font-bold text-lg">SEVERE WEATHER ALERT</h3>
                <p>Thunderstorm Warning issued for Pio Duran, Albay - Until 6:00 PM Today</p>
              </div>
              <button className="ml-auto bg-white text-red-600 px-4 py-2 rounded-lg font-semibold">View Details</button>
            </div>
          </div>
        </div>

        {/* Grid Layout for Dashboard Cards */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Live Weather Station Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-blue-950 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Live Weather Station</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Live</span>
                </div>
              </div>
              <p className="text-blue-200">Real-time weather data from local station</p>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-thermometer-half text-blue-950 text-4xl mb-2"></i>
                  <p className="text-gray-600">Weather Station Data</p>
                  <p className="text-sm text-gray-500">Live feed from WeatherLink</p>
                </div>
              </div>
            </div>
          </div>

          {/* PAGASA Portal Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-yellow-500 text-blue-950 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">PAGASA Weather Portal</h3>
                <button className="bg-blue-950 text-yellow-500 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors">
                  <i className="fas fa-expand mr-2"></i>Full Screen
                </button>
              </div>
              <p className="text-blue-800">Official weather forecasts and advisories</p>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-globe text-blue-950 text-4xl mb-2"></i>
                  <p className="text-gray-600">PAGASA Portal</p>
                  <p className="text-sm text-gray-500">www.panahon.gov.ph</p>
                </div>
              </div>
            </div>
          </div>

          {/* Satellite Imagery Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-blue-950 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Satellite Imagery</h3>
                <div className="flex space-x-2">
                  <button className="bg-yellow-500 text-blue-950 px-3 py-1 rounded text-sm font-semibold">
                    True Color
                  </button>
                  <button className="bg-blue-800 text-white px-3 py-1 rounded text-sm font-semibold">Infrared</button>
                </div>
              </div>
              <p className="text-blue-200">Himawari-8/9 Real-time Satellite Data</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-satellite text-blue-950 text-4xl mb-2"></i>
                    <p className="text-gray-600">Satellite Imagery</p>
                    <p className="text-sm text-gray-500">Himawari-8 Latest</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <i className="fas fa-sync-alt mr-2"></i>Last Updated: Just now
                </div>
                <div className="text-sm text-gray-600">Source: JMA Himawari-8</div>
              </div>
            </div>
          </div>

          {/* PAGASA Forecast & Alerts Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-yellow-500 text-blue-950 p-6">
              <h3 className="text-2xl font-bold">PAGASA Forecasts & Alerts</h3>
              <p className="text-blue-800">Latest weather advisories and forecasts</p>
            </div>
            <div className="p-6">
              {/* Special Weather Bulletin */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <h4 className="font-bold text-lg text-red-600">Special Weather Bulletin #3</h4>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="font-semibold">TYPHOON "OPONG" (2024)</p>
                  <p className="text-sm mt-2">
                    At 4:00 PM today, the center of Typhoon Opong was located 350 km East of Luzon...
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Severe</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Wind Speed: 120 km/h</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Direction: West Northwest</span>
                  </div>
                </div>
              </div>

              {/* General Forecast */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <h4 className="font-bold text-lg text-blue-950">General Forecast</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-cloud-sun text-blue-950 text-xl mr-3"></i>
                    <div>
                      <p className="font-semibold">Albay</p>
                      <p className="text-sm text-gray-600">
                        Partly cloudy with scattered rain showers. Temperature: 26-32°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-cloud-showers-heavy text-blue-950 text-xl mr-3"></i>
                    <div>
                      <p className="font-semibold">Pio Duran</p>
                      <p className="text-sm text-gray-600">Cloudy with moderate to heavy rain. Temperature: 24-28°C</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <h4 className="font-bold text-lg text-yellow-600">Weather Alerts</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                    <i className="fas fa-bolt text-yellow-600 mr-3"></i>
                    <span className="text-sm">Thunderstorm Watch - Until 8:00 PM</span>
                  </div>
                  <div className="flex items-center p-2 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                    <i className="fas fa-water text-orange-600 mr-3"></i>
                    <span className="text-sm">Flood Advisory - Low-lying areas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
              <i className="fas fa-phone-alt text-yellow-500 mr-3"></i>
              Emergency Contacts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <i className="fas fa-ambulance text-red-600 mr-3"></i>
                <div>
                  <p className="font-semibold">Ambulance</p>
                  <p className="text-sm text-gray-600">911</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <i className="fas fa-fire-extinguisher text-blue-600 mr-3"></i>
                <div>
                  <p className="font-semibold">Fire Department</p>
                  <p className="text-sm text-gray-600">160</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <i className="fas fa-shield-alt text-green-600 mr-3"></i>
                <div>
                  <p className="font-semibold">MDRRMO</p>
                  <p className="text-sm text-gray-600">Local Hotline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
              <i className="fas fa-bolt text-yellow-500 mr-3"></i>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-950 text-white p-4 rounded-lg hover:bg-blue-800 transition-colors">
                <i className="fas fa-bullhorn text-2xl mb-2"></i>
                <p className="text-sm">Issue Alert</p>
              </button>
              <button className="bg-yellow-500 text-blue-950 p-4 rounded-lg hover:bg-yellow-400 transition-colors">
                <i className="fas fa-map-marked-alt text-2xl mb-2"></i>
                <p className="text-sm">Evacuation Centers</p>
              </button>
              <button className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-500 transition-colors">
                <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p className="text-sm">Report Incident</p>
              </button>
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-500 transition-colors">
                <i className="fas fa-clipboard-list text-2xl mb-2"></i>
                <p className="text-sm">Resource Status</p>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
              <i className="fas fa-server text-yellow-500 mr-3"></i>
              System Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Weather Station</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Satellite Feed</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">PAGASA API</span>
                  <span className="text-sm font-medium text-yellow-600">Delayed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  Next auto-refresh in 5:23 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
