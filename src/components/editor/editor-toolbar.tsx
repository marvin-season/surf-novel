import { Editor, Element as SlateElement, Transforms } from "slate"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { React, useState, useEffect } from 'react';

interface EditorToolbarProps {
  editor: Editor
  className?: string
}

const TEXT_ALIGN_TYPES = ["left", "center", "right"] as const
type TextAlign = typeof TEXT_ALIGN_TYPES[number]

const HEADING_LEVELS = ["normal", "h1", "h2", "h3"] as const
type HeadingLevel = typeof HEADING_LEVELS[number]

const LIST_TYPES = ["bulleted-list", "numbered-list"] as const
type ListType = typeof LIST_TYPES[number]

export function EditorToolbar({ editor, className }: EditorToolbarProps) {
  const [blockType, setBlockType] = useState<HeadingLevel>("normal")

  useEffect(() => {
    const { selection } = editor
    if (!selection) return

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          ["paragraph", "h1", "h2", "h3"].includes(n.type),
      })
    )

    const type = match ? (match[0] as any).type : "paragraph"
    setBlockType(type === "paragraph" ? "normal" : type)
  }, [editor.selection])

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

  const isBlockActive = (format: string, blockType = "type") => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    )

    return !!match
  }

  const toggleBlock = (format: string) => {
    const isActive = isBlockActive(format)
    const isList = LIST_TYPES.includes(format as ListType)

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type as ListType),
      split: true,
    })

    const newProperties: Partial<SlateElement> = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  return (
    <div className={cn("flex items-center gap-1 p-1 border-b", className)}>
      <Select
        value={blockType}
        onValueChange={(value) => {
          if (value === "normal") {
            toggleBlock("paragraph")
          } else {
            toggleBlock(value)
          }
          setBlockType(value as HeadingLevel)
        }}
      >
        <SelectTrigger className="h-8 w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">正文</SelectItem>
          <SelectItem value="h1">标题 1</SelectItem>
          <SelectItem value="h2">标题 2</SelectItem>
          <SelectItem value="h3">标题 3</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-1 h-6" />

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

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("left", "align") && "bg-accent text-accent-foreground"
        )}
        onClick={() => Transforms.setNodes(editor, { align: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("center", "align") && "bg-accent text-accent-foreground"
        )}
        onClick={() => Transforms.setNodes(editor, { align: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("right", "align") && "bg-accent text-accent-foreground"
        )}
        onClick={() => Transforms.setNodes(editor, { align: "right" })}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("bulleted-list") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleBlock("bulleted-list")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("numbered-list") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleBlock("numbered-list")}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isBlockActive("block-quote") && "bg-accent text-accent-foreground"
        )}
        onClick={() => toggleBlock("block-quote")}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  )
}
