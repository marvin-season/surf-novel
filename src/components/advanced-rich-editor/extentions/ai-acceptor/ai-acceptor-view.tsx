import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'
// 这个组件是用来展示ai生成的内容，并且可以被用户编辑，用户可以选择是否接受ai生成的内容 accept or discard,
// 如果用户选择接受，则将ai生成的内容content替换到当前选择器
// 如果用户选择丢弃，则将ai生成的内容丢弃，删除当前节点
const AiAcceptorView = ({ editor, node, deleteNode }: NodeViewProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState('node.attrs.content')
  useEffect(() => {
    setContent(node.attrs.content)
  }, [isEditing])

  return (
    <NodeViewWrapper data-drag-handle>
      <Button variant={'secondary'} onClick={() => setIsEditing(!isEditing)}>{isEditing ? '取消编辑' : '编辑'}</Button>
      <div>
        {isEditing ? (
          <Textarea
            className="outline-none resize-none"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }}
          />
        ) : (
          <div>
            <span>{node.attrs.content}</span>
          </div>
        )}

        <div className="flex gap-2 text-sm cursor-pointer mt-2">
          <span
            className="text-blue-400"
            onClick={() => {
              deleteNode()
              editor.chain().focus().insertContentAt(editor.state.selection.from, content).run()
            }}
          >
            Accept
          </span>
          <span
            className="text-red-300"
            onClick={() => {
              deleteNode()
            }}
          >
            Discard
          </span>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default AiAcceptorView
