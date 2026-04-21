import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

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
      <SidebarInset className="bg-sidebar">
        <header className="sticky top-2.5 flex shrink-0 items-center gap-2 bg-background p-2 rounded-md border border-border shadow-sm mx-4">
          <SidebarTrigger className="cursor-pointer" />
          <Separator
            orientation="vertical"
            className="mr-2"
          />
        </header>
        <div className="flex-1 gap-4 p-4 grid grid-cols-3">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-40 w-full rounded-lg bg-background shadow-md"
            />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
