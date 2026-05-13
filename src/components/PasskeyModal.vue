<script setup lang="ts">
defineProps<{
  mode: 'register' | 'authenticate'
}>()

defineEmits<{
  confirm: []
  close: []
}>()
</script>

<template>
  <div class="modal-backdrop" role="presentation">
    <section
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="mode === 'register' ? 'passkey-register-title' : 'passkey-auth-title'"
    >
      <p class="eyebrow">Passkey</p>
      <h2 :id="mode === 'register' ? 'passkey-register-title' : 'passkey-auth-title'">
        {{ mode === 'register' ? '次回からパスキーでログイン' : 'パスキーでログイン' }}
      </h2>
      <p>
        {{
          mode === 'register'
            ? '本来は Touch ID や Face ID で端末にパスキーを登録します。このモックではボタンで登録完了にします。'
            : '本来は Touch ID や Face ID で本人確認します。このモックではボタンで認証完了にします。'
        }}
      </p>
      <div class="modal-actions">
        <button class="button" type="button" @click="$emit('confirm')">
          {{ mode === 'register' ? 'パスキーを登録' : '認証する' }}
        </button>
        <button class="button button-secondary" type="button" @click="$emit('close')">
          閉じる
        </button>
      </div>
    </section>
  </div>
</template>
