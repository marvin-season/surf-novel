import { NextRequest } from "next/server";
import { streamText } from "ai";
import { loadLLMFromSettings } from "@/lib/model-provider/load-llm";
import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";

export async function POST(request: NextRequest) {
  const { conversationId, messages } = await request.json();
  const userInfo = await getLoggedUserInfo();

  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: userInfo.id,
    },
  });

  const providerSettings = JSON.parse(userConfig!.provider_settings);
  const model = loadLLMFromSettings(providerSettings);

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages,
    onFinish: (event) => {
      // response text: event.text
      console.log("text", event.text);
      if (!conversationId) {
      }
    },
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
