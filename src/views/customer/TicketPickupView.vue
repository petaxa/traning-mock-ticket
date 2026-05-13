<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { findTicketEvent } from '@/domain/catalog'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const session = useSessionStore()
const event = computed(() => findTicketEvent(props.id))
const purchase = computed(() => session.purchaseForEvent(props.id))
const confirmed = ref(false)
const canConfirm = computed(() =>
  Boolean(event.value && purchase.value && !purchase.value.receivedAt),
)

watchEffect(() => {
  if (!event.value || !purchase.value || purchase.value.receivedAt) {
    router.replace({ name: 'ticket-detail', params: { id: props.id } })
  }
})

function completePickup() {
  if (!confirmed.value || !canConfirm.value) {
    return
  }

  session.setPaperTicketReceived(props.id, true)
  router.replace({ name: 'ticket-detail', params: { id: props.id } })
}
</script>

<template>
  <main v-if="purchase && canConfirm" class="pickup-confirmation-shell">
    <section class="pickup-confirmation-panel" aria-labelledby="pickup-confirmation-title">
      <p class="eyebrow">knoq paper pickup</p>
      <h1 id="pickup-confirmation-title">受け取り確認</h1>
      <p>スタッフが控えと照合する購入番号です。確認後、紙チケットを手渡してください。</p>

      <div class="pickup-number pickup-number-large" aria-label="購入番号">
        <span>購入番号</span>
        <strong>{{ purchase.purchaseNumber }}</strong>
      </div>

      <label class="handoff-check handoff-check-large">
        <input v-model="confirmed" type="checkbox" />
        <span>購入番号を確認し、紙チケットを受け取り済みにする</span>
      </label>

      <button class="button" type="button" :disabled="!confirmed" @click="completePickup">
        完了して閉じる
      </button>
    </section>
  </main>
</template>
