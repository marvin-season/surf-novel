import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AiAcceptorView from './ai-acceptor-view'
// import { v4 as uuid } from 'uuid'

// import { AiWriterView } from './components/AiWriterView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiAcceptor: {
      setAiAcceptor: ({ content, id }: { content: string; id: string }) => ReturnType
    }
  }
}

export const AiAcceptor = Node.create({
  name: 'ai-acceptor',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      id: undefined,
      content: undefined,
      HTMLAttributes: {
        class: `div-${this.name}`,
      },
    }
  },

  addAttributes() {
    return {
      id: {
        default: undefined,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => ({
          'data-id': attributes.id,
        }),
      },
      content: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-content'),
        renderHTML(attributes) {
          return {
            'data-content': attributes.content,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type=${this.name}]`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setAiAcceptor:
        ({ content, id }) =>
        ({ chain, state, editor }) => {
          const { doc } = state

          let exists = false

          doc.descendants((node) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              exists = true
              // 使用 updateAttributes 更新节点属性
              editor.commands.updateAttributes(this.name, {
                content,
              })
              return false // 停止遍历
            }
            return true // 继续遍历
          })

          // 如果节点不存在，插入新节点
          if (!exists) {
            editor
              .chain()
              .focus()
              .insertContentAt(doc.content.size, {
                type: 'ai-acceptor',
                attrs: {
                  id,
                  content,
                },
              })
              .run()
          }

          return true
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(AiAcceptorView)
  },
})

export default AiAcceptor
