import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, mergeConfig } from "vite"
import type { UserConfigFn, UserConfig } from "vite"

interface CreateViteConfigOptions {
  srcDir?: string
}

export function createViteConfig(options: CreateViteConfigOptions = {}) {
  const { srcDir = "src" } = options

  return (userConfig?: UserConfig | UserConfigFn): UserConfigFn => {
    return (env) => {
      const base: UserConfig = {
        plugins: [react(), tailwindcss()],
        resolve: {
          alias: {
            "@": path.resolve(process.cwd(), `./${srcDir}`),
          },
        },
        build: {
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ["react", "react-dom"],
                router: ["react-router-dom"],
              },
            },
          },
        },
      }

      const resolvedUserConfig =
        typeof userConfig === "function" ? userConfig(env) : userConfig ?? {}

      return mergeConfig(base, resolvedUserConfig)
    }
  }
}

export { defineConfig, mergeConfig }
export type { UserConfig, UserConfigFn }
