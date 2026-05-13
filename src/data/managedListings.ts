export type ManagedListing = {
  id: string
  eventId: string
  sellerName: string
  quotaAssigned: number
  payoutRate: number
  note: string
  updatedAt: string
}

export const managedListings: ManagedListing[] = [
  {
    id: 'listing-lumen-loop',
    eventId: 'evt-lumen-loop',
    sellerName: 'Lumen Harbor 取り置き担当',
    quotaAssigned: 40,
    payoutRate: 0.92,
    note: 'ワンマン前の手売り枠。新規客への販売比率を上げたい。',
    updatedAt: '2026-05-10T09:00:00+09:00',
  },
  {
    id: 'listing-quiet-metroline',
    eventId: 'evt-quiet-metroline',
    sellerName: 'Quiet Arc 制作',
    quotaAssigned: 24,
    payoutRate: 0.9,
    note: '残席僅少。京都以外からの来場者に届けたい。',
    updatedAt: '2026-05-09T18:30:00+09:00',
  },
  {
    id: 'listing-neon-spark',
    eventId: 'evt-neon-spark',
    sellerName: 'Neon Biscuit 物販',
    quotaAssigned: 55,
    payoutRate: 0.88,
    note: '友達同士で買いやすいよう、最大4枚まで許可。',
    updatedAt: '2026-05-08T13:20:00+09:00',
  },
  {
    id: 'listing-mint-dock',
    eventId: 'evt-mint-dock',
    sellerName: 'Mint Kitchen 企画',
    quotaAssigned: 36,
    payoutRate: 0.91,
    note: '天神エリアの新規層へ露出を増やす。',
    updatedAt: '2026-05-10T21:10:00+09:00',
  },
  {
    id: 'listing-iron-grid',
    eventId: 'evt-iron-grid',
    sellerName: 'Iron Meadow 札幌支部',
    quotaAssigned: 30,
    payoutRate: 0.9,
    note: '完売。キャンセル待ち導線の検証対象。',
    updatedAt: '2026-05-07T20:45:00+09:00',
  },
]
