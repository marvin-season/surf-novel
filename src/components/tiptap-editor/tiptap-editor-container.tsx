import { useMemo } from "react";
import TipTapEditor from "./tiptap-editor";
import { toast } from "sonner";

export default function TiptapEditorContainer({
  children,
  onSave,
  onDelete,
  selectedNote,
}: {
  children?: React.ReactNode;
  onSave: (value: any) => void;
  onDelete: (id: string) => void;
  selectedNote: any;
}) {
  const value = useMemo(() => selectedNote?.content, [selectedNote]);
  const collaborationEnabled = useMemo(() => {
    if (!selectedNote) {
      return false;
    }
    // or public
    if (selectedNote.author) {
      return false;
    }
    return true;
  }, [selectedNote]);

  return (
    <div className="flex-1 p-4">
      <TipTapEditor
        collaborationEnabled={collaborationEnabled}
        onSave={onSave}
        onDelete={() => {
          if (selectedNote?.id) {
            onDelete(selectedNote.id);
            return;
          }
          toast.error("笔记不存在");
        }}
        value={value}
      />
    </div>
  );
}
