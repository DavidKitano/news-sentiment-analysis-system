import type { BaseResponse } from '../service'

// app-news-show/news/comment
export interface AppNewsShowNewsCommentRequest {
  id: string
}
export interface AppNewsShowNewsCommentResponse extends BaseResponse {
  data: { [key: string]: any }
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
  data: { [key: string]: any }
}

// app-news-show/news/comment update
export interface AppNewsShowNewsCommentUpdateRequest {
  id: string
  data: { [key: string]: any }
}
export interface AppNewsShowNewsCommentUpdateResponse extends BaseResponse {
  data: { [key: string]: any }
}
