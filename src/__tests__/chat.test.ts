import { prisma } from "@/lib/prisma";

describe("Chat Unit Tests", () => {
  it("create conversation", async () => {
    const conversation = await prisma.conversation.create({
      data: {
        name: "Test Conversation",
        userId: "cm5c1dfro0000ir1x53gvpaq1",
      },
    });
  });

  it("create batch messages", async () => {
    const messages = await prisma.message.createMany({
      data: [
        {
          role: "user",
          content: "What is the weather in Tokyo?",
          conversationId: "cm5c8chcr0001ir0ihjdhq23f",
        },
        {
          role: "assistant",
          content: "The weather in Tokyo is sunny and warm.",
          conversationId: "cm5c8chcr0001ir0ihjdhq23f",
        },
      ],
    });
  });
});
