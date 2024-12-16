"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { BookMarked, Clock, LogOut, Settings, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const sidebarNavItems = [
  {
    title: "my_notes",
    href: "/notes",
    icon: <BookMarked className="h-4 w-4" />,
  },
  {
    title: "recent_edits",
    href: "/recent",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "favorites",
    href: "/favorites",
    icon: <Star className="h-4 w-4" />,
  },
] as const;

const profileNavItems = [
  {
    title: "profile",
    href: "/profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
] as const;

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const t = useTranslations("SideBar");

  const handleLogout = () => {
    // 清除登录状态
    document.cookie = "isLoggedIn=false; path=/; max-age=0";
    // 跳转到登录页
    router.push("/login");
  };

  const renderNavItems = (
    items: typeof sidebarNavItems | typeof profileNavItems,
    expanded: boolean
  ) => {
    return items.map((item) => {
      const isActive = segment === item.href.split("/")[1];
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
            {expanded && <span className="ml-3 truncate">{t(item.title)}</span>}
          </Link>
        </li>
      );
    });
  };

  return (
    <MainLayout
      sidebar={({ expanded }) => (
        <div className="flex h-full flex-col">
          {/* 标题 */}
          <div
            className={cn(
              "flex h-14 items-center border-b",
              expanded ? "px-4" : "justify-center"
            )}
          >
            <BookMarked className="h-6 w-6" />
            {expanded && (
              <h2 className="ml-3 text-lg font-semibold truncate">
                Surf Novel
              </h2>
            )}
          </div>

          {/* 主导航 */}
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              {renderNavItems(sidebarNavItems, expanded)}
            </ul>

            {/* 个人导航 */}
            <div className="mt-6">
              <div
                className={cn(
                  "px-2 pb-2",
                  expanded && "text-xs font-medium text-muted-foreground"
                )}
              >
                {expanded ? "个人" : <Separator />}
              </div>
              <ul className="space-y-1 px-2">
                {renderNavItems(profileNavItems, expanded)}
              </ul>
            </div>
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
              {expanded && <span>{t("logout")}</span>}
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </MainLayout>
  );
}
