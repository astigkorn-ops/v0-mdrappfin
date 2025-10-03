"use client"

import { useState } from "react"
import { 
  MapPin, 
  Building, 
  Users, 
  Network, 
  ChevronDown,
  ChevronUp,
  User,
  Shield,
  AlertTriangle
} from "lucide-react"
import Image from "next/image"

interface Personnel {
  id: number
  name: string
  position: string
  department?: string
  role?: string
  level: 'leadership' | 'management' | 'core' | 'emergency'
  image: string
}

const personnelData: Personnel[] = [
  // Leadership
  {
    id: 1,
    name: "HON. EVANGELINE C. ARANDIA",
    position: "Municipal Mayor",
    level: "leadership",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 2,
    name: "NOEL F. ORDONA",
    position: "MDRRMO Head",
    level: "management",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  // Core Staff
  {
    id: 3,
    name: "JUAN DELA CRUZ",
    position: "Administration and Training",
    level: "core",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 4,
    name: "MARIA SANTOS",
    position: "Research and Planning",
    level: "core",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 5,
    name: "PEDRO GONZALEZ",
    position: "Operations and Warning",
    level: "core",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  // Emergency Response Team
  {
    id: 6,
    name: "CARLOS REYES",
    position: "RESCUE OPERATOR",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 7,
    name: "ANA TORRES",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 8,
    name: "LUIS RAMIREZ",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 9,
    name: "ELENA MORENO",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 10,
    name: "ROBERTO VARGAS",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 11,
    name: "SOFIA CRUZ",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 12,
    name: "MIGUEL FERNANDEZ",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 13,
    name: "ISABELLA LIM",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  },
  {
    id: 14,
    name: "DIEGO SANTOS",
    position: "EMERGENCY MEDICAL TECHNICIAN",
    level: "emergency",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  }
]

export default function MDRRMOPersonnelPage() {
  const [expandedSections, setExpandedSections] = useState({
    leadership: true,
    management: true,
    core: true,
    emergency: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const leadership = personnelData.filter(p => p.level === 'leadership')
  const management = personnelData.filter(p => p.level === 'management')
  const core = personnelData.filter(p => p.level === 'core')
  const emergency = personnelData.filter(p => p.level === 'emergency')

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
                  MDRRMO <span className="text-yellow-500">Personnel</span>
                </h1>
                <p className="text-lg md:text-xl mb-6">Municipal Disaster Risk Reduction and Management Office</p>
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
                      alt="MDRRMO"
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950 mb-4">Personnel Structure</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Pio Duran, Albay is structured to
              ensure effective coordination and response during disaster situations.
            </p>
            <div className="bg-blue-50 border-l-4 border-yellow-500 p-4 md:p-6 rounded-lg max-w-4xl mx-auto">
              <p className="text-gray-700 text-sm md:text-base">
                This organizational chart illustrates the hierarchical structure of the MDRRMO, showing the flow of
                authority and responsibility from leadership down to operational units.
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
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <h3 className="text-lg md:text-xl font-bold">Leadership</h3>
                </div>
                {expandedSections.leadership ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.leadership && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leadership.map((person) => (
                    <div key={person.id} className="bg-white border-2 border-blue-950 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 mb-1">{person.name}</div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-yellow-500">{person.position}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Management Section */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection('management')}
                className="w-full flex items-center justify-between p-4 bg-yellow-500 text-blue-950 rounded-lg mb-4"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <h3 className="text-lg md:text-xl font-bold">Management</h3>
                </div>
                {expandedSections.management ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.management && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {management.map((person) => (
                    <div key={person.id} className="bg-white border-2 border-yellow-500 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 mb-1">{person.name}</div>
                      <h3 className="text-lg font-bold mb-2 text-yellow-500">{person.position}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Staff Section */}
            <div className="mb-8">
              <button
                onClick={() => toggleSection('core')}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-blue-950 text-blue-950 rounded-lg mb-4"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <h3 className="text-lg md:text-xl font-bold">Core Staff</h3>
                </div>
                {expandedSections.core ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.core && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {core.map((person) => (
                    <div key={person.id} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 text-sm mb-1">{person.name}</div>
                      <h3 className="text-base font-bold mb-1 text-yellow-500">{person.position}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Response Team Section */}
            <div>
              <button
                onClick={() => toggleSection('emergency')}
                className="w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-500 text-red-700 rounded-lg mb-4"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-lg md:text-xl font-bold">Emergency Response Team</h3>
                </div>
                {expandedSections.emergency ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
                }
              </button>
              
              {expandedSections.emergency && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {emergency.map((person) => (
                    <div key={person.id} className="bg-white border border-red-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold text-blue-950 text-sm mb-1">{person.name}</div>
                      <div className="text-red-600 text-xs font-semibold">{person.position}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Key Information Section */}
          <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">Organizational Overview</h2>
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
                  Municipal Mayor down to operational units.
                </p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                <div className="text-yellow-600 mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Specialized Units</h3>
                <p className="text-gray-700 text-sm">
                  Four distinct levels ensure comprehensive coverage of all disaster management aspects with specialized
                  roles and responsibilities.
                </p>
              </div>

              <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-500">
                <div className="text-red-600 mb-3">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Emergency Readiness</h3>
                <p className="text-gray-700 text-sm">
                  Dedicated emergency response team ensures rapid deployment and effective response during critical
                  situations.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
