"use server";

import ConversationChat from "@/components/conversation/conversation-chat";
import { conversationApi } from "@/lib/api";
import { Conversation, Message } from "@prisma/client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{
    conversationId: string;
  }>;
}) {
  const { conversationId } = await params;
  const conversation =
    conversationId === "0"
      ? await conversationApi.create<Conversation>()
      : { id: conversationId };
  const messages = await conversationApi.listMessage<Message[]>(
    conversation.id,
  );

  return (
    <div className="flex-1 p-2 h-full">
      <ConversationChat
        historyMessages={messages}
        conversationId={conversation.id}
      />
    </div>
  );
}
