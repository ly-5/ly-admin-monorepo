import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterPage } from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterPage />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
