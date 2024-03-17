import type { BaseResponse } from '../service'

// app-news-show/relationship
export interface AppNewsShowRelationshipRequest {}
export interface AppNewsShowRelationshipResponse extends BaseResponse {
  data: { [key: string]: any }
}
