import {
  Badge,
  Code2,
  Highlighter,
  MessageCircleWarning,
  Redo2,
  Save,
  Trash2,
  Undo2,
  Download,
  Upload,
  ActivityIcon,
} from "lucide-react";
import { Editor, useCurrentEditor } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function handleExport(editor: Editor) {
  // const json = editor.getJSON();
  const md = editor.storage.markdown.getMarkdown();
  // const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
  const blob = new Blob([md], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "editor-content.md";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Exported successfully!");
}

async function handleImport(
  editor: Editor,
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file = event.target.files?.[0];
  if (file) {
    if (!file.name.endsWith(".md")) {
      toast.error("Invalid file format.");
      return;
    }
    const text = await file.text();
    // const json = JSON.parse(text);
    editor.commands.setContent(text);
    toast.success("Imported successfully!");
  } else {
    toast.error("No file selected.");
  }
}

export default function Operator({
  onSave,
  onDelete,
}: {
  onSave?: () => void;
  onDelete?: () => void;
}) {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="flex p-2 gap-2 justify-end">
        <div
          className="cursor-pointer rounded-sm bg-slate-50 p-1"
          onClick={onDelete}
        >
          <Trash2 size={12} />
        </div>
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
              toast.warning("选区中没有文本", {
                duration: 1000,
                icon: <MessageCircleWarning />,
              });
              return;
            }
            editor
              .chain()
              .focus()
              .setBadge({
                color: "#ff0000",
                text,
              })
              .run();
          }}
        >
          <Badge size={12} />
        </div>

        <div
          className="cursor-pointer rounded-sm bg-slate-100 p-1 text-white"
          onClick={() => {
            const selection = editor.state.selection as NodeSelection;
            if (selection.node?.type.name === "badge") {
              editor
                .chain()
                .focus()
                .unsetBadge({ text: selection.node.attrs.text })
                .run();
            }
          }}
        >
          <Badge size={12} stroke="#ff0000" />
        </div>
        <div
          className="cursor-pointer rounded-sm bg-green-500 p-1 text-white"
          onClick={() => {
            editor.chain().focus().toggleHighlight().run();
          }}
        >
          <Highlighter size={12} />
        </div>
        <div
          className="cursor-pointer rounded-sm bg-blue-500 p-1 text-white"
          onClick={() => handleExport(editor)}
        >
          <Download size={12} />
        </div>

        <input
          type="file"
          accept=".md,.txt"
          style={{ display: "none" }}
          id="import-md"
          onChange={(event) => handleImport(editor, event)}
        />
        <label
          htmlFor="import-md"
          className="cursor-pointer rounded-sm bg-yellow-500 p-1 text-white"
        >
          <Upload size={12} />
        </label>
      </div>
    </>
  );
}
