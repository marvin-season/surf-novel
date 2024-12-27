import { useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import { Separator } from "@/components/ui/separator";

import { ColorSelector } from "./selector/color-selector";
import { NodeSelector } from "./selector/node-selector";
import useAdvancedExtentions from "./hooks/useExtentions";

export default function AdvancedRichEditorProvider({
  content,
  className,
  children,
}: {
  content?: string;
  className?: string;
  children?: React.ReactNode;
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
        {children}
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator className="h-auto" orientation="vertical" />
          <NodeSelector/>
          <Separator className="h-auto" orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </GenerativeBubbleMenu>
      </RichEditorProvider>
    </>
  );
}
