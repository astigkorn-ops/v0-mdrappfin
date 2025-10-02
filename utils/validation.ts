export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validatePhone = (phone: string): boolean => {
  // Philippine phone number validation
  const phoneRegex = /^(\+63|0)?[0-9]{10}$/
  const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
  return phoneRegex.test(cleanPhone)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "")
}

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      const baseType = type.replace("/*", "")
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}
