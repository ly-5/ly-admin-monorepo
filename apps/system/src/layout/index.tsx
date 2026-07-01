'use client'

import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar'
import { IconCommand, IconHome, IconUser } from '@tabler/icons-react'
import { NavUser } from './nav-user'
import { NavMain } from './nav-main'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                  <IconCommand className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ICS</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: '首页',
              url: '#',
              items: [
                {
                  title: '工作台',
                  url: '#',
                  icon: IconHome,
                },
                {
                  title: '我的待办',
                  url: '#',
                  icon: IconUser,
                  items: [
                    {
                      title: '待办事项',
                      url: '#',
                    },
                  ]
                },
              ],
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: 'John Doe', email: 'john.doe@example.com', avatar: '' }} />
      </SidebarFooter>
    </Sidebar>
  )
}
