"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { BookMarked, Clock, LogOut, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { Button } from "@/components/ui/button"

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
] as const

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  const router = useRouter()

  const handleLogout = () => {
    // 清除登录状态
    document.cookie = "isLoggedIn=false; path=/; max-age=0"
    // 跳转到登录页
    router.push("/login")
  }

  return (
    <MainLayout
      sidebar={({ expanded }) => (
        <div className="flex h-full flex-col">
          <div className={cn(
            "flex h-14 items-center border-b",
            expanded ? "px-4" : "justify-center"
          )}>
            <BookMarked className="h-6 w-6" />
            {expanded && (
              <h2 className="ml-3 text-lg font-semibold truncate">
                Surf Novel
              </h2>
            )}
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              {sidebarNavItems.map((item) => {
                const isActive = segment === item.href.split("/")[1]
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2",
                        "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.icon}
                      {expanded && (
                        <span className="ml-3 truncate">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          {/* 退出登录按钮 */}
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                !expanded && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {expanded && <span>退出登录</span>}
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </MainLayout>
  )
}
