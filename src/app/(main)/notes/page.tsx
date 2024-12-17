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
import api from "@/lib/api";
import { Note, NotesResponse } from "@/types/notes";
import { useTranslations } from "next-intl";

const NewNote = "new";

export default function NotesPage() {
  const t = useTranslations("notes");
  const [selectedNoteId, setSelectedNoteId] = useState<string>(NewNote);
  const [notes, setNotes] = useState<Note[]>([]);

  const value = useMemo(() => {
    if (selectedNoteId === NewNote) {
      return INITIAL_EDITOR_VALUE as Descendant[];
    }

    const slateContent = JSON.parse(
      notes.find((note) => note.id === selectedNoteId)?.content || "[]"
    );
    return slateContent.length > 0
      ? slateContent
      : (INITIAL_EDITOR_VALUE as Descendant[]);
  }, [selectedNoteId, notes]);

  const handleUpdateOrCreate = useCallback(
    async (content: Descendant[]) => {
      if (selectedNoteId === NewNote) {
        const note = await api.notes.create<Note>({
          title: "",
          content,
        });
        setSelectedNoteId(note.id);
      } else {
        await api.notes.update(selectedNoteId, {
          content,
        });
      }
    },
    [selectedNoteId]
  );

  useEffect(() => {
    (async () => {
      const data = await api.notes.list<NotesResponse>();
      data?.length > 0 && setNotes(data);
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
            variant={selectedNoteId === NewNote ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-2",
              selectedNoteId === NewNote && "bg-accent"
            )}
            onClick={() => setSelectedNoteId(NewNote)}
          >
            <Plus className="h-4 w-4" />
            {t("newNote")}
          </Button>
          {notes.map((note) => (
            <Button
              key={note.id}
              variant={selectedNoteId === note.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left mb-1 h-auto py-3",
                selectedNoteId === note.id && "bg-accent"
              )}
              onClick={() => setSelectedNoteId(note.id)}
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
        <div className="flex-shrink-0 border-b px-8 py-4">
          <input
            type="text"
            placeholder={t("noteTitle")}
            className="w-full text-xl font-medium bg-transparent border-none outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex-1 relative min-h-0">
          <RichEditor
            className="absolute inset-0"
            value={value}
            onChange={handleUpdateOrCreate}
          />
        </div>
      </div>
    </div>
  );
}
