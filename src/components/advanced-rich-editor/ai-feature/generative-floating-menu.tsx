import { ReactNode, useState } from 'react'
import { EditorFloating } from '../editor-floating'
import AISelectorCommands from './ai-selector-commands'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { AirVentIcon, Forward, LucidePower, LucideStepForward, Power, StepForward, StepForwardIcon } from 'lucide-react'

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
              Continue writing
            </CommandItem>
          </CommandList>
        </CommandGroup>
      </Command>
      {children}
    </EditorFloating>
  )
}
