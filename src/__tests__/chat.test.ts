import { prisma } from "@/lib/prisma";

describe("Chat Unit Tests", () => {
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

  // chat api
  it("chat api", async () => {
    const response = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt: "上面问的是哪个城市的天气",
        conversationId: "cm5c8chcr0001ir0ihjdhq23f",
        multiTurn: true,
      }),
    });

    console.log(await response.text());
  });
});
