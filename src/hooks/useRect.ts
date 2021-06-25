import React from 'react'

import observeRect from '@reach/observe-rect'

import { RequiredChartOptions } from '../types'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function useRect(
  node: HTMLElement | null | undefined,
  options: RequiredChartOptions
) {
  const [element, setElement] = React.useState(node)

  const [rect, setRect] = React.useState<DOMRect>({
    width: options.initialWidth ?? 0,
    height: options.initialHeight ?? 0,
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
    if (!element) {
      return
    }

    const observer = observeRect(element, setRect)

    observer.observe()

    return () => {
      observer.unobserve()
    }
  }, [element])

  return rect
}
