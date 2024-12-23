import { useMemo } from "react";
import TipTapEditor from "./tiptap-editor";
import { Slice } from "lucide-react";

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
  const collaborationEnabled = useMemo(() => {
    if (!selectedNote) {
      return false;
    }
    // or public
    if (selectedNote.author.id) {
      return false;
    }
    return true;
  }, [selectedNote]);
  console.log("collaborationEnabled", collaborationEnabled);
  return (
    <div className="flex-1 p-4">
      <TipTapEditor
        collaborationEnabled={collaborationEnabled}
        onSave={onSave}
        value={value}
      />
    </div>
  );
}
