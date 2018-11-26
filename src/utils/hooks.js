import { useHooks, useRef, useContext } from 'use-react-hooks'
//
import ChartContext from './ChartContext'
import Utils from '../utils/Utils'

export default useHooks
export * from 'use-react-hooks'

export function usePropsMemo(fn, obj = {}) {
  const watchRef = useRef({
    style: {},
    props: {}
  })
  const valueRef = useRef()

  const { style = {}, ...props } = obj
  if (
    Utils.shallowDiff(watchRef.current.style, style) ||
    Utils.shallowDiff(watchRef.current.props, props)
  ) {
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
  const [{ focused, getSeriesStyle }] = useContext(ChartContext)
  return series.getStatusStyle(focused, getSeriesStyle)
}

export function useDatumStyle(datum) {
  const [{ focused, getDatumStyle }] = useContext(ChartContext)
  return datum.getStatusStyle(focused, getDatumStyle)
}
