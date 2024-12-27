'use client';

import { useTranslations } from 'next-intl';
import { NoteProvider } from '@/contexts/note-context';
import { useNotesContextState } from './hook';
import { NotesList } from '@/components/notes';

export default function NotesPage() {
  const t = useTranslations('notes');
  const value = useNotesContextState();

  return (
    <NoteProvider value={value}>
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
        <NotesList />

        {/* 编辑区 */}
        {/* <TiptapEditorContainer
          onSave={handleUpdateOrCreate}
          onDelete={handleDelete}
          selectedNote={selectedNote}
        /> */}
        {/* <NoteEditorContainer
        selectedNote={selectedNote}
        onSave={handleUpdateOrCreate}
        // onDelete={handleDelete}
      /> */}
      </div>
    </NoteProvider>
  );
}
