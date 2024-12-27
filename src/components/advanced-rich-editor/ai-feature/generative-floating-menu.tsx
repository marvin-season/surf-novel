import { ReactNode, useState } from 'react'
import { EditorFloating } from '../editor-floating'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Github, StepForward } from 'lucide-react'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { useCurrentEditor } from '@tiptap/react'

export default function GenerativeFloatingMenu({ children }: { children?: ReactNode }) {
  const { editor } = useCurrentEditor()
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/generate',
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.')
        return
      }
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  return (
    <EditorFloating>
      <div className="p-2 text-sm text-gray-400">{completion}</div>
      <Command>
        <CommandGroup heading="Use AI to continue">
          <CommandList>
            <CommandItem
              onSelect={() => {
                // 获取所有的文本
                const context = editor?.storage.markdown.getMarkdown()
                complete(context, {
                  body: { option: 'continue' },
                })
              }}
              value="continue"
              className="gap-2 px-4"
            >
              <StepForward className="h-4 w-4 text-purple-500" />
              AI writing
            </CommandItem>
            <CommandItem
              onSelect={(value) => {
                // link to github
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
