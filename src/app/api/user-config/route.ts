import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

// 获取 model 配置
export async function GET(request: NextRequest) {
    const user = await getLoggedUserInfo();

    console.log(user);
    
    const userConfig = await prisma.userConfig.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            llmModelProvider: true,
            llmModel: true,
        }
    })

    return NextResponse.json(userConfig);
}
