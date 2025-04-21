import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface CollapsibleProps {
  open: boolean
  children: ReactNode
}

interface CollapsibleContextType {
  open: boolean
}

const CollapsibleContext = createContext<CollapsibleContextType | null>(null)

export const Collapsible: FC<CollapsibleProps> = ({ open, children }) => {
  return (
    <CollapsibleContext.Provider value={{ open }}>
      <div>{children}</div>
    </CollapsibleContext.Provider>
  )
}

export const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) throw new Error('useCollapsible must be used within Collapsible')
  return ctx
}

export const CollapsibleContent: FC<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => {
  const { open } = useCollapsible()
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState('0px')

  useEffect(() => {
    const el = contentRef.current
    if (el) {
      if (open) {
        setMaxHeight(`${el.scrollHeight}px`)
        const timeout = setTimeout(() => {
          setMaxHeight('auto') // 防止内容撑开后被截断
        }, 300)
        return () => clearTimeout(timeout)
      } else {
        setMaxHeight(`${el.scrollHeight}px`) // 从当前高度开始动画
        requestAnimationFrame(() => {
          setMaxHeight('0px')
        })
      }
    }
  }, [open])

  return (
    <div
      ref={contentRef}
      className={clsx('transition-all duration-300 ease-in-out overflow-hidden', className)}
      style={{
        maxHeight,
      }}
    >
      {children}
    </div>
  )
}
