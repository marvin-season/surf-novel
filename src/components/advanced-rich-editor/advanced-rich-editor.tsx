import { useState } from "react";
import { RichEditor } from "../rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";

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
      <RichEditor content={content} className={className}>
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen} />
      </RichEditor>
    </>
  );
}
