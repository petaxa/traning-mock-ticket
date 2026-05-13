import { describe, expect, it } from 'vite-plus/test'
import { findTicketEvent } from '@/domain/catalog'
import { calculateOrderSummary, validatePaymentInput } from '@/domain/checkout'

describe('checkout', () => {
  it('calculates a one-ticket order with the listing fee', () => {
    const event = findTicketEvent('evt-lumen-loop')

    expect(event).toBeDefined()

    const summary = calculateOrderSummary(event!, 1)

    expect(summary).toEqual({
      quantity: 1,
      ticketSubtotal: 3200,
      serviceFee: 360,
      total: 3560,
    })
  })

  it('accepts the mock Stripe-style card and rejects incomplete payment data', () => {
    expect(
      validatePaymentInput({
        cardNumber: '4242 4242 4242 4242',
        expiration: '12/30',
        cvc: '123',
        cardholder: 'TICKET FAN',
      }),
    ).toEqual([])

    expect(
      validatePaymentInput({
        cardNumber: '4242',
        expiration: '13/30',
        cvc: '',
        cardholder: '',
      }),
    ).toEqual([
      'カード番号は16桁で入力してください',
      '有効期限はMM/YY形式で入力してください',
      'セキュリティコードを入力してください',
      'カード名義を入力してください',
    ])
  })
})
