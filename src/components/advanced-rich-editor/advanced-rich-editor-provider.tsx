import { useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import Operator from "../rich-editor/operator/operator";
import { Separator } from "@/components/ui/separator";

import { ColorSelector } from "./selector/color-selector";
import useAdvancedExtentions from "./hooks/useExtentions";

export default function AdvancedRichEditorProvider({
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
      <RichEditorProvider
        content={content}
        className={className}
        extensions={extentions}
      >
        <Operator />
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </GenerativeBubbleMenu>
      </RichEditorProvider>
    </>
  );
}
