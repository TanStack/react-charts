import * as React from 'react'

export default function useIsScrolling(debounce: number) {
  const [scrolling, setScrolling] = React.useState(false)

  const ref = React.useRef(scrolling)
  ref.current = scrolling

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const cb = () => {
      clearTimeout(timeout)

      if (!ref.current) {
        setScrolling(true)
        timeout = setTimeout(() => {
          setScrolling(false)
        }, debounce)
      }
    }

    document.addEventListener('scroll', cb, true)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('scroll', cb)
    }
  }, [debounce])

  return scrolling
}
