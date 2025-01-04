"use client";

import { AdvancedRichEditorProvider } from "../advanced-rich-editor";
import NoteEditor from "./note-editor";
import { Note } from "@/types/notes";

export default function NoteEditorContainer({ note }: { note?: Note }) {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <AdvancedRichEditorProvider
          slotBefore={<NoteEditor note={note} />}
        ></AdvancedRichEditorProvider>
      </div>
    </>
  );
}
