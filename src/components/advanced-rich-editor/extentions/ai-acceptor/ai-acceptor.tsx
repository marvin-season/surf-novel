import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AiAcceptorView from './ai-acceptor-view'
// import { v4 as uuid } from 'uuid'

// import { AiWriterView } from './components/AiWriterView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiAcceptor: {
      setAiAcceptor: ({ content }: { content: string }) => ReturnType
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
        ({ content }) =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: {
                id: Date.now(),
                content,
              },
            })
            .run(),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(AiAcceptorView)
  },
})

export default AiAcceptor
