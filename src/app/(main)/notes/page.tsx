"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  INITIAL_EDITOR_VALUE,
  RichEditor,
} from "@/components/editor/rich-editor";
import { cn } from "@/lib/utils";
import { Descendant } from "slate";
import { notesApi } from "@/lib/api";
import { Note } from "@/types/notes";
import { useTranslations } from "next-intl";
import { getNotes, getNote } from "./actions";

export default function NotesPage() {
  const t = useTranslations("notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [_, forceUpdate] = useState<number>();
  const handleSelectNote = useCallback(async (id?: string) => {
    if (!id) {
      setSelectedNote(null);
      return;
    }
    const note = await getNote(id);
    note && setSelectedNote(note);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await notesApi.delete(id);
    setSelectedNote(null);
  }, []);

  const handleUpdateOrCreate = useCallback(
    async (content: Descendant[], title?: string) => {
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
    []
  );

  useEffect(() => {
    (async () => {
      const data = await getNotes();
      data?.length > 0 && setNotes(data);
    })();
  }, [_]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
      {/* 笔记列表 */}
      <div className="w-60 flex-shrink-0 border-r flex flex-col bg-muted/5">
        <div className="p-4 border-b bg-background">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Button
            variant={!selectedNote ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-2",
              !selectedNote && "bg-accent"
            )}
            onClick={() => handleSelectNote()}
          >
            <Plus className="h-4 w-4" />
            {t("newNote")}
          </Button>
          {notes.map((note) => (
            <Button
              key={note.id}
              variant={selectedNote?.id === note.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left mb-1 h-auto py-3",
                selectedNote?.id === note.id && "bg-accent"
              )}
              onClick={() => handleSelectNote(note.id)}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium line-clamp-1">
                  {note.title || t("noTitle")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 编辑区 */}
      <div className="flex-1 min-w-0 flex flex-col bg-background">
        <div className="flex-1 relative min-h-0">
          <RichEditor
            selectedNote={selectedNote}
            className="absolute inset-0"
            onSave={handleUpdateOrCreate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
