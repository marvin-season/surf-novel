import { NotesResponse } from "@/types/notes";

export const GET = () => {
  const notes = [
    {
      id: "1",
      title: "笔记 1",
      content: "这是笔记 1 的内容",
      updatedAt: "2023-08-01",
    },
    {
      id: "2",
      title: "笔记 2",
      content: "这是笔记 2 的内容",
      updatedAt: "2023-08-02",
    },
  ];
  return new Response(JSON.stringify({ notes } as NotesResponse), {
    headers: { "Content-Type": "application/json" },
  });
};
