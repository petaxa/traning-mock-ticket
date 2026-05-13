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
      <RouterLink class="brand customer-brand" :to="{ name: 'home' }" aria-label="knoq ホーム">
        <img class="brand-logo" src="/icon.png" alt="" width="44" height="44" />
        <span>
          <strong>knoq</strong>
          <small>小規模ライブのチケットマーケット</small>
        </span>
      </RouterLink>
      <nav class="header-nav" aria-label="購入者メニュー">
        <RouterLink :to="{ name: 'home' }">公演を探す</RouterLink>
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
