import { prisma } from "@/lib/prisma";
import { Message } from "@prisma/client";

export const getHistoricalMessages = async (conversationId?: string) => {
  if (!conversationId) {
    return [];
  }

  const currentConversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    select: {
      id: true,
      name: true,
      messages: true,
    },
  });

  return currentConversation?.messages || [];
};

export const extractMessageContext = async (messages: Message[]) => {
  return messages.map((message) => ({
    role: message.role as "user" | "assistant" | "system",
    content: message.content,
  }));
};
