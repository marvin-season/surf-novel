import { useNotesContext } from "@/contexts/note-context";
import { AdvancedRichEditorProvider } from "../advanced-rich-editor";
import Operator from "../rich-editor/operator/operator";
import { toast } from "sonner";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

export default function NoteEditor() {
  const { selectedNote, handleUpdateOrCreate, handleDelete } =
    useNotesContext();
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  useEffect(() => {
    editor.commands.setContent(selectedNote?.content || "");
  }, [selectedNote]);

  return (
    <div>
      <Operator
        onSave={() => {
          handleUpdateOrCreate(editor.getJSON());
        }}
        onDelete={() => {
          if (selectedNote?.id) {
            handleDelete(selectedNote.id);
            return;
          }
          toast.error("笔记不存在");
        }}
      />
      <Separator className="my-4" />
    </div>
  );
}
