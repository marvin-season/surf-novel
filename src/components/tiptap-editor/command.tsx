import { Code2, Redo2, Undo2 } from "lucide-react";
import { Editor } from "@tiptap/react";

export default function Command({ editor }: { editor: Editor }) {
  return (
    <>
      <div className="flex p-2 gap-2 justify-end">
        <div
          className="cursor-pointer rounded-sm bg-slate-50 p-1 "
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={12} />
        </div>
        <div
          className="cursor-pointer rounded-sm bg-slate-50 p-1 "
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={12} />
        </div>
        <div
          className="cursor-pointer rounded-sm bg-slate-50 p-1 "
          onClick={() => editor.chain().focus().setCodeBlock().run()}
        >
          <Code2 size={12} />
        </div>
      </div>
    </>
  );
}
