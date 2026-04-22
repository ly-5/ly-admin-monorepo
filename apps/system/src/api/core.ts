import { apiSlice } from '@/api/request'

export interface MenuItem {
  id: string
  name: string
  path: string
  icon?: string
  /** 0: 目录 1: 菜单 */
  type: number
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