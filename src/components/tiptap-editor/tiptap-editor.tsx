"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Typography, Highlight, Markdown],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    content: "## h2",
  });

  return (
    <EditorContent
      editor={editor}
      className="w-full h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:overflow-y-auto"
    />
  );
};

export default TipTapEditor;