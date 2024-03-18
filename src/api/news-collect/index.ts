import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getCollect = (params: comp.AppNewsShowNewsCollectRequest): Response<comp.AppNewsShowNewsCollectResponse> =>
  webapi.get('/app-news-show/news/collect', { params: params })

export const postCollect = (
  params: comp.AppNewsShowNewsCollectPostRequest
): Response<comp.AppNewsShowNewsCollectPostResponse> =>
  webapi.post(`/app-news-show/news/collect/collect/${params.newsId}`, {})

export const deleteCollect = (
  params: comp.AppNewsShowNewsCollectDeleteRequest
): Response<comp.AppNewsShowNewsCollectDeleteResponse> =>
  webapi.delete(`/app-news-show/news/collect/collect/${params.newsId}`, {})
