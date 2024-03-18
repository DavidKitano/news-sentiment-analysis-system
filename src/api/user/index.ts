import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getUserInfo = (params: comp.getUserRequest): Response<comp.getUserResponse> => {
  return webapi.get('/app-system-user/system/user/info', { params })
}
