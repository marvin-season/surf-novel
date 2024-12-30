import { NextRequest, NextResponse } from "next/server";
import { getModels } from "./utils";
import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";

export async function GET(request: NextRequest) {
  const user = await getLoggedUserInfo();
  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: user.id,
    },
  });

  const { provider, modelUrl } = JSON.parse(userConfig?.settings || "{}");

  return NextResponse.json(await getModels(provider, modelUrl));
}
