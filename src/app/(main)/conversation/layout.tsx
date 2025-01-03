"use server";

import ConversationList from "@/components/conversation/conversation-list";
import { Separator } from "@/components/ui/separator";
import { conversationApi } from "@/lib/api";
import { Conversation } from "@prisma/client";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await conversationApi.list<Conversation[]>();
  return (
    <>
      <div className="flex gap-8 p-4 h-full">
        <ConversationList conversations={conversations} />
        <Separator orientation={"vertical"} />
        {children}
      </div>
    </>
  );
}
