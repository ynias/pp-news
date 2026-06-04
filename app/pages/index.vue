<script setup lang="ts">
const {
  articles,
  filteredArticles,
  paginatedArticles,
  loading,
  error,
  selectedCategory,
  selectedType,
  selectedDateRange,
  searchQuery,
  sortBy,
  isFiltered,
  currentPage,
  pageSize,
  totalPages,
  lastScrapedAt,
  fetchArticles,
  clearFilters,
  goToPage,
} = useArticles()

const { favourites, isFavourite } = useFavourites()
const showFavourites = ref(false)

const displayedArticles = computed(() =>
  showFavourites.value
    ? paginatedArticles.value.filter((a) => isFavourite(a.id))
    : paginatedArticles.value,
)

const favouriteCount = computed(() => favourites.value.length)

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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900 tracking-tight">
            <span class="text-blue-600">Power Platform</span> News
          </h1>
          <p class="text-xs text-gray-400 mt-0.5">Latest features & updates from Microsoft</p>
        </div>
        <div v-if="!loading" class="text-right hidden sm:block">
          <p class="text-2xl font-bold text-gray-900 tabular-nums">{{ articles.length }}</p>
          <p class="text-xs text-gray-400">articles indexed</p>
        </div>
      </div>
    </header>

    <!-- Filter bar -->
    <FilterBar
      :selected-category="selectedCategory"
      :selected-type="selectedType"
      :selected-date-range="selectedDateRange"
      :search-query="searchQuery"
      :sort-by="sortBy"
      :is-filtered="isFiltered"
      :show-favourites="showFavourites"
      :total-count="articles.length"
      :filtered-count="filteredArticles.length"
      :favourite-count="favouriteCount"
      @update:selected-category="selectedCategory = $event"
      @update:selected-type="selectedType = $event"
      @update:selected-date-range="selectedDateRange = $event"
      @update:search-query="searchQuery = $event"
      @update:sort-by="sortBy = $event"
      @update:show-favourites="showFavourites = $event"
      @clear-filters="clearFilters()"
    />

    <!-- Article grid -->
    <main class="flex-1">
      <ArticleGrid
        :articles="displayedArticles"
        :loading="loading"
        :error="error"
      />
    </main>

    <!-- Pagination (hidden when showing favourites) -->
    <Pagination
      v-if="!loading && !error && !showFavourites"
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-size="pageSize"
      :total-filtered="filteredArticles.length"
      @update:current-page="goToPage($event)"
      @update:page-size="pageSize = $event"
    />

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-gray-400">
        <span>
          Built by <span class="font-semibold text-gray-600">Ynias</span>
          <span class="mx-1.5 text-gray-300">·</span>
          Made with <span class="font-semibold text-gray-600">Claude</span>
        </span>
        <span>Last scraped: {{ formatTimestamp(lastScrapedAt) }}</span>
      </div>
    </footer>

    <!-- Cookie consent banner -->
    <CookieBanner />
  </div>
</template>
