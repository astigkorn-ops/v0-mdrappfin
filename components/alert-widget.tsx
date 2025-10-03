"use client"

import { useEffect, useState } from "react"
import { X, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  text: string
  type: "info" | "warning" | "error" | "success"
  enabled: boolean
  createdAt: string
}

export default function AlertWidget() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  useEffect(() => {
    // Load alerts from localStorage
    const stored = localStorage.getItem("alerts")
    if (stored) {
      const allAlerts: Alert[] = JSON.parse(stored)
      const enabledAlerts = allAlerts.filter((alert) => alert.enabled)
      setAlerts(enabledAlerts)
    }

    // Load dismissed alerts
    const dismissed = localStorage.getItem("dismissedAlerts")
    if (dismissed) {
      setDismissedAlerts(JSON.parse(dismissed))
    }
  }, [])

  const dismissAlert = (id: string) => {
    const updated = [...dismissedAlerts, id]
    setDismissedAlerts(updated)
    localStorage.setItem("dismissedAlerts", JSON.stringify(updated))
  }

  const visibleAlerts = alerts.filter((alert) => !dismissedAlerts.includes(alert.id))

  if (visibleAlerts.length === 0) return null

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "info":
        return {
          bg: "bg-blue-500/90",
          icon: <Info className="h-4 w-4" />,
        }
      case "warning":
        return {
          bg: "bg-yellow-500/90",
          icon: <AlertTriangle className="h-4 w-4" />,
        }
      case "error":
        return {
          bg: "bg-red-500/90",
          icon: <AlertCircle className="h-4 w-4" />,
        }
      case "success":
        return {
          bg: "bg-green-500/90",
          icon: <CheckCircle className="h-4 w-4" />,
        }
    }
  }

  return (
    <div className="relative z-50">
      {visibleAlerts.map((alert) => {
        const styles = getAlertStyles(alert.type)
        return (
          <div key={alert.id} className={`${styles.bg} text-white`}>
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">{styles.icon}</div>
                  <p className="text-sm font-medium">{alert.text}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 h-8 w-8 p-0 hover:bg-white/20 text-white"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss alert</span>
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
