import { useCurrentEditor } from "@tiptap/react";
import { Check, TextQuote } from "lucide-react";

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          className="text-sm text-blue-500 cursor-pointer gap-2 px-4"
          onClick={() => {
            const selection = editor.view.state.selection;

            editor
              .chain()
              .focus()
              .insertContentAt(
                {
                  from: selection.from,
                  to: selection.to,
                },
                completion
              )
              .run();
          }}
        >
          <Check className="h-4 w-4 text-muted-foreground" />
          Replace selection
        </div>
        <div
          className="text-sm text-blue-500 cursor-pointer gap-2 px-4"
          onClick={() => {
            const selection = editor.view.state.selection;
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run();
          }}
        >
          <TextQuote className="h-4 w-4 text-muted-foreground" />
          Insert below
        </div>
      </div>
    </>
  );
};

export default AICompletionCommands;
