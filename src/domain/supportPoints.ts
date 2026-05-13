import type { Artist } from '@/data/artists'
import type { TicketEvent } from '@/data/ticketEvents'
import type { Venue } from '@/data/venues'

export type PurchaseRecord = {
  id: string
  eventId: string
  quantity: number
  purchasedAt: string
  totalPaid: number
  purchaseNumber: string
  receivedAt: string | null
}

export type SupportPointItem = {
  artistName: string
  firstVenueName: string
  firstVenueCapacity: number
  latestLiveVenueCapacity: number
  points: number
}

export type SupportPointSummary = {
  total: number
  items: SupportPointItem[]
}

export function calculateSupportPoints(
  purchases: PurchaseRecord[],
  events: TicketEvent[],
  artists: Artist[],
  venues: Venue[],
): SupportPointSummary {
  const sortedPurchases = [...purchases].sort((left, right) =>
    left.purchasedAt.localeCompare(right.purchasedAt),
  )
  const firstPurchaseByArtist = new Map<
    string,
    { event: TicketEvent; venue: Venue; artist: Artist }
  >()

  for (const purchase of sortedPurchases) {
    const event = events.find((candidate) => candidate.id === purchase.eventId)
    const artist = event ? artists.find((candidate) => candidate.id === event.artistId) : undefined
    const venue = event ? venues.find((candidate) => candidate.id === event.venueId) : undefined

    if (event && artist && venue && !firstPurchaseByArtist.has(artist.id)) {
      firstPurchaseByArtist.set(artist.id, { event, venue, artist })
    }
  }

  const items = [...firstPurchaseByArtist.values()].map(({ artist, venue }) => {
    const points = Math.max(artist.latestLiveVenueCapacity - venue.capacity, 0)

    return {
      artistName: artist.name,
      firstVenueName: venue.name,
      firstVenueCapacity: venue.capacity,
      latestLiveVenueCapacity: artist.latestLiveVenueCapacity,
      points,
    }
  })

  return {
    total: items.reduce((sum, item) => sum + item.points, 0),
    items,
  }
}
