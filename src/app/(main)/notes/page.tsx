"use client";

import { useTranslations } from "next-intl";
import { NoteProvider } from "@/contexts/note-context";
import { useNotesContextState } from "./hook";
import { NotesList } from "@/components/notes";
import { NoteEditorContrainer } from "@/components/notes";
import Link from "next/link";

export default function NotesPage() {
  const t = useTranslations("notes");
  const value = useNotesContextState();

  return (
    <NoteProvider value={value}>
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
        {/* <NotesList /> */}
        <Link href={"/notes/1"}>test</Link>
        <NoteEditorContrainer />
      </div>
    </NoteProvider>
  );
}
