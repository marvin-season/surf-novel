import { NextRequest } from "next/server";
import { streamText } from "ai";
import { getSystemPrompt } from "./prompt";
import { loadLLMFromSettings } from "@/lib/model-provider/load-llm";
import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";

export async function POST(request: NextRequest) {
  const { prompt, command, context } = await request.json();
  const messages = getSystemPrompt(prompt, command, context);
  console.log(messages);
  const userInfo = await getLoggedUserInfo();
  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: userInfo.id,
    },
  });

  const settings = JSON.parse(userConfig!.settings || "{}");
  const model = loadLLMFromSettings(settings);

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages,
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
