"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Operator from "./operator";
import Mention from "@tiptap/extension-mention";
import suggestion from "./extension/mention/suggestion";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BubbleMenuList from "./extension/mention/BubbleMenuList";
import { all, createLowlight } from "lowlight";
import "./styles.css";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { useEffect } from "react";

import Badge from "./extension/Badge";
// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const TipTapEditor = ({
  onSave,
  value,
}: {
  onSave: (value: any) => void;
  value: any;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Markdown,

      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Badge,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Please write something ...",
      }),
    ],
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
