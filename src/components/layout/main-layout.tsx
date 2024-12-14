import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
  className?: string
  sidebar?: ReactNode
}

export function MainLayout({ children, className, sidebar }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* 侧边栏 */}
      {sidebar && (
        <aside className="hidden md:flex w-72 flex-col border-r bg-muted/5">
          {sidebar}
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
