import type { AnyExtension } from "@tiptap/core";
import { EditorProvider } from "@tiptap/react";
import "./styles.css";
import useExtentions from "./hooks/useExtentions";


export default function RichEditorProvider({
  extensions = [],
  className,
  children,
  content,
                                               editable
}: {
  extensions?: AnyExtension[];
  className?: string;
  children?: React.ReactNode;
  content?: string;
  editable?: (this: any, state: any) => boolean
}) {
  const defaultExtentions = useExtentions();
  return (
    <>
      <EditorProvider
        editorProps={{
          editable,
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
