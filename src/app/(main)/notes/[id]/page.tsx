"use client";

import { NoteEditorContrainer } from "@/components/notes";
export default function Note({ params }: { params: { id: string } }) {
  console.log("props", params);
  return (
    <>
      <NoteEditorContrainer />
    </>
  );
}
