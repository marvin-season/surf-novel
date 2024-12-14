import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
  className?: string
  sidebar?: ReactNode
}

export function MainLayout({ children, className, sidebar }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* 侧边栏 */}
      {sidebar && (
        <aside className="w-64 border-r bg-muted/40">
          {sidebar}
        </aside>
      )}
      
      {/* 主内容区 */}
      <main className={cn("flex-1 overflow-auto", className)}>
        {children}
      </main>
    </div>
  )
}
