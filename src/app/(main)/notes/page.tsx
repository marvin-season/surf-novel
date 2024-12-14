"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { RichEditor } from "@/components/editor/rich-editor"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  title: string
  content: string
  updatedAt: string
}

export default function NotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>("new")
  const [notes, setNotes] = useState<Note[]>([])

  return (
    <div className="flex h-full">
      {/* 笔记列表 */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">我的笔记</h2>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <Button
            variant={selectedNoteId === "new" ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-2",
              selectedNoteId === "new" && "bg-accent"
            )}
            onClick={() => setSelectedNoteId("new")}
          >
            <Plus className="h-4 w-4" />
            新建笔记
          </Button>
          {notes.map((note) => (
            <Button
              key={note.id}
              variant={selectedNoteId === note.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left mb-1 h-auto py-3",
                selectedNoteId === note.id && "bg-accent"
              )}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium line-clamp-1">{note.title || "无标题"}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 编辑区 */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <input
            type="text"
            placeholder="笔记标题"
            className="w-full text-xl font-medium bg-transparent border-none outline-none"
          />
        </div>
        <div className="flex-1 overflow-auto">
          <RichEditor />
        </div>
      </div>
    </div>
  )
}
