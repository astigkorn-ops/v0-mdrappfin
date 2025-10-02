"use client"

import React from "react"
import { X, Phone, Users, Stethoscope, Shield } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import * as Dialog from "@radix-ui/react-dialog"
import * as ScrollArea from "@radix-ui/react-scroll-area"

interface HotlineModalProps {
  isOpen: boolean
  onClose: () => void
}

const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  const [hotlines, setHotlines] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (isOpen) {
      fetchHotlines()
    }
  }, [isOpen])

  const fetchHotlines = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("emergency_hotlines")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true })

      if (error && !error.message.includes('relation "emergency_hotlines" does not exist')) {
        throw error
      }

      if (data && data.length > 0) {
        setHotlines(
          data.map((hotline) => ({
            icon: Phone,
            name: hotline.contact_name,
            number: hotline.phone_number,
            department: hotline.department,
            description: hotline.description,
            logo: hotline.logo,
            color: hotline.is_primary ? "bg-red-50" : "bg-blue-50",
            iconColor: hotline.is_primary ? "text-red-600" : "text-blue-600",
          })),
        )
      } else {
        // Fallback to default hotlines
        setHotlines([
          {
            icon: Shield,
            name: "MDRRMO",
            number: "911 / (052) 234-5678",
            color: "bg-red-50",
            iconColor: "text-red-600",
          },
          {
            icon: Users,
            name: "Office of the Mayor",
            number: "(052) 123-4567",
            color: "bg-blue-50",
            iconColor: "text-blue-600",
          },
          {
            icon: Stethoscope,
            name: "Medical/MHO",
            number: "(052) 345-6789",
            color: "bg-blue-50",
            iconColor: "text-blue-600",
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching hotlines:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl mx-4 max-h-[90vh]">
          {/* Modal Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#042189]/10 rounded-full flex items-center justify-center">
              <Phone className="text-[#042189]" size={24} />
            </div>
            <Dialog.Title className="text-2xl font-bold text-[#042189]">Emergency Hotlines</Dialog.Title>
            <Dialog.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#042189] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
              <X className="h-6 w-6 text-slate-400 hover:text-red-500 transition-colors" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <ScrollArea.Root className="flex-1 overflow-hidden">
            <ScrollArea.Viewport className="h-full w-full rounded">
              {/* Hotline List */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042189] mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading emergency hotlines...</p>
                </div>
              ) : (
                <div className="space-y-3 text-slate-800 text-sm pr-4">
                  {hotlines.map((hotline, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${hotline.color} rounded-lg p-3 hover:shadow-md transition duration-300 border border-slate-200/50`}
                    >
                      {hotline.logo ? (
                        <img
                          src={hotline.logo || "/placeholder.svg"}
                          alt={hotline.name}
                          className="w-6 h-6 mt-1 rounded"
                        />
                      ) : (
                        <hotline.icon className={`${hotline.iconColor} w-6 h-6 mt-1`} />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{hotline.name}:</p>
                        {hotline.department && <p className="text-xs text-slate-500">{hotline.department}</p>}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {hotline.number.split(" / ").map((num: string, numIndex: number) => (
                            <a
                              key={numIndex}
                              href={`tel:${num.replace(/[^\d]/g, "")}`}
                              className="text-[#fccf03] hover:text-[#042189] hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#042189] focus:ring-offset-2 rounded px-1"
                            >
                              {num}
                            </a>
                          ))}
                        </div>
                        {hotline.description && <p className="text-xs text-slate-600 mt-1">{hotline.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-slate-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-[#fccf03]/10 rounded-lg border-l-4 border-[#fccf03]">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> For life-threatening emergencies, call{" "}
              <strong className="text-red-600">911</strong> immediately. Keep these numbers handy for quick access
              during emergencies.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default HotlineModal
