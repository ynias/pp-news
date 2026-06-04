<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{
  articles: Article[]
  loading: boolean
  error: string | null
}>()
</script>

<template>
  <!-- Error banner -->
  <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
      <strong>Error:</strong> {{ error }}
    </div>
  </div>

  <!-- Skeleton loader -->
  <div v-else-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="n in 9"
        :key="n"
        class="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
      >
        <div class="flex justify-between mb-3">
          <div class="h-4 w-20 bg-gray-200 rounded-full" />
          <div class="h-4 w-16 bg-gray-200 rounded-full" />
        </div>
        <div class="h-4 bg-gray-200 rounded mb-2" />
        <div class="h-4 bg-gray-200 rounded w-4/5 mb-4" />
        <div class="h-3 bg-gray-100 rounded mb-1" />
        <div class="h-3 bg-gray-100 rounded mb-1" />
        <div class="h-3 bg-gray-100 rounded w-3/4 mb-4" />
        <div class="flex gap-1 mb-3">
          <div class="h-4 w-10 bg-gray-100 rounded" />
          <div class="h-4 w-12 bg-gray-100 rounded" />
        </div>
        <div class="flex justify-between pt-2 border-t border-gray-100">
          <div class="h-3 w-24 bg-gray-100 rounded" />
          <div class="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div v-else-if="!articles.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <p class="text-gray-400 text-lg">No articles found matching your filters.</p>
    <p class="text-gray-300 text-sm mt-1">Try adjusting the category, type, or search query.</p>
  </div>

  <!-- Article grid -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>
