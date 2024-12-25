import { useState } from "react";
import { RichEditor } from "../rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";

export default function AdvancedRichEditor({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RichEditor className={className}>
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen} />
      </RichEditor>
    </>
  );
}
