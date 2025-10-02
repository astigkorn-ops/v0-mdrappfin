export default function OurPlansPage() {
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The Blueprint for a <span className="text-yellow-500">Safer, Resilient Pio Duran</span>
              </h1>
              <p className="text-xl mb-8">
                Discover our strategic framework for disaster prevention, preparedness, response, and recovery.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-500 text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-950 transition flex items-center">
                  <i className="fas fa-file-pdf mr-3"></i>Download the Full DRRM Plan 2024-2027 (PDF - 25MB)
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500">
                  <img src="/drrm-plan-document.jpg" alt="DRRM Plan" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Four Thematic Areas */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Four Core Thematic Areas</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Our comprehensive approach addresses all phases of disaster management through four interconnected
              pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Prevention & Mitigation */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-950 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-blue-950 text-5xl mb-6 text-center">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">Disaster Prevention & Mitigation</h3>
              <p className="text-gray-600 mb-6 text-center">
                Reduce the impact of hazards through proactive planning, policies, and infrastructure measures.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Enforcement of land use policies and building codes</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Retrofitting of critical infrastructure</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Ecosystem-based disaster risk reduction projects</span>
                </div>
              </div>
            </div>

            {/* Preparedness */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-yellow-500 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-yellow-600 text-5xl mb-6 text-center">
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">Disaster Preparedness</h3>
              <p className="text-gray-600 mb-6 text-center">
                Empower communities with training, drills, and readiness plans for disaster response.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Community-based emergency response training</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Regular disaster preparedness drills and simulations</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Maintenance of emergency equipment and supplies</span>
                </div>
              </div>
            </div>

            {/* Response */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-red-500 text-5xl mb-6 text-center">
                <i className="fas fa-ambulance"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">Disaster Response</h3>
              <p className="text-gray-600 mb-6 text-center">
                Immediate actions during and after disasters to safeguard life and reduce suffering.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Activation of emergency response teams</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Coordination of search and rescue operations</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Provision of emergency relief and humanitarian assistance</span>
                </div>
              </div>
            </div>

            {/* Rehabilitation & Recovery */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-green-500 text-5xl mb-6 text-center">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">Disaster Rehabilitation & Recovery</h3>
              <p className="text-gray-600 mb-6 text-center">
                Rebuild lives, restore services, and improve resilience after disaster impacts.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Restoration of essential services and infrastructure</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Psychosocial support for affected communities</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Implementation of build-back-better principles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Building a Resilient Community</h2>
                <p className="text-xl">
                  Your participation and feedback are essential to the successful implementation of our DRRM Plan.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-950 transition text-center">
                  <i className="fas fa-comments mr-2"></i>Provide Feedback
                </button>
                <button className="bg-white text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 hover:text-blue-950 transition text-center">
                  <i className="fas fa-question-circle mr-2"></i>Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
