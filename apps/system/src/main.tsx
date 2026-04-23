import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterPage } from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import WujieReact from "wujie-react";
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// const isProduction = process.env.NODE_ENV === "production";

const { preloadApp } = WujieReact;
preloadApp({
  name: "veh",
  url: '//localhost:5173/',
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterPage />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
