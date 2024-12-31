import { EditorProvider } from "@tiptap/react";
import type { EditorProviderProps } from "@tiptap/react";
import "./styles.css";
import useExtentions from "./hooks/useExtentions";

export default function RichEditorProvider({
  extensions = [],
  children,
  content,
  editable,
  editorProps,
  ...props
}: EditorProviderProps) {
  const defaultExtentions = useExtentions();
  return (
    <>
      <EditorProvider
        editable={editable}
        editorProps={{
          ...editorProps,
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        content={content}
        extensions={[...defaultExtentions, ...extensions]}
        {...props}
      >
        {children}
      </EditorProvider>
    </>
  );
}
