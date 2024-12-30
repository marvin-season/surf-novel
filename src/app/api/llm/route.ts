import { NextRequest, NextResponse } from "next/server";
import { getModels } from "./utils";

export async function GET(request: NextRequest) {
  // 查询参数
  let modelUrl = request.nextUrl.searchParams.get("modelUrl");
  if (!modelUrl) {
    return NextResponse.json(
      { error: "modelUrl is required" },
      { status: 400 },
    );
  }
  return NextResponse.json(await getModels(modelUrl));
}
