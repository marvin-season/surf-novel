"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Command from "./command";
import Mention from "@tiptap/extension-mention";
import suggestion from "./suggestion";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BubbleMenuList from "./BubbleMenuList";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Highlight,
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
    ],
    onUpdate: ({ editor }) => {
      console.log(editor.storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    content: `<p>
          That's a boring paragraph followed by a fenced code block:
        </p>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>`,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Command editor={editor} />
      <BubbleMenuList editor={editor} />
      <EditorContent
        editor={editor}
        className="w-full h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:overflow-y-auto"
      />
    </>
  );
};

export default TipTapEditor;
