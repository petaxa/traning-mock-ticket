<script setup lang="ts">
import { computed } from 'vue'
import ManagedLayout from '@/components/ManagedLayout.vue'
import { formatCurrency } from '@/domain/checkout'
import { listManagedListings } from '@/domain/catalog'

const listings = listManagedListings()
const totalQuota = computed(() => listings.reduce((sum, listing) => sum + listing.quotaAssigned, 0))
const totalSold = computed(() => listings.reduce((sum, listing) => sum + listing.event.sold, 0))
const grossSales = computed(() =>
  listings.reduce((sum, listing) => sum + listing.event.sold * listing.event.price, 0),
)
const sellThrough = computed(() => Math.round((totalSold.value / totalQuota.value) * 100))
</script>

<template>
  <ManagedLayout>
    <section class="section-stack">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Dashboard</p>
          <h1>販売状況</h1>
        </div>
      </div>
      <div class="metric-grid">
        <div>
          <span>掲載公演</span>
          <strong>{{ listings.length }}</strong>
        </div>
        <div>
          <span>販売枚数</span>
          <strong>{{ totalSold }} / {{ totalQuota }}</strong>
        </div>
        <div>
          <span>消化率</span>
          <strong>{{ sellThrough }}%</strong>
        </div>
        <div>
          <span>総販売額</span>
          <strong>{{ formatCurrency(grossSales) }}</strong>
        </div>
      </div>
      <section class="operations-panel">
        <h2>優先対応</h2>
        <ul class="operations-list">
          <li
            v-for="listing in listings.filter((item) => item.event.status === 'few-left')"
            :key="listing.id"
          >
            <span>{{ listing.event.title }}</span>
            <strong>残り {{ listing.event.remaining }} 枚</strong>
          </li>
        </ul>
      </section>
    </section>
  </ManagedLayout>
</template>
