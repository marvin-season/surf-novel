import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { useCurrentEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface EditorBubbleItemProps {
  readonly children: ReactNode;
  readonly asChild?: boolean;
  readonly onSelect?: (editor: Editor) => void;
  ref?: React.Ref<HTMLDivElement>;
}

export const EditorBubbleItem = ({
  children,
  asChild,
  onSelect,
  ref,
  ...rest
}: EditorBubbleItemProps &
  Omit<ComponentPropsWithoutRef<"div">, "onSelect">) => {
  const { editor } = useCurrentEditor();
  const Comp = asChild ? Slot : "div";

  if (!editor) return null;

  return (
    <Comp ref={ref} {...rest} onClick={() => onSelect?.(editor)}>
      {children}
    </Comp>
  );
};

EditorBubbleItem.displayName = "EditorBubbleItem";

export default EditorBubbleItem;
