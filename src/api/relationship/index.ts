import webapi, { type Response } from '../service'
import type * as comp from './type'

// app-news-show/relationship
export const getRelationship = (
  params: comp.AppNewsShowRelationshipRequest
): Response<comp.AppNewsShowRelationshipResponse> => webapi.get('/app-news-show/relationship', { params: params })
