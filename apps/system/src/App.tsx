import { useEffect, useMemo, useCallback } from "react"
import { Outlet, useLocation, useNavigate, useLoaderData } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppSidebar } from "@/layout"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { TabsBar, type TabItem } from "@workspace/ui/custom/tabs-bar"
import type { MenuItem } from '@/api/core'
import { addTab, removeTab, setActiveTab } from '@/store/tabs'
import type { RootState } from '@/store'

interface FlatMenuItem {
  title: string
  path: string
}

function flattenMenus(menus: MenuItem[], prefix = ''): FlatMenuItem[] {
  const result: FlatMenuItem[] = []
  for (const item of menus) {
    if (item.children?.length) {
      result.push(...flattenMenus(item.children, `${prefix}/${item.path}`))
    }
    if (item.type === 1) {
      result.push({ title: item.name, path: `${prefix}/${item.path}` })
    }
  }
  return result
}

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { menus } = useLoaderData() as { menus: MenuItem[] }
  const { items: tabs, activeKey } = useSelector((state: RootState) => state.tabs)

  const flatMenus = useMemo(() => flattenMenus(menus), [menus])
  const pathMap = useMemo(() => new Map(flatMenus.map(m => [m.path, m])), [flatMenus])

  useEffect(() => {
    const normalized = pathname === '/' ? '/home/workbench' : pathname
    const menuItem = pathMap.get(normalized)
    if (!menuItem) return

    const key = normalized
    const exists = tabs.find(t => t.key === key)

    if (!exists) {
      dispatch(addTab({ key, title: menuItem.title, path: normalized }))
    } else if (activeKey !== key) {
      dispatch(setActiveTab(key))
    }
  }, [pathname, pathMap, tabs, activeKey, dispatch])

  const handleTabSelect = useCallback((tab: TabItem) => {
    dispatch(setActiveTab(tab.key))
    navigate(tab.path)
  }, [dispatch, navigate])

  const handleTabClose = useCallback((tab: TabItem) => {
    const idx = tabs.findIndex(t => t.key === tab.key)
    const wasActive = activeKey === tab.key

    dispatch(removeTab(tab.key))

    if (wasActive && tabs.length > 1) {
      const remaining = tabs.filter(t => t.key !== tab.key)
      const nextIdx = Math.min(idx, remaining.length - 1)
      navigate(remaining[nextIdx].path)
    }
  }, [tabs, activeKey, dispatch, navigate])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "220px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <TabsBar
          items={tabs}
          activeKey={activeKey}
          onSelect={handleTabSelect}
          onClose={handleTabClose}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
