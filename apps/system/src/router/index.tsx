import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { useGetMenusQuery, type MenuItem } from '@/api/core'
import App from '@/App'

const pages = import.meta.glob('@/pages/**/index.tsx')

function transformMenus({
  items,
  parentPath = '/',
}: {
  items: MenuItem[]
  parentPath?: string
}): RouteObject[] {
  return items.map((item) => ({
    ...item,
    id: item.id,
    path: `${parentPath}${item.path}`,
    lazy: item.type === 1
      ? async () => {
          const module = await pages[`/src/pages${parentPath}${item.path}/index.tsx`]()
          const { default: Component } = module as { default: React.ComponentType }
          return { Component }
        }
      : undefined,
    children: transformMenus({
      items: item.list || [],
      parentPath: `${parentPath}${item.path}/`,
    }),
  }))
}

export function RouterPage() {
  const { data = { menuList: [] }, isLoading } = useGetMenusQuery()
 
  const routes = useMemo(() => {
    if (!data.menuList.length) return []
    return transformMenus({ items: data.menuList })
  }, [data.menuList])

  // 使用 useMemo 缓存 router
  const router = useMemo(() => {
    if (!routes.length) return null
    
    return createBrowserRouter([
      {
        path: '/',
        Component: App,
        loader: async () => routes,
        children: routes,
      },
    ])
  }, [routes])

  if (isLoading || !router) {
    return <div>加载中...</div>
  }

  return <RouterProvider router={router} />
}