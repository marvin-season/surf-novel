# Surf Novel - AI 驱动的在线笔记平台

## 项目概述

- **Surf Novel** 是一个由 AI 驱动的在线笔记平台，提供实时协同编辑和丰富的文本编辑体验。

## 技术栈

- **前端**：
  - pnpm
  - React 19
  - Next.js 15
  - TailwindCSS
  - Shadcn UI
  - TipTap
- **后端**：
  - SqlLite
  - Prisma ORM

## 功能规划

- **第一阶段：基础功能**

  - **用户系统**：注册、登录、个人管理、JWT 认证
  - **界面设计**：响应式布局、主题切换、国际化支持
  - **编辑器功能**：富文本编辑器、实时协作、文本格式化、列表、表格、代码块、图片插入
  - **笔记管理**：创建、编辑、删除、分类、搜索

- **第二阶段：AI 增强**
  - AI 辅助写作
  - 智能内容分析
  - 自动摘要生成
  - 关键词提取

## 项目结构

```text
surf-novel/
├── src/
│   ├── app/           # Next.js
│   │   ├── (main)/       # 页面分组
│   │   ├── api/           # API 路由
│   ├── components/    # 可复用组件
│   │   ├── ui/          #  ShadcnUI 组件
│   ├── lib/          # 工具函数
│   ├── styles/       # 样式文件
│   └── types/        # TypeScript 类型定义
├── prisma/           # 数据库模型
└── public/          # 静态资源
```

## 开发规范

- 使用 TypeScript 进行开发
- 组件采用 Shadcn UI 设计系统
- 样式使用 TailwindCSS
- 提交遵循约定式提交规范

## 运行环境要求

- Node.js >= 18
- PostgreSQL >= 14
