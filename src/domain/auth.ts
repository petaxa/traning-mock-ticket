export const MOCK_OTP_CODE = '428913'

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))
}

export function verifyOtpCode(input: string): boolean {
  return input.trim() === MOCK_OTP_CODE
}
