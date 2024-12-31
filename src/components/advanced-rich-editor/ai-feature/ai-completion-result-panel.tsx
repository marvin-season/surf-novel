import { RichEditorProvider } from "@/components/rich-editor";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function AiCompleteResultPanel({
  content,
}: {
  content: string;
}) {
  return (
    <div className={"text-[12px] p-4 max-h-[400px]"}>
      <RichEditorProvider editable={false}>
        <RichEditor content={content} />
      </RichEditorProvider>
    </div>
  );
}

const RichEditor = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor]);
  return <></>;
};
