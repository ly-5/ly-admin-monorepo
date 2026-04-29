import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { IconX } from "@tabler/icons-react"

export interface TabItem {
  key: string
  title: string
  path: string
  closable?: boolean
}

interface TabsBarProps {
  items: TabItem[]
  activeKey: string
  onSelect?: (tab: TabItem) => void
  onClose?: (tab: TabItem) => void
  className?: string
}

export function TabsBar({ items, activeKey, onSelect, onClose, className }: TabsBarProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex items-end bg-sidebar px-2 pt-1.5 overflow-x-auto scrollbar-none select-none", className)}>
      {items.map((tab, index) => {
        const isActive = tab.key === activeKey
        const isLast = index === items.length - 1
        return (
          <div
            key={tab.key}
            onClick={() => onSelect?.(tab)}
            className={cn(
              "group relative flex items-center gap-2 pl-3 pr-2 h-[34px] text-xs cursor-pointer",
              "transition-all duration-100 min-w-[120px] max-w-[200px]",
              isActive
                ? [
                    "bg-background text-foreground",
                    "rounded-t-lg",
                    "-mb-px",
                  ]
                : [
                    "text-muted-foreground hover:text-foreground hover:bg-background/50",
                    "rounded-t-lg",
                    !isLast && "mr-[1px]",
                  ]
            )}
          >
            <span className="truncate flex-1 text-center">{tab.title}</span>
            {tab.closable !== false && items.length > 1 && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  onClose?.(tab)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation()
                    onClose?.(tab)
                  }
                }}
                className={cn(
                  "flex items-center justify-center rounded-full size-4 shrink-0",
                  "transition-all duration-100",
                  isActive
                    ? "hover:bg-muted text-muted-foreground hover:text-foreground"
                    : "opacity-0 group-hover:opacity-100 hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <IconX className="size-2.5" />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
