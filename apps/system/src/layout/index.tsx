"use client"

import * as React from "react"
import { NavLink, useLocation, useNavigate, useLoaderData } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenuSub,
  SidebarMenu,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible'
import { IconInbox, IconChevronRight } from "@tabler/icons-react"
import type { MenuItem } from '@/api/core'

function isRouteActive(pathname: string, path: string): boolean {
  return pathname === path || pathname.startsWith(`${path}/`)
}

function hasActiveChild(pathname: string, prefix: string, item: MenuItem): boolean {
  const fullPath = `${prefix}/${item.path}`
  if (item.type === 1 && isRouteActive(pathname, fullPath)) return true
  return item.children?.some(child => hasActiveChild(pathname, fullPath, child)) ?? false
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { menus } = useLoaderData() as { menus: MenuItem[] }
  const { setOpen } = useSidebar()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const activeGroup = React.useMemo(
    () => menus.find(item => isRouteActive(pathname, `/${item.path}`)) ?? menus[0],
    [menus, pathname]
  )

  const handleGroupClick = React.useCallback((item: MenuItem) => {
    const firstLeaf = item.children?.[0]
    if (firstLeaf) {
      navigate(`/${item.path}/${firstLeaf.path}`)
    }
    setOpen(true)
  }, [navigate, setOpen])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row border-r-0!"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! bg-linear-to-b from-[#0554bf] to-primary"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#" className="hover:bg-transparent!">
                  <img src="https://icspre.inforecloud.com/login.png" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {menus.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.name,
                        hidden: false,
                      }}
                      onClick={() => handleGroupClick(item)}
                      isActive={activeGroup?.id === item.id}
                      className="px-2.5 md:px-2"
                    >
                      <IconInbox />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-bold text-foreground">
              {activeGroup?.name}
            </div>
          </div>
          <SidebarInput placeholder="请搜索..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {(activeGroup?.children ?? []).map((item) => {
                  const itemPath = `/${activeGroup.path}/${item.path}`
                  return item.children?.length ? (
                    <Collapsible
                      key={item.id}
                      asChild
                      className="group/collapsible mx-2"
                      defaultOpen={hasActiveChild(pathname, `/${activeGroup.path}`, item)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.name}
                            isActive={hasActiveChild(pathname, `/${activeGroup.path}`, item)}
                          >
                            <span>{item.name}</span>
                            <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((subItem) => {
                              const subPath = `${itemPath}/${subItem.path}`
                              return (
                                <SidebarMenuSubItem key={subItem.id}>
                                  <SidebarMenuSubButton asChild isActive={isRouteActive(pathname, subPath)}>
                                    <NavLink to={subPath}>
                                      <span>{subItem.name}</span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={isRouteActive(pathname, itemPath)}>
                        <NavLink to={itemPath}>
                          <span>{item.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
