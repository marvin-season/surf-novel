import { Code2, Redo2, Save, Undo2 } from "lucide-react";
import { Editor } from "@tiptap/react";

export default function CommandPanel({
  editor,
  onSave,
}: {
  editor: Editor;
  onSave: () => void;
}) {
  return (
    <>
      <div className="flex p-2 gap-2 justify-end">
        <div
          className="cursor-pointer rounded-sm bg-slate-50 p-1"
          onClick={onSave}
        >
          <Save size={12} />
        </div>
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
        <div
          className="cursor-pointer rounded-sm bg-red-500 p-1 text-white"
          onClick={() => {
            const { from, to } = editor.state.selection;
            const text = editor.state.doc.textBetween(from, to, " ");
            editor.chain().focus().setBadge("red", text).run();
          }}
        >
          badge
        </div>
        <div
          className="cursor-pointer rounded-sm bg-green-500 p-1 text-white"
          onClick={() => {
            editor.chain().focus().toggleHighlight({ color: "#007700" }).run();
          }}
        >
          highlight
        </div>
      </div>
    </>
  );
}
