import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - MDRRMO",
  description: "Comprehensive range of services for disaster preparedness, response, and recovery",
}

export default function OurServicesPage() {
  return (
    <div className="bg-primary text-white font-sans">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Commitment to Service</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            The Pio Duran Municipal Disaster Risk Reduction and Management Office is dedicated to building a safe and
            resilient community. We provide a comprehensive range of services designed to prepare for, respond to, and
            recover from disasters.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Service Card 1 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-truck-medical text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">24/7 Emergency Response</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              Our team is on standby 24/7 to provide immediate assistance for medical emergencies, search and rescue
              operations, and other critical incidents.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-person-chalkboard text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">Disaster Preparedness Training</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              We offer free workshops and training for barangays, schools, and local businesses on topics like first
              aid, fire safety, and earthquake drills.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-bullhorn text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">Early Warning & Information Dissemination</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              Stay informed with timely and accurate weather advisories, typhoon signals, and emergency alerts through
              our official channels.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-house-flood-water text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">Evacuation Management</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              We manage and operate designated evacuation centers, ensuring they are safe, sanitary, and equipped to
              shelter families during calamities.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-magnifying-glass-chart text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">Post-Disaster Assessment</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              After a disaster, our teams conduct rapid damage and needs assessments to help guide recovery and
              rehabilitation efforts effectively.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>

          {/* Service Card 6 */}
          <div className="bg-blue-900 rounded-xl p-8 hover:bg-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-800 hover:border-accent card-hover">
            <div className="text-center mb-6">
              <i className="fas fa-users-gear text-5xl text-accent mb-4"></i>
              <h3 className="text-2xl font-bold mb-3">Community Drill Facilitation</h3>
            </div>
            <p className="text-gray-200 text-center mb-6">
              We partner with local communities to plan and execute realistic disaster drills, enhancing preparedness
              and coordination at the grassroots level.
            </p>
            <div className="text-center">
              <button className="bg-accent hover:bg-yellow-600 text-primary font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-blue-800 border-2 border-accent rounded-xl p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Emergency Hotline</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <i className="fas fa-phone text-3xl text-accent"></i>
              <span className="text-3xl font-bold">(123) 456-7890</span>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-200">
            For immediate emergency assistance, please call our 24/7 hotline. Your safety is our priority.
          </p>
        </div>
      </div>
    </div>
  )
}
