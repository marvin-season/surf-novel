import TipTapEditor from "./tiptap-editor";

export default function TiptapEditorContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <TipTapEditor />
    </div>
  );
}
