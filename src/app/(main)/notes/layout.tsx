"use client";

import { NoteProvider } from "@/contexts/note-context";
import { useNotesContextState } from "./hook";
export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useNotesContextState();
  return (
    <NoteProvider value={value}>
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
        {children}
      </div>
    </NoteProvider>
  );
}
