<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import CheckoutShell from '@/components/CheckoutShell.vue'
import { findTicketEvent } from '@/domain/catalog'
import { calculateOrderSummary, formatCurrency } from '@/domain/checkout'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const session = useSessionStore()
const event = computed(() => findTicketEvent(props.id))
const summary = computed(() => (event.value ? calculateOrderSummary(event.value, 1) : undefined))

function completePurchase() {
  if (!event.value || !summary.value) {
    return
  }

  if (!session.isAuthenticated) {
    router.push({ name: 'checkout-register', params: { id: props.id } })
    return
  }

  session.purchaseTicket(event.value.id, summary.value.quantity, summary.value.total)
  router.replace({
    name: 'ticket-detail',
    params: { id: event.value.id },
    query: { fresh: '1' },
  })
}
</script>

<template>
  <CheckoutShell v-if="event && summary" :event="event" step="confirm">
    <section class="form-panel">
      <p class="eyebrow">Order review</p>
      <h2>購入内容の確認</h2>
      <dl class="receipt-list">
        <div>
          <dt>チケット</dt>
          <dd>{{ formatCurrency(summary.ticketSubtotal) }}</dd>
        </div>
        <div>
          <dt>サービス手数料</dt>
          <dd>{{ formatCurrency(summary.serviceFee) }}</dd>
        </div>
        <div>
          <dt>枚数</dt>
          <dd>{{ summary.quantity }} 枚</dd>
        </div>
        <div class="receipt-total">
          <dt>合計</dt>
          <dd>{{ formatCurrency(summary.total) }}</dd>
        </div>
      </dl>
      <div class="stripe-note">
        <strong>支払い方法</strong>
        <span>Visa **** 4242</span>
      </div>
      <button class="button" type="button" @click="completePurchase">決済を完了する</button>
    </section>
  </CheckoutShell>
</template>
