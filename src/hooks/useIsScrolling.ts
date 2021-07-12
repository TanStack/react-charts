import * as React from 'react'
import ReactDOM from 'react-dom'

export const unstable_batchedUpdates = ReactDOM.unstable_batchedUpdates

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function useIsScrolling(debounce: number) {
  const rerender = React.useReducer(() => ({}), {})[1]

  const ref = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const cb = () => {
      if (!ref.current) {
        ref.current = true
        rerender()
      }

      clearTimeout(timeout)

      timeout = setTimeout(() => {
        if (ref.current) {
          ref.current = false
          rerender()
        }
      }, debounce)
    }

    document.addEventListener('scroll', cb, true)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('scroll', cb)
    }
  }, [debounce])

  return ref.current
}
