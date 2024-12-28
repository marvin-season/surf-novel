import { Textarea } from '@/components/ui/textarea'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'

const AiAcceptorView = ({ node, HTMLAttributes: {
  'data-content': content
} }: NodeViewProps) => {
  console.log({
    node,
  })
  console.log(content)
  return (
    <NodeViewWrapper data-drag-handle>
      <div className="flex flex-col gap-2 rounded-lg border p-2">{content}</div>
    </NodeViewWrapper>
  )
}

export default AiAcceptorView
