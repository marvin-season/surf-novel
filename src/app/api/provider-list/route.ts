import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const providerInfo = await prisma.providerInfo.findMany();
  return NextResponse.json(
    providerInfo.map((item) => ({
      ...item,
      dynamic_params: JSON.parse(item.dynamic_params || "{}"),
    })),
  );
}
