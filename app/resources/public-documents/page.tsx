"use client"

import { useState } from "react"
import { Download, ExternalLink, FileText, X } from "lucide-react"

interface Document {
  title: string
  description: string
  type: "form" | "infographic" | "map"
}

const documents: Document[] = [
  {
    title: "Family Evacuation Plan Template",
    description: "A printable template to help your family plan and practice your evacuation strategy.",
    type: "form",
  },
  {
    title: "Emergency Go-Bag Checklist",
    description: "A comprehensive checklist of essential items to include in your emergency preparedness kit.",
    type: "form",
  },
  {
    title: "Barangay Incident Report Form",
    description: "Official form for barangay officials to report local incidents and request assistance.",
    type: "form",
  },
]

const infographics = ["Understanding Typhoon Signals", "Flood Safety Guidelines", "Earthquake Preparedness"]

const maps = ["Pio Duran Flood Hazard Map", "Landslide Prone Areas Map", "Evacuation Centers Map"]

const agencies = [
  {
    name: "PAGASA (Philippine Atmospheric, Geophysical and Astronomical Services Administration)",
    url: "https://www.pagasa.dost.gov.ph/",
  },
  {
    name: "PHIVOLCS (Philippine Institute of Volcanology and Seismology)",
    url: "https://www.phivolcs.dost.gov.ph/",
  },
  {
    name: "NDRRMC (National Disaster Risk Reduction and Management Council)",
    url: "https://ndrrmc.gov.ph/",
  },
  {
    name: "Philippine Red Cross",
    url: "https://redcross.org.ph/",
  },
]

export default function PublicDocuments() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)

  const handleDownload = (title: string) => {
    alert(`Downloading ${title}...`)
  }

  const openMapModal = (mapName: string) => {
    setSelectedMap(mapName)
  }

  const closeMapModal = () => {
    setSelectedMap(null)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">MDRRMO Resource Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empower yourself and your family with the right information. Here you can find downloadable forms,
            educational guides, and links to key national agencies.
          </p>
        </div>

        {/* Downloadable Forms & Documents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-8 pb-2 border-b-2 border-yellow-500 inline-block">
            Downloadable Forms
          </h2>
          <div className="space-y-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-yellow-500 text-3xl">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-blue-950 mb-2">{doc.title}</h3>
                  <p className="text-gray-600">{doc.description}</p>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-2 px-6 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Materials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-8 pb-2 border-b-2 border-yellow-500 inline-block">
            Educational Infographics & Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infographics.map((title, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500 m-4">
                  Infographic Thumbnail
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-950 mb-3">{title}</h3>
                  <button
                    onClick={() => handleDownload(title)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-2 px-4 rounded-lg transition-all hover:-translate-y-0.5"
                  >
                    View/Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hazard & Evacuation Maps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-8 pb-2 border-b-2 border-yellow-500 inline-block">
            Hazard & Evacuation Maps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maps.map((mapName, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  onClick={() => openMapModal(mapName)}
                  className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition-colors m-4"
                >
                  Map Thumbnail
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-950 mb-3">{mapName}</h3>
                  <button
                    onClick={() => openMapModal(mapName)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-2 px-4 rounded-lg transition-all hover:-translate-y-0.5"
                  >
                    View Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Agency Links */}
        <section>
          <h2 className="text-3xl font-bold text-blue-950 mb-8 pb-2 border-b-2 border-yellow-500 inline-block">
            Links to National Agencies
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {agencies.map((agency, index) => (
                <li key={index}>
                  <a
                    href={agency.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-950 hover:text-yellow-500 transition-colors group"
                  >
                    <span className="font-medium text-lg">{agency.name}</span>
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Map Modal */}
      {selectedMap && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-blue-950">{selectedMap}</h3>
              <button onClick={closeMapModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500 mb-6">
                {selectedMap} Preview
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleDownload(selectedMap)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Map
                </button>
                <button
                  onClick={closeMapModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
