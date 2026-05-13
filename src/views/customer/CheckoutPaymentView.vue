<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CheckoutShell from '@/components/CheckoutShell.vue'
import { findTicketEvent } from '@/domain/catalog'
import { calculateOrderSummary, formatCurrency, validatePaymentInput } from '@/domain/checkout'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const session = useSessionStore()
const event = computed(() => findTicketEvent(props.id))
const summary = computed(() => (event.value ? calculateOrderSummary(event.value, 1) : undefined))
const payment = reactive({
  cardNumber: '4242 4242 4242 4242',
  expiration: '12/30',
  cvc: '123',
  cardholder: 'TICKET FAN',
})
const errors = ref<string[]>([])

function submitPayment() {
  if (!session.isAuthenticated) {
    router.push({ name: 'checkout-register', params: { id: props.id } })
    return
  }

  errors.value = validatePaymentInput(payment)

  if (errors.value.length === 0) {
    router.push({ name: 'checkout-confirm', params: { id: props.id } })
  }
}
</script>

<template>
  <CheckoutShell v-if="event && summary" :event="event" step="payment">
    <section class="stripe-shell">
      <div>
        <p class="eyebrow">Stripe style mock</p>
        <h2>カード情報</h2>
        <p>テスト用カード情報を入力済みにしています。実際の決済は発生しません。</p>
      </div>
      <div class="payment-form">
        <label>
          <span>カード番号</span>
          <input v-model="payment.cardNumber" inputmode="numeric" autocomplete="cc-number" />
        </label>
        <div class="form-grid">
          <label>
            <span>有効期限</span>
            <input v-model="payment.expiration" autocomplete="cc-exp" />
          </label>
          <label>
            <span>CVC</span>
            <input v-model="payment.cvc" inputmode="numeric" autocomplete="cc-csc" />
          </label>
        </div>
        <label>
          <span>カード名義</span>
          <input v-model="payment.cardholder" autocomplete="cc-name" />
        </label>
      </div>
      <div class="price-box">
        <span>請求額</span>
        <strong>{{ formatCurrency(summary.total) }}</strong>
      </div>
      <ul v-if="errors.length" class="form-error-list">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <button class="button" type="button" @click="submitPayment">確認画面へ</button>
    </section>
  </CheckoutShell>
</template>
