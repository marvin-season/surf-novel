import type { Extension } from "@tiptap/core";
import { EditorProvider } from "@tiptap/react";
import defaultExtentions from "./default-extentions";

export default function RichEditor({
  extensions = [],
  className,
  children,
  content,
}: {
  extensions?: Extension[];
  className?: string;
  children?: React.ReactNode;
  content?: string;
}) {
  return (
    <>
      <EditorProvider
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${className}`,
          },
        }}
        content={content}
        extensions={[...defaultExtentions, ...extensions]}
      >
        {children}
      </EditorProvider>
    </>
  );
}
