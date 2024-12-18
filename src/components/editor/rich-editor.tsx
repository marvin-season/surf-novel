import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Element as SlateElement,
  Editor,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { cn } from "@/lib/utils";
import { EditorContextMenu } from "./editor-context-menu";
import { EditorToolbar } from "./editor-toolbar";
import { isKeyHotkey } from "is-hotkey";
import { CommandPalette } from "./command-palette";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Note } from "@/types/notes";

// 定义快捷键常量
const FORMATTING_HOTKEYS = {
  bold: "mod+b",
  italic: "mod+i",
  underline: "mod+u",
} as const;

// 定义编辑器初始值
export const INITIAL_EDITOR_VALUE: Descendant[] = [
  {
    // @ts-ignore
    type: "paragraph",
    children: [{ text: "" }],
  },
];

// 定义类型
interface RichEditorProps {
  className?: string;
  selectedNote: Note | null;
  onSave: (value: Descendant[], title?: string) => void;
  onDelete: (id: string) => void;
}

interface ElementProps {
  attributes: any;
  children: React.ReactNode;
  element: any;
}

interface LeafProps {
  attributes: any;
  children: React.ReactNode;
  leaf: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

// 格式化处理函数
const toggleFormat = (
  editor: Editor,
  format: keyof typeof FORMATTING_HOTKEYS
) => {
  const marks: any = Editor.marks(editor) || {};
  editor.addMark(format, !marks[format]);
};

export function RichEditor({
  className,
  selectedNote,
  onSave,
  onDelete,
}: RichEditorProps) {
  console.log("selectedNote", selectedNote);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [title, setTitle] = useState<string>();
  const [value, setValue] = useState<Descendant[]>(INITIAL_EDITOR_VALUE);

  useEffect(() => {
    setTitle(selectedNote?.title);
    setValue(
      selectedNote?.content
        ? JSON.parse(selectedNote.content)
        : INITIAL_EDITOR_VALUE
    );
  }, [selectedNote]);
  const renderElement = useCallback(
    ({ attributes, children, element }: ElementProps) => {
      const style = { textAlign: element.align };

      switch (element.type) {
        case "block-quote":
          return (
            <blockquote
              style={style}
              className="border-l-4 border-border pl-4 italic"
              {...attributes}
            >
              {children}
            </blockquote>
          );
        case "bulleted-list":
          return (
            <ul style={style} className="list-disc pl-4" {...attributes}>
              {children}
            </ul>
          );
        case "numbered-list":
          return (
            <ol style={style} className="list-decimal pl-4" {...attributes}>
              {children}
            </ol>
          );
        case "list-item":
          return (
            <li style={style} {...attributes}>
              {children}
            </li>
          );
        case "h1":
          return (
            <h1
              style={style}
              className="text-4xl font-bold my-4"
              {...attributes}
            >
              {children}
            </h1>
          );
        case "h2":
          return (
            <h2
              style={style}
              className="text-3xl font-bold my-3"
              {...attributes}
            >
              {children}
            </h2>
          );
        case "h3":
          return (
            <h3
              style={style}
              className="text-2xl font-bold my-2"
              {...attributes}
            >
              {children}
            </h3>
          );
        default:
          return (
            <p style={style} className="my-1" {...attributes}>
              {children}
            </p>
          );
      }
    },
    []
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: LeafProps) => {
      return (
        <span
          {...attributes}
          style={{
            fontWeight: leaf.bold ? "bold" : "normal",
            fontStyle: leaf.italic ? "italic" : "normal",
            textDecoration: leaf.underline ? "underline" : "none",
          }}
        >
          {children}
        </span>
      );
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { nativeEvent } = event;

      // 处理命令面板快捷键
      if (event.key === "/") {
        event.preventDefault();
        setShowCommandPalette(true);
        return;
      }

      // 处理格式化快捷键
      for (const [format, hotkey] of Object.entries(FORMATTING_HOTKEYS)) {
        if (isKeyHotkey(hotkey, nativeEvent)) {
          event.preventDefault();
          toggleFormat(editor, format as keyof typeof FORMATTING_HOTKEYS);
          return;
        }
      }
    },
    [editor]
  );

  if (!selectedNote) {
    return null;
  }

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <div className="flex border px-8 py-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full text-xl font-medium bg-transparent border-none outline-none placeholder:text-muted-foreground/60"
        />
        <Button onClick={() => onSave(editor.children, title)}>保存</Button>
        <Button variant={"secondary"} onClick={() => onDelete(selectedNote.id)}>
          删除
        </Button>
      </div>
      <Slate
        key={JSON.stringify(selectedNote?.id)}
        editor={editor}
        initialValue={value}
      >
        <div className="relative flex-1 flex flex-col w-full rounded-md border border-input bg-background">
          {/* 工具栏控制按钮 */}
          <div className="">
            <button
              type="button"
              onClick={() => setShowToolbar(!showToolbar)}
              className="p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              {showToolbar ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>

          {/* 工具栏 */}
          {showToolbar && (
            <EditorToolbar
              editor={editor}
              className="sticky top-0 z-40 bg-background px-3 py-2 border-b border-input"
            />
          )}

          {/* 编辑区 */}
          <div className="flex-1 px-3 py-2 overflow-auto">
            <EditorContextMenu editor={editor}>
              <Editable
                className="h-full w-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none"
                renderElement={renderElement}
                // @ts-ignore
                renderLeaf={renderLeaf}
                placeholder="开始写作..."
                onKeyDown={handleKeyDown}
              />
            </EditorContextMenu>
          </div>
        </div>
      </Slate>
      <CommandPalette
        editor={editor}
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
      />
    </div>
  );
}
