import { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Element as SlateElement, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { cn } from '@/lib/utils'
import { EditorContextMenu } from './editor-context-menu'
import { EditorToolbar } from './editor-toolbar'
import { isKeyHotkey } from 'is-hotkey'
import { CommandPalette } from './command-palette'

// 定义快捷键常量
const FORMATTING_HOTKEYS = {
  bold: 'mod+b',
  italic: 'mod+i',
  underline: 'mod+u',
} as const

// 定义编辑器初始值
const INITIAL_EDITOR_VALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

// 定义类型
interface RichEditorProps {
  className?: string
}

interface ElementProps {
  attributes: any
  children: React.ReactNode
  element: any
}

interface LeafProps {
  attributes: any
  children: React.ReactNode
  leaf: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
  }
}

// 格式化处理函数
const toggleFormat = (editor: Editor, format: keyof typeof FORMATTING_HOTKEYS) => {
  const marks = Editor.marks(editor) || {}
  editor.addMark(format, !marks[format])
}

export function RichEditor({ className }: RichEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const renderElement = useCallback(({ attributes, children, element }: ElementProps) => {
    const style = { textAlign: element.align }

    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote
            style={style}
            className="border-l-4 border-border pl-4 italic"
            {...attributes}
          >
            {children}
          </blockquote>
        )
      case 'bulleted-list':
        return (
          <ul style={style} className="list-disc pl-4" {...attributes}>
            {children}
          </ul>
        )
      case 'numbered-list':
        return (
          <ol style={style} className="list-decimal pl-4" {...attributes}>
            {children}
          </ol>
        )
      case 'list-item':
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        )
      case 'h1':
        return (
          <h1 style={style} className="text-4xl font-bold my-4" {...attributes}>
            {children}
          </h1>
        )
      case 'h2':
        return (
          <h2 style={style} className="text-3xl font-bold my-3" {...attributes}>
            {children}
          </h2>
        )
      case 'h3':
        return (
          <h3 style={style} className="text-2xl font-bold my-2" {...attributes}>
            {children}
          </h3>
        )
      default:
        return (
          <p style={style} className="my-1" {...attributes}>
            {children}
          </p>
        )
    }
  }, [])

  const renderLeaf = useCallback(({ attributes, children, leaf }: LeafProps) => {
    return (
      <span
        {...attributes}
        style={{
          fontWeight: leaf.bold ? 'bold' : 'normal',
          fontStyle: leaf.italic ? 'italic' : 'normal',
          textDecoration: leaf.underline ? 'underline' : 'none',
        }}
      >
        {children}
      </span>
    )
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { nativeEvent } = event

      // 处理命令面板快捷键
      if (event.key === '/') {
        event.preventDefault()
        setShowCommandPalette(true)
        return
      }

      // 处理格式化快捷键
      for (const [format, hotkey] of Object.entries(FORMATTING_HOTKEYS)) {
        if (isKeyHotkey(hotkey, nativeEvent)) {
          event.preventDefault()
          toggleFormat(editor, format as keyof typeof FORMATTING_HOTKEYS)
          return
        }
      }
    },
    [editor]
  )

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <Slate editor={editor} initialValue={INITIAL_EDITOR_VALUE}>
        <div className="relative min-h-[200px] w-full rounded-md border border-input bg-background">
          <EditorToolbar editor={editor} className="sticky top-0 z-50 bg-background px-3 py-2" />
          <div className="px-3 py-2">
            <EditorContextMenu editor={editor}>
              <Editable
                className="min-h-[150px] prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="开始写作..."
                onKeyDown={handleKeyDown}
              />
            </EditorContextMenu>
          </div>
        </div>
      </Slate>
      <CommandPalette
        editor={editor}
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
      />
    </div>
  )
}
