import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json({
      mesage: "conversationId is required!",
    });
  }

  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
  });

  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const { conversationId, messages } = await request.json();
  const messages_ = messages.map((message: any) => ({
    ...message,
    conversationId,
  }));
  const result = await prisma.message.createMany({
    data: messages_,
  });

  return NextResponse.json(result);
}
