import type { BaseResponse } from '../service'

export interface getUserRequest {}
export interface getUserResponse extends BaseResponse {
  data: UserDetailsVO
}
export interface UserDetailsVO {
  /**
   * 用户id
   */
  id?: number
  /**
   * 用户基本信息
   */
  user?: User
  /**
   * 用户拓展信息
   */
  userInfo?: UserInfo
  /**
   * 用户权限
   */
  userPermissionList?: Permission[]
  /**
   * 用户角色信息
   */
  userRoleList?: Role[]
}
export interface User {
  /**
   * 账号
   */
  account?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * id
   */
  id?: number
  /**
   * 密码
   */
  password?: string
  /**
   * 用户名
   */
  username?: string
}
export interface UserInfo {
  /**
   * 头像
   */
  avatar?: string
  /**
   * 性别
   */
  gender?: string
  /**
   * id
   */
  id?: number
  /**
   * 角色id
   */
  uid?: number
}
export interface Permission {
  /**
   * 描述
   */
  desc?: string
  /**
   * id
   */
  id?: number
  /**
   * 权限名称
   */
  name?: string
  /**
   * 父级节点id
   */
  parentId?: number
  /**
   * 权限路径
   */
  path?: string
}
export interface Role {
  /**
   * 描述
   */
  desc?: string
  /**
   * id
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
  /**
   * 父节点id
   */
  parentId?: number
}
