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
    <div class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
      <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span><strong>Error:</strong> {{ error }}</span>
    </div>
  </div>

  <!-- Skeleton loader -->
  <div v-else-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="h-4 w-28 bg-gray-200 rounded mb-5 animate-pulse" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="n in 9"
        :key="n"
        class="bg-white border border-gray-200 border-t-2 border-t-gray-200 rounded-xl p-5 animate-pulse"
      >
        <div class="flex justify-between mb-3">
          <div class="h-4 w-20 bg-gray-200 rounded-full" />
          <div class="h-4 w-16 bg-gray-200 rounded-full" />
        </div>
        <div class="h-4 bg-gray-200 rounded mb-2" />
        <div class="h-4 bg-gray-200 rounded w-4/5 mb-4" />
        <div class="h-3 bg-gray-100 rounded mb-1.5" />
        <div class="h-3 bg-gray-100 rounded mb-1.5" />
        <div class="h-3 bg-gray-100 rounded w-3/4 mb-4" />
        <div class="flex gap-1 mb-3">
          <div class="h-4 w-10 bg-gray-100 rounded" />
          <div class="h-4 w-12 bg-gray-100 rounded" />
        </div>
        <div class="flex justify-between pt-2.5 border-t border-gray-100">
          <div class="h-3 w-24 bg-gray-100 rounded" />
          <div class="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div v-else-if="!articles.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <svg class="mx-auto h-10 w-10 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-gray-400 text-base font-medium">No articles match your filters</p>
    <p class="text-gray-300 text-sm mt-1">Try adjusting the category, type, date range, or search query.</p>
  </div>

  <!-- Article grid -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>
