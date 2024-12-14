import React from 'react'
import { Editor, Element as SlateElement, Transforms } from "slate"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
} from "lucide-react"

interface CommandPaletteProps {
  editor: Editor
  open: boolean
  onOpenChange: (open: boolean) => void
}

const commands = [
  {
    group: "格式",
    items: [
      { label: "加粗", icon: Bold, command: (editor: Editor) => { Editor.addMark(editor, "bold", true) } },
      { label: "斜体", icon: Italic, command: (editor: Editor) => { Editor.addMark(editor, "italic", true) } },
      { label: "下划线", icon: Underline, command: (editor: Editor) => { Editor.addMark(editor, "underline", true) } },
    ],
  },
  {
    group: "标题",
    items: [
      { label: "标题 1", icon: Heading1, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "h1" }) } },
      { label: "标题 2", icon: Heading2, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "h2" }) } },
      { label: "标题 3", icon: Heading3, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "h3" }) } },
    ],
  },
  {
    group: "对齐",
    items: [
      { label: "左对齐", icon: AlignLeft, command: (editor: Editor) => { Transforms.setNodes(editor, { align: "left" }) } },
      { label: "居中", icon: AlignCenter, command: (editor: Editor) => { Transforms.setNodes(editor, { align: "center" }) } },
      { label: "右对齐", icon: AlignRight, command: (editor: Editor) => { Transforms.setNodes(editor, { align: "right" }) } },
    ],
  },
  {
    group: "列表",
    items: [
      { label: "无序列表", icon: List, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "bulleted-list" }) } },
      { label: "有序列表", icon: ListOrdered, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "numbered-list" }) } },
      { label: "引用", icon: Quote, command: (editor: Editor) => { Transforms.setNodes(editor, { type: "block-quote" }) } },
    ],
  },
]

export function CommandPalette({ editor, open, onOpenChange }: CommandPaletteProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="输入命令..." />
      <CommandList>
        <CommandEmpty>未找到命令</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => {
                  item.command(editor)
                  onOpenChange(false)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
