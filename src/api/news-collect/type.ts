import type { BaseResponse } from '../service'

// app-news-show/news/collect get
export interface AppNewsShowNewsCollectRequest {
  currentPage: number
  pageSize: number
  keyword: string
}
export interface AppNewsShowNewsCollectResponse extends BaseResponse {
  data: { [key: string]: any }
}

// app-news-show/news/collect post
export interface AppNewsShowNewsCollectPostRequest {
  newsId: string
}
export interface AppNewsShowNewsCollectPostResponse extends BaseResponse {
  data: { [key: string]: any }
}

// app-news-show/news/collect delete
export interface AppNewsShowNewsCollectDeleteRequest {
  newsId: string
}
export interface AppNewsShowNewsCollectDeleteResponse extends BaseResponse {
  data: { [key: string]: any }
}
