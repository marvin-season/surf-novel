import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { DefaultExtentions } from "./extentions";
import EditorBubble from "./editor-bubble";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { Magic } from "../ui/icon";
import { AISelector } from "./ai-selector";

export default function ContentEditor({}) {
  const [open, setOpen] = useState();
  return (
    <>
      <EditorProvider content={""} extensions={[...DefaultExtentions]}>
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen} />
      </EditorProvider>
    </>
  );
}

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
