"use client";

import { NotesList } from "@/components/notes";
import { Button } from "@/components/ui/button";
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
          <Input
            className="shadow p-6 placeholder:text-gray-300"
            placeholder="Searching your thinks"
          />
          {/* 新建笔记按钮 */}
          <Button
            onClick={() => handleSelectNote()}
            className="flex-shrink-0 px-4 py-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            <Plus size={20} />
          </Button>
        </div>
        <NotesList />
      </div>
    </div>
  );
}
