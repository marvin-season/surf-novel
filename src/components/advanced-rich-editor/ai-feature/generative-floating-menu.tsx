import { ReactNode, useEffect, useRef } from 'react'
import { EditorFloating } from '../editor-floating'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Github, StepForward } from 'lucide-react'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { useCurrentEditor } from '@tiptap/react'
import type { Props, Instance } from 'tippy.js'
export default function GenerativeFloatingMenu({ children }: { children?: ReactNode }) {
  const { editor } = useCurrentEditor()
  const instanceRef = useRef<Instance<Props> | null>(null)
  const idRef = useRef<string>(Date.now().toString())

  const { completion, complete, setCompletion } = useCompletion({
    api: '/api/generate',
    onFinish: (response) => {
      console.log(response)
      idRef.current = Date.now().toString()
      setCompletion('')
    },
    onResponse: (response) => {
      console.log(response)
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.')
        return
      }
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  // Function to hide the menu
  const hideMenu = () => {
    instanceRef.current?.hide()
  }

  useEffect(() => {
    if (completion.length > 0) {
      // Use setTimeout to defer the call to avoid flushing synchronously
      setTimeout(() => {
        editor?.chain().focus().setAiAcceptor({ content: completion, id: idRef.current }).run()
      }, 0)
    }
  }, [completion])

  return (
    <EditorFloating
      editor={editor}
      shouldShow={() => {
        // 未选中文本才显示
        const selection = editor?.state.selection
        if (selection?.empty) return true
        return false
      }}
      tippyOptions={{
        onCreate: (instance) => {
          instanceRef.current = instance
        },
      }}
    >
      <Command>
        <CommandGroup heading="Use AI to continue">
          <CommandList>
            <CommandItem
              onSelect={async () => {
                const context = editor?.storage.markdown.getMarkdown()
                await complete(context, {
                  body: { command: 'continue' },
                })
                hideMenu() // Hide the menu after completion
              }}
              value="continue"
              className="gap-2 px-4"
            >
              <StepForward className="h-4 w-4 text-purple-500" />
              AI writing
            </CommandItem>
            <CommandItem
              onSelect={(value) => {
                window.open(value, '_blank')
              }}
              value="https://github.com/marvin-season/surf-novel"
              className="gap-2 px-4"
            >
              <Github className="h-4 w-4 text-purple-500" />
              Github
            </CommandItem>
          </CommandList>
        </CommandGroup>
      </Command>
      {children}
    </EditorFloating>
  )
}
