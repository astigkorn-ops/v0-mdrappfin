export default function CommunityTrainingPage() {
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
                Empowering Pio Duran: <span className="text-yellow-500">Build Skills, Build Resilience</span>
              </h1>
              <p className="text-xl mb-8">
                Join our free community-based training programs to prepare, respond, and recover from disasters.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-users mr-2"></i>Community Focused
                </div>
                <div className="bg-blue-800 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-graduation-cap mr-2"></i>Free Training
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500">
                  <img
                    src="/community-training-session.jpg"
                    alt="Community Training Session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">
              Building a Resilient Community Together
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 mb-8">
              The MDRRMO Pio Duran is committed to strengthening our community's capacity to face natural hazards
              including typhoons, floods, landslides, and volcanic threats. We believe that an informed and skilled
              community is our strongest defense against disasters.
            </p>
            <p className="text-lg text-gray-600">
              Our training programs are designed to equip residents with practical skills and knowledge to prepare for,
              respond to, and recover from emergencies. Whether you're a barangay official, teacher, student, business
              owner, or concerned citizen, there's a program for you.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Training Programs */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Featured Training Programs</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Explore our comprehensive training programs designed to build community resilience and preparedness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Disaster Awareness */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-950 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-blue-950 text-yellow-500 flex items-center justify-center mx-auto mb-6 text-2xl">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">
                Basic Disaster Awareness & Family Preparedness Planning
              </h3>
              <p className="text-gray-600 mb-6">
                Learn how to assess household risks and create a comprehensive family disaster plan.
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-blue-950 mb-2">Key Topics:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Hazard identification in your home</li>
                  <li>Family emergency communication plan</li>
                  <li>Essential disaster supply kit</li>
                  <li>Evacuation route planning</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-sm">General Public</span>
                <span className="bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-sm">Families</span>
                <span className="bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-sm">4 Hours</span>
              </div>
              <button className="w-full bg-blue-950 text-yellow-500 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-blue-950 transition">
                Learn More & Register
              </button>
            </div>

            {/* First Aid & CPR */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-6 text-2xl">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">
                Basic First Aid & CPR/BLS (Basic Life Support)
              </h3>
              <p className="text-gray-600 mb-6">
                Gain life-saving skills to provide immediate care during medical emergencies and disasters.
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-blue-950 mb-2">Key Topics:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>CPR techniques for adults and children</li>
                  <li>Wound care and bleeding control</li>
                  <li>Choking victim management</li>
                  <li>Shock recognition and treatment</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm">Health Workers</span>
                <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm">Teachers</span>
                <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm">1 Day</span>
              </div>
              <button className="w-full bg-blue-950 text-yellow-500 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-blue-950 transition">
                Learn More & Register
              </button>
            </div>

            {/* Search and Rescue */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-amber-500 hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto mb-6 text-2xl">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4 text-center">Search and Rescue Orientation (SAR)</h3>
              <p className="text-gray-600 mb-6">
                Learn basic search and rescue techniques for urban and wilderness environments.
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-blue-950 mb-2">Key Topics:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Search patterns and techniques</li>
                  <li>Rescue equipment usage</li>
                  <li>Victim extraction methods</li>
                  <li>Safety protocols for rescuers</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm">Volunteers</span>
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm">Barangay Tanods</span>
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm">2 Days</span>
              </div>
              <button className="w-full bg-blue-950 text-yellow-500 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-blue-950 transition">
                Learn More & Register
              </button>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to make your community safer?</h2>
                <p className="text-xl">
                  Join our network of trained volunteers and community responders. Your skills can save lives.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-950 transition text-center">
                  <i className="fas fa-hands-helping mr-2"></i>Become a Volunteer
                </button>
                <button className="bg-white text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 hover:text-blue-950 transition text-center">
                  <i className="fas fa-phone mr-2"></i>Contact Training Division
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
