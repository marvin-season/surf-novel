import { Note } from "@/types/notes";
import { RichEditor } from "../editor/rich-editor";
import { Descendant } from "slate";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
// 定义编辑器初始值
export const INITIAL_EDITOR_VALUE: Descendant[] = [
  {
    // @ts-ignore
    type: "paragraph",
    children: [{ text: "" }],
  },
];
export default function NoteEditorContainer({
  selectedNote,
  onSave,
}: {
  selectedNote: Note | null;
  onSave: (value: Descendant[], title?: string) => void;
}) {
  const initValue = useMemo(() => {
    return selectedNote?.content
      ? JSON.parse(selectedNote.content)
      : INITIAL_EDITOR_VALUE;
  }, [selectedNote]);

  return (
    <div className="note-editor-container flex-1 p-4">
      <RichEditor
        showToolbar={false}
        initValue={initValue}
        onSave={onSave}
        className="absolute inset-0"
      />
    </div>
  );
}
