<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PublicLayout from '@/components/PublicLayout.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import TicketCard from '@/components/TicketCard.vue'
import { listTicketEvents } from '@/domain/catalog'
import { searchTickets } from '@/domain/searchTickets'
import { useSessionStore } from '@/stores/session'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

const query = computed(() => String(route.query.query ?? route.query.q ?? ''))
const area = computed(() => String(route.query.area ?? ''))
const genre = computed(() => String(route.query.genre ?? ''))
const results = computed(() =>
  searchTickets(listTicketEvents(), {
    query: query.value,
    area: area.value,
    genre: genre.value,
    onlyAvailable: true,
  }),
)

function search(params: { query: string; area: string; genre: string }) {
  router.push({ name: 'search', query: params })
}
</script>

<template>
  <PublicLayout>
    <section class="section-stack">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Search / knoq</p>
          <h1>条件に合う公演</h1>
        </div>
        <span>{{ results.length }} 件</span>
      </div>
      <SearchPanel
        :initial-query="query"
        :initial-area="area"
        :initial-genre="genre"
        @search="search"
      />
      <div v-if="results.length" class="ticket-grid">
        <TicketCard
          v-for="event in results"
          :key="event.id"
          :event="event"
          :purchased="session.hasPurchased(event.id)"
        />
      </div>
      <div v-else class="empty-state">
        <h2>条件に合うチケットがありません</h2>
        <p>キーワードやエリアを変えると、販売中の公演が見つかるかもしれません。</p>
      </div>
    </section>
  </PublicLayout>
</template>
