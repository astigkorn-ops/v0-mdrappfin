"use client"

import React, { useState } from "react"
import IncidentModal from "./IncidentModal"
import HotlineModal from "./HotlineModal"
import SuccessModal from "./SuccessModal"

interface EmergencyModalManagerProps {
  children: React.ReactNode
}

export const EmergencyModalManager: React.FC<EmergencyModalManagerProps> = ({ children }) => {
  const [hotlineModalOpen, setHotlineModalOpen] = useState(false)
  const [incidentModalOpen, setIncidentModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")

  React.useEffect(() => {
    // Attach global functions to window for hero section buttons
    ;(window as any).openHotlineModal = () => setHotlineModalOpen(true)
    ;(window as any).openIncidentModal = () => setIncidentModalOpen(true)

    return () => {
      // Cleanup
      delete (window as any).openHotlineModal
      delete (window as any).openIncidentModal
    }
  }, [])

  const handleIncidentSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/incident-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setReferenceNumber(formData.reference_number)
        setIncidentModalOpen(false)
        setSuccessModalOpen(true)
      } else {
        throw new Error("Failed to submit incident report")
      }
    } catch (error) {
      console.error("Error submitting incident report:", error)
      alert("Failed to submit incident report. Please try again.")
    }
  }

  return (
    <>
      {children}

      <HotlineModal isOpen={hotlineModalOpen} onClose={() => setHotlineModalOpen(false)} />

      <IncidentModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        onSubmit={handleIncidentSubmit}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        referenceNumber={referenceNumber}
      />
    </>
  )
}
