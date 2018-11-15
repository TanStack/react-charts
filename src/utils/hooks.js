import { useHooks, useRef, useContext } from 'use-react-hooks'
//
import deepEqual from './deepEqual'
import ChartContext from './ChartContext'

export default useHooks
export * from 'use-react-hooks'

export function useDeepMemo(fn, obj) {
  const watchRef = useRef()
  const valueRef = useRef()

  const changed = !deepEqual(watchRef.current, obj)
  if (changed) {
    watchRef.current = obj
    valueRef.current = fn()
  }
  return valueRef.current
}

export function useWhen(obj, when) {
  const ref = useRef()
  if (when) {
    ref.current = obj
  }
  return ref.current
}

export function useSeriesStyle(series) {
  const [{ focused, getStyles }] = useContext(ChartContext)
  return series.getStatusStyle(focused, getStyles)
}

export function useDatumStyle(datum) {
  const [{ focused, getDatumStyles }] = useContext(ChartContext)
  return datum.getStatusStyle(focused, getDatumStyles)
}
