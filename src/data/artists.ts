export type Artist = {
  id: string
  name: string
  genre: string
  hometown: string
  profile: string
  debutYear: number
  latestLiveVenueCapacity: number
  latestLiveTitle: string
}

export const artists: Artist[] = [
  {
    id: 'artist-lumen',
    name: 'Lumen Harbor',
    genre: 'オルタナティブ',
    hometown: '下北沢',
    profile: '繊細なギターと透明感のある声で、小さなライブハウスから評判を広げる4人組。',
    debutYear: 2021,
    latestLiveVenueCapacity: 1200,
    latestLiveTitle: 'Spring Tide Hall One Man',
  },
  {
    id: 'artist-quiet-arc',
    name: 'Quiet Arc',
    genre: 'ポストロック',
    hometown: '京都',
    profile: '長尺のインストゥルメンタルと映像演出で、口コミ中心に動員を伸ばしているバンド。',
    debutYear: 2019,
    latestLiveVenueCapacity: 800,
    latestLiveTitle: 'Afterglow Circuit Final',
  },
  {
    id: 'artist-neon-biscuit',
    name: 'Neon Biscuit',
    genre: 'ポップパンク',
    hometown: '名古屋',
    profile: '勢いのあるコーラスと短い曲で、初見でも一気に巻き込むライブが強み。',
    debutYear: 2022,
    latestLiveVenueCapacity: 500,
    latestLiveTitle: 'Sweet Voltage Tour',
  },
  {
    id: 'artist-mint-kitchen',
    name: 'Mint Kitchen',
    genre: 'シティポップ',
    hometown: '福岡',
    profile: '夜の街を思わせる鍵盤とベースラインで、カフェ企画からフェス出演まで広がるデュオ。',
    debutYear: 2020,
    latestLiveVenueCapacity: 650,
    latestLiveTitle: 'Late Plate Showcase',
  },
  {
    id: 'artist-iron-meadow',
    name: 'Iron Meadow',
    genre: 'ハードロック',
    hometown: '札幌',
    profile: 'ラウドなリフと誠実な歌詞で、地方遠征でも熱量の高いファンを増やしている。',
    debutYear: 2018,
    latestLiveVenueCapacity: 1000,
    latestLiveTitle: 'North Amp Arena',
  },
]
