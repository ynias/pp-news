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

const categoryBorderColors: Record<string, string> = {
  'Power Apps': 'border-t-blue-500',
  'Power Automate': 'border-t-indigo-500',
  'Power BI': 'border-t-yellow-400',
  'Power Pages': 'border-t-green-500',
  'Copilot Studio': 'border-t-purple-500',
  'General': 'border-t-gray-300',
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
    :class="[
      'flex flex-col bg-white border border-gray-200 border-t-2 rounded-xl p-5',
      'hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-150',
      'cursor-pointer group',
      article.category ? (categoryBorderColors[article.category] ?? 'border-t-gray-300') : 'border-t-gray-200',
    ]"
  >
    <!-- Badges row -->
    <div class="flex items-center justify-between mb-3 gap-2 min-h-[1.5rem]">
      <span
        v-if="article.category"
        :class="['text-xs font-semibold px-2 py-0.5 rounded-full', categoryColors[article.category] ?? 'bg-gray-100 text-gray-700']"
      >
        {{ article.category }}
      </span>
      <span v-else class="flex-1" />
      <span
        v-if="article.type"
        :class="['text-xs font-semibold px-2 py-0.5 rounded-full ml-auto shrink-0', typeColors[article.type] ?? 'bg-gray-100 text-gray-700']"
      >
        {{ article.type }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
      {{ article.title }}
    </h3>

    <!-- Summary -->
    <p v-if="article.summary" class="text-xs text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed">
      {{ article.summary }}
    </p>
    <div v-else class="flex-1" />

    <!-- Tags -->
    <div v-if="article.tags?.length" class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tag in article.tags.slice(0, 5)"
        :key="tag"
        class="text-[10px] bg-gray-50 text-gray-500 border border-gray-200 rounded px-1.5 py-0.5 font-medium"
      >
        {{ tag }}
      </span>
      <span v-if="article.tags.length > 5" class="text-[10px] text-gray-400 px-1 py-0.5">
        +{{ article.tags.length - 5 }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs text-gray-400 pt-2.5 border-t border-gray-100 mt-auto">
      <span class="font-medium text-gray-500 truncate max-w-[58%]">{{ article.source ?? '—' }}</span>
      <time class="shrink-0 tabular-nums">{{ formatDate(article.published_date) }}</time>
    </div>
  </a>
</template>
