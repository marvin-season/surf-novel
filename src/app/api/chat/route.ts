import { NextRequest } from "next/server";
import { streamText } from "ai";
import { loadLLMFromSettings } from "@/lib/model-provider/load-llm";
import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { extractMessageContext, getHistoricalMessages } from "./utils";

export async function POST(request: NextRequest) {
  const { prompt, conversationId, multiTurn } = await request.json();
  const userInfo = await getLoggedUserInfo();

  const historicalMessages = multiTurn
    ? await extractMessageContext(await getHistoricalMessages(conversationId))
    : [];

  console.log("historicalMessages and ", { historicalMessages, userInfo });

  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: userInfo.id || "cm5c1dfro0000ir1x53gvpaq1",
    },
  });

  const providerSettings = JSON.parse(userConfig!.provider_settings);
  const model = loadLLMFromSettings(providerSettings);

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages: [
      ...historicalMessages,
      {
        role: "user",
        content: `请依据上面的聊天记录信息回答问题：${prompt}`,
      },
    ],
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
