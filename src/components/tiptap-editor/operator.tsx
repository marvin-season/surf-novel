import {
  Badge,
  Circle,
  Code2,
  Heading,
  Highlighter,
  MessageCircleWarning,
  Redo2,
  Save,
  Undo2,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import { toast } from "sonner";

export default function Operator({
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
            if (text === "") {
              toast.warning("选区中没有文本", { duration: 1000, icon: <MessageCircleWarning /> });
              return;
            }
            editor.chain().focus().setBadge({
              color: "#ff0000",
              text,
            }).run();
          }}
        >
          <Badge size={12} />
        </div>

        <div
          className="cursor-pointer rounded-sm bg-slate-100 p-1 text-white"
          onClick={() => {
            const selection = editor.state.selection as NodeSelection;
            if (selection.node?.type.name === "badge") {
              editor.chain().focus().unsetBadge({ text: selection.node.attrs.text }).run();
            }
          }}
        >
          <Badge size={12} stroke="#ff0000"/>
        </div>
        <div
          className="cursor-pointer rounded-sm bg-green-500 p-1 text-white"
          onClick={() => {
            editor.chain().focus().toggleHighlight().run();
          }}
        >
          <Highlighter size={12} />
        </div>

      </div>
    </>
  );
}
