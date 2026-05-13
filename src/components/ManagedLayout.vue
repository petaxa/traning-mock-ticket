<template>
  <div class="app-shell managed-shell">
    <header class="site-header managed-header">
      <RouterLink class="brand" :to="{ name: 'managed-dashboard' }">
        <span class="brand-mark">MG</span>
        <span>
          <strong>Seller Console</strong>
          <small>販売者管理画面</small>
        </span>
      </RouterLink>
      <nav class="header-nav" aria-label="販売者メニュー">
        <RouterLink :to="{ name: 'managed-dashboard' }">概要</RouterLink>
        <RouterLink :to="{ name: 'managed-events' }">公演</RouterLink>
        <RouterLink :to="{ name: 'managed-orders' }">販売</RouterLink>
      </nav>
    </header>

    <main class="page-content managed-content">
      <slot />
    </main>
  </div>
</template>
