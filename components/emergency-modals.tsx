"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"

export default function EmergencyModals() {
  const hotlineModalRef = useRef<HTMLDivElement>(null)
  const incidentModalRef = useRef<HTMLDivElement>(null)
  const hotlineCloseButtonRef = useRef<HTMLButtonElement>(null)
  const incidentCloseButtonRef = useRef<HTMLButtonElement>(null)

  // Added form state management for incident reporting
  const [formData, setFormData] = useState({
    reporter_name: "",
    contact_number: "",
    barangay: "",
    specific_location: "",
    incident_type: "Fire",
    incident_description: "",
    urgency_level: "HIGH",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const closeModal = useCallback((modalId: string) => {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("hidden")
      // Reset form and messages when closing incident modal
      if (modalId === "incident-modal") {
        setFormData({
          reporter_name: "",
          contact_number: "",
          barangay: "",
          specific_location: "",
          incident_type: "Fire",
          incident_description: "",
          urgency_level: "HIGH",
        })
        setSubmitMessage(null)
      }
      // Return focus to the trigger button
      if (modalId === "hotline-modal") {
        const triggerButton = document.querySelector('[onclick*="hotline-modal"]') as HTMLElement
        triggerButton?.focus()
      } else if (modalId === "incident-modal") {
        const triggerButton = document.querySelector('[onclick*="incident-modal"]') as HTMLElement
        triggerButton?.focus()
      }
    }
  }, [])

  // Added form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitMessage(null)

      try {
        const response = await fetch("/api/incident-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (response.ok) {
          setSubmitMessage({
            type: "success",
            text: "Incident report submitted successfully. Our team will respond shortly.",
          })
          // Reset form after successful submission
          setFormData({
            reporter_name: "",
            contact_number: "",
            barangay: "",
            specific_location: "",
            incident_type: "Fire",
            incident_description: "",
            urgency_level: "HIGH",
          })
        } else {
          setSubmitMessage({
            type: "error",
            text: result.error || "Failed to submit incident report. Please try again.",
          })
        }
      } catch (error) {
        setSubmitMessage({
          type: "error",
          text: "Network error. Please check your connection and try again.",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData],
  )

  // Added input change handler
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, modalId: string) => {
      if (e.key === "Escape") {
        closeModal(modalId)
      }

      // Focus trapping
      if (e.key === "Tab") {
        const modal = document.getElementById(modalId)
        if (!modal) return

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    },
    [closeModal],
  )

  useEffect(() => {
    const hotlineKeyHandler = (e: KeyboardEvent) => handleKeyDown(e, "hotline-modal")
    const incidentKeyHandler = (e: KeyboardEvent) => handleKeyDown(e, "incident-modal")

    document.addEventListener("keydown", hotlineKeyHandler)
    document.addEventListener("keydown", incidentKeyHandler)

    return () => {
      document.removeEventListener("keydown", hotlineKeyHandler)
      document.removeEventListener("keydown", incidentKeyHandler)
    }
  }, [handleKeyDown])

  return (
    <>
      {/* Hotline Modal */}
      <section
        id="hotline-modal"
        className="hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotline-modal-title"
        aria-describedby="hotline-modal-description"
      >
        <div
          ref={hotlineModalRef}
          className="bg-white rounded-lg p-6 max-w-lg w-full transform transition-all focus:outline-none"
          role="document"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 id="hotline-modal-title" className="text-xl font-bold text-blue-900 flex items-center">
              <i className="fas fa-phone-alt mr-3 text-red-600" aria-hidden="true"></i>
              Emergency Hotlines
            </h3>
            <button
              ref={hotlineCloseButtonRef}
              onClick={() => closeModal("hotline-modal")}
              className="text-gray-500 hover:text-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close emergency hotlines dialog"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="text-sm">
            <p id="hotline-modal-description" className="mb-4 text-gray-600">
              For immediate assistance, please contact the following numbers:
            </p>
            <ul className="space-y-3 text-gray-700" role="list">
              <li className="flex justify-between items-center">
                <strong>Office of the Mayor:</strong>
                <a
                  href="tel:+63521234567"
                  className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Call Office of the Mayor at (052) 123-4567"
                >
                  (052) 123-4567
                </a>
              </li>
              <li className="flex justify-between items-center">
                <strong>MDRRMO:</strong>
                <span>
                  <a
                    href="tel:911"
                    className="font-semibold text-red-600 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                    aria-label="Call emergency services at 911"
                  >
                    911
                  </a>{" "}
                  /
                  <a
                    href="tel:+63522345678"
                    className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ml-1"
                    aria-label="Call MDRRMO at (052) 234-5678"
                  >
                    (052) 234-5678
                  </a>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <strong>MSWD:</strong>
                <a
                  href="tel:1343"
                  className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Call MSWD at 1343"
                >
                  1343
                </a>
              </li>
              <li className="flex justify-between items-center">
                <strong>Medical/MHO:</strong>
                <a
                  href="tel:+63523456789"
                  className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Call Medical/MHO at (052) 345-6789"
                >
                  (052) 345-6789
                </a>
              </li>
              <li className="flex justify-between items-center">
                <strong>PNP:</strong>
                <span>
                  <a
                    href="tel:117"
                    className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    aria-label="Call PNP at 117"
                  >
                    117
                  </a>{" "}
                  /
                  <a
                    href="tel:+63524567890"
                    className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ml-1"
                    aria-label="Call PNP at (052) 456-7890"
                  >
                    (052) 456-7890
                  </a>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <strong>BFP:</strong>
                <a
                  href="tel:+63525678901"
                  className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Call BFP at (052) 567-8901"
                >
                  (052) 567-8901
                </a>
              </li>
              <li className="flex justify-between items-center">
                <strong>PCG:</strong>
                <a
                  href="tel:+63526789012"
                  className="font-semibold text-blue-950 hover:text-yellow-500 hover:underline transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Call PCG at (052) 678-9012"
                >
                  (052) 678-9012
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Incident Modal */}
      <section
        id="incident-modal"
        className="hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="incident-modal-title"
        aria-describedby="incident-modal-description"
      >
        <div
          ref={incidentModalRef}
          className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
          role="document"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 id="incident-modal-title" className="text-xl font-bold text-blue-900">
              Report an Emergency or Disaster-Related Incident
            </h3>
            <button
              ref={incidentCloseButtonRef}
              onClick={() => closeModal("incident-modal")}
              className="text-gray-500 hover:text-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close incident report dialog"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start" role="alert">
            <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3 mt-1" aria-hidden="true"></i>
            <div>
              <h4 className="font-bold text-red-700 mb-1">Emergency Notice</h4>
              <p id="incident-modal-description" className="text-sm text-gray-700">
                Use this secure form to report emergencies, hazards, or disaster-related incidents within the
                Municipality of Pio Duran. All submissions are reviewed by MDRRMO responders.
              </p>
            </div>
          </div>

          {/* Added success/error message display */}
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitMessage.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
              role="alert"
            >
              <div className="flex">
                <i
                  className={`${
                    submitMessage.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"
                  } mr-2 mt-0.5`}
                  aria-hidden="true"
                ></i>
                <p className="text-sm">{submitMessage.text}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="incident-modal-title">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reporter-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name (Required)
                </label>
                <input
                  id="reporter-name"
                  type="text"
                  required
                  aria-required="true"
                  value={formData.reporter_name}
                  onChange={(e) => handleInputChange("reporter_name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number (Required)
                </label>
                <input
                  id="contact-number"
                  type="tel"
                  required
                  aria-required="true"
                  value={formData.contact_number}
                  onChange={(e) => handleInputChange("contact_number", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="incident-barangay" className="block text-sm font-medium text-gray-700 mb-1">
                Location of Incident
              </label>
              <select
                id="incident-barangay"
                value={formData.barangay}
                onChange={(e) => handleInputChange("barangay", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                aria-describedby="barangay-help"
              >
                <option value="">Select Barangay</option>
                <option value="Barangay 1">Barangay 1</option>
                <option value="Barangay 2">Barangay 2</option>
                <option value="Agol">Agol</option>
                <option value="Alabangpuro">Alabangpuro</option>
                <option value="Basicao Coastal">Basicao Coastal</option>
              </select>
              <label htmlFor="specific-location" className="sr-only">
                Specific location or nearest landmark
              </label>
              <input
                id="specific-location"
                type="text"
                placeholder="Nearest landmark or specific location"
                value={formData.specific_location}
                onChange={(e) => handleInputChange("specific_location", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="location-help"
              />
              <div id="location-help" className="sr-only">
                Provide the nearest landmark or specific location details
              </div>
            </div>
            <div>
              <label htmlFor="incident-type" className="block text-sm font-medium text-gray-700 mb-1">
                Type of Incident
              </label>
              <select
                id="incident-type"
                value={formData.incident_type}
                onChange={(e) => handleInputChange("incident_type", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Fire">Fire</option>
                <option value="Flood">Flood</option>
                <option value="Landslide">Landslide</option>
                <option value="Vehicular Accident">Vehicular Accident</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="incident-description" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Description
              </label>
              <textarea
                id="incident-description"
                rows={4}
                placeholder="Provide a detailed description: what happened, how many people affected, visible risks..."
                value={formData.incident_description}
                onChange={(e) => handleInputChange("incident_description", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="description-help"
                required
              ></textarea>
              <div id="description-help" className="sr-only">
                Include details about what happened, number of people affected, and any visible risks
              </div>
            </div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</legend>
              <div className="flex space-x-4" role="radiogroup" aria-labelledby="urgency-legend">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="LOW"
                    checked={formData.urgency_level === "LOW"}
                    onChange={(e) => handleInputChange("urgency_level", e.target.value)}
                    className="h-5 w-5 text-green-500 focus:ring-green-500"
                  />
                  <span className="ml-2">LOW</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="MEDIUM"
                    checked={formData.urgency_level === "MEDIUM"}
                    onChange={(e) => handleInputChange("urgency_level", e.target.value)}
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-2">MEDIUM</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="HIGH"
                    checked={formData.urgency_level === "HIGH"}
                    onChange={(e) => handleInputChange("urgency_level", e.target.value)}
                    className="h-5 w-5 text-red-500 focus:ring-red-500"
                  />
                  <span className="ml-2">HIGH (require immediate attention)</span>
                </label>
              </div>
            </fieldset>
            <div className="pb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                    Submitting Report...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2" aria-hidden="true"></i>
                    Submit Emergency Report
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
