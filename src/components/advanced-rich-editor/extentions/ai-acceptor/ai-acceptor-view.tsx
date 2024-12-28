import { Textarea } from '@/components/ui/textarea'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'

const AiAcceptorView = ({ editor, node, getPos, deleteNode, selected, ...props }: NodeViewProps) => {
  console.log({
    node,
    selected,
    editor,
    getPos,
    deleteNode,
    ...props,
  })
  return (
    <NodeViewWrapper data-drag-handle>
      <div className="flex flex-col gap-2 rounded-lg border p-2">
        AI Acceptor
      </div>
    </NodeViewWrapper>
  )
}

export default AiAcceptorView
