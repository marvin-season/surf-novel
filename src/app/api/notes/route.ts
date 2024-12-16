import { NotesResponse } from "@/types/notes";

export const GET = () => {
  const notes = [
    {
      id: "1",
      title: "笔记 1",
      content: [
        {
          type: "paragraph",
          children: [{ text: "笔记 1" }],
        },
      ],
      updatedAt: "2023-08-01",
    },
    {
      id: "2",
      title: "笔记 2",
      content: [
        {
          type: "paragraph",
          children: [{ text: "笔记 2" }],
        },
      ],
      updatedAt: "2023-08-02",
    },
  ];
  return new Response(JSON.stringify({ notes } as NotesResponse), {
    headers: { "Content-Type": "application/json" },
  });
};
