import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: (await params).id },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!note) {
      return new Response(JSON.stringify({ error: "Note not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    note.content = JSON.parse(note.content || "[]");

    return new Response(JSON.stringify(note), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { title, content, tags, isFavorite } = body;

    const note = await prisma.note.update({
      where: { id: (await params).id },
      data: {
        title,
        content: JSON.stringify(content),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(note), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.note.delete({
      where: { id: (await params).id },
    });

    return new Response(
      JSON.stringify({ message: "Note deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}