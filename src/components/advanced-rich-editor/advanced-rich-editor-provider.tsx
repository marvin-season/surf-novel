import { useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import { Separator } from "@/components/ui/separator";

import { ColorSelector } from "./selector/color-selector";
import { NodeSelector } from "./selector/node-selector";
import useAdvancedExtentions from "./hooks/useExtentions";
import GenerativeFloatingMenu from "./ai-feature/generative-floating-menu";

import "./style.css";
import type { EditorProviderProps } from "@tiptap/react";

export default function AdvancedRichEditorProvider({
  content,
  children,
  ...props
}: EditorProviderProps) {
  const [open, setOpen] = useState(false);
  const extentions = useAdvancedExtentions();
  return (
    <>
      <RichEditorProvider content={content} extensions={extentions} {...props}>
        {children}
        <GenerativeFloatingMenu></GenerativeFloatingMenu>
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator className="h-auto" orientation="vertical" />
          <NodeSelector />
          <Separator className="h-auto" orientation="vertical" />
          <ColorSelector />
        </GenerativeBubbleMenu>
      </RichEditorProvider>
    </>
  );
}
