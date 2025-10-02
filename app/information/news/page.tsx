"use client"

import { useState } from "react"
import BackToTop from "@/components/back-to-top"

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filters = ["All", "Weather Alerts", "Public Advisories", "Drill Reports", "Announcements"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-950 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">News & Advisories</h1>
          <p className="text-xl text-blue-100">Official updates and emergency alerts from MDRRMO Pio Duran</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Hero Banner */}
            <div className="bg-red-600 text-white p-6 rounded-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-white"></div>
              <h2 className="text-2xl font-bold mb-4">🔴 URGENT: Tropical Storm Approaching</h2>
              <p className="mb-4 text-lg">
                Residents in low-lying areas are advised to evacuate immediately. Heavy rainfall and strong winds
                expected within 24 hours.
              </p>
              <button className="bg-blue-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Read Full Advisory
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-950 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
              <div className="ml-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="space-y-6">
              {/* News Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-users text-4xl mb-2"></i>
                    <p className="font-semibold">Flood Evacuation Drill 2023</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    Drill Update
                  </span>
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    <a href="#" className="hover:text-blue-700">
                      Successful Flood Evacuation Drill Conducted
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    MDRRMO Pio Duran successfully conducted the annual flood evacuation drill with participation from 15
                    barangays. Over 2,000 residents practiced evacuation procedures.
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      <i className="far fa-calendar mr-1"></i> Oct 15, 2023
                    </span>
                    <span>
                      <i className="far fa-user mr-1"></i> Admin
                    </span>
                  </div>
                  <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    Read More
                  </button>
                </div>
              </div>

              {/* News Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-cloud-rain text-4xl mb-2"></i>
                    <p className="font-semibold">Typhoon Season Advisory</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    Weather Alert
                  </span>
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    <a href="#" className="hover:text-blue-700">
                      Typhoon Season Preparedness Advisory
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    With typhoon season approaching, residents are reminded to prepare emergency kits and secure their
                    properties. Evacuation centers are ready for immediate use.
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      <i className="far fa-calendar mr-1"></i> Oct 12, 2023
                    </span>
                    <span>
                      <i className="far fa-user mr-1"></i> Admin
                    </span>
                  </div>
                  <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    Read More
                  </button>
                </div>
              </div>

              {/* News Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-yellow-500 to-yellow-400 flex items-center justify-center">
                  <div className="text-center text-blue-950">
                    <i className="fas fa-graduation-cap text-4xl mb-2"></i>
                    <p className="font-semibold">Earthquake Safety Seminar</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    Public Advisory
                  </span>
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    <a href="#" className="hover:text-blue-700">
                      Earthquake Safety Seminar for Schools
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    MDRRMO conducted earthquake safety seminars for all public schools in Pio Duran. Teachers and
                    students learned proper evacuation and safety protocols.
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      <i className="far fa-calendar mr-1"></i> Oct 10, 2023
                    </span>
                    <span>
                      <i className="far fa-user mr-1"></i> Admin
                    </span>
                  </div>
                  <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    Read More
                  </button>
                </div>
              </div>

              {/* News Card 4 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-tools text-4xl mb-2"></i>
                    <p className="font-semibold">New Emergency Equipment</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    Announcement
                  </span>
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    <a href="#" className="hover:text-blue-700">
                      New Emergency Equipment Procurement
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The office has acquired new emergency response equipment including rescue boats, first aid kits, and
                    communication devices to enhance disaster response capabilities.
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      <i className="far fa-calendar mr-1"></i> Oct 8, 2023
                    </span>
                    <span>
                      <i className="far fa-user mr-1"></i> Admin
                    </span>
                  </div>
                  <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors">
                Load More News
              </button>
            </div>
          </div>

          <div className="lg:w-1/3">
            {/* News Archive Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b-2 border-yellow-500">Browse by Date</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    October 2023
                  </a>
                  <span className="text-gray-500">12 articles</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    September 2023
                  </a>
                  <span className="text-gray-500">8 articles</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    August 2023
                  </a>
                  <span className="text-gray-500">15 articles</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    July 2023
                  </a>
                  <span className="text-gray-500">7 articles</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    June 2023
                  </a>
                  <span className="text-gray-500">10 articles</span>
                </div>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b-2 border-yellow-500">Categories</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    Weather Alerts
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">24</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    Public Advisories
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">18</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    Drill Reports
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">12</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    Announcements
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">9</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <a href="#" className="text-gray-700 hover:text-blue-950">
                    Training Updates
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">7</span>
                </div>
              </div>
            </div>

            {/* Subscribe Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b-2 border-yellow-500">Get Notified</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-blue-950 transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-blue-950 transition-colors"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-blue-950 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-yellow-500">Emergency Contacts</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">MDRRMO Hotline</p>
                  <p className="text-blue-200">(054) 123-4567</p>
                </div>
                <div>
                  <p className="font-semibold">Municipal Mayor</p>
                  <p className="text-blue-200">(054) 123-4568</p>
                </div>
                <div>
                  <p className="font-semibold">Pio Duran PNP</p>
                  <p className="text-blue-200">0917-123-4569</p>
                </div>
                <div>
                  <p className="font-semibold">Ambulance</p>
                  <p className="text-blue-200">161 / 117</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}
