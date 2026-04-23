import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { useGetMenusQuery, type MenuItem } from '@/api/core'
import WujieReact from "wujie-react";
import App from '@/App'

const pages = import.meta.glob('@/page/**/index.tsx')

const extractFirstPathSegment = (path: string): string => {
  const firstSegment = path.replace(/^\//, '').split('/')[0];
  return firstSegment || '';
};

function transformMenus({
  items,
  parentPath = '/',
}: {
  items: MenuItem[]
  parentPath?: string
}): RouteObject[] {
  return items.map((item) => {
    return {
      ...item,
      id: item.id,
      path: `${parentPath}${item.path}`,
      lazy: item.type === 1
        ? async () => {
            if (item.wujie) {
              const Component =  () => (
                <WujieReact
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  width={'100%'}
                  height={'100%'}
                  name={extractFirstPathSegment(`${parentPath}${item.path}`)}
                  url={`//localhost:5173${parentPath}${item.path}`}
                ></WujieReact>
              )
              return { Component }
            } else {
              const module = await pages[`/src/page${parentPath}${item.path}/index.tsx`]()
              const { default: Component } = module as { default: React.ComponentType }
              return { Component }
            }
          }
        : undefined,
      children: transformMenus({
        items: item.children || [],
        parentPath: `${parentPath}${item.path}/`,
      }),
    }
  })
}

export function RouterPage() {
  const { data = { menuList: [] }, isLoading } = useGetMenusQuery()
 
  const routes = useMemo(() => {
    if (!data.menuList.length) return []
    return transformMenus({ items: [
      {
        name: '首页',
        id: '1',
        path: 'home',
        type: 0,
        children: [
          {
            name: '工作台',
            id: '1-1',
            path: 'workbench',
            type: 1,
          }
        ]
      },
      {
        name: '车辆管理',
        id: '2',
        path: 'veh',
        type: 0,
        children: [
          {
            name: '资产',
            id: '2-1',
            path: 'asset',
            wujie: true,
            type: 1,
          }
        ]
      },
      {
        name: '系统设置',
        id: '3',
        path: 'setting',
        type: 0,
        children: [
          {
            name: '菜单管理',
            id: '3-1',
            path: 'menu',
            type: 1,
          },
          {
            name: '角色管理',
            id: '3-2',
            path: 'role',
            type: 1,
          }
        ]
      },
    ] })
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