import React from 'react'

export default function useGetLatest<T>(obj: T) {
  const ref = React.useRef<T>(obj)
  const getterRef = React.useRef<() => T>()

  ref.current = obj
  if (!getterRef.current) {
    getterRef.current = () => ref.current
  }

  return getterRef.current
}
