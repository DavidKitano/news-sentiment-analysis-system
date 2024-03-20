import type { BaseResponse } from '../service'

export enum TrendDimension {
  DAY = '0',
  WEEK = '1'
}

export enum Sentiment {
  NEGATIVE = '0',
  NEUTRAL = '1',
  POSITIVE = '2'
}

export interface getTrendClusterRequest {
  options: string
}
export interface getTrendClusterResponse extends BaseResponse {
  data: string
}

export interface getTrendClusterOptionsRequest {
  dimension: TrendDimension
}
export interface getTrendClusterOptionsResponse extends BaseResponse {
  data: string[]
}

export interface getTrendSentimentRequest {
  startTime: string
  endTime: string
}
export interface getTrendSentimentResponse extends BaseResponse {
  data: SentimentAnalysisVO[]
}
export interface SentimentAnalysisVO {
  /**
   * 频率
   */
  count?: string
  /**
   * 标签
   */
  tag?: Sentiment
}
