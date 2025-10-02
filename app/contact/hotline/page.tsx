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
  LucideTriangle as ExclamationTriangle,
} from "lucide-react"

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
    },
    {
      name: "Police",
      description: "Philippine National Police",
      number: "117",
      altNumber: "(052) 456-7890",
      icon: Shield,
      color: "bg-blue-950",
    },
    {
      name: "Medical",
      description: "Municipal Health Office",
      number: "(052) 345-6789",
      altNumber: null,
      icon: Hospital,
      color: "bg-red-500",
    },
    {
      name: "Fire Department",
      description: "Bureau of Fire Protection",
      number: "(052) 567-8901",
      altNumber: null,
      icon: Flame,
      color: "bg-orange-500",
    },
    {
      name: "Coast Guard",
      description: "Philippine Coast Guard",
      number: "(052) 678-9012",
      altNumber: null,
      icon: Anchor,
      color: "bg-blue-600",
    },
    {
      name: "Social Welfare",
      description: "Department of Social Welfare and Development",
      number: "1343",
      altNumber: null,
      icon: Heart,
      color: "bg-green-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center animate-bounce">
              <Phone className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Emergency Hotline Numbers</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immediate access to emergency services in the Municipality of Pio Duran. Save these numbers for quick
            reference during emergencies.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-12 text-white text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ExclamationTriangle className="text-yellow-300 w-6 h-6 mr-3 animate-pulse" />
              <h2 className="text-2xl font-bold">Emergency Notice</h2>
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <p>
                In case of life-threatening emergencies, dial <span className="font-bold">911</span> immediately
              </p>
            </div>
          </div>
        </div>

        {/* Hotline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hotlines.map((hotline, index) => {
            const IconComponent = hotline.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-500 hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`${hotline.color} w-16 h-16 rounded-lg flex items-center justify-center mr-4`}>
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-950">{hotline.name}</h3>
                      <p className="text-gray-600 text-sm">{hotline.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-950 mb-4">
                    {hotline.number}
                    {hotline.altNumber && <div className="text-lg text-gray-600">/ {hotline.altNumber}</div>}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={`tel:${hotline.number}`}
                      className="flex-1 bg-blue-950 hover:bg-blue-800 text-white py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(hotline.number)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-blue-950 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-500 mb-12">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex items-start mb-4 md:mb-0 md:mr-6">
                <div className="bg-blue-950 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
                  <Building className="text-yellow-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-950">Office of the Mayor</h3>
                  <p className="text-gray-600">Municipal Government Office</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-950 md:ml-auto mb-4 md:mb-0">(052) 123-4567</div>
              <div className="flex space-x-3 md:ml-6">
                <a
                  href="tel:0521234567"
                  className="bg-blue-950 hover:bg-blue-800 text-white py-3 px-6 rounded-lg flex items-center transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Call</span>
                </a>
                <button
                  onClick={() => copyToClipboard("(052) 123-4567")}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 py-3 px-6 rounded-lg flex items-center transition-colors duration-200"
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
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                <ExclamationTriangle className="text-blue-950 w-10 h-10" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h2 className="text-2xl font-bold mb-4">Important Information</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span>Save these numbers in your phone for quick access during emergencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span>When calling emergency services, stay calm and provide clear information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span>Use SMS when voice calls are not possible or network is congested</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span>For non-emergency inquiries, contact the respective office during business hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">How to Use Emergency Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-950 w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Voice Call</h3>
              <p className="text-gray-600">Tap the "Call" button to immediately connect to the emergency service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-blue-950 w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Copy Number</h3>
              <p className="text-gray-600">Tap "Copy" to save the number to your clipboard for easy sharing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangle className="text-red-600 w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2">Emergency Protocol</h3>
              <p className="text-gray-600">For life-threatening situations, always dial 911 first</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
