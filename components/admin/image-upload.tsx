"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"


interface ImageUploadProps {
  onImageUploaded?: (url: string) => void
  onImageDeleted?: (url: string) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function ImageUpload({
  onImageUploaded,
  onImageDeleted,
  maxFiles = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)

    try {
      const uploadPromises = Array.from(files)
        .slice(0, maxFiles)
        .map(async (file) => {
          if (!acceptedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not supported`)
          }

          const url = await uploadImage(file)
          return url
        })

      const urls = await Promise.all(uploadPromises)
      setUploadedImages((prev) => [...prev, ...urls])

      urls.forEach((url) => onImageUploaded?.(url))
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (url: string) => {
    try {
      const publicId = url.split("/").pop()?.split(".")[0]
      if (publicId) {
        const response = await fetch(`/api/delete-image?publicId=${publicId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setUploadedImages((prev) => prev.filter((img) => img !== url))
          onImageDeleted?.(url)
        } else {
          console.error("Failed to delete image")
        }
      }
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileUpload}
            disabled={uploading}
            className="flex-1"
          />
          <Button disabled={uploading} className="bg-[#042189] hover:bg-[#042189]/90">
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteImage(url)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
