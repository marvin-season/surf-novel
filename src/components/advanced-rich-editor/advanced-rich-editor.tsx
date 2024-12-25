import { useState } from "react";
import { RichEditor } from "../rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import Operator from "../rich-editor/operator/operator";
import AiWriter from "./extentions/ai-writer/ai-writer";
import { Separator } from "@/components/ui/separator";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ColorSelector } from "./selector/color-selector";
import { AIHighlight } from "./extentions/highlight/ai-highlight";
import Highlight from "@tiptap/extension-highlight";
export default function AdvancedRichEditor({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  return (
    <>
      <RichEditor
        content={content}
        className={className}
        extensions={[
          AiWriter.configure({}),
          TextStyle,
          Color,
          AIHighlight,
          Highlight.configure({ multicolor: true }),
        ]}
      >
        <Operator />
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </GenerativeBubbleMenu>
      </RichEditor>
    </>
  );
}
