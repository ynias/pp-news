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

export const DATE_RANGES = [
  'All',
  'Today',
  'This week',
  'This month',
  'Last 3 months',
] as const

export const SORT_OPTIONS = [
  { label: 'Newest first', value: 'date-desc' },
  { label: 'Oldest first', value: 'date-asc' },
  { label: 'Title A → Z', value: 'title-asc' },
] as const

export const PAGE_SIZE_OPTIONS = [25, 50] as const
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number]
export type SortOption = (typeof SORT_OPTIONS)[number]['value']

function isInDateRange(dateStr: string | null, range: string): boolean {
  if (range === 'All') return true
  if (!dateStr) return false
  const date = new Date(dateStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  switch (range) {
    case 'Today':
      return date >= today
    case 'This week': {
      const cutoff = new Date(today)
      cutoff.setDate(today.getDate() - 7)
      return date >= cutoff
    }
    case 'This month':
      return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()
    case 'Last 3 months': {
      const cutoff = new Date(today)
      cutoff.setDate(today.getDate() - 90)
      return date >= cutoff
    }
    default:
      return true
  }
}

export function useArticles() {
  const client = useSupabaseClient()

  const articles = ref<Article[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const selectedCategory = ref<string>('All')
  const selectedType = ref<string>('All')
  const selectedDateRange = ref<string>('This month')
  const searchQuery = ref<string>('')
  const sortBy = ref<SortOption>('date-desc')

  // Pagination
  const currentPage = ref(1)
  const pageSize = ref<PageSize>(25)

  const filteredArticles = computed(() => {
    let result = articles.value.filter((a) => {
      const matchesCategory =
        selectedCategory.value === 'All' || a.category === selectedCategory.value
      const matchesType =
        selectedType.value === 'All' || a.type === selectedType.value
      const matchesDate = isInDateRange(a.published_date, selectedDateRange.value)
      const q = searchQuery.value.trim().toLowerCase()
      const matchesSearch =
        !q ||
        (a.title?.toLowerCase().includes(q) ?? false) ||
        (a.summary?.toLowerCase().includes(q) ?? false)
      return matchesCategory && matchesType && matchesDate && matchesSearch
    })

    if (sortBy.value === 'date-asc') {
      result = [...result].sort((a, b) => {
        if (!a.published_date) return 1
        if (!b.published_date) return -1
        return a.published_date.localeCompare(b.published_date)
      })
    } else if (sortBy.value === 'title-asc') {
      result = [...result].sort((a, b) =>
        (a.title ?? '').localeCompare(b.title ?? ''),
      )
    }

    return result
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredArticles.value.length / pageSize.value)),
  )

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredArticles.value.slice(start, start + pageSize.value)
  })

  // Reset to page 1 whenever filters or page size change
  watch(
    [selectedCategory, selectedType, selectedDateRange, searchQuery, sortBy, pageSize],
    () => { currentPage.value = 1 },
  )

  const isFiltered = computed(
    () =>
      selectedCategory.value !== 'All' ||
      selectedType.value !== 'All' ||
      selectedDateRange.value !== 'All' ||
      searchQuery.value.trim() !== '',
  )

  const lastScrapedAt = computed<string | null>(() => {
    if (!articles.value.length) return null
    const dates = articles.value.map((a) => a.scraped_at).filter(Boolean) as string[]
    if (!dates.length) return null
    return dates.reduce((max, d) => (d > max ? d : max))
  })

  function clearFilters() {
    selectedCategory.value = 'All'
    selectedType.value = 'All'
    selectedDateRange.value = 'All'
    searchQuery.value = ''
    sortBy.value = 'date-desc'
  }

  function goToPage(page: number) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

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
    CATEGORIES,
    TYPES,
    DATE_RANGES,
    SORT_OPTIONS,
    PAGE_SIZE_OPTIONS,
  }
}
