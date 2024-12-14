import * as ContextMenu from "@radix-ui/react-context-menu"
import { Editor } from "slate"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorContextMenuProps {
  editor: Editor
  children: React.ReactNode
}

export function EditorContextMenu({ editor, children }: EditorContextMenuProps) {
  const toggleMark = (format: string) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="min-w-[180px] bg-popover text-popover-foreground rounded-md p-1 shadow-md"
        >
          <ContextMenu.Item
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm outline-none cursor-default",
              "hover:bg-accent hover:text-accent-foreground rounded-sm",
              isMarkActive(editor, "bold") && "bg-accent/50"
            )}
            onSelect={() => toggleMark("bold")}
          >
            <Bold className="h-4 w-4" />
            <span>加粗</span>
            <div className="ml-auto text-xs text-muted-foreground">⌘+B</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm outline-none cursor-default",
              "hover:bg-accent hover:text-accent-foreground rounded-sm",
              isMarkActive(editor, "italic") && "bg-accent/50"
            )}
            onSelect={() => toggleMark("italic")}
          >
            <Italic className="h-4 w-4" />
            <span>斜体</span>
            <div className="ml-auto text-xs text-muted-foreground">⌘+I</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm outline-none cursor-default",
              "hover:bg-accent hover:text-accent-foreground rounded-sm",
              isMarkActive(editor, "underline") && "bg-accent/50"
            )}
            onSelect={() => toggleMark("underline")}
          >
            <Underline className="h-4 w-4" />
            <span>下划线</span>
            <div className="ml-auto text-xs text-muted-foreground">⌘+U</div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
