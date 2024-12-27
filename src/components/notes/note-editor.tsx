import { useNotesContext } from '@/contexts/note-context';
import { AdvancedRichEditorProvider } from '../advanced-rich-editor';
import Operator from '../rich-editor/operator/operator';
import { toast } from 'sonner';
import { useCurrentEditor } from '@tiptap/react';
import { useEffect } from 'react';

export default function NoteEditor() {
  const { selectedNote, handleUpdateOrCreate, handleDelete } =
    useNotesContext();
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  useEffect(() => {
    editor.commands.setContent(selectedNote?.content || '');
  }, [selectedNote]);

  return (
    <>
      <Operator
        onSave={() => {
          handleUpdateOrCreate(editor.getJSON());
        }}
        onDelete={() => {
          if (selectedNote?.id) {
            handleDelete(selectedNote.id);
            return;
          }
          toast.error('笔记不存在');
        }}
      />
    </>
  );
}
