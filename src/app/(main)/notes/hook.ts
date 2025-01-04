import { getNotes } from "./actions";

import { useEffect } from "react";

import { Note } from "@/types/notes";
import { useCallback, useState } from "react";
import { getNote } from "./actions";
import { notesApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export const useNotesContextState = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const router = useRouter();

  const [_, forceUpdate] = useState<number>();
  const handleSelectNote = useCallback(async (id?: string) => {
    if (!id) {
      setSelectedNote(null);
      router.push(`/notes/0`);
      return;
    }

    const note = await getNote(id);
    note && setSelectedNote(note);
    router.push(`/notes/${id}`);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await notesApi.delete(id);
    setSelectedNote(null);
    forceUpdate(Date.now());
  }, []);

  const handleUpdateOrCreate = useCallback(
    async (content: any, title = "未命名") => {
      if (!selectedNote) {
        const note = await notesApi.create<Note>({
          title,
          content,
        });
        setSelectedNote(note);
      } else {
        await notesApi.update(selectedNote.id, {
          content,
          title,
        });
      }

      forceUpdate(Date.now());
    },
    [selectedNote],
  );

  useEffect(() => {
    (async () => {
      const data = await getNotes();
      data?.length > 0 && setNotes(data);
    })();
  }, [_]);

  console.log(selectedNote);

  return {
    notes,
    setNotes,
    selectedNote,
    handleSelectNote,
    handleDelete,
    handleUpdateOrCreate,
  };
};
