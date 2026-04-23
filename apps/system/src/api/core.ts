import { apiSlice } from '@/api/request'

export interface MenuItem {
  id: string
  name: string
  path: string
  icon?: string
  /** 0: 目录 1: 菜单 */
  type: number
  /** 是否为微应用 */
  wujie?: boolean
  children?: MenuItem[]
}

const coreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<{ menuList: MenuItem[] }, void>({
      query: () => '/sysMenu/nav',
    }),
  }),
})

export const { useGetMenusQuery } = coreApiSlice