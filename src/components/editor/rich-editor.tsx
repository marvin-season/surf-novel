import { useCallback, useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { cn } from '@/lib/utils'

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

  return (
    <div className={cn("h-full w-full", className)}>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className="h-full w-full px-8 py-6 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="开始写作..."
        />
      </Slate>
    </div>
  )
}
