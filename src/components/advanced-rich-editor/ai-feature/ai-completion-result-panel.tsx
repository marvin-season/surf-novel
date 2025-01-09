import { RichEditorProvider } from "@/components/rich-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function AiCompleteResultPanel({
  content,
}: {
  content: string;
}) {
  return (
    <div className={"p-4 max-h-72 overflow-scroll"}>
      <RichContent content={content} />
    </div>
  );
}
export const RichContent = ({ content }: { content: string }) => {
  return (
    <RichEditorProvider editable={false}>
      <RichEditor content={content} />
    </RichEditorProvider>
  );
};
const RichEditor = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor]);
  return <></>;
};
