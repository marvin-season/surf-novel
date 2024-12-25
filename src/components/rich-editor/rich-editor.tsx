import type { Extension } from "@tiptap/core";
import { EditorProvider } from "@tiptap/react";
import defaultExtentions from "./default-extentions";

export default function RichEditor({
  extensions = [],
  className,
  children,
}: {
  extensions?: Extension[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <EditorProvider
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${className}`,
          },
        }}
        content={"hello world"}
        extensions={[...defaultExtentions, ...extensions]}
      >
        {children}
      </EditorProvider>
    </>
  );
}
