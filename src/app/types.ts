export interface News {
  status: string,
  articles: Array<Article>,
  totalResults: number
}

interface Source {
  id: string,
  name: string
}

export interface Article {
  author: string,
  content: string,
  description: string,
  publishedAt: string,
  source: Source,
  title: string,
  url: string,
  urlToImage: string,
}

export interface Error {
  message: string,
  code: string,
  status: string
}