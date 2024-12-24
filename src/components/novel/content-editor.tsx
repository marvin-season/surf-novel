import { EditorProvider } from "@tiptap/react";
import { DefaultExtentions } from "./extentions";

export default function ContentEditor() {
  return (
    <EditorProvider content={""} extensions={[...DefaultExtentions]}>
      <div>edit content</div>
    </EditorProvider>
  );
}
