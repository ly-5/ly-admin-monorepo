'use client'

import type { Icon } from '@tabler/icons-react'
import { IconChevronRight } from '@tabler/icons-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@workspace/ui/components/sidebar'

import { NavLink } from 'react-router-dom'

/** 菜单项 */
export interface NavItem {
  title: string
  url: string
  icon?: Icon
  isActive?: boolean
  items?: NavItem[]
}

/** 导航分组（第一级） */
export interface NavGroup {
  title: string
  url: string
  items?: NavItem[]
}

export interface NavMainProps {
  items: NavGroup[]
}

/** 可折叠的菜单项 */
function MenuItem({ item }: { item: NavItem }) {
  const hasChildren = Boolean(item.items?.length)

  return (
    <Collapsible defaultOpen={item.isActive}>
      <CollapsibleTrigger asChild>
        <SidebarMenuItem className="group">
          <SidebarMenuButton asChild tooltip={item.title}>
            <div>
              {item.icon && <item.icon />}
              { !hasChildren && <NavLink to={item.url}>{item.title}</NavLink>}
              { hasChildren && <span>{item.title}</span>}
            </div>
          </SidebarMenuButton>
          {hasChildren && (
            <SidebarMenuAction className="group-data-[state=open]:rotate-90">
              <IconChevronRight />
            </SidebarMenuAction>
          )}
        </SidebarMenuItem>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {hasChildren && (
          <SidebarMenuSub>
            {item.items!.map((subItem) => (
              <SidebarMenuItem key={subItem.url}>
                <SidebarMenuSubButton asChild>
                  <NavLink to={subItem.url}>{subItem.title}</NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenuSub>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function NavMain({ items }: NavMainProps) {
  return items.map((group) => (
    <SidebarGroup key={group.url}>
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      <SidebarMenu>
        {group.items?.map((item) => (
          <MenuItem key={item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ))
}
