import type { BaseResponse } from '../service'

// app-news-show/timeline
export interface AppNewsShowTimelineRequest {}
export interface AppNewsShowTimelineResponse extends BaseResponse {
  data: { [key: string]: any }
}
