import { createViteConfig, defineConfig } from "@workspace/config/vite"

export default defineConfig(
  createViteConfig()({
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
)
