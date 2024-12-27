import { AdvancedRichEditorProvider } from "../advanced-rich-editor";

export default function NoteEditorProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-1 flex-col-reverse overflow-y-auto p-6">
        <AdvancedRichEditorProvider>{children}</AdvancedRichEditorProvider>
      </div>
    </>
  );
}
