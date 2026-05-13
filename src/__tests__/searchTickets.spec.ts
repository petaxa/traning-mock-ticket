import { describe, expect, it } from 'vite-plus/test'
import { listTicketEvents } from '@/domain/catalog'
import { searchTickets } from '@/domain/searchTickets'

describe('searchTickets', () => {
  it('finds on-sale events by artist, venue area, and genre', () => {
    const events = listTicketEvents()

    const byArtist = searchTickets(events, { query: 'lumen', onlyAvailable: true })
    const byAreaAndGenre = searchTickets(events, {
      area: '福岡',
      genre: 'シティポップ',
      onlyAvailable: true,
    })

    expect(byArtist.map((event) => event.artist.name)).toContain('Lumen Harbor')
    expect(byAreaAndGenre).toHaveLength(1)
    expect(byAreaAndGenre[0]?.title).toContain('Late Plate')
  })

  it('keeps sold-out tickets out of purchasable search results', () => {
    const events = listTicketEvents()

    const results = searchTickets(events, { query: 'Iron Meadow', onlyAvailable: true })

    expect(results).toHaveLength(0)
  })
})
