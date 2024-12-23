"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Operator from "./operator";
import BubbleMenuList from "./extension/mention/BubbleMenuList";
import "./styles.css";
import { useEffect } from "react";

import { useExtensions } from "./extension";

const TipTapEditor = ({
  onSave,
  value,
  collaborationEnabled,
}: {
  onSave: (value: any) => void;
  value: any;
  collaborationEnabled: boolean;
}) => {
  const extensions = useExtensions({collaborationEnabled});
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log(json);
      // console.log(editor.storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value);
    }

    return () => {
      if (editor) {
        editor.commands.setContent("");
        editor.destroy();
      }
    };
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <>
      {/* 顶部操作栏 */}
      <Operator
        editor={editor}
        onSave={() => {
          onSave(editor.getJSON());
        }}
      />
      {/* 内联选中气泡 */}
      <BubbleMenuList editor={editor} />
      {/* 编辑器 */}
      <EditorContent
        editor={editor}
        className="w-full h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:overflow-y-auto"
      />
    </>
  );
};

export default TipTapEditor;
