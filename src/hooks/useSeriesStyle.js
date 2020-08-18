import useChartContext from './useChartContext'

export default function useSeriesStyle(series) {
  const { focused, getSeriesStyle } = useChartContext()
  return series.getStatusStyle(focused, getSeriesStyle)
}
