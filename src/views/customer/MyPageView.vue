<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/components/PublicLayout.vue'
import TicketCard from '@/components/TicketCard.vue'
import { artists } from '@/data/artists'
import { ticketEvents } from '@/data/ticketEvents'
import { venues } from '@/data/venues'
import { findTicketEvent } from '@/domain/catalog'
import { calculateSupportPoints } from '@/domain/supportPoints'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const session = useSessionStore()

watchEffect(() => {
  if (!session.isAuthenticated) {
    router.replace({ name: 'signin', query: { redirect: '/mypage' } })
  }
})

const purchasedEvents = computed(() =>
  session.purchases
    .map((purchase) => findTicketEvent(purchase.eventId))
    .filter((event) => event !== undefined),
)
const supportPoints = computed(() =>
  calculateSupportPoints(session.purchases, ticketEvents, artists, venues),
)
</script>

<template>
  <PublicLayout>
    <section class="mypage-grid">
      <aside class="profile-panel">
        <p class="eyebrow">My knoq</p>
        <h1>{{ session.userDisplayName }}</h1>
        <dl class="compact-list">
          <div>
            <dt>登録メール</dt>
            <dd>{{ session.email }}</dd>
          </div>
          <div>
            <dt>Passkey</dt>
            <dd>{{ session.passkeyRegistered ? '登録済み' : '未登録' }}</dd>
          </div>
          <div>
            <dt>購入枚数</dt>
            <dd>{{ session.purchases.length }} 枚</dd>
          </div>
        </dl>
      </aside>
      <section class="point-panel">
        <p class="eyebrow">Support impact</p>
        <h2 :aria-label="`応援ポイント ${supportPoints.total} pt`">{{ supportPoints.total }} pt</h2>
        <p>初めて買った箱のキャパと、そのバンドの最新ライブキャパの差をポイント化しています。</p>
        <ul v-if="supportPoints.items.length" class="point-list">
          <li v-for="item in supportPoints.items" :key="item.artistName">
            <span>{{ item.artistName }}</span>
            <strong>{{ item.points }} pt</strong>
            <small
              >{{ item.firstVenueName }} {{ item.firstVenueCapacity }}人 → 最新
              {{ item.latestLiveVenueCapacity }}人</small
            >
          </li>
        </ul>
      </section>
    </section>

    <section class="section-stack">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Saved tickets</p>
          <h2>購入済みチケット</h2>
        </div>
      </div>
      <div v-if="purchasedEvents.length" class="ticket-grid">
        <TicketCard v-for="event in purchasedEvents" :key="event.id" :event="event" purchased />
      </div>
      <div v-else class="empty-state">
        <h2>まだ購入済みチケットがありません</h2>
        <RouterLink class="button" :to="{ name: 'home' }">チケットを探す</RouterLink>
      </div>
    </section>
  </PublicLayout>
</template>
