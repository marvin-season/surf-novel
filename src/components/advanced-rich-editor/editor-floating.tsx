import { EditorContent, FloatingMenu, useCurrentEditor, useEditor } from '@tiptap/react'
import { ReactNode } from 'react'

export const EditorFloating = ({ children }: { children: ReactNode }) => {
  const { editor } = useCurrentEditor()

  return (
    <>
      <FloatingMenu editor={editor} tippyOptions={{ placement: 'bottom-start' }}>
        {children}
      </FloatingMenu>
    </>
  )
}
