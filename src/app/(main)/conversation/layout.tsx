"use server";

import ConversationList from "@/components/conversation/conversation-list";
import { Separator } from "@/components/ui/separator";
import { conversationApi } from "@/lib/api";
import { Conversation } from "@prisma/client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await conversationApi.list<Conversation[]>();
  return (
    <>
      <div className="p-4 h-[100dvh] relative flex flex-col">
        <div>
          <Sheet>
            <SheetTrigger className="flex gap-2 sticky top-[60px]">
              <MessageCircle size={20} />{" "}
              <span className="text-sm text-gray-500">{"会话列表"}</span>
            </SheetTrigger>
            <SheetContent side={"left"} className="w-[300px]">
              <SheetHeader>
                <SheetTitle>会话列表</SheetTitle>
                <SheetDescription>
                  Your historital conversation list
                </SheetDescription>
              </SheetHeader>
              <div className="h-[80dvh] overflow-scroll">
                <ConversationList conversations={conversations} />
              </div>
            </SheetContent>
          </Sheet>
          <Separator orientation={"vertical"} />
        </div>
        <div className="flex-1">{children}</div>
        <div className="flex justify-center my-2">
          <span className="text-sm text-gray-500">{"engined by aisdk!"}</span>
        </div>
      </div>
    </>
  );
}
