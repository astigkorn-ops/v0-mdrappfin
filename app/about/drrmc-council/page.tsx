"use client"

import { useState } from "react"
import { 
  MapPin, 
  Building, 
  Users, 
  Network, 
  CheckCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import Image from "next/image"

interface CouncilMember {
  id: number
  name: string
  position: string
  department: string
  role?: string
  subDepartment?: string
  image: string
}

const councilData: CouncilMember[] = [
  // Leadership
  {
    id: 1,
    name: "Hon. EVANGELINE C. ARANDIA",
    position: "CHAIRPERSON",
    department: "(Municipal Mayor)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 2,
    name: "Hon. HENRY P. CALLOPE",
    position: "CO-CHAIRPERSON",
    department: "(Municipal Vice Mayor)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  // Vice Chairpersons
  {
    id: 3,
    name: "Engr. Roberto Garcia",
    position: "VICE CHAIRPERSON",
    department: "DISASTER PREPAREDNESS",
    role: "(MLGOO)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 4,
    name: "Arch. Ana Reyes",
    position: "VICE CHAIRPERSON",
    department: "DISASTER PREVENTION AND MITIGATION",
    role: "(MPDO)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 5,
    name: "Ms. Carla Martinez",
    position: "VICE CHAIRPERSON",
    department: "DISASTER RESPONSE",
    role: "(MSWDO)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 6,
    name: "Mr. David Lim",
    position: "VICE CHAIRPERSON",
    department: "REHABILITATION AND RECOVERY",
    role: "(MAO)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  // Cluster Members
  {
    id: 7,
    name: "Mr. Jose Navarro",
    position: "EMERGENCY COMMUNICATION",
    department: "(MDRRMO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 8,
    name: "Mr. Ricardo Cruz",
    position: "TRANSPORTATION",
    department: "(MEO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 9,
    name: "Dr. Elena Rodriguez",
    position: "HEALTH",
    department: "(WASH, Medical, Nutrition, & MHPSS)",
    subDepartment: "(MHO – Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 10,
    name: "Ms. Sofia Hernandez",
    position: "DAMAGE ASSESSMENT & NEEDS ANALYSIS",
    department: "(MSWDO – Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 11,
    name: "Mr. Antonio Villanueva",
    position: "CAMP COORDINATION AND CAMP MANAGEMENT",
    department: "(MSWDO – Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 12,
    name: "Mr. Carlos Fernandez",
    position: "SEARCH RESCUE AND RECOVERY",
    department: "(MDRRMO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 13,
    name: "Chief Inspector Roberto Aquino",
    position: "FIRE SUPPRESSION",
    department: "(BFP - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 14,
    name: "Mr. Manuel Padilla",
    position: "MANAGEMENT OF THE DEAD & MISSING",
    department: "(MLGOO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 15,
    name: "Engr. Luisa Morales",
    position: "CLIMATE CHANGE MITIGATION & ADAPTATION",
    department: "(MEWRO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 16,
    name: "Ms. Patricia Gomez",
    position: "RECORDS PROTECTION & OCCUPATIONAL SAFETY",
    department: "(MOSO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 17,
    name: "Mr. Benjamin Torres",
    position: "REHABILITATION AND RECOVERY",
    department: "(MAO - Lead)",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  }
]

export default function DRRMCCouncilPage() {
  const [expandedSections, setExpandedSections] = useState({
    leadership: true,
    viceChairs: true,
    clusters: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const leadership = councilData.slice(0, 2)
  const viceChairs = councilData.slice(2, 6)
  const clusters = councilData.slice(6)

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="bg-blue-950 text-white py-12 md:py-16 relative overflow-hidden">
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  MDRRMC <span className="text-yellow-500">Organizational Chart</span>
                </h1>
                <p className="text-lg md:text-xl mb-6">Municipal Disaster Risk Reduction and Management Council</p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold text-sm md:text-base">
                    <MapPin className="inline mr-2 w-4 h-4" />
                    Pio Duran, Albay
                  </div>
                  <div className="bg-blue-800 px-4 py-2 rounded-full font-semibold text-sm md:text-base">
                    <Building className="inline mr-2 w-4 h-4" />
                    Official Structure
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-yellow-500 rounded-full opacity-20 absolute -top-4 -left-4"></div>
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-950 rounded-full opacity-20 absolute -bottom-4 -right-4"></div>
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 md:border-8 border-yellow-500">
                    <Image
                      src="/images/design-mode/pioduran_seal_official_fhmwac.webp"
                      alt="MDRRMC"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:py-12">
          {/* Introduction */}
          <section className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950 mb-4">Organizational Structure</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              The Municipal Disaster Risk Reduction and Management Council (MDRRMC) of Pio Duran, Albay is structured to
              ensure effective coordination and response during disaster situations.
            </p>
            <div className="bg-blue-50 border-l-4 border-yellow-500 p-4 md:p-6 rounded-lg max-w-4xl mx-auto">
              <p className="text-gray-700 text-sm md:text-base">
                This organizational chart illustrates the hierarchical structure and functional clusters of the MDRRMC,
                showing the flow of authority and responsibility from leadership down to operational units.
              </p>
            </div>
          </section>

          {/* Organizational Chart Sections */}
          <section className="mb-12">
            {/* Leadership Section */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection('leadership')}
                className="w-full flex items-center justify-between p-4 bg-blue-950 text-white rounded-lg mb-4"
              >
                <h3 className="text-lg md:text-xl font-bold">Leadership</h3>
                {expandedSections.leadership ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.leadership && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leadership.map((member) => (
                    <div key={member.id} className="bg-white border-2 border-blue-950 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 mb-1">{member.name}</div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-yellow-500">{member.position}</h3>
                      <p className="font-semibold text-gray-700">{member.department}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vice Chairpersons Section */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection('viceChairs')}
                className="w-full flex items-center justify-between p-4 bg-yellow-500 text-blue-950 rounded-lg mb-4"
              >
                <h3 className="text-lg md:text-xl font-bold">Vice Chairpersons</h3>
                {expandedSections.viceChairs ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.viceChairs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {viceChairs.map((member) => (
                    <div key={member.id} className="bg-white border-2 border-yellow-500 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 text-sm mb-1">{member.name}</div>
                      <h3 className="text-base font-bold mb-1 text-yellow-500">{member.position}</h3>
                      <p className="font-semibold text-gray-700 text-xs">{member.department}</p>
                      {member.role && <p className="text-xs text-gray-600 mt-1">{member.role}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cluster Members Section */}
            <div>
              <button
                onClick={() => toggleSection('clusters')}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-blue-950 text-blue-950 rounded-lg mb-4"
              >
                <h3 className="text-lg md:text-xl font-bold">Cluster Members</h3>
                {expandedSections.clusters ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.clusters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clusters.map((member) => (
                    <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 text-sm mb-1">{member.name}</div>
                      <h3 className="text-base font-bold mb-1 text-yellow-500">{member.position}</h3>
                      <p className="font-semibold text-gray-700 text-xs">{member.department}</p>
                      {member.subDepartment && <p className="text-xs text-gray-600 mt-1">{member.subDepartment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Key Information Section */}
          <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">Organizational Guidelines</h2>
              <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-950">
                <div className="text-blue-950 mb-3">
                  <Network className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Hierarchical Structure</h3>
                <p className="text-gray-700 text-sm">
                  The organizational chart follows a clear hierarchical structure with defined lines of authority from the
                  Chairperson down to operational clusters.
                </p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                <div className="text-yellow-600 mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Functional Clusters</h3>
                <p className="text-gray-700 text-sm">
                  Eleven specialized clusters ensure comprehensive coverage of all disaster management aspects, each led
                  by the appropriate department.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-950">
                <div className="text-blue-950 mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Coordination Mechanism</h3>
                <p className="text-gray-700 text-sm">
                  Clear communication channels and reporting mechanisms ensure effective coordination during emergency
                  response operations.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="bg-blue-950 text-white rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
                  <CheckCircle className="text-blue-950 w-8 h-8" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4">Implementation Notes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0 w-5 h-5" />
                    <span className="text-sm md:text-base">All positions are filled by designated municipal officials as per RA 10121</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0 w-5 h-5" />
                    <span className="text-sm md:text-base">Cluster leads coordinate with their respective department heads during emergencies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0 w-5 h-5" />
                    <span className="text-sm md:text-base">Regular drills and training sessions ensure operational readiness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0 w-5 h-5" />
                    <span className="text-sm md:text-base">Annual review and update of organizational structure based on lessons learned</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
