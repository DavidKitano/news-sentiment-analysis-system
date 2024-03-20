import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getTrendCluster = (params: comp.getTrendClusterRequest): Response<comp.getTrendClusterResponse> => {
  return webapi.get('/app-news-show/opinion/trend/cluster', { params })
}

export const getTrendClusterOptions = (
  params: comp.getTrendClusterOptionsRequest
): Response<comp.getTrendClusterOptionsResponse> => {
  return webapi.get('/app-news-show/opinion/trend/cluster/options', { params })
}

export const getTrendSentiment = (params: comp.getTrendSentimentRequest): Response<comp.getTrendSentimentResponse> => {
  return webapi.get('/app-news-show/opinion/trend/sentiment', { params })
}
