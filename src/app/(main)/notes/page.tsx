"use client";

import { useTranslations } from "next-intl";
import { NoteProvider } from "@/contexts/note-context";
import { useNotesContextState } from "./hook";
import { NoteEditor, NotesList } from "@/components/notes";
import { NoteEditorProvider } from "@/components/notes";

export default function NotesPage() {
  const t = useTranslations("notes");
  const value = useNotesContextState();

  return (
    <NoteProvider value={value}>
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
        <NotesList />
        <NoteEditorProvider>
          <NoteEditor />
        </NoteEditorProvider>
      </div>
    </NoteProvider>
  );
}
