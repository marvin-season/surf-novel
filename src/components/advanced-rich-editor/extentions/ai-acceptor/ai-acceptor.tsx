import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AiAcceptorView from './ai-acceptor-view'
// import { v4 as uuid } from 'uuid'

// import { AiWriterView } from './components/AiWriterView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiAcceptor: {
      setAiAcceptor: () => ReturnType
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
        class: `span-${this.name}`,
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
    }
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type=${this.name}]`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setAiAcceptor:
        () =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: {
                id: Date.now(),
                authorId: this.options.authorId,
                authorName: this.options.authorName,
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
