<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PasskeyModal from '@/components/PasskeyModal.vue'
import PublicLayout from '@/components/PublicLayout.vue'
import { useSessionStore } from '@/stores/session'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const email = ref(session.email)
const otp = ref('')
const message = ref('')
const otpIssued = ref(false)
const redirectPath = computed(() => String(route.query.redirect ?? '/mypage'))
const hasStoredPasskey = computed(
  () => session.passkeyRegistered && Boolean(session.email) && !session.isAuthenticated,
)
const showPasskey = ref(hasStoredPasskey.value)

function completeLogin() {
  router.push(redirectPath.value)
}

function startLogin() {
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
    completeLogin()
    return
  }

  message.value = '確認コードが一致しません'
}

function authenticatePasskey() {
  session.authenticateWithPasskey()
  showPasskey.value = false
  completeLogin()
}
</script>

<template>
  <PublicLayout>
    <section class="auth-page">
      <div class="form-panel">
        <p class="eyebrow">Sign in</p>
        <template v-if="hasStoredPasskey">
          <h1>パスキーでログイン</h1>
          <p>{{ session.email }} のパスキーがこの端末に登録されています。</p>
          <button class="button" type="button" @click="startLogin">パスキーでログイン</button>
        </template>
        <template v-else>
          <h1>メールだけでログイン</h1>
          <p>初回はメール確認だけでログインできます。</p>
          <label>
            <span>メールアドレス</span>
            <input v-model="email" autocomplete="email" placeholder="you@example.com" />
          </label>
          <button class="button" type="button" @click="startLogin">ログインを続ける</button>
          <div v-if="otpIssued" class="otp-box">
            <p>確認コード: <strong>428913</strong></p>
            <label>
              <span>OTP</span>
              <input v-model="otp" inputmode="numeric" placeholder="428913" />
            </label>
            <button class="button" type="button" @click="verifyOtp">ログインする</button>
          </div>
          <p v-if="message" class="form-error">{{ message }}</p>
        </template>
      </div>
    </section>
    <PasskeyModal
      v-if="showPasskey"
      mode="authenticate"
      @confirm="authenticatePasskey"
      @close="showPasskey = false"
    />
  </PublicLayout>
</template>
