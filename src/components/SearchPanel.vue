<script setup lang="ts">
import { reactive, watch } from 'vue'
import { listAreas, listGenres } from '@/domain/catalog'

const props = defineProps<{
  initialQuery?: string
  initialArea?: string
  initialGenre?: string
}>()

const emit = defineEmits<{
  search: [params: { query: string; area: string; genre: string }]
}>()

const areas = listAreas()
const genres = listGenres()
const form = reactive({
  query: props.initialQuery ?? '',
  area: props.initialArea ?? '',
  genre: props.initialGenre ?? '',
})

watch(
  () => [props.initialQuery, props.initialArea, props.initialGenre],
  () => {
    form.query = props.initialQuery ?? ''
    form.area = props.initialArea ?? ''
    form.genre = props.initialGenre ?? ''
  },
)

function submitSearch() {
  emit('search', { ...form })
}
</script>

<template>
  <form class="search-panel" role="search" @submit.prevent="submitSearch">
    <label>
      <span>キーワード</span>
      <input v-model="form.query" name="q" placeholder="バンド名・会場・ジャンル" />
    </label>
    <label>
      <span>エリア</span>
      <select v-model="form.area" name="area">
        <option value="">すべて</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
    </label>
    <label>
      <span>ジャンル</span>
      <select v-model="form.genre" name="genre">
        <option value="">すべて</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
    </label>
    <button class="button" type="submit">検索</button>
  </form>
</template>
