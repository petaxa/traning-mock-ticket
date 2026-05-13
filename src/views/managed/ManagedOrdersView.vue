<script setup lang="ts">
import ManagedLayout from '@/components/ManagedLayout.vue'
import { formatCurrency } from '@/domain/checkout'
import { listManagedListings } from '@/domain/catalog'

const listings = listManagedListings()
</script>

<template>
  <ManagedLayout>
    <section class="section-stack">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Sales</p>
          <h1>販売レポート</h1>
        </div>
      </div>
      <div class="report-grid">
        <article v-for="listing in listings" :key="listing.id" class="report-card">
          <div>
            <span class="status-pill" :class="`status-${listing.event.status}`">
              {{ listing.event.statusLabel }}
            </span>
            <h2>{{ listing.event.artist.name }}</h2>
            <p>{{ listing.note }}</p>
          </div>
          <dl class="compact-list">
            <div>
              <dt>販売枚数</dt>
              <dd>{{ listing.event.sold }} 枚</dd>
            </div>
            <div>
              <dt>残り</dt>
              <dd>{{ listing.event.remaining }} 枚</dd>
            </div>
            <div>
              <dt>入金見込み</dt>
              <dd>
                {{ formatCurrency(listing.event.sold * listing.event.price * listing.payoutRate) }}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  </ManagedLayout>
</template>
