import type { BaseResponse } from '../service'

// AppNewsProcessNewsList
export interface AppNewsProcessNewsListRequest {
  currentPage: number
  keyword?: string
  pageSize: number
}
export interface AppNewsProcessNewsListResponse extends BaseResponse {
  data: PageQueryResultOfNewsListItem
}
export interface PageQueryResultOfNewsListItem {
  currentPage?: number
  data?: NewsListItem[]
  pages?: number
  pageSize?: number
  total?: number
}
export interface NewsListItem {
  /** 封面图 */
  avatar?: string
  /** 时间 */
  date?: string
  /** id */
  id?: number
  /** 新闻id */
  newsId?: string
  /** 摘要 */
  summary?: string
  /** 标题 */
  title?: string
}

// AppNewsProcessNewsDetail
export interface AppNewsProcessNewsDetailRequest {
  newsId: string
}
export interface AppNewsProcessNewsDetailResponse extends BaseResponse {
  data: NewsDetails
}
export interface NewsDetails {
  /** 新闻数据 */
  news?: NewsMultiLanguageDo
  /** 新闻拓展数据 */
  newsExt?: Record<string, AlgorithmData>
  /** 新闻id */
  newsId?: string
  /** 新闻图片数据 */
  newsImg?: NewsImg[]
}
export interface NewsMultiLanguageDo {
  /** 新闻作者 */
  author?: string
  /** 新闻封面 */
  avatar?: string
  /** 内容 英文 */
  bodyEn?: string
  /** 内容 越南语 */
  bodyVi?: string
  /** 内容 中文 */
  bodyZh?: string
  /**
   * 新闻时间
   */
  date?: string
  /**
   * 收藏量
   */
  favoriteCount?: number
  /**
   * 点赞量
   */
  likeCount?: number
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 摘要 英文
   */
  summaryEn?: string
  /**
   * 摘要 越南语
   */
  summaryVi?: string
  /**
   * 摘要 中文
   */
  summaryZh?: string
  /**
   * 标题 英文
   */
  titleEn?: string
  /**
   * 标题 越南语
   */
  titleVi?: string
  /**
   * 标题 中文
   */
  titleZh?: string
  /**
   * 新闻类型
   */
  type?: string
  /** 采集页面 */
  url?: string
  /** 新闻网站 */
  website?: string
}

export interface AlgorithmData {
  /** 数据 */
  data?: Record<string, any>
  /** 标签页名称 */
  tag?: string
  /** 数据类型 0:文本类型,1:图片类型,2:音频类型,3:图表类型,4:折线图类型,5:直方图/柱状图类型,6:饼图类型 */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}
export interface NewsImg {
  createTime?: Date
  id?: number
  isDeleted?: number
  newsId?: string
  updateTime?: Date
  url?: string
}
