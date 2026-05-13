<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/components/PublicLayout.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import TicketCard from '@/components/TicketCard.vue'
import { listAreas, listGenres, listOnSaleEvents, listTicketEvents } from '@/domain/catalog'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const session = useSessionStore()
const events = listOnSaleEvents()
const allEvents = listTicketEvents()
const featuredEvent = events[0]
const areas = listAreas()
const genres = listGenres()
const totalRemaining = computed(() => events.reduce((sum, event) => sum + event.remaining, 0))
const totalVenues = computed(() => new Set(allEvents.map((event) => event.venue.id)).size)

function search(params: { query: string; area: string; genre: string }) {
  router.push({ name: 'search', query: params })
}
</script>

<template>
  <PublicLayout>
    <section class="home-hero">
      <div class="home-hero-copy">
        <p class="eyebrow">knoq ticket market</p>
        <h1>
          <span class="hero-line">小規模ライブの</span>
          <span class="hero-line">チケットを探す</span>
        </h1>
        <p>ライブハウス、エリア、ジャンルから、今買える公演を見つけられます。</p>
        <div class="hero-actions">
          <RouterLink class="button" :to="{ name: 'search' }">販売中の公演を見る</RouterLink>
          <RouterLink class="button button-secondary" :to="{ name: 'mypage' }"
            >購入済みチケット</RouterLink
          >
        </div>
      </div>

      <aside class="home-hero-panel" aria-label="掲載状況">
        <div class="hero-panel-brand">
          <img src="/icon.png" alt="" width="64" height="64" />
          <span>knoq</span>
        </div>
        <dl class="top-metrics">
          <div>
            <dt>販売中公演</dt>
            <dd>{{ events.length }}</dd>
          </div>
          <div>
            <dt>購入可能枚数</dt>
            <dd>{{ totalRemaining }}</dd>
          </div>
          <div>
            <dt>掲載会場</dt>
            <dd>{{ totalVenues }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="home-search-block" aria-label="公演検索">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Search</p>
          <h2>公演を探す</h2>
        </div>
      </div>
      <SearchPanel @search="search" />
      <div class="quick-filter-grid" aria-label="よく使う条件">
        <section>
          <h3>エリアから探す</h3>
          <div class="filter-chip-row">
            <RouterLink
              v-for="area in areas"
              :key="area"
              class="filter-chip"
              :to="{ name: 'search', query: { area } }"
            >
              {{ area }}
            </RouterLink>
          </div>
        </section>
        <section>
          <h3>ジャンルから探す</h3>
          <div class="filter-chip-row">
            <RouterLink
              v-for="genre in genres"
              :key="genre"
              class="filter-chip"
              :to="{ name: 'search', query: { genre } }"
            >
              {{ genre }}
            </RouterLink>
          </div>
        </section>
      </div>
    </section>

    <section v-if="featuredEvent" class="feature-strip">
      <div>
        <p class="eyebrow">Pick up</p>
        <h2>{{ featuredEvent.artist.name }}</h2>
        <p>{{ featuredEvent.catchcopy }}</p>
      </div>
      <RouterLink class="button" :to="{ name: 'ticket-detail', params: { id: featuredEvent.id } }">
        注目公演を見る
      </RouterLink>
    </section>

    <section class="section-stack">
      <div class="section-heading">
        <div>
          <p class="eyebrow">On sale</p>
          <h2>販売中のチケット</h2>
        </div>
        <RouterLink :to="{ name: 'search' }">すべて見る</RouterLink>
      </div>
      <div class="ticket-grid">
        <TicketCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          :purchased="session.hasPurchased(event.id)"
        />
      </div>
    </section>
  </PublicLayout>
</template>
