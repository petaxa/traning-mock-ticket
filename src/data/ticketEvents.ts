export type TicketEventStatus = 'on-sale' | 'few-left' | 'sold-out'

export type TicketEvent = {
  id: string
  artistId: string
  venueId: string
  title: string
  date: string
  doorsOpen: string
  startTime: string
  price: number
  fee: number
  quota: number
  sold: number
  maxOrder: number
  status: TicketEventStatus
  catchcopy: string
  description: string
  organizerComment: string
  poster: {
    accent: string
    base: string
    texture: string
  }
}

export const ticketEvents: TicketEvent[] = [
  {
    id: 'evt-lumen-loop',
    artistId: 'artist-lumen',
    venueId: 'venue-basement-loop',
    title: 'Lumen Harbor "Night Buoy"',
    date: '2026-06-14',
    doorsOpen: '18:00',
    startTime: '18:45',
    price: 3200,
    fee: 360,
    quota: 40,
    sold: 28,
    maxOrder: 2,
    status: 'on-sale',
    catchcopy: 'はじめてのワンマン前夜を、いちばん近い距離で。',
    description:
      'Lumen Harbor が新曲を含むセットで臨む企画ライブ。チケットノルマの一部をファンと新しいリスナーへ直接届けます。',
    organizerComment: '小さな箱だからこそ、演奏の揺れや息づかいまで感じられる夜になります。',
    poster: {
      accent: '#19a7ce',
      base: '#0f172a',
      texture: '#facc15',
    },
  },
  {
    id: 'evt-quiet-metroline',
    artistId: 'artist-quiet-arc',
    venueId: 'venue-kyoto-metroline',
    title: 'Quiet Arc "Trace the Room"',
    date: '2026-06-22',
    doorsOpen: '19:00',
    startTime: '19:30',
    price: 2800,
    fee: 320,
    quota: 24,
    sold: 21,
    maxOrder: 2,
    status: 'few-left',
    catchcopy: '音が立ち上がる瞬間を静かに見届ける。',
    description: '京都発のポストロックバンド Quiet Arc の自主企画。残席わずかの小規模公演です。',
    organizerComment: '映像演出の都合上、開演後は入場タイミングを制限する場合があります。',
    poster: {
      accent: '#a3e635',
      base: '#1f2937',
      texture: '#38bdf8',
    },
  },
  {
    id: 'evt-neon-spark',
    artistId: 'artist-neon-biscuit',
    venueId: 'venue-nagoya-spark',
    title: 'Neon Biscuit "Sugar Rush"',
    date: '2026-07-03',
    doorsOpen: '17:30',
    startTime: '18:15',
    price: 2600,
    fee: 300,
    quota: 55,
    sold: 17,
    maxOrder: 4,
    status: 'on-sale',
    catchcopy: '3分で火がつく、名古屋の高速ポップパンク。',
    description: '遠征前の助走になる名古屋公演。友達を誘いやすい価格帯で販売します。',
    organizerComment: '前方エリアはかなり動きます。荷物はロッカー利用をおすすめします。',
    poster: {
      accent: '#fb7185',
      base: '#111827',
      texture: '#f97316',
    },
  },
  {
    id: 'evt-mint-dock',
    artistId: 'artist-mint-kitchen',
    venueId: 'venue-fukuoka-dock',
    title: 'Mint Kitchen "Late Plate"',
    date: '2026-07-11',
    doorsOpen: '18:30',
    startTime: '19:00',
    price: 3000,
    fee: 340,
    quota: 36,
    sold: 30,
    maxOrder: 2,
    status: 'few-left',
    catchcopy: '週末の天神で、夜にほどけるシティポップ。',
    description:
      '福岡の会場キャパを広げるためのトライアル公演。初めての人も入りやすいセットリストです。',
    organizerComment: '終演後に短い物販時間があります。会場周辺での滞留はお控えください。',
    poster: {
      accent: '#14b8a6',
      base: '#172554',
      texture: '#fde68a',
    },
  },
  {
    id: 'evt-iron-grid',
    artistId: 'artist-iron-meadow',
    venueId: 'venue-sapporo-grid',
    title: 'Iron Meadow "Cold Current"',
    date: '2026-07-19',
    doorsOpen: '18:00',
    startTime: '18:40',
    price: 3400,
    fee: 380,
    quota: 30,
    sold: 30,
    maxOrder: 2,
    status: 'sold-out',
    catchcopy: '札幌の熱量で、次の遠征へ押し上げる。',
    description: '地元ファンの後押しで完売した札幌公演。再販売が出た場合はトップに表示されます。',
    organizerComment: '現在は完売しています。入場順は購入完了メールの整理番号をご確認ください。',
    poster: {
      accent: '#f43f5e',
      base: '#18181b',
      texture: '#94a3b8',
    },
  },
  {
    id: 'evt-lumen-dock',
    artistId: 'artist-lumen',
    venueId: 'venue-fukuoka-dock',
    title: 'Lumen Harbor "South Signal"',
    date: '2026-08-02',
    doorsOpen: '17:45',
    startTime: '18:30',
    price: 3300,
    fee: 360,
    quota: 42,
    sold: 11,
    maxOrder: 3,
    status: 'on-sale',
    catchcopy: '遠征の最初の一枚を、福岡から。',
    description: '初の福岡単独企画に向けた販売枠。遠方ファンと地元の新規リスナーをつなぎます。',
    organizerComment: '整理番号順入場です。同行者分のチケットは同時入場をお願いします。',
    poster: {
      accent: '#06b6d4',
      base: '#164e63',
      texture: '#f59e0b',
    },
  },
]
