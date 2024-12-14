import { useCallback, useMemo } from 'react'
import { createEditor, Descendant, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { cn } from '@/lib/utils'
import { EditorContextMenu } from './editor-context-menu'
import { EditorToolbar } from './editor-toolbar'

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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) return

      switch (event.key) {
        case 'b': {
          event.preventDefault()
          const marks = editor.marks() || {}
          editor.addMark('bold', !marks['bold'])
          break
        }
        case 'i': {
          event.preventDefault()
          const marks = editor.marks() || {}
          editor.addMark('italic', !marks['italic'])
          break
        }
        case 'u': {
          event.preventDefault()
          const marks = editor.marks() || {}
          editor.addMark('underline', !marks['underline'])
          break
        }
      }
    },
    [editor]
  )

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <Slate editor={editor} initialValue={initialValue}>
        <EditorToolbar editor={editor} />
        <div className="flex-1 px-8 py-6 min-h-0 overflow-auto">
          <EditorContextMenu editor={editor}>
            <Editable
              className="h-full w-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="开始写作..."
              onKeyDown={handleKeyDown}
            />
          </EditorContextMenu>
        </div>
      </Slate>
    </div>
  )
}
