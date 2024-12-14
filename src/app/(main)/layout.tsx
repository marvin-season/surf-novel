"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { SidebarNav } from "@/components/layout/sidebar-nav"

const sidebarNavItems = [
  {
    title: "我的笔记",
    href: "/notes",
  },
  {
    title: "最近编辑",
    href: "/recent",
  },
  {
    title: "收藏夹",
    href: "/favorites",
  },
]

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout
      sidebar={
        <div className="space-y-6 py-4 px-2">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Surf Novel</h2>
            <SidebarNav items={sidebarNavItems} />
          </div>
        </div>
      }
    >
      {children}
    </MainLayout>
  )
}
