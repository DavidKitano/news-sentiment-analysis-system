import type { BaseResponse } from '../service'
import type { UserNewsCommentDO } from '../news/type'

// app-news-show/news/comment POST
export interface AppNewsPostNewsCommentRequest {
  content: string
  newsId: string
}
export interface AppNewsPostNewsCommentResponse extends BaseResponse {
  data: null
}

// app-news-show/news/comment GET
export interface AppNewsShowNewsCommentRequest {
  newsId: string
}
export interface AppNewsShowNewsCommentResponse extends BaseResponse {
  data: UserNewsCommentDO[]
}

// app-news-show/news/comment/history
export interface AppNewsShowNewsCommentHistoryRequest {
  currentPage: number
  pageSize: number
}
export interface AppNewsShowNewsCommentHistoryResponse extends BaseResponse {
  data: PageQueryResultOfUserCommentVO
}
export interface PageQueryResultOfUserCommentVO {
  currentPage?: number
  data?: UserCommentVO[]
  pages?: number
  pageSize?: number
  total?: number
}
export interface UserCommentVO {
  /**
   * 评论内容
   */
  content?: string
  /**
   * 评论id
   */
  id?: number
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 新闻标题
   */
  title?: string
}

// app-news-show/news/comment delete
export interface AppNewsShowNewsCommentDeleteRequest {
  id: string
}
export interface AppNewsShowNewsCommentDeleteResponse extends BaseResponse {
  data: null
}

// app-news-show/news/comment update
export interface AppNewsShowNewsCommentUpdateRequest {
  id: string
  content: string
}
export interface AppNewsShowNewsCommentUpdateResponse extends BaseResponse {
  data: null
}
