import observeRect from '@reach/observe-rect'
import React from 'react'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type HasBoundingClientRect = {
  getBoundingClientRect: () => DOMRect
}

export default function useRect(
  node: HasBoundingClientRect | null | undefined,
  enabled: boolean
) {
  const [element, setElement] = React.useState(node)

  let [rect, setRect] = React.useState<DOMRect>({
    width: 0,
    height: 0,
  } as DOMRect)

  const rectRef = React.useRef(rect)

  rectRef.current = rect

  useIsomorphicLayoutEffect(() => {
    if (node !== element) {
      setElement(node)
    }
  })

  useIsomorphicLayoutEffect(() => {
    if (enabled && element) {
      setRect(element.getBoundingClientRect())
    }
  }, [element, enabled])

  React.useEffect(() => {
    if (!element || !enabled) {
      return
    }

    const observer = observeRect(element as Element, (newRect: DOMRect) => {
      setRect(newRect)
    })

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
