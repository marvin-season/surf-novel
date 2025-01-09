"use client";

import { cn } from "@/lib/utils";
import {
  BotMessageSquare,
  Leaf,
  NotebookTabs,
  Settings,
  ThumbsUpIcon,
  User,
} from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import SignOut from "../auth/sign-out";
import Link from "next/link";
import { useSession } from "next-auth/react";

const sidebarNavItems = [
  {
    title: "my_notes",
    href: "/notes",
    icon: <NotebookTabs className="h-4 w-4" />,
  },
  {
    title: "conversation",
    href: "/conversation",
    icon: <BotMessageSquare className="h-4 w-4" />,
  },
] as const;

const profileNavItems = [
  {
    title: "reward",
    href: "/reward",
    icon: <ThumbsUpIcon className="h-4 w-4" />,
  },
  {
    title: "settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
] as const;

export function SideBar() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const session = useSession();

  const renderNavItems = (
    items: typeof sidebarNavItems | typeof profileNavItems,
  ) => {
    console.log("items", items);
    return items.map((item) => {
      const isActive = segment === item.href.split("/")[1];
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex gap-2 items-center rounded-lg px-3 py-2 hover:text-foreground hover:bg-accent transition-colors",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      );
    });
  };

  return (
    <>
      <div className=" h-full flex flex-col">
        {/* 标题 */}
        <div
          onClick={() => {
            router.push("/");
          }}
          className={cn("flex h-14 items-center border-b px-4")}
        >
          <Leaf className="h-6 w-6" />
          <h2 className="ml-3 text-lg font-semibold truncate">Surf Novel</h2>
        </div>

        <div className="flex-1 overflow-auto py-4">
          {/* 主导航 */}
          {renderNavItems(sidebarNavItems)}
          <Separator />
          {/* 个人导航 */}
          {renderNavItems(profileNavItems)}
        </div>
        <Separator />
        <div className="p-2 border-t flex gap-2">
          <User />
          {session?.data?.user?.email}
        </div>
        <Separator />
        {/* 退出登录按钮 */}
        <div className="p-2">
          <SignOut />
        </div>
      </div>
    </>
  );
}
