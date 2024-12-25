import type { AnyExtension } from "@tiptap/core";
import { EditorProvider } from "@tiptap/react";
import "./styles.css";
import useExtentions from "./hooks/useExtentions";

export default function RichEditor({
  extensions = [],
  className,
  children,
  content,
}: {
  extensions?: AnyExtension[];
  className?: string;
  children?: React.ReactNode;
  content?: string;
}) {
  const defaultExtentions = useExtentions();
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
