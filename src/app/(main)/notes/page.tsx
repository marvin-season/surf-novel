import { NotesList, NotesListHeader } from "@/components/notes";
export default function NotesPage() {
  return (
    <div className="flex-1">
      <div className="p-6 flex flex-col items-center bg-gray-50 h-full">
        {/* 顶部信息 */}
        <NotesListHeader />
        {/* 列表信息 */}
        <NotesList />
      </div>
    </div>
  );
}
