"use client"

import { useState } from "react"
import {
  Phone,
  MessageSquare,
  Shield,
  Hospital,
  Flame,
  Anchor,
  Heart,
  Building,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"

export default function HotlinePage() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)

  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number)
    setCopiedNumber(number)
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  const hotlines = [
    {
      name: "MDRRMO",
      description: "Municipal Disaster Risk Reduction and Management Office",
      number: "911",
      altNumber: "(052) 234-5678",
      icon: Shield,
      color: "bg-blue-950",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628070/mdrrmo_pioduran__logo_pu6yid.webp"
    },
    {
      name: "Police",
      description: "Philippine National Police",
      number: "117",
      altNumber: "(052) 456-7890",
      icon: Shield,
      color: "bg-blue-950",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1753255298/PNP_PIODURAN_pizxgh.webp"
    },
    {
      name: "Medical",
      description: "Municipal Health Office",
      number: "(052) 345-6789",
      altNumber: null,
      icon: Hospital,
      color: "bg-red-500",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1753255299/PIODURAN_SEAL_riahyf.webp"
    },
    {
      name: "Fire Department",
      description: "Bureau of Fire Protection",
      number: "(052) 567-8901",
      altNumber: null,
      icon: Flame,
      color: "bg-orange-500",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1753255310/BFP_PIO_DURAN_copy_jbgotc.webp"
    },
    {
      name: "Coast Guard",
      description: "Philippine Coast Guard",
      number: "(052) 678-9012",
      altNumber: null,
      icon: Anchor,
      color: "bg-blue-600",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1753255299/PIODURAN_SEAL_riahyf.webp"
    },
    {
      name: "Social Welfare",
      description: "Department of Social Welfare and Development",
      number: "1343",
      altNumber: null,
      icon: Heart,
      color: "bg-green-500",
      logo: "https://res.cloudinary.com/dedcmctqk/image/upload/v1753255299/PIODURAN_SEAL_riahyf.webp"
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans py-8 md:py-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-950 rounded-full flex items-center justify-center">
              <Phone className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">Emergency Hotline Numbers</h1>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Immediate access to emergency services in the Municipality of Pio Duran. Save these numbers for quick
            reference during emergencies.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-8 md:mb-12 text-white text-center shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertTriangle className="text-yellow-300 w-6 h-6 mr-3 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold">Emergency Notice</h2>
            </div>
            <div className="md:ml-6 text-center md:text-left mt-2 md:mt-0">
              <p>
                In case of life-threatening emergencies, dial <span className="font-bold">911</span> immediately
              </p>
            </div>
          </div>
        </div>

        {/* Hotline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
          {hotlines.map((hotline, index) => {
            const IconComponent = hotline.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start mb-4">
                    <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                      <Image
                        src={hotline.logo}
                        alt={`${hotline.name} Logo`}
                        width={64}
                        height={64}
                        className="rounded-lg object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-blue-950">{hotline.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{hotline.description}</p>
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-blue-950 mb-4">
                    {hotline.number}
                    {hotline.altNumber && <div className="text-base md:text-lg text-gray-600 mt-1">/ {hotline.altNumber}</div>}
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${hotline.number.replace(/[^\d]/g, '')}`}
                      className="flex-1 bg-blue-950 hover:bg-blue-800 text-white py-2 md:py-3 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(hotline.number)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-blue-950 py-2 md:py-3 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm"
                    >
                      {copiedNumber === hotline.number ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mayor's Office */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-8 md:mb-12">
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex items-start mb-4 md:mb-0 md:mr-6">
                <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                  <Image
                    src="/images/design-mode/PIODURAN_SEAL_riahyf.webp"
                    alt="Mayor's Office Logo"
                    width={64}
                    height={64}
                    className="rounded-lg object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-blue-950">Office of the Mayor</h3>
                  <p className="text-gray-600 text-sm">Municipal Government Office</p>
                </div>
              </div>
              <div className="text-xl md:text-2xl font-bold text-blue-950 md:ml-auto mb-4 md:mb-0">(052) 123-4567</div>
              <div className="flex space-x-2 md:ml-6 w-full md:w-auto">
                <a
                  href="tel:0521234567"
                  className="flex-1 bg-blue-950 hover:bg-blue-800 text-white py-2 md:py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Call</span>
                </a>
                <button
                  onClick={() => copyToClipboard("(052) 123-4567")}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-blue-950 py-2 md:py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm"
                >
                  {copiedNumber === "(052) 123-4567" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-blue-950 w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Important Information</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">Save these numbers in your phone for quick access during emergencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">When calling emergency services, stay calm and provide clear information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">Use SMS when voice calls are not possible or network is congested</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">For non-emergency inquiries, contact the respective office during business hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-950 mb-6 text-center">How to Use Emergency Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-950 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Voice Call</h3>
              <p className="text-gray-600 text-sm">Tap the "Call" button to immediately connect to the emergency service</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-blue-950 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Copy Number</h3>
              <p className="text-gray-600 text-sm">Tap "Copy" to save the number to your clipboard for easy sharing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Emergency Protocol</h3>
              <p className="text-gray-600 text-sm">For life-threatening situations, always dial 911 first</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
