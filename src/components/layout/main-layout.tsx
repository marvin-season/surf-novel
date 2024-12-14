"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MainLayoutProps {
  children: ReactNode
  className?: string
  sidebar?: (props: { expanded: boolean }) => ReactNode
}

export function MainLayout({ children, className, sidebar }: MainLayoutProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* 侧边栏 */}
      {sidebar && (
        <aside className={cn(
          "relative flex flex-col border-r bg-muted/5 transition-all duration-300",
          expanded ? "w-72" : "w-16"
        )}>
          <div className="flex-1 overflow-hidden">
            {sidebar({ expanded })}
          </div>
          
          {/* 切换按钮 */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex h-10 items-center justify-center border-t text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </aside>
      )}
      
      {/* 主内容区 */}
      <main className={cn(
        "flex-1 overflow-y-auto",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
        "hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500",
        className
      )}>
        {children}
      </main>
    </div>
  )
}
