"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Zap,
  Camera,
  CheckCircle,
  Plus,
  ArrowLeft,
  ArrowRight,
  Send,
  Navigation,
} from "lucide-react"

export default function ReportIncidentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [urgencyLevel, setUrgencyLevel] = useState("high")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [locationDetected, setLocationDetected] = useState(false)

  const totalSteps = 3

  const incidentTypes = [
    "Fire",
    "Flood",
    "Landslide",
    "Vehicular Accident",
    "Medical Emergency",
    "Earthquake",
    "Storm Surge",
    "Typhoon Damage",
    "Other",
  ]

  const barangays = [
    "Barangay 1",
    "Barangay 2",
    "Barangay 3",
    "Barangay 4",
    "Barangay 5",
    "Agol",
    "Alabangpuro",
    "Basicao Coastal",
    "Basicao Interior",
    "Banawan",
    "Binodegahan",
    "Buenavista",
    "Buyo",
    "Caratagan",
    "Cuyaoyao",
    "Flores",
    "Lawinon",
    "Macasitas",
    "Malapay",
    "Malidong",
    "Mamlad",
    "Marigondon",
    "Nablangbulod",
    "Oringon",
    "Palapas",
    "Panganiran",
    "Rawis",
    "Salvacion",
    "Sto. Cristo",
    "Sukip",
    "Tibabo",
  ]

  const urgencyOptions = [
    { level: "low", label: "LOW", description: "Non-urgent", color: "bg-green-500", icon: CheckCircle },
    {
      level: "medium",
      label: "MEDIUM",
      description: "Requires attention",
      color: "bg-yellow-500",
      icon: AlertTriangle,
    },
    { level: "high", label: "HIGH", description: "Immediate attention", color: "bg-red-500", icon: AlertTriangle },
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleNewReport = () => {
    setShowSuccess(false)
    setCurrentStep(1)
    setUrgencyLevel("high")
    setLocationDetected(false)
  }

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationDetected(true)
        },
        (error) => {
          alert("Unable to get your location. Please select location manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center animate-bounce">
              <AlertTriangle className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Report an Incident</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us respond quickly to emergencies by reporting incidents in your community. Your report will be
            immediately sent to our emergency response team.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-12 text-white text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertTriangle className="text-yellow-300 w-6 h-6 mr-3 animate-pulse" />
              <h2 className="text-2xl font-bold">Emergency Notice</h2>
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <p>
                For life-threatening emergencies, dial <span className="font-bold">911</span> immediately
              </p>
            </div>
          </div>
        </div>

        {!showSuccess ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Incident Report Form</h2>
                <p>Fill out all required fields to submit your report</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-4">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-200 ${
                            step < currentStep
                              ? "bg-green-500 text-white"
                              : step === currentStep
                                ? "bg-blue-950 text-white"
                                : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && <div className="w-16 h-1 bg-gray-300 rounded mx-2"></div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-950 mb-6">Personal Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="inline w-4 h-4 mr-2 text-blue-950" />
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="reporterName"
                          name="reporterName"
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="inline w-4 h-4 mr-2 text-blue-950" />
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2 text-blue-950" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Enter your email (optional)"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Incident Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-950 mb-6">Incident Details</h3>

                    <div>
                      <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-2">
                        <AlertTriangle className="inline w-4 h-4 mr-2 text-blue-950" />
                        Type of Incident <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="incidentType"
                        name="incidentType"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                      >
                        <option value="">Select incident type</option>
                        {incidentTypes.map((type) => (
                          <option key={type} value={type.toLowerCase().replace(" ", "-")}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="incidentLocation" className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-2 text-blue-950" />
                        Location of Incident <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="incidentLocation"
                        name="incidentLocation"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200 mb-3"
                      >
                        <option value="">Select Barangay</option>
                        {barangays.map((barangay) => (
                          <option key={barangay} value={barangay.toLowerCase().replace(" ", "-")}>
                            {barangay}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200 mb-3"
                        placeholder="Nearest landmark or specific location (optional)"
                      />

                      <button
                        type="button"
                        onClick={detectLocation}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-950 py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        <span>Use My Current Location</span>
                      </button>

                      {locationDetected && (
                        <div className="mt-3 text-sm text-green-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Location detected: 13.0293, 123.445</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="inline w-4 h-4 mr-2 text-blue-950" />
                        Incident Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="incidentDescription"
                        name="incidentDescription"
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Provide a detailed description: what happened, how many people affected, visible risks..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Urgency and Media */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-950 mb-6">Urgency Level & Media</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        <Zap className="inline w-4 h-4 mr-2 text-blue-950" />
                        Urgency Level <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {urgencyOptions.map((option) => {
                          const IconComponent = option.icon
                          return (
                            <div
                              key={option.level}
                              onClick={() => setUrgencyLevel(option.level)}
                              className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                                urgencyLevel === option.level
                                  ? "border-blue-950 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-950"
                              }`}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full ${option.color} flex items-center justify-center mr-3`}
                                >
                                  <IconComponent className="text-white w-3 h-3" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{option.label}</div>
                                  <div className="text-sm text-gray-500">{option.description}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        <Camera className="inline w-4 h-4 mr-2 text-blue-950" />
                        Upload Photo of Incident (Optional)
                      </label>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-950 transition-colors duration-200">
                        <div className="flex flex-col items-center">
                          <Camera className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-700 mb-2">Drag & drop files here</p>
                          <p className="text-gray-500 mb-4">or</p>
                          <button
                            type="button"
                            className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                          >
                            Browse Files
                          </button>
                          <p className="text-sm text-gray-500 mt-4">Supports JPG, PNG, GIF up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          id="incidentPhoto"
                          name="incidentPhoto"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          id="agreement"
                          name="agreement"
                          type="checkbox"
                          required
                          className="h-4 w-4 text-blue-950 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="agreement" className="font-medium text-gray-700">
                          I confirm that the information provided is accurate to the best of my knowledge.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center ${
                      currentStep === 1 ? "invisible" : ""
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center ml-auto"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Success Message */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-4">Report Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for reporting this incident. Your reference number is:
              <span className="font-bold text-blue-950"> RD-2025-0001</span>
            </p>
            <p className="text-gray-600 mb-8">An MDRRMO responder will contact you shortly.</p>
            <button
              onClick={handleNewReport}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Another Report
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
