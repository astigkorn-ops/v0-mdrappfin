export default function EarlyWarningSystemsPage() {
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
              Early Warning <span className="text-yellow-500">Systems</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Stay informed with our community alert and warning systems</p>
          </div>
        </div>
      </header>

      {/* Alert Status Banner */}
      <section className="py-6 bg-green-100 border-b-4 border-green-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg">
              <i className="fas fa-check-circle text-2xl mr-3"></i>
              <div>
                <h3 className="font-bold">Current Status: ALL CLEAR</h3>
                <p className="text-sm">No active weather warnings for Pio Duran</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Levels */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">Warning Alert Levels</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-info-circle text-blue-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-blue-700">Advisory</h3>
              </div>
              <p className="text-blue-600 mb-3">Weather conditions may affect daily activities</p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Monitor weather updates</li>
                <li>• Prepare emergency kit</li>
                <li>• Stay informed</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-exclamation-triangle text-yellow-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-yellow-700">Watch</h3>
              </div>
              <p className="text-yellow-600 mb-3">Hazardous weather is possible</p>
              <ul className="text-sm text-yellow-600 space-y-1">
                <li>• Review emergency plans</li>
                <li>• Check evacuation routes</li>
                <li>• Secure loose items</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-exclamation text-orange-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-orange-700">Warning</h3>
              </div>
              <p className="text-orange-600 mb-3">Dangerous weather is imminent</p>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• Take protective action</li>
                <li>• Avoid unnecessary travel</li>
                <li>• Stay in safe areas</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-ban text-red-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-red-700">Emergency</h3>
              </div>
              <p className="text-red-600 mb-3">Life-threatening situation</p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Evacuate immediately</li>
                <li>• Seek shelter now</li>
                <li>• Follow official orders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Alert Channels */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-broadcast-tower text-yellow-500 mr-3"></i>
                How We Alert You
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <i className="fas fa-mobile-alt text-4xl text-blue-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-blue-700 mb-3">SMS Alerts</h3>
                  <p className="text-blue-600 mb-4">Instant text messages sent to registered mobile numbers</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition">
                    Register Number
                  </button>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <i className="fas fa-bullhorn text-4xl text-green-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-green-700 mb-3">Public Address</h3>
                  <p className="text-green-600 mb-4">Loudspeaker announcements throughout the municipality</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition">
                    Speaker Locations
                  </button>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <i className="fas fa-radio text-4xl text-purple-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-purple-700 mb-3">Radio Broadcast</h3>
                  <p className="text-purple-600 mb-4">Emergency broadcasts on local radio stations</p>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded font-semibold hover:bg-purple-600 transition">
                    Radio Frequencies
                  </button>
                </div>

                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <i className="fas fa-bell text-4xl text-red-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-red-700 mb-3">Sirens & Bells</h3>
                  <p className="text-red-600 mb-4">Traditional warning signals for immediate alerts</p>
                  <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition">
                    Signal Meanings
                  </button>
                </div>

                <div className="text-center p-6 bg-cyan-50 rounded-lg">
                  <i className="fab fa-facebook text-4xl text-cyan-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-cyan-700 mb-3">Social Media</h3>
                  <p className="text-cyan-600 mb-4">Updates on Facebook, Twitter, and official websites</p>
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded font-semibold hover:bg-cyan-600 transition">
                    Follow Pages
                  </button>
                </div>

                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <i className="fas fa-users text-4xl text-orange-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-orange-700 mb-3">Community Leaders</h3>
                  <p className="text-orange-600 mb-4">Barangay officials and community volunteers</p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition">
                    Contact Leaders
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Monitoring */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-cloud-rain text-blue-500 mr-3"></i>
                  Weather Monitoring
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded">
                    <div>
                      <h4 className="font-bold text-blue-800">PAGASA Weather Station</h4>
                      <p className="text-blue-600 text-sm">Real-time weather data</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-800">28°C</div>
                      <div className="text-sm text-blue-600">Partly Cloudy</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-gray-800">65%</div>
                      <div className="text-sm text-gray-600">Humidity</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-gray-800">15 km/h</div>
                      <div className="text-sm text-gray-600">Wind Speed</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-gray-800">1013 hPa</div>
                      <div className="text-sm text-gray-600">Pressure</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-center">
                      <div className="text-lg font-bold text-gray-800">10 km</div>
                      <div className="text-sm text-gray-600">Visibility</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
                  <i className="fas fa-water text-cyan-500 mr-3"></i>
                  Water Level Monitoring
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded">
                    <div>
                      <h4 className="font-bold text-green-800">Bicol River</h4>
                      <p className="text-green-600 text-sm">Main monitoring point</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-800">Normal</div>
                      <div className="text-sm text-green-600">2.1m below critical</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Current Level</span>
                      <span className="font-bold text-blue-600">3.2 meters</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Alert Level</span>
                      <span className="font-bold text-yellow-600">4.5 meters</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Critical Level</span>
                      <span className="font-bold text-red-600">5.3 meters</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Protocols */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-6 flex items-center">
                <i className="fas fa-clipboard-list text-yellow-500 mr-3"></i>
                Emergency Response Protocols
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">When You Receive an Alert</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Stay Calm</h4>
                        <p className="text-gray-600">Don't panic. Read the alert message carefully.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Verify Information</h4>
                        <p className="text-gray-600">Check multiple sources for confirmation.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Take Action</h4>
                        <p className="text-gray-600">Follow the instructions in the alert message.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Share Information</h4>
                        <p className="text-gray-600">Inform family, neighbors, and community.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Alert Signal Meanings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 rounded">
                      <i className="fas fa-bell text-yellow-500 text-xl mr-3"></i>
                      <div>
                        <h4 className="font-bold text-yellow-700">1 Long Bell</h4>
                        <p className="text-yellow-600 text-sm">General alert - stay informed</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-orange-50 rounded">
                      <i className="fas fa-bell text-orange-500 text-xl mr-3"></i>
                      <div>
                        <h4 className="font-bold text-orange-700">3 Short Bells</h4>
                        <p className="text-orange-600 text-sm">Prepare for evacuation</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-red-50 rounded">
                      <i className="fas fa-bell text-red-500 text-xl mr-3"></i>
                      <div>
                        <h4 className="font-bold text-red-700">Continuous Siren</h4>
                        <p className="text-red-600 text-sm">Evacuate immediately</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-green-50 rounded">
                      <i className="fas fa-bell text-green-500 text-xl mr-3"></i>
                      <div>
                        <h4 className="font-bold text-green-700">2 Long Bells</h4>
                        <p className="text-green-600 text-sm">All clear - safe to return</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration & Contact */}
            <div className="bg-blue-950 text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <i className="fas fa-user-plus text-yellow-500 mr-3"></i>
                Stay Connected
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">Register for Alerts</h3>
                  <p className="mb-6">Sign up to receive emergency alerts via SMS and email.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                      <input type="tel" className="w-full p-3 rounded text-gray-800" placeholder="+63 9XX XXX XXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-3 rounded text-gray-800"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Barangay</label>
                      <select className="w-full p-3 rounded text-gray-800">
                        <option>Select your barangay</option>
                        <option>Bagasbas</option>
                        <option>Calalahan</option>
                        <option>Poblacion</option>
                        <option>Other barangays...</option>
                      </select>
                    </div>
                    <button className="w-full bg-yellow-500 text-blue-950 py-3 rounded font-bold hover:bg-yellow-400 transition">
                      Register for Alerts
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">Emergency Contacts</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-900 p-4 rounded">
                      <h4 className="font-bold mb-2">MDRRMO Emergency Hotline</h4>
                      <p className="text-yellow-400 text-lg font-bold">(054) 123-4567</p>
                      <p className="text-sm text-gray-300">24/7 Emergency Response</p>
                    </div>

                    <div className="bg-blue-900 p-4 rounded">
                      <h4 className="font-bold mb-2">Municipal Hall</h4>
                      <p className="text-yellow-400 text-lg font-bold">(054) 987-6543</p>
                      <p className="text-sm text-gray-300">Office Hours: 8AM-5PM</p>
                    </div>

                    <div className="bg-blue-900 p-4 rounded">
                      <h4 className="font-bold mb-2">Police Station</h4>
                      <p className="text-yellow-400 text-lg font-bold">(054) 456-7890</p>
                      <p className="text-sm text-gray-300">24/7 Emergency Response</p>
                    </div>

                    <div className="bg-blue-900 p-4 rounded">
                      <h4 className="font-bold mb-2">Fire Station</h4>
                      <p className="text-yellow-400 text-lg font-bold">(054) 321-0987</p>
                      <p className="text-sm text-gray-300">24/7 Emergency Response</p>
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
