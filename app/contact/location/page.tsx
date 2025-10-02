"use client"

import { useState } from "react"
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Bus,
  CheckCircle,
  Navigation,
  Building,
  School,
  Hospital,
  Store,
} from "lucide-react"

export default function LocationPage() {
  const [showDirections, setShowDirections] = useState(false)

  const landmarks = [
    { name: "Sto. Domingo Church", icon: Building },
    { name: "Pio Duran Central School", icon: School },
    { name: "Rural Health Unit", icon: Hospital },
    { name: "Public Market", icon: Store },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center animate-bounce">
              <MapPin className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Our Location</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find us at the Municipal Hall of Pio Duran, Albay. We're here to serve you and keep our community safe.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Location Information */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">MDRRMO Office</h2>
              <p>Municipal Disaster Risk Reduction and Management Office</p>
            </div>

            <div className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-3 border-transparent hover:border-yellow-500">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Building className="text-blue-950 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Municipal Hall Complex
                      <br />
                      Pio Duran, Albay 4505
                      <br />
                      Philippines
                    </p>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-3 border-transparent hover:border-yellow-500">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Navigation className="text-blue-950 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950 mb-1">Coordinates</h3>
                    <p className="text-gray-600">
                      Latitude: 13.0293° N<br />
                      Longitude: 123.4450° E
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-3 border-transparent hover:border-yellow-500">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="text-blue-950 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 8:00 AM - 12:00 PM
                      <br />
                      Sunday: Closed (Emergency Hotline: 24/7)
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-3 border-transparent hover:border-yellow-500">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-blue-950 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950 mb-1">Contact Information</h3>
                    <p className="text-gray-600">
                      Phone: (052) 234-5678
                      <br />
                      Emergency Hotline: 911
                      <br />
                      Email: mdrrmo@pioduran.gov.ph
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 text-blue-950">
              <h2 className="text-2xl font-bold mb-2">Office Location</h2>
              <p>Find us on the map</p>
            </div>

            <div className="p-6 md:p-8">
              <div className="bg-gray-200 rounded-2xl h-96 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">13.0293° N, 123.4450° E</p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    window.open("https://www.google.com/maps/dir/?api=1&destination=13.0293,123.4450", "_blank")
                  }
                  className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Directions Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">How to Reach Us</h2>
            <p>Directions from major landmarks</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* By Public Transport */}
              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
                  <Bus className="mr-3 text-yellow-500 w-6 h-6" />
                  By Public Transport
                </h3>
                <div className="space-y-4">
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">From Legazpi City</h4>
                    <p className="text-gray-600 text-sm">
                      Take the Pio Duran-bound jeepney from Legazpi Grand Terminal
                    </p>
                  </div>
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Travel Time</h4>
                    <p className="text-gray-600 text-sm">Approximately 45 minutes to 1 hour depending on traffic</p>
                  </div>
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Drop-off Point</h4>
                    <p className="text-gray-600 text-sm">Get off at Pio Duran Municipal Hall stop</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Final Steps</h4>
                    <p className="text-gray-600 text-sm">Walk 200 meters north towards the Municipal Hall complex</p>
                  </div>
                </div>
              </div>

              {/* By Private Vehicle */}
              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
                  <Car className="mr-3 text-yellow-500 w-6 h-6" />
                  By Private Vehicle
                </h3>
                <div className="space-y-4">
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">From Legazpi City</h4>
                    <p className="text-gray-600 text-sm">Take the Maharlika Highway (AH26) northbound</p>
                  </div>
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Distance</h4>
                    <p className="text-gray-600 text-sm">Approximately 35 kilometers</p>
                  </div>
                  <div className="relative pl-8 pb-4">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Travel Time</h4>
                    <p className="text-gray-600 text-sm">Approximately 40-50 minutes</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-950"></div>
                    <h4 className="font-semibold text-gray-900">Landmarks</h4>
                    <p className="text-gray-600 text-sm">
                      Pass by Sto. Domingo Church, then turn left at Pio Duran junction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-red-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Emergency Hotline</h3>
            <p className="text-2xl font-bold text-red-600 mb-3">911</p>
            <p className="text-gray-600 text-sm">For immediate emergency response</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-blue-950 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Office Phone</h3>
            <p className="text-2xl font-bold text-blue-950 mb-3">(052) 234-5678</p>
            <p className="text-gray-600 text-sm">During office hours</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-yellow-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Email Us</h3>
            <p className="text-lg font-bold text-blue-950 mb-3">mdrrmo@pioduran.gov.ph</p>
            <p className="text-gray-600 text-sm">For non-urgent inquiries</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 text-blue-950">
            <h2 className="text-2xl font-bold mb-2">Additional Information</h2>
            <p>Helpful details for your visit</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-4">Parking Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Free parking available at Municipal Hall complex</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Designated spaces for persons with disabilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Motorcycle parking area near main entrance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-4">Accessibility</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Ramp access for wheelchair users</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Elevator access to all floors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <span>Accessible restrooms available</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-blue-950 mb-4">Nearby Landmarks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {landmarks.map((landmark, index) => {
                  const IconComponent = landmark.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3">
                        <IconComponent className="text-yellow-500 w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{landmark.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
