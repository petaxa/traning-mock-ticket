<script setup lang="ts">
import EventPoster from '@/components/EventPoster.vue'
import { formatCurrency } from '@/domain/checkout'
import type { TicketEventWithRelations } from '@/domain/catalog'

defineProps<{
  event: TicketEventWithRelations
  purchased?: boolean
}>()
</script>

<template>
  <article class="ticket-card">
    <EventPoster :event="event" compact />
    <div class="ticket-card-body">
      <div class="meta-row">
        <span class="status-pill" :class="`status-${event.status}`">{{ event.statusLabel }}</span>
        <span>{{ event.venue.area }}</span>
      </div>
      <h2>{{ event.title }}</h2>
      <p>{{ event.catchcopy }}</p>
      <dl class="compact-list">
        <div>
          <dt>日時</dt>
          <dd>{{ event.date }} {{ event.startTime }}</dd>
        </div>
        <div>
          <dt>会場</dt>
          <dd>{{ event.venue.name }}</dd>
        </div>
        <div>
          <dt>料金</dt>
          <dd>{{ formatCurrency(event.price + event.fee) }}</dd>
        </div>
      </dl>
      <div class="ticket-card-footer">
        <span>{{ event.remaining }} / {{ event.quota }} 枚</span>
        <RouterLink
          class="button button-small"
          :to="{ name: 'ticket-detail', params: { id: event.id } }"
        >
          {{ purchased ? '詳細を開く' : '詳細を見る' }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>
