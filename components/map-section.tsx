"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("./map-container"), {
  ssr: false,
  loading: () => (
    <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
})

export default function MapSection() {
  // State for toggle switches
  type LayerName =
    | "evacuationCenters"
    | "governmentFacilities"
    | "schools"
    | "markets"
    | "transportation"
    | "hazardZones"

  const [layers, setLayers] = useState<Record<LayerName, boolean>>({
    evacuationCenters: true,
    governmentFacilities: true,
    schools: true,
    markets: true,
    transportation: true,
    hazardZones: true,
  })

  // Evacuation center statistics
  const totalEvacuationCenters = 36
  const totalCapacity = 3465
  const averageCapacity = Math.round(totalCapacity / totalEvacuationCenters)

  // Toggle layer visibility
  const toggleLayer = (layerName: LayerName) => {
    setLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }

  // Simple switch component
  const Switch = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would search locations
    console.log("[v0] Map search functionality triggered")
  }

  return (
    <section id="map-section" className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Interactive Community Map
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Pio Duran, Albay with our comprehensive interactive map featuring all {totalEvacuationCenters}{" "}
            evacuation centers, hazard zones, and emergency services.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Evacuation Centers</p>
                <p className="text-3xl font-bold text-blue-600">{totalEvacuationCenters}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Capacity</p>
                <p className="text-3xl font-bold text-green-600">{totalCapacity.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Average Capacity</p>
                <p className="text-3xl font-bold text-orange-600">{averageCapacity}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Map Controls
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Map Layers
                </h3>
                <div className="space-y-2">
                  <Switch
                    checked={layers.evacuationCenters}
                    onChange={() => toggleLayer("evacuationCenters")}
                    label="Evacuation Centers"
                  />
                  <Switch
                    checked={layers.governmentFacilities}
                    onChange={() => toggleLayer("governmentFacilities")}
                    label="Government Facilities"
                  />
                  <Switch checked={layers.schools} onChange={() => toggleLayer("schools")} label="Schools" />
                  <Switch checked={layers.markets} onChange={() => toggleLayer("markets")} label="Markets" />
                  <Switch
                    checked={layers.transportation}
                    onChange={() => toggleLayer("transportation")}
                    label="Transportation"
                  />
                  <Switch
                    checked={layers.hazardZones}
                    onChange={() => toggleLayer("hazardZones")}
                    label="Hazard Zones"
                  />
                </div>
              </div>


              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Map Tips
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click markers for details</li>
                  <li>• Toggle layers to customize view</li>
                  <li>• Zoom in for more accuracy</li>
                  <li>• Use search to find locations</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <MapContainer layers={layers} />
            <div className="mt-6 bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">About This Map</p>
                  <p className="text-sm text-gray-600">
                    This interactive map displays all {totalEvacuationCenters} official evacuation centers across Pio
                    Duran, Albay, with a combined capacity of {totalCapacity.toLocaleString()} persons. The map also
                    shows hazard-prone zones, government facilities, schools, markets, and transportation hubs to help
                    you prepare for emergencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border border-red-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Emergency Hotlines</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Contact emergency services immediately</p>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600">MSWD Pio DUran</p>
                  <p className="text-lg font-bold text-red-600">0122-345-6789</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-600">Municipal Emergency Response</p>
                  <p className="text-lg font-bold text-red-600">(639123456789)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Nearest Evacuation Center</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Find the closest safe location</p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900">SLTCFPDI</p>
                <p className="text-xs text-gray-600 mt-1">Capacity: 190 persons</p>
                <p className="text-xs text-gray-500 mt-2">Click map markers for directions</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Preparedness Guide</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">Essential emergency information</p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block bg-white rounded-lg p-3 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-blue-700">Emergency Go-Bag Checklist</p>
                  <p className="text-xs text-gray-500 mt-1">Download PDF →</p>
                </a>
                <a
                  href="#"
                  className="block bg-white rounded-lg p-3 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-blue-700">Family Emergency Plan</p>
                  <p className="text-xs text-gray-500 mt-1">View Guide →</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
