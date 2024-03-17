import type { BaseResponse } from '../service'

/// app-news-show/news
export interface AppNewsShowNewsRequest {
  currentPage: number
  pageSize: number
  keyword: string
}
export interface AppNewsShowNewsResponse extends BaseResponse {
  data: AppNewsShowNewsData
}
export interface AppNewsShowNewsData {
  /**
   * 新闻数据
   */
  content: newsData[]
  /**
   * 不管
   */
  empty: boolean
  /**
   * 不管
   */
  first: boolean
  /**
   * 不管
   */
  last: boolean
  /**
   * 当前页
   */
  number: number
  /**
   * 不管
   */
  numberOfElements: number
  /**
   * 分页数据，不管
   */
  pageable: pageData
  /**
   * 页大小
   */
  size: number
  /**
   * 不管
   */
  sort: DataSort
  /**
   * 总单位数量
   */
  totalElements: number
  /**
   * 总页数
   */
  totalPages: number
}
export interface newsData {
  /**
   * 新闻作者
   */
  author: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 新闻内容
   */
  body: string
  /**
   * 收藏量
   */
  collect: number
  /**
   * 评论数量
   */
  commentCnt: number
  /**
   * 日期
   */
  date: string
  /**
   * 是否收藏
   */
  isCollect: boolean
  /**
   * 是否点赞
   */
  isLike: boolean
  /**
   * 点赞量
   */
  like: number
  /**
   * 新闻id
   */
  newsId: string
  /**
   * 摘要
   */
  summary: string
  /**
   * 新闻标题
   */
  title: string
}
export interface pageData {
  offset: number
  paged: boolean
  pageNumber: number
  pageSize: number
  sort: PageableSort
  unpaged: boolean
}
export interface PageableSort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
export interface DataSort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

// app-news-show/news/{id}
export interface AppNewsShowNewsIdRequest {
  /** PATH参数 */
  id: string
}
export interface AppNewsShowNewsIdResponse extends BaseResponse {
  data: ShowNewsDetails
}
export interface ShowNewsDetails {
  /**
   * 新闻点赞数
   */
  collect?: number
  /**
   * 新闻收藏数
   */
  commentCnt?: number
  /**
   * 新闻评论数据
   */
  commentList?: UserNewsCommentDO[]
  /**
   * 是否收藏
   */
  isCollect?: boolean
  /**
   * 是否点赞
   */
  isLike?: boolean
  /**
   * 点赞数量
   */
  like?: number
  /**
   * 新闻数据
   */
  news?: NewsMultiLanguageDo
  /**
   * 新闻拓展数据
   */
  newsExt?: { [key: string]: AlgorithmData }
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 新闻图片数据
   */
  newsImg?: NewsImg[]
}
export interface UserNewsCommentDO {
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 评论内容
   */
  content?: string
  /**
   * 评论id
   */
  id?: number
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 用户id
   */
  userId?: number
  /**
   * 用户名
   */
  username?: string
}
export interface NewsMultiLanguageDo {
  /**
   * 新闻作者
   */
  author?: string
  /**
   * 新闻封面
   */
  avatar?: string
  /**
   * 内容 英文
   */
  bodyEn?: string
  /**
   * 内容 越南语
   */
  bodyVi?: string
  /**
   * 内容 中文
   */
  bodyZh?: string
  /**
   * 新闻时间
   */
  date?: string
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
  /**
   * 采集页面
   */
  url?: string
  /**
   * 新闻网站
   */
  website?: string
}
export interface AlgorithmData {
  /**
   * 数据
   */
  data?: { [key: string]: any }
  /**
   * 标签页名称
   */
  tag?: string
  /**
   * 数据类型 0:文本类型,1:列表类型,2:图片类型,3:音频类型,4:视频类型,5:折线图类型,6:直方图/柱状图类型,7:饼图类型,8:标签类型
   */
  type?: number
}
export interface NewsImg {
  id?: number
  newsId?: string
  url?: string
}

// app-news-show/news/hot
export interface AppNewsShowNewsHotRequest {}
export interface AppNewsShowNewsHotResponse extends BaseResponse {
  data: AppNewsShowNewsData[]
}
export interface AppNewsShowNewsData {
  /**
   * 封面图
   */
  avatar?: string
  /**
   * 新闻id
   */
  newsId?: string
  /**
   * 标题
   */
  title?: string
}
