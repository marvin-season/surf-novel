import { prisma } from "@/lib/prisma";
import { NotesResponse } from "@/types/notes";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        tags: true,
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
    const { title, content, tags, isFavorite } = body;
    console.log({
      title,
      content,
      tags,
      isFavorite,
    })
    const note = await prisma.note.create({
      data: {
        title,
        content: JSON.stringify(content),
        author: {
          connect: {
            email: "2764876579@qq.com",
          },
        }
      },
    });

    return new Response(JSON.stringify(note), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
