import { NextRequest, NextResponse } from "next/server";

const getModels = async () => {
  const response = await fetch("http://10.3.74.135:11434/api/tags");
  const data = await response.json();
  return data?.models || [];
};
export async function GET(request: NextRequest) {
  const models = await getModels();
  return NextResponse.json(models);
}
