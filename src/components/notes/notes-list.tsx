"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useNotesContext } from "@/contexts/note-context";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function NotesList() {
  const t = useTranslations("notes");

  const { notes, selectedNote, handleSelectNote } = useNotesContext();
  return (
    <>
      {/* 笔记列表 */}
      <div className="w-[180px] flex-shrink-0 border-r flex flex-col bg-muted/5">
        <div className="p-4 border-b bg-background">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Button
            variant={!selectedNote ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-2",
              !selectedNote && "bg-accent",
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
                selectedNote?.id === note.id && "bg-accent",
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
    </>
  );
}
