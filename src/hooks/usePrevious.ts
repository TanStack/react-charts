import React from 'react'

export default function usePrevious<T>(val: T) {
  const ref = React.useRef<T>()

  React.useEffect(() => {
    ref.current = val
  }, [val])

  return ref.current
}
