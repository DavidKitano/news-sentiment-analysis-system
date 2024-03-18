import type { BaseResponse } from '../service'

// app-news-show/news/collect get
export interface AppNewsShowNewsCollectRequest {
  currentPage: number
  pageSize: number
}
export interface AppNewsShowNewsCollectResponse extends BaseResponse {
  data: PageQueryResultOfCollectNewsVO
}
export interface PageQueryResultOfCollectNewsVO {
  currentPage?: number
  data?: CollectNewsVO[]
  pages?: number
  pageSize?: number
  total?: number
}
export interface CollectNewsVO {
  /**
   * 新闻封面
   */
  avatar?: string
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 新闻作者
   */
  summary?: string
  /**
   * 新闻标题
   */
  title?: string
}

// app-news-show/news/collect post
export interface AppNewsShowNewsCollectPostRequest {
  newsId: string
}
export interface AppNewsShowNewsCollectPostResponse extends BaseResponse {
  data: null
}

// app-news-show/news/collect delete
export interface AppNewsShowNewsCollectDeleteRequest {
  newsId: string
}
export interface AppNewsShowNewsCollectDeleteResponse extends BaseResponse {
  data: null
}
