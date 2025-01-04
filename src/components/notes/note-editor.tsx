"use client";

import Operator from "../rich-editor/operator/operator";
import { toast } from "sonner";
import { useCurrentEditor } from "@tiptap/react";
import { useCallback, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Note } from "@/types/notes";
import { notesApi } from "@/lib/api";

export default function NoteEditor({ note }: { note?: Note }) {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  useEffect(() => {
    editor.commands.setContent(note?.content || "");
  }, []);

  const handleUpdateOrCreate = useCallback(
    async (content: any, title = "未命名") => {
      if (!note) {
        const note = await notesApi.create<Note>({
          title,
          content,
        });
      } else {
        await notesApi.update(note.id, {
          content,
          title,
        });
      }
    },
    [note],
  );

  const handleDelete = useCallback(async (id: string) => {
    await notesApi.delete(id);
  }, []);
  return (
    <div>
      <Operator
        onSave={async () => {
          await handleUpdateOrCreate(editor.getJSON());
        }}
        onDelete={async () => {
          if (note?.id) {
            await handleDelete(note.id);
            return;
          }
          toast.error("笔记不存在");
        }}
      />
      <Separator className="my-4" />
    </div>
  );
}
