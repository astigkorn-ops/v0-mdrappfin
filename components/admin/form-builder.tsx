"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Save, X, Upload, Calendar, MapPin } from "lucide-react"

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "number" | "textarea" | "select" | "checkbox" | "date" | "time" | "file" | "coordinates"
  placeholder?: string
  description?: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
  validation?: z.ZodSchema<any>
  gridCols?: 1 | 2 | 3 | 4
  section?: string
}

interface FormBuilderProps {
  title: string
  description?: string
  fields: FormField[]
  defaultValues?: Record<string, any>
  onSubmit: (data: any) => Promise<void>
  onCancel?: () => void
  submitLabel?: string
  loading?: boolean
  className?: string
}

export function FormBuilder({
  title,
  description,
  fields,
  defaultValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
  loading = false,
  className,
}: FormBuilderProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Create dynamic schema based on fields
  const createSchema = () => {
    const schemaFields: Record<string, z.ZodSchema<any>> = {}
    
    fields.forEach((field) => {
      if (field.validation) {
        schemaFields[field.name] = field.validation
      } else {
        let schema: z.ZodSchema<any>
        
        switch (field.type) {
          case "email":
            schema = z.string().email("Invalid email address")
            break
          case "number":
            schema = z.coerce.number()
            break
          case "checkbox":
            schema = z.boolean()
            break
          case "date":
            schema = z.string().min(1, "Date is required")
            break
          default:
            schema = z.string()
        }
        
        if (field.required) {
          schema = schema.min(1, `${field.label} is required`)
        } else {
          schema = schema.optional()
        }
        
        schemaFields[field.name] = schema
      }
    })
    
    return z.object(schemaFields)
  }

  const schema = createSchema()
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleFormSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const error = errors[field.name]
    const hasError = !!error

    const fieldWrapper = (children: React.ReactNode) => (
      <div className={cn("space-y-2", field.gridCols && `col-span-${field.gridCols}`)}>
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {children}
        {field.description && (
          <p className="text-xs text-gray-500">{field.description}</p>
        )}
        {hasError && (
          <p className="text-xs text-red-500">{error?.message}</p>
        )}
      </div>
    )

    switch (field.type) {
      case "textarea":
        return fieldWrapper(
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Textarea
                {...controllerField}
                id={field.name}
                placeholder={field.placeholder}
                className={cn(hasError && "border-red-500")}
                rows={4}
              />
            )}
          />
        )

      case "select":
        return fieldWrapper(
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                <SelectTrigger className={cn(hasError && "border-red-500")}>
                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )

      case "checkbox":
        return fieldWrapper(
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                />
                <Label htmlFor={field.name} className="text-sm font-normal">
                  {field.placeholder || field.label}
                </Label>
              </div>
            )}
          />
        )

      case "file":
        return fieldWrapper(
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div className="space-y-2">
                <Input
                  type="file"
                  id={field.name}
                  onChange={(e) => controllerField.onChange(e.target.files?.[0])}
                  className={cn(hasError && "border-red-500")}
                />
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Upload className="h-3 w-3" />
                  <span>Max file size: 10MB</span>
                </div>
              </div>
            )}
          />
        )

      case "coordinates":
        return fieldWrapper(
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name={`${field.name}_lat`}
              control={control}
              render={({ field: controllerField }) => (
                <Input
                  {...controllerField}
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  className={cn(hasError && "border-red-500")}
                />
              )}
            />
            <Controller
              name={`${field.name}_lng`}
              control={control}
              render={({ field: controllerField }) => (
                <Input
                  {...controllerField}
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  className={cn(hasError && "border-red-500")}
                />
              )}
            />
          </div>
        )

      default:
        return fieldWrapper(
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                {...controllerField}
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={cn(hasError && "border-red-500")}
              />
            )}
          />
        )
    }
  }

  // Group fields by section
  const groupedFields = fields.reduce((acc, field) => {
    const section = field.section || "default"
    if (!acc[section]) {
      acc[section] = []
    }
    acc[section].push(field)
    return acc
  }, {} as Record<string, FormField[]>)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex items-center space-x-2">
            {onCancel && (
              <Button variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardTitle>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {Object.entries(groupedFields).map(([sectionName, sectionFields], index) => (
            <div key={sectionName}>
              {sectionName !== "default" && (
                <>
                  {index > 0 && <Separator />}
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">{sectionName}</h3>
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionFields.map((field) => (
                  <React.Fragment key={field.name}>
                    {renderField(field)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
