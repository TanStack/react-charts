import React from 'react'

import observeRect from '@reach/observe-rect'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type HasBoundingClientRect = {
  getBoundingClientRect: () => DOMRect
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

  let [rect, setRect] = React.useState<DOMRect>({
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

  const resolvedRect = React.useMemo(() => {
    if (!node || !(node as Element).tagName) {
      return rect
    }

    const styles = window.getComputedStyle(node as Element)

    return {
      x: rect.x,
      y: rect.y,
      width:
        rect.width -
        parseInt(styles.borderLeftWidth) -
        parseInt(styles.borderRightWidth),
      height:
        rect.height -
        parseInt(styles.borderTopWidth) -
        parseInt(styles.borderBottomWidth),
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    }
  }, [node, rect])

  return resolvedRect
}
