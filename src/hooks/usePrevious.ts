import React from 'react'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function usePrevious<T>(val: T) {
  const ref = React.useRef<T>()

  useIsomorphicLayoutEffect(() => {
    ref.current = val
  }, [val])

  return ref.current
}
