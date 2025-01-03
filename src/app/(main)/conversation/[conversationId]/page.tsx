"use server";

import ConversationChat from "@/components/conversation/conversation-chat";
import { conversationApi } from "@/lib/api";
import { Message } from "@prisma/client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{
    conversationId: string;
  }>;
}) {
  const { conversationId } = await params;
  const messages = await conversationApi.listMessage<Message[]>(conversationId);

  return (
    <div className="flex-1 p-8 pt-6 h-full w-[60%] m-auto">
      <ConversationChat historyMessages={messages} />
    </div>
  );
}
