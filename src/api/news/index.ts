import webapi, { type Response } from '../service'
import type * as comp from './type'

export function appNewsProcessNewsList(
  params: comp.AppNewsProcessNewsListRequest
): Response<comp.AppNewsProcessNewsListResponse> {
  return webapi.get('/app-news-process/news/list', {
    params: { ...params }
  })
}
