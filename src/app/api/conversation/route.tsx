import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conversations = await prisma.conversation.findMany({});
  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  // todo: userInfo is null
  const userInfo = await getLoggedUserInfo();
  console.log("userInfo", userInfo);
  const result = await prisma.conversation.create({
    data: {
      userId: userInfo.id || "cm5ezmasc0000irrkkyqrd2cx",
      name: "新会话",
    },
  });

  return NextResponse.json(result);
}
