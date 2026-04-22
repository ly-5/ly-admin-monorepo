/**
 * 分页响应体
 * @param list 响应数据列表
 * @param total 总条数
 * @param pageSize 每页数量
 * @param pageNum 页码
 */
export interface PageResult<T> extends PageParams {
  list: T[]
  total: number
}

/**
 * 分页请求参数
 * @param pageNum 页码
 * @param pageSize 每页数量
 */
export interface PageParams {
  pageNum: number
  pageSize: number
}