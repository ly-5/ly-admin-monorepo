import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: [
    "src/vite/index",
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: true,
  },
  externals: [
    "vite",
    "@vitejs/plugin-react",
    "@tailwindcss/vite",
  ],
})
