"use client";

import { NotesList } from "@/components/notes";
import { Input } from "@/components/ui/input";
import { useNotesContext } from "@/contexts/note-context";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
export default function NotesPage() {
  const t = useTranslations("notes");
  const { handleSelectNote } = useNotesContext();
  return (
    <div className="flex-1">
      <div className="p-6 flex flex-col items-center bg-gray-50 h-full">
        {/* 顶部信息 */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold">Notes Manager</h1>
          <p className="text-sm text-gray-500">Manage your ideas efficiently</p>
        </div>

        <div className="flex gap-4 w-[80%] mt-8 mb-12">
          <Input className="shadow p-6" />
          {/* 新建笔记按钮 */}
          <button
            onClick={() => handleSelectNote()}
            className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            <Plus className="inline-block w-4 h-4 mr-2" />
            {t("newNote")}
          </button>
        </div>
        <NotesList />
      </div>
    </div>
  );
}
