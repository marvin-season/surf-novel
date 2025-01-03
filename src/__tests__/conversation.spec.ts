import { prisma } from "@/lib/prisma";

describe("Conversation Unit Tests", () => {
  it("create conversation", async () => {
    const conversation = await prisma.conversation.create({
      data: {
        name: "Test Conversation",
        userId: "cm5ezmasc0000irrkkyqrd2cx",
      },
    });
  });
  it("Retrive message by conversation", async () => {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: "cm5g45d7p0001irom5vnhi8pe",
      },
    });
    console.log("messages", messages);
  });

  it("Retrive message by conversation", async () => {
    const response = await fetch("http://localhost:4000/api/message", {
      method: "POST",
      body: JSON.stringify({
        conversationId: "cm5g45d7p0001irom5vnhi8pe",
        messages: [
          {
            role: "user",
            content: "hi",
          },
          {
            role: "assistant",
            content: "Can i help you!",
          },
        ],
      }),
    });

    console.log(await response.json());
  });
});
