import { useMemo } from "react";
import TipTapEditor from "./tiptap-editor";

export default function TiptapEditorContainer({
  children,
  onSave,
  selectedNote,
}: {
  children?: React.ReactNode;
  onSave: (value: any) => void;
  selectedNote: any;
}) {
  const value = useMemo(() => selectedNote?.content, [selectedNote]);

  return (
    <div className="flex-1 p-4">
      <TipTapEditor onSave={onSave} value={value} />
    </div>
  );
}
