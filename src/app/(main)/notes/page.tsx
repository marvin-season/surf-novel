"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EditorJSComponent from '@/components/editor/EditorJSComponent';
import { cn } from "@/lib/utils";
import { getNotes, createNote, updateNote, deleteNote } from '@/services/notes';
import { Note } from "@/types/notes";
import { useTranslations } from "next-intl";

export default function NotesPage() {
  const t = useTranslations("notes");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>("new");
  const [notes, setNotes] = useState<Note[]>([]);

  const value = useMemo(() => {
    if (selectedNoteId === "new") {
      return { blocks: [] };
    }
    const note = notes.find((note) => note.id === selectedNoteId);
    return note?.content || { blocks: [] };
  }, [selectedNoteId, notes]);

  const handleUpdate = useCallback(async (content: any) => {
    if (selectedNoteId) {
      const updatedNote = await updateNote(selectedNoteId, { content });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    }
  }, [selectedNoteId]);

  const handleCreate = useCallback(async () => {
    const newNote = await createNote({ title: "New Note", content: { blocks: [] } });
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setSelectedNoteId("new");
  }, []);

  const handleEditorChange = useCallback((data: any) => {
    handleUpdate(data);
  }, [handleUpdate]);

  useEffect(() => {
    (async () => {
      const data = await getNotes();
      setNotes(data);
    })();
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
      {/* 笔记列表 */}
      <div className="w-60 flex-shrink-0 border-r flex flex-col bg-muted/5">
        <div className="p-4 border-b bg-background">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Button
            onClick={handleCreate}
            className="w-full mb-2"
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("newNote")}
          </Button>
          {/* 笔记项 */}
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "p-2 rounded cursor-pointer",
                selectedNoteId === note.id && "bg-accent"
              )}
              onClick={() => setSelectedNoteId(note.id)}
            >
              {note.title}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note.id);
                }}
              >
                删除
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* 编辑器 */}
      <div className="flex-1">
        <EditorJSComponent data={value} onChange={handleEditorChange} />
      </div>
    </div>
  );
}
