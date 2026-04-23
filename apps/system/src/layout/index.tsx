"use client"

import * as React from "react"
import { useLoaderData, NavLink } from 'react-router-dom'
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
import { IconInbox, IconCommand, IconChevronRight } from "@tabler/icons-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const routes = useLoaderData()
  const [activeItem, setActiveItem] = React.useState(routes[0])
  const { setOpen } = useSidebar()

  const handleItemClick = React.useCallback((item) => {
    setActiveItem(item)
    setOpen(true)
  }, [setOpen])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <IconCommand className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">ICS</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {routes.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.name,
                        hidden: false,
                      }}
                      onClick={() => handleItemClick(item)}
                      isActive={activeItem?.name === item.name}
                      className="px-2.5 md:px-2"
                    >
                      {/* {item.icon} */}
                      {/* <span>{item.name}</span> */}
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

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-bold text-foreground">
              {activeItem?.name}
            </div>
          </div>
          <SidebarInput placeholder="请搜索..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {
                  activeItem.children.map((item) => (
                    item.children && item.children.length ?
                    (
                      <Collapsible key={item.id} asChild className="group/collapsible mx-2">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.name}>
                              <span>{item.name}</span>
                              <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {(item.children || []).map((subItem) => (
                                <SidebarMenuSubItem key={subItem.id}>
                                  <SidebarMenuSubButton asChild>
                                    <NavLink to={subItem.path}>
                                      <span>{subItem.name}</span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  :  
                    (
                      <SidebarMenuButton>
                        <NavLink to={item.path}>
                          <span>{item.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    )
                  ))
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
