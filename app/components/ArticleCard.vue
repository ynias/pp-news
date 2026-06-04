<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{ article: Article }>()

const categoryColors: Record<string, string> = {
  'Power Apps': 'bg-blue-100 text-blue-700',
  'Power Automate': 'bg-indigo-100 text-indigo-700',
  'Power BI': 'bg-yellow-100 text-yellow-700',
  'Power Pages': 'bg-green-100 text-green-700',
  'Copilot Studio': 'bg-purple-100 text-purple-700',
  'General': 'bg-gray-100 text-gray-600',
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
  'New Feature': 'bg-green-100 text-green-700',
  'Preview': 'bg-orange-100 text-orange-700',
  'GA Release': 'bg-blue-100 text-blue-700',
  'Update': 'bg-gray-100 text-gray-600',
  'How-To': 'bg-teal-100 text-teal-700',
  'News': 'bg-slate-100 text-slate-600',
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
      'flex flex-col bg-white border border-gray-200 border-t-[3px] rounded-xl p-6',
      'hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-200',
      'cursor-pointer group',
      article.category ? (categoryBorderColors[article.category] ?? 'border-t-gray-300') : 'border-t-gray-200',
    ]"
  >
    <!-- Badges row -->
    <div class="flex items-center justify-between mb-4 gap-2 min-h-[1.5rem]">
      <span
        v-if="article.category"
        :class="['inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide', categoryColors[article.category] ?? 'bg-gray-100 text-gray-600']"
      >
        <ProductIcon :product="article.category" :size="12" class="shrink-0" />
        {{ article.category }}
      </span>
      <span v-else class="flex-1" />
      <span
        v-if="article.type"
        :class="['text-[11px] font-bold px-2.5 py-1 rounded-full ml-auto shrink-0 tracking-wide', typeColors[article.type] ?? 'bg-gray-100 text-gray-600']"
      >
        {{ article.type }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="font-bold text-gray-900 text-base leading-tight line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
      {{ article.title }}
    </h3>

    <!-- Summary -->
    <p v-if="article.summary" class="text-sm text-gray-600 line-clamp-3 mb-5 flex-1 leading-relaxed">
      {{ article.summary }}
    </p>
    <div v-else class="flex-1" />

    <!-- Tags -->
    <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="tag in article.tags.slice(0, 5)"
        :key="tag"
        class="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-md px-2 py-0.5 font-medium"
      >
        {{ tag }}
      </span>
      <span v-if="article.tags.length > 5" class="text-xs text-gray-400 px-1 py-0.5">
        +{{ article.tags.length - 5 }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
      <span class="text-sm font-semibold text-gray-500 truncate max-w-[58%]">{{ article.source ?? '—' }}</span>
      <time class="text-xs text-gray-400 shrink-0 tabular-nums">{{ formatDate(article.published_date) }}</time>
    </div>
  </a>
</template>
