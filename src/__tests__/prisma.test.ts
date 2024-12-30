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
});
