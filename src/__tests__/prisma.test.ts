import { prisma } from "@/lib/prisma";

describe("Prisma Client Unit Tests", () => {
  it("find users ", async () => {
    const users = await prisma.user.findMany({
      select: {
        userConfig: true,
      },
    });
    console.log(users);
  });
});
