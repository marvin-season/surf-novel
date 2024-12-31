import { AdvancedRichEditorProvider } from "../advanced-rich-editor";
import NoteEditor from "./note-editor";

export default function NoteEditorContrainer({}: {}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <AdvancedRichEditorProvider
          slotBefore={<NoteEditor />}
        ></AdvancedRichEditorProvider>
      </div>
    </>
  );
}
