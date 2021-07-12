import observeRect from '@reach/observe-rect'
import React from 'react'
// import observeRect from '../utils/observe-rect'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type HasBoundingClientRect = {
  getBoundingClientRect: () => DOMRect
}

export default function useRect(
  node: HasBoundingClientRect | null | undefined,
  options: {
    enabled: boolean
    initialWidth?: number
    initialHeight?: number
    dimsOnly?: boolean
  }
) {
  const [element, setElement] = React.useState(node)

  let [rect, setRect] = React.useState<DOMRect>({
    width: options.initialWidth ?? 0,
    height: options.initialHeight ?? 0,
  } as DOMRect)

  const rectRef = React.useRef(rect)

  rectRef.current = rect

  useIsomorphicLayoutEffect(() => {
    if (node !== element) {
      setElement(node)
    }
  })

  const initialRectSet = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (options.enabled && element && !initialRectSet.current) {
      initialRectSet.current = true
      setRect(element.getBoundingClientRect())
    }
  }, [element, options.enabled])

  React.useEffect(() => {
    if (!element || !options.enabled) {
      return
    }

    const observer = observeRect(element as Element, (newRect: DOMRect) => {
      if (options.dimsOnly) {
        if (
          rectRef.current.width !== newRect.width ||
          rectRef.current.height !== newRect.height
        ) {
          setRect(newRect)
        }
      } else {
        setRect(newRect)
      }
    })

    observer.observe()

    return () => {
      observer.unobserve()
    }
  }, [element, options.dimsOnly, options.enabled])

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
