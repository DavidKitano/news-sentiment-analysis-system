import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getNewsList = (params: comp.AppNewsShowNewsRequest): Response<comp.AppNewsShowNewsResponse> =>
  webapi.get('/app-news-show/news', { params: params })

export const getNewsDetail = (params: comp.AppNewsShowNewsIdRequest): Response<comp.AppNewsShowNewsIdResponse> =>
  webapi.get(`/app-news-show/${params.id}`, {})

export const getHotNewsList = (params: comp.AppNewsShowNewsHotRequest): Response<comp.AppNewsShowNewsHotResponse> =>
  webapi.get('/app-news-show/news/hot', { params: params })
