import { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Element as SlateElement, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { cn } from '@/lib/utils'
import { EditorContextMenu } from './editor-context-menu'
import { EditorToolbar } from './editor-toolbar'
import { isKeyHotkey } from 'is-hotkey'
import { CommandPalette } from './command-palette'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

interface RichEditorProps {
  className?: string
}

export function RichEditor({ className }: RichEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const renderElement = useCallback((props: any) => {
    const { attributes, children, element } = props
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

  const renderLeaf = useCallback((props: any) => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: props.leaf.underline ? 'underline' : 'none',
        }}
      >
        {props.children}
      </span>
    )
  }, [])

  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { nativeEvent } = event

      if (event.key === '/') {
        console.log('Slash key pressed')
        event.preventDefault()
        setShowCommandPalette(true)
        return
      }

      if (isKeyHotkey('mod+b', nativeEvent)) {
        event.preventDefault()
        const marks = Editor.marks(editor) || {}
        editor.addMark('bold', !marks['bold'])
        return
      }

      if (isKeyHotkey('mod+i', nativeEvent)) {
        event.preventDefault()
        const marks = Editor.marks(editor) || {}
        editor.addMark('italic', !marks['italic'])
        return
      }

      if (isKeyHotkey('mod+u', nativeEvent)) {
        event.preventDefault()
        const marks = Editor.marks(editor) || {}
        editor.addMark('underline', !marks['underline'])
        return
      }
    },
    [editor]
  )

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <Slate editor={editor} initialValue={initialValue}>
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
