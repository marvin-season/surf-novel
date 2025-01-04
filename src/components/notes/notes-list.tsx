"use client";

import { useTranslations } from "next-intl";
import { TimerIcon, User } from "lucide-react";
import Empty from "./empty";
import { useCallback, useEffect, useState } from "react";
import { Note } from "@/types/notes";
import { getNote, getNotes } from "@/app/(main)/notes/actions";
import { useRouter } from "next/navigation";

export default function NotesList() {
  const t = useTranslations("notes");

  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const data = await getNotes();
      data?.length > 0 && setNotes(data);
    })();
  }, []);
  const handleSelectNote = useCallback(async (id?: string) => {
    router.push(`/notes/${id}`);
  }, []);
  return (
    <>
      {notes.length === 0 && <Empty />}

      {/* 笔记列表 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition border cursor-pointer"
            onClick={() => handleSelectNote(note.id)}
          >
            <div className="flex justify-between">
              <h3 className="font-medium text-sm truncate">
                {note.title || t("noTitle")}
              </h3>
              <div className="flex gap-1">
                <span className="text-[10px] text-white bg-blue-400 rounded-[4px] p-1">
                  {"朝花夕拾"}
                </span>
                <span className="text-[10px] text-white bg-green-400 rounded-[4px] p-1">
                  {"刻舟求剑"}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4 flex gap-4">
              <div className="flex gap-2 items-center">
                <TimerIcon size={12} />{" "}
                {new Date(note.updatedAt).toLocaleString()}
              </div>
              <div className="flex gap-2 items-center">
                <User size={12} />{" "}
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
