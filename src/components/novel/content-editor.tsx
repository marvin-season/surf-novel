import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { DefaultExtentions } from "./extentions";
import EditorBubble from "./editor-bubble";

export default function ContentEditor({}) {
  return (
    <>
      <EditorProvider content={""} extensions={[...DefaultExtentions]}>
        <GenerativeBubbleMenu />
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
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      hi
      {/* {open && <AISelector open={open} onOpenChange={onOpenChange} />} */}
      {/* {!open && (
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
        )} */}
    </EditorBubble>
  );
};
