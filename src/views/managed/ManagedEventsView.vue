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
          <p class="eyebrow">Events</p>
          <h1>掲載チケット</h1>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>公演</th>
              <th>販売者</th>
              <th>販売状況</th>
              <th>価格</th>
              <th>更新</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="listing in listings" :key="listing.id">
              <td>
                <strong>{{ listing.event.title }}</strong>
                <span>{{ listing.event.venue.name }} / {{ listing.event.date }}</span>
              </td>
              <td>{{ listing.sellerName }}</td>
              <td>
                <div class="progress-line">
                  <span :style="{ width: `${listing.event.progressRate}%` }"></span>
                </div>
                {{ listing.event.sold }} / {{ listing.quotaAssigned }} 枚
              </td>
              <td>{{ formatCurrency(listing.event.price) }}</td>
              <td>{{ listing.updatedAt.slice(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </ManagedLayout>
</template>
