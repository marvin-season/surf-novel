"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "../ui/sheet";
import { SideBar } from "./side-bar";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  sidebar?: ReactNode;
}

export function MainLayout({ children, className, sidebar }: MainLayoutProps) {
  return (
    <div className="h-screen overflow-hidden ">
      <Sheet>
        <SheetTrigger>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SideBar />
        </SheetContent>
      </Sheet>
      {/* 主内容区 */}
      <main
        className={cn(
          "flex-1 overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          "hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
