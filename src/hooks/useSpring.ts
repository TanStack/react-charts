import React from 'react'
import { Spring } from '../utils/spring'
import useGetLatest from './useGetLatest'

export function useSpring(
  value: number,
  config: [number, number, number],
  cb: (x: number) => void,
  immediate?: boolean
) {
  const springRef = React.useRef(new Spring(value, ...config))
  const getImmediate = useGetLatest(immediate)

  const [startRaf, stopRaf] = useRaf(() => {
    cb(springRef.current.x())
    return springRef.current.done()
  })

  React.useEffect(() => {
    if (springRef.current.endPosition !== value) {
      springRef.current.setEnd(value, getImmediate())
      startRaf()
    }
  }, [getImmediate, startRaf, value])

  React.useEffect(() => {
    return () => {
      stopRaf()
    }
  }, [stopRaf])

  return springRef.current
}

export function useRaf(callback: () => any) {
  const raf = React.useRef<number | null>(null)
  const rafCallback = React.useRef(callback)
  rafCallback.current = callback
  const tick = React.useCallback(() => {
    if (rafCallback.current()) return
    raf.current = requestAnimationFrame(tick)
  }, [])

  return [
    React.useMemo(() => tick, [tick]),
    React.useMemo(
      () => () => raf.current && cancelAnimationFrame(raf.current),
      []
    ),
  ]
}
