import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "MDRRMC Organizational Chart - MDRRMO",
  description: "Municipal Disaster Risk Reduction and Management Council organizational structure",
}

export default function DRRMCCouncilPage() {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-16 relative overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MDRRMC <span className="text-yellow-500">Organizational Chart</span>
              </h1>
              <p className="text-xl mb-6">Municipal Disaster Risk Reduction and Management Council</p>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-map-marker-alt mr-2"></i>Pio Duran, Albay
                </div>
                <div className="bg-blue-800 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-building mr-2"></i>Official Structure
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation">
                  <Image
                    src="https://images.unsplash.com/photo-1587367274642-4ff13a9291cc?w=800&h=800&fit=crop"
                    alt="MDRRMC"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">Organizational Structure</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            The Municipal Disaster Risk Reduction and Management Council (MDRRMC) of Pio Duran, Albay is structured to
            ensure effective coordination and response during disaster situations.
          </p>
          <div className="bg-blue-50 border-l-4 border-yellow-500 p-6 rounded-lg max-w-4xl mx-auto">
            <p className="text-gray-700">
              This organizational chart illustrates the hierarchical structure and functional clusters of the MDRRMC,
              showing the flow of authority and responsibility from leadership down to operational units.
            </p>
          </div>
        </section>

        {/* Organizational Chart */}
        <section className="mb-20">
          <div className="flex flex-col items-center w-full">
            {/* Tier 1: Leadership */}
            <div className="flex flex-col items-center w-full my-5">
              <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-xl p-6 text-center min-w-[300px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Hon. Juan Dela Cruz</div>
                <h3 className="text-xl font-bold mb-2">CHAIRPERSON</h3>
                <p className="font-semibold">(Municipal Mayor)</p>
              </div>
              <div className="w-0.5 h-10 bg-blue-950 my-2"></div>
              <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-xl p-6 text-center min-w-[300px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Co-Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Hon. Maria Santos</div>
                <h3 className="text-xl font-bold mb-2">CO-CHAIRPERSON</h3>
                <p className="font-semibold">(Municipal Vice Mayor)</p>
              </div>
            </div>

            {/* Tier 2: Vice Chairpersons */}
            <div className="flex flex-wrap justify-center items-center w-full my-5 gap-4">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Vice Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Engr. Roberto Garcia</div>
                <h3 className="text-lg font-bold mb-2">VICE CHAIRPERSON</h3>
                <p className="font-semibold">DISASTER PREPAREDNESS</p>
                <p className="text-sm">(MLGOO)</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Vice Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Arch. Ana Reyes</div>
                <h3 className="text-lg font-bold mb-2">VICE CHAIRPERSON</h3>
                <p className="font-semibold">DISASTER PREVENTION AND MITIGATION</p>
                <p className="text-sm">(MPDO)</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Vice Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Ms. Carla Martinez</div>
                <h3 className="text-lg font-bold mb-2">VICE CHAIRPERSON</h3>
                <p className="font-semibold">DISASTER RESPONSE</p>
                <p className="text-sm">(MSWDO)</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Vice Chairperson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">Mr. David Lim</div>
                <h3 className="text-lg font-bold mb-2">VICE CHAIRPERSON</h3>
                <p className="font-semibold">REHABILITATION AND RECOVERY</p>
                <p className="text-sm">(MAO)</p>
              </div>
            </div>

            {/* Cluster Members Heading */}
            <div className="text-center my-12">
              <h3 className="text-2xl font-bold text-blue-950 mb-4">CLUSTER MEMBERS</h3>
              <div className="w-32 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* Tier 3: Functional Clusters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                { name: "Mr. Jose Navarro", role: "EMERGENCY COMMUNICATION", dept: "(MDRRMO - Lead)" },
                { name: "Mr. Ricardo Cruz", role: "TRANSPORTATION", dept: "(MEO - Lead)" },
                {
                  name: "Dr. Elena Rodriguez",
                  role: "HEALTH",
                  dept: "(WASH, Medical, Nutrition, & MHPSS)",
                  subdept: "(MHO – Lead)",
                },
                { name: "Ms. Sofia Hernandez", role: "DAMAGE ASSESSMENT & NEEDS ANALYSIS", dept: "(MSWDO – Lead)" },
                {
                  name: "Mr. Antonio Villanueva",
                  role: "CAMP COORDINATION AND CAMP MANAGEMENT",
                  dept: "(MSWDO – Lead)",
                },
                { name: "Mr. Carlos Fernandez", role: "SEARCH RESCUE AND RECOVERY", dept: "(MDRRMO - Lead)" },
                { name: "Chief Inspector Roberto Aquino", role: "FIRE SUPPRESSION", dept: "(BFP - Lead)" },
                { name: "Mr. Manuel Padilla", role: "MANAGEMENT OF THE DEAD & MISSING", dept: "(MLGOO - Lead)" },
                { name: "Engr. Luisa Morales", role: "CLIMATE CHANGE MITIGATION & ADAPTATION", dept: "(MEWRO - Lead)" },
                { name: "Ms. Patricia Gomez", role: "RECORDS PROTECTION & OCCUPATIONAL SAFETY", dept: "(MOSO - Lead)" },
                { name: "Mr. Benjamin Torres", role: "REHABILITATION AND RECOVERY", dept: "(MAO - Lead)" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white border-t-4 border-blue-950 rounded-xl p-6 text-center shadow-xl card-hover"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                      alt="Cluster Lead"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-semibold mb-1">{member.name}</div>
                  <h3 className="text-lg font-bold mb-2">{member.role}</h3>
                  <p className="font-semibold">{member.dept}</p>
                  {member.subdept && <p className="text-sm">{member.subdept}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Information Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Organizational Guidelines</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-950">
              <div className="text-blue-950 text-3xl mb-4">
                <i className="fas fa-sitemap"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Hierarchical Structure</h3>
              <p className="text-gray-700">
                The organizational chart follows a clear hierarchical structure with defined lines of authority from the
                Chairperson down to operational clusters.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <div className="text-yellow-600 text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Functional Clusters</h3>
              <p className="text-gray-700">
                Eleven specialized clusters ensure comprehensive coverage of all disaster management aspects, each led
                by the appropriate department.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-950">
              <div className="text-blue-950 text-3xl mb-4">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Coordination Mechanism</h3>
              <p className="text-gray-700">
                Clear communication channels and reporting mechanisms ensure effective coordination during emergency
                response operations.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-blue-950 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">
                <i className="fas fa-info-circle text-blue-950 text-3xl"></i>
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">Implementation Notes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>All positions are filled by designated municipal officials as per RA 10121</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Cluster leads coordinate with their respective department heads during emergencies</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Regular drills and training sessions ensure operational readiness</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                  <span>Annual review and update of organizational structure based on lessons learned</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
