import { useCallback, useMemo } from 'react'
import { createEditor, Descendant, Editor } from 'slate'
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
    switch (props.element.type) {
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      default:
        return <p {...props.attributes}>{props.children}</p>
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
          Editor.addMark(editor, 'bold', true)
          break
        }
        case 'i': {
          event.preventDefault()
          Editor.addMark(editor, 'italic', true)
          break
        }
        case 'u': {
          event.preventDefault()
          Editor.addMark(editor, 'underline', true)
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
        <div className="flex-1 px-8 py-6 min-h-0">
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
