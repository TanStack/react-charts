import React from 'react'

export default function usePrevious(val) {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = val
  }, [val])

  return ref.current
}
