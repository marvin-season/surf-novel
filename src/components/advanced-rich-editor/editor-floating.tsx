import { FloatingMenu } from "@tiptap/react";
import { ComponentProps } from "react";

export const EditorFloating = ({
  children,
  tippyOptions,
  className,
  ...props
}: ComponentProps<typeof FloatingMenu>) => {
  return (
    <>
      <FloatingMenu
        className={`overflow-hidden rounded-md shadow-xl p-2 ${className}`}
        tippyOptions={{
          placement: "bottom-start",
          moveTransition: "transform 0.15s ease-out",
          ...tippyOptions,
        }}
        {...props}
      >
        {children}
      </FloatingMenu>
    </>
  );
};
