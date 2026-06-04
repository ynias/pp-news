<script setup lang="ts">
import { CATEGORIES, TYPES, DATE_RANGES, SORT_OPTIONS } from '~/composables/useArticles'
import type { SortOption } from '~/composables/useArticles'

const props = defineProps<{
  selectedCategory: string
  selectedType: string
  selectedDateRange: string
  searchQuery: string
  sortBy: SortOption
  isFiltered: boolean
  totalCount: number
  filteredCount: number
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:selectedType': [value: string]
  'update:selectedDateRange': [value: string]
  'update:searchQuery': [value: string]
  'update:sortBy': [value: SortOption]
  'clearFilters': []
}>()
</script>

<template>
  <div class="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Search + controls row -->
      <div class="flex items-center gap-3 py-3 border-b border-gray-100">
        <!-- Search -->
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
          <input
            :value="searchQuery"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search articles..."
            class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
          />
        </div>

        <!-- Sort -->
        <select
          :value="sortBy"
          @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortOption)"
          class="shrink-0 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option v-for="opt in SORT_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>

        <!-- Count + clear -->
        <div class="shrink-0 flex items-center gap-2 text-sm text-gray-400">
          <span class="tabular-nums font-medium text-gray-600">{{ filteredCount }}</span>
          <span v-if="isFiltered" class="text-gray-300">/</span>
          <span v-if="isFiltered" class="tabular-nums text-gray-400">{{ totalCount }}</span>
          <span class="hidden sm:inline text-gray-400">articles</span>
          <button
            v-if="isFiltered"
            @click="emit('clearFilters')"
            class="ml-1 text-xs text-blue-500 hover:text-blue-700 font-semibold border border-blue-200 hover:border-blue-400 rounded-md px-2 py-0.5 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Filter rows -->
      <div class="py-2 space-y-1.5">

        <!-- Category -->
        <div class="flex items-center gap-3 min-h-[2rem]">
          <span class="w-20 shrink-0 text-xs font-semibold text-gray-400 text-right">Category</span>
          <div class="w-px h-4 bg-gray-200 shrink-0" />
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="cat in CATEGORIES"
              :key="cat"
              @click="emit('update:selectedCategory', cat)"
              :class="[
                'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
            >
              <ProductIcon v-if="cat !== 'All'" :product="cat" :size="13" class="shrink-0" />
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Type -->
        <div class="flex items-center gap-3 min-h-[2rem]">
          <span class="w-20 shrink-0 text-xs font-semibold text-gray-400 text-right">Type</span>
          <div class="w-px h-4 bg-gray-200 shrink-0" />
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="type in TYPES"
              :key="type"
              @click="emit('update:selectedType', type)"
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
            >{{ type }}</button>
          </div>
        </div>

        <!-- Date -->
        <div class="flex items-center gap-3 min-h-[2rem]">
          <span class="w-20 shrink-0 text-xs font-semibold text-gray-400 text-right">Date</span>
          <div class="w-px h-4 bg-gray-200 shrink-0" />
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="range in DATE_RANGES"
              :key="range"
              @click="emit('update:selectedDateRange', range)"
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                selectedDateRange === range
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
            >{{ range }}</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
