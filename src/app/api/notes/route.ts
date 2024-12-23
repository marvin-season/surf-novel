import { prisma } from "@/lib/prisma";
import { getLoggedUserInfo } from "@/lib/user";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getLoggedUserInfo();
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
    return new Response(JSON.stringify({ message: "Failed to fetch notes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getLoggedUserInfo();
    const body = await request.json();
    const { title = "", content = [] } = body;

    const note = await prisma.note.create({
      data: {
        title,
        content: JSON.stringify(content),
        author: {
          connect: {
            email: user.email,
          },
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      }
    });

    return new Response(JSON.stringify({ ...note, content }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
