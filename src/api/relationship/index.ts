import webapi, { type Response } from '../service'
import type * as comp from './type'

// app-news-show/relationship
export const getRelationship = (
  params: comp.AppNewsShowRelationshipRequest
): Response<comp.AppNewsShowRelationshipResponse> => webapi.get('/app-news-show/relationship', { params: params })

// app-news-show/relationship/news/{id}
export const getRelationshipNewsId = (
  params: comp.AppGetRelationshipNewsIdRequest
): Response<comp.AppGetRelationshipNewsIdResponse> =>
  webapi.get(`/app-news-show/relationship/news/${params.id}`, { params: params })

// app-news-show/relationship/person/{id}
export const getRelationshipPersonId = (
  params: comp.AppGetRelationshipPersonIdRequest
): Response<comp.AppGetRelationshipPersonIdResponse> =>
  webapi.get(`/app-news-show/relationship/person/${params.id}`, { params: params })
