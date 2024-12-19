import TipTapEditor from "./tiptap-editor";

export default function TiptapEditorContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex-1 p-4">
      <TipTapEditor />
    </div>
  );
}
