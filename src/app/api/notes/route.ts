import { prisma } from "@/lib/prisma";
import { NotesResponse } from "@/types/notes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const email = "2764876579@qq.com";
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
          email,
        },
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

    return new Response(JSON.stringify({...note, content}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
