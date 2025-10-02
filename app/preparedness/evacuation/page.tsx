export default function EvacuationPage() {
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
              Evacuation <span className="text-yellow-500">Plans</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Know your evacuation routes and procedures to stay safe during emergencies
            </p>
          </div>
        </div>
      </header>

      {/* Quick Action Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-exclamation-triangle text-red-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-red-700">Emergency Alert</h3>
              </div>
              <p className="text-red-600 mb-4">If you receive an evacuation order, act immediately. Do not delay.</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition">
                Call Emergency Hotline
              </button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-route text-blue-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-blue-700">Know Your Routes</h3>
              </div>
              <p className="text-blue-600 mb-4">Familiarize yourself with primary and alternate evacuation routes.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition">
                View Route Map
              </button>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-suitcase text-green-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-green-700">Go Bag Ready</h3>
              </div>
              <p className="text-green-600 mb-4">Keep your emergency kit packed and ready to go at all times.</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition">
                Kit Checklist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Evacuation Zones */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-map-marked-alt text-yellow-500 mr-3"></i>
                Evacuation Zones
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Zone A - High Risk</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Coastal barangays (Bagasbas, Calalahan)</li>
                    <li>• Low-lying areas near rivers</li>
                    <li>• Areas prone to storm surge</li>
                    <li>• Immediate evacuation required</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">Zone B - Moderate Risk</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Mid-elevation residential areas</li>
                    <li>• Areas near tributaries</li>
                    <li>• Landslide-prone slopes</li>
                    <li>• Evacuation may be required</li>
                  </ul>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-xl font-bold text-yellow-600 mb-3">Zone C - Lower Risk</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Higher elevation areas</li>
                    <li>• Inland communities</li>
                    <li>• Stable ground areas</li>
                    <li>• Monitor conditions closely</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-bold text-green-600 mb-3">Safe Zones</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Municipal Hall compound</li>
                    <li>• Public schools (designated)</li>
                    <li>• Community centers</li>
                    <li>• Churches and covered courts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Evacuation Procedures */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-list-ol text-yellow-500 mr-3"></i>
                Evacuation Procedures
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Listen for Official Alerts</h3>
                    <p className="text-gray-600">
                      Monitor radio, TV, social media, and local announcements for evacuation orders from MDRRMO.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Gather Your Emergency Kit</h3>
                    <p className="text-gray-600">
                      Take your pre-packed go bag with essentials: water, food, medicines, documents, and clothing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Your Home</h3>
                    <p className="text-gray-600">
                      Turn off utilities (gas, electricity, water), lock doors, and leave a note indicating where you've
                      gone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Follow Designated Routes</h3>
                    <p className="text-gray-600">
                      Use only the evacuation routes specified by authorities. Avoid shortcuts or unfamiliar paths.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Report to Evacuation Center</h3>
                    <p className="text-gray-600">
                      Register at the designated evacuation center and follow instructions from emergency personnel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation Options */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-bus text-yellow-500 mr-3"></i>
                Transportation & Routes
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Primary Evacuation Routes</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <i className="fas fa-route text-blue-500 mr-2"></i>
                      Maharlika Highway (North-South)
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-route text-blue-500 mr-2"></i>
                      Bagasbas Road (Coastal Areas)
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-route text-blue-500 mr-2"></i>
                      Municipal Road Network
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-route text-blue-500 mr-2"></i>
                      Barangay Access Roads
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Transportation Assistance</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <i className="fas fa-bus text-green-500 mr-2"></i>
                      Municipal evacuation buses
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-ambulance text-green-500 mr-2"></i>
                      Medical transport vehicles
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-truck text-green-500 mr-2"></i>
                      Cargo trucks for supplies
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-boat text-green-500 mr-2"></i>
                      Boats for water rescues
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-blue-950 text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <i className="fas fa-phone text-yellow-500 mr-3"></i>
                Emergency Contacts
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-3">MDRRMO Hotlines</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <i className="fas fa-phone mr-2"></i>
                      (054) 123-4567
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-mobile-alt mr-2"></i>
                      0917-123-4567
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-envelope mr-2"></i>
                      emergency@pioduran.gov.ph
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-3">Other Emergency Numbers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <i className="fas fa-shield-alt mr-2"></i>
                      PNP Pio Duran: (054) 987-6543
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-fire mr-2"></i>
                      Fire Station: (054) 456-7890
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-hospital mr-2"></i>
                      Rural Health Unit: (054) 321-0987
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
