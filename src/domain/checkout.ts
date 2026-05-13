import type { TicketEventWithRelations } from './catalog'

export type OrderSummary = {
  quantity: number
  ticketSubtotal: number
  serviceFee: number
  total: number
}

export type PaymentInput = {
  cardNumber: string
  expiration: string
  cvc: string
  cardholder: string
}

export function calculateOrderSummary(
  event: TicketEventWithRelations,
  quantity: number,
): OrderSummary {
  const normalizedQuantity = Math.max(1, Math.min(quantity, event.maxOrder, event.remaining))
  const ticketSubtotal = event.price * normalizedQuantity
  const serviceFee = event.fee * normalizedQuantity

  return {
    quantity: normalizedQuantity,
    ticketSubtotal,
    serviceFee,
    total: ticketSubtotal + serviceFee,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(value)
}

export function validatePaymentInput(input: PaymentInput): string[] {
  const cardDigits = input.cardNumber.replace(/\s/g, '')
  const errors: string[] = []

  if (!/^\d{16}$/.test(cardDigits)) {
    errors.push('カード番号は16桁で入力してください')
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(input.expiration.trim())) {
    errors.push('有効期限はMM/YY形式で入力してください')
  }

  if (!/^\d{3,4}$/.test(input.cvc.trim())) {
    errors.push('セキュリティコードを入力してください')
  }

  if (!input.cardholder.trim()) {
    errors.push('カード名義を入力してください')
  }

  return errors
}
