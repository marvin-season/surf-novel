"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { BookMarked, Clock, Star } from "lucide-react"

const sidebarNavItems = [
  {
    title: "我的笔记",
    href: "/notes",
    icon: <BookMarked className="h-4 w-4" />,
  },
  {
    title: "最近编辑",
    href: "/recent",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "收藏夹",
    href: "/favorites",
    icon: <Star className="h-4 w-4" />,
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
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-6">
            <h2 className="text-lg font-semibold">Surf Novel</h2>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <SidebarNav items={sidebarNavItems} />
          </div>
        </div>
      }
    >
      {children}
    </MainLayout>
  )
}
