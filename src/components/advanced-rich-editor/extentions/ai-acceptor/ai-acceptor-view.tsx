import { Textarea } from '@/components/ui/textarea'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'

const AiAcceptorView = ({ editor, node, getPos, deleteNode, selected }: NodeViewProps) => {
  return (
    <NodeViewWrapper data-drag-handle>
      <div className="flex flex-col gap-2 rounded-lg border p-2">
        <Textarea placeholder="请输入标题" className={`${selected ? 'bg-primary text-primary-foreground' : ''}`} />
      </div>
    </NodeViewWrapper>
  )
}

export default AiAcceptorView
