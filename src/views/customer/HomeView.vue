<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/components/PublicLayout.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import TicketCard from '@/components/TicketCard.vue'
import { listOnSaleEvents, listTicketEvents } from '@/domain/catalog'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const session = useSessionStore()
const events = listOnSaleEvents()
const allEvents = listTicketEvents()
const featuredEvent = events[0]
const totalRemaining = computed(() => events.reduce((sum, event) => sum + event.remaining, 0))
const totalVenues = computed(() => new Set(allEvents.map((event) => event.venue.id)).size)

function search(params: { query: string; area: string; genre: string }) {
  router.push({ name: 'search', query: params })
}
</script>

<template>
  <PublicLayout>
    <section class="top-band">
      <div class="top-copy">
        <p class="eyebrow">Independent ticket marketplace</p>
        <h1>手売りの一枚をあなたへ。</h1>
        <p>ノルマで抱えたチケットを、ライブに行きたい人へ広く届けるモックプラットフォームです。</p>
      </div>
      <div class="top-metrics" aria-label="販売状況">
        <div>
          <strong>{{ events.length }}</strong>
          <span>販売中公演</span>
        </div>
        <div>
          <strong>{{ totalRemaining }}</strong>
          <span>購入可能枚数</span>
        </div>
        <div>
          <strong>{{ totalVenues }}</strong>
          <span>掲載会場</span>
        </div>
      </div>
    </section>

    <SearchPanel @search="search" />

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
          <h2>現在販売中のチケット</h2>
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
