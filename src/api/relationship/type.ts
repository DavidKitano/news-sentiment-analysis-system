import type { BaseResponse } from '../service'

// app-news-show/relationship
export interface AppNewsShowRelationshipRequest {
  limit: number
  keyword: string
  currentPage: 0
}
export interface AppNewsShowRelationshipResponse extends BaseResponse {
  data: AppNewsShowRelationshipGraphResultVO
}
export interface AppNewsShowRelationshipGraphResultVO {
  /**
   * 类别列表
   */
  categories: AppNewsShowRelationshipGraphCategories[]
  /**
   * 关系列表
   */
  links: AppNewsShowRelationshipGraphLinks[]
  /**
   * 节点列表
   */
  nodes: AppNewsShowRelationshipGraphNode[]
}
export interface AppNewsShowRelationshipGraphCategories {
  /**
   * 类别名称
   */
  name: string
}
export interface AppNewsShowRelationshipGraphLinks {
  /**
   * 起始关系id
   */
  source: string
  /**
   * 结束名称id
   */
  target: string
}
export interface AppNewsShowRelationshipGraphNode {
  /**
   * 节点类别列表下标(0开始)
   */
  category: number
  /**
   * 节点id
   */
  id: string
  /**
   * 节点属性
   */
  label: AppNewsShowRelationshipLabel
  /**
   * 节点名称
   */
  name: string
  /**
   * 节点值
   */
  value: string
}
export interface AppNewsShowRelationshipLabel {
  /**
   * 是否显示
   */
  show: boolean
}

// app-news-show/relationship id
export interface AppGetRelationshipNewsIdRequest {
  id: number
  limit: number
}
export interface AppGetRelationshipNewsIdResponse extends BaseResponse {
  data: AppGetRelationshipNewsIdGraphResultVO
}
export interface AppGetRelationshipNewsIdGraphResultVO {
  /**
   * 类别列表
   */
  categories: AppGetRelationshipNewsIdGraphCategories[]
  /**
   * 关系列表
   */
  links: AppGetRelationshipNewsIdGraphLinks[]
  /**
   * 节点列表
   */
  nodes: AppGetRelationshipNewsIdGraphNode[]
}
export interface AppGetRelationshipNewsIdGraphCategories {
  /**
   * 类别名称
   */
  name: string
}
export interface AppGetRelationshipNewsIdGraphLinks {
  /**
   * 起始关系id
   */
  source: string
  /**
   * 结束名称id
   */
  target: string
}
export interface AppGetRelationshipNewsIdGraphNode {
  /**
   * 节点类别列表下标(0开始)
   */
  category: number
  /**
   * 节点id
   */
  id: string
  /**
   * 节点属性
   */
  label: Label
  /**
   * 节点名称
   */
  name: string
  /**
   * 节点值
   */
  value: string
}
export interface AppGetRelationshipNewsIdLabel {
  /**
   * 是否显示
   */
  show: boolean
}

export interface AppGetRelationshipPersonIdRequest {
  id: number
  limit: number
}
export interface AppGetRelationshipPersonIdResponse extends BaseResponse {
  data: GraphPersonViewVO
}
export interface GraphPersonViewVO {
  /**
   * 图数据
   */
  graphData?: GraphResultVO
  /**
   * 新闻列表
   */
  newsList?: GraphNewsVO[]
}
export interface GraphResultVO {
  /**
   * 类别列表
   */
  categories?: GraphCategories[]
  /**
   * 关系列表
   */
  links?: GraphLinks[]
  /**
   * 节点列表
   */
  nodes?: GraphNode[]
}
export interface GraphCategories {
  /**
   * 类别名称
   */
  name?: string
}
export interface GraphLinks {
  /**
   * 起始关系id
   */
  source?: string
  /**
   * 结束名称id
   */
  target?: string
}
export interface GraphNode {
  /**
   * 节点类别列表下标(0开始)
   */
  category?: number
  /**
   * 节点id
   */
  id?: string
  /**
   * 节点属性
   */
  label?: Label
  /**
   * 节点名称
   */
  name?: string
  /**
   * 节点值
   */
  value?: string
}
export interface Label {
  /**
   * 是否显示
   */
  show?: boolean
}
export interface GraphNewsVO {
  /**
   * 新闻图片
   */
  avatar?: string
  /**
   * 新闻发布时间
   */
  date?: string
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 新闻标题
   */
  title?: string
}
