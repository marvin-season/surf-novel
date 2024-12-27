import type { Editor } from '@tiptap/core'
import { Fragment, type Node } from '@tiptap/pm/model'
import { atom } from 'jotai'
import type { Range } from '@tiptap/core'
// Get the text before a given position in markdown format
export const getPrevText = (editor: Editor, position: number) => {
  const nodes: Node[] = []
  editor.state.doc.forEach((node, pos) => {
    if (pos >= position) return false
    nodes.push(node)
    return true
  })
  const fragment = Fragment.fromArray(nodes)
  const doc = editor.state.doc.copy(fragment)

  return editor.storage.markdown.serializer.serialize(doc) as string
}

export const queryAtom = atom('')
export const rangeAtom = atom<Range | null>(null)
