"use client";
import React, { useState } from 'react';
import { Menu, X, Search, Bell, User, Home, MapPin, Clock, Calendar, AlertTriangle, Cloud } from 'lucide-react';

const WeatherEarthquakeDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Live Weather and Earthqauke Information Monitoring Dashboard</h2>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Real-time Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PAGASA Column - Weather Monitoring */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* PAGASA Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <img src="https://placehold.co/40x40/0066cc/ffffff?text=P" alt="PAGASA Logo" className="h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PAGASA Weather Services</h3>
                    <p className="text-blue-100 text-sm">Live Update from https://panahon.gov.ph</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="bg-white p-1 rounded">
                    <img src="https://placehold.co/60x40/0066cc/ffffff?text=DOST" alt="Gov Logo" className="h-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Website Frame */}
            <div className="p-1 bg-gray-100">
              <div className="bg-white border border-gray-300 overflow-hidden">

                <iframe 
                  src="https://panahon.gov.ph" 
                  className="w-full h-96 border-0"
                  title="PAGASA Weather Portal"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </div>

            {/* PAGASA Additional Info */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Weather Services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Current Weather</h5>
                  <p className="text-sm text-gray-600">Real-time weather conditions across the Philippines</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Forecast</h5>
                  <p className="text-sm text-gray-600">7-day weather forecasts for major cities</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Warnings</h5>
                  <p className="text-sm text-gray-600">Weather advisories and storm signals</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Climate Data</h5>
                  <p className="text-sm text-gray-600">Historical climate information and trends</p>
                </div>
              </div>
            </div>
          </div>

          {/* Earthquake frame */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* PHIVOLCS Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <img src="https://placehold.co/40x40/cc0000/ffffff?text=V" alt="PHIVOLCS Logo" className="h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">HazardHunterPh</h3>
                    <p className="text-red-100 text-sm">Earthquake Monitoring by: GeoRiskPh</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="bg-white p-1 rounded">
                    <img src="https://placehold.co/60x40/cc0000/ffffff?text=DOST" alt="Gov Logo" className="h-10" />
                  </div>
                </div>
              </div>
            </div>
 {/* Weather Website Frame */}
            <div className="p-1 bg-gray-100">
              <div className="bg-white border border-gray-300 overflow-hidden">

                <iframe 
                  src="https://hazardhunter.georisk.gov.ph/monitoring/earthquake" 
                  className="w-full h-96 border-0"
                  title="PAGASA Weather Portal"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </div>
            {/* PHIVOLCS Website Frame */}
           

            {/* PHIVOLCS Additional Info */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Seismic Services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Earthquake List</h5>
                  <p className="text-sm text-gray-600">Latest earthquake events and magnitudes</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Seismic Network</h5>
                  <p className="text-sm text-gray-600">Real-time seismic station data</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Volcano Updates</h5>
                  <p className="text-sm text-gray-600">Active volcano status and alerts</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-medium text-gray-900 mb-2">Tsunami Info</h5>
                  <p className="text-sm text-gray-600">Tsunami warnings and preparedness</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <a href="https://www.pagasa.dost.gov.ph/" className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Weather Forecast</div>
                <div className="text-sm text-gray-500">7-day predictions</div>
              </div>
            </a>
            <a href="https://earthquake.phivolcs.dost.gov.ph/" className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Earthquake List</div>
                <div className="text-sm text-gray-500">Latest events</div>
              </div>
            </a>
            <a href="https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin" className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Storm Tracking</div>
                <div className="text-sm text-gray-500">Typhoon paths</div>
              </div>
            </a>
            <a href="https://www.pagasa.dost.gov.ph/tropical-cyclone-advisory-iframe" className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Advisories</div>
                <div className="text-sm text-gray-500">Official warnings</div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Government of the Philippines</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Official monitoring services for weather and seismic activities. 
                Data provided by authorized government agencies for public safety and awareness.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  PAGASA - Weather and climate data
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  PHIVOLCS - Earthquake and volcanic data
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  DOST - Scientific and technological services
                </li>
              </ul>
            </div>
          </div>
          
        </footer>
      </main>
    </div>
  );
};

export default WeatherEarthquakeDashboard;
