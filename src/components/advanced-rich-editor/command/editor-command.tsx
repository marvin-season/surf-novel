import { useAtom, useSetAtom } from 'jotai'
import { useEffect, createContext, useContext } from 'react'
import { Command } from 'cmdk'
import { queryAtom, rangeAtom } from '@/utils/editor'
import { novelStore } from './store'
import type tunnel from 'tunnel-rat'
import type { ComponentProps, FC } from 'react'
import type { Range } from '@tiptap/core'

export const EditorCommandTunnelContext = createContext({} as ReturnType<typeof tunnel>)
export const useEditorCommandTunnelContext = () => {
  return useContext(EditorCommandTunnelContext)
}
interface EditorCommandOutProps {
  readonly query: string
  readonly range: Range
}

export const EditorCommandOut: FC<EditorCommandOutProps> = ({ query, range }) => {
  const setQuery = useSetAtom(queryAtom, { store: novelStore })
  const setRange = useSetAtom(rangeAtom, { store: novelStore })

  useEffect(() => {
    setQuery(query)
  }, [query, setQuery])

  useEffect(() => {
    setRange(range)
  }, [range, setRange])

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        const commandRef = document.querySelector('#slash-command')

        if (commandRef)
          commandRef.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: e.key,
              cancelable: true,
              bubbles: true,
            })
          )

        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])
  const { Out } = useEditorCommandTunnelContext()

  return <Out />
}

export const EditorCommand = ({ children, className, ref, ...rest }: ComponentProps<typeof Command>) => {
  const [query, setQuery] = useAtom(queryAtom)
  const { In } = useEditorCommandTunnelContext()

  return (
    <>
      <In>
        <Command
          ref={ref}
          onKeyDown={(e) => {
            e.stopPropagation()
          }}
          id="slash-command"
          className={className}
          {...rest}
        >
          <Command.Input value={query} onValueChange={setQuery} style={{ display: 'none' }} />
          {children}
        </Command>
      </In>
    </>
  )
}
export const EditorCommandList = Command.List

EditorCommand.displayName = 'EditorCommand'
