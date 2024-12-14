"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex flex-col space-y-1 px-2",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
              "hover:bg-accent/50 hover:text-accent-foreground",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 rounded-lg bg-accent/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {item.icon && (
              <span className="mr-2 h-4 w-4">
                {item.icon}
              </span>
            )}
            <span className="relative">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
