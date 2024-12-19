"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Command from "./command";
import Mention from "@tiptap/extension-mention";
import suggestion from "./suggestion";

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
    content: "",
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Command editor={editor} />
      <EditorContent
        editor={editor}
        className="w-full h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:overflow-y-auto"
      />
    </>
  );
};

export default TipTapEditor;
