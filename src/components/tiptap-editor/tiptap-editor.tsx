"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    content: "## h2",
  });

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
