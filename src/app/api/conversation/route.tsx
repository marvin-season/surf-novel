import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conversations = await prisma.conversation.findMany({});
  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  const userInfo = await getLoggedUserInfo();

  const result = await prisma.conversation.create({
    data: {
      userId: userInfo.id,
    },
  });

  return NextResponse.json(result);
}
