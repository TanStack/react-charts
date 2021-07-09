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

  useIsomorphicLayoutEffect(() => {
    if (node !== element) {
      setElement(node)
    }
  })

  const initialRectSet = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true
      setRect(element.getBoundingClientRect())
    }
  }, [element])

  // const isScrolling = useIsScrolling(200)

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

  // const resolvedRect = React.useMemo(() => {
  //   if (!element || !(element as Element).tagName) {
  //     return rect
  //   }

  //   const styles = window.getComputedStyle(element as Element)

  //   return {
  //     x: rect.x,
  //     y: rect.y,
  //     width:
  //       rect.width -
  //       parseInt(styles.borderLeftWidth) -
  //       parseInt(styles.borderRightWidth),
  //     height:
  //       rect.height -
  //       parseInt(styles.borderTopWidth) -
  //       parseInt(styles.borderBottomWidth),
  //     top: rect.top,
  //     right: rect.right,
  //     bottom: rect.bottom,
  //     left: rect.left,
  //   }
  // }, [element, rect])

  return rect
}
