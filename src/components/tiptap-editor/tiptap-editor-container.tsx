import { useMemo } from "react";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import TipTapEditor from "./tiptap-editor";
const appId = "7j9y6m10";
const room = `room.${new Date().getFullYear().toString().slice(-2)}${
  new Date().getMonth() + 1
}${new Date().getDate()}-ok`;

// ydoc and provider for Editor A
const ydoc = new Y.Doc();
const provider = new TiptapCollabProvider({
  appId,
  name: room,
  document: ydoc,
});
export default function TiptapEditorContainer({
  children,
  onSave,
  selectedNote,
}: {
  children?: React.ReactNode;
  onSave: (value: any) => void;
  selectedNote: any;
}) {
  const value = useMemo(() => selectedNote?.content, [selectedNote]);

  return (
    <div className="flex-1 p-4">
      <TipTapEditor ydoc={ydoc} provider={provider} onSave={onSave} value={value} />
    </div>
  );
}
