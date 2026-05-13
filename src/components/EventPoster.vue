<script setup lang="ts">
import type { TicketEventWithRelations } from '@/domain/catalog'

defineProps<{
  event: TicketEventWithRelations
  compact?: boolean
}>()
</script>

<template>
  <div
    class="event-poster"
    :class="{ 'event-poster-compact': compact }"
    :style="{
      '--poster-base': event.poster.base,
      '--poster-accent': event.poster.accent,
      '--poster-texture': event.poster.texture,
    }"
    role="img"
    :aria-label="`${event.artist.name} の公演ポスター`"
  >
    <div class="poster-grid"></div>
    <div class="poster-lines"></div>
    <span class="poster-area">{{ event.venue.area }}</span>
    <strong>{{ event.artist.name }}</strong>
    <small>{{ event.date.replaceAll('-', '.') }}</small>
  </div>
</template>
