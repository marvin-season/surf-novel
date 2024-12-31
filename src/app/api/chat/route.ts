import { NextRequest } from "next/server";
import { streamText } from "ai";
import { loadLLMFromSettings } from "@/lib/model-provider/load-llm";
import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";

export async function POST(request: NextRequest) {
  const { prompt, conversationId } = await request.json();
  const userInfo = await getLoggedUserInfo();

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

  const historicalMessages = currentConversation?.messages || [];
  console.log("historicalMessages", historicalMessages);

  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: userInfo.id,
    },
  });

  const providerSettings = JSON.parse(userConfig!.provider_settings);
  const model = loadLLMFromSettings(providerSettings);

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
