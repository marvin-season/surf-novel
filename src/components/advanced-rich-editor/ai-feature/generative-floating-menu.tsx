import { ReactNode, useState } from 'react'
import { EditorFloating } from '../editor-floating'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { GitCommit, Github, StepForward, } from 'lucide-react'

export default function GenerativeFloatingMenu({ children }: { children?: ReactNode }) {
  const complete = console.log

  return (
    <EditorFloating>
      <Command>
        <CommandGroup heading="Use AI to continue">
          <CommandList>
            <CommandItem
              onSelect={() => {
                complete('asas')
                // 获取
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
