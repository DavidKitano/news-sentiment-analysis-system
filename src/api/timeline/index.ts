import webapi, { type Response } from '../service'
import type * as comp from './type'

// app-news-show/timeline
export const getTimeline = (params: comp.AppNewsShowTimelineRequest): Response<comp.AppNewsShowTimelineResponse> =>
  webapi.get(`/app-news-show/timeLine/${params.month}`, {})
