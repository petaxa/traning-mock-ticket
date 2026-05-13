import { describe, expect, it } from 'vite-plus/test'
import { artists } from '@/data/artists'
import { ticketEvents } from '@/data/ticketEvents'
import { venues } from '@/data/venues'
import { calculateSupportPoints, type PurchaseRecord } from '@/domain/supportPoints'

describe('calculateSupportPoints', () => {
  it('turns the growth from first purchased venue capacity into support points', () => {
    const purchases: PurchaseRecord[] = [
      {
        id: 'purchase-1',
        eventId: 'evt-lumen-loop',
        quantity: 1,
        purchasedAt: '2026-06-14T10:00:00+09:00',
        totalPaid: 3560,
        purchaseNumber: 'IT-TEST01',
        receivedAt: null,
      },
      {
        id: 'purchase-2',
        eventId: 'evt-lumen-dock',
        quantity: 1,
        purchasedAt: '2026-08-02T10:00:00+09:00',
        totalPaid: 3660,
        purchaseNumber: 'IT-TEST02',
        receivedAt: null,
      },
    ]

    const summary = calculateSupportPoints(purchases, ticketEvents, artists, venues)

    expect(summary.total).toBe(1080)
    expect(summary.items).toEqual([
      {
        artistName: 'Lumen Harbor',
        firstVenueName: 'Basement Loop',
        firstVenueCapacity: 120,
        latestLiveVenueCapacity: 1200,
        points: 1080,
      },
    ])
  })
})
