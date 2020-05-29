import React from 'react'

import observeRect from '@reach/observe-rect'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function useRect(nodeRef) {
  const [element, setElement] = React.useState(nodeRef.current?.parentElement)
  const [rect, setRect] = React.useState({ width: 0, height: 0 })
  const initialRectSet = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (nodeRef.current?.parentElement !== element) {
      setElement(nodeRef.current?.parentElement)
    }
  })

  useIsomorphicLayoutEffect(() => {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true
      setRect(element.getBoundingClientRect())
    }
  }, [element])

  React.useEffect(() => {
    if (!element) {
      return
    }

    const observer = observeRect(element, setRect)

    observer.observe()

    return () => {
      observer.unobserve()
    }
  }, [element])

  return { width: rect.width, height: rect.height }
}
