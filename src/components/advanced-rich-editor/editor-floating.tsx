import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
import { ReactNode } from 'react'

export const EditorFloating = ({ children }: { children: ReactNode }) => {
  const { editor } = useCurrentEditor()

  return (
    <>
      <FloatingMenu
        className="overflow-hidden rounded-md shadow-xl p-2"
        editor={editor}
        tippyOptions={{ placement: 'bottom-start', moveTransition: 'transform 0.15s ease-out' }}
      >
        {children}
      </FloatingMenu>
    </>
  )
}
