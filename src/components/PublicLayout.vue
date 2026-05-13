<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()
const route = useRoute()
const router = useRouter()

function logout() {
  session.logout()
  router.push({ name: 'signin', query: { redirect: route.fullPath } })
}
</script>

<template>
  <div class="app-shell customer-shell">
    <header class="site-header">
      <RouterLink class="brand" :to="{ name: 'home' }">
        <span class="brand-mark">IT</span>
        <span>
          <strong>Indie Ticket</strong>
          <small>ノルマを次の観客へ</small>
        </span>
      </RouterLink>
      <nav class="header-nav" aria-label="購入者メニュー">
        <RouterLink :to="{ name: 'home' }">探す</RouterLink>
        <RouterLink :to="{ name: 'mypage' }">マイページ</RouterLink>
        <button v-if="session.isAuthenticated" class="text-button" type="button" @click="logout">
          ログアウト
        </button>
        <RouterLink v-else :to="{ name: 'signin' }">ログイン</RouterLink>
      </nav>
    </header>

    <main class="page-content">
      <slot />
    </main>
  </div>
</template>
