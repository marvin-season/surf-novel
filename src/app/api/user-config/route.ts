import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

// 获取 model 配置
export async function GET(request: NextRequest) {
  const user = await getLoggedUserInfo();

  const userConfig = await prisma.userConfig.findUnique({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({
    ...userConfig,
    settings: JSON.parse(userConfig?.settings || "{}"),
  });
}

// 保存 model 配置
export async function POST(request: NextRequest) {
  const user = await getLoggedUserInfo();
  const body = await request.json();

  // exist
  const existUserConfig = await prisma.userConfig.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!existUserConfig) {
    // create
    const userConfig = await prisma.userConfig.create({
      data: {
        userId: user.id,
        ...body,
      },
    });
    return NextResponse.json(userConfig);
  }

  const userConfig = await prisma.userConfig.update({
    where: {
      userId: user.id,
    },
    data: body,
  });

  return NextResponse.json(userConfig);
}
