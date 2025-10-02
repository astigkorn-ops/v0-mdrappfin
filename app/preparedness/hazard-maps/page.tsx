export default function HazardMapsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-950 text-white py-20 relative overflow-hidden">
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
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hazard <span className="text-yellow-500">Maps</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Interactive maps showing risk areas and safe zones in Pio Duran
            </p>
          </div>
        </div>
      </header>

      {/* Map Legend */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">Risk Level Legend</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="font-bold text-red-700">Very High Risk</span>
                </div>
                <p className="text-sm text-red-600">Immediate evacuation required</p>
              </div>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span className="font-bold text-orange-700">High Risk</span>
                </div>
                <p className="text-sm text-orange-600">Prepare for evacuation</p>
              </div>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span className="font-bold text-yellow-700">Moderate Risk</span>
                </div>
                <p className="text-sm text-yellow-600">Monitor conditions</p>
              </div>
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="font-bold text-green-700">Safe Zone</span>
                </div>
                <p className="text-sm text-green-600">Evacuation center</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Interactive Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-map text-yellow-500 mr-3"></i>
                Interactive Hazard Map
              </h2>
              <div className="bg-gray-100 rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
                <div>
                  <i className="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">Interactive Map Coming Soon</h3>
                  <p className="text-gray-500 mb-6">
                    We're developing an interactive hazard map with real-time data and detailed risk assessments.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-blue-950 text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-blue-950 transition">
                      Request Map Access
                    </button>
                    <button className="border border-blue-950 text-blue-950 px-6 py-3 rounded-lg font-semibold hover:bg-blue-950 hover:text-white transition">
                      Download PDF Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hazard Types */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Flood Hazards */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-water text-blue-500 mr-3"></i>
                  Flood Hazards
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-red-600 mb-2">High Risk Areas</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Bagasbas Beach area</li>
                      <li>• Calalahan coastal zone</li>
                      <li>• Riverbank communities</li>
                      <li>• Low-lying agricultural areas</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-orange-600 mb-2">Moderate Risk Areas</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Mid-elevation residential</li>
                      <li>• Near tributary streams</li>
                      <li>• Drainage-challenged areas</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded mt-4">
                    <h5 className="font-bold text-blue-800 mb-2">Flood Triggers</h5>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Heavy rainfall &gt;100mm/24hrs</li>
                      <li>• Storm surge from typhoons</li>
                      <li>• High tide + rainfall combination</li>
                      <li>• Upstream dam releases</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Landslide Hazards */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-mountain text-amber-600 mr-3"></i>
                  Landslide Hazards
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-red-600 mb-2">High Risk Areas</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Steep slope communities</li>
                      <li>• Areas with loose soil</li>
                      <li>• Deforested hillsides</li>
                      <li>• Cut slopes along roads</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-orange-600 mb-2">Moderate Risk Areas</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Gentle slope areas</li>
                      <li>• Well-vegetated slopes</li>
                      <li>• Stable geological areas</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded mt-4">
                    <h5 className="font-bold text-amber-800 mb-2">Landslide Triggers</h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• Prolonged heavy rainfall</li>
                      <li>• Rapid snowmelt (rare)</li>
                      <li>• Earthquakes</li>
                      <li>• Human activities (excavation)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Storm Surge */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-wind text-cyan-500 mr-3"></i>
                  Storm Surge
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-red-600 mb-2">Very High Risk</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Bagasbas beachfront</li>
                      <li>• Coastal barangays</li>
                      <li>• Areas within 1km of shore</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-orange-600 mb-2">High Risk</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 1-3km inland from coast</li>
                      <li>• Low-lying coastal plains</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded mt-4">
                    <h5 className="font-bold text-cyan-800 mb-2">Storm Surge Heights</h5>
                    <ul className="text-cyan-700 text-sm space-y-1">
                      <li>• Category 1-2: 1-2 meters</li>
                      <li>• Category 3-4: 2-4 meters</li>
                      <li>• Category 5: 4+ meters</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Earthquake */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-house-crack text-red-500 mr-3"></i>
                  Earthquake Hazards
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-red-600 mb-2">High Risk Structures</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Old unreinforced buildings</li>
                      <li>• Structures on soft soil</li>
                      <li>• Buildings near fault lines</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-bold text-yellow-600 mb-2">Safer Areas</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Modern reinforced buildings</li>
                      <li>• Open spaces and parks</li>
                      <li>• Stable bedrock areas</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded mt-4">
                    <h5 className="font-bold text-red-800 mb-2">Fault Lines</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Philippine Fault Zone (nearby)</li>
                      <li>• Local geological faults</li>
                      <li>• Liquefaction-prone areas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Evacuation Centers Map */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-home text-green-500 mr-3"></i>
                Evacuation Centers & Safe Zones
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-4">Primary Centers</h3>
                  <ul className="space-y-2 text-green-600">
                    <li className="flex items-center">
                      <i className="fas fa-school text-green-500 mr-2"></i>
                      Pio Duran Central School
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-building text-green-500 mr-2"></i>
                      Municipal Hall Complex
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-church text-green-500 mr-2"></i>
                      St. Peter Parish Church
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-dumbbell text-green-500 mr-2"></i>
                      Municipal Gymnasium
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Secondary Centers</h3>
                  <ul className="space-y-2 text-blue-600">
                    <li className="flex items-center">
                      <i className="fas fa-school text-blue-500 mr-2"></i>
                      Barangay Elementary Schools
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-home text-blue-500 mr-2"></i>
                      Community Centers
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-basketball-ball text-blue-500 mr-2"></i>
                      Covered Courts
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-clinic-medical text-blue-500 mr-2"></i>
                      Health Centers
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">Temporary Shelters</h3>
                  <ul className="space-y-2 text-yellow-600">
                    <li className="flex items-center">
                      <i className="fas fa-campground text-yellow-500 mr-2"></i>
                      Open Fields (tents)
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-warehouse text-yellow-500 mr-2"></i>
                      Warehouses
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-tree text-yellow-500 mr-2"></i>
                      Parks and Plazas
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-road text-yellow-500 mr-2"></i>
                      Elevated Areas
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Download Resources */}
            <div className="bg-blue-950 text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <i className="fas fa-download text-yellow-500 mr-3"></i>
                Download Hazard Maps
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">Available Maps</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between bg-blue-900 p-3 rounded">
                      <span>Flood Hazard Map (PDF)</span>
                      <button className="bg-yellow-500 text-blue-950 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition">
                        Download
                      </button>
                    </li>
                    <li className="flex items-center justify-between bg-blue-900 p-3 rounded">
                      <span>Landslide Risk Map (PDF)</span>
                      <button className="bg-yellow-500 text-blue-950 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition">
                        Download
                      </button>
                    </li>
                    <li className="flex items-center justify-between bg-blue-900 p-3 rounded">
                      <span>Storm Surge Map (PDF)</span>
                      <button className="bg-yellow-500 text-blue-950 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition">
                        Download
                      </button>
                    </li>
                    <li className="flex items-center justify-between bg-blue-900 p-3 rounded">
                      <span>Evacuation Routes (PDF)</span>
                      <button className="bg-yellow-500 text-blue-950 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition">
                        Download
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">Map Information</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-900 p-3 rounded">
                      <h4 className="font-semibold mb-1">Last Updated</h4>
                      <p className="text-sm text-gray-300">December 2024</p>
                    </div>
                    <div className="bg-blue-900 p-3 rounded">
                      <h4 className="font-semibold mb-1">Data Sources</h4>
                      <p className="text-sm text-gray-300">PHIVOLCS, PAGASA, MGB</p>
                    </div>
                    <div className="bg-blue-900 p-3 rounded">
                      <h4 className="font-semibold mb-1">Scale</h4>
                      <p className="text-sm text-gray-300">1:10,000 (Municipal level)</p>
                    </div>
                    <div className="bg-blue-900 p-3 rounded">
                      <h4 className="font-semibold mb-1">Format</h4>
                      <p className="text-sm text-gray-300">PDF, High Resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
