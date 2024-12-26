import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest } from "next/server";

// 获取 model 配置
export async function GET(request: NextRequest) {
    const user = await getLoggedUserInfo();
    const model = await prisma.userConfig.findUnique({
        where: {
            userId: user.id,
        },
    });
}