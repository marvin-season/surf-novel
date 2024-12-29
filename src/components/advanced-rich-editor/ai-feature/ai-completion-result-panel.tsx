import { RichEditorProvider } from "@/components/rich-editor";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function AiCompleteResultPanel({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <RichEditorProvider
        editable={() => false}
        className={"text-[12px] p-4 max-h-[400px]"}
      >
        <RichEditor content={content} />
      </RichEditorProvider>
    </>
  );
}

const RichEditor = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor]);
  return <></>;
};
