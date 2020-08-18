import React from 'react'

export default function useGetLatest(obj) {
  const ref = React.useRef()
  const getterRef = React.useRef()

  ref.current = obj
  if (!getterRef.current) {
    getterRef.current = () => ref.current
  }

  return getterRef.current
}
