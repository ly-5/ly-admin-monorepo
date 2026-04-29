# Vite Monorepo

基于 Vite + pnpm workspace + Turborepo 的企业级前端微应用 monorepo 项目。

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建工具 | Vite 7 + Turborepo |
| 包管理 | pnpm 9 (workspace + catalog) |
| 前端框架 | React 19 + TypeScript 5 |
| 路由 | React Router 7 |
| 状态管理 | Redux Toolkit (RTK Query) |
| UI 组件库 | shadcn/ui (radix-mira) |
| 样式 | Tailwind CSS 4 |
| 图标 | Tabler Icons |
| 微前端 | wujie (无界) |
| 暗色模式 | ThemeProvider (localStorage 持久化, 按 `D` 键切换) |

## 项目结构

```
vite-monorepo/
├── apps/
│   ├── system/                # 主应用 - 后台管理系统
│   │   └── src/
│   │       ├── api/           # RTK Query 接口定义
│   │       ├── components/    # 通用组件 (TabsBar, ThemeProvider)
│   │       ├── layout/        # 布局组件 (侧边栏、用户导航)
│   │       ├── page/          # 页面模块
│   │       ├── router/        # 路由配置 & 菜单动态路由生成
│   │       ├── store/         # Redux store (auth, tabs)
│   │       ├── App.tsx        # 根布局
│   │       └── main.tsx       # 入口文件
│   └── veh/                   # 子应用 - 车辆管理微应用 (wujie)
│       └── src/
│           ├── App.tsx
│           └── main.tsx       # wujie 生命周期挂载
├── packages/
│   └── ui/                    # 共享 UI 组件包 (@workspace/ui)
│       └── src/
│           ├── components/    # shadcn/ui 组件
│           ├── hooks/         # 共享 Hooks
│           ├── lib/           # 工具函数 (cn, utils)
│           └── styles/        # 全局样式 & CSS 变量 (亮色/暗色)
├── pnpm-workspace.yaml        # workspace 配置 & 依赖版本目录
├── turbo.json                 # Turborepo 任务编排
└── package.json               # 根依赖 & 全局脚本
```

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 9

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动所有应用
pnpm dev

# 单独启动主应用
pnpm --filter system dev

# 单独启动车辆子应用
pnpm --filter veh dev
```

主应用运行在 `http://localhost:3000`，车辆子应用运行在 `http://localhost:5173`。

### 构建

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint        # ESLint 检查
pnpm format      # Prettier 格式化
pnpm typecheck   # TypeScript 类型检查
```

## 主应用 (system)

后台管理系统的主框架，包含以下核心功能：

### 路由系统

- 基于后端菜单数据动态生成路由 (`router/index.tsx`)
- 支持 `import.meta.glob` 实现页面组件懒加载
- 支持微应用 (wujie) 和本地页面两种模式
- 菜单路由通过 `loader` 传递给侧边栏组件

### 侧边栏布局

采用双层侧边栏设计：

1. **左侧图标栏** - 显示一级菜单图标，点击切换分组
2. **右侧导航栏** - 显示当前分组的子菜单，支持折叠/展开

侧边栏组件支持路由高亮，当前激活的菜单项会自动高亮并展开父级。

### API 层

使用 RTK Query 封装接口请求：

- 统一的 Token 鉴权 (`api/request.ts`)
- 统一的错误处理 (code !== 0 时 toast 提示)
- 按模块拆分 endpoint (`api/core.ts`)

### 代理配置

开发环境通过 Vite proxy 将 `/assets` 前缀的请求代理到后端服务：

```typescript
// apps/system/vite.config.ts
proxy: {
  '/assets': {
    target: 'http://10.87.106.237:9696',
    rewrite: (path) => path.replace(/^\/assets/, 'assets'),
    changeOrigin: true,
  },
}
```

## 微前端 (wujie)

车辆管理模块 (`apps/veh`) 作为子应用通过 wujie 接入主应用：

- 主应用通过 `WujieReact` 组件加载子应用
- 子应用实现了 wujie 生命周期 (`__WUJIE_MOUNT` / `__WUJIE_UNMOUNT`)
- 子应用可独立运行，也可嵌入主应用
- 主应用启动时通过 `preloadApp` 预加载子应用

## UI 组件包 (@workspace/ui)

共享的 shadcn/ui 组件库，所有组件源码存放在 `packages/ui/src/components/` 目录。

### 添加组件

在项目根目录执行：

```bash
pnpm dlx shadcn@latest add button -c apps/system
```

组件会自动安装到 `packages/ui/src/components/` 目录。

### 使用组件

```tsx
import { Button } from "@workspace/ui/components/button"
import { Sidebar, SidebarContent } from "@workspace/ui/components/sidebar"
```

### 已安装组件

avatar, button, collapsible, dropdown-menu, input, separator, sheet, sidebar, skeleton, sonner, tooltip

### 别名配置

| 别名 | 路径 |
|------|------|
| `@/*` | `apps/system/src/*` |
| `@workspace/ui/components/*` | `packages/ui/src/components/*` |
| `@workspace/ui/hooks/*` | `packages/ui/src/hooks/*` |
| `@workspace/ui/lib/*` | `packages/ui/src/lib/*` |

## 暗色模式

项目内置暗色模式支持，通过 `ThemeProvider` 组件实现：

- 支持三种模式：`light` / `dark` / `system`
- 状态持久化到 `localStorage`
- 按 `D` 键快速切换亮/暗模式
- CSS 变量驱动，所有组件自动适配
