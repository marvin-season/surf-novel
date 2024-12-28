import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AiAcceptorView from './ai-acceptor-view'
import { TextSelection } from '@tiptap/pm/state'
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
        ({ tr, state, dispatch }) => {
          const { doc } = state

          let targetPos: number | null = null

          // 查找目标节点的位置
          doc.descendants((node, pos) => {
            if (node.type.name === 'ai-acceptor' && node.attrs.id === id) {
              targetPos = pos
              return false // 停止遍历
            }
            return true // 继续遍历
          })

          if (targetPos !== null) {
            // 如果节点存在，更新其属性
            tr.setNodeMarkup(targetPos, undefined, {
              id,
              content,
            })
            // 将光标移动到更新的节点
            tr.setSelection(TextSelection.near(tr.doc.resolve(targetPos)))
          } else {
            // 如果节点不存在，插入新节点
            const position = state.selection.$to.pos
            tr.insert(position, state.schema.nodes['ai-acceptor'].create({ id, content }))
            // 将光标移动到插入的新节点
            tr.setSelection(TextSelection.near(tr.doc.resolve(position + 1)))
          }

          if (dispatch) {
            dispatch(tr)
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
