import { AppSidebar } from "@/layout"
import { Outlet } from 'react-router-dom'
// import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"

// const tabs = [
//   {
//     title: '首页',
//   }
// ]

export default function App() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "250px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header>

        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
