import { artists, type Artist } from '@/data/artists'
import { managedListings, type ManagedListing } from '@/data/managedListings'
import { ticketEvents, type TicketEvent } from '@/data/ticketEvents'
import { venues, type Venue } from '@/data/venues'

export type TicketEventWithRelations = TicketEvent & {
  artist: Artist
  venue: Venue
  remaining: number
  progressRate: number
  statusLabel: string
  isAvailable: boolean
}

export type ManagedListingWithEvent = ManagedListing & {
  event: TicketEventWithRelations
}

function requireRecord<T>(value: T | undefined, label: string): T {
  if (!value) {
    throw new Error(`Missing ${label} in mock catalog`)
  }

  return value
}

export function enrichEvent(event: TicketEvent): TicketEventWithRelations {
  const artist = requireRecord(
    artists.find((candidate) => candidate.id === event.artistId),
    `artist ${event.artistId}`,
  )
  const venue = requireRecord(
    venues.find((candidate) => candidate.id === event.venueId),
    `venue ${event.venueId}`,
  )
  const remaining = Math.max(event.quota - event.sold, 0)

  return {
    ...event,
    artist,
    venue,
    remaining,
    progressRate: Math.round((event.sold / event.quota) * 100),
    statusLabel:
      event.status === 'sold-out' ? '完売' : event.status === 'few-left' ? '残りわずか' : '販売中',
    isAvailable: event.status !== 'sold-out' && remaining > 0,
  }
}

export function listTicketEvents(): TicketEventWithRelations[] {
  return ticketEvents
    .map((event) => enrichEvent(event))
    .sort((left, right) => left.date.localeCompare(right.date))
}

export function listOnSaleEvents(): TicketEventWithRelations[] {
  return listTicketEvents().filter((event) => event.status !== 'sold-out')
}

export function findTicketEvent(eventId: string): TicketEventWithRelations | undefined {
  const event = ticketEvents.find((candidate) => candidate.id === eventId)

  return event ? enrichEvent(event) : undefined
}

export function listAreas(): string[] {
  return [...new Set(venues.map((venue) => venue.area))].sort((left, right) =>
    left.localeCompare(right, 'ja'),
  )
}

export function listGenres(): string[] {
  return [...new Set(artists.map((artist) => artist.genre))].sort((left, right) =>
    left.localeCompare(right, 'ja'),
  )
}

export function listManagedListings(): ManagedListingWithEvent[] {
  return managedListings.map((listing) => ({
    ...listing,
    event: requireRecord(findTicketEvent(listing.eventId), `event ${listing.eventId}`),
  }))
}
