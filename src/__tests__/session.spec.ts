import { beforeEach, describe, expect, it } from 'vite-plus/test'
import { createPinia, setActivePinia } from 'pinia'
import { useSessionStore } from '@/stores/session'

describe('session store', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setActivePinia(createPinia())
  })

  it('finishes email-only registration with the mock OTP', () => {
    const session = useSessionStore()

    const result = session.startEmailRegistration('FAN@example.com')

    expect(result).toEqual({ ok: true, mode: 'otp' })
    expect(session.pendingOtp).toBe('428913')
    expect(session.verifyEmailOtp('428913')).toBe(true)
    expect(session.email).toBe('fan@example.com')
    expect(session.isAuthenticated).toBe(true)
  })

  it('uses passkey authentication after the user registers a passkey', () => {
    const session = useSessionStore()

    session.startEmailRegistration('fan@example.com')
    session.verifyEmailOtp('428913')
    session.registerPasskey()
    session.logout()

    const result = session.startEmailRegistration('fan@example.com')

    expect(result).toEqual({ ok: true, mode: 'passkey' })
    session.authenticateWithPasskey()
    expect(session.isAuthenticated).toBe(true)
  })

  it('creates a pickup purchase number and records paper ticket handoff', () => {
    const session = useSessionStore()

    session.startEmailRegistration('fan@example.com')
    session.verifyEmailOtp('428913')
    const purchase = session.purchaseTicket('evt-lumen-loop', 1, 3560)

    expect(purchase.purchaseNumber).toMatch(/^IT-[0-9A-Z]{6}$/)
    expect(purchase.receivedAt).toBeNull()

    session.setPaperTicketReceived('evt-lumen-loop', true)
    expect(session.purchaseForEvent('evt-lumen-loop')?.receivedAt).toEqual(expect.any(String))
  })
})
