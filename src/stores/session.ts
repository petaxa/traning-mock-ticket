import { defineStore } from 'pinia'
import { MOCK_OTP_CODE, isValidEmail, normalizeEmail, verifyOtpCode } from '@/domain/auth'
import type { PurchaseRecord } from '@/domain/supportPoints'

const STORAGE_KEY = 'indie-ticket-session-v1'

type SessionState = {
  email: string
  pendingEmail: string
  pendingOtp: string
  isAuthenticated: boolean
  passkeyRegistered: boolean
  purchases: PurchaseRecord[]
}

type PersistedSessionState = Omit<SessionState, 'pendingEmail' | 'pendingOtp'>

function createEmptyState(): SessionState {
  return {
    email: '',
    pendingEmail: '',
    pendingOtp: '',
    isAuthenticated: false,
    passkeyRegistered: false,
    purchases: [],
  }
}

function readPersistedSession(): SessionState {
  if (typeof window === 'undefined') {
    return createEmptyState()
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return createEmptyState()
  }

  try {
    const parsedValue = JSON.parse(rawValue) as PersistedSessionState

    return {
      ...createEmptyState(),
      ...parsedValue,
      purchases: normalizePurchases(parsedValue.purchases),
      pendingEmail: '',
      pendingOtp: '',
    }
  } catch {
    return createEmptyState()
  }
}

function createPurchaseNumber(eventId: string, purchasedAt: string): string {
  const source = `${eventId}:${purchasedAt}`
  let hash = 0

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 2176782336
  }

  return `IT-${hash.toString(36).toUpperCase().padStart(6, '0').slice(-6)}`
}

function normalizePurchases(value: unknown): PurchaseRecord[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.flatMap((item, index) => {
    if (!item || typeof item !== 'object') {
      return []
    }

    const purchase = item as Partial<PurchaseRecord>

    if (!purchase.eventId) {
      return []
    }

    const purchasedAt = purchase.purchasedAt ?? new Date(0).toISOString()

    return [
      {
        id: purchase.id ?? `purchase-${purchase.eventId}-${index}`,
        eventId: purchase.eventId,
        quantity: purchase.quantity ?? 1,
        purchasedAt,
        totalPaid: purchase.totalPaid ?? 0,
        purchaseNumber:
          purchase.purchaseNumber ?? createPurchaseNumber(purchase.eventId, purchasedAt),
        receivedAt: purchase.receivedAt ?? null,
      },
    ]
  })
}

function persistSession(state: SessionState): void {
  if (typeof window === 'undefined') {
    return
  }

  const persisted: PersistedSessionState = {
    email: state.email,
    isAuthenticated: state.isAuthenticated,
    passkeyRegistered: state.passkeyRegistered,
    purchases: state.purchases,
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => readPersistedSession(),
  getters: {
    userDisplayName: (state) => state.email || 'ゲスト',
    hasPurchased:
      (state) =>
      (eventId: string): boolean =>
        state.purchases.some((purchase) => purchase.eventId === eventId),
    purchaseForEvent:
      (state) =>
      (eventId: string): PurchaseRecord | undefined =>
        state.purchases.find((purchase) => purchase.eventId === eventId),
  },
  actions: {
    startEmailRegistration(email: string): {
      ok: boolean
      message?: string
      mode: 'otp' | 'passkey'
    } {
      const normalizedEmail = normalizeEmail(email)

      if (!isValidEmail(normalizedEmail)) {
        return { ok: false, message: 'メールアドレスを正しく入力してください', mode: 'otp' }
      }

      this.pendingEmail = normalizedEmail

      if (this.passkeyRegistered && this.email === normalizedEmail) {
        this.pendingOtp = ''

        return { ok: true, mode: 'passkey' }
      }

      this.pendingOtp = MOCK_OTP_CODE

      return { ok: true, mode: 'otp' }
    },
    verifyEmailOtp(input: string): boolean {
      if (!this.pendingEmail || !verifyOtpCode(input)) {
        return false
      }

      this.email = this.pendingEmail
      this.pendingEmail = ''
      this.pendingOtp = ''
      this.isAuthenticated = true
      persistSession(this)

      return true
    },
    authenticateWithPasskey(): void {
      if (!this.pendingEmail && this.email) {
        this.pendingEmail = this.email
      }

      this.email = this.pendingEmail || this.email
      this.pendingEmail = ''
      this.pendingOtp = ''
      this.isAuthenticated = true
      persistSession(this)
    },
    registerPasskey(): void {
      this.passkeyRegistered = true
      persistSession(this)
    },
    logout(): void {
      this.isAuthenticated = false
      this.pendingEmail = ''
      this.pendingOtp = ''
      persistSession(this)
    },
    purchaseTicket(eventId: string, quantity: number, totalPaid: number): PurchaseRecord {
      const existingPurchase = this.purchases.find((purchase) => purchase.eventId === eventId)

      if (existingPurchase) {
        return existingPurchase
      }

      const purchasedAt = new Date().toISOString()
      const purchase: PurchaseRecord = {
        id: `purchase-${eventId}-${Date.now()}`,
        eventId,
        quantity,
        purchasedAt,
        totalPaid,
        purchaseNumber: createPurchaseNumber(eventId, purchasedAt),
        receivedAt: null,
      }

      this.purchases.push(purchase)
      persistSession(this)

      return purchase
    },
    setPaperTicketReceived(eventId: string, received: boolean): void {
      const purchase = this.purchases.find((candidate) => candidate.eventId === eventId)

      if (!purchase) {
        return
      }

      purchase.receivedAt = received ? new Date().toISOString() : null
      persistSession(this)
    },
    resetForTest(): void {
      Object.assign(this, createEmptyState())

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    },
  },
})
