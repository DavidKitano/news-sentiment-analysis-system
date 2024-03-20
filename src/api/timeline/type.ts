import type { BaseResponse } from '../service'

// app-news-show/timeline
export interface AppNewsShowTimelineRequest {
  month: string
}
export interface AppNewsShowTimelineResponse extends BaseResponse {
  data: TimeLineVO[]
}
export interface TimeLineVO {
  /**
   * 日期 yyyy-MM-dd
   */
  date?: string
  /**
   * 新闻列表
   */
  newsList?: TimeLineItem[]
}
export interface TimeLineItem {
  /**
   * 新闻封面
   */
  avatar?: string
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 新闻标题
   */
  title?: string
}
