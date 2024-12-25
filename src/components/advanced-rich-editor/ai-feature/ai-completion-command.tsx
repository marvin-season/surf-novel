import {
  CommandGroup,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useCurrentEditor } from "@tiptap/react";
import { Check, TextQuote, TrashIcon } from "lucide-react";

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
      <CommandGroup>
        <CommandList>
          <CommandItem
            className="gap-2 px-4"
            value="replace"
            onSelect={() => {
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
          </CommandItem>
          <CommandItem
            className="gap-2 px-4"
            value="insert"
            onSelect={() => {
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
          </CommandItem>
        </CommandList>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandList>
          <CommandItem
            onSelect={onDiscard}
            value="thrash"
            className="gap-2 px-4"
          >
            <TrashIcon className="h-4 w-4 text-muted-foreground" />
            Discard
          </CommandItem>
        </CommandList>
      </CommandGroup>
    </>
  );
};

export default AICompletionCommands;
