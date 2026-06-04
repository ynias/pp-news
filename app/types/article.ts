export interface Article {
  id: number
  title: string
  url: string
  published_date: string | null
  source: string | null
  category: string | null
  type: string | null
  summary: string | null
  tags: string[] | null
  scraped_at: string | null
}
