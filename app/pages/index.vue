<script setup lang="ts">
const {
  filteredArticles,
  loading,
  error,
  selectedCategory,
  selectedType,
  searchQuery,
  lastScrapedAt,
  fetchArticles,
} = useArticles()

onMounted(fetchArticles)

function formatTimestamp(ts: string | null): string {
  if (!ts) return 'unknown'
  return new Date(ts).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-bold text-gray-900">Power Platform News</h1>
        <p class="text-sm text-gray-500 mt-1">Latest features & updates</p>
      </div>
    </header>

    <!-- Filter bar -->
    <FilterBar
      :selected-category="selectedCategory"
      :selected-type="selectedType"
      :search-query="searchQuery"
      @update:selected-category="selectedCategory = $event"
      @update:selected-type="selectedType = $event"
      @update:search-query="searchQuery = $event"
    />

    <!-- Article grid -->
    <main class="flex-1">
      <ArticleGrid
        :articles="filteredArticles"
        :loading="loading"
        :error="error"
      />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-gray-400">
        <span>Powered by Claude</span>
        <span>Last scraped: {{ formatTimestamp(lastScrapedAt) }}</span>
      </div>
    </footer>
  </div>
</template>
