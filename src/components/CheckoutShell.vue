<script setup lang="ts">
import type { TicketEventWithRelations } from '@/domain/catalog'
import { formatCurrency } from '@/domain/checkout'
import PublicLayout from './PublicLayout.vue'

defineProps<{
  event: TicketEventWithRelations
  step: 'register' | 'payment' | 'confirm'
}>()
</script>

<template>
  <PublicLayout>
    <section class="checkout-layout" aria-label="購入手続き">
      <aside class="checkout-summary">
        <p class="eyebrow">Secure Checkout</p>
        <h1>{{ event.title }}</h1>
        <dl class="compact-list">
          <div>
            <dt>会場</dt>
            <dd>{{ event.venue.name }}</dd>
          </div>
          <div>
            <dt>開演</dt>
            <dd>{{ event.date }} {{ event.startTime }}</dd>
          </div>
          <div>
            <dt>合計目安</dt>
            <dd>{{ formatCurrency(event.price + event.fee) }}</dd>
          </div>
        </dl>
      </aside>
      <div class="checkout-main">
        <ol class="stepper" aria-label="購入ステップ">
          <li :class="{ active: step === 'register' }">登録</li>
          <li :class="{ active: step === 'payment' }">支払い</li>
          <li :class="{ active: step === 'confirm' }">確認</li>
        </ol>
        <slot />
      </div>
    </section>
  </PublicLayout>
</template>
