import { prisma } from '@/lib/prisma';
import { NotesResponse } from "@/types/notes";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        tags: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return new Response(JSON.stringify({ notes } as NotesResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
