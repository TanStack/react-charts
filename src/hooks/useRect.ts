import React from 'react'

export default function useRect(
  element: Element | null | undefined,
  enabled: boolean
) {
  const rerender = React.useReducer(() => ({}), [])[1]

  const rectRef = React.useRef<DOMRect>()

  const measure = React.useCallback(() => {
    if (element) {
      rectRef.current = element.getBoundingClientRect()
    }
  }, [element])

  if (!rectRef.current) {
    measure()
  }

  React.useEffect(() => {
    if (!element || !enabled) {
      return
    }

    const cb = () => {
      measure()
      rerender()
    }

    document.addEventListener('scroll', cb)

    return () => {
      document.removeEventListener('scroll', cb)
    }
  }, [element, enabled, measure, rerender])

  React.useEffect(() => {
    if (!element || !enabled) {
      return
    }

    measure()
    rerender()

    const observer = new ResizeObserver(entries => {
      measure()
      rerender()
    })

    observer.observe(element as Element)

    return () => {
      observer.unobserve(element as Element)
    }
  }, [element, enabled, measure, rerender])

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

  return rectRef.current
}
