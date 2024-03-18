import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getNewsList = (params: comp.AppNewsShowNewsRequest): Response<comp.AppNewsShowNewsResponse> =>
  webapi.get('/app-news-show/news', { params: params })

export const getNewsDetail = (params: comp.AppNewsShowNewsIdRequest): Response<comp.AppNewsShowNewsIdResponse> =>
  webapi.get(`/app-news-show/news/${params.id}`, {})

export const getHotNewsList = (params: comp.AppNewsShowNewsHotRequest): Response<comp.AppNewsShowNewsHotResponse> =>
  webapi.get('/app-news-show/news/hot', { params: params })

export const likeNews = (params: comp.AppNewsLikeRequest): Response<comp.AppNewsLikeResponse> =>
  webapi.post(`/app-news-show/news/like/${params.id}`, {})

export const cancelLikeNews = (params: comp.AppNewsLikeRequest): Response<comp.AppNewsLikeResponse> =>
  webapi.delete(`/app-news-show/news/like/${params.id}`, {})
