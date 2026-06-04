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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">

      <!-- Row 1: Search + Sort + Count -->
      <div class="flex items-center gap-3">
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
            class="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
          />
        </div>

        <!-- Sort dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <svg class="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <select
            :value="sortBy"
            @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortOption)"
            class="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option v-for="opt in SORT_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <!-- Result count + clear -->
        <div class="shrink-0 flex items-center gap-2 text-xs text-gray-400">
          <span class="hidden sm:inline">{{ filteredCount }}<span v-if="isFiltered"> / {{ totalCount }}</span> articles</span>
          <button
            v-if="isFiltered"
            @click="emit('clearFilters')"
            class="text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Row 2: Category pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 shrink-0">Category</span>
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="emit('update:selectedCategory', cat)"
          :class="[
            'px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
            selectedCategory === cat
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Row 3: Type + Date pills -->
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 shrink-0">Type</span>
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
          >
            {{ type }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 shrink-0">Date</span>
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
          >
            {{ range }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
