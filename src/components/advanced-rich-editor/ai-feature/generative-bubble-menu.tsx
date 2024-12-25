import { useCurrentEditor } from "@tiptap/react";
import EditorBubble from "../editor-bubble";
import { AISelector } from "./ai-selector";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Magic } from "@/components/ui/icon";

const GenerativeBubbleMenu = ({ children, open, onOpenChange }: any) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeBubbleMenu;