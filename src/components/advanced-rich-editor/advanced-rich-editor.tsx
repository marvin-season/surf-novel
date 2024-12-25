import { useState } from "react";
import { RichEditor } from "../rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import Operator from "../rich-editor/operator/operator";
import AiWriter from "./extentions/ai-writer/ai-writer";

export default function AdvancedRichEditor({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RichEditor
        content={content}
        className={className}
        extensions={[AiWriter.configure({})]}
      >
        <Operator />
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen} />
      </RichEditor>
    </>
  );
}
