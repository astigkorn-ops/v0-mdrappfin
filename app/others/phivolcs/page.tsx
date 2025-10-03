import React from 'react';
import { AlertTriangle, MapPin, Clock, Calendar, Search, RefreshCw, Filter, Download } from 'lucide-react';

const PhivolcsEarthquakePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PHIVOLCS Latest Earthquake Information</h1>
              <p className="text-gray-600 mt-2">Real-time earthquake monitoring and data from the Philippine Institute of Volcanology and Seismology</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Significant EQ</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Last Update</p>
                  <p className="text-2xl font-bold text-gray-900">--:--</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Date Range</p>
                  <p className="text-2xl font-bold text-gray-900">--/--</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48">
                  <option>All Magnitudes</option>
                  <option>Magnitude 5+</option>
                  <option>Magnitude 4-5</option>
                  <option>Magnitude 3-4</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Website Frame */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 ml-4">
                <div className="bg-white border border-gray-300 overflow-hidden">
                <iframe 
                  src="https://earthquake.phivolcs.dost.gov.ph/" 
                  className="w-full h-96 border-0"
                  title="PAGASA Weather Portal"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </div>
          </div>
          <div className="h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 inline-block mb-6">
                <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">PHIVOLCS Earthquake Monitoring</h2>
                <p className="text-gray-600 mb-6">Official real-time earthquake data and monitoring services</p>
                <div className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Access Live Data</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                This frame displays the official PHIVOLCS earthquake monitoring website. 
                All data is sourced directly from the Philippine Institute of Volcanology and Seismology.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About PHIVOLCS</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The Philippine Institute of Volcanology and Seismology (PHIVOLCS) is a service institute of the 
              Department of Science and Technology (DOST) that is principally mandated to mitigate disasters 
              that may arise from volcanic eruptions, earthquakes, tsunami and other related geotectonic phenomena.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earthquake Safety</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Drop, Cover, and Hold On</strong> during shaking</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Stay away from windows and heavy objects</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Have an emergency kit and plan ready</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhivolcsEarthquakePage;
