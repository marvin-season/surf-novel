import { prisma } from "@/lib/prisma";
import { getStore } from "@/lib/store";
import { NotesResponse } from "@/types/notes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get user from cookies
  // const cookies = request.cookies;
  // console.log("user", JSON.parse(cookies.get("user")?.value || "{}"));
  const user = JSON.parse((await getStore("user")) || "{}");
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    // 筛选 id, updatedAt, title字段
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        updatedAt: true,
        title: true,
        content: false,
      },
      where: {
        author: {
          email: user.email,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return new Response(JSON.stringify(notes), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch notes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title = "", content = [] } = body;

    const note = await prisma.note.create({
      data: {
        title,
        content: JSON.stringify(content),
        author: {
          connect: {
            email: "2764876579@qq.com",
          },
        },
      },
    });

    return new Response(JSON.stringify({ ...note, content }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
