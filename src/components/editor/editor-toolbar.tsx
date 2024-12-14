import { Editor } from "slate"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorToolbarProps {
  editor: Editor
  className?: string
}

export function EditorToolbar({ editor, className }: EditorToolbarProps) {
  const isMarkActive = (format: string) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  return (
    <div className={cn("flex items-center gap-1 p-1 border-b", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isMarkActive("bold") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleMark("bold")}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isMarkActive("italic") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleMark("italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isMarkActive("underline") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleMark("underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>
    </div>
  )
}
