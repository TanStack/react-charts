import React from 'react'

export default function useLatestWhen<T>(obj: T, when: boolean = true) {
  const ref = React.useRef<T | null>(when ? obj : null)

  if (when) {
    ref.current = obj
  }

  return ref.current
}
