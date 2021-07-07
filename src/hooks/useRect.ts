import React from 'react'

import observeRect from '@reach/observe-rect'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type ClientRect = Omit<
  ReturnType<Element['getBoundingClientRect']>,
  'x' | 'y' | 'toJSON'
>

export type HasBoundingClientRect = {
  getBoundingClientRect: () => ClientRect
}

export default function useRect(
  node: HasBoundingClientRect | null | undefined,
  options?: {
    enabled?: boolean
    initialWidth?: number
    initialHeight?: number
  }
) {
  const enabled = options?.enabled ?? true

  const [element, setElement] = React.useState(node)

  const [rect, setRect] = React.useState<ClientRect>({
    width: options?.initialWidth ?? 0,
    height: options?.initialHeight ?? 0,
  } as DOMRect)

  const initialRectSet = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (node !== element) {
      setElement(node)
    }
  })

  useIsomorphicLayoutEffect(() => {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true
      setRect(element.getBoundingClientRect())
    }
  }, [element])

  React.useEffect(() => {
    if (!element || !enabled) {
      return
    }

    const observer = observeRect(element as Element, setRect)

    observer.observe()

    return () => {
      observer.unobserve()
    }
  }, [element, enabled])

  return rect
}
