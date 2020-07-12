import React from 'react'

export default function useLatest(obj, when = true) {
  const ref = React.useRef()
  if (when) {
    ref.current = obj
  }
  return ref.current
}
