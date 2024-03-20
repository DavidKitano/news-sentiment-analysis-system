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
export interface AppNewsShowNewsCommentHistoryRequest {}
export interface AppNewsShowNewsCommentHistoryResponse extends BaseResponse {
  data: { [key: string]: any }
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
