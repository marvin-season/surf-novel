import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Badge from '../extentions/badge'
import { Markdown } from 'tiptap-markdown'
import CodeBlockHighlight from '../extentions/code-block-highlight'

export default function useExtentions() {
  return [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Please write something ...',
    }),
    Badge,
    Markdown,
    CodeBlockHighlight,
  ]
}
