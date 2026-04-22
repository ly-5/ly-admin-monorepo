import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/assets': {
        target: 'http://10.87.106.237:9696',
        rewrite: (path) => path.replace(/^\/assets/, 'assets'),
        changeOrigin: true,
      },
    },
  },
})
