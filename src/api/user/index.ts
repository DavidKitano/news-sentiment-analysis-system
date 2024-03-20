import webapi, { type Response } from '../service'
import type * as comp from './type'

export const getUserInfo = (params: comp.getUserRequest): Response<comp.getUserResponse> => {
  return webapi.get('/app-system-user/system/user/info', { params })
}

export const modUserInfo = (data: comp.modUserRequest): Response<comp.modUserResponse> => {
  return webapi.put('/app-system-user/system/user/info', data)
}

export const changePassword = (data: comp.changePasswordRequest): Response<comp.changePasswordResponse> => {
  return webapi.put('/app-system-user/system/user/password', data)
}
