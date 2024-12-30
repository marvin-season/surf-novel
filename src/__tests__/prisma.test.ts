import { prisma } from "@/lib/prisma";

describe("Prisma Client Unit Tests", () => {
  it("find user config ", async () => {
    const userConfig = await prisma.userConfig.findUnique({
      where: {
        userId: "cm5am15yh0000irq2yxyv31kj",
      },
    });
    console.log(userConfig);
  });

  it("create user config", async () => {
    const userConfig = await prisma.userConfig.create({
      data: {
        userId: "cm5am15yh0000irq2yxyv31kj",
        settings: JSON.stringify({
          modelProviderId: "ollama",
          modelUrl: "http://localhost:11434",
          modelId: "llama3.1",
        }),
      },
    });
  });
});
