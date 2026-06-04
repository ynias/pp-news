<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{ article: Article }>()

const categoryColors: Record<string, string> = {
  'Power Apps': 'bg-blue-100 text-blue-800',
  'Power Automate': 'bg-indigo-100 text-indigo-800',
  'Power BI': 'bg-yellow-100 text-yellow-800',
  'Power Pages': 'bg-green-100 text-green-800',
  'Copilot Studio': 'bg-purple-100 text-purple-800',
  'General': 'bg-gray-100 text-gray-700',
}

const typeColors: Record<string, string> = {
  'New Feature': 'bg-green-100 text-green-800',
  'Preview': 'bg-orange-100 text-orange-800',
  'GA Release': 'bg-blue-100 text-blue-800',
  'Update': 'bg-gray-100 text-gray-700',
  'How-To': 'bg-teal-100 text-teal-800',
  'News': 'bg-slate-100 text-slate-700',
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <a
    :href="article.url"
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
  >
    <!-- Badges row -->
    <div class="flex items-center justify-between mb-3 gap-2">
      <span
        v-if="article.category"
        :class="['text-xs font-semibold px-2 py-0.5 rounded-full', categoryColors[article.category] ?? 'bg-gray-100 text-gray-700']"
      >
        {{ article.category }}
      </span>
      <span
        v-if="article.type"
        :class="['text-xs font-semibold px-2 py-0.5 rounded-full ml-auto', typeColors[article.type] ?? 'bg-gray-100 text-gray-700']"
      >
        {{ article.type }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors">
      {{ article.title }}
    </h3>

    <!-- Summary -->
    <p v-if="article.summary" class="text-xs text-gray-500 line-clamp-3 mb-4 flex-1">
      {{ article.summary }}
    </p>
    <div v-else class="flex-1" />

    <!-- Tags -->
    <div v-if="article.tags?.length" class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tag in article.tags"
        :key="tag"
        class="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded px-1.5 py-0.5"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
      <span class="font-medium truncate max-w-[60%]">{{ article.source ?? '—' }}</span>
      <span>{{ formatDate(article.published_date) }}</span>
    </div>
  </a>
</template>
