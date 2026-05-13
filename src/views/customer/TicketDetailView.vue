<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventPoster from '@/components/EventPoster.vue'
import PasskeyModal from '@/components/PasskeyModal.vue'
import PublicLayout from '@/components/PublicLayout.vue'
import { findTicketEvent } from '@/domain/catalog'
import { formatCurrency } from '@/domain/checkout'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{
  id: string
}>()

const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const event = computed(() => findTicketEvent(props.id))
const purchase = computed(() =>
  event.value ? session.purchaseForEvent(event.value.id) : undefined,
)
const hasReceivedPaperTicket = computed(() => Boolean(purchase.value?.receivedAt))
const showPasskeyPrompt = ref(
  route.query.fresh === '1' && session.isAuthenticated && !session.passkeyRegistered,
)
const checkoutRoute = computed(() => {
  if (!event.value) {
    return { name: 'home' }
  }

  return session.isAuthenticated
    ? { name: 'checkout-payment', params: { id: event.value.id } }
    : { name: 'checkout-register', params: { id: event.value.id } }
})

function registerPasskey() {
  session.registerPasskey()
  showPasskeyPrompt.value = false
  router.replace({ name: 'ticket-detail', params: { id: props.id } })
}

function closePasskeyPrompt() {
  showPasskeyPrompt.value = false
  router.replace({ name: 'ticket-detail', params: { id: props.id } })
}
</script>

<template>
  <PublicLayout>
    <section v-if="event" class="detail-layout">
      <EventPoster :event="event" />
      <article class="detail-panel">
        <div class="meta-row">
          <span class="status-pill" :class="`status-${event.status}`">{{ event.statusLabel }}</span>
          <span>{{ event.artist.genre }}</span>
        </div>
        <h1>{{ event.title }}</h1>
        <p class="lead">{{ event.description }}</p>
        <dl class="info-grid">
          <div>
            <dt>アーティスト</dt>
            <dd>{{ event.artist.name }}</dd>
          </div>
          <div>
            <dt>会場</dt>
            <dd>{{ event.venue.name }} / {{ event.venue.area }}</dd>
          </div>
          <div>
            <dt>日時</dt>
            <dd>{{ event.date }} {{ event.doorsOpen }}開場 {{ event.startTime }}開演</dd>
          </div>
          <div>
            <dt>チケット</dt>
            <dd>{{ formatCurrency(event.price) }} + 手数料 {{ formatCurrency(event.fee) }}</dd>
          </div>
          <div>
            <dt>残り</dt>
            <dd>{{ event.remaining }} 枚 / 掲載 {{ event.quota }} 枚</dd>
          </div>
          <div>
            <dt>アクセス</dt>
            <dd>{{ event.venue.accessNote }}</dd>
          </div>
        </dl>
        <section class="artist-note">
          <h2>販売者コメント</h2>
          <p>{{ event.organizerComment }}</p>
        </section>
        <div class="action-row">
          <button v-if="hasReceivedPaperTicket" class="button" type="button" disabled>
            受け取り済み
          </button>
          <RouterLink
            v-else-if="purchase"
            class="button"
            :to="{ name: 'ticket-pickup', params: { id: event.id } }"
          >
            受け取り確認へ
          </RouterLink>
          <RouterLink v-else-if="event.isAvailable" class="button" :to="checkoutRoute">
            購入手続きへ
          </RouterLink>
          <button v-else class="button" type="button" disabled>完売しました</button>
          <RouterLink class="button button-secondary" :to="{ name: 'search' }"
            >他の公演を探す</RouterLink
          >
        </div>
      </article>
    </section>
    <section v-else class="empty-state">
      <h1>チケットが見つかりません</h1>
      <RouterLink class="button" :to="{ name: 'home' }">トップへ戻る</RouterLink>
    </section>
    <PasskeyModal
      v-if="showPasskeyPrompt"
      mode="register"
      @confirm="registerPasskey"
      @close="closePasskeyPrompt"
    />
  </PublicLayout>
</template>
