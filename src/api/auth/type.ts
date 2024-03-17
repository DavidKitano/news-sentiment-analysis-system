import type { BaseResponse } from '../service'

// login
export interface AppAuthLoginRequest {
  grant_type: 'password'
  username: string
  password: string
}
export interface AppAuthLoginResponse extends BaseResponse {
  access_token: string
  token_type: 'bearer'
  refresh_token: string
  expires_in: 359124
  scope: string
  role_list: string
  create_time: string
  id: number
  permission_list: string
  jti: string
}

// register
export interface AppAuthRegisterRequest {
  /**
   * 账号，唯一
   */
  account: string
  /**
   * 邮箱，唯一
   */
  email: string
  /**
   * 其他数据
   */
  ext?: otherData
  /**
   * 密码
   */
  password: string
  /**
   * 用户名
   */
  username: string
}
export interface otherData {
  /**
   * 头像
   */
  avatar?: string
  /**
   * 性别
   */
  gender?: string
}
export interface AppAuthRegisterResponse extends BaseResponse {
  data: null
}
