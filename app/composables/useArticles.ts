import type { Article } from '~/types/article'

export const CATEGORIES = [
  'All',
  'Power Apps',
  'Power Automate',
  'Power BI',
  'Power Pages',
  'Copilot Studio',
  'General',
] as const

export const TYPES = [
  'All',
  'New Feature',
  'Update',
  'Preview',
  'GA Release',
  'How-To',
  'News',
] as const

export function useArticles() {
  const client = useSupabaseClient()

  const articles = ref<Article[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const selectedCategory = ref<string>('All')
  const selectedType = ref<string>('All')
  const searchQuery = ref<string>('')

  const filteredArticles = computed(() => {
    return articles.value.filter((a) => {
      const matchesCategory =
        selectedCategory.value === 'All' || a.category === selectedCategory.value
      const matchesType =
        selectedType.value === 'All' || a.type === selectedType.value
      const q = searchQuery.value.trim().toLowerCase()
      const matchesSearch =
        !q ||
        (a.title?.toLowerCase().includes(q) ?? false) ||
        (a.summary?.toLowerCase().includes(q) ?? false)
      return matchesCategory && matchesType && matchesSearch
    })
  })

  const lastScrapedAt = computed<string | null>(() => {
    if (!articles.value.length) return null
    const dates = articles.value
      .map((a) => a.scraped_at)
      .filter(Boolean) as string[]
    if (!dates.length) return null
    return dates.reduce((max, d) => (d > max ? d : max))
  })

  async function fetchArticles() {
    loading.value = true
    error.value = null
    try {
      const { data, error: sbError } = await client
        .from('pp_articles')
        .select('id, title, url, published_date, source, category, type, summary, tags, scraped_at')
        .order('published_date', { ascending: false })

      if (sbError) throw sbError
      articles.value = (data ?? []) as Article[]
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load articles'
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    filteredArticles,
    loading,
    error,
    selectedCategory,
    selectedType,
    searchQuery,
    lastScrapedAt,
    fetchArticles,
    CATEGORIES,
    TYPES,
  }
}
