import {
  ArrowDownWideNarrow,
  CheckCheck,
  Languages,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react";

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { getPrevText } from "@/utils";
import { useCurrentEditor } from "@tiptap/react";

const options = [
  {
    value: "improve",
    label: "Improve writing",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, command: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return;
  }
  return (
    <>
      <CommandGroup heading="Edit or review selection">
        <CommandList>
          {options.map((option) => (
            <CommandItem
              onSelect={(value) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(
                  slice.content,
                );
                onSelect(text, value);
              }}
              className="flex gap-2 px-4"
              key={option.value}
              value={option.value}
            >
              <option.icon className="h-4 w-4 text-purple-500" />
              {option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandList>
          {/* continue */}
          <CommandItem
            onSelect={() => {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, "continue");
            }}
            value="continue"
            className="gap-2 px-4"
          >
            <StepForward className="h-4 w-4 text-purple-500" />
            Continue
          </CommandItem>
          {/* translate */}
          <CommandItem
            onSelect={() => {
              const slice = editor.state.selection.content();
              // get plain text
              const text = slice.content.textBetween(0, slice.size + 1);
              onSelect(text, "translate");
            }}
            value="translate"
            className="gap-2 px-4"
          >
            <Languages className="h-4 w-4 text-purple-500" />
            Translate
          </CommandItem>
        </CommandList>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
