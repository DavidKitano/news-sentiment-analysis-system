import type { AxiosHeaders } from 'axios'
import webapi, { type Response } from '../service'
import type * as comp from './type'

export const login = (params: comp.AppAuthLoginRequest): Response<comp.AppAuthLoginResponse> => {
  const formData = new FormData()
  formData.append('username', params.username)
  formData.append('password', params.password)
  formData.append('grant_type', params.grant_type)
  return webapi.post('/app-auth/oauth/token', formData, {
    headers: {
      ...webapi.defaults.headers,
      'Content-Type': 'multipart/form-data'
    } as unknown as AxiosHeaders
  })
}

// export const logout = (params: comp.AppAuthLogoutRequest): Response<comp.AppAuthLogoutResponse> =>
//   webapi.post('/app-auth/logout', params)

export const register = (params: comp.AppAuthRegisterRequest): Response<comp.AppAuthRegisterResponse> =>
  webapi.post('/app-auth/auth/register', params)
