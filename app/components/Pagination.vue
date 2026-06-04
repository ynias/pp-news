<script setup lang="ts">
import { PAGE_SIZE_OPTIONS } from '~/composables/useArticles'
import type { PageSize } from '~/composables/useArticles'

const props = defineProps<{
  currentPage: number
  totalPages: number
  pageSize: PageSize
  totalFiltered: number
}>()

const emit = defineEmits<{
  'update:currentPage': [value: number]
  'update:pageSize': [value: PageSize]
}>()

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

const start = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const end = computed(() => Math.min(props.currentPage * props.pageSize, props.totalFiltered))
</script>

<template>
  <div v-if="totalFiltered > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">

      <!-- Showing X–Y of Z + page size -->
      <div class="flex items-center gap-3 text-sm text-gray-500">
        <span>Showing <strong class="text-gray-700 tabular-nums">{{ start }}–{{ end }}</strong> of <strong class="text-gray-700 tabular-nums">{{ totalFiltered }}</strong></span>
        <span class="text-gray-300">|</span>
        <span class="flex items-center gap-1.5">
          Per page:
          <button
            v-for="size in PAGE_SIZE_OPTIONS"
            :key="size"
            @click="emit('update:pageSize', size)"
            :class="[
              'px-2 py-0.5 rounded text-xs font-semibold transition-colors',
              pageSize === size
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >{{ size }}</button>
        </span>
      </div>

      <!-- Page controls -->
      <div v-if="totalPages > 1" class="flex items-center gap-1">
        <!-- Prev -->
        <button
          @click="emit('update:currentPage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Page numbers -->
        <template v-for="p in visiblePages" :key="p">
          <span v-if="p === '...'" class="px-1 text-gray-400 text-sm select-none">…</span>
          <button
            v-else
            @click="emit('update:currentPage', p)"
            :class="[
              'min-w-[2rem] h-8 px-2 rounded-lg text-sm font-medium transition-colors',
              currentPage === p
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >{{ p }}</button>
        </template>

        <!-- Next -->
        <button
          @click="emit('update:currentPage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>
