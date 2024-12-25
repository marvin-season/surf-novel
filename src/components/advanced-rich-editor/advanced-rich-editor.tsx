import { useState } from "react";
import { RichEditor } from "../rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import Operator from "../rich-editor/operator/operator";
import { Separator } from "@/components/ui/separator";

import { ColorSelector } from "./selector/color-selector";
import useAdvancedExtentions from "./hooks/useExtentions";

export default function AdvancedRichEditor({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const extentions = useAdvancedExtentions();
  return (
    <>
      <RichEditor
        content={content}
        className={className}
        extensions={extentions}
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
