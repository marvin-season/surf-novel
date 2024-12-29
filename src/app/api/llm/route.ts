import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

// 获取 model 列表
export async function GET(request: NextRequest) {
  const llmModelProvider = await prisma.lLMModelProvider.findMany({
    select: {
      id: true,
      name: true,
      modelListApi: true,
      lLMModel: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({
    providers: llmModelProvider,
  });
}
