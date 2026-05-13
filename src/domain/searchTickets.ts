import type { TicketEventWithRelations } from './catalog'

export type TicketSearchParams = {
  query?: string
  area?: string
  genre?: string
  onlyAvailable?: boolean
}

function includesNormalized(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.toLowerCase())
}

export function searchTickets(
  events: TicketEventWithRelations[],
  params: TicketSearchParams,
): TicketEventWithRelations[] {
  const query = params.query?.trim() ?? ''

  return events
    .filter((event) => {
      if (params.onlyAvailable && !event.isAvailable) {
        return false
      }

      if (params.area && event.venue.area !== params.area) {
        return false
      }

      if (params.genre && event.artist.genre !== params.genre) {
        return false
      }

      if (!query) {
        return true
      }

      return [
        event.title,
        event.artist.name,
        event.artist.genre,
        event.venue.name,
        event.venue.area,
        event.catchcopy,
      ].some((field) => includesNormalized(field, query))
    })
    .sort((left, right) => left.date.localeCompare(right.date))
}
