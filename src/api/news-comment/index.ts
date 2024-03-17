import webapi, { type Response } from '../service'
import type * as comp from './type'

// app-news-show/news/comment
export const getNewsComment = (
  params: comp.AppNewsShowNewsCommentRequest
): Response<comp.AppNewsShowNewsCommentResponse> => webapi.get(`/app-news-show/news/comment/${params.id}`, {})

// app-news-show/news/comment/history
export const getNewsCommentHistory = (
  params: comp.AppNewsShowNewsCommentHistoryRequest
): Response<comp.AppNewsShowNewsCommentHistoryResponse> =>
  webapi.get('/app-news-show/news/comment/history', { params: params })

// app-news-show/news/comment delete
export const deleteNewsComment = (
  params: comp.AppNewsShowNewsCommentDeleteRequest
): Response<comp.AppNewsShowNewsCommentDeleteResponse> => webapi.delete(`/app-news-show/news/comment/${params.id}`, {})

// app-news-show/news/comment update
export const updateNewsComment = (
  params: comp.AppNewsShowNewsCommentUpdateRequest
): Response<comp.AppNewsShowNewsCommentUpdateResponse> =>
  webapi.put(`/app-news-show/news/comment/${params.id}`, params.data)
