<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CheckoutShell from '@/components/CheckoutShell.vue'
import PasskeyModal from '@/components/PasskeyModal.vue'
import { findTicketEvent } from '@/domain/catalog'
import { useSessionStore } from '@/stores/session'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const session = useSessionStore()
const event = computed(() => findTicketEvent(props.id))
const email = ref(session.email)
const otp = ref('')
const message = ref('')
const otpIssued = ref(false)
const hasStoredPasskey = computed(
  () => session.passkeyRegistered && Boolean(session.email) && !session.isAuthenticated,
)
const showPasskey = ref(hasStoredPasskey.value)

function goNext() {
  router.push({ name: 'checkout-payment', params: { id: props.id } })
}

function startRegistration() {
  if (hasStoredPasskey.value) {
    showPasskey.value = true
    return
  }

  const result = session.startEmailRegistration(email.value)
  message.value = result.message ?? ''
  otpIssued.value = result.ok && result.mode === 'otp'
  showPasskey.value = result.ok && result.mode === 'passkey'
}

function verifyOtp() {
  if (session.verifyEmailOtp(otp.value)) {
    goNext()
    return
  }

  message.value = '確認コードが一致しません'
}

function authenticatePasskey() {
  session.authenticateWithPasskey()
  showPasskey.value = false
  goNext()
}
</script>

<template>
  <CheckoutShell v-if="event" :event="event" step="register">
    <section class="form-panel">
      <p class="eyebrow">One minute signup</p>
      <template v-if="hasStoredPasskey">
        <h2>パスキーで購入を続ける</h2>
        <p>{{ session.email }} のパスキーがこの端末に登録されています。</p>
        <button class="button" type="button" @click="startRegistration">パスキーでログイン</button>
      </template>
      <template v-else>
        <h2>メールだけで購入を始める</h2>
        <p>名前やプロフィール入力はスキップし、メール確認だけで決済へ進めます。</p>

        <label>
          <span>メールアドレス</span>
          <input v-model="email" autocomplete="email" placeholder="you@example.com" />
        </label>
        <button class="button" type="button" @click="startRegistration">確認コードを発行</button>

        <div v-if="otpIssued" class="otp-box">
          <p>確認コード: <strong>428913</strong></p>
          <label>
            <span>OTP</span>
            <input v-model="otp" inputmode="numeric" placeholder="428913" />
          </label>
          <button class="button" type="button" @click="verifyOtp">登録して支払いへ</button>
        </div>
        <p v-if="message" class="form-error">{{ message }}</p>
      </template>
    </section>
    <PasskeyModal
      v-if="showPasskey"
      mode="authenticate"
      @confirm="authenticatePasskey"
      @close="showPasskey = false"
    />
  </CheckoutShell>
</template>
