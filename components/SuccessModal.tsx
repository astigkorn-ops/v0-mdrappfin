"use client"

import type React from "react"
import { CheckCircle } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  referenceNumber: string
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, referenceNumber }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl mx-4 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
            <CheckCircle className="text-emerald-600" size={32} />
          </div>

          <Dialog.Title className="text-lg font-medium text-slate-900 mb-2">
            Report Submitted Successfully!
          </Dialog.Title>

          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-2">
              Your reference number is: <span className="font-bold text-[#042189]">{referenceNumber}</span>
            </p>
            <p className="text-sm text-slate-500">An MDRRMO responder will contact you shortly.</p>
          </div>

          <div className="bg-[#042189]/5 p-4 rounded-lg mb-4 border border-[#042189]/10">
            <p className="text-xs text-[#042189]">
              Please save your reference number for tracking purposes. You can use it to follow up on your report.
            </p>
          </div>

          <Dialog.Close className="inline-flex justify-center px-6 py-2 text-sm font-medium text-[#042189] bg-[#042189]/10 border border-transparent rounded-md hover:bg-[#042189]/20 focus:outline-none focus:ring-2 focus:ring-[#042189] focus:ring-offset-2 transition-colors">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SuccessModal
