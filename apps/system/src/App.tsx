import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/layout'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { IconSettings, IconArrowBack, IconMaximize } from '@tabler/icons-react'

export default function App() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '190px',
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset className="bg-sidebar shadow-none! m-0!">
        <header className="flex h-13 shrink-0 items-center gap-2 justify-between px-4">
          <div className="flex items-center">
            <IconArrowBack className="size-5 cursor-pointer mr-4" />
            <h2>工作台</h2>
          </div>
          <div className="flex items-center gap-5">
            <IconMaximize className="size-5 cursor-pointer" />
            <IconSettings className="size-5 cursor-pointer" />
          </div>
        </header>
        <div className="flex  flex-1 flex-col gap-3 p-4 pt-0 border-[#E2E2E2] border rounded-tl-2xl">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
