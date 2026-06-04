<script setup lang="ts">
import { CATEGORIES, TYPES } from '~/composables/useArticles'

const props = defineProps<{
  selectedCategory: string
  selectedType: string
  searchQuery: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:selectedType': [value: string]
  'update:searchQuery': [value: string]
}>()
</script>

<template>
  <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
      <!-- Category pills -->
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide w-full sm:w-auto">Category</span>
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="emit('update:selectedCategory', cat)"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Type pills -->
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide w-full sm:w-auto">Type</span>
        <button
          v-for="type in TYPES"
          :key="type"
          @click="emit('update:selectedType', type)"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            selectedType === type
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ type }}
        </button>
      </div>

      <!-- Search -->
      <div class="relative max-w-md">
        <input
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search by title or summary..."
          class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
        </svg>
      </div>
    </div>
  </div>
</template>
