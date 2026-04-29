import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import type { MenuItem } from '@/api/core'
import WujieReact from "wujie-react"
import App from '@/App'

const pages = import.meta.glob('@/page/**/index.tsx')

const extractFirstPathSegment = (path: string): string => {
  const firstSegment = path.replace(/^\//, '').split('/')[0]
  return firstSegment || ''
}

function transformMenus({
  items,
  parentPath = '/',
}: {
  items: MenuItem[]
  parentPath?: string
}): RouteObject[] {
  return items.map((item) => {
    return {
      id: item.id,
      path: `${parentPath}${item.path}`,
      lazy: item.type === 1
        ? async () => {
            if (item.wujie) {
              const Component = () => (
                <WujieReact
                  // @ts-ignore
                  width={'100%'}
                  height={'100%'}
                  name={extractFirstPathSegment(`${parentPath}${item.path}`)}
                  url={`//localhost:5173${parentPath}${item.path}`}
                />
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

const MENU_DATA: MenuItem[] = [
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
      },
      {
        name: '维保',
        id: '2-2',
        path: 'maintenance',
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
]

export function getMenus(): MenuItem[] {
  return MENU_DATA
}

export function RouterPage() {
  const router = useMemo(() => {
    const menus = getMenus()
    const routeObjects = transformMenus({ items: menus })

    return createBrowserRouter([
      {
        path: '/',
        Component: App,
        loader: () => ({ menus, routes: routeObjects }),
        children: routeObjects,
      },
    ])
  }, [])

  return <RouterProvider router={router} />
}
