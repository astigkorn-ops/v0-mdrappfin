interface FileUploadOptions {
  maxSize: number // in bytes
  allowedTypes: string[]
}

interface ValidationResult {
  valid: boolean
  error?: string
}

export const validateFileUpload = (file: File, options: FileUploadOptions): ValidationResult => {
  // Check file size
  if (file.size > options.maxSize) {
    const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(1)
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    }
  }

  // Check file type
  const isValidType = options.allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      const baseType = type.replace("/*", "")
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })

  if (!isValidType) {
    return {
      valid: false,
      error: "File type not allowed",
    }
  }

  return { valid: true }
}

// Simple rate limiting using localStorage
const rateLimitStore: Record<string, number[]> = {}

export const rateLimit = (key: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now()

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = []
  }

  // Remove old entries outside the time window
  rateLimitStore[key] = rateLimitStore[key].filter((timestamp) => now - timestamp < windowMs)

  // Check if we've exceeded the limit
  if (rateLimitStore[key].length >= maxRequests) {
    return false
  }

  // Add current request
  rateLimitStore[key].push(now)
  return true
}

export const sanitizeHtml = (input: string): string => {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}
