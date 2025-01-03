import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { conversationId } = await request.json();

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
  console.log("messages_", messages_);
  const result = await prisma.message.createMany({
    data: messages_,
  });

  return NextResponse.json(result);
}
