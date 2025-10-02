"use client"

import { useState } from "react"

export default function EmergencyProceduresPage() {
  const [activeTab, setActiveTab] = useState("storm-surge")

  const openTab = (tabName: string) => {
    setActiveTab(tabName)
  }

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
              Emergency <span className="text-yellow-500">Procedures</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              What to do before, during, and after different types of emergencies
            </p>
          </div>
        </div>
      </header>

      {/* Emergency Procedures Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="flex flex-wrap border-b overflow-x-auto">
              {[
                { id: "storm-surge", label: "Storm Surge", icon: "fas fa-water", color: "text-blue-500" },
                { id: "landslide", label: "Landslide", icon: "fas fa-mountain", color: "text-amber-600" },
                { id: "thunderstorm", label: "Thunderstorm", icon: "fas fa-bolt", color: "text-purple-500" },
                { id: "typhoon", label: "Typhoon", icon: "fas fa-umbrella", color: "text-orange-500" },
                { id: "flood", label: "Flood", icon: "fas fa-house-tsunami", color: "text-teal-500" },
                { id: "earthquake", label: "Earthquake", icon: "fas fa-earth-americas", color: "text-red-700" },
                { id: "fire", label: "Fire", icon: "fas fa-fire", color: "text-red-500" },
                { id: "tsunami", label: "Tsunami", icon: "fas fa-water", color: "text-blue-700" },
                { id: "heat", label: "Heat", icon: "fas fa-temperature-high", color: "text-red-500" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => openTab(tab.id)}
                  className={`px-3 md:px-4 py-2 md:py-3 text-sm md:text-base flex-shrink-0 transition-all duration-300 border-b-3 ${
                    activeTab === tab.id
                      ? `${tab.color} border-current font-semibold`
                      : "text-gray-600 border-transparent hover:text-gray-800"
                  }`}
                >
                  <i className={`${tab.icon} mr-1 md:mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "storm-surge" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-500">
                      <i className="fas fa-calendar-check mr-3"></i> Before
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Know Your Risk</h4>
                        <p className="text-gray-700">
                          Check if your area is prone to storm surges and know your evacuation routes.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Prepare Emergency Kit</h4>
                        <p className="text-gray-700">
                          Include food, water, medications, flashlight, batteries, and important documents.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Reinforce Your Home</h4>
                        <p className="text-gray-700">
                          Install storm shutters or board up windows. Secure outdoor items that could become
                          projectiles.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Plan Evacuation</h4>
                        <p className="text-gray-700">
                          Identify higher ground and plan how to get there. Know where official shelters are located.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-500">
                      <i className="fas fa-exclamation-triangle mr-3"></i> During
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Evacuate if Ordered</h4>
                        <p className="text-gray-700">
                          Leave immediately if authorities issue evacuation orders. Don't wait until it's too late.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Move to Higher Ground</h4>
                        <p className="text-gray-700">
                          If trapped by rising water, move to the highest level of your home or building.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Avoid Flood Waters</h4>
                        <p className="text-gray-700">
                          Never walk, swim, or drive through flood waters. Just 6 inches can knock you down.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Stay Informed</h4>
                        <p className="text-gray-700">
                          Listen to weather updates and emergency instructions on battery-powered radio.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-500">
                      <i className="fas fa-home mr-3"></i> After
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Wait for All Clear</h4>
                        <p className="text-gray-700">Don't return home until authorities declare it's safe to do so.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Inspect for Damage</h4>
                        <p className="text-gray-700">
                          Check for structural damage before entering buildings. Watch for downed power lines.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Avoid Contaminated Water</h4>
                        <p className="text-gray-700">
                          Don't drink tap water until officials say it's safe. Boil water if unsure.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Document Damage</h4>
                        <p className="text-gray-700">
                          Take photos for insurance claims before cleaning up or making repairs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Similar structure for other emergency types */}
              {activeTab === "typhoon" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-orange-500">
                      <i className="fas fa-calendar-check mr-3"></i> Before
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Secure Your Home</h4>
                        <p className="text-gray-700">
                          Install storm shutters or board up windows. Reinforce garage doors and roof.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Prepare Supplies</h4>
                        <p className="text-gray-700">
                          Stock up on food, water, medications, batteries, and fuel for at least 3 days.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Know Evacuation Routes</h4>
                        <p className="text-gray-700">Identify multiple evacuation routes in case roads are blocked.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Trim Trees</h4>
                        <p className="text-gray-700">
                          Remove dead branches and secure outdoor items that could become projectiles.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-orange-500">
                      <i className="fas fa-exclamation-triangle mr-3"></i> During
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Stay Indoors</h4>
                        <p className="text-gray-700">
                          Remain in a secure interior room away from windows during the storm.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Monitor Updates</h4>
                        <p className="text-gray-700">
                          Listen to weather updates on battery-powered radio or NOAA weather radio.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Avoid Flooded Areas</h4>
                        <p className="text-gray-700">
                          Never walk or drive through flood waters. Turn around, don't drown.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Be Ready to Evacuate</h4>
                        <p className="text-gray-700">
                          If authorities order evacuation, leave immediately to designated shelters.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-orange-500">
                      <i className="fas fa-home mr-3"></i> After
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Wait for All Clear</h4>
                        <p className="text-gray-700">Stay sheltered until authorities confirm the storm has passed.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Inspect for Damage</h4>
                        <p className="text-gray-700">
                          Check for structural damage, gas leaks, and downed power lines before entering buildings.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Avoid Contaminated Water</h4>
                        <p className="text-gray-700">
                          Boil water until officials declare it safe. Watch for waterborne diseases.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Document Damage</h4>
                        <p className="text-gray-700">
                          Take photos for insurance claims before cleaning up or making repairs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add similar content for other emergency types */}
              {activeTab !== "storm-surge" && activeTab !== "typhoon" && (
                <div className="text-center py-12">
                  <div className="text-6xl text-gray-300 mb-4">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")} Procedures
                  </h3>
                  <p className="text-gray-500">
                    Detailed emergency procedures for {activeTab.replace("-", " ")} will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
