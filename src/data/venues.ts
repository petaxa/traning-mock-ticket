export type Venue = {
  id: string
  name: string
  area: string
  address: string
  capacity: number
  accessNote: string
}

export const venues: Venue[] = [
  {
    id: 'venue-basement-loop',
    name: 'Basement Loop',
    area: '下北沢',
    address: '東京都世田谷区北沢2-11-8',
    capacity: 120,
    accessNote: '下北沢駅から徒歩4分。入場時にドリンク代が必要です。',
  },
  {
    id: 'venue-kyoto-metroline',
    name: 'Kyoto Metroline',
    area: '京都',
    address: '京都府京都市中京区河原町通三条下ル',
    capacity: 180,
    accessNote: '三条駅から徒歩6分。クロークは数量限定です。',
  },
  {
    id: 'venue-nagoya-spark',
    name: 'Nagoya Spark',
    area: '名古屋',
    address: '愛知県名古屋市中区栄3-18-1',
    capacity: 250,
    accessNote: '矢場町駅から徒歩5分。再入場不可です。',
  },
  {
    id: 'venue-fukuoka-dock',
    name: 'Fukuoka Dock',
    area: '福岡',
    address: '福岡県福岡市中央区天神1-8-1',
    capacity: 300,
    accessNote: '天神駅から徒歩3分。整列は開場30分前からです。',
  },
  {
    id: 'venue-sapporo-grid',
    name: 'Sapporo Grid',
    area: '札幌',
    address: '北海道札幌市中央区南4条西5-10',
    capacity: 220,
    accessNote: 'すすきの駅から徒歩5分。冬季は入場列の防寒を推奨します。',
  },
]
